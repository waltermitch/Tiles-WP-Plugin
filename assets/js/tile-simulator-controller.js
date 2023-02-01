
window.selected = undefined;

// function applyCanvasBackground( tileImg )
window.applyCanvasBackground = undefined;

window.selectedMask = undefined;


window.actionStack = [];
window.iAction = -1;

/*{
	tile:
	nMask:
	colors: []
	env:
	envContainer
}*/


function getScaleFactor( ){
	if( screen.width < 700 )
		return 0.99;

	else if( screen.width < 900 )
		return 0.9;

	return 0.7;
}


function getFontString( font ){
	return font.fontStyle + ' ' + font.fontSize + 'px ' + font.fontFamily;
}


// Draw Functions

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function drawRoundRect( ctx, x, y, width, height, radius, fill, stroke ){
	if( typeof radius === 'undefined' ){
		radius = 5;
	}
	if( typeof radius === 'number' ){
		radius = { tl: radius, tr: radius, br: radius, bl: radius };
	}else{
		var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
		for( var side in defaultRadius ){
	  		radius[side] = radius[side] || defaultRadius[side];
	    }
	}
	ctx.beginPath(  );
	ctx.moveTo( x + radius.tl, y );
	ctx.lineTo( x + width - radius.tr, y );
	ctx.quadraticCurveTo( x + width, y, x + width, y + radius.tr );
	ctx.lineTo( x + width, y + height - radius.br );
	ctx.quadraticCurveTo( x + width, y + height, x + width - radius.br, y + height );
	ctx.lineTo( x + radius.bl, y + height );
	ctx.quadraticCurveTo( x, y + height, x, y + height - radius.bl );
	ctx.lineTo( x, y + radius.tl );
	ctx.quadraticCurveTo( x, y, x + radius.tl, y );
	ctx.closePath(  );

	if( !fill )
		fill = '#ff0000';


	if( fill !== undefined ){
		ctx.fillStyle = fill;
		ctx.fill(  );
	}
	if( stroke !== undefined ){
		ctx.strokeStyle = stroke;
		ctx.lineWidth = 0.5;
		ctx.stroke(  );
	}

	ctx.beginPath(  );
	ctx.closePath(  );
}

function drawWrappedText( context, text, x, y, maxWidth, maxLines, lineHeight, textAlign ){
    // console.log( text );
    text += '';
    var words = text.split(' ');
    var line = '';

    if( textAlign != undefined )
    	context.textAlign = textAlign;
    else
    	context.textAlign = 'left';

    var currLine = 0;

    for(var n = 0; n < words.length && currLine < maxLines; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
        currLine++;
      }
      else {
        line = testLine;
      }
    }

    if( currLine < maxLines )
	    context.fillText(line, x, y);
}

function drawSaveCanvas(  ){
	var font = {
		machuca 			: {
			fontStyle		: '',
			fontSize		: 20,
			fontFamily		: 'Raleway'
		},
		address				: {
			fontStyle		: '',
			fontSize		: 13,
			fontFamily		: 'Raleway'
		},
		general 			: {
			fontStyle		: '',
			fontSize		: 15,
			fontFamily		: 'Raleway'
		},
		color 				: {
			fontStyle		: '',
			fontSize		: 12,
			fontFamily		: 'Raleway'
		},
		footer 				: {
			fontStyle 		: 'italic',
			fontSize 		: 13,
			fontFamily 		: 'Raleway'
		}
	};
	var n = {
		padding 			: 25,
		logoSizeWidth		: 226,
		logoSizeHeight		: 100,
		tilePadding			: 5,
		tileGridSize		: 3,
		addressWidth		: 250,
		addressMargin		: {
			x 				: 15,
			y 				: 8
		},
		spacer				: {
			row				: 50,
			footer 			: 50,
			pattern 		: 35,
			description		: 90,
			tileTop 		: 20,
			colorRight 		: 5,
			column 			: [
							  15,
							  25
			]
		},
		colWidth			: [
							  300,
							  340,
							  340

		],
		maxLine 			: {
			pattern 		: 1,
			description 	: 3,
			copyright		: 4,
			date 			: 2,
			color 			: 1
		},
		colorBox 			: {
			size 			: 25,
			radius 			: 10,
			stroke 			: 'gray',
			space 			: 10,
			rows 			: 7,
			columns 		: 3
 		}
	}

	var ctx = saveCanvas.getContext( '2d' );

	var selectedTile = jQuery( '.tile-image-container.selected' );
	var selectedCategory = jQuery( '.tile-category.open' );

	var hasBorders = isBorderActive(  );
	var selectedBorder;

	// Reset
	ctx.clearRect( 0, 0, saveCanvas.width, saveCanvas.height );


	if( hasBorders )
		$selectedBorder = jQuery( '.tile-image-container.border-selected' );

	// ROW 0
	// Logo

	var $logo = jQuery( '#logo' );
	if( $logo.length == 0 ){
		$logo = jQuery( '#simulator-logo' );
	}

	ctx.drawImage( 
		$logo[0],
		n.padding,
		n.padding,
		n.logoSizeWidth,
		n.logoSizeHeight 
	);
	


	// Lili Tile
	var addressX = n.padding + n.logoSizeWidth + n.addressMargin.x;
	var addressY = n.padding + font.machuca.fontSize + n.addressMargin.y

	ctx.font = getFontString( font.machuca );
	ctx.fillStyle = 'black';
	ctx.textAlign = 'left';
	ctx.fillText( 
		'Lili Cement Tile Line', 
		addressX, 
		addressY 
	);


	// 1st Address
	// Address Line 1
	addressY += font.address.fontSize;
	ctx.font = getFontString( font.address );
	ctx.fillText( 
		'1325 Exchange Drive',
		addressX,
		addressY
	);


	// Address Line 2
	addressY += font.address.fontSize;
	ctx.fillText( 
		'Richardson, TX 75081',
		addressX,
		addressY
	);


	// Address Line 3
	addressY += font.address.fontSize;
	ctx.fillText( 
		'Tel: 214-352-0000',
		addressX,
		addressY
	);


	// Address Line 4
	addressY += font.address.fontSize;
	ctx.fillText( 
		'Fax: 214-352-0002',
		addressX,
		addressY
	);


	// 2nd Address
	addressX += n.addressWidth;
	addressY = n.padding + font.machuca.fontSize + n.addressMargin.y

	// Address Line 1
	addressY += font.address.fontSize;
	ctx.font = getFontString( font.address );
	ctx.fillText( 
		'8 East Stow Road',
		addressX,
		addressY
	);


	// Address Line 2
	addressY += font.address.fontSize;
	ctx.fillText( 
		'Suite 2000',
		addressX,
		addressY
	);


	// Address Line 3
	addressY += font.address.fontSize;
	ctx.fillText( 
		'Marlton, NJ 08053',
		addressX,
		addressY
	);


	// Address Line 4
	addressY += font.address.fontSize;
	ctx.fillText( 
		'Phone: 856-988-1802',
		addressX,
		addressY
	);

	// Address Line 5
	addressY += font.address.fontSize;
	ctx.fillText( 
		'Fax: 856-988-1803',
		addressX,
		addressY
	);



	// ROW 1
	var rowStart = n.padding + n.logoSizeHeight + n.spacer.row;

	// COLUMN 1
	var colX = n.padding;
	var colY = rowStart + font.general.fontSize;


	// Pattern
	ctx.font = getFontString( font.general );
	ctx.fillText( 
		'Pattern:',
		colX,
		colY
	);


	// Pattern Value
	colY += font.general.fontSize;
	drawWrappedText( 
		ctx, 
		'(' + selectedTile.data( 'category' ) + ') ' + selectedTile.data( 'tile-name' ),
		colX,
		colY,
		n.colWidth[0],
		n.maxLine.pattern,
		font.general.fontSize
	);

	// Border
	if( hasBorders ){
		colY += ( n.maxLine.pattern * font.general.fontSize );

		drawWrappedText( 
			ctx, 
			'(' + $selectedBorder.data( 'category' ) + ') ' + $selectedBorder.data( 'tile-name' ),
			colX,
			colY,
			n.colWidth[0],
			n.maxLine.pattern,
			font.general.fontSize
		); 
	}


	// Colors
	colY += ( n.maxLine.pattern * font.general.fontSize ) + n.spacer.pattern;
	ctx.fillText(
		'Colors: ',
		colX,
		colY
	);


	// Color Boxes
	ctx.font = getFontString( font.color );

	colY += font.color.fontSize;
	jQuery( '#color-used-container .color-used-box' ).each( function( i ){

		

	} )

	var iColor = 0;
	var $colorUsedBoxes = jQuery( '#color-used-container .color-used-box' );
	var d = 0;
	var tempX = colX;
	var colorX = tempX + n.colorBox.size + n.spacer.colorRight;

	var colorFinished = [];
	
	for( var i = 0, j = 0; iColor < Math.min( $colorUsedBoxes.length, n.colorBox.rows * n.colorBox.columns ); i++, iColor++ ){

		var $colorBox = jQuery( $colorUsedBoxes[iColor] );

		if( !$colorBox.data( 'color' ) && $colorBox.data( 'color-image' ).naturalWidth == 0 ){
			i--;

		}else if( colorFinished.indexOf( $colorBox.data( 'color-id' ) ) == -1 ){

			if( j % n.colorBox.rows == 0 && j != 0 ){
				d -= n.colorBox.rows;
				tempX += n.colWidth[0] / n.colorBox.columns;
				colorX += n.colWidth[0] / n.colorBox.columns;
			}

			var tempI = j + d;


			tempY = colY + ( tempI * ( n.colorBox.size + n.colorBox.space ) );
			
			drawRoundRect(
				ctx,
				tempX ,
				tempY,
				n.colorBox.size,
				n.colorBox.size,
				n.colorBox.radius,
				$colorBox.data( 'color' ),
				n.colorBox.stroke
			);

			// Color Image
			if( $colorBox.data( 'color-image' ).naturalWidth != 0 ){
				ctx.globalCompositeOperation = 'source-atop';
				ctx.drawImage( $colorBox.data( 'color-image' ), tempX, tempY, n.colorBox.size, n.colorBox.size );
				ctx.globalCompositeOperation = 'source-over';

			}

			
			



			// Color Text - ID
			tempY += font.color.fontSize;

			ctx.fillStyle = 'black'

			// drawWrappedText( 
			// 	ctx, 
			// 	$colorBox.data( 'color-id' ) + '',
			// 	tempX,
			// 	tempY,
			// 	( n.colWidth[0] / 2 ) - n.spacer.colorRight,
			// 	n.maxLine.color,
			// 	font.color.fontSize
			// );



			// Color Text - Title
			tempY += font.color.fontSize;

			ctx.fillStyle = $colorBox.data( 'color' );


			drawWrappedText( 
				ctx, 
				$colorBox.data( 'color-name' ),
				colorX,
				tempY,
				( n.colWidth[0] / 2 ) - n.spacer.colorRight,
				n.maxLine.color,
				font.color.fontSize
			);



			// Color Text - Hex
			tempY += font.color.fontSize;

			// drawWrappedText( 
			// 	ctx, 
			// 	$colorBox.data( 'color' ),
			// 	tempX,
			// 	tempY,
			// 	( n.colWidth[0] / 2 ) - n.spacer.colorRight,
			// 	n.maxLine.color,
			// 	font.color.fontSize
			// );

			colorFinished.push( $colorBox.data( 'color-id' ) );
			j++;
		}

	}


	// COLUMN 2
	colX += n.colWidth[0] + n.spacer.column[0];
	colY = rowStart + n.spacer.tileTop;

	// Tile Image
	var tileImgSingle = getTileCanvas(  );

	var $selectedTile = jQuery( '.tile-image-container.selected img' );
	var tileImg = new Image(  );

	var shape = $selectedTile.attr( 'data-shape' );
	console.log("drawCanvasImage",shape);
	if (shape == "square" || $selectedTile.attr ( 'data-hex-src' ) == undefined){
		tileImg.src = $selectedTile.attr( 'src' );
	}else if (shape == "hexagon" || shape == "ginkgo"){
		tileImg.src = $selectedTile.attr ( 'data-hex-src' );
	}else if (shape == "lola" || shape == "arabesque"){
		tileImg.src = $selectedTile.attr ( 'data-hex-src' );
	}else if (shape == "aqua" || shape == "busta"){
		tileImg.src = $selectedTile.attr ( 'data-hex-src' );
	}else if (shape == "triangle"){
		tileImg.src = $selectedTile.attr ( 'data-hex-src' );
	}else{
		tileImg.src = $selectedTile.attr( 'src' );
	}

	/* if( $selectedTile.attr( 'data-is-hex' ) == "1" ){

		tileImg.src = $selectedTile.attr( 'data-hex-src' );
		
	}else if ( $selectedTile.attr( 'data-is-ginkgo' ) == "1" ){

		tileImg.src = $selectedTile.attr( 'data-hex-src' );

	} */

	ctx.rect(
		colX,
		colY,
		n.colWidth[1],
		n.colWidth[1]
	)
	ctx.strokeStyle = 'black';
	ctx.fillStyle = 'white'
	ctx.lineWidth = 1.5;
	ctx.stroke(  );
	ctx.fill(  );


	ctx.drawImage(
		tileImgSingle,
		colX + n.tilePadding,
		colY + n.tilePadding,
		n.colWidth[1] - ( n.tilePadding * 2 ),
		n.colWidth[1] - ( n.tilePadding * 2 )
	);


	// COLUMN 3
	colX += n.colWidth[1] + n.spacer.column[1];
	// colY = rowStart + font.general.fontSize + n.spacer.tileTop;
	colY = rowStart + n.spacer.tileTop;

	tempX = colX;
	tempY = colY;


	// Description
	// ctx.fillStyle = 'black';
	// drawWrappedText(
	// 	ctx,
	// 	selectedTile.data( 'tile-desc' ),
	// 	colX,
	// 	colY,
	// 	n.colWidth[2],
	// 	n.maxLine.description,
	// 	font.general.fontSize
	// );


	// Copyright
	// colY += ( font.general.fontSize * n.maxLine.description ) + n.spacer.description;
	// drawWrappedText(
	// 	ctx,
	// 	'This pattern is copyrighted to Lili Cement Tile Line and licensed exclusively to Lili Cement Tile Line. Unauthorized reproduction of this pattern is prohibited.',
	// 	colX,
	// 	colY,
	// 	n.colWidth[2],
	// 	n.maxLine.copyright,
	// 	font.general.fontSize
	// );

	// Tile Image Grid
	var colXStart = colX;
	var gridSize = n.colWidth[2] / n.tileGridSize;

	for( var i = 0; i < n.tileGridSize; i++ ){
		for( var j = 0; j < n.tileGridSize; j++ ){
			ctx.drawImage(
				tileImg,
				colX,
				colY,
				gridSize,
				gridSize
			);

			colX += gridSize;
		}

		colX = colXStart;
		colY += gridSize;
	}

	// Border Grid
	if( hasBorders ){
		var $borderImg = jQuery( 'img', $selectedBorder );
		var borderWidth = $borderImg[0].naturalWidth;
		var borderHeight = $borderImg[0].naturalHeight;

		var halfBorderWidth = borderWidth / 2;
		var halfBorderHeight = borderHeight / 2;

		var quarterBorderWidth = halfBorderWidth / 2;
		var quarterBorderHeight = halfBorderHeight / 2;

		var halfGridSize = gridSize / 2;

		colX = tempX;
		colY = tempY;
		

		for( var i = 0; i < n.tileGridSize; i++ ){
			for( var j = 0; j < n.tileGridSize; j++ ){

				// Top Left Corner
				if( i == 0 && j == 0 ){
					ctx.drawImage(
						$borderImg[0],
						0, 0,
						halfBorderWidth, halfBorderHeight,
						colX, colY,
						gridSize, gridSize
					);

				// Top Right Corner
				}else if( i == 0 && j == n.tileGridSize - 1 ){
					ctx.drawImage(
						$borderImg[0],
						halfBorderWidth, 0,
						halfBorderWidth, halfBorderHeight,
						colX, colY,
						gridSize, gridSize
					);

				// Bottom Left Corner
				}else if( i == n.tileGridSize - 1 && j == 0 ){
					ctx.drawImage(
						$borderImg[0],
						0, halfBorderHeight,
						halfBorderWidth, halfBorderHeight,
						colX, colY,
						gridSize, gridSize
					);
				

				// Bottom Right Corner
				}else if( i == n.tileGridSize - 1 && j == n.tileGridSize - 1 ){
					ctx.drawImage(
						$borderImg[0],
						halfBorderWidth, halfBorderHeight,
						halfBorderWidth, halfBorderHeight,
						colX, colY,
						gridSize, gridSize
					);
				

				// Top
				}else if( i == 0 ){
					ctx.drawImage(
						$borderImg[0],
						quarterBorderWidth, 0,
						quarterBorderWidth, quarterBorderHeight,
						colX, colY,
						halfGridSize, halfGridSize
					);

					ctx.drawImage(
						$borderImg[0],
						quarterBorderWidth, 0,
						quarterBorderWidth, quarterBorderHeight,
						colX + halfGridSize, colY,
						halfGridSize, halfGridSize
					);

				// Left
				}else if( j == 0 ){
					ctx.drawImage(
						$borderImg[0],
						0, quarterBorderHeight,
						quarterBorderWidth, quarterBorderHeight,
						colX, colY,
						halfGridSize, halfGridSize
					);

					ctx.drawImage(
						$borderImg[0],
						0, quarterBorderHeight,
						quarterBorderWidth, quarterBorderHeight,
						colX, colY + halfGridSize,
						halfGridSize, halfGridSize
					);

				// Right
				}else if( j == n.tileGridSize - 1 ){
					ctx.drawImage(
						$borderImg[0],
						3 * quarterBorderWidth, quarterBorderHeight,
						quarterBorderWidth, quarterBorderHeight,
						colX + halfGridSize, colY,
						halfGridSize, halfGridSize
					);

					ctx.drawImage(
						$borderImg[0],
						3 * quarterBorderWidth, quarterBorderHeight,
						quarterBorderWidth, quarterBorderHeight,
						colX + halfGridSize, colY + halfGridSize,
						halfGridSize, halfGridSize
					);

				// Bottom
				}else if( i == n.tileGridSize - 1 ){
					ctx.drawImage(
						$borderImg[0],
						quarterBorderWidth, 3 * quarterBorderHeight,
						quarterBorderWidth, quarterBorderHeight,
						colX, colY + halfGridSize,
						halfGridSize, halfGridSize
					);

					ctx.drawImage(
						$borderImg[0],
						quarterBorderWidth, 3 * quarterBorderHeight,
						quarterBorderWidth, quarterBorderHeight,
						colX + halfGridSize, colY + halfGridSize,
						halfGridSize, halfGridSize
					);

				}


				

				colX += gridSize;
			}

			colX = colXStart;
			colY += gridSize;
		}
	}
		


	// Date
	colY = rowStart + n.colWidth[1] + n.spacer.tileTop + n.spacer.footer + font.general.fontSize;

	ctx.fillStyle = 'black';

	drawWrappedText(
		ctx,
		( new Date(  ) ).toString(  ),
		colX + n.colWidth[2],
		colY,
		n.colWidth[2],
		n.maxLine.date,
		font.general.fontSize,
		'right'
	);



	// ROW 2
	colX = 500;
	colY = rowStart + n.colWidth[1] + n.spacer.tileTop + n.spacer.footer + font.footer.fontSize;

	// Footer
	ctx.font = getFontString( font.footer );
	ctx.textAlign = 'center';
	ctx.fillStyle = 'gray';
	ctx.fillText(
		'Copyright Lili Cement Tiles. All Rights Reserved',
		colX,
		colY
	);


	// Fill
	ctx.globalCompositeOperation = 'destination-over';
	ctx.fillStyle = 'white';
	ctx.fillRect( 0, 0, jQuery( saveCanvas ).width(  ), jQuery( saveCanvas ).height(  )  );

	ctx.globalCompositeOperation = 'source-over';


}


