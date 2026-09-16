# Mercado Colombia — Asistente de Decisión y Optimización del Abastecimiento Doméstico (V4-B)

> **Declaración Oficial del Sistema:**  
> **«Mercado Colombia V4-B está funcionalmente congelado y preparado para validación conductual en compradores responsables de compra en Cali.»**  
>  
> **Líneas del Proyecto:**  
> - **V4-A (Evaluación Experimental Computacional):** Evidencia formal completada (12 escenarios, 60 ejecuciones, gap Branch & Bound 0.00%, Pareto 12/12).  
> - **V4-B (Validación Conductual de Campo en Cali):** Instrumentación empírica desacoplada y protocolo de registro pseudonimizado listo para trabajo de campo.  
>  
> **Hipótesis Central de Decisión:**  
> $$\boxed{\text{Presupuesto Semanal} \longrightarrow \text{Plan de Menú (14 Raciones)} \longrightarrow \text{Asignación Óptima según el Modelo (Multitienda / Monotienda)}}$$

---

## 1. Arquitectura de Doble Modo (Consumo vs. Laboratorio DSS)

El sistema implementa una separación arquitectónica estricta entre la **experiencia cotidiana de compra** y la **consola de investigación de operaciones**:

```text
                                MERCADO COLOMBIA (V4-B)
                                           │
             ┌─────────────────────────────┴─────────────────────────────┐
             ↓                                                           ↓
      MODO COMPRA (Consumidor)                                    MODO ANÁLISIS (Laboratorio DSS)
      "¿Qué compro? ¿Dónde? ¿Cuánto?"                            "¿Cómo funciona? ¿Qué tan óptimo y robusto?"
             │                                                           │
   ┌─────────┼──────────┬──────────┐                           ┌─────────┼──────────┬──────────┐
   ↓         ↓          ↓          ↓                           ↓         ↓          ↓          ↓
Mi mercado  Compra   Comparar   ¿Por qué?                  Variables  Cotas/Gaps  Pareto   Sensibilidad
(Decisión) (Checklist) (Matriz) (Explicación)              (93 en MILP) (B&B 0%) (12/12)   (\lambda_{waste})
```

---

## 2. Modo Compra: Experiencia de Abastecimiento Operativa

Diseñado bajo estándares de diseño moderno y optimización táctil móvil (*Mobile-first*), organiza la toma de decisión en 5 vistas sin sobrecarga cognitiva:

1. **Mi mercado (Panel de Decisión):**
   - **Hero Banner:** Muestra el desembolso en caja ($163.715 COP), el **Ahorro neto estimado** (+$24.910 COP), tiendas asignadas (Ara y Éxito), líneas de compra (30) y tiempo estimado (~18 min).
   - **Trade-off Simétrico de Segunda Parada:** Pregunta neutral con opciones de peso visual equivalente para reducir sesgos de presentación en la medición conductual:
     ```text
     ¿Vale la pena hacer una segunda parada?
     Ahorras $24.910 visitando dos tiendas (+ ~18 min de recorrido).

     [ Hacer 2 compras (Ahorras $24.910) ]      [ Comprar todo en 1 tienda (Ara) ]
     ```
   - **Decisiones Determinantes:** Explicabilidad en lenguaje común de asignaciones clave (papa en Éxito por báscula, huevos en Ara por bandeja económica, arroz en D1).
2. **Compra (Checklist Operativo por Pasillo):**
   - Agrupación por parada física: **Parada 1: Tiendas Ara** (19 líneas · $96.350 COP) y **Parada 2: Grupo Éxito** (11 líneas · $65.834 COP).
   - Diferenciación explícita entre empaque cerrado y **báscula continua** (ej. *Éxito: 1.2 kg de papa exacta para recetas*).
   - Exportación limpia y estructurada para mensajería (WhatsApp).
   - **Doble Estado de Ejecución:** Distingue `checklistCompleted: true` (100% de la lista marcada en el supermercado) de `purchaseReported: true` (*"Informar compra efectuada"* declarada por el participante con método y timestamp).
3. **Comparar (Costo Efectivo Transparente):**
   - Matriz comparativa estilo WiseList/Tallo: Canasta Óptima Híbrida ($163.715) vs. Ara ($188.625) vs. D1 ($199.395) vs. Éxito ($208.516).
   - Desglose auditable:
     $$\text{Desembolso en Cajas (Góndola)} + \text{Fricción Logística Estimada (Desplazamiento)} = \text{Costo Efectivo Estimado}$$
