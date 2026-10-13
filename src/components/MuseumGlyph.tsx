import React from 'react';
import { EducationalClass, TargetAudience, GeographicArea } from '../types/museum';

export interface MuseumGlyphProps {
  cx: number;
  cy: number;
  size?: number; // raggio della forma
  educationalClass?: EducationalClass;
  geographicArea?: GeographicArea;
  targetAudience?: TargetAudience;
  fillColor?: string; // Colore personalizzato (es. #FFFFFF per spiegazione forme nella legenda)
}

export function getGeographicColor(area?: GeographicArea): string {
  switch (area) {
    case 'nord':
      return '#E6332A'; // rosso ufficiale
    case 'centro':
      return '#00A6BA'; // blu ufficiale
    case 'sud_isole':
      return '#F3D230'; // giallo ufficiale
    default:
      return '#00A6BA';
  }
}

export const EDUCATIONAL_CLASS_LABELS: Record<EducationalClass, string> = {
  progettati_educare: 'Musei progettati per educare (Triangolo)',
  percorsi_progettati: 'Musei con percorsi didattici progettati (Pentagono)',
  didattica_informativa: 'Musei con didattica informativa (Quadrato)',
  senza_progetto: 'Musei senza progetto didattico (Esagono)',
};

export const TARGET_AUDIENCE_LABELS: Record<TargetAudience, string> = {
  tutti: 'Tutti (Vuoto)',
  speciale: 'Speciale (Puntino al centro nero)',
  bambini: 'Bambini (Linea verticale nera)',
  adulti: 'Adulti (Croce nera)',
};

export const GEOGRAPHIC_AREA_LABELS: Record<GeographicArea, string> = {
  nord: 'Nord (Rosso #E6332A)',
  centro: 'Centro (Blu #00A6BA)',
  sud_isole: 'Sud & Isole (Giallo #F3D230)',
};

export const MuseumGlyph: React.FC<MuseumGlyphProps> = ({
  cx,
  cy,
  size = 4.8,
  educationalClass = 'didattica_informativa',
  geographicArea = 'centro',
  targetAudience = 'tutti',
  fillColor,
}) => {
  const fill = fillColor ?? getGeographicColor(geographicArea);
  const s = size;

  // 1. FORMA: Classe Didattica del museo
  let shapeElement: React.ReactNode = null;

  switch (educationalClass) {
    case 'progettati_educare': {
      // Triangolo equilatero con vertice verso l'alto
      const y0 = cy - s;
      const x1 = cx + 0.866 * s;
      const y1 = cy + 0.5 * s;
      const x2 = cx - 0.866 * s;
      const y2 = cy + 0.5 * s;
      const d = `M ${cx.toFixed(1)} ${y0.toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
      shapeElement = <path d={d} fill={fill} stroke="none" />;
      break;
    }

    case 'percorsi_progettati': {
      // Pentagono equilatero con vertice verso l'alto
      const points = [0, 1, 2, 3, 4]
        .map(k => {
          const a = -Math.PI / 2 + k * ((2 * Math.PI) / 5);
          return `${(cx + s * Math.cos(a)).toFixed(1)},${(cy + s * Math.sin(a)).toFixed(1)}`;
        })
        .join(' ');
      shapeElement = <polygon points={points} fill={fill} stroke="none" />;
      break;
    }

    case 'didattica_informativa': {
      // Quadrato centrato
      const h = s * 0.82;
      shapeElement = (
        <rect
          x={cx - h}
          y={cy - h}
          width={h * 2}
          height={h * 2}
          rx={0.3}
          fill={fill}
          stroke="none"
        />
      );
      break;
    }

    case 'senza_progetto':
    default: {
      // Esagono equilatero con vertice verso l'alto
      const points = [0, 1, 2, 3, 4, 5]
        .map(k => {
          const a = -Math.PI / 2 + k * ((2 * Math.PI) / 6);
          return `${(cx + s * Math.cos(a)).toFixed(1)},${(cy + s * Math.sin(a)).toFixed(1)}`;
        })
        .join(' ');
      shapeElement = <polygon points={points} fill={fill} stroke="none" />;
      break;
    }
  }

  // 2. RIEMPIMENTO / DETTAGLIO INTERNO: Classe Utenza del museo
  let innerMark: React.ReactNode = null;
  const strokeW = Math.max(1.1, s * 0.24);

  switch (targetAudience) {
    case 'speciale': {
      // Puntino al centro nero (#13100D)
      innerMark = (
        <circle
          cx={cx}
          cy={cy}
          r={Math.max(1.15, s * 0.24)}
          fill="#13100D"
          stroke="none"
        />
      );
      break;
    }

    case 'bambini': {
      // Linea verticale che attraversa la forma (#13100D)
      innerMark = (
        <line
          x1={cx}
          y1={cy - s * 0.85}
          x2={cx}
          y2={cy + s * 0.85}
          stroke="#13100D"
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
      );
      break;
    }

    case 'adulti': {
      // Croce che attraversa la forma (#13100D)
      const len = s * 0.8;
      innerMark = (
        <g>
          <line
            x1={cx}
            y1={cy - len}
            x2={cx}
            y2={cy + len}
            stroke="#13100D"
            strokeWidth={strokeW}
            strokeLinecap="round"
          />
          <line
            x1={cx - len}
            y1={cy}
            x2={cx + len}
            y2={cy}
            stroke="#13100D"
            strokeWidth={strokeW}
            strokeLinecap="round"
          />
        </g>
      );
      break;
    }

    case 'tutti':
    default: {
      // Vuoto (nessun segno interno nero)
      innerMark = null;
      break;
    }
  }

  return (
    <g className="museum-glyph pointer-events-none">
      {shapeElement}
      {innerMark}
    </g>
  );
};
