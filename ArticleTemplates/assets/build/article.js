! function(t, e, i) {
	"undefined" != typeof module && module.exports ? module.exports = i() : "function" == typeof define && define.amd ? define("bean", i) : e[t] = i()
}("bean", this, function(t, e) {
	t = t || "bean", e = e || this;
	var i, n = window,
		o = e[t],
		s = /[^\.]*(?=\..*)\.|.*/,
		r = /\..*/,
		a = "addEventListener",
		c = "removeEventListener",
		l = document || {},
		h = l.documentElement || {},
		u = h[a],
		d = u ? a : "attachEvent",
		p = {},
		f = Array.prototype.slice,
		m = function(t, e) {
			return t.split(e || " ")
		},
		g = function(t) {
			return "string" == typeof t
		},
		v = function(t) {
			return "function" == typeof t
		},
		y = "click dblclick mouseup mousedown contextmenu mousewheel mousemultiwheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange message error abort scroll ",
		w = "show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend textinput readystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete ",
		b = function(t, e, i) {
			for (i = 0; i < e.length; i++) e[i] && (t[e[i]] = 1);
			return t
		}({}, m(y + (u ? w : ""))),
		_ = function() {
			var t = "compareDocumentPosition" in h ? function(t, e) {
					return e.compareDocumentPosition && 16 === (16 & e.compareDocumentPosition(t))
				} : "contains" in h ? function(t, e) {
					return e = 9 === e.nodeType || e === window ? h : e, e !== t && e.contains(t)
				} : function(t, e) {
					for (; t = t.parentNode;)
						if (t === e) return 1;
					return 0
				},
				e = function(e) {
					var i = e.relatedTarget;
					return i ? i !== this && "xul" !== i.prefix && !/document/.test(this.toString()) && !t(i, this) : null == i
				};
			return {
				mouseenter: {
					base: "mouseover",
					condition: e
				},
				mouseleave: {
					base: "mouseout",
					condition: e
				},
				mousewheel: {
					base: /Firefox/.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel"
				}
			}
		}(),
		x = function() {
			var t = m("altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which propertyName"),
				e = t.concat(m("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement")),
				i = e.concat(m("wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis")),
				o = t.concat(m("char charCode key keyCode keyIdentifier keyLocation location")),
				s = t.concat(m("data")),
				r = t.concat(m("touches targetTouches changedTouches scale rotation")),
				a = t.concat(m("data origin source")),
				c = t.concat(m("state")),
				u = /over|out/,
				d = [{
					reg: /key/i,
					fix: function(t, e) {
						return e.keyCode = t.keyCode || t.which, o
					}
				}, {
					reg: /click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i,
					fix: function(t, i, n) {
						return i.rightClick = 3 === t.which || 2 === t.button, i.pos = {
							x: 0,
							y: 0
						}, t.pageX || t.pageY ? (i.clientX = t.pageX, i.clientY = t.pageY) : (t.clientX || t.clientY) && (i.clientX = t.clientX + l.body.scrollLeft + h.scrollLeft, i.clientY = t.clientY + l.body.scrollTop + h.scrollTop), u.test(n) && (i.relatedTarget = t.relatedTarget || t[("mouseover" == n ? "from" : "to") + "Element"]), e
					}
				}, {
					reg: /mouse.*(wheel|scroll)/i,
					fix: function() {
						return i
					}
				}, {
					reg: /^text/i,
					fix: function() {
						return s
					}
				}, {
					reg: /^touch|^gesture/i,
					fix: function() {
						return r
					}
				}, {
					reg: /^message$/i,
					fix: function() {
						return a
					}
				}, {
					reg: /^popstate$/i,
					fix: function() {
						return c
					}
				}, {
					reg: /.*/,
					fix: function() {
						return t
					}
				}],
				p = {},
				f = function(t, e, i) {
					if (arguments.length && (t = t || ((e.ownerDocument || e.document || e).parentWindow || n).event, this.originalEvent = t, this.isNative = i, this.isBean = !0, t)) {
						var o, s, r, a, c, l = t.type,
							h = t.target || t.srcElement;
						if (this.target = h && 3 === h.nodeType ? h.parentNode : h, i) {
							if (c = p[l], !c)
								for (o = 0, s = d.length; s > o; o++)
									if (d[o].reg.test(l)) {
										p[l] = c = d[o].fix;
										break
									}
							for (a = c(t, this, l), o = a.length; o--;) !((r = a[o]) in this) && r in t && (this[r] = t[r])
						}
					}
				};
			return f.prototype.preventDefault = function() {
				this.originalEvent.preventDefault ? this.originalEvent.preventDefault() : this.originalEvent.returnValue = !1
			}, f.prototype.stopPropagation = function() {
				this.originalEvent.stopPropagation ? this.originalEvent.stopPropagation() : this.originalEvent.cancelBubble = !0
			}, f.prototype.stop = function() {
				this.preventDefault(), this.stopPropagation(), this.stopped = !0
			}, f.prototype.stopImmediatePropagation = function() {
				this.originalEvent.stopImmediatePropagation && this.originalEvent.stopImmediatePropagation(), this.isImmediatePropagationStopped = function() {
					return !0
				}
			}, f.prototype.isImmediatePropagationStopped = function() {
				return this.originalEvent.isImmediatePropagationStopped && this.originalEvent.isImmediatePropagationStopped()
			}, f.prototype.clone = function(t) {
				var e = new f(this, this.element, this.isNative);
				return e.currentTarget = t, e
			}, f
		}(),
		S = function(t, e) {
			return u || e || t !== l && t !== n ? t : h
		},
		T = function() {
			var t = function(t, e, i, n) {
					var o = function(i, o) {
							return e.apply(t, n ? f.call(o, i ? 0 : 1).concat(n) : o)
						},
						s = function(i, n) {
							return e.__beanDel ? e.__beanDel.ft(i.target, t) : n
						},
						r = i ? function(t) {
							var e = s(t, this);
							return i.apply(e, arguments) ? (t && (t.currentTarget = e), o(t, arguments)) : void 0
						} : function(t) {
							return e.__beanDel && (t = t.clone(s(t))), o(t, arguments)
						};
					return r.__beanDel = e.__beanDel, r
				},
				e = function(e, i, n, o, s, r, a) {
					var c, l = _[i];
					"unload" == i && (n = A(X, e, i, n, o)), l && (l.condition && (n = t(e, n, l.condition, r)), i = l.base || i), this.isNative = c = b[i] && !!e[d], this.customType = !u && !c && i, this.element = e, this.type = i, this.original = o, this.namespaces = s, this.eventType = u || c ? i : "propertychange", this.target = S(e, c), this[d] = !!this.target[d], this.root = a, this.handler = t(e, n, null, r)
				};
			return e.prototype.inNamespaces = function(t) {
				var e, i, n = 0;
				if (!t) return !0;
				if (!this.namespaces) return !1;
				for (e = t.length; e--;)
					for (i = this.namespaces.length; i--;) t[e] == this.namespaces[i] && n++;
				return t.length === n
			}, e.prototype.matches = function(t, e, i) {
				return !(this.element !== t || e && this.original !== e || i && this.handler !== i)
			}, e
		}(),
		E = function() {
			var t = {},
				e = function(i, n, o, s, r, a) {
					var c = r ? "r" : "$";
					if (n && "*" != n) {
						var l, h = 0,
							u = t[c + n],
							d = "*" == i;
						if (!u) return;
						for (l = u.length; l > h; h++)
							if ((d || u[h].matches(i, o, s)) && !a(u[h], u, h, n)) return
					} else
						for (var p in t) p.charAt(0) == c && e(i, p.substr(1), o, s, r, a)
				},
				i = function(e, i, n, o) {
					var s, r = t[(o ? "r" : "$") + i];
					if (r)
						for (s = r.length; s--;)
							if (!r[s].root && r[s].matches(e, n, null)) return !0;
					return !1
				},
				n = function(t, i, n, o) {
					var s = [];
					return e(t, i, n, null, o, function(t) {
						return s.push(t)
					}), s
				},
				o = function(e) {
					var i = !e.root && !this.has(e.element, e.type, null, !1),
						n = (e.root ? "r" : "$") + e.type;
					return (t[n] || (t[n] = [])).push(e), i
				},
				s = function(i) {
					e(i.element, i.type, null, i.handler, i.root, function(e, i, n) {
						return i.splice(n, 1), e.removed = !0, 0 === i.length && delete t[(e.root ? "r" : "$") + e.type], !1
					})
				},
				r = function() {
					var e, i = [];
					for (e in t) "$" == e.charAt(0) && (i = i.concat(t[e]));
					return i
				};
			return {
				has: i,
				get: n,
				put: o,
				del: s,
				entries: r
			}
		}(),
		C = function(t) {
			i = arguments.length ? t : l.querySelectorAll ? function(t, e) {
				return e.querySelectorAll(t)
			} : function() {
				throw new Error("Bean: No selector engine installed")
			}
		},
		k = function(t, e) {
			if (u || !e || !t || t.propertyName == "_on" + e) {
				var i = E.get(this, e || t.type, null, !1),
					n = i.length,
					o = 0;
				for (t = new x(t, this, !0), e && (t.type = e); n > o && !t.isImmediatePropagationStopped(); o++) i[o].removed || i[o].handler.call(this, t)
			}
		},
		P = u ? function(t, e, i) {
			t[i ? a : c](e, k, !1)
		} : function(t, e, i, n) {
			var o;
			i ? (E.put(o = new T(t, n || e, function(e) {
				k.call(t, e, n)
			}, k, null, null, !0)), n && null == t["_on" + n] && (t["_on" + n] = 0), o.target.attachEvent("on" + o.eventType, o.handler)) : (o = E.get(t, n || e, k, !0)[0], o && (o.target.detachEvent("on" + o.eventType, o.handler), E.del(o)))
		},
		A = function(t, e, i, n, o) {
			return function() {
				n.apply(this, arguments), t(e, i, o)
			}
		},
		X = function(t, e, i, n) {
			var o, s, a = e && e.replace(r, ""),
				c = E.get(t, a, null, !1),
				l = {};
			for (o = 0, s = c.length; s > o; o++) i && c[o].original !== i || !c[o].inNamespaces(n) || (E.del(c[o]), !l[c[o].eventType] && c[o][d] && (l[c[o].eventType] = {
				t: c[o].eventType,
				c: c[o].type
			}));
			for (o in l) E.has(t, l[o].t, null, !1) || P(t, l[o].t, !1, l[o].c)
		},
		L = function(t, e) {
			var n = function(e, n) {
					for (var o, s = g(t) ? i(t, n) : t; e && e !== n; e = e.parentNode)
						for (o = s.length; o--;)
							if (s[o] === e) return e
				},
				o = function(t) {
					var i = n(t.target, this);
					i && e.apply(i, arguments)
				};
			return o.__beanDel = {
				ft: n,
				selector: t
			}, o
		},
		M = u ? function(t, e, i) {
			var o = l.createEvent(t ? "HTMLEvents" : "UIEvents");
			o[t ? "initEvent" : "initUIEvent"](e, !0, !0, n, 1), i.dispatchEvent(o)
		} : function(t, e, i) {
			i = S(i, t), t ? i.fireEvent("on" + e, l.createEventObject()) : i["_on" + e]++
		},
		Y = function(t, e, i) {
			var n, o, a, c, l = g(e);
			if (l && e.indexOf(" ") > 0) {
				for (e = m(e), c = e.length; c--;) Y(t, e[c], i);
				return t
			}
			if (o = l && e.replace(r, ""), o && _[o] && (o = _[o].base), !e || l)(a = l && e.replace(s, "")) && (a = m(a, ".")), X(t, o, i, a);
			else if (v(e)) X(t, null, e);
			else
				for (n in e) e.hasOwnProperty(n) && Y(t, n, e[n]);
			return t
		},
		I = function(t, e, n, o) {
			var a, c, l, h, u, g, y; {
				if (void 0 !== n || "object" != typeof e) {
					for (v(n) ? (u = f.call(arguments, 3), o = a = n) : (a = o, u = f.call(arguments, 4), o = L(n, a, i)), l = m(e), this === p && (o = A(Y, t, e, o, a)), h = l.length; h--;) y = E.put(g = new T(t, l[h].replace(r, ""), o, a, m(l[h].replace(s, ""), "."), u, !1)), g[d] && y && P(t, g.eventType, !0, g.customType);
					return t
				}
				for (c in e) e.hasOwnProperty(c) && I.call(this, t, c, e[c])
			}
		},
		D = function(t, e, i, n) {
			return I.apply(null, g(i) ? [t, i, e, n].concat(arguments.length > 3 ? f.call(arguments, 5) : []) : f.call(arguments))
		},
		H = function() {
			return I.apply(p, arguments)
		},
		N = function(t, e, i) {
			var n, o, a, c, l, h = m(e);
			for (n = h.length; n--;)
				if (e = h[n].replace(r, ""), (c = h[n].replace(s, "")) && (c = m(c, ".")), c || i || !t[d])
					for (l = E.get(t, e, null, !1), i = [!1].concat(i), o = 0, a = l.length; a > o; o++) l[o].inNamespaces(c) && l[o].handler.apply(t, i);
				else M(b[e], e, t);
			return t
		},
		z = function(t, e, i) {
			for (var n, o, s = E.get(e, i, null, !1), r = s.length, a = 0; r > a; a++) s[a].original && (n = [t, s[a].type], (o = s[a].handler.__beanDel) && n.push(o.selector), n.push(s[a].original), I.apply(null, n));
			return t
		},
		W = {
			on: I,
			add: D,
			one: H,
			off: Y,
			remove: Y,
			clone: z,
			fire: N,
			Event: x,
			setSelectorEngine: C,
			noConflict: function() {
				return e[t] = o, this
			}
		};
	if (n.attachEvent) {
		var q = function() {
			var t, e = E.entries();
			for (t in e) e[t].type && "unload" !== e[t].type && Y(e[t].element, e[t].type);
			n.detachEvent("onunload", q), n.CollectGarbage && n.CollectGarbage()
		};
		n.attachEvent("onunload", q)
	}
	return C(), W
}),
function(t, e, i) {
	"undefined" != typeof module && module.exports ? module.exports = i() : "function" == typeof define && define.amd ? define("bonzo", i) : e[t] = i()
}("bonzo", this, function() {
	function t(t, e) {
		var i = null,
			n = k.defaultView.getComputedStyle(t, "");
		return n && (i = n[e]), t.style[e] || i
	}

	function e(t) {
		return t && t.nodeName && (1 == t.nodeType || 11 == t.nodeType)
	}

	function i(t, i, n) {
		var o, s, r;
		if ("string" == typeof t) return x.create(t);
		if (e(t) && (t = [t]), n) {
			for (r = [], o = 0, s = t.length; s > o; o++) r[o] = y(i, t[o]);
			return r
		}
		return t
	}

	function n(t) {
		return new RegExp("(^|\\s+)" + t + "(\\s+|$)")
	}

	function o(t, e, i, n) {
		for (var o, s = 0, r = t.length; r > s; s++) o = n ? t.length - s - 1 : s, e.call(i || t[o], t[o], o, t);
		return t
	}

	function s(t, i, n) {
		for (var o = 0, r = t.length; r > o; o++) e(t[o]) && (s(t[o].childNodes, i, n), i.call(n || t[o], t[o], o, t));
		return t
	}

	function r(t) {
		return t.replace(/-(.)/g, function(t, e) {
			return e.toUpperCase()
		})
	}

	function a(t) {
		return t ? t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() : t
	}

	function c(t) {
		t[j]("data-node-uid") || t[R]("data-node-uid", ++q);
		var e = t[j]("data-node-uid");
		return W[e] || (W[e] = {})
	}

	function l(t) {
		var e = t[j]("data-node-uid");
		e && delete W[e]
	}

	function h(t) {
		var e;
		try {
			return null === t || void 0 === t ? void 0 : "true" === t ? !0 : "false" === t ? !1 : "null" === t ? null : (e = parseFloat(t)) == t ? e : t
		} catch (i) {}
	}

	function u(t, e, i) {
		for (var n = 0, o = t.length; o > n; ++n)
			if (e.call(i || null, t[n], n, t)) return !0;
		return !1
	}

	function d(t) {
		return "transform" == t && (t = $.transform) || /^transform-?[Oo]rigin$/.test(t) && (t = $.transform + "Origin"), t ? r(t) : null
	}

	function p(t, e, n, s) {
		var r = 0,
			a = e || this,
			c = [],
			l = G && "string" == typeof t && "<" != t.charAt(0) ? G(t) : t;
		return o(i(l), function(t, e) {
			o(a, function(i) {
				n(t, c[r++] = e > 0 ? y(a, i) : i)
			}, null, s)
		}, this, s), a.length = r, o(c, function(t) {
			a[--r] = t
		}, null, !s), a
	}

	function f(t, e, i) {
		var n = x(t),
			o = n.css("position"),
			s = n.offset(),
			r = "relative",
			a = o == r,
			c = [parseInt(n.css("left"), 10), parseInt(n.css("top"), 10)];
		"static" == o && (n.css("position", r), o = r), isNaN(c[0]) && (c[0] = a ? 0 : t.offsetLeft), isNaN(c[1]) && (c[1] = a ? 0 : t.offsetTop), null != e && (t.style.left = e - s.left + c[0] + F), null != i && (t.style.top = i - s.top + c[1] + F)
	}

	function m(t, e) {
		return "function" == typeof e ? e.call(t, t) : e
	}

	function g(t, e, i) {
		var n = this[0];
		return n ? null == t && null == e ? (w(n) ? b() : {
			x: n.scrollLeft,
			y: n.scrollTop
		})[i] : (w(n) ? C.scrollTo(t, e) : (null != t && (n.scrollLeft = t), null != e && (n.scrollTop = e)), this) : this
	}

	function v(t) {
		if (this.length = 0, t) {
			t = "string" == typeof t || t.nodeType || "undefined" == typeof t.length ? [t] : t, this.length = t.length;
			for (var e = 0; e < t.length; e++) this[e] = t[e]
		}
	}

	function y(t, e) {
		var i, n, o, s = e.cloneNode(!0);
		if (t.$ && "function" == typeof t.cloneEvents)
			for (t.$(s).cloneEvents(e), i = t.$(s).find("*"), n = t.$(e).find("*"), o = 0; o < n.length; o++) t.$(i[o]).cloneEvents(n[o]);
		return s
	}

	function w(t) {
		return t === C || /^(?:body|html)$/i.test(t.tagName)
	}

	function b() {
		return {
			x: C.pageXOffset || P.scrollLeft,
			y: C.pageYOffset || P.scrollTop
		}
	}

	function _(t) {
		var e = document.createElement("script"),
			i = t.match(M);
		return e.src = i[1], e
	}

	function x(t) {
		return new v(t)
	}
	var S, T, E, C = window,
		k = C.document,
		P = k.documentElement,
		A = "parentNode",
		X = /^(checked|value|selected|disabled)$/i,
		L = /^(select|fieldset|table|tbody|tfoot|td|tr|colgroup)$/i,
		M = /\s*<script +src=['"]([^'"]+)['"]>/,
		Y = ["<table>", "</table>", 1],
		I = ["<table><tbody><tr>", "</tr></tbody></table>", 3],
		D = ["<select>", "</select>", 1],
		H = ["_", "", 0, 1],
		N = {
			thead: Y,
			tbody: Y,
			tfoot: Y,
			colgroup: Y,
			caption: Y,
			tr: ["<table><tbody>", "</tbody></table>", 2],
			th: I,
			td: I,
			col: ["<table><colgroup>", "</colgroup></table>", 2],
			fieldset: ["<form>", "</form>", 1],
			legend: ["<form><fieldset>", "</fieldset></form>", 2],
			option: D,
			optgroup: D,
			script: H,
			style: H,
			link: H,
			param: H,
			base: H
		},
		z = /^(checked|selected|disabled)$/,
		W = {},
		q = 0,
		O = /^-?[\d\.]+$/,
		B = /^data-(.+)$/,
		F = "px",
		R = "setAttribute",
		j = "getAttribute",
		$ = function() {
			var t = k.createElement("p");
			return {
				transform: function() {
					var e, i = ["transform", "webkitTransform", "MozTransform", "OTransform", "msTransform"];
					for (e = 0; e < i.length; e++)
						if (i[e] in t.style) return i[e]
				}(),
				classList: "classList" in t
			}
		}(),
		U = /\s+/,
		V = String.prototype.toString,
		Q = {
			lineHeight: 1,
			zoom: 1,
			zIndex: 1,
			opacity: 1,
			boxFlex: 1,
			WebkitBoxFlex: 1,
			MozBoxFlex: 1
		},
		G = k.querySelectorAll && function(t) {
			return k.querySelectorAll(t)
		};
	return $.classList ? (S = function(t, e) {
		return t.classList.contains(e)
	}, T = function(t, e) {
		t.classList.add(e)
	}, E = function(t, e) {
		t.classList.remove(e)
	}) : (S = function(t, e) {
		return n(e).test(t.className)
	}, T = function(t, e) {
		t.className = (t.className + " " + e).trim()
	}, E = function(t, e) {
		t.className = t.className.replace(n(e), " ").trim()
	}), v.prototype = {
		get: function(t) {
			return this[t] || null
		},
		each: function(t, e) {
			return o(this, t, e)
		},
		deepEach: function(t, e) {
			return s(this, t, e)
		},
		map: function(t, e) {
			var i, n, o = [];
			for (n = 0; n < this.length; n++) i = t.call(this, this[n], n), e ? e(i) && o.push(i) : o.push(i);
			return o
		},
		html: function(t, e) {
			var n = e ? "textContent" : "innerHTML",
				s = this,
				r = function(e, n) {
					o(i(t, s, n), function(t) {
						e.appendChild(t)
					})
				},
				a = function(i, o) {
					try {
						if (e || "string" == typeof t && !L.test(i.tagName)) return i[n] = t
					} catch (s) {}
					r(i, o)
				};
			return "undefined" != typeof t ? this.empty().each(a) : this[0] ? this[0][n] : ""
		},
		text: function(t) {
			return this.html(t, !0)
		},
		append: function(t) {
			var e = this;
			return this.each(function(n, s) {
				o(i(t, e, s), function(t) {
					n.appendChild(t)
				})
			})
		},
		prepend: function(t) {
			var e = this;
			return this.each(function(n, s) {
				var r = n.firstChild;
				o(i(t, e, s), function(t) {
					n.insertBefore(t, r)
				})
			})
		},
		appendTo: function(t, e) {
			return p.call(this, t, e, function(t, e) {
				t.appendChild(e)
			})
		},
		prependTo: function(t, e) {
			return p.call(this, t, e, function(t, e) {
				t.insertBefore(e, t.firstChild)
			}, 1)
		},
		before: function(t) {
			var e = this;
			return this.each(function(n, s) {
				o(i(t, e, s), function(t) {
					n[A].insertBefore(t, n)
				})
			})
		},
		after: function(t) {
			var e = this;
			return this.each(function(n, s) {
				o(i(t, e, s), function(t) {
					n[A].insertBefore(t, n.nextSibling)
				}, null, 1)
			})
		},
		insertBefore: function(t, e) {
			return p.call(this, t, e, function(t, e) {
				t[A].insertBefore(e, t)
			})
		},
		insertAfter: function(t, e) {
			return p.call(this, t, e, function(t, e) {
				var i = t.nextSibling;
				i ? t[A].insertBefore(e, i) : t[A].appendChild(e)
			}, 1)
		},
		replaceWith: function(t) {
			var e = this;
			return this.each(function(n, s) {
				o(i(t, e, s), function(t) {
					n[A] && n[A].replaceChild(t, n)
				})
			})
		},
		clone: function(t) {
			var e, i, n = [];
			for (i = 0, e = this.length; e > i; i++) n[i] = y(t || this, this[i]);
			return x(n)
		},
		addClass: function(t) {
			return t = V.call(t).split(U), this.each(function(e) {
				o(t, function(t) {
					t && !S(e, m(e, t)) && T(e, m(e, t))
				})
			})
		},
		removeClass: function(t) {
			return t = V.call(t).split(U), this.each(function(e) {
				o(t, function(t) {
					t && S(e, m(e, t)) && E(e, m(e, t))
				})
			})
		},
		hasClass: function(t) {
			return t = V.call(t).split(U), u(this, function(e) {
				return u(t, function(t) {
					return t && S(e, t)
				})
			})
		},
		toggleClass: function(t, e) {
			return t = V.call(t).split(U), this.each(function(i) {
				o(t, function(t) {
					t && ("undefined" != typeof e ? e ? !S(i, t) && T(i, t) : E(i, t) : S(i, t) ? E(i, t) : T(i, t))
				})
			})
		},
		show: function(t) {
			return t = "string" == typeof t ? t : "", this.each(function(e) {
				e.style.display = t
			})
		},
		hide: function() {
			return this.each(function(t) {
				t.style.display = "none"
			})
		},
		toggle: function(t, e) {
			return e = "string" == typeof e ? e : "", "function" != typeof t && (t = null), this.each(function(i) {
				i.style.display = i.offsetWidth || i.offsetHeight ? "none" : e, t && t.call(i)
			})
		},
		first: function() {
			return x(this.length ? this[0] : [])
		},
		last: function() {
			return x(this.length ? this[this.length - 1] : [])
		},
		next: function() {
			return this.related("nextSibling")
		},
		previous: function() {
			return this.related("previousSibling")
		},
		parent: function() {
			return this.related(A)
		},
		related: function(t) {
			return x(this.map(function(e) {
				for (e = e[t]; e && 1 !== e.nodeType;) e = e[t];
				return e || 0
			}, function(t) {
				return t
			}))
		},
		focus: function() {
			return this.length && this[0].focus(), this
		},
		blur: function() {
			return this.length && this[0].blur(), this
		},
		css: function(e, i) {
			function n(t, e, i) {
				for (var n in s)
					if (s.hasOwnProperty(n)) {
						i = s[n], (e = d(n)) && O.test(i) && !(e in Q) && (i += F);
						try {
							t.style[e] = m(t, i)
						} catch (o) {}
					}
			}
			var o, s = e;
			return void 0 === i && "string" == typeof e ? (i = this[0], i ? i === k || i === C ? (o = i === k ? x.doc() : x.viewport(), "width" == e ? o.width : "height" == e ? o.height : "") : (e = d(e)) ? t(i, e) : null : null) : ("string" == typeof e && (s = {}, s[e] = i), this.each(n))
		},
		offset: function(t, e) {
			if (t && "object" == typeof t && ("number" == typeof t.top || "number" == typeof t.left)) return this.each(function(e) {
				f(e, t.left, t.top)
			});
			if ("number" == typeof t || "number" == typeof e) return this.each(function(i) {
				f(i, t, e)
			});
			if (!this[0]) return {
				top: 0,
				left: 0,
				height: 0,
				width: 0
			};
			var i = this[0],
				n = i.ownerDocument.documentElement,
				o = i.getBoundingClientRect(),
				s = b(),
				r = i.offsetWidth,
				a = i.offsetHeight,
				c = o.top + s.y - Math.max(0, n && n.clientTop, k.body.clientTop),
				l = o.left + s.x - Math.max(0, n && n.clientLeft, k.body.clientLeft);
			return {
				top: c,
				left: l,
				height: a,
				width: r
			}
		},
		dim: function() {
			if (!this.length) return {
				height: 0,
				width: 0
			};
			var t = this[0],
				e = 9 == t.nodeType && t.documentElement,
				i = e || !t.style || t.offsetWidth || t.offsetHeight ? null : function(e) {
					var i = {
						position: t.style.position || "",
						visibility: t.style.visibility || "",
						display: t.style.display || ""
					};
					return e.first().css({
						position: "absolute",
						visibility: "hidden",
						display: "block"
					}), i
				}(this),
				n = e ? Math.max(t.body.scrollWidth, t.body.offsetWidth, e.scrollWidth, e.offsetWidth, e.clientWidth) : t.offsetWidth,
				o = e ? Math.max(t.body.scrollHeight, t.body.offsetHeight, e.scrollHeight, e.offsetHeight, e.clientHeight) : t.offsetHeight;
			return i && this.first().css(i), {
				height: o,
				width: n
			}
		},
		attr: function(t, e) {
			var i, n = this[0];
			if ("string" != typeof t && !(t instanceof String)) {
				for (i in t) t.hasOwnProperty(i) && this.attr(i, t[i]);
				return this
			}
			return "undefined" == typeof e ? n ? X.test(t) ? z.test(t) && "string" == typeof n[t] ? !0 : n[t] : n[j](t) : null : this.each(function(i) {
				X.test(t) ? i[t] = m(i, e) : i[R](t, m(i, e))
			})
		},
		removeAttr: function(t) {
			return this.each(function(e) {
				z.test(t) ? e[t] = !1 : e.removeAttribute(t)
			})
		},
		val: function(t) {
			return "string" == typeof t || "number" == typeof t ? this.attr("value", t) : this.length ? this[0].value : null
		},
		data: function(t, e) {
			var i, n, s = this[0];
			return "undefined" == typeof e ? s ? (i = c(s), "undefined" == typeof t ? (o(s.attributes, function(t) {
				(n = ("" + t.name).match(B)) && (i[r(n[1])] = h(t.value))
			}), i) : ("undefined" == typeof i[t] && (i[t] = h(this.attr("data-" + a(t)))), i[t])) : null : this.each(function(i) {
				c(i)[t] = e
			})
		},
		remove: function() {
			return this.deepEach(l), this.detach()
		},
		empty: function() {
			return this.each(function(t) {
				for (s(t.childNodes, l); t.firstChild;) t.removeChild(t.firstChild)
			})
		},
		detach: function() {
			return this.each(function(t) {
				t[A] && t[A].removeChild(t)
			})
		},
		scrollTop: function(t) {
			return g.call(this, null, t, "y")
		},
		scrollLeft: function(t) {
			return g.call(this, t, null, "x")
		}
	}, x.setQueryEngine = function(t) {
		G = t, delete x.setQueryEngine
	}, x.aug = function(t, e) {
		for (var i in t) t.hasOwnProperty(i) && ((e || v.prototype)[i] = t[i])
	}, x.create = function(t) {
		return "string" == typeof t && "" !== t ? function() {
			if (M.test(t)) return [_(t)];
			var e = t.match(/^\s*<([^\s>]+)/),
				i = k.createElement("div"),
				n = [],
				s = e ? N[e[1].toLowerCase()] : null,
				r = s ? s[2] + 1 : 1,
				a = s && s[3],
				c = A;
			for (i.innerHTML = s ? s[0] + t + s[1] : t; r--;) i = i.firstChild;
			a && i && 1 !== i.nodeType && (i = i.nextSibling);
			do e && 1 != i.nodeType || n.push(i); while (i = i.nextSibling);
			return o(n, function(t) {
				t[c] && t[c].removeChild(t)
			}), n
		}() : e(t) ? [t.cloneNode(!0)] : []
	}, x.doc = function() {
		var t = x.viewport();
		return {
			width: Math.max(k.body.scrollWidth, P.scrollWidth, t.width),
			height: Math.max(k.body.scrollHeight, P.scrollHeight, t.height)
		}
	}, x.firstChild = function(t) {
		for (var e, i = t.childNodes, n = 0, o = i && i.length || 0; o > n; n++) 1 === i[n].nodeType && (e = i[o = n]);
		return e
	}, x.viewport = function() {
		return {
			width: C.innerWidth,
			height: C.innerHeight
		}
	}, x.isAncestor = "compareDocumentPosition" in P ? function(t, e) {
		return 16 == (16 & t.compareDocumentPosition(e))
	} : function(t, e) {
		return t !== e && t.contains(e)
	}, x
}), define("fence", [], function() {
		function t(e, i, n, o) {
			o = o || 0, e(), i > 0 && setTimeout(function() {
				var s = n + o;
				t(e, i - 1, s, n)
			}, n)
		}

		function e(e) {
			setTimeout(function() {
				t(function() {
					r(e), a(e)
				}, f, p)
			}, 0)
		}

		function i(t, e) {
			return t.classList ? t.classList.contains(e) : -1 !== t.className.indexOf(e)
		}

		function n(t, e) {
			return t.classList ? t.classList.add(e) : t.className += " " + e
		}

		function o() {
			for (var t = "iframe." + u, e = document.querySelectorAll(t), i = 0, n = e.length; n > i; ++i) s(e[i])
		}

		function s(t, o) {
			if (o = o || {}, "IFRAME" !== t.tagName) throw new Error("Cannot render non-iframe elements!");
			if (!i(t, u)) throw new Error("Cannot render iframes with no " + u + " class!");
			var s = i(t, d);
			if (!s || o.force) {
				t.style.height = 0, t.frameBorder = 0, t.style.border = "none", t.style.overflow = "hidden", t.width = "100%";
				var r = !!t.srcdoc;
				if (r) "complete" === t.contentWindow.document.readyState ? e(t) : s || t.addEventListener("load", function() {
					e(t)
				}, !1);
				else {
					var a = t.getAttribute("srcdoc");
					a && "string" == typeof a && (t.contentWindow.contents = a, t.src = 'javascript:window["contents"]', e(t))
				}
				n(t, d)
			}
		}

		function r(t) {
			var e = t.contentWindow && t.contentWindow.document,
				i = e && e.body;
			i && (i.style.padding = 0, i.style.margin = 0, i.style.overflow = "hidden")
		}

		function a(t) {
			var e = t.contentWindow && t.contentWindow.document;
			if (e) {
				var i = e.documentElement && e.documentElement.scrollHeight || e.body && e.body.scrollHeight || 0;
				t.style.height = i + "px"
			}
		}

		function c(t) {
			var e = document.createElement("div");
			e.innerHTML = (t || "").trim();
			var i = e.firstChild,
				n = i && "IFRAME" === i.tagName,
				o = i && !i.nextSibling;
			return n && o
		}

		function l(t) {
			var e = document.createElement("div");
			return e.appendChild(document.createTextNode(t)), e.innerHTML
		}

		function h(t) {
			if (c(t)) return t;
			var e = l(t).replace(/\"/g, "&quot;"),
				i = "<html><head></head><body>" + e + "</body></html>";
			return '<iframe srcdoc="' + i + '" class="' + u + '"></iframe>'
		}
		var u = "fenced",
			d = "fenced-rendered",
			p = 300,
			f = 12;
		return {
			render: s,
			renderAll: o,
			isSafeCode: c,
			wrap: h
		}
	}),
	function() {
		"use strict";

		function t(e, n) {
			function o(t, e) {
				return function() {
					return t.apply(e, arguments)
				}
			}
			var s;
			if (n = n || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = n.touchBoundary || 10, this.layer = e, this.tapDelay = n.tapDelay || 200, this.tapTimeout = n.tapTimeout || 700, !t.notNeeded(e)) {
				for (var r = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], a = this, c = 0, l = r.length; l > c; c++) a[r[c]] = o(a[r[c]], a);
				i && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, i, n) {
					var o = Node.prototype.removeEventListener;
					"click" === t ? o.call(e, t, i.hijacked || i, n) : o.call(e, t, i, n)
				}, e.addEventListener = function(t, i, n) {
					var o = Node.prototype.addEventListener;
					"click" === t ? o.call(e, t, i.hijacked || (i.hijacked = function(t) {
						t.propagationStopped || i(t)
					}), n) : o.call(e, t, i, n)
				}), "function" == typeof e.onclick && (s = e.onclick, e.addEventListener("click", function(t) {
					s(t)
				}, !1), e.onclick = null)
			}
		}
		var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
			i = navigator.userAgent.indexOf("Android") > 0 && !e,
			n = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
			o = n && /OS 4_\d(_\d)?/.test(navigator.userAgent),
			s = n && /OS [6-7]_\d/.test(navigator.userAgent),
			r = navigator.userAgent.indexOf("BB10") > 0;
		t.prototype.needsClick = function(t) {
			switch (t.nodeName.toLowerCase()) {
				case "button":
				case "select":
				case "textarea":
					if (t.disabled) return !0;
					break;
				case "input":
					if (n && "file" === t.type || t.disabled) return !0;
					break;
				case "label":
				case "iframe":
				case "video":
					return !0
			}
			return /\bneedsclick\b/.test(t.className)
		}, t.prototype.needsFocus = function(t) {
			switch (t.nodeName.toLowerCase()) {
				case "textarea":
					return !0;
				case "select":
					return !i;
				case "input":
					switch (t.type) {
						case "button":
						case "checkbox":
						case "file":
						case "image":
						case "radio":
						case "submit":
							return !1
					}
					return !t.disabled && !t.readOnly;
				default:
					return /\bneedsfocus\b/.test(t.className)
			}
		}, t.prototype.sendClick = function(t, e) {
			var i, n;
			document.activeElement && document.activeElement !== t && document.activeElement.blur(), n = e.changedTouches[0], i = document.createEvent("MouseEvents"), i.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), i.forwardedTouchEvent = !0, t.dispatchEvent(i)
		}, t.prototype.determineEventType = function(t) {
			return i && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
		}, t.prototype.focus = function(t) {
			var e;
			n && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
		}, t.prototype.updateScrollParent = function(t) {
			var e, i;
			if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
				i = t;
				do {
					if (i.scrollHeight > i.offsetHeight) {
						e = i, t.fastClickScrollParent = i;
						break
					}
					i = i.parentElement
				} while (i)
			}
			e && (e.fastClickLastScrollTop = e.scrollTop)
		}, t.prototype.getTargetElementFromEventTarget = function(t) {
			return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
		}, t.prototype.onTouchStart = function(t) {
			var e, i, s;
			if (t.targetTouches.length > 1) return !0;
			if (e = this.getTargetElementFromEventTarget(t.target), i = t.targetTouches[0], n) {
				if (s = window.getSelection(), s.rangeCount && !s.isCollapsed) return !0;
				if (!o) {
					if (i.identifier && i.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
					this.lastTouchIdentifier = i.identifier, this.updateScrollParent(e)
				}
			}
			return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = i.pageX, this.touchStartY = i.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
		}, t.prototype.touchHasMoved = function(t) {
			var e = t.changedTouches[0],
				i = this.touchBoundary;
			return Math.abs(e.pageX - this.touchStartX) > i || Math.abs(e.pageY - this.touchStartY) > i ? !0 : !1
		}, t.prototype.onTouchMove = function(t) {
			return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
		}, t.prototype.findControl = function(t) {
			return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
		}, t.prototype.onTouchEnd = function(t) {
			var e, r, a, c, l, h = this.targetElement;
			if (!this.trackingClick) return !0;
			if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
			if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
			if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, r = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, s && (l = t.changedTouches[0], h = document.elementFromPoint(l.pageX - window.pageXOffset, l.pageY - window.pageYOffset) || h, h.fastClickScrollParent = this.targetElement.fastClickScrollParent), a = h.tagName.toLowerCase(), "label" === a) {
				if (e = this.findControl(h)) {
					if (this.focus(h), i) return !1;
					h = e
				}
			} else if (this.needsFocus(h)) return t.timeStamp - r > 100 || n && window.top !== window && "input" === a ? (this.targetElement = null, !1) : (this.focus(h), this.sendClick(h, t), n && "select" === a || (this.targetElement = null, t.preventDefault()), !1);
			return n && !o && (c = h.fastClickScrollParent, c && c.fastClickLastScrollTop !== c.scrollTop) ? !0 : (this.needsClick(h) || (t.preventDefault(), this.sendClick(h, t)), !1)
		}, t.prototype.onTouchCancel = function() {
			this.trackingClick = !1, this.targetElement = null
		}, t.prototype.onMouse = function(t) {
			return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0
		}, t.prototype.onClick = function(t) {
			var e;
			return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
		}, t.prototype.destroy = function() {
			var t = this.layer;
			i && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
		}, t.notNeeded = function(t) {
			var e, n, o, s;
			if ("undefined" == typeof window.ontouchstart) return !0;
			if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
				if (!i) return !0;
				if (e = document.querySelector("meta[name=viewport]")) {
					if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
					if (n > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
				}
			}
			if (r && (o = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), o[1] >= 10 && o[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
				if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
				if (document.documentElement.scrollWidth <= window.outerWidth) return !0
			}
			return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (s = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], s >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1)
		}, t.attach = function(e, i) {
			return new t(e, i)
		}, "function" == typeof define && "object" == typeof define.amd && define.amd ? define("fastClick", [], function() {
			return t
		}) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
	}(),
	function(t, e) {
		"function" == typeof define && define.amd ? define("smoothScroll", [], e(t)) : "object" == typeof exports ? module.exports = e(t) : t.smoothScroll = e(t)
	}("undefined" != typeof global ? global : this.window || this.global, function(t) {
		"use strict";
		var e, i, n, o, s, r = {},
			a = "querySelector" in document && "addEventListener" in t,
			c = {
				selector: "[data-scroll]",
				selectorHeader: "[data-scroll-header]",
				speed: 500,
				easing: "easeInOutCubic",
				offset: 0,
				updateURL: !0,
				callback: function() {}
			},
			l = function() {
				var t = {},
					e = !1,
					i = 0,
					n = arguments.length;
				"[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (e = arguments[0], i++);
				for (var o = function(i) {
						for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e && "[object Object]" === Object.prototype.toString.call(i[n]) ? t[n] = l(!0, t[n], i[n]) : t[n] = i[n])
					}; n > i; i++) {
					var s = arguments[i];
					o(s)
				}
				return t
			},
			h = function(t) {
				return Math.max(t.scrollHeight, t.offsetHeight, t.clientHeight)
			},
			u = function(t, e) {
				var i, n, o = e.charAt(0),
					s = "classList" in document.documentElement;
				for ("[" === o && (e = e.substr(1, e.length - 2), i = e.split("="), i.length > 1 && (n = !0, i[1] = i[1].replace(/"/g, "").replace(/'/g, ""))); t && t !== document; t = t.parentNode) {
					if ("." === o)
						if (s) {
							if (t.classList.contains(e.substr(1))) return t
						} else if (new RegExp("(^|\\s)" + e.substr(1) + "(\\s|$)").test(t.className)) return t;
					if ("#" === o && t.id === e.substr(1)) return t;
					if ("[" === o && t.hasAttribute(i[0])) {
						if (!n) return t;
						if (t.getAttribute(i[0]) === i[1]) return t
					}
					if (t.tagName.toLowerCase() === e) return t
				}
				return null
			};
		r.escapeCharacters = function(t) {
			"#" === t.charAt(0) && (t = t.substr(1));
			for (var e, i = String(t), n = i.length, o = -1, s = "", r = i.charCodeAt(0); ++o < n;) {
				if (e = i.charCodeAt(o), 0 === e) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
				s += e >= 1 && 31 >= e || 127 == e || 0 === o && e >= 48 && 57 >= e || 1 === o && e >= 48 && 57 >= e && 45 === r ? "\\" + e.toString(16) + " " : e >= 128 || 45 === e || 95 === e || e >= 48 && 57 >= e || e >= 65 && 90 >= e || e >= 97 && 122 >= e ? i.charAt(o) : "\\" + i.charAt(o)
			}
			return "#" + s
		};
		var d = function(t, e) {
				var i;
				return "easeInQuad" === t && (i = e * e), "easeOutQuad" === t && (i = e * (2 - e)), "easeInOutQuad" === t && (i = .5 > e ? 2 * e * e : -1 + (4 - 2 * e) * e), "easeInCubic" === t && (i = e * e * e), "easeOutCubic" === t && (i = --e * e * e + 1), "easeInOutCubic" === t && (i = .5 > e ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1), "easeInQuart" === t && (i = e * e * e * e), "easeOutQuart" === t && (i = 1 - --e * e * e * e), "easeInOutQuart" === t && (i = .5 > e ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e), "easeInQuint" === t && (i = e * e * e * e * e), "easeOutQuint" === t && (i = 1 + --e * e * e * e * e), "easeInOutQuint" === t && (i = .5 > e ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e), i || e
			},
			p = function(t, e, i) {
				var n = 0;
				if (t.offsetParent)
					do n += t.offsetTop, t = t.offsetParent; while (t);
				return n = n - e - i, n >= 0 ? n : 0
			},
			f = function() {
				return Math.max(t.document.body.scrollHeight, t.document.documentElement.scrollHeight, t.document.body.offsetHeight, t.document.documentElement.offsetHeight, t.document.body.clientHeight, t.document.documentElement.clientHeight)
			},
			m = function(t) {
				return t && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(t) : {}
			},
			g = function(e, i) {
				t.history.pushState && (i || "true" === i) && "file:" !== t.location.protocol && t.history.pushState(null, null, [t.location.protocol, "//", t.location.host, t.location.pathname, t.location.search, e].join(""))
			},
			v = function(t) {
				return null === t ? 0 : h(t) + t.offsetTop
			};
		r.animateScroll = function(i, r, a) {
			var h = m(r ? r.getAttribute("data-options") : null),
				u = l(e || c, a || {}, h),
				y = "[object Number]" === Object.prototype.toString.call(i) ? !0 : !1,
				w = y ? null : "#" === i ? t.document.documentElement : t.document.querySelector(i);
			if (y || w) {
				var b = t.pageYOffset;
				n || (n = t.document.querySelector(u.selectorHeader)), o || (o = v(n));
				var _, x, S = y ? i : p(w, o, parseInt(u.offset, 10)),
					T = S - b,
					E = f(),
					C = 0;
				y || g(i, u.updateURL);
				var k = function(e, n, o) {
						var s = t.pageYOffset;
						(e == n || s == n || t.innerHeight + s >= E) && (clearInterval(o), y || w.focus(), u.callback(i, r))
					},
					P = function() {
						C += 16, _ = C / parseInt(u.speed, 10), _ = _ > 1 ? 1 : _, x = b + T * d(u.easing, _), t.scrollTo(0, Math.floor(x)), k(x, S, s)
					},
					A = function() {
						clearInterval(s), s = setInterval(P, 16)
					};
				0 === t.pageYOffset && t.scrollTo(0, 0), A()
			}
		};
		var y = function(t) {
				if (0 === t.button && !t.metaKey && !t.ctrlKey) {
					var i = u(t.target, e.selector);
					if (i && "a" === i.tagName.toLowerCase()) {
						t.preventDefault();
						var n = r.escapeCharacters(i.hash);
						r.animateScroll(n, i, e)
					}
				}
			},
			w = function(t) {
				i || (i = setTimeout(function() {
					i = null, o = v(n)
				}, 66))
			};
		return r.destroy = function() {
			e && (t.document.removeEventListener("click", y, !1), t.removeEventListener("resize", w, !1), e = null, i = null, n = null, o = null, s = null)
		}, r.init = function(i) {
			a && (r.destroy(), e = l(c, i || {}), n = t.document.querySelector(e.selectorHeader), o = v(n), t.document.addEventListener("click", y, !1), n && t.addEventListener("resize", w, !1))
		}, r
	}),
	function(t, e) {
		"function" == typeof define && define.amd ? define("flipSnap", [], e) : "object" == typeof exports ? module.exports = e() : t.Flipsnap = e()
	}(this, function() {
		function t(e, i) {
			return this instanceof t ? this.init(e, i) : new t(e, i)
		}

		function e(t, e) {
			return t.changedTouches ? t.changedTouches[0][e] : t[e]
		}

		function i(t) {
			return r(t, function(t) {
				return void 0 !== l.style[t]
			})
		}

		function n(t, e, i) {
			var n = u[e];
			n ? t[n] = i : void 0 !== t[e] ? (u[e] = e, t[e] = i) : r(h, function(n) {
				var o = s(n) + s(e);
				return void 0 !== t[o] ? (u[e] = o, t[o] = i, !0) : void 0
			})
		}

		function o(t) {
			if (void 0 !== l.style[t]) return t;
			var e;
			return r(h, function(i) {
				var n = s(i) + s(t);
				return void 0 !== l.style[n] ? (e = "-" + i + "-" + t, !0) : void 0
			}), e
		}

		function s(t) {
			return t.charAt(0).toUpperCase() + t.substr(1)
		}

		function r(t, e) {
			for (var i = 0, n = t.length; n > i; i++)
				if (e(t[i], i)) return !0;
			return !1
		}

		function a(t, e, i, n) {
			var o = Math.abs(t - i),
				s = Math.abs(e - n),
				r = Math.sqrt(Math.pow(o, 2) + Math.pow(s, 2));
			return {
				x: o,
				y: s,
				z: r
			}
		}

		function c(t) {
			var e = t.y / t.z,
				i = Math.acos(e);
			return 180 / (Math.PI / i)
		}
		var l = document.createElement("div"),
			h = ["webkit", "moz", "o", "ms"],
			u = {},
			d = t.support = {},
			p = !1,
			f = 5,
			m = 55;
		d.transform3d = i(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]), d.transform = i(["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"]), d.transition = i(["transitionProperty", "WebkitTransitionProperty", "MozTransitionProperty", "OTransitionProperty", "msTransitionProperty"]), d.addEventListener = "addEventListener" in window, d.mspointer = window.navigator.msPointerEnabled, d.cssAnimation = (d.transform3d || d.transform) && d.transition;
		var g = ["touch", "mouse"],
			v = {
				start: {
					touch: "touchstart",
					mouse: "mousedown"
				},
				move: {
					touch: "touchmove",
					mouse: "mousemove"
				},
				end: {
					touch: "touchend",
					mouse: "mouseup"
				},
				cancel: {
					touch: "touchcancel"
				}
			};
		return d.addEventListener && (document.addEventListener("gesturestart", function() {
			p = !0
		}), document.addEventListener("gestureend", function() {
			p = !1
		})), t.prototype.init = function(t, e) {
			var i = this;
			if (i.element = t, "string" == typeof t && (i.element = document.querySelector(t)), !i.element) throw new Error("element not found");
			return d.mspointer && (i.element.style.msTouchAction = "pan-y"), e = e || {}, i.distance = e.distance, i.maxPoint = e.maxPoint, i.disableTouch = void 0 === e.disableTouch ? !1 : e.disableTouch, i.disable3d = void 0 === e.disable3d ? !1 : e.disable3d, i.transitionDuration = void 0 === e.transitionDuration ? "350ms" : e.transitionDuration + "ms", i.threshold = e.threshold || 0, i.currentPoint = 0, i.currentX = 0, i.animation = !1, i.timerId = null, i.use3d = d.transform3d, i.disable3d === !0 && (i.use3d = !1), d.cssAnimation ? i._setStyle({
				transitionProperty: o("transform"),
				transitionTimingFunction: "cubic-bezier(0,0,0.25,1)",
				transitionDuration: "0ms",
				transform: i._getTranslate(0)
			}) : i._setStyle({
				position: "relative",
				left: "0px"
			}), i.refresh(), g.forEach(function(t) {
				i.element.addEventListener(v.start[t], i, !1)
			}), i
		}, t.prototype.handleEvent = function(t) {
			var e = this;
			switch (t.type) {
				case v.start.touch:
					e._touchStart(t, "touch");
					break;
				case v.start.mouse:
					e._touchStart(t, "mouse");
					break;
				case v.move.touch:
					e._touchMove(t, "touch");
					break;
				case v.move.mouse:
					e._touchMove(t, "mouse");
					break;
				case v.end.touch:
					e._touchEnd(t, "touch");
					break;
				case v.end.mouse:
					e._touchEnd(t, "mouse");
					break;
				case v.cancel.touch:
					e._touchCancel(t, "touch");
					break;
				case "click":
					e._click(t)
			}
		}, t.prototype.refresh = function() {
			var t = this,
				e = t.element.parentElement,
				i = e.currentStyle || window.getComputedStyle(e),
				n = e.offsetWidth - parseInt(i.paddingRight.replace("px", "")) - parseInt(i.paddingLeft.replace("px", ""));
			t._maxX = -1 * (t.element.scrollWidth - n);
			var o = t.element.children[0],
				s = o.currentStyle || window.getComputedStyle(o);
			t._distance = parseInt(s.marginRight.replace("px", "")) + o.offsetWidth, t._maxPoint = void 0 === t.maxPoint ? function() {
				for (var e, i = t.element.childNodes, n = -1, o = 0, s = i.length; s > o; o++) e = i[o], 1 === e.nodeType && n++;
				return n
			}() : t.maxPoint, t.moveToPoint()
		}, t.prototype.moveToPoint = function(t, e) {
			var i = this;
			e = void 0 === e ? i.transitionDuration : e + "ms";
			var n = i.currentPoint;
			void 0 === t && (t = i.currentPoint), 0 > t ? i.currentPoint = 0 : t > i._maxPoint ? i.currentPoint = i._maxPoint : i.currentPoint = parseInt(t, 10), d.cssAnimation ? i._setStyle({
				transitionDuration: e
			}) : i.animation = !0;
			var o = -i.currentPoint * i._distance;
			o < i._maxX && (o = i._maxX), i._setX(o, e), n !== i.currentPoint && (i._triggerEvent("fsmoveend", !0, !1), i._triggerEvent("fspointmove", !0, !1))
		}, t.prototype._setX = function(t, e) {
			var i = this;
			i.currentX = t, d.cssAnimation ? i.element.style[u.transform] = i._getTranslate(t) : i.animation ? i._animate(t, e || i.transitionDuration) : i.element.style.left = t + "px"
		}, t.prototype._touchStart = function(t, i) {
			var n = this;
			if (!(n.disableTouch || n.scrolling || p)) {
				n.element.addEventListener(v.move[i], n, !1), document.addEventListener(v.end[i], n, !1);
				var o = t.target.tagName;
				"mouse" === i && "SELECT" !== o && "INPUT" !== o && "TEXTAREA" !== o && "BUTTON" !== o && t.preventDefault(), d.cssAnimation ? n._setStyle({
					transitionDuration: "0ms"
				}) : n.animation = !1, n.scrolling = !0, n.moveReady = !1, n.startPageX = e(t, "pageX"), n.startPageY = e(t, "pageY"), n.basePageX = n.startPageX, n.directionX = 0, n.startTime = t.timeStamp, n._triggerEvent("fstouchstart", !0, !1)
			}
		}, t.prototype._touchMove = function(t, i) {
			var n = this;
			if (n.scrolling && !p) {
				var o, s, r = e(t, "pageX"),
					l = e(t, "pageY");
				if (n.moveReady) {
					t.preventDefault(), o = r - n.basePageX, s = n.currentX + o, (s >= 0 || s < n._maxX) && (s = Math.round(n.currentX + o / 3)), n.directionX = 0 === o ? n.directionX : o > 0 ? -1 : 1;
					var h = !n._triggerEvent("fstouchmove", !0, !0, {
						delta: o,
						direction: n.directionX
					});
					h ? n._touchAfter({
						moved: !1,
						originalPoint: n.currentPoint,
						newPoint: n.currentPoint,
						cancelled: !0
					}) : n._setX(s)
				} else {
					var u = a(n.startPageX, n.startPageY, r, l);
					u.z > f && (c(u) > m ? (t.preventDefault(), n.moveReady = !0, n.element.addEventListener("click", n, !0)) : n.scrolling = !1)
				}
				n.basePageX = r
			}
		}, t.prototype._touchEnd = function(t, e) {
			var i = this;
			if (i.element.removeEventListener(v.move[e], i, !1), document.removeEventListener(v.end[e], i, !1), i.scrolling) {
				var n = -i.currentX / i._distance;
				n = i.directionX > 0 ? Math.ceil(n) : i.directionX < 0 ? Math.floor(n) : Math.round(n), 0 > n ? n = 0 : n > i._maxPoint && (n = i._maxPoint), Math.abs(i.startPageX - i.basePageX) < i.threshold && (n = i.currentPoint), i._touchAfter({
					moved: n !== i.currentPoint,
					originalPoint: i.currentPoint,
					newPoint: n,
					cancelled: !1
				}), i.moveToPoint(n)
			}
		}, t.prototype._touchCancel = function(t, e) {
			t.stopPropagation(), t.preventDefault()
		}, t.prototype._click = function(t) {
			t.stopPropagation(), t.preventDefault()
		}, t.prototype._touchAfter = function(t) {
			var e = this;
			e.scrolling = !1, e.moveReady = !1, setTimeout(function() {
				e.element.removeEventListener("click", e, !0)
			}, 200), e._triggerEvent("fstouchend", !0, !1, t)
		}, t.prototype._setStyle = function(t) {
			var e = this,
				i = e.element.style;
			for (var o in t) n(i, o, t[o])
		}, t.prototype._animate = function(t, e) {
			var i = this,
				n = i.element,
				o = +new Date,
				s = parseInt(n.style.left, 10),
				r = t,
				a = parseInt(e, 10),
				c = function(t, e) {
					return -(t /= e) * (t - 2)
				};
			i.timerId && clearInterval(i.timerId), i.timerId = setInterval(function() {
				var t, e, l = new Date - o;
				l > a ? (clearInterval(i.timerId), i.timerId = null, e = r) : (t = c(l, a), e = t * (r - s) + s), n.style.left = e + "px"
			}, 10)
		}, t.prototype.destroy = function() {
			var t = this;
			g.forEach(function(e) {
				t.element.removeEventListener(v.start[e], t, !1)
			})
		}, t.prototype._getTranslate = function(t) {
			var e = this;
			return e.use3d ? "translate3d(" + t + "px, 0, 0)" : "translate(" + t + "px, 0)"
		}, t.prototype._triggerEvent = function(t, e, i, n) {
			var o = this,
				s = document.createEvent("Event");
			if (s.initEvent(t, e, i), n)
				for (var r in n) n.hasOwnProperty(r) && (s[r] = n[r]);
			return o.element.dispatchEvent(s)
		}, t
	}),
	function(t, e, i) {
		"undefined" != typeof module && module.exports ? module.exports = i() : "function" == typeof define && define.amd ? define("qwery", i) : e[t] = i()
	}("qwery", this, function() {
		function t(t) {
			return [].slice.call(t, 0)
		}

		function e(t) {
			var e;
			return t && "object" == typeof t && (e = t.nodeType) && (1 == e || 9 == e)
		}

		function i(t) {
			return "object" == typeof t && isFinite(t.length)
		}

		function n(t) {
			for (var e = [], n = 0, o = t.length; o > n; ++n) i(t[n]) ? e = e.concat(t[n]) : e[e.length] = t[n];
			return e
		}

		function o(t) {
			var e, i, n = [];
			t: for (e = 0; e < t.length; e++) {
				for (i = 0; i < n.length; i++)
					if (n[i] == t[e]) continue t;
				n[n.length] = t[e]
			}
			return n
		}

		function s(t) {
			return t ? "string" == typeof t ? r(t)[0] : !t[u] && i(t) ? t[0] : t : c
		}

		function r(o, r) {
			var h, u = s(r);
			return u && o ? o === l || e(o) ? !r || o !== l && e(u) && d(o, u) ? [o] : [] : o && i(o) ? n(o) : c.getElementsByClassName && "string" == o && (h = o.match(a)) ? t(u.getElementsByClassName(h[1])) : o && (o.document || o.nodeType && 9 == o.nodeType) ? r ? [] : [o] : t(u.querySelectorAll(o)) : []
		}
		var a = /^\.([\w\-]+)$/,
			c = document,
			l = window,
			h = c.documentElement,
			u = "nodeType",
			d = "compareDocumentPosition" in h ? function(t, e) {
				return 16 == (16 & e.compareDocumentPosition(t))
			} : function(t, e) {
				return e = e == c || e == window ? h : e, e !== t && e.contains(t)
			};
		return r.uniq = o, r
	}, this), define("modules/$", ["bonzo", "qwery"], function(t, e) {
		"use strict";

		function i(i, n) {
			return t(e(i, n))
		}
		return i
	}), define("modules/relativeDates", ["modules/$", "bonzo"], function(t, e) {
		"use strict";

		function i(t) {
			var e = new Date;
			return t.toDateString() === e.toDateString()
		}

		function n(t) {
			var e = new Date;
			return t.valueOf() > e.valueOf() - 864e5
		}

		function o(t) {
			var e = (new Date).valueOf() - 6048e5;
			return t.valueOf() >= e
		}

		function s(t) {
			var e = (new Date).valueOf() - 314496e5;
			return t.valueOf() >= e
		}

		function r(t) {
			return "[object Date]" !== Object.prototype.toString.call(t) ? !1 : !isNaN(t.getTime())
		}

		function a(t, e) {
			var a, c = new Date(Number(t)),
				l = new Date;
			if (e = e || {}, !r(c)) return !1;
			if (a = parseInt((l.getTime() - c) / 1e3, 10), 0 > a) return !1;
			if (55 > a) return a + "s";
			if (3300 > a) {
				var h = Math.round(a / 60, 10);
				return 1 == h ? "Now" : h + "m ago"
			}
			if (i(c) || n(c) && "short" === e.format) {
				var u = Math.round(a / 3600);
				return u + "h ago"
			}
			if (o(c)) {
				var d = Math.round(a / 3600 / 24);
				return d + "d ago"
			}
			if (s(c)) {
				var p = Math.round(a / 3600 / 24 / 7);
				return p + "w ago"
			}
			var f = Math.round(a / 3600 / 24 / 7 / 52);
			return f + "y ago"
		}

		function c(i, n) {
			t(i + "[" + n + "]").each(function(t) {
				var i = e(t),
					o = new Date(i.attr(n)),
					s = a(o.getTime());
				if (s) {
					var r = i[0].querySelector(".timestamp__text") || i[0];
					r.getAttribute("title") || r.setAttribute("title", e(r).text()), r.innerHTML = s
				}
			})
		}

		function l(t, e) {
			c(t, e)
		}
		return {
			init: l
		}
	}), define("modules/comments", ["bean", "bonzo", "modules/relativeDates", "modules/$"], function(t, e, i, n) {
		"use strict";
		var o = {
				setupGlobals: function() {
					window.commentsReplyFormatting = function() {
						var e = 0;
						n(".block--discussion-thread").each(function(e) {
							if (!n(this).hasClass("block--discussion-thread--checked") && "undefined" != typeof n(this)[0].children[4]) {
								var i = "div[id='" + n(this)[0].children[3].id + "']",
									o = n(this)[0].children.length - 4;
								1 == o ? n(this).addClass("block--discussion-thread--orphan") : n(i).after('<div class="more more--comments"><a class="more__label"><span class="more__icon" data-icon="&#xe050;" aria-hidden="true"></span><span class="more__text">' + o + " more replies</span></a></div>")
							}
							n(this).addClass("block--discussion-thread--checked"), t.on(e, "click", ".more--comments", function() {
								n(this).hide(), n(this).parent().addClass("expand")
							})
						}), n(".comment").each(function(i) {
							t.on(i, "click", "a, .more--comments, .comment__reply, .comment__recommend", function(t) {
								e = 1
							}), t.on(i, "click", ".comment__header, .comment__body", function(t) {
								e = 0
							}), t.on(i, "click", function() {
								if (0 === e) {
									var t = n(i);
									if (t.hasClass("visible"))
										if (t.hasClass("comment--open")) t.removeClass("comment--open");
										else {
											n(".comment--open").removeClass("comment--open");
											var o = t[0].clientHeight;
											o > 85 ? t.css("min-height", o + 34) : t.css("min-height", "85px"), t.css("min-height", o), t.addClass("comment--open")
										}
								}
							})
						})
					}, window.articleCommentsInserter = function(t) {
						n(".comments__block--loading").hide(), t ? (t = e.create(t), n(t).appendTo(".comments__container"), window.commentsReplyFormatting()) : n(".comments__block--empty").show()
					}, window.commentsInserter = function(t) {
						t ? (t = e.create(t), n(t).appendTo(n(".comments__container")), window.commentsReplyFormatting()) : (n(".comments__block--empty").show(), n(".comments__block--loading").hide()), n(".comments__block--loading").appendTo(n(".comments__container"))
					}, window.articleCommentsFailed = function() {
						n(".comments__block--failed").show(), n(".comments__block--loading").hide(), n(".comments").addClass("comments-has-failed")
					}, window.commentsFailed = function() {
						n(".comments__block--loading").hide(), n(".comments__block--failed").show(), n(".comments").addClass("comments-has-failed")
					}, window.commentsEnd = function() {
						n(".comments__block--loading").remove()
					}, window.commentsClosed = function() {
						n(".comments, #discussion").addClass("comments--closed")
					}, window.commentsOpen = function() {
						n(".comments, #discussion").addClass("comments--open")
					}, window.commentTime = function() {
						i.init(".comment__timestamp", "title")
					}, window.commentsRecommendIncrease = function(t, e) {
						var i = 'div[id="' + t + '"] .comment__recommend';
						n(i).addClass("increase"), n(i + " .comment__recommend__count").text(e)
					}, window.commentsRecommendDecrease = function(t, e) {
						var i = 'div[id="' + t + '"] .comment__recommend';
						n(i).removeClass("increase"), n(i + " .comment__recommend__count").text(e)
					}, window.applyNativeFunctionCall("articleCommentsInserter"), window.applyNativeFunctionCall("commentsInserter"), window.applyNativeFunctionCall("commentsFailed"), window.applyNativeFunctionCall("commentsClosed"), window.applyNativeFunctionCall("commentsOpen"), window.applyNativeFunctionCall("articleCommentsFailed")
				}
			},
			s = function() {
				this.initialised || (this.initialised = !0, o.setupGlobals(), window.commentTime())
			};
		return {
			init: s,
			modules: o
		}
	}), define("modules/cards", ["bean", "bonzo", "flipSnap", "modules/$"], function(t, e, i, n) {
		"use strict";
		var o = {
				setupGlobals: function() {
					window.articleCardsInserter = function(t) {
						n(".related-content").length && (t ? (n(".related-content__wrapper").html(t), o.snapToGrid(".related-content__list")) : o.articleCardsFailed())
					}, window.articleCardsFailed = function() {
						o.articleCardsFailed()
					}, window.applyNativeFunctionCall("articleCardsInserter"), window.applyNativeFunctionCall("articleCardsFailed")
				},
				articleCardsFailed: function() {
					n(".related-content").length && n(".related-content").addClass("related-content--has-failed")
				},
				snapToGrid: function(e) {
					o.setUpFlipSnap(e), t.on(window, "resize.cards orientationchange.cards", window.ThrottleDebounce.debounce(100, !1, function() {
						o.flipSnap && (o.flipSnap.destroy(), n(e).removeAttr("style")), o.setUpFlipSnap(e)
					}))
				},
				setUpFlipSnap: function(s) {
					o.flipSnap = null;
					var r = n(s),
						a = r.parent()[0],
						c = a.currentStyle || window.getComputedStyle(a),
						l = a.offsetWidth - parseInt(c.paddingRight.replace("px", "")) - parseInt(c.paddingLeft.replace("px", ""));
					r.addClass("related-content__list--items-" + r[0].childElementCount), r[0].scrollWidth > l && (o.flipSnap = i(s), e(document.body).hasClass("android") && (t.on(document.body, "touchstart.android", s, function() {
						window.GuardianJSInterface.registerRelatedCardsTouch(!0)
					}), t.on(document.body, "touchend.android", s, function() {
						window.GuardianJSInterface.registerRelatedCardsTouch(!1)
					})))
				}
			},
			s = function() {
				this.initialised || (this.initialised = !0, n(".related-content__list").length ? o.snapToGrid(".related-content__list") : o.setupGlobals())
			};
		return {
			init: s
		}
	}), define("modules/more-tags", ["modules/$", "bean", "bonzo"], function(t, e, i) {
		var n = 5,
			o = {
				refresh: function() {
					t(".tags .inline-list .inline-list__item").length > n + 1 && (t(s).insertAfter(".tags .inline-list .inline-list__item:nth-child(" + (n + 1) + ")"), t("#more-tags-contaier ~ .inline-list__item").addClass("hide-tags"))
				},
				show: function() {
					t(s).hide(), setTimeout(function() {
						t("#more-tags-contaier ~ .hide-tags").removeClass("hide-tags")
					}, 200)
				}
			},
			s = i.create("<li id='more-tags-contaier' class='inline-list__item more-button js-more-button'><a id='more'>More...</a></li>").pop();
		return e.on(s, "click", o.show), o
	}), define("modules/sharing", ["bean", "bonzo", "qwery", "modules/$"], function(t, e, i, n) {
		function o(t) {
			n("body").hasClass("ios") && (t.nativeSharing = s.nativeSharing.bind(s, t))
		}
		var s = {
			nativeSharing: function(t, e, i, n) {
				var o;
				"facebook" === e && (o = "x-gu://facebookshare/"), "twitter" === e && (o = "x-gu://twittershare/"), o && i && (o = o + "?url=" + encodeURIComponent(i), n && (o = o + "&title=" + encodeURIComponent(n)), t.location.href = o)
			}
		};
		return {
			init: o,
			modules: s
		}
	}),
	function(t, e) {
		var i, n = t.jQuery || t.Cowboy || (t.Cowboy = {});
		n.throttle = i = function(t, i, o, s) {
			function r() {
				function n() {
					c = +new Date, o.apply(l, u)
				}

				function r() {
					a = e
				}
				var l = this,
					h = +new Date - c,
					u = arguments;
				s && !a && n(), a && clearTimeout(a), s === e && h > t ? n() : i !== !0 && (a = setTimeout(s ? r : n, s === e ? t - h : t))
			}
			var a, c = 0;
			return "boolean" != typeof i && (s = o, o = i, i = e), n.guid && (r.guid = o.guid = o.guid || n.guid++), r
		}, n.debounce = function(t, n, o) {
			return o === e ? i(t, n, !1) : i(t, o, n !== !1)
		}
	}(this), window.ThrottleDebounce = Cowboy, define("throttleDebounce", function() {}),
	function(t, e, i) {
		function n(t, i) {
			this.wrapper = "string" == typeof t ? e.querySelector(t) : t, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
				resizeScrollbars: !0,
				mouseWheelSpeed: 20,
				snapThreshold: .334,
				startX: 0,
				startY: 0,
				scrollY: !0,
				directionLockThreshold: 5,
				momentum: !0,
				bounce: !0,
				bounceTime: 600,
				bounceEasing: "",
				preventDefault: !0,
				preventDefaultException: {
					tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
				},
				HWCompositing: !0,
				useTransition: !0,
				useTransform: !0
			};
			for (var n in i) this.options[n] = i[n];
			this.translateZ = this.options.HWCompositing && a.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = a.hasTransition && this.options.useTransition, this.options.useTransform = a.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY, this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? a.ease[this.options.bounceEasing] || a.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
		}

		function o(t, i, n) {
			var o = e.createElement("div"),
				s = e.createElement("div");
			return n === !0 && (o.style.cssText = "position:absolute;z-index:9999", s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), s.className = "iScrollIndicator", "h" == t ? (n === !0 && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", s.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (n === !0 && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", s.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", i || (o.style.pointerEvents = "none"), o.appendChild(s), o
		}

		function s(i, n) {
			this.wrapper = "string" == typeof n.el ? e.querySelector(n.el) : n.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = i, this.options = {
				listenX: !0,
				listenY: !0,
				interactive: !1,
				resize: !0,
				defaultScrollbars: !1,
				shrink: !1,
				fade: !1,
				speedRatioX: 0,
				speedRatioY: 0
			};
			for (var o in n) this.options[o] = n[o];
			this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (a.addEvent(this.indicator, "touchstart", this), a.addEvent(t, "touchend", this)), this.options.disablePointer || (a.addEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.addEvent(t, a.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (a.addEvent(this.indicator, "mousedown", this), a.addEvent(t, "mouseup", this))), this.options.fade && (this.wrapperStyle[a.style.transform] = this.scroller.translateZ, this.wrapperStyle[a.style.transitionDuration] = a.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
		}
		var r = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(e) {
				t.setTimeout(e, 1e3 / 60)
			},
			a = function() {
				function n(t) {
					return r === !1 ? !1 : "" === r ? t : r + t.charAt(0).toUpperCase() + t.substr(1)
				}
				var o = {},
					s = e.createElement("div").style,
					r = function() {
						for (var t, e = ["t", "webkitT", "MozT", "msT", "OT"], i = 0, n = e.length; n > i; i++)
							if (t = e[i] + "ransform", t in s) return e[i].substr(0, e[i].length - 1);
						return !1
					}();
				o.getTime = Date.now || function() {
					return (new Date).getTime()
				}, o.extend = function(t, e) {
					for (var i in e) t[i] = e[i]
				}, o.addEvent = function(t, e, i, n) {
					t.addEventListener(e, i, !!n)
				}, o.removeEvent = function(t, e, i, n) {
					t.removeEventListener(e, i, !!n)
				}, o.prefixPointerEvent = function(e) {
					return t.MSPointerEvent ? "MSPointer" + e.charAt(9).toUpperCase() + e.substr(10) : e
				}, o.momentum = function(t, e, n, o, s, r) {
					var a, c, l = t - e,
						h = i.abs(l) / n;
					return r = void 0 === r ? 6e-4 : r, a = t + h * h / (2 * r) * (0 > l ? -1 : 1), c = h / r, o > a ? (a = s ? o - s / 2.5 * (h / 8) : o, l = i.abs(a - t), c = l / h) : a > 0 && (a = s ? s / 2.5 * (h / 8) : 0, l = i.abs(t) + a, c = l / h), {
						destination: i.round(a),
						duration: c
					}
				};
				var a = n("transform");
				return o.extend(o, {
					hasTransform: a !== !1,
					hasPerspective: n("perspective") in s,
					hasTouch: "ontouchstart" in t,
					hasPointer: t.PointerEvent || t.MSPointerEvent,
					hasTransition: n("transition") in s
				}), o.isBadAndroid = /Android /.test(t.navigator.appVersion) && !/Chrome\/\d/.test(t.navigator.appVersion), o.extend(o.style = {}, {
					transform: a,
					transitionTimingFunction: n("transitionTimingFunction"),
					transitionDuration: n("transitionDuration"),
					transitionDelay: n("transitionDelay"),
					transformOrigin: n("transformOrigin")
				}), o.hasClass = function(t, e) {
					var i = new RegExp("(^|\\s)" + e + "(\\s|$)");
					return i.test(t.className)
				}, o.addClass = function(t, e) {
					if (!o.hasClass(t, e)) {
						var i = t.className.split(" ");
						i.push(e), t.className = i.join(" ")
					}
				}, o.removeClass = function(t, e) {
					if (o.hasClass(t, e)) {
						var i = new RegExp("(^|\\s)" + e + "(\\s|$)", "g");
						t.className = t.className.replace(i, " ")
					}
				}, o.offset = function(t) {
					for (var e = -t.offsetLeft, i = -t.offsetTop; t = t.offsetParent;) e -= t.offsetLeft, i -= t.offsetTop;
					return {
						left: e,
						top: i
					}
				}, o.preventDefaultException = function(t, e) {
					for (var i in e)
						if (e[i].test(t[i])) return !0;
					return !1
				}, o.extend(o.eventType = {}, {
					touchstart: 1,
					touchmove: 1,
					touchend: 1,
					mousedown: 2,
					mousemove: 2,
					mouseup: 2,
					pointerdown: 3,
					pointermove: 3,
					pointerup: 3,
					MSPointerDown: 3,
					MSPointerMove: 3,
					MSPointerUp: 3
				}), o.extend(o.ease = {}, {
					quadratic: {
						style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
						fn: function(t) {
							return t * (2 - t)
						}
					},
					circular: {
						style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
						fn: function(t) {
							return i.sqrt(1 - --t * t)
						}
					},
					back: {
						style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
						fn: function(t) {
							var e = 4;
							return (t -= 1) * t * ((e + 1) * t + e) + 1
						}
					},
					bounce: {
						style: "",
						fn: function(t) {
							return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
						}
					},
					elastic: {
						style: "",
						fn: function(t) {
							var e = .22,
								n = .4;
							return 0 === t ? 0 : 1 == t ? 1 : n * i.pow(2, -10 * t) * i.sin((t - e / 4) * (2 * i.PI) / e) + 1
						}
					}
				}), o.tap = function(t, i) {
					var n = e.createEvent("Event");
					n.initEvent(i, !0, !0), n.pageX = t.pageX, n.pageY = t.pageY, t.target.dispatchEvent(n)
				}, o.click = function(t) {
					var i, n = t.target;
					/(SELECT|INPUT|TEXTAREA)/i.test(n.tagName) || (i = e.createEvent("MouseEvents"), i.initMouseEvent("click", !0, !0, t.view, 1, n.screenX, n.screenY, n.clientX, n.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), i._constructed = !0, n.dispatchEvent(i))
				}, o
			}();
		n.prototype = {
			version: "5.1.3",
			_init: function() {
				this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
			},
			destroy: function() {
				this._initEvents(!0), this._execEvent("destroy")
			},
			_transitionEnd: function(t) {
				t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
			},
			_start: function(t) {
				if ((1 == a.eventType[t.type] || 0 === t.button) && this.enabled && (!this.initiated || a.eventType[t.type] === this.initiated)) {
					!this.options.preventDefault || a.isBadAndroid || a.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
					var e, n = t.touches ? t.touches[0] : t;
					this.initiated = a.eventType[t.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = a.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, e = this.getComputedPosition(), this._translate(i.round(e.x), i.round(e.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = n.pageX, this.pointY = n.pageY, this._execEvent("beforeScrollStart")
				}
			},
			_move: function(t) {
				if (this.enabled && a.eventType[t.type] === this.initiated) {
					this.options.preventDefault && t.preventDefault();
					var e, n, o, s, r = t.touches ? t.touches[0] : t,
						c = r.pageX - this.pointX,
						l = r.pageY - this.pointY,
						h = a.getTime();
					if (this.pointX = r.pageX, this.pointY = r.pageY, this.distX += c, this.distY += l, o = i.abs(this.distX), s = i.abs(this.distY), !(h - this.endTime > 300 && 10 > o && 10 > s)) {
						if (this.directionLocked || this.options.freeScroll || (o > s + this.options.directionLockThreshold ? this.directionLocked = "h" : s >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
							if ("vertical" == this.options.eventPassthrough) t.preventDefault();
							else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
							l = 0
						} else if ("v" == this.directionLocked) {
							if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
							else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
							c = 0
						}
						c = this.hasHorizontalScroll ? c : 0, l = this.hasVerticalScroll ? l : 0, e = this.x + c, n = this.y + l, (e > 0 || e < this.maxScrollX) && (e = this.options.bounce ? this.x + c / 3 : e > 0 ? 0 : this.maxScrollX), (n > 0 || n < this.maxScrollY) && (n = this.options.bounce ? this.y + l / 3 : n > 0 ? 0 : this.maxScrollY), this.directionX = c > 0 ? -1 : 0 > c ? 1 : 0, this.directionY = l > 0 ? -1 : 0 > l ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(e, n), h - this.startTime > 300 && (this.startTime = h, this.startX = this.x, this.startY = this.y)
					}
				}
			},
			_end: function(t) {
				if (this.enabled && a.eventType[t.type] === this.initiated) {
					this.options.preventDefault && !a.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
					var e, n, o = (t.changedTouches ? t.changedTouches[0] : t, a.getTime() - this.startTime),
						s = i.round(this.x),
						r = i.round(this.y),
						c = i.abs(s - this.startX),
						l = i.abs(r - this.startY),
						h = 0,
						u = "";
					if (this.isInTransition = 0, this.initiated = 0, this.endTime = a.getTime(), !this.resetPosition(this.options.bounceTime)) {
						if (this.scrollTo(s, r), !this.moved) return this.options.tap && a.tap(t, this.options.tap), this.options.click && a.click(t), void this._execEvent("scrollCancel");
						if (this._events.flick && 200 > o && 100 > c && 150 > l) return void this._execEvent("flick");
						if (this.options.momentum && 300 > o && (e = this.hasHorizontalScroll ? a.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
								destination: s,
								duration: 0
							}, n = this.hasVerticalScroll ? a.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
								destination: r,
								duration: 0
							}, s = e.destination, r = n.destination, h = i.max(e.duration, n.duration), this.isInTransition = 1), this.options.snap) {
							var d = this._nearestSnap(s, r);
							this.currentPage = d, h = this.options.snapSpeed || i.max(i.max(i.min(i.abs(s - d.x), 1e3), i.min(i.abs(r - d.y), 1e3)), 300), s = d.x, r = d.y, this.directionX = 0, this.directionY = 0, u = this.options.bounceEasing
						}
						return s != this.x || r != this.y ? ((s > 0 || s < this.maxScrollX || r > 0 || r < this.maxScrollY) && (u = a.ease.quadratic), void this.scrollTo(s, r, h, u)) : void this._execEvent("scrollEnd")
					}
				}
			},
			_resize: function() {
				var t = this;
				clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
					t.refresh()
				}, this.options.resizePolling)
			},
			resetPosition: function(t) {
				var e = this.x,
					i = this.y;
				return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? e = 0 : this.x < this.maxScrollX && (e = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? i = 0 : this.y < this.maxScrollY && (i = this.maxScrollY), e == this.x && i == this.y ? !1 : (this.scrollTo(e, i, t, this.options.bounceEasing), !0)
			},
			disable: function() {
				this.enabled = !1
			},
			enable: function() {
				this.enabled = !0
			},
			refresh: function() {
				this.wrapper.offsetHeight;
				this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = a.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
			},
			on: function(t, e) {
				this._events[t] || (this._events[t] = []), this._events[t].push(e);
			},
			off: function(t, e) {
				if (this._events[t]) {
					var i = this._events[t].indexOf(e);
					i > -1 && this._events[t].splice(i, 1)
				}
			},
			_execEvent: function(t) {
				if (this._events[t]) {
					var e = 0,
						i = this._events[t].length;
					if (i)
						for (; i > e; e++) this._events[t][e].apply(this, [].slice.call(arguments, 1))
				}
			},
			scrollBy: function(t, e, i, n) {
				t = this.x + t, e = this.y + e, i = i || 0, this.scrollTo(t, e, i, n)
			},
			scrollTo: function(t, e, i, n) {
				n = n || a.ease.circular, this.isInTransition = this.options.useTransition && i > 0, !i || this.options.useTransition && n.style ? (this._transitionTimingFunction(n.style), this._transitionTime(i), this._translate(t, e)) : this._animate(t, e, i, n.fn)
			},
			scrollToElement: function(t, e, n, o, s) {
				if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
					var r = a.offset(t);
					r.left -= this.wrapperOffset.left, r.top -= this.wrapperOffset.top, n === !0 && (n = i.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), o === !0 && (o = i.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), r.left -= n || 0, r.top -= o || 0, r.left = r.left > 0 ? 0 : r.left < this.maxScrollX ? this.maxScrollX : r.left, r.top = r.top > 0 ? 0 : r.top < this.maxScrollY ? this.maxScrollY : r.top, e = void 0 === e || null === e || "auto" === e ? i.max(i.abs(this.x - r.left), i.abs(this.y - r.top)) : e, this.scrollTo(r.left, r.top, e, s)
				}
			},
			_transitionTime: function(t) {
				if (t = t || 0, this.scrollerStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.scrollerStyle[a.style.transitionDuration] = "0.001s"), this.indicators)
					for (var e = this.indicators.length; e--;) this.indicators[e].transitionTime(t)
			},
			_transitionTimingFunction: function(t) {
				if (this.scrollerStyle[a.style.transitionTimingFunction] = t, this.indicators)
					for (var e = this.indicators.length; e--;) this.indicators[e].transitionTimingFunction(t)
			},
			_translate: function(t, e) {
				if (this.options.useTransform ? this.scrollerStyle[a.style.transform] = "translate(" + t + "px," + e + "px)" + this.translateZ : (t = i.round(t), e = i.round(e), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = e + "px"), this.x = t, this.y = e, this.indicators)
					for (var n = this.indicators.length; n--;) this.indicators[n].updatePosition()
			},
			_initEvents: function(e) {
				var i = e ? a.removeEvent : a.addEvent,
					n = this.options.bindToWrapper ? this.wrapper : t;
				i(t, "orientationchange", this), i(t, "resize", this), this.options.click && i(this.wrapper, "click", this, !0), this.options.disableMouse || (i(this.wrapper, "mousedown", this), i(n, "mousemove", this), i(n, "mousecancel", this), i(n, "mouseup", this)), a.hasPointer && !this.options.disablePointer && (i(this.wrapper, a.prefixPointerEvent("pointerdown"), this), i(n, a.prefixPointerEvent("pointermove"), this), i(n, a.prefixPointerEvent("pointercancel"), this), i(n, a.prefixPointerEvent("pointerup"), this)), a.hasTouch && !this.options.disableTouch && (i(this.wrapper, "touchstart", this), i(n, "touchmove", this), i(n, "touchcancel", this), i(n, "touchend", this)), i(this.scroller, "transitionend", this), i(this.scroller, "webkitTransitionEnd", this), i(this.scroller, "oTransitionEnd", this), i(this.scroller, "MSTransitionEnd", this)
			},
			getComputedPosition: function() {
				var e, i, n = t.getComputedStyle(this.scroller, null);
				return this.options.useTransform ? (n = n[a.style.transform].split(")")[0].split(", "), e = +(n[12] || n[4]), i = +(n[13] || n[5])) : (e = +n.left.replace(/[^-\d.]/g, ""), i = +n.top.replace(/[^-\d.]/g, "")), {
					x: e,
					y: i
				}
			},
			_initIndicators: function() {
				function t(t) {
					for (var e = a.indicators.length; e--;) t.call(a.indicators[e])
				}
				var e, i = this.options.interactiveScrollbars,
					n = "string" != typeof this.options.scrollbars,
					r = [],
					a = this;
				this.indicators = [], this.options.scrollbars && (this.options.scrollY && (e = {
					el: o("v", i, this.options.scrollbars),
					interactive: i,
					defaultScrollbars: !0,
					customStyle: n,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenX: !1
				}, this.wrapper.appendChild(e.el), r.push(e)), this.options.scrollX && (e = {
					el: o("h", i, this.options.scrollbars),
					interactive: i,
					defaultScrollbars: !0,
					customStyle: n,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenY: !1
				}, this.wrapper.appendChild(e.el), r.push(e))), this.options.indicators && (r = r.concat(this.options.indicators));
				for (var c = r.length; c--;) this.indicators.push(new s(this, r[c]));
				this.options.fadeScrollbars && (this.on("scrollEnd", function() {
					t(function() {
						this.fade()
					})
				}), this.on("scrollCancel", function() {
					t(function() {
						this.fade()
					})
				}), this.on("scrollStart", function() {
					t(function() {
						this.fade(1)
					})
				}), this.on("beforeScrollStart", function() {
					t(function() {
						this.fade(1, !0)
					})
				})), this.on("refresh", function() {
					t(function() {
						this.refresh()
					})
				}), this.on("destroy", function() {
					t(function() {
						this.destroy()
					}), delete this.indicators
				})
			},
			_initWheel: function() {
				a.addEvent(this.wrapper, "wheel", this), a.addEvent(this.wrapper, "mousewheel", this), a.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
					a.removeEvent(this.wrapper, "wheel", this), a.removeEvent(this.wrapper, "mousewheel", this), a.removeEvent(this.wrapper, "DOMMouseScroll", this)
				})
			},
			_wheel: function(t) {
				if (this.enabled) {
					t.preventDefault(), t.stopPropagation();
					var e, n, o, s, r = this;
					if (void 0 === this.wheelTimeout && r._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
							r._execEvent("scrollEnd"), r.wheelTimeout = void 0
						}, 400), "deltaX" in t) 1 === t.deltaMode ? (e = -t.deltaX * this.options.mouseWheelSpeed, n = -t.deltaY * this.options.mouseWheelSpeed) : (e = -t.deltaX, n = -t.deltaY);
					else if ("wheelDeltaX" in t) e = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed, n = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
					else if ("wheelDelta" in t) e = n = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
					else {
						if (!("detail" in t)) return;
						e = n = -t.detail / 3 * this.options.mouseWheelSpeed
					}
					if (e *= this.options.invertWheelDirection, n *= this.options.invertWheelDirection, this.hasVerticalScroll || (e = n, n = 0), this.options.snap) return o = this.currentPage.pageX, s = this.currentPage.pageY, e > 0 ? o-- : 0 > e && o++, n > 0 ? s-- : 0 > n && s++, void this.goToPage(o, s);
					o = this.x + i.round(this.hasHorizontalScroll ? e : 0), s = this.y + i.round(this.hasVerticalScroll ? n : 0), o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX), s > 0 ? s = 0 : s < this.maxScrollY && (s = this.maxScrollY), this.scrollTo(o, s, 0)
				}
			},
			_initSnap: function() {
				this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
					var t, e, n, o, s, r, a = 0,
						c = 0,
						l = 0,
						h = this.options.snapStepX || this.wrapperWidth,
						u = this.options.snapStepY || this.wrapperHeight;
					if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
						if (this.options.snap === !0)
							for (n = i.round(h / 2), o = i.round(u / 2); l > -this.scrollerWidth;) {
								for (this.pages[a] = [], t = 0, s = 0; s > -this.scrollerHeight;) this.pages[a][t] = {
									x: i.max(l, this.maxScrollX),
									y: i.max(s, this.maxScrollY),
									width: h,
									height: u,
									cx: l - n,
									cy: s - o
								}, s -= u, t++;
								l -= h, a++
							} else
								for (r = this.options.snap, t = r.length, e = -1; t > a; a++)(0 === a || r[a].offsetLeft <= r[a - 1].offsetLeft) && (c = 0, e++), this.pages[c] || (this.pages[c] = []), l = i.max(-r[a].offsetLeft, this.maxScrollX), s = i.max(-r[a].offsetTop, this.maxScrollY), n = l - i.round(r[a].offsetWidth / 2), o = s - i.round(r[a].offsetHeight / 2), this.pages[c][e] = {
									x: l,
									y: s,
									width: r[a].offsetWidth,
									height: r[a].offsetHeight,
									cx: n,
									cy: o
								}, l > this.maxScrollX && c++;
						this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
					}
				}), this.on("flick", function() {
					var t = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.x - this.startX), 1e3), i.min(i.abs(this.y - this.startY), 1e3)), 300);
					this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
				})
			},
			_nearestSnap: function(t, e) {
				if (!this.pages.length) return {
					x: 0,
					y: 0,
					pageX: 0,
					pageY: 0
				};
				var n = 0,
					o = this.pages.length,
					s = 0;
				if (i.abs(t - this.absStartX) < this.snapThresholdX && i.abs(e - this.absStartY) < this.snapThresholdY) return this.currentPage;
				for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), e > 0 ? e = 0 : e < this.maxScrollY && (e = this.maxScrollY); o > n; n++)
					if (t >= this.pages[n][0].cx) {
						t = this.pages[n][0].x;
						break
					}
				for (o = this.pages[n].length; o > s; s++)
					if (e >= this.pages[0][s].cy) {
						e = this.pages[0][s].y;
						break
					}
				return n == this.currentPage.pageX && (n += this.directionX, 0 > n ? n = 0 : n >= this.pages.length && (n = this.pages.length - 1), t = this.pages[n][0].x), s == this.currentPage.pageY && (s += this.directionY, 0 > s ? s = 0 : s >= this.pages[0].length && (s = this.pages[0].length - 1), e = this.pages[0][s].y), {
					x: t,
					y: e,
					pageX: n,
					pageY: s
				}
			},
			goToPage: function(t, e, n, o) {
				o = o || this.options.bounceEasing, t >= this.pages.length ? t = this.pages.length - 1 : 0 > t && (t = 0), e >= this.pages[t].length ? e = this.pages[t].length - 1 : 0 > e && (e = 0);
				var s = this.pages[t][e].x,
					r = this.pages[t][e].y;
				n = void 0 === n ? this.options.snapSpeed || i.max(i.max(i.min(i.abs(s - this.x), 1e3), i.min(i.abs(r - this.y), 1e3)), 300) : n, this.currentPage = {
					x: s,
					y: r,
					pageX: t,
					pageY: e
				}, this.scrollTo(s, r, n, o)
			},
			next: function(t, e) {
				var i = this.currentPage.pageX,
					n = this.currentPage.pageY;
				i++, i >= this.pages.length && this.hasVerticalScroll && (i = 0, n++), this.goToPage(i, n, t, e)
			},
			prev: function(t, e) {
				var i = this.currentPage.pageX,
					n = this.currentPage.pageY;
				i--, 0 > i && this.hasVerticalScroll && (i = 0, n--), this.goToPage(i, n, t, e)
			},
			_initKeys: function(e) {
				var i, n = {
					pageUp: 33,
					pageDown: 34,
					end: 35,
					home: 36,
					left: 37,
					up: 38,
					right: 39,
					down: 40
				};
				if ("object" == typeof this.options.keyBindings)
					for (i in this.options.keyBindings) "string" == typeof this.options.keyBindings[i] && (this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0));
				else this.options.keyBindings = {};
				for (i in n) this.options.keyBindings[i] = this.options.keyBindings[i] || n[i];
				a.addEvent(t, "keydown", this), this.on("destroy", function() {
					a.removeEvent(t, "keydown", this)
				})
			},
			_key: function(t) {
				if (this.enabled) {
					var e, n = this.options.snap,
						o = n ? this.currentPage.pageX : this.x,
						s = n ? this.currentPage.pageY : this.y,
						r = a.getTime(),
						c = this.keyTime || 0,
						l = .25;
					switch (this.options.useTransition && this.isInTransition && (e = this.getComputedPosition(), this._translate(i.round(e.x), i.round(e.y)), this.isInTransition = !1), this.keyAcceleration = 200 > r - c ? i.min(this.keyAcceleration + l, 50) : 0, t.keyCode) {
						case this.options.keyBindings.pageUp:
							this.hasHorizontalScroll && !this.hasVerticalScroll ? o += n ? 1 : this.wrapperWidth : s += n ? 1 : this.wrapperHeight;
							break;
						case this.options.keyBindings.pageDown:
							this.hasHorizontalScroll && !this.hasVerticalScroll ? o -= n ? 1 : this.wrapperWidth : s -= n ? 1 : this.wrapperHeight;
							break;
						case this.options.keyBindings.end:
							o = n ? this.pages.length - 1 : this.maxScrollX, s = n ? this.pages[0].length - 1 : this.maxScrollY;
							break;
						case this.options.keyBindings.home:
							o = 0, s = 0;
							break;
						case this.options.keyBindings.left:
							o += n ? -1 : 5 + this.keyAcceleration >> 0;
							break;
						case this.options.keyBindings.up:
							s += n ? 1 : 5 + this.keyAcceleration >> 0;
							break;
						case this.options.keyBindings.right:
							o -= n ? -1 : 5 + this.keyAcceleration >> 0;
							break;
						case this.options.keyBindings.down:
							s -= n ? 1 : 5 + this.keyAcceleration >> 0;
							break;
						default:
							return
					}
					if (n) return void this.goToPage(o, s);
					o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollX && (o = this.maxScrollX, this.keyAcceleration = 0), s > 0 ? (s = 0, this.keyAcceleration = 0) : s < this.maxScrollY && (s = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(o, s, 0), this.keyTime = r
				}
			},
			_animate: function(t, e, i, n) {
				function o() {
					var d, p, f, m = a.getTime();
					return m >= u ? (s.isAnimating = !1, s._translate(t, e), void(s.resetPosition(s.options.bounceTime) || s._execEvent("scrollEnd"))) : (m = (m - h) / i, f = n(m), d = (t - c) * f + c, p = (e - l) * f + l, s._translate(d, p), void(s.isAnimating && r(o)))
				}
				var s = this,
					c = this.x,
					l = this.y,
					h = a.getTime(),
					u = h + i;
				this.isAnimating = !0, o()
			},
			handleEvent: function(t) {
				switch (t.type) {
					case "touchstart":
					case "pointerdown":
					case "MSPointerDown":
					case "mousedown":
						this._start(t);
						break;
					case "touchmove":
					case "pointermove":
					case "MSPointerMove":
					case "mousemove":
						this._move(t);
						break;
					case "touchend":
					case "pointerup":
					case "MSPointerUp":
					case "mouseup":
					case "touchcancel":
					case "pointercancel":
					case "MSPointerCancel":
					case "mousecancel":
						this._end(t);
						break;
					case "orientationchange":
					case "resize":
						this._resize();
						break;
					case "transitionend":
					case "webkitTransitionEnd":
					case "oTransitionEnd":
					case "MSTransitionEnd":
						this._transitionEnd(t);
						break;
					case "wheel":
					case "DOMMouseScroll":
					case "mousewheel":
						this._wheel(t);
						break;
					case "keydown":
						this._key(t);
						break;
					case "click":
						t._constructed || (t.preventDefault(), t.stopPropagation())
				}
			}
		}, s.prototype = {
			handleEvent: function(t) {
				switch (t.type) {
					case "touchstart":
					case "pointerdown":
					case "MSPointerDown":
					case "mousedown":
						this._start(t);
						break;
					case "touchmove":
					case "pointermove":
					case "MSPointerMove":
					case "mousemove":
						this._move(t);
						break;
					case "touchend":
					case "pointerup":
					case "MSPointerUp":
					case "mouseup":
					case "touchcancel":
					case "pointercancel":
					case "MSPointerCancel":
					case "mousecancel":
						this._end(t)
				}
			},
			destroy: function() {
				this.options.interactive && (a.removeEvent(this.indicator, "touchstart", this), a.removeEvent(this.indicator, a.prefixPointerEvent("pointerdown"), this), a.removeEvent(this.indicator, "mousedown", this), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), a.removeEvent(t, "touchend", this), a.removeEvent(t, a.prefixPointerEvent("pointerup"), this), a.removeEvent(t, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
			},
			_start: function(e) {
				var i = e.touches ? e.touches[0] : e;
				e.preventDefault(), e.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = i.pageX, this.lastPointY = i.pageY, this.startTime = a.getTime(), this.options.disableTouch || a.addEvent(t, "touchmove", this), this.options.disablePointer || a.addEvent(t, a.prefixPointerEvent("pointermove"), this), this.options.disableMouse || a.addEvent(t, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
			},
			_move: function(t) {
				var e, i, n, o, s = t.touches ? t.touches[0] : t;
				a.getTime();
				this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, e = s.pageX - this.lastPointX, this.lastPointX = s.pageX, i = s.pageY - this.lastPointY, this.lastPointY = s.pageY, n = this.x + e, o = this.y + i, this._pos(n, o), t.preventDefault(), t.stopPropagation()
			},
			_end: function(e) {
				if (this.initiated) {
					if (this.initiated = !1, e.preventDefault(), e.stopPropagation(), a.removeEvent(t, "touchmove", this), a.removeEvent(t, a.prefixPointerEvent("pointermove"), this), a.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
						var n = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
							o = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.scroller.x - n.x), 1e3), i.min(i.abs(this.scroller.y - n.y), 1e3)), 300);
						(this.scroller.x != n.x || this.scroller.y != n.y) && (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = n, this.scroller.scrollTo(n.x, n.y, o, this.scroller.options.bounceEasing))
					}
					this.moved && this.scroller._execEvent("scrollEnd")
				}
			},
			transitionTime: function(t) {
				t = t || 0, this.indicatorStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.indicatorStyle[a.style.transitionDuration] = "0.001s")
			},
			transitionTimingFunction: function(t) {
				this.indicatorStyle[a.style.transitionTimingFunction] = t
			},
			refresh: function() {
				this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (a.addClass(this.wrapper, "iScrollBothScrollbars"), a.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (a.removeClass(this.wrapper, "iScrollBothScrollbars"), a.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
				this.wrapper.offsetHeight;
				this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = i.max(i.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = i.max(i.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
			},
			updatePosition: function() {
				var t = this.options.listenX && i.round(this.sizeRatioX * this.scroller.x) || 0,
					e = this.options.listenY && i.round(this.sizeRatioY * this.scroller.y) || 0;
				this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = i.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = i.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), e < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = i.max(this.indicatorHeight + 3 * e, 8), this.indicatorStyle.height = this.height + "px"), e = this.minBoundaryY) : e > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = i.max(this.indicatorHeight - 3 * (e - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", e = this.maxPosY + this.indicatorHeight - this.height) : e = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = t, this.y = e, this.scroller.options.useTransform ? this.indicatorStyle[a.style.transform] = "translate(" + t + "px," + e + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = e + "px")
			},
			_pos: function(t, e) {
				0 > t ? t = 0 : t > this.maxPosX && (t = this.maxPosX), 0 > e ? e = 0 : e > this.maxPosY && (e = this.maxPosY), t = this.options.listenX ? i.round(t / this.sizeRatioX) : this.scroller.x, e = this.options.listenY ? i.round(e / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(t, e)
			},
			fade: function(t, e) {
				if (!e || this.visible) {
					clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
					var i = t ? 250 : 500,
						n = t ? 0 : 300;
					t = t ? "1" : "0", this.wrapperStyle[a.style.transitionDuration] = i + "ms", this.fadeTimeout = setTimeout(function(t) {
						this.wrapperStyle.opacity = t, this.visible = +t
					}.bind(this, t), n)
				}
			}
		}, n.utils = a, "undefined" != typeof module && module.exports ? module.exports = n : t.IScroll = n
	}(window, document, Math), define("iscroll", function() {}), define("bootstraps/common", ["bean", "bonzo", "fence", "fastClick", "smoothScroll", "flipSnap", "modules/comments", "modules/cards", "modules/more-tags", "modules/sharing", "throttleDebounce", "modules/$", "iscroll"], function(t, e, i, n, o, s, r, a, c, l, h, u, d) {
		"use strict";
		var p = {
				attachFastClick: function() {
					n.attach(document.body)
				},
				correctCaptions: function() {
					u("figure").each(function(t) {
						var e = u("figcaption", t);
						(0 === e.length || "" === e.text()) && e.hide()
					})
				},
				figcaptionToggle: function() {
					u(".main-media__caption__icon")[0] && t.on(u(".main-media__caption__icon")[0], "click touchend", window.ThrottleDebounce.debounce(250, !0, function() {
						u(".main-media__caption__text").toggleClass("is-visible")
					}))
				},
				loadComments: function() {
					r.init()
				},
				loadCards: function() {
					a.init()
				},
				loadInteractives: function() {
					var t = function() {
						u("figure.interactive:not(.interactive--offline)").addClass("interactive--offline").append(e.create('<a class="interactive--offline--icon interactive--offline--icon--reload" href="#" onclick="window.loadInteractives(true);return false;"></a>')).append(e.create('<a class="interactive--offline--icon interactive--offline--icon--loading"></a>')), u("figure.interactive.interactive--loading").removeClass("interactive--loading")
					};
					window.loadInteractives = function(e) {
						u("body").hasClass("offline") && !e || !navigator.onLine ? t() : u("figure.interactive").each(function(e) {
							var i = e.getAttribute("data-interactive");
							require.undef(i), u(e).addClass("interactive--loading"), require([i], function(t) {
								t && t.boot && (u(e).removeClass("interactive--offline"), t.boot(e, document.body))
							}, t)
						})
					}, window.loadInteractives()
				},
				loadEmbeds: function() {
					window.loadEmbeds = function() {
						p.fixVineWidth(), require(["fence"], function(t) {
							u("iframe.fenced").each(function(e) {
								t.render(e)
							})
						})
					}, window.loadEmbeds()
				},
				scrollToAnchor: function() {
					o.init()
				},
				imageSizer: function() {
					window.articleImageSizer = function() {
						var t, i, n, o, s, r, a, c;
						u("figure.element-image").each(function(l) {
							t = u(l), i = t.hasClass("element--thumbnail"), a = l.getElementsByClassName("figure__caption__icon").length, r = l.getElementsByClassName("element-image__caption"), n = r.length, o = e.firstChild(l), c = i && n ? "figure--thumbnail-with-caption" : i ? "figure--thumbnail" : "figure-wide", t.addClass(c), o && !u(o).hasClass("figure__inner") && (s = document.createElement("div"), e(s).addClass("figure__inner").append(o), e(l).prepend(s)), n && !a && e(r).prepend('<span data-icon="&#xe044;" class="figure__caption__icon" aria-hidden="true"></span>')
						})
					}, window.articleImageSizer()
				},
				articleContentType: function() {
					u(".article__body > .prose").each(function() {
						this.querySelectorAll(".figure--thumbnail:not(.figure--thumbnail-with-caption)").length && u(this).addClass("prose--is-panel")
					})
				},
				insertTags: function() {
					window.articleTagInserter = function(t) {
						setTimeout(p.showMoreTags, 0), t = e.create(t), u(t).appendTo(".tags .inline-list"), c.refresh()
					}, window.applyNativeFunctionCall("articleTagInserter")
				},
				videoPositioning: function() {
					window.videoPositioning = function() {
						var t = u(".video-URL");
						if (t)
							for (var e = t.length - 1; e >= 0; e--) {
								var i = u(t[e]);
								window.GuardianJSInterface.videoPosition(i.offset().left, i.offset().top, i.offset().width, i.attr("href"))
							}
						setTimeout(window.videoPositioningPoller, 500, document.body.offsetHeight)
					}, window.videoPositioningPoller = function(t) {
						var e = document.body.offsetHeight;
						t !== e ? window.videoPositioning() : setTimeout(window.videoPositioningPoller, 500, e)
					}, window.applyNativeFunctionCall("videoPositioning")
				},
				offline: function() {
					u(document.body).hasClass("offline") && u(".article img").each(function() {
						var t = u(this),
							e = new Image;
						e.onerror = function() {
							"element-image-inner" == u(t).parent().attr("class") ? u(t).hide() : u(t).replaceWith('<div class="element-image-inner"></div>')
						}, e.src = u(this).attr("src")
					})
				},
				setupAlertSwitch: function() {
					window.alertSwitch = function(t, e) {
						var i = u('[data-follow-alert-id="' + e + '"]');
						i.length && (1 == t ? i.hasClass("following") === !1 && i.addClass("following") : i.hasClass("following") && i.removeClass("following"))
					}
				},
				setupTellMeWhenSwitch: function() {
					window.tellMeWhenSwitch = function(t, e) {
						var i = u("a.tell-me-when");
						i.length && (1 == t ? i.addClass("added") : i.removeClass("added"))
					}
				},
				setupFontSizing: function() {
					window.fontResize = function(t, e) {
						u(document.body).removeClass(t).addClass(e);
						var i = e,
							n = i.split("-");
						document.body.setAttribute("data-font-size", n[2])
					}
				},
				setupOfflineSwitch: function() {
					window.offlineSwitch = function() {
						u(document.body).addClass("offline")
					}
				},
				showTabs: function(e) {
					var i = u(".tabs"),
						n = u("a", i);
					n.each(function(t, e) {
						e > 0 && u(t.getAttribute("href")).hide()
					}), i[0] && t.on(i[0], "click", "a", function(t) {
						t.preventDefault();
						var n = u(this);
						if ("true" !== n.attr("aria-selected")) {
							var o = u('[aria-selected="true"]', i),
								s = n.attr("id");
							switch (u(o.attr("href")).hide(), o.attr("aria-selected", !1), u(n.attr("href")).show(), n.attr("aria-selected", !0), s) {
								case "football__tab--article":
									e.location.href = "x-gu://football_tab_report";
									break;
								case "football__tab--stats":
									p.setPieChartSize(), e.location.href = "x-gu://football_tab_stats";
									break;
								case "football__tab--liveblog":
									e.location.href = "x-gu://football_tab_liveblog";
									break;
								case "cricket__tab--liveblog":
									p.isAndroid && window.GuardianJSInterface.cricketTabChanged("overbyover");
									break;
								case "cricket__tab--stats":
									p.isAndroid && window.GuardianJSInterface.cricketTabChanged("scorecard");
									break;
								default:
									e.location.href = "x-gu://football_tab_unknown"
							}
						}
					})
				},
				setPieChartSize: function() {
					var t = u(".pie-chart"),
						e = t.parent().offset();
					t.css({
						width: e.width,
						height: e.width
					})
				},
				fixVineWidth: function(t) {
					var e = u('iframe[srcdoc*="https://vine.co"]:not([data-vine-fixed])', t);
					e.each(function(t) {
						var e = t.parentNode.clientWidth,
							i = u(t),
							n = i.attr("srcdoc");
						n = n.replace(/width="[\d]+"/, 'width="' + e + '"'), n = n.replace(/height="[\d]+"/, 'height="' + e + '"'), i.attr("srcdoc", n), i.attr("data-vine-fixed", !0)
					})
				},
				setGlobalObject: function(t) {
					var e = u("body").attr("data-page-id");
					return t.guardian = {
						config: {
							page: {
								pageId: "__PAGE_ID__" === e ? null : e
							}
						}
					}, t.guardian
				},
				fixSeries: function() {
					var t = u(".content__series-label.content__labels a");
					t.html("<span>" + t.text().split(/\s+/).join(" </span><span>") + " </span>");
					for (var i = u("span", t), n = i.length, o = 0, s = 80, r = n - 1; r >= 0; r--)
						if (o += i[r].offsetWidth, o > s) {
							Math.abs(i[r].getBoundingClientRect().top - i[n - 1].getBoundingClientRect().top) >= i[r].offsetHeight && e(i[r]).before("</br>");
							break
						}
				},
				getArticleHeight: function() {
					p.articleHeight(function(t) {
						window.GuardianJSInterface.getArticleHeightCallback(t)
					})
				},
				articleHeight: function(t) {
					var e = document.body.getAttribute("data-content-type"),
						i = 0;
					if ("article" === e) {
						var n = u("div[id$=-article-container]")[0];
						i = n.offsetHeight
					}
					return t(i)
				},
				formatThumbnailImages: function() {
					var t, e, i, n = document.getElementsByClassName("element-image element--thumbnail");
					for (t = 0; t < n.length; t++) i = n[t].getElementsByTagName("img")[0], e = parseInt(i.getAttribute("height"), 10) > parseInt(i.getAttribute("width"), 10), e ? n[t].classList.add("portrait-thumbnail") : n[t].classList.add("landscape-thumbnail")
				},
				advertUpdates: function() {
					var t, e, i, n, o, s, r;
					if (t = {
							"tone--media": {
								video: "meta__misc",
								gallery: "meta__misc",
								audio: "byline--mobile"
							},
							"tone--news": "meta",
							"tone--feature1": "meta",
							"tone--feature2": "meta",
							"tone--feature3": "meta",
							"tone--podcast": "byline--media"
						}, document.body.classList.contains("is_advertising")) {
						for (e in t)
							if (t.hasOwnProperty(e) && document.body.classList.contains(e)) {
								if ("object" != typeof t[e]) {
									n = t[e];
									break
								}
								for (i in t[e])
									if (t[e].hasOwnProperty(i) && document.body.dataset.contentType && document.body.dataset.contentType === i) {
										n = t[e][i];
										break
									}
							}
						if (n && (o = document.getElementsByClassName("byline"), o.length && !o[0].children.length))
							for (s = document.body.getElementsByClassName(n), r = 0; r < s.length; r++) s[r].parentNode && !s[r].getElementsByClassName("sponsorship").length && s[r].parentNode.removeChild(s[r])
					}
				}
			},
			f = function() {
				p.isAndroid = u("body").hasClass("android"), this.initialised || (this.initialised = !0, p.attachFastClick(), p.correctCaptions(), p.figcaptionToggle(), p.imageSizer(), p.articleContentType(), p.insertTags(), p.videoPositioning(), p.loadComments(), p.loadCards(), p.loadEmbeds(), p.scrollToAnchor(), p.loadInteractives(), p.offline(), p.setupOfflineSwitch(), p.setupAlertSwitch(), p.setupTellMeWhenSwitch(), p.setupFontSizing(), p.showTabs(window), p.setGlobalObject(window), p.fixSeries(), p.formatThumbnailImages(), p.advertUpdates(), window.getArticleHeight = p.getArticleHeight, window.applyNativeFunctionCall("getArticleHeight"), l.init(window), document.body.classList.contains("no-ready") || (window.location.href = "x-gu://ready"))
			};
		return {
			init: f,
			modules: p
		}
	}), define("modules/twitter", ["bean", "bonzo", "qwery", "modules/$"], function(t, e, i, n) {
		function o() {
			g = document.body.classList.contains("the-minute"), g || (s(document.body), t.on(window, "scroll", window.ThrottleDebounce.debounce(100, !1, p)))
		}

		function s(t) {
			v = t.querySelectorAll("blockquote.js-tweet, blockquote.twitter-tweet"), v && !b && r()
		}

		function r() {
			var t;
			document.getElementById("twitter-widget") || (t = document.createElement("script"), t.id = "twitter-widget", t.async = !0, t.src = "https://platform.twitter.com/widgets.js", t.onload = a, n(document.body).append(t))
		}

		function a() {
			b = c(), p()
		}

		function c() {
			return b ? !0 : "undefined" != typeof twttr && "widgets" in twttr && "load" in twttr.widgets ? (twttr.events.bind("rendered", f), twttr.events.bind("rendered", m), b = !0, !0) : !1
		}

		function l(t) {
			var i = e.viewport().height,
				n = e(document.body).scrollTop(),
				o = t.offsetHeight,
				s = t.offsetTop;
			return n + 2.5 * i > s && s + o > n
		}

		function h(t) {
			var e = !1;
			return c() && (g || l(t)) ? (u(t), e = !0) : d(t), e
		}

		function u(t) {
			t.classList.add("twitter-tweet"), t.classList.remove("js-tweet")
		}

		function d(t) {
			t.classList.remove("twitter-tweet"), t.classList.add("js-tweet")
		}

		function p() {
			var t, e = 0;
			for (t = 0; t < v.length; t++) h(v[t]) && e++;
			e && twttr.widgets.load(y)
		}

		function f(e) {
			w ? t.on(e.target.contentWindow.document, "click", "a", function(t) {
				var e = t.currentTarget;
				window.open(e.getAttribute("href")), t.stopImmediatePropagation(), t.preventDefault()
			}) : n("a.web-intent", e.target.contentWindow.document).removeClass("web-intent")
		}

		function m(t) {
			!w && n('iframe[src^="https://vine.co"],iframe[src^="https://amp.twimg.com/amplify-web-player/prod/source.html?video_url"]', t.target.contentWindow.document)[0] && (n(".MediaCard", t.target.contentWindow.document).remove(), n(t.target).removeAttr("height"))
		}
		var g, v, y = i(".article__body"),
			w = n("body").hasClass("android"),
			b = !1;
		return {
			init: o,
			checkForTweets: s,
			enhanceTweets: p,
			modules: {
				fixVineAutoplay: m
			}
		}
	}), define("modules/witness", [], function() {
		var t = {
			duplicate: function() {
				var t = document.querySelector(".witness");
				t && document.querySelector(".article__body").insertAdjacentHTML("afterend", '<div class="extras">' + t.outerHTML + "</div>")
			}
		};
		return {
			duplicate: t.duplicate,
			modules: t
		}
	}), define("modules/outbrain", ["modules/$"], function(t) {
		"use strict";

		function e() {
			var t = ["politics", "world", "business", "commentisfree"],
				e = document.body.getAttribute("data-content-section");
			return e.toLowerCase().match("news") || t.indexOf(e.toLowerCase()) > 0 ? "sections" : "all"
		}

		function i() {
			var i = t(".outbrainImage").attr("data-src");
			if (o.length > 0 && i.length > 0) {
				o.css("display", "block");
				var r, a, c, l = {};
				if ("tablet" === s()) t(".outbrainText").css("display", "block"), l = {
					image: {
						sections: n ? "AR_25" : "AR_24",
						all: n ? "AR_19" : "AR_18"
					},
					text: {
						sections: n ? "AR_26" : "AR_27",
						all: n ? "AR_21" : "AR_20"
					}
				}, a = l.text[e()], t(".outbrainText").attr("data-widget-id", a);
				else if ("mobile" === s()) {
					l = {
						image: {
							sections: n ? "AR_23" : "AR_22",
							all: n ? "AR_17" : "AR_16"
						}
					};
					var h = document.getElementById("outbrain"),
						u = document.getElementsByClassName("outbrainText");
					h.childElementCount > 0 && u.length > 0 && h.removeChild(u[0])
				}
				r = l.image[e()], t(".outbrainImage").attr("data-widget-id", r), c = document.createElement("script"), c.id = "outbrain-widget", c.async = !0, c.src = "https://widgets.outbrain.com/outbrain.js", t(document.body).append(c)
			}
		}
		var n = t("body").hasClass("android"),
			o = t(".container__outbrain"),
			s = function() {
				var t = document.body.getAttribute("data-ads-config");
				return t
			};
		return {
			load: i
		}
	}), define("modules/ads", ["modules/$", "bonzo"], function(t, e) {
		"use strict";
		var i, n = 0,
			o = {
				insertAdPlaceholders: function(e) {
					n = 1;
					var i = o.createMpuHtml(n);
					t(".article__body > div.prose > :first-child").before('<div class="advert-slot advert-slot--placeholder"></div>');
					var s = (parseInt(e.mpuAfterParagraphs, 10) || 6) - 1;
					t(".article__body > div.prose > p:nth-of-type(" + s + ") ~ p + p").first().before(i)
				},
				insertLiveblogAdPlaceholders: function() {
					window.updateLiveblogAdPlaceholders = function(e) {
						e && (n = 0, t(".advert-slot--mpu").remove()), t(".article__body > .block").each(function(e, i) {
							if (1 === i || 6 === i) {
								n++;
								var s = o.createMpuHtml(n);
								t(e).after(s)
							}
						}), e && (o.isAndroid ? o.updateAndroidPosition() : window.location.href = "x-gu://ad_moved")
					}, window.updateLiveblogAdPlaceholders()
				},
				createMpuHtml: function(t) {
					return '<div class="advert-slot advert-slot--mpu"><div class="advert-slot__label">Advertisement<a class="advert-slot__action" href="x-gu://subscribe">Hide<span data-icon="&#xe04F;"></span></a></div><div class="advert-slot__wrapper" id="advert-slot__wrapper"><div class="advert-slot__wrapper__content" id="' + t + '"></div></div></div>';
				},
				getMpuPos: function(e) {
					var i = t(".advert-slot__wrapper");
					if (i.length) {
						var n = document.body.scrollLeft,
							o = document.body.scrollTop,
							s = [];
						return i.each(function(t, e) {
							var i = t.getBoundingClientRect();
							0 !== i.width && 0 !== i.height && (s.push(i.left + n), s.push(i.top + o), s.push(i.width), s.push(i.height))
						}), s.length > 4 ? e(s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7]) : e(s[0], s[1], s[2], s[3], -1, -1, -1, -1)
					}
					return null
				},
				getMpuPosCommaSeparated: function() {
					return o.getMpuPos(function(t, e, i, o, s, r, a, c) {
						return n > 1 ? t + "," + e + "," + s + "," + r : t + "," + e
					})
				},
				getMpuOffset: function() {
					return o.getMpuPos(function(t, e, i, o, s, r, a, c) {
						return n > 1 ? t + "-" + e + ":" + s + "-" + r : t + "-" + e
					})
				},
				updateAndroidPosition: function() {
					"liveblog" === i ? o.getMpuPos(function(t, e, i, n, o, s, r, a) {
						window.GuardianJSInterface.mpuLiveblogAdsPosition(t, e, i, n, o, s, r, a)
					}) : o.getMpuPos(function(t, e, i, n, o, s, r, a) {
						window.GuardianJSInterface.mpuAdsPosition(t, e, i, n)
					})
				},
				initMpuPoller: function() {
					o.poller(1e3, o.getMpuOffset(), !0)
				},
				poller: function(t, e, i) {
					var n = o.getMpuOffset();
					i && o.isAndroid && o.updateAndroidPosition(), n !== e && (o.isAndroid ? o.updateAndroidPosition() : window.location.href = "x-gu://ad_moved"), setTimeout(o.poller.bind(o, t + 50, n), t)
				},
				fireAdsReady: function(e) {
					t("body").hasClass("no-ready") || "true" !== t("body").attr("data-use-ads-ready") || (e.location.href = "x-gu://ads-ready")
				},
				updateMPUPosition: function(e) {
					e || (e = t(".advert-slot__wrapper").first().offset().top);
					var i = t(".advert-slot__wrapper").first().offset().top;
					return i !== e && (o.isAndroid ? o.updateAndroidPosition() : window.location.href = "x-gu://ad_moved"), i
				}
			},
			s = function(e) {
				o.isAndroid = t("body").hasClass("android"), this.initialised || (this.initialised = !0, ("true" == e.adsEnabled || null !== e.adsEnabled && e.adsEnabled.match && e.adsEnabled.match(/mpu/)) && ("liveblog" !== e.adsType || t("body").hasClass("the-minute") ? (o.insertAdPlaceholders(e), i = "default") : (o.insertLiveblogAdPlaceholders(), i = "liveblog"), window.initMpuPoller = o.initMpuPoller, window.applyNativeFunctionCall("initMpuPoller"), window.getMpuPosCommaSeparated = o.getMpuPosCommaSeparated, o.isAndroid || o.initMpuPoller(), o.fireAdsReady(window)))
			};
		return {
			init: s,
			modules: o
		}
	}), define("modules/quiz", ["smoothScroll", "modules/ads"], function(t, e) {
		"use strict";
		var i = {
				init: function(t) {
					i.answers = document.querySelector(".quiz__correct-answers").innerHTML.split(","), i.moveMPU = i.IsAdBelowQuiz(t), i.removeAnswers(), i.scoreMessages = i.getScoreMessages(), i.buildResultsPanel(t), i.setupQuestions(), i.numAnswered = 0, i.score = 0, t.classList.add("loaded")
				},
				IsAdBelowQuiz: function(t) {
					var e, i, n = !1,
						o = document.querySelector(".advert-slot__wrapper");
					return o && (e = o.offsetTop, i = t.offsetTop, e > i && (n = !0)), n
				},
				adjustAdPosition: function(t, n, o) {
					var s, r;
					n || (n = o), r = o - n, s = e.modules.updateMPUPosition(t), 2e3 > r && window.animFrame(i.adjustAdPosition.bind(null, s, n))
				},
				removeAnswers: function() {
					var t, e = document.querySelectorAll(".quiz__correct-answers-title, .quiz__correct-answers");
					for (t = 0; t < e.length; t++) e[t].parentNode.removeChild(e[t])
				},
				getScoreMessages: function() {
					var t, e, i, n = document.querySelectorAll(".quiz__scores > li"),
						o = {};
					for (t = 0; t < n.length; t++) e = n[t].dataset.title, i = n[t].dataset.minScore, o[Math.max(i, 0)] = e;
					return o
				},
				buildResultsPanel: function(t) {
					var e = document.createElement("div");
					e.classList.add("quiz-scores"), e.id = "quiz-scores", e.innerHTML = '<p class="quiz-scores__score"><span class="quiz-scores__correct"></span> / <span class="quiz-scores__questions">' + i.answers.length + '</span></p><p class="quiz-scores__message"></p>', t.appendChild(e)
				},
				setupQuestions: function() {
					var t, e, n, o, s, r, a, c = document.querySelectorAll(".quiz__question");
					for (t = 0; t < c.length; t++) {
						for (o = c[t], a = i.wrapQuestion(o), s = o.querySelectorAll(":scope > img"), e = 0; e < s.length; e++) i.adjustQuestionImage(o, a, s[e]);
						for (r = o.querySelectorAll(".question__text"), n = 0; n < r.length; n++) i.adjustQuestionText(a, r[n]);
						i.adjustAnswers(o, t)
					}
				},
				wrapQuestion: function(t) {
					var e = document.createElement("div"),
						i = t.querySelectorAll(".question__answers");
					return e.classList.add("question__wrapper"), t.insertBefore(e, i[0]), e
				},
				adjustQuestionImage: function(t, e, i) {
					"" !== i.getAttribute("src") ? (t.classList.add("has-image"), i.classList.add("question__img"), e.appendChild(i)) : i.parentNode.removeChild(i)
				},
				adjustQuestionText: function(t, e) {
					t.appendChild(e)
				},
				adjustAnswers: function(t, e) {
					var n, o = t.querySelectorAll(".question__answer");
					for (n = 0; n < o.length; n++) i.styleAnswer(o[n], n, t, e)
				},
				styleAnswer: function(t, e, n, o) {
					var s, r, a = t.querySelectorAll(":scope > img"),
						c = document.createElement("div"),
						l = document.createElement("div"),
						h = document.createElement("div"),
						u = t.querySelectorAll(".answer__text");
					for (h.classList.add("answer__wrapper"), t.appendChild(h), l.classList.add("answer__message"), h.appendChild(l), c.classList.add("answer__marker"), h.appendChild(c), s = 0; s < a.length; s++) i.adjustAnswerImage(t, h, a[s]);
					for (r = 0; r < u.length; r++) i.adjustAnswerText(l, u[r]);
					t.addEventListener("click", i.onAnswerClick.bind(null, t, e, n, o, l, a))
				},
				adjustAnswerImage: function(t, e, i) {
					"" !== i.getAttribute("src") ? (t.classList.add("has-image"), t.classList.add("answer__img"), e.appendChild(i)) : i.parentNode.removeChild(i)
				},
				adjustAnswerText: function(t, e) {
					t.appendChild(e)
				},
				onAnswerClick: function(t, e, n, o, s, r) {
					var a, c, l, h = i.answers[o].split(":")[1].split("-"),
						u = h[0].trim().toUpperCase(),
						d = h[1],
						p = String.fromCharCode(65 + e),
						f = null,
						m = null;
					n.classList.contains("answered") || (p === u ? (c = t, l = s, c.classList.add("correct-answer"), d && (a = document.createElement("p"), a.classList.add("answer__explanation"), a.innerHTML = d.trim(), l.appendChild(a)), n.classList.add("is-correct"), i.score++) : (n.classList.add("is-wrong"), t.classList.add("wrong-answer")), n.classList.add("answered"), i.numAnswered++, i.moveMPU && window.animFrame(i.adjustAdPosition.bind(null, m, f)), r.length && i.showMarkedAnswer(n), i.answers.length === i.numAnswered && i.showScore())
				},
				showMarkedAnswer: function(t) {
					var e, i, n, o, s, r = t.querySelectorAll(".correct-answer, .wrong-answer");
					for (e = 0; e < r.length; e++) i = r[e], n = i.querySelector(".answer__message"), o = n.offsetHeight, s = i.querySelector(".answer__marker"), n.style.top = "calc(100% - " + o + "px)", s.style.top = "calc(100% - " + (o - 7) + "px)"
				},
				showScore: function() {
					var e, n = "";
					for (e = 0; e < i.score; e++)
						if (i.scoreMessages[e]) {
							n = i.scoreMessages[e];
							break
						}
					document.querySelector(".quiz-scores__correct").innerHTML = i.score.toString(), document.querySelector(".quiz-scores__message").innerHTML = n, document.querySelector(".quiz-scores").classList.add("open"), t.animateScroll(null, "#quiz-scores", {
						speed: 1500,
						offset: 40
					})
				}
			},
			n = function() {
				var t;
				this.initialised || (this.initialised = !0, t = document.querySelector(".element-atom .quiz"), t && i.init(t))
			};
		return {
			init: n
		}
	}), define("modules/util", [], function() {
		"use strict";
		var t = {
			isElementInViewport: function(t) {
				var e = t.getBoundingClientRect();
				return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth)
			},
			isElementPartiallyInViewport: function(t) {
				var e = t.getBoundingClientRect(),
					i = window.innerHeight || document.documentElement.clientHeight,
					n = window.innerWidth || document.documentElement.clientWidth,
					o = e.top <= i && e.top + e.height >= 0,
					s = e.left <= n && e.left + e.width >= 0;
				return o && s
			},
			signalDevice: function(e) {
				var i = "x-gu://",
					n = i + e,
					o = document.createElement("iframe");
				o.style.display = "none", o.src = n, t.doIframeMessage(o)
			},
			doIframeMessage: function(t) {
				document.documentElement.appendChild(t), document.documentElement.removeChild(t)
			},
			isOnline: function() {
				return !document.body.classList.contains("offline") && navigator.onLine
			}
		};
		return t
	}), define("modules/membership", ["bean", "modules/util"], function(t, e) {
		"use strict";

		function i() {
			o.setupMembershipCreative()
		}
		var n = !0,
			o = {
				setupMembershipCreative: function() {
					window.injectInlineArticleMembershipCreative = o.injectInlineArticleMembershipCreative, window.applyNativeFunctionCall("injectInlineArticleMembershipCreative"), e.signalDevice("membership_creative_ready")
				},
				injectInlineArticleMembershipCreative: function(i, n, s) {
					var r, a, c;
					e.isOnline() && !document.querySelector(".membership-creative-container") && (c = o.getInsertBeforeElem(), c && (r = document.createElement("style"), r.type = "text/css", r.styleSheet ? r.styleSheet.cssText = n : r.appendChild(document.createTextNode(n)), document.head.appendChild(r), a = document.createElement("a"), a.href = "x-gu://membership_creative_tap/" + s, a.classList.add("membership-creative-container"), a.innerHTML = i, c.parentNode.insertBefore(a, c), t.on(window, "scroll", window.ThrottleDebounce.debounce(100, !1, o.isMembershipCreativeInView.bind(null, a, s)))))
				},
				isMembershipCreativeInView: function(t, i) {
					var o = "membership_creative_view/" + i;
					n && e.isElementPartiallyInViewport(t) && (e.signalDevice(o), n = !1)
				},
				getInsertBeforeElem: function() {
					var t, e = 0,
						i = document.querySelector(".article__body > div.prose");
					for (t = 0; t < i.children.length; t++)
						if ("P" === i.children[t].tagName && (0 === e || i.children[t - 1] && "P" === i.children[t - 1].tagName && i.children[t + 1] && ("P" === i.children[t + 1].tagName || "H2" === i.children[t + 1].tagName)) && (e++, e > 4)) return i.children[t];
					return !1
				}
			};
		return {
			init: i
		}
	}), define("bootstraps/article", ["bean", "bonzo", "modules/$", "modules/twitter", "modules/witness", "modules/outbrain", "modules/quiz", "modules/membership", "smoothScroll"], function(t, e, i, n, o, s, r, a, c) {
		"use strict";
		var l = {
				richLinkTracking: function() {
					i(".element-rich-link").each(function(t, e) {
						var n = t.querySelectorAll("a");
						if (n.length) {
							var o = i(n).attr("href");
							"" !== o && i(n).attr("href", o + "?ArticleReferrer=RichLink")
						}
					})
				},
				insertOutbrain: function() {
					window.articleOutbrainInserter = function() {
						s.load()
					}, window.applyNativeFunctionCall("articleOutbrainInserter")
				},
				loadQuizzes: function() {
					r.init()
				},
				formatImmersive: function() {
					if (!i(".immersive").length) return !1;
					var n = e.viewport().height,
						o = n - i("body").css("margin-top").replace("px", "") + "px",
						s = .75 * n;
					if (document.body.className = document.body.className.replace(/(tone--).+?\s/g, "tone--feature1 "), i(".article__header-bg, .article__header-bg .element > iframe").css("height", o), i("body").hasClass("windows")) {
						var r = i(".article__header-bg .element > iframe");
						if (r.length) {
							var a = r[0].srcdoc.replace("transform: translate(-50%, -50%);", "-webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);").replace(/-webkit-animation/g, "animation").replace(/animation/g, "-webkit-animation").replace(/-webkit-keyframes/g, "keyframes").replace(/@keyframes/g, "@-webkit-keyframes");
							r[0].srcdoc = a
						}
					}
					i(".article h2").each(function() {
						"* * *" === i(this).html().trim() && i(this).html("").addClass("section__rule").next().addClass("has__dropcap")
					}), i("figure.element--immersive").each(function() {
						i(this).next().hasClass("element-pullquote") && (i(this).next().addClass("quote--image"), i(this).addClass("quote--overlay").data("data-thing", "")), "H2" !== i(this).next()[0].tagName || i(this).next().hasClass("section__rule") || (i(this).next().addClass("title--image"), i(this).addClass("title--overlay"), i(this).next().next().addClass("has__dropcap"))
					});
					var c = i(".article").offset().height;
					i(".element-pullquote").each(function() {
						var t = i(this),
							e = t.offset().top;
						t.attr("data-offset", e)
					}), t.on(window, "click.quote-overlay", i(".quote--overlay"), function(t) {
						t.preventDefault(), i(this.querySelector("figcaption")).toggleClass("display")
					}), t.on(window, "scroll.immersive", window.ThrottleDebounce.debounce(10, !1, function() {
						i(".element-pullquote").each(function() {
							var t = i(this),
								e = t.attr("data-offset");
							window.scrollY >= e - s && t.addClass("animated").addClass("fadeInUp")
						})
					})), t.on(window, "resize.cards orientationchange.cards", window.ThrottleDebounce.debounce(100, !1, function() {
						c = i(".article").offset().height, n = e.viewport().height, o = n - i("body").css("margin-top").replace("px", "") + "px", i(".article__header-bg, .article__header-bg .element > iframe").css("height", o)
					}))
				},
				addProgressBarChapters: function(t, e) {
					i(".article h2").each(function() {
						var n = Math.floor(i(this).offset().top / e * 100) + "%",
							o = '<div style="left:' + n + ';" class="progress__chapter"></div>';
						t.append(o)
					})
				},
				updateProgressBar: function(t, e) {
					var i = window.scrollY / e * 100 + "%";
					t.css("width", i)
				}
			},
			h = function() {
				this.initialised || (this.initialised = !0, a.init(), n.init(), n.enhanceTweets(), o.duplicate(), l.insertOutbrain(), l.loadQuizzes(), l.formatImmersive(), l.richLinkTracking())
			};
		return {
			init: h
		}
	}), define("article", ["bootstraps/common", "bootstraps/article"], function(t, e) {
		"use strict";

		function i() {
			t.init(), e.init()
		}
		return {
			init: i
		}
	});