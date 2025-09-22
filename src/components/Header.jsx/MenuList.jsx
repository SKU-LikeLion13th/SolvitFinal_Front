import React from "react";
import { useNavigate } from "react-router-dom";

export default function MenuList({ onSelect }) {
  const navigate = useNavigate();

  const goToViewHistory = () => {
    navigate("/ViewHistory");
  };

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-6 text-lg fontSB">
      <div
        className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5"
        onClick={() => onSelect("team")}
      >
        제작자
      </div>
      <div
        className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5"
        onClick={() => onSelect("info")}
      >
        승부예측 상품안내
      </div>
      <div
        className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5"
        onClick={goToViewHistory}
      >
        응모내역 확인
      </div>
    </div>
  );
}
