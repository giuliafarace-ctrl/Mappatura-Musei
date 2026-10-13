import React, { useState } from 'react';
import { Dataset, MacroArea, Category, Museum } from '../types/museum';
import { initialDataset } from '../data/museumData';
import { X, Copy, Check, Upload, RefreshCw, Database, Eye, Search, AlertCircle } from 'lucide-react';

interface DatasetModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: Dataset;
  onUpdateDataset: (newDataset: Dataset) => void;
  onSelectMuseum?: (m: Museum) => void;
}

export const DatasetModal: React.FC<DatasetModalProps> = ({
  isOpen,
  onClose,
  dataset,
  onUpdateDataset,
  onSelectMuseum
}) => {
  const [activeTab, setActiveTab] = useState<'explorer' | 'json' | 'help'>('explorer');
  const [jsonText, setJsonText] = useState(() => JSON.stringify(dataset, null, 2));
  const [copied, setCopied] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('all');
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');

  const [applySuccess, setApplySuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(dataset, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetToDefault = () => {
    onUpdateDataset(initialDataset);
    setJsonText(JSON.stringify(initialDataset, null, 2));
    setJsonError(null);
    setApplySuccess('Dataset ripristinato ai 105 musei predefiniti.');
    setTimeout(() => setApplySuccess(null), 3000);
  };

  const handleApplyJson = () => {
    try {
      setJsonError(null);
      const parsed = JSON.parse(jsonText);
      if (!parsed.macroAreas || !Array.isArray(parsed.macroAreas)) {
        throw new Error('Manca l\'array "macroAreas" nel JSON.');
      }
      if (!parsed.categories || !Array.isArray(parsed.categories)) {
        throw new Error('Manca l\'array "categories" nel JSON.');
      }
      if (!parsed.museums || !Array.isArray(parsed.museums)) {
        throw new Error('Manca l\'array "museums" nel JSON.');
      }
      onUpdateDataset(parsed);
      setApplySuccess(`Dataset caricato con successo! ${parsed.macroAreas.length} Macro Aree, ${parsed.museums.length} Musei, ${parsed.categories.length} Categorie.`);
      setTimeout(() => setApplySuccess(null), 3500);
    } catch (err: any) {
      setJsonError(err.message || 'JSON non valido');
    }
  };

  // Filtered museums for explorer
  const filteredMuseums = dataset.museums.filter(m => {
    const matchesSearch = searchQuery === '' ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.city && m.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.region && m.region.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesArea = selectedAreaFilter === 'all' || m.areaId === selectedAreaFilter;
    const matchesCat = selectedCatFilter === 'all' || m.categoryIds.includes(selectedCatFilter);
    return matchesSearch && matchesArea && matchesCat;
  });

  const getArea = (id: string) => dataset.macroAreas.find(a => a.id === id);
  const getCat = (id: string) => dataset.categories.find(c => c.id === id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[88vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-900 text-white shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-wide text-slate-900">
                Gestione Dataset & Esplorazione Musei
              </h2>
              <p className="text-xs text-slate-500">
                {dataset.macroAreas.length} Macro Aree · {dataset.museums.length} Musei · {dataset.categories.length} Categorie
              </p>
            </div>
          </div>

          {/* Tab selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('explorer')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'explorer'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Elenco Musei ({dataset.museums.length})
            </button>
            <button
              onClick={() => {
                setJsonText(JSON.stringify(dataset, null, 2));
                setActiveTab('json');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'json'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              JSON Editor / Importa
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'help'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Struttura Dati
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Chiudi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden p-6 bg-white">
          {activeTab === 'explorer' && (
            <div className="flex flex-col h-full gap-4">
              {/* Filter bar */}
              <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cerca museo o città..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Sezione:</span>
                  <select
                    value={selectedAreaFilter}
                    onChange={e => setSelectedAreaFilter(e.target.value)}
                    className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-slate-800"
                  >
                    <option value="all">Tutte le 11 Sezioni</option>
                    {dataset.macroAreas.map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Categoria:</span>
                  <select
                    value={selectedCatFilter}
                    onChange={e => setSelectedCatFilter(e.target.value)}
                    className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-slate-800"
                  >
                    <option value="all">Tutti i 5 Punti Base</option>
                    {dataset.categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="text-xs text-slate-500 ml-auto">
                  Risultati: <span className="font-bold text-slate-900">{filteredMuseums.length}</span> di {dataset.museums.length}
                </div>
              </div>

              {/* Table / List */}
              <div className="flex-1 overflow-y-auto pr-1 border border-slate-200 rounded-xl bg-white divide-y divide-slate-100">
                {filteredMuseums.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 text-sm">
                    Nessun museo corrisponde ai filtri selezionati.
                  </div>
                ) : (
                  filteredMuseums.map((m, idx) => {
                    const area = getArea(m.areaId);
                    return (
                      <div
                        key={m.id}
                        className="p-3 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4 group"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <span className="text-[11px] font-mono text-slate-400 mt-0.5 w-7 text-right">
                            {idx + 1}.
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-black inline-block shrink-0" />
                              <h4 className="text-sm font-semibold text-slate-900 group-hover:text-amber-800 transition-colors">
                                {m.name}
                              </h4>
                              {m.city && (
                                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                  {m.city} {m.region ? `(${m.region})` : ''}
                                </span>
                              )}
                            </div>
                            
                            {/* Area indicator */}
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className="inline-block w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: area?.color || '#888' }}
                              />
                              <span className="text-xs text-slate-600 font-medium">
                                {area?.name || m.areaId}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Category badges */}
                        <div className="flex flex-wrap items-center gap-1.5 justify-end">
                          {m.categoryIds.map(cId => {
                            const cat = getCat(cId);
                            return (
                              <span
                                key={cId}
                                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                                style={{
                                  backgroundColor: `${cat?.color || '#888'}18`,
                                  color: cat?.color || '#000',
                                  border: `1px solid ${cat?.color || '#888'}40`
                                }}
                              >
                                {cat?.shortName || cat?.name || cId}
                              </span>
                            );
                          })}

                          {onSelectMuseum && (
                            <button
                              onClick={() => {
                                onSelectMuseum(m);
                                onClose();
                              }}
                              className="ml-2 p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                              title="Evidenzia nel grafico"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="flex flex-col h-full gap-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <p>
                  Modifica direttamente il JSON o incolla il tuo dataset definitivo:
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-medium transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copiato!' : 'Copia JSON'}
                  </button>
                  <button
                    onClick={handleResetToDefault}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-medium transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Ripristina Default (105)
                  </button>
                </div>
              </div>

              {jsonError && (
                <div className="flex items-center gap-2 px-3 py-2 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>Errore di sintassi JSON: {jsonError}</span>
                </div>
              )}

              {applySuccess && (
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs">
                  <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{applySuccess}</span>
                </div>
              )}

              <textarea
                value={jsonText}
                onChange={e => setJsonText(e.target.value)}
                className="flex-1 w-full p-4 font-mono text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-slate-800 resize-none selection:bg-slate-200"
                spellCheck={false}
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500">
                  Formato atteso: <code>{`{ macroAreas: [], categories: [], museums: [] }`}</code>
                </span>
                <button
                  onClick={handleApplyJson}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Applica Modifiche al Grafico
                </button>
              </div>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="h-full overflow-y-auto pr-2 space-y-5 text-slate-700 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Regole e Vincoli della Struttura Dati
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>
                    <strong>11 Macro Aree (arco 250°):</strong> Ognuna con <code className="text-slate-900 font-semibold">id</code>, <code className="text-slate-900 font-semibold">name</code> e <code className="text-slate-900 font-semibold">color</code>.
                  </li>
                  <li>
                    <strong>5 Categorie (in basso):</strong> I 5 punti terminali (pallini neri) con <code className="text-slate-900 font-semibold">id</code>, <code className="text-slate-900 font-semibold">name</code> e <code className="text-slate-900 font-semibold">color</code>.
                  </li>
                  <li>
                    <strong>105 Musei (pallini neri sull&apos;arco):</strong>
                    <ul className="list-circle pl-5 mt-1 space-y-1">
                      <li>Ogni museo ha <code className="text-slate-900 font-semibold">areaId</code>: è legato a <em>una sola</em> macro area.</li>
                      <li>Ogni museo ha <code className="text-slate-900 font-semibold">categoryIds</code> (array): può puntare a <em>più categorie</em> (da 1 a 5).</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs">
                <div className="text-slate-500 mb-2 font-sans font-semibold">
                  Esempio elemento Museo in JSON:
                </div>
                <pre className="text-slate-800 overflow-x-auto bg-white p-3 rounded-lg border border-slate-200">
{`{
  "id": "m-001",
  "name": "Gallerie degli Uffizi",
  "areaId": "area-civici",
  "categoryIds": ["cat-digitale", "cat-restauro", "cat-eventi"],
  "city": "Firenze",
  "region": "Toscana"
}`}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                💡 <strong>Nota per il dataset definitivo:</strong> Quando sarai pronto con il dataset reale, potrai semplicemente incollare il file JSON nella scheda &quot;JSON Editor / Importa&quot; oppure sostituire il contenuto del file <code className="text-slate-900 font-semibold">src/data/museumData.ts</code>.
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
