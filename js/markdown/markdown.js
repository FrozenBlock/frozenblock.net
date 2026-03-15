/** Common code to parse Markdown!
 * @param path The path to your md file
 * @param htmlOutput the HTML element we want to put all the Markdown data in
 */

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

async function ensureMarked() {
    if (window.marked) {
        return window.marked;
    }

    // Try primary CDN first, then fallback CDN.
    const sources = [
        'https://cdn.jsdelivr.net/npm/marked@2.1.3/marked.min.js',
        'https://unpkg.com/marked@2.1.3/marked.min.js'
    ];

    for (const source of sources) {
        try {
            await loadScript(source);
            if (window.marked) {
                return window.marked;
            }
        } catch (error) {
            console.warn(error.message);
        }
    }

    throw new Error('Marked is not loaded');
}

function parse(path, htmlOutput) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('MD file not found');
            }
            return response.text();
        })
        .then(async md => {
            const markedApi = await ensureMarked();

            // Support both marked(md) and marked.parse(md) depending on library version.
            htmlOutput.innerHTML = typeof markedApi === 'function'
                ? markedApi(md)
                : markedApi.parse(md);

            decorateCodeblocks();
        })
        .catch(error => {
            console.error('Error while loading MD file:', error);
            htmlOutput.textContent = error.message === 'MD file not found'
                ? 'MarkDown file not found'
                : 'Markdown parser is unavailable';
        });

    htmlOutput.classList.add('markdown-element');

    let markdown = document.createElement('link');
    markdown.href = '/css/markdown/markdown.css';
    markdown.rel = 'stylesheet';

    document.getElementsByTagName('body')[0].appendChild(markdown);
}
