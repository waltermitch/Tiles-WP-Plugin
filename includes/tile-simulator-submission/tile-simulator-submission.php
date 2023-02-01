<?php
    defined( 'ABSPATH' ) or die ( 'I\'m a plugin! Please don\'t access me directly!' );


    function register_artise_submission_post(  ){
        register_post_type(
            'artise-submissions',
            array(
                'labels'                => array(
                    'menu_name'            => __( 'Submissions' ),
                    'name'                => __( 'Submissions' ),
                    'singular'            => __( 'Submission' ),
                    /*'add_new'            => __( 'Add New Submission' ),
                    'add_new_item'        => __( 'Add New Submission' ),*/
                    'all_items'            => __( 'Submissions' )
                ),
                'public'                => true,
                'has_archive'            => true,
                'supports'                => array( '' ),
                'show_in_menu'            => 'edit.php?post_type=artise-tiles',
                'map_meta_cap'            => true,
                'capabilities'            => array(
                    'create_posts'        => false
                )
            )
        );
    }

    add_action( 'init', 'register_artise_submission_post' );



    function add_artise_submission_columns( $columns ){

        $temp = array(
            'cb'                => '<input type="checkbox">',
            'featured-image'                => '<span class="dashicons dashicons-format-image"></span>',
            'name'                => 'Name',
            'email'                => 'Email',
            'contact'            => 'Phone Number',
            'referer'            => 'Referer',
            'quantity'            => 'Quantity',
            'quantity-u'        => 'Quantity Unit'
        );

        unset( $columns['cb'] );
        unset( $columns['title'] );


        return array_merge( $temp, $columns );
    }
    add_filter( 'manage_edit-artise-submissions_columns', 'add_artise_submission_columns' );


    function add_artise_submission_columns_content( $column, $post_id ){

        if( $column === 'name' ){
            $edit_link = get_edit_post_link( $post_id );
            echo
                "<a class=\"row-title\" href=\"{$edit_link}\">"
                . get_post_meta( $post_id, 'artise-sub-name', true )
                . '</a>';


        }else if( $column === 'email' ){
            echo get_post_meta( $post_id, 'artise-sub-email', true );
        

        }else if( $column === 'contact' ){
            echo get_post_meta( $post_id, 'artise-sub-contact', true );
        

        }else if( $column === 'featured-image' ){
            $tile_id = get_post_meta( $post_id, 'artise-sub-tile', true );
            $colors = get_post_meta( $post_id, 'artise-sub-colors', true );

            $tile_img = get_post_meta( $post_id, 'artise-sub-tile-img', true );

            echo "<img width=\"100\" height=\"100\" src=\"{$tile_img}\">";


        }else if( $column === 'referer' ){
            echo get_post_meta( $post_id, 'artise-sub-referer', true );

        }else if( $column === 'quantity' ){
            echo get_post_meta( $post_id, 'artise-sub-quantity', true );

        }
        else if( $column === 'quantity-u' ){
            echo get_post_meta( $post_id, 'artise-sub-quantity-u', true );

        }

    }
    add_action( 'manage_artise-submissions_posts_custom_column', 'add_artise_submission_columns_content', 10, 2 );



    function set_artise_submission_sortable_columns( $columns ) {
        $columns['name'] = 'artise-sub-name';
        $columns['email'] = 'artise-sub-email';
        $columns['contact'] = 'artise-sub-contact';
        $columns['referer'] = 'artise-sub-referer';
        $columns['quantity'] = 'artise-sub-quantity';
        $columns['quantity-u'] = 'artise-sub-quantity-u';
     
        return $columns;
    }
    add_filter( 'manage_edit-artise-submissions_sortable_columns', 'set_artise_submission_sortable_columns' );


    function set_artise_submission_orderby( $query ) {

        $orderby = $query->get( 'orderby' );
     
        if( $orderby === 'artise-sub-name' ) {
            $query->set( 'meta_key','artise-sub-name' );
            $query->set( 'orderby','meta_value' );
       

        }else if( $orderby === 'artise-sub-email' ) {
            $query->set( 'meta_key','artise-sub-email' );
            $query->set( 'orderby','meta_value' );
        

        }else if( $orderby === 'artise-sub-contact' ) {
            $query->set( 'meta_key','artise-sub-contact' );
            $query->set( 'orderby','meta_value' );

        }else if( $orderby === 'artise-sub-referer' ) {
            $query->set( 'meta_key','artise-sub-referer' );
            $query->set( 'orderby','meta_value' );

        }else if( $orderby === 'artise-sub-quantity' ) {
            $query->set( 'meta_key','artise-sub-quantity' );
            $query->set( 'orderby','meta_value' );
        }
        else if( $orderby === 'artise-sub-quantity-u' ) {
            $query->set( 'meta_key','artise-sub-quantity-u' );
            $query->set( 'orderby','meta_value' );
        }


    }
    add_action( 'pre_get_posts', 'set_artise_submission_orderby' );





    function set_artise_submission_primary_column( $default, $screen ) {


        if ( $screen === 'edit-artise-submissions' ) {
            $default = 'name';
        }
        return $default;
    }

    add_filter( 'list_table_primary_column', 'set_artise_submission_primary_column', 10, 2 );



    function add_artise_submission_meta_box(  ){
        add_meta_box( 'artise_submission_tile', 'Selected Tile', 'artise_submission_tile_meta_box', 'artise-submissions', 'normal' );

        add_meta_box( 'artise_submission_details', 'Submission Details', 'artise_submission_details_meta_box', 'artise-submissions', 'normal' );
    }
    add_action( 'add_meta_boxes', 'add_artise_submission_meta_box' );


    // META BOX - SUBMISSION DETAILS
    function artise_submission_details_meta_box(  ){
        global $post;
        ?>

        <table id="submission-details-table">
            <tr>
                <th>Name</th>
                <td><input type="text" name="submission-name" value="<?php echo get_post_meta( $post->ID, 'artise-sub-name', true ) ?>"></td>
            </tr>
            <tr>
                <th>Email</th>
                <td><input type="text" name="submission-email" value="<?php echo get_post_meta( $post->ID, 'artise-sub-email', true ) ?>"></td>
            </tr>
            <tr>
                <th>Phone Number</th>
                <td><input type="text" name="submission-contact" value="<?php echo get_post_meta( $post->ID, 'artise-sub-contact', true ) ?>"></td>
            </tr>
            <tr>
                <th>Referer</th>
                <td><input type="text" name="submission-referer" value="<?php echo get_post_meta( $post->ID, 'artise-sub-referer', true ) ?>"></td>
            </tr>
            <tr>
                <th>Quantity</th>
                <td><input type="number" name="submission-quantity" value="<?php echo get_post_meta( $post->ID, 'artise-sub-quantity', true ); ?>"></td>
            </tr>
            <tr>
                <th>Quantity Unit</th>
                <td><input type="text" name="submission-quantity-u" value="<?php echo get_post_meta( $post->ID, 'artise-sub-quantity-u', true ); ?>"></td>
            </tr>
            <tr>
                <th>Message</th>
                <td><textarea name="submission-message"><?php echo get_post_meta( $post->ID, 'artise-sub-msg', true ) ?></textarea></td>
            </tr>
        </table>

        <?php
    }

    function save_artise_submission_Details_meta_box( $post_id ){
        if( empty( $_POST['submission-name'] )
             || empty( $_POST['submission-email'] )
             || empty( $_POST['submission-contact'] )
             || empty( $_POST['submission-referer'] )
             || empty( $_POST['submission-quantity'] )
             || empty( $_POST['submission-message'] ) )
             return;

         if( !current_user_can( 'edit_post', $post_id ) )
             return;


         update_post_meta( $post_id, 'artise-sub-name', $_POST['submission-name'] );
         update_post_meta( $post_id, 'artise-sub-email', $_POST['submission-email'] );
         update_post_meta( $post_id, 'artise-sub-contact', $_POST['submission-contact'] );
         update_post_meta( $post_id, 'artise-sub-referer', $_POST['submission-referer'] );
         update_post_meta( $post_id, 'artise-sub-quantity', $_POST['submission-quantity'] );
         update_post_meta( $post_id, 'artise-sub-quantity-u', $_POST['submission-quantity-u'] );
         update_post_meta( $post_id, 'artise-sub-msg', $_POST['submission-message'] );


    }
    add_action( 'save_post_artise-submissions', 'save_artise_submission_Details_meta_box' );





    //     META BOX - TILE
    function artise_submission_tile_meta_box(  ){
        global $post;

        $tile_id = get_post_meta( $post->ID, 'artise-sub-tile', true );

        $tile = get_post( $tile_id );
        $category = get_terms( array(
            'taxonomy'                    => 'artise-tile-category',
            'object_ids'                => $tile_id,
            'fields'                    => 'names'
        ) );

        $tile_img = get_post_meta( $post->ID, 'artise-sub-tile-img', true );

        $colors = get_post_meta( $post->ID, 'artise-sub-colors', true );


        ?>
            <h1><?php echo "#{$tile_id} {$tile->post_title}" ?></h1>
            <span>
                Category: 
                <?php echo implode( ', ', $category ) ?>
            </span><br><br>

            <div id="selected-tile-container">
                <div id="preview-column">

                    <img width="200" height="200" src="<?php echo $tile_img ?>">

                </div>


                <div id="selected-colors">
                    <?php foreach ( $colors as $color ): ?>
                        <div class="color-container">
                            <?php 
                                $color = get_post( $color );
                                $color_hex = get_post_meta( $color->ID, 'artise-tile-color', true );
                            ?>
                            <div class="color-box" style="background-color: <?php echo $color_hex ?>"></div>
                            <div class="color-details">
                                <span class="color-id"><?php echo $color->ID ?></span><br>
                                <span class="color-name"><?php echo $color->post_title ?></span><br>
                                <span class="color-hex"><?php echo $color_hex ?></span>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            
        <?php
    }

    function artise_submit_email_contents( $file ){
        ob_start(  );
        ?>

            <table width="100%" cellspacing="0" border="0" style="font-size=18px; font-family: Arial, Helvetica, sans-serif; font-weight: 100">
                <tr>
                    <td style="text-align:center">
                        <img width="30%" src="https://tilecustomizer.com/wp-content/uploads/2016/01/Lili_Final_Logo-2.png" />
                        <br>
                        <hr>
                    </td>
                </tr>
                
                <tr style="background-color:#af2c18; color:white; text-align:center; padding: 50px 30px">
                    <td>
                        <h1 style="font-weight:100;font-size:21px; letter-spacing:1px">Thank you for your submission, <?php echo $_POST['name'] ?>!</h1>
                    </td>
                </tr>
                
                <tr style="text-align:center">
                    <td>
                        <br>
                            <img width="95%" src="<?php echo $file['url'] ?>" /> 
                       <br>
                    </td>
                </tr>
                <tr>
                    <td style="padding:20px; background-color:#ececec;">
                        <table width="100%" style="text-align:left; font-size:17px;" >
                            <tr>
                                <th style="text-align:left">Name</th>
                                <td><?php echo $_POST['name'] ?></td>
                            </tr>
                            <tr>
                                <th style="text-align:left">Email</th>
                                <td><?php echo $_POST['email'] ?></td>
                            </tr>
                            <tr>
                                <th style="text-align:left">Phone Number</th>
                                <td><?php echo $_POST['contact'] ?></td>
                            </tr>
                            <tr>
                                <th style="text-align:left">Referred By</th>
                                <td><?php echo $_POST['referer'] ?></td>
                            </tr>
                            <tr>
                                <th style="text-align:left">Quantity Needed</th>
                                <td><?php echo $_POST['quantity'] ?> <?php echo $_POST['quantity_unit'] ?></td>
                            </tr>
                            <tr>
                                <th style="text-align:left">Message</th>
                                <td><?php echo nl2br($_POST['message']) ?></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                
                <tr style="text-align:center; ">
                    <td>
                        <br><br>
                        <p>Great, now you have a copy of your beautiful creation!</p>
                        <br>
                    </td>
                </tr>
                <tr style="text-align:center; ">
                    <td>
                        <p>You can bring it to life by clicking the link below & placing an order for the corresponding pattern</p>
                        <br>
                    </td>
                </tr>
                <tr style="text-align:center; ">
                    <td>
                        <p>Happy designing!</p>
                        <br>
                    </td>
                </tr>
                <tr style="text-align:center; ">
                    <td>
                        <p><a href="https://lilitile.com/collections/custom">https://lilitile.com/collections/custom</a></p><br>
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 15px;">
                        <hr>
                        <br><br>
                        Please keep in mind the minimum order is 53 sqft (10 boxes).<br>
                                As this material is hand made, production &amp; delivery takes 12-14 weeks from order confirmation
                        
                        <br><br>
                        
                        Please contact your local LiLi Cement Tile dealer for more information or send us an email at design@stonemar.com.
                        
                    </td>
                </tr>
                
                
            </table>


        <?php

        return ob_get_clean(  );
    }

    function upload_submission(  ){

        $upload_dir       = wp_upload_dir();

        // @new
        $upload_path      = str_replace( '/', DIRECTORY_SEPARATOR, $upload_dir['path'] ) . DIRECTORY_SEPARATOR;

        $img = $_POST['submission_img'];
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);

        $decoded          = base64_decode($img) ;

        $filename         = 'tile';

        $hashed_filename  = $filename . '_' .md5( $filename . microtime() ) . '.png';

        $file = $upload_path . $hashed_filename;

        // @new
        $image_upload     = file_put_contents( $file, $decoded );

        //HANDLE UPLOADED FILE
        if( !function_exists( 'wp_handle_sideload' ) ) {

          require_once( ABSPATH . 'wp-admin/includes/file.php' );

        }

        // Without that I'm getting a debug error!?
        if( !function_exists( 'wp_get_current_user' ) ) {

          require_once( ABSPATH . 'wp-includes/pluggable.php' );

        }

        // @new
        $file             = array();
        $file['error']    = '';
        $file['tmp_name'] = $upload_path . $hashed_filename;
        $file['name']     = $hashed_filename;
        $file['type']     = 'image/png';
        $file['size']     = filesize( $upload_path . $hashed_filename );

        // upload file to server
        // @new use $file instead of $image_upload
        $file_return      = wp_handle_sideload( $file, array( 'test_form' => false ) );

        return $file_return;
    }


    function add_artise_submission(  ){

        if( empty( $_POST['name'] )
             || empty( $_POST['email'] )
             || empty( $_POST['contact'] )
             || empty( $_POST['referer'] )
             || empty( $_POST['quantity'] )
             || empty( $_POST['quantity_unit'] )
             // || empty( $_POST['message'] )
             || empty( $_POST['tile_id'] )
             || empty( $_POST['colors'] )
             || empty( $_POST['tile_img'] ) )
             wp_die( 'unsuccessfull' );


         if( $_POST['quantity_unit'] === 'Other' ){
             $_POST['quantity_unit'] = $_POST['quantity_other'];
         }

         $submission_id = wp_insert_post( array(
             'post_type'                    => 'artise-submissions',
             'post_status'                => 'publish',
             'meta_input'                => array(
                 'artise-sub-name'        => $_POST['name'],
                 'artise-sub-email'        => $_POST['email'],
                 'artise-sub-contact'    => $_POST['contact'],
                 'artise-sub-referer'    => $_POST['referer'],
                 'artise-sub-quantity'    => $_POST['quantity'],
                 'artise-sub-quantity-u'    => $_POST['quantity_unit'],
                 'artise-sub-msg'        => $_POST['message'],
                 'artise-sub-tile'        => $_POST['tile_id'],
                 'artise-sub-colors'        => $_POST['colors'],
                 'artise-sub-tile-img'    => $_POST['tile_img'],
             )
         ) );

         $file = upload_submission(  );

         wp_mail( 
             array(
                 $_POST['email'],
                 'design@stonemar.com'
             ), 
             'Your pattern attached!', 
             artise_submit_email_contents( $file ), 
             array(
                 'Content-Type: text/html; charset=UTF-8'
             ),
             array( $file['file'] )
        );

         if( $submission_id == 0 )
             wp_die( 'unsuccessfull' );


        wp_die( $submission_id );

    }
    add_action( 'wp_ajax_add_artise_submission', 'add_artise_submission' );
    add_action( 'wp_ajax_nopriv_add_artise_submission', 'add_artise_submission' );



    function validate_google_recaptcha(  ){
        $curl = curl_init(  );

        $apiData = array(
            'response'        => $_POST['response'],
            'secret'        => GOOGLE_RECAPTCHA_SECRET
        );

        curl_setopt_array($curl, array(
            CURLOPT_URL                => 'https://www.google.com/recaptcha/api/siteverify',
            CURLOPT_POST            => 1,
            CURLOPT_POSTFIELDS        => $apiData
        ) );

        $result = curl_exec( $curl );


        curl_close( $curl );

        echo substr( $result, 0, -1 );
        // echo json_encode( $result );


        wp_die(  );
    }
    add_action( 'wp_ajax_validate_google_recaptcha', 'validate_google_recaptcha' );
    add_action( 'wp_ajax_nopriv_validate_google_recaptcha', 'validate_google_recaptcha' );




    function nf_tile_submitted_callback( $form_data ){
        $form = array(  );

        foreach ($form_data['fields'] as $field) {
            $form[$field['key']] = $field['value'];
        }

        $submission_id = wp_insert_post( array(
            'post_type'                    => 'artise-submissions',
            'post_status'                => 'publish',
            'meta_input'                => array(
                'artise-sub-name'        => $form['name'],
                'artise-sub-email'        => $form['email'],
                'artise-sub-contact'    => $form['contact'],
                'artise-sub-msg'        => $form['message'],
                'artise-sub-tile'        => $form['tile_id'],
                'artise-sub-colors'        => json_decode( $form['colors'] ),
                'artise-sub-tile-img'    => $form['tile_img']
            )
        ) );
    }


    add_action( 'nf_tile_submitted', 'nf_tile_submitted_callback' );






    function enqueue_artise_submission_scripts( $hook ){
        if( $hook !== 'post-new.php' && $hook !== 'post.php' )
            return;

        global $post;
        if( $post->post_type !== 'artise-submissions' )
            return;

        wp_enqueue_style( 'admin-tile-simulator-submission-style', plugins_url( 'tile-simulator/assets/css/admin-tile-simulator-submission.css' ) );



    }
    add_action( 'admin_enqueue_scripts', 'enqueue_artise_submission_scripts' );


?>