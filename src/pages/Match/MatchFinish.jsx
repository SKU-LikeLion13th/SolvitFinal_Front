import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatchLayout from '../../components/MatchLayout';

export default function MatchFinish() {
  const navigate = useNavigate();

  const dummyData = [
    { id: 1, sport: "축구", dept: "경영학과" },
    { id: 2, sport: "농구", dept: "경영학과" },
    { id: 3, sport: "배구", dept: "경영학과" },
    { id: 4, sport: "발야구", dept: "경영학과" },
    { id: 5, sport: "피구", dept: "경영학과" },
  ];

  return (
    <MatchLayout>
      <div className="flex flex-col w-9/12 h-screen mt-[6%]">
        <div className='flex flex-col'>
          <div className="flex mb-1 text-[#0073FF] fontRegular text-md">청춘열전</div>
          <div className="text-2xl text-white fontMedium">결승전 승부예측 안내</div>
        </div>

        <div className='flex justify-center mt-[20%]'>응모가 완료되었습니다.</div>

        <div className="flex mt-[20%] gap-5 overflow-x-auto pb-4">
          {dummyData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center rounded-xl w-[40%] h-[180px] cursor-pointer bg-[#D9D9D9] flex-shrink-0"
            >
              <div className="flex items-center justify-center w-full h-full">
                <img
                  src="/assets/images/SchoolLogo.png"
                  className="w-[50%]"
                  alt="class"
                />
              </div>
              <div className="text-[#000] fontRegular text-sm">{item.sport}</div>
              <div className="flex items-end mb-5 fontMedium text-[#000]">{item.dept}</div>
            </div>
          ))}
        </div>

        <div className='flex items-end justify-center mt-[75%]'>
          <button 
            className="flex justify-center fontSB text-sm items-center bg-[#0073FF] text-white w-[60%] py-2 rounded-2xl"
            onClick={() => navigate("/")}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </MatchLayout>
  );
}