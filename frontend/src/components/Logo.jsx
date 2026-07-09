import React from 'react';

const Logo = ({ variant = 'icon', size, className = '', style = {} }) => {
  // Select viewBox and dimensions based on variant
  let viewBox = '170 90 260 290'; // Default icon only
  let width = size || (variant === 'icon' ? '100%' : '200px');
  let height = size || 'auto';

  if (variant === 'full') {
    viewBox = '0 0 600 600';
  } else if (variant === 'circuit' || variant === 'splash') {
    viewBox = '0 80 600 300';
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      className={`vp-logo ${className}`}
      style={{ display: 'block', ...style }}
    >
      <defs>
        {/* Metallic Silver Gradient */}
        <linearGradient id="logoSilverMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#e2e8f0" />
          <stop offset="40%" stopColor="#cbd5e1" />
          <stop offset="60%" stopColor="#f1f5f9" />
          <stop offset="80%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        {/* Purple Text Gradient */}
        <linearGradient id="logoPurpleText" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e9d5ff" />
          <stop offset="30%" stopColor="#c084fc" />
          <stop offset="70%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>

        {/* Inner Shield Glowing Purple Gradient */}
        <radialGradient id="logoPurpleGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#d946ef" />
          <stop offset="35%" stopColor="#8b5cf6" />
          <stop offset="70%" stopColor="#4c1d95" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>

        {/* Glowing Effect Filter */}
        <filter id="logoNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Light Glow for Circuits */}
        <filter id="logoCircuitGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Cybernetic Circuit Lines (Background) */}
      {(variant === 'full' || variant === 'circuit' || variant === 'splash') && (
        <>
          <g stroke="url(#logoPurpleText)" strokeWidth="2.5" fill="none" opacity="0.8" filter="url(#logoCircuitGlow)">
            {/* Left Circuit Lines */}
            <path d="M 220,150 L 140,150 L 100,110 L 40,110" />
            <path d="M 200,190 L 130,190 L 90,150 L 20,150" />
            <path d="M 190,230 L 110,230 L 70,230" />
            <path d="M 200,270 L 130,270 L 90,310 L 20,310" />
            <path d="M 220,310 L 140,310 L 100,350 L 40,350" />

            {/* Right Circuit Lines */}
            <path d="M 380,150 L 460,150 L 500,110 L 560,110" />
            <path d="M 400,190 L 470,190 L 510,150 L 580,150" />
            <path d="M 410,230 L 490,230 L 530,230" />
            <path d="M 400,270 L 470,270 L 510,310 L 580,310" />
            <path d="M 380,310 L 460,310 L 500,350 L 560,350" />
          </g>

          {/* Circuit Terminals (Nodes) */}
          <g fill="#c084fc" filter="url(#logoCircuitGlow)">
            {/* Left Nodes */}
            <circle cx="40" cy="110" r="4.5" />
            <circle cx="20" cy="150" r="4.5" />
            <circle cx="70" cy="230" r="4.5" />
            <circle cx="20" cy="310" r="4.5" />
            <circle cx="40" cy="350" r="4.5" />

            {/* Right Nodes */}
            <circle cx="560" cy="110" r="4.5" />
            <circle cx="580" cy="150" r="4.5" />
            <circle cx="530" cy="230" r="4.5" />
            <circle cx="580" cy="310" r="4.5" />
            <circle cx="560" cy="350" r="4.5" />
          </g>
        </>
      )}

      {/* Shield Group (Rendered in all variants) */}
      <g filter="drop-shadow(0 12px 20px rgba(0, 0, 0, 0.5))">
        {/* Outer Shield Border (Metallic) */}
        <path
          d="M 300,100 C 315,98 335,102 420,130 C 420,240 380,330 300,370 C 220,330 180,240 180,130 C 265,102 285,98 300,100 Z"
          fill="url(#logoSilverMetal)"
        />

        {/* Inner Shield (Glow & Background) */}
        <path
          d="M 300,112 C 313,110 331,114 408,138 C 408,236 371,318 300,355 C 229,318 192,236 192,138 C 269,114 287,110 300,112 Z"
          fill="url(#logoPurpleGlow)"
          stroke="#4c1d95"
          strokeWidth="1"
        />

        {/* Inner Shield Glow Overlay */}
        <path
          d="M 300,112 C 313,110 331,114 408,138 C 408,236 371,318 300,355 C 229,318 192,236 192,138 C 269,114 287,110 300,112 Z"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
          opacity="0.6"
          filter="url(#logoNeonGlow)"
        />

        {/* Three Metallic Inner Plates */}
        {/* 1. Top Plate */}
        <path
          d="M 240,130 C 275,122 325,122 360,130 C 350,165 325,175 300,175 C 275,175 250,165 240,130 Z"
          fill="url(#logoSilverMetal)"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />

        {/* 2. Left Plate */}
        <path
          d="M 205,145 C 198,210 245,295 285,325 C 278,295 258,225 270,190 C 255,180 240,165 205,145 Z"
          fill="url(#logoSilverMetal)"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />

        {/* 3. Right Plate */}
        <path
          d="M 395,145 C 402,210 355,295 315,325 C 322,295 342,225 330,190 C 345,180 360,165 395,145 Z"
          fill="url(#logoSilverMetal)"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />
      </g>

      {/* Typography - rendered only for the full layout */}
      {variant === 'full' && (
        <>
          {/* "VP GROUP" */}
          <text
            x="300"
            y="460"
            fontFamily="'Outfit', 'Inter', -apple-system, sans-serif"
            fontWeight="900"
            fontSize="62"
            textAnchor="middle"
            letterSpacing="-1.5"
            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))"
          >
            <tspan fill="url(#logoPurpleText)" stroke="#ffffff" strokeWidth="1">VP</tspan>
            <tspan fill="url(#logoSilverMetal)"> GROUP</tspan>
          </text>

          {/* "AND TECHNOLOGIES" */}
          <text
            x="300"
            y="515"
            fontFamily="'Outfit', 'Inter', -apple-system, sans-serif"
            fontWeight="800"
            fontSize="22"
            fill="url(#logoSilverMetal)"
            textAnchor="middle"
            letterSpacing="5"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
          >
            AND TECHNOLOGIES
          </text>
        </>
      )}
    </svg>
  );
};

export default Logo;
