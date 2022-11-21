import { Box } from "@mui/material";
import Header from "../../components/Header";
import AddCoin from "../../components/AddCoin";
import CoinsDataTable from "../../components/CoinsDataTable";
import { useDataApi } from "../../hooks/useDataApi";
import { auth, db } from "../../firebase/firebase.utils";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Fragment } from "react";

const CoinsTable = () => {
  const [user] = useAuthState(auth);
  const coinsRef = collection(db, "coins");
  const q = query(coinsRef, where("user", "==", user.uid));

  const [{ data, isLoading, isError }, doFetch] = useDataApi(q, {}, getDocs);

  console.log(isLoading);
  console.log(data);

  return (
    <Box m="20px">
      <Header title="Coin Table" subtitle="Table with all user's coins" />
      {isError && <div>Something went wrong...</div>}
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          <AddCoin data={data} />
          <CoinsDataTable />
        </Fragment>
      )}
    </Box>
  );
};

export default CoinsTable;
