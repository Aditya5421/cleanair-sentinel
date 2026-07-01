export default function Footer() {
  return (
    <footer className="bg-green-700 text-white mt-16">

      <div className="max-w-7xl mx-auto px-8 py-10 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-bold">
            🌍 CleanAir Sentinel
          </h2>

          <p className="mt-3 text-green-100">
            AI-powered pollution monitoring and reporting
            platform for cleaner communities.
          </p>
        </div>


        <div>
          <h3 className="font-bold text-lg">
            Technology
          </h3>

          <p className="mt-3 text-green-100">
            React • Firebase • Gemini AI • Maps
          </p>
        </div>


        <div>
          <h3 className="font-bold text-lg">
            Mission
          </h3>

          <p className="mt-3 text-green-100">
            Using technology to build a cleaner
            environment.
          </p>
        </div>

      </div>


      <div className="border-t border-green-500 text-center py-4">
        © 2026 CleanAir Sentinel. All rights reserved.
      </div>

    </footer>
  );
}