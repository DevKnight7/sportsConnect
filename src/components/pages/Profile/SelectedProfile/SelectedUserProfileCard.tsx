import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import Paper from "@mui/material/Paper";
import {useTheme} from "@mui/material";
import { publicProfile } from '../../../../shared/customTypes';
import { useCreateFriendRequestMutation, useFriendRequestActionMutation, useUnfriendUserMutation, useGetFriendRequestsQuery} from '../../../../features/friendsApi';

interface ProfileProps {
  userProfile: publicProfile,
  userId: number
}
export const SelectedUserProfileCard: React.FunctionComponent<ProfileProps> = ( { userProfile, userId } ) => {
  const theme = useTheme();
  const { data: FriendReqList, isLoading: isFriendReqListLoading } = useGetFriendRequestsQuery();
  const [sendFriendRequest, { isLoading: isFriendReqSending }] = useCreateFriendRequestMutation();
  const [friendRequestResponse, { isLoading: isfriendRequestResponseLoading }] = useFriendRequestActionMutation();
  const [unFriend, { isLoading: isUnFriendLoading }] = useUnfriendUserMutation();


    function isFriendRequest(userId: number) {
        let found = FriendReqList.requests?.find((el: any) => el.from.user_id === userId)
        return found?.from.name ? true : false
    }

    async function unfriendRequest(user_id: number, action: string) {
        if (!isUnFriendLoading) {
            unFriend({user_id, action}).unwrap().then(() => {
                toast.success("Successfully Done");
            })
        }
    }
  
    async function setfriendRequestAction(id: number, action: string) {
        if (!isfriendRequestResponseLoading) {
            if (action === "accept") {
              friendRequestResponse({ action: action, request_id: id }).unwrap().then(() => {
                    toast.success("Friend Request has been accepted. You are friends now!");
                })
            }
            else {
              friendRequestResponse({ action: action, request_id: id }).unwrap().then(() => {
                    toast.success("Friend Request has been Rejected");
                })
            }
        }
    }
  async function addFriend(id: number) {
        if (!isFriendReqSending) {
            sendFriendRequest({ sent_to: id }).unwrap().then(() => {
                toast.success("Friend Request has been sent Successfully!");

            })
        }
    }

  async function unfriendConfirmation() {
    const confirmBox = window.confirm(
      "Do you really want to unfriend your friend?"
    )
    if (confirmBox === true) {
      unfriendRequest(userId, "unfriend")
    } 
  }
    

  return (
    <Paper elevation={8} sx={{ padding: 3, backgroundColor: "#ffffff" }}>
      <Grid container spacing={2}>
        <Grid
          item
          lg={12}
          md={12}
          xs={12}
          sm={12}
        // sx={{
        //   display: "center",
        //   flexDirection: "column",
        // }}
        >
          <Card style={{ width: "100%" }}>
            <CardMedia
              component="img"
              height="180"
              image="https://konnectapp.s3-us-east-2.amazonaws.com/media/pacQi7NJmcHsThtKTrwfJG.jpeg"
              alt="Cover Photo"
            />
            <CardHeader
              avatar={
                <Avatar
                  src={userProfile.profile.profile_pic}
                  sx={{
                    // display: "flex",
                    // justifyContent: "flex-center",
                    height: 120,
                    width: 120,
                  }}
                />
              }
              sx={{
                // display: "flex",
                // justifyContent: "flex-center",
                mt: -10
              }}
            ></CardHeader>

            <CardContent>
            
              <Grid
                container
              >
                <Grid item 
                lg={6}
                md={6}
                xs={12}
                sm={4}>
                <Typography sx={{ display: "flex", justifyContent: "flex-start" }} color="textPrimary" variant="h5">
                 { userProfile.profile.name} {`(${userProfile.profile.username})`} 
                </Typography>
                </Grid>
               
                <Grid item 
                lg={6}
                md={6}
                xs={12}
                sm={8}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end"
                  }}>
                {userProfile.friend_status === "stranger" ? 
                  <Button
                  variant="contained"
                  onClick={() => {
                    addFriend(userId)
                  }}
                  sx={{
                    borderRadius: "40px",
                    backgroundColor: theme.colors.defaultBg,
                    "&:hover": {
                      backgroundColor: theme.colors.defaultBg,
                      color: "#white",
                    }
                  }}
                >
                  Add Friend
                </Button> : 
                !isFriendReqListLoading && FriendReqList.requests && userProfile.friend_status === "received_request" && isFriendRequest(userId) ?
                <Button
                variant="contained"
                onClick={() => {
                  let found = FriendReqList.requests?.find((el: any) => el.from.user_id === userId)
                  setfriendRequestAction(found.id, "accept")
                }}
                sx={{
                  borderRadius: "40px",
                  backgroundColor: theme.colors.defaultBg,
                  "&:hover": {
                    backgroundColor: theme.colors.defaultBg,
                    color: "#white",
                  }
                }}
              >
                Confirm Request
              </Button> :
              userProfile.friend_status === "sent_request" ?
              <Button
                variant="contained"
                onClick={() => {
                  unfriendRequest(userId, "cancel")
                }}
                sx={{
                  borderRadius: "40px",
                    backgroundColor: theme.colors.defaultBg,
                    "&:hover": {
                      backgroundColor: theme.colors.defaultBg,
                      color: "#white",
                    }
                }}
              >
                Cancel Request
              </Button> :
              userProfile.friend_status === "friend" ?
              <Button
              variant="contained"
              onClick={() => {
                unfriendConfirmation()
              }}
              sx={{
                borderRadius: "40px",
                    backgroundColor: theme.colors.defaultBg,
                    "&:hover": {
                      backgroundColor: theme.colors.defaultBg,
                      color: "#white",
                    }
              }}
            >
              Friends
            </Button> :
              <>
              </>               
                }
                </Grid>
              </Grid> 
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};
