import { useEffect, useMemo, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useSite } from "./context.jsx";
import { S, MENU, LOCS, MAIN, has, pick, telHref, waHref, dirHref, searchHref, siteUrl, copyText, now, photoSrc } from "./lib.js";
import { Icon, VegMark, Ornament, Reveal, Photo, Kicker, ease } from "./ui.jsx";

/* ---------- small pieces ---------- */
function CopyButton({ text, label }) {
  const { t } = useSite();
  const [st, setSt] = useState("");
  const timer = useRef(0);
  const go = () => {
    clearTimeout(timer.current);
    if (!text) { setSt("fail"); return; }
    copyText(text).then(() => setSt("done"), () => setSt("fail"));
    timer.current = setTimeout(() => setSt(""), 2400);
  };
  return (
    <button type="button" className={"copy-btn" + (st === "done" ? " is-done" : "")} onClick={go}>
      <Icon name={st === "done" ? "done" : "copy"} />
      <span aria-live="polite">{st === "done" ? t("copy.done") : st === "fail" ? t("copy.fail") : label}</span>
    </button>
  );
}

/* A photo that stretches to fill the empty space beside taller content (desktop). */
function FillPhoto({ file, alt, caption, className = "" }) {
  const [fail, setFail] = useState(false);
  if (!file || fail) return null;
  return (
    <div className={"fill-col " + className}>
      <Photo file={file} alt={alt} className="fill-photo" onFail={() => setFail(true)} />
      {caption && <p className="fill-cap">{caption}</p>}
    </div>
  );
}
const P = S.photos || {};
/* Description for a photo: from the gallery list or photos.alts in config.js, else the fallback. */
function altFor(file, lang, fallback) {
  const g = (P.gallery || []).find((x) => x && x.file === file);
  const a = (g && g.alt) || (P.alts || {})[file];
  return a ? pick(a, lang) : fallback;
}

const rise = (i) => ({ initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease, delay: 0.08 * i } });

