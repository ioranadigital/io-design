<?php
/**
 * Iorana Blog — Child Theme de Astra
 */

add_action( 'wp_head', 'iorana_blog_inject_styles', 999 );
function iorana_blog_inject_styles() {
    $css_url   = get_stylesheet_directory_uri() . '/style.css?v=' . wp_get_theme()->get( 'Version' );
    $fonts_url = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
    echo '<link rel="stylesheet" href="' . esc_url( $fonts_url ) . '">' . "\n";
    echo '<link rel="stylesheet" href="' . esc_url( $css_url ) . '">' . "\n";
}

/**
 * Añade clase al body
 */
add_filter( 'body_class', 'iorana_blog_body_classes' );
function iorana_blog_body_classes( $classes ) {
    $classes[] = 'iorana-dark';
    return $classes;
}

/**
 * Schema Article JSON-LD en posts individuales
 */
add_action( 'wp_head', 'iorana_blog_article_schema' );
function iorana_blog_article_schema() {
    if ( ! is_single() ) return;

    global $post;
    $image = get_the_post_thumbnail_url( $post->ID, 'full' );

    $schema = [
        '@context'         => 'https://schema.org',
        '@type'            => 'Article',
        'headline'         => get_the_title( $post->ID ),
        'description'      => get_the_excerpt( $post->ID ),
        'datePublished'    => get_the_date( 'c', $post->ID ),
        'dateModified'     => get_the_modified_date( 'c', $post->ID ),
        'author'           => [
            '@type' => 'Organization',
            'name'  => 'Iorana Digital',
            'url'   => 'https://iorana.digital',
        ],
        'publisher'        => [
            '@type' => 'Organization',
            'name'  => 'Iorana Digital',
            'logo'  => [
                '@type' => 'ImageObject',
                'url'   => 'https://iorana.digital/iorana-seo-marketing-digital.png',
            ],
        ],
        'mainEntityOfPage' => get_permalink( $post->ID ),
    ];

    if ( $image ) {
        $schema['image'] = $image;
    }

    echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) . '</script>' . "\n";
}

/**
 * Breadcrumb Schema
 */
add_action( 'wp_head', 'iorana_blog_breadcrumb_schema' );
function iorana_blog_breadcrumb_schema() {
    if ( ! is_single() && ! is_home() && ! is_category() ) return;

    $items = [
        [ '@type' => 'ListItem', 'position' => 1, 'name' => 'Inicio', 'item' => 'https://iorana.digital/' ],
        [ '@type' => 'ListItem', 'position' => 2, 'name' => 'Blog',   'item' => 'https://iorana.digital/blog/' ],
    ];

    if ( is_single() ) {
        $items[] = [ '@type' => 'ListItem', 'position' => 3, 'name' => get_the_title(), 'item' => get_permalink() ];
    }

    $schema = [
        '@context'        => 'https://schema.org',
        '@type'           => 'BreadcrumbList',
        'itemListElement' => $items,
    ];

    echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) . '</script>' . "\n";
}
