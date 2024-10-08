import { IAuthorization } from "../types/login.types.ts";
import { IRoles } from "../types/role.types.ts";
import { IBlog, ILocation, Website } from "../types/websites.types.ts";

export const DEFAULT_AUTHORIZATION: IAuthorization = {
  login: "",
  password: "",
  failed: null,
};

export const ROLES: IRoles = {
  admin: "Admin",
  superAdmin: "Super admin",
};

export const DEFAULT_WEBSITE: Website = {
  id: "",
  keyName: "",
  title: "",
  address: "",
  tel: "",
  googleMaps: "",
  email: "",
  headerImages: [{ image: "", title: "", text: "" }],
  schedule: [
    { day: "Sunday", open: "", close: "" },
    { day: "Monday", open: "", close: "" },
    { day: "Tuesday", open: "", close: "" },
    { day: "Wednesday", open: "", close: "" },
    { day: "Thursday", open: "", close: "" },
    { day: "Friday", open: "", close: "" },
    { day: "Saturday", open: "", close: "" },
  ],
  links: [{ link: "", title: "" }],
  blogs: [
    {
      image: "",
      title: "",
      text: [],
      date: "",
      id: "",
    },
  ],
  locations: [
    {
      id: "",
      image: "",
      link: "",
      address: "",
      email: "",
      title: "",
      tel: "",
      googleMap: "",
      open: true,
    },
  ],
  ourPartners: [{ id: "", link: "", title: "", image: "" }],
  doctors: [
    {
      id: "",
      image: "",
      firstName: "",
      lastName: "",
      age: 0,
      text: "",
      title: "",
      link: "",
    },
  ],
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