function drawColoredMask( canvas, maskImg, color, colorImg ){
	var $canvasContainers = jQuery( '#canvas-containers' );

	var height = canvas.width * ( maskImg.height / maskImg.width );

	canvas.height = height;
	// $canvasContainers.height( height );


	var ctx = canvas.getContext( '2d' );


	ctx.clearRect( 0, 0, canvas.width, canvas.height );

	ctx.drawImage( maskImg, 0, 0, canvas.width, canvas.height );
	if(canvas.height == 0) canvas.height = 300;
    
	drawColorOnlyMask( canvas, color, colorImg );
}

function drawHatches( canvas ){
	var ctx = canvas.getContext( '2d' );

	ctx.globalCompositeOperation = 'source-atop';

	ctx.drawImage( jQuery( '#tile-canvas-hatches' )[0], 0, 0, canvas.width, canvas.height );

	ctx.globalCompositeOperation = 'source-over';

}

function drawColorOnlyMask( canvas, color, img ){
	var ctx = canvas.getContext( '2d' );


	ctx.globalCompositeOperation = 'source-in';

	if( color ){
		ctx.fillStyle = color;
		ctx.fillRect( 0, 0, canvas.width, canvas.height );

	}else if( img.naturalWidth ){
		ctx.drawImage( img, 0, 0, canvas.width, canvas.height );
	}

	ctx.globalCompositeOperation = 'source-over';

}


function drawBackground( container, color, colorImage ){
	var canvas = jQuery( '.tile-editor-background', container )[0];
	var ctx = canvas.getContext( '2d' );

	ctx.clearRect( 0, 0, canvas.width, canvas.height );

	if( color ){
		ctx.fillStyle = color;
		ctx.fillRect( 0, 0, canvas.width, canvas.height );

	}else if( colorImage.naturalWidth != 0 ){
		ctx.drawImage( colorImage, 0, 0, canvas.width, canvas.height );
	}
	
}

function drawGrout( container, groutShape, color, weight ){
	var canvas = jQuery( '.tile-editor-grout', container )[0];
	var ctx = canvas.getContext( '2d' );

	drawGroutShapes[groutShape]( canvas, color, weight );
	
}


// Quadrant Functions
function getQuadrantCoordinates( canvas, quadrant ){
	var qWidth = canvas.width / 2;
	var qHeight = canvas.height / 2;

	var x = 0;
	var y = 0;

	if( quadrant % 2 == 0 )
		x += qWidth;
	if( quadrant > 2 )
		y += qHeight;

	return {
		x: x,
		y: y
	}
}

