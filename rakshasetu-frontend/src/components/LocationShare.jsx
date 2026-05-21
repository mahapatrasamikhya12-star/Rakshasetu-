import { useState } from "react";

export default function LocationShare() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const getLocation = () => {
    setLoading(true);
    setError("");
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setLocation({ latitude, longitude, accuracy });
        setLoading(false);
      },
      (err) => {
        setError("Could not get location. Please allow location access.");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const copyLocation = () => {
    if (!location) return;
    const text = `My location: https://maps.google.com/?q=${location.latitude},${location.longitude}\nCoordinates: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappShare = () => {
    if (!location) return;
    const msg = encodeURIComponent(`🆘 I need help! My current location:\nhttps://maps.google.com/?q=${location.latitude},${location.longitude}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  const mapsOpen = () => {
    if (!location) return;
    window.open(`https://maps.google.com/?q=${location.latitude},${location.longitude}`, "_blank");
  };

  return (
    <div className="rounded-2xl p-6 border border-orange-500/30"
      style={{ background: "rgba(249,115,22,0.08)", backdropFilter: "blur(10px)" }}>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">📍</span>
        <div>
          <h3 className="text-white font-bold text-lg">Share Your Location</h3>
          <p className="text-gray-400 text-sm">Get your GPS coordinates to share with emergency services or family</p>
        </div>
      </div>

      {!location && (
        <button
          onClick={getLocation}
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-white transition-all"
          style={{ background: loading ? "rgba(249,115,22,0.4)" : "rgba(249,115,22,0.8)" }}>
          {loading ? "📡 Getting your location..." : "📍 Get My Location"}
        </button>
      )}

      {error && (
        <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
      )}

      {location && (
        <div className="mt-4 space-y-3">
          {/* Coordinates box */}
          <div className="bg-black/30 rounded-xl p-4 font-mono text-sm">
            <p className="text-gray-400 text-xs mb-1">YOUR COORDINATES</p>
            <p className="text-green-400 font-bold text-base">
              {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </p>
            <p className="text-gray-500 text-xs mt-1">Accuracy: ~{Math.round(location.accuracy)} meters</p>
          </div>

          <p className="text-yellow-300 text-xs text-center font-medium">
            ⚠️ Read these coordinates out to the emergency operator (112) when asked for your location
          </p>

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button onClick={copyLocation}
              className="py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: copied ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.1)" }}>
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
            <button onClick={whatsappShare}
              className="py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: "rgba(37,211,102,0.25)" }}>
              💬 WhatsApp
            </button>
            <button onClick={mapsOpen}
              className="py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: "rgba(59,130,246,0.25)" }}>
              🗺️ Maps
            </button>
          </div>

          <button onClick={() => setLocation(null)}
            className="w-full py-2 rounded-xl text-sm text-gray-400 hover:text-white border border-white/10 transition-all">
            🔄 Refresh Location
          </button>
        </div>
      )}
    </div>
  );
}