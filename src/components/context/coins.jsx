import { createContext, useState, useCallback } from "react";
import { auth, db } from "../../firebase/firebase.utils";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

const CoinsContext = createContext();

function Provider({ children }) {
  const [user] = useAuthState(auth);
  const [coins, setCoins] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCoins = useCallback(async () => {
    const coinsRef = collection(db, "coins");
    const q = query(coinsRef, where("user", "==", user.uid));

    setIsError(false);
    setIsLoading(true);

    try {
      const result = await getDocs(q);
      result.forEach((doc) => {
        setCoins((data) => [...data, doc.data()]);
      });
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  }, [user]);

  const valueToShare = {
    coins,
    fetchCoins,
    isError,
    isLoading
  };

  return (
    <CoinsContext.Provider value={valueToShare}>
      {children}
    </CoinsContext.Provider>
  );
}

export { Provider };
export default CoinsContext;
