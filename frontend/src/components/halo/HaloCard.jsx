import React from 'react';

const ACCENT_COLORS = {
  primary: '#5B6BFF',
  success: '#2BE08C',
  warning: '#F5D547',
  info:    '#3DD7E5',
  error:   '#FF3A5C',
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
    borderRadius: '16px',
    padding,
    overflow: 'hidden',
    transition: 'border-color 240ms cubic-bezier(0.2,0.6,0.2,1), transform 240ms cubic-bezier(0.2,0.6,0.2,1), box-shadow 240ms cubic-bezier(0.2,0.6,0.2,1)',
    boxShadow: elevated ? 'var(--halo-shadow-md)' : 'var(--halo-shadow-sm)',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  const handleMouseEnter = (e) => {
    if (hoverable || onClick) {
      e.currentTarget.style.borderColor = 'var(--halo-primary)';
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = 'var(--halo-shadow-lg)';
    }
  };
  const handleMouseLeave = (e) => {
    if (hoverable || onClick) {
      e.currentTarget.style.borderColor = elevated ? 'var(--halo-border-strong)' : 'var(--halo-border)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = elevated ? 'var(--halo-shadow-md)' : 'var(--halo-shadow-sm)';
    }
  };

  return (
    <div style={base} onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* 2px signal accent top hairline */}
      {accentColor && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: accentColor, borderRadius: '16px 16px 0 0' }} />
      )}
      {children}
    </div>
  );
}
