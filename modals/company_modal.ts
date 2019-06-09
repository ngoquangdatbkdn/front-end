// import { firestore } from "firebase/app";

import CityModal from '~/modals/city_modal'
import DistrictModal from '~/modals/district_modal'
import WardModal from '~/modals/ward_modal'
import businessModal from '~/modals/business_type_modal'

export default class CompanyModal {
  constructor() {}

  public id?: string;
  public ja?: string;
  public vi?: string;
  public salaryRange?: string;
  public activeJob?: string;
  public staffNumber?: number;
  public minSalary?: number;
  public maxSalary?: number;
  public business?: businessModal;
  public address?: string;
  public logo?: string;
  public coverImage?: string;
  public introduction_ja?: string;
  public introduction_vi?: string;
  public city?: CityModal;
  public district?: DistrictModal ;
  public ward?: WardModal ;
  public shouldShow?: boolean
}
