import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import logo from "../assets/rakshasetu_logo.png";

const stats = [
  { number: "23+", label: "Verified helplines" },
  { number: "35+", label: "States covered" },
  { number: "24/7", label: "Emergency support" },
  { number: "100%", label: "Free access" },
];

const features = [
  {
    icon: "🚨",
    title: "SOS Emergency Alert",
    desc: "With one tap, users can instantly send their live location to their saved emergency contacts during dangerous situations.",
  },
  {
    icon: "📍",
    title: "Live Location Sharing",
    desc: "Users can securely share their real-time location directly from the SOS section.",
  },
  {
    icon: "🛡️",
    title: "Women Safety Helplines",
    desc: "Quick access to verified women safety helplines including 1091, 181, 112, and state emergency services.",
  },
  {
    icon: "🗺️",
    title: "Safe Route Navigation",
    desc: "Safe Map guides users through safer roads and helps avoid isolated or risky areas.",
  },
  {
    icon: "🔥",
    title: "Heat Map Detection",
    desc: "Heat Maps identify safer and danger-prone zones around the user using live location analysis.",
  },
  {
    icon: "🏥",
    title: "Nearby Help Services",
    desc: "Find nearby hospitals, police stations, emergency centers, and safe public places instantly.",
  },
];

export default function About() {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const submitFeedback = async () => {
    if (rating === 0) {
      alert("Please select star rating");
      return;
    }

    try {
      const response = await fetch("http://localhost:5008/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });

      const data = await response.json();
      alert(data.message);
      setRating(0);
    } catch (error) {
      console.log(error);
      alert("Failed to submit feedback");
    }
  };

  const cardStyle = {
    background: "rgba(44,24,16,0.55)",
    border: "1px solid rgba(196,132,60,0.18)",
    backdropFilter: "blur(10px)",
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #110a04 0%, #2c1810 50%, #1e1008 100%)",
      }}
    >
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* HERO SECTION */}
        <div className="text-center mb-16">
          <img
            src={logo}
            alt="Rakshasetu Logo"
            style={{
              width: 100,
              height: 100,
              objectFit: "contain",
              margin: "0 auto 20px",
              display: "block",
              filter: "drop-shadow(0 4px 20px rgba(192,120,48,0.4))",
              borderRadius: 20,
            }}
          />

          <h1
            className="text-5xl md:text-6xl font-black mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#faf3e8",
            }}
          >
            About{" "}
            <span style={{ color: "#c4843c" }}>Rakshasetu</span>
          </h1>

          <p
            className="text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: "#8b5a2b" }}
          >
            Rakshasetu means{" "}
            <span style={{ color: "#d4954a" }}>"Bridge of Protection"</span>{" "}
            in Sanskrit.
            <br />
            Our platform is designed to improve personal safety through smart
            emergency tools, women safety services, SOS alerts, safe navigation,
            and live location protection.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 text-center transition-all hover:-translate-y-1"
              style={cardStyle}
            >
              <div
                className="text-4xl font-black mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#d4954a",
                }}
              >
                {s.number}
              </div>
              <div className="text-sm" style={{ color: "#8b5a2b" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* WHAT IS RAKSHASETU */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-10"
          style={{ ...cardStyle, borderLeft: "4px solid #d4954a" }}
        >
          <h2
            className="text-3xl font-bold mb-5"
            style={{ color: "#f0d0a0", fontFamily: "'Playfair Display', serif" }}
          >
            🌍 What is Rakshasetu?
          </h2>

          <p className="leading-relaxed text-[15px]" style={{ color: "#8b5a2b" }}>
            Rakshasetu is a smart safety and emergency assistance platform
            created to help people stay safe during dangerous or uncomfortable
            situations.
            <br /><br />
            The platform combines SOS emergency alerts, women safety helplines,
            live location sharing, safe route guidance, danger-zone heat maps,
            and nearby emergency services into one unified safety system.
            <br /><br />
            Our mission is to provide fast, smart, and accessible protection for
            everyone — especially women, students, travelers, late-night workers,
            and people in unfamiliar places.
          </p>
        </div>

        {/* MISSION */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-10"
          style={{ ...cardStyle, borderLeft: "4px solid #c4843c" }}
        >
          <h2
            className="text-3xl font-bold mb-5"
            style={{ color: "#f0d0a0", fontFamily: "'Playfair Display', serif" }}
          >
            🎯 Our Mission
          </h2>

          <p className="leading-relaxed" style={{ color: "#8b5a2b" }}>
            During emergencies, people often panic and waste precious time
            searching for help. Rakshasetu was built to make emergency support
            faster, smarter, and easier to access.
            <br /><br />
            We aim to create a safer digital environment where users can
            instantly connect to emergency contacts, verified helplines, safe
            navigation routes, and nearby help centers with just a few taps.
          </p>
        </div>

        {/* WOMEN SAFETY */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-14"
          style={{
            background: "rgba(92,51,23,0.28)",
            border: "1px solid rgba(196,132,60,0.2)",
            borderLeft: "4px solid #d4954a",
          }}
        >
          <h2
            className="text-3xl font-bold mb-5"
            style={{ color: "#f0d0a0", fontFamily: "'Playfair Display', serif" }}
          >
            👩 Women Safety Protection
          </h2>

          <p className="leading-relaxed" style={{ color: "#8b5a2b" }}>
            Rakshasetu provides a dedicated Women Safety section where users can
            instantly access verified women helpline numbers, emergency contacts,
            and SOS support services.
            <br /><br />
            Users can quickly call emergency services such as 1091, 181, and 112
            during unsafe situations without wasting time searching online.
          </p>
        </div>

        {/* FEATURES */}
        <div className="mb-16">
          <h2
            className="text-4xl font-black mb-10 text-center"
            style={{ fontFamily: "'Playfair Display', serif", color: "#faf3e8" }}
          >
            ✨ What We Offer
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="rounded-3xl p-7 transition-all hover:-translate-y-1"
                style={cardStyle}
              >
                <div className="text-5xl mb-5">{feature.icon}</div>

                <h3
                  className="font-bold text-xl mb-3"
                  style={{ color: "#f0d0a0", fontFamily: "'Playfair Display', serif" }}
                >
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: "#8b5a2b" }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* HOW SOS WORKS */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-12"
          style={{
            background: "rgba(92,51,23,0.25)",
            border: "1px solid rgba(196,132,60,0.2)",
          }}
        >
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: "#f0d0a0", fontFamily: "'Playfair Display', serif" }}
          >
            🚨 How SOS Protection Works
          </h2>

          <div className="space-y-5">
            {[
              "Users securely save trusted emergency contacts on Rakshasetu.",
              "If users feel unsafe, they can instantly press the SOS button.",
              "Rakshasetu automatically tracks the user's live GPS location.",
              "The user's emergency contact receives the live location instantly.",
              "Users can also access nearby hospitals, police stations, and safer routes.",
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                  style={{ background: "#d4954a", color: "#110a04" }}
                >
                  {i + 1}
                </div>
                <p className="leading-relaxed pt-1" style={{ color: "#8b5a2b" }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BENEFITS */}
        <div className="rounded-3xl p-8 md:p-10 mb-14" style={cardStyle}>
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: "#f0d0a0", fontFamily: "'Playfair Display', serif" }}
          >
            💡 Why Use Rakshasetu?
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              "Fast emergency assistance during unsafe situations",
              "Real-time location sharing with trusted contacts",
              "Easy access to verified emergency helpline numbers",
              "Safer navigation and route recommendations",
              "Nearby hospitals and police station tracking",
              "Danger-zone awareness through heat maps",
              "Simple, secure, and user-friendly experience",
              "Designed especially for women safety and protection",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-lg" style={{ color: "#d4954a" }}>✔</span>
                <p className="text-sm leading-relaxed" style={{ color: "#8b5a2b" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* STAR RATING */}
        <div
          className="rounded-3xl p-8 md:p-10 mb-14 text-center"
          style={cardStyle}
        >
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: "#f0d0a0", fontFamily: "'Playfair Display', serif" }}
          >
            ⭐ Rate Your Experience
          </h2>

          <p className="mb-8" style={{ color: "#8b5a2b" }}>
            Your feedback helps us improve Rakshasetu.
          </p>

          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                style={{
                  fontSize: "52px",
                  cursor: "pointer",
                  transition: "0.2s",
                  color: star <= (hover || rating) ? "#FFD700" : "#5a3b1a",
                }}
              >
                ★
              </span>
            ))}
          </div>

          <button
            onClick={submitFeedback}
            style={{
              background: "linear-gradient(135deg, #c4843c, #d4954a)",
              color: "#110a04",
              padding: "14px 34px",
              borderRadius: "14px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              boxShadow: "0 4px 18px rgba(196,132,60,0.3)",
            }}
          >
            Submit Feedback
          </button>
        </div>

        {/* DATA ACCURACY */}
        <div className="rounded-3xl p-8 md:p-10 mb-14" style={cardStyle}>
          <h2
            className="text-3xl font-bold mb-5"
            style={{ color: "#f0d0a0", fontFamily: "'Playfair Display', serif" }}
          >
            ✅ Trusted & Verified Information
          </h2>

          <p className="leading-relaxed" style={{ color: "#8b5a2b" }}>
            All emergency numbers and safety services available on Rakshasetu
            are sourced from verified Government of India portals and trusted
            public safety platforms including official emergency helpline
            websites.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-block font-bold px-10 py-5 rounded-2xl text-lg transition-all hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, #c4843c, #d4954a)",
              color: "#110a04",
              boxShadow: "0 4px 20px rgba(196,132,60,0.35)",
              fontFamily: "'Lato', sans-serif",
            }}
          >
            Explore Rakshasetu →
          </Link>
        </div>

      </div>
    </div>
  );
}