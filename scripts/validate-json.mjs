import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ignoredDirs = new Set(['.git', '.idea', 'node_modules', 'out', 'build', 'kotlin-js-store']);
const jsonFiles = [];

function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        const relativePath = path.relative(root, fullPath);

        if (entry.isDirectory()) {
            if (ignoredDirs.has(entry.name)) {
                continue;
            }
            walk(fullPath);
            continue;
        }

        if (entry.isFile() && entry.name.endsWith('.json')) {
            jsonFiles.push(relativePath);
        }
    }
}

walk(root);

const failures = [];

for (const file of jsonFiles) {
    const fullPath = path.join(root, file);
    const text = fs.readFileSync(fullPath, 'utf8');

    try {
        JSON.parse(text);
    } catch (error) {
        failures.push({ file, error });
    }
}

if (failures.length > 0) {
    console.error(`Found ${failures.length} invalid JSON file(s):`);
    for (const failure of failures) {
        console.error(`- ${failure.file}: ${failure.error.message}`);
    }
    process.exit(1);
}

console.log(`Validated ${jsonFiles.length} JSON file(s).`);

