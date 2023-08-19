import { atom } from "recoil";

export const registerState = atom({
  key: "registerState",
  default: localStorage.getItem("usertoken") ? true : false,
});

export const loginState = atom({
  key: "loginState",
  default: localStorage.getItem("usertoken") ? true : false,
});

export const coursesState = atom({
  key: "coursesState",
  default: [],
});

export const purchasedCoursesState = atom({
  key: "purchasedCoursesState",
  default: [],
});

export const drawerOpenState = atom({
  key: "drawerOpenState",
  default: false,
});
