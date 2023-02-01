<?php
defined('ABSPATH') or die('I\'m a plugin! Please don\'t access me directly!');

wp_enqueue_style('artise-tile-simulator-shared-style', plugins_url('tile-simulator/assets/css/tile-simulator-shared.css'));
wp_enqueue_style('artise-tile-simulator-2d-style', plugins_url('tile-simulator/assets/css/tile-simulator-2d.css'));

wp_enqueue_script('three-js', plugins_url('tile-simulator/assets/js/three.min.js'), array('jquery'));

wp_enqueue_script('artise-tile-simulator-2d-script', plugins_url('tile-simulator/assets/js/tile-simulator-2d.js'), array('jquery', 'three-js'));

?>


<div id="simulator-2d-container" class="simulator-container" data-tile-shape="square">

    <img id="simulator-logo" style="display: none"
        src="<?php echo plugins_url('tile-simulator/assets/images/misc/logo.png') ?>">

    <?php require_once 'page-modules/controller/tile-simulator-controller.php';?>


    <div id="view-environments-container">
        <h1 class="simulator-section-title">View</h1>

        <div id="environments" class="tile-view">

            <!-- Buttons -->
            <span id="close-env-button" class="dashicons dashicons-no env-button"></span>

            <span id="expand-env-button" class="dashicons dashicons-editor-expand env-button"></span>


            <!-- Tile Shapes -->
            <?php include 'page-modules/tile-shapes/tile-simulator-shapes.php'?>



            <!-- Environments -->
            <?php include 'page-modules/environments/index.php'?>



        </div> <!-- End of .environments  -->


        <br>
        <br>
        <span>Choose Environment:</span>
        <div id="env-icons-container">
            <!-- Bedroom Icon -->
            <div id="bedroom-env-button" class="env-icons-image-container" data-env="bedroom">
                <img src="<?php echo plugins_url('tile-simulator/assets/images/icons/env_bedroom_icon.png') ?>">
                <img class="hover"
                    src="<?php echo plugins_url('tile-simulator/assets/images/icons/env_bedroom_hover_icon.png') ?>">
            </div>

            <!-- Living room icon -->
            <div id="living-room-env-button" class="env-icons-image-container" data-env="living-room">
                <img src="<?php echo plugins_url('tile-simulator/assets/images/icons/env_living_room_icon.png') ?>">
                <img class="hover"
                    src="<?php echo plugins_url('tile-simulator/assets/images/icons/env_living_room_hover_icon.png') ?>">
            </div>

            <!-- Kitchen Icon -->
            <div id="kitchen-env-button" class="env-icons-image-container" data-env="kitchen">
                <img src="<?php echo plugins_url('tile-simulator/assets/images/icons/env_kitchen_icon.png') ?>">
                <img class="hover"
                    src="<?php echo plugins_url('tile-simulator/assets/images/icons/env_kitchen_hover_icon.png') ?>">
            </div>

            <!-- Bathroom Icon -->
            <div id="bathroom-env-button" class="env-icons-image-container" data-env="bathroom">
                <img src="<?php echo plugins_url('tile-simulator/assets/images/icons/env_bathroom_icon.png') ?>">
                <img class="hover"
                    src="<?php echo plugins_url('tile-simulator/assets/images/icons/env_bathroom_hover_icon.png') ?>">
            </div>

            <!-- Commercial Room Icon -->
            <div id="commercial-env-button" class="env-icons-image-container" data-env="commercial">
                <img src="<?php echo plugins_url('tile-simulator/assets/images/icons/env_commercial_room_icon.png') ?>">
                <img class="hover"
                    src="<?php echo plugins_url('tile-simulator/assets/images/icons/env_commercial_room_hover_icon.png') ?>">
            </div>
        </div> <!-- End of #env-icons-container -->

        <br><br>
        <!-- <button id="undo-button" class="artise-button">Undo</button>
		<button id="redo-button" class="artise-button">Redo</button> -->

        <div id="grout-container" class="tile-canvas-bottom">
            <div id="grout-color-container">
                <span>Grout Color:</span>
                <div id="grout-colors">
                    <div class="grout-color-box selected" data-color="#ffffff" style="background: #ffffff"></div>
                    <div class="grout-color-box" data-color="#b1b2ad" style="background: #b1b2ad"></div>
                    <div class="grout-color-box" data-color="#000000" style="background: #000000"></div>
                </div>
            </div>


            <div id="grout-thickness-container">
                <span>Grout Thickness:</span>
                <div id="grout-thickness">
                    <div class="artise-button" data-thickness="0.5">None</div>
                    <div class="artise-button selected" data-thickness="2">Thin</div>
                    <div class="artise-button" data-thickness="6">Thick</div>

                </div>
            </div>
            <br>

        </div>


        <br><br>

        <button id="edit-tile-button" class="artise-button">
            <span class="dashicons dashicons-admin-appearance"></span>
            Edit Tile
        </button>

        <button id="save-button" class="artise-button">Save</button> &nbsp;&nbsp;&nbsp;
        <button id="shop-button" class="artise-button"><a target="_blank" href="https://lilitile.com/collections/custom">Shop Now</a></button> &nbsp;&nbsp;&nbsp;


    </div> <!-- End of #view-environments-container -->




</div> <!-- End of #simulator-2d-container -->

<br><br><br><br>