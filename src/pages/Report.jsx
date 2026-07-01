import { useState } from "react";
import Navbar from "../components/Navbar";
import { analyzePollution } from "../services/gemini";
import { saveReport } from "../services/saveReport";

export default function Report() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);


  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        alert("Location permission denied");
      }
    );
  }


  async function handleAnalyze() {
    if (!description.trim() || !image) {
      alert("Please add description and image");
      return;
    }

    setLoading(true);
    setResult(null);

    try {

      setMessage("🤖 AI is analyzing pollution...");

      const aiResult = await analyzePollution(description, image);

      setMessage("☁️ Saving report...");

      await saveReport({
        description,
        pollutionType: aiResult.pollutionType,
        severity: aiResult.severity,
        healthRisk: aiResult.healthRisk,
        recommendation: aiResult.recommendation,
        latitude: location?.latitude || null,
        longitude: location?.longitude || null,
      });


      setResult(aiResult);

      setMessage("✅ Report saved successfully!");

    } catch (error) {

      console.error(error);
      setMessage("❌ Something went wrong");

    }

    setLoading(false);
  }


  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">


        <h1 className="text-4xl font-bold text-green-700 mb-2">
          📷 Report Pollution
        </h1>


        <p className="text-gray-600 mb-8">
          Describe pollution in your area and AI will analyze it.
        </p>


        <input
          type="file"
          accept="image/*"
          className="w-full border p-3 rounded-lg mb-6"
          onChange={(e) => setImage(e.target.files[0])}
        />


        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Pollution preview"
            className="w-64 h-64 object-cover rounded-xl mb-6"
          />
        )}


        <button
          onClick={getLocation}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl mb-6"
        >
          📍 Get My Location
        </button>


        {location && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border">
            <p className="font-semibold">
              📍 Location Captured
            </p>
            <p>
              Latitude: {location.latitude}
            </p>
            <p>
              Longitude: {location.longitude}
            </p>
          </div>
        )}


        <textarea
          rows="5"
          className="w-full border p-3 rounded-lg mb-6"
          placeholder="Example: Garbage dumped near the park, foul smell in air..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />


        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-semibold"
        >
          {loading ? "Processing..." : "🤖 Analyze with AI"}
        </button>


        {message && (
          <div className="mt-5 p-4 bg-blue-50 rounded-xl border">
            {message}
          </div>
        )}


        {result && (
          <div className="mt-8 p-6 bg-green-50 rounded-xl border">

            <h2 className="text-2xl font-bold mb-4">
              AI Analysis Result
            </h2>

            <p>
              <strong>Pollution Type:</strong> {result.pollutionType}
            </p>

            <p>
              <strong>Severity:</strong> {result.severity}%
            </p>

            <p>
              <strong>Health Risk:</strong> {result.healthRisk}
            </p>

            <p>
              <strong>Recommendation:</strong> {result.recommendation}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}