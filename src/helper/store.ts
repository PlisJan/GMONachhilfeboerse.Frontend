import Axios from "axios";
import createPersistedState from "vuex-persistedstate";

import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export interface State {
  token: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  currentComponent: string;
}

const getDefaultState = (): State => {
  return {
    token: "",
    user: {},
    currentComponent: "",
  };
};

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: getDefaultState(),
  plugins: [createPersistedState()],
  getters: {
    isLoggedIn: (state) => {
      return state.token;
    },
    getUser: (state) => {
      return state.user;
    },
    getCurrentComponent: (state) => {
      return state.currentComponent;
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: (state) => {
      Object.assign(state, getDefaultState());
    },
    SET_COMPONENT: (state, newComponent) => {
      state.currentComponent = newComponent;
    },
  },
  actions: {
    login: ({ commit }, { token, user }) => {
      commit("SET_TOKEN", token);
      commit("SET_USER", user);
      // set auth header
      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    changeComponent: ({ commit }, newComponent) => {
      commit("SET_COMPONENT", newComponent);
      console.log("asd" + newComponent);
    },
    logout: ({ commit }) => {
      commit("RESET", "");
    },
  },
});

// define your own `useStore` composition function
export function useStore(): Store<State> {
  return baseUseStore(key);
}
