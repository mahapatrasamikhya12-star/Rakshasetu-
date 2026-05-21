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

const selfDefense = [
  {
    icon: "🌶️",
    title: "Carry Pepper Spray",
    color: "#c0392b",
    steps: [
      "Always keep pepper spray in an easily accessible pocket or bag.",
      "Aim for the attacker's eyes from 1–3 feet distance.",
      "Spray in short bursts and move away immediately.",
      "Legal to carry in India for self-defense purposes.",
    ],
  },
  {
    icon: "👊",
    title: "Wrist Grab Escape",
    color: "#c4843c",
    steps: [
      "If someone grabs your wrist, rotate your arm toward their thumb side.",
      "The thumb is the weakest point of any grip.",
      "Pull your arm sharply toward their thumb and step back.",
      "Practice this motion regularly so it becomes instinctive.",
    ],
  },
  {
    icon: "🦵",
    title: "Knee Strike",
    color: "#8b4513",
    steps: [
      "If grabbed from the front, raise your knee forcefully to the groin.",
      "This works regardless of the attacker's size.",
      "Simultaneously push their shoulders down for more impact.",
      "Use this move only to escape — then run immediately.",
    ],
  },
  {
    icon: "👣",
    title: "Stomp on Foot",
    color: "#7a4419",
    steps: [
      "If grabbed from behind, stomp hard on the attacker's foot.",
      "Use your heel for maximum force.",
      "Follow with an elbow strike to the ribs.",
      "Immediately shout loudly to attract attention.",
    ],
  },
  {
    icon: "🤚",
    title: "Palm Strike to Nose",
    color: "#922b21",
    steps: [
      "Use the heel of your palm — never your fist.",
      "Strike upward at the attacker's nose with full force.",
      "This causes temporary pain and disorientation.",
      "Use the moment to escape and call for help.",
    ],
  },
  {
    icon: "📢",
    title: "Shout & Create Scene",
    color: "#6b4030",
    steps: [
      "Shout 'FIRE!' loudly — people respond faster than to 'Help!'",
      "Make as much noise as possible to draw attention.",
      "Run toward crowded or lit areas immediately.",
      "Don't hesitate — confidence and noise deter most attackers.",
    ],
  },
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
      <div className="max-w-5xl mx-auto px-4 mb-14">
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

      {/* SELF DEFENSE SECTION */}
      <div className="max-w-5xl mx-auto px-4 mb-20">

        {/* Section Header */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4 uppercase tracking-widest"
            style={{
              background: "rgba(192,57,43,0.15)",
              border: "1px solid rgba(192,57,43,0.35)",
              color: "#e8a070",
            }}
          >
            🛡️ Self Defense Guide
          </div>
          <h2
            className="font-black text-3xl md:text-4xl mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "#faf3e8" }}
          >
            Protect <span style={{ color: "#c4843c" }}>Yourself</span>
          </h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "#8b5a2b" }}>
            Basic self-defense techniques and safety tools every woman should know.
            Practice these regularly so they become second nature.
          </p>
        </div>

        {/* Self Defense Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {selfDefense.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 transition-all hover:-translate-y-1"
              style={{
                background: "rgba(44,24,16,0.7)",
                border: `1px solid rgba(196,132,60,0.2)`,
                borderTop: `3px solid ${item.color}`,
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}22` }}
                >
                  {item.icon}
                </div>
                <h3
                  className="font-bold text-base leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#f0d0a0" }}
                >
                  {item.title}
                </h3>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                {item.steps.map((step, j) => (
                  <div key={j} className="flex gap-2 items-start">
                    <span
                      className="text-xs font-black flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        background: item.color,
                        color: "#fff",
                        fontSize: "10px",
                      }}
                    >
                      {j + 1}
                    </span>
                    <p className="text-xs leading-relaxed" style={{ color: "#8b5a2b" }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Warning */}
        <div
          className="mt-8 rounded-2xl p-5 text-center"
          style={{
            background: "rgba(192,57,43,0.08)",
            border: "1px solid rgba(192,57,43,0.2)",
          }}
        >
          <p className="text-sm font-bold mb-1" style={{ color: "#e8a070" }}>
            ⚠️ Important Reminder
          </p>
          <p className="text-xs" style={{ color: "#7a4419" }}>
            These techniques are for emergency self-defense only. Always prioritize escaping safely
            and calling 112 over engaging with an attacker. Your safety is the priority.
          </p>
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