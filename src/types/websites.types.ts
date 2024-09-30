import { Dispatch, SetStateAction } from "react";

export interface Website {
  id: string;
  keyName: string;
  title: string;
  headerImages: any[];
  schedule: { day: string; open: string; close: string }[];
  address: string;
  tel: string;
  googleMaps: string;
  links: { link: string; title: string }[];
  blogs: { img: string; title: string; text: string }[];
  locations: {
    img: string;
    link: string;
    address: string;
    email: string;
    text: string;
  }[];
  email: string;
  ourPartners: any[];
  doctors: { img: string; name: string; firstName: string; text: string }[];
}

export interface Project {
  [key: string]: Website;
}

export interface WebsitesCollection {
  [docId: string]: Project;
}

export interface IWebsiteState {
  stateWebsite: Website;
  setStateWebsite: Dispatch<SetStateAction<Website>>;
}
