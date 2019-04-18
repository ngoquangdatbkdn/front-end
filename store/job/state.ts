import JobModal from "~/modals/job_modal";

export interface JobState {
  jobModal: JobModal;
}

const state = (): JobState => ({
  jobModal: new JobModal()
});

export default state;
