import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatchLayout from '../../components/MatchLayout';

export default function MatchInfo() {
  const navigate = useNavigate();

  return (
    <MatchLayout>
      <div className="flex flex-col w-9/12 h-screen mt-[6%]">
        <div className='flex flex-col'>
          <div className="flex mb-1 text-[#0073FF] fontRegular text-md">청춘열전</div>
          <div className="text-2xl text-white fontMedium">결승전 승부예측 안내</div>
        </div>

        <div className='flex flex-col items-start mt-[20%] h-[35%] text-[#EBEBEB] fontLight text-sm tracking-wide'>
          <div className='mb-8'>1. 본 이벤트는 결승전에 진행되는 각 종목별 경기의 <br /> <span className='ml-3'>우승 팀을 모두 정확히 예측하셔야 합니다.</span></div>
          <div className='mb-8'>2. 예측에 모두 성공하신 참가자 중 추첨을 통해 <br /> <span className='ml-3'>경품을 증정할 예정이오니, 많은 관심과 참여 바랍니다.</span></div>
          <div className='mb-8'>3. 이벤트 마감은 10월 1일 오전 10시입니다.</div>
          <div>4. 중복 참여는 불가하며 1인 1회 응모만 가능합니다.</div>
        </div>

        <div className='flex items-end justify-center mt-[65%]'>
          <button 
            className="flex justify-center fontSB text-sm items-center bg-[#0073FF] text-white w-[60%] py-2 rounded-2xl"
            onClick={() => navigate("/Match")}
          >
            다음
          </button>
        </div>
      </div>
    </MatchLayout>
  );
}
