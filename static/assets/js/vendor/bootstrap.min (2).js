! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).bootstrap = t()
}(this, function() {
    "use strict";
    const f = {
            find: (e, t = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(t, e)),
            findOne: (e, t = document.documentElement) => Element.prototype.querySelector.call(t, e),
            children: (e, t) => [].concat(...e.children).filter(e => e.matches(t)),
            parents(e, t) {
                const i = [];
                let s = e.parentNode;
                for (; s && s.nodeType === Node.ELEMENT_NODE && 3 !== s.nodeType;) s.matches(t) && i.push(s), s = s.parentNode;
                return i
            },
            prev(e, t) {
                let i = e.previousElementSibling;
                for (; i;) {
                    if (i.matches(t)) return [i];
                    i = i.previousElementSibling
                }
                return []
            },
            next(e, t) {
                let i = e.nextElementSibling;
                for (; i;) {
                    if (i.matches(t)) return [i];
                    i = i.nextElementSibling
                }
                return []
            }
        },
        l = e => {
            for (; e += Math.floor(1e6 * Math.random()), document.getElementById(e););
            return e
        },
        t = t => {
            let i = t.getAttribute("data-bs-target");
            if (!i || "#" === i) {
                let e = t.getAttribute("href");
                if (!e || !e.includes("#") && !e.startsWith(".")) return null;
                e.includes("#") && !e.startsWith("#") && (e = "#" + e.split("#")[1]), i = e && "#" !== e ? e.trim() : null
            }
            return i
        },
        a = e => {
            e = t(e);
            return e && document.querySelector(e) ? e : null
        },
        n = e => {
            e = t(e);
            return e ? document.querySelector(e) : null
        },
        c = e => {
            e.dispatchEvent(new Event("transitionend"))
        },
        h = e => !(!e || "object" != typeof e) && void 0 !== (e = void 0 !== e.jquery ? e[0] : e).nodeType,
        d = e => h(e) ? e.jquery ? e[0] : e : "string" == typeof e && 0 < e.length ? f.findOne(e) : null,
        i = (s, n, o) => {
            Object.keys(o).forEach(e => {
                var t = o[e],
                    i = n[e],
                    i = i && h(i) ? "element" : null == i ? "" + i : {}.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase();
                if (!new RegExp(t).test(i)) throw new TypeError(s.toUpperCase() + `: Option "${e}" provided type "${i}" but expected type "${t}".`)
            })
        },
        u = e => !(!h(e) || 0 === e.getClientRects().length) && "visible" === getComputedStyle(e).getPropertyValue("visibility"),
        p = e => !e || e.nodeType !== Node.ELEMENT_NODE || !!e.classList.contains("disabled") || (void 0 !== e.disabled ? e.disabled : e.hasAttribute("disabled") && "false" !== e.getAttribute("disabled")),
        m = e => {
            return document.documentElement.attachShadow ? "function" == typeof e.getRootNode ? (t = e.getRootNode()) instanceof ShadowRoot ? t : null : e instanceof ShadowRoot ? e : e.parentNode ? m(e.parentNode) : null : null;
            var t
        },
        g = () => {},
        _ = e => e.offsetHeight,
        v = () => {
            var e = window["jQuery"];
            return e && !document.body.hasAttribute("data-bs-no-jquery") ? e : null
        },
        y = [],
        s = () => "rtl" === document.documentElement.dir,
        e = s => {
            var e = () => {
                const e = v();
                if (e) {
                    const t = s.NAME,
                        i = e.fn[t];
                    e.fn[t] = s.jQueryInterface, e.fn[t].Constructor = s, e.fn[t].noConflict = () => (e.fn[t] = i, s.jQueryInterface)
                }
            };
            "loading" === document.readyState ? (y.length || document.addEventListener("DOMContentLoaded", () => {
                y.forEach(e => e())
            }), y.push(e)) : e()
        },
        w = e => {
            "function" == typeof e && e()
        },
        E = (i, n, e = !0) => {
            if (e) {
                e = (() => {
                    if (!n) return 0;
                    let {
                        transitionDuration: e,
                        transitionDelay: t
                    } = window.getComputedStyle(n);
                    var i = Number.parseFloat(e),
                        s = Number.parseFloat(t);
                    return i || s ? (e = e.split(",")[0], t = t.split(",")[0], 1e3 * (Number.parseFloat(e) + Number.parseFloat(t))) : 0
                })() + 5;
                let t = !1;
                const s = ({
                    target: e
                }) => {
                    e === n && (t = !0, n.removeEventListener("transitionend", s), w(i))
                };
                n.addEventListener("transitionend", s), setTimeout(() => {
                    t || c(n)
                }, e)
            } else w(i)
        },
        A = (e, t, i, s) => {
            let n = e.indexOf(t);
            if (-1 === n) return e[!i && s ? e.length - 1 : 0];
            t = e.length;
            return n += i ? 1 : -1, s && (n = (n + t) % t), e[Math.max(0, Math.min(n, t - 1))]
        },
        T = /[^.]*(?=\..*)\.|.*/,
        O = /\..*/,
        C = /::\d+$/,
        S = {};
    let I = 1;
    const N = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        },
        j = /^(mouseenter|mouseleave)/i,
        M = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

    function P(e, t) {
        return t && t + "::" + I++ || e.uidEvent || I++
    }

    function H(e) {
        var t = P(e);
        return e.uidEvent = t, S[t] = S[t] || {}, S[t]
    }

    function R(i, s, n = null) {
        var o = Object.keys(i);
        for (let e = 0, t = o.length; e < t; e++) {
            var r = i[o[e]];
            if (r.originalHandler === s && r.delegationSelector === n) return r
        }
        return null
    }

    function B(e, t, i) {
        var s = "string" == typeof t,
            i = s ? i : t;
        let n = z(e);
        return M.has(n) || (n = e), [s, i, n]
    }

    function W(e, t, i, s, h) {
        if ("string" == typeof t && e) {
            if (i || (i = s, s = null), j.test(t)) {
                const e = t => function(e) {
                    if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget)) return t.call(this, e)
                };
                s ? s = e(s) : i = e(i)
            }
            const [o, r, a] = B(t, i, s), m = H(e), g = m[a] || (m[a] = {}), l = R(g, r, o ? i : null);
            if (l) return l.oneOff = l.oneOff && h, 0;
            const _ = P(r, t.replace(T, "")),
                c = o ? (u = e, f = i, p = s, function i(s) {
                    var n = u.querySelectorAll(f);
                    for (let t = s["target"]; t && t !== this; t = t.parentNode)
                        for (let e = n.length; e--;)
                            if (n[e] === t) return s.delegateTarget = t, i.oneOff && b.off(u, s.type, f, p), p.apply(t, [s]);
                    return null
                }) : (n = e, d = i, function e(t) {
                    return t.delegateTarget = n, e.oneOff && b.off(n, t.type, d), d.apply(n, [t])
                });
            var n, d, u, f, p;
            c.delegationSelector = o ? i : null, c.originalHandler = r, c.oneOff = h, c.uidEvent = _, g[_] = c, e.addEventListener(a, c, o)
        }
    }

    function q(e, t, i, s, n) {
        s = R(t[i], s, n);
        s && (e.removeEventListener(i, s, Boolean(n)), delete t[i][s.uidEvent])
    }

    function z(e) {
        return e = e.replace(O, ""), N[e] || e
    }
    const b = {
            on(e, t, i, s) {
                W(e, t, i, s, !1)
            },
            one(e, t, i, s) {
                W(e, t, i, s, !0)
            },
            off(r, a, e, h) {
                if ("string" == typeof a && r) {
                    const [t, i, s] = B(a, e, h), n = s !== a, l = H(r), o = a.startsWith(".");
                    if (void 0 !== i) return l && l[s] ? void q(r, l, s, i, t ? e : null) : void 0;
                    o && Object.keys(l).forEach(e => {
                        {
                            var t = r,
                                i = l,
                                s = e,
                                n = a.slice(1);
                            const o = i[s] || {};
                            return void Object.keys(o).forEach(e => {
                                if (e.includes(n)) {
                                    const n = o[e];
                                    q(t, i, s, n.originalHandler, n.delegationSelector)
                                }
                            })
                        }
                    });
                    const c = l[s] || {};
                    Object.keys(c).forEach(e => {
                        var t = e.replace(C, "");
                        if (!n || a.includes(t)) {
                            const a = c[e];
                            q(r, l, s, a.originalHandler, a.delegationSelector)
                        }
                    })
                }
            },
            trigger(e, t, i) {
                if ("string" != typeof t || !e) return null;
                const s = v(),
                    n = z(t),
                    h = t !== n,
                    d = M.has(n);
                let o, r = !0,
                    a = !0,
                    l = !1,
                    c = null;
                return h && s && (o = s.Event(t, i), s(e).trigger(o), r = !o.isPropagationStopped(), a = !o.isImmediatePropagationStopped(), l = o.isDefaultPrevented()), d ? (c = document.createEvent("HTMLEvents"), c.initEvent(n, r, !0)) : c = new CustomEvent(t, {
                    bubbles: r,
                    cancelable: !0
                }), void 0 !== i && Object.keys(i).forEach(e => {
                    Object.defineProperty(c, e, {
                        get: () => i[e]
                    })
                }), l && c.preventDefault(), a && e.dispatchEvent(c), c.defaultPrevented && void 0 !== o && o.preventDefault(), c
            }
        },
        U = new Map;
    var F = function(e, t, i) {
            U.has(e) || U.set(e, new Map);
            const s = U.get(e);
            s.has(t) || 0 === s.size ? s.set(t, i) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`)
        },
        $ = (e, t) => U.has(e) && U.get(e).get(t) || null,
        V = function(e, t) {
            if (U.has(e)) {
                const i = U.get(e);
                i.delete(t), 0 === i.size && U.delete(e)
            }
        };
    class K {
        constructor(e) {
            (e = d(e)) && (this._element = e, F(this._element, this.constructor.DATA_KEY, this))
        }
        dispose() {
            V(this._element, this.constructor.DATA_KEY), b.off(this._element, this.constructor.EVENT_KEY), Object.getOwnPropertyNames(this).forEach(e => {
                this[e] = null
            })
        }
        _queueCallback(e, t, i = !0) {
            E(e, t, i)
        }
        static getInstance(e) {
            return $(e, this.DATA_KEY)
        }
        static getOrCreateInstance(e, t = {}) {
            return this.getInstance(e) || new this(e, "object" == typeof t ? t : null)
        }
        static get VERSION() {
            return "5.0.2"
        }
        static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!')
        }
        static get DATA_KEY() {
            return "bs." + this.NAME
        }
        static get EVENT_KEY() {
            return "." + this.DATA_KEY
        }
    }
    class X extends K {
        static get NAME() {
            return "alert"
        }
        close(e) {
            var e = e ? this._getRootElement(e) : this._element,
                t = this._triggerCloseEvent(e);
            null === t || t.defaultPrevented || this._removeElement(e)
        }
        _getRootElement(e) {
            return n(e) || e.closest(".alert")
        }
        _triggerCloseEvent(e) {
            return b.trigger(e, "close.bs.alert")
        }
        _removeElement(e) {
            e.classList.remove("show");
            var t = e.classList.contains("fade");
            this._queueCallback(() => this._destroyElement(e), e, t)
        }
        _destroyElement(e) {
            e.remove(), b.trigger(e, "closed.bs.alert")
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = X.getOrCreateInstance(this);
                "close" === t && e[t](this)
            })
        }
        static handleDismiss(t) {
            return function(e) {
                e && e.preventDefault(), t.close(this)
            }
        }
    }
    b.on(document, "click.bs.alert.data-api", '[data-bs-dismiss="alert"]', X.handleDismiss(new X)), e(X);
    class Y extends K {
        static get NAME() {
            return "button"
        }
        toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = Y.getOrCreateInstance(this);
                "toggle" === t && e[t]()
            })
        }
    }

    function Q(e) {
        return "true" === e || "false" !== e && (e === Number(e).toString() ? Number(e) : "" === e || "null" === e ? null : e)
    }

    function G(e) {
        return e.replace(/[A-Z]/g, e => "-" + e.toLowerCase())
    }
    b.on(document, "click.bs.button.data-api", '[data-bs-toggle="button"]', e => {
        e.preventDefault();
        e = e.target.closest('[data-bs-toggle="button"]');
        Y.getOrCreateInstance(e).toggle()
    }), e(Y);
    const o = {
            setDataAttribute(e, t, i) {
                e.setAttribute("data-bs-" + G(t), i)
            },
            removeDataAttribute(e, t) {
                e.removeAttribute("data-bs-" + G(t))
            },
            getDataAttributes(i) {
                if (!i) return {};
                const s = {};
                return Object.keys(i.dataset).filter(e => e.startsWith("bs")).forEach(e => {
                    let t = e.replace(/^bs/, "");
                    t = t.charAt(0).toLowerCase() + t.slice(1, t.length), s[t] = Q(i.dataset[e])
                }), s
            },
            getDataAttribute: (e, t) => Q(e.getAttribute("data-bs-" + G(t))),
            offset(e) {
                e = e.getBoundingClientRect();
                return {
                    top: e.top + document.body.scrollTop,
                    left: e.left + document.body.scrollLeft
                }
            },
            position: e => ({
                top: e.offsetTop,
                left: e.offsetLeft
            })
        },
        Z = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        J = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        ee = "next",
        te = "prev",
        ie = "left",
        se = "right",
        ne = {
            ArrowLeft: se,
            ArrowRight: ie
        };
    class oe extends K {
        constructor(e, t) {
            super(e), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(t), this._indicatorsElement = f.findOne(".carousel-indicators", this._element), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent), this._addEventListeners()
        }
        static get Default() {
            return Z
        }
        static get NAME() {
            return "carousel"
        }
        next() {
            this._slide(ee)
        }
        nextWhenVisible() {
            !document.hidden && u(this._element) && this.next()
        }
        prev() {
            this._slide(te)
        }
        pause(e) {
            e || (this._isPaused = !0), f.findOne(".carousel-item-next, .carousel-item-prev", this._element) && (c(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
        }
        cycle(e) {
            e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._updateInterval(), this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
        }
        to(e) {
            this._activeElement = f.findOne(".active.carousel-item", this._element);
            var t = this._getItemIndex(this._activeElement);
            if (!(e > this._items.length - 1 || e < 0))
                if (this._isSliding) b.one(this._element, "slid.bs.carousel", () => this.to(e));
                else {
                    if (t === e) return this.pause(), void this.cycle();
                    t = t < e ? ee : te;
                    this._slide(t, this._items[e])
                }
        }
        _getConfig(e) {
            return e = { ...Z,
                ...o.getDataAttributes(this._element),
                ..."object" == typeof e ? e : {}
            }, i("carousel", e, J), e
        }
        _handleSwipe() {
            var e = Math.abs(this.touchDeltaX);
            e <= 40 || (e = e / this.touchDeltaX, this.touchDeltaX = 0, e && this._slide(0 < e ? se : ie))
        }
        _addEventListeners() {
            this._config.keyboard && b.on(this._element, "keydown.bs.carousel", e => this._keydown(e)), "hover" === this._config.pause && (b.on(this._element, "mouseenter.bs.carousel", e => this.pause(e)), b.on(this._element, "mouseleave.bs.carousel", e => this.cycle(e))), this._config.touch && this._touchSupported && this._addTouchEventListeners()
        }
        _addTouchEventListeners() {
            const t = e => {
                    !this._pointerEvent || "pen" !== e.pointerType && "touch" !== e.pointerType ? this._pointerEvent || (this.touchStartX = e.touches[0].clientX) : this.touchStartX = e.clientX
                },
                i = e => {
                    this.touchDeltaX = e.touches && 1 < e.touches.length ? 0 : e.touches[0].clientX - this.touchStartX
                },
                s = e => {
                    !this._pointerEvent || "pen" !== e.pointerType && "touch" !== e.pointerType || (this.touchDeltaX = e.clientX - this.touchStartX), this._handleSwipe(), "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(e => this.cycle(e), 500 + this._config.interval))
                };
            f.find(".carousel-item img", this._element).forEach(e => {
                b.on(e, "dragstart.bs.carousel", e => e.preventDefault())
            }), this._pointerEvent ? (b.on(this._element, "pointerdown.bs.carousel", e => t(e)), b.on(this._element, "pointerup.bs.carousel", e => s(e)), this._element.classList.add("pointer-event")) : (b.on(this._element, "touchstart.bs.carousel", e => t(e)), b.on(this._element, "touchmove.bs.carousel", e => i(e)), b.on(this._element, "touchend.bs.carousel", e => s(e)))
        }
        _keydown(e) {
            var t;
            /input|textarea/i.test(e.target.tagName) || (t = ne[e.key]) && (e.preventDefault(), this._slide(t))
        }
        _getItemIndex(e) {
            return this._items = e && e.parentNode ? f.find(".carousel-item", e.parentNode) : [], this._items.indexOf(e)
        }
        _getItemByOrder(e, t) {
            e = e === ee;
            return A(this._items, t, e, this._config.wrap)
        }
        _triggerSlideEvent(e, t) {
            var i = this._getItemIndex(e),
                s = this._getItemIndex(f.findOne(".active.carousel-item", this._element));
            return b.trigger(this._element, "slide.bs.carousel", {
                relatedTarget: e,
                direction: t,
                from: s,
                to: i
            })
        }
        _setActiveIndicatorElement(t) {
            if (this._indicatorsElement) {
                const e = f.findOne(".active", this._indicatorsElement),
                    i = (e.classList.remove("active"), e.removeAttribute("aria-current"), f.find("[data-bs-target]", this._indicatorsElement));
                for (let e = 0; e < i.length; e++)
                    if (Number.parseInt(i[e].getAttribute("data-bs-slide-to"), 10) === this._getItemIndex(t)) {
                        i[e].classList.add("active"), i[e].setAttribute("aria-current", "true");
                        break
                    }
            }
        }
        _updateInterval() {
            const e = this._activeElement || f.findOne(".active.carousel-item", this._element);
            var t;
            e && ((t = Number.parseInt(e.getAttribute("data-bs-interval"), 10)) ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = t) : this._config.interval = this._config.defaultInterval || this._config.interval)
        }
        _slide(e, h) {
            const t = this._directionToOrder(e),
                i = f.findOne(".active.carousel-item", this._element),
                d = this._getItemIndex(i),
                s = h || this._getItemByOrder(t, i),
                u = this._getItemIndex(s),
                n = Boolean(this._interval),
                o = t === ee,
                r = o ? "carousel-item-start" : "carousel-item-end",
                a = o ? "carousel-item-next" : "carousel-item-prev",
                l = this._orderToDirection(t);
            if (s && s.classList.contains("active")) this._isSliding = !1;
            else if (!this._isSliding && !this._triggerSlideEvent(s, l).defaultPrevented && i && s) {
                this._isSliding = !0, n && this.pause(), this._setActiveIndicatorElement(s), this._activeElement = s;
                const c = () => {
                    b.trigger(this._element, "slid.bs.carousel", {
                        relatedTarget: s,
                        direction: l,
                        from: d,
                        to: u
                    })
                };
                if (this._element.classList.contains("slide")) {
                    s.classList.add(a), _(s), i.classList.add(r), s.classList.add(r);
                    const f = () => {
                        s.classList.remove(r, a), s.classList.add("active"), i.classList.remove("active", a, r), this._isSliding = !1, setTimeout(c, 0)
                    };
                    this._queueCallback(f, i, !0)
                } else i.classList.remove("active"), s.classList.add("active"), this._isSliding = !1, c();
                n && this.cycle()
            }
        }
        _directionToOrder(e) {
            return [se, ie].includes(e) ? s() ? e === ie ? te : ee : e === ie ? ee : te : e
        }
        _orderToDirection(e) {
            return [ee, te].includes(e) ? s() ? e === te ? ie : se : e === te ? se : ie : e
        }
        static carouselInterface(e, t) {
            const i = oe.getOrCreateInstance(e, t);
            let s = i["_config"];
            "object" == typeof t && (s = { ...s,
                ...t
            });
            e = "string" == typeof t ? t : s.slide;
            if ("number" == typeof t) i.to(t);
            else if ("string" == typeof e) {
                if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
                i[e]()
            } else s.interval && s.ride && (i.pause(), i.cycle())
        }
        static jQueryInterface(e) {
            return this.each(function() {
                oe.carouselInterface(this, e)
            })
        }
        static dataApiClickHandler(e) {
            const t = n(this);
            if (t && t.classList.contains("carousel")) {
                const i = { ...o.getDataAttributes(t),
                        ...o.getDataAttributes(this)
                    },
                    s = this.getAttribute("data-bs-slide-to");
                s && (i.interval = !1), oe.carouselInterface(t, i), s && oe.getInstance(t).to(s), e.preventDefault()
            }
        }
    }
    b.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", oe.dataApiClickHandler), b.on(window, "load.bs.carousel.data-api", () => {
        var i = f.find('[data-bs-ride="carousel"]');
        for (let e = 0, t = i.length; e < t; e++) oe.carouselInterface(i[e], oe.getInstance(i[e]))
    }), e(oe);
    const re = {
            toggle: !0,
            parent: ""
        },
        ae = {
            toggle: "boolean",
            parent: "(string|element)"
        };
    class le extends K {
        constructor(e, i) {
            super(e), this._isTransitioning = !1, this._config = this._getConfig(i), this._triggerArray = f.find(`[data-bs-toggle="collapse"][href="#${this._element.id}"],[data-bs-toggle="collapse"][data-bs-target="#${this._element.id}"]`);
            var s = f.find('[data-bs-toggle="collapse"]');
            for (let e = 0, t = s.length; e < t; e++) {
                const i = s[e],
                    n = a(i),
                    o = f.find(n).filter(e => e === this._element);
                null !== n && o.length && (this._selector = n, this._triggerArray.push(i))
            }
            this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
        }
        static get Default() {
            return re
        }
        static get NAME() {
            return "collapse"
        }
        toggle() {
            this._element.classList.contains("show") ? this.hide() : this.show()
        }
        show() {
            if (!this._isTransitioning && !this._element.classList.contains("show")) {
                let e, t;
                this._parent && (e = f.find(".show, .collapsing", this._parent).filter(e => "string" == typeof this._config.parent ? e.getAttribute("data-bs-parent") === this._config.parent : e.classList.contains("collapse")), 0 === e.length && (e = null));
                const s = f.findOne(this._selector);
                if (e) {
                    const f = e.find(e => s !== e);
                    if (t = f ? le.getInstance(f) : null, t && t._isTransitioning) return
                }
                if (!b.trigger(this._element, "show.bs.collapse").defaultPrevented) {
                    e && e.forEach(e => {
                        s !== e && le.collapseInterface(e, "hide"), t || F(e, "bs.collapse", null)
                    });
                    const n = this._getDimension();
                    this._element.classList.remove("collapse"), this._element.classList.add("collapsing"), this._element.style[n] = 0, this._triggerArray.length && this._triggerArray.forEach(e => {
                        e.classList.remove("collapsed"), e.setAttribute("aria-expanded", !0)
                    }), this.setTransitioning(!0);
                    var i = "scroll" + (n[0].toUpperCase() + n.slice(1));
                    this._queueCallback(() => {
                        this._element.classList.remove("collapsing"), this._element.classList.add("collapse", "show"), this._element.style[n] = "", this.setTransitioning(!1), b.trigger(this._element, "shown.bs.collapse")
                    }, this._element, !0), this._element.style[n] = this._element[i] + "px"
                }
            }
        }
        hide() {
            if (!this._isTransitioning && this._element.classList.contains("show") && !b.trigger(this._element, "hide.bs.collapse").defaultPrevented) {
                var e = this._getDimension();
                this._element.style[e] = this._element.getBoundingClientRect()[e] + "px", _(this._element), this._element.classList.add("collapsing"), this._element.classList.remove("collapse", "show");
                const t = this._triggerArray.length;
                if (0 < t)
                    for (let e = 0; e < t; e++) {
                        const t = this._triggerArray[e],
                            i = n(t);
                        i && !i.classList.contains("show") && (t.classList.add("collapsed"), t.setAttribute("aria-expanded", !1))
                    }
                this.setTransitioning(!0), this._element.style[e] = "", this._queueCallback(() => {
                    this.setTransitioning(!1), this._element.classList.remove("collapsing"), this._element.classList.add("collapse"), b.trigger(this._element, "hidden.bs.collapse")
                }, this._element, !0)
            }
        }
        setTransitioning(e) {
            this._isTransitioning = e
        }
        _getConfig(e) {
            return (e = { ...re,
                ...e
            }).toggle = Boolean(e.toggle), i("collapse", e, ae), e
        }
        _getDimension() {
            return this._element.classList.contains("width") ? "width" : "height"
        }
        _getParent() {
            var e = this._config["parent"],
                t = `[data-bs-toggle="collapse"][data-bs-parent="${e=d(e)}"]`;
            return f.find(t, e).forEach(e => {
                var t = n(e);
                this._addAriaAndCollapsedClass(t, [e])
            }), e
        }
        _addAriaAndCollapsedClass(e, t) {
            if (e && t.length) {
                const i = e.classList.contains("show");
                t.forEach(e => {
                    i ? e.classList.remove("collapsed") : e.classList.add("collapsed"), e.setAttribute("aria-expanded", i)
                })
            }
        }
        static collapseInterface(e, t) {
            let i = le.getInstance(e);
            const s = { ...re,
                ...o.getDataAttributes(e),
                ..."object" == typeof t && t ? t : {}
            };
            if (!i && s.toggle && "string" == typeof t && /show|hide/.test(t) && (s.toggle = !1), i = i || new le(e, s), "string" == typeof t) {
                if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                i[t]()
            }
        }
        static jQueryInterface(e) {
            return this.each(function() {
                le.collapseInterface(this, e)
            })
        }
    }
    b.on(document, "click.bs.collapse.data-api", '[data-bs-toggle="collapse"]', function(e) {
        ("A" === e.target.tagName || e.delegateTarget && "A" === e.delegateTarget.tagName) && e.preventDefault();
        const s = o.getDataAttributes(this),
            t = a(this);
        f.find(t).forEach(e => {
            const t = le.getInstance(e);
            let i;
            i = t ? (null === t._parent && "string" == typeof s.parent && (t._config.parent = s.parent, t._parent = t._getParent()), "toggle") : s, le.collapseInterface(e, i)
        })
    }), e(le);
    var k = "top",
        L = "bottom",
        x = "right",
        D = "left",
        ce = [k, L, x, D],
        he = ce.reduce(function(e, t) {
            return e.concat([t + "-start", t + "-end"])
        }, []),
        de = [].concat(ce, ["auto"]).reduce(function(e, t) {
            return e.concat([t, t + "-start", t + "-end"])
        }, []),
        ue = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

    function fe(e) {
        return e ? (e.nodeName || "").toLowerCase() : null
    }

    function pe(e) {
        return null == e ? window : "[object Window]" !== e.toString() ? (t = e.ownerDocument) && t.defaultView || window : e;
        var t
    }

    function me(e) {
        return e instanceof pe(e).Element || e instanceof Element
    }

    function ge(e) {
        return e instanceof pe(e).HTMLElement || e instanceof HTMLElement
    }

    function _e(e) {
        return "undefined" != typeof ShadowRoot && (e instanceof pe(e).ShadowRoot || e instanceof ShadowRoot)
    }
    var be = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function(e) {
            var n = e.state;
            Object.keys(n.elements).forEach(function(e) {
                var t = n.styles[e] || {},
                    i = n.attributes[e] || {},
                    s = n.elements[e];
                ge(s) && fe(s) && (Object.assign(s.style, t), Object.keys(i).forEach(function(e) {
                    var t = i[e];
                    !1 === t ? s.removeAttribute(e) : s.setAttribute(e, !0 === t ? "" : t)
                }))
            })
        },
        effect: function(e) {
            var s = e.state,
                n = {
                    popper: {
                        position: s.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0"
                    },
                    arrow: {
                        position: "absolute"
                    },
                    reference: {}
                };
            return Object.assign(s.elements.popper.style, n.popper), s.styles = n, s.elements.arrow && Object.assign(s.elements.arrow.style, n.arrow),
                function() {
                    Object.keys(s.elements).forEach(function(e) {
                        var t = s.elements[e],
                            i = s.attributes[e] || {},
                            e = Object.keys((s.styles.hasOwnProperty(e) ? s.styles : n)[e]).reduce(function(e, t) {
                                return e[t] = "", e
                            }, {});
                        ge(t) && fe(t) && (Object.assign(t.style, e), Object.keys(i).forEach(function(e) {
                            t.removeAttribute(e)
                        }))
                    })
                }
        },
        requires: ["computeStyles"]
    };

    function ve(e) {
        return e.split("-")[0]
    }

    function ye(e) {
        e = e.getBoundingClientRect();
        return {
            width: e.width,
            height: e.height,
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            x: e.left,
            y: e.top
        }
    }

    function we(e) {
        var t = ye(e),
            i = e.offsetWidth,
            s = e.offsetHeight;
        return Math.abs(t.width - i) <= 1 && (i = t.width), Math.abs(t.height - s) <= 1 && (s = t.height), {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: i,
            height: s
        }
    }

    function Ee(e, t) {
        var i = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (i && _e(i)) {
            var s = t;
            do {
                if (s && e.isSameNode(s)) return !0
            } while (s = s.parentNode || s.host)
        }
        return !1
    }

    function Ae(e) {
        return pe(e).getComputedStyle(e)
    }

    function Te(e) {
        return ((me(e) ? e.ownerDocument : e.document) || window.document).documentElement
    }

    function Oe(e) {
        return "html" === fe(e) ? e : e.assignedSlot || e.parentNode || (_e(e) ? e.host : null) || Te(e)
    }

    function Ce(e) {
        return ge(e) && "fixed" !== Ae(e).position ? e.offsetParent : null
    }

    function ke(e) {
        for (var t, i = pe(e), s = Ce(e); s && (t = s, 0 <= ["table", "td", "th"].indexOf(fe(t))) && "static" === Ae(s).position;) s = Ce(s);
        return (!s || "html" !== fe(s) && ("body" !== fe(s) || "static" !== Ae(s).position)) && (s || function(e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (-1 !== navigator.userAgent.indexOf("Trident") && ge(e) && "fixed" === Ae(e).position) return null;
            for (var i = Oe(e); ge(i) && ["html", "body"].indexOf(fe(i)) < 0;) {
                var s = Ae(i);
                if ("none" !== s.transform || "none" !== s.perspective || "paint" === s.contain || -1 !== ["transform", "perspective"].indexOf(s.willChange) || t && "filter" === s.willChange || t && s.filter && "none" !== s.filter) return i;
                i = i.parentNode
            }
            return null
        }(e)) || i
    }

    function Le(e) {
        return 0 <= ["top", "bottom"].indexOf(e) ? "x" : "y"
    }
    var xe = Math.max,
        De = Math.min,
        Se = Math.round;

    function Ie(e, t, i) {
        return xe(e, De(t, i))
    }

    function Ne(e) {
        return Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, e)
    }

    function je(i, e) {
        return e.reduce(function(e, t) {
            return e[t] = i, e
        }, {})
    }
    var Me = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t, i, s, n, o = e.state,
                    h = e.name,
                    e = e.options,
                    r = o.elements.arrow,
                    a = o.modifiersData.popperOffsets,
                    l = ve(o.placement),
                    c = Le(l),
                    l = 0 <= [D, x].indexOf(l) ? "height" : "width";
                r && a && (e = Ne("number" != typeof(e = "function" == typeof(e = e.padding) ? e(Object.assign({}, o.rects, {
                    placement: o.placement
                })) : e) ? e : je(e, ce)), t = we(r), n = "y" === c ? k : D, s = "y" === c ? L : x, i = o.rects.reference[l] + o.rects.reference[c] - a[c] - o.rects.popper[l], a = a[c] - o.rects.reference[c], r = (r = ke(r)) ? "y" === c ? r.clientHeight || 0 : r.clientWidth || 0 : 0, n = e[n], e = r - t[l] - e[s], n = Ie(n, s = r / 2 - t[l] / 2 + (i / 2 - a / 2), e), o.modifiersData[h] = ((r = {})[c] = n, r.centerOffset = n - s, r))
            },
            effect: function(e) {
                var t = e.state,
                    e = e.options.element,
                    e = void 0 === e ? "[data-popper-arrow]" : e;
                null != e && ("string" != typeof e || (e = t.elements.popper.querySelector(e))) && Ee(t.elements.popper, e) && (t.elements.arrow = e)
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"]
        },
        Pe = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        };

    function He(e) {
        var t, i, s = e.popper,
            h = e.popperRect,
            n = e.placement,
            o = e.offsets,
            d = e.position,
            u = e.gpuAcceleration,
            f = e.adaptive,
            e = e.roundOffsets,
            r = !0 === e ? (r = o.x, a = o.y, l = window.devicePixelRatio || 1, {
                x: Se(Se(r * l) / l) || 0,
                y: Se(Se(a * l) / l) || 0
            }) : "function" == typeof e ? e(o) : o,
            a = r.x,
            l = void 0 === a ? 0 : a,
            e = r.y,
            e = void 0 === e ? 0 : e,
            p = o.hasOwnProperty("x"),
            o = o.hasOwnProperty("y"),
            m = D,
            g = k,
            _ = window;
        f && (c = "clientHeight", i = "clientWidth", (t = ke(s)) === pe(s) && "static" !== Ae(t = Te(s)).position && (c = "scrollHeight", i = "scrollWidth"), n === k && (g = L, e = (e - (t[c] - h.height)) * (u ? 1 : -1)), n === D && (m = x, l = (l - (t[i] - h.width)) * (u ? 1 : -1)));
        var c, s = Object.assign({
            position: d
        }, f && Pe);
        return u ? Object.assign({}, s, ((c = {})[g] = o ? "0" : "", c[m] = p ? "0" : "", c.transform = (_.devicePixelRatio || 1) < 2 ? "translate(" + l + "px, " + e + "px)" : "translate3d(" + l + "px, " + e + "px, 0)", c)) : Object.assign({}, s, ((n = {})[g] = o ? e + "px" : "", n[m] = p ? l + "px" : "", n.transform = "", n))
    }
    var Re = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function(e) {
                var t = e.state,
                    e = e.options,
                    i = e.gpuAcceleration,
                    i = void 0 === i || i,
                    s = e.adaptive,
                    s = void 0 === s || s,
                    e = e.roundOffsets,
                    e = void 0 === e || e,
                    i = {
                        placement: ve(t.placement),
                        popper: t.elements.popper,
                        popperRect: t.rects.popper,
                        gpuAcceleration: i
                    };
                null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, He(Object.assign({}, i, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: s,
                    roundOffsets: e
                })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, He(Object.assign({}, i, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: e
                })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
                    "data-popper-placement": t.placement
                })
            },
            data: {}
        },
        Be = {
            passive: !0
        },
        We = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: function(e) {
                var t = e.state,
                    i = e.instance,
                    e = e.options,
                    s = e.scroll,
                    n = void 0 === s || s,
                    s = e.resize,
                    o = void 0 === s || s,
                    r = pe(t.elements.popper),
                    a = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                return n && a.forEach(function(e) {
                        e.addEventListener("scroll", i.update, Be)
                    }), o && r.addEventListener("resize", i.update, Be),
                    function() {
                        n && a.forEach(function(e) {
                            e.removeEventListener("scroll", i.update, Be)
                        }), o && r.removeEventListener("resize", i.update, Be)
                    }
            },
            data: {}
        },
        qe = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };

    function ze(e) {
        return e.replace(/left|right|bottom|top/g, function(e) {
            return qe[e]
        })
    }
    var Ue = {
        start: "end",
        end: "start"
    };

    function Fe(e) {
        return e.replace(/start|end/g, function(e) {
            return Ue[e]
        })
    }

    function $e(e) {
        e = pe(e);
        return {
            scrollLeft: e.pageXOffset,
            scrollTop: e.pageYOffset
        }
    }

    function Ve(e) {
        return ye(Te(e)).left + $e(e).scrollLeft
    }

    function Ke(e) {
        var e = Ae(e),
            t = e.overflow,
            i = e.overflowX,
            e = e.overflowY;
        return /auto|scroll|overlay|hidden/.test(t + e + i)
    }

    function Xe(e, t) {
        void 0 === t && (t = []);
        var i = function e(t) {
                return 0 <= ["html", "body", "#document"].indexOf(fe(t)) ? t.ownerDocument.body : ge(t) && Ke(t) ? t : e(Oe(t))
            }(e),
            e = i === (null == (e = e.ownerDocument) ? void 0 : e.body),
            s = pe(i),
            s = e ? [s].concat(s.visualViewport || [], Ke(i) ? i : []) : i,
            i = t.concat(s);
        return e ? i : i.concat(Xe(Oe(s)))
    }

    function Ye(e) {
        return Object.assign({}, e, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        })
    }

    function Qe(e, t) {
        return "viewport" === t ? Ye((s = pe(i = e), n = Te(i), s = s.visualViewport, o = n.clientWidth, n = n.clientHeight, a = r = 0, s && (o = s.width, n = s.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (r = s.offsetLeft, a = s.offsetTop)), {
            width: o,
            height: n,
            x: r + Ve(i),
            y: a
        })) : ge(t) ? ((o = ye(s = t)).top = o.top + s.clientTop, o.left = o.left + s.clientLeft, o.bottom = o.top + s.clientHeight, o.right = o.left + s.clientWidth, o.width = s.clientWidth, o.height = s.clientHeight, o.x = o.left, o.y = o.top, o) : Ye((n = Te(e), r = Te(n), i = $e(n), a = null == (a = n.ownerDocument) ? void 0 : a.body, t = xe(r.scrollWidth, r.clientWidth, a ? a.scrollWidth : 0, a ? a.clientWidth : 0), e = xe(r.scrollHeight, r.clientHeight, a ? a.scrollHeight : 0, a ? a.clientHeight : 0), n = -i.scrollLeft + Ve(n), i = -i.scrollTop, "rtl" === Ae(a || r).direction && (n += xe(r.clientWidth, a ? a.clientWidth : 0) - t), {
            width: t,
            height: e,
            x: n,
            y: i
        }));
        var i, s, n, o, r, a
    }

    function Ge(e) {
        return e.split("-")[1]
    }

    function Ze(e) {
        var t, i = e.reference,
            s = e.element,
            e = e.placement,
            n = e ? ve(e) : null,
            e = e ? Ge(e) : null,
            o = i.x + i.width / 2 - s.width / 2,
            r = i.y + i.height / 2 - s.height / 2;
        switch (n) {
            case k:
                t = {
                    x: o,
                    y: i.y - s.height
                };
                break;
            case L:
                t = {
                    x: o,
                    y: i.y + i.height
                };
                break;
            case x:
                t = {
                    x: i.x + i.width,
                    y: r
                };
                break;
            case D:
                t = {
                    x: i.x - s.width,
                    y: r
                };
                break;
            default:
                t = {
                    x: i.x,
                    y: i.y
                }
        }
        var a = n ? Le(n) : null;
        if (null != a) {
            var l = "y" === a ? "height" : "width";
            switch (e) {
                case "start":
                    t[a] = t[a] - (i[l] / 2 - s[l] / 2);
                    break;
                case "end":
                    t[a] = t[a] + (i[l] / 2 - s[l] / 2)
            }
        }
        return t
    }

    function Je(e, t) {
        var i, h, s, n, d, t = t = void 0 === t ? {} : t,
            u = t.placement,
            u = void 0 === u ? e.placement : u,
            o = t.boundary,
            o = void 0 === o ? "clippingParents" : o,
            r = t.rootBoundary,
            r = void 0 === r ? "viewport" : r,
            a = t.elementContext,
            a = void 0 === a ? "popper" : a,
            l = t.altBoundary,
            l = void 0 !== l && l,
            t = t.padding,
            t = void 0 === t ? 0 : t,
            t = Ne("number" != typeof t ? t : je(t, ce)),
            f = e.elements.reference,
            c = e.rects.popper,
            l = e.elements[l ? "popper" === a ? "reference" : "popper" : a],
            o = (i = me(l) ? l : l.contextElement || Te(e.elements.popper), l = r, s = "clippingParents" === (r = o) ? (n = Xe(Oe(s = i)), me(h = 0 <= ["absolute", "fixed"].indexOf(Ae(s).position) && ge(s) ? ke(s) : s) ? n.filter(function(e) {
                return me(e) && Ee(e, h) && "body" !== fe(e)
            }) : []) : [].concat(r), n = [].concat(s, [l]), r = n[0], (l = n.reduce(function(e, t) {
                t = Qe(i, t);
                return e.top = xe(t.top, e.top), e.right = De(t.right, e.right), e.bottom = De(t.bottom, e.bottom), e.left = xe(t.left, e.left), e
            }, Qe(i, r))).width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l),
            r = ye(f),
            l = Ze({
                reference: r,
                element: c,
                strategy: "absolute",
                placement: u
            }),
            f = Ye(Object.assign({}, c, l)),
            c = "popper" === a ? f : r,
            p = {
                top: o.top - c.top + t.top,
                bottom: c.bottom - o.bottom + t.bottom,
                left: o.left - c.left + t.left,
                right: c.right - o.right + t.right
            },
            l = e.modifiersData.offset;
        return "popper" === a && l && (d = l[u], Object.keys(p).forEach(function(e) {
            var t = 0 <= [x, L].indexOf(e) ? 1 : -1,
                i = 0 <= [k, L].indexOf(e) ? "y" : "x";
            p[e] += d[i] * t
        })), p
    }
    var et = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var d = e.state,
                t = e.options,
                e = e.name;
            if (!d.modifiersData[e]._skip) {
                for (var i = t.mainAxis, c = void 0 === i || i, i = t.altAxis, h = void 0 === i || i, i = t.fallbackPlacements, u = t.padding, f = t.boundary, p = t.rootBoundary, m = t.altBoundary, s = t.flipVariations, g = void 0 === s || s, _ = t.allowedAutoPlacements, s = d.options.placement, t = ve(s), i = i || (t !== s && g ? function(e) {
                        if ("auto" === ve(e)) return [];
                        var t = ze(e);
                        return [Fe(e), t, Fe(t)]
                    }(s) : [ze(s)]), n = [s].concat(i).reduce(function(e, t) {
                        return e.concat("auto" === ve(t) ? (i = d, s = (e = e = void 0 === (e = {
                            placement: t,
                            boundary: f,
                            rootBoundary: p,
                            padding: u,
                            flipVariations: g,
                            allowedAutoPlacements: _
                        }) ? {} : e).placement, n = e.boundary, o = e.rootBoundary, r = e.padding, a = e.flipVariations, h = void 0 === (e = e.allowedAutoPlacements) ? de : e, l = Ge(s), e = l ? a ? he : he.filter(function(e) {
                            return Ge(e) === l
                        }) : ce, c = (s = 0 === (s = e.filter(function(e) {
                            return 0 <= h.indexOf(e)
                        })).length ? e : s).reduce(function(e, t) {
                            return e[t] = Je(i, {
                                placement: t,
                                boundary: n,
                                rootBoundary: o,
                                padding: r
                            })[ve(t)], e
                        }, {}), Object.keys(c).sort(function(e, t) {
                            return c[e] - c[t]
                        })) : t);
                        var i, s, n, o, r, a, h, l, c
                    }, []), b = d.rects.reference, v = d.rects.popper, y = new Map, w = !0, o = n[0], E = 0; E < n.length; E++) {
                    var r = n[E],
                        A = ve(r),
                        T = "start" === Ge(r),
                        a = 0 <= [k, L].indexOf(A),
                        l = a ? "width" : "height",
                        O = Je(d, {
                            placement: r,
                            boundary: f,
                            rootBoundary: p,
                            altBoundary: m,
                            padding: u
                        }),
                        a = a ? T ? x : D : T ? L : k,
                        T = (b[l] > v[l] && (a = ze(a)), ze(a)),
                        l = [];
                    if (c && l.push(O[A] <= 0), h && l.push(O[a] <= 0, O[T] <= 0), l.every(function(e) {
                            return e
                        })) {
                        o = r, w = !1;
                        break
                    }
                    y.set(r, l)
                }
                if (w)
                    for (var C = g ? 3 : 1; 0 < C && "break" !== function(t) {
                            var e = n.find(function(e) {
                                e = y.get(e);
                                if (e) return e.slice(0, t).every(function(e) {
                                    return e
                                })
                            });
                            if (e) return o = e, "break"
                        }(C); C--);
                d.placement !== o && (d.modifiersData[e]._skip = !0, d.placement = o, d.reset = !0)
            }
        },
        requiresIfExists: ["offset"],
        data: {
            _skip: !1
        }
    };

    function tt(e, t, i) {
        return {
            top: e.top - t.height - (i = void 0 === i ? {
                x: 0,
                y: 0
            } : i).y,
            right: e.right - t.width + i.x,
            bottom: e.bottom - t.height + i.y,
            left: e.left - t.width - i.x
        }
    }

    function it(t) {
        return [k, x, L, D].some(function(e) {
            return 0 <= t[e]
        })
    }
    var st = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function(e) {
                var t = e.state,
                    e = e.name,
                    i = t.rects.reference,
                    s = t.rects.popper,
                    n = t.modifiersData.preventOverflow,
                    o = Je(t, {
                        elementContext: "reference"
                    }),
                    r = Je(t, {
                        altBoundary: !0
                    }),
                    o = tt(o, i),
                    i = tt(r, s, n),
                    r = it(o),
                    s = it(i);
                t.modifiersData[e] = {
                    referenceClippingOffsets: o,
                    popperEscapeOffsets: i,
                    isReferenceHidden: r,
                    hasPopperEscaped: s
                }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
                    "data-popper-reference-hidden": r,
                    "data-popper-escaped": s
                })
            }
        },
        nt = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(e) {
                var r = e.state,
                    t = e.options,
                    e = e.name,
                    t = t.offset,
                    a = void 0 === t ? [0, 0] : t,
                    t = de.reduce(function(e, t) {
                        return e[t] = (t = t, i = r.rects, s = a, n = ve(t), o = 0 <= [D, k].indexOf(n) ? -1 : 1, i = "function" == typeof s ? s(Object.assign({}, i, {
                            placement: t
                        })) : s, t = i[0] || 0, s = (i[1] || 0) * o, 0 <= [D, x].indexOf(n) ? {
                            x: s,
                            y: t
                        } : {
                            x: t,
                            y: s
                        }), e;
                        var i, s, n, o
                    }, {}),
                    i = t[r.placement],
                    s = i.x,
                    i = i.y;
                null != r.modifiersData.popperOffsets && (r.modifiersData.popperOffsets.x += s, r.modifiersData.popperOffsets.y += i), r.modifiersData[e] = t
            }
        },
        ot = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(e) {
                var t = e.state,
                    e = e.name;
                t.modifiersData[e] = Ze({
                    reference: t.rects.reference,
                    element: t.rects.popper,
                    strategy: "absolute",
                    placement: t.placement
                })
            },
            data: {}
        },
        rt = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(h) {
                var d, u, f, p, e, m, t, i, s, n = h.state,
                    o = h.options,
                    h = h.name,
                    g = o.mainAxis,
                    g = void 0 === g || g,
                    _ = o.altAxis,
                    _ = void 0 !== _ && _,
                    b = o.boundary,
                    r = o.rootBoundary,
                    v = o.altBoundary,
                    a = o.padding,
                    y = o.tether,
                    y = void 0 === y || y,
                    o = o.tetherOffset,
                    o = void 0 === o ? 0 : o,
                    b = Je(n, {
                        boundary: b,
                        rootBoundary: r,
                        padding: a,
                        altBoundary: v
                    }),
                    r = ve(n.placement),
                    a = Ge(n.placement),
                    v = !a,
                    r = Le(r),
                    w = "x" === r ? "y" : "x",
                    l = n.modifiersData.popperOffsets,
                    E = n.rects.reference,
                    c = n.rects.popper,
                    o = "function" == typeof o ? o(Object.assign({}, n.rects, {
                        placement: n.placement
                    })) : o,
                    A = {
                        x: 0,
                        y: 0
                    };
                l && ((g || _) && (e = "y" === r ? "height" : "width", d = l[r], u = l[r] + b[s = "y" === r ? k : D], f = l[r] - b[t = "y" === r ? L : x], m = y ? -c[e] / 2 : 0, p = ("start" === a ? E : c)[e], a = "start" === a ? -c[e] : -E[e], c = n.elements.arrow, c = y && c ? we(c) : {
                    width: 0,
                    height: 0
                }, s = (i = n.modifiersData["arrow#persistent"] ? n.modifiersData["arrow#persistent"].padding : {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                })[s], i = i[t], t = Ie(0, E[e], c[e]), c = v ? E[e] / 2 - m - t - s - o : p - t - s - o, p = v ? -E[e] / 2 + m + t + i + o : a + t + i + o, v = (s = n.elements.arrow && ke(n.elements.arrow)) ? "y" === r ? s.clientTop || 0 : s.clientLeft || 0 : 0, E = n.modifiersData.offset ? n.modifiersData.offset[n.placement][r] : 0, e = l[r] + c - E - v, m = l[r] + p - E, g && (a = Ie(y ? De(u, e) : u, d, y ? xe(f, m) : f), l[r] = a, A[r] = a - d), _ && (i = (t = l[w]) + b["x" === r ? k : D], o = t - b["x" === r ? L : x], s = Ie(y ? De(i, e) : i, t, y ? xe(o, m) : o), l[w] = s, A[w] = s - t)), n.modifiersData[h] = A)
            },
            requiresIfExists: ["offset"]
        };
    var at = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };

    function lt() {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
        return !t.some(function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        })
    }

    function ct(e) {
        var e = e = void 0 === e ? {} : e,
            t = e.defaultModifiers,
            h = void 0 === t ? [] : t,
            t = e.defaultOptions,
            d = void 0 === t ? at : t;
        return function(r, a, t) {
            void 0 === t && (t = d);
            var i, s, u = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, at, d),
                    modifiersData: {},
                    elements: {
                        reference: r,
                        popper: a
                    },
                    attributes: {},
                    styles: {}
                },
                l = [],
                f = !1,
                p = {
                    state: u,
                    setOptions: function(e) {
                        c(), u.options = Object.assign({}, d, u.options, e), u.scrollParents = {
                            reference: me(r) ? Xe(r) : r.contextElement ? Xe(r.contextElement) : [],
                            popper: Xe(a)
                        };
                        e = [].concat(h, u.options.modifiers), t = e.reduce(function(e, t) {
                            var i = e[t.name];
                            return e[t.name] = i ? Object.assign({}, i, t, {
                                options: Object.assign({}, i.options, t.options),
                                data: Object.assign({}, i.data, t.data)
                            }) : t, e
                        }, {}), e = e = Object.keys(t).map(function(e) {
                            return t[e]
                        }), i = new Map, s = new Set, n = [], e.forEach(function(e) {
                            i.set(e.name, e)
                        }), e.forEach(function(e) {
                            s.has(e.name) || function t(e) {
                                s.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach(function(e) {
                                    s.has(e) || (e = i.get(e)) && t(e)
                                }), n.push(e)
                            }(e)
                        }), o = n;
                        var t, i, s, n, o, e = ue.reduce(function(e, t) {
                            return e.concat(o.filter(function(e) {
                                return e.phase === t
                            }))
                        }, []);
                        return u.orderedModifiers = e.filter(function(e) {
                            return e.enabled
                        }), u.orderedModifiers.forEach(function(e) {
                            var t = e.name,
                                i = e.options,
                                e = e.effect;
                            "function" == typeof e && (e = e({
                                state: u,
                                name: t,
                                instance: p,
                                options: void 0 === i ? {} : i
                            }), l.push(e || function() {}))
                        }), p.update()
                    },
                    forceUpdate: function() {
                        if (!f) {
                            var e = u.elements,
                                t = e.reference,
                                e = e.popper;
                            if (lt(t, e)) {
                                u.rects = {
                                    reference: (t = t, o = ke(e), void 0 === (d = "fixed" === u.options.strategy) && (d = !1), r = Te(o), t = ye(t), a = ge(o), l = {
                                        scrollLeft: 0,
                                        scrollTop: 0
                                    }, c = {
                                        x: 0,
                                        y: 0
                                    }, !a && d || ("body" === fe(o) && !Ke(r) || (l = (a = o) !== pe(a) && ge(a) ? {
                                        scrollLeft: a.scrollLeft,
                                        scrollTop: a.scrollTop
                                    } : $e(a)), ge(o) ? ((c = ye(o)).x += o.clientLeft, c.y += o.clientTop) : r && (c.x = Ve(r))), {
                                        x: t.left + l.scrollLeft - c.x,
                                        y: t.top + l.scrollTop - c.y,
                                        width: t.width,
                                        height: t.height
                                    }),
                                    popper: we(e)
                                }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(e) {
                                    return u.modifiersData[e.name] = Object.assign({}, e.data)
                                });
                                for (var i, h, s, n = 0; n < u.orderedModifiers.length; n++) !0 !== u.reset ? (i = (s = u.orderedModifiers[n]).fn, h = s.options, s = s.name, "function" == typeof i && (u = i({
                                    state: u,
                                    options: void 0 === h ? {} : h,
                                    name: s,
                                    instance: p
                                }) || u)) : (u.reset = !1, n = -1)
                            }
                        }
                        var o, d, r, a, l, c
                    },
                    update: (i = function() {
                        return new Promise(function(e) {
                            p.forceUpdate(), e(u)
                        })
                    }, function() {
                        return s = s || new Promise(function(e) {
                            Promise.resolve().then(function() {
                                s = void 0, e(i())
                            })
                        })
                    }),
                    destroy: function() {
                        c(), f = !0
                    }
                };
            return lt(r, a) && p.setOptions(t).then(function(e) {
                !f && t.onFirstUpdate && t.onFirstUpdate(e)
            }), p;

            function c() {
                l.forEach(function(e) {
                    return e()
                }), l = []
            }
        }
    }
    var ht = ct(),
        dt = ct({
            defaultModifiers: [We, ot, Re, be]
        }),
        ut = ct({
            defaultModifiers: [We, ot, Re, be, nt, et, rt, Me, st]
        }),
        ft = Object.freeze({
            __proto__: null,
            popperGenerator: ct,
            detectOverflow: Je,
            createPopperBase: ht,
            createPopper: ut,
            createPopperLite: dt,
            top: k,
            bottom: L,
            right: x,
            left: D,
            auto: "auto",
            basePlacements: ce,
            start: "start",
            end: "end",
            clippingParents: "clippingParents",
            viewport: "viewport",
            popper: "popper",
            reference: "reference",
            variationPlacements: he,
            placements: de,
            beforeRead: "beforeRead",
            read: "read",
            afterRead: "afterRead",
            beforeMain: "beforeMain",
            main: "main",
            afterMain: "afterMain",
            beforeWrite: "beforeWrite",
            write: "write",
            afterWrite: "afterWrite",
            modifierPhases: ue,
            applyStyles: be,
            arrow: Me,
            computeStyles: Re,
            eventListeners: We,
            flip: et,
            hide: st,
            offset: nt,
            popperOffsets: ot,
            preventOverflow: rt
        });
    const pt = new RegExp("ArrowUp|ArrowDown|Escape"),
        mt = s() ? "top-end" : "top-start",
        gt = s() ? "top-start" : "top-end",
        _t = s() ? "bottom-end" : "bottom-start",
        bt = s() ? "bottom-start" : "bottom-end",
        vt = s() ? "left-start" : "right-start",
        yt = s() ? "right-start" : "left-start",
        wt = {
            offset: [0, 2],
            boundary: "clippingParents",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null,
            autoClose: !0
        },
        Et = {
            offset: "(array|string|function)",
            boundary: "(string|element)",
            reference: "(string|element|object)",
            display: "string",
            popperConfig: "(null|object|function)",
            autoClose: "(boolean|string)"
        };
    class r extends K {
        constructor(e, t) {
            super(e), this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
        }
        static get Default() {
            return wt
        }
        static get DefaultType() {
            return Et
        }
        static get NAME() {
            return "dropdown"
        }
        toggle() {
            p(this._element) || (this._element.classList.contains("show") ? this.hide() : this.show())
        }
        show() {
            if (!p(this._element) && !this._menu.classList.contains("show")) {
                const t = r.getParentFromElement(this._element),
                    e = {
                        relatedTarget: this._element
                    };
                if (!b.trigger(this._element, "show.bs.dropdown", e).defaultPrevented) {
                    if (this._inNavbar) o.setDataAttribute(this._menu, "popper", "none");
                    else {
                        if (void 0 === ft) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
                        let e = this._element;
                        "parent" === this._config.reference ? e = t : h(this._config.reference) ? e = d(this._config.reference) : "object" == typeof this._config.reference && (e = this._config.reference);
                        const i = this._getPopperConfig(),
                            s = i.modifiers.find(e => "applyStyles" === e.name && !1 === e.enabled);
                        this._popper = ut(e, this._menu, i), s && o.setDataAttribute(this._menu, "popper", "static")
                    }
                    "ontouchstart" in document.documentElement && !t.closest(".navbar-nav") && [].concat(...document.body.children).forEach(e => b.on(e, "mouseover", g)), this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.toggle("show"), this._element.classList.toggle("show"), b.trigger(this._element, "shown.bs.dropdown", e)
                }
            }
        }
        hide() {
            var e;
            !p(this._element) && this._menu.classList.contains("show") && (e = {
                relatedTarget: this._element
            }, this._completeHide(e))
        }
        dispose() {
            this._popper && this._popper.destroy(), super.dispose()
        }
        update() {
            this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
        }
        _addEventListeners() {
            b.on(this._element, "click.bs.dropdown", e => {
                e.preventDefault(), this.toggle()
            })
        }
        _completeHide(e) {
            b.trigger(this._element, "hide.bs.dropdown", e).defaultPrevented || ("ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach(e => b.off(e, "mouseover", g)), this._popper && this._popper.destroy(), this._menu.classList.remove("show"), this._element.classList.remove("show"), this._element.setAttribute("aria-expanded", "false"), o.removeDataAttribute(this._menu, "popper"), b.trigger(this._element, "hidden.bs.dropdown", e))
        }
        _getConfig(e) {
            if (e = { ...this.constructor.Default,
                    ...o.getDataAttributes(this._element),
                    ...e
                }, i("dropdown", e, this.constructor.DefaultType), "object" == typeof e.reference && !h(e.reference) && "function" != typeof e.reference.getBoundingClientRect) throw new TypeError("dropdown".toUpperCase() + ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.');
            return e
        }
        _getMenuElement() {
            return f.next(this._element, ".dropdown-menu")[0]
        }
        _getPlacement() {
            const e = this._element.parentNode;
            if (e.classList.contains("dropend")) return vt;
            if (e.classList.contains("dropstart")) return yt;
            var t = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
            return e.classList.contains("dropup") ? t ? gt : mt : t ? bt : _t
        }
        _detectNavbar() {
            return null !== this._element.closest(".navbar")
        }
        _getOffset() {
            const t = this._config["offset"];
            return "string" == typeof t ? t.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof t ? e => t(e, this._element) : t
        }
        _getPopperConfig() {
            const e = {
                placement: this._getPlacement(),
                modifiers: [{
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }]
            };
            return "static" === this._config.display && (e.modifiers = [{
                name: "applyStyles",
                enabled: !1
            }]), { ...e,
                ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(e) : this._config.popperConfig
            }
        }
        _selectMenuItem({
            key: e,
            target: t
        }) {
            const i = f.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter(u);
            i.length && A(i, t, "ArrowDown" === e, !i.includes(t)).focus()
        }
        static dropdownInterface(e, t) {
            const i = r.getOrCreateInstance(e, t);
            if ("string" == typeof t) {
                if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                i[t]()
            }
        }
        static jQueryInterface(e) {
            return this.each(function() {
                r.dropdownInterface(this, e)
            })
        }
        static clearMenus(i) {
            if (!i || 2 !== i.button && ("keyup" !== i.type || "Tab" === i.key)) {
                const s = f.find('[data-bs-toggle="dropdown"]');
                for (let e = 0, t = s.length; e < t; e++) {
                    const n = r.getInstance(s[e]);
                    if (n && !1 !== n._config.autoClose && n._element.classList.contains("show")) {
                        const o = {
                            relatedTarget: n._element
                        };
                        if (i) {
                            const f = i.composedPath(),
                                s = f.includes(n._menu);
                            if (f.includes(n._element) || "inside" === n._config.autoClose && !s || "outside" === n._config.autoClose && s) continue;
                            if (n._menu.contains(i.target) && ("keyup" === i.type && "Tab" === i.key || /input|select|option|textarea|form/i.test(i.target.tagName))) continue;
                            "click" === i.type && (o.clickEvent = i)
                        }
                        n._completeHide(o)
                    }
                }
            }
        }
        static getParentFromElement(e) {
            return n(e) || e.parentNode
        }
        static dataApiKeydownHandler(e) {
            if (/input|textarea/i.test(e.target.tagName) ? !("Space" === e.key || "Escape" !== e.key && ("ArrowDown" !== e.key && "ArrowUp" !== e.key || e.target.closest(".dropdown-menu"))) : pt.test(e.key)) {
                var t, i = this.classList.contains("show");
                if (i || "Escape" !== e.key)
                    if (e.preventDefault(), e.stopPropagation(), !p(this)) return t = () => this.matches('[data-bs-toggle="dropdown"]') ? this : f.prev(this, '[data-bs-toggle="dropdown"]')[0], "Escape" === e.key ? (t().focus(), void r.clearMenus()) : "ArrowUp" === e.key || "ArrowDown" === e.key ? (i || t().click(), void r.getInstance(t())._selectMenuItem(e)) : void(i && "Space" !== e.key || r.clearMenus())
            }
        }
    }
    b.on(document, "keydown.bs.dropdown.data-api", '[data-bs-toggle="dropdown"]', r.dataApiKeydownHandler), b.on(document, "keydown.bs.dropdown.data-api", ".dropdown-menu", r.dataApiKeydownHandler), b.on(document, "click.bs.dropdown.data-api", r.clearMenus), b.on(document, "keyup.bs.dropdown.data-api", r.clearMenus), b.on(document, "click.bs.dropdown.data-api", '[data-bs-toggle="dropdown"]', function(e) {
        e.preventDefault(), r.dropdownInterface(this)
    }), e(r);
    class At {
        constructor() {
            this._element = document.body
        }
        getWidth() {
            var e = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - e)
        }
        hide() {
            const t = this.getWidth();
            this._disableOverFlow(), this._setElementAttributes(this._element, "paddingRight", e => e + t), this._setElementAttributes(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", "paddingRight", e => e + t), this._setElementAttributes(".sticky-top", "marginRight", e => e - t)
        }
        _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
        }
        _setElementAttributes(e, i, s) {
            const n = this.getWidth();
            this._applyManipulationCallback(e, e => {
                var t;
                e !== this._element && window.innerWidth > e.clientWidth + n || (this._saveInitialAttribute(e, i), t = window.getComputedStyle(e)[i], e.style[i] = s(Number.parseFloat(t)) + "px")
            })
        }
        reset() {
            this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, "paddingRight"), this._resetElementAttributes(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", "paddingRight"), this._resetElementAttributes(".sticky-top", "marginRight")
        }
        _saveInitialAttribute(e, t) {
            var i = e.style[t];
            i && o.setDataAttribute(e, t, i)
        }
        _resetElementAttributes(e, i) {
            this._applyManipulationCallback(e, e => {
                var t = o.getDataAttribute(e, i);
                void 0 === t ? e.style.removeProperty(i) : (o.removeDataAttribute(e, i), e.style[i] = t)
            })
        }
        _applyManipulationCallback(e, t) {
            h(e) ? t(e) : f.find(e, this._element).forEach(t)
        }
        isOverflowing() {
            return 0 < this.getWidth()
        }
    }
    const Tt = {
            isVisible: !0,
            isAnimated: !1,
            rootElement: "body",
            clickCallback: null
        },
        Ot = {
            isVisible: "boolean",
            isAnimated: "boolean",
            rootElement: "(element|string)",
            clickCallback: "(function|null)"
        };
    class Ct {
        constructor(e) {
            this._config = this._getConfig(e), this._isAppended = !1, this._element = null
        }
        show(e) {
            this._config.isVisible ? (this._append(), this._config.isAnimated && _(this._getElement()), this._getElement().classList.add("show"), this._emulateAnimation(() => {
                w(e)
            })) : w(e)
        }
        hide(e) {
            this._config.isVisible ? (this._getElement().classList.remove("show"), this._emulateAnimation(() => {
                this.dispose(), w(e)
            })) : w(e)
        }
        _getElement() {
            if (!this._element) {
                const e = document.createElement("div");
                e.className = "modal-backdrop", this._config.isAnimated && e.classList.add("fade"), this._element = e
            }
            return this._element
        }
        _getConfig(e) {
            return (e = { ...Tt,
                ..."object" == typeof e ? e : {}
            }).rootElement = d(e.rootElement), i("backdrop", e, Ot), e
        }
        _append() {
            this._isAppended || (this._config.rootElement.appendChild(this._getElement()), b.on(this._getElement(), "mousedown.bs.backdrop", () => {
                w(this._config.clickCallback)
            }), this._isAppended = !0)
        }
        dispose() {
            this._isAppended && (b.off(this._element, "mousedown.bs.backdrop"), this._element.remove(), this._isAppended = !1)
        }
        _emulateAnimation(e) {
            E(e, this._getElement(), this._config.isAnimated)
        }
    }
    const kt = {
            backdrop: !0,
            keyboard: !0,
            focus: !0
        },
        Lt = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean"
        };
    class xt extends K {
        constructor(e, t) {
            super(e), this._config = this._getConfig(t), this._dialog = f.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._isShown = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollBar = new At
        }
        static get Default() {
            return kt
        }
        static get NAME() {
            return "modal"
        }
        toggle(e) {
            return this._isShown ? this.hide() : this.show(e)
        }
        show(e) {
            this._isShown || this._isTransitioning || b.trigger(this._element, "show.bs.modal", {
                relatedTarget: e
            }).defaultPrevented || (this._isShown = !0, this._isAnimated() && (this._isTransitioning = !0), this._scrollBar.hide(), document.body.classList.add("modal-open"), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), b.on(this._element, "click.dismiss.bs.modal", '[data-bs-dismiss="modal"]', e => this.hide(e)), b.on(this._dialog, "mousedown.dismiss.bs.modal", () => {
                b.one(this._element, "mouseup.dismiss.bs.modal", e => {
                    e.target === this._element && (this._ignoreBackdropClick = !0)
                })
            }), this._showBackdrop(() => this._showElement(e)))
        }
        hide(e) {
            e && ["A", "AREA"].includes(e.target.tagName) && e.preventDefault(), this._isShown && !this._isTransitioning && (b.trigger(this._element, "hide.bs.modal").defaultPrevented || (this._isShown = !1, (e = this._isAnimated()) && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), b.off(document, "focusin.bs.modal"), this._element.classList.remove("show"), b.off(this._element, "click.dismiss.bs.modal"), b.off(this._dialog, "mousedown.dismiss.bs.modal"), this._queueCallback(() => this._hideModal(), this._element, e)))
        }
        dispose() {
            [window, this._dialog].forEach(e => b.off(e, ".bs.modal")), this._backdrop.dispose(), super.dispose(), b.off(document, "focusin.bs.modal")
        }
        handleUpdate() {
            this._adjustDialog()
        }
        _initializeBackDrop() {
            return new Ct({
                isVisible: Boolean(this._config.backdrop),
                isAnimated: this._isAnimated()
            })
        }
        _getConfig(e) {
            return e = { ...kt,
                ...o.getDataAttributes(this._element),
                ..."object" == typeof e ? e : {}
            }, i("modal", e, Lt), e
        }
        _showElement(e) {
            const t = this._isAnimated(),
                i = f.findOne(".modal-body", this._dialog);
            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0, i && (i.scrollTop = 0), t && _(this._element), this._element.classList.add("show"), this._config.focus && this._enforceFocus(), this._queueCallback(() => {
                this._config.focus && this._element.focus(), this._isTransitioning = !1, b.trigger(this._element, "shown.bs.modal", {
                    relatedTarget: e
                })
            }, this._dialog, t)
        }
        _enforceFocus() {
            b.off(document, "focusin.bs.modal"), b.on(document, "focusin.bs.modal", e => {
                document === e.target || this._element === e.target || this._element.contains(e.target) || this._element.focus()
            })
        }
        _setEscapeEvent() {
            this._isShown ? b.on(this._element, "keydown.dismiss.bs.modal", e => {
                this._config.keyboard && "Escape" === e.key ? (e.preventDefault(), this.hide()) : this._config.keyboard || "Escape" !== e.key || this._triggerBackdropTransition()
            }) : b.off(this._element, "keydown.dismiss.bs.modal")
        }
        _setResizeEvent() {
            this._isShown ? b.on(window, "resize.bs.modal", () => this._adjustDialog()) : b.off(window, "resize.bs.modal")
        }
        _hideModal() {
            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
                document.body.classList.remove("modal-open"), this._resetAdjustments(), this._scrollBar.reset(), b.trigger(this._element, "hidden.bs.modal")
            })
        }
        _showBackdrop(e) {
            b.on(this._element, "click.dismiss.bs.modal", e => {
                this._ignoreBackdropClick ? this._ignoreBackdropClick = !1 : e.target === e.currentTarget && (!0 === this._config.backdrop ? this.hide() : "static" === this._config.backdrop && this._triggerBackdropTransition())
            }), this._backdrop.show(e)
        }
        _isAnimated() {
            return this._element.classList.contains("fade")
        }
        _triggerBackdropTransition() {
            if (!b.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) {
                const {
                    classList: e,
                    scrollHeight: t,
                    style: i
                } = this._element, s = t > document.documentElement.clientHeight;
                !s && "hidden" === i.overflowY || e.contains("modal-static") || (s || (i.overflowY = "hidden"), e.add("modal-static"), this._queueCallback(() => {
                    e.remove("modal-static"), s || this._queueCallback(() => {
                        i.overflowY = ""
                    }, this._dialog)
                }, this._dialog), this._element.focus())
            }
        }
        _adjustDialog() {
            var e = this._element.scrollHeight > document.documentElement.clientHeight,
                t = this._scrollBar.getWidth(),
                i = 0 < t;
            (!i && e && !s() || i && !e && s()) && (this._element.style.paddingLeft = t + "px"), (i && !e && !s() || !i && e && s()) && (this._element.style.paddingRight = t + "px")
        }
        _resetAdjustments() {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
        }
        static jQueryInterface(t, i) {
            return this.each(function() {
                const e = xt.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t](i)
                }
            })
        }
    }
    b.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', function(e) {
        const t = n(this);
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(), b.one(t, "show.bs.modal", e => {
            e.defaultPrevented || b.one(t, "hidden.bs.modal", () => {
                u(this) && this.focus()
            })
        }), xt.getOrCreateInstance(t).toggle(this)
    }), e(xt);
    const Dt = {
            backdrop: !0,
            keyboard: !0,
            scroll: !1
        },
        St = {
            backdrop: "boolean",
            keyboard: "boolean",
            scroll: "boolean"
        };
    class It extends K {
        constructor(e, t) {
            super(e), this._config = this._getConfig(t), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._addEventListeners()
        }
        static get NAME() {
            return "offcanvas"
        }
        static get Default() {
            return Dt
        }
        toggle(e) {
            return this._isShown ? this.hide() : this.show(e)
        }
        show(e) {
            this._isShown || b.trigger(this._element, "show.bs.offcanvas", {
                relatedTarget: e
            }).defaultPrevented || (this._isShown = !0, this._element.style.visibility = "visible", this._backdrop.show(), this._config.scroll || ((new At).hide(), this._enforceFocusOnElement(this._element)), this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add("show"), this._queueCallback(() => {
                b.trigger(this._element, "shown.bs.offcanvas", {
                    relatedTarget: e
                })
            }, this._element, !0))
        }
        hide() {
            this._isShown && (b.trigger(this._element, "hide.bs.offcanvas").defaultPrevented || (b.off(document, "focusin.bs.offcanvas"), this._element.blur(), this._isShown = !1, this._element.classList.remove("show"), this._backdrop.hide(), this._queueCallback(() => {
                this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._element.style.visibility = "hidden", this._config.scroll || (new At).reset(), b.trigger(this._element, "hidden.bs.offcanvas")
            }, this._element, !0)))
        }
        dispose() {
            this._backdrop.dispose(), super.dispose(), b.off(document, "focusin.bs.offcanvas")
        }
        _getConfig(e) {
            return e = { ...Dt,
                ...o.getDataAttributes(this._element),
                ..."object" == typeof e ? e : {}
            }, i("offcanvas", e, St), e
        }
        _initializeBackDrop() {
            return new Ct({
                isVisible: this._config.backdrop,
                isAnimated: !0,
                rootElement: this._element.parentNode,
                clickCallback: () => this.hide()
            })
        }
        _enforceFocusOnElement(t) {
            b.off(document, "focusin.bs.offcanvas"), b.on(document, "focusin.bs.offcanvas", e => {
                document === e.target || t === e.target || t.contains(e.target) || t.focus()
            }), t.focus()
        }
        _addEventListeners() {
            b.on(this._element, "click.dismiss.bs.offcanvas", '[data-bs-dismiss="offcanvas"]', () => this.hide()), b.on(this._element, "keydown.dismiss.bs.offcanvas", e => {
                this._config.keyboard && "Escape" === e.key && this.hide()
            })
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = It.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            })
        }
    }
    b.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', function(e) {
        var t = n(this);
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(), p(this) || (b.one(t, "hidden.bs.offcanvas", () => {
            u(this) && this.focus()
        }), (e = f.findOne(".offcanvas.show")) && e !== t && It.getInstance(e).hide(), It.getOrCreateInstance(t).toggle(this))
    }), b.on(window, "load.bs.offcanvas.data-api", () => f.find(".offcanvas.show").forEach(e => It.getOrCreateInstance(e).show())), e(It);
    const Nt = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
        jt = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i,
        Mt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

    function Pt(e, i, s) {
        if (!e.length) return e;
        if (s && "function" == typeof s) return s(e);
        const n = (new window.DOMParser).parseFromString(e, "text/html"),
            o = Object.keys(i),
            r = [].concat(...n.body.querySelectorAll("*"));
        for (let e = 0, t = r.length; e < t; e++) {
            const s = r[e],
                n = s.nodeName.toLowerCase();
            if (o.includes(n)) {
                const a = [].concat(...s.attributes),
                    l = [].concat(i["*"] || [], i[n] || []);
                a.forEach(e => {
                    ((e, t) => {
                        var i = e.nodeName.toLowerCase();
                        if (t.includes(i)) return !Nt.has(i) || Boolean(jt.test(e.nodeValue) || Mt.test(e.nodeValue));
                        const s = t.filter(e => e instanceof RegExp);
                        for (let e = 0, t = s.length; e < t; e++)
                            if (s[e].test(i)) return !0;
                        return !1
                    })(e, l) || s.removeAttribute(e.nodeName)
                })
            } else s.remove()
        }
        return n.body.innerHTML
    }
    const Ht = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        Rt = new Set(["sanitize", "allowList", "sanitizeFn"]),
        Bt = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(array|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacements: "array",
            boundary: "(string|element)",
            customClass: "(string|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            allowList: "object",
            popperConfig: "(null|object|function)"
        },
        Wt = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: s() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: s() ? "right" : "left"
        },
        qt = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: [0, 0],
            container: !1,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            boundary: "clippingParents",
            customClass: "",
            sanitize: !0,
            sanitizeFn: null,
            allowList: {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "srcset", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            },
            popperConfig: null
        },
        zt = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip"
        };
    class Ut extends K {
        constructor(e, t) {
            if (void 0 === ft) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(e), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this._config = this._getConfig(t), this.tip = null, this._setListeners()
        }
        static get Default() {
            return qt
        }
        static get NAME() {
            return "tooltip"
        }
        static get Event() {
            return zt
        }
        static get DefaultType() {
            return Bt
        }
        enable() {
            this._isEnabled = !0
        }
        disable() {
            this._isEnabled = !1
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled
        }
        toggle(e) {
            if (this._isEnabled)
                if (e) {
                    const t = this._initializeOnDelegatedTarget(e);
                    t._activeTrigger.click = !t._activeTrigger.click, t._isWithActiveTrigger() ? t._enter(null, t) : t._leave(null, t)
                } else this.getTipElement().classList.contains("show") ? this._leave(null, this) : this._enter(null, this)
        }
        dispose() {
            clearTimeout(this._timeout), b.off(this._element.closest(".modal"), "hide.bs.modal", this._hideModalHandler), this.tip && this.tip.remove(), this._popper && this._popper.destroy(), super.dispose()
        }
        show() {
            if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
            if (this.isWithContent() && this._isEnabled) {
                const t = b.trigger(this._element, this.constructor.Event.SHOW),
                    i = m(this._element),
                    s = (null === i ? this._element.ownerDocument.documentElement : i).contains(this._element);
                if (!t.defaultPrevented && s) {
                    const n = this.getTipElement(),
                        o = l(this.constructor.NAME);
                    n.setAttribute("id", o), this._element.setAttribute("aria-describedby", o), this.setContent(), this._config.animation && n.classList.add("fade");
                    var e = "function" == typeof this._config.placement ? this._config.placement.call(this, n, this._element) : this._config.placement,
                        e = this._getAttachment(e);
                    this._addAttachmentClass(e);
                    const r = this._config["container"],
                        a = (F(n, this.constructor.DATA_KEY, this), this._element.ownerDocument.documentElement.contains(this.tip) || (r.appendChild(n), b.trigger(this._element, this.constructor.Event.INSERTED)), this._popper ? this._popper.update() : this._popper = ut(this._element, n, this._getPopperConfig(e)), n.classList.add("show"), "function" == typeof this._config.customClass ? this._config.customClass() : this._config.customClass);
                    a && n.classList.add(...a.split(" ")), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach(e => {
                        b.on(e, "mouseover", g)
                    });
                    e = this.tip.classList.contains("fade");
                    this._queueCallback(() => {
                        var e = this._hoverState;
                        this._hoverState = null, b.trigger(this._element, this.constructor.Event.SHOWN), "out" === e && this._leave(null, this)
                    }, this.tip, e)
                }
            }
        }
        hide() {
            if (this._popper) {
                const t = this.getTipElement();
                var e;
                b.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented || (t.classList.remove("show"), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach(e => b.off(e, "mouseover", g)), this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, e = this.tip.classList.contains("fade"), this._queueCallback(() => {
                    this._isWithActiveTrigger() || ("show" !== this._hoverState && t.remove(), this._cleanTipClass(), this._element.removeAttribute("aria-describedby"), b.trigger(this._element, this.constructor.Event.HIDDEN), this._popper && (this._popper.destroy(), this._popper = null))
                }, this.tip, e), this._hoverState = "")
            }
        }
        update() {
            null !== this._popper && this._popper.update()
        }
        isWithContent() {
            return Boolean(this.getTitle())
        }
        getTipElement() {
            if (this.tip) return this.tip;
            const e = document.createElement("div");
            return e.innerHTML = this._config.template, this.tip = e.children[0], this.tip
        }
        setContent() {
            const e = this.getTipElement();
            this.setElementContent(f.findOne(".tooltip-inner", e), this.getTitle()), e.classList.remove("fade", "show")
        }
        setElementContent(e, t) {
            if (null !== e) return h(t) ? (t = d(t), void(this._config.html ? t.parentNode !== e && (e.innerHTML = "", e.appendChild(t)) : e.textContent = t.textContent)) : void(this._config.html ? (this._config.sanitize && (t = Pt(t, this._config.allowList, this._config.sanitizeFn)), e.innerHTML = t) : e.textContent = t)
        }
        getTitle() {
            let e = this._element.getAttribute("data-bs-original-title");
            return e = e || ("function" == typeof this._config.title ? this._config.title.call(this._element) : this._config.title), e
        }
        updateAttachment(e) {
            return "right" === e ? "end" : "left" === e ? "start" : e
        }
        _initializeOnDelegatedTarget(e, t) {
            var i = this.constructor.DATA_KEY;
            return (t = t || $(e.delegateTarget, i)) || (t = new this.constructor(e.delegateTarget, this._getDelegateConfig()), F(e.delegateTarget, i, t)), t
        }
        _getOffset() {
            const t = this._config["offset"];
            return "string" == typeof t ? t.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof t ? e => t(e, this._element) : t
        }
        _getPopperConfig(e) {
            e = {
                placement: e,
                modifiers: [{
                    name: "flip",
                    options: {
                        fallbackPlacements: this._config.fallbackPlacements
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }, {
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "arrow",
                    options: {
                        element: `.${this.constructor.NAME}-arrow`
                    }
                }, {
                    name: "onChange",
                    enabled: !0,
                    phase: "afterWrite",
                    fn: e => this._handlePopperPlacementChange(e)
                }],
                onFirstUpdate: e => {
                    e.options.placement !== e.placement && this._handlePopperPlacementChange(e)
                }
            };
            return { ...e,
                ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(e) : this._config.popperConfig
            }
        }
        _addAttachmentClass(e) {
            this.getTipElement().classList.add("bs-tooltip-" + this.updateAttachment(e))
        }
        _getAttachment(e) {
            return Wt[e.toUpperCase()]
        }
        _setListeners() {
            this._config.trigger.split(" ").forEach(e => {
                var t;
                "click" === e ? b.on(this._element, this.constructor.Event.CLICK, this._config.selector, e => this.toggle(e)) : "manual" !== e && (t = "hover" === e ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN, e = "hover" === e ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT, b.on(this._element, t, this._config.selector, e => this._enter(e)), b.on(this._element, e, this._config.selector, e => this._leave(e)))
            }), this._hideModalHandler = () => {
                this._element && this.hide()
            }, b.on(this._element.closest(".modal"), "hide.bs.modal", this._hideModalHandler), this._config.selector ? this._config = { ...this._config,
                trigger: "manual",
                selector: ""
            } : this._fixTitle()
        }
        _fixTitle() {
            var e = this._element.getAttribute("title"),
                t = typeof this._element.getAttribute("data-bs-original-title");
            !e && "string" == t || (this._element.setAttribute("data-bs-original-title", e || ""), !e || this._element.getAttribute("aria-label") || this._element.textContent || this._element.setAttribute("aria-label", e), this._element.setAttribute("title", ""))
        }
        _enter(e, t) {
            t = this._initializeOnDelegatedTarget(e, t), e && (t._activeTrigger["focusin" === e.type ? "focus" : "hover"] = !0), t.getTipElement().classList.contains("show") || "show" === t._hoverState ? t._hoverState = "show" : (clearTimeout(t._timeout), t._hoverState = "show", t._config.delay && t._config.delay.show ? t._timeout = setTimeout(() => {
                "show" === t._hoverState && t.show()
            }, t._config.delay.show) : t.show())
        }
        _leave(e, t) {
            t = this._initializeOnDelegatedTarget(e, t), e && (t._activeTrigger["focusout" === e.type ? "focus" : "hover"] = t._element.contains(e.relatedTarget)), t._isWithActiveTrigger() || (clearTimeout(t._timeout), t._hoverState = "out", t._config.delay && t._config.delay.hide ? t._timeout = setTimeout(() => {
                "out" === t._hoverState && t.hide()
            }, t._config.delay.hide) : t.hide())
        }
        _isWithActiveTrigger() {
            for (const e in this._activeTrigger)
                if (this._activeTrigger[e]) return !0;
            return !1
        }
        _getConfig(e) {
            const t = o.getDataAttributes(this._element);
            return Object.keys(t).forEach(e => {
                Rt.has(e) && delete t[e]
            }), (e = { ...this.constructor.Default,
                ...t,
                ..."object" == typeof e && e ? e : {}
            }).container = !1 === e.container ? document.body : d(e.container), "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), i("tooltip", e, this.constructor.DefaultType), e.sanitize && (e.template = Pt(e.template, e.allowList, e.sanitizeFn)), e
        }
        _getDelegateConfig() {
            const e = {};
            if (this._config)
                for (const t in this._config) this.constructor.Default[t] !== this._config[t] && (e[t] = this._config[t]);
            return e
        }
        _cleanTipClass() {
            const t = this.getTipElement(),
                e = t.getAttribute("class").match(Ht);
            null !== e && 0 < e.length && e.map(e => e.trim()).forEach(e => t.classList.remove(e))
        }
        _handlePopperPlacementChange(e) {
            e = e.state;
            e && (this.tip = e.elements.popper, this._cleanTipClass(), this._addAttachmentClass(this._getAttachment(e.placement)))
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = Ut.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            })
        }
    }
    e(Ut);
    const Ft = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        $t = { ...Ut.Default,
            placement: "right",
            offset: [0, 8],
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        },
        Vt = { ...Ut.DefaultType,
            content: "(string|element|function)"
        },
        Kt = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover"
        };
    class Xt extends Ut {
        static get Default() {
            return $t
        }
        static get NAME() {
            return "popover"
        }
        static get Event() {
            return Kt
        }
        static get DefaultType() {
            return Vt
        }
        isWithContent() {
            return this.getTitle() || this._getContent()
        }
        getTipElement() {
            return this.tip || (this.tip = super.getTipElement(), this.getTitle() || f.findOne(".popover-header", this.tip).remove(), this._getContent() || f.findOne(".popover-body", this.tip).remove()), this.tip
        }
        setContent() {
            const e = this.getTipElement();
            this.setElementContent(f.findOne(".popover-header", e), this.getTitle());
            let t = this._getContent();
            "function" == typeof t && (t = t.call(this._element)), this.setElementContent(f.findOne(".popover-body", e), t), e.classList.remove("fade", "show")
        }
        _addAttachmentClass(e) {
            this.getTipElement().classList.add("bs-popover-" + this.updateAttachment(e))
        }
        _getContent() {
            return this._element.getAttribute("data-bs-content") || this._config.content
        }
        _cleanTipClass() {
            const t = this.getTipElement(),
                e = t.getAttribute("class").match(Ft);
            null !== e && 0 < e.length && e.map(e => e.trim()).forEach(e => t.classList.remove(e))
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = Xt.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            })
        }
    }
    e(Xt);
    const Yt = {
            offset: 10,
            method: "auto",
            target: ""
        },
        Qt = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        };
    class Gt extends K {
        constructor(e, t) {
            super(e), this._scrollElement = "BODY" === this._element.tagName ? window : this._element, this._config = this._getConfig(t), this._selector = `${this._config.target} .nav-link, ${this._config.target} .list-group-item, ${this._config.target} .dropdown-item`, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, b.on(this._scrollElement, "scroll.bs.scrollspy", () => this._process()), this.refresh(), this._process()
        }
        static get Default() {
            return Yt
        }
        static get NAME() {
            return "scrollspy"
        }
        refresh() {
            const e = this._scrollElement === this._scrollElement.window ? "offset" : "position",
                s = "auto" === this._config.method ? e : this._config.method,
                n = "position" === s ? this._getScrollTop() : 0;
            this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), f.find(this._selector).map(e => {
                const t = a(e),
                    i = t ? f.findOne(t) : null;
                if (i) {
                    const f = i.getBoundingClientRect();
                    if (f.width || f.height) return [o[s](i).top + n, t]
                }
                return null
            }).filter(e => e).sort((e, t) => e[0] - t[0]).forEach(e => {
                this._offsets.push(e[0]), this._targets.push(e[1])
            })
        }
        dispose() {
            b.off(this._scrollElement, ".bs.scrollspy"), super.dispose()
        }
        _getConfig(t) {
            if ("string" != typeof(t = { ...Yt,
                    ...o.getDataAttributes(this._element),
                    ..."object" == typeof t && t ? t : {}
                }).target && h(t.target)) {
                let e = t.target["id"];
                e || (e = l("scrollspy"), t.target.id = e), t.target = "#" + e
            }
            return i("scrollspy", t, Qt), t
        }
        _getScrollTop() {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
        }
        _getScrollHeight() {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        }
        _getOffsetHeight() {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
        }
        _process() {
            const t = this._getScrollTop() + this._config.offset,
                e = this._getScrollHeight(),
                i = this._config.offset + e - this._getOffsetHeight();
            if (this._scrollHeight !== e && this.refresh(), t >= i) {
                const t = this._targets[this._targets.length - 1];
                this._activeTarget !== t && this._activate(t)
            } else {
                if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                for (let e = this._offsets.length; e--;) this._activeTarget !== this._targets[e] && t >= this._offsets[e] && (void 0 === this._offsets[e + 1] || t < this._offsets[e + 1]) && this._activate(this._targets[e])
            }
        }
        _activate(t) {
            this._activeTarget = t, this._clear();
            const e = this._selector.split(",").map(e => e + `[data-bs-target="${t}"],${e}[href="${t}"]`),
                i = f.findOne(e.join(","));
            i.classList.contains("dropdown-item") ? (f.findOne(".dropdown-toggle", i.closest(".dropdown")).classList.add("active"), i.classList.add("active")) : (i.classList.add("active"), f.parents(i, ".nav, .list-group").forEach(e => {
                f.prev(e, ".nav-link, .list-group-item").forEach(e => e.classList.add("active")), f.prev(e, ".nav-item").forEach(e => {
                    f.children(e, ".nav-link").forEach(e => e.classList.add("active"))
                })
            })), b.trigger(this._scrollElement, "activate.bs.scrollspy", {
                relatedTarget: t
            })
        }
        _clear() {
            f.find(this._selector).filter(e => e.classList.contains("active")).forEach(e => e.classList.remove("active"))
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = Gt.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            })
        }
    }
    b.on(window, "load.bs.scrollspy.data-api", () => {
        f.find('[data-bs-spy="scroll"]').forEach(e => new Gt(e))
    }), e(Gt);
    class Zt extends K {
        static get NAME() {
            return "tab"
        }
        show() {
            if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE || !this._element.classList.contains("active")) {
                let e;
                const i = n(this._element),
                    s = this._element.closest(".nav, .list-group");
                if (s) {
                    const i = "UL" === s.nodeName || "OL" === s.nodeName ? ":scope > li > .active" : ".active";
                    e = f.find(i, s), e = e[e.length - 1]
                }
                var t = e ? b.trigger(e, "hide.bs.tab", {
                    relatedTarget: this._element
                }) : null;
                b.trigger(this._element, "show.bs.tab", {
                    relatedTarget: e
                }).defaultPrevented || null !== t && t.defaultPrevented || (this._activate(this._element, s), t = () => {
                    b.trigger(e, "hidden.bs.tab", {
                        relatedTarget: this._element
                    }), b.trigger(this._element, "shown.bs.tab", {
                        relatedTarget: e
                    })
                }, i ? this._activate(i, i.parentNode, t) : t())
            }
        }
        _activate(e, t, i) {
            const s = (!t || "UL" !== t.nodeName && "OL" !== t.nodeName ? f.children(t, ".active") : f.find(":scope > li > .active", t))[0],
                n = i && s && s.classList.contains("fade"),
                o = () => this._transitionComplete(e, s, i);
            s && n ? (s.classList.remove("show"), this._queueCallback(o, e, !0)) : o()
        }
        _transitionComplete(e, t, i) {
            if (t) {
                t.classList.remove("active");
                const e = f.findOne(":scope > .dropdown-menu .active", t.parentNode);
                e && e.classList.remove("active"), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !1)
            }
            e.classList.add("active"), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), _(e), e.classList.contains("fade") && e.classList.add("show");
            let s = e.parentNode;
            if (s && "LI" === s.nodeName && (s = s.parentNode), s && s.classList.contains("dropdown-menu")) {
                const t = e.closest(".dropdown");
                t && f.find(".dropdown-toggle", t).forEach(e => e.classList.add("active")), e.setAttribute("aria-expanded", !0)
            }
            i && i()
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = Zt.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            })
        }
    }
    b.on(document, "click.bs.tab.data-api", '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', function(e) {
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(), p(this) || Zt.getOrCreateInstance(this).show()
    }), e(Zt);
    const Jt = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        ei = {
            animation: !0,
            autohide: !0,
            delay: 5e3
        };
    class ti extends K {
        constructor(e, t) {
            super(e), this._config = this._getConfig(t), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
        }
        static get DefaultType() {
            return Jt
        }
        static get Default() {
            return ei
        }
        static get NAME() {
            return "toast"
        }
        show() {
            b.trigger(this._element, "show.bs.toast").defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove("hide"), _(this._element), this._element.classList.add("showing"), this._queueCallback(() => {
                this._element.classList.remove("showing"), this._element.classList.add("show"), b.trigger(this._element, "shown.bs.toast"), this._maybeScheduleHide()
            }, this._element, this._config.animation))
        }
        hide() {
            this._element.classList.contains("show") && (b.trigger(this._element, "hide.bs.toast").defaultPrevented || (this._element.classList.remove("show"), this._queueCallback(() => {
                this._element.classList.add("hide"), b.trigger(this._element, "hidden.bs.toast")
            }, this._element, this._config.animation)))
        }
        dispose() {
            this._clearTimeout(), this._element.classList.contains("show") && this._element.classList.remove("show"), super.dispose()
        }
        _getConfig(e) {
            return e = { ...ei,
                ...o.getDataAttributes(this._element),
                ..."object" == typeof e && e ? e : {}
            }, i("toast", e, this.constructor.DefaultType), e
        }
        _maybeScheduleHide() {
            this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
                this.hide()
            }, this._config.delay)))
        }
        _onInteraction(e, t) {
            switch (e.type) {
                case "mouseover":
                case "mouseout":
                    this._hasMouseInteraction = t;
                    break;
                case "focusin":
                case "focusout":
                    this._hasKeyboardInteraction = t
            }
            t ? this._clearTimeout() : (e = e.relatedTarget, this._element === e || this._element.contains(e) || this._maybeScheduleHide())
        }
        _setListeners() {
            b.on(this._element, "click.dismiss.bs.toast", '[data-bs-dismiss="toast"]', () => this.hide()), b.on(this._element, "mouseover.bs.toast", e => this._onInteraction(e, !0)), b.on(this._element, "mouseout.bs.toast", e => this._onInteraction(e, !1)), b.on(this._element, "focusin.bs.toast", e => this._onInteraction(e, !0)), b.on(this._element, "focusout.bs.toast", e => this._onInteraction(e, !1))
        }
        _clearTimeout() {
            clearTimeout(this._timeout), this._timeout = null
        }
        static jQueryInterface(t) {
            return this.each(function() {
                const e = ti.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            })
        }
    }
    return e(ti), {
        Alert: X,
        Button: Y,
        Carousel: oe,
        Collapse: le,
        Dropdown: r,
        Modal: xt,
        Offcanvas: It,
        Popover: Xt,
        ScrollSpy: Gt,
        Tab: Zt,
        Toast: ti,
        Tooltip: Ut
    }
});