// import { firestore } from "firebase/app";
// import { User } from "firebase/app";
// import { fireDb } from "~/plugins/firebase";
// import { fbAuth } from "~/plugins/firebase";
import UserInfoModal from '~/modals/user_info_modal'

export default class UserInfoService {
  private static instance: UserInfoService;
  private constructor() {}
  static getInstance() {
    if (!UserInfoService.instance) {
      UserInfoService.instance = new UserInfoService()
    }
    return UserInfoService.instance
  }

  // public async createUserInfo(id: string, userInfoModal: UserInfoModal): Promise<void> {
  //   const collectionReference: firestore.CollectionReference = fireDb.collection(
  //     FirebaseCollection.UserInfos.toString()
  //   );
  //   await collectionReference.doc(id).set(
  //     {
  //       ...userInfoModal
  //     }
  //   );
  //   console.log()
  // }
  //
  // async getUserInfoFromUser(user: User): Promise<UserInfoModal> {
  //   if (!user) throw Error("why there are no user");
  //   const userInfoModal: UserInfoModal = await this.getUserInfoByID(user.uid);
  //   userInfoModal.id = user.uid;
  //   userInfoModal.displayName = user.displayName;
  //   userInfoModal.email = user.email;
  //   userInfoModal.phoneNumber = user.phoneNumber;
  //   userInfoModal.photoURL = user.photoURL;
  //   return userInfoModal;
  // }
  //
  // async getUserInfoByID(id: string): Promise<UserInfoModal> {
  //   if (!id) throw Error("why there are no ID");
  //   const documentReference = this.getUserInfoReferenceByID(id);
  //   const userInfoModal: UserInfoModal = await this.getUserInfoFromReference(
  //     documentReference
  //   );
  //   return userInfoModal;
  // }
  //
  // public getUserInfoReferenceByID(id: string): firestore.DocumentReference {
  //   if (!id) throw "why there are no id user info";
  //   const documentReference = fireDb
  //     .collection(FirebaseCollection.UserInfos.toString())
  //     .doc(id);
  //   return documentReference;
  // }
  //
  // public async getUserInfoFromReference(
  //   documentReference: firestore.DocumentReference
  // ) {
  //   const documentSnapshot: firestore.DocumentSnapshot = await documentReference.get();
  //   const documentData:
  //     | firestore.DocumentData
  //     | undefined = documentSnapshot.data();
  //   const userInfoModal: UserInfoModal = {
  //     ...documentData
  //   };
  //   userInfoModal.id = documentSnapshot.id;
  //   return userInfoModal;
  // }
  //
  // public async updateUserInfoCompanyID(
  //   userID: string,
  //   companyID: string
  // ): Promise<void> {
  //     // console.log()
  //   const documentReference: firestore.DocumentReference = this.getUserInfoReferenceByID(
  //     userID
  //   );
  //   await documentReference.update({
  //     companyID
  //   });
  // }
}
