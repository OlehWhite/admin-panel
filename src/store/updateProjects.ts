import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase.ts";
import { toast } from "react-toastify";
import { errorParams, successParams } from "../services/toastParams.ts";

export const saveProjectsToFirestore = async (projectsData: any) => {
  try {
    const docRef = doc(db, "projects", "j2W4Y5MrUiKzUvfGfgiO");
    await setDoc(docRef, projectsData);

    toast.success("Project data successfully saved!", successParams);
  } catch (error) {
    toast.error(`Error saving project data: ${error}`, errorParams);
  }
};
