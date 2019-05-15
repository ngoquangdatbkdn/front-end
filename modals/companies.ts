import { Company } from "./company";

export class Companies extends Array<Company> {
  findByID(id: string) {
    return this.find(company => company.id === id);
  }
}
