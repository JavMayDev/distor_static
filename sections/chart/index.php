<style>
svg#chart circle {
    transform-origin: center;
    transform: rotate(-90deg) scale(1, -1);
}
</style>

<div class="section" getin="animateChart" getout="resetChart">
    <div 
     data-size="50" 
     data-family="'Bronxos'"
     data-weight="800"
     bottom-on-current="80%"
     style="left: 30%"
     class="distor delay" 
     delaytime="100"
     >ESTADISTICAS</div>
    <svg
	bottom-on-current="calc((100% - 400px) / 2)"
	style="left: calc((100% - 400px) / 2)"
	id="chart" width="400" height="400"></svg>
</div>
<script src="sections/chart/script.js"></script>
