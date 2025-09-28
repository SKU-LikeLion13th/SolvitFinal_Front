import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchLayout from '../../MatchLayout';
import API from '../../../utils/axios';

export default function MatchHistory() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedSubmissionIndex, setSelectedSubmissionIndex] = useState(0);

  const USE_MOCK_DATA = false; // 개발용 테스트 데이터 사용 여부
  const TOTAL_TICKETS = USE_MOCK_DATA ? 2 : null; // 임시로 테스트용 응모권 수

  const sportTypeMap = {
    SOCCER: "축구",
    BASKETBALL: "농구",
    FOOT_VOLLEY: "족구",
    KICK_BASEBALL: "발야구",
    DODGEBALL: "피구"
  };

  const handleBack = () => {
    if (document.referrer && document.referrer !== window.location.href) {
      navigate(-1);
    } else {
      window.location.href = window.location.pathname + window.location.search;
    }
  };

  // 유저 상태 확인
  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await API.get('/log/status', { withCredentials: true });
        setUserName(response.data.name);
      } catch (error) {
        console.error('유저 정보를 불러오는 데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserStatus();
  }, []);

  // 로그인 유저만 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      if (!userName) return;

      try {
        if (USE_MOCK_DATA) {
          // 개발용 테스트 데이터
          setSubmissions([
            {
              predictions: [
                { sportType: 'SOCCER', predictionResult: 'TEAM_A' },
                { sportType: 'BASKETBALL', predictionResult: 'TEAM_B' }
              ]
            },
            {
              predictions: [
                { sportType: 'SOCCER', predictionResult: 'TEAM_B' },
                { sportType: 'BASKETBALL', predictionResult: 'TEAM_A' }
              ]
            }
          ]);

          setMatches([
            { sportType: 'SOCCER', predictions: [{ predictionResult: 'TEAM_A' }, { predictionResult: 'TEAM_B' }] },
            { sportType: 'BASKETBALL', predictions: [{ predictionResult: 'TEAM_A' }, { predictionResult: 'TEAM_B' }] },
            { sportType: 'FOOT_VOLLEY', predictions: [{ predictionResult: 'TEAM_A' }, { predictionResult: 'TEAM_B' }] },
            { sportType: 'KICK_BASEBALL', predictions: [{ predictionResult: 'TEAM_A' }, { predictionResult: 'TEAM_B' }] },
            { sportType: 'DODGEBALL', predictions: [{ predictionResult: 'TEAM_A' }, { predictionResult: 'TEAM_B' }] }
          ]);
        } else {
          // 실제 API 호출
          const [submissionRes, matchesRes] = await Promise.all([
            API.get('/students/submission/info', { withCredentials: true }),
            API.get('/prediction/statistics')
          ]);
          setSubmissions(submissionRes.data.submissions || []);
          setMatches(matchesRes.data || []);
        }
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };
    fetchData();
  }, [userName]);

  // 로딩 중
  if (loading) {
    return (
      <MatchLayout onBack={handleBack}>
        <div className="flex items-center justify-center min-h-screen text-white">
          불러오는 중...
        </div>
      </MatchLayout>
    );
  }

  // 로그인 안 했으면 로그인 안내만
  if (!userName) {
    return (
      <MatchLayout onBack={handleBack}>
        <div className="flex flex-col items-center justify-center h-screen text-white">
          <div className="mb-4 text-lg">로그인이 필요합니다.</div>
          <div className="mb-6 text-sm text-gray-300">
            응모 내역 확인은 로그인 후 이용 가능합니다.
          </div>
          <button
            className="px-6 py-2 bg-[#0073FF] text-white rounded-xl"
            onClick={() => navigate('/login')}
          >
            로그인 하러가기
          </button>
        </div>
      </MatchLayout>
    );
  }

  // 로그인한 유저만 아래 콘텐츠 렌더링
  const currentPredictions = submissions[selectedSubmissionIndex]?.predictions || [];
  const remainingTickets = USE_MOCK_DATA
    ? TOTAL_TICKETS - submissions.length
    : null; // 실제 데이터에서는 백에서 가져와야 함

  return (
    <MatchLayout onBack={handleBack}>
      <div className="flex flex-col w-9/12 max-h-[calc(100vh-6%)] overflow-y-auto mt-[6%]">
        {/* 타이틀 */}
        <div className="flex flex-col text-xl fontSB text-[#fff]">
          {`${userName}님의 응모내역`}
        </div>

        {/* 탭 (응모권 2회 이상) */}
        {USE_MOCK_DATA && TOTAL_TICKETS > 1 && (
          <div className="flex items-center justify-center w-[80%] gap-10 mt-6 mx-auto">
            {Array.from({ length: TOTAL_TICKETS }).map((_, idx) => (
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

        {/* 응모 내역 */}
        {submissions[selectedSubmissionIndex] ? (
          <div className="flex flex-col w-full pb-20 sm:pb-10 mt-14">
            {matches.map((match, idx) => {
              const userPrediction = currentPredictions.find(
                p => p.sportType === match.sportType
              );

              return (
                <div key={idx} className="flex flex-col border-y-[1px] border-[#222222] py-4">
                  <div className="flex text-[15.5px] fontSB">{sportTypeMap[match.sportType]}</div>
                  <div className='flex justify-between w-full mt-2 mb-3.5'>
                    <div className="flex items-center gap-2 fontSB text-[14px]">
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
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='flex flex-col items-center h-full'>
            <div className="flex items-center text-[#DADADA] fontSB text-[13px] py-[60%]">
              {submissions.length === 0
                ? '응모 내역이 없습니다.'
                : remainingTickets > 0
                ? `응모권이 ${remainingTickets}장 남아있습니다.`
                : ''}
            </div>
            {remainingTickets > 0 && (
              <button
                className="z-10 flex mb-10 w-[65%] justify-center bg-[#0073FF] text-white fontSB text-sm py-2 px-6 rounded-2xl"
                onClick={() => navigate('/Match')}
              >
                {TOTAL_TICKETS > 1 ? '남은 응모권 사용' : '응모하러 가기'}
              </button>
            )}
          </div>
        )}
      </div>
    </MatchLayout>
  );
}