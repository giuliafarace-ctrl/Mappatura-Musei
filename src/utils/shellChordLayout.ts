import { Dataset, MacroArea, Category, Museum } from '../types/museum';

export interface AreaTextLinePath {
  id: string;
  text: string;
  pathD: string;
}

export interface AreaLayoutItem {
  area: MacroArea;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  radius: number;
  totalLinks: number;
  museumCount: number;
  museums: Museum[];
  labelPos: { x: number; y: number };
  labelAngle: number;
  textAnchor: 'start' | 'end' | 'middle';
  // Radial spoke label converging towards center
  radialLabelPos: { x: number; y: number };
  radialLabelAngle: number;
  radialTextAnchor: 'start' | 'end';
  arcLinePath: string; // The thin dark gray arc line for this section
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  textLines: AreaTextLinePath[]; // Multi-line curved text paths inside circumference
}

// Massimo 2 righe bilanciate per ogni classe argomentativa
export const AREA_LABELS_MULTILINE: Record<string, string[]> = {
  'area-arte': ["Musei d'Arte"],
  'area-storia-archeo': ["Musei di Storia", "e di Archeologia"],
  'area-storia-scienze': ["Musei di Storia", "e Scienze Naturali"],
  'area-scienza-tecnica': ["Musei della Scienza", "e della Tecnica"],
  'area-etno-antropo': ["Musei di Etnografia", "e Antropologia"],
  'area-specializzati': ["Musei Specializzati"],
  'area-territoriali': ["Musei Territoriali"],
  'area-generali': ["Musei Generali"],
  'area-monumenti': ["Monumento storico", "o Area archeologica"],
  'area-natura-giardini': ["Giardini, orti, acquari", "o riserve naturali"],
  'area-storia-etno': ["Musei di Storia", "e di Etnografia"]
};

export interface MuseumLayoutItem {
  museum: Museum;
  areaId: string;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  radius: number;
  x: number; // Exact (x, y) on the 250° arc line for the black dot
  y: number;
  // Radial label tag positioning
  labelPos: { x: number; y: number };
  labelAngle: number;
  textAnchor: 'start' | 'end' | 'middle';
}

export interface CategoryLayoutItem {
  category: Category;
  x: number;
  y: number;
  totalIncomingLinks: number;
  totalMuseums: number;
  barWidth: number; // Proportional width of the horizontal bar chart line
  maxLinks: number;
}

export interface ShellRibbon {
  id: string;
  areaId: string;
  museumId?: string;
  museumName?: string;
  categoryId: string;
  sourceStartAngle: number;
  sourceEndAngle: number;
  sourceMidAngle: number;
  sourceRadius: number;
  targetX: number;
  targetY: number;
  weight: number;
  pathData: string;
  areaColor: string;
  categoryColor: string;
}

export interface MuseumCategoryLink {
  id: string;
  museumId: string;
  museumName: string;
  areaId: string;
  categoryId: string;
  pathData: string;
  slashesPathData?: string;
  linePattern: 'solid' | 'dashed' | 'dotted' | 'diagonal' | 'dash-dot';
  source: { x: number; y: number; angle: number };
  target: { x: number; y: number };
}

export interface ShellLayoutResult {
  areas: AreaLayoutItem[];
  museums: MuseumLayoutItem[];
  categories: CategoryLayoutItem[];
  ribbons: ShellRibbon[];
  museumLinks: MuseumCategoryLink[]; // Individual connections rendered when a museum is selected
  center: { x: number; y: number };
  radius: number;
  startSpan: number;
  endSpan: number;
  baseCatX: number;
  catYStart: number;
  catYEnd: number;
  maxBarWidth: number;
}

export interface LayoutOptions {
  viewMode?: 'macro' | 'museum';
  width?: number;
  height?: number;
}

/**
 * Computes the Scallop Shell Diagram layout with CATEGORIES ON THE RIGHT:
 * - 250° Arc on left/top/bottom
 * - 5 Categories on the right: first and last tangent to the circle arc
 * - From each category point: a horizontal BAR CHART line extends to the right
 * - 105 Museums: Black dots with individual RADIAL NAME TAGS radiating outward
 * - Ribbons: Flow from the arc towards the 5 category black dots on the right
 */
