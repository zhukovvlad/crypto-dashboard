import { Box } from "@mui/material";
import Header from "../../components/Header";
import AddCoin from "../../components/AddCoin";
import CoinsDataTable from "../../components/CoinsDataTable";

const CoinsTable = () => {
  return (
    <Box m="20px">
      <Header title="Coin Table" subtitle="Table with all user's coins" />
      <AddCoin />
      <CoinsDataTable />
    </Box>
  );
}

export default CoinsTable;
