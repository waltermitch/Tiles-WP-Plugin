<?php


defined( 'ABSPATH' ) or die ( 'I\'m a plugin! Please don\'t access me directly!' );


function register_artise_tile_taxonomies(  ){
	register_taxonomy(
		'artise-tile-category',
		'artise-tiles',
		array(
			'hierarchical'			=> true,
			'labels'				=> array(
				'name'				=> __( 'Tile Categories' ),
				'singular_name'		=> __( 'Tile Category' )
			),
			'show_ui'				=> true,
			'show_admin_column'		=> true
		)
	);
}
add_action( 'init', 'register_artise_tile_taxonomies' );

function register_artise_tile_post(  ){
	register_post_type(
		'artise-tiles',
		array(
			'labels'				=> array(
				'menu_name'			=> __( 'Tile Simulator' ),
				'name'				=> __( 'Tiles' ),
				'singular'			=> __( 'Tile' ),
				'add_new'			=> __( 'Add New Tile' ),
				'add_new_item'		=> __( 'Add New Tile' ),
				'all_items'			=> __( 'All Tiles' )
			),
			'capability_type'		=> 'artise_tile',
			'map_meta_cap'			=> true,
			'public'				=> true,
			'has_archive'			=> true,
			'supports'				=> array( 'title', 'excerpt' ),
			'menu_icon'				=> 'dashicons-screenoptions'
			// 'show_in_menu'			=> 'tile-simulator'
		)
	);
}

add_action( 'init', 'register_artise_tile_post' );



function add_artise_tile_contributor_caps(  ){
	$contributor = get_role( 'contributor' );

	$contributor->add_cap( 'edit_artise_tiles' );
	$contributor->add_cap( 'edit_published_artise_tiles' );

	$contributor->add_cap( 'publish_artise_tiles' );
	$contributor->add_cap( 'upload_files' );


}
add_action( 'admin_init', 'add_artise_tile_contributor_caps' );


function add_artise_tile_admin_caps(  ){
	$admin = get_role( 'administrator' );

	$admin->add_cap( 'edit_artise_tile' );
	$admin->add_cap( 'read_artise_tile' );
	$admin->add_cap( 'delete_artise_tile' );

	$admin->add_cap( 'edit_artise_tiles' );
	$admin->add_cap( 'edit_others_artise_tiles' );

	$admin->add_cap( 'publish_artise_tiles' );
	$admin->add_cap( 'read_private_artise_tiles' );



	$admin->add_cap( 'delete_artise_tiles' );
	$admin->add_cap( 'delete_published_artise_tiles' );
	$admin->add_cap( 'delete_private_artise_tiles' );
	$admin->add_cap( 'delete_others_artise_tiles' );

	$admin->add_cap( 'edit_published_artise_tiles' );
	$admin->add_cap( 'edit_private_artise_tiles' );



}
add_action( 'admin_init', 'add_artise_tile_admin_caps' );



function add_artise_tile_thumbnail_column( $columns ){

	$temp = array(
		'cb'					=> '<input type="checkbox">',
		'featured-image'		=> '<span class="dashicons dashicons-format-image"></span>' 
	);

	unset( $columns['cb'] );

	return array_merge( $temp, $columns );

}

add_filter( 'manage_edit-artise-tiles_columns', 'add_artise_tile_thumbnail_column' );


function add_artise_tile_thumbnail_column_content( $column, $post_id ){
	if( $column === 'featured-image' ){
		$image_src = get_post_meta( $post_id, 'artise-tile-img', true );
		echo "<img src='$image_src' width='100' height='100' />";
		// echo get_the_post_thumbnail( $post_id, array( 100, 100 ) );
	}
}

add_action( 'manage_artise-tiles_posts_custom_column', 'add_artise_tile_thumbnail_column_content', 10, 2 );



function add_artise_tile_meta_boxes(  ){
	add_meta_box( 'artise_tile_mask', 'Tile Masks', 'artise_tile_mask_meta_box', 'artise-tiles', 'normal' );

}
add_action( 'add_meta_boxes', 'add_artise_tile_meta_boxes' );





