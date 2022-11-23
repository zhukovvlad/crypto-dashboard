import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import { CoinsData } from "../utils/apis";
import { tokens } from "../theme";

const CoinsDataTable = ({ dataArray }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
    {
        field: "symbol",
        headerName: "Symbol",
        flex: 1,
        renderCell: (params) => (
            <Typography>
                {params.row.symbol.toUpperCase()}
            </Typography>
        )
    },
    {
        field: "current_price",
        headerName: "Price",
        flex: 1,
        renderCell: (params) => (
            <Typography color={colors.greenAccent[500]}>
                ${params.row.current_price.toLocaleString("en-US")}
            </Typography>
        ),
    },
    {
        field: "ath",
        headerName: "ATH",
        flex: 1,
        renderCell: (params) => (
            <Typography color={colors.greenAccent[500]}>
                ${params.row.ath.toLocaleString("en-US")}
            </Typography>
        ),
    },
    {
        field: "ath_change_percentage",
        headerName: "ATH Change",
        flex: 1,
        renderCell: (params) => (
            <Typography color={colors.greenAccent[500]}>
                {params.row.ath_change_percentage.toFixed(2)}%
            </Typography>
        ),
    }
  ];

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
    <Box>
      {isError && <div>We've got an error...</div>}
      {isLoading ? (
        <div>Loading table</div>
      ) : (
        // <div>
        //   {data?.map((row) => (
        //     <div key={row.id}>
        //       {row.name} - {row.symbol}
        //     </div>
        //   ))}
        // </div>
        <Box
          m="40px 0 0 0"
          height="70vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={data} columns={columns} />
        </Box>
      )}
    </Box>
  );
};

export default CoinsDataTable;
