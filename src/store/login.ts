import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../services/firebase.ts";

export const auth = getAuth(app);

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      password: password,
      name: userCredential.user.displayName,
    };

    localStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("Error signing in:", error);
  }
};
