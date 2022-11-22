import { CoinsData } from "../utils/apis";
import { useDataApi } from "../hooks/useDataApi";

const CoinsDataTable = ({ dataArray }) => {
  const queryString = dataArray
    .map((coin) => {
      return coin.id;
    })
    .join();

  const initialUrl = CoinsData(queryString);

  console.log(initialUrl);

  const [{ data, isLoading, isError }, setUrl] = useDataApi(
    initialUrl,
    []
  );

  console.log("Data Array is ", data);

  return (
    <div>
      {isLoading ? (
        <div>Loading table</div>
      ) : (
        <div>
          {data.map((row) => (
            <div key={row.id}>{row.name} - {row.symbol}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoinsDataTable;
