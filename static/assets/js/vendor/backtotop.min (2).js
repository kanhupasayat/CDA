! function(o) {
    "use strict";
    o(document).ready(function() {
        function t() {
            var t = o(window).scrollTop(),
                e = o(document).height() - o(window).height();
            r.style.strokeDashoffset = n - t * n / e
        }
        var r = document.querySelector(".rn-progress-parent path"),
            n = r.getTotalLength();
        r.style.transition = r.style.WebkitTransition = "none", r.style.strokeDasharray = n + " " + n, r.style.strokeDashoffset = n, r.getBoundingClientRect(), r.style.transition = r.style.WebkitTransition = "stroke-dashoffset 10ms linear", t(), o(window).scroll(t);
        jQuery(window).on("scroll", function() {
            50 < jQuery(this).scrollTop() ? jQuery(".rn-progress-parent").addClass("rn-backto-top-active") : jQuery(".rn-progress-parent").removeClass("rn-backto-top-active")
        }), jQuery(".rn-progress-parent").on("click", function(t) {
            return t.preventDefault(), jQuery("html, body").animate({
                scrollTop: 0
            }, 550), !1
        })
    })
}(jQuery);