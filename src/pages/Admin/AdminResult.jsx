import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import API from "../../utils/axios";

const SPORT_CONFIG = {
  SOCCER: {
    type: "SOCCER",
    name: "축구",
  },
  FOOT_VOLLEY: {
    type: "FOOT_VOLLEY",
    name: "족구",
  },
  BASKETBALL: {
    type: "BASKETBALL",
    name: "농구",
  },
  DODGE_BALL: {
    type: "DODGE_BALL",
    name: "피구",
  },
  KICKBALL: {
    type: "KICKBALL",
    name: "발야구",
  },
};

export default function AdminResult() {
  const navigate = useNavigate();
  const location = useLocation();

  // AdminMain에서 전달받은 sportType
  const { sportType } = location.state || {};

  const [selectedTeam, setSelectedTeam] = useState(null); // 'TEAM_A' or 'TEAM_B'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // 현재 종목 정보
  const sportInfo =
    Object.values(SPORT_CONFIG).find((s) => s.type === sportType) ||
    SPORT_CONFIG.SOCCER;

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
      const response = await API.post("/admin/prediction/grade", {
        sportType: sportType,
        predictionResult: selectedTeam,
      });

      console.log("Success:", response.data);
      setSuccess(true);

      // 성공 시 2초 후 메인으로 이동
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
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
            className={`w-[140px] h-[200px] rounded-xl cursor-pointer flex items-center justify-center text-lg font-bold transition-all ${
              selectedTeam === "TEAM_A"
                ? "bg-blue-500 text-white scale-105 shadow-lg"
                : "bg-[#D9D9D9] text-black hover:bg-[#C9C9C9]"
            }`}
            onClick={() => handleTeamSelect("TEAM_A")}
          >
            팀 A
          </div>
          <div
            className={`w-[140px] h-[200px] rounded-xl cursor-pointer flex items-center justify-center text-lg font-bold transition-all ${
              selectedTeam === "TEAM_B"
                ? "bg-red-500 text-white scale-105 shadow-lg"
                : "bg-[#D9D9D9] text-black hover:bg-[#C9C9C9]"
            }`}
            onClick={() => handleTeamSelect("TEAM_B")}
          >
            팀 B
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="flex justify-center mt-4">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* 성공 메시지 */}
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
