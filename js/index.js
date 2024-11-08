let temp = [0, 0]
function increase(index, n) {
    setCurrent(index, temp[index] + n)
}

function setCurrent(index, n) {
    rawSetCurrent(index, temp[index] = n)
}

// Dont use. Use setCurrent instead. This is an internal function.
function rawSetCurrent(index, n) {
    let slideshow = document.getElementById(`slideshow-${index}`)
    let slides = slideshow.children

    if(n === slides.length - 1) temp[index] = 0
    if(n < 0) temp[index] = slides.length - 2

    for(let i = -1; i < slides.length - 1; i++) {
        let current = slides[i + 1]
        if(current.className === 'below') {
            let dots = current.getElementsByClassName('elem')
            for(let k = 0; k < dots.length; k++) {
                if(k === temp[index]) {
                    dots[k].className = 'elem active'
                } else dots[k].className = dots[k].className.replace(' active', '')
            }
            continue
        }
        if(i === temp[index]) {
            current.style.display = ''
            if(index === 0)
                slideshow.setAttribute('style', `background-image: url("/assets/frozenblock/textures/mods/${mods[i]}_background.png");`)
        }
        else current.style.display = 'none'
    }
}

