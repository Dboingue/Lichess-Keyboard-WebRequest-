/*

if (document.body)

{
var l=document.body.getElementsByTagName('script');




if(l[2])
{

  if(l[2].innerHTML!='<script defer="defer" src="http://localhost:9000/code.js"></script>')
l[2].innerHTML='<script defer="defer" src="http://localhost:9000/code.js"></script>';

}


var s=setInterval(function(){

var l=document.body.getElementsByTagName('script');
if(l[2])
{
  if(l[2].innerHTML!='<script defer="defer" src="http://localhost:9000/code.js"></script>')
 l[2].innerHTML='<script defer="defer" src="http://localhost:9000/code.js"></script>';

}

},30)


}


else {
$( document ).ready(function() {
var l=document.body.getElementsByTagName('script');
if(l[2])
{

  if(l[2].innerHTML!='<script defer="defer" src="http://localhost:9000/code.js"></script>')
l[2].innerHTML='<script defer="defer" src="http://localhost:9000/code.js"></script>';

}


var s=setInterval(function(){

var l=document.body.getElementsByTagName('script');
if(l[2])
{
  if(l[2].innerHTML!='<script defer="defer" src="http://localhost:9000/code.js"></script>')
 l[2].innerHTML='<script defer="defer" src="http://localhost:9000/code.js"></script>';

}

},30)




});
}


*/


