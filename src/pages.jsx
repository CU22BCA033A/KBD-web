import { useSite } from "./context.jsx";
import { S, MAIN, pick } from "./lib.js";
import { contactLinks } from "./layout.jsx";
import { Kicker, Ornament, Reveal } from "./ui.jsx";

function Contact() {
  const { t, lang } = useSite();
  return (
    <ul className="contact-list">
      <li>In person: {MAIN ? pick(MAIN.address, lang) : ""}</li>
      {contactLinks(t)}
    </ul>
  );
}
const Biz = () => <strong>{S.name}</strong>;

function Privacy() {
  const B = S.business || {};
  return (
    <>
      <p>This policy explains what information <Biz /> ("we", "us") handles through this website, and the choices you have.</p>
      <h2>The short version</h2>
      <ul>
        <li>This website has no accounts, no online payments, no analytics and no advertising.</li>
        <li>We do not store any form data on this website or on a server.</li>
        <li>If you send us a catering enquiry, it travels as a WhatsApp message that you choose to send.</li>
      </ul>
      <h2>What we collect and why</h2>
      <h3>Catering enquiries</h3>
      <p>The catering form asks for your name, the event date, the number of guests, the town or venue, and optional notes. Your browser turns these into a message and opens WhatsApp. Nothing is sent until you press send in WhatsApp. When you do, we receive the message and your WhatsApp number, and we use them only to reply to you and to arrange your booking.</p>
      <p>We keep enquiry messages only for as long as we need them to handle your enquiry or booking, and for any period required by law, such as tax records of a confirmed booking.</p>
      <h3>Calls and messages</h3>
      <p>If you call or message us, we see your phone number and what you tell us. We use it only to answer you.</p>
      <h3>Settings saved in your browser</h3>
      <p>The website remembers your language, light or dark theme, and your choice about the map. These are saved only in your own browser, are never sent to us, and you can clear them at any time. See the <a href="cookies.html">cookie policy</a>.</p>
      <h2>Other companies</h2>
      <ul>
        <li><strong>WhatsApp (Meta)</strong> carries messages you choose to send us. Its own privacy policy applies.</li>
        <li><strong>Google Maps</strong> provides the map and directions. The map on our page loads only if you allow it, and Google's privacy policy applies when you use it.</li>
        {S.photoCredit && <li><strong>Unsplash</strong> serves some of the photos. Like any website that delivers an image, it receives your browser's IP address. It does not set cookies on this site.</li>}
      </ul>
      <p>Our fonts and code are served from this website itself. We do not use trackers or advertising tools.</p>
      <h2>Children</h2>
      <p>This website is meant for adults arranging visits or events. We do not knowingly collect information from anyone under 18. If you are under 18, please ask a parent or guardian to contact us for you.</p>
      <h2>Your rights, including deletion</h2>
      <p>You can ask us to see, correct or delete the information we hold about you, such as your enquiry messages. To ask, contact us using any of the details below and tell us the phone number you used. We will delete our copies of your messages and confirm to you once it is done, unless the law requires us to keep a record.</p>
      <h2>Contact for privacy questions</h2>
      {B.ownerOrManager && <p>Person responsible: {B.ownerOrManager}</p>}
      <Contact />
      <h2>Changes to this policy</h2>
      <p>If we change this policy, we will update the date at the top of this page.</p>
    </>
  );
}

function Terms() {
  return (
    <>
      <p>These terms apply to your use of this website, run by <Biz />, Davangere, Karnataka. By using the website, you agree to them.</p>
      <h2>About the information on this website</h2>
      <ul>
        <li>The menu, prices, opening hours and photos are for information. They can change without notice. The price shown at the counter, or on your bill, is the one that applies.</li>
        <li>Dishes are subject to availability on the day.</li>
        <li>{S.photoCredit ? "Some photos on this website are illustrative and do not show our own dishes. " : "Photos on this website are of our own food and hotel. "}Servings can look a little different on the day.</li>
      </ul>
      <h2>Catering enquiries</h2>
      <p>Sending a catering enquiry does not book an event. A booking is confirmed only when we agree the date, menu, number of guests and price with you directly, in writing (for example on WhatsApp). The terms for that booking, including any advance and cancellation terms, are the ones we agree with you then. See our <a href="refund.html">refund and cancellation policy</a>.</p>
      <h2>No payments on this website</h2>
      <p>This website does not take payments. Never share card or bank details through the website.</p>
      <h2>Links to other services</h2>
      <p>The website links to Google Maps and WhatsApp. Those services are run by other companies, and their own terms apply.</p>
      <h2>Our content</h2>
      <p>The text, photos and design of this website belong to us or are used with permission. Please do not copy them for commercial use without asking us.</p>
      <h2>Responsibility</h2>
      <p>We take care to keep this website accurate and working, but we cannot promise it will always be error-free or available. To the extent the law allows, we are not responsible for losses caused by relying on the information here. Nothing in these terms limits your rights as a consumer under Indian law.</p>
      <h2>Law and disputes</h2>
      <p>These terms are governed by the laws of India. Any dispute will be handled by the courts at Davangere, Karnataka.</p>
      <h2>Contact</h2>
      <Contact />
    </>
  );
}

function Refund() {
  return (
    <>
      <p>This policy explains how <Biz /> handles problems with orders, cancellations and refunds. This website itself does not take any payments.</p>
      <h2>Eating at the hotel or taking away</h2>
      <ul>
        <li>You pay at the counter for what you order. The price at the counter is the full price.</li>
        <li>If something is wrong with your food, please tell our staff straight away. We will replace the dish or correct the order.</li>
      </ul>
      <h2>Catering bookings</h2>
      <ul>
        <li>Before you pay anything, we send you a written quote, for example on WhatsApp. It lists the menu, the number of guests and all charges, such as travel or taxes.</li>
        <li>If an advance payment is needed, the quote says how much it is and what happens to it if the event is cancelled or changed.</li>
        <li>You only pay once you have read and accepted these terms.</li>
        <li>If we have to cancel a confirmed booking, we refund your advance in full.</li>
      </ul>
      <h2>How to ask for a refund or report a problem</h2>
      <p>Contact us with your name, the date of your visit or event, and what went wrong. We will reply and explain the next steps.</p>
      <Contact />
    </>
  );
}

function Cookies() {
  const { setCookieOpen } = useSite();
  return (
    <>
      <p>This page explains how this website uses cookies and similar browser storage.</p>
      <h2>Cookies from this website</h2>
      <p>This website does not set any cookies of its own. It has no analytics, tracking or advertising.</p>
      <h2>Settings saved in your browser</h2>
      <p>To remember your choices, the website saves a few small settings in your browser's local storage. They stay on your device and are never sent to us.</p>
      <div className="table-wrap">
        <table>
          <thead><tr><th scope="col">Name</th><th scope="col">What it remembers</th><th scope="col">How long</th></tr></thead>
          <tbody>
            <tr><td><code>sgk-lang</code></td><td>Your language, English or Kannada</td><td>Until you clear it</td></tr>
            <tr><td><code>sgk-theme</code></td><td>Light or dark theme</td><td>Until you clear it</td></tr>
            <tr><td><code>sgk-consent</code></td><td>Whether you allowed the Google map</td><td>Until you clear it</td></tr>
          </tbody>
        </table>
      </div>
      <h2>Google Maps</h2>
      <p>The map in the Visit section is provided by Google. Google may set cookies when the map loads, so it loads only after you allow it, either in the cookie notice or with the "Load map" button. If you do not allow it, you can still use the "Open in Google Maps" link.</p>
      <h2>Change your choice</h2>
      <p><button type="button" className="btn btn-line btn-sm" onClick={() => setCookieOpen(true)}>Open cookie settings</button></p>
      <p>You can also clear this website's data in your browser settings at any time.</p>
      <h2>Contact</h2>
      <Contact />
    </>
  );
}

const DOCS = {
  privacy: ["Privacy policy", Privacy],
  terms: ["Terms and conditions", Terms],
  refund: ["Refund and cancellation policy", Refund],
  cookies: ["Cookie policy", Cookies]
};

export function Legal({ kind }) {
  const [title, Body] = DOCS[kind] || DOCS.privacy;
  const raw = S.policiesLastUpdated || "2026-10-24";
  const d = new Date(raw + "T00:00:00");
  const when = isNaN(d) ? raw : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return (
    <article className="legal">
      <div className="wrap legal-in">
        <Kicker><a href="index.html" className="crumb">{S.shortName || S.name}</a></Kicker>
        <h1 className="h2">{title}</h1>
        <p className="updated">Last updated: <time dateTime={raw}>{when}</time></p>
        <Ornament className="left" />
        <div className="prose"><Body /></div>
      </div>
    </article>
  );
}

export function NotFound() {
  return (
    <section className="nf">
      <Reveal className="wrap nf-in">
        <p className="nf-code" aria-hidden="true">404</p>
        <h1 className="h2">This page is not on the menu.</h1>
        <Ornament />
        <p className="lead">The link may be old or mistyped. Here is where you can go instead.</p>
        <div className="cta-row">
          <a className="btn btn-primary btn-lg" href="index.html">Go to the home page</a>
          <a className="btn btn-line btn-lg" href="index.html#menu">See the menu</a>
        </div>
      </Reveal>
    </section>
  );
}
