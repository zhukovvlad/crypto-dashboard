import React from "react";
import { Button, Typography } from "@mui/material";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, where } from "firebase/firestore";

function DeleteCoin({
  coinForDelete,
  setData,
  data,
  dataArray,
  setDataArray,
  onDelete,
}) {
  const [user] = useAuthState(auth);
  const coinsRef = collection(db, "coins");
  const q = query(
    coinsRef,
    where("user", "==", user.uid),
    where("id", "==", coinForDelete)
  );

  const handleDelete = async () => {
    const formDoc = await getDocs(q);
    console.log(formDoc.docs[0].id);
    await deleteDoc(doc(db, "coins", formDoc.docs[0].id));
    const changedRowData = data.filter(
      (coinData) => coinData.id !== coinForDelete
    );
    const changedDataArray = dataArray.filter(
      (coinData) => coinData.id !== coinForDelete
    );
    console.log("Changed rowData ", changedRowData);
    setData(changedRowData);
    setDataArray(changedDataArray);
    // console.log("All data ", data);
    // console.log("We will delete ", coinForDelete);
  };

  const handleClick = () => {
    onDelete(coinForDelete);
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleClick}>
      <Typography>Delete Coin</Typography>
    </Button>
  );
}

export default DeleteCoin;
