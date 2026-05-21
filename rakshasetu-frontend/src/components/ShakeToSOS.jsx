import { useEffect, useState } from "react";

export default function ShakeToSOS() {
  const [enabled, setEnabled] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let lastX = 0, lastY = 0, lastZ = 0;
    let lastTime = Date.now();

    const handleMotion = (e) => {
      const { x, y, z } = e.accelerationIncludingGravity;
      const now = Date.now();
      const diff = now - lastTime;

      if (diff > 100) {
        const deltaX = Math.abs(x - lastX);
        const deltaY = Math.abs(y - lastY);
        const deltaZ = Math.abs(z - lastZ);
        const speed = (deltaX + deltaY + deltaZ) / diff * 10000;

        if (speed > 800) {
          setShakeCount(prev => {
            const next = prev + 1;
            if (next >= 3) {
              triggerSOS();
              return 0;
            }
            return next;
          });
        }

        lastX = x; lastY = y; lastZ = z;
        lastTime = now;
      }
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [enabled]);

  const triggerSOS = () => {
    setTriggered(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const msg = `🆘 SOS! I need help! My location: https://maps.google.com/?q=${latitude},${longitude}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, "_blank");
    }, () => {
      window.open("https://wa.me/?text=🆘 SOS! I need help!", "_blank");
    });
    setTimeout(() => setTriggered(false), 5000);
  };

  const requestPermission = async () => {
    if (typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function") {
      const permission = await DeviceMotionEvent.requestPermission();
      if (permission === "granted") setEnabled(true);
    } else {
      setEnabled(true);
    }
  };

  return (
    <div className="rounded-2xl p-6 border border-red-500/30"
      style={{ background: "rgba(239,68,68,0.08)" }}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">📳</span>
        <div>
          <h3 className="text-white font-bold text-lg">Shake to SOS</h3>
          <p className="text-gray-400 text-sm">Shake phone 3 times to send emergency alert</p>
        </div>
      </div>

      {triggered && (
        <div className="bg-red-600 text-white text-center py-3 rounded-xl mb-4 font-bold animate-pulse">
          🆘 SOS Triggered! Sending location...
        </div>
      )}

      {!enabled ? (
        <button onClick={requestPermission}
          className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all">
          Enable Shake to SOS
        </button>
      ) : (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block"></span>
            Active — Shake 3 times for SOS
          </div>
          <button onClick={() => setEnabled(false)}
            className="block mx-auto mt-2 text-gray-500 text-xs hover:text-gray-300 transition">
            Disable
          </button>
        </div>
      )}
    </div>
  );
}