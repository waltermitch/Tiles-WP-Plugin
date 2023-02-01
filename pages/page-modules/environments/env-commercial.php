<div id="commercial-simulator" class="env-container" data-env="commercial">
    <!-- Hovers -->
    <div id="commercial-wall-hover1" class="wall wall-hover hover" data-part="wall"></div>
    <div id="commercial-floor-hover" class="floor floor-hover hover" data-part="floor"></div>

    <!-- Image -->
    <div class="env-image-container" class="container">
        <img src="<?php echo plugins_url('tile-simulator/assets/images/env/commercial_old.png') ?>">
    </div>

    <!-- Parts -->
    <!-- <div id="commercial-wall-container-1" class="wall wall-container bg-container">
					<div class="background"></div>
				</div> -->

    <canvas id="commercial-wall-container-1" class="wall-container bg-container three-bg-container small"
        data-part="wall-small" 
        data-xRepeat="28" data-yRepeat="8" 
        data-width="300" data-height="100"
        data-position="3,1.5,-0.5" 
        data-zcamera="70"
        data-borders="commercial-wall-border-1, commercial-wall-border-2, commercial-wall-border-3, commercial-wall-border-5, commercial-wall-border-6"
    ></canvas>

    <div id="commercial-wall-border-1" data-xtiles="23" data-position="-6,8,0.1" data-border-part="top"></div>

    <div id="commercial-wall-border-2" data-ytiles="23" data-position="-8,1,0.1" data-border-part="right"></div>

    <div id="commercial-wall-border-3" data-xtiles="23" data-position="-6,-1,0.1" data-border-part="bottom"></div>


    <div id="commercial-wall-border-5" data-position="-8,8,0.1" data-border-part="corner-tr"></div>

    <div id="commercial-wall-border-6" data-position="-8,-1,0.1" data-border-part="corner-br"></div>






    <!-- 12x12 -->
    <canvas id="commercial-wall-container-2" class="wall-container bg-container three-bg-container big"
        data-part="wall-big" 
        data-xRepeat="28" data-yRepeat="8" 
        data-width="300" data-height="100"
        data-position="10.8,4,13" 
        data-zcamera="70"
        data-borders="commercial-wall-border-4, commercial-wall-border-2, commercial-wall-border-3, commercial-wall-border-6, commercial-wall-border-7"
    ></canvas>

    <div id="commercial-wall-border-4" data-xtiles="23" data-position="-6,6,0.1" data-border-part="top"></div>


    <div id="commercial-wall-border-7" data-position="-8,6,0.1" data-border-part="corner-tr"></div>


    <!-- <div id="commercial-floor-container" class="floor floor-container bg-container">
					<div class="background"></div>
				</div>
				-->
    <canvas id="commercial-floor-container-1" class="floor-container bg-container three-bg-container small"
        data-part="floor-small" 
        data-xRepeat="23" data-yRepeat="15" 
        data-width="300" data-height="100"
        data-position="-10, -40, -0.5" 
        data-rotation="-1.44, 0, 0" 
        data-zcamera="70"
        data-borders="commercial-floor-border-1, commercial-floor-border-2, commercial-floor-border-3, commercial-floor-border-6, commercial-floor-border-8"
    ></canvas>

    <div id="commercial-floor-border-1" data-xtiles="23" data-position="0,1,0.1" data-border-part="top"></div>
    <div id="commercial-floor-border-2" data-ytiles="10" data-position="7,-3.5,0.1" data-border-part="left"></div>
    <div id="commercial-floor-border-3" data-xtiles="3" data-position="9,-9,0.1" data-border-part="bottom"></div>

    <div id="commercial-floor-border-6" data-position="7,-9,0.2" data-border-part="corner-bl"></div>

    <div id="commercial-floor-border-8" data-position="7,1,0.2" data-border-part="corner-tr"></div>


    <!-- 12x12 -->
    <canvas id="commercial-floor-container-2" class="floor-container bg-container three-bg-container big"
        data-part="floor-big" 
        data-xRepeat="18" data-yRepeat="10" 
        data-width="300" data-height="100"
        data-position="-4,-42,3" 
        data-rotation="-1.45,0,0" 
        data-zcamera="70"
        data-borders="commercial-floor-border-10, commercial-floor-border-4, commercial-floor-border-5, commercial-floor-border-7, commercial-floor-border-9"
    ></canvas>

    <div id="commercial-floor-border-10" data-xtiles="23" data-position="0,2,0.1" data-border-part="top"></div>

    <div id="commercial-floor-border-4" data-ytiles="6" data-position="5,-1.5,0.1" data-border-part="left"></div>
    <div id="commercial-floor-border-5" data-xtiles="3" data-position="7,-5,0.2" data-border-part="bottom"></div>

    <div id="commercial-floor-border-7" data-position="5,-5,0.2" data-border-part="corner-bl"></div>

    <div id="commercial-floor-border-9" data-position="5,2,0.2" data-border-part="corner-tr"></div>



</div>