import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../utils/axios";

export default function MenuList() {
  const [isVisible, setIsVisible] = useState(false);
  const [exitAnimation, setExitAnimation] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // location.state를 통해 이전 페이지에서 온 것인지 확인
    // 서브메뉴에서 돌아온 경우가 아닐 때만 slideDown 애니메이션 실행
    const isFromSubmenu = location.state?.fromSubmenu;

    if (!isFromSubmenu) {
      setIsVisible(true);
    }
  }, [location]);

    const handleLogout = async () => {
      try {
        const response = await API.post("/log/out", { withCredentials: true });
        console.log(response.data);
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
  const goMatchHistory = () =>
    animateAndNavigate("/MenuList/MatchHistory", "slideLeft");
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
          <div className="px-8 py-12">
            <div className="cursor-pointer" onClick={goHome}>
              <img
                src="/assets/images/Header/Back.png"
                className="w-[20px] h-[16px]"
                alt="back"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-screen space-y-6 text-lg fontSB -mt-28">
            <div
              className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5 hover:bg-gray-100 transition-colors"
              onClick={goManager}
            >
              영암체전 기획자
            </div>
            <div
              className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5 hover:bg-gray-100 transition-colors"
              onClick={goTeam}
            >
              웹사이트 제작자
            </div>
            <div
              className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5 hover:bg-gray-100 transition-colors"
              onClick={goInfo}
            >
              승부예측 상품안내
            </div>
            <div
              className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5 hover:bg-gray-100 transition-colors"
              onClick={goMatchHistory}
            >
              응모내역 확인
            </div>
            <div
              className="flex text-white text-[14px] fontMedium cursor-pointer hover:text-gray-300 transition-colors"
              onClick={handleLogout}
            >
              - Log Out -
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
