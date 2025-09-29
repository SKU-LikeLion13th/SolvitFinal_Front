import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import API from "../../utils/axios";
import { matches as predefinedMatches } from "../../constants/matches"; // ✅ matches import

const SPORT_CONFIG = {
  SOCCER: { type: "SOCCER", name: "축구" },
  FOOT_VOLLEY: { type: "FOOT_VOLLEY", name: "족구" },
  BASKETBALL: { type: "BASKETBALL", name: "농구" },
  DODGEBALL: { type: "DODGEBALL", name: "피구" }, // matches와 동일
  KICK_BASEBALL: { type: "KICK_BASEBALL", name: "발야구" }, // matches와 동일
};

export default function AdminResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sportType } = location.state || {};

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sportInfo =
    Object.values(SPORT_CONFIG).find((s) => s.type === sportType) ||
    SPORT_CONFIG.SOCCER;

  // 해당 종목 팀 정보 가져오기
  const teamInfo =
    predefinedMatches.find((m) => m.sportType === sportType)?.predictions || [];

  const teamAName = teamInfo[0]?.teamName || "TEAM A";
  const teamBName = teamInfo[1]?.teamName || "TEAM B";

  const goHome = () => {
    navigate("/admin");
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setError(null);
    setSuccess(false);
  };

  const handleSave = async () => {
    if (!selectedTeam) {
      setError("우승 팀을 선택해주세요");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await API.post("/admin/prediction/grade", {
        sportType: sportType,
        predictionResult: selectedTeam,
      });

      setSuccess(true);
      setTimeout(() => navigate("/admin"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "저장에 실패했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="px-8 py-12 h-screen">
        <div className="cursor-pointer" onClick={goHome}>
          <img
            src="/assets/images/Header/Back.png"
            className="w-[20px] h-[16px]"
            alt="back"
          />
        </div>

        <div className="fontSB text-[23px] text-left mt-12 text-[#1880FF]">
          <div>{sportInfo.name} 결승</div>
          <div className="text-white">우승을 선택해 주세요</div>
        </div>

        <div className="flex justify-center space-x-4 mt-20">
          <div
            className={`w-[140px] h-[200px] rounded-xl cursor-pointer flex items-center justify-center text-[13px] fontBold transition-all ${
              selectedTeam === "TEAM_A"
                ? "bg-blue-500 text-white scale-105 shadow-lg"
                : "bg-[#D9D9D9] text-black hover:bg-[#C9C9C9]"
            }`}
            onClick={() => handleTeamSelect("TEAM_A")}
          >
            {teamAName}
          </div>
          <div
            className={`w-[140px] h-[200px] rounded-xl cursor-pointer flex items-center justify-center text-[13px] fontBold transition-all ${
              selectedTeam === "TEAM_B"
                ? "bg-red-500 text-white scale-105 shadow-lg"
                : "bg-[#D9D9D9] text-black hover:bg-[#C9C9C9]"
            }`}
            onClick={() => handleTeamSelect("TEAM_B")}
          >
            {teamBName}
          </div>
        </div>

        {error && (
          <div className="flex justify-center mt-4">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex justify-center mt-4">
            <p className="text-sm">저장되었습니다! 메인으로 이동합니다</p>
          </div>
        )}

        <div className="flex justify-center mt-48">
          <button
            className={`py-2 rounded-2xl fontBold w-[90%] transition-all ${
              selectedTeam && !isLoading
                ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                : "bg-[#A3A3A3] text-[#4A4A4A] cursor-not-allowed"
            }`}
            onClick={handleSave}
            disabled={!selectedTeam || isLoading}
          >
            {isLoading ? "저장 중..." : "저장하기"}
          </button>
        </div>
      </div>

      <img
        src="/assets/images/bg_LB.png"
        className="absolute bottom-0 w-[50%] pointer-events-none"
        alt=""
      />
    </div>
  );
}
