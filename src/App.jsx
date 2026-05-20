import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/*import {
  Globe, FileText, QrCode, Palette, Monitor, FileBadge,
  Zap, Smartphone, Award, MessageCircle, MapPin, Mail, Phone,
  ChevronDown, ChevronRight, ArrowRight, Check, Star,
  Menu, X, Clock, Users, Target, Layers, Shield, Headphones,
  Send, ExternalLink, Building2, Briefcase, ShoppingBag,
  UtensilsCrossed, Cpu, TrendingUp
} from "lucide-react";*/

import Globe from "lucide-react/dist/esm/icons/globe.js";
import FileText from "lucide-react/dist/esm/icons/file-text.js";
import QrCode from "lucide-react/dist/esm/icons/qr-code.js";
import Palette from "lucide-react/dist/esm/icons/palette.js";
import Monitor from "lucide-react/dist/esm/icons/monitor.js";
import FileBadge from "lucide-react/dist/esm/icons/file-badge.js"; 
import Zap from "lucide-react/dist/esm/icons/zap.js";
import Smartphone from "lucide-react/dist/esm/icons/smartphone.js";
import Award from "lucide-react/dist/esm/icons/award.js";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle.js";
import MapPin from "lucide-react/dist/esm/icons/map-pin.js";
import Mail from "lucide-react/dist/esm/icons/mail.js";
import Phone from "lucide-react/dist/esm/icons/phone.js";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down.js";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right.js";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import Check from "lucide-react/dist/esm/icons/check.js";
import Star from "lucide-react/dist/esm/icons/star.js";
import Menu from "lucide-react/dist/esm/icons/menu.js";
import X from "lucide-react/dist/esm/icons/x.js";
import Clock from "lucide-react/dist/esm/icons/clock.js";
import Users from "lucide-react/dist/esm/icons/users.js";
import Target from "lucide-react/dist/esm/icons/target.js";
import Layers from "lucide-react/dist/esm/icons/layers.js";
import Shield from "lucide-react/dist/esm/icons/shield.js";
import Headphones from "lucide-react/dist/esm/icons/headphones.js";
import Send from "lucide-react/dist/esm/icons/send.js";
import ExternalLink from "lucide-react/dist/esm/icons/external-link.js";
import Building2 from "lucide-react/dist/esm/icons/building-2.js";
import Briefcase from "lucide-react/dist/esm/icons/briefcase.js";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag.js";
import UtensilsCrossed from "lucide-react/dist/esm/icons/utensils-crossed.js";
import Cpu from "lucide-react/dist/esm/icons/cpu.js";
import TrendingUp from "lucide-react/dist/esm/icons/trending-up.js";

/* ─── BRAND TOKENS ─────────────────────────────────────── */
const B = {
  blue:   "#2D8CF0",
  blueL:  "#5BAEF5",
  purple: "#7B3FE4",
  purpleM:"#9B59F5",
  pink:   "#E040A0",
  pinkL:  "#F060C0",
  black:  "#07070F",
  surface:"#0C0C1C",
  card:   "#111128",
  card2:  "#161630",
  border: "rgba(123,63,228,0.18)",
  borderH:"rgba(123,63,228,0.5)",
  white:  "#F0F0FF",
  muted:  "rgba(240,240,255,0.52)",
  muted2: "rgba(240,240,255,0.28)",
  accent: "#B080FF",
};
const GRAD       = `linear-gradient(135deg,${B.blue},${B.purple},${B.pink})`;
const GRAD_SOFT  = `linear-gradient(135deg,rgba(45,140,240,.13),rgba(123,63,228,.13),rgba(224,64,160,.1))`;
const GRAD_GLOW  = `radial-gradient(ellipse 60% 50% at 50% 0%,rgba(123,63,228,.09),transparent)`;

/* ─── GLOBAL CSS ─────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    *{margin:0;padding:0;box-sizing:border-box;}
    html{scroll-behavior:smooth;}
    body{background:${B.black};color:${B.white};font-family:'Plus Jakarta Sans',sans-serif;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:${B.black};}
    ::-webkit-scrollbar-thumb{background:${B.purple};border-radius:2px;}
    ::selection{background:rgba(123,63,228,.35);color:#fff;}
    input,select,textarea{background:${B.card};border:1px solid ${B.border};border-radius:8px;padding:.7rem 1rem;color:${B.white};font-family:'Plus Jakarta Sans',sans-serif;font-size:.875rem;outline:none;transition:border-color .2s;width:100%;}
    input:focus,select:focus,textarea:focus{border-color:${B.purple};}
    select option{background:${B.card};}
    textarea{resize:vertical;min-height:90px;}
  `}</style>
);

/* ─── HELPERS ─────────────────────────────────────────────── */
const GradText = ({ children, style = {} }) => (
  <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", ...style }}>
    {children}
  </span>
);

const FadeUp = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} style={style}>
      {children}
    </motion.div>
  );
};

const BtnPrimary = ({ children, onClick, style = {}, small }) => (
  <motion.button whileHover={{ scale: 1.03, boxShadow: "0 12px 36px rgba(123,63,228,.4)" }} whileTap={{ scale: .97 }}
    onClick={onClick}
    style={{ display: "inline-flex", alignItems: "center", gap: ".45rem", background: GRAD, color: "#fff", border: "none", borderRadius: 10, padding: small ? ".55rem 1.2rem" : ".78rem 1.8rem", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: small ? ".82rem" : ".9rem", cursor: "pointer", letterSpacing: ".02em", ...style }}>
    {children}
  </motion.button>
);

