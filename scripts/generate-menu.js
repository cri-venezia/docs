import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';

const docsPath = path.join(process.cwd(), 'public/docs');
// Salviamo il file dentro /src, così possiamo importarlo
// direttamente nel codice di Vue.
const menuOutputPath = path.join(process.cwd(), 'src/menu.json');

const menu = [];

/**
 * Cerca di estrarre il titolo H1 da un file markdown.
 * @param {string} filePath - Percorso del file .md
 * @returns {string | null} - Il testo del titolo H1 se trovato, altrimenti null.
 */
function getTitleFromMarkdown(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Cerca la prima riga che inizia con '# ' (H1)
    const match = content.match(/^#\s+(.+)/m);
    if (match && match[1]) {
      return match[1]; // Ritorna il testo catturato dopo '# '
    }
  } catch (e) {
    console.warn(`[generate-menu] Impossibile leggere il file ${filePath}: ${e.message}`);
  }
  return null;
}

try {
  // Controlla se la cartella public/docs esiste prima di leggerla
  if (fs.existsSync(docsPath)) {
    const categories = fs.readdirSync(docsPath).filter(file => 
      fs.statSync(path.join(docsPath, file)).isDirectory()
    );

    categories.forEach(category => {
      const categoryPath = path.join(docsPath, category);
      let files = glob.sync(`${categoryPath}/**/*.md`);
      
      // Ordina i file per mettere 'index.md' per primo
      files.sort((a, b) => {
        const aName = path.basename(a).toLowerCase();
        const bName = path.basename(b).toLowerCase();
        
        if (aName === 'index.md') return -1; // 'index.md' viene prima
        if (bName === 'index.md') return 1;  // 'index.md' viene prima
        return a.localeCompare(b); // Ordine alfabetico per gli altri
      });

      const pages = files.map(file => {
        const relativePath = path.relative(docsPath, file);
        const basename = path.basename(file, '.md');
        
        // --- MODIFICA ---
        // 1. Prova a leggere il titolo H1 dal file
        let name = getTitleFromMarkdown(file);

        // 2. Se non c'è H1, usa la logica di fallback basata sul nome del file
        if (!name) {
          if (basename.toLowerCase() === 'index') {
            name = 'Introduzione'; // Default per index.md
          } else {
            // Capitalizza e sostituisci i trattini
            name = basename.charAt(0).toUpperCase() + basename.slice(1);
            name = name.replace(/-/g, ' '); // Es: "aggiungi-trasporto" -> "Aggiungi trasporto"
          }
        }
        // --- FINE MODIFICA ---

        // Sostituisci i separatori di percorso di Windows (\\) con quelli web (/)
        const link = relativePath.replace(/\\/g, '/');
        
        return {
          name: name, // Nome (da H1 o da nome file)
          link: link, // Es: "cri-trasporti/install.md" o "cri-trasporti/index.md"
        };
      });

      if (pages.length > 0) {
        menu.push({
          category: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' '), // Es: "Cri trasporti"
          path: category,
          pages: pages,
        });
      }
    });
  } else {
    console.warn(`[generate-menu] Cartella non trovata: ${docsPath}. Il menu sarà vuoto.`);
  }

  // Scrivi il file menu.json anche se è vuoto
  // Questo evita che la build fallisca
  fs.writeJsonSync(menuOutputPath, menu, { spaces: 2 });
  console.log(`[generate-menu] File menu.json generato con ${menu.length} categorie.`);

} catch (error) {
  console.error('[generate-menu] Errore durante la generazione del menu:', error);
  // Scrivi un menu vuoto in caso di errore per non bloccare la build
  fs.writeJsonSync(menuOutputPath, [], { spaces: 2 });
  process.exit(1); // Esci con un codice di errore per segnalare il fallimento
}
