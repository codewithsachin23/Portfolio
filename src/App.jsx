import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Scene from "./Scene.jsx";
import { profile, skills, experience, projects, education, certifications } from "./data.js";

const sections = ["about", "skills", "experience", "projects", "education", "certifications", "contact"];

function Reveal({ children, delay = 0, className = "" }) {
  const [shown, setShown] = useState(false);
  const [node, setNode] = useState(null);
  useEffect(() => {
    if (!node) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.12 });
    io.observe(node);
    return () => io.disconnect();
  }, [node]);
  return (
    <div ref={setNode} className={`reveal ${shown ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Typewriter({ words }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const id = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), 1200);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setI(i + 1); }
      }
    }, del ? 35 : 70);
    return () => clearTimeout(id);
  }, [text, del, i, words]);
  return <span className="typed">{text}<i className="caret" /></span>;
}

const Title = ({ k, children }) => (
  <Reveal><h2 className="title"><span>{k}</span>{children}</h2></Reveal>
);

function CertModal({ cert, onClose }) {
  useEffect(() => {
    if (!cert) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [cert, onClose]);
  if (!cert) return null;
  return (
    <div className="modal" onClick={onClose} role="dialog" aria-modal="true" aria-label={cert.name}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <div className="row">
          <div><h4>{cert.name}</h4><p className="muted">{cert.issuer}</p></div>
          <button className="x" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="viewer">
          {cert.image
            ? <img src={cert.image} alt={`${cert.name} certificate`} />
            : <iframe src={cert.link} title={cert.name} loading="lazy" referrerPolicy="no-referrer" />}
        </div>
        <p className="muted note">
          {cert.image ? "Verified credential available at the issuer." : "If the preview is blank, the issuer doesn't allow embedding. Use the button to open the credential."}
        </p>
        <a className="btn primary small" href={cert.link} target="_blank" rel="noreferrer">Open credential ↗</a>
      </div>
    </div>
  );
}

function ContactForm() {
  const form = useRef(null);
  const [status, setStatus] = useState("idle");
  const send = async (e) => {
    e.preventDefault();
    const f = form.current;
    if (f.website.value) return; // honeypot for bots
    const { VITE_EMAILJS_SERVICE_ID: s, VITE_EMAILJS_TEMPLATE_ID: t, VITE_EMAILJS_PUBLIC_KEY: k } = import.meta.env;
    if (!s || !t || !k) { setStatus("config"); return; }
    setStatus("sending");
    try {
      await emailjs.send(s, t, { from_name: f.from_name.value, reply_to: f.reply_to.value, message: f.message.value }, { publicKey: k });
      setStatus("success");
      f.reset();
    } catch {
      setStatus("error");
    }
  };
  return (
    <form ref={form} onSubmit={send} className="form">
      <div className="two">
        <label>Your name<input name="from_name" required maxLength={80} placeholder="Jane Doe" /></label>
        <label>Your email<input name="reply_to" type="email" required maxLength={120} placeholder="jane@company.com" /></label>
      </div>
      <label>Message<textarea name="message" required rows={6} maxLength={3000} placeholder="Hi Sachin, I'd like to talk about…" /></label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button className="btn primary" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message ➤"}</button>
      <p className={`status ${status}`} role="status">
        {status === "success" && "✓ Message sent! I'll get back to you soon."}
        {status === "error" && "Something went wrong. Please try again or use the email link below."}
        {status === "config" && "Contact form isn't configured yet (missing EmailJS keys in .env)."}
      </p>
    </form>
  );
}

export default function App() {
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);
  const [cert, setCert] = useState(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => { const el = document.getElementById(s); el && io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header className="nav">
        <a href="#top" className="logo">SKS<b>.</b></a>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
        <nav className={open ? "open" : ""}>
          {sections.map((s) => (
            <a key={s} href={`#${s}`} className={active === s ? "on" : ""} onClick={() => setOpen(false)}>{s}</a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <Scene />
          <div className="hero-text">
            <img className="avatar" src={profile.photo} alt={profile.name} />
            <p className="eyebrow">Hello, I'm</p>
            <h1>{profile.name}</h1>
            <h3>{profile.role}</h3>
            <p className="sub"><Typewriter words={profile.roles} /></p>
            <div className="cta">
              <a className="btn primary" href="#projects">View Projects</a>
              <a className="btn" href="#contact">Contact Me</a>
              <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          <a className="scroll" href="#about">scroll ↓</a>
        </section>

        <section id="about">
          <Title k="01">About</Title>
          <div className="about">
            <Reveal><div className="photo"><img src={profile.photo} alt={profile.name} /></div></Reveal>
            <Reveal delay={120}>
              <div>
                <p className="lead">{profile.summary}</p>
                <div className="cta tight">
                  <a className="btn small primary" href="#contact">Let's talk</a>
                  <a className="btn small" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                  <a className="btn small" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="stats">
            {[["Java · Python", "Core languages"], ["GenAI", "LLM-based applications"], ["2", "Companies · TCS & Capgemini"], [String(certifications.length), "Certifications"]].map(([a, b], i) => (
              <Reveal key={b} delay={i * 80}><div className="card stat"><strong>{a}</strong><span>{b}</span></div></Reveal>
            ))}
          </div>
        </section>

        <section id="skills">
          <Title k="02">Technical Skills</Title>
          <div className="grid2">
            {Object.entries(skills).map(([group, items], i) => (
              <Reveal key={group} delay={i * 80}>
                <div className="card">
                  <h4>{group}</h4>
                  <div className="chips">{items.map((s) => <span key={s} className="chip">{s}</span>)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="experience">
          <Title k="03">Experience</Title>
          <div className="timeline">
            {experience.map((e, i) => (
              <Reveal key={e.company + e.title} delay={i * 80}>
                <div className="card tl">
                  <div className="row"><h4>{e.title}</h4><span className="muted">{e.period}</span></div>
                  <p className="company">{e.company} · {e.place}</p>
                  <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects">
          <Title k="04">Projects</Title>
          <div className="grid2">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <article className="card project">
                  <div className="row"><h4>{p.name}</h4><span className="muted">{p.date}</span></div>
                  <div className="chips">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
                  <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                  <div className="cta">
                    <a className="btn small" href={p.link} target="_blank" rel="noreferrer">Source Code ↗</a>
                    {p.demo && <a className="btn small primary" href={p.demo} target="_blank" rel="noreferrer">Live Demo ↗</a>}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="education">
          <Title k="05">Education</Title>
          <div className="grid2">
            {education.map((e, i) => (
              <Reveal key={e.school} delay={i * 80}>
                <div className="card">
                  <h4>{e.school}</h4>
                  <p>{e.degree}</p>
                  <p className="muted">{e.period} · {e.score}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="certifications">
          <Title k="06">Certifications</Title>
          <div className="grid2">
            {certifications.map((c, i) => (
              <Reveal key={c.name} delay={i * 80}>
                <button className="card cert" onClick={() => setCert(c)}>
                  <span className="badge">✓</span>
                  <div><h4>{c.name}</h4><p className="muted">{c.issuer}</p></div>
                  <span className="view">View ↗</span>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact">
          <Title k="07">Get in touch</Title>
          <Reveal>
            <div className="card contact">
              <p className="lead">I'm open to new opportunities. Send me a message and it lands straight in my inbox.</p>
              <ContactForm />
              <div className="cta">
                <a className="btn small" href={`mailto:${profile.email}`}>{profile.email}</a>
                <a className="btn small" href={`tel:${profile.phone}`}>{profile.phone}</a>
                <a className="btn small" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="btn small" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <CertModal cert={cert} onClose={() => setCert(null)} />
      <footer>© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
