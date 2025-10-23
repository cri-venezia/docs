import fs from 'fs';
import path from 'path';

const docsDir = path.resolve(process.cwd(), 'public/docs');
const menuFile = path.resolve(process.cwd(), 'public/menu.json');

// Funzione per capitalizzare la prima lettera
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Funzione per generare un titolo leggibile dal nome del file/cartella
function formatName(name) {
  return capitalize(name.replace(/-/g, ' '));
}

function getMenuStructure(dir) {
  const structure = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    // Ignoriamo file nascosti (es. .DS_Store)
    if (item.name.startsWith('.')) continue;

    const itemPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // Questa è una categoria (es. cri-trasporti)
      const categoryName = item.name;
      const files = fs.readdirSync(itemPath)
        .filter(file => file.endsWith('.md') && !file.startsWith('.'))
        .map(file => {
          const fileName = path.basename(file, '.md');
          return {
            title: formatName(fileName),
            file: fileName // Es. 'install'
          };
        });
      
      // Mettiamo 'Generale' per primo, se esiste
      const group = {
        category: formatName(categoryName),
        path: categoryName,
        files: files
      };
      
      if (categoryName === 'generale') {
        structure.unshift(group);
      } else {
        structure.push(group);
      }

    } else if (item.isFile() && item.name.endsWith('.md')) {
      // Questo è un file nella root (es. introduction.md)
      // Lo gestiamo come se fosse nella categoria 'Generale' (o creiamo 'Generale' se non c'è)
      
      let generalGroup = structure.find(g => g.path === 'generale');
      if (!generalGroup) {
        generalGroup = {
          category: 'Generale',
          path: 'generale', // Assumiamo che i file root siano mappati a /generale/
          files: []
        };
        structure.unshift(generalGroup);
      }
      
      const fileName = path.basename(item.name, '.md');
      generalGroup.files.push({
        title: formatName(fileName),
        file: fileName
      });
    }
  }

  // Se abbiamo messo i file root in 'generale', assicuriamoci che i file
  // della cartella 'generale' (se esiste) siano uniti
  const generalDirs = structure.filter(g => g.path === 'generale');
  if (generalDirs.length > 1) {
    const mainGeneral = generalDirs[0];
    const otherGeneral = generalDirs[1];
    mainGeneral.files = [...mainGeneral.files, ...otherGeneral.files];
    // Rimuovi il duplicato
    structure.splice(structure.lastIndexOf(otherGeneral), 1);
  }


  return structure;
}

try {
  // Scansioniamo le cartelle 'generale' e 'cri-trasporti'
  const menuData = getMenuStructure(docsDir);
  
  // Scriviamo il file JSON in /public/menu.json
  fs.writeFileSync(menuFile, JSON.stringify(menuData, null, 2));
  console.log('Menu generato con successo in public/menu.json');

} catch (error) {
  console.error('Errore durante la generazione del menu:', error);
  // Se la cartella docs non esiste, crea un menu vuoto
  if (error.code === 'ENOENT') {
    fs.writeFileSync(menuFile, JSON.stringify([], null, 2));
    console.log('Cartella public/docs non trovata. Creato menu.json vuoto.');
  }
}