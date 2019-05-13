import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";
import JobService from "~/services/job_service";
import { JobState } from "./state";
import JobModal from "~/modals/job_modal";
import types from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  createJob(context: ActionContext<S, R>, jobModal: JobModal): void;
  getJobByID(context: ActionContext<S, R>, jobID: string): void;
}

const actions: Actions<JobState, RootState> = {
  async createJob({ commit }, jobModal: JobModal) {
    const jobService: JobService = JobService.getInstance();
    // const jobID: string = await jobService.createJob(jobModal);
    const jobID: string = 'fdaf';
    commit(types.SET_JOB_ID, jobID);
  },
  async addJobToList({ commit }, jobModal: JobModal) {
    commit(types.ADD_JOB, jobModal);
  },
  async getJobByID({ commit }, jobID: string) {
    const jobService = JobService.getInstance();
    const jobModal: JobModal | null = new JobModal();
    commit(types.SET_JOB_MODAL, jobModal);
  },
  async getJobList({ commit }, queryParams: any) {
    const jobService = JobService.getInstance();
    // const jobModalList: JobModal[] | null = await jobService.getJobList(
    //   queryParams
    // );
    commit(types.SET_JOB_MODAL_LIST, []);
  },
  async getJobListByCompanyID({ commit }, companyID: string) {
    const jobService = JobService.getInstance();
    // const jobModalList:
    //   | JobModal[]
    //   | null = await jobService.getJobListByCompanyID(companyID);
    commit(types.SET_JOB_MODAL_LIST, []);
  }
};

export default actions;
