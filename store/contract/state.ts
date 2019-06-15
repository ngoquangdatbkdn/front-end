import {Common} from '~/modals'

export interface ContractState {
  contracts: Common[];
}

const state = (): ContractState => ({
  contracts: []
})

export default state
