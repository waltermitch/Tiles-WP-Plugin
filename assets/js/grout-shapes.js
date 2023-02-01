var drawGroutShapes = {
	'nogrout': function( canvas, color, weight ){
		var ctx = canvas.getContext( '2d' );

		ctx.clearRect( 0, 0, canvas.width, canvas.height );
	},
	'cross': function( canvas, color, weight ){
		var ctx = canvas.getContext( '2d' );

		ctx.clearRect( 0, 0, canvas.width, canvas.height );


		if( color != undefined )
			ctx.strokeStyle = color;

		if( weight != undefined )
			ctx.lineWidth = weight;

		ctx.beginPath(  );
		ctx.moveTo( ( canvas.width/2 ) - 1, 0 );
		ctx.lineTo( ( canvas.width/2 ) - 1, canvas.height );

		ctx.stroke(  );

		ctx.moveTo( 0, ( canvas.height/2 ) - 1 );
		ctx.lineTo( canvas.width, ( canvas.height/2 ) - 1 );

		ctx.stroke(  );


		ctx.rect( 0, 0, canvas.width, canvas.height );
		ctx.stroke(  );
	},

	'h2Lines': function( canvas, color, weight ){
		var ctx = canvas.getContext( '2d' );
		var thirdsHeight = canvas.height / 3;

		ctx.clearRect( 0, 0, canvas.width, canvas.height );

		if( color != undefined )
			ctx.strokeStyle = color;

		if( weight != undefined )
			ctx.lineWidth = weight;

		ctx.beginPath(  );
		ctx.moveTo( 0, thirdsHeight );
		ctx.lineTo( canvas.width, thirdsHeight );

		ctx.stroke(  );

		ctx.moveTo( 0, 2 * thirdsHeight );
		ctx.lineTo( canvas.width, 2 * thirdsHeight );

		ctx.rect( 0, 0, canvas.width, canvas.height );
		ctx.stroke(  );
	}
}