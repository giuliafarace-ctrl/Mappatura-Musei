import React from 'react';
import { Dataset, MacroArea, Category, Museum } from '../types/museum';
import { RotateCcw, MapPin, ExternalLink } from 'lucide-react';
import { MuseumGlyph, EDUCATIONAL_CLASS_LABELS, TARGET_AUDIENCE_LABELS, GEOGRAPHIC_AREA_LABELS } from './MuseumGlyph';

interface FixedRightPanelProps {
  dataset: Dataset;
  selectedAreaId: string | null;
  selectedCategoryId: string | null;
  selectedMuseumId: string | null;
  onSelectMuseum: (m: Museum | null) => void;
  onSelectArea: (a: MacroArea | null) => void;
  onSelectCategory: (c: Category | null) => void;
  onResetSelection: () => void;
  onOpenDatasetModal: () => void;
}

export const FixedRightPanel: React.FC<FixedRightPanelProps> = ({
  dataset,
  selectedAreaId,
  selectedCategoryId,
  selectedMuseumId,
  onSelectMuseum,
  onSelectArea,
  onSelectCategory,
  onResetSelection,
  onOpenDatasetModal,
}) => {
  const hasSelection = Boolean(selectedAreaId || selectedCategoryId || selectedMuseumId);

  const selectedArea = selectedAreaId ? dataset.macroAreas.find(a => a.id === selectedAreaId) : null;
  const selectedCat = selectedCategoryId ? dataset.categories.find(c => c.id === selectedCategoryId) : null;
  const selectedMus = selectedMuseumId ? dataset.museums.find(m => m.id === selectedMuseumId) : null;

  const areaMuseums = selectedArea ? dataset.museums.filter(m => m.areaId === selectedArea.id) : [];
  const categoryMuseums = selectedCat ? dataset.museums.filter(m => m.categoryIds.includes(selectedCat.id)) : [];

  return (
    <aside
      aria-label="Pannello Dati e Dettagli"
      className="w-80 shrink-0 h-full bg-white border-l border-[#DADADA] flex flex-col z-20 text-[#13100D] overflow-hidden select-none"
    >
      {/* Header fisso del pannello destro: senza contorni pesanti */}
      <div className="pt-4 px-5 pb-3 bg-white flex items-start justify-between shrink-0 border-b border-[#DADADA]/50">
        <div>
          {hasSelection ? (
            <>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9D9D9C] block">
                Scheda Dettaglio
              </span>
              <h2
                style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
                className="text-sm font-bold text-[#13100D] truncate max-w-[190px]"
              >
                {selectedMus
                  ? selectedMus.name
                  : selectedArea
                  ? selectedArea.name
                  : selectedCat?.name}
              </h2>
            </>
          ) : (
            <h1
              style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
              className="text-[14.5px] font-bold text-[#13100D] leading-snug"
            >
              Mappatura del Contesto Educativo Museale Italiano
            </h1>
          )}
        </div>

        {hasSelection && (
          <button
            onClick={onResetSelection}
            className="text-[11px] font-medium text-[#9D9D9C] hover:text-[#13100D] transition-colors flex items-center gap-1.5 cursor-pointer pt-0.5"
            title="Chiudi scheda e torna alla panoramica"
          >
            <RotateCcw className="w-3 h-3 text-[#13100D]" />
            <span>Chiudi</span>
          </button>
        )}
      </div>

      {/* Contenuto scorrevole: Editoriale puro, senza estetica a tasti/schede con bordi e divisioni */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-6 text-xs">
        {!hasSelection ? (
          /* ========================================================================= */
          /* STATO 1: TESI E RICERCA, DESCRIZIONE DELLA MAPPATURA E DATI EDITORIALI    */
          /* ========================================================================= */
          <div className="space-y-6">
            {/* Descrizione della ricerca */}
            <div className="space-y-3 text-[11.5px] leading-relaxed text-[#13100D]">
              <p>
                Questa mappatura nasce nell'ambito di una ricerca dottorale in design, dal titolo &ldquo;Design &amp; Divulgazione Esperienziale. Strumenti e metodi per il trasferimento del patrimonio museale all’interno della scuola italiana&rdquo;. Una prima esigenza è stata quella di analizzare il panorama museale italiano, spesso frammentato e disomogeneo, e di restituire una visione organica e comparabile dell'offerta educativa dei musei italiani.
              </p>
              <p>
                L'identificazione del campione analizzato è stata basata in proporzione alla distribuzione geografica nazionale dei musei, scelti tra i musei principali per ogni regione, individuando complessivamente 105 musei, corrispondenti a circa il 2,5% dei musei italiani.
              </p>
            </div>

            {/* Tesi e Ricerca (senza icone) */}
            <div className="space-y-4 pt-1">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9D9D9C] font-bold block mb-1">
                  TESI DI RICERCA
                </span>
                <p className="text-[#13100D] font-medium text-[11.5px] leading-snug">
                  Design &amp; Divulgazione Esperienziale. Strumenti e metodi per il trasferimento del patrimonio museale all’interno della scuola italiana
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9D9D9C] font-bold block mb-0.5">
                  DOTTORANDA
                </span>
                <div className="text-[#13100D] font-medium text-xs leading-snug">
                  Giulia Farace
                </div>
                <div className="text-[#9D9D9C] text-[11px]">
                  XXXIX Ciclo
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9D9D9C] font-bold block mb-0.5">
                  TOUTOR
                </span>
                <div className="text-[#13100D] font-medium text-xs leading-snug">
                  Sabrina Lucibello
                </div>
                <div className="text-[#9D9D9C] text-[11px] leading-snug">
                  Professoressa Ordinaria di Design, PhD in Industrial Design
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9D9D9C] font-bold block mb-0.5">
                  ISTITUZIONE
                </span>
                <div className="text-[#13100D] font-medium text-xs leading-snug">
                  Dipartimento di Pianificazione, Design e Tecnologie dell'Architettura - PDTA
                </div>
                <div className="text-[#9D9D9C] text-[11px] leading-snug">
                  Facoltà di Architettura
                </div>
                <div className="text-[#9D9D9C] text-[11px] leading-snug">
                  Sapienza Università di Roma
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* STATO 2: SCHEDA TRASFORMATA CON I DETTAGLI DELL'ELEMENTO CLICCATO         */
          /* ========================================================================= */
          <div className="space-y-5">
            
            {/* SELEZIONE MUSEO */}
            {selectedMus && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#9D9D9C] font-semibold block">
                    Scheda Museo ({selectedMus.id})
                  </span>
                  <h3
                    style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
                    className="text-base font-bold text-[#13100D] leading-tight"
                  >
                    {selectedMus.name}
                  </h3>
                  {selectedMus.city && (
                    <p className="text-[11px] text-[#9D9D9C] flex items-center gap-1 pt-0.5">
                      <MapPin className="w-3 h-3 text-[#13100D] shrink-0" />
                      <span style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}>
                        {selectedMus.city} {selectedMus.region ? `(${selectedMus.region})` : ''}
                      </span>
                    </p>
                  )}
                </div>

                {/* Segnalino Visivo con Dettaglio Semiotico: senza card/box */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                      <svg className="w-12 h-12 overflow-visible" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="18" fill="#DADADA" fillOpacity="0.55" stroke="none" />
                        <circle cx="20" cy="20" r="9" fill="#13100D" stroke="none" />
                        <MuseumGlyph
                          cx={20}
                          cy={20}
                          size={6.2}
                          educationalClass={selectedMus.educationalClass}
                          geographicArea={selectedMus.geographicArea}
                          targetAudience={selectedMus.targetAudience}
                        />
                      </svg>
                    </div>

                    <div className="text-[11px] leading-tight space-y-1">
                      <span className="text-[#13100D] font-bold block">Profilo Semiotico</span>
                      <span
                        style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
                        className="text-[#13100D] block font-medium"
                      >
                        Area: {selectedMus.geographicArea ? GEOGRAPHIC_AREA_LABELS[selectedMus.geographicArea] : 'Centro'}
                      </span>
                      <span className="text-[#9D9D9C] block">
                        Utenza: {selectedMus.targetAudience ? TARGET_AUDIENCE_LABELS[selectedMus.targetAudience] : 'Tutti'}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] space-y-1.5 pt-1">
                    <div className="flex justify-between">
                      <span className="text-[#9D9D9C]">Laboratori offerti:</span>
                      <strong className="text-[#13100D]">{selectedMus.workshopCount ?? 0}</strong>
                    </div>
                    {selectedMus.childPopulation !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-[#9D9D9C]">Popolazione infantile comune:</span>
                        <strong className="text-[#13100D]">{selectedMus.childPopulation.toLocaleString('it-IT')} bambini</strong>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#9D9D9C]">Classe didattica:</span>
                      <strong className="text-[#13100D] text-right truncate max-w-[160px]">
                        {selectedMus.educationalClass ? EDUCATIONAL_CLASS_LABELS[selectedMus.educationalClass] : 'Informativa'}
                      </strong>
                    </div>
                    {selectedMus.website && (
                      <div className="pt-1 border-t border-[#DADADA]/40 flex justify-between items-center">
                        <span className="text-[#9D9D9C]">Sito web ufficiale:</span>
                        <a
                          href={selectedMus.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#13100D] font-bold hover:underline flex items-center gap-1 text-[10.5px]"
                        >
                          <span>Visita sito</span>
                          <ExternalLink className="w-2.5 h-2.5 text-[#9D9D9C]" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Classe Argomentativa di Appartenenza */}
                {selectedMus.areaId && (() => {
                  const parentArea = dataset.macroAreas.find(a => a.id === selectedMus.areaId);
                  if (!parentArea) return null;
                  return (
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] text-[#9D9D9C] uppercase font-bold tracking-wider block">
                        Classe Argomentativa del museo
                      </span>
                      <button
                        onClick={() => onSelectArea(parentArea)}
                        className="w-full text-left py-1 text-[11.5px] transition-colors flex items-center justify-between text-[#13100D] hover:opacity-75 cursor-pointer"
                      >
                        <span
                          style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
                          className="font-bold italic"
                        >
                          {parentArea.name}
                        </span>
                        <span className="text-[10px] text-[#9D9D9C]">Esplora classe →</span>
                      </button>
                    </div>
                  );
                })()}

                {/* Approcci Didattici Collegati */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] text-[#9D9D9C] uppercase font-bold tracking-wider block">
                    Approcci Didattici Adottati ({selectedMus.categoryIds.length})
                  </span>
                  <div className="space-y-1">
                    {selectedMus.categoryIds.map(catId => {
                      const cat = dataset.categories.find(c => c.id === catId);
                      if (!cat) return null;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => onSelectCategory(cat)}
                          className="w-full text-left py-1 transition-colors flex items-center justify-between text-[#13100D] hover:opacity-75 cursor-pointer"
                        >
                          <span className="text-[11px] font-medium">
                            {cat.name}
                          </span>
                          <span className="text-[10px] text-[#9D9D9C]">Visualizza →</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* SELEZIONE CLASSE ARGOMENTATIVA */}
            {!selectedMus && selectedArea && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#9D9D9C] font-semibold block">
                    Classe Argomentativa (Arco 250°)
                  </span>
                  <h3
                    style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
                    className="text-base font-bold text-[#13100D] leading-tight italic"
                  >
                    {selectedArea.name}
                  </h3>
                  <p className="text-[11px] text-[#13100D] leading-relaxed pt-1">
                    {selectedArea.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-[#9D9D9C]">Musei appartenenti alla classe:</span>
                  <strong className="text-sm font-bold text-[#13100D]">{areaMuseums.length}</strong>
                </div>

                {/* Elenco musei dell'area con font Cambria */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] text-[#9D9D9C] uppercase font-bold tracking-wider block">
                    Musei Campione ({areaMuseums.length})
                  </span>
                  <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                    {areaMuseums.map(mus => (
                      <button
                        key={mus.id}
                        onClick={() => onSelectMuseum(mus)}
                        className="w-full text-left py-1 transition-colors flex items-center justify-between text-[#13100D] hover:opacity-75 cursor-pointer"
                      >
                        <span
                          style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
                          className="text-[11px] font-medium truncate mr-1.5"
                        >
                          {mus.name}
                        </span>
                        <span className="text-[10px] text-[#9D9D9C] shrink-0">
                          {mus.city}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SELEZIONE APPROCCIO DIDATTICO */}
            {!selectedMus && !selectedArea && selectedCat && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#9D9D9C] font-semibold block">
                    Approccio Didattico
                  </span>
                  <h3
                    style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
                    className="text-base font-bold text-[#13100D] leading-tight"
                  >
                    {selectedCat.name}
                  </h3>
                  <p className="text-[11px] text-[#13100D] leading-relaxed pt-1">
                    {selectedCat.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-[#9D9D9C]">Musei che adottano l'approccio:</span>
                  <strong className="text-sm font-bold text-[#13100D]">{categoryMuseums.length}</strong>
                </div>

                {/* Elenco musei che offrono questa didattica con font Cambria */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] text-[#9D9D9C] uppercase font-bold tracking-wider block">
                    Musei Collegati ({categoryMuseums.length})
                  </span>
                  <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                    {categoryMuseums.map(mus => (
                      <button
                        key={mus.id}
                        onClick={() => onSelectMuseum(mus)}
                        className="w-full text-left py-1 transition-colors flex items-center justify-between text-[#13100D] hover:opacity-75"
                      >
                        <span
                          style={{ fontFamily: "Cambria, Georgia, 'Times New Roman', serif" }}
                          className="text-[11px] font-medium truncate mr-1.5"
                        >
                          {mus.name}
                        </span>
                        <span className="text-[10px] text-[#9D9D9C] shrink-0">
                          {mus.city}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer del pannello destro: pulito, senza divisioni pesanti */}
      <div className="px-5 py-3 bg-white flex items-center justify-between text-[10.5px] text-[#9D9D9C] shrink-0 border-t border-[#DADADA]">
        <span>105 Musei · 5 Metodologie</span>
        <button
          onClick={onOpenDatasetModal}
          className="text-[#13100D] font-bold hover:underline"
        >
          Dataset →
        </button>
      </div>
    </aside>
  );
};
