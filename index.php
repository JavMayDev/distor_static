<?php
$url = 'http://192.168.100.7/distor_static/';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="./responsive.css">
</head>
<body>

    <div id="loading" style="font-family: 'Bronxos'; font-size: 50px;">
	<span style="left: 50%; top: 50%; transform: translate(-50%, -50%); position: absolute">Cargando...</span>
    </div>

    <div id="screen">


	<?php
	include(__DIR__.'/sections/cover/index.php');
	include(__DIR__.'/sections/chart/index.php');
	include(__DIR__.'/sections/test/index.php');
	?>


	<div class="section">
	    <!--lorem-->
	    <h1
		style="left: 40%"
		class="distor"
		bottom-on-current="65%"
		data-size="50"
	    >Inceptos himenaeos</h1>
	    <p
		style="width: 400px; left: calc((100vw - 400px) / 2)"
		bottom-on-current="45%"
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
