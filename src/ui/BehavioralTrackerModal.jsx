import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, Activity, User, Database } from 'lucide-react';

export function BehavioralTrackerModal({ 
  isOpen, 
  onClose, 
  sessionData, 
  onUpdateParticipantId 
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const formattedJson = JSON.stringify(sessionData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} color="var(--color-brand-emerald)" />
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
              Telemetría Conductual V4-B (Validación de Campo)
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', margin: '0 0 1rem 0' }}>
            Instrumentación automática de la sesión para el registro de hipótesis de adopción, tolerancia a segunda parada y ejecución de compra en Santiago de Cali.
          </p>

          <div className="participant-input-row">
            <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>ID del Participante:</label>
            <input 
              type="text"
              value={sessionData.participantId}
              onChange={e => onUpdateParticipantId(e.target.value)}
              style={{
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-xs)',
                color: 'var(--color-text-primary)',
                padding: '0.3rem 0.6rem',
                fontSize: '0.8rem',
                fontFamily: 'monospace'
              }}
            />
          </div>

          <div className="session-metrics-pills">
            <div className="metric-pill">
              <span>2da Tienda Aceptada:</span>
              <strong style={{ color: sessionData.secondStoreAccepted ? '#10b981' : '#f87171' }}>
                {sessionData.secondStoreAccepted ? 'SÍ (Híbrido)' : 'NO (Monotienda)'}
              </strong>
            </div>
            <div className="metric-pill">
              <span>Checklist Abierto:</span>
              <strong>{sessionData.checklistOpened ? 'SÍ' : 'NO'}</strong>
            </div>
            <div className="metric-pill">
              <span>Ítems Marcados:</span>
              <strong>{sessionData.checklistItemsChecked} / {sessionData.totalItemsInBasket}</strong>
            </div>
            <div className="metric-pill">
              <span>Compra Confirmada:</span>
              <strong style={{ color: sessionData.purchaseCompleted ? '#10b981' : 'var(--color-text-tertiary)' }}>
                {sessionData.purchaseCompleted ? 'SÍ' : 'NO'}
              </strong>
            </div>
          </div>

          <pre className="json-telemetry-block num-tabular">
            {formattedJson}
          </pre>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary-action" onClick={onClose}>
            <span>Cerrar</span>
          </button>
          <button className="btn-primary-action" onClick={handleCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? '¡Copiado al portapapeles!' : 'Copiar Registro JSON'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}