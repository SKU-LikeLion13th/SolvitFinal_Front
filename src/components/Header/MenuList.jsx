import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/axios";

export default function MenuList({ onSelect, onClose }) {
  const navigate = useNavigate();

  const goHomeAndCloseMenu = () => {
    navigate("/");
    onClose();
  };

  const handleLogout = async () => {
    try {
      const response = await API.post("/log/out", { withCredentials: true });
      console.log(response.data);
      navigate("/", { replace: true });
      onClose();
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="h-full">
      <div className="px-8 py-12">
        <img
          src="/assets/images/Header/Back.png"
          className="w-[22px] h-[18px] cursor-pointer"
          alt="back"
          onClick={goHomeAndCloseMenu}
        />
      </div>
      <div className="flex flex-col items-center justify-center h-screen space-y-6 text-lg fontSB -mt-28">
        <div
          className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5"
          onClick={() => onSelect("Manager")}
        >
          영암체전 기획자
        </div>
        <div
          className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5"
          onClick={() => onSelect("team")}
        >
          웹사이트 제작자
        </div>
        <div
          className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5"
          onClick={() => onSelect("info")}
        >
          승부예측 상품안내
        </div>
        <div
          className="cursor-pointer bg-white w-[55%] text-center rounded-full py-1.5"
          onClick={() => onSelect("MatchHistory")}
        >
          응모내역 확인
        </div>
        <div
          className="flex text-white text-[14px] fontMedium cursor-pointer"
          onClick={handleLogout}
        >
          - Log Out -
        </div>
      </div>
    </div>
  );
}
