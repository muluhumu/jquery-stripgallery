(function($) {
    $.fn.stripgallery = function(options) {
        var opts = $.extend({}, $.fn.stripgallery.defaults, options);
        return this.each(function(){
            var $this = $(this);

            var $imgs = $('.strip_img > img', $this);
            var imgcount = $imgs.length;
            var imgwidth = $imgs.width();
            var imgheight = $imgs.height();

            $this.width(imgwidth * (imgcount + 1));

            start($this);
        })
    }

    $.fn.stripgallery.defaults = {
        duration: 1000
    };

    function start($gallery) {
        var first = $('.strip_img', $gallery).eq(0).clone();
        $gallery.append(first);

        $gallery.animate({
            marginLeft: '-=400'
        },
        {
            duration: 7000,
            easing: 'linear',
            complete: function() {
                $gallery.css('margin-left', 0);
                $('.strip_img', $gallery).eq(0).remove();
                $gallery.queue(start($gallery));
            }
        });
    }
})(jQuery);