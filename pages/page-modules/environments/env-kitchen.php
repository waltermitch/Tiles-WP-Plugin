<div id="kitchen-simulator" class="env-container" data-env="kitchen">
    <!-- Hovers -->
    <div id="kitchen-wall-hover" class="wall wall-hover hover" data-part="wall"></div>
    <div id="kitchen-floor-hover" class="floor floor-hover hover" data-part="floor"></div>


    <!-- Image -->
    <div class="env-image-container" class="container">
        <img src="<?php echo plugins_url('tile-simulator/assets/images/env/kitchen.png') ?>">
    </div>

    <!-- Parts -->
    <!-- <div id="kitchen-wall-container-1" class="wall wall-container bg-container">
					<div class="background"></div>
				</div> -->

    <canvas id="kitchen-wall-container-1" class="wall-container bg-container three-bg-container small"
        data-part="wall-small" 
        data-xRepeat="33" data-yRepeat="15" 
        data-width="250" data-height="200"
        data-position="0.7, 1.2, 17" 
        data-zcamera="70" 
        data-borders="kitchen-wall-border-1, kitchen-wall-border-2"
        >
    </canvas>

    <div id="kitchen-wall-border-1" data-xtiles="33" data-position="0,0,0.1" data-border-part="bottom"></div>

    <div id="kitchen-wall-border-2" data-xtiles="33" data-position="0,2,0.1" data-border-part="top"></div>


    <canvas id="kitchen-wall-container-2" class="wall-container bg-container three-bg-container big"
        data-part="wall-big" 
        data-xRepeat="33" data-yRepeat="15" 
        data-width="250" data-height="200"
        data-position="0.7,-0.4,37" 
        data-zcamera="70" 
        data-borders="kitchen-wall-border-1, kitchen-wall-border-2"
        >
    </canvas>



    <!-- <div id="kitchen-floor-container" class="floor floor-container bg-container">
					<div class="background"></div>
				</div>

				 -->


    <canvas id="kitchen-floor-container-1" class="floor-container bg-container three-bg-container small"
        data-part="floor-small" 
        data-xRepeat="33" data-yRepeat="15" 
        data-width="250" data-height="100"
        data-position="0, -40, 0.2" 
        data-rotation="-1.8, 0, 0" 
        data-zcamera="70"
        data-borders="kitchen-floor-border-1, kitchen-floor-border-2, kitchen-floor-border-3, kitchen-floor-border-4, kitchen-floor-border-9, kitchen-floor-border-10">
    </canvas>

    <div id="kitchen-floor-border-1" data-xtiles="8" data-position="0.5,-8,0.1" data-border-part="bottom"></div>

    <div id="kitchen-floor-border-2" data-ytiles="5" data-position="-4,-5,0.1" data-border-part="left"></div>

    <div id="kitchen-floor-border-3" data-ytiles="5" data-position="5,-5,0.1" data-border-part="right"></div>

    <div id="kitchen-floor-border-4" data-xtiles="33" data-position="1,-13,0.1" data-border-part="top"></div>

    <div id="kitchen-floor-border-9" data-position="-4,-8,0.1" data-border-part="corner-bl"></div>

    <div id="kitchen-floor-border-10" data-position="5,-8,0.1" data-border-part="corner-br"></div>







    <!-- 12x12 -->
    <canvas id="kitchen-floor-container-2" class="floor-container bg-container three-bg-container big"
        data-part="floor-big" 
        data-xRepeat="18" data-yRepeat="10" 
        data-width="250" data-height="100"
        data-position="0, -40, 1" 
        data-rotation="-1.8, 0, 0" 
        data-zcamera="70"
        data-borders="kitchen-floor-border-1, kitchen-floor-border-5, kitchen-floor-border-6, kitchen-floor-border-7, kitchen-floor-border-8, kitchen-floor-border-11, kitchen-floor-border-12"
    ></canvas>

    <div id="kitchen-floor-border-5" data-xtiles="4" data-position="0.5,-5,0.1" data-border-part="bottom"></div>
    <div id="kitchen-floor-border-6" data-ytiles="6" data-position="-2,-2.5,0.1" data-border-part="left"></div>
    <div id="kitchen-floor-border-7" data-ytiles="6" data-position="3,-2.5,0.1" data-border-part="right"></div>
    <div id="kitchen-floor-border-8" data-xtiles="9" data-position="0,-8,0.1" data-border-part="bottom"></div>

    <div id="kitchen-floor-border-11" data-position="-2,-5,0.15" data-border-part="corner-bl"></div>

    <div id="kitchen-floor-border-12" data-position="3,-5,0.15" data-border-part="corner-br"></div>



</div>