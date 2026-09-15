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

    const lunchesPool = COLOMBIAN_RECIPES.filter(r => r.mealType === 'LUNCH');
    const dinnersPool = COLOMBIAN_RECIPES.filter(r => r.mealType === 'DINNER');

    // Selección inteligente con rotación para evitar repeticiones consecutivas
    const weeklyDays = days.map((day, idx) => {
      const lunch = lunchesPool[idx % lunchesPool.length];
      const dinner = dinnersPool[(idx * 2) % dinnersPool.length];

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