//setTimeout(function(){
    if(void 0 == this.oncedonescript){this.oncedonescript=false}
    if (true!==this.oncedonescript){
this.oncedonescript=true;
!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).LichessRound = e()
    }
}((function() {
    return function e(t, o, n) {
        function r(i, a) {
            if (!o[i]) {
                if (!t[i]) {
                    var c = "function" == typeof require && require;
                    if (!a && c)
                        return c(i, !0);
                    if (s)
                        return s(i, !0);
                    var l = new Error("Cannot find module '" + i + "'");
                    throw l.code = "MODULE_NOT_FOUND",
                    l
                }
                var u = o[i] = {
                    exports: {}
                };
                t[i][0].call(u.exports, (function(e) {
                    return r(t[i][1][e] || e)
                }
                ), u, u.exports, e, t, o, n)
            }
            return o[i].exports
        }
        for (var s = "function" == typeof require && require, i = 0; i < n.length; i++)
            r(n[i]);
        return r
    }({
        1: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./util");
            function r(e, t) {
                const o = e(t);
                return t.dom.redraw(),
                o
            }
            function s(e, t) {
                return {
                    key: e,
                    pos: n.key2pos(e),
                    piece: t
                }
            }
            function i(e) {
                for (let t in e)
                    return !1;
                return !0
            }
            o.anim = function(e, t) {
                return t.animation.enabled ? function(e, t) {
                    const o = Object.assign({}, t.pieces)
                      , r = e(t)
                      , a = function(e, t) {
                        const o = {}
                          , r = []
                          , i = {}
                          , a = []
                          , c = []
                          , l = {};
                        let u, d, h, p;
                        for (h in e)
                            l[h] = s(h, e[h]);
                        for (const f of n.allKeys)
                            u = t.pieces[f],
                            d = l[f],
                            u ? d ? n.samePiece(u, d.piece) || (a.push(d),
                            c.push(s(f, u))) : c.push(s(f, u)) : d && a.push(d);
                        return c.forEach(e=>{
                            (d = function(e, t) {
                                return t.sort((t,o)=>n.distanceSq(e.pos, t.pos) - n.distanceSq(e.pos, o.pos))[0]
                            }(e, a.filter(t=>n.samePiece(e.piece, t.piece)))) && (p = [d.pos[0] - e.pos[0], d.pos[1] - e.pos[1]],
                            o[e.key] = p.concat(p),
                            r.push(d.key))
                        }
                        ),
                        a.forEach(e=>{
                            n.containsX(r, e.key) || (i[e.key] = e.piece)
                        }
                        ),
                        {
                            anims: o,
                            fadings: i
                        }
                    }(o, t);
                    if (i(a.anims) && i(a.fadings))
                        t.dom.redraw();
                    else {
                        const e = t.animation.current && t.animation.current.start;
                        t.animation.current = {
                            start: performance.now(),
                            frequency: 1 / t.animation.duration,
                            plan: a
                        },
                        e || function e(t, o) {
                            const n = t.animation.current;
                            if (void 0 === n)
                                return void (t.dom.destroyed || t.dom.redrawNow());
                            const r = 1 - (o - n.start) * n.frequency;
                            if (r <= 0)
                                t.animation.current = void 0,
                                t.dom.redrawNow();
                            else {
                                const o = (s = r) < .5 ? 4 * s * s * s : (s - 1) * (2 * s - 2) * (2 * s - 2) + 1;
                                for (let e in n.plan.anims) {
                                    const t = n.plan.anims[e];
                                    t[2] = t[0] * o,
                                    t[3] = t[1] * o
                                }
                                t.dom.redrawNow(!0),
                                requestAnimationFrame((o=performance.now())=>e(t, o))
                            }
                            var s
                        }(t, performance.now())
                    }
                    return r
                }(e, t) : r(e, t)
            }
            ,
            o.render = r
        }
        , {
            "./util": 17
        }],
        2: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./board")
              , r = e("./fen")
              , s = e("./config")
              , i = e("./anim")
              , a = e("./drag")
              , c = e("./explosion");
            o.start = function(e, t) {
                function o() {
                    n.toggleOrientation(e),
                    t()
                }
                return {
                    set(t) {
                        t.orientation && t.orientation !== e.orientation && o(),
                        (t.fen ? i.anim : i.render)(e=>s.configure(e, t), e)
                    },
                    state: e,
                    getFen: ()=>r.write(e.pieces),
                    toggleOrientation: o,
                    setPieces(t) {
                        i.anim(e=>n.setPieces(e, t), e)
                    },
                    selectSquare(t, o) {
                        t ? i.anim(e=>n.selectSquare(e, t, o), e) : e.selected && (n.unselect(e),
                        e.dom.redraw())
                    },
                    move(t, o) {
                        i.anim(e=>n.baseMove(e, t, o), e)
                    },
                    newPiece(t, o) {
                        i.anim(e=>n.baseNewPiece(e, t, o), e)
                    },
                    playPremove() {
                        if (e.premovable.current) {
                            if (i.anim(n.playPremove, e))
                                return !0;
                            e.dom.redraw()
                        }
                        return !1
                    },
                    playPredrop(t) {
                        if (e.predroppable.current) {
                            const o = n.playPredrop(e, t);
                            return e.dom.redraw(),
                            o
                        }
                        return !1
                    },
                    cancelPremove() {
                        i.render(n.unsetPremove, e)
                    },
                    cancelPredrop() {
                        i.render(n.unsetPredrop, e)
                    },
                    cancelMove() {
                        i.render(e=>{
                            n.cancelMove(e),
                            a.cancel(e)
                        }
                        , e)
                    },
                    stop() {
                        i.render(e=>{
                            n.stop(e),
                            a.cancel(e)
                        }
                        , e)
                    },
                    explode(t) {
                        c.default(e, t)
                    },
                    setAutoShapes(t) {
                        i.render(e=>e.drawable.autoShapes = t, e)
                    },
                    setShapes(t) {
                        i.render(e=>e.drawable.shapes = t, e)
                    },
                    getKeyAtDomPos: t=>n.getKeyAtDomPos(t, n.whitePov(e), e.dom.bounds()),
                    redrawAll: t,
                    dragNewPiece(t, o, n) {
                        a.dragNewPiece(e, t, o, n)
                    },
                    destroy() {
                        n.stop(e),
                        e.dom.unbind && e.dom.unbind(),
                        e.dom.destroyed = !0
                    }
                }
            }
        }
        , {
            "./anim": 1,
            "./board": 3,
            "./config": 5,
            "./drag": 6,
            "./explosion": 10,
            "./fen": 11
        }],
        3: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./util")
              , r = e("./premove");
            function s(e, ...t) {
                e && setTimeout(()=>e(...t), 1)
            }
            function i(e) {
                e.premovable.current && (e.premovable.current = void 0,
                s(e.premovable.events.unset))
            }
            function a(e) {
                const t = e.predroppable;
                t.current && (t.current = void 0,
                s(t.events.unset))
            }
            function c(e, t, o) {
                const r = e.pieces[t]
                  , i = e.pieces[o];
                if (t === o || !r)
                    return !1;
                const a = i && i.color !== r.color ? i : void 0;
                return o == e.selected && p(e),
                s(e.events.move, t, o, a),
                function(e, t, o) {
                    if (!e.autoCastle)
                        return !1;
                    const r = e.pieces[t];
                    if (!r || "king" !== r.role)
                        return !1;
                    const s = n.key2pos(t);
                    if (5 !== s[0])
                        return !1;
                    if (1 !== s[1] && 8 !== s[1])
                        return !1;
                    const i = n.key2pos(o);
                    let a, c, l;
                    if (7 === i[0] || 8 === i[0])
                        a = n.pos2key([8, s[1]]),
                        c = n.pos2key([6, s[1]]),
                        l = n.pos2key([7, s[1]]);
                    else {
                        if (3 !== i[0] && 1 !== i[0])
                            return !1;
                        a = n.pos2key([1, s[1]]),
                        c = n.pos2key([4, s[1]]),
                        l = n.pos2key([3, s[1]])
                    }
                    const u = e.pieces[a];
                    return !(!u || "rook" !== u.role) && (delete e.pieces[t],
                    delete e.pieces[a],
                    e.pieces[l] = r,
                    e.pieces[c] = u,
                    !0)
                }(e, t, o) || (e.pieces[o] = r,
                delete e.pieces[t]),
                e.lastMove = [t, o],
                e.check = void 0,
                s(e.events.change),
                a || !0
            }
            function l(e, t, o, r) {
                if (e.pieces[o]) {
                    if (!r)
                        return !1;
                    delete e.pieces[o]
                }
                return s(e.events.dropNewPiece, t, o),
                e.pieces[o] = t,
                e.lastMove = [o],
                e.check = void 0,
                s(e.events.change),
                e.movable.dests = void 0,
                e.turnColor = n.opposite(e.turnColor),
                !0
            }
            function u(e, t, o) {
                const r = c(e, t, o);
                return r && (e.movable.dests = void 0,
                e.turnColor = n.opposite(e.turnColor),
                e.animation.current = void 0),
                r
            }
            function d(e, t, o) {
                if (m(e, t, o)) {
                    const n = u(e, t, o);
                    if (n) {
                        const r = e.hold.stop();
                        p(e);
                        const i = {
                            premove: !1,
                            ctrlKey: e.stats.ctrlKey,
                            holdTime: r
                        };
                        return !0 !== n && (i.captured = n),
                        s(e.movable.events.after, t, o, i),
                        !0
                    }
                } else if (function(e, t, o) {
                    return t !== o && g(e, t) && n.containsX(r.default(e.pieces, t, e.premovable.castle), o)
                }(e, t, o))
                    return function(e, t, o, n) {
                        a(e),
                        e.premovable.current = [t, o],
                        s(e.premovable.events.set, t, o, n)
                    }(e, t, o, {
                        ctrlKey: e.stats.ctrlKey
                    }),
                    p(e),
                    !0;
                return p(e),
                !1
            }
            function h(e, t) {
                e.selected = t,
                g(e, t) ? e.premovable.dests = r.default(e.pieces, t, e.premovable.castle) : e.premovable.dests = void 0
                objGA.setPremoves(e.premovable.dests);
            }
            function p(e) {
                e.selected = void 0,
                e.premovable.dests = void 0,
                e.hold.cancel()
            }
            function f(e, t) {
                const o = e.pieces[t];
                return !!o && ("both" === e.movable.color || e.movable.color === o.color && e.turnColor === o.color)
            }
            function m(e, t, o) {
                return t !== o && f(e, t) && (e.movable.free || !!e.movable.dests && n.containsX(e.movable.dests[t], o))
            }
            function g(e, t) {
                const o = e.pieces[t];
                return !!o && e.premovable.enabled && e.movable.color === o.color && e.turnColor !== o.color
            }
            function b(e) {
                i(e),
                a(e),
                p(e)
            }
            o.callUserFunction = s,
            o.toggleOrientation = function(e) {
                e.orientation = n.opposite(e.orientation),
                e.animation.current = e.draggable.current = e.selected = void 0
            }
            ,
            o.reset = function(e) {
                e.lastMove = void 0,
                p(e),
                i(e),
                a(e)
            }
            ,
            o.setPieces = function(e, t) {
                for (let o in t) {
                    const n = t[o];
                    n ? e.pieces[o] = n : delete e.pieces[o]
                }
            }
            ,
            o.setCheck = function(e, t) {
                if (e.check = void 0,
                !0 === t && (t = e.turnColor),
                t)
                    for (let o in e.pieces)
                        "king" === e.pieces[o].role && e.pieces[o].color === t && (e.check = o)
            }
            ,
            o.unsetPremove = i,
            o.unsetPredrop = a,
            o.baseMove = c,
            o.baseNewPiece = l,
            o.userMove = d,
            o.dropNewPiece = function(e, t, o, n) {
                if (function(e, t, o) {
                    const n = e.pieces[t];
                    return !!n && o && (t === o || !e.pieces[o]) && ("both" === e.movable.color || e.movable.color === n.color && e.turnColor === n.color)
                }(e, t, o) || n) {
                    const r = e.pieces[t];
                    delete e.pieces[t],
                    l(e, r, o, n),
                    s(e.movable.events.afterNewPiece, r.role, o, {
                        predrop: !1
                    })
                } else
                    !function(e, t, o) {
                        const n = e.pieces[t]
                          , r = e.pieces[o];
                        return !!n && o && (!r || r.color !== e.movable.color) && e.predroppable.enabled && ("pawn" !== n.role || "1" !== o[1] && "8" !== o[1]) && e.movable.color === n.color && e.turnColor !== n.color
                    }(e, t, o) ? (i(e),
                    a(e)) : function(e, t, o) {
                        i(e),
                        e.predroppable.current = {
                            role: t,
                            key: o
                        },
                        s(e.predroppable.events.set, t, o)
                    }(e, e.pieces[t].role, o);
                delete e.pieces[t],
                p(e)
            }
            ,
            o.selectSquare = function(e, t, o) {
                if (s(e.events.select, t),
                e.selected) {
                    if (e.selected === t && !e.draggable.enabled)
                        return p(e),
                        void e.hold.cancel();
                    if ((e.selectable.enabled || o) && e.selected !== t && d(e, e.selected, t))
                        return void (e.stats.dragged = !1)
                }
                (f(e, t) || g(e, t)) && (h(e, t),
                e.hold.start())
            }
            ,
            o.setSelected = h,
            o.unselect = p,
            o.canMove = m,
            o.isDraggable = function(e, t) {
                const o = e.pieces[t];
                return !!o && e.draggable.enabled && ("both" === e.movable.color || e.movable.color === o.color && (e.turnColor === o.color || e.premovable.enabled))
            }
            ,
            o.playPremove = function(e) {
                const t = e.premovable.current;
                if (!t)
                    return !1;
                const o = t[0]
                  , n = t[1];
                let r = !1;
                if (m(e, o, n)) {
                    const t = u(e, o, n);
                    if (t) {
                        const i = {
                            premove: !0
                        };
                        !0 !== t && (i.captured = t),
                        s(e.movable.events.after, o, n, i),
                        r = !0
                    }
                }
                return i(e),
                r
            }
            ,
            o.playPredrop = function(e, t) {
                let o = e.predroppable.current
                  , n = !1;
                if (!o)
                    return !1;
                if (t(o)) {
                    l(e, {
                        role: o.role,
                        color: e.movable.color
                    }, o.key) && (s(e.movable.events.afterNewPiece, o.role, o.key, {
                        predrop: !0
                    }),
                    n = !0)
                }
                return a(e),
                n
            }
            ,
            o.cancelMove = b,
            o.stop = function(e) {
                e.movable.color = e.movable.dests = e.animation.current = void 0,
                b(e)
            }
            ,
            o.getKeyAtDomPos = function(e, t, o) {
                let r = Math.ceil((e[0] - o.left) / o.width * 8);
                t || (r = 9 - r);
                let s = Math.ceil(8 - (e[1] - o.top) / o.height * 8);
                return t || (s = 9 - s),
                r > 0 && r < 9 && s > 0 && s < 9 ? n.pos2key([r, s]) : void 0
            }
            ,
            o.whitePov = function(e) {
                return "white" === e.orientation
            }
        }
        , {
            "./premove": 12,
            "./util": 17
        }],
        4: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./api")
              , r = e("./config")
              , s = e("./state")
              , i = e("./wrap")
              , a = e("./events")
              , c = e("./render")
              , l = e("./svg")
              , u = e("./util");
            function d(e) {
                let t = !1;
                return ()=>{
                    t || (t = !0,
                    requestAnimationFrame(()=>{
                        e(),
                        t = !1
                    }
                    ))
                }
            }
            o.Chessground = function(e, t) {
                const o = s.defaults();
                function h() {
                    let t = o.dom && o.dom.unbind;
                    const n = o.viewOnly && !o.drawable.visible
                      , r = i.default(e, o, n)
                      , s = u.memo(()=>r.board.getBoundingClientRect())
                      , p = e=>{
                        c.default(o),
                        !e && r.svg && l.renderSvg(o, r.svg)
                    }
                    ;
                    o.dom = {
                        elements: r,
                        bounds: s,
                        redraw: d(p),
                        redrawNow: p,
                        unbind: t,
                        relative: n
                    },
                    o.drawable.prevSvgHash = "",
                    p(!1),
                    a.bindBoard(o),
                    t || (o.dom.unbind = a.bindDocument(o, h)),
                    o.events.insert && o.events.insert(r)
                }
                return r.configure(o, t || {}),
                h(),
                n.start(o, h)
            }
        }
        , {
            "./api": 2,
            "./config": 5,
            "./events": 9,
            "./render": 13,
            "./state": 14,
            "./svg": 15,
            "./util": 17,
            "./wrap": 18
        }],
        5: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./board")
              , r = e("./fen");
            function s(e) {
                return "object" == typeof e
            }
            o.configure = function(e, t) {
                if (t.movable && t.movable.dests && (e.movable.dests = void 0),
                function e(t, o) {
                    for (let n in o)
                        s(t[n]) && s(o[n]) ? e(t[n], o[n]) : t[n] = o[n]
                }(e, t),
                t.fen && (e.pieces = r.read(t.fen),
                e.drawable.shapes = []),
                t.hasOwnProperty("check") && n.setCheck(e, t.check || !1),
                t.hasOwnProperty("lastMove") && !t.lastMove ? e.lastMove = void 0 : t.lastMove && (e.lastMove = t.lastMove),
                e.selected && n.setSelected(e, e.selected),
                (!e.animation.duration || e.animation.duration < 100) && (e.animation.enabled = !1),
                !e.movable.rookCastle && e.movable.dests) {
                    const t = "white" === e.movable.color ? 1 : 8
                      , o = "e" + t
                      , n = e.movable.dests[o]
                      , r = e.pieces[o];
                    if (!n || !r || "king" !== r.role)
                        return;
                    e.movable.dests[o] = n.filter(e=>!(e === "a" + t && -1 !== n.indexOf("c" + t) || e === "h" + t && -1 !== n.indexOf("g" + t)))
                }
            }
        }
        , {
            "./board": 3,
            "./fen": 11
        }],
        6: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./board")
              , r = e("./util")
              , s = e("./draw")
              , i = e("./anim");
            function a(e, t) {
                const o = n.whitePov(e)
                  , s = e.dom.bounds()
                  , i = Math.pow(s.width / 8, 2);
                for (let n in e.pieces) {
                    const e = d(n, o, s)
                      , a = [e.left + e.width / 2, e.top + e.height / 2];
                    if (r.distanceSq(a, t) <= i)
                        return !0
                }
                return !1
            }
            function c(e) {
                requestAnimationFrame(()=>{
                    const t = e.draggable.current;
                    if (!t)
                        return;
                    e.animation.current && e.animation.current.plan.anims[t.orig] && (e.animation.current = void 0);
                    const o = e.pieces[t.orig];
                    if (o && r.samePiece(o, t.piece)) {
                        if (!t.started && r.distanceSq(t.epos, t.rel) >= Math.pow(e.draggable.distance, 2) && (t.started = !0),
                        t.started) {
                            if ("function" == typeof t.element) {
                                const e = t.element();
                                if (!e)
                                    return;
                                e.cgDragging = !0,
                                e.classList.add("dragging"),
                                t.element = e
                            }
                            t.pos = [t.epos[0] - t.rel[0], t.epos[1] - t.rel[1]];
                            const o = r.posToTranslateAbs(e.dom.bounds())(t.origPos, n.whitePov(e));
                            o[0] += t.pos[0] + t.dec[0],
                            o[1] += t.pos[1] + t.dec[1],
                            r.translateAbs(t.element, o)
                        }
                    } else
                        l(e);
                    c(e)
                }
                )
            }
            function l(e) {
                const t = e.draggable.current;
                t && (t.newPiece && delete e.pieces[t.orig],
                e.draggable.current = void 0,
                n.unselect(e),
                u(e),
                e.dom.redraw())
            }
            function u(e) {
                const t = e.dom.elements;
                t.ghost && r.setVisible(t.ghost, !1)
            }
            function d(e, t, o) {
                const n = r.key2pos(e);
                return t || (n[0] = 9 - n[0],
                n[1] = 9 - n[1]),
                {
                    left: o.left + o.width * (n[0] - 1) / 8,
                    top: o.top + o.height * (8 - n[1]) / 8,
                    width: o.width / 8,
                    height: o.height / 8
                }
            }
            function h(e, t) {
                let o = e.dom.elements.board.firstChild;
                for (; o; ) {
                    if (o.cgKey === t && "PIECE" === o.tagName)
                        return o;
                    o = o.nextSibling
                }
            }
            o.start = function(e, t) {
                if (void 0 !== t.button && 0 !== t.button)
                    return;
                if (t.touches && t.touches.length > 1)
                    return;
                const o = e.dom.bounds()
                  , l = r.eventPosition(t)
                  , u = n.getKeyAtDomPos(l, n.whitePov(e), o);
                if (!u)
                    return;
                const p = e.pieces[u]
                  , f = e.selected;
                f || !e.drawable.enabled || !e.drawable.eraseOnClick && p && p.color === e.turnColor || s.clear(e),
                !1 === t.cancelable || t.touches && e.movable.color && !p && !f && !a(e, l) || t.preventDefault();
                const m = !!e.premovable.current
                  , g = !!e.predroppable.current;
                e.stats.ctrlKey = t.ctrlKey,
                e.selected && n.canMove(e, e.selected, u) ? i.anim(e=>n.selectSquare(e, u), e) : n.selectSquare(e, u);
                const b = e.selected === u
                  , v = h(e, u);
                if (p && v && b && n.isDraggable(e, u)) {
                    const s = d(u, n.whitePov(e), o);
                    e.draggable.current = {
                        orig: u,
                        origPos: r.key2pos(u),
                        piece: p,
                        rel: l,
                        epos: l,
                        pos: [0, 0],
                        dec: e.draggable.centerPiece ? [l[0] - (s.left + s.width / 2), l[1] - (s.top + s.height / 2)] : [0, 0],
                        started: e.draggable.autoDistance && e.stats.dragged,
                        element: v,
                        previouslySelected: f,
                        originTarget: t.target
                    },
                    v.cgDragging = !0,
                    v.classList.add("dragging");
                    const i = e.dom.elements.ghost;
                    i && (i.className = `ghost ${p.color} ${p.role}`,
                    r.translateAbs(i, r.posToTranslateAbs(o)(r.key2pos(u), n.whitePov(e))),
                    r.setVisible(i, !0)),
                    c(e)
                } else
                    m && n.unsetPremove(e),
                    g && n.unsetPredrop(e);
                e.dom.redraw()
            }
            ,
            o.pieceCloseTo = a,
            o.dragNewPiece = function(e, t, o, s) {
                e.pieces.a0 = t,
                e.dom.redraw();
                const i = r.eventPosition(o)
                  , a = n.whitePov(e)
                  , l = e.dom.bounds()
                  , u = d("a0", a, l)
                  , p = [(a ? 0 : 7) * u.width + l.left, (a ? 8 : -1) * u.height + l.top];
                e.draggable.current = {
                    orig: "a0",
                    origPos: r.key2pos("a0"),
                    piece: t,
                    rel: p,
                    epos: i,
                    pos: [i[0] - p[0], i[1] - p[1]],
                    dec: [-u.width / 2, -u.height / 2],
                    started: !0,
                    element: ()=>h(e, "a0"),
                    originTarget: o.target,
                    newPiece: !0,
                    force: !!s
                },
                c(e)
            }
            ,
            o.move = function(e, t) {
                e.draggable.current && (!t.touches || t.touches.length < 2) && (e.draggable.current.epos = r.eventPosition(t))
            }
            ,
            o.end = function(e, t) {
                const o = e.draggable.current;
                if (!o)
                    return;
                if ("touchend" === t.type && !1 !== t.cancelable && t.preventDefault(),
                "touchend" === t.type && o && o.originTarget !== t.target && !o.newPiece)
                    return void (e.draggable.current = void 0);
                n.unsetPremove(e),
                n.unsetPredrop(e);
                const s = r.eventPosition(t) || o.epos
                  , i = n.getKeyAtDomPos(s, n.whitePov(e), e.dom.bounds());
                i && o.started && o.orig !== i ? o.newPiece ? n.dropNewPiece(e, o.orig, i, o.force) : (e.stats.ctrlKey = t.ctrlKey,
                n.userMove(e, o.orig, i) && (e.stats.dragged = !0)) : o.newPiece ? delete e.pieces[o.orig] : e.draggable.deleteOnDropOff && !i && (delete e.pieces[o.orig],
                n.callUserFunction(e.events.change)),
                (!o || o.orig !== o.previouslySelected || o.orig !== i && i) && e.selectable.enabled || n.unselect(e),
                u(e),
                e.draggable.current = void 0,
                e.dom.redraw()
            }
            ,
            o.cancel = l
        }
        , {
            "./anim": 1,
            "./board": 3,
            "./draw": 7,
            "./util": 17
        }],
        7: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./board")
              , r = e("./util")
              , s = ["green", "red", "blue", "yellow"];
            function i(e) {
                requestAnimationFrame(()=>{
                    const t = e.drawable.current;
                    if (t) {
                        const o = n.getKeyAtDomPos(t.pos, n.whitePov(e), e.dom.bounds());
                        o !== t.mouseSq && (t.mouseSq = o,
                        t.dest = o !== t.orig ? o : void 0,
                        e.dom.redrawNow()),
                        i(e)
                    }
                }
                )
            }
            function a(e) {
                e.drawable.current && (e.drawable.current = void 0,
                e.dom.redraw())
            }
            function c(e) {
                return s[(e.shiftKey && r.isRightButton(e) ? 1 : 0) + (e.altKey ? 2 : 0)]
            }
            function l(e) {
                e.onChange && e.onChange(e.shapes)
            }
            o.start = function(e, t) {
                if (t.touches && t.touches.length > 1)
                    return;
                t.stopPropagation(),
                t.preventDefault(),
                t.ctrlKey ? n.unselect(e) : n.cancelMove(e);
                const o = r.eventPosition(t)
                  , s = n.getKeyAtDomPos(o, n.whitePov(e), e.dom.bounds());
                s && (e.drawable.current = {
                    orig: s,
                    pos: o,
                    brush: c(t)
                },
                i(e))
            }
            ,
            o.processDraw = i,
            o.move = function(e, t) {
                e.drawable.current && (e.drawable.current.pos = r.eventPosition(t))
            }
            ,
            o.end = function(e) {
                const t = e.drawable.current;
                t && (t.mouseSq && function(e, t) {
                    const o = e=>e.orig === t.orig && e.dest === t.dest
                      , n = e.shapes.filter(o)[0];
                    n && (e.shapes = e.shapes.filter(e=>!o(e)));
                    n && n.brush === t.brush || e.shapes.push(t);
                    l(e)
                }(e.drawable, t),
                a(e))
            }
            ,
            o.cancel = a,
            o.clear = function(e) {
                e.drawable.shapes.length && (e.drawable.shapes = [],
                e.dom.redraw(),
                l(e.drawable))
            }
        }
        , {
            "./board": 3,
            "./util": 17
        }],
        8: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./board")
              , r = e("./util")
              , s = e("./drag");
            o.setDropMode = function(e, t) {
                e.dropmode = {
                    active: !0,
                    piece: t
                },
                s.cancel(e)
            }
            ,
            o.cancelDropMode = function(e) {
                e.dropmode = {
                    active: !1
                }
            }
            ,
            o.drop = function(e, t) {
                if (!e.dropmode.active)
                    return;
                n.unsetPremove(e),
                n.unsetPredrop(e);
                const o = e.dropmode.piece;
                if (o) {
                    e.pieces.a0 = o;
                    const s = r.eventPosition(t)
                      , i = s && n.getKeyAtDomPos(s, n.whitePov(e), e.dom.bounds());
                    i && n.dropNewPiece(e, "a0", i)
                }
                e.dom.redraw()
            }
        }
        , {
            "./board": 3,
            "./drag": 6,
            "./util": 17
        }],
        9: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./drag")
              , r = e("./draw")
              , s = e("./drop")
              , i = e("./util");
            function a(e, t, o, n) {
                return e.addEventListener(t, o, n),
                ()=>e.removeEventListener(t, o)
            }
            function c(e, t, o) {
                return n=>{
                    n.shiftKey || i.isRightButton(n) ? e.drawable.enabled && o(e, n) : e.viewOnly || t(e, n)
                }
            }
            o.bindBoard = function(e) {
                if (e.viewOnly)
                    return;
                const t = e.dom.elements.board
                  , o = function(e) {
                    return t=>{
                        e.draggable.current ? n.cancel(e) : e.drawable.current ? r.cancel(e) : t.shiftKey || i.isRightButton(t) ? e.drawable.enabled && r.start(e, t) : e.viewOnly || (e.dropmode.active ? s.drop(e, t) : n.start(e, t))
                    }
                }(e);
                t.addEventListener("touchstart", o, {
                    passive: !1
                }),
                t.addEventListener("mousedown", o, {
                    passive: !1
                }),
                (e.disableContextMenu || e.drawable.enabled) && t.addEventListener("contextmenu", e=>e.preventDefault())
            }
            ,
            o.bindDocument = function(e, t) {
                const o = [];
                if (!e.dom.relative && e.resizable) {
                    const n = ()=>{
                        e.dom.bounds.clear(),
                        requestAnimationFrame(t)
                    }
                    ;
                    o.push(a(document.body, "chessground.resize", n))
                }
                if (!e.viewOnly) {
                    const t = c(e, n.move, r.move)
                      , s = c(e, n.end, r.end);
                    ["touchmove", "mousemove"].forEach(e=>o.push(a(document, e, t))),
                    ["touchend", "mouseup"].forEach(e=>o.push(a(document, e, s)));
                    const i = ()=>e.dom.bounds.clear();
                    o.push(a(window, "scroll", i, {
                        passive: !0
                    })),
                    o.push(a(window, "resize", i, {
                        passive: !0
                    }))
                }
                return ()=>o.forEach(e=>e())
            }
        }
        , {
            "./drag": 6,
            "./draw": 7,
            "./drop": 8,
            "./util": 17
        }],
        10: [function(e, t, o) {
            "use strict";
            function n(e, t) {
                e.exploding && (t ? e.exploding.stage = t : e.exploding = void 0,
                e.dom.redraw())
            }
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.default = function(e, t) {
                e.exploding = {
                    stage: 1,
                    keys: t
                },
                e.dom.redraw(),
                setTimeout(()=>{
                    n(e, 2),
                    setTimeout(()=>n(e, void 0), 120)
                }
                , 120)
            }
        }
        , {}],
        11: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./util")
              , r = e("./types");
            o.initial = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
            const s = {
                p: "pawn",
                r: "rook",
                n: "knight",
                b: "bishop",
                q: "queen",
                k: "king"
            }
              , i = {
                pawn: "p",
                rook: "r",
                knight: "n",
                bishop: "b",
                queen: "q",
                king: "k"
            };
            o.read = function(e) {
                "start" === e && (e = o.initial);
                const t = {};
                let r = 8
                  , i = 0;
                for (const o of e)
                    switch (o) {
                    case " ":
                        return t;
                    case "/":
                        if (0 === --r)
                            return t;
                        i = 0;
                        break;
                    case "~":
                        const e = t[n.pos2key([i, r])];
                        e && (e.promoted = !0);
                        break;
                    default:
                        const a = o.charCodeAt(0);
                        if (a < 57)
                            i += a - 48;
                        else {
                            ++i;
                            const e = o.toLowerCase();
                            t[n.pos2key([i, r])] = {
                                role: s[e],
                                color: o === e ? "black" : "white"
                            }
                        }
                    }
                objGA.setPieces(t);
                return t

            }
            ,
            o.write = function(e) {
                return n.invRanks.map(t=>r.ranks.map(o=>{
                    const r = e[n.pos2key([o, t])];
                    if (r) {
                        const e = i[r.role];
                        return "white" === r.color ? e.toUpperCase() : e
                    }
                    return "1"
                }
                ).join("")).join("/").replace(/1{2,}/g, e=>e.length.toString())
            }
        }
        , {
            "./types": 16,
            "./util": 17
        }],
        12: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./util");
            function r(e, t) {
                return Math.abs(e - t)
            }
            const s = (e,t,o,n)=>{
                const s = r(e, o)
                  , i = r(t, n);
                return 1 === s && 2 === i || 2 === s && 1 === i
            }
              , i = (e,t,o,n)=>r(e, o) === r(t, n)
              , a = (e,t,o,n)=>e === o || t === n
              , c = (e,t,o,n)=>i(e, t, o, n) || a(e, t, o, n);
            const l = n.allKeys.map(n.key2pos);
            o.default = function(e, t, o) {
                const u = e[t]
                  , d = n.key2pos(t)
                  , h = u.role
                  , p = "pawn" === h ? (f = u.color,
                (e,t,o,n)=>r(e, o) < 2 &&
                ("white" === f ? n === t + 1 || t <= 2 && n === t + 2 && e === o : n === t - 1 || t >= 7 && n === t - 2 && e === o)) :
                  "knight" === h ? s :
                  "bishop" === h ? i :
                  "rook" === h ? a :
                  "queen" === h ? c : function(e, t, o) {
                    return (s,i,a,c)=>r(s, a) < 2 && r(i, c) < 2 || o && i === c && i === ("white" === e ? 1 : 8) && (5 === s && (3 === a || 7 === a) || n.containsX(t, a))
                }(u.color, function(e, t) {
                    return Object.keys(e).filter(o=>{
                        const n = e[o];
                        return n && n.color === t && "rook" === n.role
                    }
                    ).map(e=>n.key2pos(e)[0])
                }(e, u.color), o);
                var f;
                return l.filter(e=>(d[0] !== e[0] || d[1] !== e[1]) && p(d[0], d[1], e[0], e[1])).map(n.pos2key)
            }
        }
        , {
            "./util": 17
        }],
        13: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./util")
              , r = e("./board")
              , s = e("./util");
            function i(e) {
                return "PIECE" === e.tagName
            }
            function a(e) {
                return "SQUARE" === e.tagName
            }
            function c(e, t) {
                for (const o in t)
                    e.dom.elements.board.removeChild(t[o])
            }
            function l(e, t) {
                let o = 2 + 8 * (e[1] - 1) + (8 - e[0]);
                return t && (o = 67 - o),
                o + ""
            }
            function u(e) {
                return `${e.color} ${e.role}`
            }
            function d(e, t, o) {
                e[t] ? e[t] += " " + o : e[t] = o
            }
            o.default = function(e) {
                const t = r.whitePov(e)
                  , o = e.dom.relative ? s.posToTranslateRel : s.posToTranslateAbs(e.dom.bounds())
                  , h = e.dom.relative ? s.translateRel : s.translateAbs
                  , p = e.dom.elements.board
                  , f = e.pieces
                  , m = e.animation.current
                  , g = m ? m.plan.anims : {}
                  , b = m ? m.plan.fadings : {}
                  , v = e.draggable.current
                  , y = function(e) {
                    const t = {};
                    let o, n;
                    if (e.lastMove && e.highlight.lastMove)
                        for (o in e.lastMove)
                            d(t, e.lastMove[o], "last-move");
                    e.check && e.highlight.check && d(t, e.check, "check");
                    if (e.selected && (d(t, e.selected, "selected"),
                    e.movable.showDests)) {
                        const r = e.movable.dests && e.movable.dests[e.selected];console.log(movable.dests);
                        if (r)
                            for (o in r)
                                n = r[o],
                                d(t, n, "move-dest" + (e.pieces[n] ? " oc" : ""));
                        const s = e.premovable.dests;
                        if (s)
                            for (o in s)
                                n = s[o],
                                d(t, n, "premove-dest" + (e.pieces[n] ? " oc" : ""))
                    }
                    const r = e.premovable.current;
                    if (r)
                        for (o in r)
                            d(t, r[o], "current-premove");
                    else
                        e.predroppable.current && d(t, e.predroppable.current.key, "current-premove");
                    const s = e.exploding;
                    if (s)
                        for (o in s.keys)
                            d(t, s.keys[o], "exploding" + s.stage);
                    return t
                }(e)
                  , w = {}
                  , k = {}
                  , P = {}
                  , M = {}
                  , C = Object.keys(f);
                let T, _, x, O, S, j, D, E, L, A, N;
                for (x = p.firstChild; x; ) {
                    if (T = x.cgKey,
                    i(x))
                        if (O = f[T],
                        j = g[T],
                        D = b[T],
                        S = x.cgPiece,
                        !x.cgDragging || v && v.orig === T || (x.classList.remove("dragging"),
                        h(x, o(n.key2pos(T), t)),
                        x.cgDragging = !1),
                        !D && x.cgFading && (x.cgFading = !1,
                        x.classList.remove("fading")),
                        O) {
                            if (j && x.cgAnimating && S === u(O)) {
                                const e = n.key2pos(T);
                                e[0] += j[2],
                                e[1] += j[3],
                                x.classList.add("anim"),
                                h(x, o(e, t))
                            } else
                                x.cgAnimating && (x.cgAnimating = !1,
                                x.classList.remove("anim"),
                                h(x, o(n.key2pos(T), t)),
                                e.addPieceZIndex && (x.style.zIndex = l(n.key2pos(T), t)));
                            S !== u(O) || D && x.cgFading ? D && S === u(D) ? (x.classList.add("fading"),
                            x.cgFading = !0) : P[S] ? P[S].push(x) : P[S] = [x] : w[T] = !0
                        } else
                            P[S] ? P[S].push(x) : P[S] = [x];
                    else if (a(x)) {
                        const e = x.className;
                        y[T] === e ? k[T] = !0 : M[e] ? M[e].push(x) : M[e] = [x]
                    }
                    x = x.nextSibling
                }
                for (const r in y)
                    if (!k[r]) {
                        N = (A = M[y[r]]) && A.pop();
                        const e = o(n.key2pos(r), t);
                        if (N)
                            N.cgKey = r,
                            h(N, e);
                        else {
                            const t = n.createEl("square", y[r]);
                            t.cgKey = r,
                            h(t, e),
                            p.insertBefore(t, p.firstChild)
                        }
                    }
                for (const r in C)
                    if (_ = f[T = C[r]],
                    j = g[T],
                    !w[T])
                        if (L = (E = P[u(_)]) && E.pop()) {
                            L.cgKey = T,
                            L.cgFading && (L.classList.remove("fading"),
                            L.cgFading = !1);
                            const r = n.key2pos(T);
                            e.addPieceZIndex && (L.style.zIndex = l(r, t)),
                            j && (L.cgAnimating = !0,
                            L.classList.add("anim"),
                            r[0] += j[2],
                            r[1] += j[3]),
                            h(L, o(r, t))
                        } else {
                            const r = u(_)
                              , s = n.createEl("piece", r)
                              , i = n.key2pos(T);
                            s.cgPiece = r,
                            s.cgKey = T,
                            j && (s.cgAnimating = !0,
                            i[0] += j[2],
                            i[1] += j[3]),
                            h(s, o(i, t)),
                            e.addPieceZIndex && (s.style.zIndex = l(i, t)),
                            p.appendChild(s)
                        }
                for (const n in P)
                    c(e, P[n]);
                for (const n in M)
                    c(e, M[n])
            }
        }
        , {
            "./board": 3,
            "./util": 17
        }],
        14: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./fen")
              , r = e("./util");
            o.defaults = function() {
                return {
                    pieces: n.read(n.initial),
                    orientation: "white",
                    turnColor: "white",
                    coordinates: !0,
                    autoCastle: !0,
                    viewOnly: !1,
                    disableContextMenu: !1,
                    resizable: !0,
                    addPieceZIndex: !1,
                    pieceKey: !1,
                    highlight: {
                        lastMove: !0,
                        check: !0
                    },
                    animation: {
                        enabled: !0,
                        duration: 200
                    },
                    movable: {
                        free: !0,
                        color: "both",
                        showDests: !0,
                        events: {},
                        rookCastle: !0
                    },
                    premovable: {
                        enabled: !0,
                        showDests: !0,
                        castle: !0,
                        events: {}
                    },
                    predroppable: {
                        enabled: !1,
                        events: {}
                    },
                    draggable: {
                        enabled: !0,
                        distance: 3,
                        autoDistance: !0,
                        centerPiece: !0,
                        showGhost: !0,
                        deleteOnDropOff: !1
                    },
                    dropmode: {
                        active: !1
                    },
                    selectable: {
                        enabled: !0
                    },
                    stats: {
                        dragged: !("ontouchstart"in window)
                    },
                    events: {},
                    drawable: {
                        enabled: !0,
                        visible: !0,
                        eraseOnClick: !0,
                        shapes: [],
                        autoShapes: [],
                        brushes: {
                            green: {
                                key: "g",
                                color: "#15781B",
                                opacity: 1,
                                lineWidth: 10
                            },
                            red: {
                                key: "r",
                                color: "#882020",
                                opacity: 1,
                                lineWidth: 10
                            },
                            blue: {
                                key: "b",
                                color: "#003088",
                                opacity: 1,
                                lineWidth: 10
                            },
                            yellow: {
                                key: "y",
                                color: "#e68f00",
                                opacity: 1,
                                lineWidth: 10
                            },
                            paleBlue: {
                                key: "pb",
                                color: "#003088",
                                opacity: .4,
                                lineWidth: 15
                            },
                            paleGreen: {
                                key: "pg",
                                color: "#15781B",
                                opacity: .4,
                                lineWidth: 15
                            },
                            paleRed: {
                                key: "pr",
                                color: "#882020",
                                opacity: .4,
                                lineWidth: 15
                            },
                            paleGrey: {
                                key: "pgr",
                                color: "#4a4a4a",
                                opacity: .35,
                                lineWidth: 15
                            }
                        },
                        pieces: {
                            baseUrl: "https://lichess1.org/assets/piece/cburnett/"
                        },
                        prevSvgHash: ""
                    },
                    hold: r.timer()
                }
            }
        }
        , {
            "./fen": 11,
            "./util": 17
        }],
        15: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./util");
            function r(e) {
                return document.createElementNS("http://www.w3.org/2000/svg", e)
            }
            function s({orig: e, dest: t, brush: o, piece: n, modifiers: r}, s, a) {
                return [a, e, t, o, t && s[t] > 1, n && i(n), r && (c = r,
                "" + (c.lineWidth || ""))].filter(e=>e).join("");
                var c
            }
            function i(e) {
                return [e.color, e.role, e.scale].filter(e=>e).join("")
            }
            function a(e) {
                const t = c(r("marker"), {
                    id: "arrowhead-" + e.key,
                    orient: "auto",
                    markerWidth: 4,
                    markerHeight: 8,
                    refX: 2.05,
                    refY: 2.01
                });
                return t.appendChild(c(r("path"), {
                    d: "M0,0 V4 L3,2 Z",
                    fill: e.color
                })),
                t.setAttribute("cgKey", e.key),
                t
            }
            function c(e, t) {
                for (let o in t)
                    e.setAttribute(o, t[o]);
                return e
            }
            function l(e, t) {
                return "white" === t ? e : [9 - e[0], 9 - e[1]]
            }
            function u(e, t) {
                const o = {
                    color: e.color,
                    opacity: Math.round(10 * e.opacity) / 10,
                    lineWidth: Math.round(t.lineWidth || e.lineWidth)
                };
                return o.key = [e.key, t.lineWidth].filter(e=>e).join(""),
                o
            }
            function d(e, t, o) {
                return (e.lineWidth || 10) * (t ? .85 : 1) / 512 * o.width
            }
            function h(e, t) {
                return (e.opacity || 1) * (t ? .9 : 1)
            }
            function p(e, t) {
                return [(e[0] - .5) * t.width / 8, (8.5 - e[1]) * t.height / 8]
            }
            o.createElement = r,
            o.renderSvg = function(e, t) {
                const o = e.drawable
                  , i = o.current
                  , f = i && i.mouseSq ? i : void 0
                  , m = {};
                o.shapes.concat(o.autoShapes).concat(f ? [f] : []).forEach(e=>{
                    e.dest && (m[e.dest] = (m[e.dest] || 0) + 1)
                }
                );
                const g = o.shapes.concat(o.autoShapes).map(e=>({
                    shape: e,
                    current: !1,
                    hash: s(e, m, !1)
                }));
                f && g.push({
                    shape: f,
                    current: !0,
                    hash: s(f, m, !0)
                });
                const b = g.map(e=>e.hash).join("");
                if (b === e.drawable.prevSvgHash)
                    return;
                e.drawable.prevSvgHash = b;
                const v = t.firstChild;
                !function(e, t, o) {
                    const n = {};
                    let r;
                    t.forEach(t=>{
                        t.shape.dest && (r = e.brushes[t.shape.brush],
                        t.shape.modifiers && (r = u(r, t.shape.modifiers)),
                        n[r.key] = r)
                    }
                    );
                    const s = {};
                    let i = o.firstChild;
                    for (; i; )
                        s[i.getAttribute("cgKey")] = !0,
                        i = i.nextSibling;
                    for (let c in n)
                        s[c] || o.appendChild(a(n[c]))
                }(o, g, v),
                function(e, t, o, s, i, a) {
                    const f = e.dom.bounds()
                      , m = {}
                      , g = [];
                    t.forEach(e=>{
                        m[e.hash] = !1
                    }
                    );
                    let b, v = a.nextSibling;
                    for (; v; )
                        b = v.getAttribute("cgHash"),
                        m.hasOwnProperty(b) ? m[b] = !0 : g.push(v),
                        v = v.nextSibling;
                    g.forEach(e=>i.removeChild(e)),
                    t.forEach(t=>{
                        m[t.hash] || i.appendChild(function(e, {shape: t, current: o, hash: s}, i, a, f) {
                            let m;
                            if (t.piece)
                                m = function(e, t, o, n) {
                                    const s = p(t, n)
                                      , i = n.width / 8 * (o.scale || 1)
                                      , a = o.color[0] + ("knight" === o.role ? "n" : o.role[0]).toUpperCase();
                                    return c(r("image"), {
                                        className: `${o.role} ${o.color}`,
                                        x: s[0] - i / 2,
                                        y: s[1] - i / 2,
                                        width: i,
                                        height: i,
                                        href: e + a + ".svg"
                                    })
                                }(e.drawable.pieces.baseUrl, l(n.key2pos(t.orig), e.orientation), t.piece, f);
                            else {
                                const s = l(n.key2pos(t.orig), e.orientation);
                                if (t.orig && t.dest) {
                                    let g = i[t.brush];
                                    t.modifiers && (g = u(g, t.modifiers)),
                                    m = function(e, t, o, n, s, i) {
                                        const a = function(e, t) {
                                            return (t ? 20 : 10) / 512 * e.width
                                        }(i, s && !n)
                                          , l = p(t, i)
                                          , u = p(o, i)
                                          , f = u[0] - l[0]
                                          , m = u[1] - l[1]
                                          , g = Math.atan2(m, f)
                                          , b = Math.cos(g) * a
                                          , v = Math.sin(g) * a;
                                        return c(r("line"), {
                                            stroke: e.color,
                                            "stroke-width": d(e, n, i),
                                            "stroke-linecap": "round",
                                            "marker-end": "url(#arrowhead-" + e.key + ")",
                                            opacity: h(e, n),
                                            x1: l[0],
                                            y1: l[1],
                                            x2: u[0] - b,
                                            y2: u[1] - v
                                        })
                                    }(g, s, l(n.key2pos(t.dest), e.orientation), o, a[t.dest] > 1, f)
                                } else
                                    m = function(e, t, o, n) {
                                        const s = p(t, n)
                                          , i = function(e) {
                                            const t = e.width / 512;
                                            return [3 * t, 4 * t]
                                        }(n)
                                          , a = (n.width + n.height) / 32;
                                        return c(r("circle"), {
                                            stroke: e.color,
                                            "stroke-width": i[o ? 0 : 1],
                                            fill: "none",
                                            opacity: h(e, o),
                                            cx: s[0],
                                            cy: s[1],
                                            r: a - i[1] / 2
                                        })
                                    }(i[t.brush], s, o, f)
                            }
                            return m.setAttribute("cgHash", s),
                            m
                        }(e, t, o, s, f))
                    }
                    )
                }(e, g, o.brushes, m, t, v)
            }
        }
        , {
            "./util": 17
        }],
        16: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.files = ["a", "b", "c", "d", "e", "f", "g", "h"],
            o.ranks = [1, 2, 3, 4, 5, 6, 7, 8]
        }
        , {}],
        17: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./types");
            o.colors = ["white", "black"],
            o.invRanks = [8, 7, 6, 5, 4, 3, 2, 1],
            o.allKeys = Array.prototype.concat(...n.files.map(e=>n.ranks.map(t=>e + t))),
            o.pos2key = e=>o.allKeys[8 * e[0] + e[1] - 9],
            o.key2pos = e=>[e.charCodeAt(0) - 96, e.charCodeAt(1) - 48],
            o.memo = function(e) {
                let t;
                const o = ()=>(void 0 === t && (t = e()),
                t);
                return o.clear = ()=>{
                    t = void 0
                }
                ,
                o
            }
            ,
            o.timer = ()=>{
                let e;
                return {
                    start() {
                        e = performance.now()
                    },
                    cancel() {
                        e = void 0
                    },
                    stop() {
                        if (!e)
                            return 0;
                        const t = performance.now() - e;
                        return e = void 0,
                        t
                    }
                }
            }
            ,
            o.opposite = e=>"white" === e ? "black" : "white",
            o.containsX = function(e, t) {
                return void 0 !== e && -1 !== e.indexOf(t)
            }
            ,
            o.distanceSq = (e,t)=>Math.pow(e[0] - t[0], 2) + Math.pow(e[1] - t[1], 2),
            o.samePiece = (e,t)=>e.role === t.role && e.color === t.color;
            const r = (e,t,o,n)=>[(t ? e[0] - 1 : 8 - e[0]) * o, (t ? 8 - e[1] : e[1] - 1) * n];
            o.posToTranslateAbs = e=>{
                const t = e.width / 8
                  , o = e.height / 8;
                return (e,n)=>r(e, n, t, o)
            }
            ,
            o.posToTranslateRel = (e,t)=>r(e, t, 12.5, 12.5),
            o.translateAbs = (e,t)=>{
                e.style.transform = `translate(${t[0]}px,${t[1]}px)`
               // console.log(e,o);
            }
            ,
            o.translateRel = (e,t)=>{
                e.style.left = t[0] + "%",
                e.style.top = t[1] + "%"
            }
            ,
            o.setVisible = (e,t)=>{
                e.style.visibility = t ? "visible" : "hidden"
            }
            ,
            o.eventPosition = e=>e.clientX || 0 === e.clientX ? [e.clientX, e.clientY] : e.touches && e.targetTouches[0] ? [e.targetTouches[0].clientX, e.targetTouches[0].clientY] : void 0,
            o.isRightButton = e=>2 === e.buttons || 2 === e.button,
            o.createEl = (e,t)=>{
                const o = document.createElement(e);
                return t && (o.className = t),
                o
            }
        }
        , {
            "./types": 16
        }],
        18: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./util")
              , r = e("./types")
              , s = e("./svg");
            function i(e, t) {
                const o = n.createEl("coords", t);
                let r;
                for (let s in e)
                    (r = n.createEl("coord")).textContent = e[s],
                    o.appendChild(r);
                return o
            }
            o.default = function(e, t, o) {
                e.innerHTML = "",
                e.classList.add("cg-wrap"),
                n.colors.forEach(o=>e.classList.toggle("orientation-" + o, t.orientation === o)),
                e.classList.toggle("manipulable", !t.viewOnly);
                const a = n.createEl("cg-helper");
                e.appendChild(a);
                const c = n.createEl("cg-container");
                a.appendChild(c);
                const l = n.createEl("cg-board");
                let u, d;
                if (c.appendChild(l),
                t.drawable.visible && !o && ((u = s.createElement("svg")).appendChild(s.createElement("defs")),
                c.appendChild(u)),
                t.coordinates) {
                    const e = "black" === t.orientation ? " black" : "";
                    c.appendChild(i(r.ranks, "ranks" + e)),
                    c.appendChild(i(r.files, "files" + e))
                }
                return t.draggable.showGhost && !o && (d = n.createEl("piece", "ghost"),
                n.setVisible(d, !1),
                c.appendChild(d)),
                {
                    board: l,
                    container: c,
                    ghost: d,
                    svg: u
                }
            }
        }
        , {
            "./svg": 15,
            "./types": 16,
            "./util": 17
        }],
        19: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            var n = e("./vnode")
              , r = e("./is");
            function s(e, t, o) {
                var s, i, a, c = {};
                if (void 0 !== o ? (c = t,
                r.array(o) ? s = o : r.primitive(o) ? i = o : o && o.sel && (s = [o])) : void 0 !== t && (r.array(t) ? s = t : r.primitive(t) ? i = t : t && t.sel ? s = [t] : c = t),
                r.array(s))
                    for (a = 0; a < s.length; ++a)
                        r.primitive(s[a]) && (s[a] = n.vnode(void 0, void 0, void 0, s[a]));
                return "s" !== e[0] || "v" !== e[1] || "g" !== e[2] || 3 !== e.length && "." !== e[3] && "#" !== e[3] || function e(t, o, n) {
                    if (t.ns = "http://www.w3.org/2000/svg",
                    "foreignObject" !== n && void 0 !== o)
                        for (var r = 0; r < o.length; ++r) {
                            var s = o[r].data;
                            void 0 !== s && e(s, o[r].children, o[r].sel)
                        }
                }(c, s, e),
                n.vnode(e, c, s, i, void 0)
            }
            o.h = s,
            o.default = s
        }
        , {
            "./is": 21,
            "./vnode": 26
        }],
        20: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.htmlDomApi = {
                createElement: function(e) {
                    return document.createElement(e)
                },
                createElementNS: function(e, t) {
                    return document.createElementNS(e, t)
                },
                createTextNode: function(e) {
                    return document.createTextNode(e)
                },
                insertBefore: function(e, t, o) {
                    e.insertBefore(t, o)
                },
                removeChild: function(e, t) {
                    e.removeChild(t)
                },
                appendChild: function(e, t) {
                    e.appendChild(t)
                },
                parentNode: function(e) {
                    return e.parentNode
                },
                nextSibling: function(e) {
                    return e.nextSibling
                },
                tagName: function(e) {
                    return e.tagName
                },
                setTextContent: function(e, t) {
                    e.textContent = t
                },
                getTextContent: function(e) {
                    return e.textContent
                },
                isElement: function(e) {
                    return 1 === e.nodeType
                },
                isText: function(e) {
                    return 3 === e.nodeType
                }
            },
            o.default = o.htmlDomApi
        }
        , {}],
        21: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.array = Array.isArray,
            o.primitive = function(e) {
                return "string" == typeof e || "number" == typeof e
            }
        }
        , {}],
        22: [function(e, t, o) {
            "use strict";
            function n(e, t) {
                var o, n = t.elm, r = e.data.attrs, s = t.data.attrs;
                if ((r || s) && r !== s) {
                    for (o in r = r || {},
                    s = s || {}) {
                        var i = s[o];
                        r[o] !== i && (!0 === i ? n.setAttribute(o, "") : !1 === i ? n.removeAttribute(o) : n.setAttribute(o, i))
                    }
                    for (o in r)
                        o in s || n.removeAttribute(o)
                }
            }
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.attributesModule = {
                create: n,
                update: n
            },
            o.default = o.attributesModule
        }
        , {}],
        23: [function(e, t, o) {
            "use strict";
            function n(e, t) {
                var o, n, r = t.elm, s = e.data.class, i = t.data.class;
                if ((s || i) && s !== i) {
                    for (n in i = i || {},
                    s = s || {})
                        i[n] || r.classList.remove(n);
                    for (n in i)
                        (o = i[n]) !== s[n] && r.classList[o ? "add" : "remove"](n)
                }
            }
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.classModule = {
                create: n,
                update: n
            },
            o.default = o.classModule
        }
        , {}],
        24: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            var n = e("./vnode")
              , r = e("./is")
              , s = e("./htmldomapi");
            function i(e) {
                return void 0 === e
            }
            function a(e) {
                return void 0 !== e
            }
            var c = n.default("", {}, [], void 0, void 0);
            function l(e, t) {
                return e.key === t.key && e.sel === t.sel
            }
            function u(e, t, o) {
                var n, r, s, i = {};
                for (n = t; n <= o; ++n)
                    null != (s = e[n]) && void 0 !== (r = s.key) && (i[r] = n);
                return i
            }
            var d = ["create", "update", "remove", "destroy", "pre", "post"]
              , h = e("./h");
            o.h = h.h;
            var p = e("./thunk");
            o.thunk = p.thunk,
            o.init = function(e, t) {
                var o, h, p = {}, f = void 0 !== t ? t : s.default;
                for (o = 0; o < d.length; ++o)
                    for (p[d[o]] = [],
                    h = 0; h < e.length; ++h) {
                        var m = e[h][d[o]];
                        void 0 !== m && p[d[o]].push(m)
                    }
                function g(e, t) {
                    return function() {
                        if (0 == --t) {
                            var o = f.parentNode(e);
                            f.removeChild(o, e)
                        }
                    }
                }
                function b(e, t) {
                    var o, n = e.data;
                    void 0 !== n && a(o = n.hook) && a(o = o.init) && (o(e),
                    n = e.data);
                    var s = e.children
                      , i = e.sel;
                    if (void 0 !== i) {
                        var l = i.indexOf("#")
                          , u = i.indexOf(".", l)
                          , d = l > 0 ? l : i.length
                          , h = u > 0 ? u : i.length
                          , m = -1 !== l || -1 !== u ? i.slice(0, Math.min(d, h)) : i
                          , g = e.elm = a(n) && a(o = n.ns) ? f.createElementNS(o, m) : f.createElement(m);
                        for (d < h && g.setAttribute("id", i.slice(d + 1, h)),
                        u > 0 && g.setAttribute("class", i.slice(h + 1).replace(/\./g, " ")),
                        o = 0; o < p.create.length; ++o)
                            p.create[o](c, e);
                        if (r.array(s))
                            for (o = 0; o < s.length; ++o) {
                                var v = s[o];
                                null != v && f.appendChild(g, b(v, t))
                            }
                        else
                            r.primitive(e.text) && f.appendChild(g, f.createTextNode(e.text));
                        a(o = e.data.hook) && (o.create && o.create(c, e),
                        o.insert && t.push(e))
                    } else
                        e.elm = f.createTextNode(e.text);
                    return e.elm
                }
                function v(e, t, o, n, r, s) {
                    for (; n <= r; ++n) {
                        var i = o[n];
                        null != i && f.insertBefore(e, b(i, s), t)
                    }
                }
                function y(e) {
                    var t, o, n = e.data;
                    if (void 0 !== n) {
                        for (a(t = n.hook) && a(t = t.destroy) && t(e),
                        t = 0; t < p.destroy.length; ++t)
                            p.destroy[t](e);
                        if (void 0 !== e.children)
                            for (o = 0; o < e.children.length; ++o)
                                null != (t = e.children[o]) && "string" != typeof t && y(t)
                    }
                }
                function w(e, t, o, n) {
                    for (; o <= n; ++o) {
                        var r = void 0
                          , s = void 0
                          , i = void 0
                          , c = t[o];
                        if (null != c)
                            if (a(c.sel)) {
                                for (y(c),
                                s = p.remove.length + 1,
                                i = g(c.elm, s),
                                r = 0; r < p.remove.length; ++r)
                                    p.remove[r](c, i);
                                a(r = c.data) && a(r = r.hook) && a(r = r.remove) ? r(c, i) : i()
                            } else
                                f.removeChild(e, c.elm)
                    }
                }
                function k(e, t, o) {
                    var n, r;
                    a(n = t.data) && a(r = n.hook) && a(n = r.prepatch) && n(e, t);
                    var s = t.elm = e.elm
                      , c = e.children
                      , d = t.children;
                    if (e !== t) {
                        if (void 0 !== t.data) {
                            for (n = 0; n < p.update.length; ++n)
                                p.update[n](e, t);
                            a(n = t.data.hook) && a(n = n.update) && n(e, t)
                        }
                        i(t.text) ? a(c) && a(d) ? c !== d && function(e, t, o, n) {
                            for (var r, s, a, c = 0, d = 0, h = t.length - 1, p = t[0], m = t[h], g = o.length - 1, y = o[0], P = o[g]; c <= h && d <= g; )
                                null == p ? p = t[++c] : null == m ? m = t[--h] : null == y ? y = o[++d] : null == P ? P = o[--g] : l(p, y) ? (k(p, y, n),
                                p = t[++c],
                                y = o[++d]) : l(m, P) ? (k(m, P, n),
                                m = t[--h],
                                P = o[--g]) : l(p, P) ? (k(p, P, n),
                                f.insertBefore(e, p.elm, f.nextSibling(m.elm)),
                                p = t[++c],
                                P = o[--g]) : l(m, y) ? (k(m, y, n),
                                f.insertBefore(e, m.elm, p.elm),
                                m = t[--h],
                                y = o[++d]) : (void 0 === r && (r = u(t, c, h)),
                                i(s = r[y.key]) ? (f.insertBefore(e, b(y, n), p.elm),
                                y = o[++d]) : ((a = t[s]).sel !== y.sel ? f.insertBefore(e, b(y, n), p.elm) : (k(a, y, n),
                                t[s] = void 0,
                                f.insertBefore(e, a.elm, p.elm)),
                                y = o[++d]));
                            c > h ? v(e, null == o[g + 1] ? null : o[g + 1].elm, o, d, g, n) : d > g && w(e, t, c, h)
                        }(s, c, d, o) : a(d) ? (a(e.text) && f.setTextContent(s, ""),
                        v(s, null, d, 0, d.length - 1, o)) : a(c) ? w(s, c, 0, c.length - 1) : a(e.text) && f.setTextContent(s, "") : e.text !== t.text && f.setTextContent(s, t.text),
                        a(r) && a(n = r.postpatch) && n(e, t)
                    }
                }
                return function(e, t) {
                    var o, r, s, i = [];
                    for (o = 0; o < p.pre.length; ++o)
                        p.pre[o]();
                    for (function(e) {
                        return void 0 !== e.sel
                    }(e) || (e = function(e) {
                        var t = e.id ? "#" + e.id : ""
                          , o = e.className ? "." + e.className.split(" ").join(".") : "";
                        return n.default(f.tagName(e).toLowerCase() + t + o, {}, [], void 0, e)
                    }(e)),
                    l(e, t) ? k(e, t, i) : (r = e.elm,
                    s = f.parentNode(r),
                    b(t, i),
                    null !== s && (f.insertBefore(s, t.elm, f.nextSibling(r)),
                    w(s, [e], 0, 0))),
                    o = 0; o < i.length; ++o)
                        i[o].data.hook.insert(i[o]);
                    for (o = 0; o < p.post.length; ++o)
                        p.post[o]();
                    return t
                }
            }
        }
        , {
            "./h": 19,
            "./htmldomapi": 20,
            "./is": 21,
            "./thunk": 25,
            "./vnode": 26
        }],
        25: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            var n = e("./h");
            function r(e, t) {
                t.elm = e.elm,
                e.data.fn = t.data.fn,
                e.data.args = t.data.args,
                t.data = e.data,
                t.children = e.children,
                t.text = e.text,
                t.elm = e.elm
            }
            function s(e) {
                var t = e.data;
                r(t.fn.apply(void 0, t.args), e)
            }
            function i(e, t) {
                var o, n = e.data, s = t.data, i = n.args, a = s.args;
                if (n.fn === s.fn && i.length === a.length) {
                    for (o = 0; o < a.length; ++o)
                        if (i[o] !== a[o])
                            return void r(s.fn.apply(void 0, a), t);
                    r(e, t)
                } else
                    r(s.fn.apply(void 0, a), t)
            }
            o.thunk = function(e, t, o, r) {
                return void 0 === r && (r = o,
                o = t,
                t = void 0),
                n.h(e, {
                    key: t,
                    hook: {
                        init: s,
                        prepatch: i
                    },
                    fn: o,
                    args: r
                })
            }
            ,
            o.default = o.thunk
        }
        , {
            "./h": 19
        }],
        26: [function(e, t, o) {
            "use strict";
            function n(e, t, o, n, r) {
                return {
                    sel: e,
                    data: t,
                    children: o,
                    text: n,
                    elm: r,
                    key: void 0 === t ? void 0 : t.key
                }
            }
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.vnode = n,
            o.default = n
        }
        , {}],
        27: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./preset")
              , r = e("./note")
              , s = e("./moderation")
              , i = e("common")
              , a = window.lichess;
            o.default = function(e, t) {
                const o = e.data;
                o.domVersion = 1;
                const c = {
                    instance: void 0,
                    loaded: !1,
                    enabled: i.prop(!!o.palantir)
                }
                  , l = ["discussion"];
                e.noteId && l.push("note"),
                e.plugin && l.push(e.plugin.tab.key);
                const u = a.storage.make("chat.tab")
                  , d = u.get();
                let h;
                const p = {
                    tab: l.find(e=>e === d) || l[0],
                    enabled: e.alwaysEnabled || !a.storage.get("nochat"),
                    placeholderKey: "talkInChat",
                    loading: !1,
                    timeout: e.timeout,
                    writeable: e.writeable
                };
                l.length > 1 && "discussion" === p.tab && a.storage.get("nochat") && (p.tab = l[1]);
                const f = function(e) {
                    (e = e.trim()) && (e.length > 140 ? alert("Max length: 140 chars. " + e.length + " chars used.") : a.pubsub.emit("socket.send", "talk", e))
                }
                  , m = a.trans(e.i18n);
                function g() {
                    return e.permissions.timeout || e.permissions.local
                }
                function b() {
                    h = g() ? s.moderationCtrl({
                        reasons: e.timeoutReasons || [{
                            key: "other",
                            name: "Inappropriate behavior"
                        }],
                        permissions: e.permissions,
                        redraw: t
                    }) : void 0,
                    g() && e.loadCss("chat.mod")
                }
                b();
                const v = e.noteId ? r.noteCtrl({
                    id: e.noteId,
                    trans: m,
                    redraw: t
                }) : void 0
                  , y = n.presetCtrl({
                    initialGroup: e.preset,
                    post: f,
                    redraw: t
                })
                  , w = [["socket.in.message", function(e) {
                    o.lines.push(e);
                    const n = o.lines.length;
                    n > 200 && (o.lines.splice(0, n - 200 + 50),
                    o.domVersion++),
                    t()
                }
                ], ["socket.in.chat_timeout", function(e) {
                    o.lines.forEach(t=>{
                        t.u === e && (t.d = !0)
                    }
                    ),
                    e.toLowerCase() === o.userId && (p.timeout = !0),
                    o.domVersion++,
                    t()
                }
                ], ["socket.in.chat_reinstate", function(e) {
                    e === o.userId && (p.timeout = !1,
                    t())
                }
                ], ["chat.writeable", function(e) {
                    p.writeable = e,
                    t()
                }
                ], ["chat.permissions", function(o) {
                    let n;
                    for (n in o)
                        e.permissions[n] = o[n];
                    b(),
                    t()
                }
                ], ["palantir.toggle", c.enabled]];
                w.forEach(([e,t])=>a.pubsub.on(e, t));
                const k = ()=>a.pubsub.emit("chat.enabled", p.enabled);
                return k(),
                {
                    data: o,
                    opts: e,
                    vm: p,
                    allTabs: l,
                    setTab(e) {
                        p.tab = e,
                        u.set(e),
                        "discussion" === e && a.requestIdleCallback(()=>$(".mchat__say").focus()),
                        t()
                    },
                    moderation: ()=>h,
                    note: v,
                    preset: y,
                    post: f,
                    trans: m,
                    plugin: e.plugin,
                    setEnabled(e) {
                        p.enabled = e,
                        k(),
                        e ? a.storage.remove("nochat") : a.storage.set("nochat", "1"),
                        t()
                    },
                    redraw: t,
                    palantir: c,
                    destroy: ()=>{
                        w.forEach(([e,t])=>a.pubsub.off(e, t))
                    }
                }
            }
        }
        , {
            "./moderation": 31,
            "./note": 32,
            "./preset": 33,
            common: 40
        }],
        28: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("./spam")
              , s = e("./enhance")
              , i = e("./preset")
              , a = e("./moderation")
              , c = e("./util")
              , l = e("./xhr")
              , u = /^\/w(?:hisper)?\s/;
            function d(e) {
                if (!e.vm.writeable)
                    return;
                if (e.data.loginRequired && !e.data.userId || e.data.restricted)
                    return n.h("input.mchat__say", {
                        attrs: {
                            placeholder: e.trans("loginToChat"),
                            disabled: !0
                        }
                    });
                let t;
                return t = e.vm.timeout ? e.trans("youHaveBeenTimedOut") : e.opts.blind ? "Chat" : e.trans.noarg(e.vm.placeholderKey),
                n.h("input.mchat__say", {
                    attrs: {
                        placeholder: t,
                        autocomplete: "off",
                        maxlength: 140,
                        disabled: e.vm.timeout || !e.vm.writeable
                    },
                    hook: {
                        insert(t) {
                            p(e, t.elm)
                        }
                    }
                })
            }
            let h;
            o.default = function(e) {
                if (!e.vm.enabled)
                    return [];
                const t = t=>{
                    const o = t.elm;
                    if (e.data.lines.length > 5) {
                        (0 === o.scrollTop || o.scrollTop > o.scrollHeight - o.clientHeight - 100) && (o.scrollTop = 999999,
                        setTimeout(e=>o.scrollTop = 999999, 300))
                    }
                }
                  , o = e.moderation()
                  , r = [n.h("ol.mchat__messages.chat-v-" + e.data.domVersion, {
                    attrs: {
                        role: "log",
                        "aria-live": "polite",
                        "aria-atomic": !1
                    },
                    hook: {
                        insert(n) {
                            const r = $(n.elm).on("click", "a.jump", e=>{
                                window.lichess.pubsub.emit("jump", e.target.getAttribute("data-ply"))
                            }
                            );
                            o ? r.on("click", ".mod", e=>{
                                o.open(e.target.getAttribute("data-username").split(" ")[0])
                            }
                            ) : r.on("click", ".flag", t=>(function(e, t) {
                                const o = t.querySelector("a.user-link")
                                  , n = t.querySelector("t").innerText;
                                o && confirm(`Report "${n}" to moderators?`) && l.flag(e.data.resourceId, o.href.split("/")[4], n)
                            }
                            )(e, t.target.parentNode)),
                            t(n)
                        },
                        postpatch: (e,o)=>t(o)
                    }
                }, f(e).map(t=>(function(e, t) {
                    const o = function(e, t) {
                        if (s.isMoreThanText(e)) {
                            const o = function(e) {
                                return (t,o)=>{
                                    o.data.lichessChat !== t.data.lichessChat && (o.elm.innerHTML = s.enhance(o.data.lichessChat, e))
                                }
                            }(t);
                            return n.h("t", {
                                lichessChat: e,
                                hook: {
                                    create: o,
                                    update: o
                                }
                            })
                        }
                        return n.h("t", e)
                    }(t.t, e.opts.parseMoves);
                    if ("lichess" === t.u)
                        return n.h("li.system", o);
                    if (t.c)
                        return n.h("li", [n.h("span.color", "[" + t.c + "]"), o]);
                    const r = n.thunk("a", t.u, c.userLink, [t.u, t.title]);
                    return n.h("li", {}, e.moderation() ? [t.u ? a.lineAction(t.u) : null, r, o] : [e.data.userId && t.u && e.data.userId != t.u ? n.h("i.flag", {
                        attrs: {
                            "data-icon": "!",
                            title: "Report"
                        }
                    }) : null, r, o])
                }
                )(e, t))), d(e)]
                  , u = i.presetView(e.preset);
                return u && r.push(u),
                r
            }
            ;
            const p = (e,t)=>{
                t.addEventListener("keypress", t=>setTimeout(()=>{
                    const o = t.target
                      , n = o.value
                      , s = e.opts.public;
                    10 == t.which || 13 == t.which ? "" === n ? $(".keyboard-move input").focus() : (r.report(n),
                    s && r.hasTeamUrl(n) ? alert("Please don't advertise teams in the chat.") : e.post(n),
                    o.value = "",
                    s || o.classList.remove("whisper")) : (o.removeAttribute("placeholder"),
                    s || o.classList.toggle("whisper", !!n.match(u)))
                }
                )),
                window.Mousetrap.bind("c", ()=>(t.focus(),
                !1)),
                window.Mousetrap(t).bind("esc", ()=>t.blur());
                const o = ["touchstart", "mousedown"];
                h && o.forEach(e=>document.body.removeEventListener(e, h, {
                    capture: !0
                })),
                h = e=>{
                    e.shiftKey || 2 === e.buttons || 2 === e.button || t.blur()
                }
                ,
                t.onfocus = ()=>o.forEach(e=>document.body.addEventListener(e, h, {
                    passive: !0,
                    capture: !0
                })),
                t.onblur = ()=>o.forEach(e=>document.body.removeEventListener(e, h, {
                    capture: !0
                }))
            }
            ;
            function f(e) {
                let t, o = [];
                return e.data.lines.forEach(n=>{
                    n.d || t && function(e, t) {
                        return e.d && t.d && e.u === t.u
                    }(t, n) || n.r && !e.opts.kobold || r.skip(n.t) || o.push(n),
                    t = n
                }
                ),
                o
            }
        }
        , {
            "./enhance": 29,
            "./moderation": 31,
            "./preset": 33,
            "./spam": 34,
            "./util": 35,
            "./xhr": 37,
            snabbdom: 24
        }],
        29: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.enhance = function(e, t) {
                const o = window.lichess.escapeHtml(e)
                  , n = o.replace(a, l).replace(s, i);
                return t && n === o ? function(e) {
                    return e.replace(u, d)
                }(n) : n
            }
            ;
            const n = /[&<>"@]/
              , r = /\.\w/;
            o.isMoreThanText = function(e) {
                return n.test(e) || r.test(e)
            }
            ;
            const s = /\b(https?:\/\/|lichess\.org\/)[-–—\w+&'@#\/%?=()~|!:,.;]+[\w+&@#\/%=~|]/gi;
            function i(e, t) {
                if (e.includes("&quot;"))
                    return e;
                return '<a target="_blank" rel="nofollow" href="' + ("lichess.org/" === t ? "https://" + e : e) + '">' + e.replace(/^https:\/\//, "") + "</a>"
            }
            const a = /(^|[^\w@#/])(@|(?:https:\/\/)?lichess\.org\/@\/)([\w-]{2,})/g
              , c = /^[a-h][2-7]$/;
            function l(e, t, o, n) {
                return n.length > 20 || "@" === o && n.match(c) ? e : t + '<a href="/@/' + n + '">@' + n + "</a>"
            }
            const u = /\b(\d+)\s*(\.+)\s*(?:[o0-]+[o0]|[NBRQKP]?[a-h]?[1-8]?[x@]?[a-z][1-8](?:=[NBRQK])?)\+?\#?[!\?=]{0,5}/gi;
            function d(e, t, o) {
                if (t < 1 || t > 200)
                    return e;
                return '<a class="jump" data-ply="' + (2 * t - (o.length > 1 ? 0 : 1)) + '">' + e + "</a>"
            }
        }
        , {}],
        30: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("./ctrl")
              , s = e("./view")
              , i = e("snabbdom/modules/class")
              , a = e("snabbdom/modules/attributes");
            o.default = function(e, t) {
                const o = n.init([i.default, a.default]);
                let c, l;
                l = r.default(t, (function() {
                    c = o(c, s.default(l))
                }
                ));
                const u = s.default(l);
                return e.innerHTML = "",
                c = o(e, u),
                l
            }
        }
        , {
            "./ctrl": 27,
            "./view": 36,
            snabbdom: 24,
            "snabbdom/modules/attributes": 22,
            "snabbdom/modules/class": 23
        }],
        31: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("./xhr")
              , s = e("./util");
            o.moderationCtrl = function(e) {
                let t, o = !1;
                const n = n=>{
                    e.permissions.timeout ? (o = !0,
                    r.userModInfo(n).then(n=>{
                        t = n,
                        o = !1,
                        e.redraw()
                    }
                    )) : t = {
                        id: n,
                        username: n
                    },
                    e.redraw()
                }
                  , s = ()=>{
                    t = void 0,
                    o = !1,
                    e.redraw()
                }
                ;
                return {
                    loading: ()=>o,
                    data: ()=>t,
                    reasons: e.reasons,
                    permissions: ()=>e.permissions,
                    open: n,
                    close: s,
                    timeout(o) {
                        t && window.lichess.pubsub.emit("socket.send", "timeout", {
                            userId: t.id,
                            reason: o.key
                        }),
                        s(),
                        e.redraw()
                    },
                    shadowban() {
                        o = !0,
                        t && $.post("/mod/" + t.id + "/troll/true").then(()=>t && n(t.username)),
                        e.redraw()
                    }
                }
            }
            ,
            o.lineAction = function(e) {
                return n.h("i.mod", {
                    attrs: {
                        "data-icon": "",
                        "data-username": e,
                        title: "Moderation"
                    }
                })
            }
            ,
            o.moderationView = function(e) {
                if (!e)
                    return;
                if (e.loading())
                    return [n.h("div.loading", s.spinner())];
                const t = e.data();
                if (!t)
                    return;
                const o = e.permissions()
                  , r = t.history ? n.h("div.infos.block", [window.lichess.numberFormat(t.games || 0) + " games", t.troll ? "TROLL" : void 0, t.engine ? "ENGINE" : void 0, t.booster ? "BOOSTER" : void 0].map(e=>e && n.h("span", e)).concat([n.h("a", {
                    attrs: {
                        href: "/@/" + t.username + "?mod"
                    }
                }, "profile")]).concat(o.shadowban ? [n.h("a", {
                    attrs: {
                        href: "/mod/" + t.username + "/communication"
                    }
                }, "coms")] : [])) : void 0
                  , i = o.timeout ? n.h("div.timeout.block", [n.h("strong", "Timeout 10 minutes for"), ...e.reasons.map(t=>n.h("a.text", {
                    attrs: {
                        "data-icon": "p"
                    },
                    hook: s.bind("click", ()=>e.timeout(t))
                }, t.name)), ...t.troll || !o.shadowban ? [] : [n.h("div.shadowban", ["Or ", n.h("button.button.button-red.button-empty", {
                    hook: s.bind("click", e.shadowban)
                }, "shadowban")])]]) : n.h("div.timeout.block", [n.h("strong", "Moderation"), n.h("a.text", {
                    attrs: {
                        "data-icon": "p"
                    },
                    hook: s.bind("click", ()=>e.timeout(e.reasons[0]))
                }, "Timeout 10 minutes")])
                  , a = t.history ? n.h("div.history.block", [n.h("strong", "Timeout history"), n.h("table", n.h("tbody.slist", {
                    hook: {
                        insert: ()=>window.lichess.pubsub.emit("content_loaded")
                    }
                }, t.history.map((function(e) {
                    return n.h("tr", [n.h("td.reason", e.reason), n.h("td.mod", e.mod), n.h("td", n.h("time.timeago", {
                        attrs: {
                            datetime: e.date
                        }
                    }))])
                }
                ))))]) : void 0;
                return [n.h("div.top", {
                    key: "mod-" + t.id
                }, [n.h("span.text", {
                    attrs: {
                        "data-icon": ""
                    }
                }, [s.userLink(t.username)]), n.h("a", {
                    attrs: {
                        "data-icon": "L"
                    },
                    hook: s.bind("click", e.close)
                })]), n.h("div.mchat__content.moderation", [r, i, a])]
            }
        }
        , {
            "./util": 35,
            "./xhr": 37,
            snabbdom: 24
        }],
        32: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("./xhr")
              , s = e("./util");
            o.noteCtrl = function(e) {
                let t;
                const o = window.lichess.debounce(()=>{
                    r.setNote(e.id, t)
                }
                , 1e3);
                return {
                    id: e.id,
                    trans: e.trans,
                    text: ()=>t,
                    fetch() {
                        r.getNote(e.id).then(o=>{
                            t = o || "",
                            e.redraw()
                        }
                        )
                    },
                    post(e) {
                        t = e,
                        o()
                    }
                }
            }
            ,
            o.noteView = function(e) {
                const t = e.text();
                return null == t ? n.h("div.loading", {
                    hook: {
                        insert: e.fetch
                    }
                }, [s.spinner()]) : n.h("textarea", {
                    attrs: {
                        placeholder: e.trans("typePrivateNotesHere")
                    },
                    hook: {
                        insert(o) {
                            const n = $(o.elm);
                            n.val(t).on("change keyup paste", ()=>{
                                e.post(n.val())
                            }
                            )
                        }
                    }
                })
            }
        }
        , {
            "./util": 35,
            "./xhr": 37,
            snabbdom: 24
        }],
        33: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("./util")
              , s = {
                start: ["hi/Hello", "gl/Good luck", "hf/Have fun!", "u2/You too!"].map(i),
                end: ["gg/Good game", "wp/Well played", "ty/Thank you", "gtg/I've got to go", "bye/Bye!"].map(i)
            };
            function i(e) {
                const t = e.split("/");
                return {
                    key: t[0],
                    text: t[1]
                }
            }
            o.presetCtrl = function(e) {
                let t = e.initialGroup
                  , o = [];
                return {
                    group: ()=>t,
                    said: ()=>o,
                    setGroup(n) {
                        n !== t && (t = n,
                        n || (o = []),
                        e.redraw())
                    },
                    post(n) {
                        if (!t)
                            return;
                        s[t] && (o.includes(n.key) || (e.post(n.text),
                        o.push(n.key)))
                    }
                }
            }
            ,
            o.presetView = function(e) {
                const t = e.group();
                if (!t)
                    return;
                const o = s[t]
                  , i = e.said();
                return o && i.length < 2 ? n.h("div.mchat__presets", o.map(t=>{
                    const o = i.includes(t.key);
                    return n.h("span", {
                        class: {
                            disabled: o
                        },
                        attrs: {
                            title: t.text,
                            disabled: o
                        },
                        hook: r.bind("click", ()=>{
                            !o && e.post(t)
                        }
                        )
                    }, t.key)
                }
                )) : void 0
            }
        }
        , {
            "./util": 35,
            snabbdom: 24
        }],
        34: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.skip = function(e) {
                return r(e) && "1" != window.lichess.storage.get("chat-spam")
            }
            ,
            o.hasTeamUrl = function(e) {
                return !!e.match(s)
            }
            ,
            o.report = function(e) {
                r(e) && ($.post("/jslog/" + window.location.href.substr(-12) + "?n=spam"),
                window.lichess.storage.set("chat-spam", "1"))
            }
            ;
            const n = new RegExp(["xcamweb.com", "(^|[^i])chess-bot", "chess-cheat", "coolteenbitch", "letcafa.webcam", "tinyurl.com/", "wooga.info/", "bit.ly/", "wbt.link/", "eb.by/", "001.rs/", "shr.name/", "u.to/", ".3-a.net", ".ssl443.org", ".ns02.us", ".myftp.info", ".flinkup.com", ".serveusers.com", "badoogirls.com", "hide.su", "wyon.de", "sexdatingcz.club"].map(e=>e.replace(/\./g, "\\.").replace(/\//g, "\\/")).join("|"));
            function r(e) {
                return !!e.match(n)
            }
            const s = /lichess\.org\/team\//
        }
        , {}],
        35: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom");
            o.userLink = function(e, t) {
                const o = e.substring(0, 14);
                return n.h("a", {
                    class: {
                        "user-link": !0,
                        ulpt: !0
                    },
                    attrs: {
                        href: "/@/" + e
                    }
                }, t ? [n.h("span.title", "BOT" == t ? {
                    attrs: {
                        "data-bot": !0
                    }
                } : {}, t), o] : [o])
            }
            ,
            o.spinner = function() {
                return n.h("div.spinner", [n.h("svg", {
                    attrs: {
                        viewBox: "0 0 40 40"
                    }
                }, [n.h("circle", {
                    attrs: {
                        cx: 20,
                        cy: 20,
                        r: 18,
                        fill: "none"
                    }
                })])])
            }
            ,
            o.bind = function(e, t) {
                return {
                    insert: o=>{
                        o.elm.addEventListener(e, t)
                    }
                }
            }
        }
        , {
            snabbdom: 24
        }],
        36: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("./discussion")
              , s = e("./note")
              , i = e("./moderation")
              , a = e("./util");
            function c(e) {
                const t = e.palantir;
                if (t.enabled())
                    return t.instance ? t.instance.render(n.h) : n.h("div.mchat__tab.palantir.palantir-slot", {
                        attrs: {
                            "data-icon": "",
                            title: "Voice chat"
                        },
                        hook: a.bind("click", ()=>{
                            if (!t.loaded) {
                                t.loaded = !0;
                                const o = window.lichess;
                                o.loadScript("javascripts/vendor/peerjs.min.js").then(()=>{
                                    o.loadScript(o.compiledScript("palantir")).then(()=>{
                                        t.instance = window.Palantir.palantir({
                                            uid: e.data.userId,
                                            redraw: e.redraw
                                        }),
                                        e.redraw()
                                    }
                                    )
                                }
                                )
                            }
                        }
                        )
                    })
            }
            o.default = function(e) {
                const t = e.moderation();
                return n.h("section.mchat" + (e.opts.alwaysEnabled ? "" : ".mchat-optional"), {
                    class: {
                        "mchat-mod": !!t
                    },
                    hook: {
                        destroy: e.destroy
                    }
                }, i.moderationView(t) || function(e) {
                    const t = e.vm.tab;
                    return [n.h("div.mchat__tabs.nb_" + e.allTabs.length, [...e.allTabs.map(o=>(function(e, t, o) {
                        return n.h("div.mchat__tab." + t, {
                            class: {
                                "mchat__tab-active": t === o
                            },
                            hook: a.bind("click", ()=>e.setTab(t))
                        }, function(e, t) {
                            return "discussion" === t ? [n.h("span", e.data.name), e.opts.alwaysEnabled ? void 0 : n.h("input", {
                                attrs: {
                                    type: "checkbox",
                                    title: e.trans.noarg("toggleTheChat"),
                                    checked: e.vm.enabled
                                },
                                hook: a.bind("change", t=>{
                                    e.setEnabled(t.target.checked)
                                }
                                )
                            })] : "note" === t ? [n.h("span", e.trans.noarg("notes"))] : e.plugin && t === e.plugin.tab.key ? [n.h("span", e.plugin.tab.name)] : []
                        }(e, t))
                    }
                    )(e, o, t)), c(e)]), n.h("div.mchat__content." + t, "note" === t && e.note ? [s.noteView(e.note)] : e.plugin && t === e.plugin.tab.key ? [e.plugin.view()] : r.default(e))]
                }(e))
            }
        }
        , {
            "./discussion": 28,
            "./moderation": 31,
            "./note": 32,
            "./util": 35,
            snabbdom: 24
        }],
        37: [function(e, t, o) {
            "use strict";
            function n(e) {
                return `/${e}/note`
            }
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.userModInfo = function(e) {
                return $.get("/mod/chat-user/" + e)
            }
            ,
            o.flag = function(e, t, o) {
                return $.post("/report/flag", {
                    username: t,
                    resource: e,
                    text: o
                })
            }
            ,
            o.getNote = function(e) {
                return $.get(n(e))
            }
            ,
            o.setNote = function(e, t) {
                return $.post(n(e), {
                    text: t
                })
            }
        }
        , {}],
        38: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./piotr");
            o.piotr = n.default,
            o.initialFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            o.fixCrazySan = function(e) {
                return "P" === e[0] ? e.slice(1) : e
            }
            ,
            o.decomposeUci = function(e) {
                return [e.slice(0, 2), e.slice(2, 4), e.slice(4, 5)]
            }
            ,
            o.renderEval = function(e) {
                return ((e = Math.max(Math.min(Math.round(e / 10) / 10, 99), -99)) > 0 ? "+" : "") + e
            }
            ,
            o.readDests = function(e) {
                if (void 0 === e)
                    return null;
                const t = {};console.log(e);
                return e && e.split(" ").forEach(e=>{
                    t[n.default[e[0]]] = e.slice(1).split("").map(e=>n.default[e])
                }
                ),
                t
            }
            ,
            o.readDrops = function(e) {
                return null == e ? null : e.match(/.{2}/g) || []
            }
            ,
            o.roleToSan = {
                pawn: "P",
                knight: "N",
                bishop: "B",
                rook: "R",
                queen: "Q",
                king: "K"
            },
            o.sanToRole = {
                P: "pawn",
                N: "knight",
                B: "bishop",
                R: "rook",
                Q: "queen",
                K: "king"
            }
        }
        , {
            "./piotr": 39
        }],
        39: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            o.default = {
                a: "a1",
                b: "b1",
                c: "c1",
                d: "d1",
                e: "e1",
                f: "f1",
                g: "g1",
                h: "h1",
                i: "a2",
                j: "b2",
                k: "c2",
                l: "d2",
                m: "e2",
                n: "f2",
                o: "g2",
                p: "h2",
                q: "a3",
                r: "b3",
                s: "c3",
                t: "d3",
                u: "e3",
                v: "f3",
                w: "g3",
                x: "h3",
                y: "a4",
                z: "b4",
                A: "c4",
                B: "d4",
                C: "e4",
                D: "f4",
                E: "g4",
                F: "h4",
                G: "a5",
                H: "b5",
                I: "c5",
                J: "d5",
                K: "e5",
                L: "f5",
                M: "g5",
                N: "h5",
                O: "a6",
                P: "b6",
                Q: "c6",
                R: "d6",
                S: "e6",
                T: "f6",
                U: "g6",
                V: "h6",
                W: "a7",
                X: "b7",
                Y: "c7",
                Z: "d7",
                0: "e7",
                1: "f7",
                2: "g7",
                3: "h7",
                4: "a8",
                5: "b8",
                6: "c8",
                7: "d8",
                8: "e8",
                9: "f8",
                "!": "g8",
                "?": "h8"
            }
        }
        , {}],
        40: [function(e, t, o) {
            "use strict";
            function n(e) {
                return void 0 !== e
            }
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.defined = n,
            o.empty = function(e) {
                return !e || 0 === e.length
            }
            ,
            o.prop = function(e) {
                let t = e;
                return function(e) {
                    return n(e) && (t = e),
                    t
                }
            }
        }
        , {}],
        41: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./throttle");
            let r;
            o.runner = function(e, t=100) {
                let o;
                const r = n.default(t, ()=>{
                    window.lichess.raf(()=>{
                        e(),
                        o && clearTimeout(o),
                        o = setTimeout(r, 500)
                    }
                    )
                }
                );
                r()
            }
            ,
            o.fixMainBoardHeight = function(e) {
                const t = e.querySelector(".main-board")
                  , o = t.offsetWidth;
                r != o && (r = o,
                t.style.height = o + "px",
                t.querySelector(".cg-wrap").style.height = o + "px",
                window.lichess.dispatchEvent(document.body, "chessground.resize"))
            }
            ;
            let s = !1;
            o.bindChessgroundResizeOnce = function(e) {
                s || (s = !0,
                document.body.addEventListener("chessground.resize", e))
            }
            ,
            o.needsBoardHeightFix = function() {
                if (window.chrome)
                    return !1;
                const e = navigator.userAgent.split("Firefox/");
                return !e[1] || parseInt(e[1]) < 61
            }
        }
        , {
            "./throttle": 45
        }],
        42: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.menuHover = ()=>window.lichess.raf((function() {
                if (window.lichess.hasTouchEvents)
                    return;
                let e, t, o = function(o) {
                    e = o.pageX,
                    t = o.pageY
                }, n = {};
                $("#topnav.hover").each((function() {
                    const r = $(this).removeClass("hover")
                      , s = ()=>r.toggleClass("hover")
                      , i = function() {
                        Math.sqrt((n.pX - e) * (n.pX - e) + (n.pY - t) * (n.pY - t)) < 10 ? (r.off(n.event, o),
                        delete n.timeoutId,
                        n.isActive = !0,
                        s()) : (n.pX = e,
                        n.pY = t,
                        n.timeoutId = setTimeout(i, 100))
                    };
                    var a = function(e) {
                        n.timeoutId && (n.timeoutId = clearTimeout(n.timeoutId));
                        var t = n.event = "mousemove";
                        if ("mouseenter" == e.type) {
                            if (n.isActive || e.originalEvent.buttons)
                                return;
                            n.pX = e.pageX,
                            n.pY = e.pageY,
                            r.off(t, o).on(t, o),
                            n.timeoutId = setTimeout(i, 100)
                        } else {
                            if (!n.isActive)
                                return;
                            r.off(t, o),
                            n = {},
                            s()
                        }
                    };
                    r.on("mouseenter", a).on("mouseleave", a)
                }
                ))
            }
            ))
        }
        , {}],
        43: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            let n = []
              , r = !1;
            function s(e) {
                const t = window.lichess.storage.make("just-notified");
                if (document.hasFocus() || Date.now() - parseInt(t.get(), 10) < 1e3)
                    return;
                t.set("" + Date.now()),
                $.isFunction(e) && (e = e());
                const o = new Notification("lichess.org",{
                    icon: "//lichess1.org/assets/images/logo.256.png",
                    body: e
                });
                o.onclick = ()=>window.focus(),
                n.push(o),
                r || (r = !0,
                window.addEventListener("focus", ()=>{
                    n.forEach(e=>e.close()),
                    n = []
                }
                ))
            }
            o.default = function(e) {
                !document.hasFocus() && "Notification"in window && "granted" === Notification.permission && setTimeout(s, 10 + 500 * Math.random(), e)
            }
        }
        , {}],
        44: [function(e, t, o) {
            "use strict";
            function n(e) {
                return e.clientX || 0 === e.clientX ? [e.clientX, e.clientY] : e.touches && e.targetTouches[0] ? [e.targetTouches[0].clientX, e.targetTouches[0].clientY] : void 0
            }
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.default = function(e, t, o, r) {
                if (!t)
                    return;
                const s = document.createElement("cg-resize");
                e.container.appendChild(s);
                const i = e=>{
                    e.preventDefault();
                    const t = "touchstart" === e.type ? "touchmove" : "mousemove"
                      , o = "touchstart" === e.type ? "touchend" : "mouseup"
                      , r = n(e)
                      , s = parseInt(getComputedStyle(document.body).getPropertyValue("--zoom"));
                    let i = s;
                    const a = window.lichess.debounce(()=>{
                        $.ajax({
                            method: "post",
                            url: "/pref/zoom?v=" + (100 + i)
                        })
                    }
                    , 700)
                      , c = e=>{
                        const t = n(e)
                          , o = t[0] - r[0] + t[1] - r[1];
                        i = Math.round(Math.min(100, Math.max(0, s + o / 10))),
                        document.body.setAttribute("style", "--zoom:" + i),
                        window.lichess.dispatchEvent(window, "resize"),
                        a()
                    }
                    ;
                    document.body.classList.add("resizing"),
                    document.addEventListener(t, c),
                    document.addEventListener(o, ()=>{
                        document.removeEventListener(t, c),
                        document.body.classList.remove("resizing")
                    }
                    , {
                        once: !0
                    })
                }
                ;
                if (s.addEventListener("touchstart", i),
                s.addEventListener("mousedown", i),
                1 == t) {
                    const e = e=>s.classList.toggle("none", r ? !r(e) : e >= 2);
                    e(o),
                    window.lichess.pubsub.on("ply", e)
                }
                !function(e) {
                    const t = window.lichess.storage.makeBoolean("resize-nag");
                    if (t.get())
                        return;
                    window.lichess.loadCssPath("nag-circle"),
                    e.title = "Drag to resize",
                    e.innerHTML = '<div class="nag-circle"></div>';
                    for (const o of ["touchstart", "mousedown"])
                        e.addEventListener(o, ()=>{
                            t.set(!0),
                            e.innerHTML = ""
                        }
                        , {
                            once: !0
                        });
                    setTimeout(()=>t.set(!0), 15e3)
                }(s)
            }
        }
        , {}],
        45: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.default = function(e, t) {
                let o, n = 0;
                return function(...r) {
                    const s = this
                      , i = performance.now() - n;
                    function a() {
                        o = void 0,
                        n = performance.now(),
                        t.apply(s, r)
                    }
                    o && clearTimeout(o),
                    i > e ? a() : o = setTimeout(a, e - i)
                }
            }
        }
        , {}],
        46: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./status");
            function r(e) {
                return e.game.status.id < n.ids.aborted && !h(e)
            }
            function s(e) {
                return r(e) && !e.player.spectator
            }
            function i(e) {
                return "friend" === e.game.source
            }
            function a(e) {
                return "classical" === e.game.perf
            }
            function c(e) {
                return !!e.tournament || !!e.simul
            }
            function l(e) {
                return e.game.turns - (e.game.startedAtTurn || 0)
            }
            function u(e) {
                return l(e) > 1
            }
            function d(e) {
                return r(e) && !u(e) && !c(e)
            }
            function h(e) {
                return "import" === e.game.source
            }
            function p(e, t) {
                return e.player.color === t ? e.player : e.opponent.color === t ? e.opponent : null
            }
            function f(e) {
                return !(!e.player.ai && !e.opponent.ai)
            }
            function m(e) {
                return "correspondence" === e.game.speed
            }
            function g(e, t, o) {
                const n = p(e, t);
                o = o && !n.ai,
                n.isGone = o,
                !o && n.user && (n.user.online = !0)
            }
            o.playable = r,
            o.isPlayerPlaying = s,
            o.isPlayerTurn = function(e) {
                return s(e) && e.game.player == e.player.color
            }
            ,
            o.isFriendGame = i,
            o.isClassical = a,
            o.isForceResignable = function(e) {
                return !(i(e) && a(e))
            }
            ,
            o.mandatory = c,
            o.playedTurns = l,
            o.bothPlayersHavePlayed = u,
            o.abortable = d,
            o.takebackable = function(e) {
                return r(e) && e.takebackable && u(e) && !e.player.proposingTakeback && !e.opponent.proposingTakeback
            }
            ,
            o.drawable = function(e) {
                return r(e) && e.game.turns >= 2 && !e.player.offeringDraw && !f(e)
            }
            ,
            o.resignable = function(e) {
                return r(e) && !d(e)
            }
            ,
            o.berserkableBy = function(e) {
                return !!e.tournament && e.tournament.berserkable && s(e) && !u(e)
            }
            ,
            o.moretimeable = function(e) {
                return s(e) && e.moretimeable && (!!e.clock || !!e.correspondence && e.correspondence[e.opponent.color] < e.correspondence.increment - 3600)
            }
            ,
            o.imported = h,
            o.replayable = function(e) {
                return h(e) || n.finished(e) || n.aborted(e) && u(e)
            }
            ,
            o.getPlayer = p,
            o.hasAi = f,
            o.userAnalysable = function(e) {
                return n.finished(e) || r(e) && (!e.clock || !s(e))
            }
            ,
            o.isCorrespondence = m,
            o.setOnGame = function(e, t, o) {
                const n = p(e, t);
                o = o || !!n.ai,
                n.onGame = o,
                o && g(e, t, !1)
            }
            ,
            o.setIsGone = g,
            o.nbMoves = function(e, t) {
                return Math.floor((e.game.turns + ("white" == t ? 1 : 0)) / 2)
            }
            ,
            o.isSwitchable = function(e) {
                return !f(e) && (!!e.simul || m(e))
            }
        }
        , {
            "./status": 48
        }],
        47: [function(e, t, o) {
            "use strict";
            function n(e, t, o) {
                return (o ? "/embed/" : "/") + (e.game ? e.game.id : e) + (t ? "/" + t : "")
            }
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.game = n,
            o.cont = function(e, t) {
                return n(e) + "/continue/" + t
            }
        }
        , {}],
        48: [function(e, t, o) {
            "use strict";
            function n(e) {
                return e.game.status.id >= o.ids.started
            }
            function r(e) {
                return e.game.status.id >= o.ids.mate
            }
            function s(e) {
                return e.game.status.id === o.ids.aborted
            }
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.ids = {
                created: 10,
                started: 20,
                aborted: 25,
                mate: 30,
                resign: 31,
                stalemate: 32,
                timeout: 33,
                draw: 34,
                outoftime: 35,
                cheat: 36,
                noStart: 37,
                variantEnd: 60
            },
            o.started = n,
            o.finished = r,
            o.aborted = s,
            o.playing = function(e) {
                return n(e) && !r(e) && !s(e)
            }
        }
        , {}],
        49: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.default = function(e) {
                const t = e.trans.noarg
                  , o = e.data;
                switch (o.game.status.name) {
                case "started":
                    return t("playingRightNow");
                case "aborted":
                    return t("gameAborted");
                case "mate":
                    return t("checkmate");
                case "resign":
                    return t("white" == o.game.winner ? "blackResigned" : "whiteResigned");
                case "stalemate":
                    return t("stalemate");
                case "timeout":
                    switch (o.game.winner) {
                    case "white":
                        return t("blackLeftTheGame");
                    case "black":
                        return t("whiteLeftTheGame")
                    }
                    return t("draw");
                case "draw":
                    return t("draw");
                case "outoftime":
                    return t("timeOut");
                case "noStart":
                    return ("white" == o.game.winner ? "Black" : "White") + " didn't move";
                case "cheat":
                    return "Cheat detected";
                case "variantEnd":
                    switch (o.game.variant.key) {
                    case "kingOfTheHill":
                        return t("kingInTheCenter");
                    case "threeCheck":
                        return t("threeChecks")
                    }
                    return t("variantEnding");
                default:
                    return o.game.status.name
                }
            }
        }
        , {}],
        50: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("chessground/util");
            function r(e, t) {
                const o = []
                  , r = {}
                  , s = n.key2pos(t)
                  , i = Math.max(1, s[0] - 1)
                  , a = Math.min(8, s[0] + 1)
                  , c = Math.max(1, s[1] - 1)
                  , l = Math.min(8, s[1] + 1)
                  , u = e.chessground.state.pieces;
                for (let d = i; d <= a; d++)
                    for (let e = c; e <= l; e++) {
                        const s = n.pos2key([d, e]);
                        o.push(s),
                        u[s] && (s === t || "pawn" !== u[s].role) && (r[s] = void 0)
                    }
                e.chessground.setPieces(r),
                e.chessground.explode(o)
            }
            o.capture = r,
            o.enpassant = function(e, t, o) {
                const s = n.key2pos(t)
                  , i = [s[0], s[1] + ("white" === o ? -1 : 1)];
                r(e, n.pos2key(i))
            }
        }
        , {
            "chessground/util": 17
        }],
        51: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            let n = 0
              , r = 0;
            o.init = function(e) {
                e || (r = Date.now() + 1e4),
                window.addEventListener("focus", ()=>n = Date.now())
            }
            ,
            o.get = function() {
                return n >= r
            }
            ,
            o.onMove = function() {
                r = Date.now() + 1e3
            }
        }
        , {}],
        52: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./tourStanding");
            o.default = function(e) {
                const t = window.lichess
                  , o = document.querySelector(".round__app")
                  , r = e.data;
                let s, i;
                function a(e) {
                    if (!e.player.spectator)
                        return e.steps.length < 4 ? "start" : e.game.status.id >= 30 ? "end" : void 0
                }
                r.tournament && $("body").data("tournament-id", r.tournament.id),
                t.socket = t.StrongSocket(r.url.socket, r.player.version, {
                    options: {
                        name: "round"
                    },
                    params: {
                        userTv: r.userTv && r.userTv.id
                    },
                    receive(e, t) {
                        s.socketReceive(e, t)
                    },
                    events: {
                        tvSelect(e) {
                            r.tv && r.tv.channel == e.channel ? t.reload() : $(".tv-channels ." + e.channel + " .champion").html(e.player ? [e.player.title, e.player.name, e.player.rating].filter(e=>e).join("&nbsp") : "Anonymous")
                        },
                        end() {
                            $.ajax({
                                url: [r.tv ? "/tv" : "", r.game.id, r.player.color, "sides"].join("/"),
                                success: function(e) {
                                    const o = $(e)
                                      , n = o.find(".game__meta");
                                    n.length && $(".game__meta").replaceWith(n),
                                    $(".crosstable").replaceWith(o.find(".crosstable")),
                                    t.pubsub.emit("content_loaded")
                                }
                            })
                        },
                        tourStanding(t) {
                            e.chat && e.chat.plugin && i && (e.chat.plugin.set(t),
                            i.redraw())
                        }
                    }
                }),
                e.element = o,
                e.socketSend = t.socket.send,
                e.tour || r.simul || (e.onChange = e=>{
                    i && i.preset.setGroup(a(e))
                }
                ),
                s = window.LichessRound.app(e),
                e.chat && (e.tour ? (e.chat.plugin = n.tourStandingCtrl(e.tour, e.i18n.standing),
                e.chat.alwaysEnabled = !0) : r.simul || (e.chat.preset = a(e.data),
                e.chat.parseMoves = !0),
                t.makeChat(e.chat, (function(e) {
                    i = e
                }
                ))),
                $(".game__tournament .clock").each((function() {
                    $(this).clock({
                        time: parseFloat($(this).data("time"))
                    })
                }
                )),
                $(".round__now-playing .move-on input").change(s.moveOn.toggle).prop("checked", s.moveOn.get()).on("click", "a", (function() {
                    return t.hasToReload = !0,
                    !0
                }
                )),
                0 === location.pathname.lastIndexOf("/round-next/", 0) && history.replaceState(null, "", "/" + r.game.id),
                $("#zentog").click(()=>t.pubsub.emit("zen")),
                t.storage.make("reload-round-tabs").listen(t.reload)
            }
        }
        , {
            "./tourStanding": 72
        }],
        53: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./round")
              , r = window.lichess;
            let s = !1;
            function i(e) {
                return e.split(" ")[0]
            }
            o.subscribe = function(e) {
                e.data.opponent.ai || !e.data.game.rated && e.opts.userId || e.data.player.user && "BOT" === e.data.player.user.title || r.storage.make("ceval.fen").listen(t=>{
                    const o = t.newValue;
                    if (!o)
                        return;
                    if (o.startsWith("start:"))
                        return r.storage.set("round.ongoing", o);
                    const a = e.data
                      , c = n.lastStep(e.data);
                    !s && c.ply > 14 && e.isPlaying() && i(c.fen) === i(o) && ($.post("/jslog/" + a.game.id + a.player.id + "?n=ceval"),
                    s = !0)
                }
                )
            }
            ,
            o.publish = function(e, t) {
                e.opponent.ai && r.storage.set("ceval.fen", t.fen)
            }
        }
        , {
            "./round": 67
        }],
        54: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./clockView")
              , r = e("game");
            o.ClockController = class {
                constructor(e, t) {
                    this.opts = t,
                    this.emergSound = {
                        play: window.lichess.sound.lowtime,
                        delay: 2e4,
                        playable: {
                            white: !0,
                            black: !0
                        }
                    },
                    this.elements = {
                        white: {},
                        black: {}
                    },
                    this.timeRatio = e=>Math.min(1, e * this.timeRatioDivisor),
                    this.setClock = (e,t,o,n=0)=>{
                        const s = r.playable(e) && (r.playedTurns(e) > 1 || e.clock.running)
                          , i = 10 * n;
                        this.times = {
                            white: 1e3 * t,
                            black: 1e3 * o,
                            activeColor: s ? e.game.player : void 0,
                            lastUpdate: performance.now() + i
                        },
                        s && this.scheduleTick(this.times[e.game.player], i)
                    }
                    ,
                    this.addTime = (e,t)=>{
                        this.times[e] += 10 * t
                    }
                    ,
                    this.stopClock = ()=>{
                        const e = this.times.activeColor;
                        if (e) {
                            const t = this.elapsed();
                            return this.times[e] = Math.max(0, this.times[e] - t),
                            this.times.activeColor = void 0,
                            t
                        }
                    }
                    ,
                    this.hardStopClock = ()=>this.times.activeColor = void 0,
                    this.scheduleTick = (e,t)=>{
                        void 0 !== this.tickCallback && clearTimeout(this.tickCallback),
                        this.tickCallback = setTimeout(this.tick, this.opts.nvui ? 1e3 : e % (this.showTenths(e) ? 100 : 500) + 1 + t)
                    }
                    ,
                    this.tick = ()=>{
                        this.tickCallback = void 0;
                        const e = this.times.activeColor;
                        if (void 0 === e)
                            return;
                        const t = performance.now()
                          , o = Math.max(0, this.times[e] - this.elapsed(t));
                        this.scheduleTick(o, 0),
                        0 === o ? this.opts.onFlag() : n.updateElements(this, this.elements[e], o),
                        this.opts.soundColor === e && (this.emergSound.playable[e] ? o < this.emergMs && !(t < this.emergSound.next) && (this.emergSound.play(),
                        this.emergSound.next = t + this.emergSound.delay,
                        this.emergSound.playable[e] = !1) : o > 1.5 * this.emergMs && (this.emergSound.playable[e] = !0))
                    }
                    ,
                    this.elapsed = (e=performance.now())=>Math.max(0, e - this.times.lastUpdate),
                    this.millisOf = e=>this.times.activeColor === e ? Math.max(0, this.times[e] - this.elapsed()) : this.times[e],
                    this.isRunning = ()=>void 0 !== this.times.activeColor;
                    const o = e.clock;
                    if (0 === o.showTenths)
                        this.showTenths = ()=>!1;
                    else {
                        const e = 1 === o.showTenths ? 1e4 : 36e5;
                        this.showTenths = t=>t < e
                    }
                    this.showBar = o.showBar && !this.opts.nvui,
                    this.barTime = 1e3 * (Math.max(o.initial, 2) + 5 * o.increment),
                    this.timeRatioDivisor = 1 / this.barTime,
                    this.emergMs = 1e3 * Math.min(60, Math.max(10, .125 * o.initial)),
                    this.setClock(e, o.white, o.black)
                }
            }
        }
        , {
            "./clockView": 55,
            game: 46
        }],
        55: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("../view/button")
              , s = e("../util")
              , i = e("game");
            function a(e) {
                return (e < 10 ? "0" : "") + e
            }
            o.renderClock = function(e, t, o) {
                const s = e.clock
                  , a = s.millisOf(t.color)
                  , c = e.data.player.color === t.color
                  , l = t.color === s.times.activeColor
                  , h = e=>{
                    const o = s.elements[t.color]
                      , n = s.millisOf(t.color)
                      , r = t.color === s.times.activeColor;
                    o.time = e,
                    o.clock = e.parentElement,
                    e.innerHTML = u(n, s.showTenths(n), r, s.opts.nvui)
                }
                  , g = {
                    insert: e=>h(e.elm),
                    postpatch: (e,t)=>h(t.elm)
                };
                return n.h("div.rclock.rclock-" + o, {
                    class: {
                        outoftime: a <= 0,
                        running: l,
                        emerg: a < s.emergMs
                    }
                }, s.opts.nvui ? [n.h("div.time", {
                    attrs: {
                        role: "timer"
                    },
                    hook: g
                })] : [s.showBar && i.bothPlayersHavePlayed(e.data) ? d(e, t.color) : void 0, n.h("div.time", {
                    attrs: {
                        title: `${t.color} clock`
                    },
                    class: {
                        hour: a > 36e5
                    },
                    hook: g
                }), p(e, t.color, o), c ? f(e) : r.moretime(e), m(e, t.color, o)])
            }
            ;
            const c = "<sep>:</sep>"
              , l = '<sep class="low">:</sep>';
            function u(e, t, o, n) {
                const r = new Date(e);
                if (n)
                    return (e >= 36e5 ? Math.floor(e / 36e5) + "H:" : "") + r.getUTCMinutes() + "M:" + r.getUTCSeconds() + "S";
                const s = r.getUTCMilliseconds()
                  , i = o && s < 500 ? l : c
                  , u = a(r.getUTCMinutes()) + i + a(r.getUTCSeconds());
                if (e >= 36e5) {
                    return a(Math.floor(e / 36e5)) + c + u
                }
                if (t) {
                    let t = Math.floor(s / 100).toString();
                    return !o && e < 1e3 && (t += "<huns>" + Math.floor(s / 10) % 10 + "</huns>"),
                    u + "<tenths><sep>.</sep>" + t + "</tenths>"
                }
                return u
            }
            function d(e, t) {
                const o = e.clock
                  , r = e=>{
                    if (void 0 !== e.animate) {
                        let n = o.elements[t].barAnim;
                        void 0 !== n && n.effect && n.effect.target === e || (n = e.animate([{
                            transform: "scale(1)"
                        }, {
                            transform: "scale(0, 1)"
                        }], {
                            duration: o.barTime,
                            fill: "both"
                        }),
                        o.elements[t].barAnim = n);
                        const r = o.millisOf(t);
                        n.currentTime = o.barTime - r,
                        t === o.times.activeColor ? r > 0 && n.play() : n.pause()
                    } else
                        o.elements[t].bar = e,
                        e.style.transform = "scale(" + o.timeRatio(o.millisOf(t)) + ",1)"
                }
                ;
                return n.h("div.bar", {
                    class: {
                        berserk: !!e.goneBerserk[t]
                    },
                    hook: {
                        insert: e=>r(e.elm),
                        postpatch: (e,t)=>r(t.elm)
                    }
                })
            }
            function h(e, t) {
                return !!e.goneBerserk[t] && e.data.game.turns <= 1 && i.playable(e.data)
            }
            function p(e, t, o) {
                return h(e, t) ? n.h("div.berserked." + o, s.justIcon("`")) : null
            }
            function f(e) {
                if (i.berserkableBy(e.data) && !e.goneBerserk[e.data.player.color])
                    return n.h("button.fbt.go-berserk", {
                        attrs: {
                            title: "GO BERSERK! Half the time, no increment, bonus point",
                            "data-icon": "`"
                        },
                        hook: s.bind("click", e.goBerserk)
                    })
            }
            function m(e, t, o) {
                const r = e.data;
                return r.tournament && r.tournament.ranks && !h(e, t) ? n.h("div.tour-rank." + o, {
                    attrs: {
                        title: "Current tournament rank"
                    }
                }, "#" + r.tournament.ranks[t]) : null
            }
            o.updateElements = function(e, t, o) {
                if (t.time && (t.time.innerHTML = u(o, e.showTenths(o), !0, e.opts.nvui)),
                t.bar && (t.bar.style.transform = "scale(" + e.timeRatio(o) + ",1)"),
                t.clock) {
                    const n = t.clock.classList;
                    o < e.emergMs ? n.add("emerg") : n.contains("emerg") && n.remove("emerg")
                }
            }
        }
        , {
            "../util": 74,
            "../view/button": 75,
            game: 46,
            snabbdom: 24
        }],
        56: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.ctrl = function(e, t, o) {
                const n = .1 / t.increment;
                let r;
                function s(e, t) {
                    r = {
                        white: 1e3 * e,
                        black: 1e3 * t,
                        lastUpdate: performance.now()
                    }
                }
                return s(t.white, t.black),
                {
                    root: e,
                    data: t,
                    timePercent: function(e) {
                        return Math.max(0, Math.min(100, r[e] * n))
                    },
                    millisOf: function(e) {
                        return Math.max(0, r[e])
                    },
                    update: s,
                    tick: function(e) {
                        const t = performance.now();
                        r[e] -= t - r.lastUpdate,
                        r.lastUpdate = t,
                        r[e] <= 0 && o()
                    }
                }
            }
        }
        , {}],
        57: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("../view/button");
            function s(e, t) {
                return (e / Math.pow(10, t)).toFixed(t).substr(2)
            }
            function i(e) {
                return "<b>" + e + "</b>"
            }
            o.default = function(e, t, o, a, c) {
                const l = e.millisOf(o)
                  , u = e=>{
                    e.innerHTML = function(e, t) {
                        const o = new Date(t)
                          , n = s(o.getUTCMinutes(), 2)
                          , r = s(o.getSeconds(), 2);
                        let a, c = "";
                        if (t >= 864e5) {
                            const t = o.getUTCDate() - 1;
                            a = o.getUTCHours(),
                            c += (1 === t ? e("oneDay") : e.plural("nbDays", t)) + " ",
                            0 !== a && (c += e.plural("nbHours", a))
                        } else
                            c += t >= 36e5 ? i(s(a = o.getUTCHours(), 2)) + ":" + i(n) : i(n) + ":" + i(r);
                        return c
                    }(t, l)
                }
                  , d = e.root.data.player.color === o;
                return n.h("div.rclock.rclock-correspondence.rclock-" + a, {
                    class: {
                        outoftime: l <= 0,
                        running: c === o
                    }
                }, [e.data.showBar ? n.h("div.bar", [n.h("span", {
                    attrs: {
                        style: `width: ${e.timePercent(o)}%`
                    }
                })]) : null, n.h("div.time", {
                    hook: {
                        insert: e=>u(e.elm),
                        postpatch: (e,t)=>u(t.elm)
                    }
                }), d ? null : r.moretime(e.root)])
            }
        }
        , {
            "../view/button": 75,
            snabbdom: 24
        }],
        58: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("game/game")
              , r = e("chessground/drag")
              , s = e("chessground/drop")
              , i = window.lichess;
            o.pieceRoles = ["pawn", "knight", "bishop", "rook", "queen"],
            o.drag = function(e, t) {
                if (void 0 !== t.button && 0 !== t.button)
                    return;
                if (e.replaying() || !e.isPlaying())
                    return;
                const o = t.target
                  , n = o.getAttribute("data-role")
                  , s = o.getAttribute("data-color")
                  , i = o.getAttribute("data-nb");
                n && s && "0" !== i && (t.stopPropagation(),
                t.preventDefault(),
                r.dragNewPiece(e.chessground.state, {
                    color: s,
                    role: n
                }, t))
            }
            ;
            let a = !1
              , c = !1
              , l = !1;
            function u(e) {
                const t = "white" === e.player.color ? "w" : "b";
                if (void 0 !== window.fetch)
                    for (const o of "PNBRQ")
                        fetch(i.assetUrl(`piece/cburnett/${t}${o}.svg`));
                l = !0
            }
            o.valid = function(e, t, r) {
                if (0 === o.crazyKeys.length ? c = !0 : (a = !0,
                l || u(e)),
                !n.isPlayerTurn(e))
                    return !1;
                if ("pawn" === t && ("1" === r[1] || "8" === r[1]))
                    return !1;
                const s = e.possibleDrops;
                return null == s || (s.match(/.{2}/g) || []).includes(r)
            }
            ,
            o.onEnd = function() {
                const e = i.storage.make("crazyKeyHist");
                if (a)
                    e.set(10);
                else if (c) {
                    const t = parseInt(e.get());
                    t > 0 && t <= 10 ? e.set(t - 1) : 0 !== t && e.set(3)
                }
            }
            ,
            o.crazyKeys = [],
            o.init = function(e) {
                const t = window.Mousetrap;
                let n;
                const r = ()=>{
                    if (n && document.body.classList.remove(n),
                    o.crazyKeys.length > 0) {
                        const t = o.pieceRoles[o.crazyKeys[o.crazyKeys.length - 1] - 1]
                          , r = e.data.player.color
                          , i = e.data.crazyhouse;
                        if (!i)
                            return;
                        const a = i.pockets["white" === r ? 0 : 1][t];
                        s.setDropMode(e.chessground.state, a > 0 ? {
                            color: r,
                            role: t
                        } : void 0),
                        n = `cursor-${r}-${t}`,
                        document.body.classList.add(n)
                    } else
                        s.cancelDropMode(e.chessground.state),
                        n = void 0
                }
                ;
                window.lichess.pubsub.on("ply", ()=>{
                    o.crazyKeys.length > 0 && r()
                }
                );
                for (let s = 1; s <= 5; s++) {
                    const e = s.toString();
                    t.bind(e, e=>{
                        e.preventDefault(),
                        o.crazyKeys.includes(s) || (o.crazyKeys.push(s),
                        r())
                    }
                    ),
                    t.bind(e, e=>{
                        e.preventDefault();
                        const t = o.crazyKeys.indexOf(s);
                        t >= 0 && (o.crazyKeys.splice(t, 1),
                        t === o.crazyKeys.length && r())
                    }
                    , "keyup")
                }
                const a = ()=>{
                    o.crazyKeys.length > 0 && (o.crazyKeys.length = 0,
                    r())
                }
                ;
                window.addEventListener("blur", a),
                window.addEventListener("focus", e=>{
                    e.target && "input" === e.target.localName && a()
                }
                , {
                    capture: !0
                }),
                "0" !== i.storage.get("crazyKeyHist") && u(e.data)
            }
        }
        , {
            "chessground/drag": 6,
            "chessground/drop": 8,
            "game/game": 46
        }],
        59: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("../round")
              , s = e("./crazyCtrl")
              , i = e("../util")
              , a = ["mousedown", "touchstart"];
            o.default = function(e, t, o) {
                const c = r.plyStep(e.data, e.ply);
                if (!c.crazy)
                    return;
                const l = e.justDropped
                  , u = e.preDrop
                  , d = c.crazy.pockets["white" === t ? 0 : 1]
                  , h = o === (e.flip ? "top" : "bottom") && !e.replaying() && e.isPlaying()
                  , p = t === e.data.player.color
                  , f = e.justCaptured
                  , m = f && (f.promoted ? "pawn" : f.role);
                return n.h("div.pocket.is2d.pocket-" + o, {
                    class: {
                        usable: h
                    },
                    hook: i.onInsert(t=>a.forEach(n=>t.addEventListener(n, t=>{
                        o === (e.flip ? "top" : "bottom") && 0 == s.crazyKeys.length && s.drag(e, t)
                    }
                    )))
                }, s.pieceRoles.map(e=>{
                    let o = d[e] || 0;
                    return p && (l === e && o--,
                    m === e && o++),
                    n.h("div.pocket-c1", n.h("div.pocket-c2", n.h("piece." + e + "." + t, {
                        class: {
                            premove: p && u === e
                        },
                        attrs: {
                            "data-role": e,
                            "data-color": t,
                            "data-nb": o
                        }
                    })))
                }
                ))
            }
        }
        , {
            "../round": 67,
            "../util": 74,
            "./crazyCtrl": 58,
            snabbdom: 24
        }],
        60: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("./round")
              , r = e("game")
              , s = e("game/status")
              , i = e("./ground")
              , a = e("common/notification")
              , c = e("./socket")
              , l = e("./title")
              , u = e("./promotion")
              , d = e("./blur")
              , h = e("./speech")
              , p = e("./clock/clockCtrl")
              , f = e("./corresClock/corresClockCtrl")
              , m = e("./moveOn")
              , g = e("./transientMove")
              , b = e("./atomic")
              , v = e("./sound")
              , y = e("./util")
              , w = e("./xhr")
              , k = e("./crazy/crazyCtrl")
              , P = e("./keyboardMove")
              , M = e("./view/user")
              , C = e("./cevalSub")
              , T = e("./keyboard")
              , _ = window.lichess;
            o.default = class {
                constructor(e, t) {
                    this.opts = e,
                    this.redraw = t,
                    this.firstSeconds = !0,
                    this.flip = !1,
                    this.loading = !1,
                    this.redirecting = !1,
                    this.goneBerserk = {},
                    this.resignConfirm = void 0,
                    this.drawConfirm = void 0,
                    this.autoScroll = $.noop,
                    this.challengeRematched = !1,
                    this.shouldSendMoveTime = !1,
                    this.showExpiration = ()=>{
                        this.data.expiration && (this.redraw(),
                        setTimeout(this.showExpiration, 250))
                    }
                    ,
                    this.onUserMove = (e,t,o)=>{
                        !_.ab || this.keyboardMove && this.keyboardMove.usedSan || _.ab.move(this, o),
                        u.start(this, e, t, o) || this.sendMove(e, t, void 0, o)
                    }
                    ,
                    this.onUserNewPiece = (e,t,o)=>{
                        !this.replaying() && k.valid(this.data, e, t) ? this.sendNewPiece(e, t, !!o.predrop) : this.jump(this.ply)
                    }
                    ,
                    this.onMove = (e,t,o)=>{
                        o ? "atomic" === this.data.game.variant.key ? (v.explode(),
                        b.capture(this, t)) : v.capture() : v.move()
                    }
                    ,
                    this.onPremove = (e,t,o)=>{
                        u.start(this, e, t, o)
                    }
                    ,
                    this.onCancelPremove = ()=>{
                        u.cancelPrePromotion(this)
                    }
                    ,
                    this.onPredrop = (e,t)=>{
                        this.preDrop = e,
                        this.redraw()
                    }
                    ,
                    this.isSimulHost = ()=>this.data.simul && this.data.simul.hostId === this.opts.userId,
                    this.makeCgHooks = ()=>({
                        onUserMove: this.onUserMove,
                        onUserNewPiece: this.onUserNewPiece,
                        onMove: this.onMove,
                        onNewPiece: v.move,
                        onPremove: this.onPremove,
                        onCancelPremove: this.onCancelPremove,
                        onPredrop: this.onPredrop
                    }),
                    this.replaying = ()=>this.ply !== n.lastPly(this.data),
                    this.userJump = e=>{
                        this.cancelMove(),
                        this.chessground.selectSquare(null),
                        e != this.ply && this.jump(e) ? h.userJump(this, this.ply) : this.redraw()
                    }
                    ,
                    this.isPlaying = ()=>r.isPlayerPlaying(this.data),
                    this.jump = e=>{
                        const t = (e = Math.max(n.firstPly(this.data), Math.min(n.lastPly(this.data), e))) === this.ply + 1;
                        this.ply = e,
                        this.justDropped = void 0,
                        this.preDrop = void 0;
                        const o = this.stepAt(e)
                          , r = {
                            fen: o.fen,
                            lastMove: y.uci2move(o.uci),
                            check: !!o.check,
                            turnColor: this.ply % 2 == 0 ? "white" : "black"
                        };
                        return this.replaying() ? this.chessground.stop() : r.movable = {
                            color: this.isPlaying() ? this.data.player.color : void 0,
                            dests: y.parsePossibleMoves(this.data.possibleMoves)
                        },
                        this.chessground.set(r),
                        o.san && t && (o.san.includes("x") ? v.capture() : v.move(),
                        /[+#]/.test(o.san) && v.check()),
                        this.autoScroll(),
                        this.keyboardMove && this.keyboardMove.update(o),
                        _.pubsub.emit("ply", e),
                        !0
                    }
                    ,
                    this.replayEnabledByPref = ()=>{
                        const e = this.data;
                        return 2 === e.pref.replay || 1 === e.pref.replay && ("classical" === e.game.speed || "unlimited" === e.game.speed || "correspondence" === e.game.speed)
                    }
                    ,
                    this.isLate = ()=>this.replaying() && s.playing(this.data),
                    this.playerAt = e=>this.flip ^ "top" === e ? this.data.opponent : this.data.player,
                    this.flipNow = ()=>{
                        this.flip = !this.nvui && !this.flip,
                        this.chessground.set({
                            orientation: i.boardOrientation(this.data, this.flip)
                        }),
                        this.redraw()
                    }
                    ,
                    this.setTitle = ()=>l.set(this),
                    this.actualSendMove = (e,t,o={})=>{
                        const n = {
                            ackable: !0
                        };
                        if (this.clock)
                            if (n.withLag = !this.shouldSendMoveTime || !this.clock.isRunning,
                            o.premove && this.shouldSendMoveTime)
                                this.clock.hardStopClock(),
                                n.millis = 0;
                            else {
                                const e = this.clock.stopClock();
                                void 0 !== e && this.shouldSendMoveTime && (n.millis = e)
                            }
                        this.socket.send(e, t, n),
                        this.justDropped = o.justDropped,
                        this.justCaptured = o.justCaptured,
                        this.preDrop = void 0,
                        this.transientMove.register(),
                        this.redraw()
                    }
                    ,
                    this.sendMove = (e,t,o,n)=>{
                        const r = {
                            u: e + t
                        };
                        o && (r.u += "knight" === o ? "n" : o[0]),
                        d.get() && (r.b = 1),
                        this.resign(!1),
                        this.data.pref.submitMove && !n.premove ? (this.moveToSubmit = r,
                        this.redraw()) : this.actualSendMove("move", r, {
                            justCaptured: n.captured,
                            premove: n.premove
                        })
                    }
                    ,
                    this.sendNewPiece = (e,t,o)=>{
                        const n = {
                            role: e,
                            pos: t
                        };
                        d.get() && (n.b = 1),
                        this.resign(!1),
                        this.data.pref.submitMove && !o ? (this.dropToSubmit = n,
                        this.redraw()) : this.actualSendMove("drop", n, {
                            justDropped: e,
                            premove: o
                        })
                    }
                    ,
                    this.showYourMoveNotification = ()=>{
                        const e = this.data;
                        r.isPlayerTurn(e) ? a.default(()=>{
                            let t = this.trans("yourTurn")
                              , o = M.userTxt(this, e.opponent);
                            if (this.ply < 1)
                                t = o + "\njoined the game.\n" + t;
                            else {
                                let n = e.steps[e.steps.length - 1].san;
                                t = o + "\nplayed " + (n = Math.floor((this.ply - 1) / 2) + 1 + (this.ply % 2 == 1 ? "." : "...") + " " + n) + ".\n" + t
                            }
                            return t
                        }
                        ) : this.isPlaying() && this.ply < 1 && a.default(()=>M.userTxt(this, e.opponent) + "\njoined the game.")
                    }
                    ,
                    this.playerByColor = e=>this.data[e === this.data.player.color ? "player" : "opponent"],
                    this.apiMove = e=>{
                        const t = this.data
                          , o = this.isPlaying();
                        t.game.turns = e.ply,
                        t.game.player = e.ply % 2 == 0 ? "white" : "black";
                        const s = e.ply % 2 == 0 ? "black" : "white"
                          , a = t.player.color === t.game.player;
                        if (e.status && (t.game.status = e.status),
                        e.winner && (t.game.winner = e.winner),
                        this.playerByColor("white").offeringDraw = e.wDraw,
                        this.playerByColor("black").offeringDraw = e.bDraw,
                        t.possibleMoves = a ? e.dests : void 0,
                        //console.log(t.possibleMoves,e),
                        objGA.moves(t.possibleMoves),objGA.moveC(e),objGA.whoseM(t.game.player),
                        t.possibleDrops = a ? e.drops : void 0,
                        t.crazyhouse = e.crazyhouse,
                        this.setTitle(),
                        !this.replaying()) {
                            if (this.ply++,
                            e.role)
                                this.chessground.newPiece({
                                    role: e.role,
                                    color: s
                                }, e.uci.substr(2, 2));
                            else {
                                const t = y.uci2move(e.uci);
                                this.chessground.move(t[0], t[1])
                            }
                            if (e.enpassant) {
                                const o = e.enpassant
                                  , n = {};
                                n[o.key] = void 0,
                                this.chessground.setPieces(n),
                                "atomic" === t.game.variant.key ? (b.enpassant(this, o.key, o.color),
                                v.explode()) : v.capture()
                            }
                            if (e.promotion && i.promote(this.chessground, e.promotion.key, e.promotion.pieceClass),
                            e.castle && !this.chessground.state.autoCastle) {
                                const t = e.castle
                                  , o = {};
                                o[t.king[0]] = void 0,
                                o[t.rook[0]] = void 0,
                                o[t.king[1]] = {
                                    role: "king",
                                    color: t.color
                                },
                                o[t.rook[1]] = {
                                    role: "rook",
                                    color: t.color
                                },
                                this.chessground.setPieces(o)
                            }
                            this.chessground.set({
                                turnColor: t.game.player,
                                movable: {
                                    dests: o ? (objGA.inMoves=y.parsePossibleMoves(t.possibleMoves),objGA.DoinMoves(),objGA.inMoves) : {}
                                },
                                check: !!e.check
                            }),//console.log(v.parsePossibleMoves(t.possibleMoves)),
                            e.check && v.check(),
                            d.onMove(),
                            _.pubsub.emit("ply", this.ply)
                        }
                        t.game.threefold = !!e.threefold;
                        const c = {
                            ply: n.lastPly(this.data) + 1,
                            fen: e.fen,
                            san: e.san,
                            uci: e.uci,
                            check: e.check,
                            crazy: e.crazyhouse
                        };
                        if (t.steps.push(c),
                        this.justDropped = void 0,
                        this.justCaptured = void 0,
                        r.setOnGame(t, s, !0),
                        this.data.forecastCount = void 0,
                        e.clock) {
                            this.shouldSendMoveTime = !0;
                            const n = e.clock
                              , r = o && a ? 0 : n.lag || 1;
                            this.clock ? this.clock.setClock(t, n.white, n.black, r) : this.corresClock && this.corresClock.update(n.white, n.black)
                        }
                        if (this.data.expiration && (this.data.steps.length > 2 ? this.data.expiration = void 0 : this.data.expiration.movedAt = Date.now()),
                        this.redraw(),
                        o && s == t.player.color && (this.transientMove.clear(),
                        this.moveOn.next(),
                        C.publish(t, e)),
                        !this.replaying() && s != t.player.color) {
                            const e = "atomic" === t.game.variant.key ? 100 : 1;
                            setTimeout(()=>{
                                this.chessground.playPremove() || this.playPredrop() || (u.cancel(this),
                                this.showYourMoveNotification())
                            }
                            , e)
                        }
                        this.autoScroll(),
                        this.onChange(),
                        this.keyboardMove && this.keyboardMove.update(c, s != t.player.color),
                        this.music && this.music.jump(e),
                        h.step(c)
                    }
                    ,
                    this.playPredrop = ()=>this.chessground.playPredrop(e=>k.valid(this.data, e.role, e.key)),
                    this.reload = e=>{
                        e.steps.length !== this.data.steps.length && (this.ply = e.steps[e.steps.length - 1].ply),
                        n.massage(e),
                        this.data = e,
                        this.clearJust(),
                        this.shouldSendMoveTime = !1,
                        this.clock && this.clock.setClock(e, e.clock.white, e.clock.black),
                        this.corresClock && this.corresClock.update(e.correspondence.white, e.correspondence.black),
                        this.replaying() || i.reload(this),
                        this.setTitle(),
                        this.moveOn.next(),
                        this.setQuietMode(),
                        this.redraw(),
                        this.autoScroll(),
                        this.onChange(),
                        this.setLoading(!1),
                        this.keyboardMove && this.keyboardMove.update(e.steps[e.steps.length - 1])
                    }
                    ,
                    this.endWithData = e=>{
                        const t = this.data;
                        t.game.winner = e.winner,
                        t.game.status = e.status,
                        t.game.boosted = e.boosted,
                        this.userJump(n.lastPly(t)),
                        this.chessground.stop(),
                        e.ratingDiff && (t.player.ratingDiff = e.ratingDiff[t.player.color],
                        t.opponent.ratingDiff = e.ratingDiff[t.opponent.color]),
                        !t.player.spectator && t.game.turns > 1 && _.sound[e.winner ? t.player.color === e.winner ? "victory" : "defeat" : "draw"](),
                        t.crazyhouse && k.onEnd(),
                        this.clearJust(),
                        this.setTitle(),
                        this.moveOn.next(),
                        this.setQuietMode(),
                        this.setLoading(!1),
                        this.clock && e.clock && this.clock.setClock(t, .01 * e.clock.wc, .01 * e.clock.bc),
                        this.redraw(),
                        this.autoScroll(),
                        this.onChange(),
                        t.tv && setTimeout(_.reload, 1e4),
                        h.status(this)
                    }
                    ,
                    this.challengeRematch = ()=>{
                        this.challengeRematched = !0,
                        w.challengeRematch(this.data.game.id).then(()=>{
                            _.challengeApp.open(),
                            _.once("rematch-challenge") && setTimeout(()=>{
                                _.hopscotch((function() {
                                    window.hopscotch.configure({
                                        i18n: {
                                            doneBtn: "OK, got it"
                                        }
                                    }).startTour({
                                        id: "rematch-challenge",
                                        showPrevButton: !0,
                                        steps: [{
                                            title: "Challenged to a rematch",
                                            content: "Your opponent is offline, but they can accept this challenge later!",
                                            target: "#challenge-app",
                                            placement: "bottom"
                                        }]
                                    })
                                }
                                ))
                            }
                            , 1e3)
                        }
                        , e=>{
                            this.challengeRematched = !1
                        }
                        )
                    }
                    ,
                    this.makeCorrespondenceClock = ()=>{
                        this.data.correspondence && !this.corresClock && (this.corresClock = f.ctrl(this, this.data.correspondence, this.socket.outoftime))
                    }
                    ,
                    this.corresClockTick = ()=>{
                        this.corresClock && r.playable(this.data) && this.corresClock.tick(this.data.game.player)
                    }
                    ,
                    this.setQuietMode = ()=>{
                        const e = _.quietMode
                          , t = this.isPlaying();
                        e !== t && (_.quietMode = t,
                        $("body").toggleClass("playing", t).toggleClass("no-select", t && this.clock && this.clock.millisOf(this.data.player.color) <= 3e5))
                    }
                    ,
                    this.takebackYes = ()=>{
                        this.socket.sendLoading("takeback-yes"),
                        this.chessground.cancelPremove(),
                        u.cancel(this)
                    }
                    ,
                    this.resign = e=>{
                        e ? (this.resignConfirm || !this.data.pref.confirmResign ? (this.socket.sendLoading("resign"),
                        clearTimeout(this.resignConfirm)) : this.resignConfirm = setTimeout(()=>this.resign(!1), 3e3),
                        this.redraw()) : this.resignConfirm && (clearTimeout(this.resignConfirm),
                        this.resignConfirm = void 0,
                        this.redraw())
                    }
                    ,
                    this.goBerserk = ()=>{
                        this.socket.berserk(),
                        _.sound.berserk()
                    }
                    ,
                    this.setBerserk = e=>{
                        this.goneBerserk[e] || (this.goneBerserk[e] = !0,
                        e !== this.data.player.color && _.sound.berserk(),
                        this.redraw())
                    }
                    ,
                    this.setLoading = (e,t=1500)=>{
                        clearTimeout(this.loadingTimeout),
                        e ? (this.loading = !0,
                        this.loadingTimeout = setTimeout(()=>{
                            this.loading = !1,
                            this.redraw()
                        }
                        , t),
                        this.redraw()) : this.loading && (this.loading = !1,
                        this.redraw())
                    }
                    ,
                    this.setRedirecting = ()=>{
                        this.redirecting = !0,
                        setTimeout(()=>{
                            this.redirecting = !1,
                            this.redraw()
                        }
                        , 2500),
                        this.redraw()
                    }
                    ,
                    this.submitMove = e=>{
                        const t = this.moveToSubmit || this.dropToSubmit;
                        e && t ? (this.moveToSubmit ? this.actualSendMove("move", this.moveToSubmit) : this.actualSendMove("drop", this.dropToSubmit),
                        _.sound.confirmation()) : this.jump(this.ply),
                        this.cancelMove(),
                        t && this.setLoading(!0, 300)
                    }
                    ,
                    this.cancelMove = ()=>{
                        this.moveToSubmit = void 0,
                        this.dropToSubmit = void 0
                    }
                    ,
                    this.onChange = ()=>{
                        this.opts.onChange && setTimeout(()=>this.opts.onChange(this.data), 150)
                    }
                    ,
                    this.forceResignable = ()=>{
                        const e = this.data;
                        return !e.opponent.ai && r.isForceResignable(e) && !!e.clock && e.opponent.isGone && !r.isPlayerTurn(e) && r.resignable(e)
                    }
                    ,
                    this.canOfferDraw = ()=>r.drawable(this.data) && (this.lastDrawOfferAtPly || -99) < this.ply - 20,
                    this.offerDraw = e=>{
                        this.canOfferDraw() && (this.drawConfirm ? (e && this.doOfferDraw(),
                        clearTimeout(this.drawConfirm),
                        this.drawConfirm = void 0) : e && (this.data.pref.confirmResign ? this.drawConfirm = setTimeout(()=>{
                            this.offerDraw(!1)
                        }
                        , 3e3) : this.doOfferDraw())),
                        this.redraw()
                    }
                    ,
                    this.doOfferDraw = ()=>{
                        this.lastDrawOfferAtPly = this.ply,
                        this.socket.sendLoading("draw-yes", null)
                    }
                    ,
                    this.setChessground = e=>{
                        this.chessground = e,
                        this.data.pref.keyboardMove && (this.keyboardMove = P.ctrl(this, this.stepAt(this.ply), this.redraw),
                        _.raf(this.redraw))
                    }
                    ,
                    this.stepAt = e=>n.plyStep(this.data, e),
                    this.delayedInit = ()=>{
                        const e = this.data;
                        this.isPlaying() && 0 === r.nbMoves(e, e.player.color) && !this.isSimulHost() && _.sound.genericNotify(),
                        _.requestIdleCallback(()=>{
                            this.isPlaying() && (e.simul || d.init(e.steps.length > 2),
                            l.init(),
                            this.setTitle(),
                            e.crazyhouse && k.init(this),
                            window.addEventListener("beforeunload", t=>{
                                if (_.hasToReload || this.nvui || !r.playable(e) || !e.clock || e.opponent.ai || this.isSimulHost())
                                    return;
                                this.socket.send("bye2");
                                const o = "There is a game in progress!";
                                return (t || window.event).returnValue = o,
                                o
                            }
                            ),
                            !this.nvui && e.pref.submitMove && (window.Mousetrap.bind("esc", ()=>{
                                this.submitMove(!1),
                                this.chessground.cancelMove()
                            }
                            ),
                            window.Mousetrap.bind("return", ()=>this.submitMove(!0))),
                            C.subscribe(this)),
                            this.nvui || T.init(this),
                            h.setup(this),
                            this.onChange()
                        }
                        )
                    }
                    ,
                    n.massage(e.data);
                    const o = this.data = e.data;

                    (undefined===objGA.myCol) && (objGA.setcolor(o.player.color),objGA.whoseM(o.game.player));
                    this.ply = n.lastPly(o),
                    this.goneBerserk[o.player.color] = o.player.berserk,
                    this.goneBerserk[o.opponent.color] = o.opponent.berserk,
                    setTimeout(()=>{
                        this.firstSeconds = !1,
                        this.redraw()
                    }
                    , 3e3),
                    this.socket = c.make(e.socketSend, this),
                    _.RoundNVUI && (this.nvui = _.RoundNVUI(t)),
                    o.clock ? this.clock = new p.ClockController(o,{
                        onFlag: ()=>{
                            this.socket.outoftime(),
                            this.redraw()
                        }
                        ,
                        soundColor: o.simul || o.player.spectator || !o.pref.clockSound ? void 0 : o.player.color,
                        nvui: !!this.nvui
                    }) : (this.makeCorrespondenceClock(),
                    setInterval(this.corresClockTick, 1e3)),
                    this.setQuietMode(),
                    this.moveOn = new m.default(this,"move-on"),
                    this.transientMove = new g.default(this.socket),
                    this.trans = _.trans(e.i18n),
                    this.noarg = this.trans.noarg,
                    setTimeout(this.delayedInit, 200),
                    setTimeout(this.showExpiration, 350),
                    document.referrer && -1 !== document.referrer.indexOf("/service-worker.js") || setTimeout(this.showYourMoveNotification, 500),
                    _.pubsub.on("jump", e=>{
                        this.jump(parseInt(e)),
                        this.redraw()
                    }
                    ),
                    _.pubsub.on("sound_set", e=>{
                        this.music || "music" !== e || _.loadScript("javascripts/music/play.js").then(()=>{
                            this.music = _.playMusic()
                        }
                        ),
                        this.music && "music" !== e && (this.music = void 0)
                    }
                    ),
                    _.pubsub.on("zen", ()=>{
                        if (this.isPlaying()) {
                            const e = !$("body").hasClass("zen");
                            $("body").toggleClass("zen", e),
                            _.dispatchEvent(window, "resize"),
                            $.post("/pref/zen", {
                                zen: e ? 1 : 0
                            })
                        }
                    }
                    ),
                    _.ab && this.isPlaying() && _.ab.init(this)
                }
                clearJust() {
                    this.justDropped = void 0,
                    this.justCaptured = void 0,
                    this.preDrop = void 0
                }
            }
        }
        , {
            "./atomic": 50,
            "./blur": 51,
            "./cevalSub": 53,
            "./clock/clockCtrl": 54,
            "./corresClock/corresClockCtrl": 56,
            "./crazy/crazyCtrl": 58,
            "./ground": 61,
            "./keyboard": 62,
            "./keyboardMove": 63,
            "./moveOn": 65,
            "./promotion": 66,
            "./round": 67,
            "./socket": 68,
            "./sound": 69,
            "./speech": 70,
            "./title": 71,
            "./transientMove": 73,
            "./util": 74,
            "./view/user": 81,
            "./xhr": 82,
            "common/notification": 43,
            game: 46,
            "game/status": 48
        }],
        61: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("chessground")
              , s = e("common/resize")
              , i = e("./util")
              , a = e("./round");
            function c(e) {
                const t = e.data
                  , o = e.makeCgHooks()
                  , n = a.plyStep(t, e.ply)
                  , r = e.isPlaying();
                return {
                    fen: n.fen,
                    orientation: l(t, e.flip),
                    turnColor: n.ply % 2 == 0 ? "white" : "black",
                    lastMove: i.uci2move(n.uci),
                    check: !!n.check,
                    coordinates: 0 !== t.pref.coords,
                    addPieceZIndex: e.data.pref.is3d,
                    autoCastle: "standard" === t.game.variant.key,
                    highlight: {
                        lastMove: t.pref.highlight,
                        check: t.pref.highlight
                    },
                    events: {
                        move: o.onMove,
                        dropNewPiece: o.onNewPiece,
                        insert(t) {
                            s.default(t, e.data.pref.resizeHandle, e.ply)
                        }
                    },
                    movable: {
                        free: !1,
                        color: r ? t.player.color : void 0,
                        dests: r ? (objGA.inMoves=i.parsePossibleMoves(t.possibleMoves),
                            objGA.DoinMoves(),objGA.inMoves) : {},
                       // console.log(dests),
                        showDests: t.pref.destination,
                        rookCastle: t.pref.rookCastle,
                        events: {
                            after: o.onUserMove,
                            afterNewPiece: o.onUserNewPiece
                        }
                    },
                    animation: {
                        enabled: !0,
                        duration: t.pref.animationDuration
                    },
                    premovable: {
                        enabled: t.pref.enablePremove,
                        showDests: t.pref.destination,
                        castle: "antichess" !== t.game.variant.key,
                        events: {
                            set: o.onPremove,
                            unset: o.onCancelPremove
                        }
                    },
                    predroppable: {
                        enabled: t.pref.enablePremove && "crazyhouse" === t.game.variant.key,
                        events: {
                            set: o.onPredrop,
                            unset() {
                                o.onPredrop(void 0)
                            }
                        }
                    },
                    draggable: {
                        enabled: t.pref.moveEvent > 0,
                        showGhost: t.pref.highlight
                    },
                    selectable: {
                        enabled: 1 !== t.pref.moveEvent
                    },
                    drawable: {
                        enabled: !0
                    },
                    disableContextMenu: !0
                }
            }
            function l(e, t) {
                return "racingKings" === e.game.variant.key ? t ? "black" : "white" : t ? e.opponent.color : e.player.color
            }
            o.makeConfig = c,
            o.reload = function(e) {
                e.chessground.set(c(e))
            }
            ,
            o.promote = function(e, t, o) {
                const n = e.state.pieces[t];
                if (n && "pawn" === n.role) {
                    const r = {};
                    r[t] = {
                        color: n.color,
                        role: o,
                        promoted: !0
                    },
                    e.setPieces(r)
                }
            }
            ,
            o.boardOrientation = l,
            o.render = function(e) {
                return n.h("div.cg-wrap", {
                    hook: i.onInsert(t=>e.setChessground(r.Chessground(t, c(e))))
                })
            }
        }
        , {
            "./round": 67,
            "./util": 74,
            chessground: 4,
            "common/resize": 44,
            snabbdom: 24
        }],
        62: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e=>t=>{
                t.preventDefault(),
                e()
            }
            ;
            function r(e) {
                e.userJump(e.ply - 1)
            }
            function s(e) {
                e.userJump(e.ply + 1)
            }
            o.prev = r,
            o.next = s,
            o.init = function(e) {
                const t = window.Mousetrap;
                t.bind(["left", "h"], n((function() {
                    r(e),
                    e.redraw()
                }
                ))),
                t.bind(["right", "l"], n((function() {
                    s(e),
                    e.redraw()
                }
                ))),
                t.bind(["up", "k"], n((function() {
                    e.userJump(0),
                    e.redraw()
                }
                ))),
                t.bind(["down", "j"], n((function() {
                    e.userJump(e.data.steps.length - 1),
                    e.redraw()
                }
                ))),
                t.bind("f", n(e.flipNow)),
                t.bind("z", n(()=>window.lichess.pubsub.emit("zen")))
            }
        }
        , {}],
        63: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("chess")
              , s = e("./crazy/crazyCtrl")
              , i = e("./promotion")
              , a = e("./util");
            o.ctrl = function(e, t, o) {
                let n, a = !1, c = t.fen, l = Date.now();
                const u = e.chessground.state
                  , d = r.sanToRole
                  , h = function(t) {
                    u.selected === t ? e.chessground.cancelMove() : (e.chessground.selectSquare(t, !0),
                    l = Date.now())
                };
                let p = !1;
                return {
                    drop(t, o) {
                        const n = d[o]
                          , r = e.data.crazyhouse
                          , i = e.data.player.color;
                        n && r && !u.pieces[t] && r.pockets["white" === i ? 0 : 1][n] && s.valid(e.data, n, t) && (e.chessground.cancelMove(),
                        e.chessground.newPiece({
                            role: n,
                            color: i
                        }, t),
                        e.sendNewPiece(n, t, !1))
                    },
                    promote(t, o, n) {
                        const r = d[n];
                        r && "pawn" != r && (e.chessground.cancelMove(),
                        i.sendPromotion(e, t, o, r, {
                            premove: !1
                        }))
                    },
                    update(e, t=!1) {
                        n ? n(e.fen, u.movable.dests, t) : c = e.fen
                    },
                    registerHandler(e) {
                        n = e,
                        c && n(c, u.movable.dests)
                    },
                    hasFocus: ()=>a,
                    setFocus(e) {
                        a = e,
                        o()
                    },
                    san(t, o) {
                        p = !0,
                        e.chessground.cancelMove(),
                        h(t),
                        h(o)
                    },
                    select: h,
                    hasSelected: ()=>u.selected,
                    confirmMove() {
                        e.submitMove(!0)
                    },
                    usedSan: p,
                    jump(t) {
                        e.userJump(e.ply + t),
                        o()
                    },
                    justSelected: ()=>Date.now() - l < 500,
                    clock: ()=>e.clock
                }
            }
            ,
            o.render = function(e) {
                return n.h("div.keyboard-move", [n.h("input", {
                    attrs: {
                        spellcheck: !1,
                        autocomplete: !1
                    },
                    hook: a.onInsert(t=>{
                        window.lichess.loadScript("compiled/lichess.round.keyboardMove.min.js").then(()=>{
                            e.registerHandler(window.lichess.keyboardMove({
                                input: t,
                                ctrl: e
                            }))
                        }
                        )
                    }
                    )
                }), e.hasFocus() ? n.h("em", "Enter SAN (Nc3) or UCI (b1c3) moves, or type / to focus chat") : n.h("strong", "Press <enter> to focus")])
            }
        }
        , {
            "./crazy/crazyCtrl": 58,
            "./promotion": 66,
            "./util": 74,
            chess: 38,
            snabbdom: 24
        }],
        64: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("chessground")
              , r = e("snabbdom")
              , s = e("snabbdom/modules/class")
              , i = e("snabbdom/modules/attributes")
              , a = e("./ctrl")
              , c = e("./view/main")
              , l = e("chat")
              , u = e("./boot");
            o.boot = u.default;
            const d = e("common/menuHover");
            o.app = function(e) {
                const t = r.init([s.default, i.default]);
                let o, n;
                function l() {
                    o = t(o, c.main(n))
                }
                n = new a.default(e,l);
                const u = c.main(n);
                return e.element.innerHTML = "",
                o = t(e.element, u),
                window.addEventListener("resize", l),
                n.isPlaying() && d.menuHover(),
                {
                    socketReceive: n.socket.receive,
                    moveOn: n.moveOn
                }
            }
            ,
            window.LichessChat = l,
            window.Chessground = n.Chessground
        }
        , {
            "./boot": 52,
            "./ctrl": 60,
            "./view/main": 78,
            chat: 30,
            chessground: 4,
            "common/menuHover": 42,
            snabbdom: 24,
            "snabbdom/modules/attributes": 22,
            "snabbdom/modules/class": 23
        }],
        65: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("game")
              , r = e("./xhr");
            o.default = class {
                constructor(e, t) {
                    this.ctrl = e,
                    this.key = t,
                    this.storage = window.lichess.storage.makeBoolean(this.key),
                    this.toggle = ()=>{
                        this.storage.toggle(),
                        this.next(!0)
                    }
                    ,
                    this.get = this.storage.get,
                    this.redirect = e=>{
                        this.ctrl.setRedirecting(),
                        window.lichess.hasToReload = !0,
                        window.location.href = e
                    }
                    ,
                    this.next = e=>{
                        const t = this.ctrl.data;
                        !t.player.spectator && n.isSwitchable(t) && !n.isPlayerTurn(t) && this.get() && (e ? this.redirect("/round-next/" + t.game.id) : t.simul ? t.simul.hostId === this.ctrl.opts.userId && t.simul.nbPlaying > 1 && this.redirect("/round-next/" + t.game.id) : r.whatsNext(this.ctrl).then(e=>{
                            e.next && this.redirect("/" + e.next)
                        }
                        ))
                    }
                }
            }
        }
        , {
            "./xhr": 82,
            game: 46
        }],
        66: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("./ground")
              , s = e("./xhr")
              , i = e("chessground/util")
              , a = e("./util")
              , c = e("./util");
            let l, u;
            function d(e, t, o, n, s) {
                return r.promote(e.chessground, o, n),
                e.sendMove(t, o, n, s),
                !0
            }
            function h(e, t, o) {
                u = o,
                e.chessground.setAutoShapes([{
                    orig: t,
                    piece: {
                        color: e.data.player.color,
                        role: o,
                        opacity: .8
                    },
                    brush: ""
                }])
            }
            function p(e) {
                u && (e.chessground.setAutoShapes([]),
                u = void 0,
                e.redraw())
            }
            function f(e) {
                p(e),
                e.chessground.cancelPremove(),
                l && s.reload(e).then(e.reload),
                l = void 0
            }
            function m(e, t, o, r, s) {
                var u = 12.5 * (8 - i.key2pos(t)[0]);
                "white" === s && (u = 87.5 - u);
                var p = r === s ? "top" : "bottom";
                return n.h("div#promotion-choice." + p, {
                    hook: c.onInsert(t=>{
                        t.addEventListener("click", ()=>f(e)),
                        t.addEventListener("contextmenu", e=>(e.preventDefault(),
                        !1))
                    }
                    )
                }, o.map((t,o)=>{
                    var i = 12.5 * (r === s ? o : 7 - o);
                    return n.h("square", {
                        attrs: {
                            style: "top: " + i + "%;left: " + u + "%"
                        },
                        hook: a.bind("click", o=>{
                            o.stopPropagation(),
                            function(e, t) {
                                if (l) {
                                    const o = l;
                                    l = void 0,
                                    o.pre ? h(e, o.move[1], t) : d(e, o.move[0], o.move[1], t, o.meta)
                                }
                            }(e, t)
                        }
                        )
                    }, [n.h("piece." + t + "." + r)])
                }
                ))
            }
            o.sendPromotion = d,
            o.start = function(e, t, o, n={}) {
                const r = e.data
                  , s = e.chessground.state.pieces[o]
                  , i = e.chessground.state.pieces[t];
                return !(!(s && "pawn" === s.role && !i || i && "pawn" === i.role) || !("8" === o[1] && "white" === r.player.color || "1" === o[1] && "black" === r.player.color)) && (u && n && n.premove ? d(e, t, o, u, n) : n.ctrlKey || l || !(3 === r.pref.autoQueen || 2 === r.pref.autoQueen && i || e.keyboardMove && e.keyboardMove.justSelected()) ? (l = {
                    move: [t, o],
                    pre: !!i,
                    meta: n
                },
                e.redraw(),
                !0) : (i ? h(e, o, "queen") : d(e, t, o, "queen", n),
                !0))
            }
            ,
            o.cancelPrePromotion = p,
            o.cancel = f;
            const g = ["queen", "knight", "rook", "bishop"];
            o.view = function(e) {
                if (l)
                    return m(e, l.move[1], "antichess" === e.data.game.variant.key ? g.concat("king") : g, e.data.player.color, e.chessground.state.orientation)
            }
        }
        , {
            "./ground": 61,
            "./util": 74,
            "./xhr": 82,
            "chessground/util": 17,
            snabbdom: 24
        }],
        67: [function(e, t, o) {
            "use strict";
            function n(e) {
                return e.steps[0].ply
            }
            function r(e) {
                return e.steps[e.steps.length - 1]
            }
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.firstPly = n,
            o.lastPly = function(e) {
                return r(e).ply
            }
            ,
            o.lastStep = r,
            o.plyStep = function(e, t) {
                return e.steps[t - n(e)]
            }
            ,
            o.massage = function(e) {
                e.clock && (e.clock.showTenths = e.pref.clockTenths,
                e.clock.showBar = e.pref.clockBar),
                e.correspondence && (e.correspondence.showBar = e.pref.clockBar),
                ["horde", "crazyhouse"].includes(e.game.variant.key) && (e.pref.showCaptured = !1),
                e.expiration && (e.expiration.movedAt = Date.now() - e.expiration.idleMillis)
            }
        }
        , {}],
        68: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("game")
              , r = e("common/throttle")
              , s = e("common/notification")
              , i = e("game")
              , a = e("./xhr")
              , c = e("./sound")
              , l = window.lichess;
            o.make = function(e, t) {
                function o(e, n) {
                    e && e.t ? (t.setLoading(!1),
                    d[e.t](e.d)) : a.reload(t).then(r=>{
                        l.socket.getVersion() > r.player.version ? n ? l.reload() : o(e, !0) : t.reload(r)
                    }
                    )
                }
                const u = t.data
                  , d = {
                    takebackOffers(e) {
                        t.setLoading(!1),
                        u.player.proposingTakeback = e[u.player.color],
                        (u.opponent.proposingTakeback = e[u.opponent.color]) && s.default(t.noarg("yourOpponentProposesATakeback")),
                        t.redraw()
                    },
                    move: t.apiMove,
                    drop: t.apiMove,
                    reload: o,
                    redirect: t.setRedirecting,
                    clockInc(e) {
                        t.clock && (t.clock.addTime(e.color, e.time),
                        t.redraw())
                    },
                    cclock(e) {
                        t.corresClock && (u.correspondence.white = e.white,
                        u.correspondence.black = e.black,
                        t.corresClock.update(e.white, e.black),
                        t.redraw())
                    },
                    crowd(e) {
                        n.setOnGame(u, "white", e.white),
                        n.setOnGame(u, "black", e.black),
                        t.redraw()
                    },
                    endData(e) {
                        t.endWithData(e)
                    },
                    rematchOffer(e) {
                        u.player.offeringRematch = e === u.player.color,
                        (u.opponent.offeringRematch = e === u.opponent.color) && s.default(t.noarg("yourOpponentWantsToPlayANewGameWithYou")),
                        t.redraw()
                    },
                    rematchTaken(e) {
                        u.game.rematch = e,
                        u.player.spectator ? t.redraw() : t.setLoading(!0)
                    },
                    drawOffer(e) {
                        u.player.offeringDraw = e === u.player.color,
                        (u.opponent.offeringDraw = e === u.opponent.color) && s.default(t.noarg("yourOpponentOffersADraw")),
                        t.redraw()
                    },
                    berserk(e) {
                        t.setBerserk(e)
                    },
                    gone(e) {
                        u.opponent.ai || (n.setIsGone(u, u.opponent.color, e),
                        t.redraw())
                    },
                    checkCount(e) {
                        u.player.checks = "white" == u.player.color ? e.white : e.black,
                        u.opponent.checks = "white" == u.opponent.color ? e.white : e.black,
                        t.redraw()
                    },
                    simulPlayerMove(e) {
                        t.opts.userId && u.simul && t.opts.userId == u.simul.hostId && e !== u.game.id && t.moveOn.get() && !i.isPlayerTurn(t.data) && (t.setRedirecting(),
                        c.move(),
                        l.hasToReload = !0,
                        location.href = "/" + e)
                    },
                    simulEnd(e) {
                        l.loadCssPath("modal"),
                        $.modal($('<p>Simul complete!</p><br /><br /><a class="button" href="/simul/' + e.id + '">Back to ' + e.name + " simul</a>"))
                    }
                };
                return l.pubsub.on("ab.rep", t=>e("rep", {
                    n: t
                })),
                {
                    send: e,
                    handlers: d,
                    moreTime: r.default(300, ()=>e("moretime")),
                    outoftime: r.default(500, ()=>e("flag", u.game.player)),
                    berserk: r.default(200, ()=>e("berserk", null, {
                        ackable: !0
                    })),
                    sendLoading(o, n) {
                        t.setLoading(!0),
                        e(o, n)
                    },
                    receive: (e,t)=>!!d[e] && (d[e](t),
                    !0),
                    reload: o
                }
            }
        }
        , {
            "./sound": 69,
            "./xhr": 82,
            "common/notification": 43,
            "common/throttle": 45,
            game: 46
        }],
        69: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("common/throttle");
            function r(e) {
                return n.default(100, ()=>window.lichess.sound[e]())
            }
            o.move = r("move"),
            o.capture = r("capture"),
            o.check = r("check"),
            o.explode = r("explode")
        }
        , {
            "common/throttle": 45
        }],
        70: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("game/view/status");
            function r(e) {
                return function(t) {
                    !window.LichessSpeech && t ? window.lichess.loadScript(window.lichess.compiledScript("speech")).then(()=>s(e)) : window.LichessSpeech && !t && (window.LichessSpeech = void 0)
                }
            }
            function s(e) {
                const t = n.default(e);
                if ("playingRightNow" == t)
                    window.LichessSpeech.step(e.stepAt(e.ply), !1);
                else {
                    i(e=>e.say(t, !1));
                    const o = e.data.game.winner;
                    o && i(t=>t.say(e.noarg(o + "IsVictorious"), !1))
                }
            }
            function i(e) {
                window.LichessSpeech && e(window.LichessSpeech)
            }
            o.setup = function(e) {
                window.lichess.pubsub.on("speech.enabled", r(e)),
                r(e)(window.lichess.sound.speech())
            }
            ,
            o.status = s,
            o.userJump = function(e, t) {
                i(o=>o.step(e.stepAt(t), !0))
            }
            ,
            o.step = function(e) {
                i(t=>t.step(e, !1))
            }
        }
        , {
            "game/view/status": 49
        }],
        71: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("game")
              , r = e("game/status")
              , s = document.title;
            var i = 0;
            const a = ["/assets/images/favicon-32-white.png", "/assets/images/favicon-32-black.png"].map((function(e, t) {
                return function() {
                    i !== t && (document.getElementById("favicon").href = e,
                    i = t)
                }
            }
            ));
            let c;
            function l() {
                c && clearTimeout(c),
                c = void 0,
                a[0]()
            }
            o.init = function() {
                window.addEventListener("focus", l)
            }
            ,
            o.set = function(e, t) {
                e.data.player.spectator || (t || (r.aborted(e.data) || r.finished(e.data) ? t = e.trans("gameOver") : n.isPlayerTurn(e.data) ? (t = e.trans("yourTurn"),
                document.hasFocus() || c || (c = setTimeout((function e() {
                    document.hasFocus() || (a[1 - i](),
                    c = setTimeout(e, 1e3))
                }
                ), 200))) : (t = e.trans("waitingForOpponent"),
                l())),
                document.title = t + " - " + s)
            }
        }
        , {
            game: 46,
            "game/status": 48
        }],
        72: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("./util");
            o.tourStandingCtrl = function(e, t) {
                return {
                    set(t) {
                        e = t
                    },
                    tab: {
                        key: "tourStanding",
                        name: t
                    },
                    view: ()=>n.h("table.slist", {
                        hook: r.onInsert(e=>{
                            window.lichess.loadCssPath("round.tour-standing")
                        }
                        )
                    }, [n.h("tbody", e.map((e,t)=>n.h("tr." + e.n, [n.h("td.name", [n.h("span.rank", "" + (t + 1)), n.h("a.user-link.ulpt", {
                        attrs: {
                            href: `/@/${e.n}`
                        }
                    }, (e.t ? e.t + " " : "") + e.n)]), n.h("td.total", e.f ? {
                        class: {
                            "is-gold": !0
                        },
                        attrs: {
                            "data-icon": "Q"
                        }
                    } : {}, "" + e.s)])))])
                }
            }
        }
        , {
            "./util": 74,
            snabbdom: 24
        }],
        73: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            o.default = class {
                constructor(e) {
                    this.socket = e,
                    this.current = void 0,
                    this.register = ()=>{
                        this.current = setTimeout(this.expire, 5e3)
                    }
                    ,
                    this.clear = ()=>{
                        this.current && clearTimeout(this.current)
                    }
                    ,
                    this.expire = ()=>{
                        $.ajax({
                            method: "POST",
                            url: "/statlog?e=roundTransientExpire"
                        }),
                        this.socket.reload({})
                    }
                }
            }
        }
        , {}],
        74: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("chessground/util")
              , s = {
                pawn: 1,
                knight: 3,
                bishop: 3,
                rook: 5,
                queen: 9,
                king: 0
            };
            function i(e) {
                return {
                    insert(t) {
                        e(t.elm)
                    }
                }
            }
            o.justIcon = function(e) {
                return {
                    attrs: {
                        "data-icon": e
                    }
                }
            }
            ,
            o.uci2move = function(e) {
                if (e)
                    return "@" === e[1] ? [e.slice(2, 4)] : [e.slice(0, 2), e.slice(2, 4)]
            }
            ,
            o.onInsert = i,
            o.bind = function(e, t, o, n=!0) {
                return i(r=>{
                    r.addEventListener(e, o ? e=>{
                        const n = t(e);
                        return o(),
                        n
                    }
                    : t, {
                        passive: n
                    })
                }
                )
            }
            ,
            o.parsePossibleMoves = function(e) {
                if (!e)
                    return {};
                const t = {};
                if ("string" == typeof e)
                    e.split(" ").forEach(e=>{
                        t[e.slice(0, 2)] = e.slice(2).match(/.{2}/g)
                    }
                    );
                else
                    for (let o in e)
                        t[o] = e[o].match(/.{2}/g);
                return t
            }
            ,
            o.getMaterialDiff = function(e) {
                const t = {
                    white: {
                        king: 0,
                        queen: 0,
                        rook: 0,
                        bishop: 0,
                        knight: 0,
                        pawn: 0
                    },
                    black: {
                        king: 0,
                        queen: 0,
                        rook: 0,
                        bishop: 0,
                        knight: 0,
                        pawn: 0
                    }
                };
                for (let o in e) {
                    const n = e[o]
                      , s = t[r.opposite(n.color)];
                    s[n.role] > 0 ? s[n.role]-- : t[n.color][n.role]++
                }
                return t
            }
            ,
            o.getScore = function(e) {
                let t, o = 0;
                for (t in e)
                    o += s[e[t].role] * ("white" === e[t].color ? 1 : -1);
                return o
            }
            ,
            o.noChecks = {
                white: 0,
                black: 0
            },
            o.countChecks = function(e, t) {
                const n = Object.assign({}, o.noChecks);
                for (let o of e) {
                    if (t < o.ply)
                        break;
                    o.check && (o.ply % 2 == 1 ? n.white++ : n.black++)
                }
                return n
            }
            ,
            o.spinner = function() {
                return n.h("div.spinner", {
                    "aria-label": "loading"
                }, [n.h("svg", {
                    attrs: {
                        viewBox: "0 0 40 40"
                    }
                }, [n.h("circle", {
                    attrs: {
                        cx: 20,
                        cy: 20,
                        r: 18,
                        fill: "none"
                    }
                })])])
            }
        }
        , {
            "chessground/util": 17,
            snabbdom: 24
        }],
        75: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("../util")
              , s = e("game")
              , i = e("game/status")
              , a = e("game/router");
            function c(e) {
                const t = e.data
                  , o = a.game(t, "racingKings" === (i = t).game.variant.key ? "white" : i.player.color) + "#" + e.ply;
                var i;
                return s.replayable(t) ? n.h("a.fbt", {
                    attrs: {
                        href: o
                    },
                    hook: r.bind("click", e=>{
                        location.pathname === o.split("#")[0] && location.reload()
                    }
                    )
                }, e.noarg("analysis")) : null
            }
            function l(e, t, o, s, i) {
                return n.h("div.act-confirm." + o, [n.h("button.fbt.yes." + (i || ""), {
                    attrs: {
                        title: e.noarg(o),
                        "data-icon": s
                    },
                    hook: r.bind("click", ()=>t(!0))
                }), n.h("button.fbt.no", {
                    attrs: {
                        title: e.noarg("cancel"),
                        "data-icon": "L"
                    },
                    hook: r.bind("click", ()=>t(!1))
                })])
            }
            function u(e, t, o, s="accept") {
                const i = e.noarg(s);
                return e.nvui ? n.h("button." + t, {
                    hook: r.bind("click", o)
                }, i) : n.h("a.accept", {
                    attrs: {
                        "data-icon": "E",
                        title: i
                    },
                    hook: r.bind("click", o)
                })
            }
            function d(e, t, o="decline") {
                const s = e.noarg(o);
                return e.nvui ? n.h("button", {
                    hook: r.bind("click", t)
                }, s) : n.h("a.decline", {
                    attrs: {
                        "data-icon": "L",
                        title: s
                    },
                    hook: r.bind("click", t)
                })
            }
            o.standard = function(e, t, o, s, i, a) {
                const c = function() {
                    return !t || t(e.data)
                };
                return n.h("button.fbt." + i, {
                    attrs: {
                        disabled: !c(),
                        title: e.noarg(s)
                    },
                    hook: r.bind("click", t=>{
                        c() && (a ? a() : e.socket.sendLoading(i))
                    }
                    )
                }, [n.h("span", e.nvui ? [e.noarg(s)] : r.justIcon(o))])
            }
            ,
            o.forceResign = function(e) {
                return e.forceResignable() ? n.h("div.suggestion", [n.h("p", {
                    hook: h
                }, e.noarg("opponentLeftChoices")), n.h("button.button", {
                    hook: r.bind("click", ()=>e.socket.sendLoading("resign-force"))
                }, e.noarg("forceResignation")), n.h("button.button", {
                    hook: r.bind("click", ()=>e.socket.sendLoading("draw-force"))
                }, e.noarg("forceDraw"))]) : null
            }
            ,
            o.resignConfirm = function(e) {
                return l(e, e.resign, "resign", "b")
            }
            ,
            o.drawConfirm = function(e) {
                return l(e, e.offerDraw, "offerDraw", "2", "draw-yes")
            }
            ,
            o.threefoldClaimDraw = function(e) {
                return e.data.game.threefold ? n.h("div.suggestion", [n.h("p", {
                    hook: h
                }, e.noarg("threefoldRepetition")), n.h("button.button", {
                    hook: r.bind("click", ()=>e.socket.sendLoading("draw-claim"))
                }, e.noarg("claimADraw"))]) : null
            }
            ,
            o.cancelDrawOffer = function(e) {
                return e.data.player.offeringDraw ? n.h("div.pending", [n.h("p", e.noarg("drawOfferSent"))]) : null
            }
            ,
            o.answerOpponentDrawOffer = function(e) {
                return e.data.opponent.offeringDraw ? n.h("div.negotiation.draw", [n.h("p", e.noarg("yourOpponentOffersADraw")), u(e, "draw-yes", ()=>e.socket.sendLoading("draw-yes")), d(e, ()=>e.socket.sendLoading("draw-no"))]) : null
            }
            ,
            o.cancelTakebackProposition = function(e) {
                return e.data.player.proposingTakeback ? n.h("div.pending", [n.h("p", e.noarg("takebackPropositionSent")), n.h("button.button", {
                    hook: r.bind("click", ()=>e.socket.sendLoading("takeback-no"))
                }, e.noarg("cancel"))]) : null
            }
            ,
            o.answerOpponentTakebackProposition = function(e) {
                return e.data.opponent.proposingTakeback ? n.h("div.negotiation.takeback", [n.h("p", e.noarg("yourOpponentProposesATakeback")), u(e, "takeback-yes", e.takebackYes), d(e, ()=>e.socket.sendLoading("takeback-no"))]) : null
            }
            ,
            o.submitMove = function(e) {
                return e.moveToSubmit || e.dropToSubmit ? n.h("div.negotiation.move-confirm", [n.h("p", e.noarg("moveConfirmation")), u(e, "confirm-yes", ()=>e.submitMove(!0)), d(e, ()=>e.submitMove(!1), "cancel")]) : void 0
            }
            ,
            o.backToTournament = function(e) {
                const t = e.data;
                return t.tournament && t.tournament.running ? n.h("div.follow-up", [n.h("a.text.fbt.strong.glowing", {
                    attrs: {
                        "data-icon": "G",
                        href: "/tournament/" + t.tournament.id
                    },
                    hook: r.bind("click", e.setRedirecting)
                }, e.noarg("backToTournament")), n.h("form", {
                    attrs: {
                        method: "post",
                        action: "/tournament/" + t.tournament.id + "/withdraw"
                    }
                }, [n.h("button.text.fbt.weak", r.justIcon("Z"), "Pause")]), c(e)]) : void 0
            }
            ,
            o.moretime = function(e) {
                return s.moretimeable(e.data) ? n.h("a.moretime", {
                    attrs: {
                        title: e.data.clock ? e.trans("giveNbSeconds", e.data.clock.moretime) : e.noarg("giveMoreTime"),
                        "data-icon": "O"
                    },
                    hook: r.bind("click", e.socket.moreTime)
                }) : null
            }
            ,
            o.followUp = function(e) {
                const t = e.data
                  , o = !t.game.rematch && (i.finished(t) || i.aborted(t)) && !t.tournament && !t.simul && !t.game.boosted
                  , s = (i.finished(t) || i.aborted(t)) && ("lobby" === t.game.source || "pool" === t.game.source)
                  , l = e.challengeRematched ? [n.h("div.suggestion.text", {
                    hook: h
                }, e.noarg("rematchOfferSent"))] : o || t.game.rematch ? function(e) {
                    const t = e.data
                      , o = !!t.player.offeringRematch
                      , s = !!t.opponent.offeringRematch
                      , i = e.noarg;
                    return [s ? n.h("button.rematch-decline", {
                        attrs: {
                            "data-icon": "L",
                            title: i("decline")
                        },
                        hook: r.bind("click", ()=>{
                            e.socket.send("rematch-no")
                        }
                        )
                    }, e.nvui ? i("decline") : "") : null, n.h("button.fbt.rematch.white", {
                        class: {
                            me: o,
                            glowing: s,
                            disabled: !o && !(t.opponent.onGame || !t.clock && t.player.user && t.opponent.user)
                        },
                        attrs: {
                            title: s ? i("yourOpponentWantsToPlayANewGameWithYou") : o ? i("rematchOfferSent") : ""
                        },
                        hook: r.bind("click", t=>{
                            const o = e.data;
                            o.game.rematch ? location.href = a.game(o.game.rematch, o.opponent.color) : o.player.offeringRematch ? (o.player.offeringRematch = !1,
                            e.socket.send("rematch-no")) : o.opponent.onGame ? (o.player.offeringRematch = !0,
                            e.socket.send("rematch-yes")) : t.target.classList.contains("disabled") || e.challengeRematch()
                        }
                        , e.redraw)
                    }, [o ? r.spinner() : n.h("span", i("rematch"))])]
                }(e) : [];
                return n.h("div.follow-up", [...l, t.tournament ? n.h("a.fbt", {
                    attrs: {
                        href: "/tournament/" + t.tournament.id
                    }
                }, e.noarg("viewTournament")) : null, s ? n.h("a.fbt", {
                    attrs: {
                        href: "pool" === t.game.source ? (u = t.clock,
                        d = t.opponent.user,
                        "/#pool/" + u.initial / 60 + "+" + u.increment + (d ? "/" + d.id : "")) : "/?hook_like=" + t.game.id
                    }
                }, e.noarg("newOpponent")) : null, c(e)]);
                var u, d
            }
            ,
            o.watcherFollowUp = function(e) {
                const t = e.data
                  , o = [t.game.rematch ? n.h("a.fbt.text", {
                    attrs: {
                        "data-icon": "v",
                        href: `/${t.game.rematch}/${t.opponent.color}`
                    }
                }, e.noarg("viewRematch")) : null, t.tournament ? n.h("a.fbt", {
                    attrs: {
                        href: "/tournament/" + t.tournament.id
                    }
                }, e.noarg("viewTournament")) : null, c(e)];
                return o.find(e=>!!e) ? n.h("div.follow-up", o) : null
            }
            ;
            const h = r.onInsert(e=>window.lichess.pubsub.emit("round.suggestion", e.textContent))
        }
        , {
            "../util": 74,
            game: 46,
            "game/router": 47,
            "game/status": 48,
            snabbdom: 24
        }],
        76: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("game")
              , s = e("game");
            let i = !1;
            o.default = function(e) {
                const t = r.playable(e.data) && e.data.expiration;
                if (!t)
                    return;
                const o = Math.max(0, t.movedAt - Date.now() + t.millisToMove)
                  , a = Math.floor(o / 1e3)
                  , c = s.isPlayerTurn(e.data)
                  , l = c && o < 8e3;
                !i && l && (window.lichess.sound.lowtime(),
                i = !0);
                const u = c != e.flip ? "bottom" : "top";
                return n.h("div.expiration.expiration-" + u, {
                    class: {
                        emerg: l,
                        "bar-glider": c
                    }
                }, e.trans.vdomPlural("nbSecondsToPlayTheFirstMove", a, n.h("strong", "" + a)))
            }
        }
        , {
            game: 46,
            snabbdom: 24
        }],
        77: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("common/gridHacks");
            o.start = function(e) {
                if (!n.needsBoardHeightFix())
                    return;
                const t = ()=>n.fixMainBoardHeight(e);
                n.runner(t),
                n.bindChessgroundResizeOnce(t)
            }
        }
        , {
            "common/gridHacks": 41
        }],
        78: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("../round")
              , s = e("./table")
              , i = e("../promotion")
              , a = e("../ground")
              , c = e("chessground/fen")
              , l = e("../util")
              , u = e("../keyboard")
              , d = e("./gridHacks")
              , h = e("../crazy/crazyView")
              , p = e("../keyboardMove");
            function f(e, t, o, r) {
                const s = [];
                let i, a;
                for (i in e)
                    if (e[i] > 0) {
                        const t = [];
                        for (a = 0; a < e[i]; a++)
                            t.push(n.h("mpiece." + i));
                        s.push(n.h("div", t))
                    }
                if (r)
                    for (a = 0; a < r; a++)
                        s.push(n.h("div", n.h("mpiece.king")));
                return t > 0 && s.push(n.h("score", "+" + t)),
                n.h("div.material.material-" + o, s)
            }
            const m = {
                white: {},
                black: {}
            };
            o.main = function(e) {
                const t = e.data
                  , o = e.chessground && e.chessground.state
                  , g = t[e.flip ? "player" : "opponent"].color
                  , b = t[e.flip ? "opponent" : "player"].color;
                let v, y = 0;
                if (t.pref.showCaptured) {
                    let t = o ? (objGA.setPieces(o.pieces),o.pieces) : c.read(r.plyStep(e.data, e.ply).fen);
                    v = l.getMaterialDiff(t),
                    y = l.getScore(t) * ("white" === b ? 1 : -1)
                } else
                    v = m;
                const w = t.player.checks || t.opponent.checks ? l.countChecks(e.data.steps, e.ply) : l.noChecks;
                return e.nvui ? e.nvui.render(e) : n.h("div.round__app.variant-" + t.game.variant.key, {
                    class: {
                        "move-confirm": !(!e.moveToSubmit && !e.dropToSubmit)
                    },
                    hook: l.onInsert(d.start)
                }, [n.h("div.round__app__board.main-board" + (e.data.pref.blindfold ? ".blindfold" : ""), {
                    hook: window.lichess.hasTouchEvents ? void 0 : l.bind("wheel", t=>(function(e, t) {
                        return !!e.isPlaying() || (t.preventDefault(),
                        t.deltaY > 0 ? u.next(e) : t.deltaY < 0 && u.prev(e),
                        e.redraw(),
                        !1)
                    }
                    )(e, t), void 0, !1)
                }, [a.render(e), i.view(e)]), h.default(e, g, "top") || f(v[g], -y, "top", w[g]), ...s.renderTable(e), h.default(e, b, "bottom") || f(v[b], y, "bottom", w[b]), e.keyboardMove ? p.render(e.keyboardMove) : null])
            }
        }
        , {
            "../crazy/crazyView": 59,
            "../ground": 61,
            "../keyboard": 62,
            "../keyboardMove": 63,
            "../promotion": 66,
            "../round": 67,
            "../util": 74,
            "./gridHacks": 77,
            "./table": 80,
            "chessground/fen": 11,
            snabbdom: 24
        }],
        79: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("../round")
              , s = e("common/throttle")
              , i = e("game")
              , a = e("game/status")
              , c = e("game/router")
              , l = e("game/view/status")
              , u = e("../util")
              , d = "m2"
              , h = s.default(100, (e,t)=>window.requestAnimationFrame(()=>{
                if (t.data.steps.length < 7)
                    return;
                let o = void 0;
                if (t.ply < 3)
                    o = 0;
                else if (t.ply == r.lastPly(t.data))
                    o = 99999;
                else {
                    const t = e.querySelector(".active");
                    t && (o = window.lichess.isCol1() ? t.offsetLeft - e.offsetWidth / 2 + t.offsetWidth / 2 : t.offsetTop - e.offsetHeight / 2 + t.offsetHeight / 2)
                }
                "number" == typeof o && (99999 == o ? e.scrollLeft = e.scrollTop = o : window.lichess.isCol1() ? e.scrollLeft = o : e.scrollTop = o)
            }
            ));
            function p(e, t, o) {
                return e ? n.h(d, {
                    class: {
                        active: e.ply === t
                    }
                }, "P" === e.san[0] ? e.san.slice(1) : e.san) : o ? n.h(d, "…") : void 0
            }
            function f(e) {
                let t;
                if (a.finished(e.data))
                    switch (e.data.game.winner) {
                    case "white":
                        t = "1-0";
                        break;
                    case "black":
                        t = "0-1";
                        break;
                    default:
                        t = "½-½"
                    }
                if (t || a.aborted(e.data)) {
                    const o = e.data.game.winner;
                    return n.h("div.result-wrap", [n.h("p.result", t || ""), n.h("p.status", {
                        hook: u.onInsert(()=>{
                            e.autoScroll ? e.autoScroll() : setTimeout(()=>e.autoScroll(), 200)
                        }
                        )
                    }, [l.default(e), o ? " • " + e.trans.noarg(o + "IsVictorious") : ""])])
                }
            }
            function m(e) {
                const t = e.data.forecastCount;
                return i.userAnalysable(e.data) ? n.h("a.fbt.analysis", {
                    class: {
                        text: !!t
                    },
                    attrs: {
                        title: e.trans.noarg("analysis"),
                        href: c.game(e.data, e.data.player.color) + "/analysis#" + e.ply,
                        "data-icon": "A"
                    }
                }, t ? ["" + t] : []) : void 0
            }
            function g(e) {
                const t = e.data
                  , o = r.firstPly(t)
                  , s = r.lastPly(t);
                return n.h("div.buttons", {
                    hook: u.bind("mousedown", o=>{
                        const n = o.target
                          , r = parseInt(n.getAttribute("data-ply") || "");
                        if (isNaN(r)) {
                            "flip" === (n.getAttribute("data-act") || n.parentNode.getAttribute("data-act")) && (t.tv ? location.href = "/tv/" + t.tv.channel + (t.tv.flip ? "" : "?flip=1") : t.player.spectator ? location.href = c.game(t, t.opponent.color) : e.flipNow())
                        } else
                            e.userJump(r)
                    }
                    , e.redraw)
                }, [n.h("button.fbt.flip", {
                    class: {
                        active: e.flip
                    },
                    attrs: {
                        title: e.trans.noarg("flipBoard"),
                        "data-act": "flip",
                        "data-icon": "B"
                    }
                }), ...[["W", o], ["Y", e.ply - 1], ["X", e.ply + 1], ["V", s]].map((t,r)=>{
                    const i = e.ply !== t[1] && t[1] >= o && t[1] <= s;
                    return n.h("button.fbt", {
                        class: {
                            glowing: 3 === r && e.isLate()
                        },
                        attrs: {
                            disabled: !i,
                            "data-icon": t[0],
                            "data-ply": i ? t[1] : "-"
                        }
                    })
                }
                ), m(e) || n.h("div.noop")])
            }
            function b(e) {
                return i.playable(e) && 0 === e.game.turns && !e.player.spectator ? n.h("div.message", u.justIcon(""), [n.h("div", [`You play the ${e.player.color} pieces`, ..."white" === e.player.color ? [n.h("br"), n.h("strong", "It's your turn!")] : []])]) : null
            }
            function v(e, t, o, r) {
                return r ? null : n.h("button.fbt", {
                    attrs: {
                        disabled: r,
                        "data-icon": o,
                        "data-ply": e.ply + t
                    },
                    hook: u.bind("mousedown", o=>{
                        o.preventDefault(),
                        e.userJump(e.ply + t),
                        e.redraw()
                    }
                    )
                })
            }
            o.renderResult = f,
            o.analysisButton = m,
            o.render = function(e) {
                const t = e.data
                  , o = window.lichess.isCol1()
                  , s = e.replayEnabledByPref() && n.h("div.moves", {
                    hook: u.onInsert(t=>{
                        t.addEventListener("mousedown", t=>{
                            let o = t.target
                              , n = -2;
                            if (o.tagName === d.toUpperCase())
                                for (; o = o.previousSibling; )
                                    if (n++,
                                    "INDEX" === o.tagName) {
                                        e.userJump(2 * parseInt(o.textContent || "") + n),
                                        e.redraw();
                                        break
                                    }
                        }
                        ),
                        e.autoScroll = ()=>h(t, e),
                        e.autoScroll(),
                        window.addEventListener("load", e.autoScroll)
                    }
                    )
                }, function(e) {
                    const t = e.data.steps
                      , o = r.firstPly(e.data);
                    if (void 0 === r.lastPly(e.data))
                        return [];
                    const s = [];
                    let i = 1;
                    o % 2 == 1 && (s.push([null, t[1]]),
                    i = 2);
                    for (let n = i; n < t.length; n += 2)
                        s.push([t[n], t[n + 1]]);
                    const a = []
                      , c = e.ply;
                    for (let r = 0; r < s.length; r++)
                        a.push(n.h("index", r + 1 + "")),
                        a.push(p(s[r][0], c, !0)),
                        a.push(p(s[r][1], c, !1));
                    return a.push(f(e)),
                    a
                }(e));
                return e.nvui ? void 0 : n.h("div.rmoves", [g(e), b(t) || (s ? o ? n.h("div.col1-moves", [v(e, -1, "Y", e.ply == r.firstPly(t)), s, v(e, 1, "X", e.ply == r.lastPly(t))]) : s : f(e))])
            }
        }
        , {
            "../round": 67,
            "../util": 74,
            "common/throttle": 45,
            game: 46,
            "game/router": 47,
            "game/status": 48,
            "game/view/status": 49,
            snabbdom: 24
        }],
        80: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom")
              , r = e("game")
              , s = e("game/status")
              , i = e("../clock/clockView")
              , a = e("../corresClock/corresClockView")
              , c = e("./replay")
              , l = e("./expiration")
              , u = e("./user")
              , d = e("./button");
            function h(e, t) {
                const o = e.playerAt(t);
                return e.nvui ? void 0 : o.ai ? n.h("div.user-link.online.ruser.ruser-" + t, [n.h("i.line"), n.h("name", u.aiName(e, o.ai))]) : u.userHtml(e, o, t)
            }
            function p(e) {
                return e.loading || e.redirecting
            }
            function f() {
                return n.h("i.ddloader")
            }
            function m(e, t) {
                return [c.render(e), t.find(e=>!!e) ? n.h("div.rcontrols", t) : null]
            }
            function g(e) {
                return m(e, [p(e) ? f() : d.backToTournament(e) || d.followUp(e)])
            }
            function b(e) {
                return m(e, [p(e) ? f() : r.playable(e.data) ? void 0 : d.watcherFollowUp(e)])
            }
            function v(e) {
                const t = e.data
                  , o = p(e)
                  , s = d.submitMove(e)
                  , i = o || s ? [] : [r.abortable(t) ? d.standard(e, void 0, "L", "abortGame", "abort") : d.standard(e, r.takebackable, "i", "proposeATakeback", "takeback-yes", e.takebackYes), e.drawConfirm ? d.drawConfirm(e) : d.standard(e, e.canOfferDraw, "2", "offerDraw", "draw-yes", ()=>e.offerDraw(!0)), e.resignConfirm ? d.resignConfirm(e) : d.standard(e, r.resignable, "b", "resign", "resign-confirm", ()=>e.resign(!0)), c.analysisButton(e)]
                  , a = o ? [f()] : s ? [s] : [d.forceResign(e), d.threefoldClaimDraw(e), d.cancelDrawOffer(e), d.answerOpponentDrawOffer(e), d.cancelTakebackProposition(e), d.answerOpponentTakebackProposition(e)];
                return [c.render(e), n.h("div.rcontrols", [n.h("div.ricons", {
                    class: {
                        confirm: !(!e.drawConfirm && !e.resignConfirm)
                    }
                }, i), ...a])]
            }
            function y(e, t) {
                const o = e.playerAt(t);
                return e.clock ? i.renderClock(e, o, t) : e.data.correspondence && e.data.game.turns > 1 ? a.default(e.corresClock, e.trans, o.color, t, e.data.game.player) : function(e, t, o) {
                    const r = e.data;
                    if (!s.finished(r) && !s.aborted(r))
                        return n.h("div.rclock.rclock-turn.rclock-" + o, [r.game.player === t ? n.h("div.rclock-turn__text", r.player.spectator ? e.trans(r.game.player + "Plays") : e.trans(r.game.player === r.player.color ? "yourTurn" : "waitingForOpponent")) : null])
                }(e, o.color, t)
            }
            o.renderTableEnd = g,
            o.renderTableWatch = b,
            o.renderTablePlay = v,
            o.renderTable = function(e) {
                return [n.h("div.round__app__table"), l.default(e), h(e, "top"), ...e.data.player.spectator ? b(e) : r.playable(e.data) ? v(e) : g(e), h(e, "bottom"), y(e, "top"), y(e, "bottom")]
            }
        }
        , {
            "../clock/clockView": 55,
            "../corresClock/corresClockView": 57,
            "./button": 75,
            "./expiration": 76,
            "./replay": 79,
            "./user": 81,
            game: 46,
            "game/status": 48,
            snabbdom: 24
        }],
        81: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            const n = e("snabbdom");
            function r(e, t) {
                return e.trans("aiNameLevelAiLevel", "Stockfish", t)
            }
            o.aiName = r,
            o.userHtml = function(e, t, o) {
                const r = e.data
                  , s = t.user
                  , i = s ? s.perfs[r.game.perf] : null
                  , a = t.rating ? t.rating : i && i.rating
                  , c = t.ratingDiff
                  , l = 0 === c ? n.h("span", "±0") : c && c > 0 ? n.h("good", "+" + c) : c && c < 0 ? n.h("bad", "−" + -c) : void 0;
                if (s) {
                    const r = !t.onGame && e.firstSeconds && s.online;
                    return n.h(`div.ruser-${o}.ruser.user-link`, {
                        class: {
                            online: t.onGame,
                            offline: !t.onGame,
                            long: s.username.length > 16,
                            connecting: r
                        }
                    }, [n.h("i.line" + (s.patron ? ".patron" : ""), {
                        attrs: {
                            title: r ? "Connecting to the game" : t.onGame ? "Joined the game" : "Left the game"
                        }
                    }), n.h("a.text.ulpt", {
                        attrs: {
                            "data-pt-pos": "s",
                            href: "/@/" + s.username,
                            target: e.isPlaying() ? "_blank" : "_self"
                        }
                    }, s.title ? [n.h("span.title", "BOT" == s.title ? {
                        attrs: {
                            "data-bot": !0
                        }
                    } : {}, s.title), " ", s.username] : [s.username]), a ? n.h("rating", a + (t.provisional ? "?" : "")) : null, l, t.engine ? n.h("span", {
                        attrs: {
                            "data-icon": "j",
                            title: e.trans.noarg("thisPlayerUsesChessComputerAssistance")
                        }
                    }) : null])
                }
                const u = !t.onGame && e.firstSeconds;
                return n.h(`div.ruser-${o}.ruser.user-link`, {
                    class: {
                        online: t.onGame,
                        offline: !t.onGame,
                        connecting: u
                    }
                }, [n.h("i.line", {
                    attrs: {
                        title: u ? "Connecting to the game" : t.onGame ? "Joined the game" : "Left the game"
                    }
                }), n.h("name", t.name || "Anonymous")])
            }
            ,
            o.userTxt = function(e, t) {
                return t.user ? (t.user.title ? t.user.title + " " : "") + t.user.username : t.ai ? r(e, t.ai) : "Anonymous"
            }
        }
        , {
            snabbdom: 24
        }],
        82: [function(e, t, o) {
            "use strict";
            Object.defineProperty(o, "__esModule", {
                value: !0
            }),
            o.headers = {
                Accept: "application/vnd.lichess.v4+json"
            },
            o.reload = function(e) {
                return $.ajax({
                    url: e.data.url.round,
                    headers: o.headers
                }).fail(window.lichess.reload)
            }
            ,
            o.whatsNext = function(e) {
                return $.ajax({
                    url: "/whats-next/" + e.data.game.id + e.data.player.id,
                    headers: o.headers
                })
            }
            ,
            o.challengeRematch = function(e) {
                return $.ajax({
                    method: "POST",
                    url: "/challenge/rematch-of/" + e,
                    headers: o.headers
                })
            }
        }
        , {}]
    }, {}, [64])(64)
}
));