function getQuadrantImage( canvas, quadrant, rotation ){
	var qCanvas = jQuery( '<canvas></canvas>' )[0];

	qCanvas.width = canvas.width / 2;
	qCanvas.height = canvas.height / 2;

	pos = getQuadrantCoordinates( canvas, quadrant );

	qCtx = qCanvas.getContext( '2d' );

	qCtx.save(  );
	qCtx.translate( qCanvas.width / 2, qCanvas.height / 2 );

	qCtx.rotate( rotation * Math.PI / 180 );

	qCtx.translate( -qCanvas.width / 2, -qCanvas.height / 2 );



	qCtx.drawImage( canvas, pos.x, pos.y, qCanvas.width, qCanvas.height, 0, 0, qCanvas.width, qCanvas.height );

	qCtx.restore(  );

	return qCanvas;


}


function drawToQuadrant( canvas, image, quadrant ){
	var ctx = canvas.getContext( '2d' );

	var pos = getQuadrantCoordinates( canvas, quadrant );

	ctx.clearRect( pos.x, pos.y, image.width, image.height );

	ctx.drawImage( image, 0, 0, image.width, image.height, pos.x, pos.y, image.width, image.height );
}

function drawRotatedQuadrant( canvas, quadrant, rotation ){
	// Get quadrant image
	var qCanvas = getQuadrantImage( canvas, quadrant, rotation );

	drawToQuadrant( canvas, qCanvas, quadrant );
}


function generateUsedColorBox( color_id, color, colorName, colorImage, dataHover, customClass ){
	var box = jQuery( '<div></div>' );

	box.addClass( 'color-used-box' );
	box.addClass( customClass );

	box.attr( 'data-color-used-hover', dataHover );
	box.data( 'color-used-hover', dataHover );

	changeUsedColorBox( box, color_id, color, colorName, colorImage );

	return box;
}

function changeUsedColorBox( box, color_id, color, colorName, colorImage ){
	box.attr( 'data-color-id', color_id );
	box.data( 'color-id', color_id );

	box.attr( 'data-color', color );
	box.data( 'color', color );

	box.attr( 'data-color-name', colorName );
	box.data( 'color-name', colorName )

	box.data( 'color-image', colorImage );

	box.css( {
		background: ( color ) ? color : 'url(' + colorImage.src + ')'
	} )
}



// Functions
function isBorderActive(  ){
	var $simulatorContainer = jQuery( '.simulator-container' );

	return $simulatorContainer.hasClass( 'border-active' ) && $simulatorContainer.attr( 'data-tile-shape' ) == 'square';
}

function getTileCanvas( parent ){
	if( parent == undefined )
		parent = '#tile-canvas-container'

	var $sourceCanvases = jQuery( 'canvas', parent );

	var canvas = jQuery( '<canvas></canvas>' )[0];
	canvas.width = 256;
	canvas.height = 256 * ( $sourceCanvases.height(  ) / $sourceCanvases.width(  ) );

	var ctx = canvas.getContext( '2d' );


	$sourceCanvases.each( function(  ){
		ctx.drawImage( this, 0, 0, canvas.width, canvas.height );
	} );


	return canvas;
}

function getTileBorderPart( canvas, borderPart ){
	var widthQuarter = canvas.width * 0.25;
	var heightQuarter = canvas.height * 0.25;

	var borderCanvas = jQuery( '<canvas></canvas>' )[0];
	borderCanvas.width = widthQuarter;
	borderCanvas.height = heightQuarter;

	var borderCtx = borderCanvas.getContext( '2d' );

	

	if( borderPart == 'top' ){

		borderCtx.drawImage( 
			canvas,  
			widthQuarter, 0,
			widthQuarter, heightQuarter,
			0, 0,
			borderCanvas.width, borderCanvas.height
		);
		
	}else if( borderPart == 'bottom' ){
		borderCtx.drawImage( 
			canvas,  
			widthQuarter, 3 * heightQuarter,
			widthQuarter, heightQuarter,
			0, 0,
			borderCanvas.width, borderCanvas.height
		);
	}else if( borderPart == 'left' ){
		borderCtx.drawImage( 
			canvas,  
			0, heightQuarter,
			widthQuarter, heightQuarter,
			0, 0,
			borderCanvas.width, borderCanvas.height
		);
	}else if( borderPart == 'right' ){
		borderCtx.drawImage( 
			canvas,  
			3 * widthQuarter, heightQuarter,
			widthQuarter, heightQuarter,
			0, 0,
			borderCanvas.width, borderCanvas.height
		);
	}else if( borderPart == 'corner-tl' ){
		borderCtx.drawImage( 
			canvas,  
			0, 0,
			widthQuarter, heightQuarter,
			0, 0,
			borderCanvas.width, borderCanvas.height
		);
	}else if( borderPart == 'corner-tr' ){
		borderCtx.drawImage( 
			canvas,  
			3 * widthQuarter, 0,
			widthQuarter, heightQuarter,
			0, 0,
			borderCanvas.width, borderCanvas.height
		);
	}else if( borderPart == 'corner-bl' ){
		borderCtx.drawImage( 
			canvas,  
			0, 3 * heightQuarter,
			widthQuarter, heightQuarter,
			0, 0,
			borderCanvas.width, borderCanvas.height
		);
	}else if( borderPart == 'corner-br' ){
		borderCtx.drawImage( 
			canvas,  
			3 * widthQuarter, 3 * heightQuarter,
			widthQuarter, heightQuarter,
			0, 0,
			borderCanvas.width, borderCanvas.height
		);
	}

	return borderCanvas;

}

function getPixelFromImageData( imgData, x, y ){

	return [
		imgData.data[4 * ( imgData.width*y + x )],
		imgData.data[4 * ( imgData.width*y + x ) + 1],
		imgData.data[4 * ( imgData.width*y + x ) + 2],
		imgData.data[4 * ( imgData.width*y + x ) + 3]
	]
}

function trimTileCanvas( canvas ){
	var ctx = canvas.getContext( '2d' );

	var top, bottom, left, right;
	var hasTop, hasBottom, hasLeft, hasRight;
	hasTop = hasBottom = hasLeft = hasRight = false;


	var imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );

	// Top
	for( top = 0; !hasTop; top++ ){
		for( var i=0; i < canvas.width ; i++ ){
			if( getPixelFromImageData( imgData, i, top )[3] != 0 ){
				hasTop = true;
				break;
			}
		}

	}

	// Bottom
	for( bottom = canvas.height - 1; !hasBottom; bottom-- ){
		for( var i=0; i < canvas.width ; i++ ){
			if( getPixelFromImageData( imgData, i, bottom )[3] != 0 ){
				hasBottom = true;
				break;
			}
		}

	}

	// Left
	for( left = 0; !hasLeft; left++ ){
		for( var i=0; i < canvas.height ; i++ ){
			if( getPixelFromImageData( imgData, left, i )[3] != 0 ){
				hasLeft = true;
				break;
			}
		}

	}


	// Right
	for( right = canvas.width - 1; !hasRight; right-- ){
		for( var i=0; i < canvas.height ; i++ ){
			if( getPixelFromImageData( imgData, right, i )[3] != 0 ){
				hasRight = true;
				break;
			}
		}

	}


	var hex = ctx.getImageData( left, top, right - left, bottom - top );



	var trimmed = jQuery( '<canvas></canvas>' )[0];
	trimmed.width = hex.width;
	trimmed.height = hex.height;

	trimmed.getContext( '2d' ).putImageData( hex, 0, 0 );

	return trimmed;
}


function getHexOrientation( imgData ){
	var gapX;
	for( var gapX=0; getPixelFromImageData( imgData, gapX, 0 )[3] == 0 && gapX < imgData.width ; gapX++ );

	var spaceX;
	for( var spaceX = gapX; getPixelFromImageData( imgData, spaceX, 0 )[3] != 0 && spaceX < imgData.width ; spaceX++ );

	spaceX -= gapX;


	var gapY;
	for( var gapY=0; getPixelFromImageData( imgData, 0, gapY )[3] == 0 && gapY < imgData.height; gapY++ );

	var spaceY;
	for( var spaceY = gapY; getPixelFromImageData( imgData, 0, spaceY )[3] != 0 && spaceY < imgData.height; spaceY++ );

	spaceY -= gapY;


	if( spaceX > spaceY ){
		return "horizontal";
	}

	return "vertical";

}

function rotateCanvas( canvas, imgData ){
	var ctx = canvas.getContext( '2d' );
	if( imgData == undefined ){
		imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
	}


	var img = jQuery( '<canvas></canvas>' )[0];
	img.width = canvas.width;
	img.height = canvas.height;


	var imgCtx = img.getContext( '2d' );
	imgCtx.putImageData( imgData, 0, 0 );


	canvas.width = img.height;
	canvas.height = img.width;

	ctx.save(  );
	ctx.translate( canvas.width/2, canvas.height/2 );
	ctx.rotate( Math.PI / 2 );

	ctx.drawImage( img, -canvas.height/2, -canvas.width/2 );

	ctx.restore(  );

	return canvas;
}

function symmetryCanvas( canvas, imgData){
	var ctx = canvas.getContext( '2d' );
	if( imgData == undefined ){
		imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
	}


	var img = jQuery( '<canvas></canvas>' )[0];
	img.width = canvas.width;
	img.height = canvas.height;


	var imgCtx = img.getContext( '2d' );
	imgCtx.putImageData( imgData, 0, 0 );


	// canvas.width = img.height;
	// canvas.height = img.width;

	ctx.save(  );
	ctx.translate( canvas.width/2, canvas.height/2 );
	ctx.rotate( Math.PI );
	ctx.drawImage( img, -canvas.width/2, -canvas.height/2);

	ctx.restore(  );

	return canvas;
}

function hexToSquare( canvas ){
	// Canvas has to be trimmed
	canvas = trimTileCanvas( canvas );

	var ctx = canvas.getContext( '2d' );
	var imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );

	var orientation = getHexOrientation( imgData );

	// Rotate vertical hexagons
	if( orientation == 'vertical' ){
		canvas = rotateCanvas( canvas );
		imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
	}


	var gapLeft = 0;
	for( var gapLeft=0; getPixelFromImageData( imgData, gapLeft, 0 )[3] == 0; gapLeft++ );


	// Square canvas
	var squareCanvas =  jQuery( '<canvas></canvas>' )[0];
	var squareCtx = squareCanvas.getContext( '2d' );

	var groutSize = jQuery( '#grout-thickness-container .artise-button.selected' ).data( 'thickness' ) * 1.5;

	squareCanvas.width = ( 2 * ( canvas.width - gapLeft ) ) + groutSize * 2;
	squareCanvas.height = ( 2 * canvas.height ) + groutSize * 2;



	// Draw grout
	squareCtx.fillStyle = jQuery( '#grout-color-container .grout-color-box.selected' ).data( 'color' );

	squareCtx.fillRect( 0, 0, squareCanvas.width, squareCanvas.height );


	// Draw hex
	squareCtx.drawImage( canvas, -canvas.width + gapLeft, groutSize / 2 );
	squareCtx.drawImage( canvas, -canvas.width + gapLeft, canvas.height + ( groutSize * 1.5 ) );

	squareCtx.drawImage( canvas, groutSize, -canvas.height / 2 );
	squareCtx.drawImage( canvas, groutSize, canvas.height / 2 + groutSize );
	squareCtx.drawImage( canvas, groutSize, canvas.height + ( canvas.height / 2 ) + ( groutSize * 2 ) );

	squareCtx.drawImage( canvas, canvas.width - gapLeft + ( groutSize * 2 ), groutSize / 2 );
	squareCtx.drawImage( canvas, canvas.width - gapLeft + ( groutSize * 2 ), canvas.height + ( groutSize * 1.5 ) );


	// Rotate back vertical hexagons
	if( orientation == 'vertical' ){
		return rotateCanvas( squareCanvas );
	}

	return squareCanvas;

}

