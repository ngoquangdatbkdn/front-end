export interface RegisterModalState {
  shouldOpenRegister: boolean;
}

const state = (): RegisterModalState => ({
  shouldOpenRegister: false
})

export default state
