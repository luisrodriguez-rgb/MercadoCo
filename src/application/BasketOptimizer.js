import { ESSENTIAL_PRODUCTS } from '../data/products.js';
import { PRICES_CALI } from '../data/prices_cali.js';
import { STORES, CITIES } from '../domain/types.js';

/**
 * Optimizador de Abastecimiento Retail y Modelo de Asignación Presupuestal
 * Incorpora empaques indivisibles discretos vs. granel continuo en báscula,
 * inventario preexistente en despensa y fricción logística por zona geográfica.
 */
export class BasketOptimizer {
  /**
   * Ejecuta la optimización de la canasta
   * @param {Object} params
   * @param {Array} params.consolidatedIngredients - Ingredientes brutos calculados por el menú
   * @param {number} params.budgetCOP - Presupuesto disponible
   * @param {Array<string>} params.pantryStockIds - IDs de productos que el usuario ya tiene en casa
   * @param {string} params.zoneId - Identificador de zona geográfica en Cali
   * @returns {Object} Diagnóstico comparativo, métricas de liquidez y recomendación de abastecimiento
   */
  static optimize({
    consolidatedIngredients,
    budgetCOP,
    pantryStockIds = [],
    zoneId = 'CALI_GRANADA_VERSALLES'
  }) {
    const productsMap = new Map(ESSENTIAL_PRODUCTS.map(p => [p.id, p]));
    const pricesByStoreAndProduct = new Map();

    PRICES_CALI.forEach(item => {
      const key = `${item.storeId}:${item.productId}`;
      pricesByStoreAndProduct.set(key, item);
    });

    // Zona activa y costo de desplazamiento específico
    const caliZones = CITIES.CALI.zones;
    const currentZone = caliZones.find(z => z.id === zoneId) || caliZones[0];
    const frictionPenaltyCOP = currentZone.frictionCOP;

    // Filtrar requerimientos: Si el producto está en la despensa del usuario, requerimiento de compra = 0
    const effectiveRequirements = consolidatedIngredients.map(ing => {
      const isAlreadyInPantry = pantryStockIds.includes(ing.productId);
      return {
        ...ing,
        effectiveAmount: isAlreadyInPantry ? 0 : ing.totalAmount,
        isCoveredByPantry: isAlreadyInPantry
      };
    });

    // Función de cálculo por tienda con soporte para empaque discreto vs. pesaje en báscula (granel)
    const calculateStorePurchase = (req, storeId) => {
      if (req.effectiveAmount === 0) {
        return null; // Cubierto por despensa existente
      }

      const product = productsMap.get(req.productId);
      const priceItem = pricesByStoreAndProduct.get(`${storeId}:${req.productId}`);

      if (!priceItem) {
        return null;
      }

      let packageUnits = 1;
      let totalPurchasedAmount = req.effectiveAmount;
      let totalCost = 0;
      let pantrySurplus = 0;

      if (priceItem.isBulkWeighed) {
        // Modelo continuo: se pesa en báscula por gramo/unidad exacta (ej. Éxito carnes y verduras)
        totalCost = Math.round(req.effectiveAmount * priceItem.pricePerUnit);
        packageUnits = 1;
        pantrySurplus = 0;
        totalPurchasedAmount = req.effectiveAmount;
      } else {
        // Modelo discreto: empaque cerrado obligado (ej. D1 / Ara)
        packageUnits = Math.ceil(req.effectiveAmount / priceItem.packageSize);
        totalCost = packageUnits * priceItem.priceCOP;
        totalPurchasedAmount = packageUnits * priceItem.packageSize;
        pantrySurplus = totalPurchasedAmount - req.effectiveAmount;
      }

      // Liquidez atrapada en el sobrante (costo de la porción no consumida en la semana)
      const trappedCash = pantrySurplus > 0 ? Math.round(pantrySurplus * priceItem.pricePerUnit) : 0;

      return {
        productId: req.productId,
        productName: product ? product.name : req.productId,
        category: product ? product.category : 'OTHER',
        storeId,
        storeName: STORES[storeId]?.name || storeId,
        brand: priceItem.brand,
        packageSize: priceItem.packageSize,
        unit: priceItem.unit,
        pricePerPackage: priceItem.priceCOP,
        pricePerUnit: priceItem.pricePerUnit,
        isBulkWeighed: priceItem.isBulkWeighed,
        packageUnits,
        totalPurchasedAmount,
        totalRequired: req.effectiveAmount,
        pantrySurplus,
        trappedCash,
        totalCost,
        confidence: priceItem.confidence,
        notes: priceItem.notes
      };
    };

    // 1. Canastas Monotienda
    const storeIds = ['D1', 'ARA', 'EXITO'];
    const monoStores = {};

    storeIds.forEach(storeId => {
      let totalCost = 0;
      let totalTrappedCash = 0;
      const items = [];

      effectiveRequirements.forEach(req => {
        const purchase = calculateStorePurchase(req, storeId);
        if (purchase) {
          items.push(purchase);
          totalCost += purchase.totalCost;
          totalTrappedCash += purchase.trappedCash;
        }
      });

      monoStores[storeId] = {
        storeId,
        storeName: STORES[storeId].name,
        color: STORES[storeId].color,
        tag: STORES[storeId].tag,
        items,
        totalCost,
        totalTrappedCash,
        itemCount: items.length,
        withinBudget: totalCost <= budgetCOP,
        budgetDelta: budgetCOP - totalCost
      };
    });

    // 2. Asignación Óptima Multitienda (Híbrido D1 + Ara con opción Éxito si el granel resulta más económico)
    let multiStoreTotalCost = 0;
    let multiStoreTrappedCash = 0;
    const multiStoreItems = [];
    const storeBreakdown = { D1: 0, ARA: 0, EXITO: 0 };

    effectiveRequirements.forEach(req => {
      const d1Opt = calculateStorePurchase(req, 'D1');
      const araOpt = calculateStorePurchase(req, 'ARA');
      const exitoOpt = calculateStorePurchase(req, 'EXITO');

      const validOptions = [d1Opt, araOpt, exitoOpt].filter(Boolean);
      if (validOptions.length > 0) {
        // Criterio de asignación: Minimizar el desembolso total de efectivo requerido (cash outlay)
        validOptions.sort((a, b) => a.totalCost - b.totalCost);
        const bestOption = validOptions[0];

        multiStoreItems.push(bestOption);
        multiStoreTotalCost += bestOption.totalCost;
        multiStoreTrappedCash += bestOption.trappedCash;
        storeBreakdown[bestOption.storeId] = (storeBreakdown[bestOption.storeId] || 0) + bestOption.totalCost;
      }
    });

    // 3. Evaluación de Ahorro y Fricción Logística
    const bestMonoStore = Object.values(monoStores).reduce((min, cur) => 
      cur.totalCost < min.totalCost ? cur : min, monoStores['D1']);

    const grossSavings = Math.max(0, bestMonoStore.totalCost - multiStoreTotalCost);
    const netSavings = Math.max(0, grossSavings - frictionPenaltyCOP);

    // Se recomienda multitienda solo si el ahorro neto compensa ampliamente el tiempo y fricción de la zona
    const isMultiStoreWorthIt = grossSavings > (frictionPenaltyCOP * 2.5);

    // Cálculo de ahorro obtenido por tener insumos ya en despensa
    const pantrySavingsEstimate = pantryStockIds.length * 4500; // Valor aproximado liberado de compras

    return {
      budgetCOP,
      currentZone,
      pantryStockIds,
      pantrySavingsEstimate,
      monoStores,
      bestMonoStore,
      multiStore: {
        totalCost: multiStoreTotalCost,
        totalTrappedCash: multiStoreTrappedCash,
        items: multiStoreItems,
        storeBreakdown,
        grossSavings,
        frictionPenaltyCOP,
        netSavings,
        isWorthIt: isMultiStoreWorthIt,
        withinBudget: multiStoreTotalCost <= budgetCOP,
        budgetDelta: budgetCOP - multiStoreTotalCost
      }
    };
  }
}
