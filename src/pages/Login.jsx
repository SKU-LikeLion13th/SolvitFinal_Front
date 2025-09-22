import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatchLayout from '../components/MatchLayout';

export default function Login() {
  const navigate = useNavigate();

  return (
    <MatchLayout>
      <div className="flex flex-col w-full h-screen items-centers">
        <div className="flex flex-col items-center mt-[5%] mb-[50%]">
          <div className="text-[#0073FF] text-[20px] fontMedium">청춘열전</div>
          <div className="text-2xl text-white sm:text-3xl fontSB">결승전 승부예측</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-4 text-sm text-white fontRegular">
            로그인이 필요한 서비스입니다.
          </div>
          <button 
            className="flex items-center bg-[#0073FF] text-white font px-10 py-1.5 rounded-2xl"
            onClick={() => navigate("/Member")}
          >
            <img
              src="/assets/images/SchoolLogo.png"
              className="w-[30px] mr-4"
              alt=""
            />
            Login with Sungkyul
          </button>
        </div>
      </div>
    </MatchLayout>
  );
}
