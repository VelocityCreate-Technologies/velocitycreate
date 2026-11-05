( function( $ ) {
    /**
     * @param $scope The Widget wrapper element as a jQuery element
     * @param $ The jQuery alias
     */

    var Pxl_Global_Animation_Handler = function( $scope, $ ) {
        elementorFrontend.waypoint( $scope.find('.pxl-animate'), function () {
            
            var $animate_el = $(this),
                data = $animate_el.data('settings');     

            if( typeof data['animation'] != 'undefined'){

                setTimeout(function () {
                    $animate_el.removeClass('pxl-invisible').addClass('animated ' + data['animation']);
                }, data['animation_delay']);
            }
        });

        elementorFrontend.waypoint( $scope.find('.pxl-scroll'), function () {
            $(this).addClass('pxl-animated');
        });
        elementorFrontend.waypoint($scope.find('.pxl-image-wg.move-from-left'), function () {
            $(this).addClass('pxl-animated');
        });
        elementorFrontend.waypoint($scope.find('.pxl-image-wg.move-from-left2'), function () {
            $(this).addClass('pxl-animated');
        });
        elementorFrontend.waypoint($scope.find('.pxl-image-wg.move-from-top1'), function () {
            $(this).addClass('pxl-animated');
        });
        elementorFrontend.waypoint($scope.find('.pxl-image-wg.move-from-right'), function () {
            $(this).addClass('pxl-animated');
        });
    };
    function pxlMouseDirection(){
        $('.pxl-grid-direction .item-direction').each(function () {
            $(this).on('mouseenter',function(ev){
                addClass( ev, this, 'mouse-in in' );
            });
            $(this).on('mouseleave',function(ev){
                addClass( ev, this, 'mouse-out out' );
            });
        });

    }
    function getDirection(ev, obj) {
        var w = $(obj).width(),
            h = $(obj).height(),
            x = (ev.pageX - $(obj).offset().left - (w / 2)) * (w > h ? (h / w) : 1),
            y = (ev.pageY - $(obj).offset().top - (h / 2)) * (h > w ? (w / h) : 1),
            d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;
        return d;
    }
    function addClass( ev, obj, state ) {
        var direction = getDirection( ev, obj ),
            class_suffix = null;
        $(obj).removeAttr('class');
        switch ( direction ) {
            case 0 : class_suffix = '-top';    break;
            case 1 : class_suffix = '-right';  break;
            case 2 : class_suffix = '-bottom'; break;
            case 3 : class_suffix = '-left';   break;
        }
        $(obj).addClass( state + class_suffix );
    }
    $.fn.ctDeriction = function () {
    }
    $('.pxl-grid-direction .item-direction').ctDeriction();

    function pxlParticles(){
        /* Section Particles */
        setTimeout(function() {
            $(".pxl-row-particles").each(function() {
                particlesJS($(this).attr('id'), {
                    "particles": {
                        "number": {
                            "value": $(this).data('number'),
                        },
                        "color": {
                            "value": $(this).data('color')
                        },
                        "shape": {
                            "type": "circle",
                        },
                        "size": {
                            "value": $(this).data('size'),
                            "random": $(this).data('size-random'),
                        },
                        "line_linked": {
                            "enable": false,
                        },
                        "move": {
                            "enable": true,
                            "speed": 2,
                            "direction": $(this).data('move-direction'),
                            "random": true,
                            "out_mode": "out",
                        }
                    },
                    "retina_detect": true
                });
            });
        }, 400);
    }
    function pxl_split_text($scope){
        if( $scope.closest('.split-text-off-scroll').length > 0) return false;

        var st = $scope.find(".pxl-split-text");
        if(st.length == 0) return;

        gsap.registerPlugin(SplitText);
        
        st.each(function(index, el) {
           var els = $(el).find('p, a').length > 0 ? $(el).find('p, a')[0] : el;
            const pxl_split = new SplitText(els, { 
                type: "words, chars, lines", 
                wordsClass: "word",
                charsClass: "reveal-child"
            });
            
            var gradientChars = $scope.find( ".text-gradient > .word > *");

            var offset = 0;

            gradientChars.each( function(i, char) {
                const _char = $( char);
                const parent = _char.parent();

                _char.css("background-size", parent.outerWidth() + "px 100%");

                offset += _char.prev().outerWidth() || 0;

                _char.css("background-position", ( parent.outerWidth() - offset) + "px 0%");
            });

            var split_type_set = pxl_split.chars;
           
            gsap.set(els, { perspective: 400 });
 
            var settings = {
                scrollTrigger: {
                    trigger: els,
                    toggleActions: "play reverse play reverse", //play reset play reset 
                    start: "top 86%",
                },
                duration: 0.8, 
                stagger: 0.02,
                ease: "power3.out",
            };
            if( $(el).hasClass('split-in-fade') ){
                settings.opacity = 0;
            }
            if( $(el).hasClass('split-in-right') ){
                settings.opacity = 0;
                settings.x = "50";
            }
            if( $(el).hasClass('split-in-left') ){
                settings.opacity = 0;
                settings.x = "-50";
            }
            if( $(el).hasClass('split-in-up') ){
                settings.opacity = 0;
                settings.y = "80";
            }
            if( $(el).hasClass('split-in-down') ){
                settings.opacity = 0;
                settings.y = "-80";
            }
            if( $(el).hasClass('split-in-rotate') ){
                settings.opacity = 0;
                settings.rotateX = "50deg";
            }
            if( $(el).hasClass('split-in-scale') ){
                settings.opacity = 0;
                settings.scale = "0.5";
            }
 
            if( $(el).hasClass('split-lines-transform') ){
                pxl_split.split({
                    type:"lines",
                    lineThreshold: 0.5,
                    linesClass: "split-line"
                }); 
                split_type_set = pxl_split.lines;
                settings.opacity = 0;
                settings.yPercent = 100;
                settings.autoAlpha = 0;
                settings.stagger = 0.5;
            }
            if( $(el).hasClass('split-lines-rotation-x') ){
                pxl_split.split({
                    type:"lines",
                    lineThreshold: 0.5,
                    linesClass: "split-line"
                }); 
                split_type_set = pxl_split.lines;
                settings.opacity = 0;
                settings.rotationX = -120;
                settings.transformOrigin = "top center -50";
                settings.autoAlpha = 0;
                settings.stagger = 0.1;
            }
             
            if( $(el).hasClass('split-words-scale') ){
                pxl_split.split({type:"words"}); 
                split_type_set = pxl_split.words;
               
                $(split_type_set).each(function(index,elw) {
                    gsap.set(elw, {
                        opacity: 0,
                        scale:index % 2 == 0  ? 0 : 2,
                        force3D:true,
                        duration: 0.1,
                        ease: "power3.out",
                        stagger: 0.02,
                    },index * 0.01);
                });

                var pxl_anim = gsap.to(split_type_set, {
                    scrollTrigger: {
                        trigger: el,
                        toggleActions: "play reverse play reverse",
                        start: "top 86%",
                    },
                    rotateX: "0",
                    scale: 1,
                    opacity: 1,
                });
  
            }else{
                var pxl_anim = gsap.from(split_type_set, settings);
            }
             
            if( $(el).hasClass('hover-split-text') ){
                $(el).mouseenter(function(e) {
                    pxl_anim.restart();
                });
            }
        });
    }
    function pxl_custom_effect(){
        if( $(document).find('.pxl-overlap-in-left').length > 0 ){
            $('.pxl-overlap-in-left').each(function(index, el) {
                var $this = $(this);
                gsap.set($this[0], {
                    xPercent: -100,
                    duration: 2,
                    ease: "none",
                    stagger: 0.3,
                });
                var pxl_anim = gsap.to($this[0], {
                    scrollTrigger: {
                        trigger: $this[0],
                        toggleActions: "restart pause resume reverse",
                        start: "top 70%",
                    },
                    xPercent: 0,
                });
            });
        }
        if( $(document).find('.pxl-overlap-in-right').length > 0 ){
            $('.pxl-overlap-in-right').each(function(index, el) {
                var $this = $(this);
                gsap.set($this[0], {
                    xPercent: 100,
                    duration: 2,
                    ease: "Linear.easeNone",
                    stagger: 0.3,
                });
                var pxl_anim = gsap.to($this[0], {
                    scrollTrigger: {
                        trigger: $this[0],
                        toggleActions: "restart pause resume reverse",
                        start: "top 70%",
                    },
                    xPercent: 0,
                });
            });
        }
    }

    function tecko_scrolling_effect( $scope){

        var st = $scope.find( ".scrolling-effect");
  
        st.each( function(index, el) {        

            var settings = {
                scrollTrigger: {
                    trigger: el,    
                    markers: false, 
                    scrub: 3,         
                    toggleActions: "play none none reverse",
                    start: "30px bottom", 
                    end: "bottom bottom",
                    // delay: 3,
                },
                duration: 0.8, 
                ease: "power3.out",
            };

            if( $(el).hasClass('fade') ){
                settings.opacity = 0;
            }
            if( $(el).hasClass( 'fromRight') ){
                settings.opacity = 0;
                settings.x = "80";
            }
            if( $(el).hasClass( 'fromLeft') ){
                settings.opacity = 0;
                settings.x = "-80";
            }
            if( $(el).hasClass( 'fromBottom') ){
                settings.opacity = 0;
                settings.y = "100";
            }
            if( $(el).hasClass( 'fromTop') ){
                settings.opacity = 0;
                settings.y = "-80";
            }
            if( $(el).hasClass( 'zoomIn') ){
                settings.opacity = 0;
                settings.scale = 0.5;
            } 
            
            gsap.from( el, settings);
        });
           
    }
    function pxl_parallax_bg(){
        $(document).find('.pxl-parallax-background').parallaxBackground({
            event: 'mouse_move',
            animation_type: 'shift',
            animate_duration: 2
        });
        $(document).find('.pxl-pll-basic').parallaxBackground();
        $(document).find('.pxl-pll-rotate').parallaxBackground({
            animation_type: 'rotate',
            zoom: 50,
            rotate_perspective: 500
        });
        $(document).find('.pxl-pll-mouse-move').parallaxBackground({
            event: 'mouse_move',
            animation_type: 'shift',
            animate_duration: 2
        });
        $(document).find('.pxl-pll-mouse-move-rotate').parallaxBackground({
            event: 'mouse_move',
            animation_type: 'rotate',
            animate_duration: 1,
            zoom: 70,
            rotate_perspective: 1000
        });
    }

    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/global', Pxl_Global_Animation_Handler );
        pxlMouseDirection();
        pxlParticles();
        pxl_parallax_bg();
        pxl_custom_effect();
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_heading.default', function( $scope ) {
            pxl_split_text($scope);
        } );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_heading_v2.default', function( $scope ) {
            pxl_split_text($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_icon_list.default', function( $scope ) {
            tecko_scrolling_effect( $scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_team_grid.default', function( $scope ) {
            tecko_scrolling_effect( $scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_accordion.default', function( $scope ) {
            tecko_scrolling_effect( $scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_sub_heading.default', function( $scope ) {
            tecko_scrolling_effect( $scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_info_box.default', function( $scope ) {
            tecko_scrolling_effect( $scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_testimonial.default', function( $scope ) {
            tecko_scrolling_effect( $scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_fancy_box.default', function( $scope ) {
            tecko_scrolling_effect( $scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_post_list.default', function( $scope ) {
            tecko_scrolling_effect( $scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_image_v2.default', function( $scope ) {
            tecko_scrolling_effect( $scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_clients_carousel.default', function( $scope ) {
            tecko_scrolling_effect( $scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_service_list.default', function( $scope ) {
            tecko_scrolling_effect( $scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_career_list.default', function( $scope ) {
            tecko_scrolling_effect( $scope);
        } );
    } );
} )( jQuery );