export function calculateShellLayout(
  dataset: Dataset,
  options: LayoutOptions = {}
): ShellLayoutResult {
  const { viewMode = 'macro', width = 1580, height = 1060 } = options;

  // Center is set so that the left radial labels, central arc, and right-side bar charts fit with generous margins
  const center = { x: width * 0.40, y: height * 0.50 };
  const radius = Math.min(width, height) * 0.34; // ~360px

  // 1. Arc angles: EXACTLY 250 DEGREES OPENING TO THE RIGHT (EAST)
  // Opening is 360° - 250° = 110°, centered at 0° (East).
  // Opening runs from -55° (305°) to +55°.
  // The 250° arc starts at bottom-right (55°) and curves clockwise through bottom, left, top to top-right (305°).
  const startSpan = (55 * Math.PI) / 180;  // ~0.9599 rad (bottom-right)
  const endSpan = (305 * Math.PI) / 180;   // ~5.3233 rad (top-right)
  const totalAngularSpan = endSpan - startSpan; // exactly 250 degrees (4.3633 rad)

  // Calculate weights per area
  const areaMuseumsMap = new Map<string, Museum[]>();
  dataset.macroAreas.forEach(a => areaMuseumsMap.set(a.id, []));
  dataset.museums.forEach(m => {
    const list = areaMuseumsMap.get(m.areaId);
    if (list) list.push(m);
  });

  const areaTotalLinks = new Map<string, number>();
  let grandTotalLinks = 0;

  dataset.macroAreas.forEach(a => {
    const mList = areaMuseumsMap.get(a.id) || [];
    let linkCount = 0;
    mList.forEach(m => {
      linkCount += m.categoryIds.length;
    });
    const safeCount = Math.max(1, linkCount);
    areaTotalLinks.set(a.id, safeCount);
    grandTotalLinks += safeCount;
  });

  // Gap between the 11 sections of the dark gray line (distanced more as requested)
  const areaCount = dataset.macroAreas.length;
  const padAngle = 0.040; // ~2.3 degrees gap between sections
  const usableSpan = totalAngularSpan - padAngle * (areaCount - 1);

  // 2. Position 11 Macro Areas along the thin 250° arc line
  let currentAngle = startSpan;
  const areasLayout: AreaLayoutItem[] = [];
  const areaAngleMap = new Map<string, { start: number; end: number }>();

  function createArcLinePath(cx: number, cy: number, r: number, a0: number, a1: number): string {
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const sweep = a1 >= a0 ? 1 : 0;
    return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 ${sweep} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  }

  dataset.macroAreas.forEach(area => {
    const totalLinks = areaTotalLinks.get(area.id) || 1;
    const proportion = totalLinks / grandTotalLinks;
    const span = proportion * usableSpan;

    const aStart = currentAngle;
    const aEnd = aStart + span;
    const aMid = (aStart + aEnd) / 2;

    areaAngleMap.set(area.id, { start: aStart, end: aEnd });

    // Inside the circumference: multi-line curved text paths along the circle contour
    // "Spostiamoli su una circonferenza invisibile posta a 35px verso l'interno rispetto a quella dei musei."
    const lines = AREA_LABELS_MULTILINE[area.id] || [area.name];
    const numLines = lines.length;
    // Breakpoint at 196° (3.42 rad) so area-specializzati (184.8°) flows downwards consistently with the left side without glitching
    const isUpper = aMid > 3.42;
    const rSupport = radius - 35; // Offset esatto di 35px verso l'interno rispetto alla circonferenza dei musei

    let radii: number[] = [];
    if (numLines === 1) {
      radii = [rSupport];
    } else if (numLines === 2) {
      radii = isUpper
        ? [rSupport, rSupport - 13.5]
        : [rSupport - 13.5, rSupport];
    } else {
      // 3 lines
      radii = isUpper
        ? [rSupport, rSupport - 13.5, rSupport - 27]
        : [rSupport - 27, rSupport - 13.5, rSupport];
    }

    // Maximum angular span clamped strictly within the area's own boundaries (with safety margin)
    const maxSpan = (aEnd - aStart) * 0.82;

    const textLines: AreaTextLinePath[] = lines.map((lineText, lineIdx) => {
      const lineRadius = radii[lineIdx];
      // Accurate span tailored to the text length + small padding so the highlight hugs the word
      // Clamped to maxSpan so it NEVER extends beyond the area's angular sector or overlaps other areas!
      const textPixelWidth = lineText.length * 7.2 + 8;
      const calculatedSpan = textPixelWidth / lineRadius;
      const spanAngle = Math.min(maxSpan, Math.max(0.10, calculatedSpan));
      const pStart = isUpper ? aMid - spanAngle / 2 : aMid + spanAngle / 2;
      const pEnd = isUpper ? aMid + spanAngle / 2 : aMid - spanAngle / 2;
      const pathD = createArcLinePath(center.x, center.y, lineRadius, pStart, pEnd);

      return {
        id: `area-arc-path-${area.id}-line-${lineIdx}`,
        text: lineText,
        pathD
      };
    });

    // Orientation angle for legible reading (circumferential fallback)
    const deg = (aMid * 180) / Math.PI;
    const normDeg = (deg % 360 + 360) % 360;

    let textRotation = 0;
    let textAnchor: 'start' | 'end' | 'middle' = 'start';

    if (normDeg > 90 && normDeg < 270) {
      textRotation = normDeg - 180;
      textAnchor = 'end';
    } else {
      textRotation = normDeg >= 270 ? normDeg - 360 : normDeg;
      textAnchor = 'start';
    }

    // Convergent spoke label towards center (tipo raggi convergenti verso il centro)
    // Reference point positioned just inside the circumference (radius - 16px)
    const radialRefRadius = radius - 16;
    const radialLabelPos = {
      x: center.x + radialRefRadius * Math.cos(aMid),
      y: center.y + radialRefRadius * Math.sin(aMid)
    };

    // Vector pointing towards center is (aMid + PI).
    const rayTowardsCenterDeg = ((aMid * 180 / Math.PI) + 180) % 360;
    let radialLabelAngle = 0;
    let radialTextAnchor: 'start' | 'end' = 'start';

    if (rayTowardsCenterDeg > 90 && rayTowardsCenterDeg < 270) {
      // Rotating by (rayTowardsCenterDeg - 180) aligns with normal reading without being upside down.
      // Since the angle now points outward from center, anchoring at 'end' means the text terminates
      // near the circumference and extends inward towards center.
      radialLabelAngle = rayTowardsCenterDeg - 180;
      radialTextAnchor = 'end';
    } else {
      // Vector points towards center and is readable.
      // Anchoring at 'start' means the text originates near the circumference and extends inward towards center.
      radialLabelAngle = rayTowardsCenterDeg >= 270 ? rayTowardsCenterDeg - 360 : rayTowardsCenterDeg;
      radialTextAnchor = 'start';
    }

    const mList = areaMuseumsMap.get(area.id) || [];
    const arcLinePath = createArcLinePath(center.x, center.y, radius, aStart, aEnd);

    const startPoint = {
      x: center.x + radius * Math.cos(aStart),
      y: center.y + radius * Math.sin(aStart)
    };
    const endPoint = {
      x: center.x + radius * Math.cos(aEnd),
      y: center.y + radius * Math.sin(aEnd)
    };

    const item: AreaLayoutItem = {
      area,
      startAngle: aStart,
      endAngle: aEnd,
      midAngle: aMid,
      radius,
      totalLinks,
      museumCount: mList.length,
      museums: mList,
      labelPos: { x: center.x + (radius + 20) * Math.cos(aMid), y: center.y + (radius + 20) * Math.sin(aMid) },
      labelAngle: textRotation,
      textAnchor,
      radialLabelPos,
      radialLabelAngle,
      radialTextAnchor,
      arcLinePath,
      startPoint,
      endPoint,
      textLines
    };

    areasLayout.push(item);
    currentAngle = aEnd + padAngle;
  });

  // 3. Position the 5 Category Points on a CHORD subtending an arc of 55 degrees
  // "Avvicinali al cerchio. mettili come se la linea su cui si poggiano tutti fosse una corda della circonferenza principale, che tocca un arco di 55 gradi."
  const catCount = dataset.categories.length;
  // Subtended arc is 55 degrees, centered at 0° (East), running from -27.5° to +27.5°
  const halfChordAngle = (27.5 * Math.PI) / 180; // ~0.47997 rad
  const baseCatX = center.x + radius * Math.cos(halfChordAngle); // ~cx + 0.88701 * radius
  const chordHalfHeight = radius * Math.sin(halfChordAngle);    // ~0.46175 * radius
  const catYStart = center.y - chordHalfHeight; // top endpoint on the circle (-27.5°)
  const catYEnd = center.y + chordHalfHeight;   // bottom endpoint on the circle (+27.5°)
  const catStep = (catYEnd - catYStart) / (catCount - 1); // ~83px step between points

  // Compute incoming links stats per category
  const categoryPositions = new Map<string, { x: number; y: number }>();
  const categoryStats = new Map<string, { links: number; museums: Set<string> }>();
  dataset.categories.forEach(c => categoryStats.set(c.id, { links: 0, museums: new Set() }));

  dataset.museums.forEach(m => {
    m.categoryIds.forEach(cId => {
      const stat = categoryStats.get(cId);
      if (stat) {
        stat.links += 1;
        stat.museums.add(m.id);
      }
    });
  });

  let maxIncomingLinks = 1;
  dataset.categories.forEach(c => {
    const count = categoryStats.get(c.id)?.links || 0;
    if (count > maxIncomingLinks) maxIncomingLinks = count;
  });

  const maxBarWidth = 360; // Lengthened bar chart lines as requested

  const categoriesLayout: CategoryLayoutItem[] = dataset.categories.map((cat, i) => {
    const x = baseCatX;
    const y = catYStart + i * catStep;

    categoryPositions.set(cat.id, { x, y });
    const stat = categoryStats.get(cat.id);
    const links = stat?.links || 0;
    const barWidth = (links / maxIncomingLinks) * maxBarWidth;

    return {
      category: cat,
      x,
      y,
      totalIncomingLinks: links,
      totalMuseums: stat?.museums.size || 0,
      barWidth,
      maxLinks: maxIncomingLinks
    };
  });

  // 4. Position 105 Museums as Black Dots + RADIAL NAME TAGS along the 250° arc line
  // "Ogni museo inoltre ha una sua targhetta con il nome messa in modo radiale."
  const museumsLayout: MuseumLayoutItem[] = [];
  const museumSubArcs = new Map<string, { start: number; end: number }>();

  dataset.macroAreas.forEach(area => {
    // "I musei sono ordinati in ogni segmento secondo il numero di bambini che ne hanno accesso diretto (numero di bambini per comune)."
    const unsortedList = areaMuseumsMap.get(area.id) || [];
    const mList = [...unsortedList].sort((a, b) => (b.childPopulation ?? 0) - (a.childPopulation ?? 0));
    const areaBounds = areaAngleMap.get(area.id);
    if (!areaBounds || mList.length === 0) return;

    const areaSpan = areaBounds.end - areaBounds.start;
    const edgeMargin = areaSpan * 0.05;
    const usableAreaSpan = areaSpan - 2 * edgeMargin;
    const step = mList.length > 1 ? usableAreaSpan / (mList.length - 1) : 0;

    mList.forEach((m, idx) => {
      const mMid = mList.length === 1
        ? (areaBounds.start + areaBounds.end) / 2
        : areaBounds.start + edgeMargin + idx * step;

      const subSpan = areaSpan / mList.length;
      museumSubArcs.set(m.id, { start: mMid - subSpan / 2, end: mMid + subSpan / 2 });

      // Dot position directly on the arc line
      const mx = center.x + radius * Math.cos(mMid);
      const my = center.y + radius * Math.sin(mMid);

      // Radial label position extending outward from the dot
      const radialLabelRadius = radius + 22;
      const lx = center.x + radialLabelRadius * Math.cos(mMid);
      const ly = center.y + radialLabelRadius * Math.sin(mMid);

      // Radial orientation angle
      const deg = (mMid * 180) / Math.PI;
      const normDeg = (deg % 360 + 360) % 360;

      let textRotation = 0;
      let textAnchor: 'start' | 'end' | 'middle' = 'start';

      if (normDeg > 90 && normDeg < 270) {
        textRotation = normDeg - 180;
        textAnchor = 'end';
      } else {
        textRotation = normDeg >= 270 ? normDeg - 360 : normDeg;
        textAnchor = 'start';
      }

      museumsLayout.push({
        museum: m,
        areaId: area.id,
        startAngle: mMid - subSpan / 2,
        endAngle: mMid + subSpan / 2,
        midAngle: mMid,
        radius,
        x: mx,
        y: my,
        labelPos: { x: lx, y: ly },
        labelAngle: textRotation,
        textAnchor
      });
    });
  });

  // 5. Generate Tapered Ribbons flowing from the 250° arc towards the 5 category black dots on the right
  const ribbons: ShellRibbon[] = [];
  const catColorMap = new Map<string, string>(dataset.categories.map(c => [c.id, c.color]));
  const areaColorMap = new Map<string, string>(dataset.macroAreas.map(a => [a.id, a.color]));

  if (viewMode === 'macro') {
    dataset.macroAreas.forEach(area => {
      const areaBounds = areaAngleMap.get(area.id);
      const mList = areaMuseumsMap.get(area.id) || [];
      if (!areaBounds || mList.length === 0) return;

      const catCountInArea = new Map<string, number>();
      let totalAreaLinks = 0;
      mList.forEach(m => {
        m.categoryIds.forEach(cId => {
          catCountInArea.set(cId, (catCountInArea.get(cId) || 0) + 1);
          totalAreaLinks++;
        });
      });

      if (totalAreaLinks === 0) return;

      const areaSpan = areaBounds.end - areaBounds.start;
      let currArcAngle = areaBounds.start;

      const catOrder = dataset.categories.map(c => c.id);
      const sortedActiveCats = catOrder.filter(cId => (catCountInArea.get(cId) || 0) > 0);

      sortedActiveCats.forEach(cId => {
        const linkCount = catCountInArea.get(cId) || 0;
        const sliceSpan = (linkCount / totalAreaLinks) * areaSpan;
        const rStart = currArcAngle;
        const rEnd = rStart + sliceSpan;
        const rMid = (rStart + rEnd) / 2;

        const target = categoryPositions.get(cId);
        if (target) {
          const pathData = createTaperedRibbonPath(
            center.x,
            center.y,
            radius,
            rStart,
            rEnd,
            target.x,
            target.y
          );

          ribbons.push({
            id: `ribbon-macro-${area.id}-${cId}`,
            areaId: area.id,
            categoryId: cId,
            sourceStartAngle: rStart,
            sourceEndAngle: rEnd,
            sourceMidAngle: rMid,
            sourceRadius: radius,
            targetX: target.x,
            targetY: target.y,
            weight: linkCount,
            pathData,
            areaColor: areaColorMap.get(area.id) || '#1e293b',
            categoryColor: catColorMap.get(cId) || '#1e293b'
          });
        }

        currArcAngle = rEnd;
      });
    });
  } else {
    // Museum View: Individual cords for each of the 105 museum black dots
    dataset.museums.forEach(m => {
      const mBounds = museumSubArcs.get(m.id);
      if (!mBounds || m.categoryIds.length === 0) return;

      const mSpan = mBounds.end - mBounds.start;
      const numLinks = m.categoryIds.length;
      const subSpan = mSpan / numLinks;

      const catOrder = dataset.categories.map(c => c.id);
      const sortedCats = [...m.categoryIds].sort(
        (a, b) => catOrder.indexOf(a) - catOrder.indexOf(b)
      );

      let currAngle = mBounds.start;
      sortedCats.forEach(cId => {
        const rStart = currAngle;
        const rEnd = rStart + subSpan;
        const rMid = (rStart + rEnd) / 2;

        const target = categoryPositions.get(cId);
        if (target) {
          const pathData = createTaperedRibbonPath(
            center.x,
            center.y,
            radius,
            rStart,
            rEnd,
            target.x,
            target.y
          );

          ribbons.push({
            id: `ribbon-museum-${m.id}-${cId}`,
            areaId: m.areaId,
            museumId: m.id,
            museumName: m.name,
            categoryId: cId,
            sourceStartAngle: rStart,
            sourceEndAngle: rEnd,
            sourceMidAngle: rMid,
            sourceRadius: radius,
            targetX: target.x,
            targetY: target.y,
            weight: 1,
            pathData,
            areaColor: areaColorMap.get(m.areaId) || '#1e293b',
            categoryColor: catColorMap.get(cId) || '#1e293b'
          });
        }

        currAngle = rEnd;
      });
    });
  }

  // 6. Precompute Individual Connection Lines for each museum-category link
  // Used when a museum is selected: lines become coherent with the destination category!
  const catMap = new Map<string, Category>(dataset.categories.map(c => [c.id, c]));
  const museumLinks: MuseumCategoryLink[] = [];

  museumsLayout.forEach(mItem => {
    const m = mItem.museum;
    if (!m.categoryIds || m.categoryIds.length === 0) return;

    m.categoryIds.forEach(cId => {
      const target = categoryPositions.get(cId);
      const cat = catMap.get(cId);
      if (!target || !cat) return;

      const curve = createConnectionCurve(mItem.x, mItem.y, mItem.midAngle, target.x, target.y);
      let slashesPathData: string | undefined = undefined;

      if (cat.linePattern === 'diagonal') {
        slashesPathData = createDiagonalSlashesAlongCurve(curve.p0, curve.p1, curve.p2, curve.p3);
      }

      museumLinks.push({
        id: `link-${m.id}-${cId}`,
        museumId: m.id,
        museumName: m.name,
        areaId: m.areaId,
        categoryId: cId,
        pathData: curve.pathData,
        slashesPathData,
        linePattern: cat.linePattern || 'solid',
        source: { x: mItem.x, y: mItem.y, angle: mItem.midAngle },
        target
      });
    });
  });

  return {
    areas: areasLayout,
    museums: museumsLayout,
    categories: categoriesLayout,
    ribbons,
    museumLinks,
    center,
    radius,
    startSpan,
    endSpan,
    baseCatX,
    catYStart,
    catYEnd,
    maxBarWidth
  };
}

