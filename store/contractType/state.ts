import ContractTypeModal from '~/modals/contract_type_modal'

export interface ContractTypeState {
  contractTypeModalList: ContractTypeModal[];
}

const state = (): ContractTypeState => ({
  contractTypeModalList: []
})

export default state
