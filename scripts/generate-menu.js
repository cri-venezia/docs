import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';

// Percorso alla cartella 'public/docs'
const docsDir = path.resolve(process.cwd(), 'public/docs');
// Percorso del file JSON da generare in 'src/'
const outputFilePath = path.resolve(process.cwd(), 'src/menu.json');

// Funzione per formattare i nomi delle categorie (es. 'cri-trasporti' -> 'Cri Trasporti')
const formatCategoryName = (dirName) => {
  return dirName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Funzione per formattare i nomi dei file (es. 'install-guide' -> 'Install Guide')
const formatFileName = (filePath) => {
  const fileName = path.basename(filePath, '.md');
  
  if (fileName === 'index') {
    return 'Introduzione';
  }
  
  return fileName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Funzione per leggere il titolo H1 da un file markdown
const getTitleFromFile = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Cerca la prima riga che inizia con '# '
    const match = content.match(/^#\s+(.*)/m);
    if (match && match[1]) {
      return match[1].trim(); // Ritorna il testo del titolo
    }
  } catch (err) {
    console.error(`Errore leggendo ${filePath}:`, err);
  }
  return null; // Ritorna null se non trova H1 o c'è un errore
};


const generateMenu = async () => {
  try {
    // 1. Trova tutte le sottocartelle in 'public/docs' (es. 'generale', 'cri-trasporti')
    const categories = (await fs.readdir(docsDir, { withFileTypes: true }))
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const menu = [];

    // 2. Itera su ogni cartella di categoria
    for (const categoryDir of categories) {
      const categoryPath = path.join(docsDir, categoryDir);
      // Trova tutti i file .md nella cartella
      const files = await glob('*.md', { cwd: categoryPath });

      const fileData = files.map(file => {
        const filePath = path.join(categoryPath, file);
        // Tenta di prendere il titolo H1, altrimenti formatta il nome file
        const title = getTitleFromFile(filePath);
        const name = title || formatFileName(file);
        
        return {
          name: name,
          path: file, // es. 'index.md' o 'install.md'
          isIndex: file === 'index.md'
        };
      });

      // Ordina i file: 'index.md' (Introduzione) sempre per primo
      fileData.sort((a, b) => {
        if (a.isIndex) return -1;
        if (b.isIndex) return 1;
        return a.name.localeCompare(b.name);
      });

      menu.push({
        category: formatCategoryName(categoryDir), // es. 'Cri Trasporti'
        path: categoryDir, // es. 'cri-trasporti'
        files: fileData // Usa la chiave 'files'
      });
    }

    // 3. Scrive il file JSON in 'src/menu.json'
    await fs.outputJson(outputFilePath, menu, { spaces: 2 });
    console.log(`Menu generato con successo in ${outputFilePath}`);

  } catch (error) {
    // Gestisce il caso in cui la cartella 'public/docs' non esista
    if (error.code === 'ENOENT') {
      console.warn("Cartella 'public/docs' non trovata. Genero un menu vuoto.");
      await fs.outputJson(outputFilePath, [], { spaces: 2 });
    } else {
      console.error('Errore durante la generazione del menu:', error);
      process.exit(1); // Esce con errore se fallisce
    }
  }
};

generateMenu();