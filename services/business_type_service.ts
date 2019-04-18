import { firestore } from "firebase/app";

import { fireDb } from "~/plugins/firebase";

import BusinessTypeModal from "~/modals/business_type_modal";

import FirebaseCollection from "~/enumerations/firebase_collection";

export default class BusinessTypeService {
  private static instance: BusinessTypeService;
  private constructor() {}
  static getInstance() {
    if (!BusinessTypeService.instance) {
      BusinessTypeService.instance = new BusinessTypeService();
    }
    return BusinessTypeService.instance;
  }
  get options(): firestore.GetOptions | undefined {
    return process.client ? { source: "cache" } : undefined;
  }

  public getBusinessTypeReferenceFromModal(
    businessTypeModal: BusinessTypeModal
  ): firestore.DocumentReference | undefined {
    const businessTypeRef:
      | firestore.DocumentReference
      | undefined = this.getBusinessTypeReferenceByID(businessTypeModal.id);
    return businessTypeRef;
  }

  public getBusinessTypeReferenceByID(
    id: string | undefined
  ): firestore.DocumentReference | undefined {
    if (!id) return undefined;
    const documentReference = fireDb
      .collection(FirebaseCollection.BusinessTypes.toString())
      .doc(id);
    return documentReference;
  }

  public async getBusinessTypeFromReference(
    documentReference: firestore.DocumentReference
  ) {
    const documentSnapshot: firestore.DocumentSnapshot = await documentReference.get();
    const documentData:
      | firestore.DocumentData
      | undefined = documentSnapshot.data();
    const businessTypeModal: BusinessTypeModal = { ...documentData };
    businessTypeModal.id = documentSnapshot.id;
    return businessTypeModal;
  }

  public async getAllBusinessTypeList(): Promise<BusinessTypeModal[]> {
    const businessTypeModalList: BusinessTypeModal[] = [];

    const collectionReference: firestore.CollectionReference = fireDb.collection(
      FirebaseCollection.BusinessTypes.toString()
    );

    const querySnapshot: firestore.QuerySnapshot = await collectionReference.get(
      this.options
    );

    querySnapshot.docs.forEach(
      (queryDocumentSnapshot: firestore.QueryDocumentSnapshot) => {
        const businessTypeModal: BusinessTypeModal = queryDocumentSnapshot.data();
        businessTypeModal.id = queryDocumentSnapshot.id;
        businessTypeModalList.push(businessTypeModal);
      }
    );

    return businessTypeModalList;
  }
}
