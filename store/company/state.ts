import CompanyModal from "~/modals/company_modal";

export interface CompanyState {
  companyModal: CompanyModal;
  companyModalList: CompanyModal[];
  companyID: string;
}

const state = (): CompanyState => ({
  companyModal: new CompanyModal(),
  companyModalList: [],
  companyID: ""
});

export default state;
