import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MatchLayout from '../../components/MatchLayout';
import API from '../../utils/axios';
import { matches as predefinedMatches } from '../../constants/matches'; // ✅ 공용 matches import

export default function Match() {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ 누락된 location 추가
  const [selected, setSelected] = useState(null);
  const [userName, setUserName] = useState('');
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
    const fetchUserStatus = async () => {
      try {
        const response = await API.get('/log/status', { withCredentials: true });
        setUserName(response.data.name);
      } catch (error) {
        console.error('유저 정보를 불러오는 데 실패했습니다.', error);
      }
    };
    fetchUserStatus();
  }, []);

  useEffect(() => {
    // 수정 모드 처리
    if (location.state?.editIndex !== undefined && location.state.existingPredictions) {
      setAllPredictions(location.state.existingPredictions);
      setCurrentMatch(location.state.editIndex);

      const existingPrediction = location.state.existingPredictions[location.state.editIndex];
      if (existingPrediction) {
        const idx = predefinedMatches[location.state.editIndex].predictions.findIndex(
          p => p.predictionResult === existingPrediction.predictionResult
        );
        setSelected(idx !== -1 ? idx : null);
      }
    }
  }, [location.state]);

  const handleNext = () => {
    if (selected === null) return;

    const currentPrediction = {
      sportType: predefinedMatches[currentMatch].sportType,
      predictionResult: predefinedMatches[currentMatch].predictions[selected].predictionResult
    };

    const updatedPredictions = [...allPredictions];
    updatedPredictions[currentMatch] = currentPrediction;

    // 수정 모드일 경우 → 바로 MatchCheck로
    if (location.state?.editIndex !== undefined) {
      navigate("/MatchCheck", { state: { predictions: updatedPredictions } });
      return;
    }

    // 신규 응모일 경우 → 다음 경기로 진행
    setAllPredictions(updatedPredictions);
    if (currentMatch < predefinedMatches.length - 1) {
      setSelected(null);
      setCurrentMatch(currentMatch + 1);
    } else {
      navigate("/MatchCheck", { state: { predictions: updatedPredictions } });
    }
  };

  return (
    <MatchLayout>
      <div className="flex flex-col w-9/12 min-h-screen">
        {predefinedMatches.length > 0 ? (
          <>
            <div className="flex flex-col mb-4 text-xl fontMedium">
              <div className="text-[#fff]">{`${currentMatch + 1} / ${predefinedMatches.length}`}</div>
              <div className="text-[#1880FF]">{sportTypeMap[predefinedMatches[currentMatch].sportType]} 결승</div>
              <div className="text-[#fff]">
                {userName ? `${userName}님의 우승 예측은?` : '불러오는 중...'}
              </div>
            </div>

            <div className="flex items-center justify-between match">
              {predefinedMatches[currentMatch].predictions.map((prediction, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={`flex flex-col items-center w-[45%] rounded-xl h-[200px] cursor-pointer 
                    ${selected === idx ? 'bg-[#0073FF]' : 'bg-[#fff]'}`}
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <img src={prediction.image} className="w-[50%]" alt={prediction.teamName} />
                  </div>
                  <div className={`flex items-end mb-5 fontMedium ${selected === idx ? 'text-[#fff]' : 'text-[#000]'}`}>
                    {prediction.teamName}
                  </div>
                </div>
              ))}
            </div>

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
