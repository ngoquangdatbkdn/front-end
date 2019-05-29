import "reflect-metadata";
import "es6-shim";
import { Expose, Type } from "class-transformer";

export class JobTranslation {
  @Expose() id?: string;
  @Expose() desc?: string;
  @Expose() benefits?: string;
  @Expose({ name: "required_education" }) requiredEducation?: string;
  @Expose({ name: "required_experience" }) requiredExperience?: string;
  @Expose({ name: "required_language" }) requiredLanguage?: string;
  @Expose({ name: "in_use" }) inUse?: boolean;
}
