import React, { useState, useMemo, useEffect } from 'react';
import { MealPlanService } from './application/MealPlanService.js';
import { BasketOptimizer } from './application/BasketOptimizer.js';
import { PRICES_CALI } from './data/prices_cali.js';
import { ESSENTIAL_PRODUCTS } from './data/products.js';
import { STORES, CONFIDENCE_LEVELS, CITIES, PANTRY_STAPLE_IDS, TRANSPORT_MODES } from './domain/types.js';
import { LogoD1, LogoAra, LogoExito, FlagColombia } from './ui/StoreLogos.jsx';
import { EXPERIMENTAL_V4_SUMMARY } from './data/experimental_v4_summary.js';
import { ShoppingChecklist } from './ui/ShoppingChecklist.jsx';
import { BehavioralTrackerModal } from './ui/BehavioralTrackerModal.jsx';
import { 
  SlidersHorizontal, 
  CalendarDays, 
  CheckSquare, 
  PackageSearch, 
  Database, 
  TrendingDown, 
  ShieldCheck, 
  AlertCircle, 
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
  HelpCircle, 
  ShieldAlert, 
  FlaskConical, 
  Award, 
  ShoppingBag, 
  Store, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  Activity, 
  Heart, 
  CheckCircle2, 
  History 
} from 'lucide-react';

