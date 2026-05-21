import Navbar from "../components/Navbar";
import { helplines } from "../data/helplines";
import HelplineCard from "../components/HelplineCard";
import LocationShare from "../components/LocationShare";

const tips = [
  { icon: "📍", title: "Share your location", desc: "Always share live location with a trusted contact when travelling alone." },
  { icon: "📱", title: "Save emergency numbers", desc: "Keep 112, 1091, and NCW helpline saved in your phone contacts." },
  { icon: "🔊", title: "Use 112 SHOUT feature", desc: "The 112 India app's SHOUT feature alerts nearby volunteers instantly." },
  { icon: "🚗", title: "Note vehicle details", desc: "Always note cab/auto number and share with family before boarding." },
  { icon: "🤝", title: "Trust your instincts", desc: "If something feels wrong, move to a crowded public place immediately." },
  { icon: "🆘", title: "Fake a call", desc: "If unsafe, pretend to call someone. Speak confidently and move to safety." },
];

export default function WomenSafety() {
  const womenHelplines = helplines.filter(h => h.category === "Women Safety");

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #110a04 0%, #2c1810 50%, #1e1008 100%)" }}>
      <Navbar />

      {/* Hero */}
      <div className="text-center py-16 px-4">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-6 uppercase tracking-widest"
          style={{
            background: "rgba(196,132,60,0.15)",
            border: "1px solid rgba(196,132,60,0.35)",
            color: "#e8b87a",
          }}
        >
          <span
            className="w-2 h-2 rounded-full inline-block animate-pulse"
            style={{ background: "#c4843c" }}
          ></span>
          Women Safety — Priority Helplines
        </div>

        <h1
          className="text-5xl md:text-6xl font-black mb-4"
          style={{ fontFamily: "'Playfair Display', serif", color: "#faf3e8" }}
        >
          You Are <span style={{ color: "#c4843c" }}>Never Alone</span>
        </h1>

        <p className="text-lg max-w-lg mx-auto mb-10" style={{ color: "#e8b87a" }}>
          Help is always one call away. These verified helplines are available 24/7 across India.
        </p>

        <a
          href="tel:112"
          className="inline-flex flex-col items-center transition-all active:scale-95 rounded-3xl px-14 py-7 mb-3"
          style={{
            background: "linear-gradient(145deg, #c0392b, #922b21)",
            boxShadow: "0 8px 32px rgba(192,57,43,0.45), 0 0 0 8px rgba(192,57,43,0.1)",
            color: "white",
          }}
        >
          <span className="text-xs uppercase tracking-widest opacity-80 mb-1">Emergency SOS</span>
          <span className="text-6xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>112</span>
          <span className="text-sm opacity-80 mt-1">Tap to call immediately</span>
        </a>
        <p className="text-xs" style={{ color: "#7a4419" }}>Works from any phone, even without balance</p>
      </div>

      {/* Helplines */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <h2
          className="font-bold text-2xl mb-6 text-center"
          style={{ fontFamily: "'Playfair Display', serif", color: "#f0d0a0" }}
        >
          Women Helpline Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {womenHelplines.map(h => (
            <HelplineCard key={h.id} helpline={h} />
          ))}
        </div>
      </div>

      {/* Location Share */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <LocationShare />
      </div>

      {/* Safety Tips */}
      <div className="max-w-5xl mx-auto px-4 mb-20">
        <h2
          className="font-bold text-2xl mb-2 text-center"
          style={{ fontFamily: "'Playfair Display', serif", color: "#f0d0a0" }}
        >
          Safety Tips
        </h2>
        <p className="text-center text-sm mb-8" style={{ color: "#8b5a2b" }}>
          Simple practices that can protect you in difficult situations
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 transition-all hover:-translate-y-1"
              style={{
                background: "rgba(92,51,23,0.25)",
                border: "1px solid rgba(196,132,60,0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="text-3xl mb-3">{tip.icon}</div>
              <h3
                className="font-bold mb-1"
                style={{ fontFamily: "'Playfair Display', serif", color: "#f0d0a0" }}
              >
                {tip.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#8b5a2b" }}>{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer
        className="text-center py-8 text-sm border-t"
        style={{ color: "#5c3317", borderColor: "rgba(196,132,60,0.1)" }}
      >
        <p>Rakshasetu — Standing with every woman in India</p>
      </footer>
    </div>
  );
}