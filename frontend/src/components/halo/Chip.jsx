import React from 'react';

const VARIANT_STYLES = {
  default: { background: 'rgba(91,107,255,0.12)', color: '#7886FF' },
  success: { background: 'rgba(43,224,140,0.12)', color: '#2BE08C' },
  warning: { background: 'rgba(245,213,71,0.12)',  color: '#F5D547' },
  info:    { background: 'rgba(61,215,229,0.12)',  color: '#3DD7E5' },
  error:   { background: 'rgba(255,58,92,0.12)',   color: '#FF3A5C' },
  muted:   { background: 'rgba(90,97,112,0.15)',   color: '#9AA0AE' },
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
        borderRadius: '999px',
        height: '22px',
        padding: '0 10px',
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: '0.75rem',
        fontWeight: 500,
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
