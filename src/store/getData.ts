import { useEffect, useState } from "react";
import { db } from "../services/firebase.ts";
import { collection, onSnapshot } from "firebase/firestore";
import { WebsitesCollection } from "../types/websites.types.ts";

export const useGetWebsites = () => {
  const [websites, setWebsites] = useState<WebsitesCollection | {}>({});

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
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