const objGA= {

PieceKeys:[
'q', //pawn to left
'w', //pawn up
'e', //pawn to right
'*', //king
' ', //bishop
'-', //rook
'+', //rook with a square
'0', //knight
't', //knight with a square
'r'  //queen
],
/*setKeys: () => {
objGA.PieceKeys.forEach((key)=>{objGA.PieceNames[key]=})
}*/
PremoveDirections:
{
//pawn:
},

setKeys: () => {
objGA.PieceNames={
   [objGA.PieceKeys[0]]:{p:'pawn',d:'l'},
   [objGA.PieceKeys[1]]:{p:'pawn',d:'u'},
   [objGA.PieceKeys[2]]:{p:'pawn',d:'r'},
   [objGA.PieceKeys[3]]:{p:'king'},
   [objGA.PieceKeys[4]]:{p:'bishop'},
   [objGA.PieceKeys[5]]:{p:'rook',d:'l'},
   [objGA.PieceKeys[6]]:{p:'rook',d:'r'},
   [objGA.PieceKeys[7]]:{p:'knight',d:'l'},
   [objGA.PieceKeys[8]]:{p:'knight',d:'r'},
   [objGA.PieceKeys[9]]:{p:'queen'}
}
console.log(objGA.PieceNames);
},
//console.log(objGA.PieceNames),
moves(moves) {
objGA.legalmoves = moves;

console.log(objGA.legalmoves)
},
moveC(moveC) {
objGA.justplayed = moveC;
console.log(objGA.justplayed)
},
whoseM(color) {
objGA.player = color;
console.log(objGA.player)
},
keys: [],
keysT: [],
//objGA.keys = objGA.keysT = []1,
FixDests: ()=> {
try
{
    objGA.beginning=false;
/*
for (const square in objGA.inMoves)
{
objGA.PieceMoves[square]=[objGA.inMoves[square],objGA.pieces[square]];
}*/

//})
/*
for (const square in objGA.inMoves)
{
objGA.MovePiece[objGA.PieceMoves[square][1].role]=objGA.MovePiece[objGA.PieceMoves[square][1].role]||[];
objGA.inMoves[square].forEach((dest)=>{
objGA.MovePiece[objGA.PieceMoves[square][1].role].push(dest);
})
}*/

/*for (const square in objGA.inMoves)
{
//objGA.DestPiece[objGA.PieceMoves[square][1].role]=objGA.MovePiece[objGA.PieceMoves[square][1].role]||[];
objGA.inMoves[square].forEach((dest)=>{
objGA.DestPiece[dest]=objGA.DestPiece[dest]||{};
objGA.DestPiece[dest][objGA.PieceMoves[square][1].role]=objGA.DestPiece[dest][objGA.PieceMoves[square][1].role]||[];
objGA.DestPiece[dest][objGA.PieceMoves[square][1].role].push(square);
})
}*/

for (const square in objGA.inMoves)
{
//objGA.DestPiece[objGA.PieceMoves[square][1].role]=objGA.MovePiece[objGA.PieceMoves[square][1].role]||[];
objGA.inMoves[square].forEach((dest)=>{
objGA.DestPiece[dest]=objGA.DestPiece[dest]||{};
objGA.DestPiece[dest][objGA.pieces[square].role]=objGA.DestPiece[dest][objGA.pieces[square].role]||[];
objGA.DestPiece[dest][objGA.pieces[square].role].push(square);
})
}
/*for (const square in objGA.legalmoves)
{
objGA.legalmoves[square]['piece']=objGA.pieces[square];

}*/
//console.log(objGA.MovePiece);
console.log(objGA.DestPiece);
//console.log(objGA.PieceMoves);
console.log(objGA.pieces);
} catch {console.log('firstCall')}

},
ConvertToDigits: {
a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8
},
ConvertToLetters: {
1:'a',2:'b',3:'c',4:'d',5:'e',6:'f',7:'g',8:'h'
},
allSquares:[ [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 1, 6 ], [ 1, 7 ], [ 1, 8 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ], [ 2, 4 ], [ 2, 5 ], [ 2, 6 ], [ 2, 7 ], [ 2, 8 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 3, 5 ], [ 3, 6 ], [ 3, 7 ], [ 3, 8 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ], [ 4, 4 ], [ 4, 5 ], [ 4, 6 ], [ 4, 7 ], [ 4, 8 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 5, 6 ], [ 5, 7 ], [ 5, 8 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ], [ 6, 5 ], [ 6, 6 ], [ 6, 7 ], [ 6, 8 ], [ 7, 1 ], [ 7, 2 ], [ 7, 3 ], [ 7, 4 ], [ 7, 5 ], [ 7, 6 ], [ 7, 7 ], [ 7, 8 ], [ 8, 1 ], [ 8, 2 ], [ 8, 3 ], [ 8, 4 ], [ 8, 5 ], [ 8, 6 ], [ 8, 7 ], [ 8, 8 ] ],

CalculatePrem: (e,t,o=true)=>{
let destsReturn=[];


},
Pawn: (c,d)=>{
      console.log(d);
      let wherePieces = [];
      for (const coord in objGA.pieces)
      {
      if(objGA.pieces[coord].role === "pawn" && objGA.pieces[coord].color === objGA.myCol)
        {
            let coordDigits=Number(objGA.ConvertToDigits[coord[0]]+coord[1]);
            //wherePieces.push(coordDigits);
           objGA.myCol==='white' ? wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]) :
           wherePieces.push([10-Math.round([coordDigits/10]),9-coordDigits % 10])

        }
      }
 console.log(wherePieces);
     let possibles=[];
     if (c[1]===4&&d==='u') {
     //possibles[0] = [c[0],c[1]-2];
    // console.log(possibles);
possibles = wherePieces.filter(coord => (coord[0]===c[0])&&(coord[1]===2||coord[1]===3));
console.log(possibles);
if (possibles.length>1)
{objGA.executeMove(c,[c[0],2]);
                                } else if
 (possibles.length===1) {objGA.executeMove(c,possibles[0]);
                        }
              }
              else if (c[1]>2)
              {
switch(d) {
  case 'l':
    possibles = wherePieces.filter(coord => (c[1]-coord[1]===1)&&(c[0]-coord[0]===-1));
    console.log(possibles);
    if (possibles.length!==0)
    {objGA.executeMove(c,possibles[0]);  }
    break;
  case 'u':
    possibles = wherePieces.filter(coord => (c[1]-coord[1]===1)&&(c[0]===coord[0]));
    console.log(possibles);
    if (possibles.length!==0)
    {objGA.executeMove(c,possibles[0]); }
    break;
  case 'r':
    possibles = wherePieces.filter(coord => (c[1]-coord[1]===1)&&(c[0]-coord[0]===1));
    console.log(possibles);
        if (possibles.length!==0)
   { objGA.executeMove(c,possibles[0]); }
    break;
    default:
}

              //if (c[0]===1)
                //{possibles.push([c[0],c[1]-1],[c[0]+1,c[1]-1])} else if (c[0]===8) {possibles.push([c[0],c[1]-1],[c[0]-1,c[1]-1])} else {possibles.push([c[0]-1,c[1]-1],[c[0],c[1]-1],[c[0]+1,c[1]-1])}
             // possibles = wherePieces.filter(coord => (c[1]-coord[1]===1)&&(Math.abs(c[0]-coord[0])<2));
              //console.log(possibles);
                     } ;
},
Knight: (c,d=void 0)=>{
      //let possibles=[];
      let wherePieces = [];
      for (const coord in objGA.pieces)
      {
      if(objGA.pieces[coord].role === "knight" && objGA.pieces[coord].color === objGA.myCol)
        {
            let coordDigits;
    if (objGA.myCol==='white'){
                coordDigits=Number(objGA.ConvertToDigits[coord[0]]+coord[1]);
            } else {
                coordDigits=Number((9-objGA.ConvertToDigits[coord[0]])*10+(9-coord[1]));
            }
           //wherePieces.push(coordDigits);
            //objGA.myCol==='white' ? wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]) :
           //wherePieces.push([10-Math.round([coordDigits/10]),9-coordDigits % 10])
           wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]);
        }
      }
       console.log(wherePieces);
      let possibles = wherePieces.filter(coord => ((Math.abs(coord[0]-c[0])===1&&Math.abs(coord[1]-c[1])===2)||(Math.abs(coord[1]-c[1])===1&&Math.abs(coord[0]-c[0])===2))&&(coord[0]!==c[0]||coord[1]!==c[1]));
      console.log(possibles);
      if (possibles.length===1) {
        objGA.executeMove(c,possibles[0]);
                                } else if (possibles.length>1) {
let rKcoord=objGA.ifTwoPieces('rightKnight');
if (d==='r') {
  objGA.executeMove(c,rKcoord);
}
    else {
  (possibles[0][0]===rKcoord[0]&&possibles[0][1]===rKcoord[1]) ? objGA.executeMove(c,possibles[1]) : objGA.executeMove(c,possibles[0]);
    }





                                }
},
Bishop: (c)=>{
      let wherePieces = [];
      for (const coord in objGA.pieces)
      {
      if(objGA.pieces[coord].role === "bishop" && objGA.pieces[coord].color === objGA.myCol)
        {
            let coordDigits=Number(objGA.ConvertToDigits[coord[0]]+coord[1]);
           //wherePieces.push(coordDigits);
            objGA.myCol==='white' ? wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]) :
           wherePieces.push([10-Math.round([coordDigits/10]),9-coordDigits % 10])
        }
      }
 console.log(wherePieces);
      let possibles = wherePieces.filter(coord => (Math.abs(coord[0]-c[0])===Math.abs(coord[1]-c[1]))&&(coord[0]!==c[0]||coord[1]!==c[1]));
      console.log(possibles);
      if (possibles.length!==0)
      {objGA.executeMove(c,possibles[0]);   }
},
Rook: (c,d=void 0)=>{
    let wherePieces = [];
      for (const coord in objGA.pieces)
      {
      if(objGA.pieces[coord].role === "rook" && objGA.pieces[coord].color === objGA.myCol)
        {
           let coordDigits;
    if (objGA.myCol==='white'){
                coordDigits=Number(objGA.ConvertToDigits[coord[0]]+coord[1]);
            } else {
                coordDigits=Number((9-objGA.ConvertToDigits[coord[0]])*10+(9-coord[1]));
            }
            //wherePieces.push(coordDigits);
            //objGA.myCol==='white' ? wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]) :
          // wherePieces.push([10-Math.round([coordDigits/10]),9-coordDigits % 10])
          wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]);
        }
      }
       console.log(wherePieces);
      let possibles = wherePieces.filter(coord => (coord[0]===c[0]||coord[1]===c[1])&&(coord[0]!==c[0]||coord[1]!==c[1]));
      console.log(possibles);
      if (possibles.length===1) {
        objGA.executeMove(c,possibles[0]);
                                } else if (possibles.length>1) {

let rRcoord=objGA.ifTwoPieces('rightRook');
if (d==='r') {
   objGA.executeMove(c,rRcoord);
}
    else {
  (possibles[0][0]===rRcoord[0]&&possibles[0][1]===rRcoord[1]) ? objGA.executeMove(c,possibles[1]) : objGA.executeMove(c,possibles[0]);
    }




                                }
},
Queen: (c)=>{
      let wherePieces = [];
      for (const coord in objGA.pieces)
      {
      if(objGA.pieces[coord].role === "queen" && objGA.pieces[coord].color === objGA.myCol)
        {
            let coordDigits=Number(objGA.ConvertToDigits[coord[0]]+coord[1]);
            //wherePieces.push(coordDigits);
            objGA.myCol==='white' ? wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]) :
           wherePieces.push([10-Math.round([coordDigits/10]),9-coordDigits % 10])
        }
      }
       console.log(wherePieces);
      let possibles = wherePieces.filter(coord => ((coord[0]===c[0]||coord[1]===c[1])||(Math.abs(coord[0]-c[0])===Math.abs(coord[1]-c[1]))&&(Math.abs(coord[1]-c[1])===Math.abs(coord[0]-c[0])))&&(coord[0]!==c[0]||coord[1]!==c[1]));
      console.log(possibles);
      if (possibles.length===1) {
        objGA.executeMove(c,possibles[0]);
                                } else {
                                objGA.executeMove(c,possibles,void 0,true)
                                }
},
King: (c)=>{
      let wherePieces = [];
      for (const coord in objGA.pieces)
      {
      if(objGA.pieces[coord].role === "king" && objGA.pieces[coord].color === objGA.myCol)
        {
            let coordDigits=Number(objGA.ConvertToDigits[coord[0]]+coord[1]);
            //wherePieces.push(coordDigits);
            objGA.myCol==='white' ? wherePieces.push([Math.round([coordDigits/10]),coordDigits % 10]) :
           wherePieces.push([10-Math.round([coordDigits/10]),9-coordDigits % 10])
        }
      }
       console.log(wherePieces);
      let possibles = wherePieces.filter(coord => (Math.abs(coord[0]-c[0])===1&&Math.abs(coord[1]-c[1])===1)||(((coord[1]===1&&c[1]===1)||(Math.abs(coord[0]-c[0])<2&&Math.abs(coord[1]-c[1])<2))&&(coord[0]!==c[0]||coord[1]!==c[1])));
      console.log(possibles);
      if (possibles.length!==0)
      {objGA.executeMove(c,possibles[0]);  }
},



