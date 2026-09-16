/**
 * Resumen Precomputado de la Batería Experimental V4-A y Telemetría del Solver
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
    generatedAt: "2026-09-15T05:15:00Z",
    comparisonStatus: "100% VALID_SYMMETRIC (12/12 escenarios auditados con scenarioFingerprint)"
  },
  metrics: {
    meanImprovementPct: 13.4,
    medianImprovementPct: 13.6,
    minImprovementPct: 13.1,
    maxImprovementPct: 13.8,
    dominanceRatePct: 100.0,
    paretoDominantCount: 12,
    runtime: {
      p50Ms: 0.24,
      p95Ms: 15.72,
      maxMs: 15.72
    }
  },
  solverTelemetry: {
    solverType: "Exact Separable MILP Enumerator / Branch & Bound",
    candidateVariables: 99,
    activeDecisionVariables: 93,
    integerVariables: 60,
    continuousVariables: 30,
    binaryVariables: 3,
    constraintsCount: 34,
    lpLowerBound: 0.6714,
    bestBound: 1.1669,
    relaxationGapPct: 42.46,
    optimalityGapPct: 0.00,
    isGlobalOptimum: true,
    numericalTolerance: 0.00001
  },
  sensitivityAnalysis: [
    { lambdaWaste: 0.2, solutionStability: 'Estable', storePair: 'Ara + Éxito', avgCostCOP: 163715, notes: 'Tolera mayor excedente perecedero' },
    { lambdaWaste: 0.5, solutionStability: 'Estable', storePair: 'Ara + Éxito', avgCostCOP: 163715, notes: 'Balance óptimo estándar' },
    { lambdaWaste: 0.9, solutionStability: 'Óptima (Base)', storePair: 'Ara + Éxito', avgCostCOP: 163715, notes: 'Penalización biológica rigurosa de referencia' },
    { lambdaWaste: 1.2, solutionStability: 'Estable', storePair: 'Ara + Éxito', avgCostCOP: 163715, notes: 'Aversión severa a pérdida' }
  ],
  wasteProbabilitySensitivity: [
    { wasteProbabilityHigh: 0.50, solutionId: 'ARA+EXITO', effectiveCost: 163715, expectedWaste: 6871, friction: 1531, futureInventory: 42422, solutionChanged: false, notes: 'Solución ultraestable: báscula continua en Éxito domina empaque sellado' },
    { wasteProbabilityHigh: 0.60, solutionId: 'ARA+EXITO', effectiveCost: 163715, expectedWaste: 7433, friction: 1531, futureInventory: 41860, solutionChanged: false, notes: 'Solución ultraestable: báscula continua en Éxito domina empaque sellado' },
    { wasteProbabilityHigh: 0.70, solutionId: 'ARA+EXITO', effectiveCost: 163715, expectedWaste: 7995, friction: 1531, futureInventory: 41298, solutionChanged: false, notes: 'Línea base calibrada: riesgo biológico estándar' },
    { wasteProbabilityHigh: 0.80, solutionId: 'ARA+EXITO', effectiveCost: 163715, expectedWaste: 8557, friction: 1531, futureInventory: 40736, solutionChanged: false, notes: 'Solución ultraestable: báscula continua en Éxito domina empaque sellado' },
    { wasteProbabilityHigh: 0.90, solutionId: 'ARA+EXITO', effectiveCost: 163715, expectedWaste: 9120, friction: 1531, futureInventory: 40173, solutionChanged: false, notes: 'Solución ultraestable: báscula continua en Éxito domina empaque sellado' }
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
  ],
  v4bFramework: {
    targetSample: "20 a 50 participantes responsables de compra en Cali",
    metricDimensions: [
      { name: "Desempeño Algorítmico (V4-A)", value: "+13.4% vs. Heurística Humana", type: "Experimental Computacional" },
      { name: "Aceptación Conductual (V4-B)", value: "Pendiente de trabajo de campo", type: "Empírico Observacional" },
      { name: "Market Readiness Index", formula: "AlgorithmicGain * AcceptanceRate", type: "Indicador Sintético Secundario" }
    ],
    frictionToleranceScale: ["$2.000 COP", "$5.000 COP", "$10.000 COP", "$15.000+ COP", "Nunca (Monotienda estricta)"]
  }
};

// Compatibilidad y alias unificados
EXPERIMENTAL_V4_SUMMARY.summary = {
  ...EXPERIMENTAL_V4_SUMMARY.metrics,
  dominancePct: EXPERIMENTAL_V4_SUMMARY.metrics?.dominanceRatePct || 100.0,
  runtime: EXPERIMENTAL_V4_SUMMARY.metrics?.runtime || { p50Ms: 0.24, p95Ms: 15.72, maxMs: 15.72 }
};

EXPERIMENTAL_V4_SUMMARY.scenarios = EXPERIMENTAL_V4_SUMMARY.scenarios.map(s => ({
  ...s,
  scenarioId: s.id,
  budgetCOP: s.budget,
  heuristicImprovementPct: s.improvementPct,
  milp: {
    effectiveCostCOP: s.milpCost,
    netSavingsVsBestMonoCOP: s.savingsVsBestMono
  },
  humanHeuristic: {
    effectiveCostCOP: s.humanCost
  }
}));
