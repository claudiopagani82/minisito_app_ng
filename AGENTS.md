<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# DomusTua — Mini-sito immobiliare replicabile

## Cos'è questo progetto
Il **template di mini-sito** usato da DomusTua Immobiliare per presentare un singolo immobile in vendita. Ogni immobile ha il suo sito, generato clonando questo repo.

Questo repo (`minisitoreplicabile`) è il **template repository su GitHub**: il pannello di controllo `domus-admin-hub` lo clona per creare un nuovo sito, crea il progetto Vercel corrispondente e poi ne modifica i contenuti da remoto.

Il repo nasceva da un template generico di reverse-engineering di siti web — da qui il nome cartella `ai-website-cloner-template`, ormai fuorviante. Quella fase è conclusa: oggi è un prodotto a sé.

## Architettura dei contenuti — LEGGERE PRIMA DI MODIFICARE

**`src/config/property.json` è l'unica fonte dei contenuti variabili del sito.** Tutte le pagine e il `layout.tsx` lo importano direttamente (`import property from '@/config/property.json'`).

Contiene: `version`, `disabled`, `title`, `address`, `agencyName`, `agencyPhone`, `agencyEmail` e l'array `navigation` di `{ title, href, enabled }`.

La sezione `doveSiamo` (`enabled`, `heading`, `address`, `mapImage`, `generatedAt`, `lat`, `lng`, `servizi[]`) è generata automaticamente da `minisito-admintool` (Google Maps Platform: geocoding + luoghi vicini + mappa statica) al momento della creazione del sito o tramite il pulsante "Rigenera mappa" nell'editor — non va compilata a mano.

Due vincoli che ne derivano:

1. **Il file viene scritto dall'esterno.** Il pannello admin lo modifica via API GitHub, committando direttamente sul branch `main` di ogni sito. Prima di lavorare in locale fai sempre `git pull`: il repo può essere avanti senza che tu abbia toccato nulla.
2. **La sua struttura è un contratto.** `minisito-admintool/src/components/PropertyEditor.tsx` costruisce il form sui nomi di questi campi. Rinominare o rimuovere una chiave rompe il pannello **in silenzio**, senza errori di build. Qualunque modifica allo schema va fatta sui due repo insieme.

Il flag `enabled` di ogni voce di `navigation` controlla se la pagina compare nel menu; `disabled: true` a livello di root mostra la pagina "immobile non disponibile".

## Versioning
Ogni volta che il campo `version` di `property.json` viene incrementato, aggiungi una voce corrispondente in `CHANGELOG.md` **prima** di committare, descrivendo cosa cambia per i siti generati dal template. Questo changelog è la base della futura funzione "Aggiorna" nell'admin hub (confronto tra la versione di un sito deployato e l'ultima disponibile).

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **UI:** shadcn/ui, Tailwind CSS v4 con token oklch, utility `cn()`
- **Icone:** Lucide React
- **Deploy:** Vercel (deploy automatico al push su `main`)
- **Node:** 24 (vedi `.nvmrc` e `engines` in `package.json`)

## Comandi
- `npm run dev` — server di sviluppo
- `npm run build` — build di produzione
- `npm run lint` — ESLint
- `npm run typecheck` — controllo TypeScript
- `npm run check` — lint + typecheck + build (usa questo prima di committare)

## Code Style
- TypeScript strict, mai `any`
- Named export, componenti PascalCase, utility camelCase
- Solo classi Tailwind, niente stili inline
- Indentazione 2 spazi
- Mobile-first: il sito viene aperto quasi sempre da telefono

## Design
- Ogni pixel conta: spaziature, colori e tipografia sono curati
- Contenuti reali, mai placeholder
- Il committente è un'agenzia immobiliare: tono sobrio e professionale

## Struttura
```
src/
  app/              # 17 rotte, una cartella per pagina + page.tsx (home)
                    #   introduzione, come-raggiungerci-1, come-raggiungerci-2,
                    #   dove-siamo, open-domus, caratteristiche-principali,
                    #   planimetrie (planimetrie + dati catastali uniti), ape,
                    #   bollette-e-impianti, relazione-tecnica, documenti-condominiali,
                    #   bozza-proposta, prospetto-costi, matterport, video-social,
                    #   per-te-venditore
  components/
    DocumentLayout.tsx  # layout pagine-documento (elenchi di PDF scaricabili)
    PhotoLayout.tsx     # layout pagine-fotografiche
    Navigation.tsx      # menu, legge navigation[] da property.json
    Lightbox.tsx        # visualizzatore foto a schermo intero
    Footer.tsx
    DomusTuaLogo.tsx
    ui/                 # primitive shadcn/ui
  config/
    property.json   # ⚠️ fonte dei contenuti — vedi sezione Architettura
  lib/
    utils.ts        # cn()
public/
  images/           # foto e documenti dell'immobile
  videos/
  seo/
docs/superpowers/   # piani e specifiche delle feature già realizzate
```

## Note operative
- Il progetto vive dentro OneDrive, in un percorso lungo. Sono necessari `git config core.longpaths true` e il supporto Windows ai percorsi lunghi attivo, altrimenti `npm install` e le operazioni Git falliscono con "Filename too long".
- `src/lib/navigation.ts` non è importato da nessun file e contiene rotte non esistenti: è un residuo, non usarlo come riferimento.
- I file di istruzioni per altri assistenti (`.cursor/`, `.gemini/`, `.windsurf/`, `.codex/`, ecc.) erano generati da uno script di sincronizzazione non più presente. Se modifichi questo file, restano indietro: aggiornali a mano solo se ti servono davvero.
