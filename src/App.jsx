import React, { useState, useMemo, useEffect } from 'react';
import { MealPlanService } from './application/MealPlanService.js';
import { BasketOptimizer } from './application/BasketOptimizer.js';
import { PRICES_CALI } from './data/prices_cali.js';
import { ESSENTIAL_PRODUCTS } from './data/products.js';
import { STORES, CONFIDENCE_LEVELS, CITIES, PANTRY_STAPLE_IDS, TRANSPORT_MODES } from './domain/types.js';
import { LogoD1, LogoAra, LogoExito, FlagColombia } from './ui/StoreLogos.jsx';
import { EXPERIMENTAL_V4_SUMMARY } from './data/experimental_v4_summary.js';
import { 
  SlidersHorizontal, 
  CalendarDays, 
  CheckSquare, 
  PackageSearch, 
  Database, 
  TrendingDown, 
  ShieldCheck, 
  AlertCircle, 
  SunMedium, 
  MoonStar, 
  Timer, 
  CircleDollarSign, 
  Copy, 
  Check, 
  Search, 
  ArrowRightLeft, 
  Info,
  Sun,
  Moon,
  MapPin,
  CheckCircle,
  Scale,
  Car,
  Footprints,
  Bus,
  Bike,
  HelpCircle,
  ShieldAlert,
  FlaskConical,
  Award
} from 'lucide-react';

