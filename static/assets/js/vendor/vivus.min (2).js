! function() {
    "use strict";

    function t(t) {
        if (void 0 === t) throw new Error('Pathformer [constructor]: "element" parameter is required');
        if (t.constructor === String && !(t = document.getElementById(t))) throw new Error('Pathformer [constructor]: "element" parameter is not related to an existing ID');
        if (!(t instanceof window.SVGElement || t instanceof window.SVGGElement || /^svg$/i.test(t.nodeName))) throw new Error('Pathformer [constructor]: "element" parameter must be a string or a SVGelement');
        this.el = t, this.scan(t)
    }
    var e, r, n, i;

    function a(t, r, n) {
        e(), this.isReady = !1, this.setElement(t, r), this.setOptions(r), this.setCallback(n), this.isReady && this.init()
    }
    t.prototype.TYPES = ["line", "ellipse", "circle", "polygon", "polyline", "rect"], t.prototype.ATTR_WATCH = ["cx", "cy", "points", "r", "rx", "ry", "x", "x1", "x2", "y", "y1", "y2"], t.prototype.scan = function(t) {
        for (var e, r, n, i = t.querySelectorAll(this.TYPES.join(",")), a = 0; a < i.length; a++) r = (0, this[(e = i[a]).tagName.toLowerCase() + "ToPath"])(this.parseAttr(e.attributes)), n = this.pathMaker(e, r), e.parentNode.replaceChild(n, e)
    }, t.prototype.lineToPath = function(t) {
        var e = {},
            r = t.x1 || 0,
            n = t.y1 || 0,
            i = t.x2 || 0,
            a = t.y2 || 0;
        return e.d = "M" + r + "," + n + "L" + i + "," + a, e
    }, t.prototype.rectToPath = function(t) {
        var e = {},
            r = parseFloat(t.x) || 0,
            n = parseFloat(t.y) || 0,
            i = parseFloat(t.width) || 0,
            a = parseFloat(t.height) || 0;
        if (t.rx || t.ry) {
            var o = parseInt(t.rx, 10) || -1,
                s = parseInt(t.ry, 10) || -1;
            o = Math.min(Math.max(o < 0 ? s : o, 0), i / 2), s = Math.min(Math.max(s < 0 ? o : s, 0), a / 2), e.d = "M " + (r + o) + "," + n + " L " + (r + i - o) + "," + n + " A " + o + "," + s + ",0,0,1," + (r + i) + "," + (n + s) + " L " + (r + i) + "," + (n + a - s) + " A " + o + "," + s + ",0,0,1," + (r + i - o) + "," + (n + a) + " L " + (r + o) + "," + (n + a) + " A " + o + "," + s + ",0,0,1," + r + "," + (n + a - s) + " L " + r + "," + (n + s) + " A " + o + "," + s + ",0,0,1," + (r + o) + "," + n
        } else e.d = "M" + r + " " + n + " L" + (r + i) + " " + n + " L" + (r + i) + " " + (n + a) + " L" + r + " " + (n + a) + " Z";
        return e
    }, t.prototype.polylineToPath = function(t) {
        var e, r, n = {},
            i = t.points.trim().split(" ");
        if (-1 === t.points.indexOf(",")) {
            var a = [];
            for (e = 0; e < i.length; e += 2) a.push(i[e] + "," + i[e + 1]);
            i = a
        }
        for (r = "M" + i[0], e = 1; e < i.length; e++) - 1 !== i[e].indexOf(",") && (r += "L" + i[e]);
        return n.d = r, n
    }, t.prototype.polygonToPath = function(e) {
        var r = t.prototype.polylineToPath(e);
        return r.d += "Z", r
    }, t.prototype.ellipseToPath = function(t) {
        var e = {},
            r = parseFloat(t.rx) || 0,
            n = parseFloat(t.ry) || 0,
            i = parseFloat(t.cx) || 0,
            a = parseFloat(t.cy) || 0,
            o = i - r,
            s = a,
            h = parseFloat(i) + parseFloat(r),
            l = a;
        return e.d = "M" + o + "," + s + "A" + r + "," + n + " 0,1,1 " + h + "," + l + "A" + r + "," + n + " 0,1,1 " + o + "," + l, e
    }, t.prototype.circleToPath = function(t) {
        var e = {},
            r = parseFloat(t.r) || 0,
            n = parseFloat(t.cx) || 0,
            i = parseFloat(t.cy) || 0,
            a = n - r,
            o = i,
            s = parseFloat(n) + parseFloat(r),
            h = i;
        return e.d = "M" + a + "," + o + "A" + r + "," + r + " 0,1,1 " + s + "," + h + "A" + r + "," + r + " 0,1,1 " + a + "," + h, e
    }, t.prototype.pathMaker = function(t, e) {
        var r, n, i = document.createElementNS("http://www.w3.org/2000/svg", "path");
        for (r = 0; r < t.attributes.length; r++) n = t.attributes[r], -1 === this.ATTR_WATCH.indexOf(n.name) && i.setAttribute(n.name, n.value);
        for (r in e) i.setAttribute(r, e[r]);
        return i
    }, t.prototype.parseAttr = function(t) {
        for (var e, r = {}, n = 0; n < t.length; n++) {
            if (e = t[n], -1 !== this.ATTR_WATCH.indexOf(e.name) && -1 !== e.value.indexOf("%")) throw new Error("Pathformer [parseAttr]: a SVG shape got values in percentage. This cannot be transformed into 'path' tags. Please use 'viewBox'.");
            r[e.name] = e.value
        }
        return r
    }, a.LINEAR = function(t) {
        return t
    }, a.EASE = function(t) {
        return -Math.cos(t * Math.PI) / 2 + .5
    }, a.EASE_OUT = function(t) {
        return 1 - Math.pow(1 - t, 3)
    }, a.EASE_IN = function(t) {
        return Math.pow(t, 3)
    }, a.EASE_OUT_BOUNCE = function(t) {
        var e = 1 - Math.cos(t * (.5 * Math.PI)),
            r = Math.pow(e, 1.5),
            n = Math.pow(1 - t, 2);
        return 1 - n + (1 - Math.abs(Math.cos(r * (2.5 * Math.PI)))) * n
    }, a.prototype.setElement = function(t, e) {
        var r, n;
        if (void 0 === t) throw new Error('Vivus [constructor]: "element" parameter is required');
        if (t.constructor === String && !(t = document.getElementById(t))) throw new Error('Vivus [constructor]: "element" parameter is not related to an existing ID');
        if (this.parentEl = t, e && e.file) {
            n = this, r = function() {
                var t = document.createElement("div");
                t.innerHTML = this.responseText;
                var r = t.querySelector("svg");
                if (!r) throw new Error("Vivus [load]: Cannot find the SVG in the loaded file : " + e.file);
                n.el = r, n.el.setAttribute("width", "100%"), n.el.setAttribute("height", "100%"), n.parentEl.appendChild(n.el), n.isReady = !0, n.init(), n = null
            };
            var i = new window.XMLHttpRequest;
            return i.addEventListener("load", r), i.open("GET", e.file), void i.send()
        }
        var a = "" + t.constructor,
            o = "" + window.SVGSVGElement,
            s = "" + window.SVGElement,
            h = "" + window.SVGGElement,
            l = "" + window.HTMLObjectElement;
        switch (a) {
            case o:
            case s:
            case h:
                this.el = t, this.isReady = !0;
                break;
            case l:
                n = this, (r = function(e) {
                    if (!n.isReady) {
                        if (n.el = t.contentDocument && t.contentDocument.querySelector("svg"), !n.el && e) throw new Error("Vivus [constructor]: object loaded does not contain any SVG");
                        n.el && (t.getAttribute("built-by-vivus") && (n.parentEl.insertBefore(n.el, t), n.parentEl.removeChild(t), n.el.setAttribute("width", "100%"), n.el.setAttribute("height", "100%")), n.isReady = !0, n.init(), n = null)
                    }
                })() || t.addEventListener("load", r);
                break;
            default:
                throw new Error('Vivus [constructor]: "element" parameter is not valid (or miss the "file" attribute)')
        }
    }, a.prototype.setOptions = function(t) {
        var e = ["delayed", "sync", "async", "nsync", "oneByOne", "scenario", "scenario-sync"],
            r = ["inViewport", "manual", "autostart"];
        if (void 0 !== t && t.constructor !== Object) throw new Error('Vivus [constructor]: "options" parameter must be an object');
        if ((t = t || {}).type && -1 === e.indexOf(t.type)) throw new Error("Vivus [constructor]: " + t.type + " is not an existing animation `type`");
        if (this.type = t.type || e[0], t.start && -1 === r.indexOf(t.start)) throw new Error("Vivus [constructor]: " + t.start + " is not an existing `start` option");
        if (this.start = t.start || r[0], this.isIE = -1 !== window.navigator.userAgent.indexOf("MSIE") || -1 !== window.navigator.userAgent.indexOf("Trident/") || -1 !== window.navigator.userAgent.indexOf("Edge/"), this.duration = i(t.duration, 120), this.delay = i(t.delay, null), this.dashGap = i(t.dashGap, 1), this.forceRender = t.hasOwnProperty("forceRender") ? !!t.forceRender : this.isIE, this.reverseStack = !!t.reverseStack, this.selfDestroy = !!t.selfDestroy, this.onReady = t.onReady, this.map = [], this.frameLength = this.currentFrame = this.delayUnit = this.speed = this.handle = null, this.ignoreInvisible = !!t.hasOwnProperty("ignoreInvisible") && !!t.ignoreInvisible, this.animTimingFunction = t.animTimingFunction || a.LINEAR, this.pathTimingFunction = t.pathTimingFunction || a.LINEAR, this.delay >= this.duration) throw new Error("Vivus [constructor]: delay must be shorter than duration")
    }, a.prototype.setCallback = function(t) {
        if (t && t.constructor !== Function) throw new Error('Vivus [constructor]: "callback" parameter must be a function');
        this.callback = t || function() {}
    }, a.prototype.mapping = function() {
        var t, e, r, n, a, o, s, h;
        for (h = o = s = 0, e = this.el.querySelectorAll("path"), t = 0; t < e.length; t++) r = e[t], this.isInvisible(r) || (a = {
            el: r,
            length: Math.ceil(r.getTotalLength())
        }, isNaN(a.length) ? window.console && console.warn && console.warn("Vivus [mapping]: cannot retrieve a path element length", r) : (this.map.push(a), r.style.strokeDasharray = a.length + " " + (a.length + 2 * this.dashGap), r.style.strokeDashoffset = a.length + this.dashGap, a.length += this.dashGap, o += a.length, this.renderPath(t)));
        for (o = 0 === o ? 1 : o, this.delay = null === this.delay ? this.duration / 3 : this.delay, this.delayUnit = this.delay / (e.length > 1 ? e.length - 1 : 1), this.reverseStack && this.map.reverse(), t = 0; t < this.map.length; t++) {
            switch (a = this.map[t], this.type) {
                case "delayed":
                    a.startAt = this.delayUnit * t, a.duration = this.duration - this.delay;
                    break;
                case "oneByOne":
                    a.startAt = s / o * this.duration, a.duration = a.length / o * this.duration;
                    break;
                case "sync":
                case "async":
                case "nsync":
                    a.startAt = 0, a.duration = this.duration;
                    break;
                case "scenario-sync":
                    r = a.el, n = this.parseAttr(r), a.startAt = h + (i(n["data-delay"], this.delayUnit) || 0), a.duration = i(n["data-duration"], this.duration), h = void 0 !== n["data-async"] ? a.startAt : a.startAt + a.duration, this.frameLength = Math.max(this.frameLength, a.startAt + a.duration);
                    break;
                case "scenario":
                    r = a.el, n = this.parseAttr(r), a.startAt = i(n["data-start"], this.delayUnit) || 0, a.duration = i(n["data-duration"], this.duration), this.frameLength = Math.max(this.frameLength, a.startAt + a.duration)
            }
            s += a.length, this.frameLength = this.frameLength || this.duration
        }
    }, a.prototype.drawer = function() {
        var t = this;
        if (this.currentFrame += this.speed, this.currentFrame <= 0) this.stop(), this.reset();
        else {
            if (!(this.currentFrame >= this.frameLength)) return this.trace(), void(this.handle = r(function() {
                t.drawer()
            }));
            this.stop(), this.currentFrame = this.frameLength, this.trace(), this.selfDestroy && this.destroy()
        }
        this.callback(this), this.instanceCallback && (this.instanceCallback(this), this.instanceCallback = null)
    }, a.prototype.trace = function() {
        var t, e, r, n;
        for (n = this.animTimingFunction(this.currentFrame / this.frameLength) * this.frameLength, t = 0; t < this.map.length; t++) e = (n - (r = this.map[t]).startAt) / r.duration, e = this.pathTimingFunction(Math.max(0, Math.min(1, e))), r.progress !== e && (r.progress = e, r.el.style.strokeDashoffset = Math.floor(r.length * (1 - e)), this.renderPath(t))
    }, a.prototype.renderPath = function(t) {
        if (this.forceRender && this.map && this.map[t]) {
            var e = this.map[t],
                r = e.el.cloneNode(!0);
            e.el.parentNode.replaceChild(r, e.el), e.el = r
        }
    }, a.prototype.init = function() {
        this.frameLength = 0, this.currentFrame = 0, this.map = [], new t(this.el), this.mapping(), this.starter(), this.onReady && this.onReady(this)
    }, a.prototype.starter = function() {
        switch (this.start) {
            case "manual":
                return;
            case "autostart":
                this.play();
                break;
            case "inViewport":
                var t = this,
                    e = function() {
                        t.isInViewport(t.parentEl, 1) && (t.play(), window.removeEventListener("scroll", e))
                    };
                window.addEventListener("scroll", e), e()
        }
    }, a.prototype.getStatus = function() {
        return 0 === this.currentFrame ? "start" : this.currentFrame === this.frameLength ? "end" : "progress"
    }, a.prototype.reset = function() {
        return this.setFrameProgress(0)
    }, a.prototype.finish = function() {
        return this.setFrameProgress(1)
    }, a.prototype.setFrameProgress = function(t) {
        return t = Math.min(1, Math.max(0, t)), this.currentFrame = Math.round(this.frameLength * t), this.trace(), this
    }, a.prototype.play = function(t, e) {
        if (this.instanceCallback = null, t && "function" == typeof t) this.instanceCallback = t, t = null;
        else if (t && "number" != typeof t) throw new Error("Vivus [play]: invalid speed");
        return e && "function" == typeof e && !this.instanceCallback && (this.instanceCallback = e), this.speed = t || 1, this.handle || this.drawer(), this
    }, a.prototype.stop = function() {
        return this.handle && (n(this.handle), this.handle = null), this
    }, a.prototype.destroy = function() {
        var t, e;
        for (this.stop(), t = 0; t < this.map.length; t++)(e = this.map[t]).el.style.strokeDashoffset = null, e.el.style.strokeDasharray = null, this.renderPath(t)
    }, a.prototype.isInvisible = function(t) {
        var e, r = t.getAttribute("data-ignore");
        return null !== r ? "false" !== r : !!this.ignoreInvisible && (!(e = t.getBoundingClientRect()).width && !e.height)
    }, a.prototype.parseAttr = function(t) {
        var e, r = {};
        if (t && t.attributes)
            for (var n = 0; n < t.attributes.length; n++) r[(e = t.attributes[n]).name] = e.value;
        return r
    }, a.prototype.isInViewport = function(t, e) {
        var r = this.scrollY(),
            n = r + this.getViewportH(),
            i = t.getBoundingClientRect(),
            a = i.height,
            o = r + i.top;
        return o + a * (e = e || 0) <= n && o + a >= r
    }, a.prototype.getViewportH = function() {
        var t = this.docElem.clientHeight,
            e = window.innerHeight;
        return t < e ? e : t
    }, a.prototype.scrollY = function() {
        return window.pageYOffset || this.docElem.scrollTop
    }, e = function() {
        a.prototype.docElem || (a.prototype.docElem = window.document.documentElement, r = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
            return window.setTimeout(t, 1e3 / 60)
        }, n = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(t) {
            return window.clearTimeout(t)
        })
    }, i = function(t, e) {
        var r = parseInt(t, 10);
        return r >= 0 ? r : e
    }, "function" == typeof define && define.amd ? define([], function() {
        return a
    }) : "object" == typeof exports ? module.exports = a : window.Vivus = a
}();