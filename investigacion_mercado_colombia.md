# Tesis Estratégica: Optimizador de Mercado y Menú Semanal (Colombia) - V2

> **Resumen Ejecutivo:** Transición de un *Meal Planner* genérico global a un **Optimizador de Mercado y Menú Presupuestal para Hogares Colombianos**.  
> **Problema Central:** "Tengo un presupuesto semanal fijo para alimentación (ej. $150.000 - $300.000 COP) y no sé qué comprar ni qué cocinar para que la plata me alcance sin desperdiciar comida ni atrapar liquidez innecesaria".

---

## 1. Calificación y Viabilidad Revisada de la Oportunidad

| Criterio | Puntuación (1-10) | Justificación Estratégica |
| :--- | :---: | :--- |
| **Intensidad del Dolor** | **9/10** | Toca directamente el bolsillo y la inflación de alimentos en Colombia. |
| **Frecuencia** | **10/10** | Decisión recurrente semanal (hacer mercado viernes/sábado/domingo). |
| **Tamaño de Mercado (CO)** | **9/10** | D1 (~$21,6B COP), Éxito (~$16,9B COP en Colombia sobre $22B consolidado) y Ara (€3.228M). |
| **Evidencia de Mercado** | **10/10** | Tracción probada de comparadores locales (*Beeep*, *Price It*) y planners de presupuesto (*Carby*, *EatCheap*). |
| **Disposición a Pagar (WTP)** | **8/10** | Defendible vía modelo *Freemium* ($9.900 - $14.900 COP/mes) si el ahorro neto generado supera los $25.000 COP/mes. |
| **Factibilidad de MVP** | **8/10** | Se acota a un experimento científico controlado de 35 SKUs en Cali. |
| **Defendibilidad / Moat** | **9/10** | La ventaja no es el LLM, sino la base de datos normalizada de SKUs colombianos, el algoritmo de optimización de canasta y el motor de explicabilidad. |
| **Puntuación Global** | **88 / 100** | **Potencial Negocio: 90/100** \| **Rigor Científico de Ejecución: 85/100** |

---

## 2. Los 5 Principios Operativos del Retail Colombiano Resueltos

1. **Formato de Empaque como Propiedad del SKU $\times$ Tienda:**  
   `packagingType` (`EXACT_WEIGHT`, `FIXED_PACK`, `UNIT`) modela con exactitud si un producto se pesa por gramo continuo en báscula (Éxito) o si exige bolsa/malla cerrada obligatoria (D1/Ara).
2. **Fricción Logística Paramétrica:**  
   $$F = \text{transport\_cost} + \text{time\_cost} + \text{detour\_cost}$$
   Permite al usuario indicar si se desplaza a pie, en transporte público (MIO), en vehículo particular o pide a domicilio.
3. **Auditoría Rigurosa de Capital:**  
   $$\text{Excedente} \neq \text{Desperdicio} \neq \text{Capital Atrapado}$$
   Diferenciación entre *Inventario Útil Futuro* (arroz, lentejas, sal, aceite) y *Riesgo de Desperdicio* (tomate, cilantro, aguacate).
4. **Motor de Explicabilidad ("Explainability Layer"):**  
   Cada asignación se justifica cuantitativamente ante el usuario (ej. *"Báscula exacta evita pagar empaque cerrado de 2 kg"*).
5. **Auditoría de Confianza de Catálogo:**  
   Puntuación de confianza porcentual por SKU basada en fecha de observación, fuente y disponibilidad en góndola.

---

## 3. Protocolo del Experimento Científico de Validación

En lugar de construir un catálogo masivo prematuro, el sistema se somete a validación experimental:
- **Población Objetivo:** Hogares de 2 personas en Cali (Clúster Granada/Versalles y San Fernando).
- **Tratamientos Comparativos:**
  1. Compra Monotienda D1.
  2. Compra Monotienda Éxito.
  3. Comparador Pasivo Humano ($/kg).
  4. Asignación Óptima Mercado Colombia MILP V2.
- **Hipótesis a Comprobar:** El sistema MILP V2 genera un desembolso en caja significativamente menor ($>12\%$) y reduce el capital atrapado en perecederos frente al comportamiento humano promedio.
