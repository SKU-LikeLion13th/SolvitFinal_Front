import React, { useState } from "react";
import MenuList from "./MenuList";
import Team from "./MenuContent/Team";
import Info from "./MenuContent/Info";

export default function Header({
  showBack = false,
  showMenu = false,
  showCancel = false,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

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

  return (
    <div className="relative">
      {/* 헤더 */}
      <div className="flex justify-between px-4 py-2 items-center shadow-md z-24">
        {showBack ? (
          <img
            src="/assets/images/Header/Back.png"
            className="w-[22px] h-[18px]"
            alt="back"
          />
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

      {/* 풀스크린 메뉴 */}
      {(isMenuOpen || isClosing) && (
        <div
          className={`fixed top-0 transform -translate-x-1/2 h-screen bg-[#161616] z-[50] flex flex-col w-full max-w-[430px] min-w-[100vw] sm:min-w-[375px] ${
            isClosing ? "animate-slideUp" : "animate-slideDown"
          }`}
          style={{
            width: "min(430px, 100vw)",
          }}
        >
          {/* 닫기 버튼 */}
          <div className="absolute top-12 right-6">
            <img
              src="/assets/images/Header/cancel.png"
              className="w-[20px] h-[20px] cursor-pointer"
              alt="close"
              onClick={closeMenu}
            />
          </div>

          {/* 메뉴 내용 */}
          {!activeMenu ? (
            <MenuList onSelect={handleSelectMenu} />
          ) : activeMenu === "team" ? (
            <Team />
          ) : (
            <Info />
          )}
        </div>
      )}
    </div>
  );
}
