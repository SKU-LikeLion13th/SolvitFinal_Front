import React from "react";

export default function UserUnpaid({ dummyData }) {
  const entries = dummyData?.paid || [];
  //   const entries = 0;

  const matches = [
    { id: 1, sport: "축구", teamA: "경영학과", teamB: "행정학과" },
    { id: 2, sport: "농구", teamA: "경영학과", teamB: "행정학과" },
    { id: 3, sport: "족구", teamA: "경영학과", teamB: "행정학과" },
    { id: 4, sport: "발야구", teamA: "경영학과", teamB: "행정학과" },
    { id: 5, sport: "피구", teamA: "경영학과", teamB: "행정학과" },
  ];

  return (
    <div className="px-4 flex flex-col h-[calc(100vh-100px)]">
      <h2 className="text-xl fontSB my-4">OOO님의 응모내역</h2>

      {entries.length > 0 ? (
        <div className="flex flex-col w-full mt-12">
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
      ) : (
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
      )}
    </div>
  );
}
