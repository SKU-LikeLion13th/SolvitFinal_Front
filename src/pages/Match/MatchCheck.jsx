import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MatchLayout from '../../components/MatchLayout';
import API from '../../utils/axios';

export default function MatchCheck() {
  const navigate = useNavigate();
  const location = useLocation();
  const [predictions, setPredictions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

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
        const response = await API.get('/log/status');
        setUserName(response.data.name);
      } catch (error) {
        console.error('유저 정보를 불러오는 데 실패했습니다.', error);
      }
    };
    fetchUserStatus();
  }, []);

  useEffect(() => {
    if (location.state?.predictions) {
      setPredictions(location.state.predictions);
      API.get('/prediction/statistics').then(res => setMatches(res.data));
    } else {
      const fetchData = async () => {
        try {
          const [submissionRes, matchesRes] = await Promise.all([
            API.get('/students/submission/info'),
            API.get('/prediction/statistics')
          ]);

          if (submissionRes.data.submissions?.length > 0) {
            setPredictions(submissionRes.data.submissions[0].predictions);
          }
          setMatches(matchesRes.data);
        } catch (error) {
          console.error('데이터 불러오기 실패:', error);
        }
      };
      fetchData();
    }
  }, [location.state]);

  const handleSubmit = async () => {
    if (predictions.length === 0) {
      alert("예측을 선택해주세요!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        predictionRequestList: predictions.map(p => ({
          sportType: p.sportType,
          predictionResult: p.predictionResult,
        })),
      };

      console.log("payload 확인:", JSON.stringify(payload, null, 2));

      const res = await API.post('/prediction/submit', payload);
      alert(res.data);
      navigate("/MatchFinish");
    } catch (err) {
      console.error("응모 실패:", err);

      if (err.response?.status === 400) {
        alert("이미 응모하셨습니다.");
        navigate("/");
      } else {
        alert("응모 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MatchLayout>
      <div className="flex flex-col w-9/12 h-screen mt-[6%]">
        <div className="flex flex-col text-xl fontSB">
          <div className="text-[#fff]">응모 전,</div>
          <div className="text-[#fff]">확인해 주세요!</div>
        </div>

        <div className="flex flex-col mt-14">
          <div className="flex fontSB text-[14px] mb-5">
            {userName ? `${userName}님이 선택한 우승학과` : '불러오는 중...'}
          </div>

          {matches.length > 0 && predictions.length > 0 ? (
            <div className="flex flex-col w-full">
              {matches.map((match, idx) => {
                const userPrediction = predictions.find(
                  p => p.sportType === match.sportType
                );

                return (
                  <div key={idx} className="flex flex-col border-y-[1px] border-[#222222] py-4">
                    <div className="flex text-[15.5px] fontSB">{sportTypeMap[match.sportType]}</div>
                    
                    <div className='flex justify-between w-full mt-2 mb-3.5'>
                      <div className="flex items-center fontSB text-[14px]">
                        {match.predictions.map((p, i) => {
                          const isSelected = p.predictionResult === userPrediction?.predictionResult;
                          return (
                            <React.Fragment key={i}>
                              {i === 1 && <span className="mx-1 text-[#575757]">vs</span>}
                              <span className={isSelected ? 'text-[#1880FF]' : 'text-[#575757]'}>
                                {p.predictionResult}
                              </span>
                            </React.Fragment>
                          );
                        })}
                      </div>

                      <div
                        className="flex items-center w-fit text-[9.5px] border-[0.5px] border-[#575757] rounded-[4px] px-2 py-0.5 cursor-pointer"
                        onClick={() => {
                          navigate("/Match", {
                            state: {
                              editIndex: idx,
                              existingPredictions: predictions
                            }
                          });
                        }}
                      >
                        수정하기
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-[#fff] mt-5">불러오는 중...</div>
          )}
        </div>

        <div className="flex text-[11px] justify-center mt-10 text-[#7A7A7A]">
          응모 후 수정이 불가합니다.
        </div>

        <div className="flex items-end justify-center mt-10">
          <button
            className={`z-10 flex justify-center fontSB text-sm items-center w-[60%] py-2 rounded-2xl ${
              loading ? "bg-[#A3A3A3] cursor-not-allowed" : "bg-[#0073FF] text-white"
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "응모 중..." : "응모하기"}
          </button>
        </div>
      </div>
    </MatchLayout>
  );
}
