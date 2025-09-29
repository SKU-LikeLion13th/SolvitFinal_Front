import React, { useState, useEffect } from "react";
import API from "../../utils/axios";
import { matches as predefinedMatches } from "../../constants/matches";

export default function Match_Main() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 스포츠 타입을 한국어로 변환하는 함수
  const getSportTypeInKorean = (sportType) => {
    const sportTypeMap = {
      SOCCER: "축구",
      BASKETBALL: "농구",
      FOOT_VOLLEY: "족구",
      KICK_BASEBALL: "발야구",
      DODGEBALL: "피구",
    };
    return sportTypeMap[sportType] || sportType;
  };

  // 스포츠 타입으로 팀 정보 가져오기
  const getTeamInfo = (sportType) => {
    const match = predefinedMatches.find((m) => m.sportType === sportType);
    return match ? match.predictions : [];
  };

  // API 데이터를 가져오는 함수
  const fetchPredictionData = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/prediction/statistics`);
      setGames(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("API 호출 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictionData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 px-4 mb-12">
        <div className="text-white text-[16px]">데이터 로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 px-4 mb-12">
        <div className="text-red-500 text-[16px] mb-4">
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
        <button
          onClick={fetchPredictionData}
          className="bg-[#1880FF] text-white px-4 py-2 rounded-lg text-[14px]"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 mb-20">
      <div className="flex flex-col items-center space-y-2.5">
        <p className="text-[#1880FF] text-[13px] fontSB">
          지금 바로 참여해 보세요!
        </p>
        <p className="text-white text-[18px] fontSB">실시간 승부 예측</p>
      </div>

      <div className="mt-12 space-y-6">
        {games.map((game, idx) => {
          const isBeforeGame = game.gameResult === "BEFORE_THE_GAME";
          const isTeamAWinner = game.gameResult === "TEAM_A";
          const isTeamBWinner = game.gameResult === "TEAM_B";

          const teamInfo = getTeamInfo(game.sportType);

          const teamAName = teamInfo[0]?.teamName || "TEAM A";
          const teamBName = teamInfo[1]?.teamName || "TEAM B";

          const teamAClass = isBeforeGame
            ? game.predictions[0].percentage === game.predictions[1].percentage
              ? "bg-[#3D3E5A] text-white"
              : game.predictions[0].percentage > game.predictions[1].percentage
              ? "bg-[#0073FF] text-white"
              : "bg-[#3D3E5A] text-white"
            : isTeamAWinner
            ? "bg-[#FF5900] text-white"
            : "bg-[#2C2C2C] text-[#AFAFAF]";

          const teamBClass = isBeforeGame
            ? game.predictions[0].percentage === game.predictions[1].percentage
              ? "bg-[#3D3E5A] text-white"
              : game.predictions[1].percentage > game.predictions[0].percentage
              ? "bg-[#0073FF] text-white"
              : "bg-[#3D3E5A] text-white"
            : isTeamBWinner
            ? "bg-[#FF5900] text-white"
            : "bg-[#2C2C2C] text-[#AFAFAF]";

          const teamABarColor = isBeforeGame
            ? game.predictions[0].percentage > game.predictions[1].percentage
              ? "#0073FF"
              : game.predictions[0].percentage < game.predictions[1].percentage
              ? "#959595"
              : "#F4F4F4"
            : isTeamAWinner
            ? "#FF5900"
            : "#959595";

          const teamBBarColor = isBeforeGame
            ? game.predictions[1].percentage > game.predictions[0].percentage
              ? "#0073FF"
              : game.predictions[1].percentage < game.predictions[0].percentage
              ? "#959595"
              : "#F4F4F4"
            : isTeamBWinner
            ? "#FF5900"
            : "#959595";

          const barDirection = isTeamBWinner && !isBeforeGame ? "flex-row" : "";

          return (
            <div key={idx}>
              <div className="flex flex-col items-center w-full pb-4">
                <p className="text-white fontSB text-[16px] mb-3">
                  {getSportTypeInKorean(game.sportType)}
                  {isBeforeGame ? (
                    ""
                  ) : (
                    <span className="text-[#FF5900] fontBold text-[16px] mb-1">
                      {" 경기종료"}
                    </span>
                  )}
                </p>

                <div className="relative flex items-center justify-center w-full mb-2">
                  <div
                    className={`relative fontMedium text-[10px] text-center py-5 w-[105px] rounded-[8px] ${teamAClass}`}
                  >
                    {!isBeforeGame && isTeamAWinner && (
                      <img
                        src="/assets/images/Win.png"
                        alt="winner"
                        className="absolute w-4 h-4 top-1 left-1"
                      />
                    )}
                    {teamAName}
                  </div>

                  <div className="text-white fontBold text-[13px] mx-4">VS</div>

                  <div
                    className={`relative text-[10px] text-center py-5 w-[105px] rounded-[8px] ${teamBClass}`}
                  >
                    {!isBeforeGame && isTeamBWinner && (
                      <img
                        src="/assets/images/Win.png"
                        alt="winner"
                        className="absolute w-4 h-4 top-1 left-1"
                      />
                    )}
                    {teamBName}
                  </div>
                </div>

                <div className="flex items-center w-[85%] mt-3 space-x-2">
                  <span className="text-white text-[10px] w-6 text-right">
                    {game.predictions[0].percentage}%
                  </span>

                  <div
                    className={`flex-1 h-2 rounded-full overflow-hidden flex ${barDirection} bg-[#959595]`}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: `${game.predictions[0].percentage}%`,
                        backgroundColor: teamABarColor,
                      }}
                    />
                    <div
                      className="h-full"
                      style={{
                        width: `${game.predictions[1].percentage}%`,
                        backgroundColor: teamBBarColor,
                      }}
                    />
                  </div>

                  <span className="text-white text-[10px] w-6 text-left">
                    {game.predictions[1].percentage}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
