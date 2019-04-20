import { firestore } from "firebase/app";

import { fireDb } from "~/plugins/firebase";

import ContractTypeService from "~/services/contract_type_service";
import CityService from "~/services/city_service";
import DistrictService from "~/services/district_service";
import CompanyService from "~/services/company_service";
import WardService from "~/services/ward_service";

import JobModal from "~/modals/job_modal";
import CityModal from "~/modals/city_modal";
import DistrictModal from "~/modals/district_modal";
import WardModal from "~/modals/ward_modal";
import ContractTypeModal from "~/modals/contract_type_modal";

import FirebaseCollection from "~/enumerations/firebase_collection";
export default class JobService {
  private static instance: JobService;
  private contractTypeService: ContractTypeService = ContractTypeService.getInstance();
  private cityService: CityService = CityService.getInstance();
  private wardService: WardService = WardService.getInstance();
  private districtService: DistrictService = DistrictService.getInstance();
  private companyService: CompanyService = CompanyService.getInstance();
  private constructor() {}
  static getInstance() {
    if (!JobService.instance) {
      JobService.instance = new JobService();
    }
    return JobService.instance;
  }

  public async getJobByID(id: string): Promise<JobModal | null> {
    const documentReference = fireDb
      .collection(FirebaseCollection.Jobs.toString())
      .doc(id);
    const jobModal: JobModal | null = await this.getJobFromReference(
      documentReference
    );

    return jobModal;
  }

  public async createJob(jobModal: JobModal): Promise<string> {
    if (!jobModal.contractType) throw Error("there are no contract type");

    if (typeof jobModal.minSalary === "string")
      jobModal.minSalary = parseInt(jobModal.minSalary, 10);
    if (typeof jobModal.maxSalary === "string")
      jobModal.maxSalary = parseInt(jobModal.maxSalary, 10);

    let contractTypeModal: ContractTypeModal | undefined;
    if (jobModal.contractType) {
      contractTypeModal = this.contractTypeService.getContractTypeReferenceFromModal(
        jobModal.contractType
      );
      if (!contractTypeModal) throw Error("there are no contract type modal");
    }

    if (!jobModal.city) throw Error("there are no city");
    let cityModal: CityModal | undefined;
    if (jobModal.city) {
      cityModal = this.cityService.getCityReferenceFromModal(jobModal.city);
      if (!cityModal) throw Error("there are no city modal");
    }

    if (!jobModal.district) throw Error("there are no district ");
    let districtModal: DistrictModal | undefined;
    if (jobModal.district) {
      districtModal = this.districtService.getDistrictReferenceFromModal(
        jobModal.district
      );
      if (!districtModal) throw Error("there are no district modal");
    }

    if (!jobModal.ward) throw Error("there are no ward");
    let wardModal: WardModal | undefined;
    if (jobModal.ward) {
      wardModal = this.wardService.getWardReferenceFromModal(jobModal.ward);
      if (!wardModal) throw Error("there are no ward modal");
    }

    const collectionReference: firestore.CollectionReference = fireDb.collection(
      FirebaseCollection.Jobs.toString()
    );
    const documentReference: firestore.DocumentReference = await collectionReference.add(
      {
        ...jobModal,
        ward: wardModal,
        city: cityModal,
        district: districtModal,
        contractType: contractTypeModal
      }
    );
    console.log(documentReference.path);
    console.log(documentReference.id);
    await this.companyService.addJobIDToJobIDList(
      jobModal.companyID,
      documentReference.id
    );
    return documentReference.id;
  }

  private async getContractTypeModalFromSnapshot(
    documentSnapshot: firestore.DocumentSnapshot
  ): Promise<ContractTypeModal> {
    const contractTypeRef: firestore.DocumentReference = (documentSnapshot.data() as any)
      .contractType;
    if (!contractTypeRef)
      throw Error(
        "there is no contractTypeRef for job id " + documentSnapshot.id
      );
    const contractType: ContractTypeModal = await this.contractTypeService.getContractTypeFromReference(
      contractTypeRef
    );
    return contractType;
  }

  private async getCityModalFromSnapshot(
    documentSnapshot: firestore.DocumentSnapshot
  ): Promise<CityModal> {
    const cityRef: firestore.DocumentReference = (documentSnapshot.data() as any)
      .city;
    if (!cityRef)
      throw Error("there is no cityRef for job id " + documentSnapshot.id);
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
      throw Error("there is no districtRef for job id " + documentSnapshot.id);
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
      throw Error("there is no wardRef for job id " + documentSnapshot.id);
    const ward: WardModal = await this.wardService.getWardFromReference(
      wardRef
    );
    return ward;
  }

  public async getJobFromReference(
    documentReference: firestore.DocumentReference
  ): Promise<JobModal | null> {
    const documentSnapshot: firestore.DocumentSnapshot = await documentReference.get();
    if (!documentSnapshot) throw null;
    const jobData: firestore.DocumentData | undefined = documentSnapshot.data();

    const jobModal: JobModal = { ...jobData };

    const contractType: ContractTypeModal = await this.getContractTypeModalFromSnapshot(
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

    jobModal.id = documentSnapshot.id;
    jobModal.contractType = contractType;
    jobModal.city = city;
    jobModal.district = district;
    jobModal.ward = ward;

    return jobModal;
  }

  async getJobList(queryParams: any): Promise<JobModal[]> {
    const jobModalList: JobModal[] = [];

    const collectionReference: firestore.CollectionReference = fireDb.collection(
      FirebaseCollection.Jobs.toString()
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
      const jobModal: JobModal = queryDocumentSnapshot.data();
      jobModal.id = queryDocumentSnapshot.id;
      jobModal.city = await this.cityService.getCityFromReference(
        jobModal.city as firestore.DocumentReference
      );
      jobModal.district = await this.districtService.getDistrictFromReference(
        jobModal.district as firestore.DocumentReference
      );
      jobModal.ward = await this.wardService.getWardFromReference(
        jobModal.ward as firestore.DocumentReference
      );

      jobModal.contractType = await this.contractTypeService.getContractTypeFromReference(
        jobModal.contractType as firestore.DocumentReference
      );
      jobModalList.push(jobModal);
    }

    return jobModalList;
  }

  async getJobListByCompanyID(companyID: any): Promise<JobModal[]> {
    return this.getJobList({
      wheres: [
        {
          field: "companyID",
          operator: "==",
          value: companyID
        }
      ]
    });
  }
}
