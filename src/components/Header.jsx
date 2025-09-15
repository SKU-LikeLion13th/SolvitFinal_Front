import React from "react";

export default function Header({
  showBack = false,
  showMenu = false,
  showCancel = false,
}) {
  return (
    <div className="flex justify-between px-4 py-2 items-center">
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
          className="w-[24px] h-[17px]"
          alt="menu"
        />
      ) : (
        <div className="w-[24px] h-[17px]" />
      )}
    </div>
  );
}