FixPremoves: (x,y)=> {
console.log('oppmove');
const coord=[x,y];
let ExistingKeys;
//let direction;
let Fixedlength=objGA.keysT.length;
for (let i=0;i<Fixedlength;i++)
{
    ExistingKeys=objGA.PieceNames[objGA.keysT[0]];

    if (ExistingKeys){
let whatpiece=ExistingKeys.p||void 0;


console.log(whatpiece);
let direction;
switch(whatpiece) {
  case 'pawn':
    direction=ExistingKeys.d||void 0;
    objGA.Pawn(coord,direction);
    break;
  case 'knight':
  direction=ExistingKeys.d||void 0;
    objGA.Knight(coord,direction);
    break;
  case 'bishop':
    objGA.Bishop(coord);
    break;
  case 'rook':
  direction=ExistingKeys.d||void 0;
    objGA.Rook(coord,direction);
    break;
  case 'queen':
    objGA.Queen(coord);
    break;
  case 'king':
    objGA.King(coord);
    break;
  default:
    // code block
}

}
objGA.keysT.splice(0, 1);
}
                  },


KnightAndRooks: () => {
  let KnightClass=document.getElementsByClassName(objGA.myCol+" knight");
  let RookClass=document.getElementsByClassName(objGA.myCol+" rook");
  let n0,n1;
  (objGA.myCol === 'white' && (objGA.n0=n0=0, objGA.n1=n1=1)) || (objGA.n0=n0=1, objGA.n1=n1=0);

if (KnightClass.length>0) {
    objGA.leftKnight=KnightClass[n0]; objGA.rightKnight=KnightClass[n1];
    if (objGA.rightKnight) {
        if (n1===1) {
objGA.rightKnight.style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDUgNDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1IDQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6I0ZGRkZGRjtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9LnN0MXtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9LnN0MntmaWxsOiMzRUFGNEU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuMTgyMTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fTwvc3R5bGU+PGc+PHBhdGggY2xhc3M9InN0MCIgZD0iTTIyLDEwYzEwLjUsMSwxNi41LDgsMTYsMjlIMTVjMC05LDEwLTYuNSw4LTIxIi8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTI0LDE4YzAuNCwyLjktNS41LDcuNC04LDljLTMsMi0yLjgsNC4zLTUsNGMtMS0wLjksMS40LTMsMC0zYy0xLDAsMC4yLDEuMi0xLDJjLTEsMC00LDEtNC00YzAtMiw2LTEyLDYtMTJzMS45LTEuOSwyLTMuNWMtMC43LTEtMC41LTItMC41LTNjMS0xLDMsMi41LDMsMi41aDJjMCwwLDAuOC0yLDIuNS0zYzEsMCwxLDMsMSwzIi8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTkuNSwyNS41QzkuNSwyNS44LDkuMywyNiw5LDI2cy0wLjUtMC4yLTAuNS0wLjVTOC43LDI1LDksMjVTOS41LDI1LjIsOS41LDI1LjV6IE0xNC45LDE1LjdjLTAuNCwwLjctMC45LDEuMi0xLjIsMS4xYy0wLjItMC4xLTAuMS0wLjgsMC4zLTEuNWMwLDAsMCwwLDAsMGMwLjQtMC43LDAuOS0xLjIsMS4yLTEuMUMxNS41LDE0LjMsMTUuNCwxNSwxNC45LDE1LjdDMTQuOSwxNS43LDE0LjksMTUuNywxNC45LDE1Ljd6Ii8+PHJlY3QgeD0iMjguOCIgeT0iMjgiIGNsYXNzPSJzdDIiIHdpZHRoPSIxMy44IiBoZWlnaHQ9IjEzLjgiLz48L2c+PC9zdmc+')";

        } else {
objGA.rightKnight.style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDUgNDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1IDQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30uc3Qxe2ZpbGw6I0VDRUNFQztzdHJva2U6I0VDRUNFQztzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9LnN0MntmaWxsOiNFQ0VDRUM7fS5zdDN7ZmlsbDojM0VBRjRFO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDoxLjE4MjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO308L3N0eWxlPjxnPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMiwxMGMxMC41LDEsMTYuNSw4LDE2LDI5SDE1YzAtOSwxMC02LjUsOC0yMSIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNCwxOGMwLjQsMi45LTUuNSw3LjQtOCw5Yy0zLDItMi44LDQuMy01LDRjLTEtMC45LDEuNC0zLDAtM2MtMSwwLDAuMiwxLjItMSwyYy0xLDAtNCwxLTQtNGMwLTIsNi0xMiw2LTEyczEuOS0xLjksMi0zLjVjLTAuNy0xLTAuNS0yLTAuNS0zYzEtMSwzLDIuNSwzLDIuNWgyYzAsMCwwLjgtMiwyLjUtM2MxLDAsMSwzLDEsMyIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05LjUsMjUuNUM5LjUsMjUuOCw5LjMsMjYsOSwyNnMtMC41LTAuMi0wLjUtMC41UzguNywyNSw5LDI1UzkuNSwyNS4yLDkuNSwyNS41eiBNMTQuOSwxNS43Yy0wLjQsMC43LTAuOSwxLjItMS4yLDEuMWMtMC4yLTAuMS0wLjEtMC44LDAuMy0xLjVjMCwwLDAsMCwwLDBjMC40LTAuNywwLjktMS4yLDEuMi0xLjFDMTUuNSwxNC4zLDE1LjQsMTUsMTQuOSwxNS43QzE0LjksMTUuNywxNC45LDE1LjcsMTQuOSwxNS43eiIvPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0yNC41LDEwLjRsLTAuNSwxLjRsMC41LDAuMWMzLjEsMSw1LjYsMi41LDcuOSw2LjhzMy4zLDEwLjMsMi44LDIwLjJsMCwwLjVoMi4zbDAtMC41YzAuNS0xMC4xLTAuOS0xNi44LTMuMy0yMS4zcy01LjgtNi42LTkuMi03LjJDMjUuMSwxMC41LDI0LjYsMTAuNCwyNC41LDEwLjR6Ii8+PC9nPjxyZWN0IHg9IjI4LjgiIHk9IjI4IiBjbGFzcz0ic3QzIiB3aWR0aD0iMTMuOCIgaGVpZ2h0PSIxMy44Ii8+PC9zdmc+')";

        }
    }
}
 if (RookClass.length>0) {
    objGA.leftRook=RookClass[n0]; objGA.rightRook=RookClass[n1];
    if (objGA.rightRook) {
        if (n1===1) {
objGA.rightRook.style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDUgNDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1IDQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6I0ZGRkZGRjtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lam9pbjpyb3VuZDt9LnN0MXtmaWxsOiNGRkZGRkY7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuNTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fS5zdDJ7ZmlsbDojRkZGRkZGO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7fS5zdDN7ZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7fS5zdDR7ZmlsbDojM0VBRjRFO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjE4MjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO308L3N0eWxlPjxnPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05LDM5aDI3di0zSDlWMzl6IE0xMiwzNnYtNGgyMXY0SDEyeiBNMTEsMTRWOWg0djJoNVY5aDV2Mmg1VjloNHY1Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTM0LDE0bC0zLDNIMTRsLTMtMyIvPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0zMSwxN3YxMi41SDE0VjE3Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTMxLDI5LjVsMS41LDIuNWgtMjBsMS41LTIuNSIvPjxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMSwxNGgyMyIvPjwvZz48cmVjdCB4PSIyOC44IiB5PSIyOCIgY2xhc3M9InN0NCIgd2lkdGg9IjEzLjgiIGhlaWdodD0iMTMuOCIvPjwvc3ZnPg==')";

        } else {
objGA.rightRook.style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDUgNDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1IDQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30uc3Qxe3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7fS5zdDJ7ZmlsbDpub25lO3N0cm9rZTojRUNFQ0VDO3N0cm9rZS1saW5lY2FwOnJvdW5kO30uc3Qze2ZpbGw6IzNFQUY0RTtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MS4xODIxO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9PC9zdHlsZT48Zz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNOSwzOWgyN3YtM0g5VjM5eiBNMTIuNSwzMmwxLjUtMi41aDE3bDEuNSwyLjVIMTIuNXogTTEyLDM2di00aDIxdjRIMTJ6Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTE0LDI5LjV2LTEzaDE3djEzSDE0eiIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNCwxNi41TDExLDE0aDIzbC0zLDIuNUgxNHogTTExLDE0VjloNHYyaDVWOWg1djJoNVY5aDR2NUgxMXoiLz48cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTIsMzUuNWgyMSBNMTMsMzEuNWgxOSBNMTQsMjkuNWgxNyBNMTQsMTYuNWgxNyBNMTEsMTRoMjMiLz48L2c+PHJlY3QgeD0iMjguOCIgeT0iMjgiIGNsYXNzPSJzdDMiIHdpZHRoPSIxMy44IiBoZWlnaHQ9IjEzLjgiLz48L3N2Zz4=')";

        }
    }
  }
  objGA.ppawn=document.getElementsByClassName(objGA.myCol+' pawn');
  objGA.pking=document.getElementsByClassName(objGA.myCol+' king')[0];
  objGA.pqueen=document.getElementsByClassName(objGA.myCol+' queen')[0];
  objGA.pbishop=document.getElementsByClassName(objGA.myCol+' bishop');
},

