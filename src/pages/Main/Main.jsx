import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import BottomSheet from "../../components/BottomSheet";
import API from "../../utils/axios";
import Match_Main from "./Match_Main";

export default function Main() {
  const navigate = useNavigate();
  const targetDate = new Date("2025-10-01T09:00:00");
  const [isEnded, setIsEnded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const goToLogin = async () => {
    try {
      // 로그인 상태 확인
      const statusRes = await API.get("/log/status", { withCredentials: true });

      // 로그인 안 되어 있으면 로그인 페이지로 이동
      if (!statusRes?.data?.name) {
        navigate("/Login");
        return;
      }

      // 응모 정보 조회
      const submissionRes = await API.get("/students/submission/info", {
        withCredentials: true,
      });
      const { remainingTickets, submissions } = submissionRes.data;

      if (remainingTickets === 0) {
        alert("응모권이 없습니다.");
        return;
      }

      if (submissions && submissions.length > 0) {
        alert("이미 응모했습니다.");
        return;
      }

      // 응모 가능 시 Match 페이지로 이동
      navigate("/Match");
    } catch (error) {
      console.error(error);

      // axios 에러 구조를 안전하게 체크
      const status = error?.response?.status;

      // 로그인 안 되어 있거나 권한 없는 경우
      if (!status || status === 401 || status === 403) {
        navigate("/Login");
        return;
      }

      // 기타 에러
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="relative min-h-screen pt-12 overflow-hidden">
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }

        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }
      `}</style>

      <img
        src="/assets/images/bg_LT.png"
        className={`absolute w-[50%] top-0 left-0 ${
          isVisible ? "animate-fadeIn" : "opacity-0"
        }`}
        alt=""
      />
      <img
        src="/assets/images/bg_RB.png"
        className={`absolute w-[50%] bottom-0 right-0 ${
          isVisible ? "animate-fadeIn delay-100" : "opacity-0"
        }`}
        alt=""
      />

      <div className="absolute w-full top-2">
        <Header showMenu={true} />
      </div>

      <div
        className={`px-4 mt-16 text-center ${
          isVisible ? "animate-fadeInDown delay-200" : "opacity-0"
        }`}
      >
        <div className="text-2xl fontBold text-[#0073FF]">청춘열전</div>
        <div className="mt-1 text-3xl fontBold text-white">결승전 승부예측</div>
      </div>

      <div className="px-4 pb-20 mt-6 text-center">
        <div
          className={`flex justify-center ${
            isVisible ? "animate-scaleIn delay-300" : "opacity-0"
          }`}
        >
          <img src="/assets/images/Main.png" alt="" className="w-[70%]" />
        </div>

        <p
          className={`text-white text-[11px] fontSB mt-2 ${
            isVisible ? "animate-fadeInUp delay-400" : "opacity-0"
          }`}
        >
          성결대학교 재학생이라면?
          <br />
          승부예측 응모에 참여하고 상품 받아가자!
        </p>
        <button
          className={`text-[15px] fontSB w-[65%] rounded-2xl py-2 mt-6 transition-all duration-300 ${
            isEnded
              ? "bg-[#A9A9A9] cursor-not-allowed text-[#3C3C3C]"
              : "bg-[#0073FF] text-white hover:bg-[#0062D6] active:scale-95"
          } ${isVisible ? "animate-fadeInUp delay-500" : "opacity-0"}`}
          onClick={goToLogin}
          disabled={isEnded}
        >
          {isEnded ? "응모마감" : "응모하러 가기"}
        </button>
      </div>

      <div
        className={`${isVisible ? "animate-fadeInUp delay-300" : "opacity-0"}`}
      >
        <Match_Main />
      </div>

      <BottomSheet targetDate={targetDate} onEndChange={setIsEnded} />
    </div>
  );
}
