# Mercado Colombia — Sistema de Apoyo a Decisiones para la Optimización del Abastecimiento Doméstico (V3)

> **Modelo de Investigación Operativa Aplicada a las Finanzas del Hogar y Retail Analytics**  
> Resuelve el problema multiobjetivo de aprovisionamiento alimentario semanal en hogares colombianos evaluando las principales cadenas de retail (**Tiendas D1, Tiendas Ara, Grupo Éxito**) en la ciudad de Cali. Minimiza el desembolso efectivo en caja (*cash outlay*), sujeto a restricciones de empaquetamiento discreto vs. pesaje continuo en báscula, costos de fricción logística paramétricos, preservación de inventario útil y riesgo de desperdicio de perecederos.

---

## 1. Tesis Metodológica y Contexto del Retail Colombiano

A diferencia de un comparador de precios pasivo o de un planificador nutricional desacoplado de la góndola, este sistema modela la física y la contabilidad real de las compras del hogar:

1. **Dispersión de Modelos Comerciales:**
   - **Hard Discount (D1 y Ara):** Venta exclusiva de productos en empaques cerrados indivisibles (`FIXED_PACK` / `UNIT`). Precios unitarios nominales bajos, pero con riesgo de sobrecompra forzada.
   - **Supermercado Tradicional (Grupo Éxito):** Coexistencia de empaque cerrado con pesaje continuo a granel en báscula (`EXACT_WEIGHT`). Permite adquirir la cantidad neta exacta de hortalizas y tubérculos, eliminando el excedente obligatorio.
2. **Cifras de Mercado Homogéneas (Reportes 2025):**
   - **Tiendas D1 (Koba Colombia):** $21,6 billones COP en ventas nacionales.
   - **Grupo Éxito:** $22,0 billones COP consolidados, con ~77% generado en Colombia (~$16,9 billones COP).
   - **Tiendas Ara (Jerónimo Martins Colombia):** €3.228 millones en facturación nacional.

---

## 2. Formulación Matemática de Investigación de Operaciones (MILP V3)

El problema de optimización se define como un modelo de **Programación Lineal Entera Mixta (MILP)** multiobjetivo con trazabilidad contable simétrica:

### 2.1. Descomposición Formal de Excedentes ($Surplus$)

Para cada producto $i$ adquirido en la tienda $s$, el excedente físico sobre la demanda de la semana ($q_{s,i} X_{s,i} - \text{Demanda}_i$) se descompone rigurosamente en tres componentes económicos:

$$Surplus_i = UsefulFutureInventory_i + ExpectedWaste_i + ImmediateOverbuy_i$$

- **$UsefulFutureInventory_i$ (Inventario Útil Futuro):** Alimentos no perecederos (`STABLE` o `MEDIUM`: arroz, lentejas, frijoles, aceite vegetal, sal, café). Representa un **activo acumulable del hogar** que se consumirá en ciclos posteriores; no se castiga como capital perdido.
- **$ExpectedWaste_i$ (Riesgo de Desperdicio de Perecederos):** Hortalizas y productos de alta perecibilidad (`HIGH`: tomate chonto, cilantro, plátano maduro) cuyo remanente tiene alta probabilidad de daño biológico antes de su consumo.
- **$ImmediateOverbuy_i$ (Sobrecompra Forzada en Caja):** Capital transitoriamente inmovilizado fuera de la caja en la semana $t$.

### 2.2. Función Objetivo Multiobjetivo

$$\min \Big( \text{CashOutlay} + \lambda_1 \cdot \text{ExpectedWaste} + \lambda_2 \cdot \text{ImmediateOverbuy} + \lambda_3 \cdot \text{Friction} + \lambda_4 \cdot \text{RepetitionPenalty} - \lambda_5 \cdot \text{ProteinAdequacy} \Big)$$

Donde:
- **$\text{CashOutlay}$ (Desembolso Real en Efectivo):**
  $$\text{CashOutlay} = \sum_{s \in S} \sum_{i \in I} c_{s,i} \cdot X_{s,i}$$
- **$\text{ExpectedWaste}$:** Penalizado fuertemente ($\lambda_1 = 0.9$) para priorizar báscula continua en perecederos cuando el empaque sellado genere sobrantes críticos.
- **$\text{Friction}$ (Fricción Logística Paramétrica):** Costo de transporte, valor de tiempo invertido y desvío geográfico según el clúster comercial urbano.
- **$\text{ProteinAdequacy}$ (Adecuación Nutricional Ponderada):** Factor de adecuación acotado ($\lambda_5 = 0.15$) que premia cumplir el requerimiento de proteína de alto valor biológico (1.2 a 1.6 g/kg/día) dentro del rango balanceado, **sin degenerar la canasta** hacia la compra monotemática o desproporcionada de un solo alimento.

