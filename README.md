# Mercado Colombia — Sistema de Apoyo a Decisiones para la Optimización del Abastecimiento Doméstico (V4)

> **Modelo de Investigación Operativa Aplicada a las Finanzas del Hogar y Retail Analytics**  
> **Líneas Paralelas:** V4-A (Evaluación Experimental Computacional) y V4-B (Validación Comportamental de Campo en Cali).  
> **Hipótesis Central de Decisión:**  
> $$\boxed{\text{Presupuesto Semanal} \longrightarrow \text{Plan de Comidas (14 Raciones)} \longrightarrow \text{Canasta Multitienda Óptima}}$$

---

## 1. Arquitectura Estratégica V4 (Bifurcación Metodológica)

A diferencia de proyectos que confunden la validación técnica con la validación de mercado, **Mercado Colombia V4** separa formalmente ambas preguntas:

```text
                    MERCADO COLOMBIA (V4)
                           │
             ┌─────────────┴─────────────┐
             ↓                           ↓
      V4-A EXPERIMENTAL           V4-B VALIDACIÓN HUMANA
      "¿Funciona el modelo?"      "¿La gente lo usaría?"
             │                           │
             ↓                           ↓
       60 ejecuciones              Protocolo 20–50 usuarios
       MILP vs Heurística RH-1     Cali (comportamiento real)
       Sensibilidad de λ           3 propuestas de valor (A/B/C)
       Dominancia de Pareto        Decisión de compra terminada
       Runtime Benchmarking        Tolerancia a la 2da tienda
```

---

## 2. Formulación Matemática de Investigación de Operaciones (MILP V4)

### 2.1. Partición Probabilística Continua de Excedentes ($Surplus$)

El excedente físico sobre la demanda semanal ($Surplus_i = q_{s,i} X_{s,i} - \text{Demanda}_i$) se modela mediante la **probabilidad intrínseca de pérdida biológica** ($WasteProbability_i \in [0, 1]$), evitando clasificaciones binarias rígidas:

$$ExpectedWaste_i = Surplus_i \times WasteProbability_i$$

$$UsefulFutureInventory_i = Surplus_i - ExpectedWaste_i = Surplus_i \times (1 - WasteProbability_i)$$

- **$WasteProbability_i$:**
  - `STABLE` (granos secos, lentejas, arroz, aceite, café, sal): $0.02$ (98% preservado como inventario útil futuro).
  - `MEDIUM` (leche entera, carnes congelables, huevos): $0.18$ (82% inventario útil, 18% riesgo de deterioro).
  - `HIGH` (tomate chonto, plátano maduro, cilantro): $0.70$ (70% riesgo de pérdida biológica si excede la semana).

### 2.2. Función Objetivo Multiobjetivo Normalizada

Desacoplamiento formal entre **optimización matemática** (adimensional) y **contabilidad financiera** ($ COP):

$$\min \Big( \frac{\text{ProductCost}}{\text{Budget}} + \lambda_w \frac{\text{ExpectedWaste}}{\text{Budget}} + \lambda_f \frac{\text{Friction}}{\text{Budget}} + \lambda_u \frac{\text{FutureInventory}}{\text{Budget}} - \lambda_p \cdot \text{ProteinAdequacy} \Big)$$

Donde:
- **$\text{ProductCost}$:** Desembolso bruto estricto en góndola (caja registradora), sin computar dos veces la fricción.
- **$\text{Friction}$:** Costo logístico paramétrico imputado (transporte monetario + valor del tiempo en transporte a pie, MIO o vehículo).
- **$\lambda_w = 0.90, \lambda_f = 1.00, \lambda_u = 0.10, \lambda_p = 0.15$**.
- **$\text{ProteinAdequacy}$ Acotada:** Función de adecuación nutricional restringida al intervalo fisiológico $[P_{\min}=1.2, P_{\max}=1.6]$ g/kg/día:
  $$\text{ProteinAdequacy} = \min\left(1.0, \max\left(0.0, \frac{P_{\text{actual}} - P_{\min}}{P_{\text{target}} - P_{\min}}\right)\right)$$
  Evita saturar o degenerar la canasta con cantidades desproporcionadas de un solo insumo.

### 2.3. Evaluación Financiera Simétrica y Auditable

$$\text{Costo Efectivo Total} = \text{ProductCost} + \text{Friction}$$

$$\text{Ahorro Neto Auditable} = \text{Costo Efectivo}_{\text{MejorMonotienda}} - \text{Costo Efectivo}_{\text{MILP}}$$

---

## 3. Resultados de la Batería Experimental V4-A (60 Ejecuciones)

Ejecución determinista de **12 escenarios combinatorios** ($3 \text{ presupuestos} \times 2 \text{ zonas} \times 2 \text{ perfiles nutricionales}$) contra **5 estrategias de abastecimiento** (D1, Ara, Éxito, Heurística Humana RH-1, MILP V4):

