var strokeWidth = 40;

var chartData = [
    { color: '#77f', amount: 0.8, label: 'Lorem' },
    { color: '#f77', amount: 0.67, label: 'ipsum' },
    { color: '#7f7', amount: 0.35, label: 'dolor' },
];

document.addEventListener('DOMContentLoaded', function () {
    var chartSvg = document.getElementById('chart');

    chartData.forEach(function (indicator, index) {
        var circle = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'circle'
        );
        circle.setAttribute('id', indicator.label);
        circle.setAttribute('cx', chartSvg.getAttribute('width') / 2);
        circle.setAttribute('cy', chartSvg.getAttribute('height') / 2);

        var radius =
            chartSvg.getAttribute('width') / 2 -
            index * strokeWidth -
            strokeWidth / 2;

        var perimeter = Math.PI * radius * 2;

        indicator.perimeter = perimeter;

        circle.setAttribute('r', radius);
        circle.setAttribute('stroke-dasharray', perimeter);
        circle.setAttribute('stroke-dashoffset', perimeter);

        circle.setAttribute('stroke', indicator.color);
        circle.setAttribute('stroke-width', strokeWidth);
        circle.setAttribute('fill', 'none');
        chartSvg.appendChild(circle);

        var info = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'text'
        );
        info.setAttribute('id', 'text-' + indicator.label);
        info.innerHTML = '0%';
        info.setAttribute('x', chartSvg.getAttribute('width') / 2 + 5);
        info.setAttribute('y', (index + 1) * strokeWidth);

        chartSvg.appendChild(info);
    });
});

function animateChart() {
    chartData.forEach(function (indicator) {
        anime({
            targets: document.getElementById(indicator.label),
            strokeDashoffset: indicator.perimeter * (1 - indicator.amount),
            duration: 2000,
            easing: 'cubicBezier(.5, 0, .5, 1)',
            update: function (param) {
                document.getElementById('text-' + indicator.label).innerHTML =
                    Math.trunc(param.progress * indicator.amount) + '%';
            },
        });
    });
}

function resetChart() {
    chartData.forEach(function (indicator) {
        anime({
            targets: document.getElementById(indicator.label),
            strokeDashoffset: indicator.perimeter,
            duration: 300,
            easing: 'cubicBezier(.5, 0, .5, 1)',
        });
        document.getElementById('text-' + indicator.label).innerHTML = '0%';
    });
}
