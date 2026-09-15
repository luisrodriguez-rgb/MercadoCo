# Mercado Colombia

> **Sistema de Optimización Presupuestal de Menú y Abastecimiento Retail (D1, Ara, Éxito)**  
> Plataforma de investigación operativa y optimización financiera orientada a hogares colombianos. Resuelve la asignación semanal de menú y lista de compras a partir de un presupuesto definido en pesos colombianos (COP), normalizando precios reales por unidad estándar, evaluando compras a granel vs. empaques discretos, gestionando liquidez retenida en despensa e incorporando penalizaciones por fricción logística según la zona urbana.

---

## 1. Tesis de Negocio y Diferenciación Competitiva

El mercado retail de consumo masivo en Colombia supera los $54 billones de pesos anuales consolidados entre **Tiendas D1**, **Tiendas Ara** y **Grupo Éxito**. A pesar de la existencia de herramientas digitales en el sector, persiste una desconexión fundamental entre dos modelos tradicionales:

```
[ COMPARADORES PASIVOS LOCALES ]        [ MEAL PLANNERS GLOBALES ]
(Beeep, Price It, MercApp)              (EatCheap, Carby, Mealime)
- Responden: "¿Dónde está más barato   - Generan recetas genéricas
  este producto individual?"            - Desconectados de precios locales
- Trabajo cognitivo dejado al usuario    - Desconocen marcas propias D1/Ara
- Sin planificación de consumo          - Sin formatos de empaque en COP
                     \                      /
                      \                    /
                       ▼                  ▼
          [ MERCADO COLOMBIA — SOLVER PRESUPUESTAL ]
          - Responde: "Tengo $220.000 COP en Cali (Granada) para 2 personas,
            con aceite y sal en casa: ¿Qué cocinamos de lunes a domingo y qué
            compramos exactamente para maximizar el presupuesto en efectivo sin
            atrapar liquidez en despensas innecesarias?"
```

---

## 2. Formulación Matemática del Problema (MILP)

El problema de optimización semanal no puede resolverse de forma secuencial desacoplada (menú ciego $\rightarrow$ redondeo forzado). Formalmente, se formula como un modelo de **Programación Lineal Entera Mixta (MILP)** que integra la Dieta de Stigler con Restricciones de Empaque Discreto y Costos Fijos de Visita:

### Función Objetivo: Minimizar el Desembolso Total en Efectivo (*Cash Outlay*)

$$\min \sum_{s \in S} \sum_{i \in I} c_{s,i} \cdot X_{s,i} + \sum_{s \in S} F_{z,s} \cdot Y_s$$

Donde:
- $S = \{\text{D1}, \text{Ara}, \text{Éxito}\}$: Conjunto de cadenas comerciales disponibles en la zona.
- $I$: Conjunto de SKUs requeridos para la semana.
- $c_{s,i}$: Precio nominal del SKU $i$ en la tienda $s$ (en COP).
- $X_{s,i} \in \mathbb{Z}^+$: Número de empaques discretos adquiridos del SKU $i$ en la tienda $s$ (o peso continuo en báscula para tiendas con venta a granel).
- $F_{z,s}$: Costo fijo de fricción logística y transporte por visitar la tienda $s$ en la zona urbana $z$ (ej. $1.500 COP en Granada vs. $7.500 COP en Ciudad Jardín).
- $Y_s \in \{0, 1\}$: Variable binaria que se activa si se realiza al menos una compra en la tienda $s$.

### Restricciones Principales

1. **Cumplimiento de Demanda por Porción y Comensal:**

   $$\sum_{s \in S} q_{s,i} \cdot X_{s,i} + \text{StockPantry}_i \ge \sum_{d=1}^{7} \sum_{m \in \{\text{Almuerzo}, \text{Cena}\}} \text{Req}_{i,m,d} \cdot \text{Personas}, \quad \forall i \in I$$

2. **Límite de Liquidez en Caja Semanal:**

   $$\sum_{s \in S} \sum_{i \in I} c_{s,i} \cdot X_{s,i} + \sum_{s \in S} F_{z,s} \cdot Y_s \le \text{PresupuestoCOP}$$

3. **Activación de Visita a Tienda:**

   $$X_{s,i} \le M \cdot Y_s, \quad \forall s \in S, \forall i \in I$$

---

## 3. Realidades Operativas del Retail Colombiano Resueltas

