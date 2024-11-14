fetch('/assets/frozenblock/config/team.json')
    .then(response => response.json())
    .then(data => {
        const slideshow = document.getElementById('slideshow-1')
        const below = slideshow.getElementsByClassName('below')[0].getElementsByTagName('ul')[0]
        let i = 0;
        Object.keys(data).forEach(key => {
                /* JSON VARIABLES */
                let user_title = 'Untitled';
                let user_description = 'No description provided';
                let user_color = '#718ffa';
                let user_id = 'Steve';

                if('title' in data[key]) user_title = data[key].title
                if('description' in data[key]) user_description = data[key].description
                if('color' in data[key]) user_color = data[key].color
                if('id' in data[key]) user_id = data[key].id
                /* JSON VARIABLES */

                /* USER DISPLAY */
                let div = document.createElement('div')
                let image = document.createElement('div')
                let title = document.createElement('p')
                let more = document.createElement('a')
                let desc = document.createElement('p')

                more.className = 'button'

                image.setAttribute('style', `background-image: url('https://mc-heads.net/body/${key}');`)
                title.setAttribute('style', 'margin-right: 20px')

                title.textContent = user_title
                more.textContent = 'MORE'
                desc.textContent = user_description

                more.href = `/portfolio/?user-id=${key}`

                div.appendChild(image)
                div.appendChild(title)
                div.appendChild(more)
                div.appendChild(desc)

                let li = document.createElement('li')
                let img = document.createElement('img')

                img.className = 'elem'
                img.setAttribute('onClick', `setCurrent(1,${i})`)
                img.src = `https://mc-heads.net/avatar/${user_id}`
                img.alt = user_title

                li.appendChild(img)

                slideshow.appendChild(div)
                below.appendChild(li)
                i++
        });

        setCurrent(1,0)
    })