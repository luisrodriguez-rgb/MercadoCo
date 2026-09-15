import { CONFIDENCE_LEVELS } from '../domain/types.js';

/**
 * Matriz de Precios Reales y Referenciados en Cali (Valle del Cauca)
 * Tiendas: D1, Tiendas Ara, Grupo Éxito
 * Incluye modelado de empaque discreto (malla/bolsa sellada) vs. granel continuo (báscula Éxito).
 */
export const PRICES_CALI = [
  // --- PECHUGA DE POLLO ---
  {
    productId: 'prod_pechuga_pollo',
    storeId: 'D1',
    brand: 'Del Galpón / D1',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 13900,
    pricePerUnit: 13.90,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bandeja sellada de peso fijo'
  },
  {
    productId: 'prod_pechuga_pollo',
    storeId: 'ARA',
    brand: 'De la Huerta / Ara',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 14200,
    pricePerUnit: 14.20,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Bolsa congelada de peso fijo'
  },
  {
    productId: 'prod_pechuga_pollo',
    storeId: 'EXITO',
    brand: 'Pollo Fiesta / Éxito',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 16900,
    pricePerUnit: 16.90,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: true, // Se puede pedir por peso exacto en carnicería
    notes: 'Carnicería Éxito pesada a solicitud'
  },

  // --- CARNE MOLIDA ---
  {
    productId: 'prod_carne_molida',
    storeId: 'D1',
    brand: 'Carnes D1',
    packageSize: 500,
    unit: 'g',
    priceCOP: 10900,
    pricePerUnit: 21.80,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bandeja atmósfera modificada 500g'
  },
  {
    productId: 'prod_carne_molida',
    storeId: 'ARA',
    brand: 'Carnes Ara',
    packageSize: 500,
    unit: 'g',
    priceCOP: 10500,
    pricePerUnit: 21.00,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bandeja sellada 500g'
  },
  {
    productId: 'prod_carne_molida',
    storeId: 'EXITO',
    brand: 'Éxito Tradicional',
    packageSize: 500,
    unit: 'g',
    priceCOP: 13500,
    pricePerUnit: 27.00,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: true,
    notes: 'Molida en punto por gramo requerido'
  },

  // --- PERNIL / MUSLOS DE POLLO ---
  {
    productId: 'prod_muslos_pollo',
    storeId: 'D1',
    brand: 'Del Galpón',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 8900,
    pricePerUnit: 8.90,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Pernil con rabadilla bolsa'
  },
  {
    productId: 'prod_muslos_pollo',
    storeId: 'ARA',
    brand: 'Pernil Ara',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 8700,
    pricePerUnit: 8.70,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Pernil congelado 1kg'
  },
  {
    productId: 'prod_muslos_pollo',
    storeId: 'EXITO',
    brand: 'Taeq / Éxito',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 11200,
    pricePerUnit: 11.20,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: true,
    notes: 'Mostrador de carnes a granel'
  },

  // --- ATUN EN LATA ---
  {
    productId: 'prod_atun_lata',
    storeId: 'D1',
    brand: 'Punta del Este (D1)',
    packageSize: 140,
    unit: 'g',
    priceCOP: 4890,
    pricePerUnit: 34.92,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Lata estándar 140g'
  },
  {
    productId: 'prod_atun_lata',
    storeId: 'ARA',
    brand: 'Atenea (Ara)',
    packageSize: 140,
    unit: 'g',
    priceCOP: 4790,
    pricePerUnit: 34.21,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Lata 140g aceite'
  },
  {
    productId: 'prod_atun_lata',
    storeId: 'EXITO',
    brand: 'Van Camp\'s',
    packageSize: 160,
    unit: 'g',
    priceCOP: 7900,
    pricePerUnit: 49.37,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Lata 160g marca líder'
  },

  // --- LOMO DE CERDO ---
  {
    productId: 'prod_cerdo_lomo',
    storeId: 'D1',
    brand: 'D1 Carnes',
    packageSize: 500,
    unit: 'g',
    priceCOP: 9900,
    pricePerUnit: 19.80,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Bandeja 500g'
  },
  {
    productId: 'prod_cerdo_lomo',
    storeId: 'ARA',
    brand: 'Ara Cerdo',
    packageSize: 500,
    unit: 'g',
    priceCOP: 9600,
    pricePerUnit: 19.20,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bandeja 500g filetes'
  },
  {
    productId: 'prod_cerdo_lomo',
    storeId: 'EXITO',
    brand: 'Éxito Frescos',
    packageSize: 500,
    unit: 'g',
    priceCOP: 12400,
    pricePerUnit: 24.80,
    confidence: CONFIDENCE_LEVELS.ESTIMATED.level,
    isBulkWeighed: true,
    notes: 'Lomo porción cortada en báscula'
  },

  // --- SALCHICHA ---
  {
    productId: 'prod_salchicha_manguera',
    storeId: 'D1',
    brand: 'Brunch (D1)',
    packageSize: 450,
    unit: 'g',
    priceCOP: 5490,
    pricePerUnit: 12.20,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Paquete manguera sellado'
  },
  {
    productId: 'prod_salchicha_manguera',
    storeId: 'ARA',
    brand: 'Montefrío (Ara)',
    packageSize: 500,
    unit: 'g',
    priceCOP: 5600,
    pricePerUnit: 11.20,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Paquete sellado 500g'
  },
  {
    productId: 'prod_salchicha_manguera',
    storeId: 'EXITO',
    brand: 'Zenú Tradicional',
    packageSize: 450,
    unit: 'g',
    priceCOP: 8900,
    pricePerUnit: 19.77,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Paquete Zenú'
  },

  // --- HUEVOS AA (30 UNIDADES) ---
  {
    productId: 'prod_huevos_aa',
    storeId: 'D1',
    brand: 'San Marino / D1',
    packageSize: 30,
    unit: 'un',
    priceCOP: 15900,
    pricePerUnit: 530.0,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Panal cubeta x30'
  },
  {
    productId: 'prod_huevos_aa',
    storeId: 'ARA',
    brand: 'Granja Ara',
    packageSize: 30,
    unit: 'un',
    priceCOP: 15400,
    pricePerUnit: 513.33,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Cubeta x30 huevos AA'
  },
  {
    productId: 'prod_huevos_aa',
    storeId: 'EXITO',
    brand: 'Santa Reyes / Éxito',
    packageSize: 30,
    unit: 'un',
    priceCOP: 18900,
    pricePerUnit: 630.0,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Cubeta x30'
  },

  // --- LECHE ENTERA UHT (1000ml) ---
  {
    productId: 'prod_leche_entera',
    storeId: 'D1',
    brand: 'Latti (D1)',
    packageSize: 1000,
    unit: 'ml',
    priceCOP: 3690,
    pricePerUnit: 3.69,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 1L UHT'
  },
  {
    productId: 'prod_leche_entera',
    storeId: 'ARA',
    brand: 'Alquería / Montefrío',
    packageSize: 900,
    unit: 'ml',
    priceCOP: 3490,
    pricePerUnit: 3.87,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 900ml'
  },
  {
    productId: 'prod_leche_entera',
    storeId: 'EXITO',
    brand: 'Colanta / Éxito',
    packageSize: 1000,
    unit: 'ml',
    priceCOP: 4400,
    pricePerUnit: 4.40,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Bolsa 1000ml'
  },

  // --- QUESO CUAJADA / CAMPESINO ---
  {
    productId: 'prod_queso_cuajada',
    storeId: 'D1',
    brand: 'Latti Campesino',
    packageSize: 400,
    unit: 'g',
    priceCOP: 6890,
    pricePerUnit: 17.22,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bloque sellado 400g'
  },
  {
    productId: 'prod_queso_cuajada',
    storeId: 'ARA',
    brand: 'De la Granja',
    packageSize: 400,
    unit: 'g',
    priceCOP: 6700,
    pricePerUnit: 16.75,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Bloque sellado 400g'
  },
  {
    productId: 'prod_queso_cuajada',
    storeId: 'EXITO',
    brand: 'Colanta Campesino',
    packageSize: 450,
    unit: 'g',
    priceCOP: 9900,
    pricePerUnit: 22.00,
    confidence: CONFIDENCE_LEVELS.ESTIMATED.level,
    isBulkWeighed: true,
    notes: 'Corte en balanza lácteos'
  },

  // --- QUESO DOBLE CREMA TAJADO ---
  {
    productId: 'prod_queso_doble_crema',
    storeId: 'D1',
    brand: 'Latti Doble Crema',
    packageSize: 300,
    unit: 'g',
    priceCOP: 7490,
    pricePerUnit: 24.96,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Paquete tajado 300g'
  },
  {
    productId: 'prod_queso_doble_crema',
    storeId: 'ARA',
    brand: 'Montefrío Doble Crema',
    packageSize: 300,
    unit: 'g',
    priceCOP: 7290,
    pricePerUnit: 24.30,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Paquete tajado 300g'
  },
  {
    productId: 'prod_queso_doble_crema',
    storeId: 'EXITO',
    brand: 'Alpina Tajado',
    packageSize: 320,
    unit: 'g',
    priceCOP: 11900,
    pricePerUnit: 37.18,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Empaque Alpina 320g'
  },

  // --- MARGARINA / MANTEQUILLA ---
  {
    productId: 'prod_mantequilla_margarina',
    storeId: 'D1',
    brand: 'Aura Margarina',
    packageSize: 250,
    unit: 'g',
    priceCOP: 3390,
    pricePerUnit: 13.56,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Pote 250g con sal'
  },
  {
    productId: 'prod_mantequilla_margarina',
    storeId: 'ARA',
    brand: 'Vigor Margarina',
    packageSize: 250,
    unit: 'g',
    priceCOP: 3290,
    pricePerUnit: 13.16,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Pote 250g suave'
  },
  {
    productId: 'prod_mantequilla_margarina',
    storeId: 'EXITO',
    brand: 'Rama Original',
    packageSize: 250,
    unit: 'g',
    priceCOP: 5600,
    pricePerUnit: 22.40,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Pote Rama 250g'
  },

  // --- ARROZ BLANCO (1000g) ---
  {
    productId: 'prod_arroz_blanco',
    storeId: 'D1',
    brand: 'Arroz Castellano (D1)',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 3990,
    pricePerUnit: 3.99,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 1kg sellada'
  },
  {
    productId: 'prod_arroz_blanco',
    storeId: 'ARA',
    brand: 'Arroz Bonarroz (Ara)',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 3950,
    pricePerUnit: 3.95,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 1kg sellada'
  },
  {
    productId: 'prod_arroz_blanco',
    storeId: 'EXITO',
    brand: 'Arroz Roa o Diana',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 4900,
    pricePerUnit: 4.90,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Bolsa 1kg marca líder'
  },

  // --- LENTEJAS (500g) ---
  {
    productId: 'prod_lentejas',
    storeId: 'D1',
    brand: 'D1 Granos',
    packageSize: 500,
    unit: 'g',
    priceCOP: 3290,
    pricePerUnit: 6.58,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 500g'
  },
  {
    productId: 'prod_lentejas',
    storeId: 'ARA',
    brand: 'De la Cosecha (Ara)',
    packageSize: 500,
    unit: 'g',
    priceCOP: 3190,
    pricePerUnit: 6.38,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 500g'
  },
  {
    productId: 'prod_lentejas',
    storeId: 'EXITO',
    brand: 'Éxito Granos',
    packageSize: 500,
    unit: 'g',
    priceCOP: 4200,
    pricePerUnit: 8.40,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Bolsa 500g'
  },

  // --- FRIJOL CARGAMANTO (500g) ---
  {
    productId: 'prod_frijol_cargamanto',
    storeId: 'D1',
    brand: 'D1 Granos',
    packageSize: 500,
    unit: 'g',
    priceCOP: 5490,
    pricePerUnit: 10.98,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 500g'
  },
  {
    productId: 'prod_frijol_cargamanto',
    storeId: 'ARA',
    brand: 'De la Cosecha (Ara)',
    packageSize: 500,
    unit: 'g',
    priceCOP: 5390,
    pricePerUnit: 10.78,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 500g'
  },
  {
    productId: 'prod_frijol_cargamanto',
    storeId: 'EXITO',
    brand: 'La Abuela / Diana',
    packageSize: 500,
    unit: 'g',
    priceCOP: 7100,
    pricePerUnit: 14.20,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Bolsa 500g'
  },

  // --- PASTA ESPAGUETI (500g) ---
  {
    productId: 'prod_pasta_espagueti',
    storeId: 'D1',
    brand: 'Pastas Capri (D1)',
    packageSize: 500,
    unit: 'g',
    priceCOP: 2690,
    pricePerUnit: 5.38,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Paquete 500g'
  },
  {
    productId: 'prod_pasta_espagueti',
    storeId: 'ARA',
    brand: 'Pastas Delizia (Ara)',
    packageSize: 500,
    unit: 'g',
    priceCOP: 2590,
    pricePerUnit: 5.18,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Paquete 500g'
  },
  {
    productId: 'prod_pasta_espagueti',
    storeId: 'EXITO',
    brand: 'Doria Espagueti',
    packageSize: 500,
    unit: 'g',
    priceCOP: 4100,
    pricePerUnit: 8.20,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Paquete Doria 500g'
  },

  // --- AVENA EN HOJUELAS (400g) ---
  {
    productId: 'prod_avena_hojuelas',
    storeId: 'D1',
    brand: 'D1 Cereales',
    packageSize: 400,
    unit: 'g',
    priceCOP: 2990,
    pricePerUnit: 7.47,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 400g'
  },
  {
    productId: 'prod_avena_hojuelas',
    storeId: 'ARA',
    brand: 'Avena Ara',
    packageSize: 400,
    unit: 'g',
    priceCOP: 2890,
    pricePerUnit: 7.22,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 400g'
  },
  {
    productId: 'prod_avena_hojuelas',
    storeId: 'EXITO',
    brand: 'Quaker Tradicional',
    packageSize: 400,
    unit: 'g',
    priceCOP: 5200,
    pricePerUnit: 13.00,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Bolsa Quaker'
  },

  // --- PAN TAJADO ---
  {
    productId: 'prod_pan_tajado',
    storeId: 'D1',
    brand: 'Brot (D1)',
    packageSize: 450,
    unit: 'g',
    priceCOP: 4190,
    pricePerUnit: 9.31,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 450g'
  },
  {
    productId: 'prod_pan_tajado',
    storeId: 'ARA',
    brand: 'Bonavita (Ara)',
    packageSize: 450,
    unit: 'g',
    priceCOP: 3990,
    pricePerUnit: 8.87,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 450g'
  },
  {
    productId: 'prod_pan_tajado',
    storeId: 'EXITO',
    brand: 'Bimbo Blanco Grande',
    packageSize: 550,
    unit: 'g',
    priceCOP: 7900,
    pricePerUnit: 14.36,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Bolsa Bimbo 550g'
  },

  // --- AREPAS DE MAIZ (10 UNIDADES) ---
  {
    productId: 'prod_arepas_maiz',
    storeId: 'D1',
    brand: 'Doña Paisa (D1)',
    packageSize: 10,
    unit: 'un',
    priceCOP: 3190,
    pricePerUnit: 319.0,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Paquete x10 unidades'
  },
  {
    productId: 'prod_arepas_maiz',
    storeId: 'ARA',
    brand: 'Tradición Paisa (Ara)',
    packageSize: 10,
    unit: 'un',
    priceCOP: 2990,
    pricePerUnit: 299.0,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Paquete x10 unidades'
  },
  {
    productId: 'prod_arepas_maiz',
    storeId: 'EXITO',
    brand: 'La Paisana / Éxito',
    packageSize: 10,
    unit: 'un',
    priceCOP: 4500,
    pricePerUnit: 450.0,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Paquete x10'
  },

  // --- TOMATE CHONTO (1000g) ---
  {
    productId: 'prod_tomate_chonto',
    storeId: 'D1',
    brand: 'Fresco D1',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 4990,
    pricePerUnit: 4.99,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false, // D1 vende malla sellada cerrada
    notes: 'Malla fija de 1kg sellada'
  },
  {
    productId: 'prod_tomate_chonto',
    storeId: 'ARA',
    brand: 'Fresco Ara',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 4790,
    pricePerUnit: 4.79,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Malla fija de 1kg'
  },
  {
    productId: 'prod_tomate_chonto',
    storeId: 'EXITO',
    brand: 'Éxito Huerta',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 5600,
    pricePerUnit: 5.60,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: true, // Éxito pesa gramos exactos en báscula
    notes: 'Pesado continuo a granel en báscula'
  },

  // --- CEBOLLA CABEZONA (1000g) ---
  {
    productId: 'prod_cebolla_cabezona',
    storeId: 'D1',
    brand: 'Fresco D1',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 3490,
    pricePerUnit: 3.49,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Malla sellada de 1kg'
  },
  {
    productId: 'prod_cebolla_cabezona',
    storeId: 'ARA',
    brand: 'Fresco Ara',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 3390,
    pricePerUnit: 3.39,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Malla 1kg fija'
  },
  {
    productId: 'prod_cebolla_cabezona',
    storeId: 'EXITO',
    brand: 'Éxito Huerta',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 4300,
    pricePerUnit: 4.30,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: true,
    notes: 'A granel continuo por gramo'
  },

  // --- CEBOLLA LARGA (JUNCA) (500g) ---
  {
    productId: 'prod_cebolla_larga',
    storeId: 'D1',
    brand: 'Fresco D1',
    packageSize: 500,
    unit: 'g',
    priceCOP: 2290,
    pricePerUnit: 4.58,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Atado fijo 500g'
  },
  {
    productId: 'prod_cebolla_larga',
    storeId: 'ARA',
    brand: 'Fresco Ara',
    packageSize: 500,
    unit: 'g',
    priceCOP: 2190,
    pricePerUnit: 4.38,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Atado fijo 500g'
  },
  {
    productId: 'prod_cebolla_larga',
    storeId: 'EXITO',
    brand: 'Éxito Huerta',
    packageSize: 500,
    unit: 'g',
    priceCOP: 2800,
    pricePerUnit: 5.60,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: true,
    notes: 'A granel en báscula'
  },

  // --- PAPA PASTUSA (2000g / 2kg) ---
  {
    productId: 'prod_papa_pastusa',
    storeId: 'D1',
    brand: 'Fresco D1',
    packageSize: 2000,
    unit: 'g',
    priceCOP: 5990,
    pricePerUnit: 2.995,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa fija de 2kg'
  },
  {
    productId: 'prod_papa_pastusa',
    storeId: 'ARA',
    brand: 'Fresco Ara',
    packageSize: 2000,
    unit: 'g',
    priceCOP: 5890,
    pricePerUnit: 2.945,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa fija de 2kg'
  },
  {
    productId: 'prod_papa_pastusa',
    storeId: 'EXITO',
    brand: 'Éxito Huerta',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 3600,
    pricePerUnit: 3.60,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: true, // En Éxito se pesa por kilo o fracción exacta
    notes: 'A granel continuo en báscula'
  },

  // --- PLATANO MADURO (x3 unidades) ---
  {
    productId: 'prod_platano_maduro',
    storeId: 'D1',
    brand: 'Fresco D1',
    packageSize: 3,
    unit: 'un',
    priceCOP: 4290,
    pricePerUnit: 1430.0,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bandeja fija x3'
  },
  {
    productId: 'prod_platano_maduro',
    storeId: 'ARA',
    brand: 'Fresco Ara',
    packageSize: 3,
    unit: 'un',
    priceCOP: 3990,
    pricePerUnit: 1330.0,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bandeja fija x3'
  },
  {
    productId: 'prod_platano_maduro',
    storeId: 'EXITO',
    brand: 'Éxito Huerta',
    packageSize: 1,
    unit: 'un',
    priceCOP: 1700,
    pricePerUnit: 1700.0,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: true,
    notes: 'Unidades individuales en báscula'
  },

  // --- ZANAHORIA (1000g) ---
  {
    productId: 'prod_zanahoria',
    storeId: 'D1',
    brand: 'Fresco D1',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 3100,
    pricePerUnit: 3.10,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa fija 1kg'
  },
  {
    productId: 'prod_zanahoria',
    storeId: 'ARA',
    brand: 'Fresco Ara',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 2990,
    pricePerUnit: 2.99,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa fija 1kg'
  },
  {
    productId: 'prod_zanahoria',
    storeId: 'EXITO',
    brand: 'Éxito Huerta',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 3800,
    pricePerUnit: 3.80,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: true,
    notes: 'A granel continuo en báscula'
  },

  // --- AGUACATE (x2 unidades) ---
  {
    productId: 'prod_aguacate',
    storeId: 'D1',
    brand: 'Fresco D1',
    packageSize: 2,
    unit: 'un',
    priceCOP: 5490,
    pricePerUnit: 2745.0,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Malla fija x2'
  },
  {
    productId: 'prod_aguacate',
    storeId: 'ARA',
    brand: 'Fresco Ara',
    packageSize: 2,
    unit: 'un',
    priceCOP: 5290,
    pricePerUnit: 2645.0,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Malla fija x2'
  },
  {
    productId: 'prod_aguacate',
    storeId: 'EXITO',
    brand: 'Éxito Huerta',
    packageSize: 1,
    unit: 'un',
    priceCOP: 3400,
    pricePerUnit: 3400.0,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: true,
    notes: 'Unidad individual por gramaje'
  },

  // --- LIMON TAHITI (x6 unidades) ---
  {
    productId: 'prod_limon_tahiti',
    storeId: 'D1',
    brand: 'Fresco D1',
    packageSize: 6,
    unit: 'un',
    priceCOP: 3500,
    pricePerUnit: 583.33,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Malla fija x6'
  },
  {
    productId: 'prod_limon_tahiti',
    storeId: 'ARA',
    brand: 'Fresco Ara',
    packageSize: 6,
    unit: 'un',
    priceCOP: 3390,
    pricePerUnit: 565.0,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Malla fija x6'
  },
  {
    productId: 'prod_limon_tahiti',
    storeId: 'EXITO',
    brand: 'Éxito Huerta',
    packageSize: 6,
    unit: 'un',
    priceCOP: 4400,
    pricePerUnit: 733.33,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: true,
    notes: 'A granel por kilo en báscula'
  },

  // --- AJO (x3 cabezas) ---
  {
    productId: 'prod_ajo_cabeza',
    storeId: 'D1',
    brand: 'Fresco D1',
    packageSize: 3,
    unit: 'un',
    priceCOP: 2190,
    pricePerUnit: 730.0,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Malla fija x3'
  },
  {
    productId: 'prod_ajo_cabeza',
    storeId: 'ARA',
    brand: 'Fresco Ara',
    packageSize: 3,
    unit: 'un',
    priceCOP: 2090,
    pricePerUnit: 696.67,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Malla fija x3'
  },
  {
    productId: 'prod_ajo_cabeza',
    storeId: 'EXITO',
    brand: 'Éxito Huerta',
    packageSize: 3,
    unit: 'un',
    priceCOP: 2900,
    pricePerUnit: 966.67,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Malla x3'
  },

  // --- CILANTRO (1 atado) ---
  {
    productId: 'prod_cilantro',
    storeId: 'D1',
    brand: 'Fresco D1',
    packageSize: 1,
    unit: 'un',
    priceCOP: 1290,
    pricePerUnit: 1290.0,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Atado sellado'
  },
  {
    productId: 'prod_cilantro',
    storeId: 'ARA',
    brand: 'Fresco Ara',
    packageSize: 1,
    unit: 'un',
    priceCOP: 1190,
    pricePerUnit: 1190.0,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Atado sellado'
  },
  {
    productId: 'prod_cilantro',
    storeId: 'EXITO',
    brand: 'Éxito Huerta',
    packageSize: 1,
    unit: 'un',
    priceCOP: 1800,
    pricePerUnit: 1800.0,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Atado fresco'
  },

  // --- ACEITE VEGETAL (900ml) ---
  {
    productId: 'prod_aceite_vegetal',
    storeId: 'D1',
    brand: 'Brisa de Oro / D1',
    packageSize: 900,
    unit: 'ml',
    priceCOP: 6890,
    pricePerUnit: 7.65,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Botella 900ml'
  },
  {
    productId: 'prod_aceite_vegetal',
    storeId: 'ARA',
    brand: 'Girasol / Oro Vegetal',
    packageSize: 900,
    unit: 'ml',
    priceCOP: 6790,
    pricePerUnit: 7.54,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Botella 900ml'
  },
  {
    productId: 'prod_aceite_vegetal',
    storeId: 'EXITO',
    brand: 'Premier / Gourmet',
    packageSize: 900,
    unit: 'ml',
    priceCOP: 9800,
    pricePerUnit: 10.88,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Botella 900ml'
  },

  // --- PANELA (1000g) ---
  {
    productId: 'prod_panela_bloque',
    storeId: 'D1',
    brand: 'D1 Panela',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 4690,
    pricePerUnit: 4.69,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Pastilla 1kg'
  },
  {
    productId: 'prod_panela_bloque',
    storeId: 'ARA',
    brand: 'El Trapiche (Ara)',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 4590,
    pricePerUnit: 4.59,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Pastilla 1kg'
  },
  {
    productId: 'prod_panela_bloque',
    storeId: 'EXITO',
    brand: 'Doña Panela',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 5900,
    pricePerUnit: 5.90,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Paquete 1kg'
  },

  // --- SAL (1000g) ---
  {
    productId: 'prod_sal_refinada',
    storeId: 'D1',
    brand: 'Sal Marina D1',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 1490,
    pricePerUnit: 1.49,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 1kg'
  },
  {
    productId: 'prod_sal_refinada',
    storeId: 'ARA',
    brand: 'Sal Blanca Ara',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 1390,
    pricePerUnit: 1.39,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 1kg'
  },
  {
    productId: 'prod_sal_refinada',
    storeId: 'EXITO',
    brand: 'Refisal Tradicional',
    packageSize: 1000,
    unit: 'g',
    priceCOP: 2200,
    pricePerUnit: 2.20,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Bolsa 1kg'
  },

  // --- CAFE MOLIDO (250g) ---
  {
    productId: 'prod_cafe_molido',
    storeId: 'D1',
    brand: 'Café Aroma (D1)',
    packageSize: 250,
    unit: 'g',
    priceCOP: 6890,
    pricePerUnit: 27.56,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 250g'
  },
  {
    productId: 'prod_cafe_molido',
    storeId: 'ARA',
    brand: 'Café Caney (Ara)',
    packageSize: 250,
    unit: 'g',
    priceCOP: 6790,
    pricePerUnit: 27.16,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Bolsa 250g'
  },
  {
    productId: 'prod_cafe_molido',
    storeId: 'EXITO',
    brand: 'Águila Roja / Sello Rojo',
    packageSize: 250,
    unit: 'g',
    priceCOP: 8900,
    pricePerUnit: 35.60,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Bolsa 250g'
  },

  // --- PASTA DE TOMATE (200g) ---
  {
    productId: 'prod_pasta_tomate',
    storeId: 'D1',
    brand: 'D1 Salsas',
    packageSize: 200,
    unit: 'g',
    priceCOP: 1990,
    pricePerUnit: 9.95,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Doypack 200g'
  },
  {
    productId: 'prod_pasta_tomate',
    storeId: 'ARA',
    brand: 'Delizia Salsas',
    packageSize: 200,
    unit: 'g',
    priceCOP: 1890,
    pricePerUnit: 9.45,
    confidence: CONFIDENCE_LEVELS.VERIFIED_TODAY.level,
    isBulkWeighed: false,
    notes: 'Doypack 200g'
  },
  {
    productId: 'prod_pasta_tomate',
    storeId: 'EXITO',
    brand: 'Fruco Salsa Tomate',
    packageSize: 200,
    unit: 'g',
    priceCOP: 3200,
    pricePerUnit: 16.00,
    confidence: CONFIDENCE_LEVELS.RECENT_WEEK.level,
    isBulkWeighed: false,
    notes: 'Doypack Fruco'
  }
];
