( function( $ ) {
    "use strict";  
    var teckoHeadingScrollEffectHandle = function( $scope, $ ) {

        var split = new SplitText( $scope.find( '.heading-text')[0], { type: "lines", postion: "absolute"});

        $scope.find( '.heading-text div').each( function(){
            gsap.to( $(this)[0], {
                backgroundPositionX: '0%',
                ease: 'none', 
                scrollTrigger: {
                    trigger: $(this)[0],
                    start: "top center",
                    end: "bottom center",
                    scrub: 0,
                },
            });
        })
    };
 
    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        // Swipers
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_heading_scroll_effect.default', teckoHeadingScrollEffectHandle );        
    } );
} )( jQuery );