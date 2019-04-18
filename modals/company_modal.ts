import { firestore } from "firebase/app";

import { fireDb } from "~/plugins/firebase";

import CityModal from "~/modals/city_modal";
import DistrictModal from "~/modals/district_modal";
import WardModal from "~/modals/ward_modal";
import BusinessTypeModal from "~/modals/business_type_modal";

import FirebaseCollection from "~/enumerations/firebase_collection";

export default class CompanyModal {
  constructor() {}

  public id?: string;
  public name?: string;
  public salaryRange?: string;
  public activeJob?: string;
  public staffNumber?: number;
  public minSalary?: number;
  public maxSalary?: number;
  public businessType?: BusinessTypeModal | firestore.DocumentReference;
  public address?: string;
  public logo?: string;
  public coverImage?: string;
  public introduction?: string;
  public city?: CityModal | firestore.DocumentReference;
  public district?: DistrictModal | firestore.DocumentReference;
  public ward?: WardModal | firestore.DocumentReference;
}
