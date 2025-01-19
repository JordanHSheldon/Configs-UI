import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { cred, User } from "./lib/definitions";
import { redirect } from "react-router-dom";

export interface UserStore {
  user: User | undefined;
  loading: boolean;
  error: string | undefined;
  login: (username: string, password: string) => void;
  logout: () => void;
  getUser: (token: string) => void;
}

const setCookie = (cvalue: string) => {
  const d = new Date();
  d.setTime(d.getTime() + (30*24*60*60*1000));
  const expires = "expires="+ d.toUTCString();
  document.cookie = "user" + "=" + cvalue + ";" + expires + ";path=/";
}

export const useUserStore = create(
    devtools<UserStore>((set) => ({
        user: undefined,
        loading: false,
        error: undefined,
        login: async (email, password) => {
            set({ loading: true, error: undefined });
            try {
              const login_response = await fetch('https://localhost:7191/api/User/Login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
              });
        
              if (!login_response.ok) {
                throw new Error('Invalid username or password');
              }
        
              const token: cred = await login_response.json();
              if(token.result === "Not Found") {
                throw new Error("User could not be found.");
              }

              setCookie(token.result);
              redirect("/");
            } catch (error) {
                console.log(error)
              set({
                user: undefined,
                loading: false,
              });
            }
        },
        logout: () => {
            set({
              user: undefined,
        })},
        getUser: async (token: string | null) => {
          set({ loading: true, error: undefined });
          try {
            const user_response = await fetch('https://localhost:7191/api/Data/GetUserProfile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
            });
        
            if (!user_response.ok) {
              throw new Error('Unknown User');
            }
        
            const data: User = await user_response.json();
            set({
              user: data,
              loading: false,
            });
          } catch (error) {
              console.log(error)
            set({
              user: undefined,
              loading: false,
            });
          }
      },
    }))
);
