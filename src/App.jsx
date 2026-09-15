import React, { useState, useMemo } from 'react';
import { MealPlanService } from './application/MealPlanService.js';
import { BasketOptimizer } from './application/BasketOptimizer.js';
import { PRICES_CALI } from './data/prices_cali.js';
import { ESSENTIAL_PRODUCTS } from './data/products.js';
import { STORES, CONFIDENCE_LEVELS } from './domain/types.js';
import { 
  ShoppingBag, 
  Calendar, 
  Sparkles, 
  TrendingDown, 
  Store, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  ShieldCheck, 
  Archive, 
  Search,
  MapPin,
  Clock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export function App() {
  // Parámetros de usuario
  const [peopleCount, setPeopleCount] = useState(2);
  const [budgetCOP, setBudgetCOP] = useState(220000);
  const [preference, setPreference] = useState('BALANCEADO');
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'basket' | 'pantry' | 'prices'
  const [selectedBasketMode, setSelectedBasketMode] = useState('MULTI'); // 'MULTI' | 'D1' | 'ARA' | 'EXITO'
  const [checkedItems, setCheckedItems] = useState({});
  const [priceSearchQuery, setPriceSearchQuery] = useState('');

  // 1. Generar Menú Semanal Consolidado
  const weeklyPlan = useMemo(() => {
    return MealPlanService.generateWeeklyPlan({ peopleCount, budgetCOP, preference });
  }, [peopleCount, budgetCOP, preference]);

  // 2. Optimizar Canastas con Precios de Cali
  const optimization = useMemo(() => {
    return BasketOptimizer.optimize(weeklyPlan.ingredients, budgetCOP);
  }, [weeklyPlan, budgetCOP]);

  // Formateador de moneda colombiana
  const formatCOP = (val) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Toggle checkbox en lista de compras
  const toggleItemCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Items de la canasta activa
  const activeBasketItems = useMemo(() => {
    if (selectedBasketMode === 'MULTI') {
      return optimization.multiStore.items;
    }
    return optimization.monoStores[selectedBasketMode]?.items || [];
  }, [optimization, selectedBasketMode]);

  // Agrupar items de la canasta por tienda para compras ordenadas
  const groupedBasketByStore = useMemo(() => {
    const groups = {};
    activeBasketItems.forEach(item => {
      if (!groups[item.storeId]) {
        groups[item.storeId] = [];
      }
      groups[item.storeId].push(item);
    });
    return groups;
  }, [activeBasketItems]);

  // Filtrado de precios en el monitor
  const filteredPrices = useMemo(() => {
    if (!priceSearchQuery.trim()) return PRICES_CALI;
    const q = priceSearchQuery.toLowerCase();
    const productNames = new Map(ESSENTIAL_PRODUCTS.map(p => [p.id, p.name.toLowerCase()]));
    return PRICES_CALI.filter(p => {
      const prodName = productNames.get(p.productId) || '';
      return prodName.includes(q) || p.brand.toLowerCase().includes(q) || p.storeId.toLowerCase().includes(q);
    });
  }, [priceSearchQuery]);

  const activeCost = selectedBasketMode === 'MULTI' 
    ? optimization.multiStore.totalCost 
    : (optimization.monoStores[selectedBasketMode]?.totalCost || 0);

  const isWithinBudget = activeCost <= budgetCOP;

  return (
    <div className="app-layout">
      {/* Header Principal */}
      <header className="app-header">
        <div className="header-container">
          <div className="brand-badge">
            <div className="brand-logo-icon">🇨🇴</div>
            <div className="brand-text">
              <h1>Mercado<span className="accent">CO</span></h1>
              <div className="brand-subtitle">Optimizador de Mercado y Menú Semanal con Precios Reales</div>
            </div>
          </div>

          <div className="city-pill-selector">
            <MapPin size={15} color="var(--color-primary-light)" />
            <span>Ciudad activa:</span>
            <span className="city-active-badge">Cali (Valle)</span>
          </div>
        </div>
      </header>

      {/* Cuerpo Principal */}
      <main className="main-wrapper">
        <div className="hub-grid">
          {/* Panel de Controles / Parámetros */}
          <section className="glass-panel controls-card">
            <div className="controls-title">
              <Sparkles size={18} color="var(--color-primary)" />
              <span>Configuración del Hogar</span>
            </div>

            {/* Selector de Comensales */}
            <div className="control-group">
              <label className="control-label">
                <span>Personas que comen en casa:</span>
                <span className="value-highlight">{peopleCount} {peopleCount === 1 ? 'persona' : 'personas'}</span>
              </label>
              <div className="people-selector">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    id={`btn-people-${num}`}
                    className={`people-btn ${peopleCount === num ? 'active' : ''}`}
                    onClick={() => setPeopleCount(num)}
                  >
                    <span className="count">{num}</span>
                    <span className="label">{num === 2 ? 'Pareja' : num === 1 ? 'Solo' : 'Familia'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Presupuesto Semanal */}
            <div className="control-group">
              <label className="control-label">
                <span>Presupuesto Semanal:</span>
                <span className="value-highlight">{formatCOP(budgetCOP)}</span>
              </label>
              <input
                id="slider-budget"
                type="range"
                min="100000"
                max="400000"
                step="10000"
                value={budgetCOP}
                onChange={(e) => setBudgetCOP(Number(e.target.value))}
                className="range-slider"
              />
              <div className="presets-container">
                {[150000, 200000, 250000, 300000].map(val => (
                  <button
                    key={val}
                    className={`preset-chip ${budgetCOP === val ? 'active' : ''}`}
                    onClick={() => setBudgetCOP(val)}
                  >
                    ${val / 1000}k
                  </button>
                ))}
              </div>
            </div>

            {/* Enfoque del Menú */}
            <div className="control-group">
              <label className="control-label">Enfoque de Alimentación:</label>
              <div className="diet-selector">
                {[
                  { id: 'BALANCEADO', label: 'Balanceado' },
                  { id: 'ECONOMICO', label: 'Máx. Ahorro' },
                  { id: 'ALTA_PROTEINA', label: 'Alta Proteína' }
                ].map(item => (
                  <button
                    key={item.id}
                    className={`diet-btn ${preference === item.id ? 'active' : ''}`}
                    onClick={() => setPreference(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Resumen Rápido de Canasta */}
            <div className="savings-breakdown-box">
              <div className="savings-stat">
                <span className="num positive">{weeklyPlan.days.length * 2}</span>
                <span className="lbl">Comidas Plan</span>
              </div>
              <div className="savings-stat">
                <span className="num">{weeklyPlan.ingredients.length}</span>
                <span className="lbl">Ingredientes</span>
              </div>
              <div className="savings-stat">
                <span className="num positive">{formatCOP(activeCost / (weeklyPlan.days.length * 2 * peopleCount))}</span>
                <span className="lbl">Costo / Plato</span>
              </div>
            </div>
          </section>

          {/* Tarjeta Ejecutiva de Veredicto Financiero y Comparativa de Tiendas */}
          <section className="glass-panel summary-card">
            <div className="summary-header">
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Diagnóstico de Ahorro para {peopleCount} {peopleCount === 1 ? 'persona' : 'personas'} en Cali
                </div>
                <h2 style={{ fontSize: '1.4rem', marginTop: '0.2rem' }}>
                  {isWithinBudget ? (
                    <span style={{ color: 'var(--color-primary-light)' }}>
                      ¡Tu presupuesto cubre la semana completa!
                    </span>
                  ) : (
                    <span style={{ color: 'var(--color-accent)' }}>
                      Ajuste sugerido: Faltan {formatCOP(activeCost - budgetCOP)}
                    </span>
                  )}
                </h2>
              </div>

              <div className={`verdict-pill ${isWithinBudget ? 'success' : 'warning'}`}>
                {isWithinBudget ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>
                  {isWithinBudget 
                    ? `Sobrante: ${formatCOP(budgetCOP - activeCost)}` 
                    : 'Aumentar Presupuesto'}
                </span>
              </div>
            </div>

            {/* Comparativa de Opciones de Tiendas en Cali */}
            <div className="comparison-grid">
              {/* Combinación Óptima */}
              <div 
                className={`store-card ${selectedBasketMode === 'MULTI' ? 'highlight' : ''}`}
                onClick={() => setSelectedBasketMode('MULTI')}
                style={{ cursor: 'pointer' }}
              >
                <div className="badge-rec">⭐ Recomendado</div>
                <div className="store-name">
                  <Sparkles size={14} color="var(--color-primary)" />
                  <span>D1 + Ara (Híbrido)</span>
                </div>
                <div className="store-price">{formatCOP(optimization.multiStore.totalCost)}</div>
                <div className="store-diff">
                  Ahorro neto: <strong style={{ color: 'var(--color-primary-light)' }}>{formatCOP(optimization.multiStore.netSavings)}</strong>
                </div>
              </div>

              {/* Solo D1 */}
              <div 
                className={`store-card ${selectedBasketMode === 'D1' ? 'highlight' : ''}`}
                onClick={() => setSelectedBasketMode('D1')}
                style={{ cursor: 'pointer' }}
              >
                <div className="store-name">
                  <div className="store-dot" style={{ backgroundColor: 'var(--store-d1)' }}></div>
                  <span>Todo en D1</span>
                </div>
                <div className="store-price">{formatCOP(optimization.monoStores.D1.totalCost)}</div>
                <div className="store-diff">Sin desplazamientos extra</div>
              </div>

              {/* Solo Ara */}
              <div 
                className={`store-card ${selectedBasketMode === 'ARA' ? 'highlight' : ''}`}
                onClick={() => setSelectedBasketMode('ARA')}
                style={{ cursor: 'pointer' }}
              >
                <div className="store-name">
                  <div className="store-dot" style={{ backgroundColor: 'var(--store-ara)' }}></div>
                  <span>Todo en Ara</span>
                </div>
                <div className="store-price">{formatCOP(optimization.monoStores.ARA.totalCost)}</div>
                <div className="store-diff">Variedad marcas propias</div>
              </div>

              {/* Solo Éxito */}
              <div 
                className={`store-card ${selectedBasketMode === 'EXITO' ? 'highlight' : ''}`}
                onClick={() => setSelectedBasketMode('EXITO')}
                style={{ cursor: 'pointer' }}
              >
                <div className="store-name">
                  <div className="store-dot" style={{ backgroundColor: 'var(--store-exito)' }}></div>
                  <span>Todo en Éxito</span>
                </div>
                <div className="store-price">{formatCOP(optimization.monoStores.EXITO.totalCost)}</div>
                <div className="store-diff" style={{ color: 'var(--danger)' }}>
                  +{formatCOP(optimization.monoStores.EXITO.totalCost - optimization.multiStore.totalCost)} vs. D1/Ara
                </div>
              </div>
            </div>

            {/* Desglose de Fricción vs Ahorro Real */}
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-dim)', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} color="var(--color-primary-light)" />
              <span>
                <strong>Cálculo de Ahorro Real:</strong> El algoritmo contempla una penalización de $5.000 COP por desplazamiento entre tiendas. Comprar en D1 + Ara te ahorra <strong>{formatCOP(optimization.multiStore.grossSavings)}</strong> brutos ({formatCOP(optimization.multiStore.netSavings)} netos).
              </span>
            </div>
          </section>
        </div>

        {/* Barra de Pestañas de Navegación */}
        <nav className="tabs-header">
          <button 
            id="tab-menu"
            className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <Calendar size={18} />
            <span>1. Menú Semanal (Lunes a Domingo)</span>
          </button>

          <button 
            id="tab-basket"
            className={`tab-btn ${activeTab === 'basket' ? 'active' : ''}`}
            onClick={() => setActiveTab('basket')}
          >
            <ShoppingBag size={18} />
            <span>2. Lista de Compras para el Supermercado ({activeBasketItems.length} items)</span>
          </button>

          <button 
            id="tab-pantry"
            className={`tab-btn ${activeTab === 'pantry' ? 'active' : ''}`}
            onClick={() => setActiveTab('pantry')}
          >
            <Archive size={18} />
            <span>3. Auditoría de Despensa & Sobrantes</span>
          </button>

          <button 
            id="tab-prices"
            className={`tab-btn ${activeTab === 'prices' ? 'active' : ''}`}
            onClick={() => setActiveTab('prices')}
          >
            <Store size={18} />
            <span>4. Transparencia de Precios (Cali)</span>
          </button>
        </nav>

        {/* VISTA 1: CALENDARIO DE MENÚ SEMANAL */}
        {activeTab === 'menu' && (
          <div className="menu-grid">
            {weeklyPlan.days.map((day) => (
              <div key={day.dayId} className="glass-panel day-card">
                <div className="day-header">
                  <h3 className="day-title">{day.dayName}</h3>
                  <span className="day-tag">2 Comidas</span>
                </div>

                {/* Almuerzo */}
                <div className="meal-block">
                  <div className="meal-badge">☀️ Almuerzo</div>
                  <div className="meal-name">{day.lunch.name}</div>
                  <div className="meal-desc">{day.lunch.description}</div>
                  <div className="meal-meta">
                    <span>⏱️ {day.lunch.prepTimeMinutes} min</span>
                    <span>• {day.lunch.difficulty}</span>
                    <span>• {day.lunch.category}</span>
                  </div>
                </div>

                {/* Cena */}
                <div className="meal-block dinner">
                  <div className="meal-badge">🌙 Cena</div>
                  <div className="meal-name">{day.dinner.name}</div>
                  <div className="meal-desc">{day.dinner.description}</div>
                  <div className="meal-meta">
                    <span>⏱️ {day.dinner.prepTimeMinutes} min</span>
                    <span>• {day.dinner.difficulty}</span>
                    <span>• {day.dinner.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VISTA 2: LISTA DE COMPRAS OPTIMIZADA */}
        {activeTab === 'basket' && (
          <div className="shopping-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem' }}>Lista de Supermercado Lista para Llevar</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Modo actual: <strong>{selectedBasketMode === 'MULTI' ? 'Combinación Óptima (D1 + Ara)' : STORES[selectedBasketMode]?.name}</strong>. Marca los productos en tu celular mientras estás en la tienda.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['MULTI', 'D1', 'ARA', 'EXITO'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setSelectedBasketMode(mode)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      background: selectedBasketMode === mode ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.05)',
                      color: selectedBasketMode === mode ? '#0b0f19' : 'var(--color-text-main)',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    {mode === 'MULTI' ? '⭐ Combinada' : STORES[mode].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Listado agrupado por tienda */}
            {Object.entries(groupedBasketByStore).map(([storeId, items]) => {
              const storeInfo = STORES[storeId] || { name: storeId, color: '#10b981' };
              const storeSubtotal = items.reduce((acc, i) => acc + i.totalCost, 0);

              return (
                <div key={storeId} className="glass-panel shopping-store-section" style={{ padding: '1.25rem' }}>
                  <div className="shopping-store-title" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                    <div className="store-dot" style={{ backgroundColor: storeInfo.color }}></div>
                    <span>Comprar en {storeInfo.name}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
                      Subtotal: <strong style={{ color: 'var(--color-text-main)' }}>{formatCOP(storeSubtotal)}</strong> ({items.length} productos)
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {items.map(item => {
                      const isChecked = !!checkedItems[item.productId];
                      return (
                        <div key={item.productId} className={`item-row ${isChecked ? 'checked' : ''}`}>
                          <div className="item-left">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleItemCheck(item.productId)}
                              className="item-checkbox"
                            />
                            <div className="item-info">
                              <span className="item-title">{item.productName}</span>
                              <span className="item-specs">
                                Marca sugerida: <strong>{item.brand}</strong> • Presentación: {item.packageSize}{item.unit}
                              </span>
                            </div>
                          </div>

                          <div className="item-right">
                            <div className="item-packages">
                              {item.packageUnits} {item.packageUnits === 1 ? 'paquete' : 'paquetes'}
                            </div>
                            <div className="item-price">
                              {formatCOP(item.totalCost)}
                            </div>
                            <span className={CONFIDENCE_LEVELS[item.confidence]?.badgeClass || 'badge-recent'}>
                              {CONFIDENCE_LEVELS[item.confidence]?.label || 'Verificado'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VISTA 3: AUDITORÍA DE DESPENSA Y SOBRANTES */}
        {activeTab === 'pantry' && (
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Archive size={20} color="var(--color-accent)" />
                <span>¿Por qué tu dinero no se pierde? (Excedentes de Despensa)</span>
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
                Como en los supermercados se compran paquetes enteros (1kg de arroz, botella de 900ml de aceite, cubeta de 30 huevos), el menú no consume el 100% de todo. Los siguientes ingredientes te quedarán listos para la próxima semana:
              </p>
            </div>

            <div className="pantry-grid">
              {activeBasketItems
                .filter(item => item.pantrySurplus > 0)
                .map(item => (
                  <div key={item.productId} className="pantry-card">
                    <span className="name">{item.productName}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>
                      Requerido: {item.totalRequired} {item.unit} • Comprado: {item.totalPurchasedAmount} {item.unit}
                    </span>
                    <span className="surplus">
                      + {item.pantrySurplus.toFixed(1)} {item.unit} disponibles en despensa
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* VISTA 4: TRANSPARENCIA DE PRECIOS EN CALI */}
        {activeTab === 'prices' && (
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem' }}>Catálogo de Precios Verificados en Cali</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Matriz curada de precios en D1, Ara y Éxito normalizados por gramo, mililitro o unidad.
                </p>
              </div>

              <div style={{ position: 'relative', minWidth: '260px' }}>
                <Search size={16} color="var(--color-text-dim)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Buscar producto, marca o tienda..."
                  value={priceSearchQuery}
                  onChange={(e) => setPriceSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.8rem 0.5rem 2rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-dim)' }}>
                    <th style={{ padding: '0.6rem' }}>Tienda</th>
                    <th style={{ padding: '0.6rem' }}>Producto / Marca</th>
                    <th style={{ padding: '0.6rem' }}>Presentación</th>
                    <th style={{ padding: '0.6rem' }}>Precio COP</th>
                    <th style={{ padding: '0.6rem' }}>Precio / Unidad</th>
                    <th style={{ padding: '0.6rem' }}>Vigencia</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrices.map((row, idx) => {
                    const prod = ESSENTIAL_PRODUCTS.find(p => p.id === row.productId);
                    const store = STORES[row.storeId];
                    return (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '0.6rem' }}>
                          <span style={{ 
                            fontWeight: 700, 
                            color: store?.color || 'white',
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px'
                          }}>
                            {store?.name || row.storeId}
                          </span>
                        </td>
                        <td style={{ padding: '0.6rem' }}>
                          <strong>{prod?.name || row.productId}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>{row.brand}</div>
                        </td>
                        <td style={{ padding: '0.6rem' }}>{row.packageSize} {row.unit}</td>
                        <td style={{ padding: '0.6rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>
                          {formatCOP(row.priceCOP)}
                        </td>
                        <td style={{ padding: '0.6rem', color: 'var(--color-text-muted)' }}>
                          ${row.pricePerUnit.toFixed(2)} COP/{row.unit}
                        </td>
                        <td style={{ padding: '0.6rem' }}>
                          <span className={CONFIDENCE_LEVELS[row.confidence]?.badgeClass || 'badge-recent'}>
                            {CONFIDENCE_LEVELS[row.confidence]?.label || 'Verificado'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default App;
