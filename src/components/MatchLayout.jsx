// MatchLayout.jsx
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function MatchLayout({ children, onBack }) {
  const navigate = useNavigate();

  const goBack = () => {
    if (onBack) {
      onBack();
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="relative flex flex-col w-full min-h-screen text-white">
      <div className="z-10 flex items-center px-8 py-7">
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
        className="absolute w-[50%] bottom-0 left-0 pointer-events-none"
        alt="bg_LB"
      />
    </div>
  );
}
