import { IAuthorization } from "../types/login.types.ts";
import { IRoles } from "../types/role.types.ts";

export const DEFAULT_AUTHORIZATION: IAuthorization = {
  login: "",
  password: "",
  failed: null,
};

export const ROLES: IRoles = {
  admin: "Admin",
  superAdmin: "Super admin",
  manager: "Manager",
};

export const DEFAULT_WEBSITE = {
  id: "",
  keyName: "",
  title: "",
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
  address: "",
  tel: "",
  googleMaps: "",
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
      image: "",
      link: "",
      address: "",
      email: "",
      text: "",
      title: "",
      tel: "",
      googleMap: "",
    },
  ],
  email: "",
  ourPartners: [{ link: "", title: "", image: "" }],
  doctors: [
    {
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

export const DEFAULT_BLOG = {
  image: "",
  title: "",
  text: [],
  date: "",
  id: "",
};
