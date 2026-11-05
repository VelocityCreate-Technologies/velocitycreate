;(function ($) {

    "use strict";

    var scroll_top, header_height = 84, header_top_height, scroll_pos = 0, wp_admin_bar = 0, header_offset, backToTop = $(".tecko-scroll-top"), relative = $('.tecko-scroll-top.relative'), relativeTop = 0, relativeHeight = 0;

    var window_height;
    var window_width;
    var scroll_status = '';
    var lastScrollTop = 0;

    $( document ).ready( function() {

        window_height = $(window).height();

        if( relative.length > 0){
            relativeTop = $('.tecko-scroll-top.relative').offset().top;
            relativeHeight = $('.tecko-scroll-top.relative').outerHeight();
        }
        
        tecko_open_menu_toggle();
        tecko_cart_toggle();
        tecko_panel_anchor_toggle();
    
        tecko_document_click();
        tecko_scroll_to_top();

        //* For Element
        tecko_element_parallax();
        tecko_fancyBoxAccordion();
        tecko_svgDrawing();
        initAddToCart();

        //* For Shop
        tecko_shop_view_layout();
        // tecko_wc_single_product_gallery();
        tecko_quantity_plus_minus();
        tecko_quantity_plus_minus_action();
        tecko_table_cart_content();
        tecko_table_move_column('.woocommerce-cart-form__contents', '.woocommerce-cart-form__cart-item' ,0, 5, '', '.product-subtotal', '');

        tecko_update_cart_quantity();

        // new 
        
        header_offset = $( '.pxl-header').offset();

        tecko_get_admin_bar_height();

        tecko_header_height();

        $( 'body').css( 'opacity', 1);

        tecko_button();

        tecko_mobile_menu();
        
        tecko_smother_scroll();

        tecko_header_sticky();

        tecko_one_page_scroll();
    });

    $( window).on( 'resize', function () {

        tecko_get_admin_bar_height();

        tecko_header_height();
    });

    var getSamePageAnchor = ( link) => {

        const location = window.location;

        const $link = $(link);

        if (
            $link.prop('protocol') !== location.protocol ||
            $link.prop('host') !== location.host ||
            $link.prop('pathname') !== location.pathname ||
            $link.prop('search') !== location.search
        ) {
            return false;
        }

        return $link.prop('hash');
    }


    var scrollToHash = ( _offset, hash, e) => {

        const $elem = hash ? $(hash) : null;

        if ($elem && $elem.length) {

            if (e) e.preventDefault();

            gsap.to( window, { scrollTo: { y: $elem.offset().top, offsetY: _offset} });

        }
    }

    var tecko_one_page_scroll = () =>{

        var _offset = 0;
        
        $( 'a').on('click', function (e) {

            const hash = getSamePageAnchor(this);

            _offset = $( this).data( 'onepage-offset') ? $( this).data( 'onepage-offset') : 0;
    
            scrollToHash( _offset, hash, e);
        });
    }

    var tecko_smother_scroll = () => {

        if( $( 'body').hasClass( 'tecko-smooth-scroll')){

            gsap.registerPlugin( ScrollTrigger, ScrollSmoother);

            ScrollSmoother.create({
              smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
              effects: true, // looks for data-speed and data-lag attributes on elements
              smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
            });
        }   
    }

    var initAddToCart = function() {  
       
        $( 'body' ).on( 'click', '.single_add_to_cart_button.ajax_add_to_cart', function(e) {

            e.preventDefault();

            var _this = $( this ),
                _form = _this.parents( 'form' ),
                data = {},
                p_id = _form.find( '[name=add-to-cart]' ).val(),
                variation_id = _form.find( 'input[name=variation_id]' ).val(),
                quantity = _form.find( '.qty[name=quantity]' ).val();

            data.action = 'tecko_wc_add_to_cart';

            _form.serializeArray().map( function( attr ) {
                if ( attr.name !== 'add-to-cart' ) {
                    if ( attr.name.endsWith( '[]' ) ) {
                        let name = attr.name.substring( 0, attr.name.length - 2 );
                        if ( ! (
                            name in data
                        ) ) {
                            data[name] = [];
                        }
                        data[name].push( attr.value );
                    } else {
                        data[attr.name] = attr.value;
                    }
                }
            } );

            data.product_id = p_id;

            data.quantity = quantity;

            data.variation_id = variation_id;

            data.ajax_nonce = main_data.nonce;

            $.ajax({
                type: 'POST',
                url: main_data.ajaxurl,      
                data: data,    
                beforeSend: function() {
                    _this.addClass('loading');
                },
                success:function( response) {
  
                    $( document.body ).trigger( 'added_to_cart', [ response.fragments, response.cart_hash, _this ] );
   
                    _this.removeClass('loading');  
                        
                }
            });
        });
    }

    $.fn.teckoShowMagnificPopup = function () {
        $.magnificPopup.open({
            items: {
                src: $( this)
            },
            type: 'inline',
            removalDelay: 500, //delay removal by X to allow out-animation
            tClose: 'Close',
            callbacks: {
                beforeOpen: function () {
                    this.st.mainClass ='mfp-move-horizontal';
                    $( 'html').addClass( 'mfp-is-open');
                },
                open: function () {
                    // Will fire when this exact popup is opened
                    // this - is Magnific Popup object
                },
                close: function () {
                    $( 'html').removeClass( 'mfp-is-open');
                }
                // e.t.c.
            },
            closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pxli-close"></i></button>'
        });
    };

    $( window).on('scroll', function () {

        scroll_top = $(window).scrollTop();

        window_height = $(window).height();

        tecko_scroll_to_top();

        tecko_header_sticky();

    });

    // new

    var tecko_get_admin_bar_height = () =>{

        if( $( '#wpadminbar').length > 0){
            wp_admin_bar = $( '#wpadminbar').outerHeight();
        }        

        $( 'body').css( { '--admin-bar-height': wp_admin_bar+'px'});
    }

    var tecko_button = () =>{
        $( '.tecko-button').each( function(){
            var button_width = $( this).outerWidth();
            $( this).css( '--tecko-button-width', button_width+'px');
        });
        $( '.tecko-button')
        .on('mouseenter', function(e) {
                var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
                $(this).find('span').css({top:relY, left:relX})
        })
        .on('mouseout', function(e) {
                var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({top:relY, left:relX})
        });
    }
    $( window ).on( 'elementor/frontend/init', function() {
        // Swipers
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_button.default', tecko_button );        
    } );

    // new

    var tecko_header_height = () =>{

        if( $( '#pxl-header').length > 0){
            header_height = $( '#pxl-header').outerHeight();
        }

        if( $( '.tecko-site-header-sticky').length > 0){

            var header_stiky_height = $( '.tecko-site-header-sticky').outerHeight();

            $( '.tecko-site-header-sticky').css( { '--tecko-header-height': ( header_stiky_height)+'px'})
        }
        header_top_height = $( '.pxl-header-top').outerHeight();
  
        $( 'body').css( { '--tecko-header-height': ( header_height)+'px', '--tecko-header-top-height': ( header_top_height)+'px', }); 
    }

    // new
    function tecko_header_sticky() {

        if( $( '.tecko-header-sticky').hasClass( 'action-scroll-up')){

            if( scroll_pos > scroll_top && header_height * 5 <= scroll_top){  

                $( '.tecko-header-sticky').addClass( 'is-sticky');           

            }else{

                $( '.tecko-header-sticky').removeClass( 'is-sticky');

            }
      
            scroll_pos = scroll_top;

        }else if( $( '.tecko-header-sticky').hasClass( 'action-scroll-down')){
            
            if( scroll_pos < scroll_top && header_height * 5 <= scroll_top){  

                $( '.tecko-header-sticky').addClass( 'is-sticky');           

            }else{

                $( '.tecko-header-sticky').removeClass( 'is-sticky');

            }

            scroll_pos = scroll_top;
        }else{

            if( header_height * 5 <= scroll_top){  

                $( '.tecko-header-sticky').addClass( 'is-sticky');           

            }else{

                $( '.tecko-header-sticky').removeClass( 'is-sticky');

            }
        }
    }

    function tecko_open_menu_toggle(){
        'use strict';
        //* Add toggle button to parent Menu
        $('.sub-menu .current-menu-item').parents('.menu-item-has-children').addClass('current-menu-ancestor');
        $('.is-arrow .pxl-primary-menu > li.menu-item-has-children').append('<span class="main-menu-toggle"></span>');
        $('.pxl-mobile-menu li.menu-item-has-children').append('<span class="main-menu-toggle"></span>');
        $('.main-menu-toggle').on('click', function () {
            $(this).toggleClass('open');
            $(this).parent().find('> .sub-menu').toggleClass('submenu-open');
            $(this).parent().find('> .sub-menu').slideToggle();
        });

        //* Menu Dropdown
        var $menu = $('.pxl-main-navigation');
        $menu.find('.pxl-primary-menu li').each(function () {
            var $submenu = $(this).find('> ul.sub-menu');
            if ($submenu.length == 1) {
                $(this).hover(function () {
                    if ($submenu.offset().left + $submenu.width() > $(window).width()) {
                        $submenu.addClass('back');
                    } else if ($submenu.offset().left < 0) {
                        $submenu.addClass('back');
                    }
                }, function () {
                    $submenu.removeClass('back');
                });
            }
        });
    }
    function tecko_mobile_menu(){
        
        if( $( '.tecko-mobile-menu').hasClass( 'default')){

            $( '.tecko-mobile-menu li.menu-item-has-children').append( '<span class="holder"></span>' );


            $( document).on('click','.holder',function() {
                var el = $( this ).closest( 'li' );
                if ( el.hasClass( 'open' ) ) {
                    el.removeClass( 'open' );
                    el.find( 'li' ).removeClass( 'open' );
                    el.find( 'ul' ).slideUp();
                } else {
                    el.addClass( 'open' );
                    el.children( 'ul' ).slideDown();
                    el.siblings( 'li' ).children( 'ul' ).slideUp();
                    el.siblings( 'li' ).removeClass( 'open' );
                    el.siblings( 'li' ).find( 'li' ).removeClass( 'open' );
                    el.siblings( 'li' ).find( 'ul' ).slideUp();
                }
            });
        }
    }

    function tecko_panel_anchor_toggle(){
        'use strict';
        $(document).on('click','.pxl-anchor.side-panel',function(e){

            e.preventDefault();

            e.stopPropagation();

            var target = $(this).attr('data-target');
     
            $( target).teckoShowMagnificPopup();
        });
    }
    function tecko_cart_toggle(){
        'use strict';
        $(document).on('click','.pxl-cart.side-panel',function(e){
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-target');
            $(this).toggleClass('cliked');
            $(target).toggleClass('open');
            $('body').toggleClass('side-panel-open');
            setTimeout(function(){
                $('.pxl-search-form input[name="s"]').focus();
            },1000);
        });
    }

    function tecko_document_click(){
        $(document).on('click',function (e) {
            var target = $(e.target);
            var check = '.btn-nav-mobile';

            if (!(target.is(check)) && target.closest('.pxl-hidden-template').length <= 0 && $('body').hasClass('side-panel-open')) {
                $('.btn-nav-mobile').removeClass('cliked');
                $('.pxl-hidden-template').removeClass('open');
                $('body').removeClass('side-panel-open');
            }
        });
        $(document).on('click','.pxl-close',function(e){
            e.preventDefault();
            e.stopPropagation();
            $(this).closest('.pxl-hidden-template').toggleClass('open');
            $('.btn-nav-mobile').removeClass('cliked');
            $('body').toggleClass('side-panel-open');
        });
    }

    //* Scroll To Top
    function tecko_scroll_to_top() {

        if( backToTop.hasClass( 'fixed')){

            if ( scroll_top > window_height) {

                $('.tecko-scroll-top').addClass('on').removeClass('off');
                // console.log( relativeTop);
                // if ( scroll_top + window_height <= relativeTop - relativeHeight) {

                //     $('.tecko-scroll-top').addClass('off').removeClass('on');      

                // } else {
        
                //     $('.tecko-scroll-top').addClass('on').removeClass('off');
                // }
            } else {

                $('.tecko-scroll-top').addClass('off').removeClass('on');
        
            }
        }

        $('.tecko-scroll-top').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('html, body').stop().animate({ scrollTop: 0}, 800);
        });
    }

    //* Video Popup
    function tecko_magnific_popup() {
        $('a.video-play-button').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
        /* Images Light Box - Gallery:True */
        $('.images-light-box').each(function () {
            $(this).magnificPopup({
                delegate: 'a.light-box',
                type: 'image',
                gallery: {
                    enabled: true
                },
                mainClass: 'mfp-fade',
            });
        });
    }
    // Element Parallax
    function tecko_element_parallax() {
        let delSections = document.querySelectorAll(".pxl-element-parallax");
        delSections.forEach(section => {
            var el_data = section.getAttribute('data-parallax');
            var el_data_obj = JSON.parse(el_data);
            let imageAnim = gsap.to(section.querySelector("img"), {
                x: el_data_obj.x,
                y: el_data_obj.y,
                ease: "none",
                paused: true
            });
            let progressTo = gsap.quickTo(imageAnim, "progress", {ease: "ease-out", duration: parseFloat(section.dataset.scrub) || 0.2});

            gsap.to(section.querySelector(".elementor-widget-container"), {
                x: "0",
                y: "0",
                ease: "none",
                scrollTrigger: {
                    scrub: true,
                    trigger: section,
                    onUpdate: self => progressTo(self.progress)
                }
            });
        });
    }
    // FancyBox Accordion
    function tecko_fancyBoxAccordion() {
        var widgetList = jQuery('.pxl-fancy-box-accordion');
        if (!widgetList.length) {
            return;
        }
        widgetList.each(function () {
            var itemClass = '.box-item';
            jQuery(this)
                .find(itemClass + ':first-child')
                .addClass('active');
            jQuery(this)
                .find(itemClass)
                .on('mouseover', function () {
                    jQuery(this).addClass('active').siblings().removeClass('active');
                });
        });
    }

    // Svg Drawing
    function tecko_svgDrawing() {
        $(".svg-drawing").each(function(){
            var $selector = jQuery(this);
            $(window).scroll(function() {
                var hT = $selector.offset().top,
                    wH = $(window).height(),
                    wS = $(this).scrollTop();
                if (wS > (hT-wH)){
                    $selector.addClass('dr-start');
                }
            });

        });
    }

    function tecko_shop_view_layout(){

        $(document).on('click','.pxl-view-layout .view-icon a', function(e){
            e.preventDefault();
            if(!$(this).parent('li').hasClass('active')){
                $('.pxl-view-layout .view-icon').removeClass('active');
                $(this).parent('li').addClass('active');
                $(this).parents('.pxl-content-area').find('.products').removeAttr('class').addClass($(this).attr('data-cls'));
            }
        });
    }

    function tecko_quantity_plus_minus(){
        "use strict";
        $( ".quantity input" ).wrap( "<div class='pxl-quantity'></div>" );
        $('<span class="quantity-button quantity-down"></span>').insertBefore('.quantity input');
        $('<span class="quantity-button quantity-up"></span>').insertAfter('.quantity input');
        // contact form 7 input number
        $('<span class="pxl-input-number-spin"><span class="pxl-input-number-spin-inner pxl-input-number-spin-up"></span><span class="pxl-input-number-spin-inner pxl-input-number-spin-down"></span></span>').insertAfter('.wpcf7-form-control-wrap input[type="number"]');
    }
    function tecko_ajax_quantity_plus_minus(){
        "use strict";
        $('<span class="quantity-button quantity-down"></span>').insertBefore('.quantity input');
        $('<span class="quantity-button quantity-up"></span>').insertAfter('.quantity input');
    }
    function tecko_quantity_plus_minus_action(){
        "use strict";
        $(document).on('click','.quantity .quantity-button',function () {
            var $this = $(this),
                spinner = $this.closest('.quantity'),
                input = spinner.find('input[type="number"]'),
                step = input.attr('step'),
                min = input.attr('min'),
                max = input.attr('max'),value = parseInt(input.val());
            if(!value) value = 0;
            if(!step) step=1;
            step = parseInt(step);
            if (!min) min = 0;
            var type = $this.hasClass('quantity-up') ? 'up' : 'down' ;
            switch (type)
            {
                case 'up':
                    if(!(max && value >= max))
                        input.val(value+step).change();
                    break;
                case 'down':
                    if (value > min)
                        input.val(value-step).change();
                    break;
            }
            if(max && (parseInt(input.val()) > max))
                input.val(max).change();
            if(parseInt(input.val()) < min)
                input.val(min).change();
        });
        $(document).on('click','.pxl-input-number-spin-inner',function () {
            var $this = $(this),
                spinner = $this.parents('.wpcf7-form-control-wrap'),
                input = spinner.find('input[type="number"]'),
                step = input.attr('step'),
                min = input.attr('min'),
                max = input.attr('max'),value = parseInt(input.val());
            if(!value) value = 0;
            if(!step) step=1;
            step = parseInt(step);
            if (!min) min = 0;
            var type = $this.hasClass('pxl-input-number-spin-up') ? 'up' : 'down' ;
            switch (type)
            {
                case 'up':
                    if(!(max && value >= max))
                        input.val(value+step).change();
                    break;
                case 'down':
                    if (value > min)
                        input.val(value-step).change();
                    break;
            }
            if(max && (parseInt(input.val()) > max))
                input.val(max).change();
            if(parseInt(input.val()) < min)
                input.val(min).change();
        });
    }
    function tecko_table_cart_content(){
        "use strict";
        var table = jQuery('.woocommerce-cart-form__contents'),
            table_head = table.find('thead');
        table_head.find('.product-remove').remove();
        table_head.find('.product-thumbnail').remove();
        table_head.find('.product-name').attr('colspan',2);
        table_head.find('tr').append('<th class="product-remove">&nbsp;</th>');
    }

    function tecko_table_move_column(table, selected ,from, to, remove, colspan, colspan_value) {
        "use strict";
        var rows = jQuery(selected, table);
        var cols;
        rows.each(function() {
            cols = jQuery(this).children('th, td');
            cols.eq(from).detach().insertAfter(cols.eq(to));
        });
        var rows_remove = jQuery(remove, table);
        rows_remove.each(function(){
            jQuery(this).remove(remove);
        });
        var colspan = jQuery(colspan, table);
        colspan.each(function(){
            jQuery(this).attr('colspan',colspan_value);
        });
    }
    $( document.body ).on( 'wc_fragments_loaded wc_fragments_refreshed', function() {

        tecko_quantity_plus_minus();

        $('body').removeClass('loading');
        
    });

    function tecko_update_cart_quantity(){   

        $('.cart-list-wrapper').on( 'change', '.qty', function() {
            
            var item_key = $( this ).attr( 'name' );
            var item_qty = $( this ).val(); 
          
            var data = {
                action: 'tecko_update_product_quantity',
                cart_item_key: item_key,
                cart_item_qty: item_qty,
                security: main_data.nonce,
            };
            $.ajax( {
                url: main_data.ajaxurl,
                type: 'POST',
                cache: false,
                dataType: 'json',
                data: data,
                success: function( response ) {  
                     
                    $( document.body ).trigger( 'wc_fragment_refresh' );
                },
                beforeSend: function() {
                    $('body').addClass('loading');
                }
            } );
        } );
    }
})(jQuery);