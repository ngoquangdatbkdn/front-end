import {Job} from '~/modals'

export interface JobState {
  job: Job;
  jobs: Job[];
  id: string;
}

const state = (): JobState => ({
  job: new Job(),
  jobs: [],
  id: ''
})

export default state
