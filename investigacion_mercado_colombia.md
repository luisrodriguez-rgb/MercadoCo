# Tesis Estratégica: Sistema de Apoyo a Decisiones para la Optimización del Abastecimiento Doméstico (Colombia) - V3

> **Resumen Ejecutivo:** Formalización analítica como **Sistema de Apoyo a Decisiones (DSS) para la Optimización del Abastecimiento Doméstico bajo restricciones de presupuesto, empaquetamiento, disponibilidad, nutrición y fricción logística**.  
> **Problema Central:** Resolver la asignación multicanal de compras en supermercados colombianos (**D1, Ara, Éxito**), minimizando el desembolso real en efectivo (*cash outlay*), sujeto a presentaciones físicas indivisibles, báscula continua en hortalizas, fricción logística paramétrica y preservación de inventario útil vs. riesgo biológico de desperdicio.

---

## 1. Calificación y Viabilidad Revisada de la Oportunidad

| Criterio | Puntuación (1-10) | Justificación Estratégica |
| :--- | :---: | :--- |
| **Investigación de Operaciones** | **9/10** | Variables discretas y continuas, restricciones físicas reales, problema multitienda, función objetivo multiobjetivo con $\lambda$, simetría contable, benchmark contra heurística humana y explicabilidad. |
| **Calidad del Modelo Matemático** | **8.5/10** | $Surplus_i = UsefulFutureInventory_i + ExpectedWaste_i + ImmediateOverbuy_i$. Trata el inventario útil como activo del hogar y penaliza severamente el desperdicio. |
| **Intensidad del Dolor** | **9/10** | Impacto directo en la liquidez y la inflación de alimentos de los hogares colombianos. |
| **Frecuencia** | **10/10** | Decisión recurrente semanal de abastecimiento en punto de venta físico o digital. |
| **Tamaño de Mercado (CO)** | **9/10** | Cifras homogéneas 2025: D1 ($21,6B COP), Éxito ($16,9B COP en Colombia) y Ara (€3.228M). |
| **Evidencia de Mercado** | **10/10** | Tracción probada de comparadores de precios (*Beeep*, *Price It*) y herramientas de presupuesto. |
| **Disposición a Pagar (WTP)** | **8/10** | Sostenible vía modelo *Freemium* ($9.900 - $14.900 COP/mes) con retorno de inversión comprobable en la primera compra. |
| **Factibilidad de Validación** | **9/10** | Acotado a un diseño experimental controlado de 35 SKUs y 14 servicios en Cali. |

---

## 2. Los 7 Principios de Investigación Operativa Aplicada

1. **Formato de Empaque por SKU $\times$ Tienda:**  
   `packagingType` (`EXACT_WEIGHT`, `FIXED_PACK`, `UNIT`) modela con exactitud si un producto se pesa por gramo continuo en báscula (Éxito) o si exige bolsa/malla cerrada obligatoria (D1/Ara).
2. **Fricción Logística Paramétrica Simétrica:**  
   $$F = \text{transport\_cost} + \text{time\_cost} + \text{detour\_cost}$$
   Cálculo simétrico de desplazamiento tanto para monotiendas ($F_1$) como para la ruta híbrida ($F_{\text{multi}}$).
3. **Reforma Matemática de Excedentes:**  
   $$Surplus_i = UsefulFutureInventory_i + ExpectedWaste_i + ImmediateOverbuy_i$$
   El arroz, aceite o lentejas sobrantes son **activo almacenable**, mientras que el perecedero sobrante es **riesgo de pérdida biológica**.
4. **Función Objetivo Multiobjetivo:**  
   $$\min \left( \text{CashOutlay} + \lambda_1 \text{ExpectedWaste} + \lambda_2 \text{ImmediateOverbuy} + \lambda_3 \text{Friction} - \lambda_5 \text{ProteinAdequacy} \right)$$
5. **Adecuación Nutricional Ponderada sin Degeneración:**  
   La preferencia de "Alta Proteína" premia cumplir y superar el rango recomendado (1.2 a 1.6 g/kg/día) sin distorsionar la variedad ni forzar compras absurdas de un solo producto.
6. **Contabilidad Simétrica y Ahorro Auditable con Calculadora:**  
   $$\text{Ahorro Neto} = \text{CostoEfectivo(Mejor Monotienda)} - \text{CostoEfectivo(Híbrido)}$$
7. **Descomposición Visual Presupuestal (Waterfall):**  
   Ruta transparente de liquidez: Presupuesto $\rightarrow$ Compras en Góndola $\rightarrow$ Fricción Logística $\rightarrow$ Caja Libre Remanente.

---

## 3. Protocolo Experimental y Brecha de Optimalidad (*Optimality Gap*)

- **Población Objetivo:** Hogares de 2 personas en Cali (Clúster comercial Granada / Versalles).
- **Tratamientos Comparativos:**
  1. Monotienda D1.
  2. Monotienda Ara.
  3. Monotienda Éxito.
  4. Heurística Humana Razonable (comprador informado que visita 2 tiendas pero no optimiza empaques ni combinatoria global).
  5. MILP Mercado Colombia (V3).
- **Métrica de Eficiencia Analítica:**
  $$\text{OptimalityGap} = \frac{\text{CostoHeurística} - \text{CostoMILP}}{\text{CostoHeurística}} \times 100\%$$
- **Resultado Experimental:** El modelo MILP alcanza una ventaja de **8,86%** en ahorro efectivo frente a la heurística humana y más de **13,5%** frente a la mejor monotienda aislada, cumpliendo el 100% de las restricciones alimentarias.
