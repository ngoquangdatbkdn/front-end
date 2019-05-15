// import { firestore } from "firebase/app";

// import { fireDb } from "~/plugins/firebase";

import ContractTypeModal from '~/modals/business_type_modal'

export default class ContractTypeService {
  private static instance: ContractTypeService;
  private constructor() {}
  static getInstance() {
    if (!ContractTypeService.instance) {
      ContractTypeService.instance = new ContractTypeService()
    }
    return ContractTypeService.instance
  }
  // get options(): firestore.GetOptions | undefined {
  //   return process.client ? { source: "cache" } : undefined;
  // }

  // public getContractTypeReferenceFromModal(
  //   contractTypeModal: ContractTypeModal
  // ): firestore.DocumentReference | undefined {
  //   const contractTypeRef:
  //     | firestore.DocumentReference
  //     | undefined = this.getContractTypeReferenceByID(contractTypeModal.id);
  //   return contractTypeRef;
  // }
  //
  // public getContractTypeReferenceByID(
  //   id: string | undefined
  // ): firestore.DocumentReference | undefined {
  //   if (!id) return undefined;
  //   const documentReference = fireDb
  //     .collection(FirebaseCollection.ContractTypes.toString())
  //     .doc(id);
  //   return documentReference;
  // }
  //
  // public async getContractTypeFromReference(
  //   documentReference: firestore.DocumentReference
  // ) {
  //   const documentSnapshot: firestore.DocumentSnapshot = await documentReference.get();
  //   const documentData:
  //     | firestore.DocumentData
  //     | undefined = documentSnapshot.data();
  //   const contractTypeModal: ContractTypeModal = { ...documentData };
  //   contractTypeModal.id = documentSnapshot.id;
  //   return contractTypeModal;
  // }
  //
  // public async getAllContractTypeList(): Promise<ContractTypeModal[]> {
  //   const contractTypeModalList: ContractTypeModal[] = [];
  //
  //   const collectionReference: firestore.CollectionReference = fireDb.collection(
  //     FirebaseCollection.ContractTypes.toString()
  //   );
  //
  //   const querySnapshot: firestore.QuerySnapshot = await collectionReference.get(
  //     this.options
  //   );
  //
  //   querySnapshot.docs.forEach(
  //     (queryDocumentSnapshot: firestore.QueryDocumentSnapshot) => {
  //       const contractTypeModal: ContractTypeModal = queryDocumentSnapshot.data();
  //       contractTypeModal.id = queryDocumentSnapshot.id;
  //       contractTypeModalList.push(contractTypeModal);
  //     }
  //   );
  //
  //   return contractTypeModalList;
  // }
}
