import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WomenSafety from "./pages/WomenSafety";
import About from "./pages/About";
import Heatmap from "./pages/Heatmap";
import SafeMap from "./pages/SafeMap";
import SOS from "./pages/SOS";
import EmergencyContact from "./pages/EmergencyContact";

export default function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/women-safety"
        element={<WomenSafety />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/heatmap"
        element={<Heatmap />}
      />

      <Route
        path="/safe-map"
        element={<SafeMap />}
      />

      <Route
        path="/sos"
        element={<SOS />}
      />

      <Route
        path="/emergency-contact"
        element={<EmergencyContact />}
      />

    </Routes>
  );
}