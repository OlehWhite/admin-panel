import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLoader = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return null;
};

export default UserLoader;
