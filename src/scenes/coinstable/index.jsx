import { Box } from "@mui/material";
import Header from "../../components/Header";
import AddCoin from "../../components/AddCoin";
import CoinsDataTable from "../../components/CoinsDataTable";
import { auth, db } from "../../firebase/firebase.utils";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Fragment, useState, useEffect } from "react";

const CoinsTable = () => {
  const [user] = useAuthState(auth);
  const coinsRef = collection(db, "coins");
  const q = query(coinsRef, where("user", "==", user.uid));
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchedData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await getDocs(q);
        result.forEach((doc) => {
          setData((data) => [...data, doc.data()]);
        });
        console.log(data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Function for delete coin from database
   * @param {number} coinId 
   */
  const DeleteCoinById = async (coinId) => {
    const queryForDelete = query(
      coinsRef,
      where("user", "==", user.uid),
      where("id", "==", coinId)
    );

    const formDoc = await getDocs(queryForDelete);
    await deleteDoc(doc(db, "coins", formDoc.docs[0].id));
    const changeData = data.filter(
      (coinData) => coinData.id !== coinId
    );
    setData(changeData);
  }

  return (
    <Box m="20px">
      <Header title="Coin's Watchlist" subtitle="Table with all user's coins" />
      {isError && <div>Something went wrong...</div>}
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          <AddCoin data={data} setData={setData} />
          <CoinsDataTable dataArray={data} setDataArray={setData} onDelete={DeleteCoinById} />
        </Fragment>
        )}
    </Box>
  );
};

export default CoinsTable;