function scaleToSquare( canvas ){
	// Canvas has to be trimmed
	canvas = trimTileCanvas( canvas );

	var ctx = canvas.getContext( '2d' );
	var imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );

	// var orientation = getHexOrientation( imgData );

	// // Rotate vertical hexagons
	// if( orientation == 'vertical' ){
	// 	canvas = rotateCanvas( canvas );
	// 	imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
	// }


	var gapLeft = 0;
	var gapBottom = 0;
	var gapRight = 0;
	for( var gapLeft=0; getPixelFromImageData( imgData, gapLeft, 0 )[3] == 0 && gapLeft < canvas.width; gapLeft++ );
	for( var gapRight=canvas.width-1; getPixelFromImageData( imgData, gapRight, 0 )[3] == 0 && gapRight >= 0; gapRight-- );
	for( var gapBottom=canvas.height-1; getPixelFromImageData( imgData, 0, gapBottom )[3] == 0 && gapBottom >= 0; gapBottom-- );
	gapRight = canvas.width - gapRight;

	// Square canvas
	var squareCanvas =  jQuery( '<canvas></canvas>' )[0];
	var squareCtx = squareCanvas.getContext( '2d' );

	var groutSize = jQuery( '#grout-thickness-container .artise-button.selected' ).data( 'thickness' ) * 1.5;
	//groutSize = 0;

	squareCanvas.width = ( 2 * canvas.width - gapLeft - gapRight ) + groutSize;
	squareCanvas.height = ( 1 * canvas.height ) - 2 + groutSize;



	// Draw grout
	squareCtx.fillStyle = jQuery( '#grout-color-container .grout-color-box.selected' ).data( 'color' );

	squareCtx.fillRect( 0, 0, squareCanvas.width, squareCanvas.height );


	// Draw hex
	squareCtx.drawImage( canvas, -canvas.width + gapLeft-groutSize/2, 0 );
	//squareCtx.drawImage( canvas, -canvas.width + gapLeft, canvas.height + ( groutSize * 1.5 ) );

	squareCtx.drawImage( canvas, groutSize/2, - gapBottom + groutSize);
	squareCtx.drawImage( canvas, groutSize/2, canvas.height - gapBottom + groutSize * 1.5);
	//squareCtx.drawImage( canvas, groutSize, canvas.height + ( canvas.height / 2 ) + ( groutSize * 2 ) );

	squareCtx.drawImage( canvas, canvas.width - gapRight + groutSize, 0);
	//squareCtx.drawImage( canvas, canvas.width - gapLeft + ( groutSize * 2 ), canvas.height + ( groutSize * 1.5 ) );


	// Rotate back vertical hexagons
	// if( orientation == 'vertical' ){
	// 	return rotateCanvas( squareCanvas );
	// }

	return squareCanvas;
}

function ginkgoToSquare( canvas ){

	// Get rect from Ginkgo
	canvas = scaleToSquare( canvas );

	// Square canvas
	var squareCanvas =  jQuery( '<canvas></canvas>' )[0];
	var squareCtx = squareCanvas.getContext( '2d' );

	var nx = 6;
	var ny = 7;

	squareCanvas.width = nx * canvas.width;
	squareCanvas.height = ny * canvas.height;

	// Draw 2 * 3 rectangles
	for (var i = 0; i < nx; i++)
		for (var j = 0; j < ny; j++)
			squareCtx.drawImage( canvas, i * canvas.width, j * canvas.height );		

	return squareCanvas;
}

function triangleToSquare( canvas ){
	// Canvas has to be trimmed
	canvas = trimTileCanvas( canvas );

	var ctx = canvas.getContext( '2d' );
	var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
	

	// Symmetry canvas
	var vertCanvas =  jQuery( '<canvas></canvas>' )[0];
	var vertCtx = vertCanvas.getContext( '2d' );
	vertCanvas.width = canvas.width;
	vertCanvas.height = canvas.height;
	vertCtx.drawImage(canvas,0,0);
	vertCanvas = rotateCanvas( vertCanvas );
	vertCanvas = rotateCanvas( vertCanvas );
	vertCanvas = trimTileCanvas( vertCanvas );
	var vertimgData = vertCtx.getImageData( 0, 0, vertCanvas.width, vertCanvas.height );

	var gapBottomRight = 0;
	var gapBottomLeft = 0;
	var gapTopLeft = 0;
	var gapTopRight = 0;
	for( gapBottomRight = vertCanvas.width - 1; getPixelFromImageData( vertimgData, gapBottomRight, vertCanvas.height - 1 )[3] == 0
											&& gapBottomRight > 0; gapBottomRight--  );
	for( gapBottomLeft = 0; getPixelFromImageData( vertimgData, gapBottomLeft, vertCanvas.height - 1 )[3] == 0
											&& gapBottomLeft < vertCanvas.width; gapBottomLeft++  );		
	for( gapTopRight = canvas.width - 1; getPixelFromImageData( imgData, gapTopRight, 0 )[3] == 0
											&& gapTopRight > 0; gapTopRight--  );
	for( gapTopLeft = 0; getPixelFromImageData( imgData, gapTopLeft, 0)[3] == 0
											&& gapTopLeft < canvas.width; gapTopLeft++  );									

	// Square canvas
	var squareCanvas =  jQuery( '<canvas></canvas>' )[0];
	var squareCtx = squareCanvas.getContext( '2d' );

	var groutSize = jQuery( '#grout-thickness-container .artise-button.selected' ).data( 'thickness' ) * 1.5;

	squareCanvas.width = canvas.width + 2 * groutSize;
	squareCanvas.height = canvas.height + groutSize;

	// Draw grout
	squareCtx.fillStyle = jQuery( '#grout-color-container .grout-color-box.selected' ).data( 'color' );

	squareCtx.fillRect( 0, 0, squareCanvas.width, squareCanvas.height );


	// Draw hex
	squareCtx.drawImage( vertCanvas, -gapBottomRight + (gapBottomRight - gapBottomLeft)/2, 0);
	squareCtx.drawImage( canvas, groutSize, 0);
	squareCtx.drawImage( vertCanvas, gapTopRight + groutSize * 2 , 0);

	return squareCanvas;

}

function brickToSquare( canvas ){
	// Canvas has to be trimmed
	canvas = trimTileCanvas( canvas );

	var ctx = canvas.getContext( '2d' );
	var imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );


	// Square canvas
	var squareCanvas =  jQuery( '<canvas></canvas>' )[0];
	var squareCtx = squareCanvas.getContext( '2d' );

	var groutSize = jQuery( '#grout-thickness-container .artise-button.selected' ).data( 'thickness' ) * 1.5;

	squareCanvas.width = canvas.width + groutSize;
	squareCanvas.height = canvas.height * 2 + groutSize;

	// Draw grout
	squareCtx.fillStyle = jQuery( '#grout-color-container .grout-color-box.selected' ).data( 'color' );

	squareCtx.fillRect( 0, 0, squareCanvas.width, squareCanvas.height );

	// Draw hex
	squareCtx.drawImage( canvas, -canvas.width/2 - groutSize/2, groutSize/2);
	squareCtx.drawImage( canvas, 0, canvas.height + groutSize);
	squareCtx.drawImage( canvas, canvas.width/2 + groutSize/2, groutSize/2);

	return squareCanvas;

}

function aquaToSquare( canvas ){
	// Get rect from hexagon
	canvas = brickToSquare( canvas );

	// Square canvas
	var squareCanvas =  jQuery( '<canvas></canvas>' )[0];
	var squareCtx = squareCanvas.getContext( '2d' );

	squareCanvas.width = canvas.width;
	squareCanvas.height = 2 * canvas.height;

	// Draw 2 * 3 rectangles
	squareCtx.drawImage( canvas, 0, 0 );
	squareCtx.drawImage( canvas, 0, canvas.height );
	return squareCanvas;
}

function arabesqueToSquare( canvas ){
	// Canvas has to be trimmed
	canvas = trimTileCanvas( canvas );

	var ctx = canvas.getContext( '2d' );
	var imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );

	var orientation = getHexOrientation( imgData );

	// Rotate vertical hexagons
	// if( orientation == 'vertical' ){
	// 	canvas = rotateCanvas( canvas );
	// 	imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
	// }


	var gapLeft = 0;
	var gapRight = 0;
	for( var gapLeft=0; getPixelFromImageData( imgData, gapLeft, 0 )[3] == 0 && gapLeft < canvas.width; gapLeft++ );
	for( var gapRight=canvas.width-1; getPixelFromImageData( imgData, gapRight, 0)[3] == 0 && gapRight >= 0; gapRight-- );
	var spaceX = gapRight - gapLeft;

	// Square canvas
	var squareCanvas =  jQuery( '<canvas></canvas>' )[0];
	var squareCtx = squareCanvas.getContext( '2d' );

	var groutSize = jQuery( '#grout-thickness-container .artise-button.selected' ).data( 'thickness' ) * 1.5;

	squareCanvas.width = (canvas.width + spaceX ) + groutSize * 2;
	squareCanvas.height = canvas.height + groutSize * 2;

	// Draw grout
	squareCtx.fillStyle = jQuery( '#grout-color-container .grout-color-box.selected' ).data( 'color' );

	squareCtx.fillRect( 0, 0, squareCanvas.width, squareCanvas.height );


	// Draw hex
	squareCtx.drawImage( canvas, - gapRight, groutSize / 2 );
	//squareCtx.drawImage( canvas, -canvas.width + gapRight, canvas.height + ( groutSize * 1.5 ) );

	squareCtx.drawImage( canvas, groutSize, -canvas.height / 2 );
	squareCtx.drawImage( canvas, groutSize, canvas.height / 2 + groutSize );
	//squareCtx.drawImage( canvas, groutSize, canvas.height + ( canvas.height / 2 ) + ( groutSize * 2 ) );

	squareCtx.drawImage( canvas, gapRight+ ( groutSize * 2 ), groutSize / 2 );
	//squareCtx.drawImage( canvas, canvas.width - gapLeft + ( groutSize * 2 ), canvas.height + ( groutSize * 1.5 ) );


	// Rotate back vertical hexagons
	/* if( orientation == 'vertical' ){
		return rotateCanvas( squareCanvas );
	} */

	return rotateCanvas( squareCanvas );

}

function lolaToSquare( canvas ){

	// Get rect from hexagon
	canvas = hexToSquare( canvas );

	// Square canvas
	var squareCanvas =  jQuery( '<canvas></canvas>' )[0];
	var squareCtx = squareCanvas.getContext( '2d' );

	var nx = 2;
	var ny = 5;

	squareCanvas.width = nx * canvas.width;
	squareCanvas.height = ny * canvas.height;

	// Draw 2 * 3 rectangles
	for (var i = 0; i < nx; i++)
		for (var j = 0; j < ny; j++)
			squareCtx.drawImage( canvas, i * canvas.width, j * canvas.height );		

	return squareCanvas;
}

