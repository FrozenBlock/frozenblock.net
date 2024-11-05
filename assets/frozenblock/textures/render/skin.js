const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.get('/assets/frozenblock/render/skin.png', async (req, res) => {
    const uuid = req.query.uuid;

    if (!uuid) {
        res.status(400).send('UUID non fornito');
        return;
    }

    try {
        // Carica la skin di Minecraft usando l'UUID
        const response = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`);
        const data = await response.json();
        const textures = data.properties.find(prop => prop.name === "textures");

        if (!textures) {
            res.status(404).send('Texture non trovata per l\'UUID fornito');
            return;
        }

        const textureData = JSON.parse(Buffer.from(textures.value, 'base64').toString('utf-8'));
        const skinUrl = textureData['textures']['SKIN']['url'];

        // Crea un canvas con dimensioni 360x864
        const width = 360;
        const height = 864;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Imposta lo sfondo trasparente
        ctx.clearRect(0, 0, width, height);

        // Carica l'immagine della skin
        const skinImage = await loadImage(skinUrl);

        // Imposta il filtro "nearest neighbor" per un effetto pixelato
        ctx.imageSmoothingEnabled = false;

        const scale = 20; // Scala per ingrandire il rombo

        // Centro della testa
        const centerX = width / 2;
        const topMargin = 100; // Spostamento verticale

        // === Prima faccia (frontale) ===
        const frontSx = 8;
        const frontSy = 8;
        const sWidth = 8;
        const sHeight = 8;

        // Trasformazione isometrica per la prima faccia (frontale)
        ctx.setTransform(1, 0.5, 0, 1, centerX - (sWidth * scale) / 2 - 90, topMargin);
        // Ombreggiatura per la faccia frontale (nessuna modifica)
        ctx.drawImage(skinImage, frontSx, frontSy, sWidth, sHeight, 0, 0, sWidth * scale, sHeight * scale);

        // Ripristina la trasformazione originale
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // === Seconda faccia (laterale destra) ===
        const rightSx = 16;
        const rightSy = 8;

        // Trasformazione isometrica per la seconda faccia (laterale destra)
        ctx.setTransform(1, -0.5, 0, 1, centerX + (sWidth * scale) / 2 - scale - 70, topMargin + 80);
        // Ombreggiatura per la faccia laterale (leggermente più scura)
        ctx.drawImage(skinImage, rightSx, rightSy, sWidth, sHeight, 0, 0, sWidth * scale, sHeight * scale);
        ctx.globalAlpha = 1.0; // Ripristina opacità per le altre facce

        // Ripristina la trasformazione originale
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // === Terza faccia (superiore) ===
        const topSx = 8;
        const topSy = 0;

        // Trasformazione isometrica per la faccia superiore (ruotata e traslata sopra le altre facce)
        ctx.setTransform(1, 0.5, -1, 0.5, centerX - scale / 2, topMargin - (sHeight * scale) / 2);
        // Ombreggiatura per la faccia superiore (ancora più scura)
        ctx.drawImage(skinImage, topSx, topSy, sWidth, sHeight, 0, 0, sWidth * scale, sHeight * scale);
        ctx.globalAlpha = 1.0; // Ripristina opacità

        // Ripristina la trasformazione originale
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Imposta l'intestazione della risposta
        res.setHeader('Content-Type', 'image/png');

        // Invia l'immagine generata come risposta
        canvas.toBuffer((err, buf) => {
            if (err) {
                res.status(500).send('Errore nella generazione dell\'immagine');
                return;
            }
            res.end(buf);
        });

    } catch (error) {
        console.error('Errore nel caricamento della skin:', error);
        res.status(500).send('Errore nel caricamento della skin');
    }
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