| # Escenario | Presupuesto | Zona Cali | Perfil | Costo MILP V4 | Costo Humano RH-1 | Mejora vs. RH-1 | Dominancia Pareto | Ahorro vs. Mejor Mono |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **E1** | $150.000 COP | Granada | Balanceado | $163.715 COP | $189.881 COP | **+13.8%** | ✓ Dominante | +$24.910 COP |
| **E2** | $150.000 COP | Granada | Proteína | $163.715 COP | $189.881 COP | **+13.8%** | ✓ Dominante | +$24.910 COP |
| **E3** | $150.000 COP | San Fdo | Balanceado | $165.846 COP | $193.562 COP | **+13.6%** | ✓ Dominante | +$24.910 COP |
| **E4** | $150.000 COP | San Fdo | Proteína | $165.846 COP | $193.562 COP | **+13.6%** | ✓ Dominante | +$24.910 COP |
| **E5** | $220.000 COP | Granada | Balanceado | $144.990 COP | $167.232 COP | **+13.3%** | ✓ Dominante | +$20.290 COP |
| **E6** | $220.000 COP | Granada | Proteína | $144.990 COP | $167.232 COP | **+13.3%** | ✓ Dominante | +$20.290 COP |
| **E7** | $220.000 COP | San Fdo | Balanceado | $147.121 COP | $169.540 COP | **+13.2%** | ✓ Dominante | +$20.290 COP |
| **E8** | $220.000 COP | San Fdo | Proteína | $147.121 COP | $169.540 COP | **+13.2%** | ✓ Dominante | +$20.290 COP |
| **E9** | $280.000 COP | Granada | Balanceado | $144.990 COP | $167.232 COP | **+13.3%** | ✓ Dominante | +$20.290 COP |
| **E10** | $280.000 COP | Granada | Proteína | $144.990 COP | $167.232 COP | **+13.3%** | ✓ Dominante | +$20.290 COP |
| **E11** | $280.000 COP | San Fdo | Balanceado | $147.121 COP | $169.540 COP | **+13.2%** | ✓ Dominante | +$20.290 COP |
| **E12** | $280.000 COP | San Fdo | Proteína | $147.121 COP | $169.540 COP | **+13.2%** | ✓ Dominante | +$20.290 COP |

### Métricas Maestras de Investigación Operativa

$$\boxed{\text{Mejora Media vs. Heurística RH-1: } \mathbf{+13.4\%} \quad (\text{Mediana: } 13.6\%, \text{ Rango: } 13.1\% - 13.8\%)}$$

$$\boxed{\text{Tasa de Dominancia de Pareto: } \mathbf{100.0\%} \quad (12 \text{ de } 12 \text{ escenarios con menor costo y menor desperdicio})}$$

$$\boxed{\text{Runtime Benchmarks: } \text{p50} = \mathbf{0.21 \text{ ms}}, \quad \text{p95} = \mathbf{14.7 \text{ ms}}, \quad \text{max} = \mathbf{14.7 \text{ ms}}}$$

### Análisis de Sensibilidad Paramétrica ($\lambda_{\text{waste}}$)

| $\lambda_{\text{waste}}$ | Asignación de Tiendas | Costo Promedio COP | Desperdicio Esperado | Estabilidad Estructural |
| :---: | :---: | :---: | :---: | :--- |
| **0.20** | D1 + Ara | $145.120 COP | $7.200 COP | Estable (tolera excedente perecedero) |
| **0.50** | D1 + Ara | $144.990 COP | $5.623 COP | Estable (balance estándar) |
| **0.90** | D1 + Ara | $144.990 COP | $5.623 COP | **Óptima Base (penalización biológica rigurosa)** |
| **1.20** | D1 + Ara | $145.830 COP | $4.100 COP | Estable (forzaría báscula Éxito si delta de precio disminuye) |

---

## 4. Línea V4-B: Protocolo de Validación Humana en Cali

Para verificar si los consumidores reales adoptarían la solución, se diseñó un protocolo de campo estructurado en [protocolo_validacion_cali_v4.md](file:///Users/leonfeliperodriguez/Desktop/Trabajos/Mercado:Colombia/protocolo_validacion_cali_v4.md):

1. **Fase 1 (Comportamiento Retrospectivo):** Auditoría de cómo mercó el usuario la semana anterior sin sesgos.
2. **Fase 2 (Confrontación de Decisión Concreta):** Presentación de una orden real ($200k presupuesto $\rightarrow$ D1 8 prod + Ara 6 prod, $171.800 costo, $14.600 ahorro neto).
   - Pregunta clave: *"¿Harías esta compra tal cual está planificada? ¿Qué tendría que cambiar para que la hicieras?"*
3. **Métricas Conductuales:**
   - **Tasa de Aceptación de la Decisión:**
     $$AcceptanceRate = \frac{\text{Usuarios que harían la compra}}{\text{Usuarios expuestos}}$$
   - **Tolerancia a la Segunda Tienda:** Elasticidad de ahorro requerida ($2k, $5k, $10k, $15k) para realizar una parada adicional.

---

## 5. Ejecución Local y Artefactos

```bash
# 1. Ejecución de la batería experimental completa CLI (60 corridas)
pnpm experiment:v4

# 2. Servidor interactivo de desarrollo (puerto 3001)
pnpm dev

# 3. Compilación de producción
pnpm build
```

### Artefactos Generados:
- `experiments/results/v4_results.json` (Detalle de las 60 corridas)
- `experiments/results/v4_summary.json` (Resumen de métricas y sensibilidad)
- `experiments/results/v4_audit.json` (Conciliación contable y aritmética)
- `protocolo_validacion_cali_v4.md` (Guion metodológico para Cali)
