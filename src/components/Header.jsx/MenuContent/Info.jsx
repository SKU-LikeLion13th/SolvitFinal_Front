import React, { useState } from "react";

export default function Info() {
  return (
    <div className="px-8 pt-[60px] bg-[#0D0D0D]">
      {/* 헤더 */}
      <div className="text-white">
        <div className="bg-white w-[65%] h-[0.5px]"></div>
        <p className="fontRegular text-[12px] py-2 pl-2">
          2025 영암체전 승부예측 경품
        </p>
        <div className="bg-white w-full h-[0.5px]"></div>
      </div>

      {/* Final Gift */}
      <div className="flex flex-col items-center">
        <p className="fontPlayfair py-3 text-white text-[60px] tracking-wider text-center">
          Final Gift
        </p>
        <img src="/assets/images/Header/AirPods.png" alt="" />
        <div className="text-white text-center -mt-3">
          <p className="fontSB text-[15px]">Apple</p>
          <p className="fontLight text-[12px]">AirPods Pro 2세대</p>
        </div>

        <button className="bg-[#0073FF] w-[60%] py-2 rounded-2xl text-white fontBold text-[13px] my-12">
          승부예측 바로가기{"->"}
        </button>
      </div>

      <div className="text-[#D0D0D0] flex flex-col items-center ">
        <div className="w-fit">
          <p className="text-[11px] fontMedium mb-5">경품 수령 안내</p>

          <div className="text-[9px] space-y-2.5 fontLight pl-2">
            <li>상품은 학생회비 납부자에 한하여 수령하실 수 있습니다.</li>
            <li>
              학생회비 미납부자는 경품 수령 시 학생회비를 납부하실 수 있습니다.
            </li>
            <li>대리 수령은 원칙적으로 불가합니다.</li>
            <li>
              당첨 결과는 당첨자에 한하여 10월 2일에 문자 안내가 발송됩니다.
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}
