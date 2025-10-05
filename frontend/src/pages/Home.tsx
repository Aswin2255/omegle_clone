import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();
  const onlinePlayers = 0; // Dummy count for now

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      {/* Navbar */}
 <Navbar/>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ChatConnect
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with strangers from around the world through video chat
              and text messaging. Start conversations, make new friends, and
              discover different cultures.
            </p>
          </div>

          {/* Online Players Counter */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
              <span className="text-white text-lg font-medium">
                <span className="text-2xl font-bold text-green-400">
                  {onlinePlayers.toLocaleString()}
                </span>{" "}
                people online now
              </span>
            </div>
          </div>

          {/* Start Chat Button */}
          <div className="mb-12">
            <button
              onClick={() => navigate("/chat")}
              className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
            >
              <svg
                className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Start Chatting
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>

    
        </div>
      </main>

      {/* Footer */}
 <Footer/>
    </div>
  );
}

export default Home;
