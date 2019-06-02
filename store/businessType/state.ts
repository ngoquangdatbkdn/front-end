import Common from '~/modals/business_type_modal'

export interface BusinessTypeState {
  businessTypes: Common[];
}

const state = (): BusinessTypeState => ({
  businessTypes: []
})

export default state
