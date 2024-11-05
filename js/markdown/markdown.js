/** Common code to parse Markdown!
 * @param path The path to your md file
 * @param htmlOutput the HTML element we want to put all the Markdown data in
 */

function parse(path, htmlOutput) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('MD file not found');
            }
            return response.text();
        })
        .then(md => {
            htmlOutput.innerHTML = marked(md)
            decorateCodeblocks()
        })
        .catch(error => {
            console.error('Error while loading MD file:', error)
            htmlOutput.textContent = 'MarkDown file not found'
        });
    htmlOutput.classList.add('markdown-element')

    let markdown = document.createElement('link')
    markdown.href = '/css/markdown/markdown.css'
    markdown.rel = "stylesheet"

    document.getElementsByTagName('body')[0].appendChild(markdown)
}