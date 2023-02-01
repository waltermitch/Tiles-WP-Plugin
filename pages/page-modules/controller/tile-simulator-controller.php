<?php
defined( 'ABSPATH' ) or die ( 'I\'m a plugin! Please don\'t access me directly!' );

wp_enqueue_style( 'artise-tile-simulator-controller-style', plugins_url( 'tile-simulator/assets/css/tile-simulator-controller.css' ), array( 'dashicons' ) );


wp_enqueue_style( 'scrollbar-js-style', plugins_url( 'tile-simulator/assets/css/jquery.scrollbar.css' ) );

// wp_enqueue_script( 'iris', plugins_url( 'tile-simulator/assets/js/iris.min.js' ), array( 'jquery', 'jquery-ui-widget', 'jquery-ui-slider' ) );

wp_enqueue_script( 'scrollbar-js', plugins_url( 'tile-simulator/assets/js/jquery.scrollbar.min.js' ), array( 'jquery' ) );

wp_enqueue_script( 'artise-grout-shapes', plugins_url( 'tile-simulator/assets/js/grout-shapes.js' ), array( 'jquery' ) );


wp_enqueue_script( 'artise-tile-simulator-controller-script', plugins_url( 'tile-simulator/assets/js/tile-simulator-controller.js' ), array( 'jquery', 'jquery-ui-core', 'jquery-ui-dialog', 'artise-grout-shapes' ) );


wp_localize_script( 'artise-tile-simulator-controller-script', 'ajaxurl', admin_url( 'admin-ajax.php' ) );




$tile_categories = get_terms( array(
	'taxonomy'			=> 'artise-tile-category',
	'hide_empty'		=> false,
	'orderby'			=> 'id',
	'order'				=> 'ASC'
) );

$tile_colors = get_posts( array(
	'post_type'			=> 'artise-tile-colors',
	'posts_per_page'	=> -1,
	'orderby'			=> 'name',
	'order'				=> 'ASC'
) );

$tile_masks = array(  );
$tile_bg = array(  );
$tile_data = array(  );
$tile_count = 0;
$mask_count = 0;
$curr_tile_ids = array(  );

$border_category = get_terms( array(
	'taxonomy'			=> 'artise-tile-category',
	'hide_empty'		=> true,
	'slug'				=> BORDER_CATEGORY_SLUG
) );

$hasBorderCategory = false;

if( sizeof( $border_category ) > 0 ){
	$hasBorderCategory = true;
}



function tile_simulator_overlay(  ){
	// TODO: Cleanup path
	include plugin_dir_path(__FILE__) . '/../overlays/tile-simulator-overlay.php';
}

add_action( 'wp_footer', 'tile_simulator_overlay' );


?>

<div id="spinner" class="overlay" style="display: none;">
    <div class="loader"></div>
</div>