// META BOX - TILE MASK
function artise_tile_mask_meta_box(  ){
	global $post;

	if( $post->post_status !== 'publish' ){
		echo 'Please publish tile before adding masks first';
		return;
	}

	$tile_colors = get_posts( array( 
		'post_type'				=> 'artise-tile-colors',
		'posts_per_page'		=> -1,
		'orderby'				=> 'name',
		'order'					=> 'ASC'
	) );



	$color_id = get_post_meta( $post->ID, 'artise-tile-d-bg', true );

	if( empty( $color_id ) )
		$color_id = $tile_colors[0]->ID;
	
	$color = get_post_meta( $color_id, 'artise-tile-color', true );

	$color_img = get_post_meta( $color_id, 'artise-tile-img', true );

	$color_img_tag = wp_get_attachment_image( $color_img );


	if( $color_id == -1 )
		$color = '#fff';


	$masks = get_posts( array(
		'post_type'				=> 'artise-tile-masks',
		'posts_per_page'		=> -1,
		'post_parent'			=> $post->ID,
		'order'					=> 'ASC'
	) );


	$tile_grout = get_post_meta( $post->ID, 'artise-tile-grout', true );
	if( $tile_grout == '' || $tile_grout == '1' )
		$tile_grout = 'cross';
	else if( $tile_grout == '0' )
		$tile_grout = 'nogrout';
		
	$tile_shape_style = 'square';
	$tile_shape_style = get_post_meta( $post->ID, 'artise-tile-shape', true);
	if ($tile_shape_style == null || $tile_shape_style == ''){
		$tile_shape_style = 'square';
		$is_hexagon = get_post_meta( $post->ID, 'artise-tile-hex', true );
		$is_ginkgo = get_post_meta( $post->ID, 'artise-tile-ginkgo', true );
		if ($is_hexagon){
			$tile_shape_style = 'hexagon';
		}else if ($is_ginkgo) {
			$tile_shape_style = 'ginkgo';
		}
	}

	$tile_scale = get_post_meta( $post->ID, 'artise-tile-scale', true );
	if( $tile_scale == '' )
		$tile_scale = 1;

	$upload_link = esc_url( get_upload_iframe_src( 'image', $post->ID ) );
	
	global $color_selector_link;

	?>
		<script type="text/javascript">
			window.postId = <?php echo $post->ID ?>;
			var bgColor = '<?php echo $color ?>';
			var bgImg = jQuery( '<?php echo $color_img_tag ?>')[0];

			var groutShape = '<?php echo $tile_grout ?>';
			var shapeStyle = '<?php echo $tile_shape_style ?>';


		</script>

		<div id="tile-mask-box">
			<div id="preview-column" data-max-height="200">
				<canvas id="preview-grout" width="200" height="200" data-itile="-1"></canvas>
				<canvas width="200" height="200" data-itile="0"></canvas>


			</div>
			<div id="settings-column">
				<table class="form-table">
					<tr>
						<th scope="row">Default Background Color:</th>
						<td>
							<a 
								id="background-button"
								name="Tile Colors" 
								href="<?php echo $color_selector_link ?>" 
								class="thickbox color-picker button"
							>
								<canvas 
									width="25" 
									height="25"
									data-color-id="<?php echo $color_id ?>"
									data-color="<?php echo $color ?>"
									data-itile="0"></canvas>
							</a>
							<input id="background-input" type="hidden" name="tile-d-bg" value="<?php echo $color_id ?>">

							<input id="tile-image-input" type="hidden" name="tile-image">
						</td>
					</tr>
					<tr>
						<th scope="row">Grout Shape:</th>
						<td>
							&nbsp;<select id="tile-grout-shape" name="tile-grout-shape">
							</select>
						</td>
					</tr>
					<!-- <tr>
						<th scope="row">Is Hexagon:</th>
						<td>
							&nbsp;<input id="tile-is-hexagon" type="checkbox" name="tile-is-hexagon" 	value="1" <?php if( $is_hexagon ) echo 'checked' ?>>
						</td>
					</tr>
					<tr>
						<th scope="row">Is Scale:</th>
						<td>
							&nbsp;<input id="tile-is-ginkgo" type="checkbox" name="tile-is-ginkgo" 	value="1" <?php if( $is_ginkgo ) echo 'checked' ?>>
						</td>
					</tr> -->
					<tr>
						<th scope="row">Shape Style:</th>
						<td>
							&nbsp;<select id="tile-shape-style" name="tile-shape-style">
								<option value="square" data-text="square"  selected='selected'>Square</option>
								<option value="hexagon" data-text="hexagon"  >Hexagon</option>
								<option value="ginkgo" data-text="ginkgo"  >Scale</option>
								<option value="lola" data-text="lola"  >Lola</option>
								<option value="aqua" data-text="aqua"  >Rectangle 2&#215;8</option>
								<option value="triangle" data-text="triangle"  >Triangle</option>
								<option value="busta" data-text="busta"  >Rectangle 4&#215;8</option>
								<option value="arabesque" data-text="arabesque"  >Arabesque</option>
							</select>
						</td>
					</tr>
					<tr>
						<th>Scale</th>
						<td>
							&nbsp;<input id="tile-scale" type="number" name="tile-scale" step="any" value="<?php echo $tile_scale ?>"><br>
							<small>Value of <tt>1</tt> will have the tile render at the normal size.<br>A value from <tt>0-1</tt> (ie. 0.5) will have the tile render at a smaller size.<br>A value <tt>> 1</tt> will have the tile render at a larger size</small>
						</td>
					</tr>
				</table>

				<hr>

				<a id="add-mask-button" class="button" href="<?php echo $upload_link ?>">Add Tile Mask</a>

				<div id="tile-masks-container">
					<?php foreach ($masks as $mask): ?>
						<?php artise_tile_mask_tag( $mask ) ?>
					<?php endforeach; ?>
				</div>
				
			</div>
			
		</div>

		<div id="color-selector-modal" style="display: none;">
			<div style="margin-top: 10px">
				Select a color:
				<div id="color-grid">
					<!-- No Color -->
					<div
						class="tile-color-box"
						data-color-id="-1"
						data-color="#fff"
					></div>

					<!-- Tile Colors -->
					<?php foreach ($tile_colors as $tile_color): ?>
						<?php 
							$color = get_post_meta( $tile_color->ID, 'artise-tile-color', true );
							$img = get_post_meta( $tile_color->ID, 'artise-tile-img', true );
							$img_url = wp_get_attachment_url( $img );

							$background = ( !empty( $color ) ? $color : 'url(' . $img_url . ')' );
						?>

						<div 
							class="tile-color-box" 
							data-color-id="<?php echo $tile_color->ID ?>"
							data-color="<?php echo $color ?>"
							data-img="<?php echo $img_url ?>"
							data-color-name="<?php echo $tile_color->post_title ?>"
							style="background: <?php echo $background ?>"
						>
							<img class="tile-color-img" src="<?php echo $img_url ?>">
						</div>
					<?php endforeach; ?>
				</div>
			</div>
			
		</div>
		


	<?php
}




