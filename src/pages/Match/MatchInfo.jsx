import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchLayout from '../../components/MatchLayout';

export default function MatchInfo() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginFromPage = sessionStorage.getItem('loginFromPage');
    
    if (loginFromPage === 'matchhistory') {
      console.log('MatchHistory에서 로그인했으므로 MatchHistory로 리다이렉트');
      sessionStorage.removeItem('loginFromPage');
      
      setTimeout(() => {
        navigate('/MatchHistory', { replace: true });
      }, 100);
    }
  }, []);

  return (
    <MatchLayout>
      <div className="flex flex-col w-9/12 min-h-screen mt-[6%]">
        <div className='flex flex-col'>
          <div className="flex mb-1 text-[#0073FF] fontRegular text-md">청춘열전</div>
          <div className="text-2xl text-white fontMedium">결승전 승부예측 안내</div>
        </div>

        <div className='flex flex-col items-start mt-[15%] h-[25%] text-[13.5px] text-[#EBEBEB] fontLight text-sm tracking-wide'>
          <div className='mb-8'>1. 본 이벤트는 결승전에 진행되는 각 종목별 경기의 <br /> <span className='ml-3'>우승 팀을 모두 정확히 예측하셔야 합니다.</span></div>
          <div className='mb-8'>2. 예측에 모두 성공하신 참가자 중 추첨을 통해 <br /> <span className='ml-3'>경품을 증정할 예정이오니, 많은 관심과 참여 바랍니다.</span></div>
          <div className='mb-8'>3. 이벤트 마감은 10월 1일 오전 10시입니다.</div>
          <div>4. 중복 참여는 불가하며 1인 1회 응모만 가능합니다.</div>
        </div>

        <div className='flex flex-col text-[#AFAFAF] mt-16 sm:mt-8'>
          <div className='flex text-[13px] fontSB'>경품 수령 안내</div>

          <div className='flex flex-col text-[10px] mt-5'>
            <ul className='fontBold'>1. 응모 횟수</ul>
            <li className='ml-4 text-[9px] my-1.5'>학생회비 납부자는 승부예측 응모가 최대 2회 가능합니다.</li>
            <li className='ml-4 text-[9px]'>동일한 팀으로 2회 응모 시, 추첨기에 이름이 2번 들어갑니다.</li>
          </div>

          <div className='flex flex-col text-[10px] mt-5'>
            <ul className='fontBold'>2. 학생회비 미납부자 안내</ul>
            <li className='ml-4 text-[9px] my-1.5'>학생회비를 납부하지 않은 경우, 당첨되더라도 경품 수령이 불가합니다.</li>
            <li className='ml-4 text-[9px] my-1.5'>상품 수령 시 현장에서도 납부 가능하며, 현금 20,000원을 지참해 주시기 바랍니다.</li>
            <li className='ml-4 text-[9px]'>학생회비 납부를 희망하지 않는 경우 경품 재추첨이 이루어질 예정입니다.</li>
          </div>

          <div className='flex flex-col text-[10px] mt-5'>
            <ul className='fontBold'>3. 수령 방식</ul>
            <li className='ml-4 text-[9px]'> 경품은 본인만 수령 가능하며, 대리 수령은 불가합니다.</li>
          </div>

          <div className='flex flex-col text-[10px] mt-5'>
            <ul className='fontBold'>4. 당첨 결과 안내</ul>
            <li className='ml-4 text-[9px]'>당첨자에 한하여 10월 2일 문자 안내가 발송됩니다.</li>
          </div>
        </div>

        <div className='flex items-end justify-center mt-10 mb-10'>
          <button 
            className="z-10 flex justify-center fontSB text-sm items-center bg-[#0073FF] text-white w-[60%] py-2 rounded-2xl"
            onClick={() => navigate("/Match")}
          >
            다음
          </button>
        </div>
      </div>
    </MatchLayout>
  );
}
