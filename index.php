<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>

    <div id="loading">Loading...</div>

    <div id="screen">


	<?php
	include(__DIR__.'/sections/cover/index.php');
	include(__DIR__.'/sections/chart/index.php');
	?>

	<div class="section">
	    <h1 
		class="distor"
		data-size="60"
		data-weight="800"
		data-family="'Source Sans Pro', sans-serif"
		current='{ "bottom": "55%" }'
		style="left: 35%;"
	    >Lorem ipsum</h1>

	    <h2
		current='{ "bottom": "50%" }'
		data-size="40"
		style="left: 50%"
		class="distor delay"
		delaytime="160"
	    >dolor sit</h2>
	</div>

	<div class="section">
	    <!--lorem-->
	    <h1
		style="left: 40%"
		class="distor"
		current='{ "bottom": "65%" }'
		data-size="50"
	    >Inceptos himenaeos</h1>
	    <p
		style="width: 400px; left: calc((100vw - 400px) / 2)"
		current='{ "bottom": "45%" }'
		class="delay"
		delaytime="200"
	    >Erat. Donec aliquet porta magna. Sed nisl. Ut tellus. Suspendisse quis mi
	    eget dolor sagittis tristique. Aenean non pede eget nisl bibendum gravida.
	    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
	    inceptos himenaeos. Morbi laoreet. Suspendisse potenti. Donec accumsan porta
	    felis.</p>

	</div>

	<ul id="menu">
	</ul>
    </div>
    <script src="./loadingPage.js"></script>
    <script src="./modules/anime.min.js"></script>
    <script src="./modules/blotter.min.js"></script>
    <script src="./modules/rollingDistortMaterial.js"></script>
    <script src="./setCurrent.js"></script>
    <script src="./index.js"></script>
</body>
</html>
