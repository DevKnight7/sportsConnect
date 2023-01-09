import { useEffect} from "react";
import { Box, Container, Grid, Typography } from '@mui/material';
import { PlayerStat } from './PlayerStat';
import TotalCardMini from './TotalCardMini';
import FeedBackRequestForm from './FeedBackRequestForm';
import { toast } from "react-toastify";
import { useGetDashBoardDataQuery } from '../../../features/dashboardApi';


const Dashboard: React.FunctionComponent = () => {
 
  const { data: DashboardData } = useGetDashBoardDataQuery();
  useEffect(() => {
    document.title = "Dashboard-SportsConnect";
  }, []);

  return (
    <>
      <Typography component="h1" variant="h3">
        DASHBOARD
      </Typography>
     
      <Container maxWidth={false} >
        <Grid
          container
          spacing={2}
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        // xs={12}
        >
          <Grid
            item
            lg={4}
            sm={4}
            xl={4}
            xs={12}

          >
            <TotalCardMini type="people" total_players={DashboardData && DashboardData.total_players}/>
          </Grid>
          <Grid
            item
            lg={4}
            sm={4}
            xl={4}
            xs={12}
          >
            <TotalCardMini type="rating" average_rating={DashboardData && DashboardData.average_rating}/>
          </Grid>
          <Grid
            item
            lg={4}
            sm={4}
            xl={4}
            xs={12}
          >
            <TotalCardMini type="requests" total_feedbacks={DashboardData && DashboardData.total_feedbacks}/>
          </Grid>
        </Grid>
        <Grid
          container
          // xs={12}
          spacing={2}
          sx={{ mt: 5 }}
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Grid
            item
            lg={4}
            md={4}
            xl={3}
            sm={12}
            xs={12}
          >
            <FeedBackRequestForm />
          </Grid>
          <Grid
            item
            lg={8}
            md={8}
            xl={9}
            xs={12}
            sm={12}
          >
            <PlayerStat />
          </Grid>

          
        </Grid>
      </Container>
      
    </>
  );
};

export default Dashboard;
