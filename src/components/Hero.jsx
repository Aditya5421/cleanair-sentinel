import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">

        <div>

          <h1 className="text-6xl font-extrabold leading-tight text-green-700">
            🌍 CleanAir
            <br />
            Sentinel
          </h1>


          <p className="mt-6 text-xl text-gray-700 leading-relaxed">
            An AI-powered pollution monitoring platform that helps citizens
            report environmental problems, analyze pollution using AI,
            and track hotspots in real time.
          </p>



          <div className="mt-8 flex gap-5 flex-wrap">


            <Link
              to="/report"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition"
            >
              📷 Report Pollution
            </Link>



            <Link
              to="/map"
              className="border-2 border-green-600 text-green-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-100 transition"
            >
              🗺️ View Map
            </Link>


          </div>


          <div className="mt-10 grid grid-cols-2 gap-4">


            <div className="bg-white shadow-lg rounded-2xl p-5">
              <h2 className="text-3xl font-bold text-green-700">
                🤖 AI
              </h2>
              <p className="text-gray-600">
                Smart pollution detection
              </p>
            </div>



            <div className="bg-white shadow-lg rounded-2xl p-5">
              <h2 className="text-3xl font-bold text-blue-700">
                📍 GPS
              </h2>
              <p className="text-gray-600">
                Location based reporting
              </p>
            </div>


          </div>


        </div>



        {/* Right Illustration */}

        <div className="relative">


          <div className="bg-white rounded-3xl shadow-2xl p-8">

            <img
              src="/icons.svg"
              alt="environment"
              className="w-full h-72 object-contain"
            />


            <div className="mt-6 text-center">

              <h2 className="text-3xl font-bold text-green-700">
                Cleaner Cities
              </h2>

              <p className="text-gray-600 mt-2">
                Powered by Artificial Intelligence
              </p>

            </div>


          </div>



        </div>


      </div>



      {/* Statistics */}

      <div className="max-w-6xl mx-auto px-8 pb-16 grid md:grid-cols-4 gap-6">


        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-4xl font-bold text-green-700">
            AI
          </h2>
          <p className="text-gray-600 mt-2">
            Pollution Analysis
          </p>
        </div>


        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-4xl font-bold text-blue-700">
            📍
          </h2>
          <p className="text-gray-600 mt-2">
            Location Tracking
          </p>
        </div>



        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-4xl font-bold text-red-600">
            🌫️
          </h2>
          <p className="text-gray-600 mt-2">
            Pollution Detection
          </p>
        </div>



        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-4xl font-bold text-green-700">
            ♻️
          </h2>
          <p className="text-gray-600 mt-2">
            Sustainable Future
          </p>
        </div>


      </div>


    </section>
  );
}