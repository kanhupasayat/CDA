/** * jQuery Line Progressbar * Author: Sharifur Rahman * Author URI : https:devrobin.com * Version: 1.0.0 */ ;
(function($) {
    'use strict';
    $.fn.rProgressbar = function(options) {
        options = $.extend({
                percentage: null,
                ShowProgressCount: true,
                duration: 1000,
                backgroundColor: 'none',
                borderRadius: '5px',
                width: '100%',
                height: '10px',
                overflow: 'visible',
            },

            options);

        $.options = options;
        return this.each(function(index, el) {
            $(el).html('<div class="progressbar"><div class="proggress"> <div class="indicator"></div></div></div><div class="percentCount"></div>');
            var lineProgressBarInit = function() {
                var progressFill = $(el).find('.proggress');
                var proggressIndicator = $(el).find('.indicator');
                var progressBar = $(el).find('.progressbar');
                progressFill.css({
                    backgroundColor: options.fillBackgroundColor,
                    height: options.height,
                    borderRadius: options.borderRadius
                });
                progressBar.css({
                    width: options.width,
                    backgroundColor: options.backgroundColor,
                    borderRadius: options.borderRadius
                });
                proggressIndicator.css({
                    overflow: options.overflow
                });
                progressFill.animate({
                    width: options.percentage + "%"
                }, {
                    step: function(x) {
                        if (options.ShowProgressCount) {
                            $(el).find(".percentCount").text(Math.round(x) + "%");
                        }
                    },
                    duration: options.duration
                });
                // proggressIndicator.animate( { step: function(x) { if (options.ShowProgressCount) { $(el).find(".percentCount").text(Math.round(x) + "%"); } } });
            }
            $(this).waypoint(lineProgressBarInit, {
                offset: '100%',
                triggerOnce: true
            });
        });
    }
    $('.progressbar-one').rProgressbar({
        percentage: 80,
    });
    $('.progressbar-two').rProgressbar({
        percentage: 90,
    });

    $('.progressbar-three').rProgressbar({
        percentage: 70,
    });
    $('.progressbar-four').rProgressbar({
        percentage: 85,
    });
    $('.progressbar-five').rProgressbar({
        percentage: 70,
    });
})(jQuery);