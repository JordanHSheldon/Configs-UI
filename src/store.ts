import { createStore } from 'zustand';

const store = createStore<any>(() => ({
    IsUserLoggedIn: false,
}));

export default store;