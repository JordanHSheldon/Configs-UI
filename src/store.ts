import { createStore } from 'zustand';

const store = createStore<any>((set) => ({
    IsUserLoggedIn: false,
}));

export default store;