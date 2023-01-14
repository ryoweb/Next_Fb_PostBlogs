import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/client";

export const login = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      console.log(`hi,${result.user.displayName}`);
    })
    .catch((e) => console.log(e));
};

export const logout = () => {
  return signOut(auth).then(() => {
    console.log("sighout");
  });
};
