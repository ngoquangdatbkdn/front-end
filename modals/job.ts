// import "reflect-metadata";
import { Expose, Type } from "class-transformer";
import { Common } from "./common";
import { Company } from "./";

export class Job {
  @Expose() id?: string;
  @Expose() @Type(() => Company) company?: Company;
  @Expose() name?: string;
  @Expose() @Type(() => Common) contract?: Common;
  @Expose() @Type(() => Common) business?: Common;
  @Expose() @Type(() => Common) level?: Common;
  @Expose() logo?: number;
  @Expose({ name: "japaneseLevel" }) japanese_level?: string;
  @Expose() desc?: string;
  @Expose() @Type(() => Common) city?: Common;
  @Expose() @Type(() => Common) district?: Common;
  @Expose() address?: string;
  @Expose({ name: "minSalary" }) min_salary?: number;
  @Expose({ name: "maxSalary" }) max_salary?: number;
  @Expose() status?: string;
}