4. **¿Por qué? (Explicabilidad Humana):**
   - Justificación producto por producto del por qué se eligió cada tienda, vinculando el gramaje de la receta con la presentación comercial.
5. **Historial & Despensa:**
   - Registro de compras anteriores y seguimiento del **Inventario remanente estimado** para ciclos futuros.

---

## 3. Modo Análisis: Laboratorio DSS y Rigor Matemático

El **Laboratorio V4** expone la telemetría dinámica completa del solver y la auditoría de investigación de operaciones:

### 3.1. Formulación Matemática del Modelo MILP V4

#### A. Partición Probabilística de Excedentes ($Surplus$)
Evita clasificaciones rígidas mediante el riesgo biológico intrínseco ($WasteProbability_i \in [0, 1]$):
$$ExpectedWaste_i = Surplus_i \times WasteProbability_i$$
$$UsefulFutureInventory_i = Surplus_i \times (1 - WasteProbability_i)$$
- **STABLE** (arroz, sal, lentejas, aceite): $p = 0.02$ (98% preservado como inventario útil).
- **MEDIUM** (leche, huevos, carnes congelables): $p = 0.18$.
- **HIGH** (tomate chonto, plátano maduro, hierbas): $p = 0.70$ (alto riesgo si supera la semana).

#### B. Función Objetivo Multiobjetivo Normalizada
Desacoplamiento formal entre optimización adimensional y contabilidad financiera ($ COP):
$$\min \left( \frac{\text{ProductCost}}{\text{Budget}} + \lambda_w \frac{\text{ExpectedWaste}}{\text{Budget}} + \lambda_f \frac{\text{Friction}}{\text{Budget}} + \lambda_u \frac{\text{FutureInventory}}{\text{Budget}} - \lambda_p \cdot \text{ProteinAdequacy} \right)$$

Parámetros calibrados: $\lambda_w = 0.90, \lambda_f = 1.00, \lambda_u = 0.10, \lambda_p = 0.15$.

Adecuación proteica acotada al intervalo fisiológico $[P_{\min}=1.2, P_{\max}=1.6]$ g/kg/día:
$$\text{ProteinAdequacy} = \min\left(1.0, \max\left(0.0, \frac{P_{\text{actual}} - P_{\min}}{P_{\text{target}} - P_{\min}}\right)\right)$$

---

## 4. Trazabilidad Formal de Cesta y Auditoría de Restricciones

### 4.1. Trazabilidad de la Canasta Familiar
Para evitar confusiones entre necesidades de recetas y presentaciones comerciales, el sistema formaliza tres niveles:

$$\text{Ingrediente Requerido} \longrightarrow \text{Requerimiento Nutricional} \longrightarrow \text{Asignación de SKU y Modalidad}$$

```text
Ingrediente Requerido: Papa Pastusa
├── Requerimiento del Menú Semanal: 1.200 g
└── Asignación Modelo: Éxito · 1.2 kg · Venta continua por báscula ($5.160 COP)

Ingrediente Requerido: Sal Refinada
├── Requerimiento del Menú Semanal: 200 g
└── Asignación Modelo: D1 · 1 paquete cerrado · 1.000 g ($1.850 COP, 800 g remanente estimado)
```

- **14 Ingredientes Requeridos:** Insumos culinarios para 14 comidas semanales completas (2 personas).
- **30 Líneas de Compra (SKUs):** Opciones asignadas en la solución óptima (19 en Ara, 11 en Éxito).
- **Unidades / Gramos:** Cantidades exactas en báscula continua o paquetes discretos cerrados.

### 4.2. Desglose Auditable de Restricciones (30 / 33 Coberturas)

La telemetría del solver calcula dinámicamente las restricciones sin cifras rígidas en código:

```text
Catálogo Canónico del Sistema: 37 Restricciones Totales
├── Cobertura de SKUs Canónicos: 33
├── Presupuesto Global Semanal: 1
└── Activación de Costo Fijo por Tienda (D1, Ara, Éxito): 3

Instancia de Menú Resuelta: 34 Restricciones Activas
├── Cobertura Considerada en la Instancia: 30 / 33
│   ├── 30 SKUs demandados activamente por las recetas de la semana (RHS > 0)
│   └── 3 SKUs canónicos restantes no requeridos en este menú (RHS = 0, no vinculantes)
├── Presupuesto Máximo Disponible: 1
└── Activación de Tiendas: 3
```

---

## 5. Resultados de la Batería Experimental V4-A (60 Ejecuciones)

