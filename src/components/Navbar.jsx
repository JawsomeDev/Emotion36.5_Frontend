import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import {
  Thermometer,
  BarChart2,
  Youtube,
  Users,
  Menu,
  X,
  History,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-black" />
          <span className="font-semibold">내 감정온도</span>
          <span className="font-black">36.5도</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/record" className="flex items-center gap-1 hover:underline">
            <Thermometer className="w-4 h-4" /> 감정 기록
          </Link>

          {user && (
            <Link to={`/record/list/${user.id}`} className="flex items-center gap-1 hover:underline">
              <History className="w-4 h-4" /> 기록 보기
            </Link>
          )}

          <Link to="/analyze" className="flex items-center gap-1 hover:underline">
            <BarChart2 className="w-4 h-4" /> 분석 보기
          </Link>
          <Link to="/content" className="flex items-center gap-1 hover:underline">
            <Youtube className="w-4 h-4" /> 콘텐츠 추천
          </Link>
          <Link to="/community" className="flex items-center gap-1 hover:underline">
            <Users className="w-4 h-4" /> 커뮤니티
          </Link>

          {user ? (
            <>
              <span className="text-sm">{user.nickname}님</span>
              <button onClick={logout} className="ml-2 border px-2 py-1 rounded hover:bg-gray-100">
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/login" className="border border-gray-300 rounded px-2 py-1 hover:bg-gray-100">
              로그인
            </Link>
          )}
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-6 space-y-4 text-sm font-medium animate-fade-in">
          <Link to="/record" className="flex items-center gap-2">
            <Thermometer className="w-4 h-4" /> 감정 기록
          </Link>

          {user && (
            <Link to={`/record/list/${user.id}`} className="flex items-center gap-2">
              <History className="w-4 h-4" /> 기록 보기
            </Link>
          )}

          <Link to="/analyze" className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4" /> 분석 보기
          </Link>
          <Link to="/content" className="flex items-center gap-2">
            <Youtube className="w-4 h-4" /> 콘텐츠 추천
          </Link>
          <Link to="/community" className="flex items-center gap-2">
            <Users className="w-4 h-4" /> 커뮤니티
          </Link>

          {user ? (
            <span className="text-sm font-medium text-gray-800">👋 {user.nickname}님</span>
          ) : (
            <Link to="/login" className="border border-gray-300 rounded px-2 py-1 hover:bg-gray-100">
              로그인
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
