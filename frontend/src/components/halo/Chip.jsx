import React from 'react';

const VARIANT_STYLES = {
  default: { background: '#f7f7f7', color: '#1c69d4', border: '1px solid #e6e6e6' },
  success: { background: '#f0fdf4', color: '#22c55e', border: '1px solid #bbf7d0' },
  warning: { background: '#fffbeb', color: '#f59e0b', border: '1px solid #fde68a' },
  info:    { background: '#f0f9ff', color: '#0066b1', border: '1px solid #bae6fd' },
  error:   { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' },
  muted:   { background: '#fafafa', color: '#262626', border: '1px solid #e6e6e6' },
};

/**
 * Chip — inline status/metric badge
 * Props: children, variant ('default'|'success'|'warning'|'info'|'error'|'muted'),
 *        icon (ReactNode), trend ('up'|'down')
 */
export default function Chip({ children, variant = 'default', icon, trend }) {
  const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.default;
  const trendSymbol = trend === 'up' ? '↑' : trend === 'down' ? '↓' : null;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: styles.background,
        color: styles.color,
        border: styles.border,
        borderRadius: '0px',
        height: '24px',
        padding: '0 8px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {icon && icon}
      {trendSymbol && <span>{trendSymbol}</span>}
      {children}
    </span>
  );
}
