import { IAuthorization } from "../types/login.types.ts";
import { IBlog, IDoctor, ILocation, Website } from "../types/websites.types.ts";

export const DEFAULT_AUTHORIZATION: IAuthorization = {
  login: "",
  password: "",
  failed: null,
};

export enum ROLES {
  DEVELOPER = "DEVELOPER",
  SUPER_ADMIN = "SUPER_ADMIN",
  POSITIVE_RESET = "POSITIVE_RESET",
  POSITIVE_RESET_SERVICES = "POSITIVE_RESET_SERVICES",
  JERSEY_BEHAVIORAL_CARE = "JERSEY_BEHAVIORAL_CARE",
  POSITIVE_RESET_SERVICES_ISELIN = "POSITIVE_RESET_SERVICES_ISLIN",
  POSITIVE_RESET_MANALAPAN = "POSITIVE_RESET_MANALAPAN",
  POSITIVE_RESET_ELIZABETH = "POSITIVE_RESET_ELIZABETH",
  OCEAN_INSIGHT_CENTER = "OCEAN_INSIGHT_CENTER",
}

export const DEFAULT_WEBSITE: Website = {
  id: "",
  keyName: "",
  title: "",
  address: "",
  tel: "",
  googleMaps: "",
  email: "",
  headerImages: [],
  schedule: [
    { day: "Sunday", open: "", close: "" },
    { day: "Monday", open: "", close: "" },
    { day: "Tuesday", open: "", close: "" },
    { day: "Wednesday", open: "", close: "" },
    { day: "Thursday", open: "", close: "" },
    { day: "Friday", open: "", close: "" },
    { day: "Saturday", open: "", close: "" },
  ],
  links: [
    { title: "Instagram", link: "" },
    { title: "Facebook", link: "" },
    { title: "LinkedIn", link: "" },
    { title: "Twitter", link: "" },
  ],
  blogs: [],
  locations: [],
  ourPartners: [],
  doctors: [],
};

export const DEFAULT_BLOG: IBlog = {
  image: "",
  title: "",
  text: [],
  date: "",
  id: "",
};

export const DEFAULT_LOCATION: ILocation = {
  id: "",
  image: "",
  link: "",
  address: "",
  email: "",
  title: "",
  tel: "",
  googleMap: "",
  open: true,
};

export const DEFAULT_DOCTOR: IDoctor = {
  image: "",
  firstName: "",
  lastName: "",
  age: 0,
  text: "",
  title: "",
  link: "",
  id: "",
};
