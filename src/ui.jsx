import { useState } from "react";
import { m } from "framer-motion";
import { photoSrc } from "./lib.js";

/* ---------- icons (simple line icons, drawn for this site) ---------- */
const P = {
  phone: <path d="M5 3.5h3l1.6 4.2-2 1.3a11 11 0 0 0 7.4 7.4l1.3-2 4.2 1.6v3A2 2 0 0 1 18.4 21 15.5 15.5 0 0 1 3 5.6 2 2 0 0 1 5 3.5Z" />,
  chat: <><path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.6" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" /><path d="m4 7 8 6 8-6" /></>,
  copy: <><rect x="8.5" y="8.5" width="11" height="11" /><path d="M15.5 8.5V4.5h-11v11h4" /></>,
  done: <path d="M5 12.5 9.5 17 19 7.5" />,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.2v.3" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5 5" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" /></>,
  moon: <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  up: <path d="M12 19V5M6 11l6-6 6 6" />,
  ext: <path d="M14 4.5h5.5V10M19.5 4.5 11 13M17 13.5V20H4V7h6.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  insta: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.2 6.8v.1" /></>,
  fb: <path d="M14 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8.4v3H11V21" />
};
export function Icon({ name, className = "" }) {
  return (
    <svg className={"ico " + className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {P[name]}
    </svg>
  );
}
/* Indian vegetarian symbol */
export const VegMark = () => (
  <svg className="veg-mark" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><rect x="1" y="1" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="8" cy="8" r="3.6" fill="currentColor" /></svg>
);

/* Brand mark: banana leaf in a ring, drawn for this site (replace with the owner's logo via config.js) */
export const Mark = ({ className = "brand-mark" }) => (
  <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <circle cx="24" cy="24" r="23" fill="#1E6B34" />
    <circle cx="24" cy="24" r="19.5" fill="none" stroke="#F2B23A" strokeWidth="1.6" />
    <path d="M13 34.5C13.6 22 21 14.2 35.5 13.2 35 26.5 27.6 34.6 15.8 35.2 14.2 35.3 13 35.2 13 34.5Z" fill="#F6F0DC" />
    <path d="M14 34 33.5 14.8" stroke="#3C9A4E" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M19.5 28.5 17.5 22M23.5 24.5 22.5 17.5M27.5 20.5l7 1M23.5 24.5l8.5 2" stroke="#3C9A4E" strokeWidth="1.1" strokeLinecap="round" opacity=".8" />
  </svg>
);

/* Leaf ornament between hairlines (used as a section divider) */
export const Ornament = ({ className = "" }) => (
  <div className={"ornament " + className} aria-hidden="true">
    <span />
    <svg viewBox="0 0 40 16"><path d="M4 12C8 5 15 2 24 2c-1.5 6-7 10-16 11-2 .2-3.5 0-4-1Z" fill="currentColor" /><path d="M5 12 23 3" stroke="var(--bg)" strokeWidth="1" /><circle cx="33" cy="8" r="2" fill="currentColor" /></svg>
    <span />
  </div>
);

/* ---------- motion helpers ---------- */
export const ease = [0.22, 1, 0.36, 1];
export function Reveal({ as = "div", delay = 0, children, className, ...rest }) {
  const C = m[as];
  return (
    <C className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 0.6, ease, delay }} {...rest}>
      {children}
    </C>
  );
}

/* ---------- photo with skeleton loader; renders nothing when no photo is set ---------- */
export function Photo({ file, alt, className = "", eager = false, onFail }) {
  const [state, setState] = useState("loading");
  if (!file || state === "failed") return null;
  return (
    <figure className={"photo " + className + (state === "loaded" ? " is-loaded" : "")}>
      {state === "loading" && <span className="skeleton" aria-hidden="true" />}
      <img
        src={photoSrc(file)} alt={alt || ""} decoding="async"
        loading={eager ? "eager" : "lazy"} fetchpriority={eager ? "high" : undefined}
        onLoad={() => setState("loaded")}
        onError={() => { setState("failed"); onFail && onFail(); }}
      />
    </figure>
  );
}

export function Kicker({ children, className = "" }) { return <p className={"kicker " + className}>{children}</p>; }
