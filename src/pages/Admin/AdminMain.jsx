import React from "react";
import { useNavigate } from "react-router-dom";

// 종목별 매핑
const SPORT_CONFIG = {
  SOCCER: {
    type: "SOCCER",
    name: "축구",
  },
  FOOT_VOLLEY: {
    type: "FOOT_VOLLEY",
    name: "족구",
  },
  BASKETBALL: {
    type: "BASKETBALL",
    name: "농구",
  },
  DODGE_BALL: {
    type: "DODGE_BALL",
    name: "피구",
  },
  KICKBALL: {
    type: "KICKBALL",
    name: "발야구",
  },
};

export default function AdminMain() {
  const navigate = useNavigate();

  const handleNavigate = (sportType) => {
    navigate("/Admin/AdminResult", { state: { sportType } });
  };

  return (
    <div className="relative flex flex-col justify-center w-full h-screen text-white">
      <div className="flex flex-col mt-[25%] items-center">
        <div className="text-[#0073FF] text-[20px] fontMedium">청춘열전</div>
        <div className="text-2xl text-white sm:text-3xl fontSB">
          결승전 승부예측
        </div>
        <div className="text-2xl text-white sm:text-3xl fontSB">관리자</div>
      </div>

      <div className="flex flex-col items-center justify-center -mt-[25%] h-full space-y-8">
        <div
          className="bg-[#5E5E5E] w-[70%] text-center rounded-3xl py-3 cursor-pointer hover:bg-[#6E6E6E] transition-colors"
          onClick={() => handleNavigate(SPORT_CONFIG.SOCCER.type)}
        >
          <p>축구 우승 학부(과) 선택하기</p>
        </div>
        <div
          className="bg-[#5E5E5E] w-[70%] text-center rounded-3xl py-3 cursor-pointer hover:bg-[#6E6E6E] transition-colors"
          onClick={() => handleNavigate(SPORT_CONFIG.FOOT_VOLLEY.type)}
        >
          <p>족구 우승 학부(과) 선택하기</p>
        </div>
        <div
          className="bg-[#5E5E5E] w-[70%] text-center rounded-3xl py-3 cursor-pointer hover:bg-[#6E6E6E] transition-colors"
          onClick={() => handleNavigate(SPORT_CONFIG.BASKETBALL.type)}
        >
          <p>농구 우승 학부(과) 선택하기</p>
        </div>
        <div
          className="bg-[#5E5E5E] w-[70%] text-center rounded-3xl py-3 cursor-pointer hover:bg-[#6E6E6E] transition-colors"
          onClick={() => handleNavigate(SPORT_CONFIG.DODGE_BALL.type)}
        >
          <p>피구 우승 학부(과) 선택하기</p>
        </div>
        <div
          className="bg-[#5E5E5E] w-[70%] text-center rounded-3xl py-3 cursor-pointer hover:bg-[#6E6E6E] transition-colors"
          onClick={() => handleNavigate(SPORT_CONFIG.KICKBALL.type)}
        >
          <p>발야구 우승 학부(과) 선택하기</p>
        </div>
      </div>

      <img
        src="/assets/images/bg_LB.png"
        className="absolute w-[50%] bottom-0 left-0"
        alt="bg_LB"
      />
    </div>
  );
}
