# Protocolo de Validación Humana y Comportamiento de Compra (Cali) — V4-B

> **Línea de Validación Conductual V4-B:** "¿La gente realmente adoptaría la recomendación para ejecutar su compra semanal?"  
> **Ámbito Geográfico:** Santiago de Cali, Valle del Cauca, Colombia.  
> **Unidad Observacional:** **20 a 50 participantes responsables directos de la compra del hogar** (personas que planifican, seleccionan, pagan o cocinan el mercado semanal).  
> **Marco Epistémico:** Datos experimentales pseudonimizados (`participantId: CALI-SUB-XX`) y protocolo de registro definido para evaluación conductual de campo.

---

## 1. Justificación Metodológica: Separación de Estados de Decisión

Preguntar en abstracto *"¿Pagarías por una app que compare supermercados?"* genera un sesgo severo de deseabilidad social que no predice la adopción.

En la **Línea V4-B**, la validación se estructura bajo una cadena secuencial estricta que separa tres dimensiones ortogonales:

```text
                  RECOMENDACIÓN MOSTRADA
                   (Híbrido $163.715 COP)
                            │
             ┌──────────────┴──────────────┐
             │                             │
    1. Comprensión                  2. Aceptación
(Explicabilidad cualitativa:     (Trade-off simétrico neutral:
  Papa báscula vs paquete)        Multi vs Monotienda)
             │                             │
             └──────────────┬──────────────┘
                            │
                   3. Ejecución
             ┌──────────────┴──────────────┐
             │                             │
      Apertura y Chequeo            Reporte Declarado
  (checklistCompleted: 30/30)      (purchaseReported: true
                                  participant_confirmation)
```

| Dimensión | Pregunta de Investigación | Instrumentación en V4-B |
| :--- | :--- | :--- |
| **Comprensión** | ¿Entiende el comprador por qué se divide la canasta? | Apertura del modal de explicabilidad (`whyModalOpened: true`). |
| **Aceptación** | ¿Acepta el sacrificio de fricción logística a cambio del ahorro? | Selección neutral en trade-off de segunda parada (`secondStoreAccepted: true \mid false`). |
| **Ejecución** | ¿Lleva la recomendación a la acción concreta en el supermercado? | Chequeo en pasillo (`checklistCompleted: 30/30`) y confirmación declarada (`purchaseReported: true`). |

---

## 2. Caracterización del Participante (Variables Descriptivas)

Cada sesión registra obligatoriamente:
* **`participantId`**: Código pseudónimo (ej. `CALI-SUB-01` a `CALI-SUB-50`). Sin datos personales directos.
* **`participantRole`**: Rol en el hogar (Decisor único / Comprador ejecutor / Cocinero / Financiador).
* **`householdSize`**: Número de personas que consumen los alimentos comprados (ej. 2 personas en caso base).
* **`weeklyBudget`**: Presupuesto semanal asignado o estimado ($ COP).
* **`mainStore`**: Supermercado o canal habitual principal (D1, Ara, Éxito, La 14/Comfandi, Galerías Alameda/Santa Elena).
* **`shoppingFrequency`**: Frecuencia de compra (Semanal, Quincenal, Diario por puchos).
* **`transportMode`**: Modo de desplazamiento (A pie, moto, MIO/transporte público, vehículo particular).

---

## 3. Protocolo de Entrevista Cualitativa (Guion en 4 Bloques)

### Bloque 1: Diagnóstico Retrospectivo de Hábitos
1. *"Descríbeme paso a paso cómo hiciste tu última compra de mercado semanal."*
   - ¿Qué día fuiste? ¿A cuántas tiendas fuiste? ¿En qué medio de transporte te movilizaste?
2. *"¿Llevabas una lista escrita, una idea mental o decidiste recorriendo las góndolas?"*
3. *"¿Tenías un presupuesto límite en mente antes de salir de casa?"*
   - ¿Cuánto pensabas gastar y cuánto terminó sumando la cuenta final?
4. *"¿Qué fue lo más desgastante o frustrante de todo el proceso?"*
   - (Explorar: indecisión sobre qué cocinar, comida dañada en la nevera, dinero que no alcanzó).

---

### Bloque 2: Medición de Preferencia Declarada (Antes de ver la solución)
5. *"Si tuvieras una herramienta que te ayude con el mercado semanal, ¿cuál de estas tres cosas sería la más valiosa para ti?"*
   - **Opción A (Ahorro Puro):** *"Pagar lo mínimo posible combinando las tiendas de mi barrio."*
   - **Opción B (Conveniencia y Carga Mental):** *"No tener que pensar qué cocinar cada día y recibir la lista lista."*
   - **Opción C (Optimización y Cero Desperdicio):** *"Comprar las cantidades exactas para que no se me pudra nada en la nevera."*
   *(Registrar respuesta como $Preference_{\text{declared}}$)*.

