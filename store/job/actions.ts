import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { plainToClass } from "class-transformer";
import { RootState } from 'store'
import JobService from '~/services/job_service'
import { JobState } from './state'
import {Job, JobsResponse} from '~/modals'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  createJob(context: ActionContext<S, R>, job: Job): void;
  getJobByID(context: ActionContext<S, R>, jobID: string): void;
}

const actions: Actions<JobState, RootState> = {
  async createJob({ commit }, job: Job) {
    const jobService: JobService = JobService.getInstance()
    // const jobID: string = await jobService.createJob(job);
    const jobID: string = 'fdaf'
    commit(types.SET_JOB_ID, jobID)
  },
  async addJobToList({ commit }, job: Job) {
    commit(types.ADD_JOB, job)
  },
  async getJobByID({ commit }, jobID: string) {
    const jobService = JobService.getInstance()
    const job: Job | null = new Job()
    commit(types.SET_JOB, job)
  },
  async getJobs({ commit }, queryParams: any) {
      const result: any = await this.$axios.$get("/api/jobs");
      let jobsResponse: JobsResponse = plainToClass(JobsResponse, result);
      // console.log("jobsResponse " + JSON.stringify(jobsResponse));
      commit(types.SET_JOBS, jobsResponse.data);
  },
  async getJobsByCompanyID({ commit }, companyID: string) {
    const jobService = JobService.getInstance()
    // const jobs:
    //   | Job[]
    //   | null = await jobService.getJobsByCompanyID(companyID);
    commit(types.SET_JOBS, [])
  }
}

export default actions
