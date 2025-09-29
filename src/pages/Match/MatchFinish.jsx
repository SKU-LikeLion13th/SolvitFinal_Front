import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchLayout from '../../components/MatchLayout';
import API from '../../utils/axios';

export default function MatchFinish() {
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [remainingTickets, setRemainingTickets] = useState(1);
  const [loading, setLoading] = useState(true);

  const sportTypeMap = {
    SOCCER: "축구",
    BASKETBALL: "농구",
    FOOT_VOLLEY: "족구",
    KICK_BASEBALL: "발야구",
    DODGEBALL: "피구"
  };

  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await API.get('/students/submission/info', { withCredentials: true });

        if (res.data.submissions?.length > 0) {
          setSubmission(res.data.submissions[0]);
        }
      } catch (error) {
        console.error('응모 정보 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, []);

  useEffect(() => {
    if (!scrollRef.current || !submission?.predictions) return;

    const container = scrollRef.current;
    let scrollPos = 0;
    const cardWidth = container.firstChild?.offsetWidth + 16 || 200; // 카드 width + gap
    const totalScroll = container.scrollWidth - container.clientWidth;

    const interval = setInterval(() => {
      scrollPos += cardWidth;
      if (scrollPos > totalScroll) scrollPos = 0; // 맨끝이면 처음으로
      container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }, 2000); // 2초마다 슬라이드

    return () => clearInterval(interval);
  }, [submission]);


  if (loading) {
    return (
      <MatchLayout>
        <div className="flex items-center justify-center h-screen text-white">
          불러오는 중...
        </div>
      </MatchLayout>
    );
  }

  return (
    <MatchLayout>
      <div className="flex flex-col w-9/12 h-screen">
        <div className='flex flex-col items-center'>
          <div className="flex mb-1 text-[#0073FF] fontRegular text-md">청춘열전</div>
          <div className="text-2xl text-white fontMedium">결승전 승부예측 안내</div>
        </div>

        <div className='matchfinish'>
          <div className='flex justify-center text-white fontSB'>
            응모가 완료되었습니다.
          </div>

          {remainingTickets > 0 && (
            <div className='flex items-end justify-center mt-1.5'>
              <div className="flex items-center justify-center text-[#979797] text-[13px] fontSB">
                응모권이 {remainingTickets}장 남았습니다.
              </div>
            </div>
          )}

          <div ref={scrollRef}className="flex gap-5 pb-4 mt-10 overflow-x-auto">
            {submission?.predictions.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-xl w-[40%] h-[180px] cursor-pointer bg-[#D9D9D9] flex-shrink-0"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <img
                    src="/assets/images/SchoolLogo.png"
                    className="w-[50%]"
                    alt="class"
                  />
                </div>
                <div className="text-[#000] text-[13px] fontSB">{sportTypeMap[item.sportType]}</div>
                <div className="flex items-end mb-5 fontSB text-[15px] text-[#000]">{item.predictionResult}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 남은 응모권이 1장 이상이면 버튼 표시 */}
        {remainingTickets > 0 && (
          <div className='flex items-end justify-center mt-5'>
            <button 
              className="flex justify-center fontMedium text-sm items-center bg-[#0073FF] text-white w-[60%] py-2 rounded-2xl"
              onClick={() => navigate("/Match")}
            >
              남은 응모권 {remainingTickets}장 사용
            </button>
          </div>
        )}

        {/* 홈으로 돌아가기 버튼 */}
        <div className={`flex items-end justify-center ${remainingTickets > 0 ? 'mt-7' : ''}`}>
          <button 
            className={`z-10 flex justify-center fontMedium text-sm items-center bg-[#0073FF] text-white w-[60%] py-2 rounded-2xl ${remainingTickets > 0 ? 'bg-[#5B5B5B]' : 'bg-[#0073FF]'}`}
            onClick={() => navigate("/")}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </MatchLayout>
  );
}
