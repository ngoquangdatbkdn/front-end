// import "reflect-metadata";
import { Expose, Type } from "class-transformer";
import { Companies, Company } from "./";

export class CompaniesResponse {
  @Type(() => Company)
  data?: Companies;
}
