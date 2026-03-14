import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-[url('/home.jpg')] bg-cover bg-center bg-no-repeat p-6">
      
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-white mb-8">
          Student Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          <Link to="/announcements">
            <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-6 hover:scale-105 transition">
              <h2 className="text-xl font-semibold mb-2">
                📢 Announcements
              </h2>
              <p className="text-gray-600">
                View latest updates from administration
              </p>
            </div>
          </Link>

          <Link to="/cafe">
            <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-6 hover:scale-105 transition">
              <h2 className="text-xl font-semibold mb-2">
                ☕ Cafe Booking
              </h2>
              <p className="text-gray-600">
                Reserve your cafeteria slot
              </p>
            </div>
          </Link>

          <Link to="/marketplace">
            <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-6 hover:scale-105 transition">
              <h2 className="text-xl font-semibold mb-2">
                🛒 Marketplace
              </h2>
              <p className="text-gray-600">
                Buy and sell student items
              </p>
            </div>
          </Link>

        </div>

      </div>
    </div>
  );
}