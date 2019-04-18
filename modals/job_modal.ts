import CityModal from "~/modals/city_modal";
import DistrictModal from "~/modals/district_modal";
import WardModal from "~/modals/ward_modal";
import ContractTypeModal from '~/modals/contract_type_modal'

export default class JobModal {
  constructor() {}
  public name?: string;
  public company?: string;
  public location?: string;
  public salaryRange?: string;
  public lastUpdate?: string;
  public contractType?: ContractTypeModal;
  public minSalary?: number;
  public maxSalary?: number;
  public city?: CityModal;
  public district?: DistrictModal;
  public ward?: WardModal;
  public requiredSkill?: string;
  public requiredLanguage?: string;
  public detail?: string;
  public benefit?: string;
}
