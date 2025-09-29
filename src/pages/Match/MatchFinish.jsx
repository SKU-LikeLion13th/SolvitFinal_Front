import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
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

  const sliderRef = useRef(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

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

  // IntersectionObserver로 슬라이더가 화면에 들어올 때 애니메이션 트리거
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentSliderRef = sliderRef.current;
    if (currentSliderRef) {
      observer.observe(currentSliderRef);
    }

    return () => {
      if (currentSliderRef) {
        observer.unobserve(currentSliderRef);
      }
    };
  }, [loading]); // 로딩이 완료된 후 ref를 관찰하도록 의존성 배열에 loading 추가

  // 슬라이더 자동 애니메이션 (Framer Motion)
  useEffect(() => {
    if (!submission?.predictions || !isVisible) return;

    const totalCards = submission.predictions.length;
    // 무한 루프를 위해 애니메이션을 설정합니다.
    const animateSlider = async () => {
        // x값을 계속해서 감소시켜 왼쪽으로 이동하게 합니다.
        // 50%는 카드 하나의 너비, totalCards는 전체 카드의 수입니다.
        await controls.start({
            x: `-${50 * totalCards}%`,
            transition: {
                duration: totalCards * 2, // 전체 카드를 한 번 순회하는 시간
                ease: "linear",
            }
        });
        // 애니메이션이 끝나면 즉시 x 위치를 0으로 리셋합니다.
        // duration: 0으로 설정하여 사용자가 눈치채지 못하게 합니다.
        controls.set({ x: 0 });
        // 재귀적으로 함수를 호출하여 무한 반복을 구현합니다.
        animateSlider();
    };

    animateSlider();

  }, [submission, controls, isVisible]);

  if (loading) {
    return (
      <MatchLayout>
        <div className="flex items-center justify-center h-screen text-white">
          불러오는 중...
        </div>
      </MatchLayout>
    );
  }

  // 예측 데이터가 없을 경우를 위한 처리
  if (!submission || submission.predictions.length === 0) {
    return (
      <MatchLayout>
        <div className="flex flex-col items-center justify-center h-screen text-white">
          <div className="mb-4 text-2xl fontMedium">응모 내역이 없습니다.</div>
          <button 
            className="z-10 flex justify-center fontMedium text-sm items-center bg-[#0073FF] text-white w-[60%] py-2 rounded-2xl"
            onClick={() => navigate("/")}
          >
            홈으로 돌아가기
          </button>
        </div>
      </MatchLayout>
    );
  }

  return (
    <MatchLayout>
      <div className="flex flex-col w-full h-screen">
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

          <div ref={sliderRef} className="relative w-full mt-10 overflow-hidden">
            <motion.div
              animate={controls}
              className="flex gap-5"
            >
              {[...submission.predictions, ...submission.predictions].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: (idx % submission.predictions.length) * 0.1 }}
                  className="flex flex-col items-center rounded-xl slide h-[180px] cursor-pointer bg-[#D9D9D9] flex-shrink-0"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src="/assets/images/SchoolLogo.png"
                      className="w-[45%]"
                      alt="class"
                    />
                  </div>
                  <div className="text-[#000] text-[13px] fontSB">{sportTypeMap[item.sportType]}</div>
                  <div className="flex items-end mb-5 fontSB text-[15px] text-[#000]">{item.predictionResult}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

        <div className='flex flex-col items-center'>
          {remainingTickets > 0 && (
            <div className='flex items-end justify-center w-9/12 mt-5 '>
              <button 
                className="flex justify-center fontMedium text-sm items-center bg-[#0073FF] text-white w-[60%] py-2 rounded-2xl"
                onClick={() => navigate("/Match")}
              >
                남은 응모권 {remainingTickets}장 사용
              </button>
            </div>
          )}

          <div className={` w-9/12 flex items-end justify-center ${remainingTickets > 0 ? 'mt-7' : 'mt-10'}`}>
            <button 
              className={`z-10 flex justify-center fontMedium text-sm items-center w-[60%] py-2 rounded-2xl ${remainingTickets > 0 ? 'bg-[#5B5B5B] text-white' : 'bg-[#0073FF] text-white'}`}
              onClick={() => navigate("/")}
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </MatchLayout>
  );
}