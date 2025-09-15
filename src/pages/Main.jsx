import React from "react";
import Header from "../components/Header";
import BottomSheet from "../components/BottomSheet";

export default function Main() {
  const targetDate = new Date("2025-10-01T09:00:00");

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        style={{ backgroundImage: "url('/assets/images/bg_LT.png')" }}
        className="bg-left-top bg-no-repeat bg-cover bg-[length:199px]"
      >
        <Header showMenu={true} />
        <div className="text-center mt-6 px-4">
          <div className="text-2xl font-bold text-[#0073FF]">청춘열전</div>
          <div className="text-3xl text-white font-bold mt-1">
            결승전 승부예측
          </div>
        </div>
        <div className="text-center mt-6 px-4 pb-20">
          <div className="flex justify-center">
            <img src="/assets/images/Main.png" alt="" className="w-[70%]" />
          </div>
          <p className="text-white text-[11px] font-semibold mt-2">
            성결대학교 재학생이라면?
            <br />
            승부예측 응모에 참여하고 상품 받아가자!
          </p>
          <button className="bg-[#0073FF] text-white text-[15px] font-bold w-[50%] rounded-xl py-1.5 mt-6">
            응모하러 가기
          </button>
        </div>

        {/* 바텀시트 */}
        <BottomSheet targetDate={targetDate} />
      </div>
    </div>
  );
}
