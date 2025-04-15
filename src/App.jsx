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
import EmotionAnalysisPage from "./pages/EmotionAnalysisPage"
import ContentPage from "./pages/ContentPage"
import KakaoCallback from "./components/auth/KaKaoCallback"
import ResetPasswordForm from "./components/auth/ResetPasswordForm"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import CommunityListPage from "./pages/CommunityListPage"
import CommunityPostPage from "./pages/CommunityPostPage"
import CommunityEditForm from "./components/community/CommunityEditForm"


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
              <CommunityListPage />
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
        
        <Route path="/communities/:postId" element={<RequireAuth><CommunityPostPage /></RequireAuth>}/>
        <Route path="/communities/:postId/edit" element={<RequireAuth><CommunityEditForm/></RequireAuth>}/>
        {/* 인증 없이 접근 가능한 페이지들 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/member/kakao" element={<KakaoCallback />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </div>
    <Footer />
    <ToastContainer position="top-center" autoClose={3000} />
  </Router>
  )
}
