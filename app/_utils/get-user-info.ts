import { create } from 'zustand';

type LoggedUserInfo = {
  id: number;
  email: string;
  name: string;
  lastname: string;
  roleId: 2 | 3;
};

type UserInfoStore = {
  loggedUserInfo: LoggedUserInfo | null;
  clear: () => void;
  update: (userInfo: LoggedUserInfo) => void;
};

export const UseStoredUserInfo = create<UserInfoStore>((set) => ({
  loggedUserInfo: null,
  clear: () => set({ loggedUserInfo: null }),
  update: (newUserInfo) => set({ loggedUserInfo: newUserInfo }),
}));

export function getUserInfo() {
  const userInfo = UseStoredUserInfo((state) => state.loggedUserInfo);
  return userInfo;
}
