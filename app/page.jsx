"use client";
import { useEffect, useMemo, useRef, useState } from "react";

const CONTRACT = "8UJ5UUCRry7aF73pYNvicc4xgPDjb3baG12kJV8TMiLL";
const TRADE_URL =
  "https://lfj.gg/solana/trade/8UJ5UUCRry7aF73pYNvicc4xgPDjb3baG12kJV8TMiLL";

function useParallax(active) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      el.style.setProperty("--mx", dx.toFixed(3));
      el.style.setProperty("--my", dy.toFixed(3));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [active]);
  return ref;
}

function CoinField({ count = 24, running }) {
  const coins = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 18,
        delay: -Math.random() * 4,
        duration: 6 + Math.random() * 6
      })),
    [count]
  );
  return (
    <div className={`coins ${running ? "coins--on" : ""}`}>
      {coins.map((c) => (
        <span
          key={c.id}
          className="coin"
          style={{
            left: `${c.left}%`,
            width: c.size,
            height: c.size,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [intro, setIntro] = useState(true);
  const [copied, setCopied] = useState(false);

  const parallaxRef = useParallax(intro);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const start = () => {
    // kleine Fade-Out Sequenz
    setIntro(false);
    const content = document.querySelector("#content");
    content?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ---------- GAME-INTRO ---------- */}
      {intro && (
        <section className="intro" ref={parallaxRef}>
          <div className="intro__bg" />
          <CoinField running />

          <div className="intro__layer intro__stars" aria-hidden="true" />
          <img
            className="intro__bird"
            src="/volly-hero.png"
            alt="VOLLY hero"
            draggable="false"
          />
          <img className="intro__logo" src="/volly-logo.png" alt="$VOLLY" />

          <div className="intro__title">
            <span className="pill">$VOLLY</span>
            <h1 className="title">
              The cheerful <span className="highlight">yellow</span> bird.
            </h1>
            <p className="subtitle">Press <b>Space</b> or click to start</p>
          </div>

          <button className="btn btn--start" onClick={start}>
            Start
          </button>
        </section>
      )}

      {/* Space key = Start */}
      {intro && (
        <KeyCatcher onSpace={() => start()} />
      )}

      {/* ---------- NORMALE LANDING ---------- */}
      <main id="content" className={`wrap ${intro ? "is-hidden" : ""}`}>
        <header className="header">
          <img src="/volly-logo.png" alt="$VOLLY logo" className="logo" />
        </header>

        <section className="grid">
          <div>
            <span className="pill">$VOLLY</span>
            <h1 className="title">
              The cheerful <span className="highlight">yellow</span> bird.
            </h1>

            <div className="copy">
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"
                />
              </svg>
              <code className="addr">
                {CONTRACT.slice(0, 6)}…{CONTRACT.slice(-6)}
              </code>
              <button className="link" onClick={copy}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="row">
              <a className="btn primary" href={TRADE_URL} target="_blank" rel="noopener">
                Trade now
              </a>
              <a
                className="btn ghost"
                href="https://x.com/VollyTokenMill"
                target="_blank"
                rel="noopener"
              >
                X / Twitter
              </a>
            </div>
          </div>

          <div className="card">
            <div className="shine" />
            <img className="hero" src="/volly-hero.png" alt="VOLLY hero" />
          </div>
        </section>

        <footer className="footer">
          <img src="/volly-bird.png" alt="VOLLY bird" width="32" height="32" />
          <span>$VOLLY</span>
        </footer>
      </main>
    </>
  );
}

/** Fängt Space-Taste ab, um das Intro zu starten */
function KeyCatcher({ onSpace }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        onSpace?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSpace]);
  return null;
}
