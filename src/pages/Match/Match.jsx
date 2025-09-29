import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MatchLayout from '../../components/MatchLayout';
import API from '../../utils/axios';

export default function Match() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [allPredictions, setAllPredictions] = useState([]);

  const sportTypeMap = {
    SOCCER: "축구",
    BASKETBALL: "농구",
    FOOT_VOLLEY: "족구",
    KICK_BASEBALL: "발야구",
    DODGEBALL: "피구"
  };

  useEffect(() => {
    if (location.state?.editIndex !== undefined && location.state.existingPredictions) {
      setAllPredictions(location.state.existingPredictions);
      setCurrentMatch(location.state.editIndex);

      setSelected(
        matches[location.state.editIndex]?.predictions.findIndex(
          p => p.predictionResult === location.state.existingPredictions[location.state.editIndex].predictionResult
        ) ?? null
      );
    }
  }, [location.state, matches]);


  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await API.get('/log/status', { withCredentials: true });
        setUserName(response.data.name);
      } catch (error) {
        console.error('유저 정보를 불러오는 데 실패했습니다.', error);
      }
    };

    const fetchPredictions = async () => {
      try {
        const res = await API.get(`/prediction/statistics`, { withCredentials: true });
        setMatches(res.data);
      } catch (error) {
        console.error('예측 정보를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchUserStatus();
    fetchPredictions();
  }, []);

  const handleNext = () => {
    if (selected === null) return;

    const currentPrediction = {
      sportType: matches[currentMatch].sportType,
      predictionResult: matches[currentMatch].predictions[selected].predictionResult
    };

    const updatedPredictions = [...allPredictions];
    updatedPredictions[currentMatch] = currentPrediction;

    // editIndex가 있는 경우 => 해당 경기만 수정 후 바로 MatchCheck로
    if (location.state?.editIndex !== undefined) {
      navigate("/MatchCheck", { state: { predictions: updatedPredictions } });
      return;
    }

    // 기존 전체 선택 로직
    setAllPredictions(updatedPredictions);

    if (currentMatch < matches.length - 1) {
      setSelected(null);
      setCurrentMatch(currentMatch + 1);
    } else {
      navigate("/MatchCheck", { state: { predictions: updatedPredictions } });
    }
  };

  return (
    <MatchLayout>
      <div className="flex flex-col w-9/12 min-h-screen">
        {matches.length > 0 ? (
          <>
            <div className="flex flex-col mb-4 text-xl fontMedium">
              <div className="text-[#fff]">{`${currentMatch + 1} / ${matches.length}`}</div>
              <div className="text-[#1880FF]">{sportTypeMap[matches[currentMatch].sportType]} 결승</div>
              <div className="text-[#fff]">
                {userName ? `${userName}님의 우승 예측은?` : '불러오는 중...'}
              </div>
            </div>

            {/* 예측 카드 */}
            <div className="flex items-center justify-between match">
              {matches[currentMatch].predictions.map((prediction, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={`flex flex-col items-center w-[45%] rounded-xl h-[200px] cursor-pointer 
                    ${selected === idx ? 'bg-[#0073FF]' : 'bg-[#D9D9D9]'}`}
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src="/assets/images/SchoolLogo.png"
                      className="w-[50%]"
                      alt="class"
                    />
                  </div>
                  <div
                    className={`flex items-end mb-5 fontMedium 
                      ${selected === idx ? 'text-[#fff]' : 'text-[#000]'}`}
                  >
                    {prediction.predictionResult}
                  </div>
                </div>
              ))}
            </div>

            {/* 다음 버튼 */}
            <div className="flex justify-center mt-6 mb-10">
              <button
                className={`w-[60%] py-2 rounded-2xl fontSB text-sm
                  ${selected === null 
                    ? 'bg-[#A3A3A3] text-[#4A4A4A] cursor-not-allowed' 
                    : 'bg-[#0073FF] text-white cursor-pointer'}`}
                onClick={handleNext}
                disabled={selected === null}
              >
                다음
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-white">
            불러오는 중...
          </div>
        )}
      </div>
    </MatchLayout>
  );
}
