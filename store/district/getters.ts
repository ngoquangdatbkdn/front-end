import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";
import { DistrictState } from "./state";
// import DistrictModal from '~/modals/district_modal'
const getters: GetterTree<DistrictState, RootState> = {
  getDistrictModalList: state => {
    return state.districtModalList;
  }
};
export default getters;