function applyTileToCanvas( iTile ){
    for( var i=0; i<masks[iTile].length; i++ ){
        if(!masks[iTile][i].loadedMask){
            masks[iTile][i].loadedMask = true;
            masks[iTile][i].src = loadMask(masks[iTile][i].src);
            masks[iTile][i].color_img = loadMask(masks[iTile][i].color_img);
        }
    }

	var mask = masks[iTile];
	var shape = tileData[iTile]['shape'];
	console.log(shape);

	var container = '#tile-canvas-container';
	if( shape == 'border' ){
		container = '#border-canvas-container';
	}


	// Step: Clear Canvases
	jQuery( 'canvas', container ).each( function(  ){
		var ctx = this.getContext( '2d' );

		ctx.clearRect( 0, 0, this.width, this.height );
	} );

	// Step: Draw Masks
	jQuery( '.tile-editor-pattern', container ).removeClass( 'used' );
	for( var i=0; i<mask.length; i++ ){
        
        
//        mask[i].color_img = loadMask(mask[i].color_img);
//        console.log(mask[i]);
		drawColoredMask( jQuery( '.tile-editor-pattern', container ).get( i ), mask[i].src, mask[i].color, mask[i].color_img );
		jQuery( jQuery( '.tile-editor-pattern', container )[i] ).attr( 'data-color-used-hover', shape + '-pattern-' + i );
		jQuery( jQuery( '.tile-editor-pattern', container )[i] ).data( 'color-used-hover', shape + '-pattern-' + i );
		jQuery( jQuery( '.tile-editor-pattern', container )[i] ).addClass( 'used' );

		// jQuery( '.tile-editor-pattern' )[i].width = jQuery( jQuery( '.tile-editor-pattern' )[i] ).width(  );
		// jQuery( '.tile-editor-pattern' )[i].height = jQuery( jQuery( '.tile-editor-pattern' )[i] ).height(  );
	}

	// Step: Draw Background
	var noBgClass = 'no-bg';
	if( shape == 'border' )
		noBgClass = 'border-no-bg';

	
	if( !backgrounds[iTile].color && backgrounds[iTile].color_img.naturalWidth == 0 ){
		jQuery( '#tile-color-editor-dialog' ).addClass( noBgClass );
	}else{
		drawBackground( container, backgrounds[iTile].color, backgrounds[iTile].color_img );

		jQuery( '#tile-color-editor-dialog' ).removeClass( noBgClass );
	}

	


	// Step: Draw Grout
	if( shape != 'border' ){
		var groutColor = jQuery( '#grout-color-container .grout-color-box.selected' ).data( 'color' );
		var groutThickness = jQuery( '#grout-thickness-container .artise-button.selected' ).data( 'thickness' );


		drawGrout( container, tileData[iTile]['grout_shape'], groutColor, groutThickness );
	}
	


	jQuery( '.tile-editor-background', container ).attr( 'data-color-used-hover', shape + '-background' );
	jQuery( '.tile-editor-background', container ).data( 'color-used-hover', shape + '-background' );



	// Update Grout
	applyColorEditor( false );

}

function applyBorders( tileImg, canvas ){
	if( canvas == undefined ){
		canvas = getTileCanvas( '#border-canvas-container' );
	}

	var $tileImg = jQuery( tileImg );
	var borderParts = [ 'top', 'bottom', 'left', 'right', 'corner-tl', 'corner-tr', 'corner-bl', 'corner-br' ];

	var returnVal = true;

	for( var i = 0; i < borderParts.length; i++ ){
		var border = getTileBorderPart( canvas, borderParts[i] );
		$tileImg.attr( 'data-border-' + borderParts[i] + '-src', border.toDataURL(  ) );

		returnVal = returnVal && window.applyCanvasBackground( $tileImg, borderParts[i] );
	}

	return returnVal;
}

function applyCanvas( tileImg ){
	var shape = tileImg.dataset.shape;
	var parent = '#tile-canvas-container';

	if( shape == 'border' ){
		parent = '#border-canvas-container';
	}

	var canvas = getTileCanvas( parent );

	// Convert different shapes to square
	if( shape == 'hexagon' ){
		var hexCanvas = hexToSquare( canvas );
		tileImg.dataset.hexSrc = hexCanvas.toDataURL(  );
	}else if ( shape == 'ginkgo' ){
		var ginkgoCanvas = ginkgoToSquare( canvas );
		tileImg.dataset.hexSrc = ginkgoCanvas.toDataURL( );
	}else if ( shape == 'triangle' ){
		var triCanvas = triangleToSquare( canvas );
		tileImg.dataset.hexSrc = triCanvas.toDataURL( );
	}else if ( shape == 'busta' ){
		var brickCanvas = brickToSquare( canvas );
		tileImg.dataset.hexSrc = brickCanvas.toDataURL( );
	}else if ( shape == 'aqua' ){
		var aquaCanvas = aquaToSquare( canvas );
		tileImg.dataset.hexSrc = aquaCanvas.toDataURL( );
	}else if ( shape == 'arabesque'){
		var arabCanvas = arabesqueToSquare( canvas );
		tileImg.dataset.hexSrc = arabCanvas.toDataURL(  );
	}else if ( shape == 'lola') {
		var lolaCanvas = lolaToSquare( canvas );
		tileImg.dataset.hexSrc = lolaCanvas.toDataURL(  );
	}

	// Height
	if( canvas.width != canvas.height ){

	}

	canvas = getTileCanvas( parent );
	tileImg.srcset = canvas.toDataURL(  );
	tileImg.src = canvas.toDataURL(  );


	if( shape != 'border' ){
		return window.applyCanvasBackground( jQuery( tileImg ) );
	}
	else{
		applyBorders( tileImg, canvas );

		return true;
	}
}

function applyValues( iTile ){
	// Background
	var backgroundColor = jQuery( '#color-used .color-used-box.background' );
	backgrounds[iTile] = {
		color 			: backgroundColor.data( 'color' ),
		color_id		: backgroundColor.data( 'color-id' ),
		color_name		: backgroundColor.data( 'color-name' ),
		color_img		: backgroundColor.data( 'color-image' )
	}

	jQuery( '#color-used .color-used-box.pattern' ).each( function( j ){
		var $this = jQuery( this );

		var patternLabel = $this.attr( 'data-color-used-hover' );
		var canvas = jQuery( '#tile-canvas-container canvas[data-color-used-hover="' + patternLabel + '"]' )[0]

		var image = new Image(  );
		image.src = canvas.toDataURL(  );

		masks[iTile][j].color = $this.data( 'color' );
		masks[iTile][j].color_id = $this.data( 'color-id' );
		masks[iTile][j].color_name = $this.data( 'color-name' );
		masks[iTile][j].color_img = $this.data( 'color-image' );
		masks[iTile][j].src = image;
		
		
	} )
}


function applyColorEditor( isApplyValues ){
	if( window.selected == undefined )
		return;

	if( isApplyValues == undefined )
		isApplyValues = true;

	var $tile = jQuery( '.tile-image-container.selected, .simulator-container[data-tile-shape="square"] .tile-image-container.border-selected' );

	$tile.each( function(  ){
		var tileImg = jQuery( 'img', jQuery( this ) )[0];

		applyCanvas( tileImg );
	} );


	if( isApplyValues )
		applyValues( $tile.data( 'itile' ) );

	
	


	// window.selectedMask = undefined;
}

function addActionState(  ){
	// Remove overlapping actions before pushing
	while( window.iAction < window.actionStack.length - 1 ){
		window.actionStack.pop(  );
	}

	var env = jQuery( '#environments' ).clone( true, true );
	// initThreeJs( env );

	window.actionStack.push( {
		tile 			: jQuery( '.tile-image-container.selected' ),
		colors 			: jQuery( '#color-used-container' ).clone(  ),
		env 	 		: env,
		selected 		: window.selected
	} );

	window.iAction = window.actionStack.length - 1; 

	// console.log( actionStack );
}

function goToSate( i ){
	var state = window.actionStack[i];
	var iTile = state.tile.data( 'itile' );

	// VIEW
	jQuery( '#environments' ).html( state.env.html(  ) );

	// SYNC ENV BUTTONS
	var activeEnv = jQuery( '.env-container.active', state.env ).data( 'env' );

	// jQuery( '.env-icons-image-container.active' ).removeClass( 'active' );
	if( activeEnv === 'tiled' ){
		jQuery( '#close-env-button' ).click(  );
	}else{
		jQuery( '#' + activeEnv + '-env-button' ).click(  );

	}


	window.selected = state.selected;

	// COLOR EDITOR
	jQuery( '.tile-image-container.selected' ).removeClass( 'selected' );
	jQuery( '.tile-image-container[data-itile='+ iTile +']' ).addClass( 'selected' );

	jQuery( '#color-used-container' ).html( state.colors.html(  ) );
	

	applyValues( iTile );
	applyTileToCanvas( iTile );
	applyCanvas( jQuery( 'img', state.tile )[0] );

	jQuery( '.color-used-box.selected' ).click(  );


}


function validateSubmit(  ){
	var $submitOverlay = jQuery( '#submit-details-overlay' );

	console.log( 'validating..' );

	var isValid = true;

	jQuery( 'input, textarea', $submitOverlay ).each( function(  ){
		if( !this.checkValidity(  ) ){
			jQuery( this ).addClass( 'invalid' );
			isValid = false;
		}else{
			jQuery( this ).removeClass( 'invalid' );
		}
	} )

	return isValid;
}


function validateRecaptcha( doSuccess ){
	var response = grecaptcha.getResponse(  );

	if( response === '' ){
		return false;
	}

	jQuery( '#submit-details-overlay' ).block( { message: null } );


	jQuery.ajax({
		url: ajaxurl,
		dataType: 'json',
		method: 'POST',
		data: {
			action: 'validate_google_recaptcha',
			response: response
		},
		success: function( response ){
			// console.log( 'validateRecaptcha', response );

			if( response.success ){
				doSuccess(  );			
			}
		},
		error: function(  ){
			jQuery( '#submit-details-overlay' ).unblock(  );

		}
	});


	grecaptcha.reset(  );

	return true;
	
}


