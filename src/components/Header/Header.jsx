import React, { useState, useEffect } from "react";
import MenuList from "./MenuList";
import Team from "./MenuContent/Team";
import Info from "./MenuContent/Info";
import { useNavigate } from "react-router-dom";
import Manager from "./MenuContent/Manager";
import MatchHistory from "./MenuContent/MatchHistory";

export default function Header({
  showBack = false,
  showMenu = false,
  showCancel = false,
}) {
  const navigate = useNavigate();

  const goBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const goMenuList = () => {
    navigate("/MenuList");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="relative">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-6 z-24">
        {showBack ? (
          <div onClick={goBack}>
            <img
              src="/assets/images/Header/Back.png"
              className="w-[22px] h-[18px] cursor-pointer"
              alt="back"
            />
          </div>
        ) : (
          <div className="w-[22px] h-[18px]" />
        )}
        {showCancel ? (
          <img
            src="/assets/images/Header/cancel.png"
            className="w-[24px] h-[24px]"
            alt="cancel"
          />
        ) : showMenu ? (
          <img
            src="/assets/images/Header/menu.png"
            className="w-[24px] h-[17px] cursor-pointer"
            alt="menu"
            // onClick={() => setIsMenuOpen(true)}
            onClick={() => goMenuList()}
          />
        ) : (
          <div className="w-[24px] h-[17px]" />
        )}
      </div>
    </div>
  );
}
