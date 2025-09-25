import React, { useState, useEffect, useRef } from "react";

export default function BottomSheet({ targetDate, onEndChange }) {
  const sheetRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const now = new Date();
  const openDate = new Date("2025-09-29T00:00:00");
  const isBeforeOpen = now < openDate;

  // const isEnded = days === 0 && hours === 0 && minutes === 0 && seconds === 0;
  const isEnded =
    !isBeforeOpen &&
    days === 0 &&
    hours === 0 &&
    minutes === 0 &&
    seconds === 0;

  // 실시간 디데이 업데이트
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      if (isBeforeOpen) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }

      const diff = targetDate - now;
      if (diff <= 0) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }

      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((diff / (1000 * 60)) % 60));
      setSeconds(Math.floor((diff / 1000) % 60));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate, isBeforeOpen]);

  // 시트 높이 계산
  useEffect(() => {
    const updateHeight = () => {
      const height = window.innerHeight * 0.3;
      setSheetHeight(height);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const getTranslateY = () => {
    if (isDragging) return currentY;
    return isOpen ? 0 : sheetHeight - 40;
  };

  const handleStart = (clientY) => {
    setIsDragging(true);
    setStartY(clientY);
    setCurrentY(getTranslateY());
  };

  const handleMove = (clientY) => {
    if (!isDragging) return;
    const deltaY = clientY - startY;
    let newY = currentY + deltaY;
    newY = Math.max(-20, Math.min(sheetHeight - 70, newY));
    setCurrentY(newY);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = (sheetHeight - 60) / 2;
    const shouldOpen = currentY < threshold;
    setIsOpen(shouldOpen);
    setCurrentY(shouldOpen ? 0 : sheetHeight - 60);
  };

  const onTouchStart = (e) => {
    e.preventDefault();
    handleStart(e.touches[0].clientY);
  };
  const onTouchMove = (e) => {
    e.preventDefault();
    if (isDragging) handleMove(e.touches[0].clientY);
  };
  const onTouchEnd = (e) => {
    e.preventDefault();
    handleEnd();
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientY);

    const handleMouseMove = (e) => {
      if (isDragging) handleMove(e.clientY);
    };
    const handleMouseUp = (e) => {
      handleEnd();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const toggleSheet = () => {
    if (!isDragging) setIsOpen(!isOpen);
  };

  useEffect(() => {
    const ended =
      !isBeforeOpen &&
      days === 0 &&
      hours === 0 &&
      minutes === 0 &&
      seconds === 0;
    if (typeof onEndChange === "function") {
      onEndChange(ended);
    }
  }, [days, hours, minutes, seconds, isBeforeOpen, onEndChange]);

  return (
    <div
      ref={sheetRef}
      className="fixed bottom-0 w-full z-20 max-w-[430px] flex flex-col"
      style={{
        height: `${sheetHeight}px`,
        transform: `translateY(${getTranslateY()}px)`,
        transition: isDragging ? "none" : "transform 0.3s ease-out",
      }}
    >
      <div
        className="flex justify-center items-center h-[44px] cursor-pointer select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onClick={toggleSheet}
      >
        <div className="w-16 h-1.5 bg-gray-500 rounded-full"></div>
      </div>

      <div className="bg-[#000000] rounded-t-[40px] shadow-2xl flex flex-col px-6 h-full py-6">
        <div className="h-[40px] flex flex-col justify-center">
          <p className="text-[12px] text-center fontThin text-[#c3c3c3]">
            {isBeforeOpen ? "" : !isEnded ? "10월 1일 오전 9시 종료" : ""}
          </p>
          {isBeforeOpen ? (
            <p className="text-white text-center fontBold text-[16px] mt-1">
              9월 30일 OPEN
            </p>
          ) : isEnded ? (
            <p className="text-white text-center fontBold text-[16px] mt-1">
              승부예측 종료
            </p>
          ) : (
            <p className="text-white text-center fontBold text-[14px] mt-1">
              마감까지 남은 시간
            </p>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-3">
          {/* DAYS */}
          <div className="flex flex-col items-center">
            <p className="text-white text-[40px] font-bold">
              {String(days).padStart(2, "0")}
            </p>
            <p className="text-white fontEL text-md">DAYS</p>
          </div>

          {/* 구분자 */}
          <div className="flex items-start">
            <p className="text-white text-[40px] fontEL">:</p>
          </div>

          {/* HOURS */}
          <div className="flex flex-col items-center">
            <p className="text-white text-[40px] font-bold">
              {String(hours).padStart(2, "0")}
            </p>
            <p className="text-white fontEL text-md ">HOURS</p>
          </div>

          <div className="flex items-start">
            <p className="text-white text-[40px] fontEL">:</p>
          </div>

          {/* MINUTES */}
          <div className="flex flex-col items-center">
            <p className="text-white text-[40px] font-bold">
              {String(minutes).padStart(2, "0")}
            </p>
            <p className="text-white fontEL text-md ">MINS</p>
          </div>

          <div className="flex items-start">
            <p className="text-white text-[40px] fontEL">:</p>
          </div>

          {/* SECONDS */}
          <div className="flex flex-col items-center">
            <p className="text-white text-[40px] font-bold">
              {String(seconds).padStart(2, "0")}
            </p>
            <p className="text-white fontEL text-md ">SECS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
