import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";



import { Sport } from "../../../../shared/sportsTypes"
import { useGetSportsQuery, useGetSportRolesQuery } from '../../../../features/sportsApi';
import { useCreateUserSportMutation } from '../../../../features/usersApi';


interface RouteProps {
  setUserSportsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSportForm: React.FunctionComponent<RouteProps> = () => {
  const theme = useTheme();
  const [selectedSport, setSelectedSport] = useState<number>(0);
  const [selectedSportRole, setSelectedSportRole] = useState<number>(0);

  const { data: sports, error: sportsLoadError, isLoading: isSports } = useGetSportsQuery();
  const { data: roles, error: rolesLoadError, isLoading: isRoles } = useGetSportRolesQuery(selectedSport);

  const [createUserSport, { isLoading: isUserSportAdding }] = useCreateUserSportMutation();


  const handleSelectChange = (
    event: SelectChangeEvent<typeof selectedSport>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedSport(Number(value));
  };

  const handleSelectSportRoleChange = (
    event: SelectChangeEvent<typeof selectedSport>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedSportRole(Number(value));
  };


  async function addUserSport() {
    if (selectedSport === 0 || selectedSportRole === 0) {
      toast.error("Please select a sport and role to add");
      return;
    }
    if (!isUserSportAdding) {
      let userSport = {
        role_id: selectedSportRole,
        sport_id: selectedSport
      }
      createUserSport({ userSport }).unwrap().then(() => {
        toast.success("Sport added successfully");
        setSelectedSport(0);
        setSelectedSportRole(0);
      })
    }

  }

  return (
    <Box component="form">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-multiple-chip-label">Sport</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedSport}
              label="Age"
              onChange={handleSelectChange}
            >
              <MenuItem value={0} key="select">
                Select Sport
              </MenuItem>

              {isSports &&
                <MenuItem key="selectload">
                  Loading.......
                </MenuItem>
              }

              {sportsLoadError &&
                <MenuItem key="selecterror">
                  Failed to fetch...
                </MenuItem>
              }

              {!isSports && sports && sports.length > 0 && sports.map((sp: Sport) => (
                <MenuItem value={sp.id} key={sp.id}>
                  {sp.name}
                </MenuItem>
              ))}
            </Select>

          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-multiple-chip-label">Role</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedSportRole}
              label="Age"
              onChange={handleSelectSportRoleChange}
            >
              <MenuItem value={0} key="select" >
                Select Sport Role
              </MenuItem>
              {isSports &&
                <MenuItem key="select2load">
                  Loading.......
                </MenuItem>
              }

              {rolesLoadError &&
                <MenuItem key="select2error">
                  Failed to fetch...
                </MenuItem>
              }

              {!isRoles && roles && roles.length > 0 && roles.map((sr) => (
                <MenuItem value={sr.id} key={sr.name}>
                  {sr.name}
                </MenuItem>
              ))}
            </Select>

          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            onClick={() => {
              addUserSport();
            }}
            style={{
              height: "80%",
              width: "80%",
              marginTop: "5px",
              borderRadius: "45px",
              backgroundColor: theme.colors.defaultBg,
            }}
          >
            Add Sport
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddSportForm;
