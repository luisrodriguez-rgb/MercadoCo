/**
 * Catálogo Maestro de Recetas Típicas Colombianas Cuantificadas por Porción
 * Cada ingrediente especifica la cantidad necesaria por comensal en unidades estándar (g, ml, un).
 */

export const COLOMBIAN_RECIPES = [
  {
    id: 'rec_lentejas_arroz_huevo',
    name: 'Lentejas caseras con arroz, huevo y tajadas',
    category: 'Almuerzo tradicional',
    mealType: 'LUNCH',
    description: 'Lentejas guisadas con hogao criollo, acompañadas de arroz blanco, huevo frito y tajadas de plátano maduro.',
    difficulty: 'Fácil',
    prepTimeMinutes: 35,
    costTier: 'ECONOMICO', // ECONOMICO | MEDIO | PREMIUM
    ingredientsPerServing: [
      { productId: 'prod_lentejas', amount: 80, unit: 'g' },
      { productId: 'prod_arroz_blanco', amount: 80, unit: 'g' },
      { productId: 'prod_huevos_aa', amount: 1, unit: 'un' },
      { productId: 'prod_platano_maduro', amount: 0.5, unit: 'un' },
      { productId: 'prod_tomate_chonto', amount: 50, unit: 'g' },
      { productId: 'prod_cebolla_larga', amount: 20, unit: 'g' },
      { productId: 'prod_ajo_cabeza', amount: 0.2, unit: 'un' },
      { productId: 'prod_aceite_vegetal', amount: 15, unit: 'ml' },
      { productId: 'prod_sal_refinada', amount: 3, unit: 'g' }
    ]
  },
  {
    id: 'rec_pechuga_pure_ensalada',
    name: 'Pechuga a la plancha con puré de papa y ensalada',
    category: 'Almuerzo balanceado',
    mealType: 'LUNCH',
    description: 'Filete de pechuga dorada con puré suave de papa pastusa con toque de mantequilla y ensalada de tomate y cebolla.',
    difficulty: 'Fácil',
    prepTimeMinutes: 30,
    costTier: 'MEDIO',
    ingredientsPerServing: [
      { productId: 'prod_pechuga_pollo', amount: 160, unit: 'g' },
      { productId: 'prod_papa_pastusa', amount: 250, unit: 'g' },
      { productId: 'prod_mantequilla_margarina', amount: 15, unit: 'g' },
      { productId: 'prod_leche_entera', amount: 30, unit: 'ml' },
      { productId: 'prod_tomate_chonto', amount: 70, unit: 'g' },
      { productId: 'prod_cebolla_cabezona', amount: 40, unit: 'g' },
      { productId: 'prod_limon_tahiti', amount: 0.5, unit: 'un' },
      { productId: 'prod_aceite_vegetal', amount: 10, unit: 'ml' },
      { productId: 'prod_sal_refinada', amount: 3, unit: 'g' }
    ]
  },
  {
    id: 'rec_pollo_sudado_papa_arroz',
    name: 'Pollo sudado criollo con papa y arroz',
    category: 'Almuerzo reconfortante',
    mealType: 'LUNCH',
    description: 'Pernil o muslo de pollo cocinado a fuego lento en hogao de tomate, cebolla y cilantro con papas tiernas y arroz.',
    difficulty: 'Media',
    prepTimeMinutes: 45,
    costTier: 'ECONOMICO',
    ingredientsPerServing: [
      { productId: 'prod_muslos_pollo', amount: 250, unit: 'g' },
      { productId: 'prod_papa_pastusa', amount: 200, unit: 'g' },
      { productId: 'prod_arroz_blanco', amount: 80, unit: 'g' },
      { productId: 'prod_tomate_chonto', amount: 60, unit: 'g' },
      { productId: 'prod_cebolla_larga', amount: 25, unit: 'g' },
      { productId: 'prod_cilantro', amount: 0.15, unit: 'un' },
      { productId: 'prod_aceite_vegetal', amount: 10, unit: 'ml' },
      { productId: 'prod_sal_refinada', amount: 3, unit: 'g' }
    ]
  },
  {
    id: 'rec_frijoles_arroz_molida',
    name: 'Fríjoles colombianos con arroz, molida y aguacate',
    category: 'Plato fuerte paisa',
    mealType: 'LUNCH',
    description: 'Cazuelita de fríjoles rojos espesos acompañados de arroz blanco, carne molida sofrita y tajada de aguacate.',
    difficulty: 'Media',
    prepTimeMinutes: 50,
    costTier: 'MEDIO',
    ingredientsPerServing: [
      { productId: 'prod_frijol_cargamanto', amount: 90, unit: 'g' },
      { productId: 'prod_carne_molida', amount: 110, unit: 'g' },
      { productId: 'prod_arroz_blanco', amount: 80, unit: 'g' },
      { productId: 'prod_aguacate', amount: 0.5, unit: 'un' },
      { productId: 'prod_tomate_chonto', amount: 50, unit: 'g' },
      { productId: 'prod_cebolla_cabezona', amount: 30, unit: 'g' },
      { productId: 'prod_aceite_vegetal', amount: 12, unit: 'ml' },
      { productId: 'prod_sal_refinada', amount: 4, unit: 'g' }
    ]
  },
  {
    id: 'rec_espagueti_carne_molida',
    name: 'Espaguetis con salsa bolognesa criolla y queso',
    category: 'Pasta rinde mucho',
    mealType: 'LUNCH',
    description: 'Pasta al dente con carne molida guisada en salsa de tomate natural, hogao y queso fundido encima.',
    difficulty: 'Fácil',
    prepTimeMinutes: 25,
    costTier: 'ECONOMICO',
    ingredientsPerServing: [
      { productId: 'prod_pasta_espagueti', amount: 100, unit: 'g' },
      { productId: 'prod_carne_molida', amount: 100, unit: 'g' },
      { productId: 'prod_pasta_tomate', amount: 40, unit: 'g' },
      { productId: 'prod_tomate_chonto', amount: 40, unit: 'g' },
      { productId: 'prod_cebolla_cabezona', amount: 30, unit: 'g' },
      { productId: 'prod_queso_doble_crema', amount: 30, unit: 'g' },
      { productId: 'prod_aceite_vegetal', amount: 10, unit: 'ml' },
      { productId: 'prod_sal_refinada', amount: 3, unit: 'g' }
    ]
  },
  {
    id: 'rec_arroz_atun_verduras',
    name: 'Arroz con atún, zanahoria y huevo cocido',
    category: 'Rápido y rendidor',
    mealType: 'DINNER',
    description: 'Arroz sofrito con lomitos de atún, zanahoria rallada, cebollita y huevo cocido tajado.',
    difficulty: 'Muy Fácil',
    prepTimeMinutes: 20,
    costTier: 'ECONOMICO',
    ingredientsPerServing: [
      { productId: 'prod_atun_lata', amount: 70, unit: 'g' },
      { productId: 'prod_arroz_blanco', amount: 90, unit: 'g' },
      { productId: 'prod_huevos_aa', amount: 1, unit: 'un' },
      { productId: 'prod_zanahoria', amount: 50, unit: 'g' },
      { productId: 'prod_cebolla_cabezona', amount: 30, unit: 'g' },
      { productId: 'prod_limon_tahiti', amount: 0.5, unit: 'un' },
      { productId: 'prod_aceite_vegetal', amount: 10, unit: 'ml' },
      { productId: 'prod_sal_refinada', amount: 2, unit: 'g' }
    ]
  },
  {
    id: 'rec_lomo_cerdo_arepa_ensalada',
    name: 'Lomo de cerdo a la plancha con arepa y ensalada',
    category: 'Cena o Almuerzo ligero',
    mealType: 'DINNER',
    description: 'Filete magro de lomo de cerdo sellado con arepa de maíz blanco asada y ensalada fresca de tomate con aguacate.',
    difficulty: 'Fácil',
    prepTimeMinutes: 20,
    costTier: 'MEDIO',
    ingredientsPerServing: [
      { productId: 'prod_cerdo_lomo', amount: 150, unit: 'g' },
      { productId: 'prod_arepas_maiz', amount: 1.5, unit: 'un' },
      { productId: 'prod_tomate_chonto', amount: 60, unit: 'g' },
      { productId: 'prod_aguacate', amount: 0.35, unit: 'un' },
      { productId: 'prod_limon_tahiti', amount: 0.5, unit: 'un' },
      { productId: 'prod_aceite_vegetal', amount: 8, unit: 'ml' },
      { productId: 'prod_sal_refinada', amount: 2, unit: 'g' }
    ]
  },
  {
    id: 'rec_huevos_pericos_arepa_queso',
    name: 'Huevos pericos con arepa de maíz y queso campesino',
    category: 'Desayuno o Cena tradicional',
    mealType: 'DINNER',
    description: 'Huevos revueltos con tomate y cebolla larga bien sofrita, arepa caliente con mantequilla y tajada de queso cuajada.',
    difficulty: 'Muy Fácil',
    prepTimeMinutes: 15,
    costTier: 'ECONOMICO',
    ingredientsPerServing: [
      { productId: 'prod_huevos_aa', amount: 2, unit: 'un' },
      { productId: 'prod_tomate_chonto', amount: 40, unit: 'g' },
      { productId: 'prod_cebolla_larga', amount: 20, unit: 'g' },
      { productId: 'prod_arepas_maiz', amount: 1.5, unit: 'un' },
      { productId: 'prod_queso_cuajada', amount: 50, unit: 'g' },
      { productId: 'prod_mantequilla_margarina', amount: 10, unit: 'g' },
      { productId: 'prod_sal_refinada', amount: 2, unit: 'g' }
    ]
  },
  {
    id: 'rec_arroz_salchicha_platano',
    name: 'Arroz con salchicha guisada y tajadas de maduro',
    category: 'Clásico familiar económico',
    mealType: 'DINNER',
    description: 'Salchichas en rodajas doradas integradas al arroz con sofrito criollo y dulces tajadas de maduro.',
    difficulty: 'Fácil',
    prepTimeMinutes: 25,
    costTier: 'ECONOMICO',
    ingredientsPerServing: [
      { productId: 'prod_salchicha_manguera', amount: 90, unit: 'g' },
      { productId: 'prod_arroz_blanco', amount: 80, unit: 'g' },
      { productId: 'prod_platano_maduro', amount: 0.5, unit: 'un' },
      { productId: 'prod_tomate_chonto', amount: 40, unit: 'g' },
      { productId: 'prod_cebolla_larga', amount: 20, unit: 'g' },
      { productId: 'prod_aceite_vegetal', amount: 12, unit: 'ml' },
      { productId: 'prod_sal_refinada', amount: 2, unit: 'g' }
    ]
  },
  {
    id: 'rec_sandwich_salchicha_queso_cafe',
    name: 'Sándwich tostado de queso doble crema y salchicha + Café con leche',
    category: 'Cena rápida',
    mealType: 'DINNER',
    description: 'Pan tajado dorado con salchicha dorada y queso derretido, acompañado de café con leche colombiano caliente.',
    difficulty: 'Muy Fácil',
    prepTimeMinutes: 12,
    costTier: 'ECONOMICO',
    ingredientsPerServing: [
      { productId: 'prod_pan_tajado', amount: 70, unit: 'g' }, // ~2 tajadas
      { productId: 'prod_queso_doble_crema', amount: 40, unit: 'g' },
      { productId: 'prod_salchicha_manguera', amount: 60, unit: 'g' },
      { productId: 'prod_mantequilla_margarina', amount: 10, unit: 'g' },
      { productId: 'prod_leche_entera', amount: 150, unit: 'ml' },
      { productId: 'prod_cafe_molido', amount: 10, unit: 'g' },
      { productId: 'prod_panela_bloque', amount: 15, unit: 'g' }
    ]
  }
];
