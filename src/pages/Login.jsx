import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MatchLayout from "../components/MatchLayout";
import API from "../utils/axios";
import { API_URL } from "../utils/config";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 상태 체크
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await API.get("/log/status", {
          withCredentials: true,
        });
        if (response.data && response.data.name) {
          // 이미 로그인 상태라면 redirect
          const redirectPath = location.state?.from || "/MenuList/MatchInfo";
          navigate(redirectPath, { replace: true });
        }
      } catch (error) {
        console.log("로그인 상태가 아닙니다.", error);
      }
    };

    checkLoginStatus();
  }, [navigate, location.state]);

  const handleLogin = () => {
    // location.state.from 또는 URL query에서 from 확인
    const fromPage = location.state?.from || new URLSearchParams(window.location.search).get("from");

    let redirectPath;
    if (fromPage === "matchhistory") {
      redirectPath = "/MenuList/MatchHistory";
    } else {
      redirectPath = "/MatchInfo";
    }

    // OAuth state에 리다이렉트 정보 포함
    const redirectUrl = `${window.location.origin}${redirectPath}`;
    const encodedRedirect = encodeURIComponent(redirectUrl);

    console.log("OAuth로 이동, 최종 리다이렉트:", redirectPath);

    // 백엔드 OAuth 호출
    window.location.href = `${API_URL}/oauth2/authorization/google?state=${encodedRedirect}`;
  };

  return (
    <MatchLayout>
      <div className="flex flex-col items-center w-full h-screen">
        <div className="flex flex-col items-center mt-[5%] mb-[50%]">
          <div className="text-[#0073FF] text-[20px] fontMedium">청춘열전</div>
          <div className="text-2xl text-white sm:text-3xl fontSB">
            결승전 승부예측
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-4 text-sm text-white fontRegular">
            로그인이 필요한 서비스입니다.
          </div>
          <button
            className="flex items-center bg-[#0073FF] text-white font px-10 py-1.5 rounded-2xl"
            onClick={handleLogin}
          >
            <img
              src="/assets/images/SchoolLogo.png"
              className="w-[30px] mr-4"
              alt=""
            />
            Login with Sungkyul
          </button>
        </div>
      </div>
    </MatchLayout>
  );
}
