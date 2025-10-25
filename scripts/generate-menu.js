import fs from 'fs'; // <-- MODIFICA: Importa il modulo 'fs' nativo di Node.js
import fse from 'fs-extra'; // <-- MODIFICA: Importa 'fs-extra' come 'fse'
import path from 'path';
import matter from 'gray-matter';

// Percorsi (invariati)
const docsDir = path.resolve(process.cwd(), 'public/docs');
const outputFilePath = path.resolve(process.cwd(), 'src/menu.json');

// --- Funzioni Helper (formattazione) ---

const formatName = (name) => {
    return name
        .replace(/\.md$/, '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// --- Funzione ParseFile (usa 'fs' nativo) ---
const parseFile = (filePath) => {
    try {
        // 'fs.readFileSync' ora è risolto perché usiamo il modulo 'fs' nativo
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter, content } = matter(fileContent);

        const h1Match = content.match(/^#\s+(.*)/m);
        const h1Title = h1Match ? h1Match[1].trim() : null;

        const fallbackName = formatName(path.basename(filePath) === 'index.md' ? 'Introduzione' : path.basename(filePath));
        const name = frontmatter.title || h1Title || fallbackName;

        const description = frontmatter.description || null;

        return { name, description };

    } catch (err) {
        console.warn(`Errore leggendo ${filePath}:`, err.message);
    }
    return { name: formatName(path.basename(filePath)), description: null };
};


// --- Funzione Ricorsiva (processDirectory) (usa 'fs' nativo) ---
const processDirectory = (dirPath, relativePath = '') => {
    const items = [];

    try {
        // 'fs.readdirSync' ora è risolto
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });

        // Processa i file .md
        for (const entry of entries) {
            if (entry.isFile() && entry.name.endsWith('.md')) {
                const filePath = path.join(dirPath, entry.name);
                const fileRelativePath = path.join(relativePath, entry.name);

                const { name, description } = parseFile(filePath);

                items.push({
                    type: 'file',
                    name: name,
                    description: description,
                    path: fileRelativePath.replace(/\\/g, '/'),
                    isIndex: entry.name === 'index.md'
                });
            }
        }

        // Processa le sottocartelle
        for (const entry of entries) {
            if (entry.isDirectory()) {
                const subDirPath = path.join(dirPath, entry.name);
                const subRelativePath = path.join(relativePath, entry.name);

                const subItems = processDirectory(subDirPath, subRelativePath);

                if (subItems.length > 0) {
                    items.push({
                        type: 'group',
                        name: formatName(entry.name),
                        path: subRelativePath.replace(/\\/g, '/'),
                        items: subItems
                    });
                }
            }
        }

        // Ordina (invariato)
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


// --- Funzione Principale (usa 'fse' per le chiamate async) ---
const generateMenu = async () => {
    try {
        // MODIFICA: usa 'fse.readdir' (la versione async/promise di fs-extra)
        const categories = (await fse.readdir(docsDir, { withFileTypes: true }))
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        const menu = [];

        for (const categoryDir of categories) {
            const categoryPath = path.join(docsDir, categoryDir);

            const items = processDirectory(categoryPath);

            if (items.length > 0) {
                menu.push({
                    category: formatName(categoryDir),
                    path: categoryDir,
                    items: items
                });
            }
        }

        // MODIFICA: usa 'fse.outputJson'
        await fse.outputJson(outputFilePath, menu, { spaces: 2 });
        console.log(`Menu ricorsivo (con frontmatter) generato con successo in ${outputFilePath}`);

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.warn("Cartella 'public/docs' non trovata. Genero un menu vuoto.");
            // MODIFICA: usa 'fse.outputJson'
            await fse.outputJson(outputFilePath, [], { spaces: 2 });
        } else {
            console.error('Errore durante la generazione del menu:', error);
            process.exit(1);
        }
    }
};

generateMenu();