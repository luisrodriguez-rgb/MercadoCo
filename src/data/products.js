import { CATEGORIES, STANDARD_UNITS, PERISHABILITY } from '../domain/types.js';

export const ESSENTIAL_PRODUCTS = [
  // --- PROTEINAS ---
  {
    id: 'prod_pechuga_pollo',
    name: 'Pechuga de pollo fresca/congelada',
    category: CATEGORIES.PROTEINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Pechuga sin piel ni hueso (congelable)'
  },
  {
    id: 'prod_carne_molida',
    name: 'Carne molida de res especial',
    category: CATEGORIES.PROTEINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Carne magra molida (congelable)'
  },
  {
    id: 'prod_muslos_pollo',
    name: 'Pernil o muslos de pollo',
    category: CATEGORIES.PROTEINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Perniles de pollo (congelable)'
  },
  {
    id: 'prod_atun_lata',
    name: 'Atún en lomitos en agua o aceite',
    category: CATEGORIES.PROTEINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.STABLE.id,
    description: 'Enlatado de larga vida útil (>2 años)'
  },
  {
    id: 'prod_cerdo_lomo',
    name: 'Lomo de cerdo en filetes',
    category: CATEGORIES.PROTEINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Corte magro de cerdo refrigerado'
  },
  {
    id: 'prod_salchicha_manguera',
    name: 'Salchicha tradicional o de pollo',
    category: CATEGORIES.PROTEINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Embutido refrigerado en paquete'
  },

  // --- LACTEOS Y HUEVOS ---
  {
    id: 'prod_huevos_aa',
    name: 'Huevos rojos tipo AA',
    category: CATEGORIES.DAIRY.id,
    standardUnit: STANDARD_UNITS.UNIT,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Huevos frescos (vida útil 3-4 semanas)'
  },
  {
    id: 'prod_leche_entera',
    name: 'Leche entera o deslactosada UHT',
    category: CATEGORIES.DAIRY.id,
    standardUnit: STANDARD_UNITS.MILLILITER,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Bolsa UHT (cerrada dura 4 semanas, abierta 4 días)'
  },
  {
    id: 'prod_queso_cuajada',
    name: 'Queso campesino o cuajada',
    category: CATEGORIES.DAIRY.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.HIGH.id,
    description: 'Queso fresco de corta conservación (<7 días)'
  },
  {
    id: 'prod_queso_doble_crema',
    name: 'Queso doble crema tajado',
    category: CATEGORIES.DAIRY.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Queso semigraso tajado (2-3 semanas)'
  },
  {
    id: 'prod_mantequilla_margarina',
    name: 'Margarina / Mantequilla para untar',
    category: CATEGORIES.DAIRY.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.STABLE.id,
    description: 'Grasa vegetal/animal de larga conservación'
  },

  // --- GRANOS Y CEREALES ---
  {
    id: 'prod_arroz_blanco',
    name: 'Arroz blanco tradicional',
    category: CATEGORIES.GRAINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.STABLE.id,
    description: 'Grano no perecedero (>6 meses en despensa)'
  },
  {
    id: 'prod_lentejas',
    name: 'Lentejas importadas o nacionales',
    category: CATEGORIES.GRAINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.STABLE.id,
    description: 'Legumbre seca no perecedera (>1 año)'
  },
  {
    id: 'prod_frijol_cargamanto',
    name: 'Fríjol cargamanto o rojo',
    category: CATEGORIES.GRAINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.STABLE.id,
    description: 'Legumbre seca no perecedera'
  },
  {
    id: 'prod_pasta_espagueti',
    name: 'Pasta tipo Espagueti o Pasta corta',
    category: CATEGORIES.GRAINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.STABLE.id,
    description: 'Pasta seca (>1 año)'
  },
  {
    id: 'prod_avena_hojuelas',
    name: 'Avena en hojuelas',
    category: CATEGORIES.GRAINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.STABLE.id,
    description: 'Cereal seco en bolsa'
  },
  {
    id: 'prod_pan_tajado',
    name: 'Pan tajado blanco o integral',
    category: CATEGORIES.GRAINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.HIGH.id,
    description: 'Pan de molde (vida útil ~8-10 días)'
  },
  {
    id: 'prod_arepas_maiz',
    name: 'Arepas de maíz blanco tela/delgadas',
    category: CATEGORIES.GRAINS.id,
    standardUnit: STANDARD_UNITS.UNIT,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Paquete de arepas refrigeradas'
  },

  // --- FRUTAS Y VERDURAS (PRODUCE) ---
  {
    id: 'prod_tomate_chonto',
    name: 'Tomate Chonto maduro',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.HIGH.id,
    description: 'Hortaliza perecedera (vida útil 4-6 días maduro)'
  },
  {
    id: 'prod_cebolla_cabezona',
    name: 'Cebolla cabezona roja o blanca',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Bulbo resistente (vida útil 2-3 semanas)'
  },
  {
    id: 'prod_cebolla_larga',
    name: 'Cebolla larga / junca',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.HIGH.id,
    description: 'Cebolla de tallo fresco (se deshidrata en 5 días)'
  },
  {
    id: 'prod_papa_pastusa',
    name: 'Papa pastusa / parda',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Tubérculo resistente (vida útil 2-3 semanas en seco)'
  },
  {
    id: 'prod_platano_maduro',
    name: 'Plátano maduro o verde',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.UNIT,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Plátano (madura en 5-8 días)'
  },
  {
    id: 'prod_zanahoria',
    name: 'Zanahoria fresca',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Raíz tuberosa (dura 2 semanas refrigerada)'
  },
  {
    id: 'prod_aguacate',
    name: 'Aguacate papelillo o hass',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.UNIT,
    perishability: PERISHABILITY.HIGH.id,
    description: 'Fruta climatérica rápida maduración (3-4 días maduro)'
  },
  {
    id: 'prod_limon_tahiti',
    name: 'Limón común o Tahití',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.UNIT,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Cítrico resistente (dura 2 semanas)'
  },
  {
    id: 'prod_ajo_cabeza',
    name: 'Ajo en cabeza o pasta',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.UNIT,
    perishability: PERISHABILITY.STABLE.id,
    description: 'Bulbo seco de larguísima duración (>2 meses)'
  },
  {
    id: 'prod_cilantro',
    name: 'Cilantro fresco',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.UNIT,
    perishability: PERISHABILITY.HIGH.id,
    description: 'Hierba de muy alta perecibilidad (se mustia en 3 días)'
  },

  // --- DESPENSA Y ABARROTES ---
  {
    id: 'prod_aceite_vegetal',
    name: 'Aceite vegetal para freír/cocinar',
    category: CATEGORIES.PANTRY.id,
    standardUnit: STANDARD_UNITS.MILLILITER,
    perishability: PERISHABILITY.STABLE.id,
    description: 'Grasa líquida estable (>1 año)'
  },
  {
    id: 'prod_panela_bloque',
    name: 'Panela en pastillas o bloque',
    category: CATEGORIES.PANTRY.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.STABLE.id,
    description: 'Sacarosa natural no perecedera'
  },
  {
    id: 'prod_sal_refinada',
    name: 'Sal marina / refinada yodada',
    category: CATEGORIES.PANTRY.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.STABLE.id,
    description: 'Mineral no perecedero'
  },
  {
    id: 'prod_cafe_molido',
    name: 'Café molido tradicional colombiano',
    category: CATEGORIES.PANTRY.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.STABLE.id,
    description: 'Café tostado y molido en empaque valvulado (>6 meses)'
  },
  {
    id: 'prod_pasta_tomate',
    name: 'Pasta o salsa de tomate',
    category: CATEGORIES.PANTRY.id,
    standardUnit: STANDARD_UNITS.GRAM,
    perishability: PERISHABILITY.MEDIUM.id,
    description: 'Doypack procesado (cerrado 6 meses, abierto 7 días)'
  }
];
