var scrollTime = 2000;
var scrollLock = false;
var current = 0; // current section index

function animateMaterial(materialSettings, duration, delay) {
    Object.keys(materialSettings).forEach(function (uniform) {
        anime({
            targets: material.uniforms[uniform],
            value: materialSettings[uniform],
            duration: duration,
            easing: 'linear',
	    delay: delay
       });
    });
}

function setCurrent(targetIndex) {
    // execute only once at time
    if (scrollLock || targetIndex == current) return;
    scrollLock = true;

    animateMaterial({ uNoiseDistortAmplitude: 1, uSineDistortAmplitude: 1 }, 0, 0);
    if(window[sections[current].getAttribute('getout')])
	window[sections[current].getAttribute('getout')]()

    var incr, frameStatus;
    if (targetIndex > current) {
        incr = 1;
        frameStatus = state.prev;
    } else {
        incr = -1;
        frameStatus = state.next;
    }
    var duration = scrollTime / 3 / Math.abs(targetIndex - current);
    var easing = 'linear';
    var complete = frame; // recursion
    var isTarget = false;

    function frame() {
        // idk why but it has to be broken like this
        // instead of just set complete as null
        if (targetIndex == current) return;


        // move current section
        animateChildren(
            sections[current],
            Object.assign({ easing: easing, duration: duration }, frameStatus),
            isTarget
        );

        // increase or decrease current index
        current += incr;
        // if done
        if (current == targetIndex) {
            // smoother easing
            easing = 'cubicBezier(.5, 0, .5, 1)';
            duration = scrollTime * 0.66;
            isTarget = true;
	    if(window[sections[current].getAttribute('getin')])
		window[sections[current].getAttribute('getin')]()
	    complete = null
        }

        // set 'next' section as current
        animateChildren(
            sections[current],
            Object.assign(
                { easing: easing, duration: duration, complete: complete },
                state.current
            ),
            isTarget
        );
    }

    frame();
}

function animateChildren(parent, animeSettings, isTarget) {
    var children = Array.from(parent.getElementsByTagName('*'))
        // exclude blotter canvas
        .filter(function (child) {
            if (!child.classList.contains('b-canvas')) return child;
        });

    children.forEach(function (child, i) {
        var customSettings = animeSettings;
        if (isTarget) {
            Object.assign(
                customSettings,
                JSON.parse(child.getAttribute('current'))
            );

            if (child.classList.contains('delay'))
                customSettings.delay = child.getAttribute('delaytime');
            if (i == children.length - 1)
                // the last animated element
                animeSettings.complete = function () {
                    scrollLock = false;
                };
            animateMaterial(
                {
                    uNoiseDistortAmplitude: 0,
                    uSineDistortAmplitude: 0,
                },
                scrollTime / 2, customSettings.delay ? customSettings.delay : 0
            );
        }

        anime(Object.assign({ targets: child }, customSettings));
    });
}
