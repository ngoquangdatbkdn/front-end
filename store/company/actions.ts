import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { plainToClass } from "class-transformer";
import { RootState } from "store";
import CompanyService from "~/services/company_service";
import { CompanyState } from "./state";
import { Account } from "~/modals";
import { Company, Companies, CompaniesResponse } from "~/modals";

import types from "./types";


export interface Actions<S, R> extends ActionTree<S, R> {
  // createCompany(context: ActionContext<S, R>, company: Company): void;
  // getCompanyByID(context: ActionContext<S, R>, id: string): void;
  // getCompanyList(context: ActionContext<S, R>, queryParams: any): void;
}

const actions: Actions<CompanyState, RootState> = {
  async createCompany({ commit }, company: Company) {
    const companyService: CompanyService = CompanyService.getInstance();
    // const companyID: string = await companyService.createCompany(company);
    // commit(types.SET_COMPANY_ID, companyID);
  },
  async getCompanyByID({ commit }, id: string) {
    const result: any = await this.$axios.$get("/api/companies/1");
    let company: Company = plainToClass(Company, result.data);
    console.log("account " + JSON.stringify(company));
    commit(types.SET_COMPANY, company);
  },
  async getCompanies({ commit }, queryParams: any) {
      const result: any = await this.$axios.$get("/api/companies");
      let companiesResponse: CompaniesResponse = plainToClass(CompaniesResponse, result);
      console.log("companiesResponse " + JSON.stringify(companiesResponse));
      commit(types.SET_COMPANIES, companiesResponse.data);
  },
  async updateShouldShowCompany({ commit, state }, shouldShow: boolean) {
    console.log("here");
    const companyService = CompanyService.getInstance();
    // const companyID: string | undefined = state.company.id;
    // await companyService.updateShouldShowCompany(companyID, shouldShow);
    // commit(types.SET_COMPANIES, companies);
  }
};

export default actions;
