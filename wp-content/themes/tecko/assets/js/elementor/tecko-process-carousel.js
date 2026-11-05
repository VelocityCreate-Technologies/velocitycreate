( function( $ ) {
    "use strict";  
    var teckoSwiperHandle = function( $scope, $ ) {
 
        var carousel = $scope.find( ".tecko-process-carousel"),

            pagination = $scope.find( ".swiper-pagination");

        var nav_next = $scope.find( ".swiper-nav-button-next"),

            nav_prev = $scope.find( ".swiper-nav-button-prev");

        if( carousel.length == 0){
            return false;
        }

        var data = $scope.find( '.pxl-process-carousel-widget').data(), 
        settings = data.settings,
        carousel_settings = {
            slidesPerView: 2.2,
            spaceBetween: 30,
            speed: settings.animation_speed,

        }; 

        if( settings.loop == 'on'){
            carousel_settings['loop'] = true;     
        }

        if( settings.autoplay == 'on'){
            carousel_settings['autoplay'] = {
                delay : settings.autoplay_speed,
            }
        }      


        carousel_settings.breakpoints = {};

        Object.keys( settings.breakpoints).reverse().forEach(breakpoint => {           
           
            carousel_settings.breakpoints[settings.breakpoints[breakpoint].node] = {

                slidesPerView: settings.breakpoints[breakpoint].value,
                spaceBetween: settings.breakpoints[breakpoint].spacing

            };
        }); 

        carousel.each( function(index, element) {
            
            var swiper = new Swiper(carousel[0], carousel_settings);  

            if( settings.autoplay === 'on' && settings.pause_on_hover === 'on'){
                $( this).on({
                    mouseenter: function mouseenter() {
                        this.swiper.autoplay.stop();
                    },
                    mouseleave: function mouseleave() {
                        this.swiper.autoplay.start();
                    }
                });
            } 
        });  

        var cursor = $scope.find( ".tecko-custom-cursor");  

        var title = $scope.find( ".process-title");  
        
        var widget_content = $scope.find( '.pxl-process-carousel-widget');

        function moveCursor(event) {
            var widget_content_offset_left = widget_content.offset().left;
            var widget_content_offset_top = widget_content.offset().top - $(window).scrollTop();
            cursor[0].style.top = `${event.clientY - widget_content_offset_top - 60}px`;
            cursor[0].style.left = `${event.clientX - widget_content_offset_left - 60}px`;
            cursor[0].style.opacity = `1`;
            cursor[0].style.transform = `scale(1)`;
        }

        widget_content[0].onmousemove = (event) => {
            moveCursor(event);
        };

        widget_content[0].onpointermove = (event) => {
            moveCursor(event);
        };
        widget_content[0].onmouseleave = (event) => {
            cursor[0].style.opacity = `0`;
            cursor[0].style.transform = `scale(0.3)`;
        };
        title.each( function(index, element) {
            // console.log( $( this));
            $( this).on({
                'mouseenter': function() {
                    cursor.addClass('disable')
                },
                'mouseleave': function() {
                    cursor.removeClass( 'disable')
                },
            })
        });
    };
 
    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        // Swipers
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_process_carousel.default', teckoSwiperHandle );        
    } );
} )( jQuery );