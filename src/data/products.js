import { CATEGORIES, STANDARD_UNITS } from '../domain/types.js';

export const ESSENTIAL_PRODUCTS = [
  // --- PROTEINAS ---
  {
    id: 'prod_pechuga_pollo',
    name: 'Pechuga de pollo fresca/congelada',
    category: CATEGORIES.PROTEINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Pechuga sin piel ni hueso'
  },
  {
    id: 'prod_carne_molida',
    name: 'Carne molida de res especial',
    category: CATEGORIES.PROTEINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Carne magra molida para guisos o albóndigas'
  },
  {
    id: 'prod_muslos_pollo',
    name: 'Pernil o muslos de pollo',
    category: CATEGORIES.PROTEINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Ideal para sudados y caldos'
  },
  {
    id: 'prod_atun_lata',
    name: 'Atún en lomitos en agua o aceite',
    category: CATEGORIES.PROTEINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Lata estándar escurrida ~120-140g'
  },
  {
    id: 'prod_cerdo_lomo',
    name: 'Lomo de cerdo en filetes',
    category: CATEGORIES.PROTEINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Corte magro de cerdo para plancha o guiso'
  },
  {
    id: 'prod_salchicha_manguera',
    name: 'Salchicha tradicional o de pollo',
    category: CATEGORIES.PROTEINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Embutido versátil para desayunos y arroces'
  },

  // --- LACTEOS Y HUEVOS ---
  {
    id: 'prod_huevos_aa',
    name: 'Huevos rojos tipo AA',
    category: CATEGORIES.DAIRY.id,
    standardUnit: STANDARD_UNITS.UNIT,
    description: 'Cubeta o paquete de huevos frescos'
  },
  {
    id: 'prod_leche_entera',
    name: 'Leche entera o deslactosada UHT',
    category: CATEGORIES.DAIRY.id,
    standardUnit: STANDARD_UNITS.MILLILITER,
    description: 'Bolsa o caja de 900ml a 1000ml'
  },
  {
    id: 'prod_queso_cuajada',
    name: 'Queso campesino o cuajada',
    category: CATEGORIES.DAIRY.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Queso fresco bajo en sal'
  },
  {
    id: 'prod_queso_doble_crema',
    name: 'Queso doble crema tajado',
    category: CATEGORIES.DAIRY.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Queso semigraso para sándwiches y arepas'
  },
  {
    id: 'prod_mantequilla_margarina',
    name: 'Margarina / Mantequilla para untar',
    category: CATEGORIES.DAIRY.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Pote o barra para cocinar'
  },

  // --- GRANOS Y CEREALES ---
  {
    id: 'prod_arroz_blanco',
    name: 'Arroz blanco tradicional',
    category: CATEGORIES.GRAINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Bolsa 1kg o 5kg'
  },
  {
    id: 'prod_lentejas',
    name: 'Lentejas importadas o nacionales',
    category: CATEGORIES.GRAINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Paquete 500g o 1000g'
  },
  {
    id: 'prod_frijol_cargamanto',
    name: 'Fríjol cargamanto o rojo',
    category: CATEGORIES.GRAINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Base de fríjol colombiano'
  },
  {
    id: 'prod_pasta_espagueti',
    name: 'Pasta tipo Espagueti o Pasta corta',
    category: CATEGORIES.GRAINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Paquete de 250g o 500g'
  },
  {
    id: 'prod_avena_hojuelas',
    name: 'Avena en hojuelas',
    category: CATEGORIES.GRAINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Bolsa de 400g a 500g'
  },
  {
    id: 'prod_pan_tajado',
    name: 'Pan tajado blanco o integral',
    category: CATEGORIES.GRAINS.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Bolsa de 400g a 500g'
  },
  {
    id: 'prod_arepas_maiz',
    name: 'Arepas de maíz blanco tela/delgadas',
    category: CATEGORIES.GRAINS.id,
    standardUnit: STANDARD_UNITS.UNIT,
    description: 'Paquete x 5 o 10 unidades'
  },

  // --- FRUTAS Y VERDURAS (PRODUCE) ---
  {
    id: 'prod_tomate_chonto',
    name: 'Tomate Chonto maduro',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Base del hogao y ensaladas'
  },
  {
    id: 'prod_cebolla_cabezona',
    name: 'Cebolla cabezona roja o blanca',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Condimento indispensable'
  },
  {
    id: 'prod_cebolla_larga',
    name: 'Cebolla larga / junca',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Manojo para guisos y sopas'
  },
  {
    id: 'prod_papa_pastusa',
    name: 'Papa pastusa / parda',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Papa de año para sudados y puré'
  },
  {
    id: 'prod_platano_maduro',
    name: 'Plátano maduro o verde',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.UNIT,
    description: 'Para tajadas, patacones o sopas'
  },
  {
    id: 'prod_zanahoria',
    name: 'Zanahoria fresca',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Para ensaladas y arroz'
  },
  {
    id: 'prod_aguacate',
    name: 'Aguacate papelillo o hass',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.UNIT,
    description: 'Acompañamiento infaltable'
  },
  {
    id: 'prod_limon_tahiti',
    name: 'Limón común o Tahití',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.UNIT,
    description: 'Para aliños y limonada'
  },
  {
    id: 'prod_ajo_cabeza',
    name: 'Ajo en cabeza o pasta',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.UNIT,
    description: 'Condimento esencial'
  },
  {
    id: 'prod_cilantro',
    name: 'Cilantro fresco',
    category: CATEGORIES.PRODUCE.id,
    standardUnit: STANDARD_UNITS.UNIT,
    description: 'Atado de hierba aromática'
  },

  // --- DESPENSA Y ABARROTES ---
  {
    id: 'prod_aceite_vegetal',
    name: 'Aceite vegetal para freír/cocinar',
    category: CATEGORIES.PANTRY.id,
    standardUnit: STANDARD_UNITS.MILLILITER,
    description: 'Botella de 900ml o 1000ml'
  },
  {
    id: 'prod_panela_bloque',
    name: 'Panela en pastillas o bloque',
    category: CATEGORIES.PANTRY.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Para aguapanela y endulzar'
  },
  {
    id: 'prod_sal_refinada',
    name: 'Sal marina / refinada yodada',
    category: CATEGORIES.PANTRY.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Bolsa de 1000g'
  },
  {
    id: 'prod_cafe_molido',
    name: 'Café molido tradicional colombiano',
    category: CATEGORIES.PANTRY.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Bolsa de 250g o 500g'
  },
  {
    id: 'prod_pasta_tomate',
    name: 'Pasta o salsa de tomate',
    category: CATEGORIES.PANTRY.id,
    standardUnit: STANDARD_UNITS.GRAM,
    description: 'Doypack de 200g a 400g'
  }
];
