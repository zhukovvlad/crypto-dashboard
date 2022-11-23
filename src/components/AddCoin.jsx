import React, { Fragment, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import axios from "axios";
import { COIN_DATABASE } from "../utils/consts";
import { db, auth } from "../firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { CoinData } from "../utils/apis";

function AddCoin({ data, setData }) {
  const [user] = useAuthState(auth);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


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
      await axios
        .get(CoinData(coin))
        .then((result) => {
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
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          postCoin(query);
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {isError && <div>We've got an error</div>}
      {isLoading && <div>It's ok. Just Loading</div>}
    </Fragment>
  );
}

export default AddCoin;