/**
 * Creates smooth SVG Cubic Bézier curve between museum point (sx, sy) and category point (tx, ty):
 * Leaves the circular arc radially inward, and lands at the category horizontally from the left.
 */
function createConnectionCurve(
  sx: number,
  sy: number,
  sAngle: number,
  tx: number,
  ty: number
): { pathData: string; p0: { x: number; y: number }; p1: { x: number; y: number }; p2: { x: number; y: number }; p3: { x: number; y: number } } {
  const d = Math.hypot(tx - sx, ty - sy);
  const inVecX = -Math.cos(sAngle);
  const inVecY = -Math.sin(sAngle);
  const cp1X = sx + inVecX * (d * 0.38);
  const cp1Y = sy + inVecY * (d * 0.38);
  const cp2X = tx - d * 0.38;
  const cp2Y = ty;

  const pathData = `M ${sx.toFixed(2)} ${sy.toFixed(2)} C ${cp1X.toFixed(2)} ${cp1Y.toFixed(2)}, ${cp2X.toFixed(2)} ${cp2Y.toFixed(2)}, ${tx.toFixed(2)} ${ty.toFixed(2)}`;

  return {
    pathData,
    p0: { x: sx, y: sy },
    p1: { x: cp1X, y: cp1Y },
    p2: { x: cp2X, y: cp2Y },
    p3: { x: tx, y: ty }
  };
}

