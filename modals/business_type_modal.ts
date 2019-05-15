
export default class BusinessTypeModal {
  constructor() {}
  // static async fromDocumentReference(documentReference: firestore.DocumentReference) {
  //     const options: firestore.GetOptions | undefined =  undefined;
  //     const documentSnapshot: firestore.DocumentSnapshot = await documentReference.get(options);
  //     const documentData:
  //         | firestore.DocumentData
  //         | undefined = documentSnapshot.data();
  //     const businessTypeModal: BusinessTypeModal =  { ...documentData };
  //     businessTypeModal.id = documentSnapshot.id;
  //     return businessTypeModal;
  // }

  public id?: string;
  public desc?: string;
  public vi?: string;
  public ja?: string;
}
