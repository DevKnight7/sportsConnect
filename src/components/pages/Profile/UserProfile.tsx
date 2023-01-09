import { useEffect } from "react";
import { Container, Grid, Typography} from '@mui/material';
import { UserProfileImage } from './UserProfileCard';
import RecentUserMatches from "./RecentUserMatches";
import  MySports  from  './MySports/MySports';

const UserProfile: React.FunctionComponent = () => {
    useEffect(() => {
        document.title = "Profile-SportsConnect";
    }, []);
    return (
        <>
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
                        <UserProfileImage />
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
                            <MySports/>
                    </Grid>

                </Grid>
            </Container>
        </>
    );
};

export default UserProfile;
