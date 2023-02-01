<?php

defined('ABSPATH') or die('I\'m a plugin! Please don\'t access me directly!');

define('BORDER_CATEGORY_SLUG', 'border-collection');

define('SIMULATOR_DIR', plugin_dir_path(__FILE__));

function admin_style()
{
    wp_enqueue_style('tile-simulator-admin-style', plugins_url('assets/css/admin.css', __FILE__));

    wp_enqueue_script('block-ui', plugins_url('tile-simulator/assets/js/jquery.blockUI.js'), array('jquery'));

}
add_action('admin_enqueue_scripts', 'admin_style');

function register_styles()
{
    wp_register_style('fonts', 'https://fonts.googleapis.com/css?family=Raleway:300,400,700');
}

add_action('init', 'register_styles');

function enqueue_global_scripts()
{
    wp_enqueue_style('fonts');
}
add_action('wp_enqueue_scripts', 'enqueue_global_scripts');

require_once 'google-recaptcha.php';
require_once 'includes/includes.php';

require_once 'pages.php';