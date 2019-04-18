import { GetterTree } from "vuex";
import { RootState } from "store";
import { LoginModalState } from "./state";

const getters: GetterTree<LoginModalState, RootState> = {
  getShouldOpen: state => {
    return state.shouldOpen;
  }
};
export default getters;
