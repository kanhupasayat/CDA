! function(t) {
    "use strict";
    const i = function(i, s, e) {
        return this.$el = t(i), this.cb = s, this.offset = e, this.previousIsInState = !1, this.check(), this.watch(), this
    };
    i.prototype = {
        isIn: function() {
            const i = t(window),
                s = this.$el.offset().top - this.offset,
                e = s + this.$el.outerHeight(),
                n = i.scrollTop(),
                o = n + i.height();
            return e > n && s < o
        },
        watch: function() {
            t(window).on("resize scroll", this.check.bind(this))
        },
        check: function() {
            const t = this;
            t.isIn() && !1 === t.previousIsInState && (t.cb.call(t.$el, "entered"), t.previousIsInState = !0), !0 !== t.previousIsInState || t.isIn() || (t.cb.call(t.$el, "leaved"), t.previousIsInState = !1)
        }
    }, t.fn.isInViewport = function(s, e) {
        return e || (e = 0), this.each(function() {
            const n = t(this);
            n.data("isInViewport") || n.data("isInViewport", new i(this, s, e))
        })
    }
}(window.jQuery);