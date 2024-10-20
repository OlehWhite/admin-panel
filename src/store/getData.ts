import { useEffect, useState } from "react";
import { db } from "../services/firebase.ts";
import { collection, onSnapshot } from "firebase/firestore";
import {
  Project,
  Website,
  WebsitesCollection,
} from "../types/websites.types.ts";
import {
  DEFAULT_BLOG,
  DEFAULT_LOCATION,
  DEFAULT_PROVIDER,
  DEFAULT_WEBSITE,
} from "../services/constants.ts";

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

export const useFindWebsite = (
  websites: { [key: string]: Project } | null,
  id: string,
) => {
  const [stateWebsite, setStateWebsite] = useState<Website>(DEFAULT_WEBSITE);

  useEffect(() => {
    if (websites) {
      const website = Object.entries(websites).reduce((acc, [, project]) => {
        const foundWebsite = Object.entries(project).find(
          ([, website]) => website.id === id,
        );
        return foundWebsite ? foundWebsite[1] : acc;
      }, DEFAULT_WEBSITE as Website);

      if (website) {
        setStateWebsite(website);
      }
    }
  }, [websites, id]);

  return { stateWebsite };
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

export const useGetLocation = () => {
  const storeLocationString = localStorage.getItem("location");
  const storeLocation = storeLocationString
    ? JSON.parse(storeLocationString)
    : DEFAULT_LOCATION;

  return { storeLocation };
};

export const useGetProvider = () => {
  const storeProviderString = localStorage.getItem("provider");
  const storeProvider = storeProviderString
    ? JSON.parse(storeProviderString)
    : DEFAULT_PROVIDER;

  return { storeProvider };
};
