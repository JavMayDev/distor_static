var state = {
    prev: { bottom: '200%' },
    current: { bottom: '50%' },
    next: { bottom: '-100%' }
}

var sections = Array.from(document.getElementsByClassName('section'))

// set up material
var material = new Blotter.RollingDistortMaterial()
material.uniforms.uSpeed.value = 0.2
material.uniforms.uRotation.value = 90
material.uniforms.uNoiseDistortAmplitude.value = 0.5
material.uniforms.uSineDistortAmplitude.value = 0.5

animateMaterial({ uNoiseDistortAmplitude: 0, uSineDistortAmplitude: 0 }, 500)

// set first as current
Array.from(sections[0].getElementsByTagName('*')).forEach(child =>
    Object.assign(child.style, JSON.parse(child.getAttribute('current')))
)

// and the rest as next
for (let i = 1; i < sections.length; i++)
    Array.from(sections[i].getElementsByTagName('*')).forEach(child => {
	console.log( 'whats up' )
        Object.assign(child.style, state.next)
    })

sections.forEach(function (section) {
    Array.from(section.getElementsByTagName('*'))
        .filter(function (sectionChild) {
            if (sectionChild.classList.contains('distor')) return sectionChild
        })
        .forEach(function (distor) {
            var text = new Blotter.Text(distor.innerHTML, distor.dataset)
            distor.innerHTML = ''
            var blotter = new Blotter(material, {
                texts: text,
            })
            var scope = blotter.forText(text)
            scope.appendTo(distor)

	    // add background color to the canvas
	    if(distor.getAttribute('background-color')) 
		distor.getElementsByTagName('canvas').item(0).style.backgroundColor = 
		    distor.getAttribute('background-color')
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
