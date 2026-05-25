import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

const RELATIONS = ["Mother", "Father", "Sister", "Brother", "Friend", "Husband", "Other"];

export default function EmergencyContact() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", relation: "Mother" });
  const [saved, setSaved] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [locating, setLocating] = useState(false);
  const [step, setStep] = useState("");
  const [sirenActive, setSirenActive] = useState(false);
  const sirenRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("emergencyContacts");
    if (stored) setContacts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    return () => {
      if (sirenRef.current) {
        sirenRef.current.pause();
        sirenRef.current = null;
      }
    };
  }, []);

  const playSiren = () => {
    const audio = new Audio("/sounds/sound.mp3");
    audio.loop = true;
    audio.volume = 1.0;
    audio.play().catch((err) => console.log("Audio error:", err));
    return audio;
  };

  const stopSiren = () => {
    if (sirenRef.current) {
      sirenRef.current.pause();
      sirenRef.current.currentTime = 0;
      sirenRef.current = null;
    }
    setSirenActive(false);
  };

  const saveContact = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    if (form.phone.replace(/\D/g, "").length !== 10) {
      alert("Please enter a valid 10 digit phone number.");
      return;
    }
    if (contacts.length >= 5) {
      alert("Maximum 5 emergency contacts allowed.");
      return;
    }
    const newContacts = [...contacts, { ...form, id: Date.now() }];
    setContacts(newContacts);
    localStorage.setItem("emergencyContacts", JSON.stringify(newContacts));
    setForm({ name: "", phone: "", relation: "Mother" });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const deleteContact = (id) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    localStorage.setItem("emergencyContacts", JSON.stringify(updated));
  };

  const sendSOSToAll = () => {
    if (contacts.length === 0) {
      alert("Please add at least one emergency contact first.");
      return;
    }

    // START SIREN immediately using sound.mp3
    setSirenActive(true);
    sirenRef.current = playSiren();

    setLocating(true);
    setStep("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const locationLink = "https://maps.google.com/?q=" + lat + "," + lon;

        const message =
          "🆘 SOS ALERT! I need immediate help!\n\n" +
          "📍 My live location:\n" +
          locationLink +
          "\n\nPlease call me or dial 112 immediately.\n— Sent via Rakshasetu Safety App";

        setStep("Sending SMS to all contacts...");

        contacts.forEach((contact, index) => {
          const phone = contact.phone.replace(/\D/g, "");
          setTimeout(() => {
            window.open(
              "sms:+91" + phone + "?body=" + encodeURIComponent(message),
              "_blank"
            );
          }, index * 800);
        });

        setTimeout(() => {
          setStep("Sending WhatsApp backup...");
          contacts.forEach((contact, index) => {
            const phone = contact.phone.replace(/\D/g, "");
            const waNumber = phone.startsWith("91") ? phone : "91" + phone;
            setTimeout(() => {
              window.open(
                "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(message),
                "_blank"
              );
            }, index * 1000);
          });

          setLocating(false);
          setStep("");
          setSosSent(true);
          setTimeout(() => setSosSent(false), 6000);
        }, contacts.length * 800 + 500);
      },
      () => {
        const message =
          "🆘 SOS ALERT! I need immediate help!\n\n" +
          "Please call me or dial 112 immediately.\n" +
          "— Sent via Rakshasetu Safety App";

        contacts.forEach((contact, index) => {
          const phone = contact.phone.replace(/\D/g, "");
          setTimeout(() => {
            window.open(
              "sms:+91" + phone + "?body=" + encodeURIComponent(message),
              "_blank"
            );
          }, index * 800);
        });

        setTimeout(() => {
          contacts.forEach((contact, index) => {
            const phone = contact.phone.replace(/\D/g, "");
            const waNumber = phone.startsWith("91") ? phone : "91" + phone;
            setTimeout(() => {
              window.open(
                "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(message),
                "_blank"
              );
            }, index * 1000);
          });

          setLocating(false);
          setStep("");
          setSosSent(true);
          setTimeout(() => setSosSent(false), 6000);
        }, contacts.length * 800 + 500);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 60000,
      }
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #0a0a1a, #1a1a2e, #16213e)" }}
    >
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            Emergency <span className="text-red-400">Contacts</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Save up to 5 trusted contacts. One tap triggers siren + SMS + WhatsApp with your live location.
          </p>
        </div>

        {/* How it works */}
        <div
          className="rounded-2xl p-5 mb-8 border border-white/10"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <p className="text-white font-semibold mb-3 text-sm">⚡ How SOS works:</p>
          <div className="space-y-2">
            {[
              "Press the SOS button",
              "Emergency siren starts playing loudly from your phone",
              "App gets your live GPS location",
              "Opens SMS for each contact — tap Send",
              "Sends WhatsApp with location as backup",
              "Tap Stop Siren when you are safe",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-red-400 font-bold">{i + 1}.</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
          <p className="text-yellow-400/80 text-xs mt-3 bg-yellow-500/10 px-3 py-2 rounded-lg border border-yellow-500/20">
            💡 Keep your phone volume at max for the siren to work loudly. SMS works even without internet.
          </p>
        </div>

        {/* SOS Button */}
        <div className="text-center mb-10">

          {sirenActive && (
            <div className="mb-4 bg-red-600/30 border border-red-500/50 text-red-300 py-3 px-6 rounded-2xl font-bold animate-pulse text-lg">
              🚨 SIREN ACTIVE — EMERGENCY MODE 🚨
            </div>
          )}

          <button
            onClick={sendSOSToAll}
            disabled={locating || contacts.length === 0}
            className="relative w-52 h-52 rounded-full font-black text-white transition-all active:scale-95 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: sirenActive
                ? "radial-gradient(circle, #ff0000, #7f0000)"
                : locating
                ? "radial-gradient(circle, #f97316, #ea580c)"
                : "radial-gradient(circle, #ef4444, #b91c1c)",
              boxShadow: sirenActive
                ? "0 0 100px rgba(255,0,0,0.9)"
                : locating
                ? "0 0 80px rgba(249,115,22,0.7)"
                : contacts.length > 0
                ? "0 0 80px rgba(239,68,68,0.6)"
                : "0 0 40px rgba(239,68,68,0.2)",
              animation: sirenActive ? "sirenPulse 0.5s infinite alternate" : "none",
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl">{sirenActive ? "🚨" : "🆘"}</span>
              <span className="text-2xl font-black">
                {locating ? "Sending..." : sirenActive ? "SIREN ON" : "SOS"}
              </span>
              <span className="text-xs opacity-80 font-normal px-4 text-center">
                {contacts.length === 0
                  ? "Add contacts first"
                  : "Alert " + contacts.length + " contact" + (contacts.length > 1 ? "s" : "")}
              </span>
            </div>
          </button>

          {sirenActive && (
            <button
              onClick={stopSiren}
              className="mt-5 px-10 py-3 rounded-2xl font-bold text-white border-2 border-red-500 transition-all hover:bg-red-500/20 text-lg"
            >
              🔇 Stop Siren
            </button>
          )}

          {locating && step && (
            <div className="mt-4 text-orange-400 text-sm font-medium animate-pulse">
              ⏳ {step}
            </div>
          )}

          {sosSent && (
            <div className="mt-4 bg-green-500/20 border border-green-500/30 text-green-400 py-3 px-6 rounded-2xl font-medium">
              ✅ SMS + WhatsApp sent to all {contacts.length} contacts with your location!
            </div>
          )}

          <p className="text-gray-600 text-xs mt-4">
            In immediate danger, call <strong className="text-red-400">112</strong> directly
          </p>
        </div>

        {/* Saved Contacts */}
        <div className="mb-8">
          <h2 className="text-white font-bold text-lg mb-4">
            Saved Contacts ({contacts.length}/5)
          </h2>

          {contacts.length === 0 ? (
            <div
              className="text-center py-10 rounded-2xl border border-white/10"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-4xl mb-3">👥</p>
              <p className="text-gray-400 text-sm">No contacts saved yet.</p>
              <p className="text-gray-500 text-xs mt-1">Add contacts below to enable SOS</p>
            </div>
          ) : (
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between rounded-2xl p-4 border border-white/10"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center font-black text-white text-lg flex-shrink-0">
                      {contact.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{contact.name}</p>
                      <p className="text-gray-400 text-sm">
                        {contact.relation} · +91 {contact.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={"sms:+91" + contact.phone.replace(/\D/g, "")}
                      className="text-blue-400 hover:text-blue-300 text-xl transition"
                      title="Send SMS"
                    >
                      💬
                    </a>
                    <a
                      href={"https://wa.me/91" + contact.phone.replace(/\D/g, "")}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-400 hover:text-green-300 text-xl transition"
                      title="WhatsApp"
                    >
                      📱
                    </a>
                    <a
                      href={"tel:+91" + contact.phone}
                      className="text-yellow-400 hover:text-yellow-300 text-xl transition"
                      title="Call"
                    >
                      📞
                    </a>
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="text-red-400 hover:text-red-300 text-xl transition"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Contact Form */}
        {contacts.length < 5 && (
          <div
            className="rounded-2xl p-6 border border-white/10"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <h3 className="text-white font-bold mb-4">+ Add Emergency Contact</h3>

            {saved && (
              <div className="bg-green-500/20 border border-green-500/30 text-green-400 text-sm text-center py-2 rounded-xl mb-4">
                ✅ Contact saved successfully!
              </div>
            )}

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Contact Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/50"
              />
              <input
                type="tel"
                placeholder="Phone Number (10 digits)"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
                }
                maxLength={10}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/50"
              />
              <select
                value={form.relation}
                onChange={(e) => setForm({ ...form, relation: e.target.value })}
                className="w-full bg-gray-900 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/50"
              >
                {RELATIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <button
                onClick={saveContact}
                disabled={!form.name.trim() || form.phone.length !== 10}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all disabled:opacity-40"
              >
                Save Contact
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-gray-600 text-xs mt-6">
          Contacts saved on your device only. No data sent to any server.
        </p>
      </div>

      <style>{`
        @keyframes sirenPulse {
          from { box-shadow: 0 0 80px rgba(255,0,0,0.8); }
          to   { box-shadow: 0 0 140px rgba(255,0,0,1); }
        }
      `}</style>
    </div>
  );
}