const BtnSecondary = ({ children, onClick, style = {}, href }) => {
  const props = { onClick, style: { display: "inline-flex", alignItems: "center", gap: ".45rem", background: "transparent", color: B.accent, border: `1px solid rgba(123,63,228,.4)`, borderRadius: 10, padding: ".78rem 1.8rem", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: ".9rem", cursor: "pointer", letterSpacing: ".02em", textDecoration: "none", ...style } };
  return href
    ? <motion.a href={href} target="_blank" whileHover={{ scale: 1.03, borderColor: B.purple }} whileTap={{ scale: .97 }} {...props}>{children}</motion.a>
    : <motion.button whileHover={{ scale: 1.03, borderColor: B.purple }} whileTap={{ scale: .97 }} {...props}>{children}</motion.button>;
};

const SectionLabel = ({ children }) => (
  <div style={{ display: "inline-block", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: ".7rem" }}>
    {children}
  </div>
);

const SectionHeading = ({ children, center }) => (
  <h2 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "clamp(1.8rem,3vw,2.7rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1rem", textAlign: center ? "center" : "left" }}>
    {children}
  </h2>
);

const Divider = () => (
  <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(123,63,228,.22),transparent)", margin: "0 5%" }} />
);

const Card = ({ children, style = {}, hover = true }) => (
  <motion.div whileHover={hover ? { y: -5, borderColor: B.borderH, boxShadow: "0 20px 50px rgba(0,0,0,.45)" } : {}}
    style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 16, padding: "1.8rem 2rem", position: "relative", overflow: "hidden", ...style }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: GRAD, opacity: 0 }} className="card-topbar" />
    {children}
  </motion.div>
);

const Tag = ({ children }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: ".35rem", background: "rgba(123,63,228,.12)", border: `1px solid rgba(123,63,228,.22)`, borderRadius: 6, padding: ".28rem .75rem", fontSize: ".75rem", fontWeight: 700, color: B.accent }}>
    {children}
  </span>
);

/* ─── DATA ─────────────────────────────────────────────────── */
const SERVICES = [
  { icon: <Globe size={22} />, title: "Business Landing Pages", desc: "Professional one-page websites designed to present your business and convert visitors into leads.", time: "3–5 Days", includes: ["Mobile responsive design", "Contact integration", "WhatsApp button", "Service showcase", "Basic SEO setup"] },
  { icon: <FileText size={22} />, title: "Digital Company Profiles", desc: "Interactive digital profiles designed for online sharing and client presentations.", time: "2–4 Days", includes: ["Modern layout design", "Clickable sections", "Branded visuals", "Shareable format"] },
  { icon: <FileBadge size={22} />, title: "Basic Company Profile PDFs", desc: "Professional PDF company profiles for proposals, presentations, and business introductions.", time: "2–3 Days", includes: ["Clean branded layout", "Business overview", "Services section", "Contact details"] },
  { icon: <QrCode size={22} />, title: "Business QR Codes", desc: "Custom QR code solutions linked to your website, menu, social media, or contact information.", time: "1–2 Days", includes: ["QR code generation", "Branded styling", "Digital delivery"] },
  { icon: <Palette size={22} />, title: "QR Code + Branding Pack", desc: "Complete branded QR solutions for marketing and customer engagement.", time: "3–5 Days", includes: ["Custom QR design", "Social media graphics", "Brand-matching visuals", "Marketing-ready assets"] },
  { icon: <Monitor size={22} />, title: "Full Website Development", desc: "Modern multi-page websites designed for credibility, user experience, and business growth.", time: "7–14 Days", includes: ["Custom design", "Mobile optimization", "Contact forms", "SEO-friendly structure", "Multiple pages", "Modern UI/UX"] },
];

const WHY = [
  { n: "01", icon: <Award size={20} />, title: "Professional Design Standards", desc: "Every project is designed with clarity, structure, and modern visual appeal." },
  { n: "02", icon: <Zap size={20} />, title: "Fast Communication", desc: "Clear communication and efficient turnaround throughout the entire process." },
  { n: "03", icon: <Users size={20} />, title: "Built For Small Businesses", desc: "Solutions tailored for startups, entrepreneurs, and growing brands." },
  { n: "04", icon: <Target size={20} />, title: "Conversion Focused", desc: "Digital experiences designed to help businesses attract and convert customers." },
  { n: "05", icon: <Smartphone size={20} />, title: "Mobile Optimized", desc: "All websites are responsive and designed to work seamlessly across all devices." },
  { n: "06", icon: <Headphones size={20} />, title: "Long-Term Support", desc: "Optional support available after launch for updates and maintenance." },
];

const PROCESS = [
  { n: "01", title: "Inquiry", desc: "You contact us with your project requirements via WhatsApp, email, or the contact form." },
  { n: "02", title: "Discovery Call", desc: "We discuss your goals, business needs, and project scope to understand exactly what you need." },
  { n: "03", title: "Proposal & Quote", desc: "A clear project proposal and quotation are prepared and sent for your review and approval." },
  { n: "04", title: "50% Deposit", desc: "Work officially begins once the initial deposit is received and confirmed." },
  { n: "05", title: "Design & Development", desc: "Your project is designed and developed according to the approved scope and brief." },
  { n: "06", title: "Review & Revisions", desc: "You review the work and request any necessary revisions until you are fully satisfied." },
  { n: "07", title: "Final Payment", desc: "Final payment is completed before project delivery to finalize the engagement." },
  { n: "08", title: "Delivery & Launch", desc: "Files, websites, or digital assets are delivered and launched for your business." },
  { n: "09", title: "Optional Monthly Support", desc: "Ongoing support and maintenance services are available if needed after launch." },
];

