export interface LoginModalState {
  shouldOpen: boolean;
}

const state = (): LoginModalState => ({
    shouldOpen: false
});

export default state;
