# Mercado Colombia — Motor de Optimización de Abastecimiento Retail (V2)

> **Plataforma de Investigación Operativa y Optimización Financiera para Hogares Colombianos**  
> Resuelve la asignación semanal de menú y abastecimiento en supermercados de Colombia (**D1, Ara, Éxito**) minimizando el desembolso total en efectivo (*cash outlay*), sujeto a restricciones físicas de empaque discreto vs. pesaje continuo en báscula, costos de fricción logística paramétricos y penalización de desperdicio de alimentos perecederos.

---

## 1. Contexto Metodológico del Retail Colombiano

A diferencia de estimaciones genéricas consolidadas, las cifras de los principales actores del retail en Colombia deben leerse bajo metodologías y perímetros geográficos homogéneos (reportes financieros 2025):
- **D1 (Koba Colombia):** Líder en penetración y formato hard discount con ingresos reportados del orden de **$21,6 billones COP**.
- **Grupo Éxito:** Reportó **$22,0 billones COP** de ingresos consolidados totales, de los cuales aproximadamente el **77% corresponde a su operación en Colombia** (~$16,9 billones COP).
- **Tiendas Ara (Jerónimo Martins Colombia):** Reportó ventas anuales de **€3.228 millones** en su operación nacional.

Este panorama ratifica la primacía de los formatos de descuento duro y la necesidad de optimizar el gasto de los hogares frente a la dispersión de precios y presentaciones comerciales.

---

## 2. Formulación Matemática Multiobjetivo (MILP V2)

El problema se formula formalmente como un modelo de **Programación Lineal Entera Mixta (MILP)** multiobjetivo con dos capas: **Factibilidad Nutricional/Presupuestal** y **Utilidad/Preferencia del Consumidor**.

### 2.1. Función Objetivo Ponderada

$$\min \left( \text{CashOutlay} + \lambda_1 \cdot \text{ImmediateTrappedCash} + \lambda_2 \cdot \text{Friction} + \lambda_3 \cdot \text{RepetitionPenalty} + \lambda_4 \cdot \text{ExpectedWaste} \right)$$

Donde:
1. **$\text{CashOutlay}$ (Desembolso Real en Efectivo):**
   $$\text{CashOutlay} = \sum_{s \in S} \sum_{i \in I} c_{s,i} \cdot X_{s,i}$$
   Dinero que debe salir físicamente del bolsillo o cuenta bancaria del usuario en caja registradora.
2. **$\text{ImmediateTrappedCash}$ (Capital Atrapado Inmediato):**
   $$\text{ImmediateTrappedCash} = \sum_{s \in S} \sum_{i \in I} \max\left(0, (q_{s,i} X_{s,i} - \text{Demanda}_{i}) \cdot p_{s,i}^{\text{unit}}\right)$$
   Valor monetario de los excedentes adquiridos por encima del consumo estricto de la semana.
3. **$\text{Friction}$ (Costo Logístico Paramétrico):**
   $$F_{z,m} = \text{transport\_cost}_m + \text{time\_cost}(z, m) + \text{detour\_cost}$$
   Calculado dinámicamente según la distancia base del clúster comercial urbano ($z$) y el medio de desplazamiento ($m$: peatonal, transporte masivo MIO, vehículo propio o domicilio).
4. **$\text{ExpectedWaste}$ (Riesgo de Desperdicio de Perecederos):**
   $$\text{ExpectedWaste} = \sum_{i \in I_{\text{perishable}}} \text{SurplusValue}_i \cdot \alpha_i$$
   Donde $\alpha_i$ es el factor de riesgo de deterioro (0.85 para tomate/aguacate/cilantro frente a 0.00 para granos y aceites estables).

### 2.2. Restricciones del Modelo

1. **Cumplimiento de Demanda Neta (Despensa Preexistente):**
   $$\sum_{s \in S} q_{s,i} \cdot X_{s,i} + \text{StockPantry}_i \ge \text{DemandaTotal}_i, \quad \forall i \in I$$
2. **Naturaleza del Empaque por SKU $\times$ Tienda:**
   - Si $\text{packagingType}_{s,i} = \text{FIXED\_PACK} \lor \text{UNIT} \implies X_{s,i} \in \mathbb{Z}^+$ (Empaque cerrado entero).
   - Si $\text{packagingType}_{s,i} = \text{EXACT\_WEIGHT} \implies X_{s,i} \in \mathbb{R}^+$ (Pesaje continuo exacto en báscula).
3. **Límite de Presupuesto en Efectivo:**
   $$\text{CashOutlay} + F_{z,m} \le \text{PresupuestoCOP}$$

---

## 3. Realidades Operativas del Retail Colombiano Resueltas

