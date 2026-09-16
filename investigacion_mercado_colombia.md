# Tesis Estratégica: Sistema de Apoyo a Decisiones para la Optimización del Abastecimiento Doméstico (Colombia) - V4

> **Resumen Ejecutivo:** Formalización del roadmap estratégico bifurcado en dos líneas: **V4-A (Evaluación Experimental Computacional)** y **V4-B (Validación Comportamental de Campo en Cali)**.  
> **Hipótesis Central de Negocio:**  
> $$\boxed{\text{Presupuesto Semanal} \longrightarrow \text{Plan de Comidas (14 Raciones)} \longrightarrow \text{Canasta Multitienda Óptima}}$$
> **Diferenciación Estructural:** Mientras los comparadores locales (Beeep, Price It, MercApp) resuelven la pregunta pasiva *"¿dónde está más barato este producto?"*, Mercado Colombia resuelve la **decisión de compra completa**: *"Tengo $200.000 COP para esta semana en Cali y somos 2 personas: ¿qué compramos, qué cocinamos y en qué tiendas optimizamos para que la plata alcance sin desperdiciar?"*.

---

## 1. Reevaluación Estratégica y Calificación

| Criterio | Puntuación (1-10) | Justificación Estratégica |
| :--- | :---: | :--- |
| **Intensidad del Dolor** | **9/10** | Impacta directamente el bolsillo y la inflación de alimentos en los hogares colombianos. |
| **Frecuencia** | **10/10** | Hábito recurrente semanal de abastecimiento. |
| **Tamaño de Mercado (CO)** | **9/10** | D1 ($21,6B COP), Éxito ($16,9B COP en Colombia) y Ara (€3.228M). |
| **Evidencia de Mercado** | **10/10** | Existencia de comparadores locales con tracción y productos globales monetizando planificación presupuestal (EatCheap a US$9.99/mes, Carby, Cestio). |
| **Disposición a Pagar (WTP)** | **8/10** | Modelo Freemium validable: Gratis (Menú + Lista) y Premium ($9.900–$14.900 COP/mes) para la optimización multitienda que garantiza retorno de inversión. |
| **Facilidad de Ejecución / MVP** | **7/10** | Mantener datos actualizados por ciudad/tienda/presentación es el principal cuello de botella operativo. |
| **Defendibilidad / Moat** | **9/10** | El moat no es un generador de recetas con IA; es la base de datos de precios, presentaciones comerciales, empaques, recetas colombianas y el motor de optimización matemática determinista. |
| **Puntuación Global** | **86 / 100** | **Potencial de Negocio: 90/100** \| **Facilidad de MVP: 72/100** |

---

## 2. Los 3 Niveles de Evaluación del Éxito

1. **Nivel 1 (Algorítmico):**  
   $$C_{\text{MILP}} < C_{\text{RH-1}}$$  
   Validado computacionalmente en la Batería V4-A: **+13.4% de mejora media** frente a la heurística humana en los 12 escenarios experimentales.
2. **Nivel 2 (Operacional):**  
   El ahorro neto en caja supera holgadamente la fricción logística de desplazamiento ($F$) y el costo en tiempo de visitar una segunda tienda.
3. **Nivel 3 (Comportamental / Usuario):**  
   El hogar caleño adopta la recomendación y manifiesta: *"Esto me quita la fatiga mental de pensar qué cocinar y la angustia de no saber si la plata alcanzará en la caja registradora."* (En validación mediante la Línea V4-B).

---

## 3. Matriz de Diferenciación Competitiva

| Atributo | Comparadores CO (Beeep, Price It) | Apps Globales (EatCheap, Carby) | Mercado Colombia (V4) |
| :--- | :---: | :---: | :---: |
| **Precios reales en Colombia** | Sí (D1, Ara, Éxito) | No / Genéricos internacionales | **Sí (Normalizados en Cali)** |
| **Formato de empaque discreto vs báscula** | No (solo comparan precio nominal) | No | **Sí (`FIXED_PACK` vs `EXACT_WEIGHT`)** |
| **Fricción logística paramétrica** | No | No | **Sí (Peatonal, MIO, Vehículo)** |
| **Planificación de menú acoplada a canasta** | No | Sí (pero sin tiendas colombianas) | **Sí (14 comidas tradicionales)** |
| **Optimización multitienda auditable** | No | No | **Sí (MILP con Ahorro Neto Estimado explícito)** |

---

## 4. Resultados de la Batería V4-A (60 Corridas)

- **12 Escenarios Combinatorios:** 3 Presupuestos ($150k, $220k, $280k) $\times$ 2 Zonas (Granada, San Fernando) $\times$ 2 Perfiles (Balanceado, Alta Proteína).
- **Métricas Clave:**
  - Mejora Media: **+13.4%** (Mediana: **13.6%**, Rango: **13.1% – 13.8%**).
  - Tasa de Dominancia de Pareto: **100.0%** (12 de 12 escenarios dominados en costo y desperdicio biológico).
  - Runtime: **p50 = 0.21 ms**, **p95 = 14.67 ms**.
  - Estabilidad de Ponderadores: La asignación óptima D1 + Ara es invariante para $\lambda_{\text{waste}} \in [0.2, 1.2]$.

---

## 5. Diseño de Campo V4-B (Santiago de Cali)

- **Declaración Oficial:** Mercado Colombia V4-B está funcionalmente congelado y preparado para validación conductual en compradores responsables de compra en Cali.
- **Muestra:** 20 a 50 participantes responsables de la compra del hogar en Cali.
- **Enfoque Conductual Desacoplado:** Evaluación ortogonal de Comprensión (explicabilidad de empaque), Aceptación (trade-off simétrico neutral de segunda parada) y Ejecución (chequeo de lista y reporte de compra declarada).
- **Ficha Concreta de Confrontación (V4-B):** Presupuesto base $220.000 COP $\rightarrow$ Desembolso en caja $163.715 COP (Ara 19 líneas $96.350 COP + Éxito 11 líneas $65.834 COP), Fricción logística estimada $1.531 COP, Costo efectivo estimado $165.246 COP, Ahorro neto estimado +$24.910 COP frente a Ara monotienda ($188.625 COP).
- **Taxonomía de Variables:**
  - Métricas Primarias: `SecondStoreAcceptance`, `RecommendationAcceptance`, `PurchaseReported`.
  - Métricas Secundarias: `ExplanationOpened`, `ChecklistStarted`, `ChecklistCompleted`, `WhatsAppCopied`, `TimeToDecision`.
  - Variables Descriptivas: `householdSize`, `weeklyBudget`, `mainStore`, `shoppingFrequency`, `transportMode`.
- **Directriz de Reporte:** Magnitud muestral obligatoria con intervalo de confianza Wilson al 95%: $n \mid x/n \mid \hat{p}\% \mid \text{IC } 95\%$.
- **Guion Metodológico:** Disponible en [`protocolo_validacion_cali_v4.md`](protocolo_validacion_cali_v4.md).
