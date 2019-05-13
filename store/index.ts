import { GetterTree, ActionContext, ActionTree, MutationTree } from "vuex";

import axios from "axios";
// import * as people from './modules/people'
import CityModal from "~/modals/city_modal";
import DistrictModal from "~/modals/district_modal";
import WardModal from "~/modals/ward_modal";
import BusinessTypeModal from "~/modals/business_type_modal";
import ContractTypeModal from "~/modals/contract_type_modal";

import CityService from "~/services/city_service";
import DistrictService from "~/services/district_service";
import WardService from "~/services/ward_service";
import BusinessTypeService from "~/services/business_type_service";
import ContractTypeService from "~/services/contract_type_service";

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
    // const response = await axios.get("/random-data.json", {
    //   proxy: { host: "127.0.0.1", port: 3000 }
    // });
    // const staticPeople = response.data.slice(0, 10);
    // // console.log(staticPeople);
    // commit(`people/SET`, staticPeople, { root: true });
    const cityService: CityService = CityService.getInstance();
    const districtService: DistrictService = DistrictService.getInstance();
    const wardService: WardService = WardService.getInstance();
    const businessTypeService: BusinessTypeService = BusinessTypeService.getInstance();
    const contractTypeService: ContractTypeService = ContractTypeService.getInstance();
    //
    // const cityModalList: CityModal[] = await cityService.getAllCityList();
    // const districtModalList: DistrictModal[] = await districtService.getAllDistrictList();
    // const wardModalList: WardModal[] = await wardService.getAllWardList();
    // const businessTypeModalList: BusinessTypeModal[] = await businessTypeService.getAllBusinessTypeList();
    // const contractTypeModalList: ContractTypeModal[] = await contractTypeService.getAllContractTypeList();

    // commit(`city/CREATE`, cityModalList, { root: true });
    // commit(`district/CREATE`, districtModalList, { root: true });
    // commit(`ward/CREATE`, wardModalList, { root: true });
    // commit(`businessType/CREATE`, businessTypeModalList, { root: true });
    // commit(`contractType/CREATE`, contractTypeModalList, { root: true });
  }
};

export const mutations: MutationTree<State> = {};
