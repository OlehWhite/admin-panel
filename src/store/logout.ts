import { NavigateFunction } from "react-router-dom";
import { user } from "./getData.ts";

export const useLogOut = async (navigate: NavigateFunction) => {
  try {
    if (user) {
      await localStorage.removeItem("user");
      navigate("/login");
    }
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
