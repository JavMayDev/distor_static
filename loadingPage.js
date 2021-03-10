window.addEventListener('load', function () {
    document.getElementById('loading').style.display = 'none';

    animateCover()

    var prevY = 0;
    window.onmousemove = function (event) {
        // console.log( 'clientY: ', event.clientY, 'prevY: ', prevY)
        var mouseVel = Math.abs(event.clientY - prevY) / 50;
        material.uniforms.uNoiseDistortAmplitude.value = mouseVel;
        material.uniforms.uSineDistortAmplitude.value = mouseVel;
        prevY = event.clientY;
    };
});

function animateCover () {
    var hands = document.getElementById('hands')
    var rainbow = document.getElementById('rainbow')
    var title1 = document.getElementById('title-1')
    var title2 = document.getElementById('title-2')

    anime({
	targets: title1,
	bottom: title1.getAttribute('bottom-on-current'),
	easing: 'easeInOutCubic'
    })
    anime({
	targets: title2,
	bottom: title2.getAttribute('bottom-on-current'),
	easing: 'easeInOutCubic',
	delay: 500
    })

    // raise hands
    anime({
	targets: hands,
	bottom: hands.getAttribute('bottom-on-current'),
	easing: 'easeInOutCubic'
    })

    // put a nice rainbow-smile
    anime({
	targets: rainbow,
	bottom: rainbow.getAttribute('bottom-on-current'),
	easing: 'easeInOutCubic',
	duration: 2000
    })

    // fade in clouds
    anime({
	targets: document.getElementById('clouds'),
	opacity: 1,
	duration: 2000,
	delay: 1500,
	easing: 'linear'
    })

    // rotate toys on loop
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

}
