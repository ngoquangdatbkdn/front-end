import DistrictModal from '~/modals/district_modal'

export interface DistrictState {
  districtModalList: DistrictModal[];
}

const state = (): DistrictState => ({
  districtModalList: []
})

export default state