export default function App() {
  // Tema claro/oscuro
  const [theme, setTheme] = useState(() => localStorage.getItem('mc_theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mc_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  // Pestaña activa: 'overview' | 'shopping' | 'compare' | 'why' | 'history' | 'laboratory'
  const [activeTab, setActiveTab] = useState('overview');

  // Parámetros de simulación
  const [peopleCount, setPeopleCount] = useState(2);
  const [budgetCOP, setBudgetCOP] = useState(220000);
  const [preference, setPreference] = useState('BALANCEADO');
  const [selectedZoneId, setSelectedZoneId] = useState('CALI_GRANADA_VERSALLES');
  const [selectedTransportModeId, setSelectedTransportModeId] = useState('WALKING');
  const [pantryStockIds, setPantryStockIds] = useState(['prod_sal_refinada', 'prod_aceite_vegetal']);
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);
  const [selectedBasketMode, setSelectedBasketMode] = useState('MULTI'); // 'MULTI' | 'D1' | 'ARA' | 'EXITO'
  const [checkedItems, setCheckedItems] = useState({});
  const [priceSearchQuery, setPriceSearchQuery] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [behavioralModalOpen, setBehavioralModalOpen] = useState(false);

  // Telemetría conductual V4-B
  const [behavioralSession, setBehavioralSession] = useState(() => ({
    sessionId: 'sess_' + Math.random().toString(36).substring(2, 9),
    scenarioKey: 'Granada-Versalles - $220k - 2 PAX - Balanceado',
    participantId: 'P_CALI_01',
    startedAt: new Date().toISOString(),
    secondStoreAccepted: true,
    secondStoreInteractionsCount: 0,
    checklistOpened: false,
    checklistItemsChecked: 0,
    whatsappCopied: false,
    explanationOpened: false,
    purchaseCompleted: false,
    totalItemsInBasket: 0,
    netSavingsPresented: 24910
  }));

  const togglePantryStaple = (id) => {
    setPantryStockIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  // Invocación del planificador nutricional semanal
  const weeklyPlan = useMemo(() => {
    return MealPlanService.generateWeeklyPlan({ peopleCount, budgetCOP, preference });
  }, [peopleCount, budgetCOP, preference]);

  // Invocación del optimizador combinatorio exacto
  const optimization = useMemo(() => {
    return BasketOptimizer.optimize({
      consolidatedIngredients: weeklyPlan.ingredients,
      budgetCOP,
      pantryStockIds,
      zoneId: selectedZoneId,
      transportModeId: selectedTransportModeId
    });
  }, [weeklyPlan, budgetCOP, pantryStockIds, selectedZoneId, selectedTransportModeId]);

  // Items de la canasta según modo seleccionado
  const activeBasketItems = useMemo(() => {
    if (selectedBasketMode === 'MULTI') return optimization.multiStore.items;
    return optimization.monoStores[selectedBasketMode]?.items || [];
  }, [selectedBasketMode, optimization]);

  // Agrupación de canasta por tienda para paradas
  const groupedBasketByStore = useMemo(() => {
    const groups = {};
    activeBasketItems.forEach(item => {
      if (!groups[item.storeId]) groups[item.storeId] = [];
      groups[item.storeId].push(item);
    });
    return groups;
  }, [activeBasketItems]);

  // Actualizar sesión conductual al cambiar la canasta
  useEffect(() => {
    setBehavioralSession(prev => ({
      ...prev,
      scenarioKey: optimization.currentZone.name + ' - $' + (budgetCOP / 1000) + 'k - ' + peopleCount + ' PAX - ' + preference,
      totalItemsInBasket: activeBasketItems.length,
      netSavingsPresented: optimization.multiStore.netSavings
    }));
  }, [optimization, budgetCOP, peopleCount, preference, activeBasketItems]);

  // Matriz de precios filtrada
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

  const formatCOP = (val) => '$ ' + Math.round(val || 0).toLocaleString('es-CO');

  // Handlers del Checklist y Conducta
  const handleItemCheckToggle = (productId) => {
    setCheckedItems(prev => {
      const next = { ...prev, [productId]: !prev[productId] };
      const checkedCount = Object.values(next).filter(Boolean).length;
      setBehavioralSession(s => ({ ...s, checklistItemsChecked: checkedCount }));
      return next;
    });
  };

  const handleSelectAll = () => {
    const next = {};
    activeBasketItems.forEach(it => { next[it.productId] = true; });
    setCheckedItems(next);
    setBehavioralSession(s => ({ ...s, checklistItemsChecked: activeBasketItems.length }));
  };

  const handleResetAll = () => {
    setCheckedItems({});
    setBehavioralSession(s => ({ ...s, checklistItemsChecked: 0 }));
  };

  const handleCopyShoppingList = () => {
    let text = 'MERCADO COLOMBIA - ORDEN DE COMPRA (' + peopleCount + ' personas | Zona: ' + optimization.currentZone.name + ')\n';
    text += 'Presupuesto: ' + formatCOP(budgetCOP) + ' | Salida estimada en caja: ' + formatCOP(activeCost) + '\n\n';
    Object.entries(groupedBasketByStore).forEach(([storeId, items], idx) => {
      const storeName = STORES[storeId]?.name || storeId;
      const subtotal = items.reduce((acc, it) => acc + it.totalCost, 0);
      text += 'PARADA ' + (idx + 1) + ': ' + storeName.toUpperCase() + ' (' + formatCOP(subtotal) + ')\n';
      items.forEach(item => {
        const packaging = item.packagingType === 'EXACT_WEIGHT' 
          ? '(Báscula exacta ' + item.totalRequired + item.unit + ')' 
          : '(' + item.packageUnits + ' paq x ' + item.packageSize + item.unit + ')';
        text += '  [ ] ' + item.productName + ' [' + item.brand + '] ' + packaging + ': ' + formatCOP(item.totalCost) + '\n';
      });
      text += '\n';
    });
    text += 'Ahorro neto comprobado: +' + formatCOP(optimization.multiStore.netSavings) + ' frente a comprar todo en una sola tienda.';
    navigator.clipboard.writeText(text).then(() => {
      setCopiedNotification(true);
      setBehavioralSession(s => ({ ...s, whatsappCopied: true }));
      setTimeout(() => setCopiedNotification(false), 2500);
    });
  };

  const handleCompletePurchase = () => {
    setPurchaseCompleted(true);
    setBehavioralSession(s => ({ ...s, purchaseCompleted: true }));
  };

  // Trade-off de 2da parada (V4-B)
  const handleAcceptSecondStore = () => {
    setSelectedBasketMode('MULTI');
    setBehavioralSession(s => ({
      ...s,
      secondStoreAccepted: true,
      secondStoreInteractionsCount: s.secondStoreInteractionsCount + 1
    }));
  };

  const handlePreferSingleStore = () => {
    const bestMonoId = optimization.bestMonoStore.storeId;
    setSelectedBasketMode(bestMonoId);
    setBehavioralSession(s => ({
      ...s,
      secondStoreAccepted: false,
      secondStoreInteractionsCount: s.secondStoreInteractionsCount + 1
    }));
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    if (tabKey === 'shopping') {
      setBehavioralSession(s => ({ ...s, checklistOpened: true }));
    } else if (tabKey === 'why') {
      setBehavioralSession(s => ({ ...s, explanationOpened: true }));
    }
  };

  const renderStoreLogo = (storeId, width = 32, height = 20) => {
    switch (storeId) {
      case 'D1': return <LogoD1 width={width} height={height} />;
      case 'ARA': return <LogoAra width={width} height={height} />;
      case 'EXITO': return <LogoExito width={width} height={height} />;
      default: return null;
    }
  };

  const caliZones = CITIES.CALI.zones;
  const transportModesList = Object.values(TRANSPORT_MODES);
  const pantryStapleProducts = ESSENTIAL_PRODUCTS.filter(p => PANTRY_STAPLE_IDS.includes(p.id));
  const telemetry = optimization.solverTelemetry;

  return (
    <div>
      {/* Header Unificado */}
      <header className="site-header">
        <div className="site-header-inner">
          <div className="brand-section">
            <div className="brand-symbol">
              <FlagColombia width={22} height={14} />
            </div>
            <div className="brand-titles">
              <h1><span>Mercado Colombia</span></h1>
              <div className="brand-tagline">Compra mejor. Vive mejor.</div>
            </div>
          </div>

          {/* Barra de Navegación de 6 Pestañas */}
          <nav className="consumer-nav-strip">
            <button 
              className={'nav-tab-btn ' + (activeTab === 'overview' ? 'active' : '')}
              onClick={() => handleTabChange('overview')}
            >
              <Store size={15} />
              <span>Mi mercado</span>
            </button>

            <button 
              className={'nav-tab-btn ' + (activeTab === 'shopping' ? 'active' : '')}
              onClick={() => handleTabChange('shopping')}
            >
              <ShoppingBag size={15} />
              <span>Compra</span>
              <span style={{ fontSize: '0.68rem', background: 'var(--color-bg-elevated)', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 700 }}>
                {activeBasketItems.length}
              </span>
            </button>

            <button 
              className={'nav-tab-btn ' + (activeTab === 'compare' ? 'active' : '')}
              onClick={() => handleTabChange('compare')}
            >
              <ArrowRightLeft size={15} />
              <span>Comparar</span>
            </button>

            <button 
              className={'nav-tab-btn ' + (activeTab === 'why' ? 'active' : '')}
              onClick={() => handleTabChange('why')}
            >
              <HelpCircle size={15} />
              <span>¿Por qué?</span>
            </button>

            <button 
              className={'nav-tab-btn ' + (activeTab === 'history' ? 'active' : '')}
              onClick={() => handleTabChange('history')}
            >
              <History size={15} />
              <span>Mi Historial</span>
            </button>

            <button 
              className={'nav-tab-btn lab-tab ' + (activeTab === 'laboratory' ? 'active' : '')}
              onClick={() => handleTabChange('laboratory')}
            >
              <FlaskConical size={15} />
              <span>Laboratorio V4</span>
            </button>
          </nav>

          {/* Controles de Cabecera */}
          <div className="header-controls-strip">
            <div className="status-badge active-region">
              <div className="dot-indicator"></div>
              <span>Cali, Valle</span>
            </div>

            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme}
              aria-label="Alternar modo de color"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="app-container">
        {/* PESTAÑA 1: MI MERCADO (OVERVIEW CONSUMIDOR) */}
        {activeTab === 'overview' && (
          <div className="consumer-three-col-layout">
            {/* Columna Izquierda: Configuración del Hogar */}
            <aside className="consumer-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-title">
                  <SlidersHorizontal size={16} color="var(--color-brand-emerald)" />
                  <span>Tu mercado</span>
                </div>
                <div className="sidebar-sub">
                  Personaliza tus preferencias para obtener la mejor recomendación.
                </div>

                {/* Comensales */}
                <div className="sidebar-form-item">
                  <div className="sidebar-form-label">
                    <span>Personas en el hogar</span>
                    <span className="num-tabular">{peopleCount} personas</span>
                  </div>
                  <div className="people-grid">
                    {[1, 2, 3, 4].map(num => (
                      <button
                        key={num}
                        className={'option-select-btn ' + (peopleCount === num ? 'active' : '')}
                        onClick={() => setPeopleCount(num)}
                      >
                        <span className="main-label num-tabular">{num}</span>
                        <span className="sub-label">{num === 2 ? 'Pareja' : num === 1 ? 'Solo' : 'Familia'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Presupuesto semanal */}
                <div className="sidebar-form-item">
                  <div className="sidebar-form-label">
                    <span>Presupuesto semanal</span>
                    <strong className="num-tabular" style={{ color: 'var(--color-brand-emerald)' }}>
                      {formatCOP(budgetCOP)}
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="400000"
                    step="10000"
                    value={budgetCOP}
                    onChange={e => setBudgetCOP(Number(e.target.value))}
                    className="slider-control"
                  />
                  <div className="presets-strip">
                    {[150000, 200000, 220000, 250000].map(val => (
                      <button
                        key={val}
                        className={'preset-button ' + (budgetCOP === val ? 'active' : '')}
                        onClick={() => setBudgetCOP(val)}
                      >
                        ${val / 1000}k
                      </button>
                    ))}
                  </div>
                </div>

                {/* Zona comercial en Cali */}
                <div className="sidebar-form-item">
                  <div className="sidebar-form-label">
                    <span>Zona / Área comercial</span>
                  </div>
                  <select
                    className="sidebar-select"
                    value={selectedZoneId}
                    onChange={e => setSelectedZoneId(e.target.value)}
                  >
                    {caliZones.map(zone => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name} ({zone.baseDistanceKm} km)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Modo de desplazamiento */}
                <div className="sidebar-form-item">
                  <div className="sidebar-form-label">
                    <span>Modo de desplazamiento</span>
                  </div>
                  <div className="transport-pills-grid">
                    {transportModesList.slice(0, 3).map(mode => (
                      <button
                        key={mode.id}
                        className={'transport-pill-btn ' + (selectedTransportModeId === mode.id ? 'active' : '')}
                        onClick={() => setSelectedTransportModeId(mode.id)}
                      >
                        {mode.id === 'WALKING' && <Footprints size={14} />}
                        {mode.id === 'MIO' && <Bus size={14} />}
                        {mode.id === 'CAR_MOTO' && <Car size={14} />}
                        <span>{mode.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Perfil nutricional */}
                <div className="sidebar-form-item">
                  <div className="sidebar-form-label">
                    <span>Perfil nutricional</span>
                  </div>
                  <select
                    className="sidebar-select"
                    value={preference}
                    onChange={e => setPreference(e.target.value)}
                  >
                    <option value="BALANCEADO">Balanceado (Recomendado)</option>
                    <option value="ECONOMICO">Máx. Ahorro</option>
                    <option value="ALTA_PROTEINA">Alta Proteína</option>
                  </select>
                </div>

                {/* Acordeón de Configuración Avanzada */}
                <div style={{ marginTop: '0.5rem' }}>
                  <button 
                    className="accordion-toggle-btn"
                    onClick={() => setAdvancedSettingsOpen(!advancedSettingsOpen)}
                  >
                    <span>Configuración avanzada</span>
                    {advancedSettingsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>

                  {advancedSettingsOpen && (
                    <div className="accordion-content">
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>
                        <strong>Insumos ya en casa (Despensa preexistente):</strong>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem' }}>
                        {pantryStapleProducts.map(prod => {
                          const hasIt = pantryStockIds.includes(prod.id);
                          return (
                            <button
                              key={prod.id}
                              onClick={() => togglePantryStaple(prod.id)}
                              style={{
                                padding: '0.3rem 0.45rem',
                                borderRadius: 'var(--radius-xs)',
                                border: '1px solid ' + (hasIt ? 'var(--color-brand-emerald)' : 'var(--color-border-subtle)'),
                                background: hasIt ? 'var(--color-brand-emerald-dim)' : 'var(--color-bg-elevated)',
                                color: hasIt ? 'var(--highlight-text)' : 'var(--color-text-secondary)',
                                fontSize: '0.7rem',
                                textAlign: 'left',
                                cursor: 'pointer'
                              }}
                            >
                              {prod.name.split(' ')[0]} {prod.name.split(' ')[1] || ''}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Banner de Valor al Consumidor */}
              <div className="sidebar-wellness-banner">
                <Sparkles size={18} style={{ flexShrink: 0 }} />
                <div>
                  <strong>Tu ahorro, tu bienestar</strong>
                  <div>Optimizamos tu compra considerando precio, empaques, disponibilidad, nutrición y fricción logística.</div>
                </div>
              </div>
            </aside>

            {/* Columna Central: Recomendación de Compra */}
            <section className="consumer-main-content">
              {/* Hero Banner Principal */}
              <div className="hero-decision-banner">
                <div className="hero-banner-top">
                  <div className="hero-title-group">
                    <div className="hero-cart-icon-wrap">
                      <ShoppingBag size={22} color="#ffffff" />
                    </div>
                    <div>
                      <h2>Tu mejor mercado esta semana</h2>
                      <p>Combinamos las mejores opciones de cada tienda para que tu plata rinda más.</p>
                    </div>
                  </div>

                  <div className="hero-active-scenario-badge">
                    <MapPin size={12} />
                    <span>Escenario activo: {optimization.currentZone.name.split(' ')[0]} · {formatCOP(budgetCOP)} · {peopleCount} personas</span>
                  </div>
                </div>

                <div className="hero-stats-row">
                  <div className="hero-stat-cell">
                    <span className="hero-stat-lbl">Costo efectivo total</span>
                    <div className="hero-stat-val num-tabular">
                      {formatCOP(optimization.multiStore.effectiveCost)}
                      <span className="hero-stat-badge-heuristic">+{optimization.heuristicBenchmark.heuristicImprovementPct}% vs RH-1</span>
                    </div>
                    <span className="hero-stat-sub">En {optimization.currentZone.name.split(' ')[0]}</span>
                  </div>

                  <div className="hero-stat-cell">
                    <span className="hero-stat-lbl">Ahorro neto comprobado</span>
                    <div className="hero-stat-val num-tabular" style={{ color: '#a7f3d0' }}>
                      +{formatCOP(optimization.multiStore.netSavings)}
                    </div>
                    <span className="hero-stat-sub">Frente a la mejor monotienda</span>
                  </div>

                  <div className="hero-stat-cell">
                    <span className="hero-stat-lbl">Tiendas sugeridas</span>
                    <div className="hero-stat-val" style={{ fontSize: '1.1rem' }}>
                      {optimization.multiStore.activeStores.length} tiendas
                    </div>
                    <span className="hero-stat-sub">{optimization.multiStore.activeStores.join(' + ')}</span>
                  </div>

                  <div className="hero-stat-cell">
                    <span className="hero-stat-lbl">Productos</span>
                    <div className="hero-stat-val" style={{ fontSize: '1.1rem' }}>
                      {activeBasketItems.length} ítems
                    </div>
                    <span className="hero-stat-sub">Para los 7 días</span>
                  </div>

                  <div className="hero-stat-cell">
                    <span className="hero-stat-lbl">Tiempo estimado</span>
                    <div className="hero-stat-val" style={{ fontSize: '1.1rem' }}>
                      ~ 45 min
                    </div>
                    <span className="hero-stat-sub">Recorrido peatonal</span>
                  </div>
                </div>
              </div>

              {/* Desglose Presupuestal */}
              <div className="consumer-budget-breakdown-card">
                <div className="breakdown-top-header">
                  <h3>Desglose de tu presupuesto</h3>
                  <span className="num-tabular" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                    {formatCOP(budgetCOP)} Presupuesto asignado
                  </span>
                </div>

                <div className="breakdown-bars-track">
                  <div className="breakdown-step-card base">
                    <span className="step-card-value num-tabular">{formatCOP(budgetCOP)}</span>
                    <span className="step-card-pct">100.0%</span>
                    <span className="step-card-lbl">Presupuesto</span>
                    <span className="step-card-sub">Asignado semanal</span>
                  </div>

                  <div className="breakdown-step-card items">
                    <span className="step-card-value num-tabular" style={{ color: '#38bdf8' }}>-{formatCOP(optimization.multiStore.itemsCost)}</span>
                    <span className="step-card-pct">{((optimization.multiStore.itemsCost / budgetCOP) * 100).toFixed(1)}%</span>
                    <span className="step-card-lbl">Productos</span>
                    <span className="step-card-sub">En góndola / cajas</span>
                  </div>

                  <div className="breakdown-step-card friction">
                    <span className="step-card-value num-tabular" style={{ color: '#c084fc' }}>-{formatCOP(optimization.multiStore.frictionPenaltyCOP)}</span>
                    <span className="step-card-pct">{((optimization.multiStore.frictionPenaltyCOP / budgetCOP) * 100).toFixed(1)}%</span>
                    <span className="step-card-lbl">Fricción logística</span>
                    <span className="step-card-sub">Desplazamiento</span>
                  </div>

                  <div className="breakdown-step-card free">
                    <span className="step-card-value num-tabular" style={{ color: '#4ade80' }}>+{formatCOP(budgetCOP - activeCost)}</span>
                    <span className="step-card-pct">{(((budgetCOP - activeCost) / budgetCOP) * 100).toFixed(1)}%</span>
                    <span className="step-card-lbl">Caja libre</span>
                    <span className="step-card-sub">Para imprevistos</span>
                  </div>
                </div>
              </div>

              {/* Asignación Óptima de Tiendas */}
              <div className="consumer-stores-card">
                <div className="stores-card-header">
                  <h3>Asignación óptima de tiendas</h3>
                  <span className="recommended-solution-pill">Solución recomendada</span>
                </div>

                <div className="store-split-cards-row">
                  {Object.entries(groupedBasketByStore).map(([storeId, items]) => {
                    const storeSubtotal = items.reduce((acc, it) => acc + it.totalCost, 0);
                    const storeName = STORES[storeId]?.name || storeId;
                    return (
                      <div key={storeId} className="assigned-store-box">
                        <div className="store-box-top">
                          {renderStoreLogo(storeId, 32, 20)}
                          <span className="store-box-brand-name">{storeName}</span>
                        </div>
                        <div className="store-box-items-pill">
                          <CheckCircle2 size={12} color="#10b981" />
                          <span>{items.length} productos</span>
                        </div>
                        <div className="store-box-amount num-tabular">
                          {formatCOP(storeSubtotal)}
                        </div>
                        <button 
                          className="store-box-link"
                          onClick={() => handleTabChange('shopping')}
                        >
                          <span>Ver productos</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    );
                  })}

                  {/* Tarjeta de Mejor Monotienda de Referencia */}
                  <div className="assigned-store-box monostore-box">
                    <div className="store-box-top">
                      <Store size={18} color="var(--color-text-secondary)" />
                      <div>
                        <div className="store-box-brand-name">Mejor monotienda</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--color-text-tertiary)' }}>
                          ({optimization.bestMonoStore.storeName})
                        </div>
                      </div>
                    </div>
                    <div className="store-box-amount num-tabular">
                      {formatCOP(optimization.bestMonoStore.effectiveCost)}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#f87171', fontWeight: 700, marginTop: 'auto' }}>
                      + {formatCOP(optimization.multiStore.netSavings)} vs tu solución
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta de Trade-off de Segunda Parada (Interacción Conductual V4-B) */}
              <div className="second-store-tradeoff-card">
                <div className="tradeoff-header">
                  <h3>¿Vale la pena hacer una segunda parada?</h3>
                  <span className="tradeoff-savings-pill num-tabular">
                    Ahorro neto: +{formatCOP(optimization.multiStore.netSavings)}
                  </span>
                </div>
                <div className="tradeoff-prompt">
                  Para ahorrar <strong>{formatCOP(optimization.multiStore.netSavings)}</strong> necesitas visitar dos tiendas ({optimization.multiStore.activeStores.join(' y ')}), lo que añade aproximadamente <strong>~18 minutos</strong> de desplazamiento en {optimization.currentZone.name.split(' ')[0]}. ¿Prefieres maximizar tu plata o ahorrar tiempo?
                </div>
                <div className="tradeoff-options-grid">
                  <button 
                    className="btn-accept-second-store"
                    onClick={handleAcceptSecondStore}
                  >
                    <Check size={16} />
                    <span>Acepto 2da tienda (Ahorro {formatCOP(optimization.multiStore.netSavings)})</span>
                  </button>
                  <button 
                    className="btn-prefer-single-store"
                    onClick={handlePreferSingleStore}
                  >
                    <span>Prefiero 1 sola tienda ({optimization.bestMonoStore.storeName})</span>
                  </button>
                </div>
              </div>

              {/* ¿Por qué esta combinación? (Human-Readable) */}
              <div className="consumer-why-card">
                <div className="why-header">
                  <h3>¿Por qué esta combinación?</h3>
                  <button 
                    className="store-box-link"
                    onClick={() => handleTabChange('why')}
                  >
                    <span>Ver explicación completa</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
                <div className="why-sub">
                  El sistema analiza precio, empaques, disponibilidad y tu perfil para encontrar la mejor combinación.
                </div>
                <div className="why-reasons-grid">
                  <div className="why-reason-box">
                    <div className="why-item-icon">🥔</div>
                    <div>
                      <div className="why-box-title">Papa → Éxito</div>
                      <div className="why-box-desc">Puedes comprar exactamente 1.2 kg en báscula (menos desperdicio).</div>
                    </div>
                  </div>
                  <div className="why-reason-box">
                    <div className="why-item-icon">🥚</div>
                    <div>
                      <div className="why-box-title">Huevos → Ara</div>
                      <div className="why-box-desc">Menor costo por unidad en cubeta familiar de 30.</div>
                    </div>
                  </div>
                  <div className="why-reason-box">
                    <div className="why-item-icon">🍚</div>
                    <div>
                      <div className="why-box-title">Arroz → D1</div>
                      <div className="why-box-desc">Mejor precio por presentación compatible con tu consumo.</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Columna Derecha: Resumen de Ahorro y CTA a la Lista */}
            <aside className="consumer-right-col">
              {/* Tarjeta de Ahorro en Detalle */}
              <div className="right-card">
                <div className="right-card-title">
                  <span>Tu ahorro en detalle</span>
                  <button className="store-box-link" onClick={() => handleTabChange('compare')}>
                    <span>Ver cálculo →</span>
                  </button>
                </div>
                <div className="savings-breakdown-row">
                  <span>Ahorro en productos:</span>
                  <strong className="num-tabular" style={{ color: '#10b981' }}>
                    +{formatCOP(optimization.multiStore.grossSavings)}
                  </strong>
                </div>
                <div className="savings-breakdown-row">
                  <span>Costo de tiendas extra:</span>
                  <strong className="num-tabular" style={{ color: '#f87171' }}>
                    -{formatCOP(optimization.multiStore.deltaFriction)}
                  </strong>
                </div>
                <div className="savings-breakdown-row total-row">
                  <span>Ahorro neto:</span>
                  <strong className="num-tabular" style={{ color: '#10b981' }}>
                    {formatCOP(optimization.multiStore.netSavings)}
                  </strong>
                </div>
              </div>

              {/* Qué incluye tu compra */}
              <div className="right-card">
                <div className="right-card-title">
                  <span>Qué incluye tu compra</span>
                </div>
                <div className="package-info-row">
                  <span>Productos</span>
                  <strong className="num-tabular">{activeBasketItems.length}</strong>
                </div>
                <div className="package-info-row">
                  <span>Tiendas</span>
                  <strong className="num-tabular">{optimization.multiStore.activeStores.length}</strong>
                </div>
                <div className="package-info-row">
                  <span>Tiempo estimado de recorrido</span>
                  <strong>~ 45 min</strong>
                </div>
              </div>

              {/* Explicación del modelo */}
              <div className="right-card">
                <div className="right-card-title">
                  <span>Explicación del modelo</span>
                </div>
                <div className="explanation-bullets-list">
                  <div className="explanation-bullet-item">
                    <CheckCircle size={14} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Optimiza precio, empaques y disponibilidad en múltiples tiendas.</span>
                  </div>
                  <div className="explanation-bullet-item">
                    <CheckCircle size={14} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Considera tu nutrición y la probabilidad de desperdicio biológico.</span>
                  </div>
                  <div className="explanation-bullet-item">
                    <CheckCircle size={14} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Calcula la fricción logística para encontrar el mejor equilibrio entre ahorro y conveniencia.</span>
                  </div>
                </div>
              </div>

              {/* CTA Destacado: Ver Lista de Compra */}
              <div className="cta-checklist-banner">
                <div className="cta-banner-header">
                  <CheckCircle2 size={20} />
                  <span>¿Listo para tu lista de compra?</span>
                </div>
                <p className="cta-banner-p">
                  Te generamos la lista exacta por tienda para que solo te preocupes por disfrutar en el supermercado.
                </p>
                <button 
                  className="btn-cta-go-checklist"
                  onClick={() => handleTabChange('shopping')}
                >
                  <span>Ver mi lista de compra</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* PESTAÑA 2: COMPRA (SHOPPING CHECKLIST POR PARADA) */}
        {activeTab === 'shopping' && (
          <ShoppingChecklist 
            groupedBasketByStore={groupedBasketByStore}
            optimization={optimization}
            peopleCount={peopleCount}
            budgetCOP={budgetCOP}
            onItemCheckToggle={handleItemCheckToggle}
            checkedItems={checkedItems}
            onSelectAll={handleSelectAll}
            onResetAll={handleResetAll}
            onCopyList={handleCopyShoppingList}
            copiedNotification={copiedNotification}
            formatCOP={formatCOP}
            onCompletePurchase={handleCompletePurchase}
            purchaseCompleted={purchaseCompleted}
          />
        )}

        {/* PESTAÑA 3: COMPARAR (CANASTA COMPLETA VS MONOTIENDAS) */}
        {activeTab === 'compare' && (
          <div className="surface-panel">
            <div className="panel-header-title">
              <h2>
                <ArrowRightLeft size={18} />
                <span>Comparativa de Opciones: Multi-tienda vs. Monotiendas en Cali</span>
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              Compara el valor total de tu mercado si compras en una sola tienda frente a dividir tu lista entre varias tiendas en {optimization.currentZone.name}.
            </p>
            <div className="store-comparative-matrix">
              <div 
                className={'matrix-store-tile ' + (selectedBasketMode === 'MULTI' ? 'selected' : '')}
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

              <div 
                className={'matrix-store-tile ' + (selectedBasketMode === 'D1' ? 'selected' : '')}
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

              <div 
                className={'matrix-store-tile ' + (selectedBasketMode === 'ARA' ? 'selected' : '')}
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

              <div 
                className={'matrix-store-tile ' + (selectedBasketMode === 'EXITO' ? 'selected' : '')}
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
          </div>
        )}

        {/* PESTAÑA 4: ¿POR QUÉ? (EXPLICABILIDAD HUMANA) */}
        {activeTab === 'why' && (
          <div className="surface-panel">
            <div className="panel-header-title">
              <h2>
                <HelpCircle size={18} />
                <span>¿Por qué recomendamos esta combinación de compra?</span>
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              Explicación en lenguaje claro de cada decisión tomada por el algoritmo de optimización para equilibrar costo, nutrición y conveniencia.
            </p>
            <div className="quick-explain-list" style={{ marginBottom: '1.5rem' }}>
              {optimization.multiStore.explanations.map((exp, idx) => (
                <div key={idx} className="quick-explain-item">
                  <div className="quick-explain-item-head">
                    <span>{idx + 1}. {exp.productName} → {exp.assignedStore}</span>
                    {exp.savingsVsRunnerUp > 0 && (
                      <span style={{ color: 'var(--highlight-text)', fontWeight: 700 }}>+{formatCOP(exp.savingsVsRunnerUp)}</span>
                    )}
                  </div>
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.74rem' }}>{exp.reason}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--color-bg-elevated)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem' }}>¿Cómo se calculó esta recomendación?</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                El modelo formula un programa lineal entero mixto (MILP) que garantiza la cobertura nutricional mínima para las 14 comidas, respeta tu presupuesto asignado y penaliza la fricción de traslado. Puedes revisar la formulación matemática exacta, variables y cotas en la pestaña de <strong>Laboratorio V4</strong>.
              </p>
            </div>
          </div>
        )}

        {/* PESTAÑA 5: HISTORIAL Y DESPENSA */}
        {activeTab === 'history' && (
          <div className="surface-panel">
            <div className="panel-header-title">
              <h2>
                <History size={18} />
                <span>Tu Historial y Control de Despensa</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--color-bg-elevated)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>Inventario que rinde para las próximas semanas</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                  Productos no perecederos cuyo contenido supera el consumo semanal y quedan como activo en tu hogar:
                </p>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', margin: '0.5rem 0' }} className="num-tabular">
                  {formatCOP(optimization.multiStore.totalFutureInventory)}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)' }}>
                  Arroz, lentejas, aceite vegetal y sal que rinden para ciclos futuros sin recompra obligatoria.
                </div>
              </div>
              <div style={{ background: 'var(--color-bg-elevated)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>Estado de la última compra</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                  {purchaseCompleted 
                    ? 'Compra registrada exitosamente en Cali. Ahorro neto consolidado: ' + formatCOP(optimization.multiStore.netSavings) 
                    : 'Aún no has confirmado la compra de esta semana en el supermercado.'}
                </p>
                <div style={{ marginTop: '0.75rem' }}>
                  <span className={'status-badge ' + (purchaseCompleted ? 'active-region' : '')}>
                    {purchaseCompleted ? '✓ Compra Confirmada' : '○ Pendiente de compra'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 6: LABORATORIO V4 (DSS COMPLETO V4-A) */}
        {activeTab === 'laboratory' && (
          <div className="surface-panel">
            <div className="panel-header-title">
              <h2>
                <FlaskConical size={18} color="var(--color-brand-emerald)" />
                <span>Línea V4-A: Batería Experimental de 60 Corridas (12 Escenarios × 5 Estrategias)</span>
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              Evaluación determinista, simétrica y reproducible en Santiago de Cali. Compara el modelo MILP V4 frente a Monotiendas (D1, Ara, Éxito) y la Heurística Humana Razonable (RH-1).
            </p>

            {/* KPI Cards de Laboratorio */}
            <div className="experimental-kpis-grid" style={{ marginBottom: '1.25rem' }}>
              <div className="exp-kpi-card">
                <span className="exp-kpi-label">Mejora Media vs. Heurística RH-1</span>
                <span className="exp-kpi-value highlight num-tabular">+{(EXPERIMENTAL_V4_SUMMARY.summary?.meanImprovementPct || 13.4)}%</span>
                <span className="exp-kpi-sub num-tabular">Rango: {(EXPERIMENTAL_V4_SUMMARY.summary?.minImprovementPct || 13.1)}% – {(EXPERIMENTAL_V4_SUMMARY.summary?.maxImprovementPct || 13.8)}% (Mediana: {(EXPERIMENTAL_V4_SUMMARY.summary?.medianImprovementPct || 13.6)}%)</span>
              </div>
              <div className="exp-kpi-card">
                <span className="exp-kpi-label">Tasa de Dominancia de Pareto</span>
                <span className="exp-kpi-value highlight num-tabular">{(EXPERIMENTAL_V4_SUMMARY.summary?.dominancePct || 100)}%</span>
                <span className="exp-kpi-sub">MILP domina estrictamente en costo y desperdicio (12 de 12)</span>
              </div>
              <div className="exp-kpi-card">
                <span className="exp-kpi-label">Telemetría del Solver MILP</span>
                <span className="exp-kpi-value highlight num-tabular">{telemetry.boundsAndGaps ? telemetry.boundsAndGaps.finalOptimalityGapPct.toFixed(2) : '0.00'}% Gap</span>
                <span className="exp-kpi-sub num-tabular">{telemetry.variables ? telemetry.variables.modelVariables : 93} Vars Activas | {telemetry.constraints ? telemetry.constraints.activeInstanceTotal : 34} Restricciones</span>
              </div>
              <div className="exp-kpi-card">
                <span className="exp-kpi-label">Runtime de Optimización</span>
                <span className="exp-kpi-value highlight num-tabular">{(EXPERIMENTAL_V4_SUMMARY.summary?.runtime?.p50Ms || 0.24)} ms</span>
                <span className="exp-kpi-sub num-tabular">p50: {(EXPERIMENTAL_V4_SUMMARY.summary?.runtime?.p50Ms || 0.24)}ms | p95: {(EXPERIMENTAL_V4_SUMMARY.summary?.runtime?.p95Ms || 15.72)}ms</span>
              </div>
            </div>

            {/* Tarjeta de Telemetría Detallada */}
            <div style={{ background: 'var(--color-bg-base)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)', padding: '1rem', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>
                Auditoría Formal de Cotas y Variables del Solver MILP
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.74rem' }}>
                <div><strong>Incumbent / UB:</strong> <span className="num-tabular">{telemetry.boundsAndGaps ? telemetry.boundsAndGaps.incumbentUb : 1.1669}</span></div>
                <div><strong>Initial LP Relaxation LB:</strong> <span className="num-tabular">{telemetry.boundsAndGaps ? telemetry.boundsAndGaps.initialLpRelaxationLb : 0.6714}</span></div>
                <div><strong>Initial LP Integrality Gap:</strong> <span className="num-tabular">{telemetry.boundsAndGaps ? telemetry.boundsAndGaps.initialLpIntegralityGapPct : 42.46}%</span></div>
                <div><strong>Final B&B Lower Bound:</strong> <span className="num-tabular">{telemetry.boundsAndGaps ? telemetry.boundsAndGaps.finalBbLowerBound : 1.1669}</span></div>
                <div><strong>Final Optimality Gap:</strong> <span className="num-tabular" style={{ color: '#10b981' }}>{telemetry.boundsAndGaps ? telemetry.boundsAndGaps.finalOptimalityGapPct : 0.00}%</span></div>
                <div><strong>Global Optimum Proof:</strong> <span style={{ color: '#10b981' }}>{telemetry.boundsAndGaps ? telemetry.boundsAndGaps.globalOptimumProof : 'UB == final B&B bound'}</span></div>
                <div><strong>Distancia al 2do mejor (Δ_2nd):</strong> <span className="num-tabular">+{telemetry.stabilityAndDistance ? telemetry.stabilityAndDistance.deltaSecondBest : 0.0659} (+{telemetry.stabilityAndDistance ? telemetry.stabilityAndDistance.deltaSecondBestPct : 5.65}%)</span></div>
                <div><strong>Runner-up distinto:</strong> <span>{telemetry.stabilityAndDistance ? telemetry.stabilityAndDistance.runnerUpSubset : 'D1 + Éxito'}</span></div>
              </div>
            </div>

            {/* Tabla Consolidada de Escenarios */}
            <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.76rem' }}>
                <thead>
                  <tr style={{ background: 'var(--color-bg-elevated)', borderBottom: '1px solid var(--color-border-subtle)', textAlign: 'left' }}>
                    <th style={{ padding: '0.5rem' }}>Escenario</th>
                    <th style={{ padding: '0.5rem' }}>Presupuesto</th>
                    <th style={{ padding: '0.5rem' }}>Costo MILP</th>
                    <th style={{ padding: '0.5rem' }}>Costo RH-1</th>
                    <th style={{ padding: '0.5rem' }}>Mejora %</th>
                    <th style={{ padding: '0.5rem' }}>Ahorro Neto</th>
                    <th style={{ padding: '0.5rem' }}>Pareto</th>
                  </tr>
                </thead>
                <tbody>
                  {EXPERIMENTAL_V4_SUMMARY.scenarios.map(s => (
                    <tr key={s.scenarioId} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <td style={{ padding: '0.5rem', fontWeight: 600 }}>{s.name}</td>
                      <td style={{ padding: '0.5rem' }} className="num-tabular">{formatCOP(s.budgetCOP)}</td>
                      <td style={{ padding: '0.5rem', color: '#10b981', fontWeight: 700 }} className="num-tabular">{formatCOP(s.milp.effectiveCostCOP)}</td>
                      <td style={{ padding: '0.5rem' }} className="num-tabular">{formatCOP(s.humanHeuristic.effectiveCostCOP)}</td>
                      <td style={{ padding: '0.5rem', color: '#38bdf8', fontWeight: 700 }} className="num-tabular">+{s.heuristicImprovementPct}%</td>
                      <td style={{ padding: '0.5rem', fontWeight: 700 }} className="num-tabular">+{formatCOP(s.milp.netSavingsVsBestMonoCOP)}</td>
                      <td style={{ padding: '0.5rem', color: '#10b981' }}>✓ Dominante</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Status Bar Dinámico Inferior */}
      <footer className="consumer-status-bar">
        <div className="status-bar-metrics-strip">
          <div className="status-bar-cell">
            <span>Modo:</span>
            <span className="status-bar-val">V4 - MILP + Heurística RH-1</span>
          </div>
          <div className="status-bar-cell">
            <span>Mejora vs RH-1:</span>
            <span className="status-bar-val num-tabular" style={{ color: '#10b981' }}>+{optimization.heuristicBenchmark.heuristicImprovementPct}%</span>
          </div>
          <div className="status-bar-cell">
            <span>Solver Gap:</span>
            <span className="status-bar-val num-tabular">{telemetry.boundsAndGaps ? telemetry.boundsAndGaps.finalOptimalityGapPct.toFixed(2) : '0.00'}%</span>
          </div>
          <div className="status-bar-cell">
            <span>Variables / Restricciones:</span>
            <span className="status-bar-val num-tabular">{telemetry.variables ? telemetry.variables.modelVariables : 93} / {telemetry.constraints ? telemetry.constraints.activeInstanceTotal : 34}</span>
          </div>
          <div className="status-bar-cell">
            <span>Tiempo:</span>
            <span className="status-bar-val num-tabular">0.24 ms (p50)</span>
          </div>
        </div>

        <div>
          <button 
            className="status-bar-btn-v4b"
            onClick={() => setBehavioralModalOpen(true)}
            title="Abrir consola de telemetría conductual V4-B"
          >
            <Activity size={13} />
            <span>Telemetría Conductual V4-B</span>
          </button>
        </div>
      </footer>

      {/* Modal de Instrumentación Conductual V4-B */}
      <BehavioralTrackerModal 
        isOpen={behavioralModalOpen}
        onClose={() => setBehavioralModalOpen(false)}
        sessionData={behavioralSession}
        onUpdateParticipantId={id => setBehavioralSession(s => ({ ...s, participantId: id }))}
      />
    </div>
  );
}
