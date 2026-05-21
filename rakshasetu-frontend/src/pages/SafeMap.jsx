import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Navbar from "../components/Navbar";
import "leaflet/dist/leaflet.css";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const policeIcon = L.divIcon({
  html: `<div style="font-size:28px;line-height:1">👮</div>`,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const hospitalIcon = L.divIcon({
  html: `<div style="font-size:28px;line-height:1">🏥</div>`,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const pharmacyIcon = L.divIcon({
  html: `<div style="font-size:28px;line-height:1">💊</div>`,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const userIcon = L.divIcon({
  html: `<div style="width:16px;height:16px;background:#c4843c;border:3px solid #faf3e8;border-radius:50%;box-shadow:0 0 10px rgba(196,132,60,0.8)"></div>`,
  className: "",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 14);
  }, [position, map]);
  return null;
}

export default function SafeMap() {
  const [userPosition, setUserPosition] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [destination, setDestination] = useState("");
  const [routeInfo, setRouteInfo] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserPosition(coords);
        setLoading(false);
        fetchNearbyPlaces(pos.coords.latitude, pos.coords.longitude, "all");
      },
      () => {
        setError("Please allow location access to use this feature.");
        setLoading(false);
        setUserPosition([20.2961, 85.8245]);
        fetchNearbyPlaces(20.2961, 85.8245, "all");
      }
    );
  }, []);

  const fetchNearbyPlaces = async (lat, lon, filter) => {
    setPlaces([]);
    const radius = 2000;
    const queries = [];

    if (filter === "all" || filter === "hospital") {
      queries.push(fetch(
        `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:${radius},${lat},${lon});out 5;`
      ).then(r => r.json()).then(d => d.elements.map(e => ({ ...e, placeType: "hospital" }))));
    }
    if (filter === "all" || filter === "police") {
      queries.push(fetch(
        `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=police](around:${radius},${lat},${lon});out 5;`
      ).then(r => r.json()).then(d => d.elements.map(e => ({ ...e, placeType: "police" }))));
    }
    if (filter === "all" || filter === "pharmacy") {
      queries.push(fetch(
        `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=pharmacy](around:${radius},${lat},${lon});out 5;`
      ).then(r => r.json()).then(d => d.elements.map(e => ({ ...e, placeType: "pharmacy" }))));
    }

    try {
      const results = await Promise.all(queries);
      setPlaces(results.flat());
    } catch (err) {
      console.error("Failed to fetch places:", err);
    }
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (userPosition) fetchNearbyPlaces(userPosition[0], userPosition[1], filter);
  };

  const getDirections = (lat, lon, name) => {
    if (!userPosition) return;
    const url = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_foot&route=${userPosition[0]},${userPosition[1]};${lat},${lon}`;
    window.open(url, "_blank");
    setRouteInfo(`Directions to ${name} opened in new tab`);
    setTimeout(() => setRouteInfo(""), 3000);
  };

  const searchDestination = async () => {
    if (!destination.trim()) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json&limit=1`
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const url = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_foot&route=${userPosition[0]},${userPosition[1]};${lat},${lon}`;
        window.open(url, "_blank");
        setRouteInfo(`Route to ${display_name.split(",")[0]} opened!`);
        setTimeout(() => setRouteInfo(""), 4000);
      } else {
        setError("Location not found. Try a more specific name.");
        setTimeout(() => setError(""), 3000);
      }
    } catch {
      setError("Could not find route. Try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const getIcon = (type) => {
    if (type === "hospital") return hospitalIcon;
    if (type === "police") return policeIcon;
    return pharmacyIcon;
  };

  const getEmoji = (type) => {
    if (type === "hospital") return "🏥";
    if (type === "police") return "👮";
    return "💊";
  };

  const filters = [
    { id: "all", label: "All Safe Places" },
    { id: "hospital", label: "🏥 Hospitals" },
    { id: "police", label: "👮 Police" },
    { id: "pharmacy", label: "💊 Pharmacies" },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #110a04 0%, #2c1810 50%, #1e1008 100%)" }}
    >
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Title */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-black mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: "#faf3e8" }}
          >
            Safe <span style={{ color: "#c4843c" }}>Places Map</span>
          </h1>
          <p className="text-sm" style={{ color: "#7a4419" }}>
            Nearest hospitals, police stations and pharmacies
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 justify-center mb-4 flex-wrap">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => handleFilter(f.id)}
              className="px-4 py-2 rounded-full text-sm font-bold transition-all"
              style={
                activeFilter === f.id
                  ? {
                      background: "linear-gradient(135deg, #c4843c, #d4954a)",
                      color: "#110a04",
                      border: "1px solid transparent",
                      boxShadow: "0 4px 14px rgba(196,132,60,0.35)",
                    }
                  : {
                      background: "transparent",
                      color: "#8b5a2b",
                      border: "1px solid rgba(196,132,60,0.25)",
                    }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Route Planner */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter destination for safe route (e.g. AIIMS Bhubaneswar)"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            onKeyDown={e => e.key === "Enter" && searchDestination()}
            className="flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all"
            style={{
              background: "rgba(26,16,8,0.8)",
              border: "1px solid rgba(196,132,60,0.2)",
              color: "#faf3e8",
              fontFamily: "'Lato', sans-serif",
            }}
            onFocus={e => e.target.style.borderColor = "rgba(196,132,60,0.6)"}
            onBlur={e => e.target.style.borderColor = "rgba(196,132,60,0.2)"}
          />
          <button
            onClick={searchDestination}
            className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #c4843c, #d4954a)",
              color: "#110a04",
              boxShadow: "0 4px 14px rgba(196,132,60,0.3)",
              fontFamily: "'Lato', sans-serif",
            }}
          >
            Get Route
          </button>
        </div>

        {/* Route Info */}
        {routeInfo && (
          <div
            className="text-center py-2 rounded-xl mb-4 text-sm"
            style={{
              background: "rgba(46,125,82,0.15)",
              border: "1px solid rgba(46,125,82,0.3)",
              color: "#2ecc71",
            }}
          >
            ✅ {routeInfo}
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="text-center py-2 rounded-xl mb-4 text-sm"
            style={{
              background: "rgba(192,57,43,0.12)",
              border: "1px solid rgba(192,57,43,0.25)",
              color: "#e74c3c",
            }}
          >
            {error}
          </div>
        )}

        {/* Map */}
        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{
            height: "420px",
            border: "1px solid rgba(196,132,60,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {loading ? (
            <div
              className="h-full flex items-center justify-center"
              style={{ background: "#1e1008" }}
            >
              <div className="text-center">
                <div
                  className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3"
                  style={{ borderColor: "#c4843c", borderTopColor: "transparent" }}
                ></div>
                <p style={{ color: "#8b5a2b" }}>Getting your location...</p>
              </div>
            </div>
          ) : (
            <MapContainer
              center={userPosition || [20.2961, 85.8245]}
              zoom={14}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {userPosition && (
                <>
                  <RecenterMap position={userPosition} />
                  <Marker position={userPosition} icon={userIcon}>
                    <Popup><strong>You are here</strong></Popup>
                  </Marker>
                </>
              )}
              {places.map((place, i) => (
                <Marker key={i} position={[place.lat, place.lon]} icon={getIcon(place.placeType)}>
                  <Popup>
                    <div style={{ minWidth: "160px" }}>
                      <strong>{place.tags?.name || "Unnamed"}</strong>
                      <br />
                      <small style={{ color: "#555" }}>
                        {place.tags?.["addr:street"] || place.placeType}
                      </small>
                      <br />
                      <button
                        onClick={() => getDirections(place.lat, place.lon, place.tags?.name || place.placeType)}
                        style={{
                          marginTop: "6px",
                          background: "linear-gradient(135deg, #c4843c, #d4954a)",
                          color: "#110a04",
                          border: "none",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        Get Directions →
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        {/* Places List */}
        {places.length > 0 && (
          <div>
            <h3
              className="font-bold mb-3"
              style={{ fontFamily: "'Playfair Display', serif", color: "#f0d0a0" }}
            >
              {places.length} Nearby Safe Places Found
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {places.map((place, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 flex items-center justify-between transition-all hover:-translate-y-0.5"
                  style={{
                    background: "rgba(44,24,16,0.6)",
                    border: "1px solid rgba(196,132,60,0.18)",
                  }}
                >
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#faf3e8" }}>
                      {getEmoji(place.placeType)} {place.tags?.name || "Unnamed Location"}
                    </p>
                    <p className="text-xs mt-1 capitalize" style={{ color: "#7a4419" }}>
                      {place.placeType}
                    </p>
                  </div>
                  <button
                    onClick={() => getDirections(place.lat, place.lon, place.tags?.name)}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80 whitespace-nowrap"
                    style={{
                      color: "#c4843c",
                      border: "1px solid rgba(196,132,60,0.3)",
                      background: "rgba(196,132,60,0.08)",
                      fontFamily: "'Lato', sans-serif",
                    }}
                  >
                    Directions →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {places.length === 0 && !loading && (
          <div className="text-center py-6 text-sm" style={{ color: "#5c3317" }}>
            No places found nearby. Try zooming out or changing filter.
          </div>
        )}

        <p className="text-center text-xs mt-6" style={{ color: "#3d2314" }}>
          Powered by OpenStreetMap — 100% free, no API key needed
        </p>
      </div>
    </div>
  );
}