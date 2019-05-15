import BusinessTypeModal from '~/modals/business_type_modal'

export interface BusinessTypeState {
  businessTypeModalList: BusinessTypeModal[];
}

const state = (): BusinessTypeState => ({
  businessTypeModalList: []
})

export default state
