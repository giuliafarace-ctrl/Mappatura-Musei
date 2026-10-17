import React, { useState } from 'react';
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

// Descrizioni scientifiche dettagliate per ciascun Approccio Didattico
const EDUCATIONAL_APPROACH_DESCRIPTIONS: Record<string, string[]> = {
  'cat-esperienziale': [
    "L'apprendimento esperienziale enfatizza esperienze pratiche che consentono ai visitatori, in particolare ai bambini, di interagire direttamente con le esposizioni, coinvolgendoli in attività pratiche che permettono di applicare la conoscenza teorica a situazioni reali. Questo approccio si allinea ai principi educativi di Dewey, che promuovono l'apprendimento attraverso il fare: l'esperienza, secondo l'autore, non è il risultato statico e determinato di un accumulo di sensazioni o informazioni acquisite, ma un processo in cui non si può distinguere esattamente fra soggetto dell'esperienza e oggetto esperito, un processo nel quale individui e ambiente si determinano e si modificano reciprocamente (Dewey, 1938/2014).",
    "L'interazione dei bambini con i manufatti e l'integrazione di esperienze sensoriali possono stimolare la curiosità e l'indagine, portando a una comprensione più profonda e a una maggiore ritenzione delle informazioni, favorendo così il processo di apprendimento (Young et al., 2022). Secondo quanto teorizzato da Kolb l'apprendimento è il processo attraverso il quale la conoscenza viene creata tramite la trasformazione e la combinazione tra l'acquisizione e la trasformazione dell'esperienza (D. A. Kolb, 1984). Questo approccio può inoltre incoraggiare i visitatori a riflettere sulle proprie esperienze, trarre conclusioni e applicare ciò che hanno appreso a nuove situazioni, migliorando così ritenzione e comprensione.",
    "Nell'apprendimento esperienziale l'accesso alla conoscenza passa dunque attraverso il vissuto personale – fatto di scoperte, prove ed errori – piuttosto che dall'ascolto o dalla lettura di esperienze già vissute da altri; questo porta l'individuo a costruire relazioni inedite tra i concetti e a elaborare proprie sintesi interpretative, ripensando criticamente a quanto sperimentato in precedenza (Özçam & Kayan, 2022). Ne deriva un modello di apprendimento fortemente pratico, in cui lo studente diventa protagonista attivo del proprio percorso di scoperta, arrivando a fare propri i contenuti appresi. In questa direzione va anche la definizione fornita dall'Associazione per l'Educazione Sperimentale, secondo cui l'apprendimento esperienziale coincide con «la fase durante la quale uno studente costruisce direttamente informazioni, competenze e valori a partire dall'esperienza» (Clemons, 2006)."
  ],
  'cat-interattiva': [
    "L'apprendimento interattivo è individuato in quell'approccio in cui i visitatori partecipano attivamente al proprio processo di apprendimento. I musei forniscono un contesto sociale unico in cui i visitatori possono interagire direttamente con le esposizioni e tra di loro, facilitando attraverso queste lo sviluppo di conoscenze (Lee, 2022). Le attività collaborative, come l'interazione tra adulti e bambini, o tra genitori e figli, sono essenziali nei musei, in particolare per i più piccoli, poiché offrono opportunità di esplorazione e apprendimento condiviso, migliorando il coinvolgimento e i risultati dell'apprendimento in generale (Sobel et al., 2021).",
    "Le ricerche dimostrano inoltre che i bambini apprendono in modo più efficace quando possono discutere ed esplorare le esposizioni insieme a genitori o coetanei, favorendo un senso di comunità e responsabilità condivisa nell'apprendimento, e rafforzando l'idea che l'apprendimento sia un processo essenzialmente sociale (Sobel et al., 2021). Questo approccio sfrutta spesso le nuove tecnologie – come la realtà aumentata e le applicazioni mobili – oltre alle attività di gruppo, per aumentare l'interattività delle esposizioni. Sia che l'interazione avvenga con l'ausilio di un operatore, anche da remoto, sia che si ricorra a interfacce digitali, le relazioni che si instaurano fra gli attori del servizio comportano processi di comunicazione, a volte con implicazioni emotive, trasformando così il mero scambio strumentale in una vera e propria azione condivisa (Zingale, 2024)."
  ],
  'cat-ludica': [
    "L'apprendimento ludico si fonda sull'inserimento di elementi di gioco come veicolo di conoscenza. Per il bambino il gioco non è solo strumento cognitivo, ma anche spazio di sfogo emotivo, in cui trovano espressione conflitti e ansie, e terreno privilegiato per la socializzazione e l'acquisizione di regole e competenze spendibili nel tempo. È attraverso il gioco che il bambino si sente pienamente a proprio agio, è per lui un linguaggio naturale con cui comunica ed esplora la realtà che lo circonda, dando forma alla propria creatività nell'immaginare, costruire ed elaborare scenari sempre nuovi, in un processo che intreccia personalità, pensiero e immaginazione. Il valore educativo del gioco trova oggi ampio riconoscimento tanto a livello istituzionale quanto nella letteratura scientifica, che ne conferma da più angolazioni l'efficacia formativa.",
    "Diversi studi mostrano come il gioco sostenga lo sviluppo cognitivo e socio-emotivo del bambino, contribuendo a ridurre lo stress e a migliorare la capacità di gestire le proprie emozioni; attraverso il gioco, inoltre, il bambino amplia il proprio vocabolario, affina abilità manuali e sociali e impara a cooperare con gli altri (Lynch, 2015). Questa modalità di apprendimento raggiunge la sua massima efficacia tra i 3 e i 10 anni, età in cui il gioco costituisce l'attività più coinvolgente per il bambino, capace di generare motivazione e interesse verso i contenuti senza che questi vengano vissuti come un obbligo (Arlanch, 2016).",
    "Come già visto alcune forme di interazione nella didattica permettono un efficacia maggiore nell’apprendimento: il guided play con l'adulto che orienta l'attività ludica (Weisberg et al., 2013) o le strategie di scaffolding con il supporto di adulti o pari, rendono gli allestimenti museali più efficaci e accessibili a un ventaglio più ampio di età (Wolf & Wood, 2012). Applicato al contesto museale, il gioco si è rivelato capace di aumentare in modo significativo il coinvolgimento cognitivo dei visitatori, trasformando la visita in un'esperienza di apprendimento attivo e partecipato (Moketar et al., 2021). Le interazioni ludiche generano infatti un maggiore coinvolgimento e una migliore ritenzione dei contenuti, favorendo la costruzione di legami personali tra il visitatore e ciò che il museo propone (Sobel et al., 2021)."
  ],
  'cat-narrativa': [
    "L'apprendimento narrativo è caratterizzato da un approccio legato al racconto, che si allinea al concetto di visita guidata. Questo approccio strutturato assicura che i visitatori ricevano una narrazione coerente, utile a ottenere una comprensione chiara dell'argomento. La figura della guida rappresenta quindi la principale fonte di conoscenza, offrendo spiegazioni e interpretando il significato culturale e storico delle esposizioni, in modo simile a come un insegnante spiega i concetti in un'aula scolastica (Anwari et al., 2023).",
    "Le guide, incoraggiando domande e discussioni, creano un ambiente favorevole all'apprendimento, aumentando il coinvolgimento dei visitatori e chiarendo i concetti presentati. La capacità delle guide di adattare le proprie presentazioni in base alle reazioni dei visitatori riflette la natura flessibile di questo approccio, in cui gli educatori modificano le strategie didattiche a seconda delle esigenze del pubblico. Questo metodo è spesso strutturato attorno a obiettivi e risultati di apprendimento chiari, privilegiando la memorizzazione, con il rischio però di soffocare la creatività e il pensiero critico; tuttavia, i sostenitori affermano che, se applicata in modo ponderato, l'istruzione diretta può essere integrata con altri approcci pedagogici per creare un'esperienza educativa più equilibrata."
  ],
  'cat-informativa': [
    "Questo approccio prevede che gli utenti interagiscano prevalentemente con testi per acquisire conoscenze e competenze. Nell'ambiente museale, si concentra sui contenuti scritti esposti, dove i visitatori sono invitati a leggere e interpretare le informazioni presentate su paline, pannelli o etichette che accompagnano le esposizioni. Si tratta di un metodo tradizionale nell'educazione museale, che dà priorità alla diffusione di conoscenze fattuali attraverso il testo: i visitatori interagiscono con il contenuto leggendo e riflettendo, ma l'assenza di elementi interattivi può rendere l'esperienza di apprendimento più passiva.",
    "Questo approccio può risultare efficace per trasmettere fatti storici e informazioni contestuali, ma potrebbe non favorire una comprensione approfondita o lo sviluppo del pensiero critico quanto le metodologie più interattive. La sua efficacia, inoltre, può variare in base alla complessità dei testi utilizzati e alle conoscenze pregresse e alle competenze di lettura dei visitatori."
  ]
};

