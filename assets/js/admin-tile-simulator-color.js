jQuery( function( $ ){
	var $tileColorContainer = $( '.color-field-container-color' );
	var $tileColorField = $( '.tile-color-field' );
	var $tileColorIcon = $( '.tile-color-icon' );

	var $tileImgContainer = $( '.color-field-container-img' );
	var $tileImgField = $( '.tile-img-field' );
	var $tileImgIcon = $( '.tile-img-icon' );

	var frame;

	function resetColorField(  ){
		$tileColorIcon.css( {
			backgroundColor: '#fff'
		} );
		$tileColorField.val( '' );
	}

	function resetImgField(  ){
		$tileImgIcon.css( {
			backgroundImage: ''
		} );

		$tileImgField.val( '' );
	}

	function activateColorFieldContainer( $container ){
		$( '.color-field-container' ).removeClass( 'active' );
		$container.addClass( 'active' );
	}


	$tileColorField.wpColorPicker( {
		change: function( e, ui ){
			$tileColorIcon.css( {
				backgroundColor: ui.color.toString(  )
			} )

			activateColorFieldContainer( $tileColorContainer );
			resetImgField(  );

		}
	} );




	$tileColorIcon.click( function(  ){
		$tileColorField.iris( 'toggle' );
	} )

	$tileImgIcon.click( function(  ){
		if( frame ){
			frame.open(  );
			return;
		}

		frame = wp.media( {
			title 			: 'Select/Upload Color Image',
			button 			: {
				text		: 'Use as color image'
			},
			multiple		: false
		} );

		frame.on( 'select', function(  ){
			var selection = frame.state(  ).get( 'selection' );

			selection.map( function( attachment ){

				attachment = attachment.toJSON(  );

				$tileImgIcon.css( {
					backgroundImage: 'url(' + attachment.url + ')'
				} )
				$tileImgField.val( attachment.id );

				activateColorFieldContainer( $tileImgContainer );
				resetColorField(  );

			} );


		} );

		frame.open(  );
	})

} )