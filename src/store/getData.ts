import { useEffect, useState } from "react";
import { db } from "../services/firebase.ts";
import { collection, onSnapshot } from "firebase/firestore";
import { WebsitesCollection } from "../types/websites.types.ts";
import { DEFAULT_BLOG } from "../services/constants.ts";

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

export const useGetBlog = () => {
  const storeBlogString = localStorage.getItem("blog");
  const storeBlog = storeBlogString
    ? JSON.parse(storeBlogString)
    : DEFAULT_BLOG;

  return { storeBlog };
};
