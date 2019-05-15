import { Type, Expose } from "class-transformer";
import { Jobs, Job } from "./";

export class JobsResponse {
  @Expose()
  @Type(() => Job)
  data?: Jobs;
}
