import SOSButton from "../components/SOSButton";

export default function SOS() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(160deg, #110a04 0%, #2c1810 50%, #1e1008 100%)" }}
    >
      <div className="text-center">
        <h1
          className="text-5xl font-black mb-4"
          style={{ fontFamily: "'Playfair Display', serif", color: "#faf3e8" }}
        >
          🚨 Emergency SOS
        </h1>
        <p className="mb-10 text-lg" style={{ color: "#8b5a2b" }}>
          Instantly alert your emergency contact with your live location.
        </p>
        <SOSButton />
      </div>
    </div>
  );
}