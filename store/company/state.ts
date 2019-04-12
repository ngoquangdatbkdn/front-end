import CompanyModal from "~/modals/company_modal";

export interface CompanyState {
  companyModal: CompanyModal;
}

const state = (): CompanyState => ({
  companyModal: new CompanyModal()
});

export default state;
