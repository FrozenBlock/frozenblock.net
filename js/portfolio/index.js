function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(name)
}

const user = getParameterByName('user-id')

if(user) {
    let doc = document.getElementById('portfolio-title')
    let doc_socials = document.getElementById('socials')
    let content = document.getElementById('portfolio-content')
    fetch('/assets/frozenblock/config/team.json')
        .then(response => response.json())
        .then(data => {
            if (Object.keys(data).includes(user)) {

                let img = document.createElement('img')
                img.src = `https://mc-heads.net/avatar/${data[user].id}`
                img.alt = user

                let p = document.createElement('div')
                p.textContent = `${data[user].title}'s portfolio`

                if('socials' in data[user]) {
                    Object.keys(data[user].socials)
                        .forEach(social => {
                            let li = document.createElement('li')
                            let a = document.createElement('a')
                            let img_3 = document.createElement('img')

                            a.href = data[user].socials[social]

                            img_3.src = `/assets/frozenblock/textures/icons/pixel/${social}.png`
                            img_3.alt = social

                            a.appendChild(img_3)
                            li.appendChild(a)

                            doc_socials.appendChild(li)
                        })
                }

                doc.appendChild(img)
                doc.appendChild(p)
                parse(`/assets/frozenblock/config/portfolio/${user}.md`, content)
            } else {
                doc.textContent = `Portfolio not found!`
            }
        })
        .catch(error => {
            console.error('Portfolio not found:', error)
            content.textContent = 'MarkDown file not found'
        })
}