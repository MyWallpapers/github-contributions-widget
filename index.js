const __MYWALLPAPER_WIDGET_RUNTIME_CONTRACT__ = "1";
if (!__canvasRuntime) {
      throw new Error('Canvas runtime globals are unavailable');
    }
if (!__canvasRuntime.react || !__canvasRuntime.reactJsxRuntime || !__canvasRuntime.sdkReact || !__canvasRuntime.sdkContracts || !__canvasRuntime.sdkPermissions) {
      throw new Error('Canvas runtime globals are unavailable');
    }
const __canvasRuntimeReact = __canvasRuntime.react;
const __canvasRuntimeJsxRuntime = __canvasRuntime.reactJsxRuntime;
const __canvasRuntimeSdk = __canvasRuntime.sdkReact;
const __canvasRuntimeSdkContracts = __canvasRuntime.sdkContracts;
const __canvasRuntimeSdkPermissions = __canvasRuntime.sdkPermissions;
const s = __canvasRuntimeJsxRuntime.jsxs;
const o = __canvasRuntimeJsxRuntime.jsx;
const fe = __canvasRuntimeSdk.useSettings;
const ge = __canvasRuntimeSdk.useViewport;
const ye = __canvasRuntimeSdk.useOAuth;
const be = __canvasRuntimeSdk.useStorage;
const k = __canvasRuntimeReact.useState;
const pe = __canvasRuntimeReact.useRef;
const j = __canvasRuntimeReact.useMemo;
const I = __canvasRuntimeReact.useCallback;
const E = __canvasRuntimeReact.useEffect;
const me = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ve = `query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      contributionCalendar {
        totalContributions
        weeks { contributionDays { contributionCount date weekday } }
        months { name firstDay totalWeeks }
      }
    }
  }
}`;
function xe(e, a) {
  if (e === 0 || a === 0) return 0;
  const i = e / a;
  return i <= 0.25 ? 1 : i <= 0.5 ? 2 : i <= 0.75 ? 3 : 4;
}
function we(e) {
  return e >= 1e3 ? (e / 1e3).toFixed(1) + "k" : e.toString();
}
function Me(e, a) {
  if (a !== "month") return e;
  const i = /* @__PURE__ */ new Date(), l = i.getFullYear(), d = i.getMonth();
  return e.filter(
    (b) => b.contributionDays.some((h) => {
      const c = new Date(h.date);
      return c.getFullYear() === l && c.getMonth() === d;
    })
  );
}
function Se(e, a, i, l) {
  const b = l.showHeader !== !1, h = l.showLabels !== !1, c = l.showDayLabels !== !1, W = l.showFooter !== !1, x = Math.min(8, e * 0.02, a * 0.02), z = b ? Math.min(40, a * 0.1) : 0, A = W ? Math.min(24, a * 0.06) : 0;
  let p = Math.max(80, e - x * 2), w = Math.max(40, a - x * 2 - z - A);
  const u = Math.min(p / i, w / 7);
  let g = Math.max(1, Math.round(u * 0.12));
  const F = (p - (i - 1) * g) / i, Y = (w - 6 * g) / 7, $ = Math.min(F, Y), H = c ? Math.max(12, Math.floor($ * 1.2)) : 0, M = h ? Math.max(8, Math.floor(Y * 0.7)) : 0;
  p -= H, w -= M;
  let S = (p - (i - 1) * g) / i, C = (w - 6 * g) / 7;
  S = Math.floor(Math.max(2, Math.min(80, S))), C = Math.floor(Math.max(2, Math.min(80, C))), g = Math.max(1, Math.floor(g));
  const T = Math.min(S, C), m = Math.max(1, Math.round(T * 0.15)), R = Math.max(6, Math.min(14, Math.round(T * 0.6)));
  return {
    cellWidth: S,
    cellHeight: C,
    cellGap: g,
    cellRadius: m,
    labelFontSize: R,
    dayLabelsWidth: H,
    weekHeaderHeight: M,
    headerHeight: z,
    footerHeight: A,
    padding: x
  };
}
function Ce({ count: e, date: a, x: i, y: l }) {
  const d = new Date(a).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  return /* @__PURE__ */ s(
    "div",
    {
      style: {
        position: "fixed",
        left: i + 10,
        top: l - 30,
        padding: "4px 8px",
        background: "#1c2128",
        border: "1px solid #30363d",
        borderRadius: 4,
        fontSize: 10,
        color: "#f0f6fc",
        pointerEvents: "none",
        zIndex: 1e3,
        whiteSpace: "nowrap"
      },
      children: [
        /* @__PURE__ */ s("span", { style: { fontWeight: 700 }, children: [
          e,
          " contribution",
          e !== 1 ? "s" : ""
        ] }),
        /* @__PURE__ */ s("span", { style: { color: "#8b949e", marginLeft: 3 }, children: [
          "on ",
          d
        ] })
      ]
    }
  );
}
function De({
  day: e,
  level: a,
  colorLevels: i,
  cellWidth: l,
  cellHeight: d,
  cellRadius: b,
  animDelay: h,
  onHover: c,
  onMove: W,
  onLeave: x
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      style: {
        width: l,
        height: d,
        borderRadius: b,
        background: i[a],
        cursor: "pointer",
        flexShrink: 0,
        opacity: 0,
        animation: "fadeIn 0.3s ease forwards",
        animationDelay: `${h}ms`,
        transition: "opacity 0.1s"
      },
      onMouseEnter: (z) => c(e, z),
      onMouseMove: W,
      onMouseLeave: x
    }
  );
}
function ze() {
  const e = fe(), { width: a, height: i } = ge(), { request: l, isConnected: d } = ye(), b = be(), [h, c] = k("connecting"), [W, x] = k(""), [z, A] = k(""), [p, w] = k(null), [u, g] = k(null), [F, Y] = k((/* @__PURE__ */ new Date()).getFullYear()), [$, H] = k(null), M = pe(null), S = j(
    () => [
      e.colorLevel0 || "#161b22",
      e.colorLevel1 || "#0e4429",
      e.colorLevel2 || "#006d32",
      e.colorLevel3 || "#26a641",
      e.colorLevel4 || "#39d353"
    ],
    [
      e.colorLevel0,
      e.colorLevel1,
      e.colorLevel2,
      e.colorLevel3,
      e.colorLevel4
    ]
  ), C = I(async () => (await l("github", "/user", {
    headers: { Accept: "application/vnd.github.v3+json" }
  })).data, [l]), T = I(
    async (t, n) => {
      const r = `${n}-01-01T00:00:00Z`, f = `${n}-12-31T23:59:59Z`, y = (await l("github", "/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json"
        },
        body: {
          query: ve,
          variables: { username: t, from: r, to: f }
        }
      })).data;
      if (y.errors?.length)
        throw new Error(y.errors[0].message || "GraphQL query failed");
      return y.data.user.contributionsCollection;
    },
    [l]
  ), m = I(async () => {
    try {
      c("loading");
      const t = F, n = await b.get("contributionData");
      if (n && n.year === t && Date.now() - n.timestamp < (e.refreshInterval || 30) * 60 * 1e3) {
        w(n.user), g(n.contributions), c("grid");
        return;
      }
      const r = await C(), f = await T(r.login, t);
      w(r), g(f), c("grid"), await b.set("contributionData", {
        user: r,
        contributions: f,
        year: t,
        timestamp: Date.now()
      });
    } catch (t) {
      const n = t instanceof Error ? t.message : "Unknown error";
      x("Failed to Load Data"), A(n), c("error");
    }
  }, [F, e.refreshInterval, b, C, T]);
  E(() => {
    let t = !1;
    async function n() {
      c("connecting");
      const r = await d("github");
      if (!t) {
        if (!r) {
          c("connecting");
          return;
        }
        await m();
      }
    }
    return n(), () => {
      t = !0;
    };
  }, [d, m]), E(() => {
    if (h !== "grid") return;
    const t = (e.refreshInterval || 30) * 60 * 1e3;
    return M.current = setInterval(() => {
      m();
    }, t), () => {
      M.current && (clearInterval(M.current), M.current = null);
    };
  }, [h, e.refreshInterval, m]), E(() => {
    Y((/* @__PURE__ */ new Date()).getFullYear());
  }, []);
  const R = e.displayMode || "year", P = u?.contributionCalendar.weeks ?? [], v = j(() => Me(P, R), [P, R]), G = v.length || 53, N = j(
    () => Se(a, i, G, e),
    [a, i, G, e]
  ), O = j(() => {
    let t = 0;
    for (const n of v)
      for (const r of n.contributionDays)
        r.contributionCount > t && (t = r.contributionCount);
    return t;
  }, [v]), X = j(() => {
    if (!u || e.showLabels === !1) return /* @__PURE__ */ new Map();
    const t = u.contributionCalendar.months, n = /* @__PURE__ */ new Map();
    let r = 0, f = 0;
    if (R === "month" && v.length > 0) {
      const y = new Date(v[0].contributionDays[0].date).getMonth(), _ = t.findIndex((he) => {
        const ue = new Date(2024, y, 1).toLocaleDateString("en", { month: "short" }).toLowerCase();
        return he.name.toLowerCase().startsWith(ue);
      });
      r = _ === -1 ? 0 : _;
    }
    for (let L = 0; L < v.length; L++)
      if (t[r]) {
        const y = t[r];
        f === 0 && n.set(L, y.name.substring(0, 3)), f++, f >= y.totalWeeks && (r++, f = 0);
      }
    return n;
  }, [u, v, R, e.showLabels]), Z = I((t, n) => {
    H({ count: t.contributionCount, date: t.date, x: n.clientX, y: n.clientY });
  }, []), V = I((t) => {
    H((n) => n ? { ...n, x: t.clientX, y: t.clientY } : null);
  }, []), J = I(() => {
    H(null);
  }, []), K = I(async () => {
    await d("github") && await m();
  }, [d, m]), ee = "@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }";
  if (h === "connecting")
    return /* @__PURE__ */ s(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          textAlign: "center",
          padding: 16,
          boxSizing: "border-box"
        },
        children: [
          /* @__PURE__ */ o("div", { style: { fontSize: 32 }, children: "🔐" }),
          /* @__PURE__ */ o("div", { style: { fontSize: 14, fontWeight: 600, color: "#f0f6fc" }, children: "GitHub Access Required" }),
          /* @__PURE__ */ o("div", { style: { fontSize: 11, color: "#8b949e" }, children: "Reinstall and grant access" })
        ]
      }
    );
  if (h === "loading")
    return /* @__PURE__ */ s(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          textAlign: "center",
          padding: 16,
          boxSizing: "border-box"
        },
        children: [
          /* @__PURE__ */ o(
            "div",
            {
              style: {
                width: 30,
                height: 30,
                border: "2px solid #30363d",
                borderTopColor: "#238636",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }
            }
          ),
          /* @__PURE__ */ o("style", { children: "@keyframes spin { to { transform: rotate(360deg); } }" }),
          /* @__PURE__ */ o("div", { style: { fontSize: 14, fontWeight: 600, color: "#f0f6fc" }, children: "Loading..." }),
          /* @__PURE__ */ o("div", { style: { fontSize: 11, color: "#8b949e" }, children: "Fetching your GitHub data..." })
        ]
      }
    );
  if (h === "error")
    return /* @__PURE__ */ s(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          textAlign: "center",
          padding: 16,
          boxSizing: "border-box"
        },
        children: [
          /* @__PURE__ */ o("div", { style: { fontSize: 32, color: "#f85149" }, children: "⚠️" }),
          /* @__PURE__ */ o("div", { style: { fontSize: 14, fontWeight: 600, color: "#f0f6fc" }, children: W }),
          /* @__PURE__ */ o("div", { style: { fontSize: 11, color: "#8b949e" }, children: z }),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: K,
              style: {
                padding: "8px 16px",
                borderRadius: 6,
                fontSize: 12,
                cursor: "pointer",
                border: "1px solid #30363d",
                background: "#21262d",
                color: "#c9d1d9"
              },
              children: "Retry"
            }
          )
        ]
      }
    );
  const {
    cellWidth: te,
    cellHeight: U,
    cellGap: q,
    cellRadius: ne,
    labelFontSize: D,
    dayLabelsWidth: oe,
    weekHeaderHeight: B,
    headerHeight: ie,
    footerHeight: re,
    padding: ae
  } = N, le = e.showHeader !== !1, Q = e.showFooter !== !1, se = e.showDayLabels !== !1, ce = e.showStats !== !1, de = e.showBackground ? {
    background: e.backgroundColor || "linear-gradient(135deg, #0d1117 0%, #161b22 100%)",
    backdropFilter: `blur(${e.backgroundBlur ?? 10}px)`,
    WebkitBackdropFilter: `blur(${e.backgroundBlur ?? 10}px)`
  } : { background: "transparent" };
  return /* @__PURE__ */ s(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: ae,
        boxSizing: "border-box",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#c9d1d9",
        position: "relative",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ o("style", { children: ee }),
        /* @__PURE__ */ o(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              zIndex: -1,
              pointerEvents: "none",
              ...de
            }
          }
        ),
        le && p && /* @__PURE__ */ s(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 6,
              height: ie,
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ s("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
                /* @__PURE__ */ o(
                  "img",
                  {
                    src: p.avatar_url,
                    alt: "",
                    style: { width: 20, height: 20, borderRadius: "50%", flexShrink: 0 }
                  }
                ),
                /* @__PURE__ */ s("div", { children: [
                  /* @__PURE__ */ o("div", { style: { fontWeight: 600, fontSize: D, color: "#c9d1d9" }, children: p.login }),
                  /* @__PURE__ */ o("div", { style: { fontSize: D * 0.8, color: "#8b949e" }, children: F })
                ] })
              ] }),
              Q && ce && u && /* @__PURE__ */ o("div", { style: { display: "flex", gap: 8 }, children: [
                { value: u.totalCommitContributions, label: "commits" },
                { value: u.totalPullRequestContributions, label: "PRs" },
                { value: u.totalIssueContributions, label: "issues" },
                { value: u.contributionCalendar.totalContributions, label: "total" }
              ].map((t) => /* @__PURE__ */ s("div", { style: { display: "flex", alignItems: "baseline", gap: 2 }, children: [
                /* @__PURE__ */ o("span", { style: { fontSize: D, fontWeight: 600, color: "#f0f6fc" }, children: we(t.value) }),
                /* @__PURE__ */ o("span", { style: { fontSize: D * 0.7, color: "#8b949e" }, children: t.label })
              ] }, t.label)) })
            ]
          }
        ),
        /* @__PURE__ */ o("div", { style: { flex: 1, display: "flex", minHeight: 0, minWidth: 0 }, children: /* @__PURE__ */ s("div", { style: { display: "flex", width: "100%", height: "100%" }, children: [
          se && /* @__PURE__ */ o(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: q,
                width: oe,
                flexShrink: 0,
                paddingTop: B
              },
              children: me.map((t, n) => /* @__PURE__ */ o(
                "div",
                {
                  style: {
                    height: U,
                    fontSize: D,
                    color: "#8b949e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: 3,
                    visibility: n % 2 === 1 ? "hidden" : "visible"
                  },
                  children: t
                },
                t
              ))
            }
          ),
          /* @__PURE__ */ o("div", { style: { display: "flex", gap: q, flex: 1 }, children: v.map((t, n) => /* @__PURE__ */ s(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: q,
                flex: 1
              },
              children: [
                /* @__PURE__ */ o(
                  "div",
                  {
                    style: {
                      height: B,
                      fontSize: D,
                      color: "#8b949e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    },
                    children: X.get(n) || ""
                  }
                ),
                t.contributionDays.map((r, f) => {
                  const L = xe(r.contributionCount, O), y = (n * 7 + f) * 3;
                  return /* @__PURE__ */ o(
                    De,
                    {
                      day: r,
                      level: L,
                      colorLevels: S,
                      cellWidth: te,
                      cellHeight: U,
                      cellRadius: ne,
                      animDelay: y,
                      onHover: Z,
                      onMove: V,
                      onLeave: J
                    },
                    r.date
                  );
                })
              ]
            },
            n
          )) })
        ] }) }),
        Q && /* @__PURE__ */ s(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              height: re,
              flexShrink: 0,
              fontSize: D,
              color: "#8b949e"
            },
            children: [
              /* @__PURE__ */ o("span", { children: "Less" }),
              /* @__PURE__ */ o("div", { style: { display: "flex", gap: 2 }, children: S.map((t, n) => /* @__PURE__ */ o(
                "div",
                {
                  style: {
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: t
                  }
                },
                n
              )) }),
              /* @__PURE__ */ o("span", { children: "More" })
            ]
          }
        ),
        $ && /* @__PURE__ */ o(Ce, { ...$ })
      ]
    }
  );
}
export {
  ze as default
};
