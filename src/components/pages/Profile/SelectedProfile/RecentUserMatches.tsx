import React from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";


const  RecentUserMatches:React.FunctionComponent = () => {

    return (

        <Box>
        <Paper elevation={8} sx={{ padding: 5, backgroundColor: "#ffffff" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} style={{display:'flex' , justifyContent:"flex-start" , marginBottom:'10px'}}>
              <Typography variant="h3">Recent Matches</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
          
            
            
          </Grid>
          
        </Paper>
      </Box>

    )

}


export default RecentUserMatches;