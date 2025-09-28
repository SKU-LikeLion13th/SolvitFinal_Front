import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MatchLayout from "../components/MatchLayout";
import API from "../utils/axios";
import { API_URL } from "../utils/config";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await API.get("/log/status", {
          withCredentials: true,
        });
        if (response.data && response.data.name) {
          navigate("/MatchInfo", { replace: true });
        }
      } catch (error) {
        console.log("로그인 상태가 아닙니다.", error);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleLogin = () => {
    // URL에서 from 파라미터 확인
    const urlParams = new URLSearchParams(window.location.search);
    const fromPage = urlParams.get("from");

    console.log("로그인 시작, fromPage:", fromPage);

    // MatchHistory에서 왔다면 여러 곳에 저장
    if (fromPage === "matchhistory") {
      sessionStorage.setItem("loginFromPage", "matchhistory");
      localStorage.setItem("loginFromPage", "matchhistory");
      console.log("여러 곳에 matchhistory 저장");
    }

    // OAuth state에 리다이렉트 정보 포함
    let redirectPath;
    if (fromPage === "matchhistory") {
      redirectPath = "/MatchHistory";
    } else {
      redirectPath = "/MatchInfo";
    }

    // 백엔드가 이 URL로 리다이렉트하도록 설정
    const redirectUrl = `${window.location.origin}${redirectPath}`;
    const encodedRedirect = encodeURIComponent(redirectUrl);

    console.log("OAuth로 이동, 최종 리다이렉트:", redirectPath);
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
