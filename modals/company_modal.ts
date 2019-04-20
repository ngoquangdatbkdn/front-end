import { firestore } from "firebase/app";


import CityModal from "~/modals/city_modal";
import DistrictModal from "~/modals/district_modal";
import WardModal from "~/modals/ward_modal";
import BusinessTypeModal from "~/modals/business_type_modal";

export default class CompanyModal {
  constructor() {}

  public id?: string;
  public name_ja?: string;
  public name_vi?: string;
  public salaryRange?: string;
  public activeJob?: string;
  public staffNumber?: number;
  public minSalary?: number;
  public maxSalary?: number;
  public businessType?: BusinessTypeModal | firestore.DocumentReference;
  public address?: string;
  public logo?: string;
  public coverImage?: string;
  public introduction_ja?: string;
  public introduction_vi?: string;
  public city?: CityModal | firestore.DocumentReference;
  public district?: DistrictModal | firestore.DocumentReference;
  public ward?: WardModal | firestore.DocumentReference;
  public shouldShow?: boolean
}
