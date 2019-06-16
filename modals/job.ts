import "reflect-metadata";
import "es6-shim";
import { Expose, Type } from "class-transformer";
import { Common } from "./common";
import { Company, JobTranslation } from "./";

export class Job {
  @Expose() id?: string;
  // @Expose({ name: "company_id" }) companyID?: String;
  @Type(() => Company) company?: Company;
  @Expose() name?: string;
  @Expose({ name: "business_ids" }) businessIDs?: Array<String>;
  @Expose({ name: "city_id" }) cityID?: String | null;
  @Expose({ name: "district_id" }) districtID?: String | null;
  @Expose({ name: "level_id" }) levelID?: String | null;
  @Expose({ name: "contract_id" }) contractID?: String | null;
  @Expose() address?: string;
  @Expose() logo?: string;

  @Expose() benefits?: string;
  @Expose({ name: "required_education" }) requiredEducation?: string;
  @Expose({ name: "required_experience" }) requiredExperience?: string;
  @Expose({ name: "required_language" }) requiredLanguage?: string;

  @Expose({ name: "cover_image" }) coverImage?: string;
  @Expose({ name: "japanese_level" }) japaneseLevel?: number;
  @Expose() desc?: string;

  @Expose({ name: "min_salary" }) minSalary?: number;
  @Expose({ name: "max_salary" }) maxSalary?: number;
  @Type(() => JobTranslation) translations?: JobTranslation[];
  @Expose() status?: string;
}
