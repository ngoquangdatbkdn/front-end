import "reflect-metadata";
import "es6-shim";
import {Expose, Type} from "class-transformer";
import {Common} from "./common";
import {Company, JobTranslation} from "./";

export class Job {
    @Expose() id?: string;
    @Expose() @Type(() => Company) company?: Company;
    @Expose() name?: string;
    @Expose() @Type(() => Common) contract?: Common;
    @Expose() @Type(() => Common) business?: Common;
    @Expose() @Type(() => Common) level?: Common;
    @Expose() logo?: string;
    @Expose({name: "cover_image"}) coverImage?: string;
    @Expose({name: "japanese_level"}) japaneseLevel?: string;
    @Expose() desc?: string;
    @Expose() @Type(() => Common) city?: Common;
    @Expose() @Type(() => Common) district?: Common;
    @Expose() address?: string;
    @Expose({name: "min_salary"}) minSalary?: number;
    @Expose({name: "max_salary"}) maxSalary?: number;
    @Type(() => JobTranslation) translations?: JobTranslation[];
    @Expose() status?: string;
}
