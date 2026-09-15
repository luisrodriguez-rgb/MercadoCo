# Protocolo de Validación Humana y Comportamiento de Compra (Cali) — V4-B

> **Línea Paralela V4-B:** "¿La gente realmente cambiaría su comportamiento semanal por esta solución?"  
> **Ámbito Geográfico:** Santiago de Cali, Valle del Cauca, Colombia.  
> **Unidad Observacional:** **20 a 50 participantes responsables directos de la compra del hogar** (personas que planifican, seleccionan, pagan o cocinan el mercado semanal).

---

## 1. Justificación Metodológica: Comportamiento Observado vs. Intención Declarada

Preguntar en abstracto *"¿Pagarías por una app que compare supermercados?"* genera un sesgo severo de deseabilidad social que no predice la adopción.

En la **Línea V4-B**, la validación se estructura bajo un protocolo cuasi-experimental estricto:
1. **Separación temporal de mediciones:**
   - **Antes de mostrar la solución:** Registrar la **Preferencia Declarada** ($Preference_{\text{declared}}$) sobre las propuestas de valor (Ahorro vs. Conveniencia vs. Cero Desperdicio).
   - **Después de mostrar la solución concreta:** Registrar la **Aceptación Observada** ($Acceptance_{\text{observed}}$) y la decisión de compra real frente a la lista y ruta detalladas.
2. **Medición del Desplazamiento Conductual ($BehavioralShift$):**
   $$BehavioralShift = Acceptance_{\text{observed}} - Preference_{\text{declared}}$$
3. **Auditoría retrospectiva del hábito real:** Cómo mercó el participante la semana anterior (presupuesto mental vs. tirilla de caja).
4. **Calibración empírica de la fricción:** Medir la tolerancia monetaria a realizar una segunda parada comercial.

---

## 2. Caracterización del Participante

Cada entrevista registra obligatoriamente:
* **`participantRole`**: Rol decisorio en el hogar (Decisor único / Comprador ejecutor / Cocinero / Financiador).
* **`householdSize`**: Número de personas que consumen los alimentos comprados.
* **`weeklyBudget`**: Presupuesto semanal asignado o estimado ($ COP).
* **`mainStores`**: Supermercados o canales habituales (D1, Ara, Éxito, La 14/Comfandi, Galerías Alameda/Santa Elena, Tienda de barrio).
* **`shoppingFrequency`**: Frecuencia de abastecimiento (Semanal, Quincenal, Diario por puchos).

---

## 3. Protocolo de Entrevista Cualitativa (Guion en 4 Bloques)

### Bloque 1: Diagnóstico Retrospectivo de Hábitos
1. *"Descríbeme paso a paso cómo hiciste tu última compra de mercado semanal."*
   - ¿Qué día fuiste? ¿A cuántas tiendas fuiste? ¿En qué medio de transporte te movilizaste?
2. *"¿Llevabas una lista escrita, una idea mental o decidiste recorriendo las góndolas?"*
3. *"¿Tenías un presupuesto límite en mente antes de salir de casa?"*
   - ¿Cuánto pensabas gastar y cuánto terminó sumando la cuenta final?
4. *"¿Qué fue lo más desgastante o frustrante de todo el proceso?"*
   - (Explorar: indecisión sobre qué cocinar, comida dañada en el cajón de la nevera, dinero que no alcanzó).

---

### Bloque 2: Medición de Preferencia Declarada (Antes de ver la solución)
5. *"Si tuvieras una herramienta que te ayude con el mercado semanal, ¿cuál de estas tres cosas sería la más valiosa para ti?"*
   - **Opción A (Ahorro Puro):** *"Pagar lo mínimo posible combinando las tiendas de mi barrio."*
   - **Opción B (Conveniencia y Carga Mental):** *"No tener que pensar qué cocinar cada día y recibir la lista lista."*
   - **Opción C (Optimización y Cero Desperdicio):** *"Comprar las cantidades exactas para que no se me pudra nada en la nevera."*
   *(Registrar respuesta como $Preference_{\text{declared}}$)*.

---

### Bloque 3: Confrontación con la Decisión de Compra Concreta
El entrevistador no explica algoritmos, grafos ni formulaciones matemáticas. Presenta la ficha de decisión terminada adaptada al presupuesto del participante (ejemplo para 2 personas, $180.000 COP, Cali):

