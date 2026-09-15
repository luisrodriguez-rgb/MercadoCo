import { ESSENTIAL_PRODUCTS } from '../data/products.js';
import { PRICES_CALI } from '../data/prices_cali.js';
import { STORES, CITIES, TRANSPORT_MODES, PACKAGING_TYPES, PERISHABILITY } from '../domain/types.js';

/**
 * Optimizador de Abastecimiento Retail V2
 * Implementa la formulación de Minimización de Desembolso en Efectivo (Cash Outlay),
 * costos de fricción logística paramétricos (Transporte + Tiempo + Desvío),
 * taxonomía de empaque (EXACT_WEIGHT vs FIXED_PACK vs UNIT),
 * auditoría de capital atrapado vs inventario útil futuro y motor de explicabilidad.
 */
export class BasketOptimizer {
  /**
   * Ejecuta la optimización analítica de abastecimiento
   * @param {Object} params
   * @param {Array} params.consolidatedIngredients - Ingredientes brutos requeridos por el menú semanal
   * @param {number} params.budgetCOP - Presupuesto disponible en efectivo
   * @param {Array<string>} params.pantryStockIds - IDs de productos ya disponibles en despensa
   * @param {string} params.zoneId - Clúster comercial urbano de Cali
   * @param {string} params.transportModeId - Modo de transporte (WALKING | TRANSIT_MIO | VEHICLE | DELIVERY)
   * @returns {Object} Diagnóstico financiero completo y canasta explicada
   */
  static optimize({
    consolidatedIngredients,
    budgetCOP,
    pantryStockIds = [],
    zoneId = 'CALI_GRANADA_VERSALLES',
    transportModeId = 'WALKING'
  }) {
    const productsMap = new Map(ESSENTIAL_PRODUCTS.map(p => [p.id, p]));
    const pricesByStoreAndProduct = new Map();

    PRICES_CALI.forEach(item => {
      const key = `${item.storeId}:${item.productId}`;
      pricesByStoreAndProduct.set(key, item);
    });

    // 1. Cálculo de Fricción Paramétrica: F = transport_cost + time_cost + detour_cost
    const caliZones = CITIES.CALI.zones;
    const currentZone = caliZones.find(z => z.id === zoneId) || caliZones[0];
    const transportMode = TRANSPORT_MODES[transportModeId] || TRANSPORT_MODES.WALKING;

    let frictionCalculatedCOP = 0;
    if (transportMode.id === 'WALKING') {
      // Tiempo invertido a pie (distancia en km / 4 km/h) valorado a $5.000 COP / hora
      const hoursWalking = (currentZone.baseDistanceKm * 2) / transportMode.speedKmH;
      frictionCalculatedCOP = Math.round(hoursWalking * transportMode.hourlyTimeCostCOP);
    } else if (transportMode.id === 'TRANSIT_MIO') {
      frictionCalculatedCOP = transportMode.monetaryCostCOP;
    } else if (transportMode.id === 'VEHICLE') {
      // Costo fijo de parqueo/arranque + fracción por km
      frictionCalculatedCOP = transportMode.monetaryCostCOP + Math.round(currentZone.baseDistanceKm * 800);
    } else if (transportMode.id === 'DELIVERY') {
      frictionCalculatedCOP = transportMode.monetaryCostCOP;
    }

    // 2. Filtrado de Requerimientos contra Despensa Preexistente
    const effectiveRequirements = consolidatedIngredients.map(ing => {
      const isAlreadyInPantry = pantryStockIds.includes(ing.productId);
      return {
        ...ing,
        effectiveAmount: isAlreadyInPantry ? 0 : ing.totalAmount,
        isCoveredByPantry: isAlreadyInPantry
      };
    });

    // 3. Función Evaluadora de Compra por SKU y Tienda
    const evaluatePurchase = (req, storeId) => {
      if (req.effectiveAmount === 0) return null;

      const product = productsMap.get(req.productId);
      const priceItem = pricesByStoreAndProduct.get(`${storeId}:${req.productId}`);
      if (!priceItem) return null;

      let packageUnits = 1;
      let totalPurchasedAmount = req.effectiveAmount;
      let totalCost = 0;
      let pantrySurplus = 0;

      if (priceItem.packagingType === PACKAGING_TYPES.EXACT_WEIGHT.id) {
        // Modelo Continuo: Granel exacto en báscula sin sobrante forzado
        totalCost = Math.round(req.effectiveAmount * priceItem.pricePerUnit);
        packageUnits = 1;
        pantrySurplus = 0;
        totalPurchasedAmount = req.effectiveAmount;
      } else {
        // Modelo Discreto: Empaque cerrado obligatorio (FIXED_PACK / UNIT)
        packageUnits = Math.ceil(req.effectiveAmount / priceItem.packageSize);
        totalCost = packageUnits * priceItem.priceCOP;
        totalPurchasedAmount = packageUnits * priceItem.packageSize;
        pantrySurplus = totalPurchasedAmount - req.effectiveAmount;
      }

      // Desglose de Capital Sobrante
      const surplusValue = pantrySurplus > 0 ? Math.round(pantrySurplus * priceItem.pricePerUnit) : 0;
      const productPerishability = product?.perishability || PERISHABILITY.MEDIUM.id;
      
      let expectedWasteRisk = 0;
      let futureUsefulInventory = 0;

      if (productPerishability === PERISHABILITY.HIGH.id) {
        expectedWasteRisk = surplusValue;
      } else {
        futureUsefulInventory = surplusValue;
      }

      return {
        productId: req.productId,
        productName: product ? product.name : req.productId,
        category: product ? product.category : 'OTHER',
        perishability: productPerishability,
        storeId,
        storeName: STORES[storeId]?.name || storeId,
        brand: priceItem.brand,
        packagingType: priceItem.packagingType,
        packageSize: priceItem.packageSize,
        unit: priceItem.unit,
        pricePerPackage: priceItem.priceCOP,
        pricePerUnit: priceItem.pricePerUnit,
        packageUnits,
        totalPurchasedAmount,
        totalRequired: req.effectiveAmount,
        pantrySurplus,
        surplusValue,
        expectedWasteRisk,
        futureUsefulInventory,
        totalCost,
        confidenceScore: priceItem.confidenceScore,
        confidence: priceItem.confidence,
        notes: priceItem.notes
      };
    };

    // 4. Canastas Monotienda
    const storeIds = ['D1', 'ARA', 'EXITO'];
    const monoStores = {};

    storeIds.forEach(storeId => {
      let totalCost = 0;
      let totalSurplus = 0;
      let totalWasteRisk = 0;
      let totalFutureInventory = 0;
      let confidenceSum = 0;
      const items = [];

      effectiveRequirements.forEach(req => {
        const purchase = evaluatePurchase(req, storeId);
        if (purchase) {
          items.push(purchase);
          totalCost += purchase.totalCost;
          totalSurplus += purchase.surplusValue;
          totalWasteRisk += purchase.expectedWasteRisk;
          totalFutureInventory += purchase.futureUsefulInventory;
          confidenceSum += purchase.confidenceScore;
        }
      });

      monoStores[storeId] = {
        storeId,
        storeName: STORES[storeId].name,
        color: STORES[storeId].color,
        tag: STORES[storeId].tag,
        items,
        totalCost,
        totalSurplus,
        totalWasteRisk,
        totalFutureInventory,
        averageConfidence: items.length > 0 ? (confidenceSum / items.length) : 0,
        itemCount: items.length,
        withinBudget: totalCost <= budgetCOP,
        budgetDelta: budgetCOP - totalCost
      };
    });

    // 5. Asignación Híbrida Multitienda Óptima con Explicabilidad
    let multiStoreTotalCost = 0;
    let multiStoreSurplus = 0;
    let multiStoreWasteRisk = 0;
    let multiStoreFutureInventory = 0;
    let multiConfidenceSum = 0;
    const multiStoreItems = [];
    const storeBreakdown = { D1: 0, ARA: 0, EXITO: 0 };
    const explanations = [];

    effectiveRequirements.forEach(req => {
      const d1Opt = evaluatePurchase(req, 'D1');
      const araOpt = evaluatePurchase(req, 'ARA');
      const exitoOpt = evaluatePurchase(req, 'EXITO');

      const validOptions = [d1Opt, araOpt, exitoOpt].filter(Boolean);
      if (validOptions.length > 0) {
        // Criterio de optimización multiobjetivo: Minimizar Desembolso de Caja + Penalización de Desperdicio
        validOptions.sort((a, b) => {
          const scoreA = a.totalCost + (a.expectedWasteRisk * 0.8);
          const scoreB = b.totalCost + (b.expectedWasteRisk * 0.8);
          return scoreA - scoreB;
        });

        const bestOption = validOptions[0];
        multiStoreItems.push(bestOption);
        multiStoreTotalCost += bestOption.totalCost;
        multiStoreSurplus += bestOption.surplusValue;
        multiStoreWasteRisk += bestOption.expectedWasteRisk;
        multiStoreFutureInventory += bestOption.futureUsefulInventory;
        multiConfidenceSum += bestOption.confidenceScore;
        storeBreakdown[bestOption.storeId] = (storeBreakdown[bestOption.storeId] || 0) + bestOption.totalCost;

        // Generación de Racionalidad / Explicabilidad por SKU
        if (validOptions.length > 1) {
          const runnerUp = validOptions[1];
          const savingsVsRunnerUp = runnerUp.totalCost - bestOption.totalCost;
          let reasonText = '';

          if (bestOption.packagingType === PACKAGING_TYPES.EXACT_WEIGHT.id && runnerUp.packagingType === PACKAGING_TYPES.FIXED_PACK.id) {
            reasonText = `Báscula continua evita pagar empaque sellado cerrado de ${runnerUp.packageSize}${runnerUp.unit}.`;
          } else if (savingsVsRunnerUp > 0) {
            reasonText = `Empaque sellado con ahorro directo de $${savingsVsRunnerUp.toLocaleString('es-CO')} frente a ${runnerUp.storeName}.`;
          } else {
            reasonText = `Mejor costo ponderado de adquisición en punto de venta.`;
          }

          explanations.push({
            productName: bestOption.productName,
            assignedStore: bestOption.storeName,
            brand: bestOption.brand,
            reason: reasonText,
            savingsVsRunnerUp
          });
        }
      }
    });

    // 6. Evaluación Comparativa
    const bestMonoStore = Object.values(monoStores).reduce((min, cur) => 
      cur.totalCost < min.totalCost ? cur : min, monoStores['D1']);

    const grossSavings = Math.max(0, bestMonoStore.totalCost - multiStoreTotalCost);
    const netSavings = Math.max(0, grossSavings - frictionCalculatedCOP);
    const isMultiStoreWorthIt = grossSavings > (frictionCalculatedCOP * 1.8);

    const averageConfidence = multiStoreItems.length > 0 
      ? (multiConfidenceSum / multiStoreItems.length) 
      : 0;

    return {
      budgetCOP,
      currentZone,
      transportMode,
      pantryStockIds,
      monoStores,
      bestMonoStore,
      multiStore: {
        totalCost: multiStoreTotalCost,
        totalSurplus: multiStoreSurplus,
        totalWasteRisk: multiStoreWasteRisk,
        totalFutureInventory: multiStoreFutureInventory,
        averageConfidence,
        items: multiStoreItems,
        storeBreakdown,
        grossSavings,
        frictionPenaltyCOP: frictionCalculatedCOP,
        netSavings,
        isWorthIt: isMultiStoreWorthIt,
        withinBudget: multiStoreTotalCost <= budgetCOP,
        budgetDelta: budgetCOP - multiStoreTotalCost,
        explanations
      }
    };
  }
}
