import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RecordPage from "./pages/RecordPage"
import AnalyzePage from "./pages/AnalyzePage"
import CommunityPage from "./pages/CommunityPage"
import Navbar from "./components/Navbar"

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Routes>
      </div>
    </Router>
  )
}
