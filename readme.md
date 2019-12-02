# Starter template using Bootstrap and _S WordPress boiler theme

Bootstrap is used via NPM and all overrides are done via theme. I have included the entire bootstrap theme at the moment but you can choose to use something else.


Suggested way of including theme
```
function test_scripts() {
	$ver = wp_get_theme()->version;
	$assets_url = get_theme_file_uri() . '/assets/';
	$min        = defined( 'SCRIPT_DEBUG' ) ? '' : '.min';

	wp_register_style('test-style',$assets_url.'/css/main'.$min.'.css','',$ver,'all');
	wp_register_script('test-vendor-script',$assets_url.'/js/vendor'.$min.'.js',['jquery'],$ver,true);
	wp_register_script('test-custom-script',$assets_url.'/js/main'.$min.'.js',['jquery'],$ver,true);


	wp_enqueue_style('test-style');
	wp_enqueue_script('test-custom-script');

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}

add_action( 'wp_enqueue_scripts', 'test_scripts' );
```