import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CitizenAttributes from "../types/CitizenAttribute";

interface Props {
  data: CitizenAttributes[];
}

const columns: GridColDef[] = [
  { field: "value", headerName: "Trait Name", width: 180 },
  { field: "count", headerName: "Trait Count", type: "number", width: 180 },
  {
    field: "percent",
    headerName: "Trait Rarity (%)",
    type: "number",
    width: 190,
  },
];

const AdvancedDataTable = ({ data }: Props) => {
  return (
    <div style={{ height: 800, width: "100%", boxShadow: "0px 10px 50px 0px rgba(0, 0, 0, 0.1)" }}>
      <DataGrid rows={data.map((d, id) => ({ ...d, id }))} columns={columns} pageSize={15} rowsPerPageOptions={[15]} />
    </div>
  );
};

export default AdvancedDataTable;
