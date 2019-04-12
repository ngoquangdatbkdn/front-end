import CityModal from '~/modals/city_modal'
import DistrictModal from '~/modals/district_modal'
import WardModal from '~/modals/ward_modal'
import BusinessTypeModal from '~/modals/business_type_modal'

export default class CompanyModal {
  constructor() {}
  public id?: string;
  public name?: string;
  public salaryRange?: string;
  public activeJob?: string;
  public staffNumber?: string;
  public salaryMin?: number;
  public salaryMax?: number;
  public businessType?: BusinessTypeModal;
  public address?: string;
  public logo?: string;
  public coverImage?: string;
  public introduction?: string;
  public city?: CityModal;
  public district?: DistrictModal;
  public ward?: WardModal;
}
