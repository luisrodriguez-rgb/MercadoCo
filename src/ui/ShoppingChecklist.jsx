import React, { useState } from 'react';
import { LogoD1, LogoAra, LogoExito } from './StoreLogos.jsx';
import { STORES } from '../domain/types.js';
import { 
  CheckSquare, 
  Square, 
  CheckCircle2, 
  Share2, 
  ShoppingBag, 
  TrendingDown, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Sparkles,
  RotateCcw,
  Check
} from 'lucide-react';

export function ShoppingChecklist({ 
  groupedBasketByStore, 
  optimization, 
  peopleCount, 
  budgetCOP, 
  onItemCheckToggle, 
  checkedItems, 
  onSelectAll, 
  onResetAll,
  onCopyList,
  copiedNotification,
  formatCOP,
  onReportPurchase,
  purchaseReported
}) {
  const activeStores = Object.keys(groupedBasketByStore);
  const totalLinesCount = Object.values(groupedBasketByStore).reduce((acc, list) => acc + list.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPct = totalLinesCount > 0 ? Math.round((checkedCount / totalLinesCount) * 100) : 0;
  const checklistCompleted = totalLinesCount > 0 && checkedCount === totalLinesCount;

  const renderStoreLogo = (storeId, width = 36, height = 22) => {
    switch (storeId) {
      case 'D1': return <LogoD1 width={width} height={height} />;
      case 'ARA': return <LogoAra width={width} height={height} />;
      case 'EXITO': return <LogoExito width={width} height={height} />;
      default: return null;
    }
  };

  return (
    <div className="checklist-container">
      {/* Header de la orden de compra */}
      <div className="checklist-header-card">
        <div className="checklist-header-info">
          <div className="checklist-badge">
            <ShoppingBag size={14} />
            <span>Lista de Compra Operativa por Parada</span>
          </div>
          <h2>Tu lista en el supermercado</h2>
          <p>
            {totalLinesCount} líneas de compra organizadas en {activeStores.length} {activeStores.length === 1 ? 'tienda' : 'tiendas'} para cubrir los requerimientos del menú semanal en {optimization.currentZone.name}.
          </p>
        </div>

        <div className="checklist-progress-box">
          <div className="progress-labels">
            <span>Progreso de verificación</span>
            <strong className="num-tabular">{checkedCount} / {totalLinesCount} líneas ({progressPct}%)</strong>
          </div>
          <div className="progress-bar-track">
            <div 
              className="progress-bar-fill" 
              style={{ width: progressPct + '%' }} 
            ></div>
          </div>
          <div className="checklist-actions-strip">
            <button 
              className="btn-secondary-action"
              onClick={onCopyList}
              title="Copiar lista formateada"
            >
              {copiedNotification ? <Check size={14} color="#10b981" /> : <Share2 size={14} />}
              <span>{copiedNotification ? '¡Lista copiada!' : 'Copiar para WhatsApp'}</span>
            </button>
            {checkedCount < totalLinesCount ? (
              <button className="btn-secondary-action" onClick={onSelectAll}>
                <CheckCircle2 size={14} />
                <span>Marcar todos</span>
              </button>
            ) : (
              <button className="btn-secondary-action" onClick={onResetAll}>
                <RotateCcw size={14} />
                <span>Desmarcar todos</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Resumen de costos de la ruta */}
      <div className="checklist-summary-strip">
        <div className="summary-stat">
          <span className="stat-lbl">Desembolso estimado en cajas</span>
          <span className="stat-val num-tabular">{formatCOP(optimization.multiStore.itemsCost)}</span>
        </div>
        <div className="summary-stat">
          <span className="stat-lbl">Fricción logística estimada</span>
          <span className="stat-val num-tabular" style={{ color: 'var(--color-text-secondary)' }}>
            {formatCOP(optimization.multiStore.frictionPenaltyCOP)}
          </span>
        </div>
        <div className="summary-stat highlight">
          <span className="stat-lbl">Ahorro neto estimado</span>
          <span className="stat-val num-tabular">+{formatCOP(optimization.multiStore.netSavings)}</span>
        </div>
        <div className="summary-stat">
          <span className="stat-lbl">Tiempo estimado</span>
          <span className="stat-val">~ 35-45 min</span>
        </div>
      </div>

      {/* Paradas de compra organizadas por tienda */}
      <div className="stops-grid">
        {activeStores.map((storeId, storeIndex) => {
          const items = groupedBasketByStore[storeId] || [];
          const storeName = STORES[storeId]?.name || storeId;
          const storeSubtotal = items.reduce((acc, it) => acc + it.totalCost, 0);
          const storeCheckedCount = items.filter(it => checkedItems[it.productId]).length;
          const isStoreComplete = storeCheckedCount === items.length && items.length > 0;

          return (
            <div key={storeId} className={'store-stop-card ' + (isStoreComplete ? 'stop-completed' : '')}>
              {/* Encabezado de la parada */}
              <div className="stop-card-header">
                <div className="stop-meta-left">
                  <div className="stop-number-badge">
                    <span>Parada {storeIndex + 1}</span>
                  </div>
                  <div className="stop-store-brand">
                    <div className="store-logo-wrap">
                      {renderStoreLogo(storeId, 36, 22)}
                    </div>
                    <div>
                      <h3 className="stop-store-title">{storeName}</h3>
                      <div className="stop-store-sub">
                        {items.length} líneas de compra · {storeCheckedCount}/{items.length} verificadas
                      </div>
                    </div>
                  </div>
                </div>

                <div className="stop-meta-right">
                  <div className="stop-subtotal-val num-tabular">{formatCOP(storeSubtotal)}</div>
                  <div className="stop-subtotal-lbl">Subtotal en caja</div>
                </div>
              </div>

              {/* Lista de productos de la parada */}
              <div className="stop-items-list">
                {items.map(item => {
                  const isChecked = Boolean(checkedItems[item.productId]);
                  const isExactWeight = item.packagingType === 'EXACT_WEIGHT';
                  const packagingLabel = isExactWeight 
                    ? ('Báscula exacta: ' + item.totalRequired + ' ' + item.unit) 
                    : (item.packageUnits + (item.packageUnits === 1 ? ' paquete' : ' paquetes') + ' x ' + item.packageSize + ' ' + item.unit);

                  return (
                    <div 
                      key={item.productId} 
                      className={'checklist-item-row ' + (isChecked ? 'checked' : '')}
                      onClick={() => onItemCheckToggle(item.productId)}
                    >
                      <button 
                        type="button"
                        className="item-checkbox-btn"
                        aria-label={isChecked ? 'Desmarcar ítem' : 'Marcar ítem'}
                      >
                        {isChecked ? (
                          <CheckSquare size={18} color="var(--color-brand-emerald)" />
                        ) : (
                          <Square size={18} color="var(--color-text-tertiary)" />
                        )}
                      </button>

                      <div className="item-info-col">
                        <div className="item-name-row">
                          <span className="item-product-name">{item.productName}</span>
                          <span className="item-brand-tag">{item.brand}</span>
                        </div>
                        <div className="item-specs-row">
                          <span className="item-packaging-detail">{packagingLabel}</span>
                          {item.wasteRiskCOP > 0 && (
                            <span className="item-perishable-badge">Perecedero</span>
                          )}
                        </div>
                      </div>

                      <div className="item-pricing-col">
                        <div className="item-price-val num-tabular">{formatCOP(item.totalCost)}</div>
                        <div className="item-unit-rate num-tabular">
                          {formatCOP(item.effectivePricePerBaseUnit)}{item.unit === 'g' ? '/kg' : ('/' + item.unit)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tarjeta de finalización y reporte de compra */}
      <div className="checklist-footer-card">
        <div className="footer-info">
          <Sparkles size={18} color="var(--color-brand-emerald)" />
          <div>
            <strong>Estado de ejecución de compra</strong>
            <p>
              {checklistCompleted 
                ? ('Checklist completado (' + totalLinesCount + '/' + totalLinesCount + '). Ahorro neto estimado: ' + formatCOP(optimization.multiStore.netSavings) + ' frente a comprar todo en una sola tienda.')
                : 'Marca cada línea en el pasillo del supermercado para auditar la compra y verificar la disponibilidad real.'}
            </p>
          </div>
        </div>

        <div>
          {checklistCompleted && !purchaseReported && (
            <button 
              className="btn-complete-purchase"
              onClick={onReportPurchase}
            >
              <Check size={16} />
              <span>Informar compra efectuada</span>
            </button>
          )}
          {purchaseReported && (
            <div className="purchase-completed-badge">
              <CheckCircle2 size={16} color="#10b981" />
              <span>Compra informada por el participante</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}