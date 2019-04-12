import WardModal from "~/modals/ward_modal";

export interface WardState {
  wardModalList: WardModal[];
}

const state = (): WardState => ({
  wardModalList: []
});

export default state;
