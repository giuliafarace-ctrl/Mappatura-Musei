import React, { useMemo, useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Dataset, MacroArea, Category, Museum } from '../types/museum';
import { calculateShellLayout, ShellRibbon, AreaLayoutItem, CategoryLayoutItem, MuseumLayoutItem, AREA_LABELS_MULTILINE } from '../utils/shellChordLayout';
import { MuseumGlyph, EDUCATIONAL_CLASS_LABELS, TARGET_AUDIENCE_LABELS, GEOGRAPHIC_AREA_LABELS, getGeographicColor } from './MuseumGlyph';
import { ZoomIn, ZoomOut, Maximize2, Move } from 'lucide-react';

interface ShellChordDiagramProps {
  dataset: Dataset;
  viewMode: 'macro' | 'museum';
  selectedAreaId: string | null;
  selectedCategoryId: string | null;
  selectedMuseumId: string | null;
  onSelectArea: (area: MacroArea | null) => void;
  onSelectCategory: (cat: Category | null) => void;
  onSelectMuseum: (museum: Museum | null) => void;
  onResetSelection?: () => void;
  showMuseumTicks?: boolean;
  filterEducationalClass?: string | null;
  filterGeographicArea?: string | null;
  filterTargetAudience?: string | null;
}

interface HoverState {
  type: 'area' | 'category' | 'museum' | 'ribbon' | null;
  areaId?: string;
  categoryId?: string;
  museumId?: string;
  ribbonId?: string;
  clientX: number;
  clientY: number;
  data?: any;
}

