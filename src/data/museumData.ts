import { Dataset } from '../types/museum';

export const initialDataset: Dataset = {
  // 11 Classi Argomentative dei musei (ufficiali dal dataset di ricerca)
  macroAreas: [
    {
        "id": "area-arte",
        "name": "Musei d'Arte",
        "shortName": "Arte",
        "description": "Pinacoteche, gallerie di pittura, scultura, arti visive e contemporanee.",
        "color": "#3B82F6"
    },
    {
        "id": "area-storia-archeo",
        "name": "Musei di Storia e di Archeologia",
        "shortName": "Storia & Archeologia",
        "description": "Collezioni storiche, scavi archeologici, reperti antichi e memorie civili.",
        "color": "#E06D53"
    },
    {
        "id": "area-storia-scienze",
        "name": "Musei di Storia e Scienze Naturali",
        "shortName": "Scienze Naturali",
        "description": "Paleontologia, zoologia, geologia, botanica ed evoluzione biologica.",
        "color": "#10B981"
    },
    {
        "id": "area-scienza-tecnica",
        "name": "Musei della Scienza e della Tecnica",
        "shortName": "Scienza & Tecnica",
        "description": "Fisica, astronomia, tecnologia industriale e macchinari storici.",
        "color": "#06B6D4"
    },
    {
        "id": "area-etno-antropo",
        "name": "Musei di Etnografia e Antropologia",
        "shortName": "Etnografia & Antropologia",
        "description": "Culture materiali, folklore regionale, tradizioni popolari e antropologia.",
        "color": "#8B5CF6"
    },
    {
        "id": "area-specializzati",
        "name": "Musei Specializzati",
        "shortName": "Specializzati",
        "description": "Collezioni monotematiche: ceramica, musica, tessile, cinema, design e trasporti.",
        "color": "#EC4899"
    },
    {
        "id": "area-territoriali",
        "name": "Musei Territoriali",
        "shortName": "Territoriali",
        "description": "Musei civici ed ecomusei radicate nell’identità e nella storia locale.",
        "color": "#14B8A6"
    },
    {
        "id": "area-generali",
        "name": "Musei Generali",
        "shortName": "Generali",
        "description": "Istituzioni pluridisciplinari con collezioni enciclopediche e miste.",
        "color": "#F59E0B"
    },
    {
        "id": "area-monumenti",
        "name": "Monumento storico o Area archeologica",
        "shortName": "Monumenti & Aree Arch.",
        "description": "Castelli, fortezze, palazzi storici, parchi archeologici e complessi monumentali.",
        "color": "#F97316"
    },
    {
        "id": "area-natura-giardini",
        "name": "Giardini zoologici, orti botanici, acquari o riserve naturali",
        "shortName": "Giardini & Riserve",
        "description": "Orto botanico, parchi faunistici, giardini storici, acquari ed oasi protette.",
        "color": "#84CC16"
    },
    {
        "id": "area-storia-etno",
        "name": "Musei di Storia e di Etnografia",
        "shortName": "Storia & Etnografia",
        "description": "Raccolte storiche ed etnografiche dell’identità civile e culturale.",
        "color": "#A855F7"
    }
],

  // 5 Approcci Didattici con stili di linea grafici associati
  categories: [
    {
        "id": "cat-ludica",
        "name": "Didattica Ludica",
        "shortName": "D. Ludica",
        "description": "Metodologie di apprendimento basate sul gioco, gamification, caccie al tesoro ed enigmi.",
        "color": "#0f172a",
        "linePattern": "solid",
        "linePatternLabel": "Linea piena"
    },
    {
        "id": "cat-esperienziale",
        "name": "Didattica Esperienziale",
        "shortName": "D. Esperienziale",
        "description": "Attività hands-on, apprendimento attraverso il fare, laboratori sensoriali e immersivi.",
        "color": "#0f172a",
        "linePattern": "dashed",
        "linePatternLabel": "Linea tratteggiata"
    },
    {
        "id": "cat-interattiva",
        "name": "Didattica Interattiva",
        "shortName": "D. Interattiva",
        "description": "Coinvolgimento attivo tramite touch-screen, dispositivi digitali e dialogo partecipato.",
        "color": "#0f172a",
        "linePattern": "dotted",
        "linePatternLabel": "Linea puntinata"
    },
    {
        "id": "cat-narrativa",
        "name": "Didattica Narrativa",
        "shortName": "D. Narrativa",
        "description": "Storytelling museale, percorsi biografici narrati, drammatizzazioni e racconti d’autore.",
        "color": "#0f172a",
        "linePattern": "diagonal",
        "linePatternLabel": "Tratti diagonali 45° ravvicinati"
    },
    {
        "id": "cat-informativa",
        "name": "Didattica Informativa",
        "shortName": "D. Informativa",
        "description": "Visite guidate frontali, schede di approfondimento, lezioni tematiche e conferenze.",
        "color": "#0f172a",
        "linePattern": "dash-dot",
        "linePatternLabel": "Linea tratto-punto"
    }
],

  // 105 Musei Reali dal Foglio di Ricerca della Tesi
  museums: [
    {
        "id": "M001",
        "name": "Musei Capitolini",
        "areaId": "area-storia-etno",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 6,
        "childPopulation": 176892,
        "website": "https://www.museicapitolini.org/it",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Roma",
        "region": "Roma"
    },
    {
        "id": "M002",
        "name": "Planetario di Roma",
        "areaId": "area-territoriali",
        "categoryIds": [
            "cat-narrativa"
        ],
        "workshopCount": 0,
        "childPopulation": 176892,
        "website": "https://www.planetarioroma.it/it",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Roma",
        "region": "Roma"
    },
    {
        "id": "M003",
        "name": "GNAM – Galleria Nazionale d’Arte Moderna e Contemporanea",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-esperienziale",
            "cat-narrativa"
        ],
        "workshopCount": 11,
        "childPopulation": 176892,
        "website": "https://lagallerianazionale.com/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Roma",
        "region": "Roma"
    },
    {
        "id": "M004",
        "name": "Museo delle Civiltà",
        "areaId": "area-etno-antropo",
        "categoryIds": [
            "cat-esperienziale",
            "cat-narrativa"
        ],
        "workshopCount": 0,
        "childPopulation": 176892,
        "website": "https://www.museodellecivilta.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Roma",
        "region": "Roma"
    },
    {
        "id": "M005",
        "name": "Palazzo delle Esposizioni",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-narrativa"
        ],
        "workshopCount": 7,
        "childPopulation": 176892,
        "website": "https://www.palazzoesposizioniroma.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Roma",
        "region": "Roma"
    },
    {
        "id": "M006",
        "name": "Explora - Museo dei Bambini di Roma",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 17,
        "childPopulation": 176892,
        "website": "https://mdbr.it/",
        "educationalClass": "progettati_educare",
        "targetAudience": "bambini",
        "geographicArea": "centro",
        "city": "Roma",
        "region": "Roma"
    },
    {
        "id": "M007",
        "name": "Museo nazionale del Paleolitico di Isernia",
        "areaId": "area-storia-archeo",
        "categoryIds": [
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 1323,
        "website": "https://www.musei.molise.beniculturali.it/musei?mid=212&nome=museo-nazionale-del-paleolitico-di-isernia",
        "educationalClass": "senza_progetto",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Isernia",
        "region": "Isernia"
    },
    {
        "id": "M008",
        "name": "MACTE - Museo di Arte Contemporanea di Termoli",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-esperienziale",
            "cat-narrativa"
        ],
        "workshopCount": 0,
        "childPopulation": 1972,
        "website": "https://www.fondazionemacte.com/page/visita/visite-guidate",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Termoli",
        "region": "Termoli"
    },
    {
        "id": "M009",
        "name": "Museo regionale di Scienze Naturali",
        "areaId": "area-storia-scienze",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa"
        ],
        "workshopCount": 0,
        "childPopulation": 235,
        "website": "https://www.lovevda.it/it/banca-dati/8/musei/saint-pierre/museo-regionale-di-scienze-naturali/1206",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Saint-Pierre",
        "region": "Saint-Pierre"
    },
    {
        "id": "M010",
        "name": "Alpi dei ragazzi - Forte di Bard",
        "areaId": "area-territoriali",
        "categoryIds": [
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 5,
        "website": "https://www.fortedibard.it/musei/le-alpi-dei-ragazzi/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "bambini",
        "geographicArea": "nord",
        "city": "Bard",
        "region": "Bard"
    },
    {
        "id": "M011",
        "name": "Museo Archeologico Domenico Ridola",
        "areaId": "area-storia-archeo",
        "categoryIds": [
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 3785,
        "website": "https://www.museonazionaledimatera.it/il-museo-sedi/",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Matera",
        "region": "Matera"
    },
    {
        "id": "M012",
        "name": "MuNDA - Museo Nazionale d’Abruzzo",
        "areaId": "area-generali",
        "categoryIds": [
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 4584,
        "website": "https://museonazionaledabruzzo.cultura.gov.it/il-museo/",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "L'Aquila",
        "region": "L'Aquila"
    },
    {
        "id": "M013",
        "name": "MUSE' - Nuovo museo Paludi di Celano",
        "areaId": "area-storia-archeo",
        "categoryIds": [
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 700,
        "website": "https://museiabruzzo.cultura.gov.it/luoghi-della-cultura/629-muse-nuovo-museo-paludi-di-celano-centro-di-restauro/",
        "educationalClass": "senza_progetto",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Celano",
        "region": "Celano"
    },
    {
        "id": "M014",
        "name": "Museo casa natale di Gabriele d’Annunzio",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 7275,
        "website": "https://cultura.gov.it/luogo/museo-casa-natale-di-gabriele-d-annunzio",
        "educationalClass": "senza_progetto",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Pescara",
        "region": "Pescara"
    },
    {
        "id": "M015",
        "name": "MUSE - museo delle scienze di Trento",
        "areaId": "area-scienza-tecnica",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 72,
        "childPopulation": 7957,
        "website": "https://www.muse.it/",
        "educationalClass": "progettati_educare",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Trento",
        "region": "Trento"
    },
    {
        "id": "M016",
        "name": "Castello del Buonconsiglio",
        "areaId": "area-generali",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 22,
        "childPopulation": 7957,
        "website": "https://www.buonconsiglio.it/castello-del-buonconsiglio/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Trento",
        "region": "Trento"
    },
    {
        "id": "M017",
        "name": "Mart - Museo di Arte Moderna e Contemporanea",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 17,
        "childPopulation": 2790,
        "website": "https://www.mart.tn.it/?gad_source=1&gclid=Cj0KCQiAs5i8BhDmARIsAGE4xHzigTW2sQaGjR1KG2fN09Ghye8g52kR_CSO9BnEqb-1IodW3mMTTegaAgErEALw_wcB",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Rovereto",
        "region": "Rovereto"
    },
    {
        "id": "M018",
        "name": "Immaginario Scientifico",
        "areaId": "area-scienza-tecnica",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 8,
        "childPopulation": 11018,
        "website": "https://www.immaginarioscientifico.it/",
        "educationalClass": "progettati_educare",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Trieste",
        "region": "Trieste"
    },
    {
        "id": "M019",
        "name": "Museo Revoltella",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 6,
        "childPopulation": 11018,
        "website": "https://museorevoltella.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Trieste",
        "region": "Trieste"
    },
    {
        "id": "M020",
        "name": "BioMa - Biodiversitario Marino",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 11018,
        "website": "https://www.ampmiramare.it/cose-il-bioma/",
        "educationalClass": "progettati_educare",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Grignano",
        "region": "Grignano"
    },
    {
        "id": "M021",
        "name": "Aree archeologiche di Tharros e Cabras",
        "areaId": "area-natura-giardini",
        "categoryIds": [
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 494,
        "website": "https://monteprama.it/tharros/",
        "educationalClass": "senza_progetto",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Cabras",
        "region": "Cabras"
    },
    {
        "id": "M022",
        "name": "Museo Archeologico Nazionale di Cagliari",
        "areaId": "area-storia-archeo",
        "categoryIds": [
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 5,
        "childPopulation": 6834,
        "website": "https://museinazionalicagliari.cultura.gov.it/musei/museo-archeologico/?Category",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Cagliari",
        "region": "Cagliari"
    },
    {
        "id": "M023",
        "name": "Sa Corona Arrubia",
        "areaId": "area-generali",
        "categoryIds": [
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 73,
        "website": "https://www.sardegnaturismo.it/it/esplora/sa-corona-arrubia",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Lunamatrona",
        "region": "Lunamatrona"
    },
    {
        "id": "M024",
        "name": "La Città dei Bambini e dei Ragazzi",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 15,
        "childPopulation": 31977,
        "website": "https://www.cittadeibambini.net/",
        "educationalClass": "progettati_educare",
        "targetAudience": "bambini",
        "geographicArea": "nord",
        "city": "Genova",
        "region": "Genova"
    },
    {
        "id": "M025",
        "name": "Acquario di Genova",
        "areaId": "area-natura-giardini",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 15,
        "childPopulation": 31977,
        "website": "https://www.acquariodigenova.it/?s=&gad_source=1&gclid=Cj0KCQiAs5i8BhDmARIsAGE4xHzQNDuV4D-2KpEncqk0MhDnzPlcRVFOpqCgfTpj46ViGCiqrXg5_usaAitlEALw_wcB",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Genova",
        "region": "Genova"
    },
    {
        "id": "M026",
        "name": "Palazzo Reale di Genova",
        "areaId": "area-generali",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 14,
        "childPopulation": 31977,
        "website": "https://palazzorealegenova.cultura.gov.it/wp-content/uploads/SCUOLA-INFANZIA-2024_25.pdf",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Genova",
        "region": "Genova"
    },
    {
        "id": "M027",
        "name": "Galata Museo del Mare",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 16,
        "childPopulation": 31977,
        "website": "https://galatamuseodelmare.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Genova",
        "region": "Genova"
    },
    {
        "id": "M028",
        "name": "Casa di Giulietta",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 1,
        "childPopulation": 15744,
        "website": "https://casadigiulietta.comune.verona.it/nqcontent.cfm?a_id=42703",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Verona",
        "region": "Verona"
    },
    {
        "id": "M029",
        "name": "Anfiteatro Arena di Verona",
        "areaId": "area-monumenti",
        "categoryIds": [
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 3,
        "childPopulation": 15744,
        "website": "https://museomaffeiano.comune.verona.it/nqcontent.cfm?a_id=44593#:~:text=%C3%88%20uno%20dei%20pi%C3%B9%20grandi,ad%20animali%20feroci%20ed%20esotici.",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Verona",
        "region": "Verona"
    },
    {
        "id": "M030",
        "name": "Palazzo Ducale di Venezia",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 6,
        "childPopulation": 14174,
        "website": "https://palazzoducale.visitmuve.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Venezia",
        "region": "Venezia"
    },
    {
        "id": "M031",
        "name": "CMV - Children’s Museum Verona",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 25,
        "childPopulation": 14174,
        "website": "https://www.cmverona.it/",
        "educationalClass": "progettati_educare",
        "targetAudience": "bambini",
        "geographicArea": "nord",
        "city": "Verona",
        "region": "Verona"
    },
    {
        "id": "M032",
        "name": "Pappagallo Rosso – Museo dei Bambini di Treviso",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 4,
        "childPopulation": 5303,
        "website": "https://www.pappagallorosso.it/il-museo/",
        "educationalClass": "progettati_educare",
        "targetAudience": "bambini",
        "geographicArea": "nord",
        "city": "Treviso",
        "region": "Treviso"
    },
    {
        "id": "M033",
        "name": "Museo Archeologico Nazionale di Reggio Calabria",
        "areaId": "area-storia-archeo",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 12,
        "childPopulation": 11340,
        "website": "https://www.museoarcheologicoreggiocalabria.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Reggio Calabria",
        "region": "Reggio Calabria"
    },
    {
        "id": "M034",
        "name": "Grotta del Romito",
        "areaId": "area-monumenti",
        "categoryIds": [
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 13,
        "website": "https://www.grottaromito.com/it",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Papasidero",
        "region": "Papasidero"
    },
    {
        "id": "M035",
        "name": "MuSaBa - Parco Museo Laboratorio Santa Barbara",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-interattiva",
            "cat-narrativa"
        ],
        "workshopCount": 1,
        "childPopulation": 168,
        "website": "https://www.musaba.org/",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Mammola",
        "region": "Mammola"
    },
    {
        "id": "M036",
        "name": "Galleria Nazionale di Cosenza \"Palazzo Arnone\"",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 4148,
        "website": "https://musei.calabria.beniculturali.it/musei?mid=80&nome=galleria-nazionale-di-cosenza",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Cosenza",
        "region": "Cosenza"
    },
    {
        "id": "M037",
        "name": "Museo Paleontologico dei Dinosauri",
        "areaId": "area-storia-scienze",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 3,
        "childPopulation": 787,
        "website": "https://www.dinosauriborgocelano.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Borgo Celano",
        "region": "Borgo Celano"
    },
    {
        "id": "M038",
        "name": "Castel del Monte",
        "areaId": "area-monumenti",
        "categoryIds": [
            "cat-esperienziale",
            "cat-narrativa"
        ],
        "workshopCount": 3,
        "childPopulation": 6718,
        "website": "https://museipuglia.cultura.gov.it/musei/castel-del-monte/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Andria",
        "region": "Andria"
    },
    {
        "id": "M039",
        "name": "Parco Archeologico \"Basiliche di Siponto\"",
        "areaId": "area-monumenti",
        "categoryIds": [
            "cat-narrativa"
        ],
        "workshopCount": 2,
        "childPopulation": 3402,
        "website": "https://museipuglia.cultura.gov.it/musei/parco-archeologico-di-siponto/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Manfredonia",
        "region": "Manfredonia"
    },
    {
        "id": "M040",
        "name": "MarTa, Museo Archeologico Nazionale di Taranto",
        "areaId": "area-storia-archeo",
        "categoryIds": [
            "cat-esperienziale",
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 7,
        "childPopulation": 11271,
        "website": "https://museotaranto.cultura.gov.it/it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Taranto",
        "region": "Taranto"
    },
    {
        "id": "M041",
        "name": "Galleria Nazionale dell'Umbria",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-interattiva",
            "cat-narrativa"
        ],
        "workshopCount": 8,
        "childPopulation": 10175,
        "website": "https://gallerianazionaledellumbria.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Perugia",
        "region": "Perugia"
    },
    {
        "id": "M042",
        "name": "Museo delle Mummie di Ferentillo",
        "areaId": "area-storia-archeo",
        "categoryIds": [
            "cat-narrativa"
        ],
        "workshopCount": 0,
        "childPopulation": 112,
        "website": "https://www.mummiediferentillo.it/",
        "educationalClass": "senza_progetto",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Precetto",
        "region": "Precetto"
    },
    {
        "id": "M043",
        "name": "Parco nazionale dei Monti Sibillini",
        "areaId": "area-natura-giardini",
        "categoryIds": [
            "cat-narrativa"
        ],
        "workshopCount": 0,
        "childPopulation": 10175,
        "website": "https://www.sibillini.net/",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Perugia",
        "region": "Perugia"
    },
    {
        "id": "M044",
        "name": "Valle dei Templi",
        "areaId": "area-monumenti",
        "categoryIds": [
            "cat-narrativa"
        ],
        "workshopCount": 0,
        "childPopulation": 3453,
        "website": "https://www.parcovalledeitempli.it/",
        "educationalClass": "senza_progetto",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Agrigento",
        "region": "Agrigento"
    },
    {
        "id": "M045",
        "name": "Museo regionale d'arte moderna e contemporanea Riso",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-narrativa"
        ],
        "workshopCount": 0,
        "childPopulation": 2155,
        "website": "https://www.museoartecontemporanea.it/museo_Riso/",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Favara",
        "region": "Favara"
    },
    {
        "id": "M046",
        "name": "MOOI - Museum of Optical Illusions",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-narrativa"
        ],
        "workshopCount": 0,
        "childPopulation": 3446,
        "website": "https://www.mooitrapani.com/",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Trapani",
        "region": "Trapani"
    },
    {
        "id": "M047",
        "name": "Parco Archeologico Naxos Taormina",
        "areaId": "area-monumenti",
        "categoryIds": [
            "cat-interattiva",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 4,
        "childPopulation": 514,
        "website": "https://parconaxostaormina.com/it",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Giardini Naxos",
        "region": "Giardini Naxos"
    },
    {
        "id": "M048",
        "name": "Polo Tattile Multimediale",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 21859,
        "website": "https://www.polotattile.it/",
        "educationalClass": "didattica_informativa",
        "targetAudience": "speciale",
        "geographicArea": "sud_isole",
        "city": "Catania",
        "region": "Catania"
    },
    {
        "id": "M049",
        "name": "Science Centre - Città della Scienza",
        "areaId": "area-scienza-tecnica",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 27,
        "childPopulation": 63441,
        "website": "http://www.cittadellascienza.it/",
        "educationalClass": "progettati_educare",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Napoli",
        "region": "Napoli"
    },
    {
        "id": "M050",
        "name": "Mann,  Museo Archeologico Nazionale di Napoli",
        "areaId": "area-storia-archeo",
        "categoryIds": [
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 1,
        "childPopulation": 63441,
        "website": "https://museoarcheologiconapoli.it/?gad_source=1&gclid=Cj0KCQiAs5i8BhDmARIsAGE4xHwKrzYO_YAG6llAAhexhS6hosvBfFZdprCqsF3-ssomssCd1GyTMdMaAoKQEALw_wcB",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Napoli",
        "region": "Napoli"
    },
    {
        "id": "M051",
        "name": "Reggia di Caserta",
        "areaId": "area-monumenti",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 13,
        "childPopulation": 4396,
        "website": "https://reggiadicaserta.cultura.gov.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Caserta",
        "region": "Caserta"
    },
    {
        "id": "M052",
        "name": "Parco archeologico di Pompei",
        "areaId": "area-monumenti",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 8,
        "childPopulation": 1703,
        "website": "https://pompeiisites.org/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Pompei",
        "region": "Pompei"
    },
    {
        "id": "M053",
        "name": "Museo Nazionale Ferroviario di Pietrarsa",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 27,
        "childPopulation": 63441,
        "website": "https://www.fondazionefs.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "sud_isole",
        "city": "Napoli",
        "region": "Napoli"
    },
    {
        "id": "M054",
        "name": "Museo del Balì",
        "areaId": "area-scienza-tecnica",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 14,
        "childPopulation": 940,
        "website": "https://www.museodelbali.it/",
        "educationalClass": "progettati_educare",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Colli al Metauro",
        "region": "Colli al Metauro"
    },
    {
        "id": "M055",
        "name": "Museo Casa Leopardi",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 1286,
        "website": "https://www.giacomoleopardi.it/",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Recanati",
        "region": "Recanati"
    },
    {
        "id": "M056",
        "name": "Museo della Carta e della Filigrana",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 2,
        "childPopulation": 1723,
        "website": "https://www.museodellacarta.com/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Fabriano",
        "region": "Fabriano"
    },
    {
        "id": "M057",
        "name": "Galleria Nazionale delle Marche",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 14,
        "childPopulation": 743,
        "website": "https://gndm.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Urbino",
        "region": "Urbino"
    },
    {
        "id": "M058",
        "name": "Museo Tattile Statale Omero",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-narrativa"
        ],
        "workshopCount": 0,
        "childPopulation": 6036,
        "website": "https://www.museoomero.it/",
        "educationalClass": "progettati_educare",
        "targetAudience": "speciale",
        "geographicArea": "centro",
        "city": "Ancona",
        "region": "Ancona"
    },
    {
        "id": "M059",
        "name": "MAM, Museo d'Arte sul Mare",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 19,
        "childPopulation": 2674,
        "website": "https://www.comunesbt.it/museodelmare/Engine/RAServePG.php/P/25241MDM0301/L/0",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "San Benedetto del Tronto",
        "region": "San Benedetto del Tronto"
    },
    {
        "id": "M060",
        "name": "Musei Vaticani",
        "areaId": "area-generali",
        "categoryIds": [
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 12,
        "childPopulation": 176892,
        "website": "https://www.museivaticani.va/content/museivaticani/it.html",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Roma",
        "region": "Roma"
    },
    {
        "id": "M061",
        "name": "MAXXI | Museo nazionale delle arti del XXI secolo",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 8,
        "childPopulation": 176892,
        "website": "https://www.maxxi.art/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Roma",
        "region": "Roma"
    },
    {
        "id": "M062",
        "name": "MACRO — Museum of Contemporary Art of Rome",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 176892,
        "website": "https://www.museomacro.it/it/",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Roma",
        "region": "Roma"
    },
    {
        "id": "M063",
        "name": "Muba - Museo dei bambini",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 9,
        "childPopulation": 85744,
        "website": "https://www.muba.it/",
        "educationalClass": "progettati_educare",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Milano",
        "region": "Milano"
    },
    {
        "id": "M064",
        "name": "Pinacoteca di Brera",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-narrativa"
        ],
        "workshopCount": 24,
        "childPopulation": 85744,
        "website": "https://pinacotecabrera.org/",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Milano",
        "region": "Milano"
    },
    {
        "id": "M065",
        "name": "Museo delle Culture",
        "areaId": "area-etno-antropo",
        "categoryIds": [
            "cat-interattiva",
            "cat-narrativa"
        ],
        "workshopCount": 8,
        "childPopulation": 85744,
        "website": "https://www.mudec.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Milano",
        "region": "Milano"
    },
    {
        "id": "M066",
        "name": "M. Naz. della Scienza e della Tecnologia “Leonardo da Vinci”",
        "areaId": "area-scienza-tecnica",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 44,
        "childPopulation": 85744,
        "website": "https://www.museoscienza.org/itww.museoscienza.org/it?gad_source=1&gclid=Cj0KCQiA1p28BhCBARIsADP9HrO_SayKOPKH5L8L4S5sNE8znBQXiuyYPrFzTEjkrnR0h_BJRh9tnh4aAvDqEALw_wcB",
        "educationalClass": "progettati_educare",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Milano",
        "region": "Milano"
    },
    {
        "id": "M067",
        "name": "Museo del Duomo",
        "areaId": "area-generali",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 18,
        "childPopulation": 85744,
        "website": "https://www.duomomilano.it/cultura-e-arte/museo-del-duomo/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Milano",
        "region": "Milano"
    },
    {
        "id": "M068",
        "name": "Museo MA*GA",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 8,
        "childPopulation": 3780,
        "website": "https://www.museomaga.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Gallarate",
        "region": "Gallarate"
    },
    {
        "id": "M069",
        "name": "Orto Botanico di Brera",
        "areaId": "area-natura-giardini",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa"
        ],
        "workshopCount": 15,
        "childPopulation": 85744,
        "website": "https://ortibotanici.unimi.it/orto-botanico-di-brera/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Milano",
        "region": "Milano"
    },
    {
        "id": "M070",
        "name": "ADI Design Museum",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 16,
        "childPopulation": 85744,
        "website": "https://www.adidesignmuseum.org/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Milano",
        "region": "Milano"
    },
    {
        "id": "M071",
        "name": "Castello Sforzesco",
        "areaId": "area-monumenti",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 22,
        "childPopulation": 85744,
        "website": "https://www.milanocastello.it/it",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Milano",
        "region": "Milano"
    },
    {
        "id": "M072",
        "name": "Museo Tattile Varese",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa"
        ],
        "workshopCount": 5,
        "childPopulation": 4820,
        "website": "http://www.museotattilevarese.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "speciale",
        "geographicArea": "nord",
        "city": "Varese",
        "region": "Varese"
    },
    {
        "id": "M073",
        "name": "MAMbo - Museo d'Arte Moderna di Bologna",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa"
        ],
        "workshopCount": 16,
        "childPopulation": 23837,
        "website": "https://www.museibologna.it/mambo/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Bologna",
        "region": "Bologna"
    },
    {
        "id": "M074",
        "name": "Pinacoteca Nazionale di Bologna",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-interattiva",
            "cat-narrativa"
        ],
        "workshopCount": 9,
        "childPopulation": 23837,
        "website": "https://www.pinacotecabologna.beniculturali.it/it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Bologna",
        "region": "Bologna"
    },
    {
        "id": "M075",
        "name": "Musei Ferrari",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-interattiva",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 4,
        "childPopulation": 13096,
        "website": "https://www.ferrari.com/it-IT/museums",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Modena / Maranello",
        "region": "Modena / Maranello"
    },
    {
        "id": "M076",
        "name": "Museo Tattile Anteros",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa"
        ],
        "workshopCount": 0,
        "childPopulation": 23837,
        "website": "https://www.cavazza.it/drupal/it/museoanteros",
        "educationalClass": "progettati_educare",
        "targetAudience": "speciale",
        "geographicArea": "nord",
        "city": "Bologna",
        "region": "Bologna"
    },
    {
        "id": "M077",
        "name": "Museo Zoologico di Bologna",
        "areaId": "area-storia-scienze",
        "categoryIds": [
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 14,
        "childPopulation": 23837,
        "website": "https://sma.unibo.it/it/il-sistema-museale/collezione-di-zoologia",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Bologna",
        "region": "Bologna"
    },
    {
        "id": "M078",
        "name": "Palazzo Albergarti",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-esperienziale",
            "cat-narrativa"
        ],
        "workshopCount": 3,
        "childPopulation": 23837,
        "website": "https://www.palazzoalbergati.com/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Bologna",
        "region": "Bologna"
    },
    {
        "id": "M079",
        "name": "NatuRa - museo ravennate di scienze naturali",
        "areaId": "area-storia-scienze",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 16,
        "childPopulation": 9077,
        "website": "https://www.naturaravenna.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "S. Alberto",
        "region": "S. Alberto"
    },
    {
        "id": "M080",
        "name": "La Macchina del Tempo",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-interattiva",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 23837,
        "website": "https://www.lamacchinadeltempo.eu/",
        "educationalClass": "senza_progetto",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Bologna",
        "region": "Bologna"
    },
    {
        "id": "M081",
        "name": "Castello di Bardi",
        "areaId": "area-monumenti",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 12,
        "childPopulation": 77,
        "website": "https://www.castellodibardi.info/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Bardi",
        "region": "Bardi"
    },
    {
        "id": "M082",
        "name": "Museo Civico Medievale",
        "areaId": "area-generali",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa"
        ],
        "workshopCount": 0,
        "childPopulation": 23837,
        "website": "https://www.museibologna.it/medievale/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Bologna",
        "region": "Bologna"
    },
    {
        "id": "M083",
        "name": "MAcA – Museo A come Ambiente",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 31,
        "childPopulation": 50945,
        "website": "https://www.acomeambiente.org/",
        "educationalClass": "progettati_educare",
        "targetAudience": "bambini",
        "geographicArea": "nord",
        "city": "Torino",
        "region": "Torino"
    },
    {
        "id": "M084",
        "name": "Museo Rodari",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 744,
        "website": "https://museorodari.it/",
        "educationalClass": "progettati_educare",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Omegna",
        "region": "Omegna"
    },
    {
        "id": "M085",
        "name": "Museo Egizio di Torino",
        "areaId": "area-storia-archeo",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 29,
        "childPopulation": 50945,
        "website": "https://www.museoegizio.it/?gad_source=1&gclid=Cj0KCQiA1p28BhCBARIsADP9HrMt4vpQ1y5UjHRxBEco6M04S0mtxsR8gdM2qFDRvZ5_jo7WVMbhxzQaAn-1EALw_wcB",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Torino",
        "region": "Torino"
    },
    {
        "id": "M086",
        "name": "Museo Nazionale del Cinema",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 50945,
        "website": "https://www.museocinema.it/it?gad_source=1&gclid=Cj0KCQiA1p28BhCBARIsADP9HrMguoqUO6ivYJPHUAxfW0mQZASdBJaqTkaOWQ3zooa9D9VujZDESPwaAowxEALw_wcB",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Torino",
        "region": "Torino"
    },
    {
        "id": "M087",
        "name": "Museo Lavazza",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa"
        ],
        "workshopCount": 0,
        "childPopulation": 50945,
        "website": "https://www.lavazza.it/it/museo-lavazza/scopri-il-museo",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Torino",
        "region": "Torino"
    },
    {
        "id": "M088",
        "name": "Musei Reali Torino",
        "areaId": "area-generali",
        "categoryIds": [
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 8,
        "childPopulation": 50945,
        "website": "https://museireali.beniculturali.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Torino",
        "region": "Torino"
    },
    {
        "id": "M089",
        "name": "Museo Nazionale Dell'Automobile - MAUTO",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-interattiva",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 8,
        "childPopulation": 50945,
        "website": "https://www.museoauto.com/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Torino",
        "region": "Torino"
    },
    {
        "id": "M090",
        "name": "Palazzo Madama - Museo Civico D'Arte Antica",
        "areaId": "area-generali",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 50945,
        "website": "https://www.palazzomadamatorino.it/it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Torino",
        "region": "Torino"
    },
    {
        "id": "M091",
        "name": "Museo regionale di Scienze naturali",
        "areaId": "area-storia-scienze",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa"
        ],
        "workshopCount": 38,
        "childPopulation": 50945,
        "website": "https://mrsntorino.it/it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Torino",
        "region": "Torino"
    },
    {
        "id": "M092",
        "name": "Galleria d’Arte Moderna piemonte",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa"
        ],
        "workshopCount": 12,
        "childPopulation": 50945,
        "website": "https://www.gamtorino.it/it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Torino",
        "region": "Torino"
    },
    {
        "id": "M093",
        "name": "Marengo Museum",
        "areaId": "area-storia-archeo",
        "categoryIds": [
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 5755,
        "website": "http://www.marengomuseum.it/",
        "educationalClass": "didattica_informativa",
        "targetAudience": "tutti",
        "geographicArea": "nord",
        "city": "Spinetta Marengo",
        "region": "Spinetta Marengo"
    },
    {
        "id": "M094",
        "name": "Galleria degli Uffizi",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-narrativa"
        ],
        "workshopCount": 15,
        "childPopulation": 21409,
        "website": "https://www.uffizi.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Firenze",
        "region": "Firenze"
    },
    {
        "id": "M095",
        "name": "Palazzo Pitti",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-esperienziale",
            "cat-narrativa"
        ],
        "workshopCount": 16,
        "childPopulation": 21409,
        "website": "https://www.uffizi.it/palazzo-pitti",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Firenze",
        "region": "Firenze"
    },
    {
        "id": "M096",
        "name": "Galleria dell'Accademia di Firenze",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 4,
        "childPopulation": 21409,
        "website": "https://www.galleriaaccademiafirenze.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Firenze",
        "region": "Firenze"
    },
    {
        "id": "M097",
        "name": "Piccolo museo del diario",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-interattiva",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 5,
        "childPopulation": 167,
        "website": "https://www.piccolomuseodeldiario.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Pieve Santo Stefano",
        "region": "Pieve Santo Stefano"
    },
    {
        "id": "M098",
        "name": "Centro Pecci",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-interattiva",
            "cat-narrativa"
        ],
        "workshopCount": 10,
        "childPopulation": 12874,
        "website": "https://centropecci.it/?gad_source=1&gclid=Cj0KCQiA1p28BhCBARIsADP9HrPMm8jBKKhenuxc0slC5YGB9T0sEbnSJ7V2L7YBq_3sVYF6WpmPWHMaAmshEALw_wcB",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Prato",
        "region": "Prato"
    },
    {
        "id": "M099",
        "name": "Museo di Storia Naturale, Calci",
        "areaId": "area-storia-scienze",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 53,
        "childPopulation": 5014,
        "website": "https://www.msn.unipi.it/it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Pisa",
        "region": "Pisa"
    },
    {
        "id": "M100",
        "name": "Palazzo Blu",
        "areaId": "area-arte",
        "categoryIds": [
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 6,
        "childPopulation": 5014,
        "website": "https://palazzoblu.it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Pisa",
        "region": "Pisa"
    },
    {
        "id": "M101",
        "name": "Museo Galileo",
        "areaId": "area-scienza-tecnica",
        "categoryIds": [
            "cat-interattiva",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 25,
        "childPopulation": 21409,
        "website": "https://museogalileo.it/it/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Firenze",
        "region": "Firenze"
    },
    {
        "id": "M102",
        "name": "Leonardo Interactive Museum",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-ludica",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 0,
        "childPopulation": 21409,
        "website": "https://leonardointeractivemuseum.com/",
        "educationalClass": "progettati_educare",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Firenze",
        "region": "Firenze"
    },
    {
        "id": "M103",
        "name": "Carmi - museo Carrara e Michelangelo",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-interattiva",
            "cat-narrativa"
        ],
        "workshopCount": 7,
        "childPopulation": 3151,
        "website": "https://carmi.museocarraraemichelangelo.it/home2721.html",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Carrara",
        "region": "Carrara"
    },
    {
        "id": "M104",
        "name": "Museo delle Statue Stele Lunigianesi",
        "areaId": "area-storia-archeo",
        "categoryIds": [
            "cat-esperienziale",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 12,
        "childPopulation": 332,
        "website": "https://statuestele.org/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Pontremoli",
        "region": "Pontremoli"
    },
    {
        "id": "M105",
        "name": "Puccini Museum",
        "areaId": "area-specializzati",
        "categoryIds": [
            "cat-esperienziale",
            "cat-narrativa",
            "cat-informativa"
        ],
        "workshopCount": 5,
        "childPopulation": 5223,
        "website": "https://www.puccinimuseum.org/",
        "educationalClass": "percorsi_progettati",
        "targetAudience": "tutti",
        "geographicArea": "centro",
        "city": "Lucca",
        "region": "Lucca"
    }
]
};
