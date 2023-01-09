import React from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import StarsIcon from '@mui/icons-material/Stars';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import { useTheme } from "@mui/material/styles";


interface RouteProps{
  type: "rating" | "people" | "requests"
  average_rating?: number
  total_feedbacks?: number
  total_players?: number
}

const TotalCardMini:React.FunctionComponent<RouteProps> = ({type , average_rating , total_feedbacks , total_players}) => {
  const theme = useTheme();
  return (
  <Card >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            {type === "rating" && "Average Rating"}
            {type === "people" && "TOTAL PLAYERS"}
            {type === "requests" && "TOTAL FeedBacks"}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {type === "rating" && average_rating}
            {type === "people" && total_players}
            {type === "requests" && total_feedbacks}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: type === "people" ? theme.colors.defaultBg : type === "rating" ? "success.main" : "primary.main",
              height: 56,
              width: 56
            }}
          >
             {type == "people" && <PeopleIcon />}
             {type == "rating" && <StarsIcon />}
             {type == "requests" && <RequestPageIcon />}
          </Avatar>
        </Grid>
      </Grid>
      {/* <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <ArrowUpwardIcon color="success" />
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          16%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box> */}
    </CardContent>
  </Card>
)};

export default TotalCardMini;