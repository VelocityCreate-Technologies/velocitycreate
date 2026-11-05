;(function ($) {

    "use strict";

    $( document ).ready( function() {
        $( '.single-post .sidebar-button').on( 'click', function(){
            $( '.pxl-sidebar-area').teckoShowMagnificPopup();
        });
    });   
})(jQuery);