ifTwoPieces: (name) => {
  let transform=objGA[name].style.transform;
  let extraction=transform.split(',');
  extraction[0]=extraction[0].replace(/\D/g,'');
  extraction[1]=extraction[1].replace(/\D/g,'');
  return [extraction[0]/objGA.squareS+1,8-extraction[1]/objGA.squareS];
},


PlayAMove: (x,y) => {
console.log('mymove');
const coord=[x,y];
let ExistingKeys;
let Fixedlength=objGA.keysT.length;
for (let i=0;i<Fixedlength;i++)
{
    ExistingKeys=objGA.PieceNames[objGA.keysT[0]];
    if (ExistingKeys){
let whatpiece=ExistingKeys.p||void 0;
let letter;
objGA.myCol==='white' ? letter = objGA.ConvertToLetters[x]+String(y) : letter = objGA.ConvertToLetters[9-x]+String(9-y);
//let legalJump;
//objGA.myCol==='white' ? legalJumps=objGA.DestPiece[letter];
//legalJumps=objGA.DestPiece["x*10+y"];
let destCurrent=objGA.DestPiece[letter];
let FromWhere;
if (destCurrent) {
FromWhere=destCurrent[whatpiece]||void 0;
if (FromWhere) {
let toNumber=[];

if(objGA.myCol==='white') {
for (let i=0;i<FromWhere.length;i++)
{
    toNumber.push([objGA.ConvertToDigits[FromWhere[i][0]],Number(FromWhere[i][1])]);
}
} else {
for (let i=0;i<FromWhere.length;i++)
{
     toNumber.push([9-objGA.ConvertToDigits[FromWhere[i][0]],9-Number(FromWhere[i][1])]);
}
}
let sames=toNumber.length;
console.log(whatpiece,destCurrent,FromWhere,toNumber);
if (sames===1) {objGA.executeMove(coord,toNumber[0])}
     else if (sames>1)    {
        let direction=ExistingKeys.d||void 0;
switch(whatpiece) {
  case 'pawn':
if (direction==='l') {
objGA.executeMove(coord,[coord[0]+1,coord[1]-1])
} else if (direction==='u') {
objGA.executeMove(coord,[coord[0],coord[1]-1])
} else {
objGA.executeMove(coord,[coord[0]-1,coord[1]-1])
}
    break;
  case 'knight':
let rKcoord=objGA.ifTwoPieces('rightKnight');
if (direction==='r') {
  objGA.executeMove(coord,rKcoord);
}
    else {
  (toNumber[0][0]===rKcoord[0]&&toNumber[0][1]===rKcoord[1]) ? objGA.executeMove(coord,toNumber[1]) : objGA.executeMove(coord,toNumber[0]);
    }
    break;
  case 'rook':
let rRcoord=objGA.ifTwoPieces('rightRook');
if (direction==='r') {
   objGA.executeMove(coord,rRcoord);
}
    else {
  (toNumber[0][0]===rRcoord[0]&&toNumber[0][1]===rRcoord[1]) ? objGA.executeMove(coord,toNumber[1]) : objGA.executeMove(coord,toNumber[0]);
    }
    break;
  case 'queen':
objGA.executeMove(coord,toNumber,void 0,true)
    break;
  default:
    // code block
}

                          }



}}




}
objGA.keysT.splice(0, 1);
}

},

