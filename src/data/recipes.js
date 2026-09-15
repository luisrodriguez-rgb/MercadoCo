/**
 * Catálogo Maestro de Recetas Colombianas Cuantificadas por Porción
 * Cantidades unitarias en unidades estándar (g, ml, un) para formulación exacta de canasta.
 */

export const COLOMBIAN_RECIPES = [
  {
    id: 'rec_lentejas_arroz_huevo',
    name: 'Lentejas guisadas con arroz blanco, huevo y tajadas',
    category: 'Almuerzo tradicional',
    mealType: 'LUNCH',
    description: 'Lentejas cocidas a fuego lento con hogao tradicional de cebolla y tomate, servidas con arroz blanco, huevo y plátano maduro.',
    difficulty: 'Fácil',
    prepTimeMinutes: 35,
    costTier: 'ECONOMICO',
    nutritionalFocus: 'Alto contenido de hierro y fibra vegetal',
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
    name: 'Pechuga a la plancha con puré de papa y ensalada fresca',
    category: 'Almuerzo balanceado',
    mealType: 'LUNCH',
    description: 'Filete magro de pechuga sellado con puré de papa pastusa enriquecido y ensalada fresca de tomate y cebolla aliñada con limón.',
    difficulty: 'Fácil',
    prepTimeMinutes: 30,
    costTier: 'MEDIO',
    nutritionalFocus: 'Alto contenido proteico bajo en grasa saturada',
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
    name: 'Pollo sudado criollo con papa pastusa y arroz',
    category: 'Almuerzo rendidor',
    mealType: 'LUNCH',
    description: 'Pernil de pollo estofado en caldo reducido de tomate chonto, cebolla junca y cilantro fresco con papas cocidas.',
    difficulty: 'Media',
    prepTimeMinutes: 45,
    costTier: 'ECONOMICO',
    nutritionalFocus: 'Proteína completa con colágeno y carbohidratos complejos',
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
    name: 'Cazuela de fríjoles rojos con carne molida y aguacate',
    category: 'Plato regional',
    mealType: 'LUNCH',
    description: 'Fríjoles cargamanto caldosos con sofrito criollo, acompañados de porción de carne molida magra, arroz blanco y aguacate fresco.',
    difficulty: 'Media',
    prepTimeMinutes: 50,
    costTier: 'MEDIO',
    nutritionalFocus: 'Proteína dual animal/vegetal y grasas monoinsaturadas',
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
    name: 'Pasta espagueti con boloñesa criolla y queso gratinado',
    category: 'Pasta y carne',
    mealType: 'LUNCH',
    description: 'Pasta espagueti salteada con salsa reducida de carne molida, pasta de tomate y hogao, terminada con queso doble crema.',
    difficulty: 'Fácil',
    prepTimeMinutes: 25,
    costTier: 'ECONOMICO',
    nutritionalFocus: 'Energía sostenida y densidad calórica controlada',
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
    name: 'Arroz salteado con atún, zanahoria y huevo cocido',
    category: 'Cena rápida',
    mealType: 'DINNER',
    description: 'Arroz blanco salteado con lomitos de atún escurrido, julianas de zanahoria, cebolla y huevo cocido tajado.',
    difficulty: 'Fácil',
    prepTimeMinutes: 20,
    costTier: 'ECONOMICO',
    nutritionalFocus: 'Omega 3 y proteína de alto valor biológico',
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
    name: 'Lomo de cerdo a la plancha con arepa de maíz y ensalada',
    category: 'Cena ligera',
    mealType: 'DINNER',
    description: 'Filete magro de lomo de cerdo sellado a fuego alto con arepa de maíz blanco asada y ensalada de tomate y aguacate.',
    difficulty: 'Fácil',
    prepTimeMinutes: 20,
    costTier: 'MEDIO',
    nutritionalFocus: 'Tiamina, zinc y proteína magra con mínimo carbohidrato',
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
    name: 'Huevos pericos tradicionales con arepa y queso campesino',
    category: 'Cena o desayuno',
    mealType: 'DINNER',
    description: 'Huevos revueltos preparados en hogao de cebolla larga y tomate fresco, servidos con arepa de maíz caliente y queso campesino.',
    difficulty: 'Fácil',
    prepTimeMinutes: 15,
    costTier: 'ECONOMICO',
    nutritionalFocus: 'Calcio y proteína de rápida digestión',
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
    name: 'Arroz con salchicha guisada y tajadas de plátano',
    category: 'Cena económica',
    mealType: 'DINNER',
    description: 'Arroz salteado con rodajas doradas de salchicha, sofrito de tomate y cebolla junca con tajadas horneadas de plátano maduro.',
    difficulty: 'Fácil',
    prepTimeMinutes: 25,
    costTier: 'ECONOMICO',
    nutritionalFocus: 'Carbohidratos complejos y saciedad eficiente',
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
    name: 'Sándwich tostado de queso doble crema y café con leche',
    category: 'Cena rápida',
    mealType: 'DINNER',
    description: 'Sándwich de pan de molde tostado con salchicha dorada y queso doble crema fundido, acompañado de café con leche campesino.',
    difficulty: 'Fácil',
    prepTimeMinutes: 12,
    costTier: 'ECONOMICO',
    nutritionalFocus: 'Preparación express de bajo costo unitario',
    ingredientsPerServing: [
      { productId: 'prod_pan_tajado', amount: 70, unit: 'g' },
      { productId: 'prod_queso_doble_crema', amount: 40, unit: 'g' },
      { productId: 'prod_salchicha_manguera', amount: 60, unit: 'g' },
      { productId: 'prod_mantequilla_margarina', amount: 10, unit: 'g' },
      { productId: 'prod_leche_entera', amount: 150, unit: 'ml' },
      { productId: 'prod_cafe_molido', amount: 10, unit: 'g' },
      { productId: 'prod_panela_bloque', amount: 15, unit: 'g' }
    ]
  }
];
