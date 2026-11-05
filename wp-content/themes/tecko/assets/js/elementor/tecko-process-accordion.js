( function( $ ) {
    "use strict";  
    var teckoProcessAccordionHandle = function( $scope, $ ) {

       $scope.find( '.pxl-process-accordion-widget .process-item').hover( function(){

            if( !$( this).hasClass( 'is-active')){

                $scope.find( '.process-item.is-active').removeClass( 'is-active');

                $( this).addClass( 'is-active');
            }
            
        }); 

        var accordion_widget = function(){

            const breakpoint = window.matchMedia( '( min-width: 768px)' );

            let mySwiper;


            const breakpointChecker = function() {


                if ( breakpoint.matches === true ) {

                    if ( mySwiper !== undefined ) mySwiper.destroy( true, true );

                    return;

                } else if ( breakpoint.matches === false ) {

      
                    return enableSwiper();
                }

            };

            const enableSwiper = function() {
                var carousel = $scope.find( '.pxl-process-accordion-widget');
                mySwiper = new Swiper ( carousel[0], {
                    spaceBetween: 20,
                    loop: true,            
                    slidesPerView: 1.2       
                });

            };

            breakpoint.addListener( breakpointChecker);

            breakpointChecker();
        };

        accordion_widget(); 
    };
 
    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        // Swipers
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_process_accordion.default', teckoProcessAccordionHandle );        
    } );
} )( jQuery );