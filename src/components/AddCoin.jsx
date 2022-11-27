import React, { Fragment, useState } from "react";
import {
  Box,
  TextField,
  Button,
  useTheme,
  IconButton,
  InputBase,
} from "@mui/material";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import { addDoc, collection } from "firebase/firestore";
import axios from "axios";
import { COIN_DATABASE } from "../utils/consts";
import { db, auth } from "../firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { tokens } from "../theme";
import { CoinData } from "../utils/apis";
import ErrorAddCoin from "./ErrorAddCoin";

function AddCoin({ data, setData }) {
  const [user] = useAuthState(auth);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const postCoin = async (coin) => {
    if (data?.length > 0) {
      for (let index = 0; index < data.length; index++) {
        if (coin === data[index].id) {
          console.log(`We already have ${coin} in databse`);
          setQuery("");
          throw new Error(`${coin} is already in database`);
        }
      }
    }

    setIsError(false);
    setIsLoading(true);

    try {
      await axios.get(CoinData(coin)).then((result) => {
        addDoc(collection(db, COIN_DATABASE), {
          user: user.uid,
          id: result.data.id,
        });
        setData((dataList) => [
          ...dataList,
          {
            user: user.uid,
            id: result.data.id,
          },
        ]);
      });

      setQuery("");
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response.data.error);
      setQuery("");
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          postCoin(query);
        }}
      >
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(10, minmax(0, 4fr))"
        >
          <TextField
            required
            fullWidth
            label="Enter The Coin Id"
            type="text"
            variant="filled"
            helperText="Coin for request in Coingecko"
            color="neutral"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ gridColumn: "span 3" }}
          />
        </Box>
      </Box>
      {isError && <ErrorAddCoin status={true} errorStatus={errorMessage} />}
      {isLoading && <div>It's ok. Just Loading</div>}
    </Fragment>
  );
}

export default AddCoin;
