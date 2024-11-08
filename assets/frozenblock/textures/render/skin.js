// Should generate a skin 3D render based on the uuid

const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.get('/assets/frozenblock/render/skin.png', async (req, res) => {
    const uuid = req.query.uuid;

    if (!uuid) {
        res.status(400).send('UUID not found');
        return;
    }

    try {
        // Fetch UUID from mojang
        const response = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`);
        const data = await response.json();
        const textures = data.properties.find(prop => prop.name === "textures");

        if (!textures) {
            res.status(404).send('Texture not found for given UUID');
            return;
        }

        const textureData = JSON.parse(Buffer.from(textures.value, 'base64').toString('utf-8'));
        const skinUrl = textureData['textures']['SKIN']['url'];

        // Create a 360x864 canvas
        const width = 360;
        const height = 864;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Set the background to transparent
        ctx.clearRect(0, 0, width, height);

        // Load Skin image
        const skinImage = await loadImage(skinUrl);

        // sets Nearest Neighbor
        ctx.imageSmoothingEnabled = false;

        const scale = 20; // Scale image

        // Middle of head
        const centerX = width / 2;
        const topMargin = 100; // Vertical translation

        // === First face ===
        const frontSx = 8;
        const frontSy = 8;
        const sWidth = 8;
        const sHeight = 8;

        // Isometric transform for first face
        ctx.setTransform(1, 0.5, 0, 1, centerX - (sWidth * scale) / 2 - 90, topMargin);
        // Shadow for first face
        ctx.drawImage(skinImage, frontSx, frontSy, sWidth, sHeight, 0, 0, sWidth * scale, sHeight * scale);

        // Reset transformations
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // === Second face ===
        const rightSx = 16;
        const rightSy = 8;

        // Isometric transform for second face
        ctx.setTransform(1, -0.5, 0, 1, centerX + (sWidth * scale) / 2 - scale - 70, topMargin + 80);
        // Shadow for second face
        ctx.drawImage(skinImage, rightSx, rightSy, sWidth, sHeight, 0, 0, sWidth * scale, sHeight * scale);
        ctx.globalAlpha = 1.0; // Resets opacity for other faces

        // Reset transformations
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // === Third face ===
        const topSx = 8;
        const topSy = 0;

        // Isometric transform for third face
        ctx.setTransform(1, 0.5, -1, 0.5, centerX - scale / 2, topMargin - (sHeight * scale) / 2);
        // Shadow for third face
        ctx.drawImage(skinImage, topSx, topSy, sWidth, sHeight, 0, 0, sWidth * scale, sHeight * scale);
        ctx.globalAlpha = 1.0; // Resets opacity for other faces

        // Reset transformations
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Sets the header
        res.setHeader('Content-Type', 'image/png');

        // Sends the image as response
        canvas.toBuffer((err, buf) => {
            if (err) {
                res.status(500).send('Generating skin image error');
                return;
            }
            res.end(buf);
        });

    } catch (error) {
        console.error('Loading skin error:', error);
        res.status(500).send('Loading skin error');
    }
});

app.listen(port, () => {
    //console.log(`Server listening to http://localhost:${port}`);
});
