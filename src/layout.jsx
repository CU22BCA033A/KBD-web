import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence, useScroll } from "framer-motion";
import { useSite } from "./context.jsx";
import { S, MAIN, has, params, digits, telHref, waHref, dirHref, siteUrl, pick } from "./lib.js";
import { Icon, Mark, ease } from "./ui.jsx";

const NAV = ["menu", "story", "catering", "visit", "faq"];

function Logo({ footer }) {
  const [bad, setBad] = useState(false);
  const { t } = useSite();
  const home = document.getElementById("root").getAttribute("data-page") === "home";
  return (
    <a className={"brand" + (footer ? " brand-ftr" : "")} href={home ? "#top" : "index.html"} aria-label={t("brand.home")}>
      {S.logo && !bad ? <img className="brand-img" src={S.logo} alt="" width="56" height="56" onError={() => setBad(true)} /> : <Mark />}
      <span className="brand-text">
        <span className="brand-name">Sri Guru Kottureshwara</span>
        <span className="brand-sub">{t("brand.sub")}</span>
      </span>
    </a>
  );
}

function LangSwitch() {
  const { lang, setLang, t } = useSite();
  return (
    <div className="lang" role="group" aria-label={t("lang.label")}>
      <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
      <button type="button" aria-pressed={lang === "kn"} onClick={() => setLang("kn")} lang="kn">ಕನ್ನಡ</button>
    </div>
  );
}
function ThemeSwitch() {
  const { theme, toggleTheme, t } = useSite();
  return (
    <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={t(theme === "dark" ? "theme.light" : "theme.dark")}>
      <Icon name={theme === "dark" ? "sun" : "moon"} />
    </button>
  );
}

/* The hotel's name board, rebuilt from the banner artwork so it stays sharp and fits phones. */
function Banner() {
  const { t } = useSite();
  return (
    <section className="banner" aria-label={t("banner.label")}>
      <div className="banner-in">
        <img className="deity" src="assets/brand/deity-left.webp" alt="Sri Guru Kottureshwara" width="279" height="389" decoding="async" />
        <div className="banner-text">
          <p className="banner-top" lang="kn">॥ ಶ್ರೀ ಗುರು ಕೊಟ್ಟೂರೇಶ್ವರ ಪ್ರಸನ್ನ ॥</p>
          <p className="banner-kn" lang="kn">ಶ್ರೀ ಗುರು ಕೊಟ್ಟೂರೇಶ್ವರ ಬೆಣ್ಣೆ ದೋಸೆ ಹೋಟೆಲ್</p>
          <p className="banner-place" lang="kn">(ದಾವಣಗೆರೆ)</p>
          <p className="banner-en" lang="en"><img className="banner-plate" src="assets/brand/plate.webp" alt="" width="152" height="73" />Sri Guru Kottureshwara Butter Dosa Hotel</p>
        </div>
        <img className="deity" src="assets/brand/deity-right.webp" alt="Temple deity decorated with flowers" width="269" height="389" decoding="async" />
      </div>
    </section>
  );
}