Ejecución determinista de **12 escenarios combinatorios** ($3 \text{ presupuestos} \times 2 \text{ zonas de Cali} \times 2 \text{ perfiles nutricionales}$) frente a 5 estrategias de abastecimiento:

| # Escenario | Presupuesto | Zona Cali | Perfil | Costo MILP V4 | Costo Humano RH-1 | Mejora % vs RH-1 | Dominancia Pareto | Ahorro Neto Estimado |
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

### Métricas Maestras de Optimización:
- **Mejora Media frente a Heurística RH-1:** $\mathbf{+13.4\%}$ ($\sigma = 0.27\%$, $\text{CV} = 2.01\%$, rango $13.1\% - 13.8\%$).
- **Tasa de Dominancia de Pareto:** $\mathbf{100.0\%}$ (12/12 escenarios dominantes en menor costo y menor desperdicio).
- **Optimalidad Global Demostrada:** Gap de relajación lineal inicial del $42.46\%$ reducido a un **gap final de Branch & Bound de $0.00\%$** (tolerancia $10^{-5}$).
- **Distancia al Segundo Mejor Vector:** $\Delta_{\text{2nd}} = +0.0659$ ($+5.65\%$ sobre la combinación runner-up D1 + Éxito).
- **Latencia de Solución:** $\text{p50} = 0.21\text{ ms}, \; \text{p95} = 14.7\text{ ms}$.

---

## 6. Validación Conductual de Campo (Línea V4-B en Cali)

El protocolo de campo se encuentra detallado en [`protocolo_validacion_cali_v4.md`](protocolo_validacion_cali_v4.md).

### 6.1. Protocolo de Registro y Pseudonimización
- **Código Pseudónimo:** Identificador unívoco del participante (`participantId: CALI-SUB-01`).
- **Sin Datos Personales:** El dataset experimental no almacena nombres, números de identificación, direcciones privadas ni medios de pago.
- **Instrumentación Conductual:** Registro de decisiones intermedias (apertura de explicación, copia a WhatsApp, inicio de checklist, completitud y reporte).

### 6.2. Taxonomía de Métricas de Validación Humana
1. **Métricas Primarias:**
   - `SecondStoreAcceptance`: Aceptación declarada de la segunda tienda ante el trade-off simétrico.
   - `RecommendationAcceptance`: Elección de la canasta híbrida sugerida frente a monotienda.
   - `PurchaseReported`: Confirmación declarada por el participante de haber ejecutado la compra (`purchaseReportMethod: "participant_confirmation"`).
2. **Métricas Secundarias:**
   - `ExplanationOpened`, `ChecklistStarted`, `ChecklistCompleted`, `WhatsAppCopied`, `TimeToDecision`.
3. **Variables Descriptivas:**
   - `householdSize`, `weeklyBudget`, `mainStore`, `shoppingFrequency`, `transportMode`.

### 6.3. Directriz de Reporte Estadístico: Magnitud de Evidencia
Todo reporte de resultados de campo presentará conjuntamente:
$$\text{Soporte Muestral } (n) \quad \mid \quad \text{Casos } (x/n) \quad \mid \quad \text{Proporción } (\hat{p}\%) \quad \mid \quad \text{IC 95\% (Wilson Score)}$$

### 6.4. Tratamiento del Inventario Remanente (Hipótesis V5)
El excedente de empaque no se computa como ahorro realizado inmediato, sino como **Inventario remanente estimado**, sujeto a la ecuación de balance con merma biológica:
$$\text{Inventory}_{t+1,i} = \text{Inventory}_{t,i} + \text{Purchases}_{t,i} - \text{Consumption}_{t,i} - \text{Spoilage}_{t,i}$$

---

## 7. Pila Tecnológica y Ejecución Local

- **Frontend & Lógica:** React 19, JavaScript ES Modules, Lucide React.
- **Estilos:** Vanilla CSS con variables de diseño, temas Dark/Light y layouts adaptados a dispositivos móviles.
- **Servidor y Build:** Vite 6.

### Comandos de Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor interactivo de desarrollo (puerto 3000)
npm run dev

# 3. Validar compilación de producción
npm run build

# 4. Ejecutar batería experimental de laboratorio (CLI)
node experiments/run_v4_experiment.js
```

---

## 8. Licencia y Cita Académica

Proyecto de investigación académica en Sistemas de Apoyo a Decisiones (DSS) e Investigación de Operaciones aplicada al abastecimiento minorista en Colombia.  
Desarrollado en Santiago de Cali, Colombia.
