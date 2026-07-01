import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  async function fetchReports() {
    try {
      const snapshot = await getDocs(collection(db, "reports"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReports(data);
    } catch (error) {
      console.error("Firebase error:", error);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  async function markResolved(id) {
    try {
      await updateDoc(doc(db, "reports", id), {
        status: "Resolved",
      });

      fetchReports();
    } catch (error) {
      console.error("Update error:", error);
    }
  }

  const highRisk = reports.filter(
    (report) => Number(report.severity) >= 70
  ).length;


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          📊 Dashboard
        </h1>


        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold">
              📷 Total Reports
            </h2>

            <p className="text-4xl mt-4 text-green-600">
              {reports.length}
            </p>
          </div>


          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold">
              🌫️ High Risk Reports
            </h2>

            <p className="text-4xl mt-4 text-red-600">
              {highRisk}
            </p>
          </div>


          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold">
              ✅ System Status
            </h2>

            <p className="text-4xl mt-4 text-blue-600">
              Active
            </p>
          </div>

        </div>



        <div className="bg-white mt-10 p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            🌍 Pollution Reports
          </h2>


          {reports.length === 0 ? (
            <p>No reports found.</p>
          ) : (

            reports.map((report) => (

              <div
                key={report.id}
                className="border p-5 rounded-xl mb-5"
              >

                <p>
                  <b>Type:</b> {report.pollutionType}
                </p>


                <p>
                  <b>Severity:</b> {report.severity}%
                </p>


                <p>
                  <b>Health Risk:</b> {report.healthRisk}
                </p>


                <p>
                  <b>Recommendation:</b> {report.recommendation}
                </p>


                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={
                      report.status === "Resolved"
                        ? "text-green-600 font-bold"
                        : "text-yellow-600 font-bold"
                    }
                  >
                    {report.status || "Pending"}
                  </span>
                </p>


                {report.status !== "Resolved" && (
                  <button
                    onClick={() => markResolved(report.id)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                  >
                    ✅ Mark as Resolved
                  </button>
                )}

              </div>

            ))

          )}

        </div>

      </div>
    </div>
  );
}