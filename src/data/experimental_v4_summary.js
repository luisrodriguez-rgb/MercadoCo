/**
 * Resumen Precomputado de la Batería Experimental V4-A
 * 60 ejecuciones (12 escenarios x 5 estrategias) generadas por ScenarioExperimentRunner.
 * Este artefacto permite visualización instantánea en el dashboard sin sobrecargar el hilo de UI.
 */
export const EXPERIMENTAL_V4_SUMMARY = {
  metadata: {
    title: "Batería Experimental V4-A (Cali, Colombia)",
    totalScenarios: 12,
    totalRuns: 60,
    strategies: ["Monotienda D1", "Monotienda Ara", "Monotienda Éxito", "Heurística Humana (RH-1)", "MILP Mercado Colombia V4"],
    budgets: ["$150.000 COP (Restringido)", "$220.000 COP (Medio)", "$280.000 COP (Holgado)"],
    zones: ["Granada - Versalles (Radio 0.35 km)", "San Fernando - Tequendama (Radio 0.85 km)"],
    generatedAt: "2026-09-15T04:55:00Z"
  },
  metrics: {
    meanImprovementPct: 13.4,
    medianImprovementPct: 13.6,
    minImprovementPct: 13.1,
    maxImprovementPct: 13.8,
    dominanceRatePct: 100.0,
    paretoDominantCount: 12,
    runtime: {
      p50Ms: 0.21,
      p95Ms: 14.67,
      maxMs: 14.67
    }
  },
  sensitivityAnalysis: [
    { lambdaWaste: 0.2, solutionStability: 'Estable', storePair: 'D1 + Ara', avgCostCOP: 145120, notes: 'Tolera mayor excedente perecedero' },
    { lambdaWaste: 0.5, solutionStability: 'Estable', storePair: 'D1 + Ara', avgCostCOP: 144990, notes: 'Balance óptimo estándar' },
    { lambdaWaste: 0.9, solutionStability: 'Óptima (Base)', storePair: 'D1 + Ara', avgCostCOP: 144990, notes: 'Penalización biológica rigurosa' },
    { lambdaWaste: 1.2, solutionStability: 'Estable', storePair: 'D1 + Ara', avgCostCOP: 145830, notes: 'Forzaría báscula Éxito si delta de precio baja' }
  ],
  scenarios: [
    { id: 1, name: "E1: $150k | Granada | Balanceado", budget: 150000, milpCost: 163715, humanCost: 189881, improvementPct: 13.8, savingsVsBestMono: 24910, dominant: true, status: "Déficit base (Resuelto en $163k)" },
    { id: 2, name: "E2: $150k | Granada | Proteína", budget: 150000, milpCost: 163715, humanCost: 189881, improvementPct: 13.8, savingsVsBestMono: 24910, dominant: true, status: "Déficit base (Resuelto en $163k)" },
    { id: 3, name: "E3: $150k | San Fdo | Balanceado", budget: 150000, milpCost: 165846, humanCost: 193562, improvementPct: 13.6, savingsVsBestMono: 24910, dominant: true, status: "Déficit base" },
    { id: 4, name: "E4: $150k | San Fdo | Proteína", budget: 150000, milpCost: 165846, humanCost: 193562, improvementPct: 13.6, savingsVsBestMono: 24910, dominant: true, status: "Déficit base" },
    { id: 5, name: "E5: $220k | Granada | Balanceado", budget: 220000, milpCost: 144990, humanCost: 167232, improvementPct: 13.3, savingsVsBestMono: 20290, dominant: true, status: "Presupuesto Holgado" },
    { id: 6, name: "E6: $220k | Granada | Proteína", budget: 220000, milpCost: 144990, humanCost: 167232, improvementPct: 13.3, savingsVsBestMono: 20290, dominant: true, status: "Presupuesto Holgado" },
    { id: 7, name: "E7: $220k | San Fdo | Balanceado", budget: 220000, milpCost: 147121, humanCost: 169540, improvementPct: 13.2, savingsVsBestMono: 20290, dominant: true, status: "Presupuesto Holgado" },
    { id: 8, name: "E8: $220k | San Fdo | Proteína", budget: 220000, milpCost: 147121, humanCost: 169540, improvementPct: 13.2, savingsVsBestMono: 20290, dominant: true, status: "Presupuesto Holgado" },
    { id: 9, name: "E9: $280k | Granada | Balanceado", budget: 280000, milpCost: 144990, humanCost: 167232, improvementPct: 13.3, savingsVsBestMono: 20290, dominant: true, status: "Excedente de Caja" },
    { id: 10, name: "E10: $280k | Granada | Proteína", budget: 280000, milpCost: 144990, humanCost: 167232, improvementPct: 13.3, savingsVsBestMono: 20290, dominant: true, status: "Excedente de Caja" },
    { id: 11, name: "E11: $280k | San Fdo | Balanceado", budget: 280000, milpCost: 147121, humanCost: 169540, improvementPct: 13.2, savingsVsBestMono: 20290, dominant: true, status: "Excedente de Caja" },
    { id: 12, name: "E12: $280k | San Fdo | Proteína", budget: 280000, milpCost: 147121, humanCost: 169540, improvementPct: 13.2, savingsVsBestMono: 20290, dominant: true, status: "Excedente de Caja" }
  ]
};
