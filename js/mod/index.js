fetch('/assets/frozenblock/config/mods.json')
    .then(response => response.json())
    .then(data => {
        let element = document.getElementById("mods")
        if(Object.keys(data).includes(mod_id)) {

            /* Json Variables */
            let mod_title = 'Untitled';
            let mod_description = 'No description provided';
            let mod_color = '#718ffa';
            let mod_slides = 1;

            if('title' in data[mod_id]) mod_title = data[mod_id].title
            if('description' in data[mod_id]) mod_description = data[mod_id].description
            if('color' in data[mod_id]) mod_color = data[mod_id].color
            if('slides' in data[mod_id]) mod_slides = parseInt(data[mod_id].slides)

            const speed = 20;
            let slider = document.createElement('div')
            slider.id = mod_id
            slider.className = "slider"

            for(let k = 0; k < mod_slides; k++) {
                let slide = document.createElement('div')
                slide.className = "slide"
                let t_1298 = k === 0 ? 0 : mod_slides-k
                let style = `background-image: linear-gradient(var(--palette-background), transparent, var(--palette-background)), url(../../assets/frozenblock/textures/mods/${mod_id}/${t_1298}.png);`
                let delay = -(speed * k) / mod_slides
                slide.setAttribute('style', style + ` animation-delay: ${delay}s;`)
                slider.appendChild(slide)
            }

            let div = document.createElement('div')
            div.className = 'mod-title-container'

            let title = document.createElement('img')
            title.src = `/assets/frozenblock/textures/mods/${mod_id}_wide.png`
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
            download.href = `https://modrinth.com/mod/${mod_id}`
            download.className = 'download-button'
            download.textContent = 'DOWNLOAD'
            div.appendChild(download)

            slider.appendChild(div)

            element.insertAdjacentElement('afterbegin', slider)

            parse(`/assets/frozenblock/config/mods/${mod_id}.md`, document.getElementById('content'))
        } else {
            let e = document.createElement('p')
            e.textContent = 'Mod not found'
            element.appendChild(e)
        }
    })
