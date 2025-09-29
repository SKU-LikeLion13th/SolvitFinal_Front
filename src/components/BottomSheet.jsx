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

  // 시트 높이 계산 - 사파리 URL 바 대응
  useEffect(() => {
    const updateHeight = () => {
      // iOS 사파리의 실제 가시 뷰포트 높이를 정확하게 가져오기
      let viewportHeight;

      if (window.visualViewport) {
        // visualViewport.height는 키보드, URL 바 등을 제외한 실제 보이는 영역
        viewportHeight = window.visualViewport.height;
      } else {
        // fallback
        viewportHeight = window.innerHeight;
      }

      // 시트 높이를 뷰포트의 30%로 설정하되, 최소 200px 보장
      const height = Math.max(viewportHeight * 0.3, 200);
      setSheetHeight(height);
    };

    // 초기 설정
    updateHeight();

    // 약간의 딜레이 후 한 번 더 실행 (iOS 렌더링 타이밍 이슈 대응)
    setTimeout(updateHeight, 100);
    setTimeout(updateHeight, 300);

    // 이벤트 리스너
    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", updateHeight);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateHeight);
      window.visualViewport.addEventListener("scroll", updateHeight);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateHeight);
        window.visualViewport.removeEventListener("scroll", updateHeight);
      }
    };
  }, []);

  const getTranslateY = () => {
    if (isDragging) return Math.max(0, currentY);
    return isOpen ? 0 : sheetHeight - 70;
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
    newY = Math.max(0, Math.min(sheetHeight - 70, newY));
    setCurrentY(newY);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = (sheetHeight - 70) / 2;
    const shouldOpen = currentY < threshold;
    setIsOpen(shouldOpen);
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
    <>
      {/* CSS 변수 설정을 위한 스타일 태그 */}
      <style jsx>{`
        :root {
          --vh: 1vh;
        }

        .bottom-sheet {
          bottom: max(env(safe-area-inset-bottom), 0px);
          /* iOS PWA에서 home indicator 영역 고려 */
        }

        @supports (height: 100dvh) {
          .bottom-sheet {
            /* dvh 지원 브라우저에서는 동적 뷰포트 높이 사용 */
            bottom: 0;
          }
        }
      `}</style>

      <div
        ref={sheetRef}
        className="fixed left-0 right-0 w-full z-20 max-w-[430px] mx-auto flex flex-col bg-transparent bottom-sheet"
        style={{
          height: `${sheetHeight}px`,
          transform: `translateY(${getTranslateY()}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
      >
        {/* 드래그 핸들 및 확장된 드래그 영역 */}
        <div
          className="flex justify-center items-start h-[40px] cursor-pointer select-none pt-4"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onClick={toggleSheet}
        >
          <div className="w-16 h-1.5 bg-gray-400 rounded-full"></div>
        </div>

        {/* 시트 컨텐츠 */}
        <div className="bg-[#000000] rounded-t-[40px] shadow-2xl flex flex-col px-6 flex-1 py-8 mt-3">
          <div className="h-[40px] flex flex-col justify-center">
            <p className="text-[12px] text-center font-thin text-[#c3c3c3]">
              {isBeforeOpen ? "" : !isEnded ? "10월 1일 오전 9시 종료" : ""}
            </p>
            {isBeforeOpen ? (
              <p className="text-white text-center font-bold text-[16px] mt-0.5">
                9월 30일 OPEN
              </p>
            ) : isEnded ? (
              <p className="text-white text-center font-bold text-[16px] mt-0.5">
                승부예측 종료
              </p>
            ) : (
              <p className="text-white text-center font-bold text-[14px] mt-0.5">
                마감까지 남은 시간
              </p>
            )}
          </div>

          {/* 카운트다운 - 중앙 정렬 */}
          <div className="flex-1 flex justify-center items-center mt-1">
            <div className="flex justify-center gap-3">
              {/* DAYS */}
              <div className="flex flex-col items-center">
                <p className="text-white text-[36px] font-bold">
                  {String(days).padStart(2, "0")}
                </p>
                <p className="text-white font-light text-sm">DAYS</p>
              </div>

              {/* 구분자 */}
              <div className="flex items-start">
                <p className="text-white text-[36px] font-light">:</p>
              </div>

              {/* HOURS */}
              <div className="flex flex-col items-center">
                <p className="text-white text-[36px] font-bold">
                  {String(hours).padStart(2, "0")}
                </p>
                <p className="text-white font-light text-sm">HOURS</p>
              </div>

              <div className="flex items-start">
                <p className="text-white text-[36px] font-light">:</p>
              </div>

              {/* MINUTES */}
              <div className="flex flex-col items-center">
                <p className="text-white text-[36px] font-bold">
                  {String(minutes).padStart(2, "0")}
                </p>
                <p className="text-white font-light text-sm">MINS</p>
              </div>

              <div className="flex items-start">
                <p className="text-white text-[36px] font-light">:</p>
              </div>

              {/* SECONDS */}
              <div className="flex flex-col items-center">
                <p className="text-white text-[36px] font-bold">
                  {String(seconds).padStart(2, "0")}
                </p>
                <p className="text-white font-light text-sm">SECS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
