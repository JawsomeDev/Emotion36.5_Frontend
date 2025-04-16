import React, { useState } from "react"
import { Thermometer } from "lucide-react"
import ServiceIntroModal from "./common/ServiceIntroModal"
import PrivacyPolicyModal from "./common/PrivacyPolicyModal";
import TermsOfServiceModal from "./common/TermsOfServiceModal";

export default function Footer() {

  const [showIntro, setShowIntro] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <footer className="bg-gray-50 text-center text-sm text-gray-500 py-10 mt-20">
      <div className="flex justify-center items-center gap-2 mb-2 text-black font-bold text-lg">
        <Thermometer className="w-5 h-5" /> 내 감정온도 36.5도
      </div>
      <p className="mb-2">"오늘 하루도 수고했어요. 당신의 감정은 소중합니다."</p>
      <div className="space-x-4 mb-2">
      <button onClick={() => setShowIntro(true)} className="hover:underline font-medium">
          서비스 소개
        </button>
        <button onClick={() => setShowPrivacy(true)} className="hover:underline font-medium">
          개인정보처리방침
        </button>
        <button onClick={() => setShowTerms(true)} className="hover:underline font-medium">
          이용약관
        </button>
      </div>
      <p className="text-xs">© 2025 내 감정온도 36.5도. All rights reserved.</p>
      <ServiceIntroModal isOpen={showIntro} onClose={() => setShowIntro(false)} />
      <PrivacyPolicyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <TermsOfServiceModal isOpen={showTerms} onClose={() => setShowTerms(false)}/>
    </footer>
  )
}
