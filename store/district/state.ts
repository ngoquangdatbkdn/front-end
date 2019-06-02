import {Common} from '~/modals'

export interface DistrictState {
  districts: Common[];
}

const state = (): DistrictState => ({
  districts: []
})

export default state
