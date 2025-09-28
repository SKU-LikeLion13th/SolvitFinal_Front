import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import BottomSheet from "../../components/BottomSheet";
import Match from "../Match/Match";
import Match_Main from "./Match_Main";

export default function Main() {
  const navigate = useNavigate();
  const targetDate = new Date("2025-10-01T09:00:00");

  const [isEnded, setIsEnded] = useState(false);

  const goToLogin = () => {
    navigate("/Login");
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
        className="absolute w-[50%] bottom-0 right-0 "
        alt=""
      />

      <div className="absolute w-full top-6">
        <Header showMenu={true} />
      </div>
      <div className="px-4 mt-16 text-center">
        <div className="text-2xl font-bold text-[#0073FF]">청춘열전</div>
        <div className="mt-1 text-3xl font-bold text-white">
          결승전 승부예측
        </div>
      </div>
      <div className="px-4 pb-20 mt-6 text-center">
        <div className="flex justify-center">
          <img src="/assets/images/Main.png" alt="" className="w-[70%]" />
        </div>
        <p className="text-white text-[11px] font-semibold mt-2">
          성결대학교 재학생이라면?
          <br />
          승부예측 응모에 참여하고 상품 받아가자!
        </p>
        <button
          className={`text-[15px] font-bold w-[65%] rounded-2xl py-2 mt-6 ${
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

      {/* 바텀시트 */}
      <BottomSheet targetDate={targetDate} onEndChange={setIsEnded} />
    </div>
  );
}