// Descrizioni precise per ciascuna delle Classi Argomentative
const ARGUMENTATIVE_CLASS_DESCRIPTIONS: Record<string, string> = {
  'area-arte': "Si intendono musei con raccolte di oggetti di valore e interesse artistico, che espongono opere d'arte e d'arte applicata. All'interno di questo gruppo rientrano i musei di scultura, le gallerie di pittura, i musei della fotografia e del cinema, i musei di architettura.",
  'area-storia-archeo': "Si intendono musei con raccolte di oggetti legati a eventi storici. I musei di archeologia si distinguono per il fatto che le loro collezioni sono in parte o integralmente frutto di scavi. All'interno di questo gruppo sono compresi i musei con collezioni di cimeli storici, i memoriali, i musei di archivi, i musei militari, i musei dedicati a personaggi storici e i musei di archeologia.",
  'area-storia-scienze': "Si intendono musei che espongono soggetti legati a una o più discipline come la biologia, la botanica, la zoologia, la paleontologia e l'ecologia, con raccolte di specie animali e vegetali non viventi, minerali o fossili.",
  'area-scienza-tecnica': "Si intendono musei con raccolte di macchine, strumenti, modelli e relativi progetti e disegni, connessi a una o più scienze esatte o a tecnologie come l'astronomia, la matematica, la fisica, la chimica, la medicina, le industrie edili e gli articoli manifatturieri. Sono inclusi in questa categoria anche i planetari e i centri scientifici.",
  'area-etno-antropo': "Si intendono musei con raccolte di materiali relativi alle culture e alle caratteristiche delle diverse popolazioni, comprese le documentazioni di testimonianze orali e di eventi o rituali. Sono compresi i musei agricoli e di artigianato per i quali l'interesse etnologico prevale su quello tecnologico e/o artistico, così come i musei che presentano materiali sulla cultura, le credenze, i costumi e le arti tradizionali.",
  'area-specializzati': "Si intendono musei interessati alla ricerca e alla sperimentazione di tutti gli aspetti di un singolo tema o soggetto, con raccolte monotematiche di materiali che lo riguardano in modo specifico.",
  'area-territoriali': "Si intendono musei con raccolte di materiali e testimonianze che riguardano in modo specifico ed esclusivo un particolare territorio e lo descrivono dal punto di vista storico, culturale, etnico, economico e/o sociale, le cui collezioni si riferiscono più a un territorio specifico che a un oggetto.",
  'area-generali': "Musei che possiedono collezioni miste che non possono essere identificate in un unico ambito principale.",
  'area-monumenti': "Per monumento si intende un'opera architettonica o scultorea, o un'area di particolare interesse dal punto di vista artistico, storico, etnologico e/o antropologico, la cui visita sia organizzata e regolamentata secondo determinate modalità di accesso e fruizione; può essere di carattere civile, religioso, funerario, difensivo, infrastrutturale e di servizio, nonché naturale. Per area archeologica si intende invece un sito caratterizzato dalla presenza di resti di natura fossile o di manufatti o strutture preistorici o di età antica.",
  'area-natura-giardini': "Si intendono aree naturali o non con la caratteristica di presentare specie viventi animali o vegetali che siano.",
  'area-storia-etno': "Si intendono musei con raccolte di testimonianze storiche ed etnografiche dell'identità civile, materiale e culturale, nonché tutte le strutture ed esposizioni che rispondono alla definizione ICOM di conservazione e valorizzazione del patrimonio."
};