executeMove: (to,from,dir=void 0,queens=false) => {

if (queens) {
  console.log(to,from);
  for (let i = 0; i < from.length; i++) {
    let theCoord = from[i].concat(to);
    for (let i = 0; i < theCoord.length; i++) {
      if (i%2 === 0) { theCoord[i]=theCoord[i]*objGA.sqsize-objGA.sqsize/2;}
      else  theCoord[i]=(9-theCoord[i])*objGA.sqsize-objGA.sqsize/2;
    }
    objGA.DoubleData([theCoord[0],theCoord[1]],[theCoord[2],theCoord[3]]);
      }
}
    else {
console.log(to,from)
let theCoord = from.concat(to);
for (let i = 0; i < theCoord.length; i++) {
  if (i%2 === 0) { theCoord[i]=theCoord[i]*objGA.sqsize-objGA.sqsize/2;}
  else  {theCoord[i]=(9-theCoord[i])*objGA.sqsize-objGA.sqsize/2;}
}
objGA.DoubleData([theCoord[0],theCoord[1]],[theCoord[2],theCoord[3]]);
}

                                       },

DoinMoves()             {
setTimeout(()=>{ if (objGA.player !== objGA.myCol){objGA.keysT = objGA.keys.slice(0); objGA.makemoves(123);} },0)
  //consoleBackUp('onChange')
objGA.PieceMoves={};
objGA.MovePiece={};
objGA.DestPiece={};
//console.log(objGA.inMoves);


                                      // objGA.inMoves!=={}?(
                                      Object.entries(objGA.inMoves).length !== 0 ?(
                    objGA.pieces ?
                             (
                        ()=>{
                    objGA.FixDests();
                            })()
                                 :
                        (()=>{
                    objGA.beginning=true;
                             })()
                                                       ) : objGA.FixPremoves();

                       },
