import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { config } from "./firebase.config";

const app = initializeApp(config);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider(auth);

provider.setCustomParameters({ promt: "select_account" });

export const signWithGoogle = async () => {
  const { user } = await signInWithPopup(auth, provider);
  console.log(user);
};
