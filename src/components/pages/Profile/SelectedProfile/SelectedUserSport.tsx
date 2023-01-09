import React from "react";
import {
  DataGrid,
  GridColDef
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { publicProfile } from '../../../../shared/customTypes';


interface SportProps {
  userSport: publicProfile
}


const SelectedUserSports: React.FunctionComponent <SportProps> = ({ userSport }) => {

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Sr",
      flex: 1,
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    { field: "name", headerName: "Sport", headerClassName: "primary", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    }
  ];

  return (
    <Paper elevation={8} sx={{ padding: 3, backgroundColor: "#ffffff" }}>  
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={userSport.user_sports || []}
        columns={columns}
        pageSize={5}
        // bulkActionButtons={false}
        getRowId={(row) => row.id}
        // onSelectionModelChange={changeSelectedRows}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
      />
    </div>
    </Paper>  
  );
};

export default SelectedUserSports;


