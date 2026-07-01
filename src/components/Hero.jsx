import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>

        <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>

        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      </div>

      <div className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>

          <h1 className="text-6xl font-extrabold leading-tight text-green-700">
            🌍 CleanAir
            <br />
            Sentinel
          </h1>

          <p className="mt-6 text-xl text-gray-700 leading-relaxed">
            AI-powered pollution monitoring platform that helps citizens
            report environmental problems, analyze pollution using AI,
            visualize hotspots, and assist authorities in taking action.
          </p>

          <div className="mt-8 flex gap-5 flex-wrap">

            <Link
              to="/report"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition duration-300 hover:scale-105"
            >
              📷 Report Pollution
            </Link>

            <Link
              to="/map"
              className="border-2 border-green-600 text-green-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-100 transition duration-300 hover:scale-105"
            >
              🗺️ View Map
            </Link>

          </div>

          <div className="mt-10 grid grid-cols-2 gap-5">

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-5 hover:-translate-y-2 transition duration-300">

              <div className="text-4xl">🤖</div>

              <h3 className="font-bold mt-3">
                AI Analysis
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                Intelligent pollution detection powered by Gemini AI.
              </p>

            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-5 hover:-translate-y-2 transition duration-300">

              <div className="text-4xl">📍</div>

              <h3 className="font-bold mt-3">
                GPS Tracking
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                Accurate location-based pollution reporting.
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-100 p-8">

            <div className="text-center">

              <div className="text-8xl animate-bounce">
                🌍
              </div>

              <h2 className="text-3xl font-bold text-green-700 mt-4">
                Live Environment Monitor
              </h2>

              <p className="text-gray-600 mt-3">
                Smart monitoring powered by Artificial Intelligence
              </p>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="rounded-xl bg-green-50 p-5 text-center hover:scale-105 transition">
                <div className="text-3xl">🤖</div>
                <h3 className="font-bold mt-2">AI Engine</h3>
                <p className="text-green-600 font-semibold">READY</p>
              </div>

              <div className="rounded-xl bg-blue-50 p-5 text-center hover:scale-105 transition">
                <div className="text-3xl">📍</div>
                <h3 className="font-bold mt-2">GPS</h3>
                <p className="text-blue-600 font-semibold">ACTIVE</p>
              </div>

              <div className="rounded-xl bg-yellow-50 p-5 text-center hover:scale-105 transition">
                <div className="text-3xl">☁️</div>
                <h3 className="font-bold mt-2">Firebase</h3>
                <p className="text-yellow-600 font-semibold">CONNECTED</p>
              </div>

              <div className="rounded-xl bg-red-50 p-5 text-center hover:scale-105 transition">
                <div className="text-3xl">🛰️</div>
                <h3 className="font-bold mt-2">Monitoring</h3>
                <p className="text-red-600 font-semibold">LIVE</p>
              </div>

            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white p-5 flex justify-between items-center shadow-lg">

              <div>

                <h3 className="font-bold text-lg">
                  🟢 System Status
                </h3>

                <p className="text-green-100">
                  All monitoring services operational
                </p>

              </div>

              <div className="text-5xl animate-pulse">
                ⚡
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}