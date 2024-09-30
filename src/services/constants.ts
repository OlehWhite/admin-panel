import { IAuthorization } from "../types/login.types.ts";
import { IBreadcrumbs, IRoles } from "../types/role.types.ts";

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

export const BREADCRUMBS_PROFILE: IBreadcrumbs[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Profile",
    link: "/profile",
  },
];

export const BREADCRUMBS_HOME: IBreadcrumbs[] = [
  {
    title: "Home",
    link: "/",
  },
];

export const BREADCRUMBS_WEBSITE: IBreadcrumbs[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Website",
    link: "/website/:id",
  },
];

export const DEFAULT_WEBSITE = {
  id: "",
  keyName: "",
  title: "",
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
  address: "",
  tel: "",
  googleMaps: "",
  links: [{ link: "", title: "" }],
  blogs: [
    {
      img: "",
      title: "",
      text: "",
    },
  ],
  locations: [{ img: "", link: "", address: "", email: "", text: "" }],
  email: "",
  ourPartners: [],
  doctors: [{ img: "", name: "", firstName: "", text: "" }],
};

export const test = {
  POSITIVE_RESET_SERVICES: {
    id: "kjh123kjhg432jhg23jlh4g",
    keyName: "POSITIVE_RESET_SERVICES",
    title: "Positive Reset Services",
    headerImages: [],
    schedule: [
      { day: "Sunday", open: "", close: "" },
      { day: "Monday", open: "9am", close: "5pm" },
      { day: "Tuesday", open: "9am", close: "5pm" },
      { day: "Wednesday", open: "9am", close: "5pm" },
      { day: "Thursday", open: "9am", close: "5pm" },
      { day: "Friday", open: "9am", close: "5pm" },
      { day: "Saturday", open: "", close: "" },
    ],
    address: "address 123",
    tel: "12390 012 3",
    googleMaps: "link",
    links: [{ link: "", title: "" }],
    blogs: [
      {
        img: "img",
        title: "title",
        text: "text",
      },
    ],
    locations: [{ img: "", link: "", address: "", email: "", text: "" }],
    email: "email",
    ourPartners: [{}],
    doctors: [{ img: "", name: "", firstName: "", text: "" }],
  },
  POSITIVE_RESET: {
    id: "kjh1543kjре632jhg23кнп5g",
    keyName: "POSITIVE_RESET",
    title: "Positive Reset",
    headerImages: [],
    schedule: [{ day: "", time: "" }],
    address: "address 123",
    tel: "12390 012 3",
    googleMaps: "link",
    links: [{ link: "", title: "" }],
    blogs: [
      {
        img: "img",
        title: "title",
        text: "text",
      },
    ],
    locations: [{ img: "", link: "", address: "", email: "", text: "" }],
    email: "email",
    ourPartners: [{}],
    doctors: [{ img: "", name: "", firstName: "", text: "" }],
  },
};
