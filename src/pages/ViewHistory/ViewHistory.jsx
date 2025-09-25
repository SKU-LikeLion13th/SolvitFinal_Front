import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import UserPaid from "./UserPaid";
import UserUnpaid from "./UserUnpaid";

export default function ViewHistory() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // 더미 데이터 (백 연결 전용)
  const dummyData = {
    paid: [
      { name: "이호연", id: 1 },
      { name: "이호돌", id: 2 },
    ],
    unpaid: [
      { name: "이호똥", id: 3 },
      { name: "이호뿡", id: 4 },
    ],
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const userPaid = false; // true 납부자, false 미납자
        setStatus(userPaid ? "paid" : "unpaid");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="px-6 pt-[60px] bg-[#161616] min-h-screen text-white">
      <img
        src="/assets/images/bg_LB.png"
        className="absolute bottom-0 left-0 w-[50%]"
        alt=""
      />
      <Header showBack={true} />
      {status === "paid" ? (
        <UserPaid dummyData={dummyData} />
      ) : (
        <UserUnpaid dummyData={dummyData} />
      )}
    </div>
  );
}
