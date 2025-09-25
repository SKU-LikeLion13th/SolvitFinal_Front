import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchLayout from '../../MatchLayout';
import API from '../../../utils/axios';

export default function MatchHistory() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]); // 전체 회차
  const [matches, setMatches] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedSubmissionIndex, setSelectedSubmissionIndex] = useState(0);

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
    const fetchData = async () => {
      try {
        // 테스트용: 응모 내역 없을 때
        setSubmissions([]);

        // 테스트용: 임시로 2회 응모한 데이터
        // setSubmissions([
        //   {
        //     predictions: [
        //       { sportType: 'SOCCER', predictionResult: 'TEAM_A' },
        //       { sportType: 'BASKETBALL', predictionResult: 'TEAM_B' },
        //       { sportType: 'FOOT_VOLLEY', predictionResult: 'TEAM_A' },
        //       { sportType: 'KICK_BASEBALL', predictionResult: 'TEAM_B' },
        //       { sportType: 'DODGEBALL', predictionResult: 'TEAM_A' }
        //     ]
        //   },
        //   {
        //     predictions: [
        //       { sportType: 'SOCCER', predictionResult: 'TEAM_B' },
        //       { sportType: 'BASKETBALL', predictionResult: 'TEAM_A' },
        //       { sportType: 'FOOT_VOLLEY', predictionResult: 'TEAM_B' },
        //       { sportType: 'KICK_BASEBALL', predictionResult: 'TEAM_A' },
        //       { sportType: 'DODGEBALL', predictionResult: 'TEAM_B' }
        //     ]
        //   }
        // ]);

        // 테스트용: 임시로 경기 데이터
        // setMatches([
        //   {
        //     sportType: 'SOCCER',
        //     predictions: [{ predictionResult: 'TEAM_A' }, { predictionResult: 'TEAM_B' }]
        //   },
        //   {
        //     sportType: 'BASKETBALL',
        //     predictions: [{ predictionResult: 'TEAM_A' }, { predictionResult: 'TEAM_B' }]
        //   },
        //   {
        //     sportType: 'FOOT_VOLLEY',
        //     predictions: [{ predictionResult: 'TEAM_A' }, { predictionResult: 'TEAM_B' }]
        //   },
        //   {
        //     sportType: 'KICK_BASEBALL',
        //     predictions: [{ predictionResult: 'TEAM_A' }, { predictionResult: 'TEAM_B' }]
        //   },
        //   {
        //     sportType: 'DODGEBALL',
        //     predictions: [{ predictionResult: 'TEAM_A' }, { predictionResult: 'TEAM_B' }]
        //   }
        // ]);

      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <MatchLayout>
        <div className="flex items-center justify-center h-screen text-white">
          불러오는 중...
        </div>
      </MatchLayout>
    );
  }

  const currentPredictions = submissions[selectedSubmissionIndex]?.predictions || [];

  return (
    <MatchLayout>
      <div className="flex flex-col w-9/12 h-screen mt-[6%]">
        <div className="flex flex-col text-xl fontSB">
          <div className="text-[#fff]">
            {userName ? `${userName}님의 응모내역` : '불러오는 중...'}
          </div>
        </div>

        {submissions.length > 1 && (
          <div className="flex items-center justify-center w-[80%] gap-10 mt-6 mx-auto">
            {submissions.map((_, idx) => (
              <div
                key={idx}
                className={`flex justify-center w-[35%] text-[12px] py-1.5 cursor-pointer
                  ${selectedSubmissionIndex === idx
                    ? 'fontBold border-b-[2px] border-[#1880FF] text-[#FFFFFF]'
                    : 'fontRegular text-[#FFFFFF]'
                  }`}
                onClick={() => setSelectedSubmissionIndex(idx)}
              >
                {idx + 1}회 응모
              </div>
            ))}
          </div>
        )}

        {submissions.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-full'>
            <div className="flex h-[50%] text-[#DADADA] fontSB text-[13px]">
              응모 내역이 없습니다.
            </div>
            <button
              className="flex mt-5 bg-[#0073FF] text-white fontSB text-sm py-2 px-6 rounded-2xl"
              onClick={() => navigate('/Match')}
            >
              응모하러 가기
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-full mt-14">
              {matches.map((match, idx) => {
                const userPrediction = currentPredictions.find(
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
                        onClick={() => navigate("/Match", {
                          state: { editIndex: idx, existingPredictions: currentPredictions }
                        })}
                      >
                        수정하기
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

         {submissions.length > 1 && (
          <div className="flex items-center justify-center w-full gap-2 mx-auto mt-[17%]">
            <button 
              className={`flex justify-center fontMedium text-sm items-center bg-[#0073FF] text-white w-[60%] py-2 rounded-2xl`}
            >
              남은 응모권 사용
            </button>
          </div>
        )}
      </div>
    </MatchLayout>
  );
}
