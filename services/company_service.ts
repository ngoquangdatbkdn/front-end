import { firestore } from "firebase/app";

import { fireDb } from "~/plugins/firebase";

import BusinessTypeService from "~/services/business_type_service";
import CityService from "~/services/city_service";
import DistrictService from "~/services/district_service";
import WardService from "~/services/ward_service";

import CompanyModal from "~/modals/company_modal";
import CityModal from "~/modals/city_modal";
import DistrictModal from "~/modals/district_modal";
import WardModal from "~/modals/ward_modal";
import BusinessTypeModal from "~/modals/business_type_modal";

import FirebaseCollection from "~/enumerations/firebase_collection";
export default class CompanyService {
  private static instance: CompanyService;
  private businessTypeService: BusinessTypeService = BusinessTypeService.getInstance();
  private cityService: CityService = CityService.getInstance();
  private wardService: WardService = WardService.getInstance();
  private districtService: DistrictService = DistrictService.getInstance();
  private constructor() {}
  static getInstance() {
    if (!CompanyService.instance) {
      CompanyService.instance = new CompanyService();
    }
    return CompanyService.instance;
  }

  public async getCompanyByID(id: string): Promise<CompanyModal | null> {
    const documentReference = fireDb
      .collection(FirebaseCollection.Companies.toString())
      .doc(id);
    const companyModal: CompanyModal | null = await this.getCompanyFromReference(
      documentReference
    );

    return companyModal;
  }

  public async createCompany(companyModal: CompanyModal): Promise<string> {
    if (!companyModal.businessType) throw Error("there are no business Type");

    if (typeof companyModal.staffNumber === "string")
      companyModal.staffNumber = parseInt(companyModal.staffNumber, 10);

    let businessTypeModal: BusinessTypeModal | undefined;
    if (companyModal.businessType) {
      businessTypeModal = this.businessTypeService.getBusinessTypeReferenceFromModal(
        companyModal.businessType
      );
      if (!businessTypeModal) throw Error("there are no business Type modal");
    }

    if (!companyModal.city) throw Error("there are no city");
    let cityModal: CityModal | undefined;
    if (companyModal.city) {
      cityModal = this.cityService.getCityReferenceFromModal(companyModal.city);
      if (!cityModal) throw Error("there are no city modal");
    }

    if (!companyModal.district) throw Error("there are no district ");
    let districtModal: DistrictModal | undefined;
    if (companyModal.district) {
      districtModal = this.districtService.getDistrictReferenceFromModal(
        companyModal.district
      );
      if (!districtModal) throw Error("there are no district modal");
    }

    if (!companyModal.ward) throw Error("there are no ward");
    let wardModal: WardModal | undefined;
    if (companyModal.ward) {
      wardModal = this.wardService.getWardReferenceFromModal(companyModal.ward);
      if (!wardModal) throw Error("there are no ward modal");
    }

    const collectionReference: firestore.CollectionReference = fireDb.collection(
      FirebaseCollection.Companies.toString()
    );
    const documentReference: firestore.DocumentReference = await collectionReference.add(
      {
        ...companyModal,
        ward: wardModal,
        city: cityModal,
        district: districtModal,
        businessType: businessTypeModal
      }
    );
    return documentReference.id;
  }

  private async getBusinessTypeModalFromSnapshot(
    documentSnapshot: firestore.DocumentSnapshot
  ): Promise<BusinessTypeModal> {
    const businessTypeRef: firestore.DocumentReference = (documentSnapshot.data() as any)
      .businessType;
    if (!businessTypeRef)
      throw Error(
        "there is no businessTypeRef for company id " + documentSnapshot.id
      );
    const businessType: BusinessTypeModal = await this.businessTypeService.getBusinessTypeFromReference(
      businessTypeRef
    );
    return businessType;
  }

  private async getCityModalFromSnapshot(
    documentSnapshot: firestore.DocumentSnapshot
  ): Promise<CityModal> {
    const cityRef: firestore.DocumentReference = (documentSnapshot.data() as any)
      .city;
    if (!cityRef)
      throw Error("there is no cityRef for company id " + documentSnapshot.id);
    const city: CityModal = await this.cityService.getCityFromReference(
      cityRef
    );
    return city;
  }