function Header({ page }) {
  const { t } = useSite();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const burger = useRef(null);
  const panel = useRef(null);
  const { scrollYProgress } = useScroll();
  const base = page === "home" ? "" : "index.html";

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); burger.current && burger.current.focus(); } };
    const onResize = () => { if (window.innerWidth >= 1080) setOpen(false); };
    document.addEventListener("keydown", onKey); window.addEventListener("resize", onResize);
    const first = panel.current && panel.current.querySelector("a");
    if (first) first.focus();
    return () => { document.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [open]);

  useEffect(() => {
    if (page !== "home" || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-40% 0px -55% 0px" });
    NAV.forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s); });
    return () => io.disconnect();
  }, [page]);

  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Logo />
        <nav className="nav" aria-label={t("nav.label")}>
          {NAV.map((k) => <a key={k} href={base + "#" + k} aria-current={active === k ? "true" : undefined}>{t("nav." + k)}</a>)}
        </nav>
        <div className="tools">
          <div className="tools-wide"><LangSwitch /><ThemeSwitch /></div>
          <a className="btn btn-primary btn-sm hdr-cta" href={dirHref(MAIN)} target="_blank" rel="noopener">{t("hero.directions")}</a>
          <button ref={burger} type="button" className="icon-btn burger" aria-expanded={open} aria-controls="mnav" aria-label={t(open ? "nav.close" : "nav.open")} onClick={() => setOpen(!open)}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <m.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <AnimatePresence>
        {open && (
          <m.div id="mnav" ref={panel} className="mnav" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}>
            <div className="wrap mnav-in">
              <ul className="mnav-links">
                {NAV.map((k) => <li key={k}><a href={base + "#" + k} onClick={() => setOpen(false)}>{t("nav." + k)}</a></li>)}
              </ul>
              <div className="mnav-prefs"><LangSwitch /><ThemeSwitch /></div>
              <div className="mnav-actions">
                <a className="btn btn-primary" href={dirHref(MAIN)} target="_blank" rel="noopener"><Icon name="pin" />{t("hero.directions")}</a>
                {has.phone && <a className="btn btn-line" href={telHref(S.phone)}><Icon name="phone" />{t("hero.call")}</a>}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function contactLinks(t) {
  const out = [];
  if (has.phone) out.push(<li key="p"><a href={telHref(S.phone)}><Icon name="phone" />{S.phone}</a></li>);
  if (has.whatsapp) out.push(<li key="w"><a href={waHref(t("wa.order"))} target="_blank" rel="noopener"><Icon name="chat" />WhatsApp</a></li>);
  if (has.email) out.push(<li key="e"><a href={"mailto:" + S.email}><Icon name="mail" />{S.email}</a></li>);
  return out;
}
export { contactLinks };

function Footer({ page }) {
  const { t, lang, time, setCookieOpen } = useSite();
  const base = page === "home" ? "" : "index.html";
  const contact = contactLinks(t);
  const B = S.business || {}, C = S.credit || {}, SO = S.social || {};
  return (
    <footer className="ftr">
      <div className="wrap ftr-grid">
        <div className="ftr-brand">
          <Logo footer />
          <p className="ftr-tag">{t("foot.tag")}</p>
          {(SO.instagram || SO.facebook) && (
            <ul className="social">
              {SO.instagram && <li><a href={SO.instagram} target="_blank" rel="noopener" aria-label="Instagram"><Icon name="insta" /></a></li>}
              {SO.facebook && <li><a href={SO.facebook} target="_blank" rel="noopener" aria-label="Facebook"><Icon name="fb" /></a></li>}
            </ul>
          )}
        </div>
        <div>
          <h2 className="ftr-h">{t("foot.visit")}</h2>
          <p className="ftr-text">{MAIN ? pick(MAIN.address, lang) : ""}</p>
          <p className="ftr-text">{time.short()}</p>
          <a className="ftr-link" href={dirHref(MAIN)} target="_blank" rel="noopener">{t("hero.directions")}<Icon name="ext" /></a>
        </div>
        {contact.length > 0 && <div><h2 className="ftr-h">{t("foot.contact")}</h2><ul className="ftr-list">{contact}</ul></div>}
        <nav aria-label={t("foot.explore")}>
          <h2 className="ftr-h">{t("foot.explore")}</h2>
          <ul className="ftr-list">{["menu", "story", "catering", "faq"].map((k) => <li key={k}><a href={base + "#" + k}>{t("nav." + k)}</a></li>)}</ul>
        </nav>
        <nav aria-label={t("foot.legal")}>
          <h2 className="ftr-h">{t("foot.legal")}</h2>
          <ul className="ftr-list">
            <li><a href="privacy.html">{t("foot.privacy")}</a></li>
            <li><a href="terms.html">{t("foot.terms")}</a></li>
            <li><a href="refund.html">{t("foot.refund")}</a></li>
            <li><a href="cookies.html">{t("foot.cookies")}</a></li>
            <li><button type="button" className="linklike" onClick={() => setCookieOpen(true)}>{t("foot.cookieSettings")}</button></li>
          </ul>
        </nav>
      </div>
      <div className="wrap ftr-base">
        <p>&copy; {time && new Date().getFullYear()} {S.name}. {t("foot.rights")}</p>
        {(B.fssai || B.gstin) && <p>{[B.fssai && t("foot.fssai") + " " + B.fssai, B.gstin && t("foot.gstin") + " " + B.gstin].filter(Boolean).join(" · ")}</p>}
        {S.photoCredit && <p>{S.photoCredit}</p>}
        {C.text && <p>{t("foot.credit")} {C.url ? <a href={C.url} target="_blank" rel="noopener">{C.text}</a> : C.text}</p>}
      </div>
    </footer>
  );
}

function CookieBanner() {
  const { t, cookieOpen, setConsent } = useSite();
  const yes = useRef(null);
  useEffect(() => { if (cookieOpen && yes.current && document.activeElement && document.activeElement.classList.contains("linklike")) yes.current.focus(); }, [cookieOpen]);
  return (
    <AnimatePresence>
      {cookieOpen && (
        <m.div className="cookie" role="region" aria-label={t("foot.cookies")} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} transition={{ duration: 0.35, ease }}>
          <p>{t("cookie.text")}</p>
          <div className="cookie-actions">
            <button ref={yes} type="button" className="btn btn-primary btn-sm" onClick={() => setConsent("yes")}>{t("cookie.allow")}</button>
            <button type="button" className="btn btn-line btn-sm" onClick={() => setConsent("no")}>{t("cookie.deny")}</button>
            <a href="cookies.html" className="cookie-more">{t("cookie.more")}</a>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

function Floating({ page }) {
  const { t } = useSite();
  const [show, setShow] = useState(false);
  useEffect(() => {
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setShow(window.scrollY > 700)); };
    window.addEventListener("scroll", on, { passive: true }); on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    const b = document.querySelector(".brand"); if (b) b.focus({ preventScroll: true });
  };
  return (
    <>
      {show && <button type="button" className="to-top" onClick={toTop} aria-label={t("top")}><Icon name="up" /></button>}
      {has.whatsapp && <a className="wa-float" href={waHref(t("wa.order"))} target="_blank" rel="noopener" aria-label={t("float.whatsapp")}><Icon name="chat" /></a>}
      {page === "home" && (
        <nav className="bar" aria-label={t("bar.label")}>
          <a href="#menu"><Icon name="search" /><span>{t("bar.menu")}</span></a>
          <a href={dirHref(MAIN)} target="_blank" rel="noopener"><Icon name="pin" /><span>{t("bar.directions")}</span></a>
          {has.phone && <a href={telHref(S.phone)}><Icon name="phone" /><span>{t("bar.call")}</span></a>}
          {has.whatsapp && <a className="bar-main" href={waHref(t("wa.order"))} target="_blank" rel="noopener"><Icon name="chat" /><span>{t("bar.whatsapp")}</span></a>}
        </nav>
      )}
    </>
  );
}

function Pitch() {
  const { t } = useSite();
  const [show, setShow] = useState(false);
  const [gone, setGone] = useState(false);
  const on = params.get("pitch") === "1";
  useEffect(() => {
    if (!on) return;
    const id = setTimeout(() => setShow(true), 8000);
    const sc = () => { if (window.scrollY > window.innerHeight * 0.8) setShow(true); };
    window.addEventListener("scroll", sc, { passive: true });
    return () => { clearTimeout(id); window.removeEventListener("scroll", sc); };
  }, [on]);
  if (!on) return null;
  return (
    <AnimatePresence>
      {show && !gone && (
        <m.aside className="pitch" aria-label={t("pitch.title")} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }}>
          <button type="button" className="icon-btn pitch-x" onClick={() => setGone(true)} aria-label={t("pitch.close")}><Icon name="close" /></button>
          <p className="pitch-h">{t("pitch.title")}</p>
          <ol><li>{t("pitch.1")}</li><li>{t("pitch.2")}</li><li>{t("pitch.3")}</li></ol>
          {digits(S.pitchWhatsapp).length >= 11 && <a className="btn btn-gold btn-sm btn-block" href={waHref(t("pitch.msg"), S.pitchWhatsapp)} target="_blank" rel="noopener">{t("pitch.cta")}</a>}
        </m.aside>
      )}
    </AnimatePresence>
  );
}

function useSeo(page) {
  useEffect(() => {
    if (S.siteUrl) {
      const path = page === "home" ? "" : page === "404" ? "404.html" : page + ".html";
      const href = S.siteUrl.replace(/\/?$/, "/") + path;
      const l = document.createElement("link"); l.rel = "canonical"; l.href = href; document.head.appendChild(l);
      const o = document.createElement("meta"); o.setAttribute("property", "og:url"); o.content = href; document.head.appendChild(o);
    }
    if (page !== "home") return;
    const base = siteUrl();
    const ld = {
      "@context": "https://schema.org", "@type": "Restaurant", name: S.name, alternateName: S.nameKn,
      servesCuisine: ["South Indian", "Davangere benne dosa"],
      openingHoursSpecification: (S.hours || []).map((h, d) => h ? { "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/" + ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d], opens: h.open, closes: h.close } : null).filter(Boolean)
    };
    if (base) { ld.url = base; ld.hasMenu = base + "#menu"; ld.image = base + "assets/og-image.png"; }
    if (has.phone) ld.telephone = telHref(S.phone).replace("tel:", "");
    if (has.email) ld.email = S.email;
    if (S.costForTwo) ld.priceRange = S.costForTwo;
    if (MAIN) ld.address = { "@type": "PostalAddress", streetAddress: MAIN.street, addressLocality: MAIN.locality, addressRegion: "Karnataka", postalCode: MAIN.postalCode, addressCountry: "IN" };
    const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s);
  }, [page]);
}

export function Layout({ page, children }) {
  const { t } = useSite();
  useSeo(page);
  return (
    <>
      <a className="skip" href="#main">{t("skip")}</a>
      <Banner />
      <Header page={page} />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer page={page} />
      <Floating page={page} />
      <CookieBanner />
      <Pitch />
    </>
  );
}
