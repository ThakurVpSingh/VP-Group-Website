import React from 'react';

/**
 * Sparkline — inline SVG polyline chart
 * Props: data (number[]), color, width, height, filled
 */
export default function Sparkline({ data = [], color = '#5B6BFF', width = 80, height = 32, filled = true }) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pad = 2;
  const w = width - pad * 2;
  const h = height - pad * 2;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * w;
    const y = pad + h - ((v - min) / range) * h;
    return `${x},${y}`;
  });

  const polyline = points.join(' ');
  const firstPt = points[0].split(',');
  const lastPt = points[points.length - 1].split(',');
  const fillPath = `M${firstPt[0]},${height} L${polyline.split(' ').join(' L')} L${lastPt[0]},${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {filled && (
        <path
          d={fillPath}
          fill={color}
          opacity={0.12}
        />
      )}
      <polyline
        points={polyline}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Terminal dot */}
      <circle
        cx={lastPt[0]}
        cy={lastPt[1]}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}
