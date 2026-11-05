( function( $ ) {
    "use strict";  
    var PXLCounterOldHandler = function( $scope, $ ) {
        setTimeout(function(){
            elementorFrontend.waypoint( $scope.find('.pxl-counter-number-value'), function () {
                var $number = $(this),
                    data = $number.data();           
                var decimalDigits = data.toValue.toString().match(/\.(.*)/);

                if (decimalDigits) {
                    data.rounding = decimalDigits[1].length;
                }
                $number.numerator(data);
            }, {
                offset: '95%',
                triggerOnce: true
            });
        }, 150);
    };

    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_counter.default', PXLCounterOldHandler );
        // elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_pie_chart.default', PXLCounterOldHandler );
    } );
} )( jQuery );