MouseMoves(e) {
objGA.cx = e.clientX;
objGA.cy = e.clientY;
objGA.boardx = objGA.cx - objGA.x0;
objGA.boardy = objGA.cy - objGA.y0;
objGA.horiz = Math.ceil(objGA.boardx/objGA.sqsize);
objGA.vertic = 9-Math.ceil(objGA.boardy/objGA.sqsize);
    if (objGA.horiz != objGA.horiz2 || objGA.vertic != objGA.vertic2)
      {
        objGA.keysT = objGA.keys.slice(0);
         objGA.horiz0 = objGA.horiz;
          objGA.vertic0 = objGA.vertic;
           objGA.makemoves();
      }
            objGA.horiz2 = objGA.horiz;
            objGA.vertic2 = objGA.vertic;
              },
setHighlights: (k,t) => {
/*objGA.ppawn=document.getElementsByClassName(objGA.myCol+' pawn');
objGA.pking=document.getElementsByClassName(objGA.myCol+' king')[0];
objGA.pqueen=document.getElementsByClassName(objGA.myCol+' queen')[0];
objGA.pbishop=document.getElementsByClassName(objGA.myCol+' bishop');
objGA.leftKnight=document.getElementsByClassName(objGA.myCol+' knight')[objGA.n0];
objGA.rightKnight=document.getElementsByClassName(objGA.myCol+' knight')[objGA.n1];
objGA.leftRook=document.getElementsByClassName(objGA.myCol+' rook')[objGA.n0];
objGA.rightRook=document.getElementsByClassName(objGA.myCol+' rook')[objGA.n1];*/
let color;let length;
if (t===true) {color = 'blue';} else {color = '';}
switch (k)
{
case (objGA.PieceKeys[0]):  //pawns
case (objGA.PieceKeys[1]):
case (objGA.PieceKeys[2]):
length = objGA.ppawn.length;
if (length>0) {
  for (let i = 0; i < length; i++) {
  objGA.ppawn[i].style.backgroundColor=color;
  }
}
break;
case (objGA.PieceKeys[3]):  //king
if (objGA.pking) {objGA.pking.style.backgroundColor=color;}
break;
case (objGA.PieceKeys[4]):  //bishop
length = objGA.pbishop.length;
if (length>0) {
  for (let y = 0; y < length; y++) {
  objGA.pbishop[y].style.backgroundColor=color;
  }
}
break;
case (objGA.PieceKeys[5]):  //left rook
if (objGA.leftRook) {objGA.leftRook.style.backgroundColor=color;}
break;
case (objGA.PieceKeys[6]):  //right rook
if (objGA.rightRook) {objGA.rightRook.style.backgroundColor=color;}
break;
case (objGA.PieceKeys[7]):  //left knight
if (objGA.leftKnight) {objGA.leftKnight.style.backgroundColor=color;}
break;
case (objGA.PieceKeys[8]):  //right knight
if (objGA.rightKnight) {objGA.rightKnight.style.backgroundColor=color;}
break;
case (objGA.PieceKeys[9]):  //queen
if (objGA.pqueen) {objGA.pqueen.style.backgroundColor=color;}
break;

}
},
setBoard: () => {
    //setTimeout(()=>{
 objGA.board = document.querySelectorAll("cg-board")[0];
    objGA.rect = objGA.board.getBoundingClientRect();
        objGA.x0 = objGA.rect.left;
        objGA.y0 = objGA.rect.top;
        objGA.w = objGA.rect.width;
        objGA.sqsize = objGA.w / 8;
        objGA.squareS= Math.round(objGA.sqsize);
        objGA.board.addEventListener('mousemove',objGA.MouseMoves);
        document.addEventListener('keydown', objGA.KeyD);
        document.addEventListener('keyup', objGA.KeyU);
        objGA.KnightAndRooks();
        console.log('event');

   //},300)
},
setcolor: (color) => {
objGA.myCol=color;
//objGA.player=color;
},
setPieces: (pieces) => {
objGA.pieces=pieces;
objGA.beginning===true && objGA.inMoves && objGA.FixDests();
//(()=>{

},
setPremoves: (premoves) => {
objGA.premoves=premoves;
console.log(objGA.premoves);
},

