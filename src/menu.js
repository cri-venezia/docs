import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';

const docsPath = path.join(process.cwd(), 'public/docs');
// --- MODIFICA ---
// Salviamo il file dentro /src, così possiamo importarlo
// direttamente nel codice di Vue.
const menuOutputPath = path.join(process.cwd(), 'src/menu.json');

const menu = [];

try {
  // Controlla se la cartella public/docs esiste prima di leggerla
  if (fs.existsSync(docsPath)) {
    const categories = fs.readdirSync(docsPath).filter(file => 
      fs.statSync(path.join(docsPath, file)).isDirectory()
    );

    categories.forEach(category => {
      const categoryPath = path.join(docsPath, category);
      const files = glob.sync(`${categoryPath}/**/*.md`);
      
      const pages = files.map(file => {
        const relativePath = path.relative(docsPath, file);
        const name = path.basename(file, '.md');
        // Sostituisci i separatori di percorso di Windows (\\) con quelli web (/)
        const link = relativePath.replace(/\\/g, '/');
        
        return {
          name: name.charAt(0).toUpperCase() + name.slice(1), // Es: "Install"
          link: link, // Es: "cri-trasporti/install.md"
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