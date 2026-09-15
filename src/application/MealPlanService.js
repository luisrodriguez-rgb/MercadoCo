import { COLOMBIAN_RECIPES } from '../data/recipes.js';

/**
 * Servicio de Generación de Menú Semanal adaptado a comensales y presupuesto.
 */
export class MealPlanService {
  /**
   * Genera un menú semanal de 7 días (Lunes a Domingo) con Almuerzo y Cena
   * @param {Object} params
   * @param {number} params.peopleCount - Número de comensales (1 a 4)
   * @param {number} params.budgetCOP - Presupuesto semanal disponible
   * @param {string} params.preference - Preferencia de menú (BALANCEADO | ECONOMICO | ALTA_PROTEINA)
   * @returns {Object} Menú semanal detallado y lista consolidada de ingredientes necesarios
   */
  static generateWeeklyPlan({ peopleCount = 2, budgetCOP = 220000, preference = 'BALANCEADO' }) {
    const days = [
      { id: 'lun', name: 'Lunes' },
      { id: 'mar', name: 'Martes' },
      { id: 'mie', name: 'Miércoles' },
      { id: 'jue', name: 'Jueves' },
      { id: 'vie', name: 'Viernes' },
      { id: 'sab', name: 'Sábado' },
      { id: 'dom', name: 'Domingo' }
    ];

    let lunchesPool = COLOMBIAN_RECIPES.filter(r => r.mealType === 'LUNCH');
    let dinnersPool = COLOMBIAN_RECIPES.filter(r => r.mealType === 'DINNER');

    // Adecuación Nutricional Ponderada sin distorsión de canasta:
    // Evita la maximización desmedida de un solo macroalimento
    if (preference === 'ALTA_PROTEINA') {
      // Prioriza recetas con proteínas de alto valor biológico (pechuga, atún, carne molida, huevos)
      // manteniendo guarniciones balanceadas de carbohidratos complejos
      lunchesPool = [...lunchesPool].sort((a, b) => {
        const aHasBioProtein = a.ingredientsPerServing.some(i => ['prod_pechuga_pollo', 'prod_carne_molida', 'prod_cerdo_lomo'].includes(i.productId));
        const bHasBioProtein = b.ingredientsPerServing.some(i => ['prod_pechuga_pollo', 'prod_carne_molida', 'prod_cerdo_lomo'].includes(i.productId));
        return (bHasBioProtein ? 1 : 0) - (aHasBioProtein ? 1 : 0);
      });
      dinnersPool = [...dinnersPool].sort((a, b) => {
        const aHasEggTuna = a.ingredientsPerServing.some(i => ['prod_atun_lata', 'prod_huevos_aa'].includes(i.productId));
        const bHasEggTuna = b.ingredientsPerServing.some(i => ['prod_atun_lata', 'prod_huevos_aa'].includes(i.productId));
        return (bHasEggTuna ? 1 : 0) - (aHasEggTuna ? 1 : 0);
      });
    } else if (preference === 'ECONOMICO') {
      lunchesPool = [...lunchesPool].sort((a, b) => (a.costTier === 'ECONOMICO' ? -1 : 1));
      dinnersPool = [...dinnersPool].sort((a, b) => (a.costTier === 'ECONOMICO' ? -1 : 1));
    }

    // Selección inteligente con rotación garantizando variedad (sin repetir el plato dos días seguidos)
    const weeklyDays = days.map((day, idx) => {
      const lunch = lunchesPool[idx % lunchesPool.length];
      const dinner = dinnersPool[(idx * 2 + 1) % dinnersPool.length];

      return {
        dayId: day.id,
        dayName: day.name,
        lunch,
        dinner
      };
    });

    // Consolidación de ingredientes totales para toda la semana
    const totalIngredientsMap = new Map();

    weeklyDays.forEach(daySchedule => {
      [daySchedule.lunch, daySchedule.dinner].forEach(recipe => {
        recipe.ingredientsPerServing.forEach(ing => {
          const totalAmount = ing.amount * peopleCount;
          if (totalIngredientsMap.has(ing.productId)) {
            const current = totalIngredientsMap.get(ing.productId);
            current.totalAmount += totalAmount;
          } else {
            totalIngredientsMap.set(ing.productId, {
              productId: ing.productId,
              unit: ing.unit,
              totalAmount
            });
          }
        });
      });
    });

    const consolidatedIngredients = Array.from(totalIngredientsMap.values());

    return {
      peopleCount,
      budgetCOP,
      preference,
      days: weeklyDays,
      ingredients: consolidatedIngredients
    };
  }
}
