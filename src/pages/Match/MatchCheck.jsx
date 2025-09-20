import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatchLayout from '../../components/MatchLayout';

export default function MatchCheck() {
  const navigate = useNavigate();

  // 임시 데이터 (5개)
  const matches = [
    { id: 1, sport: "축구", teamA: "경영학과", teamB: "행정학과" },
    { id: 2, sport: "농구", teamA: "경영학과", teamB: "행정학과" },
    { id: 3, sport: "족구", teamA: "경영학과", teamB: "행정학과" },
    { id: 4, sport: "발야구", teamA: "경영학과", teamB: "행정학과" },
    { id: 5, sport: "피구", teamA: "경영학과", teamB: "행정학과" },
  ];

  return (
    <MatchLayout>
      <div className="flex flex-col w-9/12 h-screen mt-[6%]">
        <div className="flex flex-col text-xl fontMedium">
          <div className="text-[#fff]">응모 전,</div>
          <div className="text-[#fff]">확인해 주세요!</div>
        </div>

        <div className="flex flex-col">
          <div className="flex fontMedium text-[14px] mt-12 mb-5">
            서민주님이 선택한 우승학과
          </div>

          <div className="flex flex-col w-full">
            {matches.map((match) => (
              <div
                key={match.id}
                className="flex flex-col border-y-[1px] border-[#222222] py-4"
              >
                <div className="flex fontBold">{match.sport}</div>
                <div className="flex items-center justify-between w-full mt-5">
                  <div className="flex text-[13px] fontSB">
                    <span className="text-[#1880FF]">{match.teamA}</span> vs{" "}
                    {match.teamB}
                  </div>
                  <div className="flex w-fit text-[10px] border-[0.5px] border-[#575757] rounded-[4px] px-1 py=0.5 cursor-pointer">
                    수정하기
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex text-[11px] justify-center mt-10 text-[#7A7A7A]'>응모 후 수정이 불가합니다.</div>

        <div className="flex items-end justify-center mt-10">
          <button
            className="flex justify-center fontSB text-sm items-center bg-[#0073FF] text-white w-[60%] py-2 rounded-2xl"
            onClick={() => navigate("/MatchFinish")}
          >
            다음
          </button>
        </div>
      </div>
    </MatchLayout>
  );
}
