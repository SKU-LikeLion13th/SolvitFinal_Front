import React from "react";

export default function Match_Main() {
  const games = [
    {
      sportType: "축구",
      gameResult: "TEAM_A",
      predictions: [
        { predictionResult: "TEAM_A", percentage: 90.0 },
        { predictionResult: "TEAM_B", percentage: 10 },
      ],
    },
    {
      sportType: "농구",
      gameResult: "TEAM_B",
      predictions: [
        { predictionResult: "TEAM_A", percentage: 10 },
        { predictionResult: "TEAM_B", percentage: 90.0 },
      ],
    },
    {
      sportType: "족구",
      gameResult: "TEAM_A",
      predictions: [
        { predictionResult: "TEAM_A", percentage: 70.0 },
        { predictionResult: "TEAM_B", percentage: 30.0 },
      ],
    },
    {
      sportType: "발야구",
      gameResult: "BEFORE_THE_GAME",
      predictions: [
        { predictionResult: "TEAM_A", percentage: 60.0 },
        { predictionResult: "TEAM_B", percentage: 40.0 },
      ],
    },
    {
      sportType: "피구",
      gameResult: "BEFORE_THE_GAME",
      predictions: [
        { predictionResult: "TEAM_A", percentage: 10.0 },
        { predictionResult: "TEAM_B", percentage: 90.0 },
      ],
    },
  ];

  return (
    <div className="px-4 mb-12">
      <div className="flex flex-col items-center space-y-2.5">
        <p className="text-[#1880FF] text-[13px] font-semibold">
          지금 바로 참여해 보세요!
        </p>
        <p className="text-white text-[18px] font-bold">실시간 승부 예측</p>
      </div>

      <div className="mt-8 space-y-6">
        {games.map((game, idx) => {
          const isBeforeGame = game.gameResult === "BEFORE_THE_GAME";
          const isTeamAWinner = game.gameResult === "TEAM_A";
          const isTeamBWinner = game.gameResult === "TEAM_B";

          // 팀별 스타일
          const teamAClass = isBeforeGame
            ? game.predictions[0].percentage >= game.predictions[1].percentage
              ? "bg-[#0073FF] text-white"
              : "bg-[#3D3E5A] text-white"
            : isTeamAWinner
            ? "bg-[#FF5900] text-white"
            : "bg-[#2C2C2C] text-[#AFAFAF]";

          const teamBClass = isBeforeGame
            ? game.predictions[1].percentage >= game.predictions[0].percentage
              ? "bg-[#0073FF] text-white"
              : "bg-[#3D3E5A] text-white"
            : isTeamBWinner
            ? "bg-[#FF5900] text-white"
            : "bg-[#2C2C2C] text-[#AFAFAF]";

          // 퍼센트 바 색상
          const teamABarColor = isBeforeGame
            ? game.predictions[0].percentage >= game.predictions[1].percentage
              ? "#0073FF"
              : "#959595"
            : isTeamAWinner
            ? "#FF5900"
            : "#959595";

          const teamBBarColor = isBeforeGame
            ? game.predictions[1].percentage >= game.predictions[0].percentage
              ? "#0073FF"
              : "#959595"
            : isTeamBWinner
            ? "#FF5900"
            : "#959595";

          // TEAM_B 승리 시 퍼센트바 오른쪽부터 시작
          const barDirection = isTeamBWinner && !isBeforeGame ? "flex-row" : "";

          return (
            <div key={idx} className="flex flex-col items-center w-full">
              <p className="text-white font-bold text-[16px] mb-1">
                {game.sportType}
                <span
                  className={`text-white font-bold text-[16px] mb-1 ${
                    isTeamAWinner || isTeamBWinner ? "text-[#FF5900]" : ""
                  }`}
                >
                  {isBeforeGame ? "" : " 경기종료"}
                </span>
              </p>

              {/* 팀 이름 */}
              <div className="flex items-center w-full justify-center mb-2 relative">
                <div
                  className={`relative text-[10px] text-center py-5 w-[105px] rounded-[8px] ${teamAClass}`}
                >
                  {!isBeforeGame && isTeamAWinner && (
                    <img
                      src="/assets/images/Win.png"
                      alt="winner"
                      className="absolute top-1 left-1 w-4 h-4"
                    />
                  )}
                  TEAM A
                </div>

                <div className="text-white text-[16px] mx-3">VS</div>

                <div
                  className={`relative text-[10px] text-center py-5 w-[105px] rounded-[8px] ${teamBClass}`}
                >
                  {!isBeforeGame && isTeamBWinner && (
                    <img
                      src="/assets/images/Win.png"
                      alt="winner"
                      className="absolute top-1 left-1 w-4 h-4"
                    />
                  )}
                  TEAM B
                </div>
              </div>

              {/* 퍼센트 바 */}
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
          );
        })}
      </div>
    </div>
  );
}
