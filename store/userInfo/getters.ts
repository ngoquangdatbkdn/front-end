import { GetterTree } from "vuex";
import { RootState } from "store";
import { UserState } from "./state";

const getters: GetterTree<UserState, RootState> = {
  getShouldOpen: state => {
    return state.userInfo;
  }
};
export default getters;
