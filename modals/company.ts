// import "reflect-metadata";
import { Expose, Type } from "class-transformer";
import { Common } from "./common";
import { Account } from "./account";

export class Company {
  @Expose() id?: string;
  @Type(() => Account) account?: Account;
  @Expose() name?: string;
  @Expose() introduction?: string;
  @Expose() scale?: number;
  @Expose() salaryRange?: string;
  @Expose() activeJob?: string;
  @Expose() minSalary?: number;
  @Expose() maxSalary?: number;
  @Type(() => Common) businesses?: Common[];
  @Expose() logo?: string;
  @Expose({ name: "cover_image" }) coverImage?: string;
  @Expose({ name: "business_ids" }) businessIDs?: Array<String | null>;
  @Expose({name: "city_id"}) cityID?: String | null;
  @Expose({name: "district_id"})  districtID?: String | null;
  @Expose() address?: string;
  

  @Expose() status?: string;
}
