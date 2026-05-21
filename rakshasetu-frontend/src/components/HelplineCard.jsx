import { useState } from "react";

const categoryColors = {
  "Core Emergency":       { bg: "#3D1A0A", border: "#6B3010", accent: "#FF6B35", badge: "#FF6B35", badgeBg: "rgba(255,107,53,0.15)" },
  "Women Safety":         { bg: "#3D0A1A", border: "#6B1030", accent: "#FF6B9E", badge: "#FF6B9E", badgeBg: "rgba(255,107,158,0.15)" },
  "Child Safety":         { bg: "#2E2A0A", border: "#5A5010", accent: "#FFD700", badge: "#FFD700", badgeBg: "rgba(255,215,0,0.12)" },
  "Medical & Health":     { bg: "#0A2E1A", border: "#105A30", accent: "#4ADE80", badge: "#4ADE80", badgeBg: "rgba(74,222,128,0.12)" },
  "Disaster Management":  { bg: "#2E1A0A", border: "#5A3010", accent: "#FB923C", badge: "#FB923C", badgeBg: "rgba(251,146,60,0.12)" },
  "Cyber & Legal":        { bg: "#0A0A2E", border: "#10105A", accent: "#818CF8", badge: "#818CF8", badgeBg: "rgba(129,140,248,0.15)" },
  "Transport & Others":   { bg: "#0A1E2E", border: "#10405A", accent: "#38BDF8", badge: "#38BDF8", badgeBg: "rgba(56,189,248,0.12)" },
};

export default function HelplineCard({ helpline }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const c = categoryColors[helpline.category] || categoryColors["Core Emergency"];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(145deg, ${c.bg}, #2A1208)`
          : `linear-gradient(145deg, ${c.bg}, #1A0A04)`,
        border: `1.5px solid ${hovered ? c.accent : c.border}`,
        borderRadius: 16,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 12px 32px rgba(0,0,0,0.5), 0 0 0 1px ${c.accent}22`
          : "0 4px 12px rgba(0,0,0,0.3)",
        fontFamily: "Georgia, serif",
      }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{helpline.icon}</span>
        <div style={{ flex: 1 }}>
          <p style={{
            fontWeight: 700, fontSize: 14,
            color: "#F5DEB3",
            margin: "0 0 6px", lineHeight: 1.3,
          }}>{helpline.name}</p>
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: c.badge,
            background: c.badgeBg,
            border: `1px solid ${c.accent}33`,
            padding: "2px 10px",
            borderRadius: 20,
            display: "inline-block",
            letterSpacing: "0.3px",
          }}>{helpline.category}</span>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: 12, color: "#A0826A", margin: 0, lineHeight: 1.7 }}>
        {helpline.description}
      </p>

      {/* Number + Call */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "auto",
        paddingTop: 12,
        borderTop: `1px solid ${c.border}`,
      }}>
        <span style={{
          fontWeight: 900, fontSize: 28,
          color: c.accent,
          letterSpacing: "-1px",
          textShadow: `0 0 20px ${c.accent}44`,
        }}>{helpline.number}</span>
        <a
          href={`tel:${helpline.number}`}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: pressed
              ? "#6B3010"
              : "linear-gradient(135deg, #C07830, #8B4513)",
            color: "#FFF8F0",
            padding: "10px 18px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
            transition: "all 0.15s",
            transform: pressed ? "scale(0.94)" : "scale(1)",
            fontFamily: "Georgia, serif",
            boxShadow: pressed ? "none" : "0 3px 10px rgba(139,69,19,0.4)",
            letterSpacing: "0.2px",
          }}>
          📞 Call Now
        </a>
      </div>
    </div>
  );
}