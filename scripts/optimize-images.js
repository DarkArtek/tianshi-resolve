import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define input and Output folders
const inDir = path.join(__dirname, '../public/raw-images');
const outDir = path.join(__dirname, '../public/optimized');

async function optimizeImages() {
    try {
        // create folders if they don't exist
        await fs.mkdir(inDir, {recursive: true});
        await fs.mkdir(outDir, {recursive: true});

        const files = await fs.readdir(inDir);

        // Check file's type
        const imageFiles = files.filter(file =>
            file.toLowerCase().endsWith('.jpg') ||
            file.toLowerCase().endsWith('.png') ||
            file.toLowerCase().endsWith('.jpeg')
        );

        if (imageFiles.length === 0) {
            console.log('Nessuna immagine trovata in public/raw-images');
            return;
        }

        console.log(`Trovate ${imageFiles.length} immagini. Inizio ottimizzazione...`);

        for (const file of imageFiles) {
            const inPath = path.join(inDir, file);
            const parsedPath = path.parse(file);
            const baseName = parsedPath.name;

            const avifPath = path.join(outDir, `${baseName}.avif`);
            const webpPath = path.join(outDir, `${baseName}.webp`);

            // Generate AVIF (Best compression, more modern)
            await sharp(inPath)
                .avif({ quality: 80, effort:4 })
                .toFile(avifPath);
            console.log(`✅ Creato: ${baseName}.avif`);

            // Generate WEBP
            await sharp(inPath)
                .webp({ quality: 80 })
                .toFile(webpPath);
            console.log(`✅ Creato: ${baseName}.webp`);
        }

        console.log('🎉 Ottimizzazione completata!');
    } catch (error) {
        console.error('Errore durante l\'ottimizzazione:', error);
    }
}

optimizeImages();