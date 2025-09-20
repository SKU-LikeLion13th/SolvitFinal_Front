import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx/Header";
import BottomSheet from "../components/BottomSheet";

export default function Main() {
  const navigate = useNavigate();
  const targetDate = new Date("2025-10-01T09:00:00");

  const goToLogin = () => {
    navigate("/Login");
  };

  return (
    <div className="relative min-h-screen pt-12 overflow-hidden">
      <img
        src="/assets/images/bg_LT.png"
        className="absolute w-[50%] top-12 left-0"
        alt=""
      />
      <img
        src="/assets/images/bg_RB.png"
        className="absolute w-[50%] bottom-0 right-0"
        alt=""
      />

      <div className="absolute w-full top-12">
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
          className="bg-[#0073FF] text-white text-[15px] font-bold w-[50%] rounded-xl py-1.5 mt-6"
          onClick={goToLogin}
        >
          응모하러 가기
        </button>
      </div>

      {/* 바텀시트 */}
      <BottomSheet targetDate={targetDate} />
    </div>
  );
}
