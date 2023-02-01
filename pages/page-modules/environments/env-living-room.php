<div id="living-room-simulator" class="env-container" data-env="living-room">
    <!-- Hovers -->
    <div id="living-room-wall-hover1" class="wall wall-hover hover" data-part="wall"></div>

    <!-- Image -->
    <div class="env-image-container" class="container">
        <img src="<?php echo plugins_url('tile-simulator/assets/images/env/living_room.png') ?>">
    </div>

    <!-- Parts -->
    <!-- <div id="living-room-wall-container1" class="wall wall-container bg-container">
					<div class="background"></div>
				</div> -->

    <canvas id="living-room-wall-container-1" class="wall-container bg-container three-bg-container small"
        data-part="wall-small" 
        data-xRepeat="20" data-yRepeat="10" 
        data-width="500" data-height="390"
        data-position="0,10,-3.5" 
        data-zcamera="70"
        data-borders="living-room-border-1,living-room-border-2,living-room-border-3,living-room-border-4,living-room-border-5,living-room-border-6,living-room-border-7,living-room-border-8"
    ></canvas>

    <div id="living-room-border-1" data-xtiles="25" data-position="0,-4,0.1" data-border-part="bottom"></div>
    <div id="living-room-border-2" data-xtiles="25" data-position="0,4,0.1" data-border-part="top"></div>
    <div id="living-room-border-3" data-ytiles="25" data-position="-6,0,0.1" data-border-part="left"></div>
    <div id="living-room-border-4" data-ytiles="25" data-position="7,0,0.1" data-border-part="right"></div>

    <div id="living-room-border-5" data-position="-6,4,0.1" data-border-part="corner-tl"></div>
    <div id="living-room-border-6" data-position="7,4,0.1" data-border-part="corner-tr"></div>
    <div id="living-room-border-7" data-position="-6,-4,0.1" data-border-part="corner-bl"></div>
    <div id="living-room-border-8" data-position="7,-4,0.1" data-border-part="corner-br"></div>





    <!-- 12 x 12 -->
    <canvas id="living-room-wall-container-2" class="wall-container bg-container three-bg-container big"
        data-part="wall-big" 
        data-xRepeat="20" data-yRepeat="10" 
        data-width="600" data-height="450"
        data-position="0,0,-3" 
        data-zcamera="70"
        data-borders="living-room-border-9,living-room-border-10,living-room-border-11,living-room-border-12,living-room-border-13,living-room-border-14,living-room-border-15,living-room-border-16"
    ></canvas>

    <div id="living-room-border-9" data-xtiles="20" data-position="0.5,-3,0.1" data-border-part="bottom"></div>
    <div id="living-room-border-10" data-xtiles="25" data-position="0,4,0.1" data-border-part="top"></div>
    <div id="living-room-border-11" data-ytiles="25" data-position="-5,0,0.1" data-border-part="left"></div>
    <div id="living-room-border-12" data-ytiles="25" data-position="6,0,0.1" data-border-part="right"></div>

    <div id="living-room-border-13" data-position="-5,4,0.1" data-border-part="corner-tl"></div>
    <div id="living-room-border-14" data-position="6,4,0.1" data-border-part="corner-tr"></div>
    <div id="living-room-border-15" data-position="-5,-3,0.1" data-border-part="corner-bl"></div>
    <div id="living-room-border-16" data-position="6,-3,0.1" data-border-part="corner-br"></div>




</div>