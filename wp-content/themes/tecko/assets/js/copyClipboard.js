(function ($) {

    "use strict";

    $( document ).ready( function() {

        var $temp = $("<input>");

        var $url = $(location).attr('href');

        $( '.single-post-copy-clipboard-button').on('click', function() {

            $("body").append($temp);

            $temp.val($url).select();

            document.execCommand("copy");

            $temp.remove();
            
        });
    });
})(jQuery);