<div id="tile-editor-wrapper">

	<div id="tile-selection-mobile-buttons">

		<button id="tile-selection-close-button" class="artise-button">Close</button>

		<button id="tile-selection-expand-button" class="artise-button" data-toggle-text="Collapse">Expand</button>
		
	</div>



	<h1 id="tile-editor-title" class="simulator-section-title">Tile Selection</h1>

	

	<div id="tile-categories-container">

		<ul>
			<svg class="arrow" viewBox="0 0 100 100">
				<polygon points="0 50, 65 0, 65 100"></polygon>
			</svg>

			<li class="tile-category search">
				<div class="title-container"></div>
				<div class="tile-container">
					<div class="tile-wrapper"></div>
				</div>
			</li>


			<?php foreach( $tile_categories as $i => $tile_category ): ?>
				<li 
					class="tile-category<?php echo ( $i == 0 ) ? ' open' : '' ?>"
					data-name="<?php echo $tile_category->name ?>"
					data-slug="<?php echo $tile_category->slug ?>"
				>
					<div class="title-container"><?php echo $tile_category->name ?></div>
					<div class="tile-container">

						<div class="tile-wrapper scrollbar-inner">
							<!-- TILES PER CATEGORY -->
							<?php 
								$tiles = get_posts( array(
									'post_type'					=> 'artise-tiles',
									'artise-tile-category'		=> $tile_category->slug,
									'posts_per_page'			=> -1,
									'offset'					=> 0,
									'orderby'					=> 'name',
									'order'						=> 'ASC'
								) );


							?>
							<?php foreach( $tiles as $tileKey => $tile ): ?>
								<?php 
									$tile_img = get_post_meta( $tile->ID, 'artise-tile-img', true );

									$img_size = getimagesize( $tile_img );

									$category_terms = implode( ', ', get_terms( array(

										'taxonomy'				=> 'artise-tile-category',
										'object_ids'			=> $tile->ID,
										'fields'				=> 'names'
									) ) );


									$itile = array_search( $tile->ID, $curr_tile_ids );
									$tile_exists = true;

									if( $itile === false ){
										$itile =  $tile_count;
										$tile_exists = false;
										$curr_tile_ids []= $tile->ID;
									}

									$shape = 'square';
									$is_hex = get_post_meta( $tile->ID, 'artise-tile-hex', true );
									$is_ginkgo = get_post_meta( $tile->ID, 'artise-tile-ginkgo', true );
									$shape_style = get_post_meta( $tile->ID, 'artise-tile-shape', true );

									// Shape
									if ($shape_style == null || $shape_style == ''){
										$shape = 'square';
									}else {
										$shape = $shape_style;
									}
									if( $is_hex == 1 ){
										$shape = 'hexagon';
									} else if($is_ginkgo == 1){
										$shape = 'ginkgo';
									} else if( $img_size[0] != $img_size[1] ){
										$shape = 'square';
									}

									if( $tile_category->slug == BORDER_CATEGORY_SLUG ){
										$shape = 'border';
									}

									// Grout Shapes
									$grout_shape = get_post_meta( $tile->ID, 'artise-tile-grout', true );

									if( $grout_shape == '' || $grout_shape == '1' )
										$grout_shape = 'cross';
									else if( $grout_shape == '0' )
										$grout_shape = 'nogrout';


								?>
								<div 
									class="tile-image-container tile-image-cointainer-<?php echo $tile_count ?>" 
									data-tile-id="<?php echo $tile->ID ?>"
									data-itile="<?php echo $itile ?>"
									data-tile-name="<?php echo htmlentities( $tile->post_title ) ?>"
									data-tile-desc="<?php echo htmlentities( $tile->post_excerpt ) ?>"
									data-category="<?php echo $category_terms ?>"

									data-category-slug="<?php echo $tile_category->slug ?>"
									
								>
									<img 
										src="<?php echo $tile_img ?>" 
										width="75" height="75" 
										data-shape="<?php echo $shape ?>"
										data-is-hex="<?php echo $is_hex ?>"
										data-is-ginkgo="<?php echo $is_ginkgo ?>"
										data-tile-scale="<?php echo get_post_meta( $tile->ID, 'artise-tile-scale', true ) ?>">
									<?php echo $tile->post_title ?>
								</div>

								<?php 
									if( !$tile_exists){
										$tile_count++; 

										$attachments = get_posts( array(
											'post_type'			=> 'artise-tile-masks',
											'posts_per_page'	=> -1,
											'post_parent'		=> $tile->ID,
											'order'					=> 'ASC'
										) );
//                                        print_r($attachments);exit;

										$temp_masks = array(  );

										foreach ($attachments as $attachment) {

											$mask_src = get_the_post_thumbnail_url( $attachment->ID );

											$mask_color = get_post( get_post_meta( $attachment->ID, 'artise-mask-d-color', true ) );

											$temp_masks []= array(

												'src'			=> $mask_src,

												'color'			=> get_post_meta( $mask_color->ID, 'artise-tile-color', true ),

												'color_img'		=> wp_get_attachment_url( get_post_meta( $mask_color->ID, 'artise-tile-img', true ) ),

												'color_id'		=> $mask_color->ID,

												'color_name'	=> $mask_color->post_title

											);

											$mask_count++;
										}


										$tile_masks []= $temp_masks;
										$bg_color = get_post( get_post_meta( $tile->ID, 'artise-tile-d-bg', true ) );

										

										$tile_bg []= array(
											'color'				=> get_post_meta( $bg_color->ID, 'artise-tile-color', true ),
											'color_id'			=> $bg_color->ID,
											'color_name'		=> $bg_color->post_title,

											'color_img'			=> wp_get_attachment_url( get_post_meta( $bg_color->ID, 'artise-tile-img', true ) )
										);

										$tile_data []= array(
											'grout_shape'			=> $grout_shape,
											'is_hexagon'		=> get_post_meta( $tile->ID, 'artise-tile-hex', true ),
											'is_ginkgo'			=> get_post_meta( $title->ID, 'artise-tile-ginkgo', true),
											'shape'				=> $shape
										);

							


									}

								?>	
							<?php endforeach; ?>

							<?php if( sizeof( $tiles ) == 0 ): ?>
								<div style="margin-left: 10px; font-style: italic;">No tiles to show for this category</div>
							<?php endif; ?>
						</div>
					</div>
				</li>
			<?php endforeach ?>
		</ul>

	</div>

	
</div>


