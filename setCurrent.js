var scrollTime = 2000
var scrollLock = false
var current = 0 // current section index
 
function animateMaterial (materialSettings, duration = scrollTime /2) {
    Object.keys(materialSettings).forEach(function(uniform){
	anime({
	    targets: material.uniforms[uniform],
	    value: materialSettings[uniform],
	    duration: duration,
	    easing: 'linear'
	})
    })

}

function setCurrent(targetIndex) {
    // execute only once at time
    if (scrollLock) return
    scrollLock = true

    animateMaterial({ uNoiseDistortAmplitude: 1, uSineDistortAmplitude: 1 }, 0)

    var incr, frameStatus
    if (targetIndex > current) {
        incr = 1
        frameStatus = state.prev
    } else {
        incr = -1
        frameStatus = state.next
    }
    var duration = scrollTime / 3 / Math.abs(targetIndex - current)
    var easing = 'linear'
    var complete = frame // recursion
    var isTarget = false

    function frame() {
	// idk why but it has to be broken like this
	// instead of just set complete as null
	if(targetIndex == current) return

        // move current section
        animateChildren(sections[current], {
            ...frameStatus,
            easing,
            duration,
        })

        // increase or decrease current index
        current += incr
        // if done
        if (current == targetIndex) {
            // smoother easing
            easing = 'easeOutQuart'
            duration = scrollTime * 0.66
            isTarget = true
	    complete = null // break recursion
        }

	// set 'next' section as current
        animateChildren(
            sections[current],
            {
                ...state.current,
                easing,
                duration,
                complete,
            },
            isTarget
        )
    }

    frame()
}

function animateChildren(parent, animeSettings, isTarget = false) {
    const children = Array.from(parent.getElementsByTagName('*'))
    children.forEach((child, i) => {
	if(isTarget) {
	    animateMaterial({ uNoiseDistortAmplitude: 0, uSineDistortAmplitude: 0 })
	    // smoothDistortStop()
	    if (i == children.length - 1) // the last animated element
		animeSettings.complete = () => scrollLock = false
	}

        anime({
            targets: child,
            ...animeSettings,
            delay:
		child.classList.contains('delay')
                    ? child.getAttribute('delaytime')
                    : 0,
        })
    })
}
