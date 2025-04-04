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
import LoginPage from "./pages/LoginPage"
import RequireAuth from "./components/RequireAuth"
import RecommendedContentList from "./components/RecommendedContentList"


export default function App() {
  
  
  
  return (
          <Router>
                <Navbar />
                <div className="pt-20">
                  <Routes>
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
                <AnalyzePage />
              </RequireAuth>
            }
          />
           <Route
            path="/content"
            element={
              <RequireAuth>
                <RecommendedContentList />
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
          <Route path="/" element={<HomePage />} />
          <Route path="/record" element={<RecordWritePage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/content" element={<RecommendedContentList/>}/>
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/record/list/:id" element={<RecordListPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </div>
      <Footer/>
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  )
}
