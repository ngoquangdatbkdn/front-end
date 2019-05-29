import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { plainToClass } from "class-transformer";
import { RootState } from "store";
// import JobService from "~/services/job_service";
import { JobState } from "./state";
import { Job, JobsResponse, JobResponse } from "~/modals";
import types from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  // createJob(context: ActionContext<S, R>, job: Job): void;
  // getJobByID(context: ActionContext<S, R>, id: string): void;
}

const actions: Actions<JobState, RootState> = {
  async createJob({ commit }, job: Job) {
    // const jobService: JobService = JobService.getInstance();
    // const id: string = await jobService.createJob(job);
    const id: string = "fdaf";
    commit(types.SET_JOB_ID, id);
  },
  async addJobToList({ commit }, job: Job) {
    commit(types.ADD_JOB, job);
  },
  async getJobByID({ commit }, id: string) {
    const result: any = await this.$axios.$get("/api/jobs/1");
    let jobResponse: JobResponse = plainToClass(JobResponse, result);
    // console.log("jobResponse " + JSON.stringify(jobResponse));

    commit(types.SET_JOB, jobResponse.data);
  },
  async getJobs({ commit }, queryParams: any) {
    const result: any = await this.$axios.$get("/api/jobs");
    let jobsResponse: JobsResponse = plainToClass(JobsResponse, result);
    commit(types.SET_JOBS, jobsResponse.data);
  },
  async getJobsByCompanyID({ commit }, companyID: string) {
      console.log('herre')
      const result: any = await this.$axios.$get("/api/jobs");
      let jobsResponse: JobsResponse = plainToClass(JobsResponse, result);
      commit(types.SET_JOBS, jobsResponse.data);
  }
};

export default actions;
