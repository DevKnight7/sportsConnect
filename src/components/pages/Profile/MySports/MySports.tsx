import React , {useState} from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import AddSportForm from "./AddUserSportForm";
import MySportsTable from "./MySportsTable";



const MySports: React.FunctionComponent = () => {
  const [userSportsUpdated , setUserSportsUpdated] = useState(false);
  return (
    
        <Box>
          <Paper elevation={8} sx={{ padding: 5, backgroundColor: "#ffffff" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} style={{display:'flex' , justifyContent:"flex-start" , marginBottom:'10px'}}>
                <Typography variant="h3">My Sports</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
            
              <Grid item xs={12} sm={12} md={12}>
                <Card>
                    <CardContent>
                    <Typography variant="h6">Add Sports to your Profile</Typography>
                      <AddSportForm setUserSportsUpdated={setUserSportsUpdated}/>
                    </CardContent>
                </Card>
              </Grid>
              
            </Grid>
            <Grid container spacing={2} mt={3}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <MySportsTable userSportsUpdated={userSportsUpdated} setUserSportsUpdated={setUserSportsUpdated}/>
              </Grid>
            </Grid>
          </Paper>
        </Box>
    
  );
};

export default MySports;
