import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase.ts";

export const saveProjectsToFirestore = async (projectsData: any) => {
  try {
    const docRef = doc(db, "projects", "j2W4Y5MrUiKzUvfGfgiO");
    await setDoc(docRef, projectsData);
    console.log("Project data successfully saved!");
  } catch (error) {
    console.error("Error saving project data:", error);
  }
};
