import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../utils/axios";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await API.get("/log/status", {
          withCredentials: true,
        });

        if (response.data?.name) {
          setIsAuthenticated(true);

          // role이 ADMIN인지 체크
          if (response.data?.roleType === "ADMIN") {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error("인증 체크 실패:", error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-white text-[16px]">로딩 중...</div>
      </div>
    );
  }

  // 관리자 권한이 필요한 페이지인 경우
  if (requireAdmin) {
    if (!isAuthenticated) {
      // 로그인 안 되어 있으면 로그인 페이지로
      return <Navigate to="/Login" replace />;
    }

    if (!isAdmin) {
      // 로그인은 되어 있지만 관리자가 아니면 메인으로
      window.alert("관리자만 접근할 수 있습니다.");
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
