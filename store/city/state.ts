import {Common} from '~/modals'

export interface CityState {
  cities: Common[];
}

const state = (): CityState => ({
  cities: []
})

export default state
