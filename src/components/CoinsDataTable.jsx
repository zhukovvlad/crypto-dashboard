import { useEffect, useState } from "react";
import axios from "axios";

import { CoinsData } from "../utils/apis";

const CoinsDataTable = ({ dataArray }) => {

  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryString = dataArray
      .map((coin) => {
        return coin.id;
      })
      .join();

    const initialUrl = CoinsData(queryString);

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get(CoinsData(initialUrl));
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [dataArray]);

  return (
    <div>
      {isError && <div>We've got an error...</div>}
      {isLoading ? (
        <div>Loading table</div>
      ) : (
        <div>
          {data?.map((row) => (
            <div key={row.id}>
              {row.name} - {row.symbol}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoinsDataTable;