```text
======================================================================
MERCADO COLOMBIA — TU PLAN SEMANAL AUDITADO (CALI)
Presupuesto: $180.000 COP | 2 comensales | 7 días (14 comidas completas)
======================================================================

MENÚ SEMANAL PLANIFICADO (14 SERVICIOS):
• Almuerzos: Pechuga a la plancha con arroz y ensalada fresca,
             Lentejas caseras con huevo frito y plátano,
             Carne molida sudada con papa y hogao, etc.
• Cenas:     Omelette de queso con arepa, sándwich de atún,
             Crema de verduras con huevo cocido.

RUTA DE COMPRA SUGERIDA (2 PUNTOS DE VENTA):
──────────────────────────────────────────────────────────────────────
PARADA 1: TIENDAS ARA (Abarrotes y Proteínas Selladas) — 6 Productos
• Arroz blanco 1 kg ($3.890)
• Huevos rojos AA x 30 ($15.900)
• Lentejas 500g ($3.450)
• Atún lomitos x 2 latas ($10.980)
• Leche entera x 3 bolsas ($11.700)
• Sal refinada 1 kg ($1.850)
Subtotal Ara: $47.770 COP
──────────────────────────────────────────────────────────────────────
PARADA 2: GRUPO ÉXITO (Báscula Exacta en Hortalizas) — 5 Productos
• Pechuga de pollo granel 800g ($12.400)
• Carne molida res 500g ($9.990)
• Tomate chonto en báscula 650g ($2.730 - evita bolsa sellada de 1 kg)
• Cebolla cabezona en báscula 500g ($1.600)
• Plátano maduro 3 unidades ($3.600)
Subtotal Éxito: $30.320 COP
──────────────────────────────────────────────────────────────────────
BALANCE FINANCIERO Y CONTROL DE DESPERDICIO:
• Desembolso Total en Caja: $78.090 COP
• Desplazamiento adicional entre tiendas (Fricción): $1.531 COP (4 cuadras)
• Dinero que te queda libre en el bolsillo: $100.379 COP
• Ahorro neto real vs. comprar todo en una sola tienda: $16.480 COP
• Excedente con riesgo de descomposición en nevera: $0 COP
======================================================================
```

6. *"Mirando esta lista y esta asignación exacta: ¿Harías esta compra tal cual está planteada para tu semana?"*
   - [ ] SÍ (Acepta)
   - [ ] CON MODIFICACIONES (Indicar cuáles)
   - [ ] NO (Rechaza — Explicar por qué)
   *(Registrar como $Acceptance_{\text{observed}}$)*.

7. **Contraste de Percepción:**
   *"Ahora que ves la solución en concreto frente a ti: ¿Qué es lo que realmente más te llama la atención o te parece más útil?"*
   *(Permite comprobar si quien declaró "Ahorro" termina cautivado por "no tener que pensar qué cocinar" o la "báscula exacta")*.

---

### Bloque 4: Medición de la Tolerancia a la Segunda Parada ($\text{FrictionTolerance}$)
8. *"Supón que tu compra principal la haces en Ara. Para hacer una segunda parada en otra tienda cercana a 4 cuadras, ¿cuánto ahorro neto mínimo necesitarías ver en tu bolsillo para que valga la pena el desvío?"*
   - [ ] **$2.000 COP** (Muy sensible al ahorro; alta disposición a caminar).
   - [ ] **$5.000 COP** (Sensibilidad moderada).
   - [ ] **$10.000 COP** (Umbral estándar de conveniencia).
   - [ ] **$15.000 COP o más** (Alta aversión a la fricción logística).
   - [ ] **Nunca haría una segunda parada** (Inflexibilidad absoluta; demanda 100% monotienda).

---

## 4. Métricas Clave de Evaluación de V4-B

### A. Tasa de Aceptación Observada ($AcceptanceRate$)
$$\text{AcceptanceRate} = \frac{\text{Participantes que dicen SÍ a la compra concreta}}{\text{Total Participantes Entrevistados}} \times 100$$

### B. Curva de Tolerancia a la Fricción
Porcentaje de participantes que aceptan la segunda tienda por escalón de ahorro:
* $\%_{\ge \$2.000}$
* $\%_{\ge \$5.000}$
* $\%_{\ge \$10.000}$
* $\%_{\text{Solo Monotienda}}$

### C. Marco de Integración para el Paso a V5
Se preservan como **dos dimensiones complementarias e independientes**:
1. **Rendimiento Algorítmico (V4-A):** $+13.4\%$ de mejora promedio frente a la heurística humana.
2. **Aceptación Conductual (V4-B):** $X\%$ de adopción observada en compradores reales.

Y se calcula como indicador sintético complementario del proyecto:
$$\boxed{\text{MarketReadinessIndex} = \text{AlgorithmicGain (+13.4%)} \times \text{AcceptanceRate (X%)}}$$

---

## 5. Ficha de Registro de la Entrevista

| Campo | Registro |
| :--- | :--- |
| **ID Participante** | `P-01` a `P-50` |
| **Barrio / Clúster de Cali** | Granada, San Fernando, Versalles, Tequendama, Salomia |
| **Rol Decisorio (`participantRole`)** | Decisor / Comprador / Financiador / Cocinero |
| **Tamaño del Hogar (`householdSize`)** | 1, 2, 3, 4, 5+ |
| **Presupuesto Semanal Real** | $ COP |
| **Tiendas Habituales (`mainStores`)** | D1, Ara, Éxito, Olímpica, Galerías |
| **Preferencia Declarada ($Preference_{\text{declared}}$)** | A (Ahorro) / B (Conveniencia) / C (Cero Desperdicio) |
| **Aceptación Observada ($Acceptance_{\text{observed}}$)** | SÍ / MODIFICA / NO |
| **Tolerancia a 2da Parada** | $2k / $5k / $10k / $15k+ / NUNCA |
| **Interés Real tras ver la solución** | Ahorro / Carga mental del menú / Gramaje exacto |
| **Barrera Principal Identificada** | Fricción física / Desconfianza marcas propias / Complejidad recetas |
| **Observaciones Cualitativas** | Citas textuales del participante |
