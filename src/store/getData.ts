import { useEffect, useState } from "react";
import { db } from "../services/firebase.ts";
import { collection, onSnapshot } from "firebase/firestore";

export const useGetWebsites = () => {
  const [websites, setWebsites] = useState<any>({});

  const fetchData = () => {
    return onSnapshot(collection(db, "projects"), (snapshot) => {
      const data: any = {};
      snapshot.forEach((doc) => {
        data[doc.id] = doc.data();
      });
      setWebsites(data);
    });
  };

  useEffect(() => {
    const unsubscribe = fetchData();
    return () => unsubscribe();
  }, []);

  return { websites };
};

export const user = localStorage.getItem("user");

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
