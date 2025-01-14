import { Rocket } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16">
          <div className="flex justify-center mb-8">
            <Rocket className="w-20 h-20 text-indigo-600 animate-bounce" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Welcome to the User Registration Portal
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10">
            Simplify user management with a modern and intuitive platform. Register new users seamlessly and explore the dashboard to manage them effortlessly.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a
              href="/register"
              className="px-8 py-4 bg-indigo-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300"
            >
              Register Now
            </a>
            <a
              href="/dashboard"
              className="px-8 py-4 bg-white text-indigo-600 font-semibold text-lg border-2 border-indigo-600 rounded-full shadow-lg hover:bg-indigo-50 hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300"
            >
              View Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