export const ShellChordDiagram: React.FC<ShellChordDiagramProps> = ({
  dataset,
  viewMode,
  selectedAreaId,
  selectedCategoryId,
  selectedMuseumId,
  onSelectArea,
  onSelectCategory,
  onSelectMuseum,
  onResetSelection,
  showMuseumTicks = true,
  filterEducationalClass,
  filterGeographicArea,
  filterTargetAudience,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const [zoomTransform, setZoomTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);
  const [hover, setHover] = useState<HoverState>({ type: null, clientX: 0, clientY: 0 });

  // Dimensions of SVG canvas - spacious for lengthened bars, metric scale, and radial tags
  const width = 1760;
  const height = 1100;

  // Compute Layout via our Shell Chord geometry
  const layout = useMemo(() => {
    return calculateShellLayout(dataset, {
      viewMode,
      width,
      height
    });
  }, [dataset, viewMode]);

  // Set up D3 Zoom & Pan
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 12]) // Zoom from 50% to 1200% for extreme reading clarity!
      .filter((event) => {
        return !event.ctrlKey && (!event.type || event.type === 'wheel' || event.button === 0);
      })
      .on('zoom', (event) => {
        setZoomTransform(event.transform);
      });

    svg.call(zoom);
    zoomBehaviorRef.current = zoom;

    return () => {
      svg.on('.zoom', null);
    };
  }, []);

  const handleZoomIn = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(280)
      .call(zoomBehaviorRef.current.scaleBy, 1.35);
  };

  const handleZoomOut = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(280)
      .call(zoomBehaviorRef.current.scaleBy, 0.74);
  };

  const handleResetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(350)
      .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
  };

  // Determine active filter state
  const activeAreaId = hover.type === 'area' ? hover.areaId : (hover.type === 'ribbon' ? hover.areaId : selectedAreaId);
  const activeCategoryId = hover.type === 'category' ? hover.categoryId : (hover.type === 'ribbon' ? hover.categoryId : selectedCategoryId);
  const activeMuseumId = hover.type === 'museum' ? hover.museumId : (hover.type === 'ribbon' ? hover.museumId : selectedMuseumId);

  const hasLegendFilter = Boolean(filterEducationalClass || filterGeographicArea || filterTargetAudience);
  const isFiltering = Boolean(activeAreaId || activeCategoryId || activeMuseumId || hasLegendFilter);

  // Helper to determine if a ribbon is highlighted
  const isRibbonActive = (ribbon: ShellRibbon) => {
    if (!isFiltering) return true;
    if (activeMuseumId && ribbon.museumId) {
      return ribbon.museumId === activeMuseumId;
    }
    if (activeAreaId && activeCategoryId) {
      return ribbon.areaId === activeAreaId && ribbon.categoryId === activeCategoryId;
    }
    if (activeAreaId) {
      return ribbon.areaId === activeAreaId;
    }
    if (activeCategoryId) {
      return ribbon.categoryId === activeCategoryId;
    }
    return false;
  };

  // Helper to determine if an area is highlighted
  const isAreaActive = (areaId: string) => {
    if (!isFiltering) return true;
    if (activeAreaId) return activeAreaId === areaId;
    if (activeMuseumId) {
      const mus = dataset.museums.find(m => m.id === activeMuseumId);
      return mus?.areaId === areaId;
    }
    if (activeCategoryId) {
      return dataset.museums.some(m => m.areaId === areaId && m.categoryIds.includes(activeCategoryId));
    }
    return false;
  };

  // Helper to determine if a category is highlighted
  const isCategoryActive = (catId: string) => {
    if (!isFiltering) return true;
    if (activeCategoryId) return activeCategoryId === catId;
    if (activeMuseumId) {
      const mus = dataset.museums.find(m => m.id === activeMuseumId);
      return Boolean(mus?.categoryIds.includes(catId));
    }
    if (activeAreaId) {
      return dataset.museums.some(m => m.areaId === activeAreaId && m.categoryIds.includes(catId));
    }
    return false;
  };

  // Mouse move handler for tooltips
  const handleMouseMove = (e: React.MouseEvent) => {
    setHover(prev => ({ ...prev, clientX: e.clientX, clientY: e.clientY }));
  };

  const zoomPercent = Math.round(zoomTransform.k * 100);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-white">
      
      {/* Floating Zoom & Pan Toolbar */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-slate-200 shadow-xl">
        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-slate-100 rounded-xl text-slate-700 hover:text-slate-900 transition-colors"
          title="Zoom Avanti (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <span className="text-xs font-mono font-bold text-slate-700 min-w-[46px] text-center px-1">
          {zoomPercent}%
        </span>
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-slate-100 rounded-xl text-slate-700 hover:text-slate-900 transition-colors"
          title="Zoom Indietro (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />
        <button
          onClick={handleResetZoom}
          className="p-2 hover:bg-slate-100 rounded-xl text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer"
          title="Adatta allo schermo"
          aria-label="Adatta allo schermo"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SVG Canvas with Zoomable Group */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full max-h-[92vh] object-contain cursor-grab active:cursor-grabbing"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHover({ type: null, clientX: 0, clientY: 0 })}
        onClick={(e) => {
          if (e.target === svgRef.current) {
            onResetSelection?.();
          }
        }}
      >
        <defs>
          <style>{`
            @font-face {
              font-family: 'Cambria';
              font-style: italic;
              font-weight: 700;
              src: local('Cambria Bold Italic'), local('Cambria-BoldItalic'), local('Cambria Italic'), local('Cambria'), url('https://fonts.gstatic.com/s/caladea/v10/kJE0BugZ7AAjhybUvR1FQ98iq8ZyJ561DQ.woff2') format('woff2');
            }
            @font-face {
              font-family: 'Cambria';
              font-style: italic;
              font-weight: 400;
              src: local('Cambria Italic'), local('Cambria-Italic'), local('Cambria'), url('https://fonts.gstatic.com/s/caladea/v10/kJExBugZ7AAjhybUvR1N-Po3huR_DQ.woff2') format('woff2');
            }
            @font-face {
              font-family: 'Cambria-Italic';
              font-style: italic;
              font-weight: 700;
              src: local('Cambria Bold Italic'), local('Cambria-BoldItalic'), url('https://fonts.gstatic.com/s/caladea/v10/kJE0BugZ7AAjhybUvR1FQ98iq8ZyJ561DQ.woff2') format('woff2');
            }
            @font-face {
              font-family: 'Cambria-Italic';
              font-style: italic;
              font-weight: 400;
              src: local('Cambria Italic'), local('Cambria-Italic'), url('https://fonts.gstatic.com/s/caladea/v10/kJExBugZ7AAjhybUvR1N-Po3huR_DQ.woff2') format('woff2');
            }
          `}</style>
          <filter id="light-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>

          {/* Filtro per evidenziazione morbida con bordi dissolti per i nomi delle macro aree */}
          <filter id="soft-highlight-blur" x="-40%" y="-100%" width="180%" height="300%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>

          {/* 45° Diagonal Slashes for P4 Didattica Narrativa (spessore dimezzato come in immagine) */}
          <pattern
            id="pattern-diagonal-45"
            width="5.5"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0.5" y1="5.5" x2="4.8" y2="0.5" stroke="#13100D" strokeWidth="1.8" strokeLinecap="round" />
          </pattern>

          {/* Monochromatic Gray Gradients for Ribbons - Palette ufficiale #DADADA e #9D9D9C */}
          <linearGradient id="grad-monochrome-light" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#DADADA" stopOpacity="0.50" />
            <stop offset="50%" stopColor="#DADADA" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#DADADA" stopOpacity="0.50" />
          </linearGradient>

          <linearGradient id="grad-monochrome-active" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#9D9D9C" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#9D9D9C" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#13100D" stopOpacity="0.85" />
          </linearGradient>

          {/* Sfumatura grigia scura (#9D9D9C) per le corde della didattica */}
          <linearGradient id="grad-monochrome-category" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#9D9D9C" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#9D9D9C" stopOpacity="0.70" />
            <stop offset="100%" stopColor="#9D9D9C" stopOpacity="0.85" />
          </linearGradient>
          {/* Curved multi-line text paths for the 11 areas inside the circumference */}
          {layout.areas.flatMap(item => item.textLines).map(linePath => (
            <path
              key={linePath.id}
              id={linePath.id}
              d={linePath.pathD}
              fill="none"
              stroke="none"
            />
          ))}
        </defs>

        {/* ========================================================================= */}
        {/* ALL DIAGRAM CONTENT ENCLOSED IN D3 ZOOM TRANSFORM GROUP                   */}
        {/* ========================================================================= */}
        {/* Sfondo cliccabile per resettare la selezione cliccando nel vuoto */}
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="transparent"
          onClick={() => onResetSelection?.()}
        />

        <g transform={zoomTransform.toString()} className="transition-transform duration-75">
          {/* Sfondo esteso all'interno del gruppo zoom per intercettare i click nel vuoto */}
          <rect
            x={-width * 2}
            y={-height * 2}
            width={width * 5}
            height={height * 5}
            fill="transparent"
            onClick={() => onResetSelection?.()}
          />

          {/* ========================================================================= */}
          {/* TITOLO GENERALE AL CENTRO DEL CERCHIO: CAMBRIA BOLD, TUTTO IN MINUSCOLO    */}
          {/* ACCAPI ESATTI: mappatura / del contesto / educativo museale / italiano    */}
          {/* ========================================================================= */}
          <g className="central-title-group pointer-events-none select-none">
            <text
              x={layout.center.x}
              y={layout.center.y - 66}
              textAnchor="middle"
              style={{
                fontFamily: "Cambria, Georgia, 'Times New Roman', serif",
                fontWeight: 'bold',
                fontSize: '38px',
                fill: '#EDEDED',
                letterSpacing: '0.5px'
              }}
            >
              mappatura
            </text>
            <text
              x={layout.center.x}
              y={layout.center.y - 22}
              textAnchor="middle"
              style={{
                fontFamily: "Cambria, Georgia, 'Times New Roman', serif",
                fontWeight: 'bold',
                fontSize: '38px',
                fill: '#EDEDED',
                letterSpacing: '0.5px'
              }}
            >
              del contesto
            </text>
            <text
              x={layout.center.x}
              y={layout.center.y + 22}
              textAnchor="middle"
              style={{
                fontFamily: "Cambria, Georgia, 'Times New Roman', serif",
                fontWeight: 'bold',
                fontSize: '38px',
                fill: '#EDEDED',
                letterSpacing: '0.5px'
              }}
            >
              educativo museale
            </text>
            <text
              x={layout.center.x}
              y={layout.center.y + 66}
              textAnchor="middle"
              style={{
                fontFamily: "Cambria, Georgia, 'Times New Roman', serif",
                fontWeight: 'bold',
                fontSize: '38px',
                fill: '#EDEDED',
                letterSpacing: '0.5px'
              }}
            >
              italiano
            </text>
          </g>

          {/* ========================================================================= */}
          {/* RIBBONS LAYER - TUTTO GRIGIO CHIARO SENZA COLORI                          */}
          {/* ========================================================================= */}
          <g className="ribbons-group">
            {/* Inactive ribbons rendered first */}
            {layout.ribbons
              .filter(r => !isRibbonActive(r))
              .map(ribbon => {
                // In macro view: "lascia dietro il resto dei nastri" (opacity 0.20)
                // In museum view when category selected: leaves background ribbons at 0.16
                // When museum selected: ribbons are very faint (0.02)
                const inactiveOpacity = activeMuseumId
                  ? 0.02
                  : viewMode === 'macro'
                  ? 0.20
                  : activeCategoryId
                  ? 0.16
                  : 0.18;

                return (
                  <path
                    key={ribbon.id}
                    d={ribbon.pathData}
                    fill="url(#grad-monochrome-light)"
                    opacity={inactiveOpacity}
                    stroke="none"
                    className="transition-opacity duration-300"
                  />
                );
              })}

            {/* Active ribbons rendered on top */}
            {layout.ribbons
              .filter(r => isRibbonActive(r))
              .map(ribbon => {
                const isDirectlyHovered =
                  hover.type === 'ribbon' && hover.ribbonId === ribbon.id;
                const isMacroHighlighted =
                  Boolean(activeAreaId || activeCategoryId || activeMuseumId);

                // Nella visione "105 musei" quando selezioniamo una categoria didattica:
                // i nastri di quella categoria sfumano perché al loro posto appaiono le linee coerenti con la traccia!
                const isMuseumModeCatSelected =
                  viewMode === 'museum' && Boolean(activeCategoryId) && ribbon.categoryId === activeCategoryId;

                const opacity = activeMuseumId
                  ? (ribbon.museumId === activeMuseumId ? 0.04 : 0.02)
                  : isMuseumModeCatSelected
                  ? 0.02
                  : isDirectlyHovered
                  ? 0.80
                  : isMacroHighlighted
                  ? 0.70 // nella visione macro va bene che li scurisci, ma lascia dietro il resto dei nastri
                  : 0.28;

                return (
                  <path
                    key={ribbon.id}
                    d={ribbon.pathData}
                    fill={
                      isDirectlyHovered
                        ? 'url(#grad-monochrome-active)'
                        : activeCategoryId
                        ? 'url(#grad-monochrome-category)'
                        : isMacroHighlighted && !activeMuseumId && !isMuseumModeCatSelected
                        ? 'url(#grad-monochrome-active)'
                        : 'url(#grad-monochrome-light)'
                    }
                    opacity={isDirectlyHovered ? 0.75 : opacity}
                    stroke="none"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={(e) => {
                      setHover({
                        type: 'ribbon',
                        ribbonId: ribbon.id,
                        areaId: ribbon.areaId,
                        categoryId: ribbon.categoryId,
                        museumId: ribbon.museumId,
                        clientX: e.clientX,
                        clientY: e.clientY,
                        data: ribbon
                      });
                    }}
                    onMouseLeave={() => setHover(prev => ({ ...prev, type: null }))}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (ribbon.museumId) {
                        const m = dataset.museums.find(x => x.id === ribbon.museumId);
                        onSelectMuseum(m || null);
                      } else {
                        const a = dataset.macroAreas.find(x => x.id === ribbon.areaId);
                        onSelectArea(a || null);
                      }
                    }}
                  />
                );
              })}
          </g>

          {/* ========================================================================= */}
          {/* LINEE COERENTI CON LA DESTINAZIONE:                                       */}
          {/* 1. Quando selezioniamo un museo (linee di quel museo verso le sue cat)     */}
          {/* 2. Nella visione "105 musei" quando selezioniamo una categoria didattica   */}
          {/* "Le corde che arrivano sulla didattica sono grigie per non appesantire"    */}
          {/* ========================================================================= */}
          {(() => {
            const isCategoryModeInMuseumView = viewMode === 'museum' && Boolean(activeCategoryId) && !activeMuseumId;
            const linksToRender = activeMuseumId
              ? layout.museumLinks.filter(link => link.museumId === activeMuseumId)
              : isCategoryModeInMuseumView
              ? layout.museumLinks.filter(link => link.categoryId === activeCategoryId)
              : [];

            if (linksToRender.length === 0) return null;

            // Linee verso la didattica: impostate rigorosamente nel grigio scuro (#9D9D9C) con traccia fine (1.1px)
            const cordStrokeColor = '#9D9D9C';

            return (
              <g className="coherent-category-lines-group pointer-events-none">
                {linksToRender.map(link => (
                  <g key={link.id} className="transition-all duration-300">
                    {/* 1. Didattica Ludica: Linea Piena Continua Grigio Scuro Fine */}
                    {link.linePattern === 'solid' && (
                      <path
                        d={link.pathData}
                        fill="none"
                        stroke={cordStrokeColor}
                        strokeWidth={1.1}
                        strokeLinecap="round"
                      />
                    )}

                    {/* 2. Didattica Esperienziale: Linea Tratteggiata Grigio Scuro Fine */}
                    {link.linePattern === 'dashed' && (
                      <path
                        d={link.pathData}
                        fill="none"
                        stroke={cordStrokeColor}
                        strokeWidth={1.1}
                        strokeDasharray="5 5"
                        strokeLinecap="round"
                      />
                    )}

                    {/* 3. Didattica Interattiva: Linea Puntinata Grigio Scuro Fine */}
                    {link.linePattern === 'dotted' && (
                      <path
                        d={link.pathData}
                        fill="none"
                        stroke={cordStrokeColor}
                        strokeWidth={1.1}
                        strokeDasharray="0.1 5.5"
                        strokeLinecap="round"
                      />
                    )}

                    {/* 4. Didattica Narrativa: Trattini a 45° ruotati lungo la curva Grigio Scuro Fine */}
                    {link.linePattern === 'diagonal' && (
                      <g>
                        {/* Sottile guida trasparente sotto */}
                        <path
                          d={link.pathData}
                          fill="none"
                          stroke="#DADADA"
                          strokeWidth={0.6}
                          strokeOpacity={0.6}
                        />
                        {/* Tratti inclinati a 45° grigi scuro fini */}
                        <path
                          d={link.slashesPathData || link.pathData}
                          fill="none"
                          stroke={cordStrokeColor}
                          strokeWidth={1.0}
                          strokeLinecap="round"
                        />
                      </g>
                    )}

                    {/* 5. Didattica Informativa: Linea Tratto-Punto Grigio Scuro Fine */}
                    {link.linePattern === 'dash-dot' && (
                      <path
                        d={link.pathData}
                        fill="none"
                        stroke={cordStrokeColor}
                        strokeWidth={1.1}
                        strokeDasharray="5 4 0.1 4"
                        strokeLinecap="round"
                      />
                    )}
                  </g>
                ))}
              </g>
            );
          })()}

          {/* ========================================================================= */}
          {/* UPPER 250° ARC LINE: LINEE TRONCATE SEMPLICEMENTE E PIÙ DISTANZIATE       */}
          {/* ========================================================================= */}
          <g className="macro-areas-arc-lines">
            {layout.areas.map(item => {
              const active = isAreaActive(item.area.id);
              const isSelected = selectedAreaId === item.area.id;
              const isHovered = hover.type === 'area' && hover.areaId === item.area.id;

              return (
                <g
                  key={item.area.id}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectArea(isSelected ? null : item.area);
                  }}
                  onMouseEnter={(e) => {
                    setHover({
                      type: 'area',
                      areaId: item.area.id,
                      clientX: e.clientX,
                      clientY: e.clientY,
                      data: item
                    });
                  }}
                  onMouseLeave={() => setHover(prev => ({ ...prev, type: null }))}
                >
                  {/* Invisible wider hit area for easy hover/clicking (54px) */}
                  <path
                    d={item.arcLinePath}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={54}
                  />

                  {/* Circonferenza Principale: Arco sottile per ciascuna delle 11 aree */}
                  <path
                    d={item.arcLinePath}
                    fill="none"
                    stroke={isSelected || isHovered ? '#0f172a' : active ? '#334155' : '#cbd5e1'}
                    strokeWidth={isSelected || isHovered ? 4.2 : 2.6}
                    strokeLinecap="butt"
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}
          </g>

          {/* ========================================================================= */}
          {/* NOMI DELLE CLASSI ARGOMENTATIVE: RAGGI CONVERGENTI VERSO IL CENTRO        */}
          {/* ========================================================================= */}
          <g className="macro-areas-labels-layer">
            {layout.areas.map(item => {
              const active = isAreaActive(item.area.id);
              const isSelected = selectedAreaId === item.area.id;
              const isHovered = hover.type === 'area' && hover.areaId === item.area.id;
              const isLabelBold = isSelected || isHovered;

              const lines = AREA_LABELS_MULTILINE[item.area.id] || [item.area.name];
              const lineOffset = item.radialTextAnchor === 'end' ? -12 : 12;

              return (
                <g
                  key={`labels-group-${item.area.id}`}
                  className="cursor-pointer group transition-all duration-150"
                  transform={`translate(${item.radialLabelPos.x}, ${item.radialLabelPos.y}) rotate(${item.radialLabelAngle})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectArea(isSelected ? null : item.area);
                  }}
                  onMouseEnter={(e) => {
                    setHover({
                      type: 'area',
                      areaId: item.area.id,
                      clientX: e.clientX,
                      clientY: e.clientY,
                      data: item
                    });
                  }}
                  onMouseLeave={() => setHover(prev => ({ ...prev, type: null }))}
                >
                  {/* Invisible hit rectangle for easy clicking */}
                  <rect
                    x={item.radialTextAnchor === 'end' ? -220 : -10}
                    y={-14}
                    width={230}
                    height={lines.length > 1 ? lines.length * 15 + 10 : 28}
                    fill="transparent"
                  />

                  {/* Testi orientati come raggi convergenti verso il centro in Cambria Italic Bold (massimo 2 righe) */}
                  <text
                    x={item.radialTextAnchor === 'end' ? -6 : 6}
                    y={0}
                    textAnchor={item.radialTextAnchor}
                    dominantBaseline="central"
                    alignmentBaseline="middle"
                    fontFamily="'Cambria', 'Cambria-Italic', 'Caladea', Georgia, serif"
                    fontStyle="italic"
                    fontWeight="bold"
                    fontSize={isLabelBold ? '13px' : '11.5px'}
                    paintOrder="stroke fill"
                    stroke="#FFFFFF"
                    strokeWidth={3.5}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    style={{
                      fontFamily: "'Cambria', 'Cambria-Italic', 'Caladea', Georgia, serif",
                      fontStyle: 'italic',
                      fontWeight: 700,
                      fontSize: isLabelBold ? '13px' : '11.5px',
                      letterSpacing: '0.15px'
                    }}
                    fill={
                      isSelected || isHovered
                        ? '#13100D'
                        : active
                        ? '#13100D'
                        : '#9D9D9C'
                    }
                    className="select-none transition-all duration-150 font-cambria-bold-italic"
                  >
                    {lines.slice(0, 2).map((line, lIdx, arr) => (
                      <tspan
                        key={lIdx}
                        x={item.radialTextAnchor === 'end' ? -6 : 6}
                        dy={lIdx === 0 ? (arr.length > 1 ? -6.5 : 0) : 13}
                        fontFamily="'Cambria', 'Cambria-Italic', 'Caladea', Georgia, serif"
                        fontStyle="italic"
                        fontWeight="bold"
                        paintOrder="stroke fill"
                        stroke="#FFFFFF"
                        strokeWidth={3.5}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        style={{
                          fontFamily: "'Cambria', 'Cambria-Italic', 'Caladea', Georgia, serif",
                          fontStyle: 'italic',
                          fontWeight: 700
                        }}
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}
          </g>

          {/* ========================================================================= */}
          {/* 105 MUSEI: PALLINI NERI SENZA OPACITÀ + TARGHETTA SENZA TRATTINO          */}
          {/* ========================================================================= */}
          {showMuseumTicks && (
            <g className="museums-radial-tags-group">
              {(() => {
                const focusMuseumId = hover.type === 'museum' ? hover.museumId : selectedMuseumId;
                const focusMuseum = focusMuseumId ? dataset.museums.find(m => m.id === focusMuseumId) : null;

                const sortedMuseums = [...layout.museums].sort((a, b) => {
                  if (a.museum.id === focusMuseumId) return 1;
                  if (b.museum.id === focusMuseumId) return -1;
                  return 0;
                });

                return sortedMuseums.map(mItem => {
                  const mus = mItem.museum;
                  const isDirectFocus = mus.id === focusMuseumId;

                  // Calcolo dell'area del cerchio proporzionale al numero di laboratori didattici
                  // A = pi * r^2 proporzionale a workshopCount => r = sqrt(k * W + r0^2)
                  // r0 = 6.0px (Cerchio Identificativo del Museo impostato esattamente a 6px)
                  const workshops = mus.workshopCount ?? 0;
                  const hasWorkshops = workshops > 0;
                  const bubbleRadius = hasWorkshops ? Math.sqrt(7.5 * workshops + 36) : 6.0;

                  // Interazione Museo:
                  // "quando passo con il mouse o clicco su un museo, i nomi dei musei appartenenti ad altre aree argomentative
                  // rimangono della stessa grandezza, ma sbiadiscono. Sbiadiscono anche i segnalini."
                  let groupOpacity = 1;
                  let labelFontSize = '8.5px'; // standard size
                  let labelFontWeight = 'normal';
                  let labelFillColor = '#9D9D9C';
                  let dotRadius = 6.0;         // Impostato esattamente a 6px di raggio (#13100D), senza alcuna traccia
                  let glyphSize = 4.0;         // Forma Semiotica Interna: Scalata a 4px, posizionata al centro

                  // Verifica filtro segnalini della legenda (Classe didattica, Area geografica, Classe utenza)
                  const matchesLegendFilter =
                    (!filterEducationalClass || mus.educationalClass === filterEducationalClass) &&
                    (!filterGeographicArea || mus.geographicArea === filterGeographicArea) &&
                    (!filterTargetAudience || mus.targetAudience === filterTargetAudience);

                  if (focusMuseum) {
                    const isSameArea = mus.areaId === focusMuseum.areaId;
                    if (isSameArea) {
                      groupOpacity = 1;
                      if (isDirectFocus) {
                        dotRadius = 11.5; // ingrandimento segnalino più marcato come richiesto
                        glyphSize = 7.5;  // forma semiotica interna proporzionalmente ingrandita
                        labelFontSize = '13.5px'; // ingrandimento nome museo selezionato
                        labelFontWeight = 'bold';
                        labelFillColor = '#13100D';
                      } else {
                        // Altri musei della stessa area argomentativa: rimangono ben visibili a grandezza standard
                        dotRadius = 6.0;
                        glyphSize = 4.0;
                        labelFontSize = '8.5px';
                        labelFontWeight = '500';
                        labelFillColor = '#13100D';
                      }
                    } else {
                      // Musei appartenenti ad altre aree argomentative:
                      // Rimangono della stessa grandezza (8.5px, 6px dot), ma sbiadiscono (segnalini e nomi)
                      groupOpacity = 0.18;
                      dotRadius = 6.0;
                      glyphSize = 4.0;
                      labelFontSize = '8.5px';
                      labelFontWeight = 'normal';
                      labelFillColor = '#9D9D9C';
                    }
                  } else if (activeAreaId) {
                    const inArea = mus.areaId === activeAreaId;
                    groupOpacity = inArea ? 1 : 0.22;
                    labelFontSize = '8.5px';
                    labelFontWeight = inArea ? 'bold' : 'normal';
                    labelFillColor = inArea ? '#13100D' : '#9D9D9C';
                  } else if (activeCategoryId) {
                    const inCategory = mus.categoryIds.includes(activeCategoryId);
                    groupOpacity = inCategory ? 1 : 0.22;
                    labelFontSize = '8.5px';
                    labelFontWeight = inCategory ? 'bold' : 'normal';
                    labelFillColor = inCategory ? '#13100D' : '#9D9D9C';
                  } else if (hasLegendFilter) {
                    groupOpacity = matchesLegendFilter ? 1 : 0.12;
                    labelFontSize = '8.5px';
                    labelFontWeight = matchesLegendFilter ? 'bold' : 'normal';
                    labelFillColor = matchesLegendFilter ? '#13100D' : '#9D9D9C';
                  } else {
                    groupOpacity = 1;
                    labelFontSize = '8.5px';
                    labelFontWeight = 'normal';
                    labelFillColor = '#13100D';
                  }

                  if (hasLegendFilter && !matchesLegendFilter) {
                    groupOpacity = Math.min(groupOpacity, 0.12);
                  }

                  return (
                    <g
                      key={mus.id}
                      className="cursor-pointer group transition-opacity duration-200"
                      opacity={groupOpacity}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMuseum(mus);
                      }}
                      onMouseEnter={(e) => {
                        setHover({
                          type: 'museum',
                          museumId: mus.id,
                          areaId: mus.areaId,
                          clientX: e.clientX,
                          clientY: e.clientY,
                          data: mus
                        });
                      }}
                      onMouseLeave={() => setHover(prev => ({ ...prev, type: null }))}
                    >
                      {/* Invisible hit area covering dot, bubble and label */}
                      <circle
                        cx={mItem.x}
                        cy={mItem.y}
                        r={Math.max(18, bubbleRadius + 4)}
                        fill="transparent"
                      />

                      {/* 1. Cerchio Laboratori: SENZA TRACCIA, grigio chiaro (#DADADA) con opacità, proporzionale a workshopCount */}
                      {hasWorkshops && (
                        <circle
                          cx={mItem.x}
                          cy={mItem.y}
                          r={isDirectFocus ? Math.max(bubbleRadius * 1.35, bubbleRadius + 6) : bubbleRadius}
                          fill="#DADADA"
                          fillOpacity={isDirectFocus ? 0.70 : 0.40}
                          stroke="none"
                          className="transition-all duration-200"
                        />
                      )}

                      {/* 2. Cerchio Identificativo Museo: NERO (#13100D), SENZA ALCUNA TRACCIA (stroke="none"), ingrandito se selezionato */}
                      <circle
                        cx={mItem.x}
                        cy={mItem.y}
                        r={dotRadius}
                        fill="#13100D"
                        stroke="none"
                        className="transition-all duration-150"
                      />

                      {/* 3. Forma Semiotica Interna: Posizionata al centro del cerchio nero, ingrandita se selezionato */}
                      <MuseumGlyph
                        cx={mItem.x}
                        cy={mItem.y}
                        size={glyphSize}
                        educationalClass={mus.educationalClass}
                        geographicArea={mus.geographicArea}
                        targetAudience={mus.targetAudience}
                      />

                      {/* TARGHETTA RADIALE DEL NOME DEL MUSEO (SENZA TRATTINO E SENZA CORNICE, IN FONT CAMBRIA) */}
                      <g transform={`translate(${mItem.labelPos.x}, ${mItem.labelPos.y}) rotate(${mItem.labelAngle})`}>
                        <text
                          x={mItem.textAnchor === 'end' ? -4 : 4}
                          y={0}
                          textAnchor={mItem.textAnchor}
                          alignmentBaseline="middle"
                          dominantBaseline="central"
                          style={{
                            fontFamily: "Cambria, Georgia, 'Times New Roman', serif",
                            fontSize: labelFontSize,
                            fontWeight: labelFontWeight,
                            fill: labelFillColor
                          }}
                          className="select-none transition-all duration-150"
                        >
                          {mus.name}
                        </text>
                      </g>
                    </g>
                  );
                });
              })()}
            </g>
          )}

          {/* ========================================================================= */}
          {/* CATEGORIE A DESTRA: SCALA METRICA LEGGERA + BARRE DA DIETRO + PALLINI PIENI */}
          {/* ========================================================================= */}
          <g className="categories-barchart-group">
            
            {/* 1. SCALA METRICA: LINEE VERTICALI CONTINUE E PIÙ FINE, NUMERI GRIGI       */}
            {(() => {
              const maxVal = layout.categories[0]?.maxLinks || 70;
              const step = maxVal > 100 ? 25 : maxVal > 50 ? 20 : 10;
              const numTicks = Math.ceil(maxVal / step);
              const ticks = Array.from({ length: numTicks + 1 }, (_, i) => i * step);

              return (
                <g className="metric-scale-group" pointerEvents="none">
                  {/* Vertical continuous fine lines (#DADADA) equidistanti sopra e sotto */}
                  {ticks.map(val => {
                    const xPos = layout.baseCatX + (val / maxVal) * layout.maxBarWidth;
                    const tickDist = 32; // Stessa distanza sia sopra che sotto (32px)
                    return (
                      <g key={`metric-tick-${val}`}>
                        <line
                          x1={xPos}
                          y1={layout.catYStart - tickDist}
                          x2={xPos}
                          y2={layout.catYEnd + tickDist}
                          stroke="#DADADA"
                          strokeWidth="0.75"
                          opacity="1"
                        />
                        {/* Numeri della scala metrica in grigio (#9D9D9C) allontanati sotto */}
                        <text
                          x={xPos}
                          y={layout.catYEnd + tickDist + 16}
                          textAnchor="middle"
                          fill="#9D9D9C"
                          style={{
                            fontFamily: "Calibri, Candara, sans-serif",
                            fontSize: '11px',
                            fontWeight: 'normal'
                          }}
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })()}

            {/* 2. LE 5 CATEGORIE: BARRE ORIZZONTALI, PALLINI E NOMI COMPLETAMENTE CLICCABILI CON SELEZIONE BLOCCATA */}
            {layout.categories.map(cItem => {
              const cat = cItem.category;
              const active = isCategoryActive(cat.id);
              const isSelected = selectedCategoryId === cat.id;
              const isHovered = hover.type === 'category' && hover.categoryId === cat.id;

              const hasActiveCategory = Boolean(activeCategoryId);
              const isThisCategoryActive = activeCategoryId === cat.id;

              const dotRadius = 8.5;
              const dotFillColor = hasActiveCategory
                ? isThisCategoryActive
                  ? '#13100D'
                  : '#DADADA'
                : '#13100D';

              const barWidth = Math.max(14, cItem.barWidth);
              const strokeWidth = isSelected || isHovered ? 2.4 : 2.0;
              const strokeColor = active ? '#13100D' : '#9D9D9C';

              return (
                <g
                  key={`cat-interactive-${cat.id}`}
                  className="cursor-pointer group"
                  transform={`translate(${cItem.x}, ${cItem.y})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(isSelected ? null : cat);
                  }}
                  onMouseEnter={(e) => {
                    setHover({
                      type: 'category',
                      categoryId: cat.id,
                      clientX: e.clientX,
                      clientY: e.clientY,
                      data: cItem
                    });
                  }}
                  onMouseLeave={() => setHover(prev => ({ ...prev, type: null }))}
                >
                  {/* Area invisibile ampia per click e hover comodo e affidabile */}
                  <rect
                    x={-24}
                    y={-22}
                    width={layout.maxBarWidth + 220}
                    height={44}
                    fill="transparent"
                  />

                  {/* Category Data Bar: spessore dimezzato alla metà (2.0px) */}
                  {(() => {
                    switch (cat.linePattern) {
                      case 'solid':
                        return (
                          <line
                            x1={0}
                            y1={0}
                            x2={barWidth}
                            y2={0}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            className="transition-all duration-300"
                          />
                        );
                      case 'dashed':
                        return (
                          <line
                            x1={0}
                            y1={0}
                            x2={barWidth}
                            y2={0}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeDasharray="5 7"
                            strokeLinecap="round"
                            className="transition-all duration-300"
                          />
                        );
                      case 'dotted':
                        return (
                          <line
                            x1={0}
                            y1={0}
                            x2={barWidth}
                            y2={0}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeDasharray="0.1 7"
                            strokeLinecap="round"
                            className="transition-all duration-300"
                          />
                        );
                      case 'diagonal': {
                        const step = 8.5;
                        const count = Math.max(2, Math.floor(barWidth / step));
                        const d = Array.from({ length: count }, (_, k) => {
                          const sx = 4 + k * step;
                          return `M ${(sx - 1.4).toFixed(1)} 1.4 L ${(sx + 1.4).toFixed(1)} -1.4`;
                        }).join(' ');

                        return (
                          <path
                            d={d}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            opacity={active ? 1 : 0.6}
                            className="transition-all duration-300"
                          />
                        );
                      }
                      case 'dash-dot':
                      default:
                        return (
                          <line
                            x1={0}
                            y1={0}
                            x2={barWidth}
                            y2={0}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeDasharray="5 7 0.1 7"
                            strokeLinecap="round"
                            className="transition-all duration-300"
                          />
                        );
                    }
                  })()}

                  {/* Pallino Categoria: 8.5px, senza traccia tratteggiata */}
                  <circle
                    cx={0}
                    cy={0}
                    r={dotRadius}
                    fill={dotFillColor}
                    stroke="none"
                    className="transition-colors duration-200"
                  />

                  {/* Category Name in corsivo/italico posto sopra la linea */}
                  <text
                    x={14}
                    y={-8}
                    textAnchor="start"
                    alignmentBaseline="baseline"
                    style={{
                      fontFamily: "Cambria, Georgia, 'Times New Roman', serif",
                      fontStyle: 'italic',
                      fontWeight: isSelected || isHovered ? 'bold' : 'normal',
                      fontSize: '12.5px',
                      fill: isSelected || isHovered ? '#13100D' : active ? '#13100D' : '#9D9D9C'
                    }}
                    className="transition-colors select-none"
                  >
                    {cat.name}
                  </text>
                </g>
              );
            })}
          </g>

        </g>
      </svg>
    </div>
  );
};
