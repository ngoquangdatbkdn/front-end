// import "reflect-metadata";
import { Expose, Type } from "class-transformer";
import { Common } from "./common";
import { Account } from "./account";

export class Company {
  @Expose() id?: string;
  @Type(() => Account) account?: Account;
  @Expose() name?: string;
  @Expose() scale?: number;
  @Expose() salaryRange?: string;
  @Expose() activeJob?: string;
  @Expose() minSalary?: number;
  @Expose() maxSalary?: number;
  @Type(() => Common) businesses?: Common[];
  @Expose() logo?: string;
  @Expose() coverImage?: string;
  @Type(() => Common) city?: Common;
  @Type(() => Common) district?: Common;
  @Expose() address?: string;

  @Expose() status?: string;
}