### 3.1. Empaques Discretos vs. Granel Continuo en Báscula
- **Hard Discounters (D1 y Ara):** Venden productos agropecuarios (tomate, cebolla, papa) en mallas selladas de peso fijo (500g, 1.000g, 2.000g). Si una receta exige 600g de papa, obliga a adquirir la malla de 2.000g.
- **Supermercados Tradicionales (Éxito):** Cuentan con báscula para pesaje continuo exacto por gramo (`isBulkWeighed = true`). El optimizador compara el costo real desembolsado en caja, evaluando si conviene pagar una tarifa por gramo ligeramente superior en Éxito para no atrapar $10.000 COP en tubérculos que no se consumirán en la semana.

### 3.2. Gestión de Despensa Preexistente (*Pantry Stock*)
El usuario puede marcar qué insumos no perecederos ya posee en casa (sal, aceite vegetal, café, panela, ajo, arroz). Esto reduce su demanda a cero, liberando entre el 15% y 30% del presupuesto semanal para reasignarlo directamente a proteína fresca de alta calidad.

### 3.3. Clústeres Urbanos y Fricción Dinámica en Cali
La penalización por desplazamiento no es un escalar fijo. Se ajusta según el nodo comercial:
- **Granada - Versalles:** Clúster peatonal denso (D1 de Av. 6ta y Ara a <300m), fricción: **$1.500 COP**.
- **San Fernando - Tequendama:** Accesibilidad peatonal media, fricción: **$2.500 COP**.
- **Ciudad Jardín - Pance:** Zona suburbana extendida de alta dispersión (requiere automóvil o MIO), fricción: **$7.500 COP**.
- **Salomia - Santander:** Clúster comercial sobre corredores principales, fricción: **$2.000 COP**.

### 3.4. Auditoría de Capital Atrapado (*Trapped Cash*)
Distingue entre el **consumo efectivo de la semana** y el **capital atrapado en empaques sobredimensionados**. Si un usuario tiene un presupuesto ajustado de $150.000 COP, el sistema alerta si más de $20.000 COP están comprometidos en excedentes de difícil rotación.

---

## 4. Arquitectura del Software

```
src/
├── domain/                      # Capa de Dominio Puro
│   └── types.js                 # Entidades: Stores, SKUs, Units, Zones, ConfidenceLevels, PantryStaples
├── data/                        # Repositorio de Datos Normalizados
│   ├── products.js              # Catálogo maestro de 150 SKUs colombianos esenciales
│   ├── prices_cali.js           # Matriz curada con atributos isBulkWeighed y COP/unidad
│   └── recipes.js               # Recetas colombianas balanceadas cuantificadas por porción
├── application/                 # Lógica de Aplicación e Investigación Operativa
│   ├── MealPlanService.js       # Generador de menú semanal y rotación nutricional
│   └── BasketOptimizer.js       # Solver de canasta, asignación multitienda y fricción urbana
├── ui/                          # Componentes de Presentación Vectorial Oficial
│   └── StoreLogos.jsx           # Logotipos vectoriales de D1, Ara, Éxito y bandera nacional
├── App.jsx                      # Tablero analítico interactivo bimodal
├── index.css                    # Design System con soporte para Modo Oscuro y Modo Claro
└── main.jsx                     # Punto de entrada React
```

---

## 5. Requisitos y Ejecución Local

### Prerrequisitos
- **Node.js**: v18.0.0 o superior (recomendado v20+ o v24+)
- **pnpm**: v9.0.0 o superior

### Instalación de Dependencias
```bash
pnpm install
```

### Ejecución en Modo Desarrollo
```bash
pnpm dev
# El servidor iniciará en http://localhost:3001/
```

### Compilación para Producción
```bash
pnpm build
```

---

## 6. Roadmap de Escalabilidad Técnica

1. **Solver MILP en Backend (WASM / Python):** Portabilidad del algoritmo hacia un solver de bifurcación y acotamiento (*Branch & Bound*) compilado en WebAssembly o alojado en microservicio Node/Python para optimizar menús de más de 500 recetas y 2.000 SKUs en sub-segundos.
2. **Validación de Inventario en Góndola (*Crowdsourcing*):** Módulo de reporte comunitario donde usuarios confirman en tiempo real si el SKU asignado (ej. pechuga en D1 o atún en Ara) está efectivamente en existencia en su tienda barrial.
3. **Integración de Rutas con OpenStreetMap / Google Maps API:** Cálculo exacto del tiempo de caminata y gasto de combustible/pasajes entre tiendas según las coordenadas GPS del usuario.
