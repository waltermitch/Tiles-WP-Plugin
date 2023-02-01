<?php 
defined( 'ABSPATH' ) or die ( 'I\'m a plugin! Please don\'t access me directly!' );


wp_enqueue_style( 'artise-tile-simulator-style', plugins_url( 'tile-simulator/assets/css/tile-simulator.css' ) );



?>


<div id="steps-container">

	<div id="steps-tier1-container" class="steps-tier-container">
		<div class="step">
			<img src="<?php echo plugins_url( 'tile-simulator/assets/images/icons/icon_1.png' ) ?>">
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		</div>

		<div class="step">
			<img src="<?php echo plugins_url( 'tile-simulator/assets/images/icons/icon_2.png' ) ?>">
			<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
		</div>
		
	</div>

	<div id="steps-timeline-container">
		<img id="steps-timeline-image" src="<?php echo plugins_url( 'tile-simulator/assets/images/misc/timeline.png' ) ?>">
		
	</div>

	<div id="steps-tier2-container" class="steps-tier-container">
		<div class="step">
			<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
			<img src="<?php echo plugins_url( 'tile-simulator/assets/images/icons/icon_3.png' ) ?>">
		</div>
		<div class="step">
			<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			<img src="<?php echo plugins_url( 'tile-simulator/assets/images/icons/icon_4.png' ) ?>">
		</div>
		<div class="step">
			<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam</p>
			<img src="<?php echo plugins_url( 'tile-simulator/assets/images/icons/icon_5.png' ) ?>">
		</div>
		
	</div>
</div>

<br><br><br><br>
<div id="buttons-container">
	<a class="border-button" href="<?php echo get_site_url( null, 'tile-simulator-2d' ) ?>">2D Simulator</a>
	<a class="border-button" href="<?php echo get_site_url( null, 'tile-simulator-3d' ) ?>">3D Simulator</a>
</div>


<script type="text/javascript">
	jQuery( window ).load( function(  ){
		window.loader.progress( 1 );
	} )
</script>

