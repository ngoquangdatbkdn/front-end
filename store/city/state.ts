import CityModal from "~/modals/city_modal";

export interface CityState {
  cityModalList: CityModal[];
}

const state = (): CityState => ({
  cityModalList: []
});

export default state;
