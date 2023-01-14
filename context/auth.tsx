import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebase/client";
import { User } from "../types/user";

type ContextType = {
  fbUser: FirebaseUser | null | undefined;
  isLoading: boolean;
  user: User | undefined | null;
};

const AuthContext = createContext<ContextType>({
  fbUser: undefined,
  isLoading: true,
  user: undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [fbUser, setFbUser] = useState<FirebaseUser | null>();

  useEffect(() => {
    let unsubribe: Unsubscribe;

    onAuthStateChanged(auth, (resultUser) => {
      unsubribe?.();
      setFbUser(resultUser);
      setIsLoading(false);

      if (resultUser) {
        setIsLoading(true);
        const ref = doc(db, `users/${resultUser.uid}`);
        unsubribe = onSnapshot(ref, (snap) => {
          setUser(snap.data() as User);
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        fbUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
