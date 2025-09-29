import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../utils/axios";
import { API_URL } from "../../utils/config";

export default function MenuList() {
  const [isVisible, setIsVisible] = useState(false);
  const [exitAnimation, setExitAnimation] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isFromSubmenu = location.state?.fromSubmenu;
    if (!isFromSubmenu) {
      setIsVisible(true);
    }

    // 로그인된 유저 정보 가져오기
    const fetchUserName = async () => {
      try {
        const res = await API.get("/log/status", { withCredentials: true });
        if (res.data?.name) {
          setUserName(res.data.name);
        }
      } catch (error) {
        console.error("유저 정보 가져오기 실패", error);
      }
    };

    fetchUserName();
  }, [location]);

  // 로그인 처리 (OAuth)
  const handleLogin = () => {
    const fromPage =
      location.state?.from ||
      new URLSearchParams(window.location.search).get("from");

    let redirectPath;
    if (fromPage === "matchhistory") {
      redirectPath = "/MenuList/MatchHistory";
    } else {
      redirectPath = "/";
    }

    const redirectUrl = `${window.location.origin}${redirectPath}`;
    const encodedRedirect = encodeURIComponent(redirectUrl);

    window.location.href = `${API_URL}/oauth2/authorization/google?state=${encodedRedirect}`;
  };

  const handleLogout = async () => {
    try {
      await API.post("/log/out", { withCredentials: true });
      setUserName(""); // 로그아웃 시 초기화
      navigate("/", { replace: true });
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const animateAndNavigate = (path, animationType) => {
    setExitAnimation(animationType);
    setTimeout(() => {
      console.log(`Navigate to: ${path}`);
      navigate(path);
    }, 400);
  };

  const goInfo = () => animateAndNavigate("/MenuList/Info", "slideLeft");
  const goTeam = () => animateAndNavigate("/MenuList/Team", "slideLeft");
  const goManager = () => animateAndNavigate("/MenuList/Manager", "slideLeft");
  const goMatchHistory = () => {
    if (!userName) {
      alert("로그인 후 조회 가능합니다.");
      return; // 이동 막기
    }
    animateAndNavigate("/MenuList/MatchHistory", "slideLeft");
  };

  const goHome = () => animateAndNavigate("/", "slideUp");

  const shouldAnimate = !location.state?.fromSubmenu;

  return (
    <>
      <style>
        {`
          @keyframes slideDown {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes slideUp {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(-100%);
              opacity: 0;
            }
          }

          @keyframes slideLeft {
            0% {
              transform: translateX(0);
              opacity: 1;
            }
            100% {
              transform: translateX(-100%);
              opacity: 0;
            }
          }

          @keyframes slideRight {
            0% {
              transform: translateX(0);
              opacity: 1;
            }
            100% {
              transform: translateX(100%);
              opacity: 0;
            }
          }

          @keyframes fadeOut {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0.9);
            }
          }

          @keyframes zoomOut {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(0.3);
              opacity: 0;
            }
          }

          @keyframes rotateOut {
            0% {
              transform: rotate(0deg) scale(1);
              opacity: 1;
            }
            100% {
              transform: rotate(180deg) scale(0.5);
              opacity: 0;
            }
          }

          .animate-slideDown {
            animation: slideDown 0.4s ease-out forwards;
          }

          .animate-slideUp {
            animation: slideUp 0.6s ease-in forwards;
          }

          .animate-slideLeft {
            animation: slideLeft 0.6s ease-in-out forwards;
          }

          .animate-slideRight {
            animation: slideRight 0.6s ease-in-out forwards;
          }

          /* 버튼 기본 효과만 유지 */
          .menu-button {
            transition: transform 0.1s ease;
          }
        `}
      </style>
      <div
        className={`min-h-screen bg-[#161616] ${
          exitAnimation
            ? `animate-${exitAnimation}`
            : shouldAnimate
            ? "animate-slideDown"
            : ""
        }`}
      >
        <div className="h-full">
          <div className="px-8 pb-12 py-8">
            <div className="cursor-pointer" onClick={goHome}>
              <img
                src="/assets/images/Header/Back.png"
                className="w-[20px] h-[16px]"
                alt="back"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center fontSB text-[15px] h-screen space-y-6 -mt-28">
            <div
              className="cursor-pointer text-[#121212] bg-white w-[55%] text-center rounded-full py-2 hover:bg-gray-100 transition-colors"
              onClick={goManager}
            >
              영암체전 기획자
            </div>
            <div
              className="cursor-pointer text-[#121212] bg-white w-[55%] text-center rounded-full py-2 hover:bg-gray-100 transition-colors"
              onClick={goTeam}
            >
              웹사이트 제작자
            </div>
            <div
              className="cursor-pointer text-[#121212] bg-white w-[55%] text-center rounded-full py-2 hover:bg-gray-100 transition-colors"
              onClick={goInfo}
            >
              승부예측 상품안내
            </div>
            <div
              className="cursor-pointer text-[#121212] bg-white w-[55%] text-center rounded-full py-2 hover:bg-gray-100 transition-colors"
              onClick={goMatchHistory}
            >
              응모내역 확인
            </div>

            {/* 로그인 여부에 따라 버튼 분기 */}
            {userName ? (
              <div
                className="flex text-white text-[13px] fontMedium cursor-pointer hover:text-gray-300 transition-colors"
                onClick={handleLogout}
              >
                {userName}님{" "}
                <span className="text-[#808080] mx-1 fontRegular">|</span>{" "}
                LOGOUT
              </div>
            ) : (
              <div
                className="flex text-white text-[14px] fontMedium cursor-pointer hover:text-gray-300 transition-colors"
                onClick={handleLogin}
              >
                LOGIN
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
