import React, { useState } from 'react';
import { Dataset, MacroArea, Category, Museum } from '../types/museum';
import { MuseumGlyph } from './MuseumGlyph';
import { Database, Search, RotateCcw, Info, Sliders, ChevronDown } from 'lucide-react';

interface HeaderControlsProps {
  dataset: Dataset;
  viewMode: 'macro' | 'museum';
  onChangeViewMode: (mode: 'macro' | 'museum') => void;
  showMuseumTicks: boolean;
  onToggleMuseumTicks: () => void;
  selectedAreaId: string | null;
  selectedCategoryId: string | null;
  selectedMuseumId: string | null;
  onResetSelection: () => void;
  onOpenDatasetModal: () => void;
  onSelectMuseum: (m: Museum | null) => void;
  onSelectArea: (a: MacroArea | null) => void;
  onSelectCategory: (c: Category | null) => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  dataset,
  viewMode,
  onChangeViewMode,
  showMuseumTicks,
  onToggleMuseumTicks,
  selectedAreaId,
  selectedCategoryId,
  selectedMuseumId,
  onResetSelection,
  onOpenDatasetModal,
  onSelectMuseum,
  onSelectArea,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  const isFiltering = Boolean(selectedAreaId || selectedCategoryId || selectedMuseumId);

