<?php

defined( 'ABSPATH' ) or die ( 'I\'m a plugin! Please don\'t access me directly!' );

global $ARTISE_SIMULATOR_PAGES;

// Add your pages here
// Format: slug => page_title
// Dont forget to add the actual page in /pages/<slug>.php
$ARTISE_SIMULATOR_PAGES = array(
	// 'tile-simulator'			=> 'Tile Simulator',
	'tile-simulator-2d'			=> 'Tile Simulator 2D'
	// 'tile-simulator-3d'			=> 'Tile Simulator 3D'
);


function create_pages(  ){
	global $ARTISE_SIMULATOR_PAGES;

	foreach ($ARTISE_SIMULATOR_PAGES as $page => $page_title) {
		if( get_page_by_title( $page_title ) == null ){
			$page_id = wp_insert_post( array(
				'post_title'			=> $page_title,
				'post_type'				=> 'page',
				'post_name'				=> $page,
				'comment_status'		=> 'closed',
				'ping_status'			=> 'closed',
				'post_content'			=> '',
				'post_status'			=> 'publish',
				'post_author'			=> 1,
				'menu_order'			=> 0

			) );
		}
	}
}
add_action( 'init', 'create_pages' );


function include_pages(  ){
	global $ARTISE_SIMULATOR_PAGES;

	foreach ($ARTISE_SIMULATOR_PAGES as $page => $page_title) {
		if( is_page( $page ) ){
			wp_enqueue_style( 'tile-simulator-style', plugins_url( 'assets/css/style.css', __FILE__ ) );

			wp_enqueue_script( 'block-ui', plugins_url( 'tile-simulator/assets/js/jquery.blockUI.js' ), array( 'jquery' ) );



			include( 'header.php' );
			include( 'pages/' . $page . '.php' );
			include( 'footer.php' );
			exit(  );
		}
	}
}
add_action( 'wp', 'include_pages' );




?>