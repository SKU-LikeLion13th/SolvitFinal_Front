import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MatchLayout from "../components/MatchLayout";

export default function Member() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    studentId: "",
    major: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://final.sku-sku.com/students/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("회원가입 완료!");
      navigate("/MatchInfo");
    } else {
      alert("회원가입 실패");
    }
  };

  return (
    <MatchLayout>
      <div className="flex flex-col w-9/12 min-h-screen mt-[6%]">
        <div className="flex flex-col">
          <div className="flex mb-1 text-[#0073FF] fontRegular text-md">
            청춘열전
          </div>
          <div className="text-2xl text-white fontMedium">
            결승전 승부예측 안내
          </div>
        </div>

        <div className="flex flex-col mt-5 text-[#A9A9A9] text-[13.5px] fontRegular">
          <div className="my-1">
            경품 추첨 진행을 위해 아래 정보를 입력해 주세요.
          </div>
          <div>학과, 학번이나 이름이 잘못 입력된 경우 추첨에서 제외됩니다.</div>
        </div>

        <form className="flex flex-col w-full mt-[13%]" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full mb-10">
            <div className="text-[14px] fontMedium">학과</div>
            <input
              type="text"
              name="major"
              value={form.major}
              onChange={handleChange}
              className="w-[80%] text-[14px] fontMedium px-2 py-1.5 mt-4 bg-transparent rounded-md border-[#818181] border-[0.5px]"
            />
          </div>

          <div className="flex flex-col w-full mb-10">
            <div className="text-[14px] fontMedium">학번</div>
            <input
              type="text"
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              className="w-[80%] text-[14px] fontMedium px-2 py-1.5 mt-4 bg-transparent rounded-md border-[#818181] border-[0.5px]"
            />
          </div>

          <div className="flex flex-col w-full mb-10">
            <div className="text-[14px] fontMedium">이름</div>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-[80%] text-[14px] fontMedium px-2 py-1.5 mt-4 bg-transparent rounded-md border-[#818181] border-[0.5px]"
            />
          </div>

          <div className="flex flex-col w-full">
            <div className="text-[14px] fontMedium">연락처</div>
            <input
              type="text"
              name="phoneNum"
              value={form.phoneNum}
              onChange={handleChange}
              placeholder="- 없이 입력해주세요"
              className="placeholder:text-[13px] placeholder:text-[#797979] w-[80%] text-[14px] fontMedium px-2 py-1.5 mt-4 bg-transparent rounded-md border-[#818181] border-[0.5px]"
            />
          </div>

          <div className="flex items-end justify-center mt-[25%] mb-10 w-full">
            <button
              type="submit"
              className="z-10 flex justify-center fontSB text-sm items-center bg-[#0073FF] text-white w-[70%] py-2 rounded-2xl"
            >
              다음
            </button>
          </div>
        </form>
      </div>
    </MatchLayout>
  );
}
