export interface Website {
  id: string;
  title: string;
  address: string;
  tel: string;
  googleMaps: string;
  headerImages: string[];
  schedule: { day: string; time: string }[];
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

// Тип для структури проекту
export interface Project {
  [key: string]: Website;
}

// Тип для всієї колекції проектів
export interface WebsitesCollection {
  [docId: string]: Project;
}

export interface IWebsiteState {
  stateWebsite: any;
  setStateWebsite: any;
}