const PORTFOLIO = [
  { icon: <Building2 size={32} />, cat: "Business Website", title: "Modern Construction Landing Page", desc: "Professional one-page website designed for a construction company to generate more client inquiries.", color: "#2D8CF0" },
  { icon: <Briefcase size={32} />, cat: "Company Profile", title: "Corporate Company Profile", desc: "Clean PDF company profile created for business presentations and investor communication.", color: "#7B3FE4" },
  { icon: <QrCode size={32} />, cat: "QR Branding", title: "Branded QR Campaign", desc: "Custom QR code branding package designed for customer engagement and marketing visibility.", color: "#E040A0" },
  { icon: <UtensilsCrossed size={32} />, cat: "Landing Page", title: "Restaurant Digital Presence", desc: "Mobile-first landing page with menu integration and WhatsApp reservation flow.", color: "#2D8CF0" },
  { icon: <Cpu size={32} />, cat: "Digital Profile", title: "Consulting Firm Digital Profile", desc: "Interactive digital profile for a professional services firm to share with potential clients.", color: "#7B3FE4" },
  { icon: <ShoppingBag size={32} />, cat: "Full Website", title: "Retail Business Website", desc: "Multi-page website with product showcase, contact forms, and SEO-optimised structure.", color: "#E040A0" },
];

const FAQS = [
  { q: "How long do projects take?", a: "Turnaround times depend on the service selected and client responsiveness during revisions. Landing pages take 3–5 days; full websites take 7–14 days." },
  { q: "Do you work with clients outside Phalaborwa?", a: "Yes. GG LegacyX works with businesses across South Africa remotely. All communication, file sharing, and delivery is handled online." },
  { q: "Do you require a deposit?", a: "Yes. A 50% deposit is required before work begins. The remaining 50% is due upon completion before final delivery." },
  { q: "What do I need to provide to get started?", a: "Your logo (if available), brand colours, a brief description of your business, and any content you want included. We guide you through the rest." },
  { q: "Do you offer support after launch?", a: "Yes. Optional monthly support is available for websites and digital maintenance after project delivery." },
];

const VALUES = [
  { icon: "🏆", title: "Professionalism", desc: "We maintain high standards in communication, design, and delivery." },
  { icon: "🤝", title: "Reliability", desc: "We focus on meeting deadlines and maintaining transparent communication." },
  { icon: "✨", title: "Simplicity", desc: "We create solutions that are easy to use, clean, and effective." },
  { icon: "📈", title: "Growth", desc: "We help businesses position themselves for long-term success." },
];

const PROCESS_MINI = [
  { e: "📩", t: "Inquiry" }, { e: "📞", t: "Discovery Call" }, { e: "📋", t: "Proposal" },
  { e: "💰", t: "Deposit" }, { e: "🎨", t: "Design & Dev" }, { e: "✅", t: "Revisions" },
  { e: "🚀", t: "Launch" }, { e: "🛠️", t: "Support" },
];

const PAGES = ["home", "about", "services", "process", "portfolio", "contact"];

/* ─── NAV ─────────────────────────────────────────────────── */
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const go = (p) => { setPage(p); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <>
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: .6, ease: [.22,1,.36,1] }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5%", background: scrolled ? "rgba(7,7,15,.97)" : "rgba(7,7,15,.75)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${scrolled ? B.border : "transparent"}`, transition: "all .3s" }}>
        <div onClick={() => go("home")} style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: "1.3rem", letterSpacing: ".06em", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", cursor: "pointer" }}>
          GG LEGACYX
        </div>
        {/* Desktop */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          {["home","about","services","process","portfolio"].map(p => (
            <button key={p} onClick={() => go(p)} style={{ background: "none", border: "none", cursor: "pointer", color: page === p ? B.accent : B.muted, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: ".875rem", textTransform: "capitalize", transition: "color .2s", letterSpacing: ".01em" }}>
              {p}
            </button>
          ))}
          <BtnPrimary onClick={() => go("contact")} small>Get a Quote <ArrowRight size={14} /></BtnPrimary>
        </div>
        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", color: B.white, cursor: "pointer" }} className="hamburger">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>
      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 999, background: "rgba(7,7,15,.98)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${B.border}`, padding: "1.5rem 5%", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {PAGES.map(p => (
              <button key={p} onClick={() => go(p)} style={{ background: "none", border: "none", cursor: "pointer", color: page === p ? B.accent : B.muted, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: "1rem", textTransform: "capitalize", textAlign: "left" }}>
                {p}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media(max-width:768px){.desktop-nav{display:none!important}.hamburger{display:block!important}}`}</style>
    </>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function Footer({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <footer style={{ background: B.surface, borderTop: `1px solid ${B.border}`, padding: "55px 5% 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }} className="footer-grid">
        <div>
          <div style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: "1.2rem", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: ".8rem" }}>GG LEGACYX</div>
          <p style={{ fontSize: ".84rem", color: B.muted2, lineHeight: 1.75, maxWidth: 280 }}>Modern Digital Solutions For Growing Businesses. Serving clients across South Africa.</p>
          <div style={{ display: "flex", gap: ".8rem", marginTop: "1.2rem" }}>
            <a href="https://wa.me/27719774828" target="_blank" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, background: "rgba(37,211,102,.12)", border: "1px solid rgba(37,211,102,.25)", borderRadius: 8, color: "#25D366", textDecoration: "none" }}><MessageCircle size={16} /></a>
            <a href="mailto:info@gglegacyx.co.za" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, background: "rgba(123,63,228,.12)", border: `1px solid ${B.border}`, borderRadius: 8, color: B.accent, textDecoration: "none" }}><Mail size={16} /></a>
          </div>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: ".85rem", fontWeight: 600, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "1rem", letterSpacing: ".04em" }}>Quick Links</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: ".55rem" }}>
            {PAGES.map(p => <button key={p} onClick={() => go(p)} style={{ background: "none", border: "none", cursor: "pointer", color: B.muted2, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".82rem", textAlign: "left", textTransform: "capitalize", transition: "color .2s", padding: 0 }}>{p}</button>)}
          </div>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: ".85rem", fontWeight: 600, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "1rem", letterSpacing: ".04em" }}>Contact</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: ".7rem" }}>
            {[{ icon: <Phone size={14} />, t: "071 977 4828" }, { icon: <Mail size={14} />, t: "info@gglegacyx.co.za" }, { icon: <MapPin size={14} />, t: "South Africa (Remote)" }].map(({ icon, t }) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: ".5rem", fontSize: ".82rem", color: B.muted2 }}><span style={{ color: B.accent }}>{icon}</span>{t}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${B.border}`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontSize: ".78rem", color: B.muted2 }}>© 2026 GG LegacyX. All Rights Reserved.</p>
        <p style={{ fontSize: ".78rem", color: B.muted2 }}>Built on Legacy. Designed for Impact.</p>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}

