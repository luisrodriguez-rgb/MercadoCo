/**
 * Domain Types & Definitions for Mercado Colombia Optimizer - V2
 * Formulación rigurosa para optimización retail, logística urbana,
 * teoría del consumidor y programación matemática multiobjetivo.
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
        baseDistanceKm: 0.35,
        defaultWalkingMinutes: 6,
        notes: 'Clúster peatonal continuo sobre Av. 6ta y Cl. 18N'
      },
      {
        id: 'CALI_SAN_FERNANDO',
        name: 'San Fernando - Tequendama (Centro-Sur)',
        density: 'MEDIA_ALTA',
        baseDistanceKm: 0.85,
        defaultWalkingMinutes: 14,
        notes: 'Nodos comerciales en radio intermedio'
      },
      {
        id: 'CALI_CIUDAD_JARDIN',
        name: 'Ciudad Jardín - Pance (Sur)',
        density: 'BAJA_EXPANDIDA',
        baseDistanceKm: 3.20,
        defaultWalkingMinutes: 45,
        notes: 'Dispersión suburbana; desplazamiento a pie desaconsejado'
      },
      {
        id: 'CALI_SALOMIA_POPULAR',
        name: 'Salomia - Santander (Nororiente)',
        density: 'ALTA',
        baseDistanceKm: 0.60,
        defaultWalkingMinutes: 9,
        notes: 'Corredores comerciales sobre Cra 1 y Cll 44'
      }
    ]
  },
  BOGOTA: { id: 'BOGOTA', name: 'Bogotá D.C.', department: 'Cundinamarca', zones: [] },
  MEDELLIN: { id: 'MEDELLIN', name: 'Medellín', department: 'Antioquia', zones: [] }
};

export const TRANSPORT_MODES = {
  WALKING: {
    id: 'WALKING',
    name: 'A pie (Peatonal)',
    monetaryCostCOP: 0,
    hourlyTimeCostCOP: 5000, // Valor del tiempo imputado / hora en ocio
    speedKmH: 4.0
  },
  TRANSIT_MIO: {
    id: 'TRANSIT_MIO',
    name: 'MIO (Transporte público)',
    monetaryCostCOP: 6400, // 2 pasajes ida y vuelta tarifa oficial 2025/2026
    hourlyTimeCostCOP: 4000,
    speedKmH: 15.0
  },
  VEHICLE: {
    id: 'VEHICLE',
    name: 'Vehículo propio (Carro / Moto)',
    monetaryCostCOP: 7500, // Costo combustible de arranque + fracción parqueadero
    hourlyTimeCostCOP: 6000,
    speedKmH: 22.0
  },
  DELIVERY: {
    id: 'DELIVERY',
    name: 'Domicilio directo a casa',
    monetaryCostCOP: 6500, // Tarifa promedio fee de delivery D1 / Éxito
    hourlyTimeCostCOP: 0, // Cero tiempo del consumidor
    speedKmH: 0
  }
};

export const STORES = {
  D1: { 
    id: 'D1', 
    name: 'Tiendas D1', 
    shortName: 'D1', 
    color: '#E30613', 
    tag: 'Hard Discounter'
  },
  ARA: { 
    id: 'ARA', 
    name: 'Tiendas Ara', 
    shortName: 'Ara', 
    color: '#FF7900', 
    tag: 'Hard Discounter'
  },
  EXITO: { 
    id: 'EXITO', 
    name: 'Grupo Éxito', 
    shortName: 'Éxito', 
    color: '#FFE600', 
    tag: 'Supermercado Tradicional'
  }
};

export const PACKAGING_TYPES = {
  EXACT_WEIGHT: { id: 'EXACT_WEIGHT', label: 'Báscula exacta (Granel)', isContinuous: true },
  FIXED_PACK: { id: 'FIXED_PACK', label: 'Empaque sellado discreto', isContinuous: false },
  UNIT: { id: 'UNIT', label: 'Unidad entera comercial', isContinuous: false }
};

export const PERISHABILITY = {
  HIGH: { id: 'HIGH', label: 'Alta perecibilidad (<5 días)', wasteRiskFactor: 0.85 },
  MEDIUM: { id: 'MEDIUM', label: 'Media perecibilidad (1-2 semanas)', wasteRiskFactor: 0.20 },
  STABLE: { id: 'STABLE', label: 'No perecedero / Larga vida (>2 meses)', wasteRiskFactor: 0.00 }
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

export const PANTRY_STAPLE_IDS = [
  'prod_sal_refinada',
  'prod_aceite_vegetal',
  'prod_cafe_molido',
  'prod_panela_bloque',
  'prod_ajo_cabeza',
  'prod_arroz_blanco'
];
