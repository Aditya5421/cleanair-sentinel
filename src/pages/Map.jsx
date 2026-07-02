import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* Fix Leaflet icons */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

/* ---------------- HELPERS ---------------- */

function getSeverityColor(severity) {
  const s = Number(severity || 0);
  if (s >= 70) return "red";
  if (s >= 40) return "yellow";
  return "green";
}

function createIcon(severity) {
  return new L.Icon({
    iconUrl: `https://maps.google.com/mapfiles/ms/icons/${getSeverityColor(
      severity
    )}-dot.png`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
}

/* Fly animation */
function FlyTo({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 12, { duration: 1.5 });
    }
  }, [coords]);

  return null;
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function Map() {
  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [flyTo, setFlyTo] = useState(null);

  const [userCity, setUserCity] = useState("");
  const [userCoords, setUserCoords] = useState(null);

  const [satellite, setSatellite] = useState(false);

  /* ---------------- AUTO DETECT USER LOCATION ---------------- */

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      setUserCoords([lat, lon]);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );

        const data = await res.json();

        const city =
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          data.address?.state;

        if (city) {
          setUserCity(city.toLowerCase());
        }
      } catch (err) {
        console.error(err);
      }
    });
  }, []);

  /* ---------------- FETCH FIREBASE DATA ---------------- */

  useEffect(() => {
    async function fetchData() {
      const snap = await getDocs(collection(db, "reports"));

      const data = snap.docs
        .map((d) => d.data())
        .filter((r) => r.latitude && r.longitude);

      setReports(data);

      // AUTO FILTER BY USER CITY
      if (userCity) {
        const cityData = data.filter(
          (r) => (r.city || "").toLowerCase() === userCity
        );

        setFiltered(cityData.length ? cityData : data);
      } else {
        setFiltered(data);
      }
    }

    fetchData();
  }, [userCity]);

  /* ---------------- SEARCH CITY MANUAL OVERRIDE ---------------- */

  async function handleSearch() {
    if (!search) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${search}`
      );

      const data = await res.json();

      if (data.length > 0) {
        const lat = Number(data[0].lat);
        const lon = Number(data[0].lon);

        setFlyTo([lat, lon]);

        const filteredCity = reports.filter((r) => {
          return (
            Math.abs(r.latitude - lat) < 2 &&
            Math.abs(r.longitude - lon) < 2
          );
        });

        setFiltered(filteredCity.length ? filteredCity : reports);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  /* Reset */
  function resetView() {
    setFiltered(reports);
    setSearch("");
  }

  /* Stats */
  const stats = useMemo(() => {
    let high = 0,
      medium = 0,
      low = 0;

    reports.forEach((r) => {
      const s = Number(r.severity || 0);
      if (s >= 70) high++;
      else if (s >= 40) medium++;
      else low++;
    });

    return { high, medium, low, total: reports.length };
  }, [reports]);

  const tileUrl = satellite
    ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-700">
              🗺️ CleanAir Sentinel Map
            </h1>
            <p className="text-gray-600">
              Auto-detect city: {userCity || "Detecting..."}
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-2 mt-4 md:mt-0 flex-wrap">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city..."
              className="border px-3 py-2 rounded-lg"
            />

            <button
              onClick={handleSearch}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              {loading ? "Searching..." : "Search"}
            </button>

            <button
              onClick={resetView}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Reset
            </button>

            <button
              onClick={() => setSatellite(!satellite)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {satellite ? "Street" : "Satellite"}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow">
            Total: {stats.total}
          </div>
          <div className="bg-red-100 p-4 rounded-xl shadow">
            High: {stats.high}
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl shadow">
            Medium: {stats.medium}
          </div>
          <div className="bg-green-100 p-4 rounded-xl shadow">
            Low: {stats.low}
          </div>
        </div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden shadow">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            className="h-[600px] w-full"
          >
            <TileLayer url={tileUrl} />

            {flyTo && <FlyTo coords={flyTo} />}
            {userCoords && <FlyTo coords={userCoords} />}

            {filtered.map((r, i) => (
              <Marker
                key={i}
                position={[r.latitude, r.longitude]}
                icon={createIcon(r.severity)}
              >
                <Popup>
                  <div className="w-60">
                    <h2 className="font-bold">
                      🚨 {r.pollutionType}
                    </h2>
                    <p>Severity: {r.severity}%</p>
                    <p>Risk: {r.healthRisk}</p>
                    <p className="text-sm mt-2">
                      {r.recommendation}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

      </div>
    </div>
  );
}