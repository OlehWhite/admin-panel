import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./login.ts";
import { db } from "../services/firebase.ts";
import { toast } from "react-toastify";
import { errorParams, successParams } from "../services/toastParams.ts";

export const createUser = async (email, password, displayName) => {
  try {
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters", errorParams);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format", errorParams);
      return;
    }

    // Створення користувача у Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Оновлення профілю користувача з додаванням displayName
    await updateProfile(user, {
      displayName: displayName,
    });

    // Додавання додаткових даних у Firestore, включаючи дозволи на редагування проектів
    await setDoc(doc(db, "users", user.uid), {
      displayName: displayName,
      email: email,
      permissions: {
        projects: "edit", // або будь-які інші ролі, які визначають доступ
      },
    });

    toast.success("User created successfully", successParams);
  } catch (error) {
    // toast.error(`Error creating user: ${error}`, errorParams);
    console.error(error);
  }
};
