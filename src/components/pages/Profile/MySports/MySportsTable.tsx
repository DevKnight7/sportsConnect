import React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "./tableStyles.css";
import { toast } from "react-toastify";
import { useGetUserSportsQuery, useDeleteUserSportMutation } from '../../../../features/usersApi';





interface RouteProps {
  userSportsUpdated: boolean;
  setUserSportsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}


const MySportsForm: React.FunctionComponent<RouteProps> = () => {
  const { data: userSports } = useGetUserSportsQuery();
  const [deleteUserSport, { isLoading: isUserSportDeleting }] = useDeleteUserSportMutation();



  async function delUserSport(sport_id: number) {
    if (!isUserSportDeleting) {
      deleteUserSport(sport_id).unwrap().then(() => {
        toast.success("User Sport Deleted Successfully")
      })
    }
  }



  //BELOW ARE COLUMN dEFINITIONS
  const columns: GridColDef[] = [
    {
      field: "sport_id",
      headerName: "Sr",
      flex: 1,
      renderCell: (index) => index.api.getRowIndex(index.row.sport_id) + 1,
    },
    { field: "name", headerName: "Sport", headerClassName: "primary", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {

        return (
          <IconButton onClick={() => { delUserSport(params.row.sport_id) }}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={userSports || []}
        columns={columns}
        pageSize={5}
        // bulkActionButtons={false}
        getRowId={(row) => row.sport_id}
        // onSelectionModelChange={changeSelectedRows}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default MySportsForm;


