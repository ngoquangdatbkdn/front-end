import { firestore } from "firebase/app";

import { fireDb } from "~/plugins/firebase";

import DistrictModal from "~/modals/business_type_modal";

import FirebaseCollection from "~/enumerations/firebase_collection";

export default class DistrictService {
  private static instance: DistrictService;
  private constructor() {}
  static getInstance() {
    if (!DistrictService.instance) {
      DistrictService.instance = new DistrictService();
    }
    return DistrictService.instance;
  }
  get options(): firestore.GetOptions | undefined {
    return process.client ? { source: "cache" } : undefined;
  }

  public getDistrictReferenceFromModal(
    districtModal: DistrictModal
  ): firestore.DocumentReference | undefined {
    const districtRef:
      | firestore.DocumentReference
      | undefined = this.getDistrictReferenceByID(districtModal.id);
    return districtRef;
  }

  public getDistrictReferenceByID(
    id: string | undefined
  ): firestore.DocumentReference | undefined {
    if (!id) return undefined;
    const documentReference = fireDb
      .collection(FirebaseCollection.Districts.toString())
      .doc(id);
    return documentReference;
  }

  public async getDistrictFromReference(
    documentReference: firestore.DocumentReference
  ) {
    const documentSnapshot: firestore.DocumentSnapshot = await documentReference.get();
    const documentData:
      | firestore.DocumentData
      | undefined = documentSnapshot.data();
    const districtModal: DistrictModal = { ...documentData };
    districtModal.id = documentSnapshot.id;
    delete (districtModal as any).city;
    return districtModal;
  }

  public async getAllDistrictList(): Promise<DistrictModal[]> {
    const districtModalList: DistrictModal[] = [];

    const collectionReference: firestore.CollectionReference = fireDb.collection(
      FirebaseCollection.Districts.toString()
    );

    const querySnapshot: firestore.QuerySnapshot = await collectionReference.get(
      this.options
    );

    querySnapshot.docs.forEach(
      (queryDocumentSnapshot: firestore.QueryDocumentSnapshot) => {
        const districtModal: DistrictModal = queryDocumentSnapshot.data();
        // delete (districtModal as any).city;
        districtModal.id = queryDocumentSnapshot.id;
        districtModalList.push(districtModal);
      }
    );

    return districtModalList;
  }
}
