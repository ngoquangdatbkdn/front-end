import { firestore } from "firebase/app";

import { fireDb } from "~/plugins/firebase";

import CityModal from "~/modals/business_type_modal";

import FirebaseCollection from "~/enumerations/firebase_collection";

export default class CityService {
  private static instance: CityService;
  private constructor() {}
  static getInstance() {
    if (!CityService.instance) {
      CityService.instance = new CityService();
    }
    return CityService.instance;
  }

  get options(): firestore.GetOptions | undefined {
    return process.client ? { source: "cache" } : undefined;
  }

  public getCityReferenceFromModal(
    cityModal: CityModal
  ): firestore.DocumentReference | undefined {
    const cityRef:
      | firestore.DocumentReference
      | undefined = this.getCityReferenceByID(cityModal.id);
    return cityRef;
  }

  public getCityReferenceByID(
    id: string | undefined
  ): firestore.DocumentReference | undefined {
    if (!id) return undefined;
    const documentReference = fireDb
      .collection(FirebaseCollection.Cities.toString())
      .doc(id);
    return documentReference;
  }

  public async getCityFromReference(
    documentReference: firestore.DocumentReference
  ): Promise<CityModal> {
    const documentSnapshot: firestore.DocumentSnapshot = await documentReference.get();
    const documentData:
      | firestore.DocumentData
      | undefined = documentSnapshot.data();
    const cityModal: CityModal = {
      ...documentData
    };
    cityModal.id = documentSnapshot.id;
    return cityModal;
  }

  public async getAllCityList(): Promise<CityModal[]> {
    const cityModalList: CityModal[] = [];

    const collectionReference: firestore.CollectionReference = fireDb.collection(
      FirebaseCollection.Cities.toString()
    );

    const querySnapshot: firestore.QuerySnapshot = await collectionReference.get(
      this.options
    );

    querySnapshot.docs.forEach(
      (queryDocumentSnapshot: firestore.QueryDocumentSnapshot) => {
        const cityModal: CityModal = queryDocumentSnapshot.data();
        cityModal.id = queryDocumentSnapshot.id;
        cityModalList.push(cityModal);
      }
    );

    return cityModalList;
  }
}