// Ready Function
jQuery( function( $ ){
	// Global Variables
	var acceptedBorderShapes = ['square', undefined]

	var $simulatorContainer = $( '.simulator-container' );
	var $canvasCrosshair = $( '#canvas-crosshair-container', $simulatorContainer );


	var $tileCanvasContainer = $( '#tile-canvas-container' );
	var $borderCanvasContainer = $( '#border-canvas-container' );

	var $canvasContainer = $( '#canvas-containers', $simulatorContainer );
	var $tileBorderCanvasContainers = $tileCanvasContainer.add( $borderCanvasContainer );

	var crosshairOffset =  {
		x: 0,
		y: -50
	}

	window.saveCanvas = $( '#tile-save-canvas' )[0];

	$( '.tile-wrapper' ).scrollbar(  );


	// Border Events
	$( '#tile-borders-container .add-border' ).click( function(  ){
		alert( 'Select a border from the Border Collection to add' );

		$( '.tile-category[data-slug="' + BORDER_SLUG + '"] .title-container' ).click(  );
	} )

	$( '#tile-editor-wrapper' ).on( 'click', '.tile-image-container img[data-shape="border"]', function( e ){

		e.stopImmediatePropagation(  );

		var $tileImg = $( this );
		var $tileContainer = $tileImg.parents( '.tile-image-container' );
		var currentShape = $simulatorContainer.attr( 'data-tile-shape' );


		// Continue only if square is selected
		if( acceptedBorderShapes.indexOf( currentShape ) != -1 ){
			var iTile = $tileContainer.data( 'itile' );

            for( var i=0; i<masks[iTile].length; i++ ){
                if(!masks[iTile][i].loadedMask){
                    masks[iTile][i].loadedMask = true;
                    masks[iTile][i].src = loadMask(masks[iTile][i].src);
                    masks[iTile][i].color_img = loadMask(masks[iTile][i].color_img);
                }
            }
			var mask = masks[iTile];




			// Handle Classes
			$simulatorContainer.addClass( 'border-active' );

			$( '.tile-image-container' ).removeClass( 'border-selected' );
			$tileContainer.addClass( 'border-selected' );


			// Apply Masks
			applyTileToCanvas( iTile );
			applyBorders( $tileImg );


			// Add Color
			$( '#color-used-container .border-colors' ).html( '' );

			$( '#color-used-container .border-colors' ).append( generateUsedColorBox( 
				backgrounds[iTile].color_id, 
				backgrounds[iTile].color, 
				backgrounds[iTile].color_name, 
				backgrounds[iTile].color_img, 
				'border-background', 
				'border-background' 
			) );


			for( var i=0; i<mask.length; i++ ){
				$( '#color-used-container .border-colors' ).append( generateUsedColorBox( 
					mask[i].color_id, 
					mask[i].color, 
					mask[i].color_name,
					mask[i].color_img,
					'border-pattern-' + i, 
					'border-pattern' 
				) );
			}

		}

	} );

	$( '#tile-borders-container .remove-border' ).click( function(  ){
			$simulatorContainer.removeClass( 'border-active' );
			$( '.tile-image-container' ).removeClass( 'border-selected' );

			$( '#color-used-container .border-colors' ).html( '' );


			window.hideThreeCanvasBorders(  );

	} )




	// Tile Events

	$( '#tile-editor-hide-button' ).click( function(  ){
		$( this ).parents( '#tile-editor-wrapper' ).toggleClass( 'hidden' );
	} )


	$( 'li.tile-category .title-container').click( function(  ){
		// alert( 'clicked' );
		var parent = $( this ).parents( 'li.tile-category' );
		if( parent.hasClass( 'open' ) )
			return;

		$( '#tile-categories-container ul .arrow' ).css( {
			top: parent.position(  ).top + 'px'
		} );

		$( 'li.tile-category.open' ).removeClass( 'open' );
		parent.addClass( 'open' );
	} )



	$( '#tile-editor-wrapper' ).on( 'click', '.tile-image-container img', function( e ){
		if( window.applyCanvasBackground == undefined ){
			alert( 'Oops! Something went wrong. Please refresh browser and try again' );
			return;
		}

		console.log("Click a tile event:");
        var $tileImg = $( this );
		var iTile = $tileImg.parents( '.tile-image-container' ).data( 'itile' );
        /* nMask.innerLoaded = 0;
        var targetCount = 0; 
        for( var i=0; i<masks[iTile].length; i++ ){
            if(!masks[iTile][i].loadedMask){
                masks[iTile][i].loadedMask = true;
                masks[iTile][i].src = loadMask(masks[iTile][i].src, true);
                masks[iTile][i].color_img = loadMask(masks[iTile][i].color_img, true);
                targetCount += 2;
            }
        } */

		console.log(iTile, "-", masks[iTile].length);
		console.log(masks[iTile][0].src.complete,masks[iTile][0].color_img.complete);
        
        $("#spinner").show();
        applyMask($tileImg, iTile, this, 0);

	} );
    
    function applyMask($tileImg, iTile, self, targetCount){
        //console.log(nMask.innerLoaded, targetCount)
        /* if(nMask.innerLoaded < targetCount){
            window.setTimeout(function(){
                applyMask($tileImg, iTile, self, targetCount);
            }, 200);
            return;
        } */
        var loaded = true;
		// Check if the masks are loaded completely
		for( var i=0; i<masks[iTile].length; i++ ){
            if(!masks[iTile][i].loadedMask){
				nMask.innerLoaded = 0
                masks[iTile][i].loadedMask = true;
                masks[iTile][i].src = loadMask(masks[iTile][i].src, true);
                masks[iTile][i].color_img = loadMask(masks[iTile][i].color_img, true);
            }else{
				if (masks[iTile][i].src.complete == false || masks[iTile][i].color_img == false){
                    loaded = false;
				}else{
					masks[iTile][i].loadedMask = true;
				}
			}
        }
        if(!loaded){
            window.setTimeout(function(){
                applyMask($tileImg, iTile, self, targetCount);
            }, 200);
            return;
        }
        $("#spinner").hide();        

        var mask = masks[iTile];

        var shape = $tileImg.data( 'shape' );
		console.log(shape);


        // Add Shape Data
        $simulatorContainer.attr( 'data-tile-shape', shape );

        // Add Category Data
        $('.simulator-container').attr('data-tile-category', $tileImg.parents( '.tile-image-container' ).data( 'category-slug' ) );

		// Set image by shape style
		if ( shape == "square" ){
			$( '#tile-size-container' ).show();
		}else {
			var canvas = $( '<canvas width="256" height="256"></canvas>' )[0];
            var ctx = canvas.getContext( '2d' );
            ctx.drawImage( self, 0, 0, 256, 256 );
			//console.log("applyMask-", canvas.toDataURL());

			// Hex Img Src and Lola img src
			if( (shape == "hexagon" || $tileImg.attr( 'data-is-hex' ) === "1") ){
				$( '#tile-size-container' ).show();
				if ( $tileImg.attr( 'data-hex-src' ) == undefined ){
					var hexCanvas = hexToSquare( canvas );
					$tileImg[0].dataset.hexSrc = hexCanvas.toDataURL(  );
				}
			}
	
			// Ginkgo Img Src
			if( (shape == "ginkgo" || $tileImg.attr( 'data-is-ginkgo' ) === "1") ){
				$( '#tile-size-container' ).hide();
				if ( $tileImg.attr( 'data-hex-src' ) == undefined ){
					var ginkgoCanvas = ginkgoToSquare( canvas );
					$tileImg[0].dataset.hexSrc = ginkgoCanvas.toDataURL(  );
				}
			}

			//Triangle Img Src
			if( (shape == "triangle") ){
				$( '#tile-size-container' ).hide();
				if ( $tileImg.attr( 'data-hex-src' ) == undefined ){
					var triCanvas = triangleToSquare( canvas );
					$tileImg[0].dataset.hexSrc = triCanvas.toDataURL(  );
				}
			}

			// Busta and Aqua Img Src
			if( (shape == "busta") ){
				$( '#tile-size-container' ).hide();
				if ( $tileImg.attr( 'data-hex-src' ) == undefined ){
					var brickCanvas = brickToSquare( canvas );
					$tileImg[0].dataset.hexSrc = brickCanvas.toDataURL(  );
				}
			}

			// Aqua Img Src
			if( (shape == "aqua") ){
				$( '#tile-size-container' ).hide();
				if ( $tileImg.attr( 'data-hex-src' ) == undefined ){
					var aquaCanvas = aquaToSquare( canvas );
					$tileImg[0].dataset.hexSrc = aquaCanvas.toDataURL(  );
				}
			}

			// Arabesque Img Src
			if( (shape == "arabesque")){
				$( '#tile-size-container' ).hide();
				if ( $tileImg.attr( 'data-hex-src' ) == undefined ){
					var arabCanvas = arabesqueToSquare( canvas );
					$tileImg[0].dataset.hexSrc = arabCanvas.toDataURL(  );
				}
			}

			// Lola Img Src
			if( (shape == "lola") && $tileImg.attr( 'data-hex-src' ) == undefined ){
				$( '#tile-size-container' ).hide();
				if ( $tileImg.attr( 'data-hex-src' ) == undefined ){
					var lolaCanvas = lolaToSquare( canvas );
					$tileImg[0].dataset.hexSrc = lolaCanvas.toDataURL(  );
				}
			}
		}
        

        if( !window.applyCanvasBackground( $tileImg ) )
            return;

        console.log("ApplyCanvasBackground");

		try{
			window.selectedMask = undefined;


			$tileCanvasContainer.removeClass( 'empty' );

			$( '.tile-image-container.selected' ).removeClass( 'selected' );
			// $( self ).parents( '.tile-image-container' ).addClass( 'selected' );
			$( '.tile-image-container[data-itile='+iTile+']' ).addClass( 'selected' );

		}catch(e){
			console.log(e.message);
		}
        applyTileToCanvas( iTile );

		console.log("applyTileToCanvas");

        // Step: Used Colors
        $( '#color-used-container .tile-colors' ).html( '' );
		console.log(backgrounds[iTile]);
        $( '#color-used-container .tile-colors' ).append( generateUsedColorBox( 
            backgrounds[iTile].color_id, 
            backgrounds[iTile].color, 
            backgrounds[iTile].color_name, 
            backgrounds[iTile].color_img,
            shape + '-background', 
            'background' 
        ) );
		
		console.log(mask.length);
		
        for( var i=0; i<mask.length; i++ ){
            $( '#color-used-container .tile-colors' ).append( generateUsedColorBox( 
                mask[i].color_id, 
                mask[i].color, 
                mask[i].color_name,
                mask[i].color_img,
                shape + '-pattern-' + i, 
                'pattern' 
            ) );
        }

        addActionState(  );

    }



	// Canvas Events
	$tileBorderCanvasContainers.mousemove( function( e, f ){
		var $container = $( this );

		if( $container.hasClass( 'empty' ) )
			return;

		// Get Previous
		var $canvas = $( '.canvas-part.hovered' );
		var part = $canvas.data( 'color-used-hover' );
		var $box = $( '.color-used-box[data-color-used-hover='+part+']' );
		var color = $box.data( 'color' );
		var colorImage = $box.data( 'color-image' );


		// Reomve Previous Hatches
		if( $canvas.length )
			drawColorOnlyMask( $canvas[0], color, colorImage );

		// Remove Previous
		$( '.tile-editor-pattern' ).removeClass( 'hovered' );
		$( '.color-used-box' ).removeClass( 'hovered' )



		// Get Hovered
		if( !$( '#tile-color-editor-dialog' ).hasClass( 'no-bg' ) )
			$( '.tile-editor-background', $container ).addClass( 'hovered' );

		$( '.tile-editor-pattern.used', $container ).each( function(  ){
			var $this = $( this );

			var ctx = this.getContext( '2d' );


			// MousePosition
			var pos = ( f ) ? f : e;


			// Map Coordinates
			var width = $this.width(  );
			var height = $this.height(  );
			var mouseX = ( ( pos.pageX - $container.offset(  ).left ) / width ) * this.width;
			var mouseY = ( ( pos.pageY - $container.offset(  ).top ) / height ) * this.height;

			if( ctx.getImageData( mouseX, mouseY, this.width, this.height ).data[3] != 0 ){

				// Assign new
				$( '.tile-editor-background', $container ).removeClass( 'hovered' );
				$( this ).addClass( 'hovered' );

				
				return false;
			}
		} )



		// Update UI
		var $canvas = $( '.canvas-part.hovered' );
		var part = $canvas.data( 'color-used-hover' );
		var $box = $( '.color-used-box[data-color-used-hover='+part+']' );


		if( $canvas.length > 0 )
			drawHatches( $canvas[0] );


		$box.addClass( 'hovered' );
	} );
	

	$tileBorderCanvasContainers.mouseleave( function(  ){

		if( $( this ).hasClass('empty') )
			return;

		var canvas = $( '.canvas-part.hovered' );
		var part = canvas.data( 'color-used-hover' );
		var box = $( '.color-used-box[data-color-used-hover='+part+']' );
		var color = box.data( 'color' );
		var colorImage = box.data( 'color-image' );

		if( canvas[0] != undefined ){
			drawColorOnlyMask( canvas[0], color, colorImage );
			canvas.removeClass( 'hatched' );
		}
		
		// Remove Previous
		$( '.tile-editor-pattern' ).removeClass( 'hovered' );
		$( '.tile-editor-background' ).removeClass( 'hovered' );
		$( '.color-used-box' ).removeClass( 'hovered' )
	} )

	$tileBorderCanvasContainers.click( function(  ){

		if( $( this ).hasClass('empty') )
			return

		var canvas = $( '.canvas-part.hovered' );
		var part = canvas.data( 'color-used-hover' );
		var box = $( '.color-used-box[data-color-used-hover='+part+']' );
		var color = box.data( 'color' );
		var colorImage = box.data( 'color-image' );

		// if( canvas[0] != undefined )
		// 	drawColorOnlyMask( canvas[0], color, colorImage );

		box.click(  );
	} )


	// Touch Canvas Events
	$tileBorderCanvasContainers.on( 'touchstart', function( e ){
		e.preventDefault(  );

		var $container = $( this );

		if( $container.hasClass( 'empty' ) )
			return;

		$simulatorContainer.addClass( 'tile-canvas-touched' );

		$container.trigger( 'touchmove', {
			pageX: e.originalEvent.touches[0].pageX, 
			pageY: e.originalEvent.touches[0].pageY
		} );
	} )

	$tileBorderCanvasContainers.on( 'touchmove', function( e, f ){
		var $this = $tileBorderCanvasContainers;

		if( $this.hasClass( 'empty' ) )
			return;

		var touch = ( f ) ? f : e.originalEvent.touches[0];

		

		var touchX = touch.pageX - $canvasContainer.offset(  ).left;
		var touchY = touch.pageY - $canvasContainer.offset(  ).top;


		if( !$simulatorContainer.hasClass( 'border-active' ) ){
			// NOTE: The  actual zoom scale is 3 in the CSS but for some reasons, 2 is what  works  here
			var transformOrigin = touchX + 'px ' + (touchY - (crosshairOffset.y / 2 )) + 'px';

			$( 'canvas', $tileCanvasContainer ).css( {
				'-webkit-transform-origin': transformOrigin,
				   '-moz-transform-origin': transformOrigin,
				    '-ms-transform-origin': transformOrigin,
				     '-o-transform-origin': transformOrigin,
				        'transform-origin': transformOrigin
			} )

			$tileCanvasContainer.trigger( 'mousemove', touch );

		}else{
			// NOTE: The  actual zoom scale is 3 in the CSS but for some reasons, 2 is what  works  here
			var transformOrigin = touchX + 'px ' + (touchY - (crosshairOffset.y / 2 )) + 'px';

			$( 'canvas', $borderCanvasContainer ).css( {
				'-webkit-transform-origin': transformOrigin,
				   '-moz-transform-origin': transformOrigin,
				    '-ms-transform-origin': transformOrigin,
				     '-o-transform-origin': transformOrigin,
				        'transform-origin': transformOrigin
			} )


			//  Repeat for tile
			var tileTouchX = touch.pageX - $tileCanvasContainer.offset(  ).left 
			var tileTouchY = touch.pageY - $tileCanvasContainer.offset(  ).top

			// NOTE: The  actual zoom scale is 3 in the CSS but for some reasons, 2 is what  works  here
			transformOrigin = tileTouchX + 'px ' + (tileTouchY - (crosshairOffset.y / 2 )) + 'px';


			$( 'canvas', $tileCanvasContainer ).css( {
				'-webkit-transform-origin': transformOrigin,
				   '-moz-transform-origin': transformOrigin,
				    '-ms-transform-origin': transformOrigin,
				     '-o-transform-origin': transformOrigin,
				        'transform-origin': transformOrigin
			} )


			if( tileTouchX < 0 || tileTouchY < 0 || tileTouchX > $tileCanvasContainer.width(  ) || tileTouchY > $tileCanvasContainer.height(  ) ){
				$borderCanvasContainer.trigger( 'mousemove', touch );
			}else{
				$tileCanvasContainer.trigger( 'mousemove', touch );			
			}


		}

		

		$canvasCrosshair.css( {
			left: ( touchX + crosshairOffset.x) + 'px',
			top: ( touchY + crosshairOffset.y) + 'px'
		} )


	} )

	$tileBorderCanvasContainers.on( 'touchend', function( e ){
		var $this = $( this );

		if( $this.hasClass( 'empty' ) )
			return;

		$simulatorContainer.removeClass( 'tile-canvas-touched' );

		$this.trigger( 'click' );
	} )



	// Rotation event
	$tileCanvasContainer.mousemove( function( e ){
		// Get quadrant
		var $this = $( this );

		var widthHalf = $this.width(  ) / 2;
		var heightHalf = $this.height(  ) / 2;

		var mouseX = e.pageX - $this.offset(  ).left;
		var mouseY = e.pageY - $this.offset(  ).top;

		var quadrant = 1;

		if( mouseX > widthHalf )
			quadrant = 2

		if( mouseY > heightHalf )
			quadrant += 2;


		$this.attr( 'data-quadrant', quadrant );


	} )

	$( '#tile-canvas-container .quadrant-rotation' ).mousemove( function( e ){
		e.stopPropagation(  );
	} )

	$( '#tile-canvas-container .quadrant-rotation' ).click( function( e ){
		var $this = $( this );
		var $container = $this.parent(  );

		var quadrant = $container.attr( 'data-quadrant' );

		$( '.tile-editor-pattern.used', $container ).each( function(  ){

			drawRotatedQuadrant( this, quadrant, -90 );
			applyColorEditor(  );
		} )


	} );

	// Color Editor Events
	$( '#tile-color-editor-dialog' ).on( 'hover', '#color-used .color-used-box', function( e ){
		var $colorUsedBox = $( this );
		var dataHover = $colorUsedBox.data( 'color-used-hover' );
		var colorId = $colorUsedBox.data( 'color-id' );
		var color = $colorUsedBox.data( 'color' );
		var colorImage = $colorUsedBox.data( 'color-image' );

		var canvas = $( '#canvas-containers canvas[data-color-used-hover='+dataHover+']' );


		var elements = [
			canvas,
			$( '#color-selection-container .tile-color-box[data-color-id='+colorId+']' )
		];

		$( elements ).toggleClass( 'color-used-hover' );


		if( e.type === 'mouseenter' ){
			drawHatches( canvas[0] );		
		}else if( e.type === 'mouseleave' ){
			drawColorOnlyMask( canvas[0], color, colorImage );
		}

	} );



	$( '#tile-color-editor-dialog' ).on( 'click', '#color-used .color-used-box', function(  ){

		var dataHover = $( this ).data( 'color-used-hover' );
		var colorId = $( this ).data( 'color-id' );

		$( '#color-used .color-used-box.selected' ).removeClass( 'selected' );
		$( '#color-selection-container .tile-color-box.color-used-selected' ).removeClass( 'color-used-selected' );

		$( this ).addClass( 'selected' );
		$( '#color-selection-container .tile-color-box[data-color-id='+colorId+']' ).addClass( 'color-used-selected' );


		window.selectedMask = $( '#canvas-containers canvas[data-color-used-hover='+dataHover+']' );

		// $( '.mask-color-picker' ).iris( 'color', $( this ).data( 'color' ) );


	} );



	$( '#tile-color-editor-dialog' ).on( 'mouseenter', '#color-selection-container .tile-color-box', function(  ){

		if( window.selectedMask == undefined )
			return;

		drawColorOnlyMask( window.selectedMask[0], $( this ).data( 'color' ), $( '.tile-color-img', this )[0] );

	} );

	$( '#tile-color-editor-dialog' ).on( 'mouseleave', '#color-selection-container .tile-color-box', function(  ){

		if( window.selectedMask == undefined )
			return;

		var $selectedColorBox = $( '#color-used .color-used-box.selected' );

		drawColorOnlyMask( window.selectedMask[0], $selectedColorBox.data( 'color' ), $selectedColorBox.data( 'color-image' ) );

	} );

	$( '#tile-color-editor-dialog' ).on( 'click', '#color-selection-container .tile-color-box', function(  ){


		if( window.selectedMask == undefined )
			return;

		$( '#color-selection-container .tile-color-box.color-used-selected' ).removeClass( 'color-used-selected' );

		var $this = $( this );

		$this.addClass( 'color-used-selected' );

		changeUsedColorBox(
			$( '#color-used .color-used-box.selected' ),
			$this.data( 'color-id' ),
			$this.data( 'color' ),
			$this.data( 'color-name' ),
			$( '.tile-color-img', this )[0]
		);

		applyColorEditor(  );

		addActionState(  );


	} );



	// Grout Events
	$simulatorContainer.on( 'click', '#grout-container .grout-color-box', function(  ){
		var $this = $( this );

		var iTile = $( '.tile-image-container.selected' ).data( 'itile' );

		if( iTile == undefined )
			return;

		var groutShape = tileData[iTile]['grout_shape'];

		$( '#grout-container .grout-color-box' ).removeClass( 'selected' );

		$this.addClass( 'selected' );

		drawGrout( '#tile-canvas-container', groutShape, $this.data( 'color' ) );

		applyColorEditor(  );

	} );


	$simulatorContainer.on( 'mouseenter', '#grout-container .grout-color-box', function(  ){
		var $this = $( this );

		var iTile = $( '.tile-image-container.selected' ).data( 'itile' );

		if( iTile == undefined )
			return;

		var groutShape = tileData[iTile]['grout_shape'];

		drawGrout( '#tile-canvas-container', groutShape, $this.data( 'color' ) );

	} )

	$simulatorContainer.on( 'mouseleave', '#grout-container .grout-color-box', function(  ){
		var $this = $( this );

		var iTile = $( '.tile-image-container.selected' ).data( 'itile' );

		if( iTile == undefined )
			return;

		var groutShape = tileData[iTile]['grout_shape'];
		var color = $( '#grout-container .grout-color-box.selected' ).data( 'color' );

		drawGrout( '#tile-canvas-container', groutShape, color );

	} )


	$simulatorContainer.on( 'click', '#grout-container #grout-thickness .artise-button', function(  ){
		var $this = $( this );

		var iTile = $( '.tile-image-container.selected' ).data( 'itile' );

		if( iTile == undefined )
			return;

		var groutShape = tileData[iTile]['grout_shape'];


		$( '#grout-container #grout-thickness .artise-button.selected' ).removeClass( 'selected' );

		$this.addClass( 'selected' );

		drawGrout( '#tile-canvas-container', groutShape, undefined, $this.data( 'thickness' ) );

		applyColorEditor(  );

	} )

	$simulatorContainer.on( 'mouseenter', '#grout-container #grout-thickness .artise-button', function(  ){
		var $this = $( this );

		var iTile = $( '.tile-image-container.selected' ).data( 'itile' );

		if( iTile == undefined )
			return;

		var groutShape = tileData[iTile]['grout_shape'];


		drawGrout( '#tile-canvas-container', groutShape, undefined, $this.data( 'thickness' ) );


	} )

	$simulatorContainer.on( 'mouseleave', '#grout-container #grout-thickness .artise-button', function(  ){
		var $this = $( this );

		var iTile = $( '.tile-image-container.selected' ).data( 'itile' );

		if( iTile == undefined )
			return;

		var groutShape = tileData[iTile]['grout_shape'];
		var thickness = $( '#grout-container #grout-thickness .artise-button.selected' ).data( 'thickness' );


		drawGrout( '#tile-canvas-container', groutShape, undefined, thickness );


	} )



	// Env Icons
	$( '.env-icons-image-container' ).click( function(  ){
		$( '#environments' ).removeClass( 'tile-view' );
	} )

	$( '#environments' ).on( 'click', '#close-env-button', function(  ){
		$( '#environments .env-container.active' ).removeClass( 'active' );
		$( '.env-icons-image-container.active' ).removeClass( 'active' );

		$( '#tiled-simulator' ).addClass( 'active' );

		$( '#environments' ).addClass( 'tile-view' );

		window.selected = $( '#tiled-wall-container' );

	} );

	$( '#environments' ).on( 'click', '#expand-env-button', function(  ){

		$( 'body' ).addClass('overflow-hidden');

		var envContainerActive = $( '.env-container.active' );
		var envContainerClone = envContainerActive.clone(  );


		envContainerClone.width( envContainerActive.width(  ) );
		envContainerClone.height( envContainerActive.height(  ) );

		$( '.hover', envContainerClone ).remove(  );


		$( '.three-bg-container', envContainerClone ).each( function(  ){
			var $canvasActive = $( '.three-bg-container[data-part=' + $( this ).data( 'part' ) + ']', envContainerActive );
			var canvasActive = $canvasActive[0];

			$canvasActive.data( 'render' )(  );

			var ctxClone = this.getContext( '2d' );
			
			ctxClone.drawImage( canvasActive, 0, 0, canvasActive.width, canvasActive.height );
		} )

		var scaleFactor = getScaleFactor(  );

		$( '#env-expand-overlay-container #env-fullscreen' ).css( {
			'-webkit-transform' 		: 'translate( -50%, -50% ) scale(' 
										+ ( ( $( window ).width(  ) * scaleFactor ) / envContainerActive.width(  ) ) 
										+ ')',
			'-moz-transform' 			: 'translate( -50%, -50% ) scale(' 
										+ ( ( $( window ).width(  ) * scaleFactor ) / envContainerActive.width(  ) ) 
										+ ')',
			'-ms-transform' 			: 'translate( -50%, -50% ) scale(' 
										+ ( ( $( window ).width(  ) * scaleFactor ) / envContainerActive.width(  ) ) 
										+ ')',
			'-o-transform' 				: 'translate( -50%, -50% ) scale(' 
										+ ( ( $( window ).width(  ) * scaleFactor ) / envContainerActive.width(  ) ) 
										+ ')',
			'transform' 				: 'translate( -50%, -50% ) scale(' 
										+ ( ( $( window ).width(  ) * scaleFactor ) / envContainerActive.width(  ) ) 
										+ ')'
			
		} );

		$( '#env-image-container' ).html( envContainerClone );

		$( '#env-expand-overlay-container' ).addClass( 'open' );
	} )


	// BUTTONS

	$( '#tile-selection-close-button' ).click( function(  ){
		$simulatorContainer.addClass( 'tile-selection-closed' );

	} )

	$( '#tile-selection-expand-button' ).click( function(  ){
		var $this = $( this );
		var toggleText = $this.data( 'toggle-text' );

		$simulatorContainer.toggleClass( 'tile-selection-expand' );
		$this.data( 'toggle-text', $this.text(  ) );
		$this.text( toggleText );


	} )

	$( '#select-tile-button' ).click( function(  ){
		$simulatorContainer.removeClass( 'tile-selection-closed' );

	} )


	$( '#preview-tile-button' ).click( function(  ){
		$simulatorContainer.addClass( 'mobile-preview-section' );
	} )

	$( '#edit-tile-button' ).click( function(  ){
		$simulatorContainer.removeClass( 'mobile-preview-section' );
	} )

	$( '#save-button' ).click( function(  ){
		if( $( '.tile-image-container.selected' ).length === 0 ){
			alert( 'Please select a tile before proceeding!' );
			return;
		}

		$( 'body' ).addClass('overflow-hidden');

		$( '#save-overlay-container' ).addClass( 'open' );

		var scaleFactor = getScaleFactor(  );

		$( '#save-overlay-container .simulator-overlay-content' ).css( {
			'-webkit-transform' 		: 'translate( -50%, -50% ) scale(' 
										+ ( ( $( window ).width(  ) * scaleFactor ) / $( '#tile-save-canvas' ).width(  ) ) 
										+ ')',
			'-moz-transform' 			: 'translate( -50%, -50% ) scale(' 
										+ ( ( $( window ).width(  ) * scaleFactor ) / $( '#tile-save-canvas' ).width(  ) ) 
										+ ')',
			'-ms-transform' 			: 'translate( -50%, -50% ) scale(' 
										+ ( ( $( window ).width(  ) * scaleFactor ) / $( '#tile-save-canvas' ).width(  ) ) 
										+ ')',
			'-o-transform' 				: 'translate( -50%, -50% ) scale(' 
										+ ( ( $( window ).width(  ) * scaleFactor ) / $( '#tile-save-canvas' ).width(  ) ) 
										+ ')',
			'transform' 				: 'translate( -50%, -50% ) scale(' 
										+ ( ( $( window ).width(  ) * scaleFactor ) / $( '#tile-save-canvas' ).width(  ) ) 
										+ ')'
			
		} );

		drawSaveCanvas(  );
	} )


	$( '#undo-button' ).click( function(  ){
		if( window.iAction > 0 ){
			window.iAction--;
			goToSate( window.iAction );
		}else
			console.log( 'no more undo' );
	} )

	$( '#redo-button' ).click( function(  ){
		if( window.iAction < window.actionStack.length - 1 ){
			window.iAction++;
			goToSate( window.iAction );
		}else
			console.log( 'no more redo' );

	} )

	// FULLSCREEN BUTTONS


	$( '#contract-env-button' ).click( function(  ){
		$( '#env-expand-overlay-container' ).click(  );
		
	} )

	$( '#env-expand-overlay-container' ).click( function( e ){
		$( '#env-image-container' ).html( '' );

	} )


	// SAVE BUTTONS

	$( '#submit-details-back-button' ).click( function(  ){
		$( '#submit-details-overlay' ).removeClass( 'shown' );
		$( '#save-overlay-container' ).removeClass( 'submit-details' );

	} )

	$( '#submit-button' ).click( function(  ){
		$( '#submit-details-overlay' ).addClass( 'shown' );
		$( '#save-overlay-container' ).addClass( 'submit-details' );

		var colors = [];

		$( '#color-used-container .color-used-box' ).each( function(  ){
			colors.push( $( this ).data( 'color-id' ) )
		} );

		var $selectedTile = $( '.tile-image-container.selected' );



		$( '#nf-field-10' ).val( $selectedTile.data( 'tile-id' ) ).trigger( 'change' );

		$( '#nf-field-11' ).val( JSON.stringify( colors ) ).trigger( 'change' );

		$( '#nf-field-12' ).val( $( 'img', $selectedTile ).attr( 'src' ) ).trigger( 'change' );

		$( '#nf-field-13' ).val( $( '#tile-save-canvas' )[0].toDataURL(  ) );
	} )


	$( 'input, textarea', '#submit-details-overlay' ).change( function(  ){
		if( this.checkValidity(  ) ){
			$( this ).removeClass( 'invalid' );
		}else{
			$( this ).addClass( 'invalid' );
		}
	} )

	$( '#details-submit-button' ).click( function(  ){

		var validateSuccess = function(  ){
			var colors = [];
  
			$( '#color-used-container .color-used-box' ).each( function(  ){
				colors.push( $( this ).data( 'color-id' ) )
			} );

			var $selectedTile = $( '.tile-image-container.selected' );

			$( '#submit-details-overlay' ).block( { message: null } );
			$.post( {
				url: ajaxurl,
				method: 'POST',
				data: {
					'action'		: 'add_artise_submission',
					'name'			: $( '#submit-name-input' ).val(),
					'email'			: $( '#submit-email-input' ).val(),
					'contact'		: $( '#submit-contact-input' ).val(),
					'referer'		: $( '#submit-contact-referer' ).val(),
					'quantity'		: $( '#submit-quantity-input' ).val(),
					'quantity_unit'	: $( '#submit-quantity-unit-input' ).val(),
					'quantity_other': $( '#submit-quantity-other-input' ).val(),
					'message'		: $( '#submit-message-input' ).val(),
					'tile_id'		: $selectedTile.data( 'tile-id' ),
					'colors[]'		: colors,
					'tile_img'		: $( 'img', $selectedTile ).attr( 'src' ),
					'submission_img': $( '#tile-save-canvas' )[0].toDataURL()
					//'submission_img': $( 'img', $selectedTile ).attr( 'src' )
				},
				complete: function( response ){
					// console.log( 'validate success', response );
					if( response !== 'unsuccessfull' ){
						alert( 'Tile choice has been successfully submitted!' )

						$( '#save-close-button' ).click(  );
					}else{
						alert( 'Oops! Something went wrong! Please try again. If error persists, please refresh page and try again' );
					}

					$( '#submit-details-overlay' ).unblock(  );

				}

			} );
		}

		if( !validateSubmit(  ) ){
			alert( 'Please correct all errors' );
			return;
		}

		if( !validateRecaptcha( validateSuccess ) ){
			alert( 'Please check recaptcha' );
		}		
	} );




	$( '#save-close-button' ).click( function(  ){
		$( '#save-overlay-container' ).click(  );
	} );

	$( '#save-overlay-container' ).click( function(  ){
		$( '#submit-details-overlay' ).removeClass( 'shown' );
		$( '#save-overlay-container' ).removeClass( 'submit-details' );
		
	} )







	$( '.simulator-overlay-container' ).click( function(  ){
		$( this ).removeClass( 'open' );

		$( 'body' ).removeClass('overflow-hidden');

	} );



	$( '.simulator-overlay-container .simulator-overlay-content' ).click( function( e ){
		e.stopPropagation(  );
	} )


	


	// Tile Sizes
	$( '#tile-size-small' ).click( function(  ){
		window.selected.removeClass( 'big-tiles' );
		// window.applyCanvasBackground( $( '.tile-image-container.selected img' ) );
		applyColorEditor( false );
	} )

	$( '#tile-size-big' ).click( function(  ){
		window.selected.addClass( 'big-tiles' );

		// window.applyCanvasBackground( $( '.tile-image-container.selected img' ) )
		applyColorEditor( false );
		
	} )




	// Search Box
	$( '#search-input' ).keyup( function(  ){
		var searchText = $( this ).val(  ).toLowerCase(  );
		var $tileWrapper = $( '.tile-category.search .tile-wrapper' );

		if( !$( '.tile-category.open' ).hasClass( 'search' ) ){
			window.$beforeSearch = $( '.tile-category.open' );
		}
		$( '.tile-category.open' ).removeClass( 'open' );
		
		$tileWrapper.html( '' );

		if( searchText !== '' ){

			$( '.tile-category.search' ).addClass( 'open' );

			var curr_itiles = [];

			var $results = $( '.tile-image-container' ).filter( function(  ){

				var iTile = $( this ).data( 'itile' );

				if( curr_itiles.indexOf( iTile ) > -1 )
					return false;


				if( $( this ).data( 'tile-name' )
					.toLowerCase(  )
					.indexOf( searchText ) > -1 ){

					curr_itiles.push( iTile );
					return true;
				}

				return false;
			} );


			$tileWrapper.html( $results.clone(  ) );

			if( $results.length === 0 ){
				$tileWrapper.html( '<div style="margin-left: 10px; font-style: italic;">No tiles found</div>' );
			}


		}else{
			$beforeSearch.addClass( 'open' );

		}
	} )

	$( '#search-input' ).click( function(  ){
		$( this ).keyup(  );
	} )


} );