/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { initialDataset } from './data/museumData';
import { Dataset, MacroArea, Category, Museum } from './types/museum';
import { ShellChordDiagram } from './components/ShellChordDiagram';
import { FixedSidebarLegend } from './components/FixedSidebarLegend';
import { FixedRightPanel } from './components/FixedRightPanel';
import { DatasetModal } from './components/DatasetModal';
import { RotateCcw, PanelLeftOpen } from 'lucide-react';

export default function App() {
  const [dataset, setDataset] = useState<Dataset>(initialDataset);
  const [viewMode, setViewMode] = useState<'macro' | 'museum'>('macro');
  const [showMuseumTicks] = useState<boolean>(true);

  // Apertura/Chiusura Legenda
  const [isLegendOpen, setIsLegendOpen] = useState<boolean>(true);

  // Selected (pinned) items
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedMuseumId, setSelectedMuseumId] = useState<string | null>(null);

  // Filtri interattivi da segnalini della Legenda
  const [filterEducationalClass, setFilterEducationalClass] = useState<string | null>(null);
  const [filterGeographicArea, setFilterGeographicArea] = useState<string | null>(null);
  const [filterTargetAudience, setFilterTargetAudience] = useState<string | null>(null);

  // Modals
  const [isDatasetModalOpen, setIsDatasetModalOpen] = useState<boolean>(false);

  // Selection handlers
  const handleSelectArea = (area: MacroArea | null) => {
    setSelectedAreaId(area ? area.id : null);
    setSelectedCategoryId(null);
    setSelectedMuseumId(null);
  };

  const handleSelectCategory = (cat: Category | null) => {
    setSelectedCategoryId(cat ? cat.id : null);
    setSelectedAreaId(null);
    setSelectedMuseumId(null);
  };

  const handleSelectMuseum = (mus: Museum | null) => {
    setSelectedMuseumId(mus ? mus.id : null);
    setSelectedCategoryId(null);
    if (mus) {
      setSelectedAreaId(mus.areaId);
    } else {
      setSelectedAreaId(null);
    }
  };

  // Toggle filtri segnalini
  const handleToggleEducationalClass = (cls: string) => {
    setFilterEducationalClass(prev => (prev === cls ? null : cls));
  };

  const handleToggleGeographicArea = (geo: string) => {
    setFilterGeographicArea(prev => (prev === geo ? null : geo));
  };

  const handleToggleTargetAudience = (aud: string) => {
    setFilterTargetAudience(prev => (prev === aud ? null : aud));
  };

  const handleResetSelection = () => {
    setSelectedAreaId(null);
    setSelectedCategoryId(null);
    setSelectedMuseumId(null);
    setFilterEducationalClass(null);
    setFilterGeographicArea(null);
    setFilterTargetAudience(null);
  };

  const hasAnyFilterOrSelection = Boolean(
    selectedAreaId ||
    selectedCategoryId ||
    selectedMuseumId ||
    filterEducationalClass ||
    filterGeographicArea ||
    filterTargetAudience
  );

  // Keyboard shortcut: reset selection and close modal with 'Escape'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        handleResetSelection();
        setIsDatasetModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-white text-[#13100D] flex overflow-hidden font-sans select-none antialiased">
      {/* 1. Lato Sinistro: Legenda Fissa (apribile/chiudibile) */}
      {isLegendOpen && (
        <FixedSidebarLegend
          dataset={dataset}
          viewMode={viewMode}
          onChangeViewMode={setViewMode}
          selectedAreaId={selectedAreaId}
          selectedCategoryId={selectedCategoryId}
          selectedMuseumId={selectedMuseumId}
          onSelectMuseum={handleSelectMuseum}
          onSelectArea={handleSelectArea}
          onSelectCategory={handleSelectCategory}
          onResetSelection={handleResetSelection}
          onToggleLegend={() => setIsLegendOpen(false)}
          filterEducationalClass={filterEducationalClass}
          filterGeographicArea={filterGeographicArea}
          filterTargetAudience={filterTargetAudience}
          onToggleEducationalClass={handleToggleEducationalClass}
          onToggleGeographicArea={handleToggleGeographicArea}
          onToggleTargetAudience={handleToggleTargetAudience}
        />
      )}

      {/* 2. Centro: Canvas del Diagramma a tutto schermo con titolo centrale e comandi zoom */}
      <main
        className="relative flex-1 h-full overflow-hidden bg-white"
        onClick={handleResetSelection}
      >
        {/* Controlli in alto a sinistra: Tasto Apri Legenda (se chiusa) + Switch Flussi/Musei + Tasto Reset */}
        <div className="absolute top-3.5 left-4 z-30 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {!isLegendOpen && (
            <button
              onClick={() => setIsLegendOpen(true)}
              className="px-3 py-1.5 rounded-lg border border-[#DADADA] bg-white text-[#13100D] hover:bg-[#DADADA]/30 hover:border-[#9D9D9C] text-[11px] font-medium flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              title="Apri legenda"
            >
              <PanelLeftOpen className="w-3.5 h-3.5" />
              <span>Legenda</span>
            </button>
          )}

          {/* Switch Flussi / Musei: Fuori dalla legenda accanto a Reset */}
          <div className="bg-white p-0.5 rounded-lg border border-[#DADADA] flex items-center shadow-2xs">
            <button
              onClick={() => setViewMode('macro')}
              className={`text-[11px] px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                viewMode === 'macro'
                  ? 'bg-[#13100D] text-white font-bold shadow-2xs'
                  : 'text-[#9D9D9C] hover:text-[#13100D] font-medium'
              }`}
            >
              Flussi
            </button>
            <button
              onClick={() => setViewMode('museum')}
              className={`text-[11px] px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                viewMode === 'museum'
                  ? 'bg-[#13100D] text-white font-bold shadow-2xs'
                  : 'text-[#9D9D9C] hover:text-[#13100D] font-medium'
              }`}
            >
              Musei
            </button>
          </div>

          {/* Tasto Reset con estetica da tasto (senza dicitura esc) */}
          <button
            onClick={handleResetSelection}
            className={`px-3 py-1.5 rounded-lg border text-[11px] font-medium flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer ${
              hasAnyFilterOrSelection
                ? 'bg-[#13100D] border-[#13100D] text-white hover:bg-black shadow-xs'
                : 'bg-white border-[#DADADA] text-[#13100D] hover:bg-[#DADADA]/30 hover:border-[#9D9D9C]'
            }`}
            title="Azzera selezione e filtri"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        <ShellChordDiagram
          dataset={dataset}
          viewMode={viewMode}
          selectedAreaId={selectedAreaId}
          selectedCategoryId={selectedCategoryId}
          selectedMuseumId={selectedMuseumId}
          onSelectArea={handleSelectArea}
          onSelectCategory={handleSelectCategory}
          onSelectMuseum={handleSelectMuseum}
          onResetSelection={handleResetSelection}
          showMuseumTicks={showMuseumTicks}
          filterEducationalClass={filterEducationalClass}
          filterGeographicArea={filterGeographicArea}
          filterTargetAudience={filterTargetAudience}
        />
      </main>

      {/* 3. Lato Destro: Sezione Fissa (w-80), tesi e descrizione della mappatura che si trasforma in scheda dettagli */}
      <FixedRightPanel
        dataset={dataset}
        selectedAreaId={selectedAreaId}
        selectedCategoryId={selectedCategoryId}
        selectedMuseumId={selectedMuseumId}
        onSelectMuseum={handleSelectMuseum}
        onSelectArea={handleSelectArea}
        onSelectCategory={handleSelectCategory}
        onResetSelection={handleResetSelection}
        onOpenDatasetModal={() => setIsDatasetModalOpen(true)}
      />

      {/* Modal Dataset Tabellare */}
      <DatasetModal
        isOpen={isDatasetModalOpen}
        onClose={() => setIsDatasetModalOpen(false)}
        dataset={dataset}
        onUpdateDataset={newDs => {
          setDataset(newDs);
          handleResetSelection();
        }}
        onSelectMuseum={handleSelectMuseum}
      />
    </div>
  );
}
