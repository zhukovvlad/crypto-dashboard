import React, { useState } from "react";
import axios from "axios";
import { useDataApi } from "../hooks/useDataApi";

function AddCoin({ data }) {
  const [query, setQuery] = useState("bitcoin");
  const [coin, setCoin] = useState("");
  const [{ fetchData, isLoading, isError }, doFetch] = useDataApi(
    "https://api.coingecko.com/api/v3/coins/${id}",
    []
  );

  setCoin(fetchData.id);
  console.log(coin);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        doFetch(`https://api.coingecko.com/api/v3/coins/${query}`);
      }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddCoin;
