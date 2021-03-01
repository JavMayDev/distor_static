var state = {
    prev: { top: '-100%' },
    current: { top: '50%' },
    next: { top: '200%' },
}

console.log( 'state:', state )

var sections = Array.from(document.getElementsByClassName('section'))

var material = new Blotter.RollingDistortMaterial()
material.uniforms.uSpeed.value = 0.2
material.uniforms.uRotation.value = 90
material.uniforms.uNoiseDistortAmplitude.value = 0
material.uniforms.uSineDistortAmplitude.value = 0

// set first as current
Array.from(sections[0].getElementsByTagName('*')).forEach(child =>
    Object.assign(child.style, state.current)
)

// and the rest as next
for (let i = 1; i < sections.length; i++)
    Array.from(sections[i].getElementsByTagName('*')).forEach(child => {
	console.log( 'whats up' )
        Object.assign(child.style, state.next)
    })

sections.forEach(function (
    section
) {
    Array.from(section.getElementsByTagName('*'))
        .filter(function (sectionChild) {
            if (sectionChild.classList.contains('distor')) return sectionChild
        })
        .forEach(function (distor) {
            var text = new Blotter.Text(distor.innerHTML, { size: 50 })
            distor.innerHTML = ''
            var blotter = new Blotter(material, {
                texts: text,
            })
            var scope = blotter.forText(text)
            scope.appendTo(distor)
        })
})

// set menu to select section
const menu = document.getElementById('menu')
sections.forEach((_, i) => {
    const li = document.createElement('li')
    li.innerHTML = i + 1
    li.onclick = _ => setCurrent(i)
    menu.appendChild(li)
})

// set 'scrolling' (isn't really scrolling)
window.onwheel = event => {
    // if go down and current isn't last
    if (event.deltaY >= 0 && current < sections.length - 1)
        setCurrent(current + 1)
    // if go up and current isn't first
    if (event.deltaY <= 0 && current > 0) setCurrent(current - 1)
}
