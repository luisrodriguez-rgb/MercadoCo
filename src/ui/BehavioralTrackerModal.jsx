import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, Activity, User, Database, Lock } from 'lucide-react';

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
              Registro Metodológico V4-B (Datos Pseudonimizados)
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--color-bg-base)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--color-border-subtle)', marginBottom: '1rem', fontSize: '0.74rem', color: 'var(--color-text-secondary)' }}>
            <Lock size={14} color="#10b981" />
            <span><strong>Protocolo de Investigación Ética:</strong> Datos anonimizados exclusivamente para la evaluación de hipótesis conductuales de tolerancia y adopción en Cali.</span>
          </div>

          <div className="participant-input-row">
            <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Código de Participante (Pseudónimo):</label>
            <input 
              type="text"
              value={sessionData.participantId}
              onChange={e => onUpdateParticipantId(e.target.value)}
              placeholder="CALI-SUB-01"
              style={{
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-xs)',
                color: 'var(--color-text-primary)',
                padding: '0.35rem 0.65rem',
                fontSize: '0.82rem',
                fontFamily: 'monospace'
              }}
            />
          </div>

          <div className="session-metrics-pills">
            <div className="metric-pill">
              <span>2da Tienda Aceptada:</span>
              <strong style={{ color: sessionData.secondStoreAccepted ? '#10b981' : '#f87171' }}>
                {sessionData.secondStoreAccepted ? 'SÍ (Híbrido)' : 'NO (1 Tienda)'}
              </strong>
            </div>
            <div className="metric-pill">
              <span>Checklist Completado:</span>
              <strong>{sessionData.checklistCompleted ? 'SÍ (100%)' : (sessionData.checklistItemsChecked + '/' + sessionData.totalLinesInBasket)}</strong>
            </div>
            <div className="metric-pill">
              <span>Compra Reportada:</span>
              <strong style={{ color: sessionData.purchaseReported ? '#10b981' : 'var(--color-text-tertiary)' }}>
                {sessionData.purchaseReported ? 'SÍ' : 'NO'}
              </strong>
            </div>
            <div className="metric-pill">
              <span>Ahorro Estimado:</span>
              <strong style={{ color: '#10b981' }}>+${Math.round(sessionData.netSavingsEstimated || 0).toLocaleString('es-CO')} COP</strong>
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
