import { GetterTree, ActionContext, ActionTree, MutationTree } from "vuex";
import axios from "axios";
// import * as people from './modules/people'
import CityModal from "~/modals/city_modal";
import DistrictModal from "~/modals/district_modal";
import WardModal from "~/modals/ward_modal";
import BusinessTypeModal from "~/modals/business_type_modal";

export const types = {};

export interface RootState {}

export interface State {}

export const state = (): State => ({});

export const getters: GetterTree<State, RootState> = {};

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>): void;
}

export const actions: Actions<State, RootState> = {
  async nuxtServerInit({ commit }) {
    const response = await axios.get("/random-data.json", {
      proxy: { host: "127.0.0.1", port: 3000 }
    });
    const staticPeople = response.data.slice(0, 10);
    // console.log(staticPeople);
    commit(`people/SET`, staticPeople, { root: true });

    const cityModalList: CityModal[] = [];
    const hanoi: CityModal = new CityModal();
    hanoi.id = "314";
    hanoi.name = "Hà Nội";
    const danang: CityModal = new CityModal();
    danang.id = "333";
    danang.name = "Đà Nẵng";
    const hochiminh: CityModal = new CityModal();
    hochiminh.id = "1213";
    hochiminh.name = "Hồ Chí Minh";

    cityModalList.push(hanoi);
    cityModalList.push(danang);
    cityModalList.push(hochiminh);
    commit(`city/CREATE`, cityModalList, { root: true });

    const districtModalList: DistrictModal[] = [];
    const haichau: DistrictModal = new DistrictModal();
    haichau.id = "314";
    haichau.name = "Hải Châu";
    const thanhkhe: DistrictModal = new DistrictModal();
    thanhkhe.id = "333";
    thanhkhe.name = "Thanh Khê";
    const hoavang: DistrictModal = new DistrictModal();
    hoavang.id = "1213";
    hoavang.name = "Hòa Vang";

    districtModalList.push(haichau);
    districtModalList.push(thanhkhe);
    districtModalList.push(hoavang);
    commit(`district/CREATE`, districtModalList, { root: true });

    const wardModalList: WardModal[] = [];
    const hoacuong: WardModal = new WardModal();
    hoacuong.id = "314";
    hoacuong.name = "Hòa Cường";
    const hoaxuan: WardModal = new WardModal();
    hoaxuan.id = "333";
    hoaxuan.name = "Hòa Xuân";
    const haichau1: WardModal = new WardModal();
    haichau1.id = "1213";
    haichau1.name = "Hải Châu 1";

    wardModalList.push(hoacuong);
    wardModalList.push(hoaxuan);
    wardModalList.push(haichau1);
    commit(`ward/CREATE`, wardModalList, { root: true });

    const businessTypeModalList: BusinessTypeModal[] = [];
    const cntt: BusinessTypeModal = new BusinessTypeModal();
    cntt.id = "314";
    cntt.name = "Công nghệ thông tin";
    const dichvu: BusinessTypeModal = new BusinessTypeModal();
    dichvu.id = "333";
    dichvu.name = "Dịch vụ";
    const dulich: BusinessTypeModal = new BusinessTypeModal();
    dulich.id = "1213";
    dulich.name = "Du lịch";

    businessTypeModalList.push(cntt);
    businessTypeModalList.push(dichvu);
    businessTypeModalList.push(dulich);
    commit(`businessType/CREATE`, businessTypeModalList, { root: true });
  }
};

export const mutations: MutationTree<State> = {};