  // Search matching museums
  const searchResults = searchQuery.trim() === ''
    ? []
    : dataset.museums.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.city && m.city.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 8);

  const selectedArea = selectedAreaId ? dataset.macroAreas.find(a => a.id === selectedAreaId) : null;
  const selectedCat = selectedCategoryId ? dataset.categories.find(c => c.id === selectedCategoryId) : null;
  const selectedMus = selectedMuseumId ? dataset.museums.find(m => m.id === selectedMuseumId) : null;

  return (
    <header className="relative z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 select-none text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Title and Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-md">
            {/* Shell Fan Icon SVG */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21a9 9 0 0 1-9-9c0-4.97 4.03-9 9-9s9 4.03 9 9a9 9 0 0 1-9 9z" strokeOpacity="0.3" />
              <path d="M12 21 C12 12, 5 7, 5 7" />
              <path d="M12 21 C12 12, 8 4, 8 4" />
              <path d="M12 21 C12 10, 12 3, 12 3" />
              <path d="M12 21 C12 12, 16 4, 16 4" />
              <path d="M12 21 C12 12, 19 7, 19 7" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 tracking-wide">
                DIAGRAMMA A CONCHIGLIA
              </h1>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-300 font-semibold">
                Arco 250° · D3.js
              </span>
            </div>
            <p className="text-xs text-slate-500">
              11 Sezioni Macro &rarr; {dataset.museums.length} Musei (pallini neri) &rarr; 5 Punti Categoria (a destra)
            </p>
          </div>
        </div>

        {/* Center: Search & Filter indicators */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          {/* Museum Search */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cerca tra i 105 musei (es. Uffizi, MAXXI)..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchDropdown(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 text-xs"
              >
                &times;
              </button>
            )}

            {/* Dropdown Results */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden divide-y divide-slate-100 z-50 max-h-72 overflow-y-auto"
                onMouseLeave={() => setShowSearchDropdown(false)}
              >
                {searchResults.map(m => {
                  const area = dataset.macroAreas.find(a => a.id === m.areaId);
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        onSelectMuseum(m);
                        setSearchQuery('');
                        setShowSearchDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center justify-between text-xs transition-colors group"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-slate-900 group-hover:text-amber-700 truncate">
                          {m.name}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span
                            className="w-2 h-2 rounded-full inline-block shrink-0"
                            style={{ backgroundColor: area?.color || '#888' }}
                          />
                          <span>{area?.shortName || area?.name}</span>
                          {m.city && <span>· {m.city}</span>}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {m.categoryIds.length} cat.
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-2">
          
          {/* Active filter badge & reset */}
          {isFiltering && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 animate-fadeIn">
              <span className="max-w-[130px] truncate font-semibold">
                {selectedMus?.name || selectedArea?.name || selectedCat?.name}
              </span>
              <button
                onClick={onResetSelection}
                className="p-1 hover:bg-amber-100 rounded transition-colors text-amber-800"
                title="Azzera selezione"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* View Mode Toggle: Macro vs Museum */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => onChangeViewMode('macro')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'macro'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Visualizza i flussi raggruppati per Macro Aree"
            >
              Vista Macro
            </button>
            <button
              onClick={() => onChangeViewMode('museum')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'museum'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Visualizza le singole corde dei 105 musei"
            >
              105 Musei
            </button>
          </div>

          {/* Museum Ticks Switch */}
          <button
            onClick={onToggleMuseumTicks}
            className={`p-2 rounded-xl border text-xs transition-colors flex items-center gap-1.5 ${
              showMuseumTicks
                ? 'bg-slate-100 border-slate-300 text-slate-900 font-semibold'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900'
            }`}
            title="Mostra/Nascondi pallini 105 musei sull'arco"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Pallini Musei</span>
          </button>

          {/* Legend toggle */}
          <button
            onClick={() => setShowLegend(!showLegend)}
            className={`p-2 rounded-xl border text-xs transition-colors flex items-center gap-1 ${
              showLegend
                ? 'bg-slate-100 border-slate-300 text-slate-900'
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title="Legenda Categorie e Aree"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Legenda</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showLegend ? 'rotate-180' : ''}`} />
          </button>

          {/* Dataset Manager Modal Button */}
          <button
            onClick={onOpenDatasetModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            title="Gestisci o incolla il tuo dataset definitivo"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Dataset</span>
          </button>
        </div>
      </div>

      {/* Expandable Legend Bar */}
      {showLegend && (
        <div className="mt-3 pt-3 border-t border-slate-200 max-w-7xl mx-auto flex flex-wrap gap-4 justify-between items-center text-xs animate-fadeIn">
          {/* Categories Legend */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
              I 5 Punti Categoria (a destra):
            </span>
            {dataset.categories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(selectedCategoryId === cat.id ? null : cat)}
                className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border text-[11px] transition-all ${
                  selectedCategoryId === cat.id
                    ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
                title={`${cat.name} (${cat.linePatternLabel})`}
              >
                {/* Visual Line Style Preview Icon */}
                <svg className="w-5 h-2.5 overflow-visible shrink-0" viewBox="0 0 20 6">
                  {cat.linePattern === 'solid' && (
                    <line x1="1.5" y1="3" x2="18.5" y2="3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  )}
                  {cat.linePattern === 'dashed' && (
                    <line x1="1.5" y1="3" x2="18.5" y2="3" stroke="currentColor" strokeWidth="2.4" strokeDasharray="3.5 3.5" strokeLinecap="round" />
                  )}
                  {cat.linePattern === 'dotted' && (
                    <line x1="1.5" y1="3" x2="18.5" y2="3" stroke="currentColor" strokeWidth="2.4" strokeDasharray="0.1 4" strokeLinecap="round" />
                  )}
                  {cat.linePattern === 'diagonal' && (
                    <g>
                      <line x1="2" y1="5.2" x2="5.5" y2="0.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="7.5" y1="5.2" x2="11" y2="0.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="13" y1="5.2" x2="16.5" y2="0.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </g>
                  )}
                  {cat.linePattern === 'dash-dot' && (
                    <line x1="1.5" y1="3" x2="18.5" y2="3" stroke="currentColor" strokeWidth="2.4" strokeDasharray="3.5 3.5 0.1 3.5" strokeLinecap="round" />
                  )}
                </svg>
                <span>P{idx + 1}: {cat.shortName || cat.name}</span>
              </button>
            ))}
          </div>

          {/* Macro Areas Legend */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
              11 Sezioni dell&apos;Arco (250°):
            </span>
            {dataset.macroAreas.map(area => (
              <button
                key={area.id}
                onClick={() => onSelectArea(selectedAreaId === area.id ? null : area)}
                className={`p-1 rounded-md transition-all ${
                  selectedAreaId === area.id ? 'ring-2 ring-slate-900 scale-110' : 'hover:scale-110 opacity-80 hover:opacity-100'
                }`}
                title={area.name}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full block border transition-colors ${
                    selectedAreaId === area.id
                      ? 'bg-slate-800 border-slate-900'
                      : 'bg-slate-300 border-slate-400 hover:bg-slate-400'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Segnalini Musei: 3 Dimensioni Semiotiche (Forma, Colore, Segno) */}
          <div className="w-full pt-2.5 mt-1 border-t border-slate-200/80 flex flex-wrap gap-x-6 gap-y-2 items-center text-[11px] text-slate-700">
            {/* 1. Forma */}
            <div className="flex items-center gap-2">
              <span className="font-mono uppercase font-bold text-slate-500 text-[10px]">Classe Didattica (Forma):</span>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3 h-3 overflow-visible" viewBox="0 0 10 10">
                    <MuseumGlyph cx={5} cy={5} size={4} educationalClass="progettati_educare" geographicArea="centro" targetAudience="tutti" />
                  </svg>
                  <span>Educare</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3 h-3 overflow-visible" viewBox="0 0 10 10">
                    <MuseumGlyph cx={5} cy={5} size={4} educationalClass="percorsi_progettati" geographicArea="centro" targetAudience="tutti" />
                  </svg>
                  <span>Percorsi</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3 h-3 overflow-visible" viewBox="0 0 10 10">
                    <MuseumGlyph cx={5} cy={5} size={4} educationalClass="didattica_informativa" geographicArea="centro" targetAudience="tutti" />
                  </svg>
                  <span>Informativa</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3 h-3 overflow-visible" viewBox="0 0 10 10">
                    <MuseumGlyph cx={5} cy={5} size={4} educationalClass="senza_progetto" geographicArea="centro" targetAudience="tutti" />
                  </svg>
                  <span>Senza progetto</span>
                </span>
              </div>
            </div>

            {/* 2. Colore */}
            <div className="flex items-center gap-2">
              <span className="font-mono uppercase font-bold text-slate-500 text-[10px]">Area Geografica (Colore):</span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-red-500 inline-block" />
                  <span>Nord</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-blue-500 inline-block" />
                  <span>Centro</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-400 inline-block" />
                  <span>Sud & Isole</span>
                </span>
              </div>
            </div>

            {/* 3. Utenza */}
            <div className="flex items-center gap-2">
              <span className="font-mono uppercase font-bold text-slate-500 text-[10px]">Classe Utenza (Segno):</span>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3 h-3 overflow-visible" viewBox="0 0 10 10">
                    <MuseumGlyph cx={5} cy={5} size={4} educationalClass="didattica_informativa" geographicArea="centro" targetAudience="tutti" />
                  </svg>
                  <span>Tutti</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3 h-3 overflow-visible" viewBox="0 0 10 10">
                    <MuseumGlyph cx={5} cy={5} size={4} educationalClass="didattica_informativa" geographicArea="centro" targetAudience="speciale" />
                  </svg>
                  <span>Speciale</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3 h-3 overflow-visible" viewBox="0 0 10 10">
                    <MuseumGlyph cx={5} cy={5} size={4} educationalClass="didattica_informativa" geographicArea="centro" targetAudience="bambini" />
                  </svg>
                  <span>Bambini</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3 h-3 overflow-visible" viewBox="0 0 10 10">
                    <MuseumGlyph cx={5} cy={5} size={4} educationalClass="didattica_informativa" geographicArea="centro" targetAudience="adulti" />
                  </svg>
                  <span>Adulti</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
