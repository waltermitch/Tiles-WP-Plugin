<?php

include 'consts.php';
include 'tile_shape_selection.php';

?>

<div id="tile-shapes" style="display: none;">

    <div id="tile-shape-editor">

    </div>

    <div id="tile-shapes-selection">
        <?php for ($i = 0; $i < sizeof($TILE_SIMULATOR_SHAPES); $i++): ?>

        <?php tile_shape_selection($TILE_SIMULATOR_SHAPES[$i])?>

        <?php endfor;?>
    </div>


</div>