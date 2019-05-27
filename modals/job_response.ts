import { Type, Expose } from "class-transformer";
import { Jobs, Job } from "./";

export class JobResponse {
    @Type(() => Job)
  @Expose()
  data?: Job;
}
