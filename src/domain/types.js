/**
 * Domain Types & Definitions for Mercado Colombia Optimizer
 * Strict financial and retail domain model without informal emojis.
 */

export const CITIES = {
  CALI: { id: 'CALI', name: 'Cali', department: 'Valle del Cauca', active: true },
  BOGOTA: { id: 'BOGOTA', name: 'Bogotá D.C.', department: 'Cundinamarca', active: false },
  MEDELLIN: { id: 'MEDELLIN', name: 'Medellín', department: 'Antioquia', active: false }
};

export const STORES = {
  D1: { id: 'D1', name: 'Tiendas D1', shortName: 'D1', color: '#E30613', tag: 'Hard Discounter' },
  ARA: { id: 'ARA', name: 'Tiendas Ara', shortName: 'Ara', color: '#FF7900', tag: 'Hard Discounter' },
  EXITO: { id: 'EXITO', name: 'Grupo Éxito', shortName: 'Éxito', color: '#FFE600', tag: 'Supermercado Tradicional' }
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
