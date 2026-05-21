import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const RELATIONS = ["Mother", "Father", "Sister", "Brother", "Friend", "Husband", "Other"];

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", relation: "Mother" });
  const [saved, setSaved] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("emergencyContacts");
    if (stored) setContacts(JSON.parse(stored));
  }, []);

  const saveContact = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
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
    setLocating(true);

    const sendMessages = (locationText) => {
      const message =
        "SOS ALERT!\n\nI need immediate help!\n\n" +
        locationText +
        "\n\nPlease contact me or call 112 immediately.\n\n— Sent via Rakshasetu";

      contacts.forEach((contact, index) => {
        const phone = contact.phone.replace(/\D/g, "");
        const whatsappNumber = phone.startsWith("91") ? phone : "91" + phone;
        setTimeout(() => {
          window.open(
            "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message),
            "_blank"
          );
        }, index * 1500);
      });

      setLocating(false);
      setSosSent(true);
      setTimeout(() => setSosSent(false), 5000);
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const locationText =
          "My current location:\nhttps://maps.google.com/?q=" + lat + "," + lon;
        sendMessages(locationText);
      },
      () => {
        sendMessages("I need help! (Location unavailable)");
      }
    );
  };

  /* ── shared card style ── */
  const cardStyle = {
    background: "rgba(44,24,16,0.6)",
    border: "1px solid rgba(196,132,60,0.18)",
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(26,16,8,0.8)",
    border: "1px solid rgba(196,132,60,0.2)",
    color: "#faf3e8",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "'Lato', sans-serif",
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #110a04 0%, #2c1810 50%, #1e1008 100%)" }}
    >
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Title */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-black mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: "#faf3e8" }}
          >
            Emergency <span style={{ color: "#c4843c" }}>Contacts</span>
          </h1>
          <p className="text-sm" style={{ color: "#7a4419" }}>
            Save up to 5 trusted contacts. One tap sends your live location to all of them.
          </p>
        </div>

        {/* SOS Button */}
        <div className="text-center mb-10">
          <button
            onClick={sendSOSToAll}
            disabled={locating || contacts.length === 0}
            className="relative w-48 h-48 rounded-full font-black text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: locating
                ? "radial-gradient(circle, #d4954a, #8b5a2b)"
                : "radial-gradient(circle, #c0392b, #7b241c)",
              boxShadow: locating
                ? "0 0 60px rgba(212,149,74,0.5), 0 0 0 12px rgba(212,149,74,0.1)"
                : "0 0 60px rgba(192,57,43,0.45), 0 0 0 12px rgba(192,57,43,0.1)",
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-5xl">🆘</span>
              <span
                className="text-lg font-black"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {locating ? "Locating..." : "SOS"}
              </span>
              <span className="text-xs opacity-80 font-normal">
                {contacts.length === 0
                  ? "Add contacts first"
                  : "Alert " + contacts.length + " contact" + (contacts.length > 1 ? "s" : "")}
              </span>
            </div>
          </button>

          {sosSent && (
            <div
              className="mt-4 py-3 px-6 rounded-2xl font-medium text-sm"
              style={{
                background: "rgba(46,125,82,0.2)",
                border: "1px solid rgba(46,125,82,0.35)",
                color: "#2ecc71",
              }}
            >
              SOS sent to all {contacts.length} contacts with your location!
            </div>
          )}

          <p className="text-xs mt-4" style={{ color: "#5c3317" }}>
            Sends live GPS location via WhatsApp to all saved contacts
          </p>
        </div>

        {/* Saved Contacts */}
        <div className="mb-8">
          <h2
            className="font-bold text-lg mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "#f0d0a0" }}
          >
            Saved Contacts ({contacts.length}/5)
          </h2>

          {contacts.length === 0 ? (
            <div className="text-center py-8 rounded-2xl" style={cardStyle}>
              <p className="text-4xl mb-3">👥</p>
              <p className="text-sm" style={{ color: "#7a4419" }}>No contacts saved yet.</p>
              <p className="text-xs mt-1" style={{ color: "#5c3317" }}>Add contacts below to enable SOS</p>
            </div>
          ) : (
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between rounded-2xl p-4 transition-all hover:-translate-y-0.5"
                  style={cardStyle}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg"
                      style={{
                        background: "linear-gradient(135deg, #c4843c, #d4954a)",
                        color: "#110a04",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {contact.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold" style={{ color: "#faf3e8" }}>{contact.name}</p>
                      <p className="text-sm" style={{ color: "#7a4419" }}>
                        {contact.relation} · +91 {contact.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={"https://wa.me/91" + contact.phone.replace(/\D/g, "")}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xl transition hover:scale-110"
                      title="WhatsApp"
                    >💬</a>
                    <a
                      href={"tel:" + contact.phone}
                      className="text-xl transition hover:scale-110"
                      title="Call"
                    >📞</a>
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="text-xl transition hover:scale-110"
                      title="Delete"
                    >🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Contact Form */}
        {contacts.length < 5 && (
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h3
              className="font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "#f0d0a0" }}
            >
              + Add Emergency Contact
            </h3>

            {saved && (
              <div
                className="text-sm text-center py-2 rounded-xl mb-4"
                style={{
                  background: "rgba(46,125,82,0.2)",
                  border: "1px solid rgba(46,125,82,0.35)",
                  color: "#2ecc71",
                }}
              >
                Contact saved successfully!
              </div>
            )}

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Contact Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(196,132,60,0.6)"}
                onBlur={e => e.target.style.borderColor = "rgba(196,132,60,0.2)"}
              />
              <input
                type="tel"
                placeholder="Phone Number (10 digits)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                maxLength={10}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(196,132,60,0.6)"}
                onBlur={e => e.target.style.borderColor = "rgba(196,132,60,0.2)"}
              />
              <select
                value={form.relation}
                onChange={(e) => setForm({ ...form, relation: e.target.value })}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                {RELATIONS.map((r) => (
                  <option key={r} value={r} style={{ background: "#1e1008" }}>{r}</option>
                ))}
              </select>
              <button
                onClick={saveContact}
                disabled={!form.name.trim() || !form.phone.trim()}
                className="w-full py-3 rounded-xl font-bold transition-all disabled:opacity-40 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #c0392b, #922b21)",
                  color: "white",
                  fontFamily: "'Lato', sans-serif",
                  boxShadow: "0 4px 14px rgba(192,57,43,0.3)",
                }}
              >
                Save Contact
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs mt-6" style={{ color: "#5c3317" }}>
          Contacts are saved on your device. In immediate danger, call{" "}
          <strong style={{ color: "#e74c3c" }}>112</strong>
        </p>
      </div>
    </div>
  );
}