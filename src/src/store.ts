import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Profile } from "./lib/definitions";

export interface UserStore {
  profile: Profile | undefined;
  loading: boolean;
  error: string | undefined;
  logout: () => void;
  getProfile: () => void;
  updateProfile: () => void;
}

function deleteUserCookie() {
  document.cookie = 'user=; path=/; max-age=0'
}

export const useUserStore = create(
    devtools<UserStore>((set) => ({
      profile: undefined,
      loading: false,
      error: undefined,
      logout: () => {
        deleteUserCookie();
        set({
          profile: undefined
        })
      },
      getProfile: async () => {
        set({ loading: true, error: undefined });
        try {
          const user_response = await fetch(import.meta.env.VITE_API_URL+'api/Profile/GetUserProfile', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
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
            loading: false,
          });
        }
      },
      updateProfile: async () => {
        set({ loading: true, error: undefined });
        try {
          const state = useUserStore.getState();
          if(!state.profile){
            return;
          }

          const user_response = await fetch(import.meta.env.VITE_API_URL+'api/Profile/UpdateProfile', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(state.profile)
          });

          if(!user_response.ok){
            console.error('response was not okay')
            set({
              error:user_response?.body?.toString()
            })
            return;
          }

          set({
            loading: false,
          });

        } catch (error) {
          console.log(error)
          set({
            loading: false,
            error: "An Error occured"
          });
        }
      },
  }))
); 