KeyD(e) {
    let key = e.key;
    if (event.target.tagName!=="INPUT"&&(key==='f'||key==='s'||key==='z')) {e.preventDefault();/*e.stopPropagation();*/}
    if (!objGA.keys.includes(key) && key != 'Control' && key != 'Alt')
    {
    objGA.keys.unshift(key);
      objGA.keysT.unshift(key);
        objGA.makemoves();
    }
    objGA.setHighlights(key,true);
},
KeyU(e) {
    let key = event.key;
            for( let i = 0; i < objGA.keys.length; i++){
   if ( objGA.keys[i] === key) {
     objGA.keys.splice(i, 1);
   }
}
        for( let j = 0; j < objGA.keysT.length; j++){
   if ( objGA.keysT[j] === key) {
     objGA.keysT.splice(j, 1);
   }
}
   objGA.setHighlights(key,false);
},
makemoves(l=void 0) {
//console.log(objGA.horiz,objGA.vertic,objGA.keys,objGA.player)
if (objGA.keys.length!==0){
console.log(objGA.horiz,objGA.vertic,objGA.keys,objGA.player)
//if (l) consoleBackUp(l,objGA.horiz,objGA.vertic,objGA.myCol,objGA.legalmoves,objGA.DestPiece);
//try {consoleBackUp(objGA.DestPiece['f2']['knight'][0]=='h3')} catch {}
//try {if (objGA.DestPiece['f2']['knight'][0]=='h3'){console.warn('debugger')}}catch(e){console.warn(e)}
objGA.player === objGA.myCol ? objGA.PlayAMove(objGA.horiz,objGA.vertic) : objGA.FixPremoves(objGA.horiz,objGA.vertic);

}

},
ApplyData: (a,b) => {
  let ev = new MouseEvent("mousedown", {
            "view": window,
            "bubbles": true,
            "cancelable": false,
            "clientX": a
            +objGA.x0,
            "clientY": b
            +objGA.y0
        });
        objGA.board.dispatchEvent(ev);
},
DataTransition: (a,b,c=false) => {
  let ev = new MouseEvent("mouseup", {
            "view": window,
            "bubbles": true,
            "cancelable": false,
            "clientX": a
            +objGA.x0,
            "clientY": b
            +objGA.y0
        });
        objGA.board.dispatchEvent(ev);
        if (c===true) {objGA.Unselect(a,b);}
},
DoubleData: (a,b) => {
objGA.ApplyData(a[0],a[1]);
objGA.DataTransition(a[0],a[1]);
objGA.ApplyData(b[0],b[1]);
objGA.DataTransition(b[0],b[1],true);
window.setTimeout(()=>{
            // objGA.Unselect(b[0],b[1]);
           },15)
},
Unselect:(tx,ty) => {
       let ds = objGA.board.children;
       let length=ds.length;
               //console.log(c);
               for (let i = 0; i < length; ++i) {
                   if (ds[i].className.includes("selected")) {
                     objGA.ApplyData(tx,ty);
                     objGA.DataTransition(tx,ty);
                       return;
                   }
               }
   }

}


setTimeout(objGA.setBoard, 300);
objGA.setKeys();
//console.log(objGA.PieceNames,objGA.PieceNames[' '])


}
let consoleBackUp=console.log;
console.log = function(){}
