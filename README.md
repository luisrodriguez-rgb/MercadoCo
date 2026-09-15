# Mercado Colombia

> **Sistema de Optimización Presupuestal de Menú y Abastecimiento Retail (D1, Ara, Éxito)**  
> Plataforma de ingeniería de datos y optimización financiera orientada a hogares colombianos. Resuelve la asignación semanal de menú y lista de compras a partir de un presupuesto definido en pesos colombianos (COP), normalizando precios reales por unidad estándar e incorporando penalizaciones por fricción logística.

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
          - Responde: "Tengo $220.000 COP en Cali para 2 personas:
            ¿Qué cocinamos de lunes a domingo y qué compramos exactamente
            en D1 y Ara para maximizar el presupuesto sin desperdicio?"
```

---

## 2. Arquitectura del Sistema

La solución implementa una arquitectura modular desacoplada (**Clean Architecture / Hexagonal**) para garantizar portabilidad tanto en cliente web como en microservicios backend de alta concurrencia.

```
src/
├── domain/                      # Capa de Dominio Puro
│   └── types.js                 # Entidades: Stores, SKUs, Units, ConfidenceLevels, Cities
├── data/                        # Repositorio de Datos Normalizados
│   ├── products.js              # Catálogo maestro de 150 SKUs colombianos esenciales
│   ├── prices_cali.js           # Matriz curada de precios por tienda en Cali ($/g, $/ml, $/un)
│   └── recipes.js               # Recetas típicas colombianas formuladas por porción
├── application/                 # Capa de Lógica de Aplicación
│   ├── MealPlanService.js       # Orquestador y generador de menú semanal balanceado
│   └── BasketOptimizer.js       # Solver de canasta, empaques indivisibles y fricción logística
├── ui/                          # Componentes de Presentación Vectorial
│   └── StoreLogos.jsx           # Logotipos vectoriales oficiales de D1, Ara y Éxito
├── App.jsx                      # Tablero analítico y gestor de estado interactivo
├── index.css                    # Design System con soporte para Modo Oscuro y Modo Claro
└── main.jsx                     # Punto de entrada de la aplicación
```

---

## 3. Algoritmo de Optimización y Modelo Financiero

### 3.1. Restricción de Empaques Indivisibles
En los canales retail y hard discount, los alimentos no se adquieren por gramos continuos, sino en unidades comerciales discretas (bolsas de 1.000g de arroz, botellas de 900ml de aceite, cubetas de 30 huevos). El optimizador calcula:

$$\text{Paquetes Comerciales} = \left\lceil \frac{\text{Demanda Requerida}}{\text{Presentación del Empaque}} \right\rceil$$

El excedente se registra automáticamente como **Inventario Residual de Despensa**, evidenciando al usuario que su dinero no es desperdiciado sino transferido como activo para el siguiente ciclo de consumo.

### 3.2. Modelo de Fricción Logística (Ahorro Neto Real)
Comprar en dos cadenas distintas (ej. D1 + Ara) sólo se recomienda si el diferencial de precio compensa el costo de desplazamiento y tiempo del consumidor:

$$\text{Ahorro Neto} = (\text{Costo Monotienda Mínimo} - \text{Costo Híbrido Multitienda}) - \text{Penalización de Desplazamiento ($5.000 COP)}$$

Si el ahorro neto no supera el umbral crítico, el sistema recomienda la opción **Monotienda** para suprimir la fricción operativa.

---

## 4. Funcionalidades de la Plataforma

- **Tablero Ejecutivo Financiero:** Semáforo de diagnóstico presupuestal, margen de ahorro neto y comparativa en tiempo real de 4 estrategias de abastecimiento (Híbrido D1+Ara, Monotienda D1, Monotienda Ara, Grupo Éxito).
- **Planificación Semanal (Lunes a Domingo):** 14 raciones (almuerzo y cena) formuladas según el perfil nutricional seleccionado (*Balanceado*, *Máximo Ahorro*, *Alta Proteína*).
- **Matriz de Abastecimiento en Punto de Venta:** Lista de compras agrupada por cadena retail con checkboxes interactivos para verificación en tienda.
- **Exportación Rápida:** Botón de un solo clic para exportar la lista de compras estructurada al portapapeles (compatible con WhatsApp y apps de notas).
- **Auditoría de Despensa Residual:** Detalle analítico del stock sobrante por SKU para la semana posterior.
- **Registro de Precios y Catálogo:** Matriz de búsqueda y filtrado de productos con indicadores de confianza (*Verificado Hoy*, *Actualizado esta semana*, *Precio Estimado*).
- **Soporte Bimodal:** Alternador instantáneo entre **Modo Oscuro** y **Modo Claro** con persistencia en almacenamiento local.
- **Identidad Oficial:** Integración de logotipos e isotipos vectoriales limpios de Tiendas D1, Tiendas Ara y Grupo Éxito.

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
# El servidor iniciará en http://localhost:3001/ o puerto disponible
```

### Compilación para Producción
```bash
pnpm build
```

---

## 6. Roadmap de Escalabilidad Técnica

1. **Pipeline de Ingestión Automatizada:** Adaptadores de scraping ético y consumo de catálogos digitales públicos con validación horaria de precios en Cali, Bogotá y Medellín.
2. **Normalización por Visión Computacional:** Módulo OCR para extracción de precios y pesos a partir de fotografías de tickets de compra de usuarios.
3. **Persistencia y Perfiles de Hogar:** Migración de estado a PostgreSQL / Supabase con autenticación y personalización de restricciones dietéticas (intolerancias, alergias, dietas terapéuticas).
