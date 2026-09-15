/**
 * Domain Types & Definitions for Mercado Colombia Optimizer
 */

export const CITIES = {
  CALI: { id: 'CALI', name: 'Cali', department: 'Valle del Cauca' },
  BOGOTA: { id: 'BOGOTA', name: 'Bogotá D.C.', department: 'Cundinamarca' },
  MEDELLIN: { id: 'MEDELLIN', name: 'Medellín', department: 'Antioquia' }
};

export const STORES = {
  D1: { id: 'D1', name: 'Tiendas D1', color: '#E30613', tag: 'Discounter Líder' },
  ARA: { id: 'ARA', name: 'Tiendas Ara', color: '#FF7900', tag: 'Discounter Frecuente' },
  EXITO: { id: 'EXITO', name: 'Éxito', color: '#FFE600', tag: 'Supermercado Tradicional' }
};

export const CATEGORIES = {
  PROTEINS: { id: 'PROTEINS', name: 'Proteínas y Carnes', icon: '🍗' },
  GRAINS: { id: 'GRAINS', name: 'Granos y Cereales', icon: '🌾' },
  PRODUCE: { id: 'PRODUCE', name: 'Frutas y Verduras', icon: '🥑' },
  DAIRY: { id: 'DAIRY', name: 'Lácteos y Huevos', icon: '🥚' },
  PANTRY: { id: 'PANTRY', name: 'Despensa y Abarrotes', icon: '🧂' }
};

export const STANDARD_UNITS = {
  GRAM: 'g',
  MILLILITER: 'ml',
  UNIT: 'un'
};

export const CONFIDENCE_LEVELS = {
  VERIFIED_TODAY: { level: 'VERIFIED_TODAY', label: 'Verificado Hoy', badgeClass: 'badge-verified' },
  RECENT_WEEK: { level: 'RECENT_WEEK', label: 'Actualizado esta semana', badgeClass: 'badge-recent' },
  ESTIMATED: { level: 'ESTIMATED', label: 'Precio Estimado', badgeClass: 'badge-estimated' }
};
