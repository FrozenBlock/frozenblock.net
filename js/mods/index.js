fetch('/assets/frozenblock/config/mods.json')
    .then(response => response.json())
    .then(data => {
        let element = document.getElementById("mods")
        let i = 0;
        Object.keys(data).forEach(key => {
            let mod_title = 'Untitled';
            let mod_description = 'No description provided';
            let mod_color = '#718ffa';
            let mod_slides = 1;

            if('title' in data[key]) mod_title = data[key].title
            if('description' in data[key]) mod_description = data[key].description
            if('color' in data[key]) mod_color = data[key].color
            if('slides' in data[key]) mod_slides = parseInt(data[key].slides)

            const speed = 20;
            let slider = document.createElement('div')
            slider.id = key
            slider.className = "slider"

            for(let k = 0; k < mod_slides; k++) {
                let slide = document.createElement('div')
                slide.className = "slide"
                let t_1298 = k === 0 ? 0 : mod_slides-k
                let style = `background-image: linear-gradient(var(--palette-background), transparent, var(--palette-background)), url(../../assets/frozenblock/textures/mods/${key}/${t_1298}.png);`
                let delay = -(speed * k) / mod_slides
                slide.setAttribute('style', style + `animation: slide${i} 20s infinite; animation-delay: ${delay}s;`)
                slider.appendChild(slide)
            }

            let div = document.createElement('div')
            div.className = 'mod-title-container'

            let title = document.createElement('img')
            title.src = `/assets/frozenblock/textures/mods/${key}_wide.png`
            title.alt = mod_title
            title.className = 'mod-title'

            div.appendChild(title)

            let space = document.createElement('div')
            space.setAttribute('style', 'font-size: 30px; margin: 10px 0')
            space.className = 'center'

            let space_10297 = document.createElement('strong')
            space_10297.textContent = mod_description
            space.appendChild(space_10297)
            div.appendChild(space)

            let download = document.createElement('a')
            download.href = `https://modrinth.com/mod/${key}`
            download.className = 'download-button'
            download.textContent = 'DOWNLOAD'
            div.appendChild(download)

            let space_20837 = document.createElement('div')
            space_20837.setAttribute('style', 'height: 20px;')
            div.appendChild(space_20837)

            let more = document.createElement('a')
            more.href = `/mod/?mod-id=${key}`
            more.className = 'more-button'
            more.textContent = 'MORE'
            div.appendChild(more)

            slider.appendChild(div)

            element.insertAdjacentElement('beforeend', slider)

            const tdp = 5

            let var1 = 100 / mod_slides - tdp
            let var2 = 100 / mod_slides
            let var3 = 100 - tdp
            const css = `
            @keyframes slide${i} {
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

            i++
        })
    })