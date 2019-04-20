import JobModal from "~/modals/job_modal";

export interface JobState {
  jobModal: JobModal;
  jobModalList: JobModal[];
  jobID: string;
}

const state = (): JobState => ({
  jobModal: new JobModal(),
  jobModalList: [],
  jobID: ""
});

export default state;