const FONT_CALIBRI = "Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif";
const FONT_CAMBRIA = "'Cambria', 'Cambria-Italic', 'Caladea', Georgia, serif";

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
  const [isAbstractExpanded, setIsAbstractExpanded] = useState(false);
  const [isDidacticDescExpanded, setIsDidacticDescExpanded] = useState(false);

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
      {/* Header fisso del pannello destro: parte direttamente dall'intestazione richiesta */}
      <div className="pt-4 px-5 pb-3 bg-white flex items-start justify-between shrink-0 border-b border-[#DADADA]/50">
        <div className="flex-1 pr-2">
          {hasSelection ? (
            <>
              {selectedMus ? (
                /* Museo: il nome è presente nell'intestazione, si legge per intero senza puntini */
                <h2
                  style={{ fontFamily: FONT_CAMBRIA }}
                  className="text-sm font-bold text-[#13100D] leading-snug break-words"
                >
                  {selectedMus.name}
                </h2>
              ) : selectedCat ? (
                /* Didattica: Approccio Didattico seguito dal nome della metodologia */
                <>
                  <span
                    style={{ fontFamily: FONT_CALIBRI }}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#9D9D9C] block"
                  >
                    Approccio Didattico
                  </span>
                  <h2
                    style={{ fontFamily: FONT_CAMBRIA }}
                    className="text-sm font-bold text-[#13100D] leading-snug break-words"
                  >
                    {selectedCat.name}
                  </h2>
                </>
              ) : selectedArea ? (
                /* Classe argomentativa: Classe Argomentativa seguita dal nome */
                <>
                  <span
                    style={{ fontFamily: FONT_CALIBRI }}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#9D9D9C] block"
                  >
                    Classe Argomentativa
                  </span>
                  <h2
                    style={{ fontFamily: FONT_CAMBRIA }}
                    className="text-sm font-bold text-[#13100D] leading-snug italic break-words"
                  >
                    {selectedArea.name}
                  </h2>
                </>
              ) : null}
            </>
          ) : (
            <h1
              style={{ fontFamily: FONT_CAMBRIA }}
              className="text-[14px] font-bold text-[#13100D] leading-snug"
            >
              Mappatura del Contesto Educativo Museale Italiano
            </h1>
          )}
        </div>

        {hasSelection && (
          <button
            onClick={onResetSelection}
            className="text-[11px] font-medium text-[#9D9D9C] hover:text-[#13100D] transition-colors flex items-center gap-1.5 cursor-pointer pt-0.5 shrink-0"
            title="Chiudi scheda e torna alla panoramica"
          >
            <RotateCcw className="w-3 h-3 text-[#13100D]" />
            <span style={{ fontFamily: FONT_CALIBRI }}>Chiudi</span>
          </button>
        )}
      </div>

      {/* Contenuto scorrevole: Editoriale puro, gerarchia tipografica perfetta */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-6 text-xs">
        {!hasSelection ? (
          /* ========================================================================= */
          /* STATO 1: DESCRIZIONE DELLA MAPPATURA E TESI DI RICERCA                    */
          /* ========================================================================= */
          <div className="space-y-6">
            {/* Descrizione della mappatura inserita come blocco unico continuo (senza accapo prima di "È concepita...") */}
            <div className="text-[11.5px] leading-relaxed text-[#13100D]">
              <p>
                La mappatura è uno dei risultati di una ricerca dottorale, e restituisce in forma navigabile l'offerta educativa di 105 musei italiani, selezionati tra i principali di ogni regione in proporzione alla distribuzione geografica nazionale. Il campione corrisponde a circa il 2,5% dei 4.672 musei censiti. Ogni museo è classificato secondo tre chiavi di lettura: il pubblico a cui si rivolge, l'argomento delle collezioni e il tipo di offerta didattica, distinta per approccio. La piattaforma permette di interrogare queste relazioni e di osservare le connessioni presenti e quelle mancanti. La mappatura è esplorativa e non rappresentativa dell'intero panorama nazionale: considera le attività rivolte alla scuola dell'infanzia e primaria, ricavate dai siti ufficiali, e fotografa un'offerta soggetta a variazioni nel tempo. È concepita come strumento aperto, da ampliare con nuovi musei e con una futura sezione di auto-mappatura.
              </p>
            </div>

            {/* Dati della ricerca dottorale */}
            <div className="space-y-4 pt-1">
              <div>
                <span
                  style={{ fontFamily: FONT_CALIBRI }}
                  className="text-[10px] uppercase tracking-wider text-[#9D9D9C] font-bold block mb-1"
                >
                  TESI DI RICERCA
                </span>
                <p
                  style={{ fontFamily: FONT_CAMBRIA }}
                  className="text-[#13100D] font-bold text-[12px] leading-snug"
                >
                  Design &amp; Divulgazione Esperienziale. Strumenti e metodi per il trasferimento del patrimonio museale all’interno della scuola italiana
                </p>
              </div>

              <div>
                <span
                  style={{ fontFamily: FONT_CALIBRI }}
                  className="text-[10px] uppercase tracking-wider text-[#9D9D9C] font-bold block mb-0.5"
                >
                  DOTTORANDA
                </span>
                <div
                  style={{ fontFamily: FONT_CAMBRIA }}
                  className="text-[#13100D] font-medium text-xs leading-snug"
                >
                  Giulia Farace
                </div>
                <div className="text-[#9D9D9C] text-[11px]">
                  XXXIX Ciclo
                </div>
              </div>

              <div>
                <span
                  style={{ fontFamily: FONT_CALIBRI }}
                  className="text-[10px] uppercase tracking-wider text-[#9D9D9C] font-bold block mb-0.5"
                >
                  TOUTOR
                </span>
                <div
                  style={{ fontFamily: FONT_CAMBRIA }}
                  className="text-[#13100D] font-medium text-xs leading-snug"
                >
                  Sabrina Lucibello
                </div>
                <div className="text-[#9D9D9C] text-[11px] leading-snug">
                  Professoressa Ordinaria di Design, PhD in Industrial Design
                </div>
              </div>

              <div>
                <span
                  style={{ fontFamily: FONT_CALIBRI }}
                  className="text-[10px] uppercase tracking-wider text-[#9D9D9C] font-bold block mb-0.5"
                >
                  ISTITUZIONE
                </span>
                <div
                  style={{ fontFamily: FONT_CAMBRIA }}
                  className="text-[#13100D] font-medium text-xs leading-snug"
                >
                  Dipartimento di Pianificazione, Design e Tecnologie dell'Architettura - PDTA
                </div>
                <div className="text-[#9D9D9C] text-[11px] leading-snug">
                  Facoltà di Architettura
                </div>
                <div className="text-[#9D9D9C] text-[11px] leading-snug">
                  Sapienza Università di Roma
                </div>
              </div>

              {/* Abstract della tesi: collocato sotto tutto, come ultimo punto */}
              <div className="pt-3 border-t border-[#DADADA]/40 space-y-1.5">
                <span
                  style={{ fontFamily: FONT_CALIBRI }}
                  className="text-[10px] uppercase tracking-wider text-[#9D9D9C] font-bold block"
                >
                  ABSTRACT
                </span>
                <div className="text-[11px] leading-relaxed text-[#13100D] space-y-2">
                  <p>
                    La tesi indaga come il design possa rendere trasportabile il patrimonio culturale museale nella scuola primaria italiana, assumendo la distanza tra scuola e museo come problema di progetto e non solo di risorse. Collocata nell'ambito del Design for Education, la ricerca rovescia la direzione tradizionale della divulgazione museale, da centripeta a centrifuga, portando saperi, materiali e linguaggi del museo nei contesti quotidiani dell'apprendimento, in vista di un patrimonio diffuso e accessibile e di un'educazione più equa e stimolante.
                  </p>
                  {isAbstractExpanded && (
                    <>
                      <p>
                        Il percorso si articola in due parti. La prima, dedicata allo stato dell'arte, ricostruisce la convergenza di scuola e museo verso un paradigma esperienziale, multisensoriale e partecipativo, già legittimata sul piano teorico e normativo ma ancora frammentaria nelle pratiche. Restituisce inoltre una mappatura navigabile dell'offerta educativa nazionale (RA1), che mostra come l'offerta si contragga allontanandosi dalla sede museale.
                      </p>
                      <p>
                        La seconda parte, di Research through Design, nasce da esperienze progettuali situate e produce due strumenti. Il primo è una valutazione interdisciplinare per artefatti esperienziali (RA2), ispirata dai tre livelli dell'emotional design di Norman e applicata in via preliminare a un piccolo campione. Il secondo è un framework progettuale (RA3), composto da un protocollo in sei fasi e da principi non prescrittivi, fondato sulla distinzione tra riduzione e traduzione critica del patrimonio e messo alla prova nel progetto pilota di un kit didattico per il progetto Naturalia, sviluppato con il museo Explora di Roma.
                      </p>
                      <p>
                        La tesi sostiene che la ripetibilità risiede non nell'artefatto ma nel processo e nell'infrastruttura relazionale tra designer, educatori e curatori, mentre gli esiti restano situati.
                      </p>
                    </>
                  )}
                  <button
                    onClick={() => setIsAbstractExpanded(!isAbstractExpanded)}
                    className="text-[11px] font-bold text-[#13100D] hover:underline cursor-pointer block pt-0.5"
                  >
                    {isAbstractExpanded ? 'Mostra meno ↑' : 'Continua a leggere ↓'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* STATO 2: SCHEDA TRASFORMATA CON I DETTAGLI DELL'ELEMENTO CLICCATO         */
          /* ========================================================================= */
          <div className="space-y-5">
            
            {/* SELEZIONE MUSEO: Il nome è nell'intestazione fissa sopra, qui si parte direttamente dalla posizione */}
            {selectedMus && (
              <div className="space-y-4">
                {selectedMus.city && (
                  <p className="text-[11.5px] text-[#9D9D9C] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#13100D] shrink-0" />
                    <span style={{ fontFamily: FONT_CAMBRIA }} className="text-[#13100D]">
                      {selectedMus.city}{selectedMus.region ? `, ${selectedMus.region}` : ''}
                    </span>
                  </p>
                )}

                {/* Segnalino Visivo pulito: senza scritte descrittive superflue e senza alcuna parentesi */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                      <svg className="w-11 h-11 overflow-visible" viewBox="0 0 40 40">
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

                    <div className="text-[11px] leading-snug space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-start gap-1.5">
                        <span
                          style={{ fontFamily: FONT_CALIBRI }}
                          className="text-[#9D9D9C] shrink-0"
                        >
                          Area:
                        </span>
                        <span
                          style={{ fontFamily: FONT_CAMBRIA }}
                          className="text-[#13100D] font-medium leading-snug break-words"
                        >
                          {selectedMus.geographicArea ? GEOGRAPHIC_AREA_LABELS[selectedMus.geographicArea] : 'Centro'}
                        </span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span
                          style={{ fontFamily: FONT_CALIBRI }}
                          className="text-[#9D9D9C] shrink-0"
                        >
                          Utenza:
                        </span>
                        <span
                          style={{ fontFamily: FONT_CAMBRIA }}
                          className="text-[#13100D] font-medium leading-snug break-words"
                        >
                          {selectedMus.targetAudience ? TARGET_AUDIENCE_LABELS[selectedMus.targetAudience] : 'Tutti'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metriche e attributi del museo: titolini grigi in Calibri, dati completi in Cambria (senza puntini) */}
                  <div className="text-[11px] space-y-2 pt-1 border-t border-[#DADADA]/40">
                    <div className="flex justify-between items-baseline gap-2">
                      <span
                        style={{ fontFamily: FONT_CALIBRI }}
                        className="text-[#9D9D9C] shrink-0"
                      >
                        Laboratori didattici:
                      </span>
                      <strong
                        style={{ fontFamily: FONT_CAMBRIA }}
                        className="text-[#13100D] font-bold text-right"
                      >
                        {selectedMus.workshopCount ?? 0}
                      </strong>
                    </div>

                    {selectedMus.childPopulation !== undefined && (
                      <div className="flex justify-between items-baseline gap-2">
                        <span
                          style={{ fontFamily: FONT_CALIBRI }}
                          className="text-[#9D9D9C] shrink-0"
                        >
                          Popolazione infantile:
                        </span>
                        <strong
                          style={{ fontFamily: FONT_CAMBRIA }}
                          className="text-[#13100D] font-medium text-right leading-snug"
                        >
                          {selectedMus.childPopulation.toLocaleString('it-IT')} bambini
                        </strong>
                      </div>
                    )}

                    <div className="flex justify-between items-start gap-2">
                      <span
                        style={{ fontFamily: FONT_CALIBRI }}
                        className="text-[#9D9D9C] shrink-0"
                      >
                        Classe didattica:
                      </span>
                      <strong
                        style={{ fontFamily: FONT_CAMBRIA }}
                        className="text-[#13100D] text-right font-medium leading-snug break-words"
                      >
                        {selectedMus.educationalClass ? EDUCATIONAL_CLASS_LABELS[selectedMus.educationalClass] : 'Didattica informativa'}
                      </strong>
                    </div>

                    {selectedMus.website && (
                      <div className="pt-1.5 border-t border-[#DADADA]/40 flex justify-between items-center">
                        <span
                          style={{ fontFamily: FONT_CALIBRI }}
                          className="text-[#9D9D9C] shrink-0"
                        >
                          Sito web:
                        </span>
                        <a
                          href={selectedMus.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#13100D] font-bold hover:underline flex items-center gap-1 text-[10.5px]"
                        >
                          <span style={{ fontFamily: FONT_CAMBRIA }}>Visita sito</span>
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
                    <div className="space-y-1 pt-1 border-t border-[#DADADA]/40">
                      <span
                        style={{ fontFamily: FONT_CALIBRI }}
                        className="text-[10px] text-[#9D9D9C] uppercase font-bold tracking-wider block"
                      >
                        Classe Argomentativa del museo
                      </span>
                      <button
                        onClick={() => onSelectArea(parentArea)}
                        className="w-full text-left py-1 text-[11.5px] transition-colors flex items-center justify-between text-[#13100D] hover:opacity-75 cursor-pointer"
                      >
                        <span
                          style={{ fontFamily: FONT_CAMBRIA }}
                          className="font-bold italic leading-snug break-words pr-2"
                        >
                          {parentArea.name}
                        </span>
                        <span
                          style={{ fontFamily: FONT_CALIBRI }}
                          className="text-[10px] text-[#9D9D9C] shrink-0"
                        >
                          Esplora classe →
                        </span>
                      </button>
                    </div>
                  );
                })()}

                {/* Approcci Didattici Collegati */}
                <div className="space-y-1.5 pt-1 border-t border-[#DADADA]/40">
                  <span
                    style={{ fontFamily: FONT_CALIBRI }}
                    className="text-[10px] text-[#9D9D9C] uppercase font-bold tracking-wider block"
                  >
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
                          <span
                            style={{ fontFamily: FONT_CAMBRIA }}
                            className="text-[11px] font-medium leading-snug break-words pr-2"
                          >
                            {cat.name}
                          </span>
                          <span
                            style={{ fontFamily: FONT_CALIBRI }}
                            className="text-[10px] text-[#9D9D9C] shrink-0"
                          >
                            Visualizza →
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* SELEZIONE CLASSE ARGOMENTATIVA: Il titolo e il nome sono nell'intestazione fissa, qui si parte direttamente dal contenuto */}
            {!selectedMus && selectedArea && (
              <div className="space-y-4">
                <p className="text-[11px] text-[#13100D] leading-relaxed">
                  {ARGUMENTATIVE_CLASS_DESCRIPTIONS[selectedArea.id] || selectedArea.description}
                </p>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span
                    style={{ fontFamily: FONT_CALIBRI }}
                    className="text-[#9D9D9C]"
                  >
                    Musei appartenenti alla classe:
                  </span>
                  <strong
                    style={{ fontFamily: FONT_CAMBRIA }}
                    className="text-sm font-bold text-[#13100D]"
                  >
                    {areaMuseums.length}
                  </strong>
                </div>

                {/* Elenco musei dell'area con font Cambria per esteso senza puntini */}
                <div className="space-y-1.5 pt-1 border-t border-[#DADADA]/40">
                  <span
                    style={{ fontFamily: FONT_CALIBRI }}
                    className="text-[10px] text-[#9D9D9C] uppercase font-bold tracking-wider block"
                  >
                    Musei Campione ({areaMuseums.length})
                  </span>
                  <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                    {areaMuseums.map(mus => (
                      <button
                        key={mus.id}
                        onClick={() => onSelectMuseum(mus)}
                        className="w-full text-left py-1 transition-colors flex items-start justify-between text-[#13100D] hover:opacity-75 cursor-pointer gap-2"
                      >
                        <span
                          style={{ fontFamily: FONT_CAMBRIA }}
                          className="text-[11px] font-medium leading-snug break-words flex-1"
                        >
                          {mus.name}
                        </span>
                        <span
                          style={{ fontFamily: FONT_CALIBRI }}
                          className="text-[10px] text-[#9D9D9C] shrink-0 pt-0.5"
                        >
                          {mus.city}{mus.region ? `, ${mus.region}` : ''}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SELEZIONE APPROCCIO DIDATTICO: Il titolo e il nome sono nell'intestazione fissa, qui si parte direttamente dalla descrizione con 'continua a leggere' */}
            {!selectedMus && !selectedArea && selectedCat && (
              <div className="space-y-4">
                {/* Descrizione scientifica con "continua a leggere" per mantenere visibile la lista musei sottostante */}
                {(() => {
                  const paragraphs = EDUCATIONAL_APPROACH_DESCRIPTIONS[selectedCat.id] || [selectedCat.description];
                  return (
                    <div className="text-[11px] text-[#13100D] leading-relaxed space-y-2">
                      <p>
                        {paragraphs[0]}
                      </p>
                      {isDidacticDescExpanded && (
                        <>
                          {paragraphs.slice(1).map((p, idx) => (
                            <p key={idx}>
                              {p}
                            </p>
                          ))}
                        </>
                      )}
                      {paragraphs.length > 1 && (
                        <button
                          onClick={() => setIsDidacticDescExpanded(!isDidacticDescExpanded)}
                          className="text-[11px] font-bold text-[#13100D] hover:underline cursor-pointer block pt-0.5"
                        >
                          {isDidacticDescExpanded ? 'Mostra meno ↑' : 'Continua a leggere ↓'}
                        </button>
                      )}
                    </div>
                  );
                })()}

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span
                    style={{ fontFamily: FONT_CALIBRI }}
                    className="text-[#9D9D9C]"
                  >
                    Musei che adottano l'approccio:
                  </span>
                  <strong
                    style={{ fontFamily: FONT_CAMBRIA }}
                    className="text-sm font-bold text-[#13100D]"
                  >
                    {categoryMuseums.length}
                  </strong>
                </div>

                {/* Elenco musei collegati con font Cambria per esteso senza puntini */}
                <div className="space-y-1.5 pt-1 border-t border-[#DADADA]/40">
                  <span
                    style={{ fontFamily: FONT_CALIBRI }}
                    className="text-[10px] text-[#9D9D9C] uppercase font-bold tracking-wider block"
                  >
                    Musei Collegati ({categoryMuseums.length})
                  </span>
                  <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                    {categoryMuseums.map(mus => (
                      <button
                        key={mus.id}
                        onClick={() => onSelectMuseum(mus)}
                        className="w-full text-left py-1 transition-colors flex items-start justify-between text-[#13100D] hover:opacity-75 cursor-pointer gap-2"
                      >
                        <span
                          style={{ fontFamily: FONT_CAMBRIA }}
                          className="text-[11px] font-medium leading-snug break-words flex-1"
                        >
                          {mus.name}
                        </span>
                        <span
                          style={{ fontFamily: FONT_CALIBRI }}
                          className="text-[10px] text-[#9D9D9C] shrink-0 pt-0.5"
                        >
                          {mus.city}{mus.region ? `, ${mus.region}` : ''}
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
        <span style={{ fontFamily: FONT_CALIBRI }}>105 Musei · 5 Metodologie</span>
        <button
          onClick={onOpenDatasetModal}
          className="text-[#13100D] font-bold hover:underline"
          style={{ fontFamily: FONT_CALIBRI }}
        >
          Dataset →
        </button>
      </div>
    </aside>
  );
};
