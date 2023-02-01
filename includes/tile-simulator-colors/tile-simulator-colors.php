<?php
defined( 'ABSPATH' ) or die ( 'I\'m a plugin! Please don\'t access me directly!' );


function register_artise_color_post(  ){
	register_post_type(
		'artise-tile-colors',
		array(
			'labels'				=> array(
				'menu_name'			=> __( 'Tile Colors' ),
				'name'				=> __( 'Tile Colors' ),
				'singular'			=> __( 'Tile Color' ),
				'add_new_item'		=> __( 'Add New Tile Color' )
				// 'all_items'			=> __( 'All Tile Colors' )
			),
			'public'				=> true,
			'has_archive'			=> true,
			'supports'				=> array( 'title', 'excerpt' ),
			'show_in_menu'			=> 'edit.php?post_type=artise-tiles'
		)
	);
}
add_action( 'init', 'register_artise_color_post' );


function add_artise_tile_color_column( $columns ){

	$temp = array(
		'cb'					=> '<input type="checkbox">',
		'artise-tile-color'		=> ''
	);

	unset( $columns['cb'] );

	return array_merge( $temp, $columns );
}
add_filter( 'manage_edit-artise-tile-colors_columns', 'add_artise_tile_color_column' );


function add_artise_tile_color_column_content( $column, $post_id ){
	if( $column === 'artise-tile-color' ){

		$color = get_post_meta( $post_id, 'artise-tile-color', true );
		$img = get_post_meta( $post_id, 'artise-tile-img', true );
		$img_url =  wp_get_attachment_url( $img );

		$background = ( !empty( $color ) ? $color : 'url(' . $img_url . ')' );

		echo '<div class="artise-tile-color-box" style="background:' . $background . '"></div>';
	}
}
add_action( 'manage_artise-tile-colors_posts_custom_column', 'add_artise_tile_color_column_content', 10, 2 );


function add_artise_color_meta_boxes(  ){
	add_meta_box( 'artise_tile_color', 'Image/Color', 'artise_tile_color_meta_box', 'artise-tile-colors', 'normal' );
}
add_action( 'add_meta_boxes', 'add_artise_color_meta_boxes' );


// META BOX - TILE MASK
function artise_tile_color_meta_box(  ){
	global $post;

	$color = get_post_meta( $post->ID, 'artise-tile-color', true );
	$img = get_post_meta( $post->ID, 'artise-tile-img', true );

	$img_url  = wp_get_attachment_url( $img );

	$is_new_post = empty( $color ) && empty( $img );

	if( empty( $color ) )
		$color = '#fff';

	?>


		<div class="d-inline-block color-field-container color-field-container-color <?php if($color != '#fff' || $is_new_post) echo 'active' ?>">
			<div>Select Color:</div>
			<div class="tile-color-icon" style="background-color: <?php echo $color ?>">
				<span class="dashicons dashicons-art"></span>
			</div>

			<input type="text" value="<?php echo $color ?>" name="tile-color" class="tile-color-field" />
		</div>

		<div class="or-container d-inline-block">
			OR
		</div>

		<div  class="d-inline-block color-field-container color-field-container-img <?php if(!empty($img) || $is_new_post) echo 'active' ?>">

			<div>Select Image:</div>

			<div class="tile-img-icon" style="background-image: url('<?php echo  $img_url ?>');">
				<input type="text" class="tile-img-field" name="tile-img">
			</div>
		</div>
		

		

		
		

	<?php

}


function save_artise_tile_color_meta_box( $post_id ){
	if( !isset( $_POST['tile-color'] ) && !isset( $_POST['tile-img'] ) )
		return;

	if( !current_user_can( 'edit_post', $post_id ) )
		return;

	update_post_meta( $post_id, 'artise-tile-color', $_POST['tile-color'] );
	update_post_meta( $post_id, 'artise-tile-img', $_POST['tile-img'] );

}
add_action( 'save_post_artise-tile-colors', 'save_artise_tile_color_meta_box' );





function enqueue_artise_tile_color_scripts( $hook ){
	if( $hook !== 'post-new.php' && $hook !== 'post.php' )
		return;

	global $post;
	if( $post->post_type !== 'artise-tile-colors' )
		return;

	wp_enqueue_style( 'wp-color-picker' );
	wp_enqueue_script( 'wp-color-picker' );

	wp_enqueue_media();


	wp_enqueue_style( 'admin-tile-simulator-color-style', plugins_url( 'tile-simulator/assets/css/admin-tile-simulator-color.css' ) );

	wp_enqueue_script( 'admin-tile-simulator-color-script', plugins_url( 'tile-simulator/assets/js/admin-tile-simulator-color.js' ), array( 'jquery', 'wp-color-picker' ) );
}
add_action( 'admin_enqueue_scripts', 'enqueue_artise_tile_color_scripts' );


?>