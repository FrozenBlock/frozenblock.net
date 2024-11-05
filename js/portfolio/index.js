function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(name)
}

const user = getParameterByName('user-id')

if(user) {
    let doc = document.getElementById('portfolio-title')
    let content = document.getElementById('portfolio-content')
    fetch('/assets/frozenblock/config/team.json')
        .then(response => response.json())
        .then(data => {
            if (Object.keys(data).includes(user)) {

                let img = document.createElement('img')
                img.src = `https://mc-heads.net/avatar/${user}`
                img.alt = user

                let p = document.createElement('div')
                p.textContent = `${data[user].title}'s portfolio`

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