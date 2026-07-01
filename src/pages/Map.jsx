import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function Map() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      const snapshot = await getDocs(collection(db, "reports"));

      const data = snapshot.docs
        .map((doc) => doc.data())
        .filter(
          (report) =>
            report.latitude &&
            report.longitude
        );

      setReports(data);
    }

    fetchReports();
  }, []);

  function getIcon(severity) {
    if (severity >= 70) {
      return new L.Icon({
        iconUrl:
          "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        iconSize: [32, 32],
      });
    }

    if (severity >= 40) {
      return new L.Icon({
        iconUrl:
          "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
        iconSize: [32, 32],
      });
    }

    return new L.Icon({
      iconUrl:
        "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
      iconSize: [32, 32],
    });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          🗺️ Pollution Map
        </h1>

        <div className="rounded-2xl overflow-hidden shadow-xl">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: "600px", width: "100%" }}
          >

            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {reports.map((report, index) => (
              <Marker
                key={index}
                position={[
                  report.latitude,
                  report.longitude,
                ]}
                icon={getIcon(report.severity)}
              >

                <Popup>
                  <h2 className="font-bold">
                    🚨 {report.pollutionType}
                  </h2>

                  <p>
                    Severity: {report.severity}%
                  </p>

                  <p>
                    Health Risk: {report.healthRisk}
                  </p>

                  <p>
                    {report.recommendation}
                  </p>
                </Popup>

              </Marker>
            ))}

          </MapContainer>
        </div>
      </div>
    </div>
  );
}