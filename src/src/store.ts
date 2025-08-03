import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { cred, Profile } from "./lib/definitions";
import { redirect } from "react-router-dom";

export interface UserStore {
  user: string | undefined;
  profile: Profile | undefined;
  loading: boolean;
  error: string | undefined;
  login: (username: string, password: string) => void;
  logout: () => void;
  getUser: () => void;
}

function setCookie(user: string) {
  document.cookie = `user=${user}; path=/; max-age=${60 * 60 * 24 * 7}`
}

function getCookie(): string | null {
  const cookies = document.cookie.split('; ')
  const userCookie = cookies.find(row => row.startsWith('user='))
  
  if (userCookie) {
    const value = userCookie.split('=')[1]
    try {
      return value;
    } catch (e) {
      console.error('Failed to parse user cookie', e)
    }
  }

  return null
}

function deleteUserCookie() {
  document.cookie = 'user=; path=/; max-age=0'
}

export const useUserStore = create(
    devtools<UserStore>((set) => ({
      user: getCookie() ?? undefined,
      profile: undefined,
      loading: false,
      error: undefined,
      login: async (email, password) => {
          set({ loading: true, error: undefined });
          try {
            const login_response = await fetch(import.meta.env.VITE_API_URL+'api/User/Login', {
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
            set({ loading: false, error: undefined, user: token.result});
            
            const state = useUserStore.getState();
            state.getUser();
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
        deleteUserCookie();
        set({
          user: undefined,
          profile: undefined
        })
      },
      getUser: async () => {
        set({ loading: true, error: undefined });
        try {
          const state = useUserStore.getState();
          const user_response = await fetch(import.meta.env.VITE_API_URL+'api/Data/GetUserProfile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + state.user
            }
          });
      
          if (!user_response.ok) {
            throw new Error('Unknown User');
          }
      
          const data: Profile = await user_response.json();
          set({
            profile: data,
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