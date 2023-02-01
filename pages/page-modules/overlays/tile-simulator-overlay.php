<?php


defined( 'ABSPATH' ) or die ( 'I\'m a plugin! Please don\'t access me directly!' );

wp_enqueue_style( 'artise-tile-simulator-overlay-style', plugins_url( 'tile-simulator/assets/css/tile-simulator-overlay.css' ) );


if( defined( 'GOOGLE_RECAPTCHA_KEY' ) && defined( 'GOOGLE_RECAPTCHA_SECRET' ) ){

	wp_enqueue_script( 'google-recaptcha', 'https://www.google.com/recaptcha/api.js' );	
	// wp_localize_script( 'google-recaptcha', 'GOOGLE_RECAPTCHA_SECRET', GOOGLE_RECAPTCHA_SECRET );
}

?>

<div id="env-expand-overlay-container" class="simulator-overlay-container">

	<div id="env-fullscreen" class="simulator-overlay-content">
		<span id="contract-env-button" class="dashicons dashicons-editor-contract env-fullscreen-button"></span>
		<div id="env-image-container"></div>
	</div>
	
</div>

<div id="save-overlay-container" class="simulator-overlay-container">
	<div class="simulator-overlay-content">
		<span id="save-close-button" class="dashicons dashicons-no"></span>
		<canvas id="tile-save-canvas" width="1110" height="630"></canvas>
		<button id="submit-button" class="artise-button">Send yourself a copy!</button>

		<!-- Submit Details Overlay -->
		<div id="submit-details-overlay">
			<div id="submit-details-back-button"><span class="dashicons dashicons-arrow-left-alt2"></span>Back</div>
			<h1>Your Details</h1>

			<table>
				<tr>
					<th>Name: <small>*</small></th>
					<td><input id="submit-name-input" type="text" required></td>
				</tr>
				<tr>
					<th>Email: <small>*</small></th>
					<td><input id="submit-email-input" type="text"
    pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$" required></td>
				</tr>
				<tr>
					<th>Phone Number: <small>*</small></th>
					<td><input id="submit-contact-input" type="tel" pattern="^\d{3}[ -]*\d{3}[ -]*\d{4}$" required></td>
				</tr>
				<tr>
					<th>Referred By: <small>*</small></th>
					<td><input id="submit-contact-referer" type="text"  required></td>
				</tr>
				<tr>
					<th>Quantity Needed: <small>*</small></th>
					<td style="display: flex;">
						<input id="submit-quantity-input" type="number" required>

						<select id="submit-quantity-unit-input">
							<option>Sqft.</option>	
							<option>Boxes</option>	
							<option>Pieces</option>	
							<option>Other</option>
						</select>

					</td>
					
					
				</tr>

				<tr>
					<td>If other, please specify:</td>
					<td><input id="submit-quantity-other-input" type="text"></td>
				</tr>
				<tr>
					<th>Message:</th>
					<td><textarea id="submit-message-input"></textarea></td>
				</tr>

				<?php if( defined( 'GOOGLE_RECAPTCHA_KEY' ) && defined( 'GOOGLE_RECAPTCHA_SECRET' ) ): ?>
					<tr>
						<th></th>
						<td><div class="g-recaptcha" data-sitekey="<?php echo GOOGLE_RECAPTCHA_KEY ?>"></div></td>
					</tr>

				<?php endif; ?>

				<tr>
					<td>
						<br><br><br><button id="details-submit-button" class="artise-button">Submit</button></td>
				</tr>
			</table>

			<?php //echo do_shortcode( '[ninja_form id=2]' ); ?>
		</div>


	</div>
</div>