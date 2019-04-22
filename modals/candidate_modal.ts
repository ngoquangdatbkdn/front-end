import { firestore } from "firebase/app";

import CityModal from "~/modals/city_modal";
import DistrictModal from "~/modals/district_modal";
import WardModal from "~/modals/ward_modal";
import BusinessTypeModal from "~/modals/business_type_modal";
import LevelModal from "~/modals/level_modal";
import ContractTypeModal from "~/modals/contract_type_modal";

export default class CandidateModal {
  constructor() {}

  public id?: string;
  public fullName?: string;
  public dob?: string;
  public email?: string;
  public businessType?: BusinessTypeModal | firestore.DocumentReference;
  public avatar?: string;
  public city?: CityModal | firestore.DocumentReference;
  public district?: DistrictModal | firestore.DocumentReference;
  public ward?: WardModal | firestore.DocumentReference;
  public skills?: LevelModal[];
  public japaneseCertificate?: LevelModal[];
  public englishCertificate?: LevelModal[];
  public otherLanguages?: LevelModal[];
  public certiticates?: LevelModal[];
  public academies?: LevelModal[];
  public wantedContractType?: ContractTypeModal | firestore.DocumentReference;
  public wantedJobTitle?: string;
  public wantedJobRank?: string;
  public wantedSalary?: number;
  public wantedWorkplace?: string;
  public wantedCity?: CityModal | firestore.DocumentReference;
  public wantedDistrict?: DistrictModal | firestore.DocumentReference;

  public shouldShow?: boolean;
}
