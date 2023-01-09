import { useEffect } from "react";
import { Container, Grid, Typography } from '@mui/material';
import CreateTimelinePost from "./CreateTimelinePost";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ShowTimelinePost from "./ShowTimelinePost";
const TimelinePostCard: React.FunctionComponent = () => {
    useEffect(() => {
        document.title = "TimelinePost-SportsConnect";
    }, []);
    return (
        <>
            <Container maxWidth="xl">
                <Typography
                    sx={{ mb: 4 }}
                    variant="h4"
                >
                    Timeline Posts
                </Typography>
                <Box sx={{
                        display: 'flex', justifyContent: 'center'
                    }}>
                        <Paper elevation={8} sx={{ padding: 5, backgroundColor: "#FFFFFF", maxWidth: 1000, minWidth: 1000 }}>
                <Grid
                    container
                    rowSpacing={2}
                >
                   
                            <Grid
                                item
                                lg={12}
                                md={12}
                                xs={12}
                                sm={12}
                            >
                                <CreateTimelinePost />
                            </Grid>

                            <Grid
                                item
                                lg={12}
                                md={12}
                                xs={12}
                                sm={12}
                            >
                                <ShowTimelinePost />
                            </Grid>
                        


                        </Grid>
                        </Paper>
                     </Box>   
                    </Container>
                </>
                );
};

                export default TimelinePostCard;