/**
 * Samples points along the cubic bezier curve to render 45° diagonal slashes for Didattica Narrativa.
 * Each slash is rotated dynamically according to the local curve tangent vector so that it is
 * ALWAYS inclined at 45° relative to the curve itself, exactly matching the horizontal bar style!
 */
function createDiagonalSlashesAlongCurve(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number }
): string {
  const chord = Math.hypot(p3.x - p0.x, p3.y - p0.y);
  const controlPoly =
    Math.hypot(p1.x - p0.x, p1.y - p0.y) +
    Math.hypot(p2.x - p1.x, p2.y - p1.y) +
    Math.hypot(p3.x - p2.x, p3.y - p2.y);
  const arcLen = (chord + controlPoly) / 2;

  const step = 8.5; // step matching Didattica Narrativa horizontal line
  const count = Math.max(6, Math.floor(arcLen / step));
  const segments: string[] = [];
  const halfLen = 1.6;

  for (let k = 1; k < count; k++) {
    const t = k / count;
    const u = 1 - t;
    const u2 = u * u;
    const t2 = t * t;

    const bx = u2 * u * p0.x + 3 * u2 * t * p1.x + 3 * u * t2 * p2.x + t2 * t * p3.x;
    const by = u2 * u * p0.y + 3 * u2 * t * p1.y + 3 * u * t2 * p2.y + t2 * t * p3.y;

    const dx = 3 * u2 * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t2 * (p3.x - p2.x);
    const dy = 3 * u2 * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t2 * (p3.y - p2.y);
    const len = Math.hypot(dx, dy);

    if (len < 0.001) continue;

    const tx = dx / len;
    const ty = dy / len;
    const nx = ty;
    const ny = -tx;

    const sx = (tx + nx) * 0.70710678;
    const sy = (ty + ny) * 0.70710678;

    const x1 = bx - halfLen * sx;
    const y1 = by - halfLen * sy;
    const x2 = bx + halfLen * sx;
    const y2 = by + halfLen * sy;

    segments.push(
      `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`
    );
  }

  return segments.join(' ');
}

