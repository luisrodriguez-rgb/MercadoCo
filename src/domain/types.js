/**
 * Domain Types & Definitions for Mercado Colombia Optimizer
 * Formulación rigurosa para optimización retail, logística urbana y programación entera.
 */

export const CITIES = {
  CALI: {
    id: 'CALI',
    name: 'Cali',
    department: 'Valle del Cauca',
    zones: [
      {
        id: 'CALI_GRANADA_VERSALLES',
        name: 'Granada - Versalles (Norte)',
        density: 'ALTA',
        walkableCluster: true,
        frictionCOP: 1500, // Tiendas a <300m, cruce peatonal directo
        notes: 'D1 de Av. 6ta y Ara de Versalles en radio peatonal inmediato'
      },
      {
        id: 'CALI_SAN_FERNANDO',
        name: 'San Fernando - Tequendama (Centro-Sur)',
        density: 'MEDIA_ALTA',
        walkableCluster: true,
        frictionCOP: 2500, // Distancia intermedia caminable
        notes: 'D1 Parque del Perro y Éxito San Fernando accesibles'
      },
      {
        id: 'CALI_CIUDAD_JARDIN',
        name: 'Ciudad Jardín - Pance (Sur)',
        density: 'BAJA_EXPANDIDA',
        walkableCluster: false,
        frictionCOP: 7500, // Requiere desplazamiento vehicular / MIO
        notes: 'Dispersión geográfica alta; visitas multitienda exigen trayecto'
      },
      {
        id: 'CALI_SALOMIA_POPULAR',
        name: 'Salomia - Santander (Nororiente)',
        density: 'ALTA',
        walkableCluster: true,
        frictionCOP: 2000,
        notes: 'Nodos comerciales densos sobre Cra 1 y Calle 44'
      }
    ]
  },
  BOGOTA: { id: 'BOGOTA', name: 'Bogotá D.C.', department: 'Cundinamarca', zones: [] },
  MEDELLIN: { id: 'MEDELLIN', name: 'Medellín', department: 'Antioquia', zones: [] }
};

export const STORES = {
  D1: { 
    id: 'D1', 
    name: 'Tiendas D1', 
    shortName: 'D1', 
    color: '#E30613', 
    tag: 'Hard Discounter',
    pricingStrategy: 'PRECIO_FIJO_EMPAQUE_DISCRETO' 
  },
  ARA: { 
    id: 'ARA', 
    name: 'Tiendas Ara', 
    shortName: 'Ara', 
    color: '#FF7900', 
    tag: 'Hard Discounter',
    pricingStrategy: 'PRECIO_FIJO_EMPAQUE_DISCRETO' 
  },
  EXITO: { 
    id: 'EXITO', 
    name: 'Grupo Éxito', 
    shortName: 'Éxito', 
    color: '#FFE600', 
    tag: 'Supermercado Tradicional',
    pricingStrategy: 'MIXTO_GRANEL_Y_MARCA' 
  }
};

export const CATEGORIES = {
  PROTEINS: { id: 'PROTEINS', name: 'Proteínas y Cárnicos', iconName: 'Beef' },
  GRAINS: { id: 'GRAINS', name: 'Granos y Cereales', iconName: 'Wheat' },
  PRODUCE: { id: 'PRODUCE', name: 'Frutas y Vegetales', iconName: 'Apple' },
  DAIRY: { id: 'DAIRY', name: 'Lácteos y Huevos', iconName: 'Milk' },
  PANTRY: { id: 'PANTRY', name: 'Abarrotes y Despensa', iconName: 'Package' }
};

export const STANDARD_UNITS = {
  GRAM: 'g',
  MILLILITER: 'ml',
  UNIT: 'un'
};

export const CONFIDENCE_LEVELS = {
  VERIFIED_TODAY: { level: 'VERIFIED_TODAY', label: 'Verificado hoy', badgeClass: 'badge-verified' },
  RECENT_WEEK: { level: 'RECENT_WEEK', label: 'Actualizado esta semana', badgeClass: 'badge-recent' },
  ESTIMATED: { level: 'ESTIMATED', label: 'Precio estimado', badgeClass: 'badge-estimated' }
};

// Insumos no perecederos candidatos a estar preexistentes en despensa
export const PANTRY_STAPLE_IDS = [
  'prod_sal_refinada',
  'prod_aceite_vegetal',
  'prod_cafe_molido',
  'prod_panela_bloque',
  'prod_ajo_cabeza',
  'prod_arroz_blanco'
];
