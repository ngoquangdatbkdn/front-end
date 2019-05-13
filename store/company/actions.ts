import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";
import CompanyService from "~/services/company_service";
import { CompanyState } from "./state";
import CompanyModal from "~/modals/company_modal";
import types from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  createCompany(context: ActionContext<S, R>, companyModal: CompanyModal): void;
  getCompanyByID(context: ActionContext<S, R>, companyID: string): void;
}

const actions: Actions<CompanyState, RootState> = {
  async createCompany({ commit }, companyModal: CompanyModal) {
    const companyService: CompanyService = CompanyService.getInstance();
    // const companyID: string = await companyService.createCompany(companyModal);
    // commit(types.SET_COMPANY_ID, companyID);
  },
  async getCompanyByID({ commit }, companyID: string) {
    const companyService = CompanyService.getInstance();
    // const companyModal: CompanyModal | null = await companyService.getCompanyByID(
    //   companyID
    // );
    // commit(types.SET_COMPANY_MODAL, companyModal);
  },
  async getCompanyList({ commit }, queryParams: any) {
    const companyService = CompanyService.getInstance();
    // const companyModalList:
    //   | CompanyModal[]
    //   | null = await companyService.getCompanyList(queryParams);
    // commit(types.SET_COMPANY_MODAL_LIST, companyModalList);
  },
  async updateShouldShowCompany({ commit, state }, shouldShow: boolean) {
      console.log('here')
    const companyService = CompanyService.getInstance();
    // const companyID: string | undefined = state.companyModal.id;
    // await companyService.updateShouldShowCompany(companyID, shouldShow);
    // commit(types.SET_COMPANY_MODAL_LIST, companyModalList);
  }
};

export default actions;
