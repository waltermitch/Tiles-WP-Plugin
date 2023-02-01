<div id="bathroom-simulator" class="env-container" data-env="bathroom">
    <!-- Hovers -->
    <div id="bathroom-wall-hover1" class="wall wall-hover hover" data-part="wall"></div>
    <div id="bathroom-floor-hover" class="floor floor-hover hover" data-part="floor"></div>

    <!-- Image -->
    <div class="env-image-container" class="container">
        <img src="<?php echo plugins_url('tile-simulator/assets/images/env/bathroom.png') ?>">
    </div>

    <!-- Parts -->
    <!-- <div id="bathroom-wall-container-1" class="wall wall-container bg-container">
					<div class="background"></div>
				</div> -->

    <canvas id="bathroom-wall-container-1" class="wall-container bg-container three-bg-container small"
        data-part="wall-small" 
        data-xRepeat="20" data-yRepeat="10" 
        data-width="260" data-height="175"
        data-position="4.3,3,10" 
        data-zcamera="70"
        data-borders="bathroom-wall-border-1, bathroom-wall-border-2, bathroom-wall-border-3, bathroom-wall-border-4, bathroom-wall-border-5, bathroom-wall-border-6, bathroom-wall-border-7, bathroom-wall-border-8"
    ></canvas>

    <div id="bathroom-wall-border-1" data-xtiles="40" data-position="0.5,6,0.1" data-border-part="top"></div>

    <div id="bathroom-wall-border-2" data-xtiles="20" data-position="0.5,0,0.1" data-border-part="bottom"></div>

    <div id="bathroom-wall-border-3" data-ytiles="20" data-position="-5,0.5,0.1" data-border-part="left"></div>

    <div id="bathroom-wall-border-4" data-ytiles="20" data-position="-1,.5,0.1" data-border-part="right"></div>

    <div id="bathroom-wall-border-5" data-position="-5,6,0.1" data-border-part="corner-tl"></div>

    <div id="bathroom-wall-border-6" data-position="-1,6,0.1" data-border-part="corner-tr"></div>

    <div id="bathroom-wall-border-7" data-position="-5,0,0.15" data-border-part="corner-bl"></div>

    <div id="bathroom-wall-border-8" data-position="-1,0,0.15" data-border-part="corner-br"></div>


    <!-- 12x12 -->
    <canvas id="bathroom-wall-container-2" class="wall-container bg-container three-bg-container big"
        data-part="wall-big" 
        data-xRepeat="20" data-yRepeat="10" 
        data-width="260" data-height="175"
        data-position="4.7,2.4,22" 
        data-zcamera="70"
        data-borders="bathroom-wall-border-9, bathroom-wall-border-2, bathroom-wall-border-10, bathroom-wall-border-4, bathroom-wall-border-11, bathroom-wall-border-12, bathroom-wall-border-13, bathroom-wall-border-8"
    ></canvas>

    <div id="bathroom-wall-border-9" data-xtiles="40" data-position="0.5,5,0.1" data-border-part="top"></div>

    <div id="bathroom-wall-border-10" data-ytiles="20" data-position="-4,0.5,0.1" data-border-part="left"></div>

    <div id="bathroom-wall-border-11" data-position="-4,5,0.1" data-border-part="corner-tl"></div>

    <div id="bathroom-wall-border-12" data-position="-1,5,0.1" data-border-part="corner-tr"></div>

    <div id="bathroom-wall-border-13" data-position="-4,0,0.1" data-border-part="corner-bl"></div>






    <!-- <div id="bathroom-floor-container" class="floor floor-container bg-container">
					<div class="background"></div>
				</div> -->

    <canvas id="bathroom-floor-container-1" class="floor-container bg-container three-bg-container small"
        data-part="floor-small" 
        data-xRepeat="20" data-yRepeat="10" 
        data-width="260" data-height="100"
        data-position="2.5, -42, 2" 
        data-rotation="-1.6, 0, 0," 
        data-zcamera="70"
        data-borders="bathroom-floor-border-1, bathroom-floor-border-2, bathroom-floor-border-3, bathroom-floor-border-4, bathroom-floor-border-5, bathroom-floor-border-6"
    ></canvas>
    <div id="bathroom-floor-border-1" data-xtiles="20" data-position="0,-6,0.1" data-border-part="bottom"></div>
    <div id="bathroom-floor-border-2" data-xtiles="20" data-position="1,0,0.1" data-border-part="top"></div>

    <div id="bathroom-floor-border-3" data-ytiles="10" data-position="-7,-2,0.1" data-border-part="left"></div>

    <div id="bathroom-floor-border-4" data-ytiles="10" data-position="11,-2,0.1" data-border-part="right"></div>
    

    <div id="bathroom-floor-border-5" data-position="11,0,0.15" data-border-part="corner-tr"></div>

    <div id="bathroom-floor-border-6" data-position="-7,-6,0.15" data-border-part="corner-bl"></div>




    <!-- 12x12 -->
    <canvas id="bathroom-floor-container-2" class="floor-container bg-container three-bg-container big"
        data-part="floor-big" 
        data-xRepeat="15" data-yRepeat="9" 
        data-width="260" data-height="100"
        data-position="3, -41, 3.5" 
        data-rotation="-1.6, 0, 0" 
        data-zcamera="70"
        data-borders="bathroom-floor-border-2, bathroom-floor-border-7, bathroom-floor-border-8, bathroom-floor-border-9, bathroom-floor-border-10, bathroom-floor-border-11"
        
    ></canvas>

    <div id="bathroom-floor-border-7" data-xtiles="20" data-position="0,-5,0.1" data-border-part="bottom"></div>

    <div id="bathroom-floor-border-8" data-ytiles="10" data-position="-5,-2,0.1" data-border-part="left"></div>

    <div id="bathroom-floor-border-9" data-ytiles="10" data-position="8,-2,0.1" data-border-part="right"></div>

    <div id="bathroom-floor-border-10" data-position="8,0,0.15" data-border-part="corner-tr"></div>

    <div id="bathroom-floor-border-11" data-position="-5,-5,0.15" data-border-part="corner-bl"></div>
</div>