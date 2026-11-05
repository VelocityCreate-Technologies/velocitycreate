( function( $ ) {

    "use strict"; 

    var teckoInfiniteSlideHandle = function( $scope, $ ) {

        var data = $scope.find( '.pxl-infinite-slide-el').data(),
            slide_settings = {
                speed: data.slide.speed,               
                direction: data.slide.direction,
                clone: 1,
            };       
        $scope.find('.pxl-infinite-slide').infiniteslide( slide_settings);   
    };
 
    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        // Swipers
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_clients_infinite_silde.default', teckoInfiniteSlideHandle );        
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_infinite_silde.default', teckoInfiniteSlideHandle );        
    } );
} )( jQuery );