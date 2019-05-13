// import { fireDb } from "~/plugins/firebase";
//
// import CityModal from "~/modals/city_modal";
// import DistrictModal from "~/modals/district_modal";
// import WardModal from "~/modals/ward_modal";
// import BusinessTypeModal from "~/modals/business_type_modal";
//
// import FirebaseCollection from "~/enumerations/firebase_collection";

export default class UserInfoModal {
  public id?: string;
  public role?: string;
  public companyID?: string | null;
  public displayName?: string | null;
  public email?: string | null;
  public phoneNumber?: string | null;
  public photoURL?: string | null;
}
