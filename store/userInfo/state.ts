import UserInfoModal from '~/modals/user_info_modal'

export interface UserState {
  userInfo: UserInfoModal;
}

const state = (): UserState => ({
  userInfo: {}
})

export default state
