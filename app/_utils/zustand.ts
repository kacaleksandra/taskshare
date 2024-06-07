import { create } from 'zustand';

export type LoggedUserInfo = {
  id: number;
  email: string;
  name: string;
  lastname: string;
  roleId: number;
};

export type UserInfoStore = {
  loggedUserInfo: LoggedUserInfo | null;
  clear: () => void;
  update: (userInfo: LoggedUserInfo) => void;
};

export const UseStoredUserInfo = create<UserInfoStore>((set) => ({
  loggedUserInfo: null,
  clear: () => set({ loggedUserInfo: null }),
  update: (newUserInfo) => set({ loggedUserInfo: newUserInfo }),
}));

export async function getUserInfo() {
  const userInfo = UseStoredUserInfo((state) => state.loggedUserInfo);
  return userInfo;
}