  private async getDistrictModalFromSnapshot(
    documentSnapshot: firestore.DocumentSnapshot
  ): Promise<DistrictModal> {
    const districtRef: firestore.DocumentReference = (documentSnapshot.data() as any)
      .district;
    if (!districtRef)
      throw Error(
        "there is no districtRef for company id " + documentSnapshot.id
      );
    const district: DistrictModal = await this.districtService.getDistrictFromReference(
      districtRef
    );
    return district;
  }

  private async getWardModalFromSnapshot(
    documentSnapshot: firestore.DocumentSnapshot
  ): Promise<WardModal> {
    const wardRef: firestore.DocumentReference = (documentSnapshot.data() as any)
      .ward;
    if (!wardRef)
      throw Error("there is no wardRef for company id " + documentSnapshot.id);
    const ward: WardModal = await this.wardService.getWardFromReference(
      wardRef
    );
    return ward;
  }

  public async getCompanyFromReference(
    documentReference: firestore.DocumentReference
  ): Promise<CompanyModal | null> {
    const documentSnapshot: firestore.DocumentSnapshot = await documentReference.get();
    if (!documentSnapshot) throw null;
    const companyData:
      | firestore.DocumentData
      | undefined = documentSnapshot.data();

    const companyModal: CompanyModal = { ...companyData };

    const businessType: BusinessTypeModal = await this.getBusinessTypeModalFromSnapshot(
      documentSnapshot
    );

    const city: CityModal = await this.getCityModalFromSnapshot(
      documentSnapshot
    );

    const district: DistrictModal = await this.getDistrictModalFromSnapshot(
      documentSnapshot
    );

    const ward: WardModal = await this.getWardModalFromSnapshot(
      documentSnapshot
    );

    companyModal.id = documentSnapshot.id;
    companyModal.businessType = businessType;
    companyModal.city = city;
    companyModal.district = district;
    companyModal.ward = ward;

    return companyModal;
  }

  async getCompanyList(queryParams: any): Promise<CompanyModal[]> {
    const companyModalList: CompanyModal[] = [];

    const collectionReference: firestore.CollectionReference = fireDb.collection(
      FirebaseCollection.Companies.toString()
    );

    let query: firestore.Query = collectionReference;
    if (queryParams) {
      if (queryParams.limitation) {
        query = collectionReference.limit(queryParams.limitation);
      }
      if (queryParams.wheres && queryParams.wheres.length > 0) {
        queryParams.wheres.forEach(where => {
          query = query.where(where.field, where.operator, where.value);
        });
      }
    }

    const querySnapshot: firestore.QuerySnapshot = await query.get();
    const queryDocumentSnapshotList: firestore.QueryDocumentSnapshot[] =
      querySnapshot.docs;
    for (let i = 0; i < queryDocumentSnapshotList.length; i++) {
      const queryDocumentSnapshot: firestore.QueryDocumentSnapshot =
        queryDocumentSnapshotList[i];
      const companyModal: CompanyModal = queryDocumentSnapshot.data();
      companyModal.id = queryDocumentSnapshot.id;
      companyModal.city = await this.cityService.getCityFromReference(
        companyModal.city as firestore.DocumentReference
      );
      companyModal.district = await this.districtService.getDistrictFromReference(
        companyModal.district as firestore.DocumentReference
      );
      companyModal.ward = await this.wardService.getWardFromReference(
        companyModal.ward as firestore.DocumentReference
      );

      companyModal.businessType = await this.businessTypeService.getBusinessTypeFromReference(
        companyModal.businessType as firestore.DocumentReference
      );
      companyModalList.push(companyModal);
    }

    return companyModalList;
  }

  public async addJobIDToJobIDList(
    companyID: string | undefined,
    jobID: string
  ) {
    if (!companyID) {
      throw "Why there are no companyID";
      return;
    }
    const documentReference = fireDb
      .collection(FirebaseCollection.Companies.toString())
      .doc(companyID);
    if (documentReference) {
      await documentReference.update({
        jobIDs: firestore.FieldValue.arrayUnion(jobID)
      });
    }
  }
  public async updateShouldShowCompany(
    companyID: string | undefined,
    shouldShow: boolean
  ) {
    if (!companyID) {
      throw "Why there are no companyID";
      return;
    }
    const documentReference = fireDb
      .collection(FirebaseCollection.Companies.toString())
      .doc(companyID);
    console.log('shouldShow')
    console.log(shouldShow)
    console.log('companyID')
    console.log(companyID)
    if (documentReference) {
      await documentReference.update({
        shouldShow
      });
    }
  }
}
