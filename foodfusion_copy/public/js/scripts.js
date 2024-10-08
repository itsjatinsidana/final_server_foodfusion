//   all ------------------
function initRestabook() {
    "use strict";
    //   loader ------------------
    firstLoad();
    function firstLoad() {
        TweenMax.to($(".loader"), 1.5, {
            force3D: false,
            scale: "0",
            ease: Expo.easeInOut,
            onComplete: function () {
                $('.cd-loader-layer').addClass('closing');
                $("#main").animate({
                    opacity: 1
                }, 500);
                setTimeout(function () {
                    $(".loader-wrap").fadeOut(1);
                }, 1300);
            }
        });
    }
    //   Background image ------------------
    var a = $(".bg");
    a.each(function (a) {
        if ($(this).attr("data-bg")) $(this).css("background-image", "url(" + $(this).data("bg") + ")");
    });
    if ($(".header-cart_wrap_container").length > 0) {
        var aps = new PerfectScrollbar('.header-cart_wrap_container', {
            swipeEasing: true,
            minScrollbarLength: 20
        });
    }
    var wlwrp = $(".header-cart_wrap"),
        wllink = $(".sc_btn");
    function showCart() {
        wlwrp.fadeIn(1).addClass("vis-cart").removeClass("novis_cart")
        aps.update();
        wllink.addClass("scwllink");
    }
    function hideCart() {
        wlwrp.fadeOut(1).removeClass("vis-cart").addClass("novis_cart");
        wllink.removeClass("scwllink");
    }
    wllink.on("click", function () {
        if (wlwrp.hasClass("novis_cart")) showCart();
        else hideCart();
    });
    // collage image position ------------------
    $(".images-collage-item").each(function () {
        var tcp = $(this),
            dpl = tcp.data("position-left"),
            dpt = tcp.data("position-top"),
            dop = tcp.data("opacity"),
            dzi = tcp.data("zindex");
        tcp.css({
            "top": dpt + "%"
        });
        tcp.css({
            "z-index": dzi,
        });
        tcp.css({
            "left": dpl + "%",
        });
        tcp.css({
            "opacity": dop,
        });
    });
    //   Isotope------------------
    function initIsotope() {
        if ($(".gallery-items").length) {
            var $grid = $(".gallery-items").isotope({
                singleMode: true,
                columnWidth: ".grid-sizer, .grid-sizer-second, .grid-sizer-three",
                itemSelector: ".gallery-item, .gallery-item-second, .gallery-item-three",
                resizable: true,
                transformsEnabled: true,
                transitionDuration: "700ms"
            });
            $grid.imagesLoaded(function () {
                $grid.isotope("layout");
            });
            $(".gallery-filters").on("click", "a.gallery-filter", function (b) {
                b.preventDefault();
                var c = $(this).attr("data-filter");
                $grid.isotope({
                    filter: c
                });
                $(".gallery-filters a").removeClass("gallery-filter-active");
                $(this).addClass("gallery-filter-active");
            });
        }
    }
    initIsotope();
    //   lightGallery------------------
    $(".image-popup").lightGallery({
        selector: "this",
        cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
        download: false,
        counter: false
    });
    var o = $(".lightgallery"),
        p = o.data("looped");
    o.lightGallery({
        selector: ".lightgallery a.popup-image",
        cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
        download: false,
        loop: false,
        counter: false
    });
    //   appear------------------
    $(".stats").appear(function () {
        $(".num").countTo();
    });
    // Share   ------------------
    $(".sfcs").on("click", function () {
        $(this).toggleClass("vis-buts h");
        $(".fixed-scroll-column-share-container").slideToggle(400);
    });
    $(".share-container").share({
        networks: ['facebook', 'pinterest', 'tumblr', 'twitter', 'linkedin']
    });
    var shrcn = $(".share-wrapper"),
        clsh = $(".share-container a");
    function showShare() {
        TweenMax.to(shrcn, 0.6, {
            force3D: false,
            height: "110px",
            ease: Expo.easeInOut,
            onComplete: function () {

                clsh.each(function (a) {
                    var boi = $(this);
                    setTimeout(function () {
                        TweenMax.to(boi, 0.5, {
                            force3D: true,
                            opacity: "1",
                            top: "0"
                        });
                    }, 130 * a);
                });
            }
        });
        shrcn.removeClass("isShare");
        $(".showshare").addClass("vis-shar");
    }
    function hideShare() {
        TweenMax.to(clsh, 0.6, {
            force3D: true,
            opacity: "0",
            top: "-20px",
            onComplete: function () {
                TweenMax.to(shrcn, 0.5, {
                    force3D: false,
                    height: "0",
                    ease: Expo.easeInOut,
                });
            }
        });
        shrcn.addClass("isShare");
        $(".showshare").removeClass("vis-shar");
    }
    $(".showshare").on("click", function () {
        if ($(".share-wrapper").hasClass("isShare")) showShare();
        else hideShare();
    });
    function menuDotsdec() {
        var hmtp = $(".hmi-dec");
        hmtp.each(function (hmtp) {
            $(this).css({
                left: $(this).parent(".hero-menu-item-title").find("h6").width() + 40 + "px"
            });
        });
    }
    menuDotsdec();
    //   tabs------------------
    $(".tabs-menu a").on("click", function (a) {
        a.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var b = $(this).attr("href");
        $(this).parents(".tabs-act").find(".tab-content").not(b).css("display", "none");
        $(b).fadeIn(1500);
        menuDotsdec();
    });
    // scroll animation ------------------
    $(window).on("scroll", function (a) {
        if ($(this).scrollTop() > 150) {
            $(".to-top").fadeIn(500);
        } else {
            $(".to-top").fadeOut(500)
        }
    });
    //   scroll to------------------
    $(".custom-scroll-link").on("click", function () {
        var a = 20;
        if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") || location.hostname === this.hostname) {
            var b = $(this.hash);
            b = b.length ? b : $("[name=" + this.hash.slice(1) + "]");
            if (b.length) {
                $("html,body").animate({
                    scrollTop: b.offset().top - a
                }, {
                    queue: false,
                    duration: 1200,
                    easing: "easeInOutExpo"
                });
                return false;
            }
        }
    });
    $(".to-top").on("click", function (a) {
        a.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    //   menu tabs------------------
    var transitionLayer2 = $('.cd-tabs-layer'),
        transitionBackground2 = transitionLayer2.children(),
        frameProportion2 = 1.78,
        frames2 = transitionLayer2.data('frame'),
        resize2 = false;
    setLayerDimensions2();
    $(window).on('resize', function () {
        if (!resize2) {
            resize2 = true;
            (!window.requestAnimationFrame) ? setTimeout(setLayerDimensions2, 300): window.requestAnimationFrame(setLayerDimensions2);
        }
    });
    $(".change_bg a").on("click", function () {
        transitionLayer2.addClass('visible opening');
        setTimeout(function () {
            transitionLayer2.removeClass('opening');
        }, 500);
        setTimeout(function () {
            transitionLayer2.addClass('closing');
            transitionBackground2.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                transitionLayer2.removeClass('closing opening visible');
                transitionBackground2.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
            });
        }, 500);

        var bgt = $(this).data("bgtab");
        $(".bg_tabs").delay(600).queue(function (next) {
            $(this).css("background-image", "url(" + bgt + ")");
            next();
        });

    });
    function setLayerDimensions2() {
        var windowWidth = $(window).width(),
            windowHeight = $(window).height(),
            layerHeight, layerWidth;
        if (windowWidth / windowHeight > frameProportion2) {
            layerWidth = windowWidth;
            layerHeight = layerWidth / frameProportion2;
        } else {
            layerHeight = windowHeight * 1.2;
            layerWidth = layerHeight * frameProportion2;
        }
        transitionBackground2.css({
            'width': layerWidth * frames + 'px',
            'height': layerHeight + 'px',
        });
        resize2 = false;
    }
    //   slider / carousel ------------------
    function inintsingleSlider() {
        if ($(".single-slider").length > 0) {
            var j2 = new Swiper(".single-slider .swiper-container", {
                preloadImages: false,
                slidesPerView: 1,
                spaceBetween: 0,
                observer: true,
                observeParents: true,
                loop: true,
                autoHeight: true,
                grabCursor: true,
                mousewheel: false,
                pagination: {
                    el: '.ss-slider-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.ss-slider-cont-next',
                    prevEl: '.ss-slider-cont-prev',
                },
            });
        }
    }
    inintsingleSlider();
    if ($(".testimonilas-carousel").length > 0) {
        var j2 = new Swiper(".testimonilas-carousel .swiper-container", {
            preloadImages: false,
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            mousewheel: false,
            centeredSlides: true,
            pagination: {
                el: '.tc-pagination',
                clickable: true,

            },
            navigation: {
                nextEl: '.tc-button-next',
                prevEl: '.tc-button-prev',
            },
            breakpoints: {
                1064: {
                    slidesPerView: 2,
                },
                640: {
                    slidesPerView: 1,
                },
            }
        });
    }
    if ($(".product-slider").length > 0) {
        var j2 = new Swiper(".product-slider .swiper-container", {
            preloadImages: false,
            slidesPerView: 2,
            spaceBetween: 0,
            observer: true,
            observeParents: true,
            loop: true,
            autoHeight: true,
            grabCursor: true,
            mousewheel: false,
            pagination: {
                el: '.ss-slider-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.ss-slider-cont-next',
                prevEl: '.ss-slider-cont-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
            }
        });
    }
    if ($(".events-carousel").length > 0) {
        var j2 = new Swiper(".events-carousel .swiper-container", {
            preloadImages: false,
            slidesPerView: 2,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            mousewheel: false,
            centeredSlides: false,
            navigation: {
                nextEl: '.ec-button-next',
                prevEl: '.ec-button-prev',
            },
            breakpoints: {
                1064: {
                    slidesPerView: 2,
                },
                640: {
                    slidesPerView: 1,
                },
            }
        });
    }
    if ($(".multi-slideshow_fs").length > 0) {
        var ms1 = new Swiper(".multi-slideshow_fs .swiper-container", {
            preloadImages: false,
            loop: true,
            speed: 1400,
            spaceBetween: 0,
            effect: "fade",
            init: false,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
        });
        setTimeout(function () {
            ms1.init();
        }, 2000);
    }
    if ($(".fs-slider").length > 0) {
        var j3 = new Swiper(".fs-slider .swiper-container", {
            preloadImages: false,
            loop: true,
            grabCursor: true,
            speed: 2400,
            spaceBetween: 0,
            effect: "slide",
            mousewheel: false,
            parallax: true,


            init: false,
            pagination: {
                el: '.hero-slider-wrap_pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.fs-slider-button-next',
                prevEl: '.fs-slider-button-prev',
            },
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },

        });
        setTimeout(function () {
            j3.init();
        }, 1500);
        j3.on('slideChange', function () {
            $(".custom-scroll-link").on("click", function () {
                var a = 20;
                if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") || location.hostname === this.hostname) {
                    var b = $(this.hash);
                    b = b.length ? b : $("[name=" + this.hash.slice(1) + "]");
                    if (b.length) {
                        $("html,body").animate({
                            scrollTop: b.offset().top - a
                        }, {
                            queue: false,
                            duration: 1200,
                            easing: "easeInOutExpo"
                        });
                        return false;
                    }
                }
            });
        });
    }
    if ($(".grid-carousel ").length > 0) {
        var gridCarusel = new Swiper(".grid-carousel .swiper-container", {
            preloadImages: false,
            loop: true,
            centeredSlides: true,
            freeMode: false,
            slidesPerView: 3,
            spaceBetween: 0,
            grabCursor: true,
            mousewheel: false,
            parallax: true,
            speed: 1400,
            effect: "slide",
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },

            navigation: {
                nextEl: '.grc-carousel-button-next',
                prevEl: '.grc-carousel-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                640: {
                    slidesPerView: 1,
                },
            }
        });

    }
    //  cursor------------------
    $(".hero-wrap , .column-section , .parallax-section , .dark-bg , .cs-content-container , .column-wrap-bg").on({
        mouseenter: function () {
            $(".element-item").addClass("white_blur");
        },
        mouseleave: function () {
            $(".element-item").removeClass("white_blur");
        }
    });
    $("a , .btn ,   textarea,   input  , .show-reserv_button , .show-share-btn , .show-cart  , .close-reservation-modal ").on({
        mouseenter: function () {
            $(".element-item").addClass("elem_hover");
        },
        mouseleave: function () {
            $(".element-item").removeClass("elem_hover");
        }
    });
    $(".single-slider .swiper-slide , .product-slider .swiper-slide , .events-carousel .swiper-slide , .testimonilas-carousel .swiper-slide , .grid-carousel .swiper-slide , .fs-slider .swiper-slide ").on({
        mouseenter: function () {
            $(".element-item").addClass("slider_hover");
        },
        mouseleave: function () {
            $(".element-item").removeClass("slider_hover");
        }
    });
    $(".reserv-overlay").on({
        mouseenter: function () {
            $(".element-item").addClass("close-icon");
        },
        mouseleave: function () {
            $(".element-item").removeClass("close-icon");
        }
    });
    var mouse = {
        x: 0,
        y: 0
    };
    var pos = {
        x: 0,
        y: 0
    };
    var ratio = 0.15;
    var active = false;
    var ball = document.querySelector('.element-item');
    TweenLite.set(ball, {
        xPercent: -50,
        yPercent: -50
    });
    document.addEventListener("mousemove", mouseMove);
    function mouseMove(e) {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        mouse.x = e.pageX;
        mouse.y = e.pageY - scrollTop;
    }
    TweenMax.ticker.addEventListener("tick", updatePosition);
    function updatePosition() {
        if (!active) {
            pos.x += (mouse.x - pos.x) * ratio;
            pos.y += (mouse.y - pos.y) * ratio;
            TweenMax.set(ball, {
                x: pos.x,
                y: pos.y
            });
        }
    }
    $(".hero-menu-item").matchHeight({
        byRow: true,
    });
    function cardRaining() {
        $.fn.duplicate = function (a, b) {
            var c = [];
            for (var d = 0; d < a; d++) $.merge(c, this.clone(b).get());
            return this.pushStack(c);
        };
        var cr = $(".star-rating");
        cr.each(function (cr) {
            var starcount = $(this).attr("data-starrating");
            $("<i class='fas fa-star'></i>").duplicate(starcount).prependTo(this);
        });
    }
    cardRaining();
    $('#res_date').daterangepicker({
        autoUpdateInput: false,
        parentEl: $(".date-container2"),
        singleDatePicker: true,
        timePicker: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('#res_date').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY'));
    });
    $('#res_date').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
    $('.chosen-select').niceSelect();
    $(".shop-price").ionRangeSlider({
        keyboard: true,
        prefix: "$"
    });
    var transitionLayer3 = $('.cd-reserv-overlay-layer'),
        transitionBackground3 = transitionLayer3.children(),
        frameProportion3 = 1.78,
        frames3 = transitionLayer3.data('frame'),
        resize3 = false;
    setLayerDimensions3();
    $(window).on('resize', function () {
        if (!resize3) {
            resize3 = true;
            (!window.requestAnimationFrame) ? setTimeout(setLayerDimensions3, 300): window.requestAnimationFrame(setLayerDimensions3);
        }
    });
    function setLayerDimensions3() {
        var windowWidth = $(window).width(),
            windowHeight = $(window).height(),
            layerHeight, layerWidth;

        if (windowWidth / windowHeight > frameProportion3) {
            layerWidth = windowWidth;
            layerHeight = layerWidth / frameProportion3;
        } else {
            layerHeight = windowHeight * 1.2;
            layerWidth = layerHeight * frameProportion3;
        }

        transitionBackground3.css({
            'width': layerWidth * frames + 'px',
            'height': layerHeight + 'px',
        });

        resize2 = false;
    }
    function showResForm() {
        $(".reservation-modal-wrap").fadeIn(1);
        transitionLayer3.addClass('visible opening');
        $("html, body").addClass("hid-body");
        TweenMax.to($(".reservation-modal-container"), 0.8, {
            force3D: true,
            y: "0",
            opacity: "1",
            ease: Power2.easeOut,
        });
    }
    function hideResForm() {
        $("html, body").removeClass("hid-body");
        TweenMax.to($(".reservation-modal-container"), 0.6, {
            force3D: true,
            y: "50px",
            opacity: "0",
            ease: Power2.easeOut,
            onComplete: function () {
                transitionLayer3.addClass('closing');
                transitionBackground3.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                    transitionLayer3.removeClass('closing opening visible');
                    transitionBackground3.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
                    $(".reservation-modal-wrap").delay(100).fadeOut(400);
                });
            }
        });
    }
    $(".show-rb").on("click", function (e) {
        e.preventDefault();
        showResForm();
    });
    $(".crm").on("click", function () {
        hideResForm();
        setTimeout(function () {

            $('#reservationform')[0].reset();
            $("#reserv-message").slideUp(1500);
            $('.chosen-select').niceSelect('update');
        }, 1500);
    });
    //   Contact form------------------
    $(document).on('submit', '#contactform', function () {
        var a = $(this).attr("action");
        $("#message2").slideUp(750, function () {
            $("#message2").hide();
            $("#submit_cnt").attr("disabled", "disabled");
            $.post(a, {
                name: $("#name2").val(),
                email: $("#email2").val(),
                phone: $("#phone2").val(),
                subject: $("#subject2").val(),
                comments: $("#comments2").val()

            }, function (a) {
                document.getElementById("message2").innerHTML = a;
                $("#message2").slideDown("slow");
                $("#submit_cnt").removeAttr("disabled");
                if (null != a.match("success")) $("#contactform").slideDown("slow");
            });
        });
        return false;
    });
    $(document).on('keyup', '#contactform input, #contactform textarea', function () {
        $("#message2").slideUp(1500);
    });
    // reservation form------------------
    $(document).on('submit', '#reservationform', function () {
        var a = $(this).attr("action");
        $("#reserv-message").slideUp(750, function () {
            $("#reserv-message").hide();
            $.post(a, {
                name: $("#name").val(),
                email: $("#email").val(),
                phone: $("#phone").val(),
                numperson: $("#persons").val(),
                resdate: $("#res_date").val(),
                restime: $("#resrv-time").val(),
                comments: $("#comments").val()
            }, function (a) {
                document.getElementById("reserv-message").innerHTML = a;
                $("#reserv-message").slideDown("slow");

                if (null != a.match("success")) {
                    $("#reserv-message").slideDown("slow");
                }
            });
        });
        return false;
    });
    $("#reservationform input, #reservationform textarea ").keyup(function () {
        $("#reserv-message").slideUp(1500);
    });
    //   mailchimp------------------
    $("#subscribe").ajaxChimp({
        language: "eng",
        url: "https://gmail.us1.list-manage.com/subscribe/post?u=1fe818378d5c129b210719d80&amp;id=a2792f681b"
    });
    $.ajaxChimp.translations.eng = {
        submit: "Submitting...",
        0: '<i class="fa fa-check"></i> We will be in touch soon!',
        1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
        2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
    };
    function videoint() {
        //   Video------------------
        var v = $(".background-youtube-wrapper").data("vid");
        var f = $(".background-youtube-wrapper").data("mv");
        $(".background-youtube-wrapper").YTPlayer({
            fitToBackground: true,
            videoId: v,
            pauseOnScroll: true,
            mute: f,
            callback: function () {
                var a = $(".background-youtube-wrapper").data("ytPlayer").player;
            }
        });
        var w = $(".background-vimeo").data("vim"),
            bvc = $(".background-vimeo"),
            bvmc = $(".media-container"),
            bvfc = $(".background-vimeo iframe "),
            vch = $(".video-container");
        bvc.append('<iframe src="//player.vimeo.com/video/' + w + '?background=1"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>');
        $(".video-holder").height(bvmc.height());
        if ($(window).width() > 1024) {
            if ($(".video-holder").size() > 0)
                if (bvmc.height() / 9 * 16 > bvmc.width()) {
                    bvfc.height(bvmc.height()).width(bvmc.height() / 9 * 16);
                    bvfc.css({
                        "margin-left": -1 * $("iframe").width() / 2 + "px",
                        top: "-75px",
                        "margin-top": "0px"
                    });
                } else {
                    bvfc.width($(window).width()).height($(window).width() / 16 * 9);
                    bvfc.css({
                        "margin-left": -1 * $("iframe").width() / 2 + "px",
                        "margin-top": -1 * $("iframe").height() / 2 + "px",
                        top: "50%"
                    });
                }
        } else if ($(window).width() < 760) {
            $(".video-holder").height(bvmc.height());
            bvfc.height(bvmc.height());
        } else {
            $(".video-holder").height(bvmc.height());
            bvfc.height(bvmc.height());
        }
        vch.css("width", $(window).width() + "px");
        vch.css("height", Number(720 / 1280 * $(window).width()) + "px");
        if (vch.height() < $(window).height()) {
            vch.css("height", $(window).height() + "px");
            vch.css("width", Number(1280 / 720 * $(window).height()) + "px");
        }
    }
    videoint();
    function csselem() {
        $(".height-emulator").css({
            height: $(".fixed-footer").outerHeight(true)
        });
        $(".slideshow-container .slideshow-item").css({
            height: $(".slideshow-container").outerHeight(true)
        });
        $(".ms-item_fs").css({
            height: $(".multi-slideshow_fs").outerHeight(true)
        });
        $(".grid-carousel .swiper-slide").css({
            height: $(".grid-carousel").outerHeight(true)
        });
        $(".fs-slider-item").css({
            height: $(".fs-slider").outerHeight(true)
        });
    }
    csselem();
    // Mob Menu------------------
    $(".nav-button-wrap").on("click", function () {
        $(".main-menu").toggleClass("vismobmenu");
    });
    function mobMenuInit() {
        var ww = $(window).width();
        if (ww < 1048) {
            $(".menusb").remove();
            $(".main-menu").removeClass("nav-holder");
            $(".main-menu nav").clone().addClass("menusb").appendTo(".main-menu");
            $(".menusb").menu();
            $(".menusb.scroll-init a").on("click", function () {
                $(".main-menu").removeClass("vismobmenu");
            });
        } else {
            $(".menusb").remove();
            $(".main-menu").addClass("nav-holder");
        }
    }
    mobMenuInit();
    //   css ------------------
    var $window = $(window);
    $window.on("resize", function () {
        csselem();
        menuDotsdec();
        mobMenuInit();
    });
    $window.scroll(function () {
        if ($(this).scrollTop() > 150) {
            $("header.main-header").addClass("scroll-sticky");

        } else {
            $("header.main-header").removeClass("scroll-sticky");

        }
    });
    if ($(".fixed-bar").outerHeight(true) < $(".post-container").outerHeight(true)) {
        $(".fixed-bar").addClass("fixbar-action");
        $(".fixbar-action").scrollToFixed({
            minWidth: 1064,
            marginTop: function () {
                var a = $(window).height() - $(".fixed-bar").outerHeight(true) - 120;
                if (a >= 0) return 20;
                return a;
            },
            removeOffsets: true,
            limit: function () {
                var a = $(".limit-box").offset().top - $(".fixed-bar").outerHeight() + 30;
                return a;
            }
        });
    } else $(".fixed-bar").removeClass("fixbar-action");
    $(".gallery_filter-button").on("click", function () {
        $(".gth").slideToggle(400);
    });
    $(".scroll-init  ul").singlePageNav({
        filter: ":not(.external)",
        updateHash: false,
        offset: 80,
        threshold: 120,
        speed: 1200,
        currentClass: "act-scrlink"
    });
}
//   Parallax ------------------
function initparallax() {
    var a = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows();
        }
    };
    trueMobile = a.any();
    if (null === trueMobile) {
        var b = new Scrollax();
        b.reload();
        b.init();
    }
    if (trueMobile) $(".background-vimeo , .background-youtube-wrapper ").remove();
}
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
}); 
//   Init All ------------------
$(document).ready(function () {
    initRestabook();
    initparallax();
});