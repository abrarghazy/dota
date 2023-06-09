
!function (t, e, i, s) {
    "use strict";
    function o(e, i, s) {
        this.element = t(e), this._defaults = a, this._name = n;
        var o = i.lastIndexOf(".");
        i = i.slice(0, 0 > o ? i.length : o), this.settings = t.extend({}, a, s), this.path = i, this.init()
    }

    var n = "vide", a = {
        volume: 1,
        playbackRate: 1,
        muted: !0,
        loop: !0,
        autoplay: !0,
        position: "50% 50%",
        posterType: "jpg"
    }, r = /iPad|iPhone|iPod/i.test(s.userAgent), p = /Android/i.test(s.userAgent);
    t[n] = {lookup: []};
    var h = function (t) {
        var e, i, s = {};
        e = t.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ","), i = e.split(",");
        var o, n, a;
        for (o = 0, n = i.length; n > o; o++)i[o] = i[o].split(":"), a = i[o][1], ("string" == typeof a || a instanceof String) && (a = "true" === a || ("false" === a ? !1 : a)), ("string" == typeof a || a instanceof String) && (a = isNaN(a) ? a : +a), s[i[o][0]] = a;
        return s
    }, d = function (t) {
        var e = t.split(" ");
        switch (e[0]) {
            case"left":
                e[0] = "0%";
                break;
            case"center":
                e[0] = "50%";
                break;
            case"right":
                e[0] = "100%"
        }
        switch (e[1]) {
            case"top":
                e[1] = "0";
                break;
            case"middle":
                e[1] = "50%";
                break;
            case"bottom":
                e[1] = "100%"
        }
        return {x: e[0], y: e[1]}
    };
    o.prototype.init = function () {
        var e = this;
        if (this.wrapper = t('<div class="vide_bg">'), this.wrapper.css({
                position: "absolute",
                "z-index": 0,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                overflow: "hidden",
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover",
                "background-repeat": "no-repeat",
                "background-position": "center center"
            }), "detect" === this.settings.posterType ? (t.get(this.path + ".png").done(function () {
                e.wrapper.css("background-image", "url(" + e.path + ".png)")
            }), t.get(this.path + ".jpg").done(function () {
                e.wrapper.css("background-image", "url(" + e.path + ".jpg)")
            }), t.get(this.path + ".gif").done(function () {
                e.wrapper.css("background-image", "url(" + e.path + ".gif)")
            })) : e.wrapper.css("background-image", "url(" + e.path + "." + this.settings.posterType + ")"), "static" === this.element.css("position") && this.element.css("position", "relative"), this.element.prepend(this.wrapper), !r && !p) {
            this.video = t("<video><source src='" + this.path + ".mp4' type='video/mp4'><source src='" + this.path + ".webm' type='video/webm'><source src='" + this.path + ".ogv' type='video/ogg'></video>"), this.video.css("visibility", "hidden"), this.video.prop({
                autoplay: this.settings.autoplay,
                loop: this.settings.loop,
                volume: this.settings.volume,
                muted: this.settings.muted,
                playbackRate: this.settings.playbackRate
            }), this.wrapper.append(this.video);
            var i = d(this.settings.position);
            this.video.css({
                margin: "auto",
                position: "absolute",
                "z-index": 1,
                top: i.y,
                left: i.x,
                "-webkit-transform": "translate(-" + i.x + ", -" + i.y + ")",
                "-ms-transform": "translate(-" + i.x + ", -" + i.y + ")",
                transform: "translate(-" + i.x + ", -" + i.y + ")"
            }), this.video.bind("loadedmetadata." + n, function () {
                e.video.css("visibility", "visible"), e.resize()
            }), t(this.element).bind("resize." + n, function () {
                e.resize()
            })
        }
    }, o.prototype.getVideoObject = function () {
        return this.video ? this.video[0] : null
    }, o.prototype.resize = function () {
        if (this.video) {
            var t = this.video[0].videoHeight, e = this.video[0].videoWidth, i = this.wrapper.height(), s = this.wrapper.width();
            this.video.css(s / e > i / t ? {width: s + 2, height: "auto"} : {width: "auto", height: i + 2})
        }
    }, o.prototype.destroy = function () {
        this.element.unbind(n), this.video.unbind(n), delete t[n].lookup[this.index], this.element.removeData(n), this.wrapper.remove()
    }, t.fn[n] = function (e, i) {
        var s;
        return this.each(function () {
            s = t.data(this, n), s && s.destroy(), s = new o(this, e, i), s.index = t[n].lookup.push(s) - 1, t.data(this, n, s)
        }), this
    }, t(i).ready(function () {
        t(e).bind("resize." + n, function () {
            for (var e, i = t[n].lookup.length, s = 0; i > s; s++)e = t[n].lookup[s], e && e.resize()
        }), t(i).find("[data-" + n + "-bg]").each(function (e, i) {
            var s = t(i), o = s.data(n + "-options"), a = s.data(n + "-bg");
            o = o ? h(o) : {}, s[n](a, o)
        })
    })
}(jQuery || Zepto, window, document, navigator);