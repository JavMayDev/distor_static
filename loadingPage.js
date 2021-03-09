window.addEventListener('load', function () {
    document.getElementById('loading').style.display = 'none';

    Array.from(sections[0].getElementsByTagName('*')).forEach(function (child) {
        anime(
            Object.assign(
                {
                    targets: child,
                    opacity: 1,
                    duration: 3000,
                    easing: 'easeOutCubic',
                },
                JSON.parse(child.getAttribute('current'))
            )
        );
    });

    anime({
        targets: document.getElementById('toy1'),
        rotate: '-45deg',
        direction: 'alternate',
        easing: 'easeInOutCubic',
        loop: true,
    });
    anime({
        targets: document.getElementById('toy2'),
        rotate: '45deg',
        direction: 'alternate',
        easing: 'easeInOutCubic',
        loop: true,
    });
});

var prevY = 0;
window.onmousemove = function (event) {
    // console.log( 'clientY: ', event.clientY, 'prevY: ', prevY)
    var mouseVel = Math.abs(event.clientY - prevY) / 20;
    material.uniforms.uNoiseDistortAmplitude.value = mouseVel;
    material.uniforms.uSineDistortAmplitude.value = mouseVel;
    prevY = event.clientY;
};
