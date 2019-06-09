
export default class businessModal {
  constructor() {}
  // static async fromDocumentReference(documentReference: firestore.DocumentReference) {
  //     const options: firestore.GetOptions | undefined =  undefined;
  //     const documentSnapshot: firestore.DocumentSnapshot = await documentReference.get(options);
  //     const documentData:
  //         | firestore.DocumentData
  //         | undefined = documentSnapshot.data();
  //     const businessModal: businessModal =  { ...documentData };
  //     businessModal.id = documentSnapshot.id;
  //     return businessModal;
  // }

  public id?: string;
  public desc?: string;
  public vi?: string;
  public ja?: string;
}