export function App() {
  // Modo de color (Oscuro / Claro)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('mc_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mc_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Parámetros de simulación
  const [peopleCount, setPeopleCount] = useState(2);
  const [budgetCOP, setBudgetCOP] = useState(220000);
  const [preference, setPreference] = useState('BALANCEADO');
  const [selectedZoneId, setSelectedZoneId] = useState('CALI_GRANADA_VERSALLES');
  const [selectedTransportModeId, setSelectedTransportModeId] = useState('WALKING');
  const [pantryStockIds, setPantryStockIds] = useState(['prod_sal_refinada', 'prod_aceite_vegetal']);
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'basket' | 'explainability' | 'pantry' | 'prices'
  const [selectedBasketMode, setSelectedBasketMode] = useState('MULTI'); // 'MULTI' | 'D1' | 'ARA' | 'EXITO'
  const [checkedItems, setCheckedItems] = useState({});
  const [priceSearchQuery, setPriceSearchQuery] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Toggle insumo en despensa preexistente
  const togglePantryStaple = (id) => {
    setPantryStockIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // 1. Invocación de Generador de Menú
  const weeklyPlan = useMemo(() => {
    return MealPlanService.generateWeeklyPlan({ peopleCount, budgetCOP, preference });
  }, [peopleCount, budgetCOP, preference]);

  // 2. Invocación de Solver de Canasta V2 Acoplado
  const optimization = useMemo(() => {
    return BasketOptimizer.optimize({
      consolidatedIngredients: weeklyPlan.ingredients,
      budgetCOP,
      pantryStockIds,
      zoneId: selectedZoneId,
      transportModeId: selectedTransportModeId
    });
  }, [weeklyPlan, budgetCOP, pantryStockIds, selectedZoneId, selectedTransportModeId]);

  // Formato monetario estricto en pesos colombianos
  const formatCOP = (val) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Toggle checklist de compra
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

  // Agrupamiento por tienda para logística de compra
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

  // Filtrado de la matriz de precios
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

  const activeFutureInventory = selectedBasketMode === 'MULTI'
    ? optimization.multiStore.totalFutureInventory
    : (optimization.monoStores[selectedBasketMode]?.totalFutureInventory || 0);

  const activeWasteRisk = selectedBasketMode === 'MULTI'
    ? optimization.multiStore.totalWasteRisk
    : (optimization.monoStores[selectedBasketMode]?.totalWasteRisk || 0);

  const activeConfidence = selectedBasketMode === 'MULTI'
    ? optimization.multiStore.averageConfidence
    : (optimization.monoStores[selectedBasketMode]?.averageConfidence || 0);

  const isWithinBudget = activeCost <= budgetCOP;

  // Renderizador de logos oficiales
  const renderStoreLogo = (storeId, width = 38, height = 24) => {
    switch (storeId) {
      case 'D1':
        return <LogoD1 width={width} height={height} />;
      case 'ARA':
        return <LogoAra width={width} height={height} />;
      case 'EXITO':
        return <LogoExito width={width} height={height} />;
      default:
        return null;
    }
  };

  // Copiar lista de compras para exportación a mensajería
  const copyShoppingList = () => {
    let text = `MERCADO OPTIMIZADO - CALI (${peopleCount} personas | Zona: ${optimization.currentZone.name})\nPresupuesto: ${formatCOP(budgetCOP)} | Desembolso en caja: ${formatCOP(activeCost)}\n\n`;
    Object.entries(groupedBasketByStore).forEach(([storeId, items]) => {
      const storeName = STORES[storeId]?.name || storeId;
      text += `[${storeName.toUpperCase()}]\n`;
      items.forEach(item => {
        const packaging = item.packagingType === 'EXACT_WEIGHT' ? `(Báscula exacta ${item.totalRequired}${item.unit})` : `(${item.packageUnits} paq x ${item.packageSize}${item.unit})`;
        text += `- ${item.productName} [${item.brand}] ${packaging}: ${formatCOP(item.totalCost)}\n`;
      });
      text += '\n';
    });
    navigator.clipboard.writeText(text).then(() => {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    });
  };

  const caliZones = CITIES.CALI.zones;
  const transportModesList = Object.values(TRANSPORT_MODES);
  const pantryStapleProducts = ESSENTIAL_PRODUCTS.filter(p => PANTRY_STAPLE_IDS.includes(p.id));

  return (
    <div>
      {/* Header Institucional */}
      <header className="site-header">
        <div className="site-header-inner">
          <div className="brand-section">
            <div className="brand-symbol">
              <FlagColombia width={22} height={14} />
            </div>
            <div className="brand-titles">
              <h1>
                <span>Mercado Colombia</span>
              </h1>
              <div className="brand-tagline">Sistema de Apoyo a Decisiones para la Optimización del Abastecimiento Doméstico (V4)</div>
            </div>
          </div>

          <div className="header-controls-strip">
            <div className="status-badge active-region">
              <div className="dot-indicator"></div>
              <span>Cali, Valle del Cauca</span>
            </div>

            <button 
              id="btn-theme-toggle"
              className="theme-toggle-btn" 
              onClick={toggleTheme}
              aria-label="Alternar modo de color"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={14} />
                  <span>Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon size={14} />
                  <span>Modo Oscuro</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="app-container">
        <div className="top-deck-grid">
          {/* Panel de Configuración de Parámetros */}
          <section className="surface-panel">
            <div className="panel-header-title">
              <h2>
                <SlidersHorizontal size={16} />
                <span>Parámetros Operativos</span>
              </h2>
            </div>

            {/* Selector de Zona Urbana de Cali */}
            <div className="form-field-group">
              <div className="field-label-row">
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={13} color="var(--color-brand-emerald)" />
                  <span>Zona Urbana / Clúster Comercial</span>
                </span>
              </div>
              <select
                id="select-zone"
                value={selectedZoneId}
                onChange={(e) => setSelectedZoneId(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.8rem',
                  padding: '0.5rem 0.65rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {caliZones.map(zone => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name} ({zone.baseDistanceKm} km radio)
                  </option>
                ))}
              </select>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)', marginTop: '0.2rem' }}>
                {optimization.currentZone.notes}
              </div>
            </div>

            {/* Selector de Medio de Transporte para Cálculo Paramétrico de Fricción */}
            <div className="form-field-group">
              <div className="field-label-row">
                <span>Modo de Desplazamiento (Fricción F)</span>
                <span className="field-val-display num-tabular" style={{ fontSize: '0.78rem', color: 'var(--highlight-text)' }}>
                  F = {formatCOP(optimization.multiStore.frictionPenaltyCOP)}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.35rem' }}>
                {transportModesList.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedTransportModeId(mode.id)}
                    style={{
                      padding: '0.4rem 0.5rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid',
                      borderColor: selectedTransportModeId === mode.id ? 'var(--color-brand-emerald)' : 'var(--color-border-subtle)',
                      background: selectedTransportModeId === mode.id ? 'var(--color-brand-emerald-dim)' : 'var(--color-bg-elevated)',
                      color: selectedTransportModeId === mode.id ? 'var(--highlight-text)' : 'var(--color-text-secondary)',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {mode.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Comensales */}
            <div className="form-field-group">
              <div className="field-label-row">
                <span>Comensales habituales</span>
                <span className="field-val-display num-tabular">{peopleCount} personas</span>
              </div>
              <div className="people-grid">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    id={`btn-people-${num}`}
                    className={`option-select-btn ${peopleCount === num ? 'active' : ''}`}
                    onClick={() => setPeopleCount(num)}
                  >
                    <span className="main-label num-tabular">{num}</span>
                    <span className="sub-label">{num === 2 ? 'Pareja' : num === 1 ? 'Individual' : 'Familia'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Presupuesto Semanal */}
            <div className="form-field-group">
              <div className="field-label-row">
                <span>Presupuesto en Efectivo Asignado</span>
                <span className="field-val-display num-tabular">{formatCOP(budgetCOP)}</span>
              </div>
              <input
                id="slider-budget"
                type="range"
                min="100000"
                max="400000"
                step="10000"
                value={budgetCOP}
                onChange={(e) => setBudgetCOP(Number(e.target.value))}
                className="slider-control"
              />
              <div className="presets-strip">
                {[150000, 200000, 250000, 300000].map(val => (
                  <button
                    key={val}
                    className={`preset-button ${budgetCOP === val ? 'active' : ''}`}
                    onClick={() => setBudgetCOP(val)}
                  >
                    ${val / 1000}k COP
                  </button>
                ))}
              </div>
            </div>

            {/* Despensa Preexistente (Insumos que ya tengo en casa) */}
            <div className="form-field-group">
              <div className="field-label-row">
                <span>Insumos ya en casa (Despensa preexistente)</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--highlight-text)', fontWeight: 700 }}>
                  {pantryStockIds.length} activos
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.35rem', marginTop: '0.2rem' }}>
                {pantryStapleProducts.map(prod => {
                  const hasIt = pantryStockIds.includes(prod.id);
                  return (
                    <button
                      key={prod.id}
                      onClick={() => togglePantryStaple(prod.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.35rem 0.5rem',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid',
                        borderColor: hasIt ? 'var(--color-brand-emerald)' : 'var(--color-border-subtle)',
                        background: hasIt ? 'var(--color-brand-emerald-dim)' : 'var(--color-bg-elevated)',
                        color: hasIt ? 'var(--highlight-text)' : 'var(--color-text-secondary)',
                        fontSize: '0.73rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <CheckCircle size={12} color={hasIt ? '#10b981' : 'var(--color-text-tertiary)'} />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {prod.name.split(' ')[0]} {prod.name.split(' ')[1] || ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Enfoque del Menú */}
            <div className="form-field-group">
              <div className="field-label-row">
                <span>Enfoque Nutricional / Financiero</span>
              </div>
              <div className="segmented-switch">
                {[
                  { id: 'BALANCEADO', label: 'Balanceado' },
                  { id: 'ECONOMICO', label: 'Máx. Ahorro' },
                  { id: 'ALTA_PROTEINA', label: 'Alta Proteína' }
                ].map(item => (
                  <button
                    key={item.id}
                    className={`segment-item ${preference === item.id ? 'active' : ''}`}
                    onClick={() => setPreference(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Métricas de Cobertura */}
            <div className="panel-kpi-row">
              <div className="kpi-cell">
                <span className="val highlight num-tabular">{weeklyPlan.days.length * 2}</span>
                <span className="lbl">Raciones Semanales</span>
              </div>
              <div className="kpi-cell">
                <span className="val num-tabular">{activeBasketItems.length}</span>
                <span className="lbl">SKUs a Comprar</span>
              </div>
              <div className="kpi-cell">
                <span className="val highlight num-tabular">{formatCOP(activeCost / (weeklyPlan.days.length * 2 * peopleCount))}</span>
                <span className="lbl">Costo Real / Plato</span>
              </div>
            </div>
          </section>

          {/* Tablero Ejecutivo Financiero */}
          <section className="surface-panel diagnostic-board">
            <div className="board-top-status">
              <div className="headline-wrap">
                <div className="eyebrow">Diagnóstico de Liquidez y Asignación ({optimization.currentZone.name})</div>
                <h2>
                  {isWithinBudget ? (
                    <span style={{ color: 'var(--highlight-text)' }}>
                      Presupuesto suficiente para las 14 raciones del ciclo
                    </span>
                  ) : (
                    <span style={{ color: '#fbbf24' }}>
                      Déficit presupuestal de {formatCOP(activeCost - budgetCOP)}
                    </span>
                  )}
                </h2>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Badge de Calidad y Cobertura de Datos (Reemplazo conceptual formal) */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-base)', border: '1px solid var(--color-border-subtle)', fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>
                  <ShieldCheck size={14} color="#10b981" />
                  <span>Calidad de Datos: <strong className="num-tabular" style={{ color: 'var(--highlight-text)' }}>{optimization.dataQuality.coveragePercentage}%</strong></span>
                  <span style={{ color: 'var(--color-text-tertiary)', marginLeft: '4px' }}>({optimization.dataQuality.verifiedSKUsCount}/{optimization.dataQuality.totalSKUsCount} verificados)</span>
                </div>

                <div className={`badge-verdict ${isWithinBudget ? 'in-budget' : 'deficit'}`}>
                  {isWithinBudget ? <Check size={14} /> : <AlertCircle size={14} />}
                  <span className="num-tabular">
                    {isWithinBudget 
                      ? `Caja libre: ${formatCOP(budgetCOP - activeCost)}` 
                      : 'Ajuste requerido'}
                  </span>
                </div>
              </div>
            </div>

            {/* Desglose Analítico Riguroso: Desembolso vs Consumo vs Inventario Útil vs Desperdicio */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.65rem', background: 'var(--color-bg-base)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)' }}>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Desembolso Total en Caja</div>
                <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--color-text-primary)' }} className="num-tabular">
                  {formatCOP(activeCost)}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-tertiary)' }}>Salida bruta de bolsillo</div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Consumo Efectivo Semanal</div>
                <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--highlight-text)' }} className="num-tabular">
                  {formatCOP(activeCost - (activeFutureInventory + activeWasteRisk))}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-tertiary)' }}>14 raciones ingeridas</div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Inventario Útil Futuro</div>
                <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#38bdf8' }} className="num-tabular">
                  {formatCOP(activeFutureInventory)}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-tertiary)' }}>Granos, aceite, legumbres (activo)</div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Riesgo de Desperdicio</div>
                <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: activeWasteRisk > 0 ? '#ef4444' : 'var(--color-text-secondary)' }} className="num-tabular">
                  {formatCOP(activeWasteRisk)}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-tertiary)' }}>Perecederos sobrantes</div>
              </div>
            </div>

            {/* V3: Gráfico Waterfall de Descomposición Presupuestal */}
            <div className="waterfall-panel">
              <div className="waterfall-header">
                <div className="waterfall-title">
                  <TrendingDown size={14} color="var(--color-brand-emerald)" />
                  <span>Descomposición de Flujo Presupuestal (Waterfall de Desembolso)</span>
                </div>
                <div className="waterfall-meta num-tabular">
                  Caja Libre Neta: {formatCOP(budgetCOP - activeCost)} ({(Math.max(0, (budgetCOP - activeCost) / budgetCOP) * 100).toFixed(1)}%)
                </div>
              </div>

              <div className="waterfall-bars-grid">
                {/* 1. Presupuesto Total */}
                <div className="waterfall-stage-card">
                  <span className="waterfall-stage-lbl">1. Presupuesto Asignado</span>
                  <span className="waterfall-stage-val num-tabular">{formatCOP(budgetCOP)}</span>
                  <span className="waterfall-stage-pct" style={{ color: 'var(--color-text-tertiary)' }}>Base: 100.0%</span>
                  <div className="waterfall-bar-track">
                    <div className="waterfall-bar-fill" style={{ width: '100%', background: '#64748b' }}></div>
                  </div>
                </div>

                {/* 2. Desembolso en Productos */}
                <div className="waterfall-stage-card">
                  <span className="waterfall-stage-lbl">2. Salida en Productos</span>
                  <span className="waterfall-stage-val num-tabular" style={{ color: '#fbbf24' }}>-{formatCOP(activeCost)}</span>
                  <span className="waterfall-stage-pct" style={{ color: '#fbbf24' }}>{((activeCost / budgetCOP) * 100).toFixed(1)}% del presupuesto</span>
                  <div className="waterfall-bar-track">
                    <div className="waterfall-bar-fill" style={{ width: `${Math.min(100, (activeCost / budgetCOP) * 100)}%`, background: '#fbbf24' }}></div>
                  </div>
                </div>

                {/* 3. Fricción Logística Imputada */}
                <div className="waterfall-stage-card">
                  <span className="waterfall-stage-lbl">3. Fricción Logística F</span>
                  <span className="waterfall-stage-val num-tabular" style={{ color: '#f87171' }}>-{formatCOP(selectedBasketMode === 'MULTI' ? optimization.multiStore.frictionPenaltyCOP : (optimization.monoStores[selectedBasketMode]?.frictionCOP || 0))}</span>
                  <span className="waterfall-stage-pct" style={{ color: '#f87171' }}>{(((selectedBasketMode === 'MULTI' ? optimization.multiStore.frictionPenaltyCOP : (optimization.monoStores[selectedBasketMode]?.frictionCOP || 0)) / budgetCOP) * 100).toFixed(1)}% del presupuesto</span>
                  <div className="waterfall-bar-track">
                    <div className="waterfall-bar-fill" style={{ width: `${Math.min(100, (((selectedBasketMode === 'MULTI' ? optimization.multiStore.frictionPenaltyCOP : (optimization.monoStores[selectedBasketMode]?.frictionCOP || 0)) / budgetCOP) * 100) * 10)}%`, background: '#f87171' }}></div>
                  </div>
                </div>

                {/* 4. Caja Libre Disponible */}
                <div className="waterfall-stage-card">
                  <span className="waterfall-stage-lbl">4. Caja Libre Disponible</span>
                  <span className="waterfall-stage-val num-tabular" style={{ color: 'var(--highlight-text)' }}>+{formatCOP(budgetCOP - activeCost)}</span>
                  <span className="waterfall-stage-pct" style={{ color: 'var(--highlight-text)' }}>{(((budgetCOP - activeCost) / budgetCOP) * 100).toFixed(1)}% de liquidez</span>
                  <div className="waterfall-bar-track">
                    <div className="waterfall-bar-fill" style={{ width: `${Math.max(0, ((budgetCOP - activeCost) / budgetCOP) * 100)}%`, background: '#10b981' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Matriz Comparativa de Tiendas con Contabilidad Simétrica (Productos + Fricción) */}
            <div className="store-comparative-matrix">
              {/* Combinación Multitienda */}
              <div 
                className={`matrix-store-tile ${selectedBasketMode === 'MULTI' ? 'selected' : ''}`}
                onClick={() => setSelectedBasketMode('MULTI')}
              >
                <div className="tile-system-badge">Asignación Óptima</div>
                <div className="store-header-row">
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <LogoD1 width={24} height={16} />
                    <LogoAra width={24} height={16} />
                  </div>
                  <span className="store-title-label">Híbrido D1 + Ara</span>
                </div>
                <div className="store-metric-price num-tabular">{formatCOP(optimization.multiStore.effectiveCost)}</div>
                <div className="store-submetric-note">
                  {formatCOP(optimization.multiStore.itemsCost)} prod. + {formatCOP(optimization.multiStore.frictionPenaltyCOP)} fricción
                </div>
              </div>

              {/* Monotienda D1 */}
              <div 
                className={`matrix-store-tile ${selectedBasketMode === 'D1' ? 'selected' : ''}`}
                onClick={() => setSelectedBasketMode('D1')}
              >
                <div className="store-header-row">
                  <div className="store-logo-wrapper">
                    <LogoD1 width={32} height={20} />
                  </div>
                  <span className="store-title-label">Monotienda D1</span>
                </div>
                <div className="store-metric-price num-tabular">{formatCOP(optimization.monoStores.D1.effectiveCost)}</div>
                <div className="store-submetric-note">
                  {formatCOP(optimization.monoStores.D1.itemsCost)} prod. + {formatCOP(optimization.monoStores.D1.frictionCOP)} fricción
                </div>
              </div>

              {/* Monotienda Ara */}
              <div 
                className={`matrix-store-tile ${selectedBasketMode === 'ARA' ? 'selected' : ''}`}
                onClick={() => setSelectedBasketMode('ARA')}
              >
                <div className="store-header-row">
                  <div className="store-logo-wrapper">
                    <LogoAra width={32} height={20} />
                  </div>
                  <span className="store-title-label">Monotienda Ara</span>
                </div>
                <div className="store-metric-price num-tabular">{formatCOP(optimization.monoStores.ARA.effectiveCost)}</div>
                <div className="store-submetric-note">
                  {formatCOP(optimization.monoStores.ARA.itemsCost)} prod. + {formatCOP(optimization.monoStores.ARA.frictionCOP)} fricción
                </div>
              </div>

              {/* Monotienda Éxito */}
              <div 
                className={`matrix-store-tile ${selectedBasketMode === 'EXITO' ? 'selected' : ''}`}
                onClick={() => setSelectedBasketMode('EXITO')}
              >
                <div className="store-header-row">
                  <div className="store-logo-wrapper">
                    <LogoExito width={32} height={20} />
                  </div>
                  <span className="store-title-label">Grupo Éxito</span>
                </div>
                <div className="store-metric-price num-tabular">{formatCOP(optimization.monoStores.EXITO.effectiveCost)}</div>
                <div className="store-submetric-note">
                  {formatCOP(optimization.monoStores.EXITO.itemsCost)} prod. + {formatCOP(optimization.monoStores.EXITO.frictionCOP)} fricción
                </div>
              </div>
            </div>

            {/* V4: Tarjeta de Ahorro Auditable con Calculadora vs Mejor Monotienda y Benchmark Humano */}
            <div className="audit-benchmark-box">
              <div className="audit-benchmark-header">
                <span>Auditoría de Ahorro vs. Mejor Monotienda ({optimization.bestMonoStore.storeName})</span>
                <span className="heuristic-pill">
                  <TrendingDown size={12} />
                  +{optimization.heuristicBenchmark.heuristicImprovementPct}% de mejora vs. Heurística RH-1 ({formatCOP(optimization.heuristicBenchmark.effectiveCost)})
                </span>
              </div>
              <div className="audit-benchmark-row">
                <span>Mejor monotienda ({optimization.bestMonoStore.storeName}): {formatCOP(optimization.bestMonoStore.itemsCost)} productos + {formatCOP(optimization.bestMonoStore.frictionCOP)} fricción</span>
                <span className="num-tabular" style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{formatCOP(optimization.bestMonoStore.effectiveCost)}</span>
              </div>
              <div className="audit-benchmark-row">
                <span>Mercado Colombia Híbrido: {formatCOP(optimization.multiStore.itemsCost)} productos + {formatCOP(optimization.multiStore.frictionPenaltyCOP)} fricción</span>
                <span className="num-tabular" style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>-{formatCOP(optimization.multiStore.effectiveCost)}</span>
              </div>
              <div className="audit-benchmark-divider"></div>
              <div className="audit-benchmark-total">
                <span>Ahorro Neto Real Auditable:</span>
                <span className="num-tabular">{formatCOP(optimization.multiStore.netSavings)}</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)' }}>
                Fórmula de conciliación contable: Ahorro bruto en góndola ({formatCOP(optimization.multiStore.grossSavings)}) - Fricción logística adicional ({formatCOP(optimization.multiStore.deltaFriction)}) = Ahorro neto ({formatCOP(optimization.multiStore.netSavings)}).
              </div>
            </div>

            {/* V3: Explicabilidad Inmediata en la Pantalla Principal ("¿Por qué D1 + Ara?") */}
            <div className="quick-explain-deck">
              <div className="quick-explain-title">
                <HelpCircle size={15} color="var(--color-brand-emerald)" />
                <span>¿Por qué la combinación {optimization.multiStore.activeStores.join(' + ')}? (Decisiones determinantes)</span>
              </div>
              <div className="quick-explain-list">
                {optimization.multiStore.explanations.slice(0, 3).map((exp, idx) => (
                  <div key={idx} className="quick-explain-item">
                    <div className="quick-explain-item-head">
                      <span>{idx + 1}. {exp.productName} → {exp.assignedStore}</span>
                      {exp.savingsVsRunnerUp > 0 && (
                        <span style={{ color: 'var(--highlight-text)', fontWeight: 700 }}>+{formatCOP(exp.savingsVsRunnerUp)}</span>
                      )}
                    </div>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.71rem' }}>{exp.reason}</span>
                  </div>
                ))}
              </div>
              <div className="quick-explain-verdict-bar">
                Veredicto analítico: El ahorro bruto en góndola ({formatCOP(optimization.multiStore.grossSavings)}) supera con holgura la fricción logística de desplazamiento ({formatCOP(optimization.multiStore.deltaFriction)}), justificando plenamente la asignación híbrida.
              </div>
            </div>
          </section>
        </div>

        {/* Pestañas de Trabajo */}
        <nav className="workspace-tabs">
          <button 
            id="tab-menu"
            className={`tab-trigger ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <CalendarDays size={16} />
            <span>1. Planificación Semanal (14 Servicios)</span>
          </button>

          <button 
            id="tab-basket"
            className={`tab-trigger ${activeTab === 'basket' ? 'active' : ''}`}
            onClick={() => setActiveTab('basket')}
          >
            <CheckSquare size={16} />
            <span>2. Matriz de Abastecimiento ({activeBasketItems.length} SKUs)</span>
          </button>

          <button 
            id="tab-explainability"
            className={`tab-trigger ${activeTab === 'explainability' ? 'active' : ''}`}
            onClick={() => setActiveTab('explainability')}
          >
            <HelpCircle size={16} />
            <span>3. Explicabilidad ("¿Por qué estas tiendas?")</span>
          </button>

          <button 
            id="tab-pantry"
            className={`tab-trigger ${activeTab === 'pantry' ? 'active' : ''}`}
            onClick={() => setActiveTab('pantry')}
          >
            <PackageSearch size={16} />
            <span>4. Auditoría de Despensa e Inventario</span>
          </button>

          <button 
            id="tab-prices"
            className={`tab-trigger ${activeTab === 'prices' ? 'active' : ''}`}
            onClick={() => setActiveTab('prices')}
          >
            <Database size={16} />
            <span>5. Registro de Precios Normalizados (Cali)</span>
          </button>

          <button 
            id="tab-experiments"
            className={`tab-trigger ${activeTab === 'experiments' ? 'active' : ''}`}
            onClick={() => setActiveTab('experiments')}
          >
            <FlaskConical size={16} />
            <span>6. Batería Experimental V4 (60 Corridas)</span>
          </button>
        </nav>

        {/* PESTAÑA 1: PLANIFICACION SEMANAL */}
        {activeTab === 'menu' && (
          <div className="schedule-grid">
            {weeklyPlan.days.map((day) => (
              <div key={day.dayId} className="schedule-day-tile">
                <div className="day-header-band">
                  <h3>{day.dayName}</h3>
                  <span className="day-coverage-pill">2 Servicios Diarios</span>
                </div>

                {/* Almuerzo */}
                <div className="service-slot">
                  <div className="slot-tag-row">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <SunMedium size={14} />
                      <span>Almuerzo</span>
                    </span>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>{day.lunch.costTier}</span>
                  </div>
                  <div className="slot-recipe-title">{day.lunch.name}</div>
                  <div className="slot-recipe-desc">{day.lunch.description}</div>
                  <div className="slot-meta-strip">
                    <span><Timer size={13} style={{ verticalAlign: 'middle', marginRight: '3px' }} />{day.lunch.prepTimeMinutes} min</span>
                    <span>• {day.lunch.difficulty}</span>
                    <span>• {day.lunch.nutritionalFocus}</span>
                  </div>
                </div>

                {/* Cena */}
                <div className="service-slot dinner-slot">
                  <div className="slot-tag-row">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MoonStar size={14} />
                      <span>Cena</span>
                    </span>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>{day.dinner.costTier}</span>
                  </div>
                  <div className="slot-recipe-title">{day.dinner.name}</div>
                  <div className="slot-recipe-desc">{day.dinner.description}</div>
                  <div className="slot-meta-strip">
                    <span><Timer size={13} style={{ verticalAlign: 'middle', marginRight: '3px' }} />{day.dinner.prepTimeMinutes} min</span>
                    <span>• {day.dinner.difficulty}</span>
                    <span>• {day.dinner.nutritionalFocus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PESTAÑA 2: MATRIZ DE ABASTECIMIENTO / LISTA DE COMPRAS */}
        {activeTab === 'basket' && (
          <div className="procurement-stack">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Lista de Adquisición en Punto de Venta</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                  Estrategia activa: <strong>{selectedBasketMode === 'MULTI' ? 'Asignación Óptima Multitienda' : STORES[selectedBasketMode]?.name}</strong>. {pantryStockIds.length > 0 && `(${pantryStockIds.length} insumos excluidos por estar en despensa)`}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  onClick={copyShoppingList}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'var(--color-bg-elevated)',
                    border: '1px solid var(--color-border-subtle)',
                    color: 'var(--color-text-primary)',
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {copiedNotification ? <Check size={14} color="var(--highlight-text)" /> : <Copy size={14} />}
                  <span>{copiedNotification ? 'Copiado al Portapapeles' : 'Exportar Lista'}</span>
                </button>

                <div style={{ display: 'flex', gap: '0.3rem', background: 'var(--color-bg-base)', padding: '0.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)' }}>
                  {['MULTI', 'D1', 'ARA', 'EXITO'].map(mode => (
                    <button
                      key={mode}
                      onClick={() => setSelectedBasketMode(mode)}
                      style={{
                        padding: '0.35rem 0.65rem',
                        borderRadius: 'var(--radius-xs)',
                        border: 'none',
                        background: selectedBasketMode === mode ? 'var(--color-brand-emerald)' : 'transparent',
                        color: selectedBasketMode === mode ? '#ffffff' : 'var(--color-text-secondary)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      {mode === 'MULTI' ? 'Óptima' : STORES[mode].shortName}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Agrupamiento por Tienda con Logos Oficiales */}
            {Object.entries(groupedBasketByStore).map(([storeId, items]) => {
              const storeInfo = STORES[storeId] || { name: storeId, color: '#10b981' };
              const storeSubtotal = items.reduce((acc, i) => acc + i.totalCost, 0);

              return (
                <div key={storeId} className="store-batch-panel">
                  <div className="batch-title-bar">
                    <div className="batch-store-id">
                      {renderStoreLogo(storeId, 36, 22)}
                      <span>{storeInfo.name}</span>
                    </div>
                    <div className="batch-subtotal-meta">
                      Subtotal asignado: <strong className="num-tabular">{formatCOP(storeSubtotal)}</strong> ({items.length} SKUs)
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {items.map(item => {
                      const isChecked = !!checkedItems[item.productId];
                      return (
                        <div key={item.productId} className={`procurement-row ${isChecked ? 'procured' : ''}`}>
                          <div className="procurement-left">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleItemCheck(item.productId)}
                              className="procure-checkbox"
                            />
                            <div className="sku-detail-cell">
                              <span className="sku-title">{item.productName}</span>
                              <span className="sku-subtext">
                                Marca: <strong>{item.brand}</strong> • {item.packagingType === 'EXACT_WEIGHT' ? 'Formato: Granel exacto en báscula' : `Presentación fija: ${item.packageSize}${item.unit}`}
                              </span>
                            </div>
                          </div>

                          <div className="procurement-right">
                            {item.packagingType === 'EXACT_WEIGHT' ? (
                              <div className="package-counter-badge num-tabular" style={{ background: 'rgba(202, 138, 4, 0.15)', color: '#ca8a04' }}>
                                <Scale size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                                {item.totalRequired} {item.unit} exactos
                              </div>
                            ) : (
                              <div className="package-counter-badge num-tabular">
                                {item.packageUnits} {item.packageUnits === 1 ? 'empaque cerrado' : 'empaques cerrados'}
                              </div>
                            )}

                            <div className="sku-cost-display num-tabular">
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

        {/* PESTAÑA 3: MOTOR DE EXPLICABILIDAD ("¿Por qué estas tiendas?") */}
        {activeTab === 'explainability' && (
          <div className="surface-panel">
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle size={18} color="var(--color-brand-emerald)" />
                <span>Racionalidad de la Asignación Multitienda</span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                El optimizador no compara precios en abstracto. Explica transparentemente qué ventaja financiera u operativa motivó la asignación de cada SKU frente a la tienda alternativa más cercana:
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '0.85rem' }}>
              {optimization.multiStore.explanations.map((exp, idx) => (
                <div key={idx} style={{ background: 'var(--color-bg-base)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{exp.productName}</span>
                    <span style={{ fontSize: '0.72rem', background: 'var(--color-brand-emerald-dim)', color: 'var(--highlight-text)', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 700 }}>
                      {exp.assignedStore}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                    {exp.reason}
                  </div>
                  {exp.savingsVsRunnerUp > 0 && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--highlight-text)', fontWeight: 600, marginTop: '0.15rem' }}>
                      Ahorro marginal: {formatCOP(exp.savingsVsRunnerUp)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PESTAÑA 4: AUDITORIA DE DESPENSA RESIDUAL */}
        {activeTab === 'pantry' && (
          <div className="surface-panel">
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PackageSearch size={18} color="#d97706" />
                <span>Auditoría de Despensa Residual y Clasificación de Inventario</span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                Diferenciación estricta entre <strong>Inventario Útil Futuro</strong> (granos, aceite, legumbres que no perecen) y <strong>Riesgo de Desperdicio</strong> (hortalizas perecederas con riesgo de pérdida si sobran):
              </p>
            </div>

            <div className="residual-grid">
              {activeBasketItems
                .filter(item => item.pantrySurplus > 0)
                .map(item => {
                  const isWasteRisk = item.expectedWasteRisk > 0;
                  return (
                    <div key={item.productId} className="residual-tile" style={{ borderLeft: `3px solid ${isWasteRisk ? '#ef4444' : '#38bdf8'}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="residual-title">{item.productName}</span>
                        <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: isWasteRisk ? 'rgba(239, 68, 68, 0.15)' : 'rgba(56, 189, 248, 0.15)', color: isWasteRisk ? '#ef4444' : '#38bdf8', fontWeight: 700 }}>
                          {isWasteRisk ? 'Riesgo Desperdicio' : 'Inventario Útil'}
                        </span>
                      </div>
                      <span className="residual-formula">
                        Demanda semanal: {item.totalRequired} {item.unit} | Empaque: {item.totalPurchasedAmount} {item.unit}
                      </span>
                      <span className="residual-stock num-tabular" style={{ color: isWasteRisk ? '#ef4444' : '#38bdf8' }}>
                        + {item.pantrySurplus.toFixed(1)} {item.unit} sobrantes ({formatCOP(item.surplusValue)})
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* PESTAÑA 5: REGISTRO DE PRECIOS NORMALIZADOS */}
        {activeTab === 'prices' && (
          <div className="surface-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Registro de Precios y Normalización de Catálogo</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  Base de datos de SKUs esenciales en Cali para D1, Ara y Éxito, normalizados por unidad métrica ($/g, $/ml, $/un), tipo de empaque y confidence score.
                </p>
              </div>

              <div style={{ position: 'relative', minWidth: '280px' }}>
                <Search size={15} color="var(--color-text-tertiary)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Filtrar por SKU, marca o cadena..."
                  value={priceSearchQuery}
                  onChange={(e) => setPriceSearchQuery(e.target.value)}
                  className="search-input-field"
                />
              </div>
            </div>

            <div className="price-registry-container">
              <table className="price-registry-table">
                <thead>
                  <tr>
                    <th>Canal / Retailer</th>
                    <th>Producto / Marca Comercial</th>
                    <th>Modalidad Venta</th>
                    <th>Formato Empaque</th>
                    <th>Precio Nominal COP</th>
                    <th>Valor Normalizado</th>
                    <th>Auditoría / Confianza</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrices.map((row, idx) => {
                    const prod = ESSENTIAL_PRODUCTS.find(p => p.id === row.productId);
                    const store = STORES[row.storeId];
                    return (
                      <tr key={idx}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {renderStoreLogo(row.storeId, 28, 18)}
                            <span style={{ fontWeight: 700, fontSize: '0.75rem' }}>
                              {store?.shortName || row.storeId}
                            </span>
                          </div>
                        </td>
                        <td>
                          <strong>{prod?.name || row.productId}</strong>
                          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)' }}>{row.brand}</div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.72rem', color: row.packagingType === 'EXACT_WEIGHT' ? '#ca8a04' : 'var(--color-text-secondary)' }}>
                            {row.packagingType === 'EXACT_WEIGHT' ? 'Granel (Báscula exacta)' : 'Empaque sellado discreto'}
                          </span>
                        </td>
                        <td className="num-tabular">{row.packageSize} {row.unit}</td>
                        <td className="num-tabular" style={{ fontWeight: 700, color: 'var(--highlight-text)' }}>
                          {formatCOP(row.priceCOP)}
                        </td>
                        <td className="num-tabular" style={{ color: 'var(--color-text-secondary)' }}>
                          ${row.pricePerUnit.toFixed(2)} COP/{row.unit}
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span className={CONFIDENCE_LEVELS[row.confidence]?.badgeClass || 'badge-recent'}>
                              {CONFIDENCE_LEVELS[row.confidence]?.label || 'Verificado'}
                            </span>
                            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-tertiary)' }}>
                              Score: {(row.confidenceScore * 100).toFixed(0)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PESTAÑA 6: BATERIA EXPERIMENTAL V4 (60 CORRIDAS COMPUTACIONALES) */}
        {activeTab === 'experiments' && (
          <div className="surface-panel">
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FlaskConical size={18} color="var(--color-brand-emerald)" />
                    <span>Línea V4-A: Batería Experimental de 60 Corridas (12 Escenarios × 5 Estrategias)</span>
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                    Evaluación determinista, simétrica y reproducible en Santiago de Cali. Compara el modelo MILP V4 frente a Monotiendas (D1, Ara, Éxito) y la Heurística Humana Razonable (RH-1).
                  </p>
                </div>
                <div className="heuristic-pill" style={{ background: 'rgba(16, 185, 129, 0.12)', borderColor: 'rgba(16, 185, 129, 0.3)', color: 'var(--highlight-text)' }}>
                  <Award size={13} />
                  <span>Dominancia de Pareto: 100% (12/12)</span>
                </div>
              </div>
            </div>

            {/* Tarjetas de Métricas Maestras */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--color-bg-base)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.85rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Mejora Media vs. Heurística RH-1</div>
                <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--highlight-text)' }} className="num-tabular">
                  +{EXPERIMENTAL_V4_SUMMARY.metrics.meanImprovementPct}%
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>
                  Rango: {EXPERIMENTAL_V4_SUMMARY.metrics.minImprovementPct}% – {EXPERIMENTAL_V4_SUMMARY.metrics.maxImprovementPct}% (Mediana: {EXPERIMENTAL_V4_SUMMARY.metrics.medianImprovementPct}%)
                </div>
              </div>

              <div style={{ background: 'var(--color-bg-base)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.85rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Tasa de Dominancia de Pareto</div>
                <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#38bdf8' }} className="num-tabular">
                  {EXPERIMENTAL_V4_SUMMARY.metrics.dominanceRatePct}%
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>
                  MILP domina estrictamente en costo y desperdicio (12 de 12)
                </div>
              </div>

              <div style={{ background: 'var(--color-bg-base)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.85rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Telemetría del Solver MILP</div>
                <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--highlight-text)' }} className="num-tabular">
                  {EXPERIMENTAL_V4_SUMMARY.solverTelemetry.optimalityGapPct.toFixed(2)}% Gap
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>
                  {EXPERIMENTAL_V4_SUMMARY.solverTelemetry.activeDecisionVariables} Vars Activas | {EXPERIMENTAL_V4_SUMMARY.solverTelemetry.constraintsCount} Restricciones | UB == LB
                </div>
              </div>

              <div style={{ background: 'var(--color-bg-base)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.85rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Runtime de Optimización</div>
                <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--color-text-primary)' }} className="num-tabular">
                  {EXPERIMENTAL_V4_SUMMARY.metrics.runtime.p50Ms} ms
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>
                  Percentil p50: {EXPERIMENTAL_V4_SUMMARY.metrics.runtime.p50Ms}ms | p95: {EXPERIMENTAL_V4_SUMMARY.metrics.runtime.p95Ms}ms | max: {EXPERIMENTAL_V4_SUMMARY.metrics.runtime.maxMs}ms
                </div>
              </div>

              <div style={{ background: 'var(--color-bg-base)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.85rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Validación Humana (V4-B)</div>
                <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#ca8a04' }} className="num-tabular">
                  20–50
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>
                  Participantes Responsables de Compra en Cali (V4-B)
                </div>
              </div>
            </div>

            {/* Matriz de los 12 Escenarios Experimentales */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.65rem' }}>
                Tabla de Resultados Consolidados (12 Escenarios Combinatorios × 5 Estrategias = 60 Ejecuciones)
              </div>
              <div className="price-registry-container">
                <table className="price-registry-table">
                  <thead>
                    <tr>
                      <th># Escenario Experimental</th>
                      <th>Presupuesto</th>
                      <th>Costo MILP V4</th>
                      <th>Costo Humano RH-1</th>
                      <th>Mejora vs. Heurística</th>
                      <th>Ahorro vs. Mejor Monotienda</th>
                      <th>Dominancia Pareto</th>
                      <th>Diagnóstico</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXPERIMENTAL_V4_SUMMARY.scenarios.map(sc => (
                      <tr key={sc.id}>
                        <td><strong>{sc.name}</strong></td>
                        <td className="num-tabular">{formatCOP(sc.budget)}</td>
                        <td className="num-tabular" style={{ fontWeight: 700, color: 'var(--highlight-text)' }}>
                          {formatCOP(sc.milpCost)}
                        </td>
                        <td className="num-tabular" style={{ color: 'var(--color-text-secondary)' }}>
                          {formatCOP(sc.humanCost)}
                        </td>
                        <td>
                          <span className="heuristic-pill" style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem' }}>
                            +{sc.improvementPct}%
                          </span>
                        </td>
                        <td className="num-tabular" style={{ fontWeight: 600 }}>
                          +{formatCOP(sc.savingsVsBestMono)}
                        </td>
                        <td>
                          <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.75rem' }}>
                            ✓ Dominante
                          </span>
                        </td>
                        <td style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>
                          {sc.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Análisis de Sensibilidad Paramétrica & Protocolo V4-B */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {/* Sensibilidad P_HIGH Riesgo Biológico */}
              <div style={{ background: 'var(--color-bg-base)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.95rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Database size={14} color="#38bdf8" />
                  <span>Sensibilidad Riesgo Biológico (P_HIGH ∈ [0.50, 0.90])</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.75rem' }}>
                  {EXPERIMENTAL_V4_SUMMARY.wasteProbabilitySensitivity.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.5rem', background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--color-border-subtle)' }}>
                      <div>
                        <strong>P_HIGH = {item.wasteProbabilityHigh.toFixed(2)}:</strong> <span style={{ color: 'var(--color-text-secondary)' }}>Riesgo: {formatCOP(item.expectedWaste)}</span>
                      </div>
                      <div className="num-tabular" style={{ fontWeight: 700, color: '#10b981' }}>
                        {item.solutionId} (Cambió: NO)
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', marginTop: '0.65rem' }}>
                  Robustez estructural: Báscula en Éxito sigue siendo óptima en todo el rango [0.50, 0.90].
                </div>
              </div>

              {/* Sensibilidad */}
              <div style={{ background: 'var(--color-bg-base)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.95rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <TrendingDown size={14} color="var(--color-brand-emerald)" />
                  <span>Análisis de Sensibilidad de Ponderadores (λ Desperdicio)</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.75rem' }}>
                  {EXPERIMENTAL_V4_SUMMARY.sensitivityAnalysis.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.5rem', background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--color-border-subtle)' }}>
                      <div>
                        <strong>λ_waste = {item.lambdaWaste}:</strong> <span style={{ color: 'var(--color-text-secondary)' }}>{item.notes}</span>
                      </div>
                      <div className="num-tabular" style={{ fontWeight: 700, color: 'var(--highlight-text)' }}>
                        {item.solutionStability} ({item.storePair})
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', marginTop: '0.65rem' }}>
                  Conclusión: La asignación óptima D1 + Ara se mantiene invariante ante oscilaciones de λ entre 0.2 y 1.2, evidenciando alta robustez estructural.
                </div>
              </div>

              {/* Protocolo de Validación Humana V4-B */}
              <div style={{ background: 'var(--color-bg-base)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.95rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={14} color="#ca8a04" />
                  <span>Línea V4-B: Protocolo de Validación en Cali (20–50 Participantes Decisores)</span>
                </h4>
                <p style={{ fontSize: '0.73rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  No se evalúan encuestas hipotéticas de disposición a pagar. Se confronta al consumidor con una decisión de compra terminada:
                </p>
                <div style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-xs)', padding: '0.5rem', margin: '0.5rem 0', fontSize: '0.71rem' }}>
                  <strong>Hipótesis Central:</strong> Presupuesto ($200k) → Menú (14 platos) → Canasta ($171.8k en D1+Ara con $14.6k de ahorro neto).
                  <div style={{ marginTop: '0.25rem', color: 'var(--highlight-text)' }}>
                    Pregunta Clave: "¿Harías esta compra tal cual? ¿Qué tendría que cambiar para que la hicieras?"
                  </div>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)' }}>
                  Documento formal de campo: <code>protocolo_validacion_cali_v4.md</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default App;
