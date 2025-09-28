// MatchLayout.jsx
import React from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function MatchLayout({ children, onBack }) {
  const navigate = useNavigate();

  const goBack = () => {
    if (onBack) {
      onBack(); // 모달 닫기용 콜백
    } else if (window.history.length > 1) {
      navigate(-1); // 일반 페이지 뒤로가기
    } else {
      window.location.reload(); // 새로고침
    }
  };

  return (
    <div className="relative flex flex-col w-full min-h-[calc(100vh-60px)] text-white">
      <div className='overflow-y-auto'>
        <div className="z-10 flex items-center p-6">
          <FaArrowLeft 
            className="text-white text-[25px] cursor-pointer" 
            onClick={goBack} 
          />
        </div>

        <div className="flex flex-col items-center w-full">
          {children}
        </div>

        <img
          src="/assets/images/bg_LB.png"
          className="absolute w-[50%] bottom-0 left-0"
          alt="bg_LB"
        />
      </div>
    </div>
  );
}
