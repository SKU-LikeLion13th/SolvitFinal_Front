import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Team() {
  const [activeTab, setActiveTab] = useState("SKU 멋쟁이사자처럼 13기");
  const [exitAnimation, setExitAnimation] = useState("");
  const tabs = ["SKU 멋쟁이사자처럼 13기", "제41대 솔:빛 총학생회"];

  const navigate = useNavigate();

  const goBack = () => {
    setExitAnimation("slideRight");
    setTimeout(() => {
      navigate("/MenuList", {
        state: { fromSubmenu: true },
      });
    }, 400);
  };

  // 탭별 참여자 데이터
  const members = {
    "SKU 멋쟁이사자처럼 13기": [
      {
        id: 1,
        imgSrc: "/assets/images/Members/LikeLion13th/mingyu.png",
        name: "한민규",
        department: "컴퓨터공학과 21학번",
        role: "대표",
        task: "백엔드 개발",
      },
      {
        id: 2,
        imgSrc: "/assets/images/Members/LikeLion13th/minju.png",
        name: "서민주",
        department: "관광학과 22학번",
        role: "파트장",
        task: "UX/UI 기획 및 디자인",
      },
      {
        id: 3,
        imgSrc: "/assets/images/Members/LikeLion13th/yujeong.png",
        name: "최유정",
        department: "미디어소프트웨어학과 21학번",
        role: "파트장",
        task: "프론트엔드 개발",
      },
      {
        id: 4,
        imgSrc: "/assets/images/Members/LikeLion13th/ohyun.png",
        name: "권오현",
        department: "컴퓨터공학과 23학번",
        role: "운영진",
        task: "백엔드 개발",
      },
      {
        id: 5,
        imgSrc: "/assets/images/Members/LikeLion13th/hoyeon.png",
        name: "이호연",
        department: "미디어소프트웨어학과 21학번",
        role: "운영진",
        task: "프론트엔드 개발",
      },
    ],
    "제41대 솔:빛 총학생회": [
      {
        id: 1,
        imgSrc: "/assets/images/Members/LikeLion13th/minju.png",
        name: "서민주",
        department: "관광학과 22학번",
        role: "부총학생회장",
        task: "UX/UI 기획 및 디자인",
      },
    ],
  };

  const renderContent = () => {
    const selectedMembers = members[activeTab];
    if (!selectedMembers) return null;

    const isFewCards = selectedMembers.length < 3;

    return (
      <div
        className={`mt-6 text-white ${
          isFewCards ? "flex justify-center" : "grid grid-cols-3 gap-3 mx-12"
        }`}
      >
        {selectedMembers.map((member) => (
          <div key={member.id} className="flex justify-center w-full">
            <div className="h-[170px] w-[100px] text-black rounded-lg bg-[#F8F8F8] text-center flex flex-col justify-center items-center px-2 pt-1 pb-3">
              {member.imgSrc && (
                <div className="w-full h-[90px] mb-2 flex justify-center items-center">
                  <img
                    src={member.imgSrc}
                    alt={member.name}
                    className="object-contain"
                  />
                </div>
              )}
              <p className="text-[6px] fontRegular">{member.department}</p>
              <p className="text-[10px] fontSB mt-1">
                {member.role} {member.name}
              </p>
              {member.task && (
                <>
                  <div className="w-[80%] h-[1px] bg-[#1880FF] my-2.5"></div>
                  <p className="text-[8px] fontMedium">{member.task}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          @keyframes slideRight {
            0% {
              transform: translateX(0);
              opacity: 1;
            }
            100% {
              transform: translateX(100%);
              opacity: 0;
            }
          }

          .animate-slideRight {
            animation: slideRight 0.4s ease-in-out forwards;
          }
        `}
      </style>
      <div
        className={`min-h-screen bg-[#161616] ${
          exitAnimation ? `animate-${exitAnimation}` : ""
        }`}
      >
        <div className="pb-8 overflow-y-auto">
          <div className="cursor-pointer px-8 py-12" onClick={goBack}>
            <img
              src="/assets/images/Header/Back.png"
              className="w-[20px] h-[16px]"
              alt="back"
            />
          </div>
          <div className="text-center text-white ">
            <p className="text-lg fontBold">제작에 참여한 사람들</p>
            <p className="text-xs fontRegular my-14">
              제41대 빛을 찾아 나아가는 솔:빛 총학생회와
              <br />
              성결대학교 멋쟁이사자처럼 13기가 함께 제작하였습니다.
            </p>
          </div>

          {/* 카테고리 */}
          <div className="flex justify-center mt-8 space-x-6">
            {tabs.map((tab) => (
              <div key={tab} className="flex flex-col items-center">
                <button
                  className={` text-sm ${
                    activeTab === tab
                      ? "text-white fontBold"
                      : "text-gray-400 fontLight"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
                {activeTab === tab && (
                  <div className="mt-1 w-full h-[2px] bg-blue-500 rounded-full" />
                )}
              </div>
            ))}
          </div>

          {/* 탭별 참여자 카드 */}
          {renderContent()}
        </div>
      </div>
    </>
  );
}
