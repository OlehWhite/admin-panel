import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase.ts";

const auth = getAuth(app);

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log("User signed in:", userCredential.user.uid);
    console.log(userCredential);
  } catch (error) {
    console.error("Error signing in:", error);
  }
};
