import { firestore } from "firebase/app";
import { auth } from "firebase/app";
import { fireDb } from "~/plugins/firebase";
import { fbAuth } from "~/plugins/firebase";

import FirebaseCollection from "~/enumerations/firebase_collection";

export default class AuthenticationService {
  private static instance: AuthenticationService;
  private constructor() {}

  static getInstance() {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService();
    }
    return AuthenticationService.instance;
  }

  async sendEmailVerification() {
    if (fbAuth.currentUser) {
      await fbAuth.currentUser.sendEmailVerification();
    }
  }
  async signUp(email: string, password: string): Promise<auth.UserCredential> {
    const userCredential: auth.UserCredential = await fbAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    return userCredential;
  }

  async signIn(email: string, password: string): Promise<auth.UserCredential> {
    const userCredential: auth.UserCredential = await fbAuth.signInWithEmailAndPassword(
      email,
      password
    );
    return userCredential;
  }
  async signOut(): Promise<void> {
    await fbAuth.signOut();
  }
}
