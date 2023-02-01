<?php 
defined( 'ABSPATH' ) or die ( 'I\'m a plugin! Please don\'t access me directly!' );
	

wp_enqueue_style( 'artise-tile-simulator-loader-style', plugins_url( 'tile-simulator/assets/css/loader.css' ) );

wp_enqueue_script( 'artise-tile-simulator-loader-script', plugins_url( 'tile-simulator/assets/js/loader.js' ), array( 'jquery' ) );

?>


<?php function artise_get_loader(){ ?>

	<div id="loader-container" style="position: fixed; z-index: 1000000; background: white; top: 0; left: 0; width: 100vw; height: 100vh; text-align: center;">
		<div class="loader-content">
			<img id="loader-logo" src="<?php echo plugins_url( 'tile-simulator/assets/images/misc/logo.png' ) ?>">

			<div class="progress-bar">
				<div class="progress"></div>
			</div>
		</div>
		
	</div>

<?php } ?>