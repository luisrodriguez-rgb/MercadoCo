import React from 'react';

/**
 * Logotipos e isotipos vectoriales oficiales de los principales retailers de Colombia
 * y símbolos institucionales normalizados para modo claro y oscuro.
 */

export function LogoD1({ width = 36, height = 24, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Tiendas D1 Logo"
    >
      <rect width="120" height="80" rx="8" fill="#E30613" />
      {/* Letra D y número 1 característicos de D1 */}
      <path
        d="M24 18H50C62 18 70 26 70 40C70 54 62 62 50 62H24V18ZM38 31V49H48C54 49 57 46 57 40C57 34 54 31 48 31H38Z"
        fill="#FFFFFF"
      />
      <path
        d="M86 22L76 29V39L84 33V62H96V18L86 22Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function LogoAra({ width = 36, height = 24, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Tiendas Ara Logo"
    >
      <rect width="120" height="80" rx="8" fill="#FF7900" />
      {/* Guacamaya / Isotipo estilizado de Ara */}
      <path
        d="M24 48C24 36 34 26 46 26C52 26 57 28 61 32C64 27 69 24 75 24C83 24 90 30 92 38C94 36 97 34 100 34C102 34 104 35 106 37L100 46C96 52 88 56 80 56C68 56 58 48 56 38C52 42 46 45 40 45C33 45 28 41 26 35L24 48Z"
        fill="#FFD200"
      />
      {/* Texto ara tipográfico */}
      <text
        x="60"
        y="58"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="34"
        letterSpacing="-1"
      >
        ara
      </text>
    </svg>
  );
}

export function LogoExito({ width = 36, height = 24, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Grupo Éxito Logo"
    >
      <rect width="120" height="80" rx="8" fill="#FFDD00" />
      {/* Texto éxito con punto de la e y la i */}
      <text
        x="60"
        y="51"
        textAnchor="middle"
        fill="#000000"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="30"
        letterSpacing="-1"
      >
        éxito
      </text>
      <circle cx="28" cy="27" r="4" fill="#E30613" />
      <circle cx="68" cy="27" r="4" fill="#000000" />
    </svg>
  );
}

export function FlagColombia({ width = 24, height = 16, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ borderRadius: '3px', overflow: 'hidden', display: 'inline-block', verticalAlign: 'middle' }}
      aria-label="Bandera de Colombia"
    >
      <rect width="36" height="12" fill="#FCD116" />
      <rect y="12" width="36" height="6" fill="#003893" />
      <rect y="18" width="36" height="6" fill="#CE1126" />
    </svg>
  );
}
