# Starter template using Bootstrap and _S WordPress boiler theme

Bootstrap is used via NPM and all overrides are done via theme. I have included the entire bootstrap theme at the moment but you can choose to use something else.

##Styles
All styles will go under your-theme-name/resources/scss

## Vendor JS
All Vendor JS files will go under your-theme-name/js/

Suggested way of including theme
```
/**
 * Enqueue scripts and styles.
 */
function starter_theme_scripts() {
	$ver        = wp_get_theme()->version;
	$assets_url = get_theme_file_uri() . '/assets/';
	$min        = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG == true ) ? '' : '.min';

	wp_register_style( 'starter-theme', $assets_url . '/css/main' . $min . '.css', '', $ver, 'all' );
	wp_register_script( 'starter-theme-vendor-script', $assets_url . '/js/vendor' . $min . '.js', [ 'jquery' ], $ver, true );
	wp_register_script( 'starter-theme-custom-script', $assets_url . '/js/main' . $min . '.js', [ 'jquery' ], $ver, true );


	wp_enqueue_style( 'starter-theme' );
	wp_enqueue_script( 'starter-theme-custom-script' );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}

add_action( 'wp_enqueue_scripts', 'starter_theme_scripts' );

/*
 *
 */
function add_submenu_indicator( $item_output, $item, $depth, $args ) {

	if ( $args->theme_location == 'menu-1' ) {
		//var_dump($item);
		if ( in_array( 'menu-item-has-children', $item->classes ) ) {
			$item_output .= '<span class="sub-menu-toggle"><svg class="svg-icon" aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="15" height="7" viewBox="0 0 20 12"><polygon fill="" fill-rule="evenodd" points="1319.899 365.778 1327.678 358 1329.799 360.121 1319.899 370.021 1310 360.121 1312.121 358" transform="translate(-1310 -358)"></polygon></svg></span>';
		}
	}

	return $item_output;
}

add_filter( 'walker_nav_menu_start_el', 'add_submenu_indicator', 10, 4 );

add_filter('body_class',function($classes){
	$classes[] = 'fixed-header';
	return $classes;
});
```