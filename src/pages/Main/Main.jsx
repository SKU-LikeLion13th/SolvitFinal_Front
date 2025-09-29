import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import BottomSheet from "../../components/BottomSheet";
import API from "../../utils/axios";
import Match_Main from "./Match_Main";

export default function Main() {
  const navigate = useNavigate();
  const targetDate = new Date("2025-10-01T09:00:00");
  const [isEnded, setIsEnded] = useState(false);

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
      const submissionRes = await API.get("/students/submission/info", { withCredentials: true });
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
      <img
        src="/assets/images/bg_LT.png"
        className="absolute w-[50%] top-0 left-0"
        alt=""
      />
      <img
        src="/assets/images/bg_RB.png"
        className="absolute w-[50%] bottom-0 right-0"
        alt=""
      />

      <div className="absolute w-full top-6">
        <Header showMenu={true} />
      </div>

      <div className="px-4 mt-10 text-center">
        <div className="text-[22.5px] fontMedium text-[#0073FF]">청춘열전</div>
        <div className="text-[27px] text-white fontMedium">
          결승전 승부예측
        </div>
      </div>

      <div className="px-4 pb-20 mt-6 text-center">
        <div className="flex justify-center">
          <img src="/assets/images/Main.png" alt="" className="w-[70%]" />
        </div>
        <p className="text-white text-[11px] fontMedium mt-2">
          성결대학교 재학생이라면?
          <br />
          승부예측 응모에 참여하고 상품 받아가자!
        </p>
        <button
          className={`text-[15px] fontSB w-[65%] rounded-2xl py-2 mt-6 ${
            isEnded
              ? "bg-[#A9A9A9] cursor-not-allowed text-[#3C3C3C]"
              : "bg-[#0073FF] text-white"
          }`}
          onClick={goToLogin}
          disabled={isEnded}
        >
          {isEnded ? "응모마감" : "응모하러 가기"}
        </button>
      </div>

      <Match_Main />

      <BottomSheet targetDate={targetDate} onEndChange={setIsEnded} />
    </div>
  );
}
