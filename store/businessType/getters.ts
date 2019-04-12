import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";
import { BusinessTypeState } from "./state";
// import BusinessTypeModal from '~/modals/business_type_modal'
const getters: GetterTree<BusinessTypeState, RootState> = {
  getBusinessTypeModalList: state => {
    return state.businessTypeModalList;
  }
};
export default getters;
