import React from 'react';

const ACCENT_COLORS = {
  primary: '#1c69d4',
  success: '#22c55e',
  warning: '#f59e0b',
  info:    '#0066b1',
  error:   '#dc2626',
};

/**
 * HaloCard — surface card with optional 2px accent top border
 * Props:
 *   accent     string — 'primary'|'success'|'warning'|'info'|'error'|null
 *   elevated   bool   — uses elevated surface + stronger shadow
 *   padding    string — CSS padding override
 *   onClick    fn
 *   className  string
 *   style      object
 *   children
 *   hoverable  bool   — adds lift on hover
 */
export default function HaloCard({
  accent,
  elevated = false,
  padding = '24px',
  children,
  onClick,
  hoverable = false,
  style = {},
}) {
  const accentColor = accent ? (ACCENT_COLORS[accent] || ACCENT_COLORS.primary) : null;

  const base = {
    position: 'relative',
    background: elevated ? 'var(--halo-elevated)' : 'var(--halo-surface)',
    border: `1px solid ${elevated ? 'var(--halo-border-strong)' : 'var(--halo-border)'}`,
    borderRadius: '0px',
    padding,
    overflow: 'hidden',
    transition: 'border-color 150ms ease',
    boxShadow: 'none',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  const handleMouseEnter = (e) => {
    if (hoverable || onClick) {
      e.currentTarget.style.borderColor = 'var(--halo-primary)';
    }
  };
  const handleMouseLeave = (e) => {
    if (hoverable || onClick) {
      e.currentTarget.style.borderColor = elevated ? 'var(--halo-border-strong)' : 'var(--halo-border)';
    }
  };

  return (
    <div style={base} onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* 2px signal accent top hairline */}
      {accentColor && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: accentColor, borderRadius: '0px' }} />
      )}
      {children}
    </div>
  );
}
