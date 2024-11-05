function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(name)
}

const mod_id = getParameterByName('mod-id')

fetch('/assets/frozenblock/config/mods.json')
    .then(response => response.json())
    .then(data => {
        let mod_title = 'Untitled';
        let mod_slides = 1;
        if('title' in data[mod_id]) mod_title = data[mod_id].title
        if('slides' in data[mod_id]) mod_slides = parseInt(data[mod_id].slides)
        document.getElementById('mod-title').textContent = `FrozenBlock - ${mod_title}`

        const tdp = 5

        let var1 = 100 / mod_slides - tdp
        let var2 = 100 / mod_slides
        let var3 = 100 - tdp
        const css = `
            @keyframes slide {
              0%, ${var1}%, 100% {
                transform: translateX(0);
                animation-timing-function: ease;
              }
              ${var2}% {
                transform: translateX(-100%);
                animation-timing-function: step-end;
              }
              ${var3}% {
                transform: translateX(100%);
                animation-timing-function: ease;
              }
            }
            .slide-element {
              animation: slide 2s infinite;
            }
            `;
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);

    })
    .catch(() => {
        document.getElementById('mod-title').textContent = `FrozenBlock - Not Found`
    })