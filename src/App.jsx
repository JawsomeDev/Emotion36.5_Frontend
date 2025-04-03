import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AnalyzePage from "./pages/AnalyzePage"
import CommunityPage from "./pages/CommunityPage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import RecordWritePage from "./pages/RecordWritePage"
import { ToastContainer } from "react-toastify"
import RecordListPage from "./pages/RecordListPage"

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/record" element={<RecordWritePage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/record/list/:id" element={<RecordListPage/>}/>
        </Routes>
      </div>
      <Footer/>
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  )
}
