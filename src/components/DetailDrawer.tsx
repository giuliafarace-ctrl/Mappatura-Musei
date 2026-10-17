import React from 'react';
import { Dataset, MacroArea, Category, Museum } from '../types/museum';
import { X, Sparkles, Building2, MapPin } from 'lucide-react';
import { MuseumGlyph, EDUCATIONAL_CLASS_LABELS, TARGET_AUDIENCE_LABELS, GEOGRAPHIC_AREA_LABELS } from './MuseumGlyph';

interface DetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: Dataset;
  selectedAreaId: string | null;
  selectedCategoryId: string | null;
  selectedMuseumId: string | null;
  onSelectMuseum: (m: Museum | null) => void;
  onSelectArea: (a: MacroArea | null) => void;
  onSelectCategory: (c: Category | null) => void;
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({
  isOpen,
  onClose,
  dataset,
  selectedAreaId,
  selectedCategoryId,
  selectedMuseumId,
  onSelectMuseum,
  onSelectArea,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  const selectedArea = selectedAreaId ? dataset.macroAreas.find(a => a.id === selectedAreaId) : null;
  const selectedCat = selectedCategoryId ? dataset.categories.find(c => c.id === selectedCategoryId) : null;
  const selectedMus = selectedMuseumId ? dataset.museums.find(m => m.id === selectedMuseumId) : null;

  const areaMuseums = selectedArea ? dataset.museums.filter(m => m.areaId === selectedArea.id) : [];
  const categoryMuseums = selectedCat ? dataset.museums.filter(m => m.categoryIds.includes(selectedCat.id)) : [];

  const categoryAreaDistribution = selectedCat
    ? dataset.macroAreas.map(area => {
        const count = dataset.museums.filter(
          m => m.areaId === area.id && m.categoryIds.includes(selectedCat.id)
        ).length;
        return { area, count };
      }).filter(item => item.count > 0)
    : [];

  return (
    <aside
      aria-label="Pannello Dettagli"
      className="absolute top-16 right-4 bottom-4 w-96 max-w-[92vw] bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl flex flex-col z-30 overflow-hidden text-slate-800 transition-all duration-300"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Dettagli Selezione
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
            Interattivo
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          title="Chiudi"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 divide-y divide-slate-100">
        
        {/* If Museum is selected */}
        {selectedMus && (
          <div className="space-y-4 pt-1">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Museo ({selectedMus.id}) · Pallino Nero
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-tight mt-0.5">
                  {selectedMus.name}
                </h3>
                {selectedMus.city && (
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                    {selectedMus.city} {selectedMus.region ? `· ${selectedMus.region}` : ''}
                  </p>
                )}
              </div>
            </div>

            {/* Laboratori Didattici (Dimensione del cerchio grigio) */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/80">
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Laboratori didattici offerti</span>
                <span className="text-[11px] text-slate-500">Definisce l&apos;area del cerchio grigio intorno al museo</span>
              </div>
              <span className="text-sm font-bold font-mono text-slate-900 bg-slate-200/90 px-2.5 py-1 rounded-lg">
                {selectedMus.workshopCount ?? 8}
              </span>
            </div>

            {/* Informazioni Semiotiche del Segnalino Museo */}
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-semibold text-slate-900">Segnalino Museo</span>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 overflow-visible" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="#000000" />
                    <MuseumGlyph
                      cx={12}
                      cy={12}
                      size={6.0}
                      educationalClass={selectedMus.educationalClass}
                      geographicArea={selectedMus.geographicArea}
                      targetAudience={selectedMus.targetAudience}
                    />
                  </svg>
                  <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-200/90 px-2 py-0.5 rounded">
                    {selectedMus.id}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Classe Didattica:</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {EDUCATIONAL_CLASS_LABELS[selectedMus.educationalClass || 'didattica_informativa']}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Area Geografica:</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {GEOGRAPHIC_AREA_LABELS[selectedMus.geographicArea || 'centro']}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Classe Utenza:</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {TARGET_AUDIENCE_LABELS[selectedMus.targetAudience || 'tutti']}
                  </span>
                </div>
              </div>
            </div>

            {/* Belonging Macro Area */}
            <div>
              <span className="text-xs text-slate-500 block mb-1.5 font-medium">
                Macro Area di Appartenenza (1 su 11):
              </span>
              {(() => {
                const area = dataset.macroAreas.find(a => a.id === selectedMus.areaId);
                if (!area) return null;
                return (
                  <button
                    onClick={() => onSelectArea(area)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: area.color }}
                      />
                      <span className="text-xs font-bold text-slate-800">
                        {area.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">Vedi Area &rarr;</span>
                  </button>
                );
              })()}
            </div>

            {/* Connected Categories */}
            <div>
              <span className="text-xs text-slate-500 block mb-1.5 font-medium">
                Categorie Collegate ({selectedMus.categoryIds.length} su 5):
              </span>
              <div className="space-y-1.5">
                {selectedMus.categoryIds.map(cId => {
                  const cat = dataset.categories.find(c => c.id === cId);
                  if (!cat) return null;
                  return (
                    <button
                      key={cId}
                      onClick={() => onSelectCategory(cat)}
                      className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-400 transition-colors text-left shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-xs font-semibold text-slate-800">{cat.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Pallino base</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* If Macro Area is selected */}
        {selectedArea && !selectedMus && (
          <div className="space-y-4 pt-1">
            <div className="flex items-start gap-3">
              <span
                className="w-5 h-5 rounded-full mt-1 shrink-0 shadow-sm ring-2 ring-slate-100"
                style={{ backgroundColor: selectedArea.color }}
              />
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Sezione dell&apos;Arco (250°)
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-tight mt-0.5">
                  {selectedArea.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {selectedArea.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Musei nella Sezione</span>
                <span className="text-xl font-bold text-slate-900">{areaMuseums.length}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Flussi Categorie</span>
                <span className="text-xl font-bold text-slate-900">
                  {areaMuseums.reduce((sum, m) => sum + m.categoryIds.length, 0)}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">
                  I {areaMuseums.length} Musei di questa sezione:
                </span>
                <span className="text-[10px] text-slate-400">Clicca per isolare</span>
              </div>
              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {areaMuseums.map(m => (
                  <button
                    key={m.id}
                    onClick={() => onSelectMuseum(m)}
                    className="w-full p-2 text-left rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                      <span className="text-xs text-slate-800 font-medium truncate">{m.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {m.categoryIds.length} cat.
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* If Category is selected */}
        {selectedCat && !selectedMus && (
          <div className="space-y-4 pt-1">
            <div className="flex items-start gap-3">
              <span className="w-4 h-4 rounded-full bg-black mt-1 shrink-0 ring-2 ring-slate-200" />
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Punto Categoria Base (Pallino Nero)
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-tight mt-0.5">
                  {selectedCat.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {selectedCat.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Musei Connessi</span>
                <span className="text-xl font-bold text-slate-900">{categoryMuseums.length}</span>
                <span className="text-[10px] text-slate-400 block">su 105 totali</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Sezioni Coinvolte</span>
                <span className="text-xl font-bold text-slate-900">
                  {categoryAreaDistribution.length}
                </span>
                <span className="text-[10px] text-slate-400 block">su 11 sezioni</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-800 block mb-2">
                Provenienza dalle 11 sezioni dell&apos;arco:
              </span>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {categoryAreaDistribution.map(({ area, count }) => (
                  <div
                    key={area.id}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{area.name}</span>
                      <span className="font-mono text-slate-900 font-bold">{count} musei</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: area.color,
                          width: `${(count / categoryMuseums.length) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* If nothing selected */}
        {!selectedArea && !selectedCat && !selectedMus && (
          <div className="py-12 text-center text-slate-400 text-xs space-y-2">
            <Sparkles className="w-8 h-8 mx-auto text-slate-300" />
            <p>Nessun elemento selezionato.</p>
            <p className="text-[11px] text-slate-400">
              Clicca su una sezione dell&apos;arco, su un pallino nero museo o su uno dei 5 punti in basso per fissare i dettagli.
            </p>
          </div>
        )}

      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
        <button
          onClick={() => {
            onSelectArea(null);
            onSelectCategory(null);
            onSelectMuseum(null);
          }}
          className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium"
        >
          Deseleziona tutto
        </button>
        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
        >
          Chiudi Pannello
        </button>
      </div>
    </aside>
  );
};
