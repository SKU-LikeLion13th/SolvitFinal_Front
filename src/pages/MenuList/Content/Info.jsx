import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../utils/axios";

export default function Info() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exitAnimation, setExitAnimation] = useState("");
  const [isClosed, setIsClosed] = useState(false); // 응모 마감 여부

  const targetDate = new Date("2025-10-01T09:00:00");

  const onCancel = () => {
    setExitAnimation("slideUp");
    setTimeout(() => {
      navigate("/", {
        state: { fromSubmenu: true },
      });
    }, 400);
  };

  // 유저 상태 확인
  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await API.get("/log/status", {
          withCredentials: true,
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("유저 정보를 불러오는 데 실패했습니다.", error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUserStatus();
  }, []);

  // 응모 마감 체크 (실시간으로 체크 가능)
  useEffect(() => {
    const checkDeadline = () => {
      const now = new Date();
      setIsClosed(now >= targetDate);
    };

    checkDeadline(); // 컴포넌트 마운트 시 한 번 체크
    const interval = setInterval(checkDeadline, 1000); // 1초마다 체크

    return () => clearInterval(interval); // 언마운트 시 클린업
  }, []);

  const handleNavigate = () => {
    if (isClosed) {
      alert("승부예측이 마감되었습니다.");
      return;
    }
    if (userInfo) {
      navigate("/MatchInfo");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes slideUp {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(-100%);
              opacity: 0;
            }
          }

          .animate-slideUp {
            animation: slideUp 0.6s ease-in forwards;
          }
        `}
      </style>
      <div
        className={`px-8 pt-12 bg-[#0D0D0D] min-h-screen overflow-y-auto ${
          exitAnimation ? `animate-${exitAnimation}` : ""
        }`}
      >
        {/* 헤더 */}
        <div className="text-white">
          <div className="flex items-center justify-between">
            <div className="bg-white w-[65%] h-[0.5px]"></div>
            <div className="flex justify-end cursor-pointer" onClick={onCancel}>
              <img
                src="/assets/images/Header/cancel.png"
                className="w-[20px] h-[20px]"
                alt="cancel"
              />
            </div>
          </div>
          <p className="fontRegular text-[11px] pb-2 pl-2">
            <span className="tracking-wider">2025</span> 영암체전 승부예측 경품
          </p>
          <div className="bg-white w-full h-[0.5px]"></div>
        </div>

        {/* Final Gift */}
        <div className="flex flex-col items-center">
          <p className="fontPlayfair py-3 text-white text-[60px] tracking-wider text-center">
            Final Gift
          </p>
          <img src="/assets/images/Header/AirPods.png" alt="" />
          <div className="-mt-3 text-center text-white">
            <p className="fontSB text-[15px]">Apple</p>
            <p className="fontLight text-[12px]">AirPods Pro 2세대</p>
          </div>

          <button
            className={`w-[60%] py-2 rounded-2xl text-[13px] my-12 fontSB ${
              isClosed
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-[#0073FF] text-white"
            }`}
            onClick={handleNavigate}
            disabled={loading || isClosed}
          >
            {loading
              ? "불러오는 중..."
              : isClosed
              ? "응모가 마감되었습니다"
              : "승부예측 바로가기 →"}
          </button>
        </div>

        {/* 안내 */}
        <div className="text-[#AFAFAF] flex flex-col items-center pb-10">
          <div className="w-fit">
            <p className="text-[11px] fontMedium mb-5 text-center">
              경품 수령 안내
            </p>

            <div className="text-[9px] space-y-8 fontLight pl-2 text-center">
              <div className="space-y-1.5">
                <p className="fontMedium">1. 응모 횟수</p>
                <div>
                  • 학생회비 납부자는 승부예측 응모가 최대 2회 가능합니다.
                </div>
                <div>
                  • 동일한 팀으로 2회 응모시, 추첨기에 이름이 2번 들어갑니다.
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="fontMedium">2. 학생회비 미납부자 안내</p>
                <div>
                  • 학생회비를 납부하지 않은 경우, 당첨되더라도 경품 수령이
                  불가합니다.
                </div>
                <div>
                  • 상품 수령 시 현장에서도 납부 가능하며, 20,000원을 지참해
                  주시기 바랍니다.
                </div>
                <div>
                  • 학생회비 납부를 희망하지 않는 경우 경품 재추첨이 이루어질
                  예정입니다.
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="fontMedium">3. 수령 방식</p>
                <div>
                  • 경품은 본인만 수령 가능하며, 대리 수령은 불가합니다.
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="fontMedium">4. 당첨 결과 안내</p>
                <div>• 당첨자에 한하여 10월 2일 문자 안내가 발송됩니다.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
