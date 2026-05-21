import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const INITIAL_INCIDENTS = [
  { id: 1, area: "Saheed Nagar", city: "Bhubaneswar", type: "Harassment", count: 12, level: "high" },
  { id: 2, area: "Patia", city: "Bhubaneswar", type: "Theft", count: 7, level: "medium" },
  { id: 3, area: "Khandagiri", city: "Bhubaneswar", type: "Safe Area", count: 2, level: "low" },
  { id: 4, area: "Lanka", city: "Varanasi", type: "Harassment", count: 5, level: "medium" },
  { id: 5, area: "Assi Ghat", city: "Varanasi", type: "Unsafe at night", count: 9, level: "high" },
  { id: 6, area: "Sigra", city: "Varanasi", type: "Safe Area", count: 1, level: "low" },
  { id: 7, area: "Connaught Place", city: "Delhi", type: "Harassment", count: 15, level: "high" },
  { id: 8, area: "Dwarka", city: "Delhi", type: "Safe Area", count: 2, level: "low" },
];

export default function Heatmap() {
  const [userLocation, setUserLocation] = useState("");
  const [safeAreas, setSafeAreas] = useState([]);
  const [unsafeAreas, setUnsafeAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { getLocation(); }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const city =
            data.address.city || data.address.town ||
            data.address.village || data.address.state || "Unknown";
          setUserLocation(city);
          analyzeSafety(city);
        } catch (e) {
          console.log(e);
          setError("Failed to fetch location");
        }
        setLoading(false);
      },
      (e) => {
        console.log(e);
        setError("Please allow location access");
        setLoading(false);
      }
    );
  };

  const analyzeSafety = (city) => {
    const cityData = INITIAL_INCIDENTS.filter(
      item => item.city.toLowerCase() === city.toLowerCase()
    );
    setUnsafeAreas(cityData.filter(item => item.level === "high" || item.level === "medium"));
    setSafeAreas(cityData.filter(item => item.level === "low"));
  };

  /* ── shared styles ── */
  const cardBase = {
    background: "rgba(44,24,16,0.6)",
    border: "1px solid rgba(196,132,60,0.18)",
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #110a04 0%, #2c1810 50%, #1e1008 100%)" }}
    >
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Title */}
        <div className="text-center mb-10">
          <h1
            className="text-5xl font-black mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "#faf3e8" }}
          >
            🔥 Safety Heatmap
          </h1>
          <p className="text-lg" style={{ color: "#8b5a2b" }}>
            Real-time nearby area safety analysis
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-2xl py-20" style={{ color: "#c4843c" }}>
            Detecting your location...
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="text-center py-4 rounded-2xl mb-8"
            style={{
              background: "rgba(192,57,43,0.12)",
              border: "1px solid rgba(192,57,43,0.25)",
              color: "#e74c3c",
            }}
          >
            {error}
          </div>
        )}

        {/* Current Location */}
        {!loading && !error && (
          <div
            className="rounded-2xl p-6 mb-10 text-center"
            style={cardBase}
          >
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: "#f0d0a0" }}
            >
              📍 Your Current Location
            </h2>
            <p
              className="text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "#c4843c" }}
            >
              {userLocation}
            </p>
          </div>
        )}

        {/* Safe / Unsafe Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Safe Areas */}
            <div
              className="rounded-3xl p-6"
              style={{
                background: "rgba(46,125,82,0.1)",
                border: "1px solid rgba(46,125,82,0.25)",
              }}
            >
              <h2
                className="text-3xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: "#2ecc71" }}
              >
                ✅ Safe Areas
              </h2>
              <div className="space-y-4">
                {safeAreas.length > 0 ? (
                  safeAreas.map(area => (
                    <div
                      key={area.id}
                      className="rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(46,125,82,0.15)" }}
                    >
                      <h3
                        className="text-2xl font-bold"
                        style={{ fontFamily: "'Playfair Display', serif", color: "#faf3e8" }}
                      >
                        {area.area}
                      </h3>
                      <p className="mt-2" style={{ color: "#2ecc71" }}>Low crime reports</p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#5c3317" }}>No safe areas found nearby</p>
                )}
              </div>
            </div>

            {/* Unsafe Areas */}
            <div
              className="rounded-3xl p-6"
              style={{
                background: "rgba(192,57,43,0.1)",
                border: "1px solid rgba(192,57,43,0.22)",
              }}
            >
              <h2
                className="text-3xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: "#e74c3c" }}
              >
                ⚠️ Unsafe Areas
              </h2>
              <div className="space-y-4">
                {unsafeAreas.length > 0 ? (
                  unsafeAreas.map(area => (
                    <div
                      key={area.id}
                      className="rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(192,57,43,0.15)" }}
                    >
                      <h3
                        className="text-2xl font-bold"
                        style={{ fontFamily: "'Playfair Display', serif", color: "#faf3e8" }}
                      >
                        {area.area}
                      </h3>
                      <p className="mt-2" style={{ color: "#e74c3c" }}>⚠️ {area.type}</p>
                      <p className="text-sm mt-1" style={{ color: "#7a4419" }}>{area.count} reports</p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#5c3317" }}>No unsafe areas found nearby</p>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}