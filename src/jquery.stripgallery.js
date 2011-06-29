(function($) {
    $.fn.stripgallery = function(options) {
        var opts = $.extend({}, $.fn.stripgallery.defaults, options);
        return this.each(function(){
            var $this = $(this);

            var imgs = $(opts.imgclass + ' > img', $this);
            var imgcount = imgs.length;
            var imgwidth = imgs.width();
            var imgheight = imgs.height();

            $this.width(imgwidth * (imgcount + 1));

            $this.hover(function(){
                $this.pause();
            },
            function(){
                $this.resume();
            });

            start($this, opts);
        })
    }

    $.fn.stripgallery.defaults = {
        duration: 2000,
        imgclass: '.strip_img'
    };

    function start(gallery, opts) {
        var strip_imgs = $(opts.imgclass, gallery);
        var first = strip_imgs.eq(0).clone();
        gallery.append(first);

        var margin = gallery.css('margin-left').replace('px','');
        var speed = 400*5 + margin*5;

        gallery.animate({
            marginLeft: -400
        },
        {
            duration: speed,
            easing: 'linear',
            complete: function() {
                phase2(gallery, strip_imgs, opts);
            }
        });
    }

    function phase2(gallery, strip_imgs, opts){
        gallery.css('margin-left', 0);
        strip_imgs.eq(0).remove();
        gallery.queue(start(gallery, opts));
    }
})(jQuery);