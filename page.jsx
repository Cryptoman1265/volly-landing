"use client";
import { useState } from "react";

const CONTRACT = "8UJ5UUCRry7aF73pYNvicc4xgPDjb3baG12kJV8TMiLL";
const TRADE_URL =
  "https://lfj.gg/solana/trade/8UJ5UUCRry7aF73pYNvicc4xgPDjb3baG12kJV8TMiLL";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <main className="wrap">
      {/* Header mit Logo */}
      <header className="header">
        <img src="/volly-logo.png" alt="$VOLLY logo" className="logo" />
      </header>

      {/* Hero */}
      <section className="grid">
        <div>
          <span className="pill">$VOLLY</span>
          <h1 className="title">
            The cheerful <span className="highlight">yellow</span> bird.
          </h1>

          {/* Contract + Copy */}
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

          {/* CTAs */}
          <div className="row">
            <a
              className="btn primary"
              href={TRADE_URL}
              target="_blank"
              rel="noopener"
            >
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

        {/* Bild */}
        <div className="card">
          <div className="shine" />
          <img src="/volly-hero.png" alt="VOLLY hero" className="hero" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <img src="/volly-bird.png" alt="VOLLY bird" width="32" height="32" />
        <span>$VOLLY</span>
      </footer>
    </main>
  );
}
