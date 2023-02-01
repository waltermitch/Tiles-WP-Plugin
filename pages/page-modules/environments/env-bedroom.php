<div id="bedroom-simulator" class="env-container" data-env="bedroom">
    <!-- Hovers -->
    <div id="bedroom-floor-hover" class="floor floor-hover hover" data-part="floor"></div>

    <!-- Image -->
    <div class="env-image-container" class="container">
        <img src="<?php echo plugins_url('tile-simulator/assets/images/env/bedroom_old2.png') ?>" />
    </div>

    <!-- Parts -->

    <!-- <div id="bedroom-floor-container" class="floor floor-container bg-container">
					<div class="background"></div>
				</div>
				-->

    <!-- NEW BEDROOM -->
    <canvas id="bedroom-floor-container-1" class="floor-container bg-container three-bg-container small"
        data-part="floor-small" 
        data-xRepeat="40" data-yRepeat="15" 
        data-width="500" data-height="150"
        data-position="-2,-40,-1.5" 
        data-rotation="-1.61,0,0" 
        data-zcamera="70"
        data-borders="bedroom-border-1,bedroom-border-2"
    ></canvas>

    <div id="bedroom-border-1" data-xtiles="40" data-position="0,5,0.1" data-border-part="top"></div>

    <div id="bedroom-border-2" data-ytiles="15" data-position="-7,0,0.1" data-border-part="left"></div>

    <!-- 12x12 -->
    <canvas id="bedroom-floor-container-2" class="floor-container bg-container three-bg-container big"
        data-part="floor-big" 
        data-xRepeat="25" data-yRepeat="12" 
        data-width="500" data-height="150"
        data-position="8,-40,0" 
        data-rotation="-1.61,0,0" 
        data-zcamera="70"
        data-borders="bedroom-border-3,bedroom-border-4"
    ></canvas>

    <div id="bedroom-border-3" data-xtiles="25" data-position="0,4,0.1" data-border-part="top"></div>

    <div id="bedroom-border-4" data-ytiles="12" data-position="-5,0,0.1" data-border-part="left"></div>

</div>