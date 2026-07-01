import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";


const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


export default function Map() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      const snapshot = await getDocs(collection(db, "reports"));

      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (report) =>
            report.latitude && report.longitude
        );

      setReports(data);
    }

    fetchReports();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          🗺️ Pollution Map
        </h1>


        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: "500px", width: "100%" }}
        >

          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          {reports.map((report) => (

            <Marker
              key={report.id}
              position={[
                report.latitude,
                report.longitude,
              ]}
              icon={
                report.severity >= 70
                  ? redIcon
                  : greenIcon
              }
            >

              <Popup>
                <b>{report.pollutionType}</b>
                <br />
                Severity: {report.severity}%
                <br />
                Risk: {report.healthRisk}
              </Popup>

            </Marker>

          ))}


        </MapContainer>

      </div>
    </div>
  );
}