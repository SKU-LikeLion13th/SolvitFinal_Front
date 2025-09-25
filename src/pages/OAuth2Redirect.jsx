import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";

export default function OAuth2Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await API.get("/api/me");

        const redirectPath = localStorage.getItem("redirectAfterLogin");

        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin");
          navigate(redirectPath);
        } else {
          navigate("/matchInfo");
        }
      } catch (err) {
        console.error("로그인 확인 실패:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
}
