import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Profile } from "./lib/definitions";

export interface UserStore {
  user: string | undefined;
  profile: Profile | undefined;
  loading: boolean;
  error: string | undefined;
  logout: () => void;
  getUser: () => void;
}

function getCookie(): string | undefined {
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

  return undefined
}

function deleteUserCookie() {
  document.cookie = 'user=; path=/; max-age=0'
}

export const useUserStore = create(
    devtools<UserStore>((set) => ({
      user: getCookie(),
      profile: undefined,
      loading: false,
      error: undefined,
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
          if(!state.user){
            return;
          }
          
          const user_response = await fetch(import.meta.env.VITE_API_URL+'api/Profile/GetUserProfile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + state.user
            }
          });
      
          if(!user_response.ok){
            console.error('response was not okay')
            return;
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