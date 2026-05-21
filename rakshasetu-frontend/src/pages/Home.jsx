import { useState, useEffect } from "react";
import { helplines } from "../data/helplines";
import HelplineCard from "../components/HelplineCard";
import Navbar from "../components/Navbar";
import logo from "../assets/rakshasetu_logo.png";

const categories = [
  "All",
  "Core Emergency",
  "Women Safety",
  "Child Safety",
  "Medical & Health",
  "Disaster Management",
  "Cyber & Legal",
  "Transport & Others",
];

export default function Home() {

  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const filtered = helplines.filter(
    (h) =>
      (selected === "All" || h.category === selected) &&
      (h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.number.includes(search) ||
        h.description.toLowerCase().includes(search.toLowerCase()))
  );

  const grouped = categories.slice(1).reduce((acc, cat) => {
    const items = filtered.filter((h) => h.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div
      style={{
        background: "#1A0A04",
        minHeight: "100vh",
        fontFamily: "Georgia, serif",
      }}
    >
      <Navbar />

      {/* HERO SECTION */}
      <div
        style={{
          background: "linear-gradient(160deg, #3B1A0A 0%, #2A1005 40%, #1A0A04 100%)",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(192,120,48,0.2)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            background: "radial-gradient(circle, rgba(192,120,48,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 240,
            height: 240,
            background: "radial-gradient(circle, rgba(139,69,19,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "70px 24px 60px",
            position: "relative",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 20,
            }}
          >
            <img
              src={logo}
              alt="Rakshasetu Logo"
              style={{
                width: 90,
                height: 90,
                objectFit: "contain",
                borderRadius: 16,
                filter: "drop-shadow(0 4px 16px rgba(192,120,48,0.4))",
              }}
            />

            <div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#C07830",
                  margin: "0 0 10px",
                }}
              >
                India's #1 Emergency Directory
              </p>

              <h1
                style={{
                  fontSize: "clamp(48px, 8vw, 88px)",
                  fontWeight: 900,
                  color: "#F5DEB3",
                  margin: 0,
                  letterSpacing: "-2px",
                  lineHeight: 1,
                  textTransform: "uppercase",
                }}
              >
                RAKSHA
                <span style={{ color: "#C07830", display: "block" }}>
                  SETU
                </span>
              </h1>
            </div>
          </div>

          <p
            style={{
              color: "#A0826A",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 0 40px",
            }}
          >
            All official Indian government emergency helplines in one
            place. One tap to call. Available 24/7 across India.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <a
              href="tel:112"
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                background: "linear-gradient(135deg, #C07830, #8B4513)",
                color: "#FFF8F0",
                padding: "16px 40px",
                borderRadius: 8,
                textDecoration: "none",
                boxShadow: "0 6px 24px rgba(139,69,19,0.5)",
                transition: "all 0.2s",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  opacity: 0.8,
                  marginBottom: 2,
                }}
              >
                National Emergency
              </span>

              <span
                style={{
                  fontSize: 40,
                  fontWeight: 900,
                  letterSpacing: "-2px",
                  lineHeight: 1,
                }}
              >
                112
              </span>

              <span style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>
                Tap to Call Now
              </span>
            </a>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { num: "100", label: "Police" },
                { num: "101", label: "Fire" },
                { num: "108", label: "Ambulance" },
              ].map(({ num, label }) => (
                <a
                  key={num}
                  href={`tel:${num}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(192,120,48,0.2)",
                    color: "#F5DEB3",
                    textDecoration: "none",
                    padding: "8px 20px",
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 900,
                      color: "#C07830",
                      minWidth: 40,
                    }}
                  >
                    {num}
                  </span>
                  <span style={{ color: "#A0826A", fontSize: 12 }}>
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY SECTION */}
      <div
        style={{
          background: "#2A1208",
          borderBottom: "1px solid rgba(192,120,48,0.15)",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              textAlign: "center",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#C07830",
              fontWeight: 700,
              margin: "0 0 6px",
            }}
          >
            TOP CATEGORIES
          </p>

          <p
            style={{
              textAlign: "center",
              color: "#A0826A",
              fontSize: 13,
              margin: "0 0 20px",
            }}
          >
            Explore all verified government helplines
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                style={{
                  padding: "9px 20px",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  border:
                    selected === cat
                      ? "1.5px solid #C07830"
                      : "1.5px solid rgba(192,120,48,0.25)",
                  background:
                    selected === cat
                      ? "linear-gradient(135deg, #C07830, #8B4513)"
                      : "rgba(255,255,255,0.04)",
                  color: selected === cat ? "#FFF8F0" : "#A0826A",
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "36px 24px 0",
        }}
      >
        <div style={{ position: "relative", marginBottom: 36 }}>
          <span
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 18,
              color: "#6B4030",
            }}
          >
            🔍
          </span>

          <input
            type="text"
            placeholder="Search helpline eg. ambulance, women, cyber..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px 14px 48px",
              borderRadius: 8,
              border: "1.5px solid rgba(192,120,48,0.25)",
              background: "#2A1208",
              color: "#F5DEB3",
              fontSize: 14,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* CARDS */}
        <div style={{ paddingBottom: 80 }}>
          {search || selected !== "All" ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                gap: 16,
              }}
            >
              {filtered.map((h) => (
                <HelplineCard key={h.id} helpline={h} />
              ))}
            </div>
          ) : (
            Object.entries(grouped).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: 52 }}>
                <div style={{ marginBottom: 20, textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: "#C07830",
                      fontWeight: 700,
                    }}
                  >
                    {cat.toUpperCase()}
                  </p>
                  <h2 style={{ color: "#F5DEB3" }}>{cat}</h2>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                    gap: 16,
                  }}
                >
                  {items.map((h) => (
                    <HelplineCard key={h.id} helpline={h} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          background: "#120602",
          borderTop: "1px solid rgba(192,120,48,0.15)",
          padding: "55px 24px 32px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 40,
              marginBottom: 45,
            }}
          >
            {/* BRAND */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <img
                  src={logo}
                  alt="Rakshasetu Logo"
                  style={{
                    width: 36,
                    height: 36,
                    objectFit: "contain",
                    borderRadius: 8,
                  }}
                />
                <span style={{ fontSize: 22, fontWeight: 900, color: "#F5DEB3" }}>
                  Raksha
                  <span style={{ color: "#C07830" }}>setu</span>
                </span>
              </div>

              <p style={{ color: "#8B5A3C", fontSize: 14, lineHeight: 1.8 }}>
                India's Emergency Helpline Directory. Helping people stay safe
                with verified emergency support and women safety tools.
              </p>
            </div>

            {/* HELPLINES */}
            <div>
              <p style={{ color: "#F5DEB3", fontWeight: 700, marginBottom: 14 }}>
                HELPLINES
              </p>
              {["Police — 100", "Fire — 101", "Ambulance — 108", "Emergency — 112", "Women — 1091"].map(
                (item) => (
                  <p key={item} style={{ color: "#8B5A3C", fontSize: 13, marginBottom: 8 }}>
                    {item}
                  </p>
                )
              )}
            </div>

            {/* FEATURES */}
            <div>
              <p style={{ color: "#F5DEB3", fontWeight: 700, marginBottom: 14 }}>
                FEATURES
              </p>
              {["Women Safety", "Emergency SOS", "AI Companion", "Safe Map", "Heat Map"].map(
                (item) => (
                  <p key={item} style={{ color: "#8B5A3C", fontSize: 13, marginBottom: 8 }}>
                    {item}
                  </p>
                )
              )}
            </div>

            {/* CONTACT */}
            <div>
              <p style={{ color: "#F5DEB3", fontWeight: 700, marginBottom: 14 }}>
                NEED HELP?
              </p>
              <p style={{ color: "#8B5A3C", fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>
                Have questions, suggestions, or want to contact our team directly?
              </p>
              <a
                href="mailto:mahapatrasamikhya12@gmail.com"
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                  background: "linear-gradient(135deg, #C07830, #8B4513)",
                  color: "#FFF8F0",
                  padding: "12px 18px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                📩 Contact via Email
              </a>
              <p style={{ color: "#6B4030", fontSize: 12, marginTop: 12, wordBreak: "break-word" }}>
                mahapatrasamikhya12@gmail.com
              </p>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(192,120,48,0.15)",
              paddingTop: 20,
              textAlign: "center",
            }}
          >
            <p style={{ color: "#4A2810", fontSize: 12, margin: 0 }}>
              © 2025 Rakshasetu · Built for safety · Verified emergency data
              sourced from official government portals.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}