---

### Bloque 3: Confrontación con la Decisión Concreta (Ficha V4-B)
El entrevistador no muestra algoritmos ni formulaciones matemáticas. Presenta la ficha de asignación óptima según el modelo (Cali, 2 personas, 14 comidas, presupuesto base $220.000 COP):

```text
======================================================================
MERCADO COLOMBIA — ASISTENTE DE ABASTECIMIENTO SEMANAL (CALI)
Menú: 14 Comidas Familiares (2 personas, 7 días)
14 Ingredientes Requeridos → 30 Líneas de Compra
======================================================================
PARADA 1: TIENDAS ARA (Empaques Económicos y Proteínas) — 19 Líneas
• Huevo rojo AA (Bandeja x 30 unidades) ──────────── $14.900 COP
• Pechuga de pollo (Filete congelado 1.000g) ─────── $16.900 COP
• Carne molida de res (Bandeja 500g) ─────────────── $10.990 COP
• Lenteja seleccionada (Bolsa 500g) ───────────────── $3.450 COP
• Arroz blanco (Bolsa 1.000g) ─────────────────────── $3.890 COP
• Aceite vegetal (Botella 900 ml) ─────────────────── $8.950 COP
• Sal refinada (Bolsa 1.000g · rinde ciclos futuros) ─ $1.850 COP
• Café molido tradicional (500g) ──────────────────── $9.900 COP
• Avena en hojuelas (500g) ────────────────────────── $3.450 COP
• Pasta espagueti (500g) ──────────────────────────── $2.200 COP
• Harina de maíz precocida (1.000g) ───────────────── $3.850 COP
• Atún en lomo (Lata 140g x 2) ────────────────────── $9.800 COP
• Galletas saladas (Taco 300g) ────────────────────── $2.900 COP
• Pan tajado blanco (450g) ────────────────────────── $4.100 COP
Subtotal Parada 1 (Ara): $96.350 COP
──────────────────────────────────────────────────────────────────────
PARADA 2: GRUPO ÉXITO (Báscula Exacta y Hortalizas) — 11 Líneas
• Papa pastusa en báscula exacta (1.2 kg) ─────────── $5.160 COP
• Cebolla cabezona roja a granel (600g) ───────────── $2.450 COP
• Tomate chonto seleccionado a granel (800g) ──────── $3.680 COP
• Plátano verde a granel (3 unidades / 900g) ──────── $3.240 COP
• Plátano maduro a granel (2 unidades / 600g) ─────── $2.160 COP
• Zanahoria granel (500g) ─────────────────────────── $1.850 COP
• Pimentón rojo granel (350g) ─────────────────────── $1.960 COP
• Cilantro fresco (Manojo 100g) ───────────────────── $1.200 COP
• Limón común a granel (500g) ─────────────────────── $2.100 COP
• Ajo morado malla (150g) ─────────────────────────── $1.800 COP
• Panela redonda (500g) ───────────────────────────── $2.100 COP
Subtotal Parada 2 (Éxito): $65.834 COP
──────────────────────────────────────────────────────────────────────
BALANCE FINANCIERO Y CONTROL DE DESPERDICIO:
• Desembolso Total en Cajas: $163.715 COP
• Fricción Logística Estimada (Desplazamiento): $1.531 COP (~18 min)
• Costo Efectivo Estimado: $165.246 COP
• Caja Libre del Presupuesto: $56.285 COP
• Ahorro Neto Estimado vs. Mejor Monotienda (Ara $188.625): +$24.910 COP
• Excedente Perecedero con Riesgo de Merma: $0 COP (báscula continua)
• Inventario Remanente Estimado (Granos, Sal, Aceite): $12.400 COP
======================================================================
```

6. **Trade-off Simétrico de Segunda Parada (Sin Sesgo de Presentación):**
   *"Para ahorrar $24.910 necesitas hacer una segunda parada de ~18 minutos. ¿Qué prefieres?"*
   ```text
   [ Hacer 2 compras (Ahorras $24.910) ]      [ Comprar todo en 1 tienda (Ara) ]
   ```
   - [ ] Hacer 2 compras (Acepta segunda parada).
   - [ ] Comprar todo en 1 tienda (Prefiere monotienda).
   *(Registrar como `secondStoreAccepted: true | false`)*.

7. **Aceptación de la Solución Concreta:**
   *"Mirando esta distribución exacta: ¿Harías esta compra tal cual está planteada para tu semana?"*
   - [ ] SÍ (Acepta)
   - [ ] CON MODIFICACIONES (Indicar cuáles)
   - [ ] NO (Rechaza — Explicar por qué)
   *(Registrar como `RecommendationAcceptance`)*.

