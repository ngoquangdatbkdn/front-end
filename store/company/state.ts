import { Company } from "~/modals/company";

export interface CompanyState {
  company: Company;
  companies: Company[];
  companyID: string;
}

const state = (): CompanyState => ({
  company: new Company(),
  companies: [],
  companyID: ""
});

export default state;
