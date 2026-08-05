# Changelog

Registro delle modifiche a questo template, una voce per ogni valore del campo `version` in `src/config/property.json`. Serve anche come base per la futura funzione "Aggiorna" nell'admin hub, che confronterà la versione di un sito già deployato con l'ultima disponibile qui.

Il changelog parte da questa versione in avanti: le versioni precedenti non sono documentate qui.

## [1.5] - 2026-08-03
### Modificato
- Le sezioni "Planimetrie" e "Documenti catastali" sono state unite in un'unica pagina "Planimetrie e dati catastali" (voce di navigazione unica, ancora su `/planimetrie`), nello stesso formato a elenco di documenti scaricabili già usato per "Documenti condominiali" (non più foto in galleria). Le chiavi `planimetrie` e `documentiCatastali` di `property.json` sono state sostituite dalla nuova chiave `planimetrieCatasto`.
- **Nota per l'Aggiorna:** questa è una modifica non additiva (rinomina/rimozione di chiavi). Un sito già deployato che riceve questo aggiornamento manterrà le vecchie chiavi `planimetrie`/`documentiCatastali` nel proprio `property.json` (dati non persi, ma non più raggiungibili da nessuna pagina) e la voce di menu "Documenti catastali" diventerà un link non più valido, finché non viene rimossa a mano nell'editor.

## [1.4] - 2026-08-01
### Aggiunto
- Pagina "Dove siamo": mappa dei dintorni (scuole, supermercati, farmacie, parcheggi, stazione) con distanza e tempo a piedi, generata automaticamente da `minisito-admintool` tramite Google Maps Platform. Nuova sezione `doveSiamo` in `property.json` e nuova voce di navigazione `/dove-siamo`.
