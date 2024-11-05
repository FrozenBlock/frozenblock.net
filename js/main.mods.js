mods = []
colors = []

fetch('/assets/frozenblock/config/mods.json')
    .then(response => response.json())
    .then(data => {
        const slideshow = document.getElementById('slideshow-0')
        const below = slideshow.getElementsByClassName('below')[0].getElementsByTagName('ul')[0]
        let i = 0

        Object.keys(data).forEach(key => {
            mods.push(key)
            /* JSON VARIABLES */
            let mod_title = 'Untitled';
            let mod_description = 'No description provided';
            let mod_color = '#718ffa';
            let mod_slides = 1;

            if('title' in data[key]) mod_title = data[key].title
            if('description' in data[key]) mod_description = data[key].description
            if('color' in data[key]) mod_color = data[key].color
            if('slides' in data[key]) mod_slides = parseInt(data[key].slides)
            /* JSON VARIABLES */

            colors.push(mod_color)


            /* MOD DISPLAY */
            let div = document.createElement('div')

            let title = document.createElement('p')
            let more = document.createElement('a')
            let download = document.createElement('a')
            let desc = document.createElement('p')

            title.className = 'button'
            more.className = 'button'
            download.className = 'button download'

            title.setAttribute('style', `background-color: ${mod_color};`)
            download.setAttribute('style', 'margin-left: 30px')

            title.textContent = mod_title
            more.textContent = 'MORE'
            download.textContent = 'DOWNLOAD'
            desc.textContent = mod_description

            more.href = `/mod/?mod-id=${key}`
            download.href = `https://modrinth.com/mod/${key}`

            div.appendChild(title)
            div.appendChild(more)
            div.appendChild(download)
            div.appendChild(desc)
            /* MOD DISPLAY */

            /* MOD ICON */
            let li = document.createElement('li')
            let img = document.createElement('img')

            img.className = 'elem'
            img.setAttribute('onClick', `setCurrent(0,${i})`)
            img.src = `/assets/frozenblock/textures/mods/${key}.png`
            img.alt = mod_title

            li.appendChild(img)

            /* MOD ICON */

            /* GLOBAL APPLY */
            slideshow.appendChild(div)
            below.appendChild(li)
            /* GLOBAL APPLY */
            i++
        })

        setCurrent(0,0)
    })