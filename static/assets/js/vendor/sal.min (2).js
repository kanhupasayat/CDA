! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.sal = t() : e.sal = t()
}(this, function() {
    return (() => {
        "use strict";
        var r = {
                d: (e, t) => {
                    for (var n in t) r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: t[n]
                    })
                },
                o: (e, t) => Object.prototype.hasOwnProperty.call(e, t)
            },
            e = {};

        function t(t, e) {
            var n, r = Object.keys(t);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })), r.push.apply(r, n)), r
        }

        function n(r) {
            for (var e = 1; e < arguments.length; e++) {
                var o = null != arguments[e] ? arguments[e] : {};
                e % 2 ? t(Object(o), !0).forEach(function(e) {
                    var t, n;
                    t = r, n = o[e = e], e in t ? Object.defineProperty(t, e, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[e] = n
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : t(Object(o)).forEach(function(e) {
                    Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e))
                })
            }
            return r
        }
        r.d(e, {
            default: () => O
        });

        function a(e, t) {
            e = new CustomEvent(e, {
                bubbles: !0,
                detail: t
            }), t.target.dispatchEvent(e)
        }

        function u() {
            l(), m()
        }

        function d() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            m(), Array.from(document.querySelectorAll(s.selector)).forEach(p), b(e), c()
        }

        function f() {
            var e = y();
            o.push(e)
        }
        var s = {
                root: null,
                rootMargin: "0% 50%",
                threshold: .5,
                animateClassName: "sal-animate",
                disabledClassName: "sal-disabled",
                enterEventName: "sal:in",
                exitEventName: "sal:out",
                selector: "[data-sal]",
                once: !0,
                disabled: !1
            },
            o = [],
            i = null,
            b = function(e) {
                e && e !== s && (s = n(n({}, s), e))
            },
            p = function(e) {
                e.classList.remove(s.animateClassName)
            },
            l = function() {
                document.body.classList.add(s.disabledClassName)
            },
            m = function() {
                i.disconnect(), i = null
            },
            v = function(e, o) {
                e.forEach(function(e) {
                    var t = e.target,
                        n = void 0 !== t.dataset.salRepeat,
                        r = void 0 !== t.dataset.salOnce,
                        n = n || !(r || s.once);
                    e.intersectionRatio >= s.threshold ? ((r = e).target.classList.add(s.animateClassName), a(s.enterEventName, r), n || o.unobserve(t)) : n && (p((r = e).target), a(s.exitEventName, r))
                })
            },
            y = function() {
                var e = [].filter.call(document.querySelectorAll(s.selector), function(e) {
                    return s.animateClassName, !e.classList.contains(s.animateClassName)
                });
                return e.forEach(function(e) {
                    return i.observe(e)
                }), e
            },
            c = function() {
                document.body.classList.remove(s.disabledClassName), i = new IntersectionObserver(v, {
                    root: s.root,
                    rootMargin: s.rootMargin,
                    threshold: s.threshold
                }), o = y()
            };
        const O = function() {
            if (b(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : s), "undefined" == typeof window) return console.warn("Sal was not initialised! Probably it is used in SSR."), {
                elements: o,
                disable: u,
                enable: c,
                reset: d,
                update: f
            };
            if (!window.IntersectionObserver) throw l(), Error("Your browser does not support IntersectionObserver!\nGet a polyfill from here:\nhttps://github.com/w3c/IntersectionObserver/tree/master/polyfill");
            return (s.disabled || "function" == typeof s.disabled && s.disabled() ? l : c)(), {
                elements: o,
                disable: u,
                enable: c,
                reset: d,
                update: f
            }
        };
        return e.default
    })()
});