/* ─── HOME PAGE ──────────────────────────────────────────── */
function Home({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "110px 5% 70px", position: "relative", overflow: "hidden" }}>
        {/* Orbs */}
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "rgba(45,140,240,.08)", filter: "blur(90px)", top: -120, right: -100, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 450, height: 450, borderRadius: "50%", background: "rgba(224,64,160,.07)", filter: "blur(80px)", bottom: -100, left: -80, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(123,63,228,.09)", filter: "blur(70px)", top: "35%", left: "42%", pointerEvents: "none" }} />
        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(123,63,228,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(123,63,228,.045) 1px,transparent 1px)`, backgroundSize: "55px 55px", maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%,black,transparent)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 700 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}
            style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", background: "rgba(123,63,228,.1)", border: `1px solid rgba(123,63,228,.32)`, borderRadius: 100, padding: ".45rem 1.1rem", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".06em", color: B.accent, marginBottom: "2rem" }}>
            <motion.span animate={{ scale: [1, 1.3, 1], opacity: [1, .4, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: "50%", background: GRAD, display: "inline-block" }} />
            South Africa's Premium Digital Partner
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .1 }}
            style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "clamp(2.6rem,5.5vw,4.2rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Digital Solutions Built For <GradText> Modern Businesses</GradText>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .2 }}
            style={{ fontSize: "1.05rem", lineHeight: 1.78, color: B.muted, marginBottom: "2.2rem", maxWidth: 560 }}>
            GG LegacyX helps businesses establish a professional online presence through modern websites, digital branding, QR solutions, and company profile design.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .3 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <BtnPrimary onClick={() => go("contact")}>Get a Quote <ArrowRight size={16} /></BtnPrimary>
            <BtnSecondary href="https://wa.me/27719774828"><MessageCircle size={16} /> WhatsApp Us</BtnSecondary>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}
            style={{ marginTop: "2.5rem", fontSize: ".8rem", color: B.muted2 }}>
            Serving businesses across South Africa with reliable, clean, and conversion-focused digital solutions.
          </motion.p>
        </div>

        {/* Floating cards */}
        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, delay: .4 }}
          style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "1rem", pointerEvents: "none" }} className="hero-cards">
          {[{ icon: "🌐", t: "Landing Page", sub: "3–5 Days" }, { icon: "📲", t: "QR Branding", sub: "1–2 Days" }, { icon: "💻", t: "Full Website", sub: "7–14 Days" }].map((c, i) => (
            <motion.div key={c.t} animate={{ y: [0, -8, 0] }} transition={{ duration: 3, delay: i * .7, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 12, padding: ".9rem 1.2rem", display: "flex", alignItems: "center", gap: ".8rem", backdropFilter: "blur(10px)", minWidth: 180 }}>
              <span style={{ fontSize: "1.4rem" }}>{c.icon}</span>
              <div><div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: ".88rem", fontWeight: 600 }}>{c.t}</div><div style={{ fontSize: ".73rem", color: B.accent }}>{c.sub}</div></div>
            </motion.div>
          ))}
        </motion.div>
        <style>{`@media(max-width:900px){.hero-cards{display:none!important}}`}</style>
      </section>

      {/* TRUST BAR */}
      <div style={{ background: B.surface, borderTop: `1px solid ${B.border}`, borderBottom: `1px solid ${B.border}`, padding: "1.2rem 5%", display: "flex", alignItems: "center", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap" }}>
        {[{ i: <Zap size={15} />, t: "Fast Delivery" }, { i: <Smartphone size={15} />, t: "Mobile Friendly" }, { i: <Award size={15} />, t: "Professional Design" }, { i: <MapPin size={15} />, t: "South Africa Based" }, { i: <MessageCircle size={15} />, t: "Direct Communication" }].map(({ i, t }) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: ".55rem", fontSize: ".82rem", fontWeight: 600, color: B.muted }}>
            <div style={{ width: 30, height: 30, background: "rgba(123,63,228,.12)", border: `1px solid ${B.border}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: B.accent }}>{i}</div>
            {t}
          </div>
        ))}
      </div>

      {/* SERVICES PREVIEW */}
      <section style={{ padding: "80px 5%" }}>
        <FadeUp>
          <div style={{ maxWidth: 600, marginBottom: "3rem" }}>
            <SectionLabel>What We Do</SectionLabel>
            <SectionHeading>Our Digital Services</SectionHeading>
            <p style={{ color: B.muted, lineHeight: 1.75, fontSize: ".95rem" }}>We create digital assets that help businesses look professional, build credibility, and attract more customers online.</p>
          </div>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.3rem" }}>
          {SERVICES.map((s, i) => (
            <FadeUp key={s.title} delay={i * .07}>
              <Card style={{ height: "100%" }}>
                <div style={{ width: 46, height: 46, background: "rgba(123,63,228,.12)", border: `1px solid rgba(123,63,228,.22)`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: B.accent, marginBottom: "1.1rem" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "1rem", fontWeight: 600, marginBottom: ".55rem" }}>{s.title}</h3>
                <p style={{ fontSize: ".855rem", color: B.muted, lineHeight: 1.65, marginBottom: "1rem" }}>{s.desc}</p>
                <Tag><Clock size={12} /> {s.time}</Tag>
              </Card>
            </FadeUp>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <BtnPrimary onClick={() => go("contact")}>Start Your Project <ArrowRight size={16} /></BtnPrimary>
        </div>
      </section>

      <Divider />

      {/* WHY CHOOSE US */}
      <section style={{ padding: "80px 5%" }}>
        <FadeUp>
          <div style={{ maxWidth: 600, marginBottom: "3rem" }}>
            <SectionLabel>Why Us</SectionLabel>
            <SectionHeading>Why Businesses Choose GG LegacyX</SectionHeading>
          </div>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(255px,1fr))", gap: "1.2rem" }}>
          {WHY.map((w, i) => (
            <FadeUp key={w.n} delay={i * .07}>
              <Card>
                <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "2.2rem", fontWeight: 700, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", opacity: .22, lineHeight: 1, marginBottom: ".8rem" }}>{w.n}</div>
                <div style={{ color: B.accent, marginBottom: ".6rem" }}>{w.icon}</div>
                <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: ".95rem", fontWeight: 600, marginBottom: ".45rem" }}>{w.title}</h3>
                <p style={{ fontSize: ".845rem", color: B.muted, lineHeight: 1.65 }}>{w.desc}</p>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>

      <Divider />

      {/* BRAND STORY */}
      <section style={{ background: B.surface, borderTop: `1px solid ${B.border}`, borderBottom: `1px solid ${B.border}`, padding: "80px 5%" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeUp>
            <SectionLabel>Our Story</SectionLabel>
            <SectionHeading center>Building Digital Legacies</SectionHeading>
            <p style={{ color: B.muted, lineHeight: 1.82, marginBottom: "1rem", fontSize: ".95rem" }}>GG LegacyX was created to help businesses establish a stronger and more professional digital presence in a fast-changing online world.</p>
            <p style={{ color: B.muted, lineHeight: 1.82, marginBottom: "1rem", fontSize: ".95rem" }}>Many small businesses struggle to present themselves professionally online. Our goal is to simplify that process through clean design, strategic digital solutions, and reliable service delivery.</p>
            <p style={{ color: B.muted, lineHeight: 1.82, fontSize: ".95rem", marginBottom: "2rem" }}>We believe every business deserves a digital presence that reflects its value, professionalism, and long-term vision.</p>
            <BtnSecondary onClick={() => go("about")}>Learn More About Us <ArrowRight size={15} /></BtnSecondary>
          </FadeUp>
        </div>
      </section>

      {/* PROCESS MINI */}
      <section style={{ padding: "80px 5%" }}>
        <FadeUp>
          <div style={{ maxWidth: 600, marginBottom: "2.5rem" }}>
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>Our Simple Process</SectionHeading>
          </div>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(138px,1fr))", gap: "1rem" }}>
          {PROCESS_MINI.map((p, i) => (
            <FadeUp key={p.t} delay={i * .06}>
              <motion.div whileHover={{ y: -3, borderColor: B.borderH }}
                style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 12, padding: "1rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: ".4rem" }}>{p.e}</div>
                <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: ".78rem", fontWeight: 600 }}>{p.t}</div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
        <div style={{ marginTop: "2rem" }}><BtnSecondary onClick={() => go("process")}>View Full Process <ArrowRight size={15} /></BtnSecondary></div>
      </section>

      <Divider />

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 5%" }}>
        <FadeUp>
          <div style={{ maxWidth: 600, marginBottom: "3rem" }}>
            <SectionLabel>Testimonials</SectionLabel>
            <SectionHeading>Built To Earn Trust</SectionHeading>
          </div>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.2rem" }}>
          {[
            { q: "Professional service, clean designs, and excellent communication throughout the project.", a: "Business Client, South Africa" },
            { q: "GG LegacyX helped our business finally look credible online.", a: "Entrepreneur, Limpopo" },
            { q: "Fast turnaround and very professional results. Highly recommend.", a: "Small Business Owner, SA" },
          ].map((t, i) => (
            <FadeUp key={i} delay={i * .08}>
              <Card>
                <div style={{ display: "flex", gap: "2px", marginBottom: "1rem" }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill={B.purple} color={B.purple} />)}
                </div>
                <blockquote style={{ fontSize: ".88rem", color: "rgba(240,240,255,.76)", lineHeight: 1.72, fontStyle: "italic", marginBottom: "1.2rem" }}>"{t.q}"</blockquote>
                <p style={{ fontSize: ".78rem", fontWeight: 700, color: B.muted2 }}>— {t.a}</p>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <FadeUp style={{ margin: "0 5% 80px" }}>
        <div style={{ background: B.card, border: `1px solid rgba(123,63,228,.22)`, borderRadius: 20, padding: "4rem 2.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: GRAD }} />
          <div style={{ position: "absolute", inset: 0, background: GRAD_GLOW, pointerEvents: "none" }} />
          <h2 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "clamp(1.6rem,3vw,2.3rem)", fontWeight: 700, marginBottom: ".8rem", position: "relative" }}>Let's Build Your Business Presence</h2>
          <p style={{ color: B.muted, marginBottom: "2.2rem", fontSize: ".95rem", position: "relative" }}>Whether you need a landing page, a company profile, or a full business website, GG LegacyX is ready to help your business grow online.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
            <BtnPrimary onClick={() => go("contact")}>Get a Quote <ArrowRight size={16} /></BtnPrimary>
            <BtnSecondary onClick={() => go("contact")}>Contact Us</BtnSecondary>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

/* ─── ABOUT PAGE ─────────────────────────────────────────── */
function About({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <div>
      <PageHero label="About Us" title={<>About <GradText>GG LegacyX</GradText></>} sub="Modern digital solutions designed to help businesses establish credibility and grow online." />
      <section style={{ padding: "80px 5%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }} className="two-col">
          <FadeUp>
            <SectionLabel>Who We Are</SectionLabel>
            <SectionHeading>A South African Digital Solutions Company</SectionHeading>
            <p style={{ color: B.muted, lineHeight: 1.8, fontSize: ".94rem" }}>GG LegacyX is focused on helping businesses create a professional online presence. We work with startups, small businesses, and growing brands that need clean, modern, and reliable digital assets to present themselves confidently in the market.</p>
            <p style={{ color: B.muted, lineHeight: 1.8, fontSize: ".94rem", marginTop: "1rem" }}>From websites and company profiles to QR branding solutions, our goal is to deliver practical digital tools that support business growth.</p>
          </FadeUp>
          <FadeUp delay={.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[{ n: "100+", t: "Projects Delivered" }, { n: "50+", t: "Happy Clients" }, { n: "3+", t: "Years Experience" }, { n: "9", t: "SA Provinces Served" }].map(s => (
                <div key={s.t} style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 12, padding: "1.4rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "1.8rem", fontWeight: 700, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: ".3rem" }}>{s.n}</div>
                  <div style={{ fontSize: ".78rem", color: B.muted, fontWeight: 600 }}>{s.t}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.4rem", marginTop: "3rem" }} className="two-col">
          {[{ lbl: "Our Mission", h: "Empowering Businesses Online", p: "To provide businesses with affordable, professional, and modern digital solutions that improve visibility, credibility, and customer engagement." }, { lbl: "Our Vision", h: "Trusted Digital Partner", p: "To become a trusted digital partner for businesses across South Africa by delivering quality work, consistent service, and impactful online experiences." }].map(m => (
            <FadeUp key={m.lbl}>
              <div style={{ background: B.card, border: `1px solid rgba(123,63,228,.2)`, borderRadius: 16, padding: "2.5rem", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: GRAD }} />
                <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: ".8rem" }}>{m.lbl}</div>
                <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem" }}>{m.h}</h3>
                <p style={{ fontSize: ".88rem", color: B.muted, lineHeight: 1.75 }}>{m.p}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
      <Divider />
      <section style={{ padding: "80px 5%" }}>
        <FadeUp><SectionLabel>Our Values</SectionLabel><SectionHeading>What We Stand For</SectionHeading></FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: "1.2rem", marginTop: "2rem" }}>
          {VALUES.map((v, i) => (
            <FadeUp key={v.title} delay={i * .08}>
              <Card style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: ".8rem" }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "1rem", fontWeight: 600, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: ".5rem" }}>{v.title}</h3>
                <p style={{ fontSize: ".83rem", color: B.muted, lineHeight: 1.65 }}>{v.desc}</p>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>
      <CTABanner go={go} h="Ready to Build Your Digital Legacy?" p="Let's work together to create a digital presence that reflects the quality of your business." />
      <style>{`.two-col{grid-template-columns:1fr!important}@media(min-width:768px){.two-col{grid-template-columns:1fr 1fr!important}}`}</style>
    </div>
  );
}

/* ─── SERVICES PAGE ─────────────────────────────────────── */
function Services({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <div>
      <PageHero label="Services" title={<>Digital Services For <GradText>Modern Businesses</GradText></>} sub="Professional digital solutions tailored for businesses looking to build credibility and improve their online presence." />
      <section style={{ padding: "80px 5%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: "1.4rem" }}>
          {SERVICES.map((s, i) => (
            <FadeUp key={s.title} delay={i * .07}>
              <Card style={{ height: "100%" }}>
                <div style={{ width: 48, height: 48, background: "rgba(123,63,228,.12)", border: `1px solid rgba(123,63,228,.22)`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: B.accent, marginBottom: "1.1rem" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "1.05rem", fontWeight: 600, marginBottom: ".6rem" }}>{s.title}</h3>
                <p style={{ fontSize: ".855rem", color: B.muted, lineHeight: 1.65, marginBottom: "1rem" }}>{s.desc}</p>
                <Tag><Clock size={12} /> {s.time}</Tag>
                <div style={{ marginTop: "1.3rem" }}>
                  <div style={{ fontSize: ".72rem", fontWeight: 700, color: B.muted2, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: ".55rem" }}>Includes</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: ".28rem" }}>
                    {s.includes.map(it => (
                      <div key={it} style={{ display: "flex", alignItems: "center", gap: ".5rem", fontSize: ".83rem", color: B.muted }}>
                        <Check size={13} color={B.purple} strokeWidth={3} />{it}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>
      <CTABanner go={go} h="Need a Custom Solution?" p="We also assist businesses with tailored digital solutions based on specific project requirements." btn="Request a Quote" />
    </div>
  );
}

/* ─── PROCESS PAGE ─────────────────────────────────────── */
function Process({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <div>
      <PageHero label="Our Process" title={<>How We <GradText>Work</GradText></>} sub="A structured workflow designed to keep projects smooth, transparent, and efficient." />
      <section style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 27, top: 0, bottom: 0, width: 1, background: GRAD, opacity: .32 }} />
            {PROCESS.map((p, i) => (
              <FadeUp key={p.n} delay={i * .08}>
                <div style={{ display: "flex", gap: "1.5rem", padding: "1.2rem 0" }}>
                  <div style={{ width: 54, height: 54, minWidth: 54, background: B.card, border: `1px solid rgba(123,63,228,.38)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: ".85rem", color: B.accent, zIndex: 1, position: "relative" }}>{p.n}</div>
                  <div style={{ paddingTop: ".7rem" }}>
                    <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "1rem", fontWeight: 600, marginBottom: ".3rem" }}>{p.title}</h3>
                    <p style={{ fontSize: ".855rem", color: B.muted, lineHeight: 1.68 }}>{p.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp>
            <div style={{ background: "rgba(123,63,228,.07)", border: `1px solid rgba(123,63,228,.2)`, borderRadius: 12, padding: "1.5rem 2rem", marginTop: "2rem" }}>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: ".9rem", fontWeight: 600, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: ".5rem" }}>Turnaround Times</div>
              <p style={{ fontSize: ".84rem", color: B.muted, lineHeight: 1.72 }}>Estimated turnaround times depend on project scope, revision requests, and client response times during approval stages. Fast communication and timely feedback help ensure faster project completion.</p>
            </div>
          </FadeUp>
        </div>
      </section>
      <CTABanner go={go} h="Ready to Get Started?" p="Reach out today and let's kick off your project with a quick discovery call." />
    </div>
  );
}

/* ─── PORTFOLIO PAGE ────────────────────────────────────── */
function Portfolio({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <div>
      <PageHero label="Portfolio" title={<><GradText>Selected</GradText> Work</>} sub="A showcase of modern digital solutions designed for growing businesses." />
      <section style={{ padding: "80px 5%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: "1.4rem" }}>
          {PORTFOLIO.map((p, i) => (
            <FadeUp key={p.title} delay={i * .07}>
              <motion.div whileHover={{ y: -5, boxShadow: "0 22px 55px rgba(0,0,0,.5)" }}
                style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 16, overflow: "hidden", transition: "border-color .3s" }}>
                <div style={{ height: 165, background: GRAD_SOFT, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${B.border}`, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at center, ${p.color}18, transparent 70%)` }} />
                  <div style={{ color: p.color, position: "relative", zIndex: 1 }}>{p.icon}</div>
                </div>
                <div style={{ padding: "1.4rem" }}>
                  <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: ".5rem" }}>{p.cat}</div>
                  <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "1rem", fontWeight: 600, marginBottom: ".5rem" }}>{p.title}</h3>
                  <p style={{ fontSize: ".83rem", color: B.muted, lineHeight: 1.62 }}>{p.desc}</p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>
      <CTABanner go={go} h="Your Business Could Be Next" p="We're ready to help you create a professional digital presence that reflects the quality of your business." btn="Start Your Project" />
    </div>
  );
}

/* ─── CONTACT PAGE ──────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", service: "", details: "" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const handleSubmit = () => { setSent(true); setTimeout(() => setSent(false), 4000); };
  return (
    <div>
      <PageHero label="Contact" title={<>Let's Work <GradText>Together</GradText></>} sub="Ready to start your project? Contact GG LegacyX today." />
      <section style={{ padding: "80px 5%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "3.5rem", alignItems: "start" }} className="contact-grid">
          {/* Contact cards */}
          <div>
            <FadeUp>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {[{ icon: <MessageCircle size={20} />, h: "WhatsApp / Phone", t: "071 977 4828", btn: "Chat on WhatsApp", href: "https://wa.me/27719774828", btnColor: "#25D366" }, { icon: <Mail size={20} />, h: "Email", t: "info@gglegacyx.co.za", btn: "Send Email", href: "mailto:info@gglegacyx.co.za", btnColor: B.purple }, { icon: <MapPin size={20} />, h: "Service Area", t: "Online-based, serving all of South Africa remotely.", btn: null }].map(c => (
                  <div key={c.h} style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 12, padding: "1.5rem", display: "flex", gap: "1rem" }}>
                    <div style={{ width: 42, height: 42, minWidth: 42, background: "rgba(123,63,228,.12)", border: `1px solid rgba(123,63,228,.22)`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: B.accent }}>{c.icon}</div>
                    <div>
                      <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: ".9rem", fontWeight: 600, marginBottom: ".3rem" }}>{c.h}</h3>
                      <p style={{ fontSize: ".84rem", color: B.muted, marginBottom: c.btn ? ".8rem" : 0 }}>{c.t}</p>
                      {c.btn && <a href={c.href} target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", background: GRAD, color: "#fff", textDecoration: "none", borderRadius: 7, padding: ".45rem 1rem", fontSize: ".78rem", fontWeight: 700 }}><ExternalLink size={12} />{c.btn}</a>}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Stats */}
            <FadeUp delay={.15}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".9rem", marginTop: "1.5rem" }}>
                {[{ n: "24hr", t: "Response Time" }, { n: "50%", t: "Deposit to Start" }, { n: "9", t: "Process Steps" }, { n: "100%", t: "Remote Service" }].map(s => (
                  <div key={s.t} style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 10, padding: "1rem", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "1.4rem", fontWeight: 700, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.n}</div>
                    <div style={{ fontSize: ".72rem", color: B.muted, marginTop: ".2rem", fontWeight: 600 }}>{s.t}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Form */}
          <FadeUp delay={.1}>
            <div style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 18, padding: "2.2rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: GRAD }} />
              <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Request a Quote</h3>
              {sent && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ background: "rgba(123,63,228,.15)", border: `1px solid rgba(123,63,228,.35)`, borderRadius: 8, padding: ".9rem 1.2rem", marginBottom: "1.2rem", fontSize: ".85rem", color: B.accent, display: "flex", alignItems: "center", gap: ".6rem" }}>
                  <Check size={16} /> Thank you! We'll be in touch shortly.
                </motion.div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                  <div><label style={{ fontSize: ".77rem", fontWeight: 700, color: B.muted, display: "block", marginBottom: ".35rem" }}>Full Name *</label><input placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                  <div><label style={{ fontSize: ".77rem", fontWeight: 700, color: B.muted, display: "block", marginBottom: ".35rem" }}>Business Name</label><input placeholder="Your business" value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                  <div><label style={{ fontSize: ".77rem", fontWeight: 700, color: B.muted, display: "block", marginBottom: ".35rem" }}>Email Address *</label><input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                  <div><label style={{ fontSize: ".77rem", fontWeight: 700, color: B.muted, display: "block", marginBottom: ".35rem" }}>Phone Number</label><input type="tel" placeholder="+27 XXX XXX XXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                </div>
                <div><label style={{ fontSize: ".77rem", fontWeight: 700, color: B.muted, display: "block", marginBottom: ".35rem" }}>Service Needed</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="">Select a service...</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    <option value="Custom">Custom / Not Sure</option>
                  </select>
                </div>
                <div><label style={{ fontSize: ".77rem", fontWeight: 700, color: B.muted, display: "block", marginBottom: ".35rem" }}>Project Details</label>
                  <textarea placeholder="Tell us about your project, goals, and any specific requirements..." value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} />
                </div>
                <BtnPrimary onClick={handleSubmit} style={{ width: "100%", justifyContent: "center" }}>Submit Request <Send size={16} /></BtnPrimary>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: "5rem" }}>
          <FadeUp><SectionLabel>FAQ</SectionLabel><SectionHeading>Frequently Asked Questions</SectionHeading></FadeUp>
          <div style={{ display: "flex", flexDirection: "column", gap: ".7rem", marginTop: "2rem", maxWidth: 800 }}>
            {FAQS.map((f, i) => (
              <FadeUp key={i} delay={i * .06}>
                <div style={{ background: B.card, border: `1px solid ${openFaq === i ? B.borderH : B.border}`, borderRadius: 12, overflow: "hidden", transition: "border-color .3s" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", padding: "1.1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", color: B.white, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: ".88rem", textAlign: "left" }}>
                    {f.q}
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} style={{ color: B.accent, flexShrink: 0, marginLeft: "1rem" }}><ChevronDown size={16} /></motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} style={{ overflow: "hidden" }}>
                        <div style={{ padding: "0 1.5rem 1.2rem", fontSize: ".855rem", color: B.muted, lineHeight: 1.72 }}>{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      <style>{`media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}.form-row{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

/* ─── SHARED COMPONENTS ─────────────────────────────────── */
function PageHero({ label, title, sub }) {
  return (
    <div style={{ padding: "130px 5% 70px", textAlign: "center", background: GRAD_GLOW, borderBottom: `1px solid ${B.border}`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: GRAD }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(123,63,228,.06)", filter: "blur(70px)", top: -100, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
        <SectionLabel>{label}</SectionLabel>
        <h1 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "clamp(2.1rem,4.5vw,3.2rem)", fontWeight: 700, marginBottom: "1rem", position: "relative" }}>{title}</h1>
        <p style={{ color: B.muted, fontSize: "1rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.72, position: "relative" }}>{sub}</p>
      </motion.div>
    </div>
  );
}

function CTABanner({ go, h, p, btn = "Get a Quote" }) {
  return (
    <FadeUp style={{ margin: "0 5% 80px" }}>
      <div style={{ background: B.card, border: `1px solid rgba(123,63,228,.22)`, borderRadius: 20, padding: "4rem 2.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: GRAD }} />
        <div style={{ position: "absolute", inset: 0, background: GRAD_GLOW, pointerEvents: "none" }} />
        <h2 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "clamp(1.6rem,3vw,2.3rem)", fontWeight: 700, marginBottom: ".8rem", position: "relative" }}>{h}</h2>
        <p style={{ color: B.muted, marginBottom: "2.2rem", fontSize: ".95rem", position: "relative" }}>{p}</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <BtnPrimary onClick={() => go("contact")}>{btn} <ArrowRight size={16} /></BtnPrimary>
          <BtnSecondary href="https://wa.me/27719774828"><MessageCircle size={15} /> WhatsApp Us</BtnSecondary>
        </div>
      </div>
    </FadeUp>
  );
}

/* ─── ROOT APP ───────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const pages = { home: <Home setPage={setPage} />, about: <About setPage={setPage} />, services: <Services setPage={setPage} />, process: <Process setPage={setPage} />, portfolio: <Portfolio setPage={setPage} />, contact: <Contact /> };
  return (
    <>
      <GlobalStyle />
      <Nav page={page} setPage={setPage} />
      <main style={{ paddingTop: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .45, ease: [.22,1,.36,1] }}>
            {pages[page]}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer setPage={setPage} />
      {/* WhatsApp float */}
      <motion.a href="https://wa.me/27719774828" target="_blank" whileHover={{ scale: 1.12, boxShadow: "0 10px 32px rgba(37,211,102,.5)" }} whileTap={{ scale: .95 }}
        style={{ position: "fixed", bottom: 24, right: 24, width: 52, height: 52, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 998, color: "#fff", textDecoration: "none", boxShadow: "0 4px 20px rgba(37,211,102,.4)" }}>
        <MessageCircle size={24} fill="white" />
      </motion.a>
    </>
  );
}
