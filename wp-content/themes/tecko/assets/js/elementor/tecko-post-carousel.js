( function( $ ) {
    "use strict";  
    var teckoSwiperHandle = function( $scope, $ ) {
 
        var carousel = $scope.find( ".tecko-post-carousel"),

            pagination = $scope.find( ".swiper-pagination");

        var nav_next = $scope.find( ".swiper-nav-button-next"),

            nav_prev = $scope.find( ".swiper-nav-button-prev");

        if( carousel.length == 0){
            return false;
        }

        $( '.pxl-navigation-carousel').each( function () {
            
            var selector = $( this);

            var carousel_ids = selector.data( 'ids');
   
            var array_ids = carousel_ids.split( ",").map( function( item) {

                return item.trim();
            });

            var scope_id = $scope[0].id;

            if ( array_ids.includes( scope_id)){

                nav_prev = selector.find( ".nav-prev");

                nav_next = selector.find( ".nav-next");
            }
        });

        var data = $scope.find( '.pxl-post-carousel-widget').data(), 
        settings = data.settings,
        carousel_settings = {
            slidesPerView: 2.2,
            spaceBetween: 30,
            speed: settings.animation_speed,
            navigation: {
                nextEl: nav_next[0],
                prevEl: nav_prev[0],
            },        
            pagination: {
                el: pagination[0],
                clickable: true
            }       
        }; 

        if( settings.loop == 'on'){
            carousel_settings['loop'] = true;     
        }

        if( settings.autoplay == 'on'){
            carousel_settings['autoplay'] = {
                delay : settings.autoplay_speed,
            }
        }       
   
        if( $scope.find( '.pxl-post-carousel-widget').hasClass( 'layout-2')){
            carousel_settings['effect'] = "creative";
            carousel_settings['creativeEffect'] = {
                prev: {
                  shadow: true,
                  translate: ["-20%", 0, -1],
                },
                next: {
                  translate: ["100%", 0, 0],
                }
            };           
        };

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
    };
 
    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        // Swipers
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_post_carousel.default', teckoSwiperHandle );        
    } );
} )( jQuery );