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
  onBackClick = null,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  const navigate = useNavigate();

  // 메뉴가 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // cleanup
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
      setActiveMenu("");
    }, 300);
  };

  const handleSelectMenu = (menu) => {
    setActiveMenu(menu);
  };

  const goBack = () => {
    if (onBackClick) {
      onBackClick(); // 커스텀 뒤로가기 함수가 있으면 실행
    } else {
      navigate(-1); // 없으면 기본 브라우저 뒤로가기
    }
  };

  return (
    <div className="relative">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-2 shadow-md z-24">
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
            onClick={() => setIsMenuOpen(true)}
          />
        ) : (
          <div className="w-[24px] h-[17px]" />
        )}
      </div>

      {/* 풀스크린 메뉴 - 모바일 스크롤 방지 */}
      {(isMenuOpen || isClosing) && (
        <div
          className={`fixed inset-0 h-full sm:w-[430px] sm:min-w-[375px] sm:max-w-[500px] w-screen lg:left-[37.4%] sm:left-[21.8%] bg-[#161616] z-[50] flex flex-col ${
            isClosing ? "animate-slideUp" : "animate-slideDown"
          }`}
          style={{
            touchAction: "none", // 터치 스크롤 방지
            overscrollBehavior: "none", // 오버스크롤 방지
          }}
        >
          {/* 메뉴 내용 */}
          {!activeMenu ? (
            <MenuList onSelect={handleSelectMenu} onClose={closeMenu} />
          ) : activeMenu === "team" ? (
            <Team onBack={() => setActiveMenu("")} />
          ) : activeMenu === "info" ? (
            <Info onCancel={closeMenu} />
          ) : activeMenu === "Manager" ? (
            <Manager onBack={() => setActiveMenu("")} />
          ) : activeMenu === "MatchHistory" ? (
            <MatchHistory onBack={() => setActiveMenu("")} />
          ) : null}
        </div>
      )}
    </div>
  );
}
