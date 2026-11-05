( function( $ ) {
    /**
     * @param $scope The Widget wrapper element as a jQuery element
     * @param $ The jQuery alias
     */
    var PxlAccordionHandler = function( $scope, $ ) {

        $scope.find( '.pxl-accordion-widget .accordion-item.is-active .accordion-item-description').css( 'display', 'block');
        
        $scope.find( '.pxl-accordion-widget .accordion-item').on( 'click', function(){

            var data = $( this).data( 'target');

            if( !$( this).hasClass( 'is-active')){

                $scope.find( '.accordion-item.is-active .accordion-item-description').slideUp();

                $scope.find( '.accordion-item.is-active').removeClass( 'is-active');                

                $( this).addClass( 'is-active');

                $( this).find( '.accordion-item-description').slideDown();
            }else{
                $scope.find( '.accordion-item.is-active').removeClass( 'is-active');
                $( this).find( '.accordion-item-description').slideUp();
            }

            $scope.find( '.featured-image-item').each( function( index, item){

                var $item = $( item );   

                $item.removeClass( 'is-active');

                $( data).addClass( 'is-active');

            });
        });
    };

    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_accordion.default', PxlAccordionHandler );
    } );
} )( jQuery );