/*!
 * Tipped - A Complete Javascript Tooltip Solution - v4.7.0
 * (c) 2012-2019 Nick Stakenburg
 *
 * http://www.tippedjs.com
 *
 * @license: https://creativecommons.org/licenses/by/4.0
 */
! function(t, i) {
    "function" == typeof define && define.amd ? define(["jquery"], i) : "object" == typeof module && module.exports ? module.exports = i(require("jquery")) : t.Tipped = i(jQuery)
}(this, function($) {
    var Tipped = {};
    $.extend(Tipped, {
        version: "4.7.0"
    }), Tipped.Skins = {
        base: {
            afterUpdate: !1,
            ajax: {},
            cache: !0,
            container: !1,
            containment: {
                selector: "viewport",
                padding: 5
            },
            close: !1,
            detach: !0,
            fadeIn: 200,
            fadeOut: 200,
            showDelay: 75,
            hideDelay: 25,
            hideAfter: !1,
            hideOn: {
                element: "mouseleave"
            },
            hideOthers: !1,
            position: "top",
            inline: !1,
            offset: {
                x: 0,
                y: 0
            },
            onHide: !1,
            onShow: !1,
            padding: !0,
            radius: !0,
            shadow: !0,
            showOn: {
                element: "mousemove"
            },
            size: "medium",
            spinner: !0,
            stem: !0,
            target: "element",
            voila: !0
        },
        reset: {
            ajax: !1,
            hideOn: {
                element: "mouseleave",
                tooltip: "mouseleave"
            },
            showOn: {
                element: "mouseenter",
                tooltip: "mouseenter"
            }
        }
    }, $.each("dark light gray red green blue lightyellow lightblue lightpink".split(" "), function(t, i) {
        Tipped.Skins[i] = {}
    });
    var Browser = (e = navigator.userAgent, {
            IE: !(!window.attachEvent || -1 !== e.indexOf("Opera")) && f("MSIE "),
            Opera: -1 < e.indexOf("Opera") && (!!window.opera && opera.version && parseFloat(opera.version()) || 7.55),
            WebKit: -1 < e.indexOf("AppleWebKit/") && f("AppleWebKit/"),
            Gecko: -1 < e.indexOf("Gecko") && -1 === e.indexOf("KHTML") && f("rv:"),
            MobileSafari: !!e.match(/Apple.*Mobile.*Safari/),
            Chrome: -1 < e.indexOf("Chrome") && f("Chrome/"),
            ChromeMobile: -1 < e.indexOf("CrMo") && f("CrMo/"),
            Android: -1 < e.indexOf("Android") && f("Android "),
            IEMobile: -1 < e.indexOf("IEMobile") && f("IEMobile/")
        }),
        e;

    function f(t) {
        var i = new RegExp(t + "([\\d.]+)").exec(e);
        return !i || parseFloat(i[1])
    }
    var Support = (i = document.createElement("div"), j = "Webkit Moz O ms Khtml".split(" "), {
            css: {
                animation: m("animation"),
                transform: m("transform"),
                prefixed: function(t) {
                    return m(t, "prefix")
                }
            },
            shadow: m("boxShadow") && m("pointerEvents"),
            touch: function() {
                try {
                    return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
                } catch (t) {
                    return !1
                }
            }()
        }),
        i, j;

    function m(t, e) {
        var s = t.charAt(0).toUpperCase() + t.substr(1);
        return function(t, e) {
            for (var s in t)
                if (void 0 !== i.style[t[s]]) return "prefix" !== e || t[s];
            return !1
        }((t + " " + j.join(s + " ") + s).split(" "), e)
    }
    var _slice = Array.prototype.slice,
        _ = {
            wrap: function(t, i) {
                var e = t;
                return function() {
                    var t = [$.proxy(e, this)].concat(_slice.call(arguments));
                    return i.apply(this, t)
                }
            },
            isElement: function(t) {
                return t && 1 === t.nodeType
            },
            isText: function(t) {
                return t && 3 === t.nodeType
            },
            isDocumentFragment: function(t) {
                return t && 11 === t.nodeType
            },
            delay: function(t, i) {
                var e = _slice.call(arguments, 2);
                return setTimeout(function() {
                    return t.apply(t, e)
                }, i)
            },
            defer: function(t) {
                return _.delay.apply(this, [t, 1].concat(_slice.call(arguments, 1)))
            },
            pointer: function(t) {
                return {
                    x: t.pageX,
                    y: t.pageY
                }
            },
            element: {
                isAttached: function(t) {
                    var i = function(t) {
                        for (var i = t; i && i.parentNode;) i = i.parentNode;
                        return i
                    }(t);
                    return !(!i || !i.body)
                }
            }
        };

    function degrees(t) {
        return 180 * t / Math.PI
    }

    function radian(t) {
        return t * Math.PI / 180
    }

    function sec(t) {
        return 1 / Math.cos(t)
    }

    function sfcc(t) {
        return String.fromCharCode.apply(String, t.replace(" ", "").split(","))
    }

    function deepExtend(t, i) {
        for (var e in i) i[e] && i[e].constructor && i[e].constructor === Object ? (t[e] = $.extend({}, t[e]) || {}, deepExtend(t[e], i[e])) : t[e] = i[e];
        return t
    }
    var getUID = (U = 0, function(t) {
            for (t = t || "_tipped-uid-", U++; document.getElementById(t + U);) U++;
            return t + U
        }),
        U, Position = {
            positions: ["topleft", "topmiddle", "topright", "righttop", "rightmiddle", "rightbottom", "bottomright", "bottommiddle", "bottomleft", "leftbottom", "leftmiddle", "lefttop"],
            regex: {
                toOrientation: /^(top|left|bottom|right)(top|left|bottom|right|middle|center)$/,
                horizontal: /^(top|bottom)/,
                isCenter: /(middle|center)/,
                side: /^(top|bottom|left|right)/
            },
            toDimension: (X = {
                top: "height",
                left: "width",
                bottom: "height",
                right: "width"
            }, function(t) {
                return X[t]
            }),
            isCenter: function(t) {
                return !!t.toLowerCase().match(this.regex.isCenter)
            },
            isCorner: function(t) {
                return !this.isCenter(t)
            },
            getOrientation: function(t) {
                return t.toLowerCase().match(this.regex.horizontal) ? "horizontal" : "vertical"
            },
            getSide: function(t) {
                var i = null,
                    e = t.toLowerCase().match(this.regex.side);
                return e && e[1] && (i = e[1]), i
            },
            split: function(t) {
                return t.toLowerCase().match(this.regex.toOrientation)
            },
            _flip: {
                top: "bottom",
                bottom: "top",
                left: "right",
                right: "left"
            },
            flip: function(t, i) {
                var e = this.split(t);
                return i ? this.inverseCornerPlane(this.flip(this.inverseCornerPlane(t))) : this._flip[e[1]] + e[2]
            },
            inverseCornerPlane: function(t) {
                if (Position.isCorner(t)) {
                    var i = this.split(t);
                    return i[2] + i[1]
                }
                return t
            },
            adjustOffsetBasedOnPosition: function(t, i, e) {
                var s = $.extend({}, t),
                    o = {
                        horizontal: "x",
                        vertical: "y"
                    },
                    n = Position.getOrientation(i);
                if (n === Position.getOrientation(e)) {
                    if (Position.getSide(i) !== Position.getSide(e)) s[{
                        x: "y",
                        y: "x"
                    }[o[n]]] *= -1
                } else {
                    var r = s.x;
                    s.x = s.y, s.y = r;
                    var h = {
                        top: {
                            right: "x"
                        },
                        bottom: {
                            left: "x"
                        },
                        left: {
                            bottom: "y"
                        },
                        right: {
                            top: "y"
                        }
                    }[Position.getSide(i)][Position.getSide(e)];
                    h && (s[h] *= -1), s[o[Position.getOrientation(e)]] = 0
                }
                return s
            },
            getBoxFromPoints: function(t, i, e, s) {
                var o = Math.min(t, e),
                    n = Math.max(t, e),
                    r = Math.min(i, s),
                    h = Math.max(i, s);
                return {
                    left: o,
                    top: r,
                    width: Math.max(n - o, 0),
                    height: Math.max(h - r, 0)
                }
            },
            isPointWithinBox: function(t, i, e, s, o, n) {
                var r = this.getBoxFromPoints(e, s, o, n);
                return t >= r.left && t <= r.left + r.width && i >= r.top && i <= r.top + r.height
            },
            isPointWithinBoxLayout: function(t, i, e) {
                return this.isPointWithinBox(t, i, e.position.left, e.position.top, e.position.left + e.dimensions.width, e.position.top + e.dimensions.height)
            },
            getDistance: function(t, i, e, s) {
                return Math.sqrt(Math.pow(Math.abs(e - t), 2) + Math.pow(Math.abs(s - i), 2))
            },
            intersectsLine: function(t, i, e, s, o, n, r, h, a) {
                return a ? (u = ((l = r - o) * (i - n) - (c = h - n) * (t - o)) / (-l * (p = s - i) + (d = e - t) * c), 0 <= (f = (-p * (t - o) + d * (i - n)) / (-l * p + d * c)) && f <= 1 && 0 <= u && u <= 1 && {
                    x: t + u * d,
                    y: i + u * p
                }) : Sa(t, i, o, n, r, h) != Sa(e, s, o, n, r, h) && Sa(t, i, e, s, o, n) != Sa(t, i, e, s, r, h);
                var d, p, l, c, f, u
            }
        },
        X;

    function Sa(t, i, e, s, o, n) {
        var r = (n - i) * (e - t) - (s - i) * (o - t);
        return 0 < r || !(r < 0)
    }
    var Bounds = {
            viewport: function() {
                return Browser.MobileSafari || Browser.Android && Browser.Gecko ? {
                    width: window.innerWidth,
                    height: window.innerHeight
                } : {
                    height: $(window).height(),
                    width: $(window).width()
                }
            }
        },
        Mouse = {
            _buffer: {
                pageX: 0,
                pageY: 0
            },
            _dimensions: {
                width: 30,
                height: 30
            },
            _shift: {
                x: 2,
                y: 10
            },
            getPosition: function(t) {
                var i = this.getActualPosition(t);
                return {
                    left: i.left - Math.round(.5 * this._dimensions.width) + this._shift.x,
                    top: i.top - Math.round(.5 * this._dimensions.height) + this._shift.y
                }
            },
            getActualPosition: function(t) {
                var i = t && "number" === $.type(t.pageX) ? t : this._buffer;
                return {
                    left: i.pageX,
                    top: i.pageY
                }
            },
            getDimensions: function() {
                return this._dimensions
            }
        },
        Color = (ub = {
            _default: "#000000",
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00"
        }, {
            toRGB: function(t) {
                if (/^rgba?\(/.test(t)) return function(t) {
                    return "#" + vb((t = t.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/))[1]) + vb(t[2]) + vb(t[3])
                }(t);
                ub[t] && (t = ub[t]);
                var i = t.replace("#", "");
                return /^(?:[0-9a-fA-F]{3}){1,2}$/.test(i) ? (3 == i.length && (i = i.charAt(0) + i.charAt(0) + i.charAt(1) + i.charAt(1) + i.charAt(2) + i.charAt(2)), "#" + i) : ub._default
            }
        }),
        ub;

    function vb(t) {
        return ("0" + parseInt(t).toString(16)).slice(-2)
    }

    function Spin() {
        return this.initialize.apply(this, _slice.call(arguments))
    }

    function Visible() {
        return this.initialize.apply(this, _slice.call(arguments))
    }
    Spin.supported = Support.css.transform && Support.css.animation, $.extend(Spin.prototype, {
        initialize: function() {
            this.options = $.extend({}, arguments[0] || {}), this.build(), this.start()
        },
        build: function() {
            var t = 2 * (this.options.length + this.options.radius),
                i = {
                    height: t,
                    width: t
                };
            this.element = $("<div>").addClass("tpd-spin").css(i), this.element.append(this._rotate = $("<div>").addClass("tpd-spin-rotate")), this.element.css({
                "margin-left": -.5 * i.width,
                "margin-top": -.5 * i.height
            });
            for (var e = this.options.lines, s = 0; s < e; s++) {
                var o, n;
                this._rotate.append(o = $("<div>").addClass("tpd-spin-frame").append(n = $("<div>").addClass("tpd-spin-line"))), n.css({
                    "background-color": this.options.color,
                    width: this.options.width,
                    height: this.options.length,
                    "margin-left": -.5 * this.options.width,
                    "border-radius": Math.round(.5 * this.options.width)
                }), o.css({
                    opacity: (1 / e * (s + 1)).toFixed(2)
                });
                var r = {};
                r[Support.css.prefixed("transform")] = "rotate(" + 360 / e * (s + 1) + "deg)", o.css(r)
            }
        },
        start: function() {
            var t = {};
            t[Support.css.prefixed("animation")] = "tpd-spin 1s infinite steps(" + this.options.lines + ")", this._rotate.css(t)
        },
        stop: function() {
            var t = {};
            t[Support.css.prefixed("animation")] = "none", this._rotate.css(t), this.element.detach()
        }
    }), $.extend(Visible.prototype, {
        initialize: function(t) {
            return t = "array" == $.type(t) ? t : [t], this.elements = t, this._restore = [], $.each(t, $.proxy(function(t, i) {
                var e = $(i).is(":visible");
                e || $(i).show(), this._restore.push({
                    element: i,
                    visible: e
                })
            }, this)), this
        },
        restore: function() {
            $.each(this._restore, function(t, i) {
                i.visible || $(i.element).show()
            }), this._restore = null
        }
    });
    var AjaxCache = (Qb = [], {
            get: function(t) {
                for (var i = null, e = 0; e < Qb.length; e++) Qb[e] && Qb[e].url === t.url && (Qb[e].type || "GET").toUpperCase() === (t.type || "GET").toUpperCase() && $.param(Qb[e].data || {}) === $.param(t.data || {}) && (i = Qb[e]);
                return i
            },
            set: function(t, i, e) {
                var s = this.get(t);
                s || (s = $.extend({
                    callbacks: {}
                }, t), Qb.push(s)), s.callbacks[i] = e
            },
            remove: function(t) {
                for (var i = 0; i < Qb.length; i++) Qb[i] && Qb[i].url === t && delete Qb[i]
            },
            clear: function() {
                Qb = []
            }
        }),
        Qb, Voila = function(r) {
            function h(t, i, e) {
                if (!(this instanceof h)) return new h(t, i, e);
                var s = r.type(i),
                    o = "object" === s ? i : {},
                    n = "function" === s ? i : "function" === r.type(e) && e;
                return this.options = r.extend({
                    method: "onload"
                }, o), this.deferred = new jQuery.Deferred, n && this.always(n), this._processed = 0, this.images = [], this._add(t), this
            }
            r.extend(h.prototype, {
                _add: function(t) {
                    var i = "string" == r.type(t) ? r(t) : t instanceof jQuery || 0 < t.length ? t : [t];
                    r.each(i, r.proxy(function(t, i) {
                        var e = r(),
                            s = r(i);
                        (e = s.is("img") ? e.add(s) : e.add(s.find("img"))).each(r.proxy(function(t, i) {
                            this.images.push(new o(i, r.proxy(function(t) {
                                this._progress(t)
                            }, this), r.proxy(function(t) {
                                this._progress(t)
                            }, this), this.options))
                        }, this))
                    }, this)), this.images.length < 1 && setTimeout(r.proxy(function() {
                        this._resolve()
                    }, this))
                },
                abort: function() {
                    this._progress = this._notify = this._reject = this._resolve = function() {}, r.each(this.images, function(t, i) {
                        i.abort()
                    }), this.images = []
                },
                _progress: function(t) {
                    this._processed++, t.isLoaded || (this._broken = !0), this._notify(t), this._processed === this.images.length && this[this._broken ? "_reject" : "_resolve"]()
                },
                _notify: function(t) {
                    this.deferred.notify(this, t)
                },
                _reject: function() {
                    this.deferred.reject(this)
                },
                _resolve: function() {
                    this.deferred.resolve(this)
                },
                always: function(t) {
                    return this.deferred.always(t), this
                },
                done: function(t) {
                    return this.deferred.done(t), this
                },
                fail: function(t) {
                    return this.deferred.fail(t), this
                },
                progress: function(t) {
                    return this.deferred.progress(t), this
                }
            });
            var o = function(n) {
                function t() {
                    return this.initialize.apply(this, Array.prototype.slice.call(arguments))
                }
                n.extend(t.prototype, {
                    initialize: function() {
                        this.options = n.extend({
                            test: function() {},
                            success: function() {},
                            timeout: function() {},
                            callAt: !1,
                            intervals: [
                                [0, 0],
                                [1e3, 10],
                                [2e3, 50],
                                [4e3, 100],
                                [2e4, 500]
                            ]
                        }, arguments[0] || {}), this._test = this.options.test, this._success = this.options.success, this._timeout = this.options.timeout, this._ipos = 0, this._time = 0, this._delay = this.options.intervals[this._ipos][1], this._callTimeouts = [], this.poll(), this._createCallsAt()
                    },
                    poll: function() {
                        this._polling = setTimeout(n.proxy(function() {
                            if (this._test()) this.success();
                            else {
                                if (this._time += this._delay, this._time >= this.options.intervals[this._ipos][0]) {
                                    if (!this.options.intervals[this._ipos + 1]) return void("function" == n.type(this._timeout) && this._timeout());
                                    this._ipos++, this._delay = this.options.intervals[this._ipos][1]
                                }
                                this.poll()
                            }
                        }, this), this._delay)
                    },
                    success: function() {
                        this.abort(), this._success()
                    },
                    _createCallsAt: function() {
                        this.options.callAt && n.each(this.options.callAt, n.proxy(function(t, i) {
                            var e = i[0],
                                s = i[1],
                                o = setTimeout(n.proxy(function() {
                                    s()
                                }, this), e);
                            this._callTimeouts.push(o)
                        }, this))
                    },
                    _stopCallTimeouts: function() {
                        n.each(this._callTimeouts, function(t, i) {
                            clearTimeout(i)
                        }), this._callTimeouts = []
                    },
                    abort: function() {
                        this._stopCallTimeouts(), this._polling && (clearTimeout(this._polling), this._polling = null)
                    }
                });

                function i() {
                    return this.initialize.apply(this, Array.prototype.slice.call(arguments))
                }
                return n.extend(i.prototype, {
                    supports: {
                        naturalWidth: "naturalWidth" in new Image
                    },
                    initialize: function(t, i, e) {
                        this.img = n(t)[0], this.successCallback = i, this.errorCallback = e, this.isLoaded = !1, this.options = n.extend({
                            method: "onload",
                            pollFallbackAfter: 1e3
                        }, arguments[3] || {}), "onload" != this.options.method && this.supports.naturalWidth ? this.poll() : this.load()
                    },
                    poll: function() {
                        this._poll = new t({
                            test: n.proxy(function() {
                                return 0 < this.img.naturalWidth
                            }, this),
                            success: n.proxy(function() {
                                this.success()
                            }, this),
                            timeout: n.proxy(function() {
                                this.error()
                            }, this),
                            callAt: [
                                [this.options.pollFallbackAfter, n.proxy(function() {
                                    this.load()
                                }, this)]
                            ]
                        })
                    },
                    load: function() {
                        this._loading = setTimeout(n.proxy(function() {
                            var t = new Image;
                            (this._onloadImage = t).onload = n.proxy(function() {
                                t.onload = function() {}, this.supports.naturalWidth || (this.img.naturalWidth = t.width, this.img.naturalHeight = t.height, t.naturalWidth = t.width, t.naturalHeight = t.height), this.success()
                            }, this), t.onerror = n.proxy(this.error, this), t.src = this.img.src
                        }, this))
                    },
                    success: function() {
                        this._calledSuccess || (this._calledSuccess = !0, this.abort(), this.waitForRender(n.proxy(function() {
                            this.isLoaded = !0, this.successCallback(this)
                        }, this)))
                    },
                    error: function() {
                        this._calledError || (this._calledError = !0, this.abort(), this._errorRenderTimeout = setTimeout(n.proxy(function() {
                            this.errorCallback && this.errorCallback(this)
                        }, this)))
                    },
                    abort: function() {
                        this.stopLoading(), this.stopPolling(), this.stopWaitingForRender()
                    },
                    stopPolling: function() {
                        this._poll && (this._poll.abort(), this._poll = null)
                    },
                    stopLoading: function() {
                        this._loading && (clearTimeout(this._loading), this._loading = null), this._onloadImage && (this._onloadImage.onload = function() {}, this._onloadImage.onerror = function() {})
                    },
                    waitForRender: function(t) {
                        this._renderTimeout = setTimeout(t)
                    },
                    stopWaitingForRender: function() {
                        this._renderTimeout && (clearTimeout(this._renderTimeout), this._renderTimeout = null), this._errorRenderTimeout && (clearTimeout(this._errorRenderTimeout), this._errorRenderTimeout = null)
                    }
                }), i
            }(jQuery);
            return h
        }(jQuery);
    Tipped.Behaviors = {
        hide: {
            showOn: {
                element: "mouseenter",
                tooltip: !1
            },
            hideOn: {
                element: "mouseleave",
                tooltip: "mouseenter"
            }
        },
        mouse: {
            showOn: {
                element: "mouseenter",
                tooltip: !1
            },
            hideOn: {
                element: "mouseleave",
                tooltip: "mouseenter"
            },
            target: "mouse",
            showDelay: 100,
            fadeIn: 0,
            hideDelay: 0,
            fadeOut: 0
        },
        sticky: {
            showOn: {
                element: "mouseenter",
                tooltip: "mouseenter"
            },
            hideOn: {
                element: "mouseleave",
                tooltip: "mouseleave"
            },
            showDelay: 150,
            target: "mouse",
            fixed: !0
        }
    };
    var Options = {
            create: Rc
        },
        Oc, Pc;

    function Rc(t) {
        return Oc = Tipped.Skins.base, Pc = deepExtend($.extend({}, Oc), Tipped.Skins.reset), (Rc = Uc)(t)
    }

    function Sc(t) {
        return t.match(/^(top|left|bottom|right)$/) && (t += "middle"), t.replace("center", "middle").replace(" ", ""), t
    }

    function Tc(t) {
        var i;
        return t.behavior && (i = Tipped.Behaviors[t.behavior]) ? deepExtend($.extend({}, i), t) : t
    }

    function Uc(t) {
        var i = t.skin ? t.skin : Tooltips.options.defaultSkin,
            e = $.extend({}, Tipped.Skins[i] || {});
        e.skin || (e.skin = Tooltips.options.defaultSkin || "dark");
        var s, o = deepExtend($.extend({}, Pc), Tc(e)),
            n = deepExtend($.extend({}, o), Tc(t));
        if (n.ajax) {
            Pc.ajax;
            var r = Oc.ajax;
            "boolean" === $.type(n.ajax) && (n.ajax = {}), n.ajax = deepExtend($.extend({}, r), n.ajax)
        }
        var h = h = n.position && n.position.target || "string" === $.type(n.position) && n.position || Pc.position && Pc.position.target || "string" === $.type(Pc.position) && Pc.position || Oc.position && Oc.position.target || Oc.position;
        h = Sc(h);
        var a, d = n.position && n.position.tooltip || Pc.position && Pc.position.tooltip || Oc.position && Oc.position.tooltip || Tooltips.Position.getInversedPosition(h);
        if (d = Sc(d), n.position ? "string" === $.type(n.position) ? (n.position = Sc(n.position), s = {
                target: n.position,
                tooltip: Tooltips.Position.getTooltipPositionFromTarget(n.position)
            }) : (s = {
                tooltip: d,
                target: h
            }, n.position.tooltip && (s.tooltip = Sc(n.position.tooltip)), n.position.target && (s.target = Sc(n.position.target))) : s = {
                tooltip: d,
                target: h
            }, Position.isCorner(s.target) && Position.getOrientation(s.target) !== Position.getOrientation(s.tooltip) && (s.target = Position.inverseCornerPlane(s.target)), "mouse" === n.target) {
            var p = Position.getOrientation(s.target);
            s.target = "horizontal" === p ? s.target.replace(/(left|right)/, "middle") : s.target.replace(/(top|bottom)/, "middle")
        }
        if (n.position = s, "mouse" === n.target ? (a = $.extend({}, Oc.offset), $.extend(a, Tipped.Skins.reset.offset || {}), t.skin && $.extend(a, (Tipped.Skins[t.skin] || Tipped.Skins[Tooltips.options.defaultSkin] || {}).offset || {}), a = Position.adjustOffsetBasedOnPosition(Oc.offset, Oc.position, s.target, !0), t.offset && (a = $.extend(a, t.offset || {}))) : a = {
                x: n.offset.x,
                y: n.offset.y
            }, n.offset = a, n.hideOn && "click-outside" === n.hideOn && (n.hideOnClickOutside = !0, n.hideOn = !1, n.fadeOut = 0), n.showOn) {
            var l = n.showOn;
            "string" === $.type(l) && (l = {
                element: l
            }), n.showOn = l
        }
        if (n.hideOn) {
            var c = n.hideOn;
            "string" === $.type(c) && (c = {
                element: c
            }), n.hideOn = c
        }
        return n.inline && "string" !== $.type(n.inline) && (n.inline = !1), Browser.IE && Browser.IE < 9 && $.extend(n, {
            fadeIn: 0,
            fadeOut: 0,
            hideDelay: 0
        }), n.spinner && (Spin.supported ? "boolean" === $.type(n.spinner) && (n.spinner = Pc.spinner || Oc.spinner || {}) : n.spinner = !1), n.container || (n.container = document.body), n.containment && "string" === $.type(n.containment) && (n.containment = {
            selector: n.containment,
            padding: Pc.containment && Pc.containment.padding || Oc.padding && Oc.containment.padding
        }), n.shadow && (n.shadow = Support.shadow), n
    }

    function Skin() {
        this.initialize.apply(this, _slice.call(arguments))
    }

    function Stem() {
        this.initialize.apply(this, _slice.call(arguments))
    }
    $.extend(Skin.prototype, {
        initialize: function(t) {
            this.tooltip = t, this.element = t._skin;
            var i, e, s, o, n = this.tooltip.options;
            this.tooltip._tooltip[(n.shadow ? "remove" : "add") + "Class"]("tpd-no-shadow")[(n.radius ? "remove" : "add") + "Class"]("tpd-no-radius")[(n.stem ? "remove" : "add") + "Class"]("tpd-no-stem");
            var r = Support.css.prefixed("borderTopLeftRadius");
            this.element.append(i = $("<div>").addClass("tpd-frames").append($("<div>").addClass("tpd-frame").append($("<div>").addClass("tpd-backgrounds").append(e = $("<div>").addClass("tpd-background").append(s = $("<div>").addClass("tpd-background-content")))))).append(o = $("<div>").addClass("tpd-spinner")), e.css({
                width: 999,
                height: 999,
                zoom: 1
            }), this._css = {
                border: parseFloat(e.css("border-top-width")),
                radius: parseFloat(r ? e.css(r) : 0),
                padding: parseFloat(t._content.css("padding-top")),
                borderColor: e.css("border-top-color"),
                backgroundColor: s.css("background-color"),
                backgroundOpacity: s.css("opacity"),
                spinner: {
                    dimensions: {
                        width: o.innerWidth(),
                        height: o.innerHeight()
                    }
                }
            }, o.remove(), i.remove(), this._side = Position.getSide(t.options.position.tooltip) || "top", this._vars = {}
        },
        destroy: function() {
            this.frames && ($.each("top right bottom left".split(" "), $.proxy(function(t, i) {
                this["stem_" + i] && this["stem_" + i].destroy()
            }, this)), this.frames.remove(), this.frames = null)
        },
        build: function() {
            this.frames || (this.element.append(this.frames = $("<div>").addClass("tpd-frames")), $.each("top right bottom left".split(" "), $.proxy(function(t, i) {
                this.insertFrame(i)
            }, this)), this._spinner || this.tooltip._tooltip.append(this._spinner = $("<div>").addClass("tpd-spinner").hide().append($("<div>").addClass("tpd-spinner-spin"))))
        },
        _frame: function() {
            var e, t = $("<div>").addClass("tpd-frame").append(e = $("<div>").addClass("tpd-backgrounds").append($("<div>").addClass("tpd-background-shadow"))).append($("<div>").addClass("tpd-shift-stem").append($("<div>").addClass("tpd-shift-stem-side tpd-shift-stem-side-before")).append($("<div>").addClass("tpd-stem")).append($("<div>").addClass("tpd-shift-stem-side tpd-shift-stem-side-after")));
            return $.each("top right bottom left".split(" "), $.proxy(function(t, i) {
                e.append($("<div>").addClass("tpd-background-box tpd-background-box-" + i).append($("<div>").addClass("tpd-background-box-shift").append($("<div>").addClass("tpd-background-box-shift-further").append($("<div>").addClass("tpd-background").append($("<div>").addClass("tpd-background-title")).append($("<div>").addClass("tpd-background-content"))).append($("<div>").addClass("tpd-background tpd-background-loading")).append($("<div>").addClass("tpd-background-border-hack").hide()))))
            }, this)), t
        }(),
        _getFrame: function(t) {
            var i = this._frame.clone();
            i.addClass("tpd-frame-" + t), i.find(".tpd-background-shadow").css({
                "border-radius": this._css.radius
            }), this.tooltip.options.stem && i.find(".tpd-stem").attr("data-stem-position", t);
            var e = Math.max(this._css.radius - this._css.border, 0);
            i.find(".tpd-background-title").css({
                "border-top-left-radius": e,
                "border-top-right-radius": e
            }), i.find(".tpd-background-content").css({
                "border-bottom-left-radius": e,
                "border-bottom-right-radius": e
            }), i.find(".tpd-background-loading").css({
                "border-radius": e
            });
            var s = {
                backgroundColor: this._css.borderColor
            };
            s["horizontal" === Position.getOrientation(t) ? "height" : "width"] = this._css.border + "px";
            return s[{
                top: "bottom",
                bottom: "top",
                left: "right",
                right: "left"
            }[t]] = 0, i.find(".tpd-shift-stem-side").css(s), i
        },
        insertFrame: function(t) {
            var i = this["frame_" + t] = this._getFrame(t);
            if (this.frames.append(i), this.tooltip.options.stem) {
                var e = i.find(".tpd-stem");
                this["stem_" + t] = new Stem(e, this, {})
            }
        },
        startLoading: function() {
            this.tooltip.supportsLoading && (this.build(), this._spinner || this.tooltip.is("resize-to-content") || this.setDimensions(this._css.spinner.dimensions), this._spinner && this._spinner.show())
        },
        stopLoading: function() {
            this.tooltip.supportsLoading && this._spinner && (this.build(), this._spinner.hide())
        },
        updateBackground: function() {
            var t = this._vars.frames[this._side],
                i = $.extend({}, t.background.dimensions);
            if (this.tooltip.title && !this.tooltip.is("loading")) {
                this.element.find(".tpd-background-title, .tpd-background-content").show(), this.element.find(".tpd-background").css({
                    "background-color": "transparent"
                });
                var e = $.extend({}, i),
                    s = Math.max(this._css.radius - this._css.border, 0),
                    o = {
                        "border-top-left-radius": s,
                        "border-top-right-radius": s,
                        "border-bottom-left-radius": s,
                        "border-bottom-right-radius": s
                    },
                    n = new Visible(this.tooltip._tooltip),
                    r = this.tooltip._titleWrapper.innerHeight();
                e.height -= r, this.element.find(".tpd-background-title").css({
                    height: r,
                    width: i.width
                }), o["border-top-left-radius"] = 0, o["border-top-right-radius"] = 0, n.restore(), this.element.find(".tpd-background-content").css(e).css(o), this.element.find(".tpd-background-loading").css({
                    "background-color": this._css.backgroundColor
                })
            } else this.element.find(".tpd-background-title, .tpd-background-content").hide(), this.element.find(".tpd-background").css({
                "background-color": this._css.backgroundColor
            });
            this._css.border && (this.element.find(".tpd-background").css({
                "border-color": "transparent"
            }), this.element.find(".tpd-background-border-hack").css({
                width: i.width,
                height: i.height,
                "border-radius": this._css.radius,
                "border-width": this._css.border,
                "border-color": this._css.borderColor
            }).show())
        },
        paint: function() {
            if (!this._paintedDimensions || this._paintedDimensions.width !== this._dimensions.width || this._paintedDimensions.height !== this._dimensions.height || this._paintedStemPosition !== this._stemPosition) {
                this._paintedDimensions = this._dimensions, this._paintedStemPosition = this._stemPosition, this.element.removeClass("tpd-visible-frame-top tpd-visible-frame-bottom tpd-visible-frame-left tpd-visible-frame-right").addClass("tpd-visible-frame-" + this._side);
                var t = this._vars.frames[this._side],
                    i = $.extend({}, t.background.dimensions);
                this.element.find(".tpd-background").css(i), this.element.find(".tpd-background-shadow").css({
                    width: i.width + 2 * this._css.border,
                    height: i.height + 2 * this._css.border
                }), this.updateBackground(), this.element.find(".tpd-background-box-shift, .tpd-background-box-shift-further").removeAttr("style"), this.element.add(this.frames).add(this.tooltip._tooltip).css(t.dimensions);
                var e = this._side,
                    s = this._vars.frames[e],
                    o = this.element.find(".tpd-frame-" + this._side),
                    n = this._vars.frames[e].dimensions;
                o.css(n), o.find(".tpd-backgrounds").css($.extend({}, s.background.position, {
                    width: n.width - s.background.position.left,
                    height: n.height - s.background.position.top
                }));
                var r = Position.getOrientation(e);
                if (this.tooltip.options.stem)
                    if (o.find(".tpd-shift-stem").css($.extend({}, s.shift.dimensions, s.shift.position)), "vertical" === r) {
                        (a = o.find(".tpd-background-box-top, .tpd-background-box-bottom")).css({
                            height: this._vars.cut,
                            width: this._css.border
                        }), o.find(".tpd-background-box-bottom").css({
                            top: s.dimensions.height - this._vars.cut
                        }).find(".tpd-background-box-shift").css({
                            "margin-top": -1 * s.dimensions.height + this._vars.cut
                        });
                        var h = "right" === e ? s.dimensions.width - s.stemPx - this._css.border : 0;
                        a.css({
                            left: h
                        }).find(".tpd-background-box-shift").css({
                            "margin-left": -1 * h
                        }), o.find(".tpd-background-box-" + ("left" == e ? "left" : "right")).hide(), "right" === e ? o.find(".tpd-background-box-left").css({
                            width: s.dimensions.width - s.stemPx - this._css.border
                        }) : o.find(".tpd-background-box-right").css({
                            "margin-left": this._css.border
                        }).find(".tpd-background-box-shift").css({
                            "margin-left": -1 * this._css.border
                        }), (d = o.find(".tpd-background-box-" + this._side)).css({
                            height: s.dimensions.height - 2 * this._vars.cut,
                            "margin-top": this._vars.cut
                        }), d.find(".tpd-background-box-shift").css({
                            "margin-top": -1 * this._vars.cut
                        })
                    } else {
                        var a;
                        (a = o.find(".tpd-background-box-left, .tpd-background-box-right")).css({
                            width: this._vars.cut,
                            height: this._css.border
                        }), o.find(".tpd-background-box-right").css({
                            left: s.dimensions.width - this._vars.cut
                        }).find(".tpd-background-box-shift").css({
                            "margin-left": -1 * s.dimensions.width + this._vars.cut
                        });
                        var d;
                        h = "bottom" === e ? s.dimensions.height - s.stemPx - this._css.border : 0;
                        a.css({
                            top: h
                        }).find(".tpd-background-box-shift").css({
                            "margin-top": -1 * h
                        }), o.find(".tpd-background-box-" + ("top" === e ? "top" : "bottom")).hide(), "bottom" === e ? o.find(".tpd-background-box-top").css({
                            height: s.dimensions.height - s.stemPx - this._css.border
                        }) : o.find(".tpd-background-box-bottom").css({
                            "margin-top": this._css.border
                        }).find(".tpd-background-box-shift").css({
                            "margin-top": -1 * this._css.border
                        }), (d = o.find(".tpd-background-box-" + this._side)).css({
                            width: s.dimensions.width - 2 * this._vars.cut,
                            "margin-left": this._vars.cut
                        }), d.find(".tpd-background-box-shift").css({
                            "margin-left": -1 * this._vars.cut
                        })
                    }
                var p = t.background,
                    l = p.position,
                    c = p.dimensions;
                this._spinner.css({
                    top: l.top + this._css.border + (.5 * c.height - .5 * this._css.spinner.dimensions.height),
                    left: l.left + this._css.border + (.5 * c.width - .5 * this._css.spinner.dimensions.width)
                })
            }
        },
        getVars: function() {
            this._css.padding, this._css.radius;
            var r = this._css.border,
                t = this._vars.maxStemHeight || 0,
                h = $.extend({}, this._dimensions || {}),
                a = {
                    frames: {},
                    dimensions: h,
                    maxStemHeight: t
                };
            a.cut = Math.max(this._css.border, this._css.radius) || 0;
            var d = {
                    width: 0,
                    height: 0
                },
                i = 0,
                p = 0;
            return this.tooltip.options.stem && (d = this.stem_top.getMath().dimensions.outside, i = this.stem_top._css.offset, p = Math.max(d.height - this._css.border, 0)), a.stemDimensions = d, a.stemOffset = i, $.each("top right bottom left".split(" "), $.proxy(function(t, i) {
                var e = "vertical" === Position.getOrientation(i),
                    s = {
                        width: h.width + 2 * r,
                        height: h.height + 2 * r
                    },
                    o = s[e ? "height" : "width"] - 2 * a.cut,
                    n = {
                        dimensions: s,
                        stemPx: p,
                        position: {
                            top: 0,
                            left: 0
                        },
                        background: {
                            dimensions: $.extend({}, h),
                            position: {
                                top: 0,
                                left: 0
                            }
                        }
                    };
                switch ((a.frames[i] = n).dimensions[e ? "width" : "height"] += p, "top" !== i && "left" !== i || (n.background.position[i] += p), $.extend(n, {
                    shift: {
                        position: {
                            top: 0,
                            left: 0
                        },
                        dimensions: {
                            width: e ? d.height : o,
                            height: e ? o : d.height
                        }
                    }
                }), i) {
                    case "top":
                    case "bottom":
                        n.shift.position.left += a.cut, "bottom" === i && (n.shift.position.top += s.height - r - p);
                        break;
                    case "left":
                    case "right":
                        n.shift.position.top += a.cut, "right" === i && (n.shift.position.left += s.width - r - p)
                }
            }, this)), a.connections = {}, $.each(Position.positions, $.proxy(function(t, i) {
                a.connections[i] = this.getConnectionLayout(i, a)
            }, this)), a
        },
        setDimensions: function(t) {
            this.build();
            var i = this._dimensions;
            i && i.width === t.width && i.height === t.height || (this._dimensions = t, this._vars = this.getVars())
        },
        setSide: function(t) {
            this._side = t, this._vars = this.getVars()
        },
        getConnectionLayout: function(t, i) {
            var e = Position.getSide(t),
                s = Position.getOrientation(t),
                o = (i.dimensions, i.cut),
                n = this["stem_" + e],
                r = i.stemOffset,
                h = this.tooltip.options.stem ? n.getMath().dimensions.outside.width : 0,
                a = o + r + .5 * h,
                d = {
                    stem: {}
                },
                p = {
                    left: 0,
                    right: 0,
                    up: 0,
                    down: 0
                },
                l = {
                    top: 0,
                    left: 0
                },
                c = {
                    top: 0,
                    left: 0
                },
                f = i.frames[e];
            a = 0;
            if ("horizontal" == s) {
                var u = f.dimensions.width;
                this.tooltip.options.stem && ((u = f.shift.dimensions.width) - h < 2 * r && (r = Math.floor(.5 * (u - h)) || 0), a = o + r + .5 * h);
                var m = u - 2 * r,
                    g = r;
                switch ((v = Position.split(t))[2]) {
                    case "left":
                        p.right = m - h, l.left = a;
                        break;
                    case "middle":
                        g += Math.round(.5 * m - .5 * h), p.left = g - r, p.right = g - r, l.left = c.left = Math.round(.5 * f.dimensions.width);
                        break;
                    case "right":
                        g += m - h, p.left = m - h, l.left = f.dimensions.width - a, c.left = f.dimensions.width
                }
                "bottom" === v[1] && (l.top += f.dimensions.height, c.top += f.dimensions.height), $.extend(d.stem, {
                    position: {
                        left: g
                    },
                    before: {
                        width: g
                    },
                    after: {
                        left: g + h,
                        width: u - g - h + 1
                    }
                })
            } else {
                var b = f.dimensions.height;
                this.tooltip.options.stem && ((b = f.shift.dimensions.height) - h < 2 * r && (r = Math.floor(.5 * (b - h)) || 0), a = o + r + .5 * h);
                var v, _ = b - 2 * r,
                    x = r;
                switch ((v = Position.split(t))[2]) {
                    case "top":
                        p.down = _ - h, l.top = a;
                        break;
                    case "middle":
                        x += Math.round(.5 * _ - .5 * h), p.up = x - r, p.down = x - r, l.top = c.top = Math.round(.5 * f.dimensions.height);
                        break;
                    case "bottom":
                        x += _ - h, p.up = _ - h, l.top = f.dimensions.height - a, c.top = f.dimensions.height
                }
                "right" === v[1] && (l.left += f.dimensions.width, c.left += f.dimensions.width), $.extend(d.stem, {
                    position: {
                        top: x
                    },
                    before: {
                        height: x
                    },
                    after: {
                        top: x + h,
                        height: b - x - h + 1
                    }
                })
            }
            return d.move = p, d.stem.connection = l, d.connection = c, d
        },
        setStemPosition: function(t, i) {
            if (this._stemPosition !== t) {
                this._stemPosition = t;
                var e = Position.getSide(t);
                this.setSide(e)
            }
            this.tooltip.options.stem && this.setStemShift(t, i)
        },
        setStemShift: function(t, i) {
            var e = this._shift,
                s = this._dimensions;
            if (!e || e.stemPosition !== t || e.shift.x !== i.x || e.shift.y !== i.y || !s || e.dimensions.width !== s.width || e.dimensions.height !== s.height) {
                this._shift = {
                    stemPosition: t,
                    shift: i,
                    dimensions: s
                };
                var o = Position.getSide(t),
                    n = {
                        horizontal: "x",
                        vertical: "y"
                    }[Position.getOrientation(t)],
                    r = {
                        x: {
                            left: "left",
                            width: "width"
                        },
                        y: {
                            left: "top",
                            width: "height"
                        }
                    }[n],
                    h = this["stem_" + o],
                    a = deepExtend({}, this._vars.connections[t].stem);
                i && 0 !== i[n] && (a.before[r.width] += i[n], a.position[r.left] += i[n], a.after[r.left] += i[n], a.after[r.width] -= i[n]), h.element.css(a.position), h.element.siblings(".tpd-shift-stem-side-before").css(a.before), h.element.siblings(".tpd-shift-stem-side-after").css(a.after)
            }
        }
    }), $.extend(Stem.prototype, {
        initialize: function(t, i) {
            this.element = $(t), this.element[0] && (this.skin = i, this.element.removeClass("tpd-stem-reset"), this._css = $.extend({}, i._css, {
                width: this.element.innerWidth(),
                height: this.element.innerHeight(),
                offset: parseFloat(this.element.css("margin-left")),
                spacing: parseFloat(this.element.css("margin-top"))
            }), this.element.addClass("tpd-stem-reset"), this.options = $.extend({}, arguments[2] || {}), this._position = this.element.attr("data-stem-position") || "top", this._m = 100, this.build())
        },
        destroy: function() {
            this.element.html("")
        },
        build: function() {
            this.destroy();
            var t = this._css.backgroundColor,
                i = -1 < t.indexOf("rgba") && parseFloat(t.replace(/^.*,(.+)\)/, "$1")),
                e = i && i < 1;
            this._useTransform = e && Support.css.transform, this._css.border || (this._useTransform = !1), this[(this._useTransform ? "build" : "buildNo") + "Transform"]()
        },
        buildTransform: function() {
            this.element.append(this.spacer = $("<div>").addClass("tpd-stem-spacer").append(this.downscale = $("<div>").addClass("tpd-stem-downscale").append(this.transform = $("<div>").addClass("tpd-stem-transform").append(this.first = $("<div>").addClass("tpd-stem-side").append(this.border = $("<div>").addClass("tpd-stem-border")).append($("<div>").addClass("tpd-stem-border-corner")).append($("<div>").addClass("tpd-stem-triangle")))))), this.transform.append(this.last = this.first.clone().addClass("tpd-stem-side-inversed")), this.sides = this.first.add(this.last);
            var t = this.getMath(),
                i = t.dimensions,
                e = this._m,
                s = Position.getSide(this._position);
            if (this.element.find(".tpd-stem-spacer").css({
                    width: l ? i.inside.height : i.inside.width,
                    height: l ? i.inside.width : i.inside.height
                }), "top" === s || "left" === s) {
                var o = {};
                "top" === s ? (o.bottom = 0, o.top = "auto") : "left" === s && (o.right = 0, o.left = "auto"), this.element.find(".tpd-stem-spacer").css(o)
            }
            this.transform.css({
                width: i.inside.width * e,
                height: i.inside.height * e
            });
            var n = Support.css.prefixed("transform"),
                r = {
                    "background-color": "transparent",
                    "border-bottom-color": this._css.backgroundColor,
                    "border-left-width": .5 * i.inside.width * e,
                    "border-bottom-width": i.inside.height * e
                };
            r[n] = "translate(" + t.border * e + "px, 0)", this.element.find(".tpd-stem-triangle").css(r);
            var h = this._css.borderColor;
            alpha = -1 < h.indexOf("rgba") && parseFloat(h.replace(/^.*,(.+)\)/, "$1")), alpha && alpha < 1 ? h = (h.substring(0, h.lastIndexOf(",")) + ")").replace("rgba", "rgb") : alpha = 1;
            var a = {
                "background-color": "transparent",
                "border-right-width": t.border * e,
                width: t.border * e,
                "margin-left": -2 * t.border * e,
                "border-color": h,
                opacity: alpha
            };
            a[n] = "skew(" + t.skew + "deg) translate(" + t.border * e + "px, " + -1 * this._css.border * e + "px)", this.element.find(".tpd-stem-border").css(a);
            h = this._css.borderColor;
            alpha = -1 < h.indexOf("rgba") && parseFloat(h.replace(/^.*,(.+)\)/, "$1")), alpha && alpha < 1 ? h = (h.substring(0, h.lastIndexOf(",")) + ")").replace("rgba", "rgb") : alpha = 1;
            var d = {
                width: t.border * e,
                "border-right-width": t.border * e,
                "border-right-color": h,
                background: h,
                opacity: alpha,
                "margin-left": -2 * t.border * e
            };
            if (d[n] = "skew(" + t.skew + "deg) translate(" + t.border * e + "px, " + (i.inside.height - this._css.border) * e + "px)", this.element.find(".tpd-stem-border-corner").css(d), this.setPosition(this._position), 1 < e) {
                var p = {};
                p[n] = "scale(" + 1 / e + "," + 1 / e + ")", this.downscale.css(p)
            }
            var l = /^(left|right)$/.test(this._position);
            this._css.border || this.element.find(".tpd-stem-border, .tpd-stem-border-corner").hide(), this.element.css({
                width: l ? i.outside.height : i.outside.width,
                height: l ? i.outside.width : i.outside.height
            })
        },
        buildNoTransform: function() {
            this.element.append(this.spacer = $("<div>").addClass("tpd-stem-spacer").append($("<div>").addClass("tpd-stem-notransform").append($("<div>").addClass("tpd-stem-border").append($("<div>").addClass("tpd-stem-border-corner")).append($("<div>").addClass("tpd-stem-border-center-offset").append($("<div>").addClass("tpd-stem-border-center-offset-inverse").append($("<div>").addClass("tpd-stem-border-center"))))).append($("<div>").addClass("tpd-stem-triangle"))));
            var t = this.getMath(),
                i = t.dimensions,
                e = /^(left|right)$/.test(this._position),
                s = /^(bottom)$/.test(this._position),
                o = /^(right)$/.test(this._position),
                n = Position.getSide(this._position);
            if (this.element.css({
                    width: e ? i.outside.height : i.outside.width,
                    height: e ? i.outside.width : i.outside.height
                }), this.element.find(".tpd-stem-notransform").add(this.element.find(".tpd-stem-spacer")).css({
                    width: e ? i.inside.height : i.inside.width,
                    height: e ? i.inside.width : i.inside.height
                }), "top" === n || "left" === n) {
                var r = {};
                "top" === n ? (r.bottom = 0, r.top = "auto") : "left" === n && (r.right = 0, r.left = "auto"), this.element.find(".tpd-stem-spacer").css(r)
            }
            this.element.find(".tpd-stem-border").css({
                width: "100%",
                background: "transparent"
            });
            var h = {
                opacity: 1
            };
            h[e ? "height" : "width"] = "100%", h[e ? "width" : "height"] = this._css.border, h[s ? "top" : "bottom"] = 0, $.extend(h, o ? {
                left: 0
            } : {
                right: 0
            }), this.element.find(".tpd-stem-border-corner").css(h);
            var a = {
                    width: 0,
                    "background-color": "transparent",
                    opacity: 1
                },
                d = .5 * i.inside.width + "px solid transparent",
                p = {
                    "background-color": "transparent"
                };
            i.inside.width, t.border;
            if (e) {
                l = {
                    left: "auto",
                    top: "50%",
                    "margin-top": -.5 * i.inside.width,
                    "border-top": d,
                    "border-bottom": d
                };
                $.extend(a, l), a[o ? "right" : "left"] = 0, a[o ? "border-left" : "border-right"] = i.inside.height + "px solid " + this._css.borderColor, $.extend(p, l), p[o ? "border-left" : "border-right"] = i.inside.height + "px solid " + this._css.backgroundColor, p[o ? "right" : "left"] = t.top, p[o ? "left" : "right"] = "auto", this.element.find(".tpd-stem-border-center-offset").css({
                    "margin-left": -1 * this._css.border * (o ? -1 : 1)
                }).find(".tpd-stem-border-center-offset-inverse").css({
                    "margin-left": this._css.border * (o ? -1 : 1)
                })
            } else {
                var l = {
                    "margin-left": -.5 * i.inside.width,
                    "border-left": d,
                    "border-right": d
                };
                $.extend(a, l), a[s ? "border-top" : "border-bottom"] = i.inside.height + "px solid " + this._css.borderColor, $.extend(p, l), p[s ? "border-top" : "border-bottom"] = i.inside.height + "px solid " + this._css.backgroundColor, p[s ? "bottom" : "top"] = t.top, p[s ? "top" : "bottom"] = "auto", this.element.find(".tpd-stem-border-center-offset").css({
                    "margin-top": -1 * this._css.border * (s ? -1 : 1)
                }).find(".tpd-stem-border-center-offset-inverse").css({
                    "margin-top": this._css.border * (s ? -1 : 1)
                })
            }
            this.element.find(".tpd-stem-border-center").css(a), this.element.find(".tpd-stem-border-corner").css({
                "background-color": this._css.borderColor
            }), this.element.find(".tpd-stem-triangle").css(p), this._css.border || this.element.find(".tpd-stem-border").hide()
        },
        setPosition: function(t) {
            this._position = t, this.transform.attr("class", "tpd-stem-transform tpd-stem-transform-" + t)
        },
        getMath: function() {
            var t = this._css.height,
                i = this._css.width,
                e = this._css.border;
            this._useTransform && Math.floor(i) % 2 && (i = Math.max(Math.floor(i) - 1, 0));
            var s = degrees(Math.atan(.5 * i / t)),
                o = 90 - s,
                n = {
                    width: i + 2 * (e / Math.cos((90 - o) * Math.PI / 180)),
                    height: t + (c = e / Math.cos((90 - s) * Math.PI / 180))
                };
            Math.max(e, this._css.radius);
            t = n.height, i = .5 * n.width;
            var r = 90 - degrees(Math.atan(t / i)),
                h = e / Math.cos(r * Math.PI / 180),
                a = 180 * Math.atan(t / i) / Math.PI,
                d = -1 * (90 - a),
                p = 90 - a,
                l = e * Math.tan(p * Math.PI / 180),
                c = e / Math.cos((90 - p) * Math.PI / 180),
                f = $.extend({}, n),
                u = $.extend({}, n);
            u.height += this._css.spacing, u.height = Math.ceil(u.height);
            var m = !0;
            return n.width <= 2 * e && (m = !1), {
                enabled: m,
                outside: u,
                dimensions: {
                    inside: f,
                    outside: u
                },
                top: c,
                border: h,
                skew: d,
                corner: l
            }
        }
    });
    var Tooltips = {
        tooltips: {},
        options: {
            defaultSkin: "dark",
            startingZIndex: 999999
        },
        _emptyClickHandler: function() {},
        init: function() {
            this.reset(), this._resizeHandler = $.proxy(this.onWindowResize, this), $(window).bind("resize orientationchange", this._resizeHandler), Browser.MobileSafari && $("body").bind("click", this._emptyClickHandler)
        },
        reset: function() {
            Tooltips.removeAll(), Delegations.removeAll(), this._resizeHandler && $(window).unbind("resize orientationchange", this._resizeHandler), Browser.MobileSafari && $("body").unbind("click", this._emptyClickHandler)
        },
        onWindowResize: function() {
            this._resizeTimer && (window.clearTimeout(this._resizeTimer), this._resizeTimer = null), this._resizeTimer = _.delay($.proxy(function() {
                var t = this.getVisible();
                $.each(t, function(t, i) {
                    i.clearUpdatedTo(), i.position()
                })
            }, this), 15)
        },
        _getTooltips: function(t, i) {
            var e, s = [],
                o = [];
            if (_.isElement(t) ? (e = $(t).data("tipped-uids")) && (s = s.concat(e)) : $(t).each(function(t, i) {
                    (e = $(i).data("tipped-uids")) && (s = s.concat(e))
                }), !s[0] && !i) {
                var n = this.getTooltipByTooltipElement($(t).closest(".tpd-tooltip")[0]);
                n && n.element && (e = $(n.element).data("tipped-uids") || []) && (s = s.concat(e))
            }
            return 0 < s.length && $.each(s, $.proxy(function(t, i) {
                var e;
                (e = this.tooltips[i]) && o.push(e)
            }, this)), o
        },
        findElement: function(t) {
            var i = [];
            return _.isElement(t) && (i = this._getTooltips(t)), i[0] && i[0].element
        },
        get: function(e) {
            var t = $.extend({
                    api: !1
                }, arguments[1] || {}),
                s = [];
            return _.isElement(e) ? s = this._getTooltips(e) : e instanceof $ ? e.each($.proxy(function(t, i) {
                var e = this._getTooltips(i, !0);
                0 < e.length && (s = s.concat(e))
            }, this)) : "string" === $.type(e) && $.each(this.tooltips, function(t, i) {
                i.element && $(i.element).is(e) && s.push(i)
            }), t.api && $.each(s, function(t, i) {
                i.is("api", !0)
            }), s
        },
        getTooltipByTooltipElement: function(e) {
            if (!e) return null;
            var s = null;
            return $.each(this.tooltips, function(t, i) {
                i.is("build") && i._tooltip[0] === e && (s = i)
            }), s
        },
        getBySelector: function(e) {
            var s = [];
            return $.each(this.tooltips, function(t, i) {
                i.element && $(i.element).is(e) && s.push(i)
            }), s
        },
        getNests: function() {
            var e = [];
            return $.each(this.tooltips, function(t, i) {
                i.is("nest") && e.push(i)
            }), e
        },
        show: function(t) {
            $(this.get(t)).each(function(t, i) {
                i.show(!1, !0)
            })
        },
        hide: function(t) {
            $(this.get(t)).each(function(t, i) {
                i.hide()
            })
        },
        toggle: function(t) {
            $(this.get(t)).each(function(t, i) {
                i.toggle()
            })
        },
        hideAll: function(e) {
            $.each(this.getVisible(), function(t, i) {
                e && e === i || i.hide()
            })
        },
        refresh: function(t) {
            var i;
            i = t ? $.grep(this.get(t), function(t, i) {
                return t.is("visible")
            }) : this.getVisible(), $.each(i, function(t, i) {
                i.refresh()
            })
        },
        getVisible: function() {
            var e = [];
            return $.each(this.tooltips, function(t, i) {
                i.visible() && e.push(i)
            }), e
        },
        isVisibleByElement: function(e) {
            var s = !1;
            return _.isElement(e) && $.each(this.getVisible() || [], function(t, i) {
                if (i.element === e) return !(s = !0)
            }), s
        },
        getHighestTooltip: function() {
            var e, s = 0;
            return $.each(this.tooltips, function(t, i) {
                i.zIndex > s && (s = i.zIndex, e = i)
            }), e
        },
        resetZ: function() {
            this.getVisible().length <= 1 && $.each(this.tooltips, function(t, i) {
                i.is("build") && !i.options.zIndex && i._tooltip.css({
                    zIndex: i.zIndex = +Tooltips.options.startingZIndex
                })
            })
        },
        clearAjaxCache: function() {
            $.each(this.tooltips, $.proxy(function(t, i) {
                i.options.ajax && (i._cache && i._cache.xhr && (i._cache.xhr.abort(), i._cache.xhr = null), i.is("updated", !1), i.is("updating", !1), i.is("sanitized", !1))
            }, this)), AjaxCache.clear()
        },
        add: function(t) {
            this.tooltips[t.uid] = t
        },
        remove: function(t) {
            var i = this._getTooltips(t);
            this.removeTooltips(i)
        },
        removeTooltips: function(t) {
            t && $.each(t, $.proxy(function(t, i) {
                var e = i.uid;
                delete this.tooltips[e], i.remove()
            }, this))
        },
        removeDetached: function() {
            var t = this.getNests(),
                e = [];
            0 < t.length && $.each(t, function(t, i) {
                i.is("detached") && (e.push(i), i.attach())
            }), $.each(this.tooltips, $.proxy(function(t, i) {
                i.element && !_.element.isAttached(i.element) && this.remove(i.element)
            }, this)), $.each(e, function(t, i) {
                i.detach()
            })
        },
        removeAll: function() {
            $.each(this.tooltips, $.proxy(function(t, i) {
                i.element && this.remove(i.element)
            }, this)), this.tooltips = {}
        },
        setDefaultSkin: function(t) {
            this.options.defaultSkin = t || "dark"
        },
        setStartingZIndex: function(t) {
            this.options.startingZIndex = t || 0
        }
    };

    function Tooltip() {
        this.initialize.apply(this, _slice.call(arguments))
    }
    Tooltips.Position = {
        inversedPosition: {
            left: "right",
            right: "left",
            top: "bottom",
            bottom: "top",
            middle: "middle",
            center: "center"
        },
        getInversedPosition: function(t) {
            var i = Position.split(t),
                e = i[1],
                s = i[2],
                o = Position.getOrientation(t),
                n = $.extend({
                    horizontal: !0,
                    vertical: !0
                }, arguments[1] || {});
            return "horizontal" === o ? (n.vertical && (e = this.inversedPosition[e]), n.horizontal && (s = this.inversedPosition[s])) : (n.vertical && (s = this.inversedPosition[s]), n.horizontal && (e = this.inversedPosition[e])), e + s
        },
        getTooltipPositionFromTarget: function(t) {
            var i = Position.split(t);
            return this.getInversedPosition(i[1] + this.inversedPosition[i[2]])
        }
    }, $.extend(Tooltip.prototype, {
        supportsLoading: Support.css.transform && Support.css.animation,
        initialize: function(element, content) {
            if (this.element = element, this.element) {
                var options;
                "object" !== $.type(content) || _.isElement(content) || _.isText(content) || _.isDocumentFragment(content) || content instanceof $ ? options = arguments[2] || {} : (options = content, content = null);
                var dataOptions = $(element).data("tipped-options");
                dataOptions && (options = deepExtend($.extend({}, options), eval("({" + dataOptions + "})"))), this.options = Options.create(options), this._cache = {
                    dimensions: {
                        width: 0,
                        height: 0
                    },
                    events: [],
                    timers: {},
                    layouts: {},
                    is: {},
                    fnCallFn: "",
                    updatedTo: {}
                }, this.queues = {
                    showhide: $({})
                };
                var title = $(element).attr("title") || $(element).data("tipped-restore-title");
                if (!content) {
                    var dt = $(element).attr("data-tipped");
                    if (dt ? content = dt : title && (content = title), content) {
                        var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
                        content = content.replace(SCRIPT_REGEX, "")
                    }
                }
                if (!(!content || content instanceof $ && !content[0]) || this.options.ajax && this.options.ajax.url || this.options.inline) {
                    title && ($(element).data("tipped-restore-title", title), $(element)[0].setAttribute("title", "")), this.content = content, this.title = $(this.element).data("tipped-title"), "undefined" != $.type(this.options.title) && (this.title = this.options.title), this.zIndex = this.options.zIndex || +Tooltips.options.startingZIndex;
                    var uids = $(element).data("tipped-uids");
                    uids = uids || [];
                    var uid = getUID();
                    this.uid = uid, uids.push(uid), $(element).data("tipped-uids", uids);
                    var parentTooltipElement = $(this.element).closest(".tpd-tooltip")[0],
                        parentTooltip;
                    parentTooltipElement && (parentTooltip = Tooltips.getTooltipByTooltipElement(parentTooltipElement)) && parentTooltip.is("nest", !0);
                    var target = this.options.target;
                    this.target = "mouse" === target ? this.element : "element" !== target && target ? _.isElement(target) ? target : target instanceof $ && target[0] ? target[0] : this.element : this.element, this.options.inline && (this.content = $("#" + this.options.inline)[0]), this.options.ajax && (this.__content = this.content), "function" === $.type(this.content) && (this._fn = this.content), this.preBuild(), Tooltips.add(this)
                } else this._aborted = !0
            }
        },
        remove: function() {
            this.unbind(), this.clearTimers(), this.restoreElementToMarker(), this.stopLoading(), this.abort(), this.is("build") && this._tooltip && (this._tooltip.remove(), this._tooltip = null);
            var t = $(this.element).data("tipped-uids") || [],
                i = $.inArray(this.uid, t);
            if (-1 < i && (t.splice(i, 1), $(this.element).data("tipped-uids", t)), t.length < 1) {
                var e, s = "tipped-restore-title";
                (e = $(this.element).data(s)) && ("" != !$(this.element)[0].getAttribute("title") && $(this.element).attr("title", e), $(this.element).removeData(s)), $(this.element).removeData("tipped-uids")
            }
            var o = ($(this.element).attr("class") || "").replace(/(tpd-delegation-uid-)\d+/g, "").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
            $(this.element).attr("class", o)
        },
        detach: function() {
            this.options.detach && !this.is("detached") && (this._tooltip && this._tooltip.detach(), this.is("detached", !0))
        },
        attach: function() {
            if (this.is("detached")) {
                var t;
                if ("string" === $.type(this.options.container)) {
                    var i = this.target;
                    "mouse" === i && (i = this.element), t = $($(i).closest(this.options.container).first())
                } else t = $(this.options.container);
                t[0] || (t = $(document.body)), t.append(this._tooltip), this.is("detached", !1)
            }
        },
        preBuild: function() {
            this.is("detached", !0);
            var t = {
                left: "-10000px",
                top: "-10000px",
                opacity: 0,
                zIndex: this.zIndex
            };
            this._tooltip = $("<div>").addClass("tpd-tooltip").addClass("tpd-skin-" + this.options.skin).addClass("tpd-size-" + this.options.size).css(t).hide(), this.createPreBuildObservers()
        },
        build: function() {
            this.is("build") || (this.attach(), this._tooltip.append(this._skin = $("<div>").addClass("tpd-skin")).append(this._contentWrapper = $("<div>").addClass("tpd-content-wrapper").append(this._contentSpacer = $("<div>").addClass("tpd-content-spacer").append(this._titleWrapper = $("<div>").addClass("tpd-title-wrapper").append(this._titleSpacer = $("<div>").addClass("tpd-title-spacer").append(this._titleRelative = $("<div>").addClass("tpd-title-relative").append(this._titleRelativePadder = $("<div>").addClass("tpd-title-relative-padder").append(this._title = $("<div>").addClass("tpd-title"))))).append(this._close = $("<div>").addClass("tpd-close").append($("<div>").addClass("tpd-close-icon").html("&times;")))).append(this._contentRelative = $("<div>").addClass("tpd-content-relative").append(this._contentRelativePadder = $("<div>").addClass("tpd-content-relative-padder").append(this._content = $("<div>").addClass("tpd-content"))).append(this._inner_close = $("<div>").addClass("tpd-close").append($("<div>").addClass("tpd-close-icon").html("&times;")))))), this.skin = new Skin(this), this._contentSpacer.css({
                "border-radius": Math.max(this.skin._css.radius - this.skin._css.border, 0)
            }), this.createPostBuildObservers(), this.is("build", !0))
        },
        createPostBuildObservers: function() {
            this._tooltip.delegate(".tpd-close, .close-tooltip", "click", $.proxy(function(t) {
                t.stopPropagation(), t.preventDefault(), this.is("api", !1), this.hide(!0)
            }, this))
        },
        createPreBuildObservers: function() {
            this.bind(this.element, "mouseenter", this.setActive), this.bind(this._tooltip, Support.touch && Browser.MobileSafari ? "touchstart" : "mouseenter", this.setActive), this.bind(this.element, "mouseleave", function(t) {
                this.setIdle(t)
            }), this.bind(this._tooltip, "mouseleave", function(t) {
                this.setIdle(t)
            }), this.options.showOn && ($.each(this.options.showOn, $.proxy(function(t, i) {
                var e, s = !1;
                switch (t) {
                    case "element":
                        e = this.element, this.options.hideOn && this.options.showOn && "click" === this.options.hideOn.element && "click" === this.options.showOn.element && (s = !0, this.is("toggleable", s));
                        break;
                    case "tooltip":
                        e = this._tooltip;
                        break;
                    case "target":
                        e = this.target
                }
                if (e && i) {
                    var o = i;
                    this.bind(e, o, "click" === i && s ? function(t) {
                        this.is("api", !1), this.toggle()
                    } : function(t) {
                        this.is("api", !1), this.showDelayed()
                    })
                }
            }, this)), Support.touch && Browser.MobileSafari && this.bind(this._tooltip, "touchend", function() {
                this._tooltipTouchEndTime = (new Date).getTime()
            })), this.options.hideOn && $.each(this.options.hideOn, $.proxy(function(t, i) {
                var e;
                switch (t) {
                    case "element":
                        if (this.is("toggleable") && "click" === i) return;
                        e = this.element;
                        break;
                    case "tooltip":
                        e = this._tooltip;
                        break;
                    case "target":
                        e = this.target
                }
                if (e && i) {
                    var s = i;
                    Support.touch && Browser.MobileSafari && /^(target|element)/.test(t) && /mouse(leave|out)/.test(s) ? this.bind(e, s, function(t) {
                        if (this._tooltipTouchEndTime && /^mouse(leave|out)$/.test(t.type) && (new Date).getTime() - this._tooltipTouchEndTime < 450) return;
                        this.is("api", !1), this.hideDelayed()
                    }) : this.bind(e, s, function(t) {
                        this.is("api", !1), this.hideDelayed()
                    })
                }
            }, this)), this.options.hideOnClickOutside && ($(this.element).addClass("tpd-hideOnClickOutside"), this.bind(document.documentElement, "click touchend", $.proxy(function(t) {
                if (this.visible()) {
                    var i = $(t.target).closest(".tpd-tooltip, .tpd-hideOnClickOutside")[0];
                    (!i || i && i !== this._tooltip[0] && i !== this.element) && this.hide()
                }
            }, this))), "mouse" === this.options.target && this.bind(this.element, "mouseenter mousemove", $.proxy(function(t) {
                this._cache.event = t
            }, this));
            var t = !1;
            this.options.showOn && "mouse" === this.options.target && !this.options.fixed && (t = !0), t && this.bind(this.element, "mousemove", function(t) {
                this.is("build") && (this.is("api", !1), this.position())
            })
        }
    }), $.extend(Tooltip.prototype, {
        stop: function() {
            this._tooltip && (this.queues.showhide.queue([]), this._tooltip.stop(1, 0))
        },
        showDelayed: function(t) {
            this.is("disabled") || (this.clearTimer("hide"), this.is("visible") || this.getTimer("show") || this.setTimer("show", $.proxy(function() {
                this.clearTimer("show"), this.show()
            }, this), this.options.showDelay || 1))
        },
        show: function() {
            if (this.clearTimer("hide"), !this.visible() && !this.is("disabled") && $(this.target).is(":visible")) {
                this.is("visible", !0), this.attach(), this.stop();
                var t = this.queues.showhide;
                this.is("updated") || this.is("updating") || t.queue($.proxy(function(i) {
                    this._onResizeDimensions = {
                        width: 0,
                        height: 0
                    }, this.update($.proxy(function(t) {
                        if (t) return this.is("visible", !1), void this.detach();
                        i()
                    }, this))
                }, this)), t.queue($.proxy(function(t) {
                    this.is("sanitized") ? (this.stopLoading(), this._contentWrapper.css({
                        visibility: "visible"
                    }), this.is("resize-to-content", !0), t()) : (this._contentWrapper.css({
                        visibility: "hidden"
                    }), this.startLoading(), this.sanitize($.proxy(function() {
                        this.stopLoading(), this._contentWrapper.css({
                            visibility: "visible"
                        }), this.is("resize-to-content", !0), t()
                    }, this)))
                }, this)), t.queue($.proxy(function(t) {
                    this.position(), this.raise(), t()
                }, this)), t.queue($.proxy(function(t) {
                    if (this.is("updated") && "function" === $.type(this.options.onShow)) {
                        var i = new Visible(this._tooltip);
                        this.options.onShow(this._content[0], this.element), i.restore(), t()
                    } else t()
                }, this)), t.queue($.proxy(function(t) {
                    this._show(this.options.fadeIn, function() {
                        t()
                    })
                }, this))
            }
        },
        _show: function(t, i) {
            t = ("number" === $.type(t) ? t : this.options.fadeIn) || 0, i = i || "function" == $.type(t) && t, this.options.hideOthers && Tooltips.hideAll(this), this._tooltip.fadeTo(t, 1, $.proxy(function() {
                i && i()
            }, this))
        },
        hideDelayed: function() {
            this.clearTimer("show"), this.getTimer("hide") || !this.visible() || this.is("disabled") || this.setTimer("hide", $.proxy(function() {
                this.clearTimer("hide"), this.hide()
            }, this), this.options.hideDelay || 1)
        },
        hide: function(i, e) {
            if (this.clearTimer("show"), this.visible() && !this.is("disabled")) {
                this.is("visible", !1), this.stop();
                var t = this.queues.showhide;
                t.queue($.proxy(function(t) {
                    this.abort(), t()
                }, this)), t.queue($.proxy(function(t) {
                    this._hide(i, t)
                }, this)), t.queue(function(t) {
                    Tooltips.resetZ(), t()
                }), t.queue($.proxy(function(t) {
                    this.clearUpdatedTo(), t()
                }, this)), "function" === $.type(this.options.afterHide) && this.is("updated") && t.queue($.proxy(function(t) {
                    this.options.afterHide(this._content[0], this.element), t()
                }, this)), this.options.cache || !this.options.ajax && !this._fn || t.queue($.proxy(function(t) {
                    this.is("updated", !1), this.is("updating", !1), this.is("sanitized", !1), t()
                }, this)), "function" === $.type(e) && t.queue(function(t) {
                    e(), t()
                }), t.queue($.proxy(function(t) {
                    this.detach(), t()
                }, this))
            }
        },
        _hide: function(t, i) {
            i = i || "function" === $.type(t) && t, this.attach(), this._tooltip.fadeTo(t ? 0 : this.options.fadeOut, 0, $.proxy(function() {
                this.stopLoading(), this.is("resize-to-content", !1), this._tooltip.hide(), i && i()
            }, this))
        },
        toggle: function() {
            this.is("disabled") || this[this.visible() ? "hide" : "show"]()
        },
        raise: function() {
            if (this.is("build") && !this.options.zIndex) {
                var t = Tooltips.getHighestTooltip();
                t && t !== this && this.zIndex <= t.zIndex && (this.zIndex = t.zIndex + 1, this._tooltip.css({
                    "z-index": this.zIndex
                }), this._tooltipShadow && (this._tooltipShadow.css({
                    "z-index": this.zIndex
                }), this.zIndex = t.zIndex + 2, this._tooltip.css({
                    "z-index": this.zIndex
                })))
            }
        }
    }), $.extend(Tooltip.prototype, {
        createElementMarker: function(t) {
            !this.elementMarker && this.content && _.element.isAttached(this.content) && ($(this.content).data("tpd-restore-inline-display", $(this.content).css("display")), this.elementMarker = $("<div>").hide(), $(this.content).before($(this.elementMarker).hide()))
        },
        restoreElementToMarker: function() {
            var t;
            this.elementMarker && this.content && ((t = $(this.content).data("tpd-restore-inline-display")) && $(this.content).css({
                display: t
            }), $(this.elementMarker).before(this.content).remove())
        },
        startLoading: function() {
            this.is("loading") || (this.build(), this.is("loading", !0), this.options.spinner && (this._tooltip.addClass("tpd-is-loading"), this.skin.startLoading(), this.is("resize-to-content") || (this.position(), this.raise(), this._show())))
        },
        stopLoading: function() {
            this.build(), this.is("loading", !1), this.options.spinner && (this._tooltip.removeClass("tpd-is-loading"), this.skin.stopLoading())
        },
        abort: function() {
            this.abortAjax(), this.abortSanitize(), this.is("refreshed-before-sanitized", !1)
        },
        abortSanitize: function() {
            this._cache.voila && (this._cache.voila.abort(), this._cache.voila = null)
        },
        abortAjax: function() {
            this._cache.xhr && (this._cache.xhr.abort(), this._cache.xhr = null, this.is("updated", !1), this.is("updating", !1))
        },
        update: function(n) {
            if (!this.is("updating")) {
                this.is("updating", !0), this.build();
                var t = this.options.inline ? "inline" : this.options.ajax ? "ajax" : _.isElement(this.content) || _.isText(this.content) || _.isDocumentFragment(this.content) ? "element" : this._fn ? "function" : "html";
                switch (this._contentWrapper.css({
                    visibility: "hidden"
                }), t) {
                    case "html":
                    case "element":
                    case "inline":
                        if (this.is("updated")) return void(n && n());
                        this._update(this.content, n);
                        break;
                    case "function":
                        if (this.is("updated")) return void(n && n());
                        var i = this._fn(this.element);
                        if (!i) return this.is("updating", !1), void(n && n(!0));
                        this._update(i, n);
                        break;
                    case "ajax":
                        var e = this.options.ajax || {},
                            s = e.url || this.__content,
                            o = e.dataType,
                            r = {
                                url: s,
                                data: e.data || {}
                            };
                        (t = e.type || "GET") && $.extend(r, {
                            type: t
                        }), o && $.extend(r, {
                            dataType: o
                        });
                        var h, a = $.extend({}, r, e);
                        if (a.method && delete(a = $.extend({}, a)).method, $.each("complete error success".split(" "), $.proxy(function(t, o) {
                                a[o] || (a[o] = "success" === o ? function(t, i, e) {
                                    return e.responseText
                                } : function() {}), a[o] = _.wrap(a[o], $.proxy(function(t) {
                                    var i = _slice.call(arguments, 1),
                                        e = $.type("object" === i[0]) ? i[0] : i[2];
                                    if (!e.statusText || "abort" !== e.statusText) {
                                        this.options.cache && AjaxCache.set({
                                            url: a.url,
                                            type: a.type,
                                            data: a.data
                                        }, o, i), this._cache.xhr = null;
                                        var s = t.apply(this, i);
                                        s && this._update(s, n)
                                    }
                                }, this))
                            }, this)), this.options.cache && (h = AjaxCache.get(a)) && h.callbacks.success) return void $.each(h.callbacks, $.proxy(function(t, i) {
                            "function" === $.type(a[t]) && a[t].apply(this, i)
                        }, this));
                        this.startLoading(), this._cache.xhr = $.ajax(a)
                }
            }
        },
        _update: function(t, i) {
            var e = {
                title: this.options.title,
                close: this.options.close
            };
            "string" === $.type(t) || _.isElement(t) || _.isText(t) || _.isDocumentFragment(t) || t instanceof $ ? e.content = t : $.extend(e, t);
            t = e.content;
            var s = e.title,
                o = e.close;
            this.content = t, this.title = s, this.close = o, this.createElementMarker(), (_.isElement(t) || t instanceof $) && $(t).show(), this._content.html(this.content), this._title.html(s && "string" === $.type(s) ? s : ""), this._titleWrapper[s ? "show" : "hide"](), this._close[(this.title || this.options.title) && o ? "show" : "hide"]();
            var n = o && !(this.options.title || this.title),
                r = o && !(this.options.title || this.title) && "overlap" !== o,
                h = o && (this.options.title || this.title) && "overlap" !== o;
            this._inner_close[n ? "show" : "hide"](), this._tooltip[(r ? "add" : "remove") + "Class"]("tpd-has-inner-close"), this._tooltip[(h ? "add" : "remove") + "Class"]("tpd-has-title-close"), this._content[(this.options.padding ? "remove" : "add") + "Class"]("tpd-content-no-padding"), this.finishUpdate(i)
        },
        sanitize: function(i) {
            if (!this.options.voila || this._content.find("img").length < 1) return this.is("sanitized", !0), void(i && i());
            this._cache.voila = Voila(this._content, {
                method: "onload"
            }, $.proxy(function(t) {
                this._markImagesAsSanitized(t.images), this.is("refreshed-before-sanitized") ? (this.is("refreshed-before-sanitized", !1), this.sanitize(i)) : (this.is("sanitized", !0), i && i())
            }, this))
        },
        _markImagesAsSanitized: function(t) {
            $.each(t, function(t, i) {
                var e = i.img;
                $(e).data("completed-src", i.img.src)
            })
        },
        _hasAllImagesSanitized: function() {
            var s = !0;
            return this._content.find("img").each(function(t, i) {
                var e = $(i).data("completed-src");
                if (!e || i.src !== e) return s = !1
            }), s
        },
        refresh: function() {
            this.visible() && (this.is("sanitized") ? (this.is("refreshing", !0), this.clearTimer("refresh-spinner"), !this.options.voila || this._content.find("img").length < 1 || this._hasAllImagesSanitized() ? (this.is("should-update-dimensions", !0), this.position(), this.is("refreshing", !1)) : (this.is("sanitized", !1), this._contentWrapper.css({
                visibility: "hidden"
            }), this.startLoading(), this.sanitize($.proxy(function() {
                this._contentWrapper.css({
                    visibility: "visible"
                }), this.stopLoading(), this.is("should-update-dimensions", !0), this.position(), this.is("refreshing", !1)
            }, this)))) : this.is("refreshed-before-sanitized", !0))
        },
        finishUpdate: function(t) {
            if (this.is("updated", !0), this.is("updating", !1), "function" === $.type(this.options.afterUpdate)) {
                var i = this._contentWrapper.css("visibility");
                i && this._contentWrapper.css({
                    visibility: "visible"
                }), this.options.afterUpdate(this._content[0], this.element), i && this._contentWrapper.css({
                    visibility: "hidden"
                })
            }
            t && t()
        }
    }), $.extend(Tooltip.prototype, {
        clearUpdatedTo: function() {
            this._cache.updatedTo = {}
        },
        updateDimensionsToContent: function(t, i) {
            this.skin.build();
            var e = this.is("loading"),
                s = this._cache.updatedTo;
            if ((this._maxWidthPass || this.is("api") || this.is("should-update-dimensions") || s.stemPosition !== i || s.loading !== e) && (!e || !this.is("resize-to-content"))) {
                this._cache.updatedTo = {
                    type: this.is("resize-to-content") ? "content" : "spinner",
                    loading: this.is("loading"),
                    stemPosition: i
                }, this.is("should-update-dimensions") && this.is("should-update-dimensions", !1), t = t || this.options.position.target, i = i || this.options.position.tooltip;
                var o = Position.getSide(i),
                    n = Position.getOrientation(i),
                    r = this.skin._css.border;
                this._tooltip.addClass("tpd-tooltip-measuring");
                var h = this._tooltip.attr("style");
                this._tooltip.removeAttr("style");
                var a = {
                        top: r,
                        right: r,
                        bottom: r,
                        left: r
                    },
                    d = 0;
                if ("vertical" === Position.getOrientation(i)) {
                    this.options.stem && (a[o] = this.skin["stem_" + o].getMath().dimensions.outside.height);
                    var p = this.getMouseRoom();
                    p[Position._flip[o]] && (a[o] += p[Position._flip[o]]);
                    var l = this.getContainmentLayout(i),
                        c = this.getPaddingLine(t),
                        f = !1;
                    if (Position.isPointWithinBoxLayout(c.x1, c.y1, l) || Position.isPointWithinBoxLayout(c.x2, c.y2, l)) f = !0;
                    else {
                        $.each("top right bottom left".split(" "), $.proxy(function(t, i) {
                            var e = this.getSideLine(l, i);
                            if (Position.intersectsLine(c.x1, c.y1, c.x2, c.y2, e.x1, e.y1, e.x2, e.y2)) return !(f = !0)
                        }, this))
                    }
                    f && (d = "left" === o ? c.x1 - l.position.left : l.position.left + l.dimensions.width - c.x1, a[o] += d)
                }
                if (this.options.offset && "vertical" === n) {
                    var u = Position.adjustOffsetBasedOnPosition(this.options.offset, this.options.position.target, t);
                    0 !== u.x && (a.right += Math.abs(u.x))
                }
                this.options.containment && (d = this.options.containment.padding) && ($.each(a, function(t, i) {
                    a[t] += d
                }), "vertical" === n ? a["left" === o ? "left" : "right"] -= d : a["top" === o ? "top" : "bottom"] -= d);
                var m = Bounds.viewport(),
                    g = {
                        width: 0,
                        height: 0
                    };
                this.close && "overlap" !== this.close && !this.title && (g = this._innerCloseDimensions || {
                    width: this._inner_close.outerWidth(!0),
                    height: this._inner_close.outerHeight(!0)
                }, this._innerCloseDimensions = g), this._contentRelativePadder.css({
                    "padding-right": g.width
                }), this._contentSpacer.css({
                    width: m.width - a.left - a.right
                });
                var b = {
                        width: this._content.innerWidth() + g.width,
                        height: Math.max(this._content.innerHeight(), g.height || 0)
                    },
                    v = {
                        width: 0,
                        height: 0
                    };
                if (this.title) {
                    var _ = {
                        width: 0,
                        height: 0
                    };
                    this._titleWrapper.add(this._titleSpacer).css({
                        width: "auto",
                        height: "auto"
                    }), this.close && "overlap" !== this.close && (_ = {
                        width: this._close.outerWidth(!0),
                        height: this._close.outerHeight(!0)
                    }, this._close.hide()), this._maxWidthPass && b.width > this.options.maxWidth && this._titleRelative.css({
                        width: b.width
                    }), this._titleRelativePadder.css({
                        "padding-right": _.width
                    });
                    var x = parseFloat(this._titleWrapper.css("border-bottom-width"));
                    (v = {
                        width: this.title ? this._titleWrapper.innerWidth() : 0,
                        height: Math.max(this.title ? this._titleWrapper.innerHeight() + x : 0, _.height + x)
                    }).width > m.width - a.left - a.right && (v.width = m.width - a.left - a.right, this._titleSpacer.css({
                        width: v.width
                    }), v.height = Math.max(this.title ? this._titleWrapper.innerHeight() + x : 0, _.height + x)), b.width = Math.max(v.width, b.width), b.height += v.height, this._titleWrapper.css({
                        height: Math.max(this.title ? this._titleWrapper.innerHeight() : 0, _.height)
                    }), this.close && this._close.show()
                }
                if (this.options.stem) {
                    var w = "vertical" === n ? "height" : "width",
                        y = this.skin["stem_" + o].getMath().outside.width + 2 * this.skin._css.radius;
                    b[w] < y && (b[w] = y)
                }
                if (this._contentSpacer.css({
                        width: b.width
                    }), b.height !== Math.max(this._content.innerHeight(), g.height) + (this.title ? this._titleRelative.outerHeight() : 0) && b.width++, this.is("resize-to-content") || (b = this.skin._css.spinner.dimensions), this.setDimensions(b), a = {
                        top: r,
                        right: r,
                        bottom: r,
                        left: r
                    }, this.options.stem) {
                    var T = Position.getSide(i);
                    a[T] = this.skin.stem_top.getMath().dimensions.outside.height
                }
                this._contentSpacer.css({
                    "margin-top": a.top,
                    "margin-left": +a.left,
                    width: b.width
                }), (this.title || this.close) && this._titleWrapper.css({
                    height: this._titleWrapper.innerHeight(),
                    width: b.width
                }), this._tooltip.removeClass("tpd-tooltip-measuring"), this._tooltip.attr("style", h);
                var k = this._contentRelative.add(this._titleRelative);
                this.options.maxWidth && b.width > this.options.maxWidth && !this._maxWidthPass && this.is("resize-to-content") && (k.css({
                    width: this.options.maxWidth
                }), this._maxWidthPass = !0, this.updateDimensionsToContent(t, i), this._maxWidthPass = !1, k.css({
                    width: "auto"
                }))
            }
        },
        setDimensions: function(t) {
            this.skin.setDimensions(t)
        },
        getContainmentSpace: function(t, i) {
            var e = this.getContainmentLayout(t, i),
                s = this.getTargetLayout(),
                o = s.position,
                n = s.dimensions,
                r = e.position,
                h = e.dimensions,
                a = {
                    top: Math.max(o.top - r.top, 0),
                    bottom: Math.max(r.top + h.height - (o.top + n.height), 0),
                    left: Math.max(o.left - r.left, 0),
                    right: Math.max(r.left + h.width - (o.left + n.width), 0)
                };
            return o.top > r.top + h.height && (a.top -= o.top - (r.top + h.height)), o.top + n.height < r.top && (a.bottom -= r.top - (o.top + n.height)), o.left > r.left + h.width && r.left + h.width >= o.left && (a.left -= o.left - (r.left + h.width)), o.left + n.width < r.left && (a.right -= r.left - (o.left + n.width)), this._cache.layouts.containmentSpace = a
        },
        position: function(t) {
            if (this.visible()) {
                this.is("positioning", !0), this._cache.layouts = {};
                this._cache.dimensions;
                var i = this.options.position.target,
                    e = this.options.position.tooltip,
                    s = e,
                    o = i;
                this.updateDimensionsToContent(o, s);
                var n = deepExtend(this.getPositionBasedOnTarget(o, s)),
                    r = [];
                if (this.options.containment) {
                    var h = !1,
                        a = {};
                    if ($.each("top right bottom left".split(" "), $.proxy(function(t, i) {
                            (a[i] = this.isSideWithinContainment(i, s, !0)) && (h = !0)
                        }, this)), h || (n.contained = !0), n.contained) this.setPosition(n);
                    else if (r.unshift({
                            position: n,
                            targetPosition: o,
                            stemPosition: s
                        }), o = Position.flip(i), s = Position.flip(e), a[Position.getSide(o)] ? (this.updateDimensionsToContent(o, s), n = this.getPositionBasedOnTarget(o, s)) : n.contained = !1, n.contained) this.setPosition(n, s);
                    else {
                        r.unshift({
                            position: n,
                            targetPosition: o,
                            stemPosition: s
                        });
                        var d = i,
                            p = this.getContainmentSpace(s, !0),
                            l = "horizontal" === Position.getOrientation(d) ? ["left", "right"] : ["top", "bottom"],
                            c = (p[l[0]] === p[l[1]] ? "horizontal" === Position.getOrientation(d) ? "left" : "top" : l[p[l[0]] > p[l[1]] ? 0 : 1]) + Position.split(d)[1],
                            f = Position.flip(c);
                        if (o = c, s = f, a[Position.getSide(o)] ? (this.updateDimensionsToContent(o, s), n = this.getPositionBasedOnTarget(o, s)) : n.contained = !1, n.contained) this.setPosition(n, s);
                        else {
                            var u;
                            r.unshift({
                                position: n,
                                targetPosition: o,
                                stemPosition: s
                            });
                            var m = [];
                            if ($.each(r, function(t, i) {
                                    if (0 <= i.position.top && 0 <= i.position.left) u = i;
                                    else {
                                        var e = 0 <= i.position.top ? 1 : Math.abs(i.position.top),
                                            s = 0 <= i.position.left ? 1 : Math.abs(i.position.left);
                                        m.push({
                                            result: i,
                                            negativity: e * s
                                        })
                                    }
                                }), !u) {
                                var g = m[m.length - 1];
                                $.each(m, function(t, i) {
                                    i.negativity < g.negativity && (g = i)
                                }), u = g.result
                            }
                            this.updateDimensionsToContent(u.targetPosition, u.stemPosition, !0), this.setPosition(u.position, u.stemPosition)
                        }
                    }
                } else this.setPosition(n);
                this._cache.dimensions = this.skin._vars.dimensions, this.skin.paint(), this.is("positioning", !1)
            }
        },
        getPositionBasedOnTarget: function(t, i) {
            i = i || this.options.position.tooltip;
            var e, s = this.getTargetDimensions(),
                o = {
                    left: 0,
                    top: 0
                },
                n = {
                    left: 0,
                    top: 0
                },
                r = (Position.getSide(t), this.skin._vars),
                h = r.frames[Position.getSide(i)],
                a = Position.getOrientation(t),
                d = Position.split(t);
            if ("horizontal" === a) {
                switch (e = Math.floor(.5 * s.width), d[2]) {
                    case "left":
                        n.left = e;
                        break;
                    case "middle":
                        o.left = s.width - e, n.left = o.left;
                        break;
                    case "right":
                        o.left = s.width, n.left = s.width - e
                }
                "bottom" === d[1] && (o.top = s.height, n.top = s.height)
            } else {
                switch (e = Math.floor(.5 * s.height), d[2]) {
                    case "top":
                        n.top = e;
                        break;
                    case "middle":
                        o.top = s.height - e, n.top = o.top;
                        break;
                    case "bottom":
                        n.top = s.height - e, o.top = s.height
                }
                "right" === d[1] && (o.left = s.width, n.left = s.width)
            }
            var p = this.getTargetPosition(),
                l = $.extend({}, s, {
                    top: p.top,
                    left: p.left,
                    connection: o,
                    max: n
                }),
                c = {
                    width: h.dimensions.width,
                    height: h.dimensions.height,
                    top: 0,
                    left: 0,
                    connection: r.connections[i].connection,
                    stem: r.connections[i].stem
                };
            if (c.top = l.top + l.connection.top, c.left = l.left + l.connection.left, c.top -= c.connection.top, c.left -= c.connection.left, this.options.stem) {
                var f = r.stemDimensions.width,
                    u = {
                        stem: {
                            top: c.top + c.stem.connection.top,
                            left: c.left + c.stem.connection.left
                        },
                        connection: {
                            top: l.top + l.connection.top,
                            left: l.left + l.connection.left
                        },
                        max: {
                            top: l.top + l.max.top,
                            left: l.left + l.max.left
                        }
                    };
                if (!Position.isPointWithinBox(u.stem.left, u.stem.top, u.connection.left, u.connection.top, u.max.left, u.max.top)) {
                    u = {
                        stem: {
                            top: c.top + c.stem.connection.top,
                            left: c.left + c.stem.connection.left
                        },
                        connection: {
                            top: l.top + l.connection.top,
                            left: l.left + l.connection.left
                        },
                        max: {
                            top: l.top + l.max.top,
                            left: l.left + l.max.left
                        }
                    };
                    var m = {
                            connection: Position.getDistance(u.stem.left, u.stem.top, u.connection.left, u.connection.top),
                            max: Position.getDistance(u.stem.left, u.stem.top, u.max.left, u.max.top)
                        },
                        g = Math.min(m.connection, m.max),
                        b = u[m.connection <= m.max ? "connection" : "max"],
                        v = "horizontal" === Position.getOrientation(i) ? "left" : "top";
                    if (f <= Position.getDistance(u.connection.left, u.connection.top, u.max.left, u.max.top)) {
                        var _ = {
                                top: 0,
                                left: 0
                            },
                            x = b[v] < u.stem[v] ? -1 : 1;
                        _[v] = g * x, _[v] += Math.floor(.5 * f) * x, c.left += _.left, c.top += _.top
                    } else {
                        $.extend(u, {
                            center: {
                                top: Math.round(l.top + .5 * s.height),
                                left: Math.round(l.left + .5 * s.left)
                            }
                        });
                        g = m[Position.getDistance(u.center.left, u.center.top, u.connection.left, u.connection.top) <= Position.getDistance(u.center.left, u.center.top, u.max.left, u.max.top) ? "connection" : "max"];
                        var w = {
                            top: 0,
                            left: 0
                        };
                        x = b[v] < u.stem[v] ? -1 : 1;
                        w[v] = g * x, c.left += w.left, c.top += w.top
                    }
                }
            }
            if (this.options.offset) {
                var y = $.extend({}, this.options.offset);
                y = Position.adjustOffsetBasedOnPosition(y, this.options.position.target, t), c.top += y.y, c.left += y.x
            }
            var T = this.getContainment({
                    top: c.top,
                    left: c.left
                }, i),
                k = T.horizontal && T.vertical,
                P = {
                    x: 0,
                    y: 0
                },
                C = Position.getOrientation(i);
            if (!T[C]) {
                var S = "horizontal" === C,
                    O = S ? ["left", "right"] : ["up", "down"],
                    M = S ? "x" : "y",
                    z = S ? "left" : "top",
                    D = T.correction[M],
                    I = this.getContainmentLayout(i),
                    A = I.position[S ? "left" : "top"];
                if (0 !== D) {
                    var W = r.connections[i].move,
                        E = W[O[-1 * D < 0 ? 0 : 1]],
                        L = D < 0 ? -1 : 1;
                    if (D * L <= E && c[z] + D >= A) c[z] += D, P[M] = -1 * D, k = !0;
                    else if (Position.getOrientation(t) === Position.getOrientation(i)) {
                        if (c[z] += E * L, P[M] = E * L * -1, c[z] < A) {
                            var j = A - c[z],
                                B = W[O[0]] + W[O[1]];
                            j = Math.min(j, B), c[z] += j;
                            var H = P[M] - j;
                            H >= r.connections[i].move[O[0]] && H <= r.connections[i].move[O[1]] && (P[M] -= j)
                        }
                        var R = (T = this.getContainment({
                                top: c.top,
                                left: c.left
                            }, i)).correction[M],
                            F = deepExtend({}, c);
                        this.options.offset && (F.left -= this.options.offset.x, F.top -= this.options.offset.y), (u = {
                            stem: {
                                top: F.top + c.stem.connection.top,
                                left: F.left + c.stem.connection.left
                            }
                        }).stem[z] += P[M];
                        var q = this.getTargetLayout(),
                            U = (f = r.stemDimensions.width, Math.floor(.5 * f)),
                            Q = A + I.dimensions[S ? "width" : "height"];
                        if ("x" == M) {
                            var V = q.position.left + U;
                            0 < R && (V += q.dimensions.width - 2 * U), (R < 0 && u.stem.left + R >= V && F.left + R >= A || 0 < R && u.stem.left + R <= V && F.left + R <= Q) && (F.left += R)
                        } else {
                            var G = q.position.top + U;
                            0 < R && (G += q.dimensions.height - 2 * U), (R < 0 && u.stem.top + R >= G && F.top + R >= A || 0 < R && u.stem.top + R <= G && F.top + R <= Q) && (F.top += R)
                        }
                        c = F, this.options.offset && (c.left += this.options.offset.x, c.top += this.options.offset.y)
                    }
                }
                k = (T = this.getContainment({
                    top: c.top,
                    left: c.left
                }, i)).horizontal && T.vertical
            }
            return {
                top: c.top,
                left: c.left,
                contained: k,
                shift: P
            }
        },
        setPosition: function(t, i) {
            var e = this._position;
            if (!e || e.top !== t.top || e.left !== t.left) {
                var s;
                if (this.options.container !== document.body) {
                    if ("string" === $.type(this.options.container)) {
                        var o = this.target;
                        "mouse" === o && (o = this.element), s = $($(o).closest(this.options.container).first())
                    } else s = $(s);
                    if (s[0]) {
                        var n = $(s).offset(),
                            r = Math.round(n.top),
                            h = Math.round(n.left),
                            a = Math.round($(s).scrollTop()),
                            d = Math.round($(s).scrollLeft());
                        t.top -= r, t.top += a, t.left -= h, t.left += d
                    }
                }
                this._position = t, this._tooltip.css({
                    top: t.top,
                    left: t.left
                })
            }
            this.skin.setStemPosition(i || this.options.position.tooltip, t.shift || {
                x: 0,
                y: 0
            })
        },
        getSideLine: function(t, i) {
            var e = t.position.left,
                s = t.position.top,
                o = t.position.left,
                n = t.position.top;
            switch (i) {
                case "top":
                    o += t.dimensions.width;
                    break;
                case "bottom":
                    s += t.dimensions.height, o += t.dimensions.width, n += t.dimensions.height;
                    break;
                case "left":
                    n += t.dimensions.height;
                    break;
                case "right":
                    e += t.dimensions.width, o += t.dimensions.width, n += t.dimensions.height
            }
            return {
                x1: e,
                y1: s,
                x2: o,
                y2: n
            }
        },
        isSideWithinContainment: function(t, i, e) {
            var s = this.getContainmentLayout(i, e),
                o = this.getTargetLayout(),
                n = this.getSideLine(o, t);
            if (Position.isPointWithinBoxLayout(n.x1, n.y1, s) || Position.isPointWithinBoxLayout(n.x2, n.y2, s)) return !0;
            var r = !1;
            return $.each("top right bottom left".split(" "), $.proxy(function(t, i) {
                var e = this.getSideLine(s, i);
                if (Position.intersectsLine(n.x1, n.y1, n.x2, n.y2, e.x1, e.y1, e.x2, e.y2)) return !(r = !0)
            }, this)), r
        },
        getContainment: function(t, i) {
            var e = {
                horizontal: !0,
                vertical: !0,
                correction: {
                    y: 0,
                    x: 0
                }
            };
            if (this.options.containment) {
                var s = this.getContainmentLayout(i),
                    o = this.skin._vars.frames[Position.getSide(i)].dimensions;
                this.options.containment && ((t.left < s.position.left || t.left + o.width > s.position.left + s.dimensions.width) && (e.horizontal = !1, t.left < s.position.left ? e.correction.x = s.position.left - t.left : e.correction.x = s.position.left + s.dimensions.width - (t.left + o.width)), (t.top < s.position.top || t.top + o.height > s.position.top + s.dimensions.height) && (e.vertical = !1, t.top < s.position.top ? e.correction.y = s.position.top - t.top : e.correction.y = s.position.top + s.dimensions.height - (t.top + o.height)))
            }
            return e
        },
        getContainmentLayout: function(t, i) {
            var e = {
                    top: $(window).scrollTop(),
                    left: $(window).scrollLeft()
                },
                s = this.target;
            "mouse" === s && (s = this.element);
            var o, n = $(s).closest(this.options.containment.selector).first()[0];
            o = n && "viewport" !== this.options.containment.selector ? {
                dimensions: {
                    width: $(n).innerWidth(),
                    height: $(n).innerHeight()
                },
                position: $(n).offset()
            } : {
                dimensions: Bounds.viewport(),
                position: e
            };
            var r = this.options.containment.padding;
            if (r && !i) {
                var h = Math.max(o.dimensions.height, o.dimensions.width);
                if (h < 2 * r && (r = Math.max(Math.floor(.5 * h), 0)), r) o.dimensions.width -= 2 * r, o.dimensions.height -= 2 * r, o.position.top += r, o.position.left += r, "vertical" === Position.getOrientation(t) ? (o.dimensions.width += r, "left" === Position.getSide(t) && (o.position.left -= r)) : (o.dimensions.height += r, "top" === Position.getSide(t) && (o.position.top -= r))
            }
            return this._cache.layouts.containmentLayout = o
        },
        getMouseRoom: function() {
            var t = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            };
            if ("mouse" === this.options.target && !this.is("api")) {
                var i = Mouse.getActualPosition(this._cache.event),
                    e = $(this.element).offset(),
                    s = $(this.element).innerWidth(),
                    o = $(this.element).innerHeight();
                t = {
                    top: Math.max(0, i.top - e.top),
                    bottom: Math.max(0, e.top + o - i.top),
                    left: Math.max(0, i.left - e.left),
                    right: Math.max(0, e.left + s - i.left)
                }
            }
            return t
        },
        getTargetPosition: function() {
            var t, i;
            return t = "mouse" === this.options.target ? this.is("api") ? (i = $(this.element).offset(), {
                top: Math.round(i.top),
                left: Math.round(i.left)
            }) : Mouse.getPosition(this._cache.event) : (i = $(this.target).offset(), {
                top: Math.round(i.top),
                left: Math.round(i.left)
            }), this._cache.layouts.targetPosition = t
        },
        getTargetDimensions: function() {
            return this._cache.layouts.targetDimensions ? this._cache.layouts.targetDimensions : (t = "mouse" === this.options.target ? Mouse.getDimensions() : {
                width: $(this.target).innerWidth(),
                height: $(this.target).innerHeight()
            }, this._cache.layouts.targetDimensions = t);
            var t
        },
        getTargetLayout: function() {
            if (this._cache.layouts.targetLayout) return this._cache.layouts.targetLayout;
            var t = {
                position: this.getTargetPosition(),
                dimensions: this.getTargetDimensions()
            };
            return this._cache.layouts.targetLayout = t
        },
        getPaddingLine: function(t) {
            var i = this.getTargetLayout(),
                e = "left";
            if ("vertical" === Position.getOrientation(t)) return this.getSideLine(i, Position.getSide(t));
            if (Position.isCorner(t)) {
                var s = Position.inverseCornerPlane(t);
                return e = Position.getSide(s), this.getSideLine(i, e)
            }
            var o = this.getSideLine(i, e),
                n = Math.round(.5 * i.dimensions.width);
            return o.x1 += n, o.x2 += n, o
        }
    }), $.extend(Tooltip.prototype, {
        setActive: function() {
            this.is("active", !0), this.visible() && this.raise(), this.options.hideAfter && this.clearTimer("idle")
        },
        setIdle: function() {
            this.is("active", !1), this.options.hideAfter && this.setTimer("idle", $.proxy(function() {
                this.clearTimer("idle"), this.is("active") || this.hide()
            }, this), this.options.hideAfter)
        }
    }), $.extend(Tooltip.prototype, {
        bind: function(t, i, e, s) {
            var o = $.proxy(e, s || this);
            this._cache.events.push({
                element: t,
                eventName: i,
                handler: o
            }), $(t).bind(i, o)
        },
        unbind: function() {
            $.each(this._cache.events, function(t, i) {
                $(i.element).unbind(i.eventName, i.handler)
            }), this._cache.events = []
        }
    }), $.extend(Tooltip.prototype, {
        disable: function() {
            this.is("disabled") || this.is("disabled", !0)
        },
        enable: function() {
            this.is("disabled") && this.is("disabled", !1)
        }
    }), $.extend(Tooltip.prototype, {
        is: function(t, i) {
            return "boolean" === $.type(i) && (this._cache.is[t] = i), this._cache.is[t]
        },
        visible: function() {
            return this.is("visible")
        }
    }), $.extend(Tooltip.prototype, {
        setTimer: function(t, i, e) {
            this._cache.timers[t] = _.delay(i, e)
        },
        getTimer: function(t) {
            return this._cache.timers[t]
        },
        clearTimer: function(t) {
            this._cache.timers[t] && (clearTimeout(this._cache.timers[t]), delete this._cache.timers[t])
        },
        clearTimers: function() {
            $.each(this._cache.timers, function(t, i) {
                clearTimeout(i)
            }), this._cache.timers = {}
        }
    }), $.extend(Tipped, {
        init: function() {
            Tooltips.init()
        },
        create: function(t, e) {
            var s = $.extend({}, arguments[2] || {}),
                o = [];
            return _.isElement(t) ? o.push(new Tooltip(t, e, s)) : $(t).each(function(t, i) {
                o.push(new Tooltip(i, e, s))
            }), new Collection(o)
        },
        get: function(t) {
            return new Collection(Tooltips.get(t))
        },
        findElement: function(t) {
            return Tooltips.findElement(t)
        },
        hideAll: function() {
            return Tooltips.hideAll(), this
        },
        setDefaultSkin: function(t) {
            return Tooltips.setDefaultSkin(t), this
        },
        visible: function(t) {
            if (_.isElement(t)) return Tooltips.isVisibleByElement(t);
            if ("undefined" === $.type(t)) return Tooltips.getVisible().length;
            var i = $(t),
                e = 0;
            return $.each(i, function(t, i) {
                Tooltips.isVisibleByElement(i) && e++
            }), e
        },
        clearAjaxCache: function() {
            return Tooltips.clearAjaxCache(), this
        },
        refresh: function(t, i, e) {
            return Tooltips.refresh(t, i, e), this
        },
        setStartingZIndex: function(t) {
            return Tooltips.setStartingZIndex(t), this
        },
        remove: function(t) {
            return Tooltips.remove(t), this
        }
    }), $.each("show hide toggle disable enable".split(" "), function(t, i) {
        Tipped[i] = function(t) {
            return this.get(t)[i](), this
        }
    }), $.extend(Tipped, {
        delegate: function() {
            Delegations.add.apply(Delegations, _slice.call(arguments))
        },
        undelegate: function() {
            Delegations.remove.apply(Delegations, _slice.call(arguments))
        }
    });
    var Delegations = {
        _uid: 0,
        _delegations: {},
        add: function(t, e, s) {
            "object" !== $.type(e) || _.isElement(e) ? s = s || {} : (s = e, e = null);
            var o = ++this._uid,
                i = Options.create($.extend({}, s));
            this._delegations[o] = {
                uid: o,
                selector: t,
                content: e,
                options: i
            };

            function n(t) {
                $(this).addClass("tpd-delegation-uid-" + o);
                var i = new Tooltip(this, e, s);
                i._cache.event = t, i.setActive(), i.showDelayed()
            }
            this._delegations[o].removeTitleHandler = $.proxy(this.removeTitle, this), $(document).delegate(t + ":not(.tpd-delegation-uid-" + o + ")", "mouseenter", this._delegations[o].removeTitleHandler), this._delegations[o].handler = n, $(document).delegate(t + ":not(.tpd-delegation-uid-" + o + ")", i.showOn.element, n)
        },
        removeTitle: function(t) {
            var i = t.currentTarget,
                e = $(i).attr("title");
            e && ($(i).data("tipped-restore-title", e), $(i)[0].setAttribute("title", ""))
        },
        remove: function(e) {
            $.each(this._delegations, $.proxy(function(t, i) {
                i.selector === e && ($(document).undelegate(e + ":not(.tpd-delegation-uid-" + t + ")", "mouseenter", i.removeTitleHandler).undelegate(e + ":not(.tpd-delegation-uid-" + t + ")", i.options.showOn.element, i.handler), delete this._delegations[t])
            }, this))
        },
        removeAll: function() {
            $.each(this._delegations, $.proxy(function(t, i) {
                $(document).undelegate(i.selector + ":not(.tpd-delegation-uid-" + t + ")", "mouseenter", i.removeTitleHandler).undelegate(i.selector + ":not(.tpd-delegation-uid-" + t + ")", i.options.showOn.element, i.handler), delete this._delegations[t]
            }, this))
        }
    };

    function Collection() {
        this.initialize.apply(this, _slice.call(arguments))
    }
    return $.extend(Collection.prototype, {
        initialize: function(t) {
            return this.tooltips = t, this
        },
        items: function() {
            return $.each(this.tooltips, function(t, i) {
                i.is("api", !0)
            }), this.tooltips
        },
        refresh: function(t) {
            return $.each(this._tooltips, function(t, i) {
                i.is("visible") && i.refresh()
            }), this
        },
        remove: function() {
            return Tooltips.removeTooltips(this.tooltips), this.tooltips = [], this
        }
    }), $.each("show hide toggle disable enable".split(" "), function(t, e) {
        Collection.prototype[e] = function() {
            return $.each(this.tooltips, function(t, i) {
                i.is("api", !0), i[e]()
            }), this
        }
    }), Tipped.init(), Tipped
});