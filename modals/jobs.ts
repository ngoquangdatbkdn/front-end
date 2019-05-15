import { Job } from "./";

export class Jobs extends Array<Job> {
  findByID(id: string) {
    return this.find(job => job.id === id);
  }
}
