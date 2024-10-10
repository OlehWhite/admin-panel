import { ROLES } from "./constants.ts";

export const generateId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < 30; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return { id };
};

export const getRoleName = (userName: string) => {
  if (userName === ROLES.DEVELOPER) {
    return "Developer";
  } else if (userName === ROLES.SUPER_ADMIN) {
    return "Super admin";
  } else if (
    userName === ROLES.POSITIVE_RESET ||
    userName === ROLES.POSITIVE_RESET_SERVICES ||
    userName === ROLES.JERSEY_BEHAVIORAL_CARE ||
    userName === ROLES.POSITIVE_RESET_SERVICES_ISELIN ||
    userName === ROLES.POSITIVE_RESET_MANALAPAN ||
    userName === ROLES.POSITIVE_RESET_ELIZABETH ||
    userName === ROLES.OCEAN_INSIGHT_CENTER
  ) {
    return "Admin";
  }

  return "None";
};
