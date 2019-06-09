import Common from '~/modals/business_type_modal'

export interface BusinessState {
  businesses: Common[];
}

const state = (): BusinessState => ({
  businesses: []
})

export default state
