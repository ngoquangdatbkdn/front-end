import "reflect-metadata";
import "es6-shim";
import { Expose, Type } from "class-transformer";
import { Common } from "./common";
import { Company, JobTranslation } from "./";

export class Job {
  @Expose() id?: string;
  @Expose({ name: "company_id" }) companyID?: String;
  @Expose() name?: string;
  @Expose({ name: "business_ids" }) businessIDs?: Array<String>;
  @Expose({ name: "city_id" }) cityID?: String | null;
  @Expose({ name: "district_id" }) districtID?: String | null;
  @Expose() address?: string;

  @Expose() @Type(() => Common) contract?: Common;

  @Expose() @Type(() => Common) level?: Common;
  @Expose() logo?: string;

  @Expose() benefits?: string;
  @Expose({ name: "required_education" }) requiredEducation?: string;
  @Expose({ name: "required_experience" }) requiredExperience?: string;
  @Expose({ name: "required_language" }) requiredLanguage?: string;

  @Expose({ name: "cover_image" }) coverImage?: string;
  @Expose({ name: "japanese_level" }) japaneseLevel?: string;
  @Expose() desc?: string;

  @Expose({ name: "min_salary" }) minSalary?: number;
  @Expose({ name: "max_salary" }) maxSalary?: number;
  @Type(() => JobTranslation) translations?: JobTranslation[];
  @Expose() status?: string;
}
