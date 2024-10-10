import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase.ts";
import { toast } from "react-toastify";
import { errorParams, successParams } from "../services/toastParams.ts";

export const saveProjectsToFirestore = async (projectsData: any) => {
  try {
    const docRef = doc(db, "projects", "j2W4Y5MrUiKzUvfGfgiO");
    await setDoc(docRef, projectsData);

    toast.success("Your changes have been successfully saved!", successParams);
  } catch (error) {
    toast.error(`Error saving changes: ${error}`, errorParams);
  }
};
