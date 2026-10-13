export interface MacroArea {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  color: string;
  linePattern?: 'solid' | 'dashed' | 'dotted' | 'diagonal' | 'dash-dot';
  linePatternLabel?: string;
}

export type EducationalClass =
  | 'progettati_educare'      // triangolo equilatero
  | 'percorsi_progettati'     // pentagono equilatero
  | 'didattica_informativa'   // quadrato
  | 'senza_progetto';         // esagono

export type TargetAudience =
  | 'tutti'     // vuoto
  | 'speciale'  // puntino al centro nero
  | 'bambini'   // linea verticale che attraversa la forma nera
  | 'adulti';   // croce che attraversa la forma nera

export type GeographicArea =
  | 'nord'       // rosso
  | 'centro'     // blu
  | 'sud_isole'; // giallo

export interface Museum {
  id: string;
  name: string;
  areaId: string;
  categoryIds: string[];
  workshopCount?: number; // Numero di laboratori didattici offerti dal museo (dimensione cerchio grigio)
  childPopulation?: number; // Popolazione bambini del comune (criterio di ordinamento nel segmento)
  website?: string; // Link al sito web ufficiale del museo
  educationalClass?: EducationalClass;
  targetAudience?: TargetAudience;
  geographicArea?: GeographicArea;
  city?: string;
  region?: string;
  highlight?: string;
}

export interface Dataset {
  macroAreas: MacroArea[];
  categories: Category[];
  museums: Museum[];
}

export interface FlowRibbon {
  id: string;
  areaId: string;
  museumId?: string;
  museumName?: string;
  categoryId: string;
  sourceStartAngle: number;
  sourceEndAngle: number;
  sourceRadius: number;
  targetPoint: { x: number; y: number };
  value: number;
  areaColor: string;
  categoryColor: string;
}
