import { GetterTree } from "vuex";
import { RootState } from "store";
import { ConfirmationModalState } from "./state";

const getters: GetterTree<ConfirmationModalState, RootState> = {
  getShouldOpenConfirmation: state => {
    return state.shouldOpenConfirmation;
  },
  getConfirmation: state => {
    return state.confirmation;
  }
};
export default getters;
