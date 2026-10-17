import React, { useState } from 'react';
import { Dataset, MacroArea, Category, Museum } from '../types/museum';
import { MuseumGlyph } from './MuseumGlyph';
import { MapStructureDiagram } from './MapStructureDiagram';
import { Search, PanelLeftClose } from 'lucide-react';

interface FixedSidebarLegendProps {
  dataset: Dataset;
  viewMode: 'macro' | 'museum';
  onChangeViewMode: (mode: 'macro' | 'museum') => void;
  selectedAreaId: string | null;
  selectedCategoryId: string | null;
  selectedMuseumId: string | null;
  onSelectMuseum: (m: Museum | null) => void;
  onSelectArea: (a: MacroArea | null) => void;
  onSelectCategory: (c: Category | null) => void;
  onResetSelection?: () => void;
  onToggleLegend?: () => void;
  // Filtri interattivi per segnalini
  filterEducationalClass?: string | null;
  filterGeographicArea?: string | null;
  filterTargetAudience?: string | null;
  onToggleEducationalClass: (cls: string) => void;
  onToggleGeographicArea: (geo: string) => void;
  onToggleTargetAudience: (aud: string) => void;
}

export const FixedSidebarLegend: React.FC<FixedSidebarLegendProps> = ({
  dataset,
  viewMode,
  onChangeViewMode,
  selectedAreaId,
  selectedCategoryId,
  selectedMuseumId,
  onSelectMuseum,
  onSelectArea,
  onSelectCategory,
  onToggleLegend,
  filterEducationalClass,
  filterGeographicArea,
  filterTargetAudience,
  onToggleEducationalClass,
  onToggleGeographicArea,
  onToggleTargetAudience,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const isFiltering = Boolean(
    selectedAreaId ||
    selectedCategoryId ||
    selectedMuseumId ||
    filterEducationalClass ||
    filterGeographicArea ||
    filterTargetAudience
  );

  // Search matching museums
  const searchResults =
    searchQuery.trim() === ''
      ? []
      : dataset.museums
          .filter(
            m =>
              m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (m.city && m.city.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .slice(0, 6);

  return (
    <aside
      aria-label="Legenda"
      className="w-80 shrink-0 h-full bg-white border-r border-[#DADADA] flex flex-col z-20 text-[#13100D] overflow-hidden select-none transition-all duration-200"
    >
      {/* Top Header: Titolo "Legenda" a sinistra + Tasto Chiudi a destra */}
      <div className="pt-3.5 px-5 pb-3 bg-white space-y-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2
              style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
              className="text-base font-bold text-[#13100D]"
            >
              Legenda
            </h2>
            {isFiltering && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#13100D] animate-pulse" title="Filtro attivo" />
            )}
          </div>

          {/* Tasto per aprire/chiudere la legenda posizionato a destra */}
          {onToggleLegend && (
            <button
              onClick={onToggleLegend}
              className="p-1 rounded text-[#9D9D9C] hover:text-[#13100D] hover:bg-[#DADADA]/30 transition-colors cursor-pointer"
              title="Chiudi legenda"
              aria-label="Chiudi legenda"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Ricerca veloce con conteggio collegato al dataset */}
        <div className="relative pt-0.5">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9D9D9C]" />
          <input
            type="text"
            placeholder={`Cerca tra i ${dataset.museums.length} musei...`}
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            className="w-full pl-5 pr-5 py-1 text-[11px] bg-transparent border-b border-[#DADADA] text-[#13100D] placeholder-[#9D9D9C] focus:outline-none focus:border-[#13100D] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSearchDropdown(false);
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#9D9D9C] hover:text-[#13100D] text-xs cursor-pointer"
            >
              &times;
            </button>
          )}

          {/* Search Dropdown */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div
              className="absolute left-0 right-0 top-full mt-1 bg-white shadow-lg overflow-hidden py-1 z-50 max-h-56 overflow-y-auto"
              onMouseLeave={() => setShowSearchDropdown(false)}
            >
              {searchResults.map(m => (
                <button
                  key={m.id}
                  onClick={() => {
                    onSelectMuseum(m);
                    setShowSearchDropdown(false);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-2.5 py-1.5 hover:bg-[#DADADA]/20 text-[11px] flex items-center justify-between cursor-pointer"
                >
                  <span
                    style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
                    className="font-medium text-[#13100D] truncate mr-1.5"
                  >
                    {m.name}
                  </span>
                  <span className="text-[9.5px] text-[#9D9D9C] shrink-0">
                    {m.city || m.id}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Legend Body: Senza contorni o divisioni pesanti */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-6 text-xs">
        
        {/* ========================================================================= */}
        {/* SEZIONE 1: MUSEO                                                          */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <span
            style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
            className="text-[12.5px] uppercase font-bold text-[#9D9D9C] tracking-wider block"
          >
            Museo
          </span>

          {/* Classe Didattica: I segnalini sono filtri cliccabili */}
          <div className="space-y-2 pt-0.5">
            <span className="text-[10px] text-[#13100D] font-bold uppercase tracking-wider block">
              Classe Didattica
            </span>
            <div className="space-y-1 text-[11px]">
              {[
                { id: 'progettati_educare', label: 'Progettati per educare' },
                { id: 'percorsi_progettati', label: 'Percorsi progettati' },
                { id: 'didattica_informativa', label: 'Didattica informativa' },
                { id: 'senza_progetto', label: 'Senza progetto didattico' },
              ].map(item => {
                const isSelected = filterEducationalClass === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onToggleEducationalClass(item.id)}
                    className={`w-full text-left flex items-center justify-between py-1 px-1 rounded transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#DADADA]/40 font-bold text-[#13100D]'
                        : 'hover:bg-[#DADADA]/20 text-[#9D9D9C]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <svg className="w-4.5 h-4.5 overflow-visible shrink-0" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="7" fill="#13100D" />
                        <MuseumGlyph
                          cx={8}
                          cy={8}
                          size={4.6}
                          educationalClass={item.id as any}
                          fillColor="#FFFFFF"
                          targetAudience="tutti"
                        />
                      </svg>
                      <span
                        style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
                        className={`italic ${isSelected ? 'text-[#13100D] font-bold' : 'text-[#9D9D9C]'}`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#13100D]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Area Geografica: I segnalini sotto (colorati) sono filtri cliccabili */}
          <div className="space-y-2 pt-1">
            <span className="text-[10px] text-[#13100D] font-bold uppercase tracking-wider block">
              Area Geografica
            </span>
            <div className="flex items-center gap-2 text-[11px]">
              {/* Nord */}
              <button
                key="nord"
                onClick={() => onToggleGeographicArea('nord')}
                className={`flex items-center gap-1.5 py-1 px-1.5 rounded transition-colors cursor-pointer shrink-0 ${
                  filterGeographicArea === 'nord'
                    ? 'bg-[#DADADA]/40 font-bold text-[#13100D]'
                    : 'hover:bg-[#DADADA]/20 text-[#9D9D9C]'
                }`}
              >
                <svg className="w-4 h-4 overflow-visible shrink-0" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="7" fill="#13100D" />
                  <circle cx="8" cy="8" r="3.6" fill="#E6332A" />
                </svg>
                <span
                  style={{ fontFamily: "'Cambria', 'Cambria-Italic', 'Caladea', Georgia, serif" }}
                  className={`italic ${filterGeographicArea === 'nord' ? 'text-[#13100D] font-bold' : 'text-[#9D9D9C]'}`}
                >
                  Nord
                </span>
              </button>

              {/* Centro */}
              <button
                key="centro"
                onClick={() => onToggleGeographicArea('centro')}
                className={`flex items-center gap-1.5 py-1 px-1.5 rounded transition-colors cursor-pointer shrink-0 ${
                  filterGeographicArea === 'centro'
                    ? 'bg-[#DADADA]/40 font-bold text-[#13100D]'
                    : 'hover:bg-[#DADADA]/20 text-[#9D9D9C]'
                }`}
              >
                <svg className="w-4 h-4 overflow-visible shrink-0" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="7" fill="#13100D" />
                  <circle cx="8" cy="8" r="3.6" fill="#00A6BA" />
                </svg>
                <span
                  style={{ fontFamily: "'Cambria', 'Cambria-Italic', 'Caladea', Georgia, serif" }}
                  className={`italic ${filterGeographicArea === 'centro' ? 'text-[#13100D] font-bold' : 'text-[#9D9D9C]'}`}
                >
                  Centro
                </span>
              </button>

              {/* Sud e Isole */}
              <button
                key="sud_isole"
                onClick={() => onToggleGeographicArea('sud_isole')}
                className={`flex items-center gap-1.5 py-1 px-1.5 rounded transition-colors cursor-pointer shrink-0 ${
                  filterGeographicArea === 'sud_isole' || filterGeographicArea === 'sud'
                    ? 'bg-[#DADADA]/40 font-bold text-[#13100D]'
                    : 'hover:bg-[#DADADA]/20 text-[#9D9D9C]'
                }`}
              >
                <svg className="w-4 h-4 overflow-visible shrink-0" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="7" fill="#13100D" />
                  <circle cx="8" cy="8" r="3.6" fill="#F3D230" />
                </svg>
                <span
                  style={{ fontFamily: "'Cambria', 'Cambria-Italic', 'Caladea', Georgia, serif" }}
                  className={`italic whitespace-nowrap ${filterGeographicArea === 'sud_isole' || filterGeographicArea === 'sud' ? 'text-[#13100D] font-bold' : 'text-[#9D9D9C]'}`}
                >
                  Sud e Isole
                </span>
              </button>
            </div>
          </div>

          {/* Classe Utenza: I segnalini sono filtri cliccabili */}
          <div className="space-y-2 pt-1">
            <span className="text-[10px] text-[#13100D] font-bold uppercase tracking-wider block">
              Classe Utenza
            </span>
            <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-[11px]">
              {[
                { id: 'tutti', label: 'Tutti' },
                { id: 'speciale', label: 'Speciale' },
                { id: 'bambini', label: 'Bambini' },
                { id: 'adulti', label: 'Adulti' },
              ].map(item => {
                const isSelected = filterTargetAudience === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onToggleTargetAudience(item.id)}
                    className={`flex items-center justify-between py-1 px-1 rounded transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#DADADA]/40 font-bold text-[#13100D]'
                        : 'hover:bg-[#DADADA]/20 text-[#9D9D9C]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4.5 h-4.5 overflow-visible shrink-0" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="7" fill="#13100D" />
                        <MuseumGlyph
                          cx={8}
                          cy={8}
                          size={4.6}
                          educationalClass="didattica_informativa"
                          fillColor="#FFFFFF"
                          targetAudience={item.id as any}
                        />
                      </svg>
                      <span
                        style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
                        className={`italic ${isSelected ? 'text-[#13100D] font-bold' : 'text-[#9D9D9C]'}`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#13100D]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spiegazione dei laboratori sotto alla classe di utenza: */}
          {/* Descrizione posta sopra la rappresentazione, avvicinata al testo e con icone leggermente sovrapposte */}
          <div className="space-y-0.5 pt-0.5">
            <span className="text-[10px] text-[#13100D] font-bold uppercase tracking-wider block">
              Laboratori Didattici
            </span>
            <p
              style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
              className="text-[11px] italic text-[#9D9D9C] leading-snug"
            >
              L'area incrementa con l'aumentare delle attività offerte dal museo.
            </p>
            <div className="pt-0 pb-0">
              <svg className="w-28 h-10 overflow-visible" viewBox="0 0 100 36">
                {/* Segnalino 1: r=10 con icona base r=6.5 a cx=16, cy=18 */}
                <circle cx="16" cy="18" r="10" fill="#DADADA" fillOpacity="0.55" stroke="none" />
                <circle cx="16" cy="18" r="6.5" fill="#13100D" stroke="none" />

                {/* Segnalino 2: r=15 con icona base r=6.5 a cx=38, cy=18 (sovrapposto: 16+10=26 > 38-15=23) */}
                <circle cx="38" cy="18" r="15" fill="#DADADA" fillOpacity="0.55" stroke="none" />
                <circle cx="38" cy="18" r="6.5" fill="#13100D" stroke="none" />

                {/* Segnalino 3: r=20 con icona base r=6.5 a cx=66, cy=18 (sovrapposto: 38+15=53 > 66-20=46) */}
                <circle cx="66" cy="18" r="20" fill="#DADADA" fillOpacity="0.55" stroke="none" />
                <circle cx="66" cy="18" r="6.5" fill="#13100D" stroke="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SEZIONE 2: MAPPA                                                          */}
        {/* ========================================================================= */}
        <div className="space-y-3 pt-1">
          <span
            style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
            className="text-[12.5px] uppercase font-bold text-[#9D9D9C] tracking-wider block"
          >
            Mappa
          </span>

          {/* Rappresentazione grafica conforme alla struttura della mappa */}
          <MapStructureDiagram />

          {/* Sottosezione: Approcci Didattici - Distanziata dallo schema sopra senza linea di separazione */}
          <div className="space-y-1.5 pt-5">
            <span className="text-[10px] text-[#13100D] font-bold uppercase tracking-wider block">
              Approcci Didattici
            </span>
            <p
              style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
              className="text-[11px] italic text-[#9D9D9C] leading-snug"
            >
              grafico a barre sul grado di adozione di questi approcci didattici in Italia
            </p>

            <div className="space-y-0.5 pt-1">
              {dataset.categories.map(cat => {
                const isSelected = selectedCategoryId === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(isSelected ? null : cat)}
                    className={`w-full text-left flex items-center justify-between py-1 px-1 rounded transition-colors text-[11px] cursor-pointer ${
                      isSelected
                        ? 'bg-[#DADADA]/30 font-bold text-[#13100D]'
                        : 'hover:bg-[#DADADA]/20 hover:text-[#13100D]'
                    }`}
                    title={cat.description}
                  >
                    <div className="flex items-center gap-2.5 truncate mr-1.5">
                      {/* Visual Line Style Preview Icon */}
                      <svg className="w-6 h-3 overflow-visible shrink-0" viewBox="0 0 24 6">
                        {cat.linePattern === 'solid' && (
                          <line x1="1" y1="3" x2="23" y2="3" stroke="#13100D" strokeWidth="2.0" strokeLinecap="round" />
                        )}
                        {cat.linePattern === 'dashed' && (
                          <line x1="1" y1="3" x2="23" y2="3" stroke="#13100D" strokeWidth="2.0" strokeDasharray="4 3" strokeLinecap="round" />
                        )}
                        {cat.linePattern === 'dotted' && (
                          <line x1="1" y1="3" x2="23" y2="3" stroke="#13100D" strokeWidth="2.0" strokeDasharray="0.1 3.5" strokeLinecap="round" />
                        )}
                        {cat.linePattern === 'diagonal' && (
                          <g>
                            <line x1="1" y1="5.5" x2="4.5" y2="0.5" stroke="#13100D" strokeWidth="1.6" strokeLinecap="round" />
                            <line x1="6.5" y1="5.5" x2="10" y2="0.5" stroke="#13100D" strokeWidth="1.6" strokeLinecap="round" />
                            <line x1="12" y1="5.5" x2="15.5" y2="0.5" stroke="#13100D" strokeWidth="1.6" strokeLinecap="round" />
                            <line x1="17.5" y1="5.5" x2="21" y2="0.5" stroke="#13100D" strokeWidth="1.6" strokeLinecap="round" />
                          </g>
                        )}
                        {cat.linePattern === 'dash-dot' && (
                          <line x1="1" y1="3" x2="23" y2="3" stroke="#13100D" strokeWidth="2.0" strokeDasharray="4 3 0.1 3" strokeLinecap="round" />
                        )}
                      </svg>
                      <span
                        style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
                        className={`truncate italic ${isSelected ? 'text-[#13100D] font-bold' : 'text-[#9D9D9C]'}`}
                      >
                        {cat.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sottosezione: Classe Argomentativa */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] text-[#13100D] font-bold uppercase tracking-wider block">
              Classe Argomentativa
            </span>
            <p
              style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
              className="text-[11px] italic text-[#9D9D9C] leading-snug"
            >
              I musei sono ordinati in ogni segmento secondo il numero di bambini che ne hanno accesso diretto (numero di bambini per comune).
            </p>

            <div className="space-y-0.5 pt-1 pr-1">
              {dataset.macroAreas.map(area => {
                const isSelected = selectedAreaId === area.id;
                const count = dataset.museums.filter(m => m.areaId === area.id).length;

                return (
                  <button
                    key={area.id}
                    onClick={() => onSelectArea(isSelected ? null : area)}
                    className={`w-full text-left flex items-center justify-between py-1 px-1 rounded transition-colors text-[11px] cursor-pointer ${
                      isSelected
                        ? 'bg-[#DADADA]/30 text-[#13100D] font-bold'
                        : 'hover:bg-[#DADADA]/20 hover:text-[#13100D]'
                    }`}
                    title={area.name}
                  >
                    <span
                      style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
                      className={`truncate pr-1.5 italic ${isSelected ? 'text-[#13100D] font-bold' : 'text-[#9D9D9C]'}`}
                    >
                      {area.name}
                    </span>
                    <span className={`text-[10px] shrink-0 ${isSelected ? 'font-bold text-[#13100D]' : 'text-[#9D9D9C]'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
