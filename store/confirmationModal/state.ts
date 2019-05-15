export interface ConfirmationModalState {
  shouldOpenConfirmation: boolean;
  confirmation: any
}

const state = (): ConfirmationModalState => ({
  shouldOpenConfirmation: false,
  confirmation: null
})

export default state
