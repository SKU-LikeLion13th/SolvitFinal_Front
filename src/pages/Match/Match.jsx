import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchLayout from '../../components/MatchLayout';

export default function Match() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <MatchLayout>
      <div className="flex flex-col w-9/12 h-screen mt-[6%]">
        <div className="flex flex-col text-xl fontMedium">
          <div className="text-[#fff] mb-3">1 / 5</div>
          <div className="text-[#1880FF]">축구 결승</div>
          <div className="text-[#fff]">서민주님의 우승 예측은?</div>
        </div>

        <div className="flex justify-between w-full mt-[30%]">
          <div
            onClick={() => setSelected(0)}
            className={`flex flex-col items-center w-[45%] rounded-xl h-[200px] cursor-pointer 
              ${selected === 0 ? 'bg-[#0073FF]' : 'bg-[#D9D9D9]'}`}
          >
            <div className="flex items-center justify-center w-full h-full">
              <img
                src="/assets/images/SchoolLogo.png"
                className="w-[50%]"
                alt="class"
              />
            </div>
            <div
              className={`flex items-end mb-5 fontMedium 
                ${selected === 0 ? 'text-[#fff]' : 'text-[#000]'}`}
            >
              학과명
            </div>
          </div>

          <div
            onClick={() => setSelected(1)}
            className={`flex flex-col items-center w-[45%] rounded-xl h-[200px] cursor-pointer 
              ${selected === 1 ? 'bg-[#0073FF]' : 'bg-[#D9D9D9]'}`}
          >
            <div className="flex items-center justify-center w-full h-full">
              <img
                src="/assets/images/SchoolLogo.png"
                className="w-[50%]"
                alt="class"
              />
            </div>
            <div
              className={`flex items-end mb-5 fontMedium 
                ${selected === 1 ? 'text-[#fff]' : 'text-[#000]'}`}
            >
              학과명
            </div>
          </div>
        </div>

        <div className="flex items-end justify-center mt-[80%]">
          <button
            className="flex justify-center fontSB text-sm items-center bg-[#0073FF] text-white w-[60%] py-2 rounded-2xl"
            onClick={() => navigate("/MatchCheck")}
            disabled={selected === null}
          >
            다음
          </button>
        </div>
      </div>
    </MatchLayout>
  );
}
