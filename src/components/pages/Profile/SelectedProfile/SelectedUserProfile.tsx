import { useEffect } from "react";
import { Container, Grid, Typography} from '@mui/material';
import { SelectedUserProfileCard } from './SelectedUserProfileCard';
import RecentUserMatches from "./RecentUserMatches";
import SelectedUserSports from "./SelectedUserSport";
import { useLocation, useNavigate } from 'react-router-dom'; 
import { useGetPublicProfileQuery } from '../../../../features/usersApi';
import { skipToken } from '@reduxjs/toolkit/query'

const SelectedUserProfile: React.FunctionComponent = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const { data: publicProfile , isLoading: ispublicProfileLoading} = useGetPublicProfileQuery(location.state.user_id ? location.state.user_id : skipToken);
    useEffect(() => {
        if (location.state && location.state.user_id) {     
            document.title = "Profile-SportsConnect";
        } else {
            navigate('/friends')
        }    
    }, []);
    
    return (
        <>
            {!ispublicProfileLoading && publicProfile ?
            <Container maxWidth="xl">
                <Typography
                    sx={{ mb: 4 }}
                    variant="h4"
                >
                    PROFILE
                </Typography>
                <Grid
                    container
                >
                   
                    <Grid
                        item 
                        lg={12}
                        md={12}
                        xs={12}
                        sm={12}
                     >   
                        
                        <SelectedUserProfileCard userProfile = { publicProfile }  userId = {location.state.user_id}/>
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{ mt: 4}}
                    spacing={2}
                >
                    <Grid
                        item 
                        lg={4}
                        md={4}
                        xs={12}
                        sm={12} >
                        <RecentUserMatches />
                    </Grid>
                    <Grid
                        item 
                        lg={8}
                        md={8}
                        xs={12}
                        sm={12} >
                            <SelectedUserSports userSport = {publicProfile} />
                    </Grid>

                </Grid>
            </Container> :
            <Grid container >
                Loading...
            </Grid>
        }
        </>
    );
};

export default SelectedUserProfile;
