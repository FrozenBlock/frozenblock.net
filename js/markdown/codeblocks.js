/**
 * Automatically fetch code blocks inside the whole document and highlight them.
 * This script is automatically included in markdown.js (You need to include the script)
 * */

let foundCodes = 0

function decorateCodeblocks() {
    let codes = document.getElementsByTagName('code')
    hljs.highlightAll()
    for(let i = 0; i < codes.length; i++) {
        let code = codes[i];

        let lName = ''
        for(let j = 0; j < code.classList.length; j++) {
            let c = code.classList[j];
            if(c.startsWith('language-')) lName = c.replace('language-', '')
        }

        if(lName !== '') {
            let language = document.createElement('p')
            language.className = 'codeblocks-code-name'
            language.textContent = lName
            code.insertBefore(language, code.firstChild)
            code.setAttribute('id', `code-${foundCodes}`)


            let copy = document.createElement('img')
            copy.className = 'codeblocks-copy-text'
            copy.src = '/assets/frozenblock/textures/icons/copy-text.png'
            copy.setAttribute('onClick', `copyToClipboard(${foundCodes})`)
            code.appendChild(copy)

            let overlay = document.createElement('div')
            overlay.className = `codeblocks-overlay-text-${foundCodes}`
            let oImg = document.createElement('img')
            oImg.src = '/assets/frozenblock/textures/icons/text_window.png'
            oImg.className = 'codeblocks-overlay-image'

            let oText = document.createElement('p')
            oText.textContent = 'Text copied!'
            oText.className = 'codeblocks-overlay-inner-text'

            overlay.appendChild(oImg)
            overlay.appendChild(oText)
            code.appendChild(overlay)

            foundCodes++
        }
    }

    let codeblocks = document.createElement('link')
    codeblocks.href = '/css/markdown/codeblocks.css'
    codeblocks.rel = "stylesheet"

    document.getElementsByTagName('body')[0].appendChild(codeblocks)
}

function copyToClipboard(index) {
    const copyText = document.getElementById(`code-${index}`);

    const overlay = document.getElementsByClassName(`codeblocks-overlay-text-${index}`)[0]
    overlay.style.opacity = '1';

    setTimeout(function() {
        overlay.style.opacity = '0';
    }, 1000);

    navigator.clipboard.writeText(copyText.textContent).then(r=>r)
}