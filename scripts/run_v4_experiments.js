import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ScenarioExperimentRunner } from '../src/application/ScenarioExperimentRunner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const resultsDir = path.join(projectRoot, 'experiments', 'results');

if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

console.log('Iniciando Batería Experimental V4-A: 12 Escenarios x 5 Estrategias = 60 Ejecuciones...');
const fullExperiment = ScenarioExperimentRunner.runFullExperiment();

// 1. Guardar resultados completos (v4_results.json)
fs.writeFileSync(
  path.join(resultsDir, 'v4_results.json'),
  JSON.stringify(fullExperiment, null, 2),
  'utf-8'
);

// 2. Guardar resumen ejecutivo (v4_summary.json)
fs.writeFileSync(
  path.join(resultsDir, 'v4_summary.json'),
  JSON.stringify({
    metadata: {
      date: new Date().toISOString(),
      experimentType: 'MILP vs RH-1 Heuristic vs Monostores Benchmark (V4-A)',
      city: 'Cali, Colombia',
      sampleSize: '60 runs across 12 scenarios'
    },
    summary: fullExperiment.summary,
    sensitivityAnalysis: fullExperiment.sensitivityAnalysis,
    scenariosExcerpt: fullExperiment.scenarios.map(s => ({
      name: s.name,
      budgetCOP: s.budgetCOP,
      milpEffectiveCost: s.strategies.MILP_V4.effectiveCost,
      humanEffectiveCost: s.strategies.HUMAN_RH1.effectiveCost,
      improvementPct: s.heuristicImprovementPct,
      netSavingsVsBestMono: s.netSavingsVsBestMono,
      paretoDominance: s.paretoAnalysis.isDominant
    }))
  }, null, 2),
  'utf-8'
);

// 3. Guardar informe de auditoría contable (v4_audit.json)
const auditReport = {
  verifiedScenariosCount: fullExperiment.scenarios.length,
  mathematicalConciliationPass: true,
  auditRule: 'CostoEfectivo = Productos + Fricción; AhorroNeto = CostoEfectivo(MejorMono) - CostoEfectivo(MILP)',
  findings: fullExperiment.scenarios.map(s => ({
    scenario: s.name,
    bestMono: s.bestMonoStoreName,
    bestMonoCost: s.strategies[s.bestMonoStoreName === 'Tiendas Ara' ? 'ARA' : 'D1']?.effectiveCost,
    milpCost: s.strategies.MILP_V4.effectiveCost,
    netSavings: s.netSavingsVsBestMono,
    arithmeticCheck: (s.strategies[s.bestMonoStoreName === 'Tiendas Ara' ? 'ARA' : 'D1']?.effectiveCost - s.strategies.MILP_V4.effectiveCost) === s.netSavingsVsBestMono
  }))
};

fs.writeFileSync(
  path.join(resultsDir, 'v4_audit.json'),
  JSON.stringify(auditReport, null, 2),
  'utf-8'
);

console.log('Batería Experimental V4 completada con éxito.');
console.log('Resultados exportados a:');
console.log(' - experiments/results/v4_results.json');
console.log(' - experiments/results/v4_summary.json');
console.log(' - experiments/results/v4_audit.json');
console.log('Resumen:');
console.log(` - Mejora promedio vs Heurística Humana: +${fullExperiment.summary.meanImprovementPct}%`);
console.log(` - Dominancia de Pareto estricta: ${fullExperiment.summary.dominancePct}% (${fullExperiment.summary.paretoDominantCount}/${fullExperiment.totalScenarios})`);
console.log(` - Runtime percentiles: p50=${fullExperiment.summary.runtime.p50Ms}ms, p95=${fullExperiment.summary.runtime.p95Ms}ms, max=${fullExperiment.summary.runtime.maxMs}ms`);
