import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CommunityPage from "./pages/CommunityPage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import RecordWritePage from "./pages/RecordWritePage"
import { ToastContainer } from "react-toastify"
import RecordListPage from "./pages/RecordListPage"
import LoginPage from "./pages/LoginPage"
import RequireAuth from "./components/RequireAuth"
import RecommendedContentList from "./components/RecommendedContentList"
import EmotionAnalysisPage from "./pages/EmotionAnalysisPage"
import ContentPage from "./pages/ContentPage"


export default function App() {
  
  
  
  return (
    <Router>
    <Navbar />
    <div className="pt-20">
      <Routes>
        {/* 인증이 필요한 페이지들 */}
        <Route
          path="/record"
          element={
            <RequireAuth>
              <RecordWritePage />
            </RequireAuth>
          }
        />
        <Route
          path="/record/list/:id"
          element={
            <RequireAuth>
              <RecordListPage />
            </RequireAuth>
          }
        />
        <Route
          path="/analyze"
          element={
            <RequireAuth>
              <EmotionAnalysisPage />
            </RequireAuth>
          }
        />
        <Route
          path="/community"
          element={
            <RequireAuth>
              <CommunityPage />
            </RequireAuth>
          }
        />
        <Route
          path="/content"
          element={
            <RequireAuth>
              <ContentPage/>
            </RequireAuth>
          }
        />

        {/* 인증 없이 접근 가능한 페이지들 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
    <Footer />
    <ToastContainer position="top-center" autoClose={3000} />
  </Router>
  )
}
