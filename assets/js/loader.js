window.loader = {};

// 0 <= progress < 1
window.loader.progress = function( progress ){
	if( progress >= 1 ){
		window.loader.finishLoad(  );
	}else{
        for( var i=0; i < masks.length; i++ ){
            for( var j=0; j < masks[i].length; j++ ){
                if(!masks[i][j].loadedMask){
                    masks[i][j].loadedMask = true;
                    masks[i][j].src = loadMask( masks[i][j].src );
                    masks[i][j].color_img = loadMask( masks[i][j].color_img );
                }
            }
        }
		//return;
	}

	jQuery( '#loader-container .progress' ).css( {
		width: ( progress * 100 ) + '%' 
	} )
}

window.loader.finishLoad = function(  ){
	jQuery( '#loader-container' ).animate({
		opacity: 0
	},{
		duration: 300,
		complete: function(  ){
			jQuery( 'body' ).addClass( 'loaded' );

		}

	})
}

jQuery( document ).ready( function( $ ){

	window.loader.progress( 0.05 );

} )