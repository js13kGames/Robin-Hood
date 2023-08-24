(()=>{
    "use strict";
    class t {
        constructor(t=1 / 60, e, i=!1) {
            this.at = 0,
            this.lt = null,
            this.dt = t,
            this.t = e,
            i && this.start(),
            this.p = this.s = !1
        }
        fireOnce() {
            this.queue(),
            this.s = !0
        }
        up(t) {
            if (this.lt)
                for (this.at += (t - this.lt) / 1e3,
                this.at > 1 && (this.at = 1); this.at > this.dt; ) {
                    this.t.update(Math.floor(t / 1e3)),
                    this.at -= this.dt;
                    break
                }
            this.lt = t,
            this.s || this.queue()
        }
        togglePause() {
            this.p = !this.p
        }
        queue() {
            requestAnimationFrame((t=>{
                this.up(t)
            }
            ))
        }
        start() {
            this.s = !1,
            this.queue()
        }
        stop() {
            this.s = !0
        }
    }
    class e {
        constructor(t) {
            this.main = t,
            this.Objects = []
        }
        update(t) {
            this.time = t,
            [...this.Objects].forEach((e=>{
                e.update && e.update(t)
            }
            )),
            this.Objects = this.Objects.filter((t=>!t.delete))
        }
        draw(t) {
            t.clearRect(0, 0, t.canvas.width, t.canvas.height),
            t.fillStyle = "black",
            t.fillRect(0, 0, t.canvas.width, t.canvas.height),
            [...this.Objects].forEach((e=>{
                e.draw && e.draw(t)
            }
            ))
        }
        ss(t) {
            this.main.previousScene = this.main.scene,
            t.main = this.main,
            this.main.toScene(t)
        }
        prevss(t) {
            this.main.toScene(this.main.previousScene),
            this.main.previousScene = t
        }
        notify(t) {
            let e = t.name
              , i = t.event;
            "keydown" == e && this.keydown ? this.keydown(i) : "keyup" == e && this.keyup ? this.keyup(i) : "mousemove" == e && this.mousemove ? this.mousemove(i) : "click" == e && this.click ? this.click(i) : "control" == e && this.control ? this.control(i.key) : "controlts" == e && this.controlts ? this.controlts(i.key) : "controlte" == e && this.controlte ? this.controlte(i.key) : console.log(e)
        }
        mousemove(t) {}
        keyup(t) {
            this.control(t.key)
        }
    }
    const i = Math.PI
      , s = (t,e=document)=>e.querySelector(t)
      , a = t=>t < 0 ? -t : t
      , r = (t=1,e=0)=>e + (t - e) * Math.random()
      , h = (t=1,e=0)=>0 | r(t, e)
      , n = (t=0,e=0)=>{
        let i = document.createElement("canvas");
        return i.width = t,
        i.height = e,
        i
    }
      , o = t=>t.getContext("2d")
      , c = (t,e,i,s)=>t + e + i + s == 0 ? null : t + e + i == 0 || t > 255 || e > 255 || i > 255 ? "#000000" : "#" + ((t << 16) + (e << 8) + i).toString(16).padStart(6, "0")
      , l = (t,e,s=!0)=>((t,e,i=!0)=>{
        let s, a;
        var r, h;
        i && e % (Math.PI / 4) != 0 ? (r = t.width,
        h = t.height,
        s = a = Math.sqrt(r * r + h * h)) : (s = t.width,
        a = t.height);
        const c = n(s, a)
          , l = o(c)
          , d = {
            x: s / 2,
            y: a / 2
        };
        return l.imageSmoothingQuality = "high",
        l.save(),
        l.translate(d.x, d.y),
        l.rotate(e),
        l.drawImage(t, 0, 0, t.width, t.height, -t.width / 2, -t.height / 2, t.width, t.height),
        l.restore(),
        c
    }
    )(t, (e %= 8) * i / 4, s)
      , d = (t,e,i,s,a)=>{
        let r = n(s, a);
        return o(r).drawImage(t, e, i, s, a, 0, 0, s, a),
        r
    }
      , g = (t,e=1,i=null)=>{
        let s = t.length
          , a = Math.max(...t.map((t=>t.length)));
        var r = n(a * e, s * e)
          , h = o(r);
        for (let r = 0; r < s; r++)
            for (let s = 0; s < a; s++) {
                var c = t[r][s];
                i && (c = i(c)),
                c && "" != c && (h.fillStyle = c,
                h.fillRect(s * e, r * e, e, e))
            }
        return r
    }
      , p = (t,e)=>{
        for (var i = o(t), s = t.width, a = t.height, r = i.getImageData(0, 0, s, a).data, h = [], n = 0; n < r.length; n += 4)
            h.push(c(r[n], r[n + 1], r[n + 2], r[n + 3]));
        var l = [];
        for (let e = 0; e < t.height; e++)
            l[e] = [];
        let d = 0
          , g = 0;
        for (let i = 0; i < h.length; i++)
            d >= t.width && (g++,
            d = 0),
            l[g][d] = h[i],
            e && (l[g][d] = e(l[g][d])),
            d++;
        return l
    }
    ;
    function m(t, e, i="source-atop") {
        let s = n(t.width, t.height)
          , a = o(s);
        return a.drawImage(t, 0, 0),
        a.globalCompositeOperation = i,
        a.fillStyle = e,
        a.fillRect(0, 0, s.width, s.height),
        s
    }
    const u = (t,e,i="source-atop")=>{
        let s = n(t.width, t.height)
          , a = o(s);
        a.drawImage(t, 0, 0),
        a.globalCompositeOperation = i;
        for (let i = 0; i < t.width / e.width; i++)
            for (let s = 0; s < t.height / e.height; s++)
                a.drawImage(e, i * e.width, s * e.height);
        return s
    }
      , w = 0
      , f = 1
      , y = 2
      , v = 3
      , x = 4
      , M = 5
      , b = 6
      , S = 7
      , T = (t,e=!0)=>{
        let i = n(t.width, t.height)
          , s = o(i);
        return s.save(),
        e ? (s.scale(-1, 1),
        s.drawImage(t, 0, 0, -1 * t.width, t.height)) : (s.scale(1, -1),
        s.drawImage(t, 0, 0, t.width, -1 * t.height)),
        s.restore(),
        i
    }
      , I = t=>{
        var e = n(t[0].width, t[0].height)
          , i = o(e);
        for (let e in t)
            i.drawImage(t[e], 0, 0);
        return e
    }
    ;
    function A(t, e) {
        let i = n(t.width + e.width, t.height + e.height)
          , s = o(i);
        return s.drawImage(t, 0, 0),
        s.drawImage(t, t.width, e.height),
        s.drawImage(e, t.width, 0),
        s.drawImage(e, 0, t.height),
        i
    }
    function E(t, e, i=0) {
        0 == i && (i = e);
        var s = n(t.width * i, t.height * e)
          , a = o(s);
        for (let s = 0; s < e; s++)
            for (let e = 0; e < i; e++)
                a.drawImage(t, e * t.width, s * t.height);
        return s
    }
    function k(t, e) {
        let i = n(t.width, t.height)
          , s = o(i);
        return s.globalAlpha = e,
        s.drawImage(t, 0, 0),
        s.globalAlpha = 1,
        i
    }
    function C(t, e, i, s=!1) {
        var a = n(e, i)
          , r = o(a);
        return s && r.fillRect(0, 0, e, i),
        r.drawImage(t, e / 2 - t.width / 2, i / 2 - t.height / 2),
        a
    }
    class L {
        constructor(t={}) {}
        static get(t, e, i, s, a="Arial", r=0, h=0) {
            let c = o(n(1, 1));
            c.font = e + "px " + a;
            const l = r || c.measureText(t).width || 1
              , d = h || e + 2;
            let g = n(parseInt(l), d);
            c = o(g),
            c.font = e + "px " + a,
            c.fillStyle = i,
            c.fillText(t, 0, e - 2),
            s && (g = u(g, s));
            var p = n(g.width, g.height)
              , m = o(p);
            return m.fillStyle = "#ffffff",
            m.drawImage(g, 0, 0),
            p
        }
    }
    const P = [{
        c: 0,
        n: "dirt",
        x: 0,
        y: 0,
        w: 8,
        h: 8
    }, {
        c: 0,
        n: "grass",
        x: 1,
        y: 0,
        w: 8,
        h: 8
    }, {
        c: 0,
        n: "water",
        x: 2,
        y: 0,
        w: 8,
        h: 8
    }, {
        c: 0,
        n: "steel",
        x: 3,
        y: 0,
        w: 8,
        h: 8
    }, {
        c: 0,
        n: "brick",
        x: 4,
        y: 0,
        w: 8,
        h: 8
    }, {
        c: 1,
        n: "sword",
        x: 0,
        y: 1,
        w: 8,
        h: 8
    }, {
        c: 1,
        n: "bow",
        x: 1,
        y: 1,
        w: 8,
        h: 8
    }, {
        c: 1,
        n: "arrow",
        x: 2,
        y: 1,
        w: 8,
        h: 8
    }, {
        c: 1,
        n: "magic",
        x: 3,
        y: 1,
        w: 8,
        h: 8
    }, {
        c: 1,
        o: 1,
        n: "tree",
        x: 4,
        y: 1,
        w: 8,
        h: 8
    }, {
        c: 1,
        n: "coin",
        x: 0,
        y: 2,
        w: 8,
        h: 8
    }, {
        c: 1,
        n: "apple",
        x: 1,
        y: 2,
        w: 8,
        h: 8
    }, {
        c: 1,
        n: "lemon",
        x: 2,
        y: 2,
        w: 8,
        h: 8
    }, {
        c: 1,
        n: "rabbit",
        x: 0,
        y: 3,
        w: 8,
        h: 8
    }, {
        c: 1,
        n: "wolf",
        x: 1,
        y: 3,
        w: 16,
        h: 8
    }, {
        c: 1,
        n: "castle",
        x: 9,
        y: 0,
        w: 32,
        h: 32
    }, {
        c: 1,
        n: "cave",
        x: 3,
        y: 2,
        w: 16,
        h: 16
    }, {
        c: 1,
        n: "player",
        x: 0,
        y: 4,
        w: 16,
        h: 16
    }, {
        c: 1,
        n: "playerb",
        x: 2,
        y: 4,
        w: 16,
        h: 16
    }, {
        c: 1,
        n: "players",
        x: 4,
        y: 4,
        w: 8,
        h: 16
    }, {
        c: 1,
        n: "playerh",
        x: 5,
        y: 4,
        w: 8,
        h: 16
    }, {
        c: 1,
        n: "wizzard",
        x: 6,
        y: 4,
        w: 8,
        h: 16
    }, {
        c: 1,
        n: "bear",
        x: 7,
        y: 4,
        w: 16,
        h: 16
    }, {
        c: 1,
        n: "deer",
        x: 9,
        y: 4,
        w: 16,
        h: 16
    }, {
        c: 1,
        n: "house",
        x: 5,
        y: 0,
        w: 16,
        h: 16
    }, {
        c: 1,
        n: "shop",
        x: 5,
        y: 2,
        w: 16,
        h: 16
    }, {
        c: 1,
        n: "npcman",
        x: 7,
        y: 0,
        w: 16,
        h: 16
    }, {
        c: 1,
        n: "npcgirl",
        x: 7,
        y: 2,
        w: 16,
        h: 16
    }, {
        c: 1,
        n: "direction",
        x: 11,
        y: 4,
        w: 16,
        h: 16
    }, {
        c: 0,
        n: "map_spawn",
        x: 0,
        y: 6,
        w: 16,
        h: 16
    }, {
        c: 0,
        n: "map_castle",
        x: 2,
        y: 6,
        w: 16,
        h: 16
    }, {
        c: 0,
        n: "map_forest_1",
        x: 4,
        y: 6,
        w: 16,
        h: 16
    }, {
        c: 0,
        n: "map_forest_2",
        x: 6,
        y: 6,
        w: 16,
        h: 16
    }, {
        c: 0,
        n: "map_forest_3",
        x: 8,
        y: 6,
        w: 16,
        h: 16
    }, {
        c: 0,
        n: "map_forest_4",
        x: 10,
        y: 6,
        w: 16,
        h: 16
    }];
    class R {
        constructor() {
            this.spriteMap = this.getSpriteMap()
        }
        getSpriteMap() {
            if (R.MAP)
                return R.MAP;
            var t = P;
            for (let e = 0; e < t.length; e++)
                t[e].s1 = this.get(t[e].n),
                t[e].s2 = this.getMagnified(t[e].n, 2),
                t[e].s3 = this.getMagnified(t[e].n, 3);
            return R.MAP = t,
            R.MAP
        }
        async prepareSprites() {}
        getSpecialTile(t) {
            return null
        }
        getCfg(t) {
            return (this.spriteMap ? this.spriteMap : P).find((e=>e.n.toLowerCase() == t.toLowerCase()))
        }
        get(t) {
            var e = this.getCfg(t);
            if (!e || null == e.x)
                return this.getSpecialTile(t);
            if (e.s)
                return e.s;
            let i = s("#spriteSheetMain");
            var a = d(i, 8 * e.x, 8 * e.y, e.w, e.h);
            if (e.c) {
                var r = p(a, (t=>"#ffffff" === t ? "" : t));
                return g(r, 1, (t=>t))
            }
            return a
        }
        getMagnified(t, e=1) {
            var i = this.getCfg(t);
            if (i && 2 == e && i.s2)
                return i.s2;
            if (i && 3 == e && i.s3)
                return i.s3;
            var s = this.get(t)
              , a = p(s, (t=>"#ffffff" == t ? "" : t));
            return g(a, e, (t=>t))
        }
        static getColoredTile(t, e=1, i=1, s=1, a=1) {
            var r = n(e * s, i * a)
              , h = o(r);
            return h.fillStyle = t,
            h.fillRect(0, 0, r.width, r.height),
            r
        }
        static getByNameMagnified(t, e=1) {
            var i = this.getByName(t)
              , s = p(i, (t=>"#ffffff" == t ? "" : t));
            return g(s, e, (t=>t))
        }
        static getByName(t) {
            var e = P.find((e=>e.n.toLowerCase() == t.toLowerCase()));
            if (e.s)
                return e.s;
            let i = s("#spriteSheetMain");
            var a = d(i, 8 * e.x, 8 * e.y, e.w, e.h);
            if (e.c) {
                var r = p(a, (t=>"#ffffff" === t ? "" : t));
                return g(r, 1, (t=>t))
            }
            return a
        }
        static getPattern(t, e) {}
    }
    class O {
        constructor(t, e=2) {
            this.scene = t;
            var i = this.scene.main.spriteMap.getMagnified("castle", e)
              , s = ((t,e)=>{
                var i = p(t);
                const s = i.flat()
                  , a = [...new Set(s)]
                  , r = {};
                for (const t of a) {
                    r[t] = [];
                    for (let e = 0; e < i.length; e++) {
                        r[t].push([]);
                        for (let s = 0; s < i[e].length; s++)
                            i[e][s] === t ? r[t][e][s] = "#000000" : r[t][e][s] = null
                    }
                }
                return delete r.null,
                r
            }
            )(i)
              , a = g(s["#6a6a6a"])
              , r = g(s["#c2c2c2"])
              , h = u(a, k(this.scene.main.spriteMap.get("dirt"), .5))
              , n = u(a, k(this.scene.main.spriteMap.get("grass"), .5))
              , o = u(a, k(this.scene.main.spriteMap.get("water"), .5))
              , c = u(a, k(this.scene.main.spriteMap.get("brick"), .5))
              , l = u(a, k(this.scene.main.spriteMap.get("steel"), .5))
              , d = u(a, k(this.scene.main.spriteMap.get("magic"), .5))
              , m = u(r, k(this.scene.main.spriteMap.get("dirt"), .2))
              , w = u(r, k(this.scene.main.spriteMap.get("grass"), .2))
              , f = u(r, k(this.scene.main.spriteMap.get("water"), .2))
              , y = u(r, k(this.scene.main.spriteMap.get("brick"), .2))
              , v = u(r, k(this.scene.main.spriteMap.get("steel"), .2))
              , x = u(r, k(this.scene.main.spriteMap.get("magic"), .2));
            this.dirt = I([i, m, h]),
            this.grass = I([i, w, n]),
            this.water = I([i, f, o]),
            this.brick = I([i, y, c]),
            this.steel = I([i, v, l]),
            this.magic = I([i, x, d])
        }
        update(t) {
            this.time = t
        }
    }
    class N extends e {
        constructor(t) {
            super(t),
            this.buffer = n(this.main.config.width, this.main.config.height),
            this.main.spriteMap = new R;
            var e = this.main.spriteMap.getMagnified("grass", 1)
              , i = this.main.spriteMap.getMagnified("dirt", 1)
              , s = this.main.spriteMap.getMagnified("steel", 1)
              , a = A(i, e)
              , r = A(s, i);
            this.castleObj = new O(this),
            this.castle = this.castleObj.brick,
            this.player = this.main.spriteMap.getMagnified("player", 2),
            this.gmat = function(t, e, i, s, a=1) {
                a > 1 && (t = E(t, a),
                e = E(e, a));
                let r = A(t, e);
                var h = n(r.width * s, r.height * i)
                  , c = o(h);
                for (let t = 0; t < i; t++)
                    for (let e = 0; e < s; e++)
                        c.drawImage(r, t * r.height, e * r.width);
                return h
            }(a, r, this.main.canvas.width / 8, this.main.canvas.height / 8),
            this.gmat = k(this.gmat, .2),
            this.log = this.getLogo(),
            this.buffer = this.getBuffer(),
            this.loading = -20,
            this.intro = this.getIntro()
        }
        getLogo() {
            var t = n(400, 200)
              , e = o(t)
              , i = this.main.spriteMap.getMagnified("grass", 1)
              , s = this.main.spriteMap.getMagnified("dirt", 1)
              , a = this.main.spriteMap.getMagnified("water", 1)
              , r = this.main.spriteMap.getMagnified("steel", 1)
              , h = A(s, i)
              , c = A(r, r)
              , l = A(i, a)
              , d = A(a, s);
            return this.TextSprites = [L.get("13th CENTURY™", 20, "green", d, "Arial Black"), L.get("ROBIN➸HOOD ", 40, "green", h, "Arial Black"), L.get("THE➸OUTLAW ", 28, "green", c, "Arial Black"), L.get("★1370s∵∴∵∴∵∴∵∴∵∴∵∴∵2023★", 15, "green", l, "Arial Black")],
            e.drawImage(m(this.TextSprites[0], "white"), 0, 1),
            e.drawImage(this.TextSprites[0], 1, 1),
            e.drawImage(m(this.TextSprites[1], "red"), 1, 18),
            e.drawImage(this.TextSprites[1], 0, 17),
            e.drawImage(m(this.TextSprites[2], "white"), 85, 53),
            e.drawImage(this.TextSprites[2], 85, 52),
            e.drawImage(this.TextSprites[3], 82, 82),
            t
        }
        getIntro() {
            var t = ["you step into the legendary shoes of Robin Hood.", "your mission is to make the world a better place.", "- explore forest and hunt animals", "- do quests and trade with merchants", "- spread the wealth to the poor", "- improve your stats and defend the village", "a w s d / arrows for movement", "e interact, q menue, space fire", "explore forest hunt animal", "trade with merchants", "- give goodies to villagers for free (gain morale)", "- take quests from villagers for extra love", "find old wizzard for a magic bow", "more instructions can be learned in game"]
              , e = n(360, 500);
            let i = o(e);
            i.fillStyle = "white",
            i.font = "16px Arial";
            for (let e = 0; e < t.length; e++)
                i.fillText(t[e], 0, 25 * e + 20);
            return e
        }
        async prepareCanvas() {}
        update(t) {
            this.time = t,
            this.loading += .8
        }
        getBuffer() {
            let t = n(this.main.config.width, this.main.config.height)
              , e = o(t);
            e.drawImage(this.gmat, 0, 0);
            var i = this.main.config.width < 400 ? 16 : 128;
            return e.drawImage(this.log, i, 74),
            t
        }
        draw(t) {
            let e = 20;
            t.clearRect(0, 0, t.canvas.width, t.canvas.height),
            t.fillStyle = "black",
            t.fillRect(0, 0, t.canvas.width, t.canvas.height),
            t.drawImage(this.buffer, 0, 0),
            t.fillStyle = "green",
            t.font = "16px Arial",
            t.fillText("Time " + this.time, 20, e),
            e += 20,
            t.fillText("use any key to load menu ", 20, e),
            e += 20,
            t.drawImage(this.castleObj.dirt, 16, 192),
            t.drawImage(this.castleObj.grass, 88, 192),
            t.drawImage(this.castleObj.water, 160, 192),
            t.drawImage(this.castleObj.brick, 232, 192),
            t.drawImage(this.castleObj.steel, 304, 192),
            t.drawImage(this.castleObj.magic, 376, 192),
            t.drawImage(this.player, 16, 320),
            t.drawImage(d(this.intro, 0, this.loading % this.intro.height, this.intro.width, 200), 64, 320)
        }
        goToMainMenuScene() {
            this.loading > 100 && this.main.toMainMenuScene(),
            this.loading = 100
        }
        control(t) {
            this.goToMainMenuScene()
        }
        click(t) {
            this.goToMainMenuScene()
        }
        keydown(t) {
            this.goToMainMenuScene()
        }
        keyup(t) {
            this.goToMainMenuScene()
        }
    }
    class B {
        constructor(t, e=300, i=!0, s=!0, a=3) {
            this.notes = t,
            this.tempo = e,
            this.loop = a,
            this.pitch = s,
            this.playing = !1,
            this.audioContext = new AudioContext,
            this.originalNotes = this.notes,
            i && this.start()
        }
        getPossibleNotes() {
            return ["A", "B", "C", "D", "E"]
        }
        getPossibleNotesPitch() {
            return [1, 2, 3, 4, 5, 6, 7]
        }
        toggle() {
            this.playing ? this.stop() : this.start()
        }
        start() {
            this.playing = !0,
            this.playNextNote()
        }
        stop() {
            this.playing = !1
        }
        reset() {
            this.notes = this.originalNotes
        }
        getNoteFrequencyByLetter(t) {
            switch (t) {
            case "A":
                return 440;
            case "B":
                return 493.88;
            case "C":
                return 261.63;
            case "D":
                return 293.66;
            case "E":
                return 329.63;
            case "F":
                return 349.23;
            case "G":
                return 392
            }
            return 440
        }
        getFrequency(t) {
            var e = this.getNoteFrequencyByLetter(t[0]);
            return t.length > 1 ? e * Math.pow(2, t[1] / 12) : e
        }
        playNextNote() {
            if (!this.playing)
                return;
            if (0 === this.notes.length && this.loop > 0 && (this.notes = this.originalNotes,
            this.loop--),
            0 === this.notes.length)
                return this.stop();
            const t = this.notes[0];
            let e = 1;
            this.pitch ? (this.notes[1],
            this.notes = this.notes.slice(2)) : this.notes = this.notes.slice(1);
            const i = this.audioContext.createOscillator()
              , s = this.audioContext.createGain();
            i.connect(s),
            s.connect(this.audioContext.destination),
            i.frequency.setValueAtTime(this.getFrequency(t), this.audioContext.currentTime),
            i.start(),
            s.gain.setValueAtTime(0, this.audioContext.currentTime),
            s.gain.exponentialRampToValueAtTime(1, this.audioContext.currentTime + .02),
            setTimeout((()=>{
                s.gain.setValueAtTime(1, this.audioContext.currentTime),
                s.gain.exponentialRampToValueAtTime(.001, this.audioContext.currentTime + .02),
                i.stop(this.audioContext.currentTime + .02),
                this.playNextNote()
            }
            ), 60 / this.tempo * 1e3)
        }
    }
    class D extends e {
        constructor(t) {
            super(t),
            this.main.spriteMap.getMagnified("grass", 1),
            this.main.spriteMap.getMagnified("dirt", 1),
            this.main.spriteMap.getMagnified("steel", 1),
            this.sprites = {
                steel: this.main.spriteMap.getMagnified("steel", 1),
                water: this.main.spriteMap.getMagnified("water", 1),
                grass: this.main.spriteMap.getMagnified("grass", 1),
                dirt: this.main.spriteMap.getMagnified("dirt", 1),
                magic: this.main.spriteMap.getMagnified("magic", 1),
                player: this.main.spriteMap.getMagnified("player", 1)
            };
            var e = this.main.config.width < 400 ? 32 : 100;
            this.cursorLocations = [{
                x: e,
                y: 128
            }, {
                x: e,
                y: 160
            }, {
                x: e,
                y: 192
            }, {
                x: e,
                y: 224
            }, {
                x: e,
                y: 256
            }],
            this.playername = "robin hood",
            this.currentcursorloc = 0,
            this.sound = !1,
            this.buffer = this.staticBuffer()
        }
        staticBuffer() {
            var t = n(this.main.config.width, this.main.config.height);
            return o(t),
            t
        }
        update(t) {
            this.time = t
        }
        draw(t) {
            let e = 20;
            t.clearRect(0, 0, t.canvas.width, t.canvas.height),
            t.fillStyle = "black",
            t.fillRect(0, 0, t.canvas.width, t.canvas.height),
            t.fillStyle = "green",
            t.font = "16px Arial",
            t.drawImage(this.buffer, 0, 0),
            t.drawImage(L.get("█ ⓅⓁⒶⓎ ⒼⒶⓂⒺ", 24, "green", this.sprites.grass, "Verdana"), this.cursorLocations[0].x + 20, this.cursorLocations[0].y),
            t.drawImage(L.get("█ SOUND : " + (this.sound && 1 == this.sound ? "on" : "off"), 24, "green", this.sprites.water, "Verdana"), this.cursorLocations[1].x + 20, this.cursorLocations[1].y),
            t.drawImage(L.get("█ Music : " + (this.musicPlayer && this.musicPlayer.playing ? "on" : "off"), 24, "green", this.sprites.water, "Verdana"), this.cursorLocations[2].x + 20, this.cursorLocations[2].y),
            t.drawImage(L.get(`█ NAME : ${this.playername}`, 24, "green", this.sprites.water, "Verdana"), this.cursorLocations[3].x + 20, this.cursorLocations[3].y),
            t.drawImage(L.get("█ STATS ㋡", 24, "green", this.sprites.dirt, "Roboto"), this.cursorLocations[4].x + 20, this.cursorLocations[4].y),
            t.drawImage(this.sprites.player, this.cursorLocations[this.currentcursorloc].x, this.cursorLocations[this.currentcursorloc].y + 4),
            t.fillText("Time " + this.time, 20, e),
            e += 20
        }
        click(t) {}
        control(t) {
            if ("s" === t || "ArrowDown" === t)
                this.currentcursorloc = a(this.currentcursorloc + 1) % this.cursorLocations.length;
            else if ("w" === t || "ArrowUp" === t)
                this.currentcursorloc = a(this.currentcursorloc - 1) % this.cursorLocations.length;
            else if ("a" === t || "ArrowLeft" === t || "d" === t || "ArrowRight" === t || "space" === t || " " === t)
                if (0 == this.currentcursorloc)
                    this.main.toGameScene();
                else if (1 == this.currentcursorloc)
                    this.sound ? this.sound = !1 : this.sound = !0;
                else if (2 == this.currentcursorloc)
                    this.musicPlayer || (this.musicPlayer = new B("E4E4D4E4E4D4E4G4G4A4A4E4E4D4E4E4D4E4G4G4A4A4G4G4E4E4D4E4E4D4E4A4A4",120,!1,!0,2e3)),
                    this.musicPlayer.toggle();
                else if (3 == this.currentcursorloc) {
                    var e = prompt("name", this.playername);
                    this.playername = e && e.length > 0 ? e.substring(0, 10) : this.playername
                } else
                    4 == this.currentcursorloc && (this.musicPlayer && this.musicPlayer.stop(),
                    alert("under construction"))
        }
        keydown(t) {}
        keyup(t) {
            this.control(t.key)
        }
        loadingNewGameScene() {}
    }
    class H {
        constructor(t, e) {
            this.x = t,
            this.y = e
        }
        is(t) {
            let e = this.x
              , i = this.y
              , s = t.x
              , a = t.y;
            return e == s && i == a
        }
        distanceTo(t) {
            if (!t)
                return 1 / 0;
            let e = this.x
              , i = this.y
              , s = t.x
              , a = t.y;
            if (e == s && i == a)
                return 0;
            if (e == s)
                return Math.abs(i - a);
            if (i == a)
                return Math.abs(e - s);
            {
                let t = 0;
                return t += Math.pow(e - s, 2),
                t += Math.pow(i - a, 2),
                t = Math.sqrt(t),
                t
            }
        }
        getAngleTo(t) {
            let e = this.x
              , i = this.y
              , s = t.x
              , a = t.y;
            return e == s && i == a ? 0 : e == s && i > a || i == a && e < s || e == s && i < a || i == a && e > s || e < s && i > a || e < s && i < a || e > s && i < a || e > s && i > a ? 0 * Math.PI / 4 : 0
        }
        getDirectionTo(t) {
            let e = this.x
              , i = this.y
              , s = t.x
              , a = t.y;
            return e == s && i == a ? x : e > s ? b : e < s ? y : i < a ? x : i > a ? w : x
        }
        moveClone(t, e) {
            let i = this.clone();
            return i.move(t, e),
            i
        }
        move(t, e) {
            t == w ? this.y -= e : t == x ? this.y += e : t == b ? this.x -= e : t == y ? this.x += e : t == S ? (this.y -= e,
            this.x -= e) : t == f ? (this.y -= e,
            this.x += e) : t == v ? (this.y += e,
            this.x += e) : t == M && (this.y += e,
            this.x -= e)
        }
        moveAngleClone(t, e) {
            t -= Math.PI / 2;
            const i = e * Math.cos(t)
              , s = e * Math.sin(t);
            return new H(this.x + i,this.y + s)
        }
        moveClone(t, e) {
            let i = this.clone();
            return i.move(t, e),
            i
        }
        movetoward(t, e) {
            let i = t.x - this.x
              , s = t.y - this.y
              , a = Math.sqrt(i * i + s * s)
              , r = i / a || 0
              , h = s / a || 0;
            a < e ? (this.x = t.x,
            this.y = t.y) : (this.x += r * e,
            this.y += h * e)
        }
        movetowardGrid(t, e) {
            t.x > this.x ? this.x += e : t.x < this.x ? this.x -= e : t.y < this.y ? this.y -= e : t.y > this.y && (this.y += e)
        }
        clone() {
            return new H(this.x,this.y)
        }
        draw(t, e="red") {
            t.fillStyle = e,
            this.drawCircle(t, 3, e)
        }
        drawCircle(t, e=4, i="green") {
            t.fillStyle = i,
            t.strokeStyle = i,
            t.beginPath(),
            t.arc(this.x, this.y, e, 0, 2 * Math.PI),
            t.fill()
        }
    }
    const q = [{
        mcd: 15,
        attack: 1,
        life: 1,
        name: "rabbit"
    }, {
        mcd: 50,
        attack: 4,
        life: 5,
        name: "wolf"
    }, {
        mcd: 50,
        attack: 10,
        life: 8,
        name: "deer"
    }, {
        mcd: 50,
        attack: 20,
        life: 10,
        name: "bear"
    }, {
        mcd: 10,
        attack: 15,
        life: 10,
        name: "npcman"
    }, {
        mcd: 10,
        attack: 10,
        life: 10,
        name: "npcgirl"
    }];
    class _ {
        constructor(t, e=0, i=null) {
            this.type = e,
            this.scene = t,
            this.sprites = this.getSprites(),
            this.sprite = this.sprites[this.type],
            this.center = i || t.findAValidSpawnPoint(8, 25),
            this.life = q[this.type].life,
            this.maxLife = q[this.type].life,
            this.moveCountDown = q[this.type].mcd
        }
        getPossibleNextMove() {
            let t = [];
            var e = this.scene.tileSize;
            let i = this.center.x / e
              , s = this.center.y / e;
            if (this.scene.checkObstacle(i + 1, s) && t.push(new H),
            this.scene.checkObstacle(i + 1, s) && t.push(new H(i * e + e,s * e)),
            this.scene.checkObstacle(i - 1, s) && t.push(new H(i * e - e,s * e)),
            this.scene.checkObstacle(i, s + 1) && t.push(new H(i * e,s * e + e)),
            this.scene.checkObstacle(i, s - 1) && t.push(new H(i * e,s * e - e)),
            t.length > 0) {
                var a = t[h(0, t.length)];
                this.center = new H(a.x,a.y)
            }
        }
        update(t) {
            this.time = t,
            this.moveCountDown--,
            this.moveCountDown <= 0 && (this.moveCountDown = q[this.type].mcd,
            this.getPossibleNextMove(),
            this.center.distanceTo(this.scene.player.center) < 2 * this.scene.tileSize && (this.scene.player.life -= this.type + 1,
            this.scene.player.showDamageEffect = 10,
            console.log("attack player")))
        }
        getHealthBar() {
            var t = n(this.sprite.width, 3)
              , e = o(t);
            e.fillStyle = "green";
            var i = this.sprite.width * (this.life / this.maxLife);
            return e.fillRect(0, 0, i, 3),
            t
        }
        draw(t) {
            t.drawImage(this.sprite, this.center.x, this.center.y),
            t.drawImage(this.getHealthBar(), this.center.x, this.center.y)
        }
        getSprites() {
            if (_.SPRITES)
                return _.SPRITES;
            var t = this.scene.scalemultiplier
              , e = this.scene.tileSize
              , i = C(R.getByNameMagnified("rabbit", t), e, e, !1)
              , s = C(R.getByNameMagnified("wolf", t), e, e, !1)
              , a = C(R.getByNameMagnified("deer", t), e, e, !1)
              , r = R.getByNameMagnified("bear", t)
              , h = R.getByNameMagnified("npcman", t)
              , n = R.getByNameMagnified("npcgirl", t)
              , o = R.getByNameMagnified("sword", this.scene.scalemultiplier);
            this.w = e,
            this.h = e;
            var c = [i, s, a, r, h, n, o];
            return _.SPRITES = c,
            _.SPRITES
        }
    }
    class z extends _ {
        constructor(t, e=0, i=null) {
            super(t, e, i)
        }
        draw(t) {
            super.draw(t),
            t.drawImage(this.sprites[6], this.center.x + .65 * this.sprite.width, this.center.y + .25 * this.sprite.height)
        }
    }
    const V = [{
        n: "tree",
        o: 1,
        c: "#0d3702"
    }, {
        n: "brick",
        o: 1,
        c: "#bf0a0a"
    }, {
        n: "dirt",
        o: 0,
        c: "#d9a066"
    }, {
        n: "grass",
        o: 0,
        c: "#99e550"
    }, {
        n: "water",
        o: 2,
        c: "#8a99f6"
    }, {
        n: "steel",
        o: 1,
        c: "#6a6a6a"
    }, {
        n: "player",
        o: 0,
        c: "#130c40"
    }, {
        n: "army",
        o: 0,
        c: "#ff0000"
    }, {
        n: "cave",
        o: 1,
        c: "#2e2b2b"
    }, {
        n: "deerspawnpoint",
        o: 0,
        c: "#df7126"
    }, {
        n: "rabbitspawnpoint",
        o: 0,
        c: "#d1d1d1"
    }, {
        n: "wolfpawnpoint",
        o: 0,
        c: "#898898"
    }];
    class F {
        constructor(t, e=1) {
            this.gamescene = t,
            this.sMap = new R,
            this.presetmobs = [],
            this.caves = [],
            this.deerspawnpoints = [],
            this.houseLocations = [],
            this.shopLocations = [],
            this.getPredefinedMap1(e)
        }
        getObstacleMatrix() {}
        getColorAt(t, e) {
            return t = Math.floor(t),
            e = Math.floor(e),
            t < 0 || t > this.colorMatrix.length - 1 || e < 0 || e > this.colorMatrix.length - 1 ? null : this.colorMatrix[e][t]
        }
        isObstacleAt(t, e) {
            if (t = Math.floor(t),
            e = Math.floor(e),
            t < 0)
                return !0;
            if (t > this.colorMatrix.length - 1)
                return !0;
            if (e < 0)
                return !0;
            if (e > this.colorMatrix.length - 1)
                return !0;
            if (!this.colorMatrix[t])
                return !0;
            var i = this.colorMatrix[e][t];
            return this.isObstacle(i)
        }
        isObstacle(t) {
            var e = V.find((e=>e.c == t));
            return null == e ? 1 : e.o
        }
        getPredefinedMap1(t=1) {
            var e = this.sMap.get("map_spawn")
              , i = this.sMap.get("map_castle")
              , s = this.sMap.get("map_forest_1")
              , a = this.sMap.get("map_forest_2")
              , h = (this.sMap.get("map_forest_3"),
            this.sMap.get("map_forest_4"),
            e.width)
              , c = e.height
              , l = n(3 * h, 3 * c);
            (w = o(l)).drawImage(a, 0, 0),
            w.drawImage(i, h, 0),
            w.drawImage(s, h + h, 0),
            w.drawImage(s, 0, h),
            w.drawImage(e, h, h),
            w.drawImage(s, h + h, h),
            w.drawImage(s, 0, h + h),
            w.drawImage(s, h, h + h),
            w.drawImage(s, h + h, h + h);
            var d = p(l);
            this.colorMatrix = d;
            for (var g = {
                "#0d3702": this.sMap.getMagnified("tree", 2 * t),
                "#d9a066": E(this.sMap.get("dirt"), 2 * t),
                "#bf0a0a": E(this.sMap.get("brick"), 2 * t),
                "#99e550": E(this.sMap.get("grass"), 2 * t),
                "#8a99f6": E(this.sMap.get("water"), 2 * t),
                "#6a6a6a": E(this.sMap.get("steel"), 2 * t),
                "#a9a9a9": this.sMap.getMagnified("castle", 2 * t),
                "#fbf236": this.sMap.getMagnified("house", 2 * t),
                "#eca732": this.sMap.getMagnified("shop", 2 * t),
                "#2e2b2b": this.sMap.getMagnified("cave", 2 * t)
            }, m = 16 * t, u = n(d.length * m, d.length * m), w = o(u), f = 0; f < d.length; f++)
                for (var y = 0; y < d[f].length; y++) {
                    var v = d[y][f];
                    w.drawImage(r() > .5 ? g["#d9a066"] : g["#99e550"], f * m, y * m),
                    "#0d3702" == v ? w.drawImage(g["#0d3702"], f * m, y * m) : "#d9a066" == v ? w.drawImage(g["#d9a066"], f * m, y * m) : "#bf0a0a" == v ? w.drawImage(g["#bf0a0a"], f * m, y * m) : "#99e550" == v ? w.drawImage(g["#99e550"], f * m, y * m) : "#df7126" == v ? (w.drawImage(g["#99e550"], f * m, y * m),
                    this.deerspawnpoints.push([f, y])) : "#8a99f6" == v ? w.drawImage(g["#8a99f6"], f * m, y * m) : "#6a6a6a" == v ? w.drawImage(g["#6a6a6a"], f * m, y * m) : "#a9a9a9" == v ? this.castlelocation = new H(f * m,y * m) : "#2e2b2b" == v ? this.caves.push(new H(f * m,y * m)) : "#fbf236" == v ? this.houseLocations.push(new H(f * m,y * m)) : "#eca732" == v ? this.shopLocations.push(new H(f * m,y * m)) : "#130c40" == v ? (this.PLAYERLOCATION = new H(f * m,y * m),
                    d[f][y] = "#d9a066") : "#ff0000" == v ? this.presetmobs.push(new z(this.gamescene,4,new H(f * this.gamescene.tileSize,y * this.gamescene.tileSize))) : "#000000" == v || "#d1d1d1" == v || "#898898" == v || console.log(v, "unclassified")
                }
            w.drawImage(g["#a9a9a9"], this.castlelocation.x, this.castlelocation.y),
            this.houseLocations.forEach((t=>{
                w.drawImage(g["#fbf236"], t.x, t.y)
            }
            )),
            this.shopLocations.forEach((t=>{
                w.drawImage(g["#eca732"], t.x, t.y)
            }
            )),
            this.caves.forEach((t=>{
                w.drawImage(g["#2e2b2b"], t.x, t.y)
            }
            )),
            this.mapcanvas = u
        }
    }
    class G {
        constructor(t, e, i, s, a) {
            this.game = t,
            this.center = new H(0,0),
            this.h = i,
            this.w = e,
            this.ox = s,
            this.oy = a
        }
        fixToCords(t) {
            this.center = new H(t.x,t.y)
        }
        mapToPoint(t) {
            this.center = t
        }
        move(t) {
            this.center.move(t, 32)
        }
        getCanvas(t) {
            var e = {
                x: this.center.x - this.w / 2,
                y: this.center.y - this.h / 2
            };
            return d(t, e.x < 0 ? 0 : e.x, e.y < 0 ? 0 : e.y, this.w, this.h)
        }
        draw(t, e) {
            let i, s, a, r, h, n, o, c, l = e;
            i = s = a = r = h = n = o = c = 0;
            let d = {
                x: this.center.x - this.w / 2,
                y: this.center.y - this.h / 2
            };
            i = d.x,
            s = d.y,
            i <= 0 && (i = 0,
            this.center.x = i + this.w / 2),
            s <= 0 && (s = 0,
            this.center.y = s + this.h / 2),
            i + this.w > l.width && (i = l.width - this.w,
            this.center.x = i + this.w / 2),
            s + this.h > l.height && (s = l.height - this.h,
            this.center.y = s + this.h / 2),
            h = this.ox,
            n = this.oy,
            a = o = this.w,
            r = c = this.h,
            t.drawImage(l, i, s, a, r, h, n, o, c)
        }
        getFxy(t, e) {
            let i = t + this.center.x - this.w / 2 - this.ox
              , s = e + this.center.y - this.h / 2 - this.oy;
            return i = 32 * Math.floor(i / 32) + 16,
            s = 32 * Math.floor(s / 32) + 16,
            new H(i,s)
        }
    }
    class j {
        constructor(t) {
            this.ARCHERY = 8,
            this.HEALTH = 1,
            this.POWER = 1,
            this.SPEED = 8,
            this.STELTH = 1,
            this.LUCK = 1
        }
        getAttributeClasses() {
            return [{
                n: "ARCHERY",
                s: this.ARCHERY,
                c: this.getAttributeClass(this.ARCHERY)
            }, {
                n: "HEALTH",
                s: this.HEALTH,
                c: this.getAttributeClass(this.HEALTH)
            }, {
                n: "POWER",
                s: this.POWER,
                c: this.getAttributeClass(this.POWER)
            }, {
                n: "SPEED",
                s: this.SPEED,
                c: this.getAttributeClass(this.SPEED)
            }, {
                n: "STELTH",
                s: this.STELTH,
                c: this.getAttributeClass(this.STELTH)
            }, {
                n: "LUCK",
                s: this.LUCK,
                c: this.getAttributeClass(this.LUCK)
            }]
        }
        static getAttributeClass(t) {
            return t < 10 ? "G" : t < 20 ? "F" : t < 30 ? "E" : t < 40 ? "D" : t < 50 ? "C" : t < 60 ? "B" : t < 99 ? "A" : "S"
        }
        static getClassMultiplier(t) {
            switch (t.toUpperCase()) {
            case "G":
                return 1;
            case "F":
                return 5;
            case "E":
                return 10;
            case "D":
                return 20;
            case "C":
                return 50;
            case "B":
                return 100;
            case "A":
                return 1e3;
            case "S":
                return 1 / 0
            }
        }
    }
    class K {
        constructor(t) {
            this.center = new H(t.x,t.y),
            this.life = 1
        }
        draw(t) {
            t.drawImage(this.sprite, this.center.x, this.center.y)
        }
    }
    class U extends K {
        constructor(t) {
            super(t.center),
            this.e = t,
            this.direction = t.direction,
            this.sprites = this.getSprites(),
            this.sprite = this.sprites[this.direction],
            this.width = this.sprite.width,
            this.height = this.sprite.height,
            this.speed = this.width / 4,
            this.distanceToTravel = this.e.attributes.ARCHERY * this.speed / 2,
            this.movement = 0,
            this.life = 1
        }
        update(t) {
            this.time = t,
            this.movement++,
            this.movement < this.distanceToTravel ? (this.center.move(this.direction, this.speed),
            this.e.applyArrowEffect(this)) : this.life = 0
        }
        getSprites() {
            if (U.SPRITES)
                return U.SPRITES;
            var t = this.e.scene.scalemultiplier
              , e = 16 * t
              , i = C(R.getByNameMagnified("arrow", t), e, e)
              , s = l(i, 0)
              , a = l(i, 2)
              , r = l(i, 4)
              , h = l(i, 6);
            this.w = s.width,
            this.h = s.height;
            var n = [h, h, s, s, a, a, r, h];
            return U.SPRITES = n,
            U.SPRITES
        }
    }
    class Y extends K {
        constructor(t, e, i=0) {
            super(e),
            this.scene = t,
            this.sprites = this.getSprites(),
            this.sprite = this.sprites[i],
            document.body.append(this.sprite)
        }
        obtain(t) {}
        getSprites() {
            if (Y.SPRITES)
                return Y.SPRITES;
            var t = this.scene.scalemultiplier
              , e = this.scene.tileSize
              , i = C(R.getByNameMagnified("coin", t), e, e, !1);
            document.body.append(i),
            this.w = e,
            this.h = e;
            var s = [i];
            return Y.SPRITES = s,
            Y.SPRITES
        }
    }
    class $ {
        constructor(t) {
            this.scene = t,
            this.life = this.maxLife = 100,
            this.score = 0,
            this.attributes = new j(1),
            this.center = new H(0,0),
            this.destination = new H(0,0),
            this.isMoving = !1,
            this.time = 0,
            this.direction = x,
            this.sprites = this.getSprites(),
            this.sprite = this.sprites[x],
            this.shots = [],
            this.firecooldown = 0,
            this.hunts = [],
            this.ArrowsCount = 1e4
        }
        setPosition(t) {
            this.center = new H(t.x,t.y),
            this.destination = new H(t.x,t.y)
        }
        update(t) {
            this.firecooldown = Math.max(this.firecooldown - 1, 0),
            this.shots = this.shots.filter((t=>t.life > 0)),
            [...this.shots].forEach((e=>{
                e.update && e.update(t)
            }
            )),
            this.time = t,
            0 != this.center.distanceTo(this.destination) ? (this.isMoving = !0,
            this.center.movetoward(this.destination, this.attributes.SPEED)) : (this.isMoving = !1,
            this.scene.camera.fixToCords(this.center))
        }
        fire() {
            this.firecooldown > 0 || (this.firecooldown = 20 - 2 * this.attributes.ARCHERY,
            this.ArrowsCount--,
            this.shots.push(new U(this)),
            this.playSwooshSound())
        }
        damageEffect() {
            this.showDamageEffect = 10
        }
        useSword() {
            this.usingsword = 10
        }
        applyArrowEffect(t) {
            var e = t.center
              , i = this.scene.gamemap.isObstacleAt(e.x / this.scene.tileSize, e.y / this.scene.tileSize);
            1 != i && 1 != i || 2 == i || (t.life = 0,
            this.playArrowHitSound());
            for (let e = 0; e < this.scene.mobs.length; e++) {
                var s = this.scene.mobs[e];
                s.center.distanceTo(t.center) < this.scene.tileSize && (s.life -= t.life,
                s.life <= 0 && (console.log("add drop"),
                this.scene.mobs.push(new Y(this.scene,s.center)),
                4 == s.type || 5 == s.type ? this.score -= s.type + 1 : this.score += s.type + 1),
                this.playArrowHitSound(),
                t.life = 0)
            }
        }
        getHealthBar() {
            var t = n(this.sprite.width, 3)
              , e = o(t);
            e.fillStyle = "green",
            this.life < this.maxLife / 2 && (e.fillStyle = "orange"),
            this.life < this.maxLife / 2 && (e.fillStyle = "red");
            var i = this.sprite.width * (this.life / this.maxLife);
            return e.fillRect(0, 0, i, 3),
            t
        }
        draw(t) {
            t.drawImage(this.sprite, this.center.x, this.center.y),
            this.direction == x && t.drawImage(this.bow, this.center.x + this.sprite.width - this.bow.width, this.center.y + this.sprite.height - 1.5 * this.bow.height),
            this.direction == b && t.drawImage(T(this.bow), this.center.x + this.sprite.width - 1.6 * this.bow.width, this.center.y + this.sprite.height - 1.3 * this.bow.height),
            this.direction == y && t.drawImage(this.bow, this.center.x + this.sprite.width - 1.2 * this.bow.width, this.center.y + this.sprite.height - 1.3 * this.bow.height),
            [...this.shots].forEach((e=>{
                e.draw && e.draw(t)
            }
            )),
            t.drawImage(this.getHealthBar(), this.center.x, this.center.y),
            this.showDamageEffect > 0 && (t.fillStyle = "#ff0000aa",
            t.fillRect(this.center.x, this.center.y, this.sprite.width, this.sprite.height),
            this.showDamageEffect--)
        }
        rotateToward(t, e) {
            var i = this.center.getDirectionTo(new H(t,e));
            this.direction = i,
            this.sprite = this.sprites[i]
        }
        moveTo(t, e) {
            var i = this.center.getDirectionTo(new H(t,e));
            this.direction = i,
            0 != this.center.distanceTo(new H(t,e)) && (this.sprite = this.sprites[i],
            this.move(i))
        }
        move(t) {
            t === this.direction ? this.isMoving || (console.log("moving player"),
            this.destination.move(t, this.width)) : this.direction = t
        }
        getSprites() {
            this.bow = R.getByNameMagnified("bow", this.scene.scalemultiplier);
            var t = R.getByNameMagnified("player", this.scene.scalemultiplier)
              , e = R.getByNameMagnified("playerb", this.scene.scalemultiplier)
              , i = R.getByNameMagnified("players", this.scene.scalemultiplier);
            return this.width = t.width,
            this.height = t.height,
            [e, e, i = C(i, this.width, this.height), t, t, t, T(i, !0), e]
        }
        getSprite() {
            return this.sprite
        }
        playSwooshSound() {
            const t = new (window.AudioContext || window.webkitAudioContext)
              , e = t.createOscillator();
            e.type = "sawtooth",
            e.frequency.setValueAtTime(500, t.currentTime);
            const i = t.createGain();
            i.gain.setValueAtTime(.2, t.currentTime);
            const s = t.createBiquadFilter();
            s.type = "lowpass",
            s.frequency.setValueAtTime(500, t.currentTime),
            e.connect(i),
            i.connect(s),
            s.connect(t.destination),
            e.start(),
            i.gain.exponentialRampToValueAtTime(.01, t.currentTime + .5),
            e.stop(t.currentTime + 1)
        }
        playArrowHitSound() {
            const t = new (window.AudioContext || window.webkitAudioContext)
              , e = t.createOscillator();
            e.type = "square",
            e.frequency.setValueAtTime(400, t.currentTime);
            const i = t.createGain();
            i.gain.setValueAtTime(.2, t.currentTime);
            const s = t.createBiquadFilter();
            s.type = "lowpass",
            s.frequency.setValueAtTime(400, t.currentTime),
            e.connect(i),
            i.connect(s),
            s.connect(t.destination),
            e.start(),
            i.gain.exponentialRampToValueAtTime(.01, t.currentTime + .5),
            e.stop(t.currentTime + 1)
        }
    }
    class W extends e {
        constructor(t) {
            super(t),
            this.init()
        }
        init() {
            this.difficulity = 1,
            this.scalemultiplier = 2,
            this.tileSize = 16 * this.scalemultiplier,
            this.keyboard = {},
            this.gamemap = new F(this,this.scalemultiplier),
            this.player = new $(this),
            this.player.setPosition(this.gamemap.PLAYERLOCATION ? this.gamemap.PLAYERLOCATION : new H(224,224)),
            this.camera = new G(this,this.main.config.width,this.main.config.height,0,0),
            this.camera.mapToPoint(this.player.center),
            this.playername = "robin hood",
            this.mobs = [...this.gamemap.presetmobs],
            this.drops = [],
            this.validSpawnPointsForMobs = this.findValidSpawnPointInMap(),
            this.spawnPointsTest = this.findAllValidSpawnPoint()
        }
        haveEntityAt(t, e) {
            var i = new H(t,e);
            for (let t = 0; t < this.mobs.length; t++) {
                var s = this.mobs[t];
                if (s.center.distanceTo(i) < this.tileSize)
                    return s
            }
            return null
        }
        checkObstacle(t, e) {}
        checkObstacle(t, e) {
            return null != this.haveEntityAt(t, e) || this.gamemap.isObstacleAt(t / this.tileSize, e / this.tileSize)
        }
        getBuffer() {
            var t = n(this.main.config.width, this.main.config.height);
            let e = o(t);
            e.clearRect(0, 0, e.canvas.width, e.canvas.height),
            e.fillStyle = "black",
            e.fillRect(0, 0, e.canvas.width, e.canvas.height);
            var i = (t=>{
                if (!t)
                    return null;
                let e = n(t.width, t.height);
                return o(e).drawImage(t, 0, 0),
                e
            }
            )(this.gamemap.mapcanvas)
              , s = o(i);
            [...this.mobs].forEach((t=>{
                t.update && t.draw(s)
            }
            )),
            this.player.draw(s);
            var a = this.camera.getCanvas(i);
            return e.drawImage(a, 0, 0),
            t
        }
        update(t) {
            this.time = t,
            this.mobs.length < 35 && this._spawnMob(),
            [...this.mobs].forEach((e=>{
                e.update && e.update(t)
            }
            )),
            this.mobs = this.mobs.filter((t=>t.life > 0)),
            this.player.update(t);
            for (let t in this.keyboard)
                this.keyboard[t] && this.applyKeyboardKey(t);
            this.player.life <= 0 && (alert("game over"),
            this.main.gamescene = null,
            this.main.toMainMenuScene())
        }
        _spawnMob() {
            if (this.mobs.length > 35)
                return;
            let t = new _(this,h(0, 3));
            this.mobs.push(t)
        }
        findValidSpawnPointInMap() {
            var t = [];
            for (let i = 0; i < this.gamemap.colorMatrix.length; i++)
                for (let s = 0; s < this.gamemap.colorMatrix.length; s++) {
                    var e = new H(i * this.tileSize,s * this.tileSize);
                    this.gamemap.isObstacleAt(i, s) || t.push(e)
                }
            return t
        }
        findAValidSpawnPoint(t=8, e=13) {
            var i = this.findAllValidSpawnPoint(t, e);
            return i.length > 0 ? i[h(0, i.length)] : new H(this.tileSize,this.tileSize)
        }
        findAllValidSpawnPoint(t=8, e=13) {
            var i = this.validSpawnPointsForMobs;
            i = (i = i.filter((e=>e.distanceTo(this.player.center) > this.tileSize * t))).filter((t=>t.distanceTo(this.player.center) < this.tileSize * e));
            var s = [];
            for (let t in i) {
                var a = !0;
                for (let e = 0; e < this.mobs.length; e++)
                    if (this.mobs[e].center.distanceTo(new H(i[t].x,i[t].y)) < this.tileSize) {
                        a = !1;
                        break
                    }
                a && s.push(i[t])
            }
            return i
        }
        applyKeyboardKey(t) {
            if (" " !== t && "space" !== t || this.player.fire(),
            " " !== t && "f" !== t || this.player.useSword(),
            " " === t || "e" === t)
                ;
            else if ("q" === t)
                this.keyboard.q = !1,
                this.main.toMainMenuScene();
            else if (!this.player.isMoving) {
                var e = this.player.center.clone()
                  , i = !1;
                "s" === t || "ArrowDown" === t ? (e.move(x, this.player.height),
                i = !0) : "w" === t || "ArrowUp" === t ? (e.move(w, this.player.height),
                i = !0) : "d" === t || "ArrowRight" === t ? (e.move(y, this.player.height),
                i = !0) : "a" !== t && "ArrowLeft" !== t || (e.move(b, this.player.height),
                i = !0),
                i && (this.checkObstacle(e.x, e.y) ? this.player.rotateToward(e.x, e.y) : this.player.moveTo(e.x, e.y))
            }
        }
        draw(t) {
            var e;
            t.clearRect(0, 0, t.canvas.width, t.canvas.height),
            t.fillStyle = "black",
            t.fillRect(0, 0, t.canvas.width, t.canvas.height),
            t.fillStyle = "green",
            t.font = "16px Arial",
            t.drawImage(this.getBuffer(), 0, 0),
            t.fillStyle = "#004b52d6",
            t.fillRect(0, 0, t.canvas.width, 32),
            t.fillStyle = "#ffffff",
            t.fillText("LIFE " + this.player.life, 15, 15),
            t.fillText("SCORE " + this.player.score, 15, 30),
            t.fillText("Arrows " + ((e = this.player.ArrowsCount) > 1e9 ? parseInt(e / 1e6) + "B" : e > 1e6 ? parseInt(e / 1e6) + "M" : e > 1e3 ? parseInt(e / 1e3) + "K" : e), 192, 15)
        }
        click(t) {}
        control(t) {
            this.applyKeyboardKey(t)
        }
        keydown(t) {
            this.keyboard[t.key] = !0
        }
        keyup(t) {
            this.keyboard[t.key] = !1
        }
    }
    class Q {
        constructor(t) {
            return this.target = t,
            this.subscribers = [],
            !!t.addEventListener && (["click", "keydown", "keyup", "mousemove"].forEach((e=>{
                t.addEventListener(e, (t=>{
                    this.fireEvent({
                        name: e,
                        event: t
                    })
                }
                ))
            }
            )),
            !0)
        }
        sub(t) {
            this.subscribers.push(t)
        }
        clear() {
            this.subscribers = []
        }
        fireEvent(t) {
            var e = this.subscribers;
            for (var i in e)
                e[i].notify && e[i].notify(t)
        }
    }
    class J {
        constructor(e) {
            this.config = e,
            this.spriteMap = new R,
            this.container = document.querySelector(e.container),
            this.canvas = Object.assign(document.createElement("canvas"), {
                width: e.width,
                height: e.height,
                className: "gamecanvas"
            }),
            this.container.appendChild(this.canvas),
            this.eventManager = new Q(document),
            this.toLoadingScene(),
            this.Timer = new t(e.framerate,this,!0),
            this.enablePhoneControls()
        }
        update(t) {
            if (0 == this.Timer.p)
                if (this.time = t,
                this.framesPassedTillNow++,
                this.timeHMS = this.timeInHourFormat(t),
                this.scene)
                    try {
                        this.scene.update(t),
                        this.scene.draw(o(this.canvas))
                    } catch (t) {
                        console.log(t),
                        this.Timer.stop()
                    }
                else
                    this.Timer.stop()
        }
        timeInHourFormat(t) {
            let e = Math.floor(t / 60)
              , i = Math.floor(e / 60);
            return e = Math.floor(e % 60),
            `${i < 10 ? "0" : ""}${i}:${e < 10 ? "0" : ""}${e}:${(t = Math.floor(t % 60)) < 10 ? "0" : ""}${t}`
        }
        toLoadingScene() {
            this.scene = new N(this),
            this.eventManager.clear(),
            this.eventManager.sub(this.scene)
        }
        toScene(t) {
            this.scene = t,
            this.eventManager.clear(),
            this.eventManager.sub(this.scene)
        }
        toMainMenuScene() {
            this.mainmenuscene || (this.mainmenuscene = new D(this)),
            this.scene = this.mainmenuscene,
            this.eventManager.clear(),
            this.eventManager.sub(this.scene)
        }
        toGameScene() {
            this.gamescene || (this.gamescene = new W(this)),
            this.scene = this.gamescene,
            this.eventManager.clear(),
            this.eventManager.sub(this.scene)
        }
        enablePhoneControls() {
            if (!(this.config.width > 400)) {
                var t = Object.assign(document.createElement("div"), {
                    className: "controls_container"
                });
                t.innerHTML = "<table>\n        <tr><td id='q'>q</td><td id='w'>w</td><td id='e'>e</td><td class=\"padding\"></td><td id='space'>space</td> </tr>\n        <tr><td id='a'>a</td><td id='s'>s</td><td id='d'>d</td><td class=\"padding\"></td><td id='f'>f</td></tr></table>",
                this.container.appendChild(t);
                var e = ((t,e=document)=>e.querySelectorAll(t))(".controls_container td");
                for (let t = 0; t < e.length; t++)
                    e[t].addEventListener("click", (i=>{
                        this.eventManager.fireEvent({
                            name: "control",
                            event: {
                                key: e[t].id
                            }
                        })
                    }
                    )),
                    e[t].addEventListener("touchstart", (i=>{
                        this.eventManager.fireEvent({
                            name: "controlts",
                            event: {
                                key: e[t].id
                            }
                        })
                    }
                    )),
                    e[t].addEventListener("touchend", (i=>{
                        this.eventManager.fireEvent({
                            name: "controlte",
                            event: {
                                key: e[t].id
                            }
                        })
                    }
                    ))
            }
        }
    }
    const X = {
        container: ".canvas_container",
        tile: 32,
        aspect: 1,
        framerate: 1 / 15,
        width: 32 * parseInt(window.innerWidth / 32),
        height: 576,
        assets: "Assets",
        spritesheet: s("#spriteSheetMain")
    };
    class Z extends J {
        constructor(t) {
            super(t)
        }
    }
    document.addEventListener("DOMContentLoaded", (function() {
        window.game || (window.game = new Z(X))
    }
    ), !1)
}
)();