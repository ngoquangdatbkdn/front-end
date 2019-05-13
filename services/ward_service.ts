// import { firestore } from "firebase/app";
//
// import { fireDb } from "~/plugins/firebase";

import WardModal from "~/modals/business_type_modal";

import FirebaseCollection from "~/enumerations/firebase_collection";

export default class WardService {
  private static instance: WardService;
  private constructor() {}
  static getInstance() {
    if (!WardService.instance) {
      WardService.instance = new WardService();
    }
    return WardService.instance;
  }

  // get options(): firestore.GetOptions | undefined {
  //   return process.client ? { source: "cache" } : undefined;
  // }
  //
  // public getWardReferenceFromModal(
  //   businessTypeModal: WardModal
  // ): firestore.DocumentReference | undefined {
  //   const businessTypeRef:
  //     | firestore.DocumentReference
  //     | undefined = this.getWardReferenceByID(businessTypeModal.id);
  //   return businessTypeRef;
  // }
  //
  // public getWardReferenceByID(
  //   id: string | undefined
  // ): firestore.DocumentReference | undefined {
  //   if (!id) return undefined;
  //   const documentReference = fireDb
  //     .collection(FirebaseCollection.Wards.toString())
  //     .doc(id);
  //   return documentReference;
  // }
  //
  // public async getWardFromReference(
  //   documentReference: firestore.DocumentReference
  // ) {
  //   const documentSnapshot: firestore.DocumentSnapshot = await documentReference.get();
  //   const documentData:
  //     | firestore.DocumentData
  //     | undefined = documentSnapshot.data();
  //   const wardModal: WardModal = { ...documentData };
  //   wardModal.id = documentSnapshot.id;
  //   delete (wardModal as any).district;
  //   return wardModal;
  // }
  //
  // public async getAllWardList(): Promise<WardModal[]> {
  //   const wardModalList: WardModal[] = [];
  //
  //   const collectionReference: firestore.CollectionReference = fireDb.collection(
  //     FirebaseCollection.Wards.toString()
  //   );
  //
  //   const querySnapshot: firestore.QuerySnapshot = await collectionReference.get(
  //     this.options
  //   );
  //
  //   querySnapshot.docs.forEach(
  //     (queryDocumentSnapshot: firestore.QueryDocumentSnapshot) => {
  //       const wardModal: WardModal = queryDocumentSnapshot.data();
  //       // delete (wardModal as any).district;
  //       wardModal.id = queryDocumentSnapshot.id;
  //       wardModalList.push(wardModal);
  //     }
  //   );
  //
  //   return wardModalList;
  // }
}