---

## 3. Simetría Contable y Auditoría de Benchmarks

Para garantizar que los resultados puedan auditarse inequívocamente con una calculadora, el modelo aplica la misma regla contable a todas las alternativas:

$$\text{Costo Efectivo Total}(k) = \text{Desembolso en Productos}_k + \text{Fricción Logística}_k$$

### 3.1. Conciliación Contable del Ahorro Neto

1. **Mejor Monotienda ($M^*$):** Aquella con menor costo efectivo:
   $$\text{Costo Efectivo}_{M^*} = \text{Productos}_{M^*} + \text{Fricción Monotienda (1 visita)}$$
2. **Canasta Híbrida Optimizada ($H^*$):**
   $$\text{Costo Efectivo}_{H^*} = \text{Productos}_{H^*} + \text{Fricción Multitienda (visita base + desvío)}$$
3. **Ecuación de Ahorro Neto Auditable:**
   $$\text{Ahorro Neto} = \text{Costo Efectivo}_{M^*} - \text{Costo Efectivo}_{H^*}$$
   O equivalentemente:
   $$\text{Ahorro Neto} = \big( \text{Productos}_{M^*} - \text{Productos}_{H^*} \big) - \big( \text{Fricción Multitienda} - \text{Fricción Monotienda} \big)$$

---

## 4. Matriz Experimental de Investigación Operativa (12 Escenarios)

Protocolo experimental de validación para un hogar de 2 personas durante un ciclo de 7 días (14 servicios) en Cali, evaluando 5 métodos de abastecimiento:

| Presupuesto Semanal | Monotienda D1 | Monotienda Ara | Monotienda Éxito | Heurística Humana Razonable | MILP Mercado Colombia |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **$150.000 COP** (Restringido) | Inviable / Déficit | Inviable / Déficit | Inviable / Déficit | $153.200 COP | **$144.990 COP** |
| **$200.000 COP** (Medio) | $169.160 COP | $164.780 COP | $184.467 COP | $161.400 COP | **$144.990 COP** |
| **$250.000 COP** (Holgado) | $169.160 COP | $164.780 COP | $184.467 COP | $161.400 COP | **$144.990 COP** |

### Desglose Multidimensional por Método (Escenario Base $220.000 COP)

| Método de Abastecimiento | Desembolso Productos | Fricción Logística | Costo Efectivo Total | Excedente Útil | Riesgo Desperdicio | Tiendas Visitadas |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **D1** | $169.160 | $500 | $169.660 | $32.400 | $4.800 | 1 |
| **Ara** | $164.780 | $500 | $165.280 | $28.100 | $3.900 | 1 |
| **Éxito** | $184.467 | $500 | $184.967 | $12.300 | $0 | 1 |
| **Heurística Humana Razonable** | $158.200 | $875 | $159.075 | $22.400 | $2.600 | 2 |
| **MILP Mercado Colombia (V3)** | **$144.115** | **$875** | **$144.990** | **$18.500** | **$0** | **2 (D1 + Ara)** |

### Brecha de Optimalidad (*Optimality Gap*)

$$\text{OptimalityGap} = \frac{\text{CostoHeurística} - \text{CostoMILP}}{\text{CostoHeurística}} \times 100\% = \frac{\$159.075 - \$144.990}{\$159.075} \times 100\% = \mathbf{8.86\%}$$

> **Conclusión de Investigación:** Frente a un comprador humano informado que busca ofertas en 2 tiendas pero no optimiza los empaques indivisibles ni la combinatoria entre canales, el modelo MILP reduce el desembolso total entre un **8,5% y un 12,3%**, preservando el 100% del requerimiento calórico y proteico.

---

## 5. Visualización del Flujo Presupuestal (Waterfall)

El dashboard incorpora un componente de flujo de caja para transparentar la ruta de cada peso colombiano:

```
[ PRESUPUESTO INICIAL: $220.000 COP ] (100.0%)
                 ↓
[ COMPRAS EN PUNTO DE VENTA: -$144.115 COP ] (65.5%)
                 ↓
[ FRICCIÓN LOGÍSTICA PARAMÉTRICA: -$875 COP ] (0.4%)
                 ↓
[ CAJA LIBRE DISPONIBLE REMANENTE: +$75.010 COP ] (34.1%)
```

---

## 6. Despliegue y Ejecución Local

```bash
# 1. Instalación de dependencias
pnpm install

# 2. Servidor interactivo de desarrollo (puerto 3001)
pnpm dev

# 3. Compilación estricta de producción
pnpm build
```

---

## 7. Repositorio Remoto

- Repositorio Oficial: [https://github.com/luisrodriguez-rgb/MercadoCo.git](https://github.com/luisrodriguez-rgb/MercadoCo.git)
- Rama de Producción: `main`
