import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import MatchLayout from '../../components/MatchLayout';
import API from '../../utils/axios';
import { matches as predefinedMatches } from '../../constants/matches'; // 공용 matches import

export default function MatchFinish() {
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [remainingTickets, setRemainingTickets] = useState(0);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    const currentSliderRef = sliderRef.current;
    if (currentSliderRef) observer.observe(currentSliderRef);

    return () => {
      if (currentSliderRef) observer.unobserve(currentSliderRef);
    };
  }, [loading]);

  useEffect(() => {
    if (!submission?.predictions || !isVisible) return;

    const totalCards = submission.predictions.length;
    const animateSlider = async () => {
        await controls.start({
            x: `-${50 * totalCards}%`,
            transition: { duration: totalCards * 2, ease: "linear" }
        });
        controls.set({ x: 0 });
        animateSlider();
    };

    animateSlider();
  }, [submission, controls, isVisible]);

  if (loading) return (
    <MatchLayout>
      <div className="flex items-center justify-center h-screen text-white">
        불러오는 중...
      </div>
    </MatchLayout>
  );

  if (!submission || submission.predictions.length === 0) return (
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

  // ✅ matches와 연결하여 학과 이름 표시
  const mergedPredictions = predefinedMatches.map((match) => {
    const userPick = submission.predictions.find(p => p.sportType === match.sportType);
    const selectedTeam = match.predictions.find(p => p.predictionResult === userPick?.predictionResult);
    return {
      sportType: match.sportType,
      TEAM_A: match.predictions[0].teamName,
      TEAM_B: match.predictions[1].teamName,
      userPick: selectedTeam?.teamName || null
    };
  });

  return (
    <MatchLayout>
      <div className="flex flex-col w-full h-screen">
        <div className='flex flex-col items-center'>
          <div className="flex mb-1 text-[#0073FF] fontRegular text-md">청춘열전</div>
          <div className="text-2xl text-white fontMedium">결승전 승부예측 안내</div>
        </div>

        <div className='matchfinish'>
          <div className='flex justify-center text-white fontSB'>응모가 완료되었습니다.</div>

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
              className="flex gap-5 slide"
            >
            {[...mergedPredictions, ...mergedPredictions].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (idx % mergedPredictions.length) * 0.1 }}
                className="flex flex-col items-center w-full rounded-xl h-[200px] cursor-pointer bg-[#D9D9D9] flex-shrink-0"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <img
                    src={predefinedMatches.find(m => m.sportType === item.sportType)
                                .predictions.find(p => p.teamName === item.userPick)?.image || "/assets/images/SchoolLogo.png"}
                    className="w-[50%]"
                    alt={item.userPick}
                  />
                </div>
                <div className="text-[#000] text-[13px] fontSB">{sportTypeMap[item.sportType]}</div>
                <div className="flex flex-col items-center fontSB text-[15px]">
                  <div className="flex flex-col items-center mb-5 fontSB text-[15px]">
                    <div className="text-[#000000]">{item.userPick}</div>
                  </div>
                </div>
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
