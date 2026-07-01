import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Hero() {

  const [totalReports, setTotalReports] = useState(0);
  const [highRisk, setHighRisk] = useState(0);
  const [resolved, setResolved] = useState(0);


  useEffect(() => {
    async function fetchStats() {
      const snapshot = await getDocs(collection(db, "reports"));

      const reports = snapshot.docs.map((doc) => doc.data());

      setTotalReports(reports.length);

      setHighRisk(
        reports.filter(
          (report) => Number(report.severity) >= 70
        ).length
      );

      setResolved(
        reports.filter(
          (report) => report.status === "Resolved"
        ).length
      );
    }

    fetchStats();
  }, []);


  return (
    <section className="text-center py-20 px-6 bg-gradient-to-br from-green-100 via-white to-blue-100">

      <h1 className="text-6xl font-extrabold text-green-700">
        🌍 CleanAir Sentinel
      </h1>


      <p className="mt-6 text-2xl text-gray-700 max-w-3xl mx-auto">
        Empowering citizens to report pollution using AI and helping cities
        become cleaner through real-time environmental monitoring.
      </p>


      <div className="mt-10 flex justify-center gap-4">

        <Link
          to="/report"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg"
        >
          📷 Report Pollution
        </Link>


        <Link
          to="/map"
          className="border-2 border-green-600 text-green-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-100"
        >
          🗺️ View Pollution Map
        </Link>

      </div>



      <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">


        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl">
            📷
          </h2>

          <h3 className="font-bold mt-3">
            Total Reports
          </h3>

          <p className="text-4xl text-green-600 mt-3">
            {totalReports}
          </p>
        </div>



        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl">
            🌫️
          </h2>

          <h3 className="font-bold mt-3">
            High Risk Zones
          </h3>

          <p className="text-4xl text-red-600 mt-3">
            {highRisk}
          </p>
        </div>



        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl">
            ✅
          </h2>

          <h3 className="font-bold mt-3">
            Resolved Cases
          </h3>

          <p className="text-4xl text-blue-600 mt-3">
            {resolved}
          </p>
        </div>


      </div>


    </section>
  );
}