### 3.1. Empaque como Propiedad del SKU $\times$ Tienda
No se asume que una tienda vende exclusivamente a granel o empacado. La propiedad `packagingType` modela la realidad de cada producto:
- **Papa pastusa en Éxito:** Se compra por peso exacto en báscula (`EXACT_WEIGHT`, $3.600/kg).
- **Papa pastusa en D1 / Ara:** Se compra obligatoriamente en bolsa sellada de 2,0 kg (`FIXED_PACK`, $5.990).
- **Leche UHT en todas las tiendas:** Se adquiere en empaque sellado unitario de 900ml / 1.000ml (`UNIT`).

### 3.2. Fricción Paramétrica vs. Escalares Arbitrarios
El costo de fricción $F$ no es una constante arbitraria. Se calcula a partir del modo de transporte:
- **A pie (Peatonal):** Costo monetario $0 COP, tiempo valorado a $5.000 COP/hora según la distancia del clúster comercial.
- **MIO (Transporte Masivo Cali):** $6.400 COP fijos correspondientes a dos pasajes (ida y vuelta).
- **Vehículo Propio:** $7.500 COP fijos de arranque/parqueo + combustible por km recorrido.
- **Domicilio Directo:** Tarifa oficial promedio de entrega ($6.500 COP).

### 3.3. Auditoría de Capital: Excedente $\neq$ Desperdicio $\neq$ Capital Atrapado
El sistema desglosa los excedentes en dos categorías económicas:
1. **Inventario Útil Futuro:** Insumos secos y no perecederos (`STABLE` o `MEDIUM`: arroz, lentejas, frijoles, aceite, sal, café) con vida útil prolongada que la familia consumirá en semanas posteriores.
2. **Riesgo de Desperdicio:** Hortalizas y perecederos críticos (`HIGH`: tomate chonto, cilantro, aguacate) que si sobran, tienen alta probabilidad de daño biológico.

### 3.4. Motor de Explicabilidad ("Explainability Layer")
Cada recomendación de compra multitienda incluye una justificación cuantitativa transparente:
- *"Papa $\rightarrow$ Éxito porque la báscula continua permite adquirir 1,2 kg exactos sin obligar a comprar la malla de 2 kg de D1."*
- *"Tomate $\rightarrow$ D1 porque el empaque de 1 kg representa un ahorro directo frente a Éxito."*
- *"Huevos $\rightarrow$ Ara porque el panal de 30 unidades minimiza el costo unitario de proteína."*

---

## 4. Diseño del Experimento MVP Científico

En lugar de construir prematuramente un catálogo masivo de 2.000 SKUs, el proyecto se valida mediante un **experimento científico controlado**:

```
[ PARÁMETROS DEL EXPERIMENTO CONTROLADO ]
- Ubicación: Cali (Clúster Granada / Versalles y San Fernando)
- Unidad de Consumo: Hogar de 2 personas
- Niveles de Presupuesto: $150.000 COP | $200.000 COP | $250.000 COP
- Matriz Acotada: 35 SKUs esenciales de alta rotación
- Pool de Recetas: 20 preparaciones tradicionales colombianas
- Ventana de Tiempo: 7 días (14 servicios: almuerzo y cena)
```

### Protocolo de Evaluación Comparativa

Se compara el desempeño del optimizador contra tres estrategias de abastecimiento:
1. **Estrategia A (Monotienda D1):** Compra total en D1.
2. **Estrategia B (Monotienda Éxito):** Compra total en Éxito.
3. **Estrategia C (Comparador Pasivo Humano):** Selección manual del precio más bajo por kilo sin considerar empaques discretos ni fricción de transporte.
4. **Estrategia D (Sistema Mercado Colombia MILP V2):** Asignación óptima con empaques indivisibles, fricción paramétrica y gestión de liquidez.

### Métricas de Rendimiento Evaluadas:

$$\text{Ahorro Financiero Relativo} = \frac{\text{Costo Canasta Benchmark Humana} - \text{Costo Canasta Optimizada}}{\text{Costo Canasta Benchmark Humana}}$$

Junto con:
- **Desembolso Neto en Caja Registradora** ($ COP).
- **Capital Atrapado en Despensa** ($ COP).
- **Valor del Desperdicio Esperado de Perecederos** ($ COP).
- **Tiempo Total Invertido y Número de Tiendas Visitadas**.
- **Cumplimiento de Requerimiento Proteico y Calórico**.

---

## 5. Ejecución Local con pnpm

```bash
# Instalación de dependencias
pnpm install

# Servidor de desarrollo interactivo
pnpm dev
# Acceso en navegador: http://localhost:3001/

# Compilación de producción
pnpm build
```