<div id="tile-color-editor-dialog">
	<h1 class="simulator-section-title">Color Editor <!-- <span id="save-button" class="dashicons dashicons-download"> </span>--></h1>

	<div id="masks-container" class="dialog-column">
		<div id="canvas-containers">
			<div id="canvas-crosshair-container"></div>

			<div id="tile-canvas-container" class="empty">
				<div class="quadrant-rotation dashicons dashicons-image-rotate"></div>
				<canvas class="tile-editor-background canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-pattern canvas-part"></canvas>
				<canvas class="tile-editor-grout canvas-part"></canvas>
			</div>

			<div id="border-canvas-container">
				<canvas width="272" height="272" class="tile-editor-background canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<canvas width="272" height="272" class="tile-editor-pattern canvas-part"></canvas>
				<!-- <canvas width="272" height="272" class="tile-editor-grout canvas-part"></canvas> -->
			</div>
		</div>
		

		<img id="tile-canvas-hatches" style="display: none" src="<?php echo plugins_url( 'tile-simulator/assets/images/misc/hatch.png' ) ?>">

		<span id="selected-tile-title"></span>

		<?php if( $hasBorderCategory ): ?>
			<div id="tile-borders-container">
				<div class="artise-button">
					<div class="add-border">
						<span class="dashicons dashicons-plus"></span>
						Add Borders
					</div>
					<div class="remove-border">
						<span class="dashicons dashicons-no"></span>
						Remove Borders
					</div>
					
				</div>
				<br>
			</div>
			

		<?php endif; ?>

		<button id="select-tile-button" class="artise-button">
			<span class="dashicons dashicons-admin-customizer"></span>
			Select Tile
		</button>

		<button id="preview-tile-button" class="artise-button">
			<span class="dashicons dashicons-visibility"></span>
			Preview and Save
		</button>



		<div id="tile-canvas-bottom-container" class="tile-canvas-bottom">
			<div id="color-used">
				<span id="color-used-text">Colors Used:</span>
				<div id="color-used-container">
					<div class="tile-colors"></div>
					<div class="border-colors"></div>
				</div>
			</div>

			<div id="tile-size-container">
				<span id="tile-size-small" class="dashicons dashicons-screenoptions tile-size"></span>
				<span id="tile-size-big" class="dashicons dashicons-screenoptions tile-size"></span>
			</div>
		</div>

		
		
	</div>

	<div id="color-selection-container" class="dialog-column">
		<?php foreach ($tile_colors as $i => $tile_color): ?>
			<?php 

				$color = get_post_meta( $tile_color->ID, 'artise-tile-color', true );
				$img = get_post_meta( $tile_color->ID, 'artise-tile-img', true );

				$img_url = wp_get_attachment_url( $img );

				$background = ( !empty( $color ) ? $color : 'url(' . $img_url . ')' );

			?>

			<div 
				class="tile-color-box" 
				data-color="<?php echo $color ?>" 
				data-color-id="<?php echo $tile_color->ID ?>" 
				data-color-name="<?php echo htmlentities( $tile_color->post_title ) ?>" 
				data-img="<?php echo $img_url ?>"
				style="background: <?php echo $background ?>"
			>
				<img class="tile-color-img" src="<?php echo $img_url ?>">
			</div>

		<?php endforeach ?>
	</div>

	
</div>


<script type="text/javascript">
	var BORDER_SLUG = '<?php echo BORDER_CATEGORY_SLUG ?>';
	var ENV_COUNT = 5;

	var tileCount = <?php echo $tile_count ?>;
	var nMask = {
        loaded        : 0,
		innerLoaded		: 0,
//        total       : <?php echo ( $mask_count * 2 ) +  sizeof( $tile_bg ) ?> +  ENV_COUNT
		total		: <?php echo sizeof( $tile_bg ) ?> +  ENV_COUNT
	};

	function loadMask( maskSrc, innerMask){
		var imgClip = new Image(  );
		imgClip.setAttribute( 'crossOrigin', 'anonymous' );

		if(!maskSrc){
            if(innerMask){
                nMask.innerLoaded++;
            }else{
                nMask.loaded++
            }
            return imgClip;
        }

		imgClip.src = maskSrc;

		jQuery( imgClip ).load( function(  ){
            nMask.loaded++;
            if(innerMask){
                nMask.innerLoaded++;
            }else{
                nMask.loaded++
                window.loader.progress( nMask.loaded / nMask.total );
            }
		} )

		jQuery( imgClip ).error( function( err ){
			console.log(err);
            nMask.innerLoaded++;
		} )

		return imgClip;
	}

	var masks = <?php echo json_encode( $tile_masks ) ?>;
	var backgrounds = <?php echo json_encode( $tile_bg ) ?>;
	var tileData = <?php echo json_encode( $tile_data ) ?>;

	for( var i=0; i < backgrounds.length; i++ ){
		backgrounds[i].color_img = loadMask( backgrounds[i].color_img );
	}

	console.log("Loaded masks-",masks);
	for( var i=0; i < masks.length; i++ ){
		for( var j=0; j < masks[i].length; j++ ){
            masks[i][j].loadedMask = false;
            //masks[i][j].src = loadMask( masks[i][j].src );
			//masks[i][j].src = "";
			//masks[i][j].color_img = loadMask( masks[i][j].color_img );
		}
	}

</script>