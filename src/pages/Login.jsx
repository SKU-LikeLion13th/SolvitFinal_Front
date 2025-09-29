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
          const response = await API.get("/log/status", { withCredentials: true });

          if (response.data?.name) {
            // 로그인 상태라면 응모권 체크
            const submissionRes = await API.get("/students/submission/info", { withCredentials: true });
            const { remainingTickets } = submissionRes.data;

            if (remainingTickets === 0) {
              setTimeout(() => {
                window.alert("응모권이 없습니다.");
                navigate("/", { replace: true });
              }, 50);
              return;
            }

            // 응모권 있으면 원래 가던 페이지로 이동
            const fromPage =
              location.state?.from ||
              new URLSearchParams(window.location.search).get("from");

            let redirectPath;
            if (fromPage === "matchhistory") {
              redirectPath = "/MenuList/MatchHistory";
            } else {
              redirectPath = "/MenuList/MatchInfo"; // 기본 이동
            }

            navigate(redirectPath, { replace: true });
          }
        } catch (error) {
          console.log("로그인 상태가 아닙니다.", error);
        }
      };

      checkLoginStatus();
    }, [navigate, location]);

  const handleLogin = () => {
    const fromPage =
      location.state?.from || new URLSearchParams(window.location.search).get("from");

    let redirectPath;
    if (fromPage === "matchhistory") {
      redirectPath = "/MenuList/MatchHistory";
    } else {
      redirectPath = "/";
    }

    const redirectUrl = `${window.location.origin}${redirectPath}`;
    const encodedRedirect = encodeURIComponent(redirectUrl);

    // OAuth 로그인
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
