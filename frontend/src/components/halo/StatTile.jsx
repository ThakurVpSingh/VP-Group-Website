import React from 'react';
import Sparkline from './Sparkline';
import Chip from './Chip';

const ACCENT_COLORS = {
  primary: '#5B6BFF',
  success: '#2BE08C',
  warning: '#F5D547',
  info:    '#3DD7E5',
  error:   '#FF3A5C',
};

/**
 * StatTile — Halo signature stat component
 * Props:
 *   eyebrow     string  — small uppercase label above metric
 *   metric      string  — large monospace number/value
 *   description string  — supporting text below metric
 *   trend       string  — 'up' | 'down' (optional)
 *   trendLabel  string  — text next to trend arrow e.g. "+12% YoY"
 *   accent      string  — 'primary'|'success'|'warning'|'info'|'error'
 *   sparkData   number[]— array of values for sparkline
 *   size        string  — 'sm' | 'md' (default 'md')
 */
export default function StatTile({
  eyebrow,
  metric,
  description,
  trend,
  trendLabel,
  accent = 'primary',
  sparkData,
  size = 'md',
}) {
  const accentColor = ACCENT_COLORS[accent] || ACCENT_COLORS.primary;
  const trendVariant = trend === 'up' ? 'success' : trend === 'down' ? 'error' : 'muted';
  const sparkH = size === 'sm' ? 24 : 32;
  const sparkW = size === 'sm' ? 60 : 80;

  return (
    <div
      data-accent={accent}
      style={{
        position: 'relative',
        background: '#14151C',
        border: '1px solid #2A2D38',
        borderRadius: '16px',
        padding: size === 'sm' ? '16px' : '20px',
        overflow: 'hidden',
        transition: 'border-color 240ms cubic-bezier(0.2,0.6,0.2,1), transform 240ms cubic-bezier(0.2,0.6,0.2,1)',
        cursor: 'default',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#3A3D4A'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2D38'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {/* 2px signal accent top hairline */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: accentColor, borderRadius: '16px 16px 0 0' }} />

      {/* Eyebrow */}
      {eyebrow && (
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9AA0AE', marginBottom: '10px', paddingTop: '2px' }}>
          {eyebrow}
        </div>
      )}

      {/* Metric row */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: size === 'sm' ? '1.75rem' : '2.25rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1, color: '#F2F4F8' }}>
          {metric}
        </div>
        {sparkData && sparkData.length > 1 && (
          <Sparkline data={sparkData} color={accentColor} width={sparkW} height={sparkH} />
        )}
      </div>

      {/* Trend + description row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {trendLabel && (
          <Chip variant={trendVariant} trend={trend}>{trendLabel}</Chip>
        )}
        {description && (
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#5C6170', lineHeight: 1.4 }}>
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
