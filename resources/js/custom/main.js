(function ($) {
    var COMMON = {
        init: function () {
            this.cacheDOM();

            $(window).on('resize', this.reCalcOnResize.bind(this))
        },
        cacheDOM: function () {
            this.$body = $('body');
            this.windowWidth = $(window).width();
        },
        reCalcOnResize: function () {
            this.windowWidth = $(window).width();
        }
    };

    var mainNavigation = {
        init: function(){
            this.$body = $('body');
            this.$mainNav = this.$body.find('.main-navigation');
            this.$menuContainer = this.$mainNav.find('.menu-primary-menu-container');
            this.$menuToggler = this.$mainNav.find('.menu-toggle');

            this.$menuToggler.on('click',this.toggleMenu.bind(this));
            this.$menuContainer.find('.sub-menu-toggle').on('click',function(e){
                $el = $(e.currentTarget);
                $el.toggleClass('sub-menu-shown');
                $el.parent().find('> .sub-menu').slideToggle();
            });
            this.$body.on('click',this.closeMenu.bind(this))
        },
        toggleMenu: function(e){
            $el = $(e.currentTarget);
            this.$menuToggler.toggleClass('active');
            this.$menuContainer.toggleClass('show-menu');
        },
        closeMenu: function(e){
            $el = $(e.currentTarget);
            $clickedElement = $(e.target);
            $foundElement = this.$mainNav.find($clickedElement);
            if( $foundElement !== undefined && $foundElement.length > 0 ){
                return false;
            }

            this.$menuToggler.removeClass('active');
            this.$menuContainer.removeClass('show-menu');
        }
    };

    SITE_NM_PLACEHOLDER = {
        common: {
            init: function () {
                console.log('start of page document ready');
                COMMON.init();
                mainNavigation.init();
            },
            finalize: function () {
                console.log('at the end of document ready');
            }
        },
        'home': {
            init: function () {
                console.log('test');
            }
        },
        'page-template-about':{
            init: function(){
                CM_JS_UTIL.fire('page-template-about', 'slider');
            },
            slider: function () {
                console.log('about slider page js');
            }
        }
    };

    //common UTIL this doesn't change
    CM_JS_UTIL = {

        fire: function (func, funcname, args) {
            var namespace = SITE_NM_PLACEHOLDER; // indicate your obj literal namespace here for standard lets make it abbreviation of current project

            funcname = (funcname === undefined) ? 'init' : funcname;
            if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
                namespace[func][funcname](args);
            }

        },

        loadEvents: function () {

            var bodyId = document.body.id;

            // hit up common first.
            CM_JS_UTIL.fire('common');

            // do all the classes too.
            $.each(document.body.className.split(/\s+/), function (i, classnm) {
                CM_JS_UTIL.fire(classnm);
                CM_JS_UTIL.fire(classnm, bodyId);
            });

            CM_JS_UTIL.fire('common', 'finalize');

        }
    };

    $(function () {
        CM_JS_UTIL.loadEvents();
    });
})(jQuery);