function save_artise_tile_masks_meta_box( $post_id ){
	if( !isset( $_POST['tile-d-bg'] ) 
		|| !isset( $_POST['tile-image'] ) )
		return;

	if( !current_user_can( 'edit_artise_tiles', $post_id ) )
		return;

	update_post_meta( $post_id, 'artise-tile-d-bg', $_POST['tile-d-bg'] );
	update_post_meta( $post_id, 'artise-tile-img', $_POST['tile-image'] );
	update_post_meta( $post_id, 'artise-tile-scale', $_POST['tile-scale'] );
	update_post_meta( $post_id, 'artise-tile-grout', $_POST['tile-grout-shape'] );
	update_post_meta( $post_id, 'artise-tile-shape', $_POST['tile-shape-style'] );


	if( $_POST['tile-is-hexagon'] == 1 )
		update_post_meta( $post_id, 'artise-tile-hex', 1 );
	else
		update_post_meta( $post_id, 'artise-tile-hex', 0 );

	if( $_POST['tile-is-ginkgo'] == 1 )
		update_post_meta( $post_id, 'artise-tile-ginkgo', 1 );
	else
		update_post_meta( $post_id, 'artise-tile-ginkgo', 0 );


	// update_post_meta( $post_id, 'artise-tile-color', 'hello world');

}
add_action( 'save_post_artise-tiles', 'save_artise_tile_masks_meta_box' );


function enqueue_artise_tile_scripts( $hook ){
	if( $hook !== 'post-new.php' && $hook !== 'post.php' )
		return;

	global $post;
	if( $post->post_type !== 'artise-tiles' )
		return;

	wp_enqueue_media();
	add_thickbox(  );


	wp_enqueue_style( 'admin-tile-simulator-tile-style', plugins_url( 'tile-simulator/assets/css/admin-tile-simulator-tile.css' ) );

	wp_enqueue_script( 'artise-grout-shapes', plugins_url( 'tile-simulator/assets/js/grout-shapes.js' ), array( 'jquery' ) );

	wp_enqueue_script( 'admin-tile-simulator-tile-script', plugins_url( 'tile-simulator/assets/js/admin-tile-simulator-tile.js' ), array( 'jquery', 'artise-grout-shapes' ) );



}
add_action( 'admin_enqueue_scripts', 'enqueue_artise_tile_scripts' );

?>