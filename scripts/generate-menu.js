import fs from 'fs-extra';
import path from 'path';

// Percorsi
const docsDir = path.resolve(process.cwd(), 'public/docs');
const outputFilePath = path.resolve(process.cwd(), 'src/menu.json');

// --- Funzioni Helper (formattazione e lettura titoli) ---

const formatName = (name) => {
  return name
    .replace(/\.md$/, '') // Rimuove .md
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getTitleFromFile = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/^#\s+(.*)/m); // Cerca H1
    if (match && match[1]) {
      return match[1].trim();
    }
  } catch (err) { /* ignora errore */ }
  return null;
};

// --- NUOVA FUNZIONE RICORSIVA ---

/**
 * Scansiona una cartella e ritorna un array di "items"
 * @param {string} dirPath - Percorso della cartella da scansionare (es. .../public/docs/cri-corsi)
 * @param {string} relativePath - Percorso relativo alla categoria (es. '' o 'admin')
 */
const processDirectory = (dirPath, relativePath = '') => {
  const items = [];
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    // Processa i file .md
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        const filePath = path.join(dirPath, entry.name);
        const fileRelativePath = path.join(relativePath, entry.name);

        const title = getTitleFromFile(filePath);
        const name = title || formatName(entry.name === 'index.md' ? 'Introduzione' : entry.name);
        
        items.push({
          type: 'file',
          name: name,
          path: fileRelativePath.replace(/\\/g, '/'), // 'index.md' o 'admin/guida.md'
          isIndex: entry.name === 'index.md'
        });
      }
    }

    // Processa le sottocartelle
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subDirPath = path.join(dirPath, entry.name);
        const subRelativePath = path.join(relativePath, entry.name);
        
        // Chiamata ricorsiva
        const subItems = processDirectory(subDirPath, subRelativePath);
        
        if (subItems.length > 0) {
          items.push({
            type: 'group',
            name: formatName(entry.name), // es. 'Admin'
            path: subRelativePath.replace(/\\/g, '/'),
            items: subItems // Array nidificato
          });
        }
      }
    }

    // Ordina: index.md per primo, poi file, poi gruppi
    items.sort((a, b) => {
      if (a.isIndex) return -1;
      if (b.isIndex) return 1;
      if (a.type === 'file' && b.type === 'group') return -1;
      if (a.type === 'group' && b.type === 'file') return 1;
      return a.name.localeCompare(b.name);
    });

    return items;

  } catch (error) {
    console.warn(`Attenzione: impossibile scansionare ${dirPath}`, error.message);
    return [];
  }
};


// --- Funzione Principale ---

const generateMenu = async () => {
  try {
    const categories = (await fs.readdir(docsDir, { withFileTypes: true }))
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const menu = [];

    for (const categoryDir of categories) {
      const categoryPath = path.join(docsDir, categoryDir);
      
      // Avvia la scansione ricorsiva per questa categoria
      const items = processDirectory(categoryPath); 

      if (items.length > 0) {
        menu.push({
          category: formatName(categoryDir),
          path: categoryDir,
          items: items // L'array 'files' ora si chiama 'items' ed è nidificato
        });
      }
    }

    await fs.outputJson(outputFilePath, menu, { spaces: 2 });
    console.log(`Menu ricorsivo generato con successo in ${outputFilePath}`);

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn("Cartella 'public/docs' non trovata. Genero un menu vuoto.");
      await fs.outputJson(outputFilePath, [], { spaces: 2 });
    } else {
      console.error('Errore durante la generazione del menu:', error);
      process.exit(1);
    }
  }
};

generateMenu();