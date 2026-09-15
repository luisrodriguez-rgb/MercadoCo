import { ESSENTIAL_PRODUCTS } from '../data/products.js';
import { PRICES_CALI } from '../data/prices_cali.js';
import { STORES } from '../domain/types.js';

export class BasketOptimizer {
  /**
   * Optimiza la canasta de compras calculando paquetes enteros y comparando tiendas
   * @param {Array} consolidatedIngredients - Lista de { productId, unit, totalAmount }
   * @param {number} budgetCOP - Presupuesto semanal
   * @returns {Object} Comparativa de Canastas y Recomendación
   */
  static optimize(consolidatedIngredients, budgetCOP) {
    const productsMap = new Map(ESSENTIAL_PRODUCTS.map(p => [p.id, p]));
    const pricesByStoreAndProduct = new Map();

    PRICES_CALI.forEach(item => {
      const key = `${item.storeId}:${item.productId}`;
      pricesByStoreAndProduct.set(key, item);
    });

    // Función auxiliar para calcular compra de un producto en una tienda específica
    const calculateProductPurchase = (productId, totalRequired, storeId) => {
      const product = productsMap.get(productId);
      const priceItem = pricesByStoreAndProduct.get(`${storeId}:${productId}`);

      if (!priceItem) {
        return null;
      }

      // Cálculo de empaques enteros necesarios
      const packageUnits = Math.ceil(totalRequired / priceItem.packageSize);
      const totalCost = packageUnits * priceItem.priceCOP;
      const totalPurchasedAmount = packageUnits * priceItem.packageSize;
      const pantrySurplus = totalPurchasedAmount - totalRequired;

      return {
        productId,
        productName: product ? product.name : productId,
        category: product ? product.category : 'OTHER',
        storeId,
        storeName: STORES[storeId]?.name || storeId,
        brand: priceItem.brand,
        packageSize: priceItem.packageSize,
        unit: priceItem.unit,
        pricePerPackage: priceItem.priceCOP,
        packageUnits,
        totalPurchasedAmount,
        totalRequired,
        pantrySurplus,
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
      const items = [];

      consolidatedIngredients.forEach(ing => {
        const purchase = calculateProductPurchase(ing.productId, ing.totalAmount, storeId);
        if (purchase) {
          items.push(purchase);
          totalCost += purchase.totalCost;
        }
      });

      monoStores[storeId] = {
        storeId,
        storeName: STORES[storeId].name,
        color: STORES[storeId].color,
        tag: STORES[storeId].tag,
        items,
        totalCost,
        itemCount: items.length,
        withinBudget: totalCost <= budgetCOP,
        budgetDelta: budgetCOP - totalCost
      };
    });

    // 2. Canasta Multitienda Óptima (Entre D1 y Ara principalmente, con opción Éxito si fuera mejor)
    let multiStoreTotalCost = 0;
    const multiStoreItems = [];
    const storeBreakdown = { D1: 0, ARA: 0, EXITO: 0 };

    consolidatedIngredients.forEach(ing => {
      const d1Option = calculateProductPurchase(ing.productId, ing.totalAmount, 'D1');
      const araOption = calculateProductPurchase(ing.productId, ing.totalAmount, 'ARA');
      const exitoOption = calculateProductPurchase(ing.productId, ing.totalAmount, 'EXITO');

      const validOptions = [d1Option, araOption, exitoOption].filter(Boolean);
      if (validOptions.length > 0) {
        // Encontrar la opción de menor costo total
        validOptions.sort((a, b) => a.totalCost - b.totalCost);
        const bestOption = validOptions[0];

        multiStoreItems.push(bestOption);
        multiStoreTotalCost += bestOption.totalCost;
        storeBreakdown[bestOption.storeId] = (storeBreakdown[bestOption.storeId] || 0) + bestOption.totalCost;
      }
    });

    // 3. Cálculo de Ahorro y Fricción de Desplazamiento
    const bestMonoStore = Object.values(monoStores).reduce((min, cur) => 
      cur.totalCost < min.totalCost ? cur : min, monoStores['D1']);

    const grossSavings = Math.max(0, bestMonoStore.totalCost - multiStoreTotalCost);
    const frictionPenaltyCOP = 5000; // Costo estimado de desplazamiento / tiempo entre 2 tiendas en Cali
    const netSavings = Math.max(0, grossSavings - frictionPenaltyCOP);

    const isMultiStoreWorthIt = grossSavings > 12000; // Umbral de recomendación de ahorro real

    return {
      budgetCOP,
      monoStores,
      bestMonoStore,
      multiStore: {
        totalCost: multiStoreTotalCost,
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
