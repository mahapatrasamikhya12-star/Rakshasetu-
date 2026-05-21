import { useState } from "react";

export default function CabSafety() {
  const [cabNumber, setCabNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [company, setCompany] = useState("Ola");
  const [sent, setSent] = useState(false);

  const shareOnWhatsApp = () => {
    if (!cabNumber.trim()) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const msg =
        `🚗 Cab Safety Update\n\n` +
        `I'm boarding a cab. Details:\n` +
        `🏢 Company: ${company}\n` +
        `🔢 Cab Number: ${cabNumber.toUpperCase()}\n` +
        `${driverName ? `👤 Driver: ${driverName}\n` : ""}` +
        `📍 Current Location: https://maps.google.com/?q=${latitude},${longitude}\n\n` +
        `Please track me until I reach safely. 🙏`;
      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, () => {
      const msg =
        `🚗 Cab Safety Update\n\n` +
        `I'm boarding a cab. Details:\n` +
        `🏢 Company: ${company}\n` +
        `🔢 Cab Number: ${cabNumber.toUpperCase()}\n` +
        `${driverName ? `👤 Driver: ${driverName}\n` : ""}` +
        `Please track me until I reach safely. 🙏`;
      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    });
  };

  return (
    <div className="rounded-2xl p-6 border border-orange-500/30"
      style={{ background: "rgba(249,115,22,0.08)" }}>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl">🚗</span>
        <div>
          <h3 className="text-white font-bold text-lg">Cab Safety Check</h3>
          <p className="text-gray-400 text-sm">Share cab details with family via WhatsApp</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <select
          value={company}
          onChange={e => setCompany(e.target.value)}
          className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/50"
        >
          {["Ola", "Uber", "Rapido", "Auto", "Other"].map(c => (
            <option key={c} value={c} className="bg-gray-900">{c}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Cab Number (e.g. OD05 AB 1234)"
          value={cabNumber}
          onChange={e => setCabNumber(e.target.value)}
          className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/50"
        />

        <input
          type="text"
          placeholder="Driver Name (optional)"
          value={driverName}
          onChange={e => setDriverName(e.target.value)}
          className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/50"
        />
      </div>

      <button
        onClick={shareOnWhatsApp}
        disabled={!cabNumber.trim()}
        className="w-full py-3 rounded-xl font-bold text-white transition-all disabled:opacity-40"
        style={{ background: "linear-gradient(135deg, #25d366, #128c7e)" }}
      >
        {sent ? "✅ Shared!" : "📲 Share on WhatsApp"}
      </button>
    </div>
  );
}