8. **Contraste de Percepción:**
   *"Ahora que ves la solución en concreto: ¿Qué fue lo más decisivo para tu respuesta?"*
   *(Ahorro en pesos / no pensar el menú / báscula continua / cercanía de las tiendas)*.

---

### Bloque 4: Medición de Tolerancia a la Fricción (Elasticidad de Segunda Parada)
9. *"Supón que tu compra principal la haces en Ara. Para hacer una parada adicional en otra tienda a 4 cuadras, ¿cuánto ahorro neto mínimo necesitarías ver en tu bolsillo para que valga la pena el desvío?"*
   - [ ] **$5.000 COP** (Muy sensible al ahorro; alta disposición a caminar).
   - [ ] **$10.000 COP** (Sensibilidad moderada).
   - [ ] **$15.000 COP** (Umbral estándar de conveniencia).
   - [ ] **$25.000 COP o más** (Alta aversión a la fricción logística).
   - [ ] **Nunca haría una segunda parada** (Inflexibilidad absoluta; 100% monotienda).

---

## 4. Taxonomía de Variables y Directriz de Reporte Estadístico

### 4.1. Taxonomía Estricta de Variables
- **Métricas Primarias:**
  - `SecondStoreAcceptance`: Decisión neutral de 2 tiendas vs. 1 tienda.
  - `RecommendationAcceptance`: Disposición a ejecutar la canasta concreta sugerida.
  - `PurchaseReported`: Compra efectuada declarada por el participante.
- **Métricas Secundarias:**
  - `ExplanationOpened`: Consulta de por qué se asignó cada producto.
  - `ChecklistStarted`: Inicio de chequeo en lista digital.
  - `ChecklistCompleted`: 30/30 líneas marcadas.
  - `WhatsAppCopied`: Exportación de la lista a mensajería.
  - `TimeToDecision`: Tiempo transcurrido hasta la elección del trade-off.
- **Variables Descriptivas:**
  - `householdSize`, `weeklyBudget`, `mainStore`, `shoppingFrequency`, `transportMode`.

### 4.2. Directriz de Reporte: Soporte Muestral e Incertidumbre
Para evitar presentar porcentajes planos que oculten la magnitud de la evidencia, todo indicador experimental se reportará bajo el formato:

$$\text{Reporte Estándar: } n \quad\mid\quad \frac{x}{n} \quad\mid\quad \hat{p}\% \quad\mid\quad \text{IC 95\% (Wilson Score)}$$

Ejemplo metodológico:
- $12/20$ ($60.0\%$, IC 95%: $[38.7\%, 78.1\%]$) $\longrightarrow$ Evidencia exploratoria inicial.
- $30/50$ ($60.0\%$, IC 95%: $[46.2\%, 72.4\%]$) $\longrightarrow$ Evidencia concluyente para gate de decisión.

---

## 5. Ficha de Registro de la Entrevista

| Campo | Formato / Valores |
| :--- | :--- |
| **ID Participante** | `CALI-SUB-01` a `CALI-SUB-50` (Pseudónimo) |
| **Barrio / Clúster de Cali** | Granada, San Fernando, Versalles, Tequendama, Salomia |
| **Rol Decisorio (`participantRole`)** | Decisor / Comprador / Financiador / Cocinero |
| **Tamaño del Hogar (`householdSize`)** | Número entero (1, 2, 3, 4, 5+) |
| **Presupuesto Semanal Real** | Valor numérico ($ COP) |
| **Tienda Habitual (`mainStore`)** | D1, Ara, Éxito, Olímpica, Galerías |
| **Modo de Transporte (`transportMode`)** | A pie, moto, MIO / transporte público, vehículo |
| **Preferencia Declarada ($Preference_{\text{declared}}$)** | A (Ahorro) / B (Conveniencia) / C (Cero Desperdicio) |
| **Trade-off 2da Parada (`secondStoreAccepted`)** | SÍ (Híbrido) / NO (1 Tienda) |
| **Aceptación Observada (`RecommendationAcceptance`)** | SÍ / MODIFICA / NO |
| **Checklist Completado (`checklistCompleted`)** | Booleano (SÍ 30/30 / NO) |
| **Compra Reportada (`purchaseReported`)** | Booleano (SÍ / NO) |
| **Método de Reporte (`purchaseReportMethod`)** | `participant_confirmation` |
| **Tolerancia a 2da Parada** | $5k / $10k / $15k / $25k+ / NUNCA |
| **Factor Decisivo Cualitativo** | Ahorro en dinero / Carga mental / Báscula / Cercanía |
| **Citas Textuales y Observaciones** | Registro cualitativo verbatim del participante |
