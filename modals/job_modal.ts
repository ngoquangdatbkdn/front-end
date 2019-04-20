import { firestore } from "firebase/app";

import CityModal from "~/modals/city_modal";
import DistrictModal from "~/modals/district_modal";
import WardModal from "~/modals/ward_modal";
import ContractTypeModal from '~/modals/contract_type_modal'

export default class JobModal {
  constructor() {}
  public id?: string;
  public name_ja?: string;
  public name_vi?: string;
  public companyID?: string;
  public contractType?: ContractTypeModal | firestore.DocumentReference;
  public minSalary?: number;
  public maxSalary?: number;
  public city?: CityModal;
  public district?: DistrictModal;
  public ward?: WardModal;
  public coverImage?: string;
  public requiredSkill_ja?: string;
  public requiredSkill_vi?: string;
  public requiredLanguage_ja?: string;
  public requiredLanguage_vi?: string;
  public description_ja?: string;
  public description_vi?: string;
  public benefit_ja?: string;
  public benefit_vi?: string;
  public shouldShow?: false
}
