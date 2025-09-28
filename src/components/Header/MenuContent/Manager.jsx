import React from "react";

export default function Manager({ onBack }) {
  const members = [
    {
      id: 1,
      imgSrc: "/assets/images/Members/Manager/MinseoCho.png",
      name: "조민서",
      department: "경영학과 20학번",
      role: "총학생회장",
      task: "행사 총관리",
      imgWidth: "100px",
      imgHeight: "100px",
      marginTop: "-10px",
    },
    {
      id: 2,
      imgSrc: "/assets/images/Members/Manager/MinjuSeo.png",
      name: "서민주",
      department: "관광학과 22학번",
      role: "부총학생회장",
      task: "행사 총관리",
      imgWidth: "100px",
      imgHeight: "100px",
    },
    {
      id: 3,
      imgSrc: "/assets/images/Members/Manager/MinjuLee.png",
      name: "이민주",
      department: "국어국문학과 22학번",
      role: "총무국장",
      task: "예산 집행 및 물품 관리",
      imgWidth: "100px",
      imgHeight: "100px",
    },
    {
      id: 4,
      imgSrc: "/assets/images/Members/Manager/JunkyuKim.png",
      name: "김준규",
      department: "글로벌물류학과 23학번",
      role: "총무부장",
      task: "예산 집행 및 물품 관리",
      imgWidth: "75px",
      imgHeight: "85px",
    },
    {
      id: 5,
      imgSrc: "/assets/images/Members/Manager/HansolOh.png",
      name: "오한솔",
      department: "관광학과 22학번",
      role: "사업기획국장",
      task: "프로그램 관리 및 큐시트 제작",
      imgWidth: "100px",
      imgHeight: "100px",
    },
    {
      id: 6,
      imgSrc: "/assets/images/Members/Manager/SeheeKim.png",
      name: "김세희",
      department: "경영학과 23학번",
      role: "사업기획국장",
      task: "프로그램 관리 및 큐시트 제작",
      imgWidth: "100px",
      imgHeight: "100px",
    },
    {
      id: 7,
      imgSrc: "/assets/images/Members/Manager/JiheeHwang.png",
      name: "황지희",
      department: "경영학과 23학번",
      role: "연대사업국장",
      task: "행정 관리 및 MC",
      imgWidth: "100px",
      imgHeight: "100px",
    },
    {
      id: 8,
      imgSrc: "/assets/images/Members/Manager/HyewonLee.png",
      name: "이혜원",
      department: "컴퓨터공학과 25학번",
      role: "연대사업부장",
      task: "행정 관리 및 MC",
      imgWidth: "70px",
      imgHeight: "80px",
    },
    {
      id: 9,
      imgSrc: "/assets/images/Members/Manager/YeonseoPark.png",
      name: "박연서",
      department: "경영학과 21학번",
      role: "문화홍보국장",
      task: "홍보 콘텐츠 제작",
      imgWidth: "100px",
      imgHeight: "100px",
    },
    {
      id: 10,
      imgSrc: "/assets/images/Members/Manager/HansolPark.png",
      name: "박한솔",
      department: "뷰티디자인학과 25학번",
      role: "문화홍보부장",
      task: "홍보 콘텐츠 제작",
      imgWidth: "75px",
      imgHeight: "80px",
    },
    {
      id: 11,
      imgSrc: "/assets/images/Members/Manager/JiyoungYoon.png",
      name: "윤지영",
      department: "관광학과 23학번",
      role: "대외협력국장",
      task: "업체 미팅 · 대진표 및 행사 협력",
      imgWidth: "75px",
      imgHeight: "80px",
    },
    {
      id: 12,
      imgSrc: "/assets/images/Members/Manager/SoyulKim.png",
      name: "김소율",
      department: "행정학부 25학번",
      role: "대외협력부장",
      task: "업체 미팅 · 대진표 및 행사 협력",
      imgWidth: "80px",
      imgHeight: "80px",
    },
    {
      id: 13,
      imgSrc: "/assets/images/Members/Manager/SeungminChoi.png",
      name: "최승민",
      department: "관광학과 24학번",
      role: "안전시설국장",
      task: "행사 안전 관리 · 경기 운영 총괄",
      imgWidth: "75px",
      imgHeight: "80px",
    },
    {
      id: 14,
      imgSrc: "/assets/images/Members/Manager/SehongKim.png",
      name: "김세홍",
      department: "산업경영공학과 22학번",
      role: "안전시설국장",
      task: "행사 안전 관리 · 경기 운영 총괄",
      imgWidth: "90px",
      imgHeight: "90px",
    },

    {
      id: 15,
      imgSrc: "/assets/images/Members/Manager/MinjaeKwak.png",
      name: "곽민재",
      department: "기독교교육상담학과 25학번",
      role: "안전시설부장",
      task: "행사 안전 관리 · 경기 운영 총괄",
      imgWidth: "100px",
      imgHeight: "100px",
    },
  ];

  return (
    <div className="px-4 pt-24 min-h-screen overflow-y-auto">
      {/* 뒤로가기 버튼 */}
      <div className="absolute top-12 left-8 cursor-pointer" onClick={onBack}>
        <img
          src="/assets/images/Header/Back.png"
          className="w-[20px] h-[16px]"
          alt="back"
        />
      </div>

      {/* 2025 영암체전 기획자 */}
      <div className="text-white text-center">
        <p className="fontBold text-lg">2025 영암체전 기획자</p>
        <p className="fontLight text-[10px] my-14">
          2025 영암체전의 성공적인 개최를 위해 헌신과 노력을 아끼지 않은
          <br />
          제41대 솔:빛 총학생회 임원들을 소개합니다.
        </p>
      </div>

      {/* Map */}
      <div className="mt-6 text-white grid grid-cols-3 gap-3 px-3">
        {members.map((member) => (
          <div className="flex justify-center">
            <div
              key={member.id}
              className="w-[120px] h-[175px] text-black rounded-lg bg-[#F8F8F8] text-center flex flex-col justify-center items-center px-2 pt-1 pb-3"
            >
              {member.imgSrc && (
                <div className="w-full h-[90px] mb-2 flex justify-center items-center">
                  <img
                    src={member.imgSrc}
                    alt={member.name}
                    className="object-contain"
                    style={{
                      width: member.imgWidth || "80px",
                      height: member.imgHeight || "auto",
                    }}
                  />
                </div>
              )}
              <p className="text-[7px] fontRegular text-[#161616]">
                {member.department}
              </p>
              <p className="text-[10px] fontSB mt-1 text-[#161616]">
                {member.role} {member.name}
              </p>
              {member.task && (
                <>
                  <div className="w-[90%] h-[0.5px] bg-[#1880FF] my-2"></div>
                  <p className="text-[7px] fontMedium">{member.task}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 한 해 동안 어쩌구 */}
      <div className="text-white space-y-6 fontMedium text-[9px] text-[#EBEBEB] my-16 px-3">
        <p className="leading-[19px]">
          한 해 동안 2025 영암체전을 비롯한 다양한 행사에 함께해 주신 <br />
          학우 여러분께 진심으로 감사드립니다.
          <br />
          많은 부족함과 실수가 있었더라도, 언제나 묵묵히 노력한 총학생회
          임원들에게
          <br />
          따뜻한 응원과 지지를 보내주시길 부탁드립니다.
        </p>
        <p className="leading-[19px]">
          앞으로도 학생자치기구가 더 큰 빛을 내며 나아갈 수 있기를 바라며,
          <br />
          2025년 마지막 총학생회 행사를 마칩니다.
        </p>
        <p>- 제41대 빛을 찾아 나아가는 솔:빛 총학생회 올림 -</p>
      </div>
    </div>
  );
}
