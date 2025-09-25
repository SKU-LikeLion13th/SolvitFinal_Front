import React from "react";

export default function MenuList({ onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 text-lg fontSB">
      <div
        className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5"
        onClick={() => onSelect("Manager")}
      >
        영암체전 기획자
      </div>
      <div
        className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5"
        onClick={() => onSelect("team")}
      >
        웹사이트 제작자
      </div>
      <div
        className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5"
        onClick={() => onSelect("info")}
      >
        승부예측 상품안내
      </div>
      <div
        className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5"
        onClick={() => onSelect("MatchHistory")}
      >
        응모내역 확인
      </div>
    </div>
  );
}
