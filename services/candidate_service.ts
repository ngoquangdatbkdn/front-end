import { firestore } from "firebase/app";

import { fireDb } from "~/plugins/firebase";

import BusinessTypeService from "~/services/business_type_service";
import CityService from "~/services/city_service";
import DistrictService from "~/services/district_service";
import WardService from "~/services/ward_service";

import CandidateModal from "~/modals/candidate_modal";
import CityModal from "~/modals/city_modal";
import DistrictModal from "~/modals/district_modal";
import WardModal from "~/modals/ward_modal";
import BusinessTypeModal from "~/modals/business_type_modal";

import FirebaseCollection from "~/enumerations/firebase_collection";
export default class CandidateService {
  private static instance: CandidateService;
  private businessTypeService: BusinessTypeService = BusinessTypeService.getInstance();
  private cityService: CityService = CityService.getInstance();
  private wardService: WardService = WardService.getInstance();
  private districtService: DistrictService = DistrictService.getInstance();
  private constructor() {}
  static getInstance() {
    if (!CandidateService.instance) {
      CandidateService.instance = new CandidateService();
    }
    return CandidateService.instance;
  }

  public async getCandidateByID(id: string): Promise<CandidateModal | null> {
    const documentReference = fireDb
      .collection(FirebaseCollection.Candidates.toString())
      .doc(id);
    const candidateModal: CandidateModal | null = await this.getCandidateFromReference(
      documentReference
    );

    return candidateModal;
  }

  public async createCandidate(
    candidateModal: CandidateModal
  ): Promise<string> {
    if (!candidateModal.city) throw Error("there are no city");
    let cityModal: CityModal | undefined;
    if (candidateModal.city) {
      cityModal = this.cityService.getCityReferenceFromModal(
        candidateModal.city
      );
      if (!cityModal) throw Error("there are no city modal");
    }
    console.log("here 1");
    if (!candidateModal.district) throw Error("there are no district ");
    let districtModal: DistrictModal | undefined;
    if (candidateModal.district) {
      districtModal = this.districtService.getDistrictReferenceFromModal(
        candidateModal.district
      );
      if (!districtModal) throw Error("there are no district modal");
    }

    const collectionReference: firestore.CollectionReference = fireDb.collection(
      FirebaseCollection.Candidates.toString()
    );
    const id: string = candidateModal.id as string;
    candidateModal.id = undefined;
    // console.log('here ' + JSON.stringify(candidateModal) );
    await collectionReference.doc(id).set({
      fullName: candidateModal.fullName,
      email: candidateModal.email,
      dob: candidateModal.dob,
        addressDetail: candidateModal.addressDetail,
      city: cityModal,
      district: districtModal
    });
    return id;
  }

  private async getBusinessTypeModalFromSnapshot(
    documentSnapshot: firestore.DocumentSnapshot
  ): Promise<BusinessTypeModal> {
    const businessTypeRef: firestore.DocumentReference = (documentSnapshot.data() as any)
      .businessType;
    if (!businessTypeRef)
      throw Error(
        "there is no businessTypeRef for candidate id " + documentSnapshot.id
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
      throw Error(
        "there is no cityRef for candidate id " + documentSnapshot.id
      );
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
        "there is no districtRef for candidate id " + documentSnapshot.id
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
      throw Error(
        "there is no wardRef for candidate id " + documentSnapshot.id
      );
    const ward: WardModal = await this.wardService.getWardFromReference(
      wardRef
    );
    return ward;
  }

  public async getCandidateFromReference(
    documentReference: firestore.DocumentReference
  ): Promise<CandidateModal | null> {
    const documentSnapshot: firestore.DocumentSnapshot = await documentReference.get();
    if (!documentSnapshot) throw null;
    const candidateData:
      | firestore.DocumentData
      | undefined = documentSnapshot.data();

    const candidateModal: CandidateModal = { ...candidateData };

    const businessType: BusinessTypeModal = await this.getBusinessTypeModalFromSnapshot(
      documentSnapshot
    );

    const city: CityModal = await this.getCityModalFromSnapshot(
      documentSnapshot
    );

    const district: DistrictModal = await this.getDistrictModalFromSnapshot(
      documentSnapshot
    );


    candidateModal.id = documentSnapshot.id;
    candidateModal.businessType = businessType;
    candidateModal.city = city;
    candidateModal.district = district;

    return candidateModal;
  }

  async getCandidateList(queryParams: any): Promise<CandidateModal[]> {
    const candidateModalList: CandidateModal[] = [];

    const collectionReference: firestore.CollectionReference = fireDb.collection(
      FirebaseCollection.Candidates.toString()
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
      const candidateModal: CandidateModal = queryDocumentSnapshot.data();
      candidateModal.id = queryDocumentSnapshot.id;
      candidateModal.city = await this.cityService.getCityFromReference(
        candidateModal.city as firestore.DocumentReference
      );
      candidateModal.district = await this.districtService.getDistrictFromReference(
        candidateModal.district as firestore.DocumentReference
      );

      candidateModal.businessType = await this.businessTypeService.getBusinessTypeFromReference(
        candidateModal.businessType as firestore.DocumentReference
      );
      candidateModalList.push(candidateModal);
    }

    return candidateModalList;
  }

  public async addJobIDToJobIDList(
    candidateID: string | undefined,
    jobID: string
  ) {
    if (!candidateID) {
      throw "Why there are no candidateID";
      return;
    }
    const documentReference = fireDb
      .collection(FirebaseCollection.Candidates.toString())
      .doc(candidateID);
    if (documentReference) {
      await documentReference.update({
        jobIDs: firestore.FieldValue.arrayUnion(jobID)
      });
    }
  }
  public async updateShouldShowCandidate(
    candidateID: string | undefined,
    shouldShow: boolean
  ) {
    if (!candidateID) {
      throw "Why there are no candidateID";
      return;
    }
    const documentReference = fireDb
      .collection(FirebaseCollection.Candidates.toString())
      .doc(candidateID);
    console.log("shouldShow");
    console.log(shouldShow);
    console.log("candidateID");
    console.log(candidateID);
    if (documentReference) {
      await documentReference.update({
        shouldShow
      });
    }
  }
}
