import React, { useState } from "react";

export default function UserPaid({ dummyData }) {
  const [activeTab, setActiveTab] = useState("once");

  // case = "none" | "once" | "twice"
  const caseType = "twice"; // 현재 상태

  const matchesOnce =
    caseType === "once" || caseType === "twice"
      ? [
          { id: 1, sport: "축구", teamA: "경영학과", teamB: "행정학과" },
          { id: 2, sport: "농구", teamA: "경영학과", teamB: "행정학과" },
        ]
      : [];

  const matchesTwice =
    caseType === "twice"
      ? [
          { id: 3, sport: "족구", teamA: "경영학과", teamB: "행정학과" },
          { id: 4, sport: "발야구", teamA: "경영학과", teamB: "행정학과" },
          { id: 5, sport: "피구", teamA: "경영학과", teamB: "행정학과" },
        ]
      : [];

  const matches = activeTab === "once" ? matchesOnce : matchesTwice;

  const renderContent = () => {
    // 1회 응모 탭
    if (activeTab === "once") {
      if (caseType === "none") {
        return (
          <>
            <div className="flex-1 flex justify-center items-center">
              <p className="fontSB text-[13px] text-[#dadada] text-center">
                응모 내역이 없습니다.
              </p>
            </div>

            <div className="pb-16 flex justify-center">
              <button className="bg-[#0073FF] text-white text-[15px] font-bold w-[90%] rounded-2xl py-3">
                응모하러 가기
              </button>
            </div>
          </>
        );
      }
      if (caseType === "once" || caseType === "twice") {
        return (
          <div className="flex-1 overflow-y-auto">
            {matches.map((match) => (
              <div
                key={match.id}
                className="flex flex-col border-y-[1px] border-[#222222] py-4"
              >
                <div className="flex fontBold">{match.sport}</div>
                <div className="flex items-center justify-between w-full mt-5">
                  <div className="flex text-[13px] fontSB text-[#575757]">
                    <span className="text-[#1880FF]">{match.teamA}</span> vs{" "}
                    {match.teamB}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }
    }

    // 2회 응모 탭
    if (activeTab === "twice") {
      if (caseType === "none") {
        return (
          <>
            <div className="flex-1 flex justify-center items-center">
              <p className="fontSB text-[13px] text-[#dadada] text-center">
                응모 내역이 없습니다.
              </p>
            </div>

            <div className="pb-16 flex justify-center">
              <button className="bg-[#0073FF] text-white text-[15px] font-bold w-[90%] rounded-2xl py-3">
                응모하러 가기
              </button>
            </div>
          </>
        );
      }
      if (caseType === "once") {
        return (
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex flex-1 justify-center items-center">
              <p className="fontSB text-[13px] text-[#dadada] text-center">
                응모권이 1장 남아있습니다.
              </p>
            </div>
            <div className="pb-16 flex justify-center">
              <button className="bg-[#0073FF] text-white text-[15px] font-bold w-[90%] rounded-2xl py-3 z-10">
                남은 응모권 사용
              </button>
            </div>
          </div>
        );
      }
      if (caseType === "twice") {
        return (
          <div className="flex-1 overflow-y-auto">
            {matches.map((match) => (
              <div
                key={match.id}
                className="flex flex-col border-y-[1px] border-[#222222] py-4"
              >
                <div className="flex fontBold">{match.sport}</div>
                <div className="flex items-center justify-between w-full mt-5">
                  <div className="flex text-[13px] fontSB text-[#575757]">
                    <span className="text-[#1880FF]">{match.teamA}</span> vs{" "}
                    {match.teamB}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }
    }
  };

  return (
    <div className="px-4 flex flex-col h-[calc(100vh-100px)]">
      <h2 className="text-xl fontSB my-4">OOO님의 응모내역</h2>

      {/* 탭 버튼 */}
      <div className="flex w-full mt-6 mb-3">
        <div className="flex-1 flex flex-col items-center">
          <button
            className={`${
              activeTab === "once"
                ? "text-white fontBold text-[10px]"
                : "text-white fontLight text-[9px]"
            }`}
            onClick={() => setActiveTab("once")}
          >
            1회 응모
          </button>
          {activeTab === "once" && (
            <div className="w-[60%] h-[2px] bg-[#1880FF] mt-2"></div>
          )}
        </div>
        <div className="flex-1 flex flex-col items-center">
          <button
            className={`${
              activeTab === "twice"
                ? "text-white fontBold text-[10px]"
                : "text-white fontLight text-[9px]"
            }`}
            onClick={() => setActiveTab("twice")}
          >
            2회 응모
          </button>
          {activeTab === "twice" && (
            <div className="w-[60%] h-[2px] bg-[#1880FF] mt-2"></div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">{renderContent()}</div>
    </div>
  );
}
