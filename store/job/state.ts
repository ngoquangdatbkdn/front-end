import {Job} from '~/modals'

export interface JobState {
  job: Job;
  jobs: Job[];
  jobID: string;
}

const state = (): JobState => ({
  job: new Job(),
  jobs: [],
  jobID: ''
})

export default state
