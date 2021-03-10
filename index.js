var state = {
    prev: { bottom: '110%' },
    current: { bottom: '50%' },
    next: { bottom: '-100%' },
};

var sections = Array.from(document.getElementsByClassName('section'));

// set up material
var material = new Blotter.RollingDistortMaterial();
material.uniforms.uSpeed.value = 0.2;
material.uniforms.uRotation.value = 90;
material.uniforms.uNoiseDistortAmplitude.value = 1;
material.uniforms.uSineDistortAmplitude.value = 1;

animateMaterial(
    { uNoiseDistortAmplitude: 0, uSineDistortAmplitude: 0 },
    1000,
    0
);

// and the rest as next
for (var i = 1; i < sections.length; i++)
    Array.from(sections[i].getElementsByTagName('*')).forEach(function (child) {
        Object.assign(child.style, state.next);
    });

sections.forEach(function (section) {
    Array.from(section.getElementsByTagName('*'))
        .filter(function (sectionChild) {
            if (sectionChild.classList.contains('distor')) return sectionChild;
        })
        .forEach(function (distor) {
            var text = new Blotter.Text(distor.innerHTML, distor.dataset);
            distor.innerHTML = '';
            var blotter = new Blotter(material, {
                texts: text,
            });
            var scope = blotter.forText(text);
            scope.appendTo(distor);

            // add background color to the canvas
            if (distor.getAttribute('background-color'))
                distor
                    .getElementsByTagName('canvas')
                    .item(0).style.backgroundColor = distor.getAttribute(
                    'background-color'
                );
        });
});

// set menu to select section
var menu = document.getElementById('menu');
sections.forEach(function (_, i) {
    var li = document.createElement('li');
    li.innerHTML = i + 1;
    li.onclick = function (_) {
        setCurrent(i);
    };
    menu.appendChild(li);
});

// set 'scrolling' (isn't really scrolling)
window.onwheel = function (event) {
    // if go down and current isn't last
    if (event.deltaY >= 0 && current < sections.length - 1)
        setCurrent(current + 1);
    // if go up and current isn't first
    if (event.deltaY <= 0 && current > 0) setCurrent(current - 1);
};