/* ---------- hero ---------- */
function Hero() {
  const { t } = useSite();
  const [heroFail, setHeroFail] = useState(false);
  const [bg, setBg] = useState("loading");
  const hasPhoto = !!(S.photos && S.photos.hero) && !heroFail;
  const bgFile = S.photos && S.photos.heroBackground;
  return (
    <section className={"hero" + (bgFile && bg !== "failed" ? " has-bg" : "")} id="top" aria-labelledby="heroTitle">
      {bgFile && bg !== "failed" && (
        <div className="hero-bg" aria-hidden="true">
          <img src={photoSrc(bgFile)} alt="" decoding="async" fetchpriority="high" className={bg === "loaded" ? "is-loaded" : ""} onLoad={() => setBg("loaded")} onError={() => setBg("failed")} />
        </div>
      )}
      <m.figure className="hero-banner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease }}>
        <img
          src="assets/brand/banner-1600.webp"
          srcSet="assets/brand/banner-720.webp 720w, assets/brand/banner-1200.webp 1200w, assets/brand/banner-1600.webp 1600w, assets/brand/banner.webp 2172w"
          sizes="100vw"
          width="2172" height="371" fetchpriority="high" decoding="async"
          alt={t("banner.alt")}
        />
      </m.figure>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <m.p className="kicker kicker-light" {...rise(0)}>{t("hero.kicker")}</m.p>
          <m.h1 id="heroTitle" {...rise(1)}>{t("hero.title")}</m.h1>
          <m.p className="hero-text" {...rise(2)}>{t("hero.text")}</m.p>
          <m.div className="cta-row" {...rise(3)}>
            <a className="btn btn-gold btn-lg" href="#menu">{t("hero.menu")}</a>
            {has.whatsapp && <a className="btn btn-light btn-lg" href={waHref(t("wa.order"))} target="_blank" rel="noopener"><Icon name="chat" />{t("hero.whatsapp")}</a>}
            <a className="btn btn-light btn-lg" href={dirHref(MAIN)} target="_blank" rel="noopener"><Icon name="pin" />{t("hero.directions")}</a>
          </m.div>
        </div>
        <m.div className="hero-art" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease, delay: 0.15 }}>
          <div className="arch">
            {hasPhoto ? (
              <Photo file={S.photos.hero} alt={t("hero.photoAlt")} className="arch-photo" eager onFail={() => setHeroFail(true)} />
            ) : (
              <div className="plate" aria-hidden="true">
                <svg className="plate-leaf" viewBox="0 0 120 60"><path d="M8 52C20 24 48 8 112 6 102 34 74 52 30 56c-10 1-18 0-22-4Z" fill="none" stroke="currentColor" strokeWidth="1.2" /><path d="M10 52 110 7" stroke="currentColor" strokeWidth="1" /><path d="M30 46 26 32M46 39 44 24M62 32l2-14M46 39l18 6M62 32l20 4M78 25l20 1" stroke="currentColor" strokeWidth=".8" /></svg>
                <p className="plate-kn" lang="kn">ಬೆಣ್ಣೆ<br />ದೋಸೆ</p>
                <p className="plate-line">{t("plate.line")}</p>
              </div>
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
}

function Band() {
  const { t, time, lang } = useSite();
  const st = time.status();
  return (
    <section className="band" aria-label={t("band.today")}>
      <div className="wrap band-grid">
        <div className="band-col">
          <h2 className="band-h">{t("band.today")}</h2>
          <p className={"status status-" + st.cls}><span className="dot" aria-hidden="true" />{st.text}</p>
          <p className="muted">{time.short()}</p>
        </div>
        <div className="band-col">
          <h2 className="band-h">{t("band.find")}</h2>
          <p className="muted">{MAIN ? pick(MAIN.address, lang) : ""}</p>
          <div className="band-actions">
            <a className="text-link" href={dirHref(MAIN)} target="_blank" rel="noopener">{t("hero.directions")}</a>
            <CopyButton text={MAIN ? pick(MAIN.address, lang) : ""} label={t("copy.address")} />
          </div>
        </div>
        <div className="band-col">
          <h2 className="band-h">{t("band.cater")}</h2>
          <p className="muted">{t("band.caterText")}</p>
          <a className="text-link" href="#catering">{t("band.caterLink")}</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- craft ---------- */
const ROMAN = ["I", "II", "III", "IV"];
function Craft() {
  const { t, lang } = useSite();
  return (
    <section className="section craft" id="signature" aria-labelledby="sigTitle">
      <div className={"wrap craft-grid" + (P.signature ? " has-photo" : "")}>
        <div className="craft-main">
          <Reveal><Kicker>{t("sig.kicker")}</Kicker><h2 className="h2" id="sigTitle">{t("sig.title")}</h2><p className="lead">{t("sig.text")}</p></Reveal>
          <ol className="craft-list">
            {[1, 2, 3, 4].map((n, i) => (
              <Reveal as="li" key={n} delay={0.06 * i}>
                <span className="craft-n" aria-hidden="true">{ROMAN[i]}</span>
                <div><h3>{t(`sig.${n}.t`)}</h3><p>{t(`sig.${n}.d`)}</p></div>
              </Reveal>
            ))}
          </ol>
        </div>
        <FillPhoto file={P.signature} alt={altFor(P.signature, lang, t("sig.photoAlt"))} />
      </div>
    </section>
  );
}

/* ---------- menu ---------- */
const dishV = { hide: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } } };
function Dish({ d }) {
  const { t, lang } = useSite();
  const [noPhoto, setNoPhoto] = useState(false);
  const name = pick(d.name, lang);
  const other = lang === "en" ? d.name.kn : d.name.en;
  return (
    <m.li variants={dishV} className={"dish" + (d.photo && !noPhoto ? " has-photo" : "")}>
      {d.photo && !noPhoto && <Photo file={d.photo} alt={name} className="dish-photo" onFail={() => setNoPhoto(true)} />}
      <div className="dish-body">
        <div className="dish-top">
          <h4 className="dish-name">{name}</h4>
          <span className="leader" aria-hidden="true" />
          <span className={"dish-price" + (typeof d.price === "number" ? "" : " ask")}>{typeof d.price === "number" ? "₹" + d.price : t("menu.ask")}</span>
        </div>
        <p className="dish-alt" lang={lang === "en" ? "kn" : "en"}>{other}</p>
        <p className="dish-desc">{pick(d.desc, lang)}</p>
        <p className="dish-meta">
          {has.veg && <span className="veg"><VegMark />{t("menu.veg")}</span>}
          {d.signature && <span className="special">{t("menu.signature")}</span>}
          {has.whatsapp && <a className="dish-order" href={waHref(t("menu.orderMsg", { name }))} target="_blank" rel="noopener" aria-label={t("menu.orderLabel", { name })}>{t("menu.order")}</a>}
        </p>
      </div>
    </m.li>
  );
}

function Menu() {
  const { t, lang } = useSite();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const input = useRef(null);
  const norm = (s) => String(s || "").toLowerCase().normalize("NFC");
  const shown = useMemo(() => {
    const qq = norm(q).trim();
    return MENU.filter((d) => (cat === "all" || d.category === cat) && (!qq || norm([d.name.en, d.name.kn, d.desc.en, d.desc.kn].join(" ")).includes(qq)));
  }, [q, cat]);
  const groups = [["dosa", t("menu.dosa")], ["sides", t("menu.sides")]].map(([k, label]) => [k, label, shown.filter((d) => d.category === k)]).filter((g) => g[2].length);
  const clear = () => { setQ(""); setCat("all"); input.current && input.current.focus(); };
  // Search and filters only appear when the menu is long enough to need them.
  const cats = new Set(MENU.map((d) => d.category));
  const showTools = MENU.length > 6 || cats.size > 1;
  return (
    <section className="section menu" id="menu" aria-labelledby="menuTitle">
      <div className="wrap">
        <Reveal className="center-head">
          <Kicker>{t("menu.kicker")}</Kicker>
          <h2 className="h2" id="menuTitle">{t("menu.title")}</h2>
          <Ornament />
          <p className="lead">{t("menu.text")}</p>
        </Reveal>
        {showTools && <div className="menu-tools" role="search">
          <label className="search">
            <span className="visually-hidden">{t("menu.search")}</span>
            <Icon name="search" />
            <input ref={input} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("menu.searchPh")} autoComplete="off" />
          </label>
          <div className="tabs" role="group" aria-label={t("menu.search")}>
            {[["all", t("menu.all")], ["dosa", t("menu.dosa")], ["sides", t("menu.sides")]].map(([k, l]) => (
              <button key={k} type="button" className="tab" aria-pressed={cat === k} onClick={() => setCat(k)}>{l}</button>
            ))}
          </div>
        </div>}
        <p className="visually-hidden" aria-live="polite">{t("menu.count", { n: shown.length })}</p>
        <div className={"menu-layout" + (P.menuSide && groups.length < 2 ? " has-side" : "")}>
        {shown.length ? (
          <div className={"board" + (groups.length > 1 ? " board-2" : " board-1")}>
            {groups.map(([k, label, items]) => (
              <div className="board-col" key={k}>
                {groups.length > 1 && <h3 className="board-h">{label}</h3>}
                <m.ul className="dishes" initial="hide" whileInView="show" viewport={{ once: true, margin: "0px 0px -5% 0px" }} variants={{ show: { transition: { staggerChildren: 0.06 } } }} key={lang + cat + q}>
                  {items.map((d) => <Dish key={d.id} d={d} />)}
                </m.ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="menu-empty">
            <p>{t("menu.none", { q })}</p>
            <button type="button" className="btn btn-line btn-sm" onClick={clear}>{t("menu.clear")}</button>
          </div>
        )}
        {groups.length < 2 && <FillPhoto file={P.menuSide} alt={altFor(P.menuSide, lang, t("hero.photoAlt"))} className="menu-side" />}
        </div>
        <p className="fine center">{t("menu.note")}{has.cost ? " " + t("fact.cost", { cost: S.costForTwo }) + "." : ""}</p>
      </div>
    </section>
  );
}

/* ---------- story ---------- */
function Story() {
  const { t, lang } = useSite();
  const has2 = P.story || P.storyExtra;
  return (
    <section className="section story" id="story" aria-labelledby="storyTitle">
      <div className={"wrap story-grid" + (has2 ? " has-photo" : "")}>
        <div>
          <Reveal><Kicker>{t("story.kicker")}</Kicker><h2 className="h2" id="storyTitle">{t("story.title")}</h2><p className="lead">{t("story.lead")}</p></Reveal>
          <ol className="years">
            {[1, 2, 3].map((n, i) => (
              <Reveal as="li" key={n} delay={0.08 * i}>
                <span className="year">{t(`story.${n}.y`)}</span>
                <h3>{t(`story.${n}.t`)}</h3>
                <p>{t(`story.${n}.d`)}</p>
              </Reveal>
            ))}
          </ol>
          <p className="fine">{t("story.note")}</p>
        </div>
        {has2 && (
          <div className="fill-col story-side">
            <FillPhoto file={P.story} alt={altFor(P.story, lang, t("story.photoAlt"))} />
            <FillPhoto file={P.storyExtra} alt={altFor(P.storyExtra, lang, t("sig.photoAlt"))} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- gallery ---------- */
function Gallery() {
  const { t, lang } = useSite();
  const items = ((S.photos && S.photos.gallery) || []).filter((g) => g && g.file);
  const [open, setOpen] = useState(null);
  const dlg = useRef(null);
  const from = useRef(null);
  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);
  if (!items.length) return null;
  const cur = open !== null ? items[open] : null;
  return (
    <section className="section gallery" id="gallery" aria-labelledby="galTitle">
      <div className="wrap">
        <Reveal><Kicker>{t("gallery.kicker")}</Kicker><h2 className="h2" id="galTitle">{t("gallery.title")}</h2></Reveal>
        <ul className="gal-grid">
          {items.map((g, i) => (
            <li key={g.file + i}>
              <button type="button" className="gal-btn" aria-label={t("gallery.open", { alt: pick(g.alt, lang) })} onClick={(e) => { from.current = e.currentTarget; setOpen(i); }}>
                <Photo file={g.file} alt="" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <dialog ref={dlg} className="lightbox" onClose={() => { setOpen(null); from.current && from.current.focus(); }} onClick={(e) => { if (e.target === dlg.current) setOpen(null); }}>
        {cur && (
          <m.figure initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <img src={photoSrc(cur.file)} alt={pick(cur.alt, lang)} />
            <figcaption>{pick(cur.alt, lang)}</figcaption>
          </m.figure>
        )}
        <button type="button" className="icon-btn lightbox-x" onClick={() => setOpen(null)} aria-label={t("gallery.close")}><Icon name="close" /></button>
      </dialog>
    </section>
  );
}

/* ---------- catering ---------- */
const EMPTY = { name: "", date: "", guests: "", place: "", notes: "", consent: false };
function Catering() {
  const { t, lang } = useSite();
  const [v, setV] = useState(EMPTY);
  const [errs, setErrs] = useState({});
  const [tried, setTried] = useState(false);
  const [msg, setMsg] = useState("");
  const [modal, setModal] = useState(false);
  const [modalErr, setModalErr] = useState(false);
  const [ok, setOk] = useState("");
  const dlg = useRef(null), okRef = useRef(null), preRef = useRef(null), form = useRef(null);
  const today = now().iso;

  const check = (x) => {
    const g = parseInt(x.guests, 10), e = {};
    if (x.name.trim().length < 2) e.name = "err.name";
    if (!x.date) e.date = "err.date"; else if (x.date < today) e.date = "err.datePast";
    if (!(g >= 10 && g <= 10000)) e.guests = "err.guests";
    if (x.place.trim().length < 2) e.place = "err.place";
    if (!x.consent) e.consent = "err.consent";
    return e;
  };
  const set = (k) => (e) => {
    const nv = { ...v, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value };
    setV(nv); if (tried) setErrs(check(nv));
  };
  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (modal && !d.open) d.showModal();
    if (!modal && d.open) d.close();
  }, [modal]);

  const submit = (e) => {
    e.preventDefault(); setTried(true); setOk("");
    const er = check(v); setErrs(er);
    const keys = Object.keys(er);
    if (keys.length) { const el = form.current.querySelector(`[name="${keys[0]}"]`); el && el.focus(); return; }
    const d = v.date.split("-"), notes = v.notes.trim();
    setMsg(t("cat.msg", { name: v.name.trim(), date: `${d[2]}/${d[1]}/${d[0]}`, guests: String(parseInt(v.guests, 10)), place: v.place.trim(), notes: notes ? t("cat.msgNotes", { notes }) : "" }));
    setModalErr(false); setModal(true);
  };
  const send = () => {
    if (has.whatsapp) {
      window.open(waHref(msg), "_blank", "noopener");
      done("ok.wa");
    } else {
      copyText(msg).then(() => done("ok.copy"), () => {
        setModalErr(true);
        try { const r = document.createRange(); r.selectNodeContents(preRef.current); const s = getSelection(); s.removeAllRanges(); s.addRange(r); } catch (x) { /* ignore */ }
        preRef.current && preRef.current.focus();
      });
    }
  };
  const done = (k) => { setModal(false); setOk(k); setTimeout(() => okRef.current && okRef.current.focus(), 60); };
  const field = (k, label, props = {}) => (
    <div className="field">
      <label htmlFor={"f-" + k}>{label}</label>
      <input id={"f-" + k} name={k} value={v[k]} onChange={set(k)} aria-invalid={errs[k] ? "true" : "false"} aria-describedby={errs[k] ? "e-" + k : undefined} required {...props} />
      {errs[k] && <p className="err" id={"e-" + k}><Icon name="alert" />{t(errs[k])}</p>}
    </div>
  );
  const n = Object.keys(errs).length;

  return (
    <section className="section catering" id="catering" aria-labelledby="catTitle">
      <div className="wrap cat-grid">
        <div className="cat-copy">
          <Reveal><Kicker className="kicker-light">{t("cat.kicker")}</Kicker><h2 className="h2" id="catTitle">{t("cat.title")}</h2><p className="lead">{t("cat.text")}</p></Reveal>
          <ol className="process">
            {[1, 2, 3].map((k, i) => <Reveal as="li" key={k} delay={0.08 * i}><span className="process-n" aria-hidden="true">{k}</span><p>{t("cat.p" + k)}</p></Reveal>)}
          </ol>
          <FillPhoto file={P.catering} alt={altFor(P.catering, lang, t("hero.photoAlt"))} className="cat-photo" />
        </div>
        <form ref={form} className="form" onSubmit={submit} noValidate aria-labelledby="formTitle">
          <h3 className="form-h" id="formTitle">{t("cat.form")}</h3>
          <p className="form-note">{t("cat.required")}</p>
          <AnimatePresence>
            {tried && n > 0 && <m.p className="alert alert-err" role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><Icon name="alert" />{t("err.summary")}</m.p>}
            {ok && <m.p ref={okRef} tabIndex={-1} className="alert alert-ok" role="status" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><Icon name="done" />{t(ok)}</m.p>}
          </AnimatePresence>
          {field("name", t("cat.name"), { type: "text", autoComplete: "name", maxLength: 60 })}
          <div className="field-2">
            {field("date", t("cat.date"), { type: "date", min: today })}
            {field("guests", t("cat.guests"), { type: "number", inputMode: "numeric", min: 10, max: 10000, step: 1 })}
          </div>
          {field("place", t("cat.place"), { type: "text", autoComplete: "address-level2", maxLength: 80 })}
          <div className="field">
            <label htmlFor="f-notes">{t("cat.notes")}</label>
            <textarea id="f-notes" name="notes" rows={2} maxLength={300} value={v.notes} onChange={set("notes")} aria-describedby="h-notes" />
            <p className="hint" id="h-notes">{t("cat.notesHint")}</p>
          </div>
          <div className="check">
            <input id="f-consent" name="consent" type="checkbox" checked={v.consent} onChange={set("consent")} aria-invalid={errs.consent ? "true" : "false"} aria-describedby={errs.consent ? "e-consent" : undefined} />
            <label htmlFor="f-consent">{t("cat.consent")}</label>
          </div>
          {errs.consent && <p className="err" id="e-consent"><Icon name="alert" />{t(errs.consent)}</p>}
          <button className="btn btn-primary btn-lg btn-block" type="submit">{t("cat.submit")}</button>
        </form>
      </div>
      <dialog ref={dlg} className="modal" aria-labelledby="mTitle" onClose={() => setModal(false)}>
        <div className="modal-in">
          <h2 className="modal-h" id="mTitle">{t("modal.title")}</h2>
          <p className="muted">{t(has.whatsapp ? "modal.textWa" : "modal.textCopy")}</p>
          <pre ref={preRef} className="modal-msg" tabIndex={0}>{msg}</pre>
          {modalErr && <p className="err" role="alert"><Icon name="alert" />{t("copy.fail")}</p>}
          <div className="modal-actions">
            <button type="button" className="btn btn-primary" onClick={send}><Icon name={has.whatsapp ? "chat" : "copy"} />{t(has.whatsapp ? "modal.open" : "modal.copy")}</button>
            <button type="button" className="btn btn-line" onClick={() => setModal(false)}>{t("modal.edit")}</button>
          </div>
        </div>
      </dialog>
    </section>
  );
}

/* ---------- visit ---------- */
function MapBox() {
  const { t, consent, setConsent } = useSite();
  const [loaded, setLoaded] = useState(false);
  const on = consent === "yes" && MAIN;
  return (
    <div className="map">
      {on ? (
        <>
          {!loaded && <span className="skeleton" aria-hidden="true" />}
          <iframe title={t("map.title")} src={"https://www.google.com/maps?q=" + encodeURIComponent(MAIN.mapsQuery) + "&output=embed"} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen onLoad={() => setLoaded(true)} />
        </>
      ) : (
        <div className="map-consent">
          <Icon name="pin" className="map-ico" />
          <p>{t("map.consent")}</p>
          <div className="map-actions">
            <button type="button" className="btn btn-primary btn-sm" onClick={() => setConsent("yes")}>{t("map.load")}</button>
            <a className="btn btn-line btn-sm" href={dirHref(MAIN)} target="_blank" rel="noopener">{t("map.open")}<Icon name="ext" /></a>
          </div>
        </div>
      )}
    </div>
  );
}
function Qr() {
  const { t } = useSite();
  const url = siteUrl();
  const [svg, setSvg] = useState("");
  const box = useRef(null);
  useEffect(() => {
    if (!url || !box.current) return;
    const make = () => {
      const go = () => { const q = window.qrcode(0, "M"); q.addData(url); q.make(); setSvg(q.createSvgTag({ cellSize: 4, margin: 0, scalable: true })); };
      if (window.qrcode) return go();
      const s = document.createElement("script"); s.src = "js/vendor/qrcode.js"; s.onload = go; document.body.appendChild(s);
    };
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { make(); io.disconnect(); } }, { rootMargin: "400px 0px" });
    io.observe(box.current);
    return () => io.disconnect();
  }, [url]);
  if (!url) return null;
  return (
    <div className="qr-row">
      <div ref={box} className="qr" aria-hidden="true">{svg ? <span dangerouslySetInnerHTML={{ __html: svg }} /> : <span className="skeleton" />}</div>
      <div>
        <h3 className="mini-h">{t("qr.title")}</h3>
        <p className="muted">{t("qr.text")}</p>
        <CopyButton text={url} label={t("qr.copy")} />
      </div>
    </div>
  );
}
function Visit() {
  const { t, lang, time } = useSite();
  return (
    <section className="section visit" id="visit" aria-labelledby="visitTitle">
      <div className="wrap">
        <Reveal><Kicker>{t("visit.kicker")}</Kicker><h2 className="h2" id="visitTitle">{t("visit.title")}</h2></Reveal>
        <div className="visit-grid">
          <div className="visit-info">
            {LOCS.map((l) => {
              const ph = l.phone || S.phone, okPh = String(ph || "").replace(/\D/g, "").length >= 10;
              return (
                <div className="loc" key={l.id}>
                  <h3 className="mini-h">{pick(l.name, lang)}</h3>
                  <p className="loc-addr">{pick(l.address, lang)}</p>
                  <div className="loc-actions">
                    <a className="btn btn-primary btn-sm" href={dirHref(l)} target="_blank" rel="noopener"><Icon name="pin" />{t("visit.directions")}</a>
                    {okPh && <a className="btn btn-line btn-sm" href={telHref(ph)}><Icon name="phone" />{t("visit.call")} {ph}</a>}
                    <CopyButton text={pick(l.address, lang)} label={t("copy.address")} />
                  </div>
                </div>
              );
            })}
            <div className="hours-box">
              <h3 className="mini-h">{t("visit.hours")}</h3>
              <dl className="hours">
                {time.rows().map((r) => <div key={r[0]} className={r[2] ? "is-today" : ""}><dt>{r[0]}</dt><dd>{r[1]}</dd></div>)}
              </dl>
            </div>
            <a className="text-link" href={searchHref(MAIN)} target="_blank" rel="noopener">{t("visit.reviews")}<Icon name="ext" /></a>
            <FillPhoto file={P.visit} alt={altFor(P.visit, lang, t("story.photoAlt"))} caption={t("visit.board")} className="visit-photo" />
          </div>
          <div className="visit-side">
            <MapBox />
            <Qr />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- faq ---------- */
function Faq() {
  const { t, time, lang } = useSite();
  const items = (t("faq") || []).filter((f) => !f.need || has[f.need]);
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq" aria-labelledby="faqTitle">
      <div className="wrap faq-grid">
        <div className="faq-side">
          <Reveal><Kicker>{t("faq.kicker")}</Kicker><h2 className="h2" id="faqTitle">{t("faq.title")}</h2></Reveal>
          <FillPhoto file={P.faq} alt={altFor(P.faq, lang, t("hero.photoAlt"))} className="faq-photo" />
        </div>
        <div className="faq-list">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={"qa" + (isOpen ? " is-open" : "")} key={i}>
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={"qa-" + i} id={"qb-" + i} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{f.q}</span><Icon name="plus" className="qa-ico" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div id={"qa-" + i} role="region" aria-labelledby={"qb-" + i} className="qa-a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}>
                      <p>{f.a.replace("{hours}", time.short() + ".")}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Band />
      <Craft />
      <Menu />
      <Story />
      <Gallery />
      <Catering />
      <Visit />
      <Faq />
    </>
  );
}
