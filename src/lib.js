/* Shared helpers. All content comes from public/content/*.js (window.SITE, I18N, MENU, LOCATIONS). */
export const S = window.SITE || {};
export const I = window.I18N || { en: {} };
export const MENU = window.MENU || [];
export const LOCS = (window.LOCATIONS || []).filter((l) => l.active);
export const MAIN = LOCS[0] || null;
export const params = new URLSearchParams(window.location.search);

export const digits = (s) => String(s || "").replace(/\D/g, "");
export const has = {
  phone: digits(S.phone).length >= 10,
  whatsapp: digits(S.whatsapp).length >= 11,
  email: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(S.email || ""),
  veg: !!S.pureVeg,
  cost: !!S.costForTwo
};

export function store(k, v) {
  try {
    if (v === undefined) return localStorage.getItem(k);
    if (v === null) localStorage.removeItem(k);
    else localStorage.setItem(k, v);
  } catch (e) { return null; }
  return null;
}

export function translate(lang, key, vars) {
  const src = I[lang] && I[lang][key] !== undefined ? I[lang] : I.en;
  let v = src ? src[key] : undefined;
  if (v === undefined) return "";
  if (typeof v === "string" && vars) v = v.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : ""));
  return v;
}
export const pick = (o, lang) => (o ? o[lang] || o.en || "" : "");

export function telHref(num) {
  let d = digits(num);
  if (d.length === 10) d = "91" + d;
  else if (d.length === 11 && d[0] === "0") d = "91" + d.slice(1);
  return "tel:+" + d;
}
export const waHref = (text, num) => "https://wa.me/" + digits(num || S.whatsapp) + "?text=" + encodeURIComponent(text);
export const dirHref = (loc) => "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(loc ? loc.mapsQuery : S.name + ", Davangere");
export const searchHref = (loc) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(loc ? loc.mapsQuery : S.name + ", Davangere");
export function siteUrl() {
  if (S.siteUrl) return S.siteUrl;
  if (/^https?:$/.test(window.location.protocol)) return window.location.origin + "/";
  return "";
}
export const photoSrc = (file) => (/^https?:\/\//.test(file) ? file : "assets/photos/" + file);

/* ---------- time in India ---------- */
const DAYIDX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
export function now() {
  const p = {};
  new Intl.DateTimeFormat("en-US", { timeZone: S.timezone || "Asia/Kolkata", weekday: "short", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
    .formatToParts(new Date()).forEach((x) => { p[x.type] = x.value; });
  const n = { day: DAYIDX[p.weekday], mins: (parseInt(p.hour, 10) % 24) * 60 + parseInt(p.minute, 10), year: p.year, iso: `${p.year}-${p.month}-${p.day}` };
  // Testing only: ?time=21:10&day=5 simulates a moment.
  const tm = params.get("time") || "";
  if (/^\d{1,2}:\d{2}$/.test(tm)) { const a = tm.split(":"); n.mins = +a[0] * 60 + +a[1]; }
  if (/^[0-6]$/.test(params.get("day") || "")) n.day = +params.get("day");
  return n;
}
const mins = (hhmm) => { const a = hhmm.split(":"); return +a[0] * 60 + +a[1]; };

export function makeTime(t, lang) {
  const fmt = (hhmm) => {
    const a = hhmm.split(":"), h = +a[0], m = a[1], h12 = h % 12 || 12;
    if (lang === "kn") {
      let w = "";
      (t("time.parts") || []).forEach((p) => { if (h >= p[0]) w = p[1]; });
      return (w ? w + " " : "") + h12 + ":" + m;
    }
    return `${h12}:${m} ${h < 12 ? t("time.am") : t("time.pm")}`;
  };
  const range = (h) => (h ? t("hours.range", { open: fmt(h.open), close: fmt(h.close) }) : t("visit.closed"));
  const H = S.hours || [];
  const allSame = H.length === 7 && H.every((h) => h && H[0] && h.open === H[0].open && h.close === H[0].close);
  const short = () => {
    if (allSame) return t("visit.everyday") + ", " + range(H[0]);
    const n = now();
    return t("days")[n.day] + ": " + range(H[n.day]);
  };
  const status = () => {
    const n = now(), today = H[n.day];
    if (today && n.mins >= mins(today.open) && n.mins < mins(today.close)) {
      const left = mins(today.close) - n.mins;
      return { cls: left <= 30 ? "soon" : "open", text: t(left <= 30 ? "status.soon" : "status.open", { t: fmt(today.close) }) };
    }
    for (let i = 0; i < 8; i++) {
      const d = (n.day + i) % 7, h = H[d];
      if (!h || (i === 0 && n.mins >= mins(h.open))) continue;
      const label = i === 0 ? t("status.today") : i === 1 ? t("status.tomorrow") : t("days")[d];
      return { cls: "closed", text: t("status.closed", { day: label, t: fmt(h.open) }) };
    }
    return { cls: "closed", text: "" };
  };
  const rows = () => {
    const n = now(), days = t("days");
    return allSame ? [[t("visit.everyday"), range(H[0]), false]] : H.map((h, d) => [days[d], range(h), d === n.day]);
  };
  return { fmt, range, short, status, rows };
}

/* ---------- clipboard ---------- */
export function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
  return new Promise((res, rej) => {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy") ? res() : rej(new Error("copy")); } catch (e) { rej(e); }
    ta.remove();
  });
}
