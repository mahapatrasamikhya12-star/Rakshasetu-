import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/",                  label: "Home" },
    { path: "/women-safety",      label: "Women Safety" },
    { path: "/sos",               label: "SOS" },
    { path: "/emergency-contact", label: "Emergency Contact" },
    { path: "/safe-map",          label: "Safe Map" },
    { path: "/heatmap",           label: "Heatmap" },
    { path: "/about",             label: "About" },
  ];

  return (
    <nav style={{
      background: "#3B1A0A",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      fontFamily: "'Georgia', serif",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

        {/* LOGO */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 44, height: 44,
            background: "linear-gradient(135deg, #C07830, #8B4513)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}>🛡️</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#F5DEB3", letterSpacing: "-0.5px", lineHeight: 1.1 }}>
              Raksha<span style={{ color: "#C07830" }}>setu</span>
            </div>
            <div style={{ fontSize: 9, color: "#A0826A", letterSpacing: "2.5px", textTransform: "uppercase" }}>
              Safety Platform
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ path, label }) => (
            <Link key={path} to={path} style={{
              padding: "7px 14px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 500,
              color: isActive(path) ? "#C07830" : "#C4A882",
              background: isActive(path) ? "rgba(192,120,48,0.15)" : "transparent",
              textDecoration: "none",
              transition: "all 0.2s",
              letterSpacing: "0.3px",
            }}
              onMouseEnter={e => { if (!isActive(path)) { e.currentTarget.style.color = "#F5DEB3"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; } }}
              onMouseLeave={e => { if (!isActive(path)) { e.currentTarget.style.color = "#C4A882"; e.currentTarget.style.background = "transparent"; } }}>
              {label}
            </Link>
          ))}
        </div>

        {/* AUTH */}
        <div className="hidden md:flex items-center gap-2">
          {token ? (
            <button onClick={logout} style={{
              padding: "8px 18px", borderRadius: 6,
              border: "1px solid rgba(192,120,48,0.4)",
              background: "transparent", color: "#C4A882",
              cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif",
              transition: "all 0.2s",
            }}>Logout</button>
          ) : (
            <>
              <Link to="/login" style={{
                padding: "8px 18px", borderRadius: 6,
                border: "1px solid rgba(192,120,48,0.4)",
                background: "transparent", color: "#C4A882",
                textDecoration: "none", fontSize: 13,
                transition: "all 0.2s",
              }}>Login</Link>
              <Link to="/register" style={{
                padding: "8px 20px", borderRadius: 6,
                background: "linear-gradient(135deg, #C07830, #8B4513)",
                color: "#FFF8F0", textDecoration: "none",
                fontSize: 13, fontWeight: 700,
                boxShadow: "0 3px 12px rgba(139,69,19,0.5)",
                transition: "all 0.2s",
              }}>Register</Link>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
          style={{ fontSize: 24, color: "#F5DEB3", background: "none", border: "none", cursor: "pointer" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          background: "#2A1208",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 20px 20px",
          display: "flex", flexDirection: "column", gap: 2,
        }}>
          {navLinks.map(({ path, label }) => (
            <Link key={path} to={path} onClick={() => setMenuOpen(false)} style={{
              padding: "12px 8px",
              fontSize: 14,
              color: isActive(path) ? "#C07830" : "#C4A882",
              background: isActive(path) ? "rgba(192,120,48,0.12)" : "transparent",
              textDecoration: "none",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              fontFamily: "Georgia, serif",
              borderRadius: 4,
            }}>{label}</Link>
          ))}
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {token ? (
              <button onClick={logout} style={{
                padding: 12, borderRadius: 6, border: "1px solid rgba(192,120,48,0.4)",
                background: "transparent", color: "#C4A882", cursor: "pointer",
                fontFamily: "Georgia, serif", fontSize: 14,
              }}>Logout</button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} style={{
                  display: "block", textAlign: "center", padding: 12, borderRadius: 6,
                  border: "1px solid rgba(192,120,48,0.4)", color: "#C4A882",
                  textDecoration: "none", fontFamily: "Georgia, serif", fontSize: 14,
                }}>Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} style={{
                  display: "block", textAlign: "center", padding: 12, borderRadius: 6,
                  background: "linear-gradient(135deg, #C07830, #8B4513)",
                  color: "#FFF8F0", textDecoration: "none",
                  fontFamily: "Georgia, serif", fontSize: 14, fontWeight: 700,
                }}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}