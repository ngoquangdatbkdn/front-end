import "reflect-metadata";
import { GetterTree, ActionContext, ActionTree, MutationTree } from "vuex";

import axios from "axios";

export const types = {};

export interface RootState {}

export interface State {}

export const state = (): State => ({});

export const getters: GetterTree<State, RootState> = {};

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>): void;
}

export const actions: Actions<State, RootState> = {
  async nuxtServerInit({ commit }) {}
};

export const mutations: MutationTree<State> = {};
