<?php

defined( 'ABSPATH' ) or die ( 'I\'m a plugin! Please don\'t access me directly!' );

global $color_selector_link;

$color_selector_link = '#TB_inline?width=300&height=300&inlineId=color-selector-modal';


function register_artise_tile_mask_post(  ){
	register_post_type(
		'artise-tile-masks',
		array(
			'labels'				=> array(
				'name'				=> __( 'Tile Masks' ),
				'singular'			=> __( 'Tile Mask' )
			),
			'public'				=> true,
			'has_archive'			=> false,
			'supports'				=> array( 'title', 'thumbnail', 'editor' ),
			'show_in_menu'			=> false
		)
	);

}

add_action( 'init', 'register_artise_tile_mask_post' );


function artise_tile_mask_tag( $post ){

	global $color_selector_link;

	// $mask_id = get_post_meta( $post->ID, 'artise-mask-img', true );

	$mask_src = get_the_post_thumbnail_url( $post->ID );
	$color_id = get_post_meta( $post->ID, 'artise-mask-d-color', true );
	$color = get_post_meta( $color_id, 'artise-tile-color', true );

	$img = get_post_meta( $color_id, 'artise-tile-img', true );
	$img_url = wp_get_attachment_url( $img );

	?>
		
		<a 
			name="Tile Colors" 
			href="<?php echo $color_selector_link ?>" 
			class="thickbox color-picker button"
		>

			<canvas 
				class="tile-mask" 
				width="100" 
				height="100" 
				data-mask-id="<?php echo $post->ID ?>"
				data-mask-src="<?php echo $mask_src ?>"
				data-color-id="<?php echo $color_id ?>"
				data-color="<?php echo $color ?>"
				data-color-img="<?php echo $img_url ?>"
			></canvas>

			<span class="dashicons dashicons-no remove-button"></span>

		</a>


	<?php

}

function add_artise_tile_mask(  ){
	if( !isset( $_POST['tile_id'] ) 
		|| !isset( $_POST['img_id'] ) )
		wp_die( 'unsuccessfull' );

	$defaultColor = get_posts( array(
		'numberposts'					=> 1,
		'post_type'						=> 'artise-tile-colors'
	) );
	$defaultColor = $defaultColor[0]->ID;

	$mask_id = wp_insert_post( array(
		'post_type'						=> 'artise-tile-masks',
		'post_parent'					=> $_POST['tile_id'],
		'post_status'					=> 'publish',
		'post_author'					=> get_current_user_id(  ),
		'meta_input'					=> array(
			'artise-mask-img'			=> $_POST['img_id'],
			'artise-mask-d-color'		=> $defaultColor
		)
	) );

	if( $mask_id == 0 )
		wp_die( 'unsuccessfull' );

	wp_update_post( array(
		'ID'							=> $mask_id,
		'post_title'					=> "Tile#{$_POST['tile_id']} Mask#{$mask_id}"
	) );

	wp_update_post( array(
		'ID'							=> $_POST['img_id'],
		'post_parent'					=> $mask_id
	) );

	set_post_thumbnail( $mask_id, $_POST['img_id'] );

	artise_tile_mask_tag( get_post( $mask_id ) );
	wp_die(  );

}

add_action( 'wp_ajax_add_artise_tile_mask', 'add_artise_tile_mask' );
	


function remove_artise_tile_mask(  ){
	if( !isset( $_POST['mask_id'] ) )
		wp_die( 'unsuccessfull' );

	if( wp_delete_post( $_POST['mask_id'], true ) != false )
		wp_die( 'successfull' );

	wp_die( 'unsuccessfull' );

}
add_action( 'wp_ajax_remove_artise_tile_mask', 'remove_artise_tile_mask' );


function edit_artise_tile_mask_color(  ){
	if( !isset( $_POST['mask_id'] ) 
		|| !isset( $_POST['color_id'] ) )
		wp_die( 'unsuccessfull' );

	$post = get_post( $_POST['mask_id'] );

	if( $post->post_author != get_current_user_id(  ) )
		wp_die( 'unsuccessfull' );


	if( update_post_meta( $_POST['mask_id'], 'artise-mask-d-color', $_POST['color_id'] ) )
		wp_die( 'successfull' );

	wp_die( 'unsuccessfull' );
}
add_action( 'wp_ajax_edit_artise_tile_mask_color', 'edit_artise_tile_mask_color' );



?>