/**
 * Creates SVG Path Data for smooth tapered ribbons flowing towards the RIGHT:
 * Enters target point (tx, ty) on the right horizontally from the left.
 */
function createTaperedRibbonPath(
  cx: number,
  cy: number,
  R: number,
  aStart: number,
  aEnd: number,
  tx: number,
  ty: number
): string {
  const x0 = cx + R * Math.cos(aStart);
  const y0 = cy + R * Math.sin(aStart);
  const x1 = cx + R * Math.cos(aEnd);
  const y1 = cy + R * Math.sin(aEnd);

  const inVec0X = -Math.cos(aStart);
  const inVec0Y = -Math.sin(aStart);
  const inVec1X = -Math.cos(aEnd);
  const inVec1Y = -Math.sin(aEnd);

  const d0 = Math.hypot(tx - x0, ty - y0);
  const d1 = Math.hypot(tx - x1, ty - y1);

  const toTgt1X = (tx - x1) / Math.max(1, d1);
  const toTgt1Y = (ty - y1) / Math.max(1, d1);
  const toTgt0X = (tx - x0) / Math.max(1, d0);
  const toTgt0Y = (ty - y0) / Math.max(1, d0);

  // Blend radial direction with target direction for natural scallop rib curvature
  const blend1X = inVec1X * 0.35 + toTgt1X * 0.65;
  const blend1Y = inVec1Y * 0.35 + toTgt1Y * 0.65;
  const blend1Len = Math.hypot(blend1X, blend1Y) || 1;

  const blend0X = inVec0X * 0.35 + toTgt0X * 0.65;
  const blend0Y = inVec0Y * 0.35 + toTgt0Y * 0.65;
  const blend0Len = Math.hypot(blend0X, blend0Y) || 1;

  const cp1X = x1 + (blend1X / blend1Len) * (d1 * 0.4);
  const cp1Y = y1 + (blend1Y / blend1Len) * (d1 * 0.4);

  // Enters target horizontally from the left (towards tx on the right)
  const cp2X = tx - d1 * 0.36;
  const cp2Y = ty + (y1 - ty) * 0.08;

  // Leaves target horizontally to the left
  const cp3X = tx - d0 * 0.36;
  const cp3Y = ty + (y0 - ty) * 0.08;

  const cp4X = x0 + (blend0X / blend0Len) * (d0 * 0.4);
  const cp4Y = y0 + (blend0Y / blend0Len) * (d0 * 0.4);

  return [
    `M ${x0.toFixed(2)} ${y0.toFixed(2)}`,
    `A ${R.toFixed(2)} ${R.toFixed(2)} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`,
    `C ${cp1X.toFixed(2)} ${cp1Y.toFixed(2)}, ${cp2X.toFixed(2)} ${cp2Y.toFixed(2)}, ${tx.toFixed(2)} ${ty.toFixed(2)}`,
    `C ${cp3X.toFixed(2)} ${cp3Y.toFixed(2)}, ${cp4X.toFixed(2)} ${cp4Y.toFixed(2)}, ${x0.toFixed(2)} ${y0.toFixed(2)}`,
    'Z'
  ].join(' ');
}
