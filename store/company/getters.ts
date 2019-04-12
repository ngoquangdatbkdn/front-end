import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";
import { CompanyState } from "./state";
// import CompanyModal from '~/modals/company_modal'
const getters: GetterTree<CompanyState, RootState> = {
  getCompany: state => {
    return state.companyModal;
  }
};
export default getters;
