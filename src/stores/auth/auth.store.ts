import { create, StateCreator } from "zustand";
import { AuthStatus, User } from "../../interfaces";
import { AuthService } from "../../services/auth.service";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => void;

  checkAuthStatus: () => Promise<void>;

  logOutUser: () => void;
}

export const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",

  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);

      set({
        status: "authorized",
        token,
        user,
      });
    } catch (error) {
      set({
        status: "unauthorized",
        token: undefined,
        user: undefined,
      });
      throw "unauthorized";
    }
  },
  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkAuth();

      set({
        status: "authorized",
        token,
        user,
      });
    } catch (error) {
      set({
        status: "unauthorized",
        token: undefined,
        user: undefined,
      });
    }
  },
  logOutUser: () =>
    set({
      status: "unauthorized",
      token: undefined,
      user: undefined,
    }),
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(storeApi, {
      name: "auth-storage",
    })
  )
);
