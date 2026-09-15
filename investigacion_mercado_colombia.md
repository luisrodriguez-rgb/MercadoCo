# Tesis Estratégica: Optimizador de Mercado y Menú Semanal (Colombia)

> **Resumen Ejecutivo:** Transición de un *Meal Planner* genérico global a un **Optimizador de Mercado y Menú Presupuestal para Hogares Colombianos**.  
> **Problema Central:** "Tengo un presupuesto semanal fijo para alimentación (ej. $150.000 - $300.000 COP) y no sé qué comprar ni qué cocinar para que la plata me alcance sin desperdiciar comida".

---

## 1. Calificación y Viabilidad Revisada de la Oportunidad

| Criterio | Puntuación (1-10) | Justificación Estratégica |
| :--- | :---: | :--- |
| **Intensidad del Dolor** | **9/10** | Toca directamente el bolsillo y la inflación de alimentos en Colombia. |
| **Frecuencia** | **10/10** | Decisión recurrente semanal (hacer mercado viernes/sábado/domingo). |
| **Tamaño de Mercado (CO)** | **9/10** | D1 + Éxito + Ara mueven más de $54 billones anuales en conjunto. |
| **Evidencia de Mercado** | **10/10** | Tracción probada de comparadores locales (*Beeep*, *Price It*) y planners de presupuesto (*Carby*, *EatCheap*). |
| **Disposición a Pagar (WTP)** | **8/10** | Defendible vía modelo *Freemium* ($9.900 - $14.900 COP/mes) si el ahorro neto generado supera los $25.000 COP/mes. |
| **Factibilidad de MVP** | **7/10** | Generar recetas es trivial; el reto real es la curaduría y vigencia de precios por ciudad/tienda. |
| **Defendibilidad / Moat** | **9/10** | La ventaja no es el LLM, sino la base de datos normalizada de SKUs colombianos y el algoritmo de optimización de canasta. |
| **Puntuación Global** | **86 / 100** | **Potencial Negocio: 90/100** \| **Facilidad de Ejecución: 72/100** |

---

## 2. Mapa Competitivo: Por qué la Oportunidad Sigue Abierta

```
                       [ Enfoque en Recetas / Menú ]
                                     ▲
                                     │   * Carby / Cestio / EatCheap
                                     │     (Globales, sin precios CO reales)
                                     │
                                     │         ★ NUESTRA SOLUCIÓN
                                     │           (Presupuesto + Menú +
                                     │            Precios reales D1/Ara/Éxito)
                                     │
   ──────────────────────────────────┼──────────────────────────────────►
   [ Comparación Pasiva de Precios ] │ [ Optimización Activa de Presupuesto ]
     * Beeep / Price It / MercApp    │
       (¿Dónde está el atún barato?) │ (Tengo $200k: dime qué cocinar y comprar)
                                     │
```

- **Comparadores locales (*Beeep*, *Price It*, *MercApp*):** Tienen cientos de miles de SKUs, pero son **pasivos**. Responden a *"dónde está más barato este producto individual"*. Obligan al usuario a hacer el trabajo cognitivo de armar la canasta y adivinar recetas.
- **Planners internacionales (*Carby*, *EatCheap*, *Mealime*):** Manejan bien la lógica menú/recetas, pero **desconocen el mercado colombiano** (marcas propias de D1/Ara, presentaciones locales, inflación y corte por ciudades).
- **Nuestra Propuesta de Valor Única:**
  > *"Dinos cuánto tienes de presupuesto, en qué ciudad estás y cuántas personas comen. Te entregamos el menú semanal completo, las porciones exactas y la lista de compras optimizada con precios reales de D1, Ara y Éxito para que no gastes ni un peso de más."*

---

## 3. Arquitectura del Motor de Precios y Catálogo MVP

Para evitar el cuello de botella técnico de scrapear 50.000 productos:

1. **Canasta Esencial Acotada (150 - 250 SKUs):**
   - Proteínas (huevos x30, pechuga, carne molida, atún, lentejas, frijoles, garbanzos).
   - Carbohidratos/Granos (arroz 1kg/5kg, papa pastusa, plátano, pasta, avena, pan tajado).
   - Frutas y Verduras (tomate chonto, cebolla cabezona, zanahoria, limón, plátano verde/maduro).
   - Despensa/Lácteos (aceite, sal, panela, leche entera/deslactosada, queso campesino/doble crema).
2. **Desacoplamiento Geográfico (Ciudad Piloto: Cali):**
   - Validación de disponibilidad de cadenas (D1, Tiendas Ara, Grupo Éxito, Olímpica / Mercamío).
   - Control de diferencias zonales (~5% a 8% en perecederos).
3. **Métrica de Confianza de Precios (Data Freshness Score):**
   - 🟢 **Confirmado hoy / hace <48h:** Vía catálogo digital / ticket verificado.
   - 🟡 **Estimado reciente (3-7 días):** Basado en última vigencia registrada.
   - ⚪ **Precio promedio de referencia:** Mediana histórica de la categoría.

---

## 4. Algoritmo de Decisión de Compra: "Ahorro Real vs. Fricción"

Una función clave identificada en la investigación es el **Costo de Desplazamiento**:

$$\text{Ahorro Neto} = (\text{Costo Canasta Tienda Única} - \text{Costo Canasta Multitienda}) - \text{Costo de Fricción (Transporte/Tiempo)}$$

- **Opción A (Monotienda):** Todo en D1 por $185.000 COP (cero fricción).
- **Opción B (Multitienda óptima):** D1 + Ara por $168.000 COP (ahorro de $17.000 COP). Si los locales están a < 3 cuadras de distancia, se recomienda; si exige transporte de $10.000 COP, el sistema sugiere la Opción A.

---

## 5. Próximos Pasos Inmediatos

1. **Validación de Demanda y WTP:** Lanzar el instrumento de validación (20-50 usuarios en Cali/Bogotá/Medellín).
2. **Seed Data (Canasta Cali):** Compilar la matriz de precios base de los 150 productos esenciales en D1, Ara y Éxito.
3. **Prototipo Web Funcional:** Construir una interfaz interactiva donde el usuario pueda ingresar su presupuesto, ciudad y número de comensales para ver la canasta y el menú generado.
