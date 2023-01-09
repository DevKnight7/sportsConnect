import {
  Avatar,
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  CardMedia,
  CardHeader,
} from "@mui/material";
import ReactS3Client from "../../../utils/s3Client";
import { useState } from "react";
import { toast } from "react-toastify";
import Paper from "@mui/material/Paper";
import UserProfileForm from "./UserProfileForm";
import { useUpdateProfilePicMutation } from "../../../features/mediaApi"


export const UserProfileImage: React.FunctionComponent = () => {
  const [currentUser, setCurrentUser] = useState({
    imageUrl: "/static/images/avatars/avatar_6.png",
    name: "",
  });

  const [updateProfilePic, { isLoading: isProfileUpdating }] = useUpdateProfilePicMutation();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event?.target?.files?.[0];
    if (file) {

      ReactS3Client.uploadFile(file)
        .then((data: any) => {
          if (
            currentUser.imageUrl !== "/static/images/avatars/avatar_6.png" &&
            currentUser.imageUrl !== null
          ) {
            let fileStringArray = currentUser.imageUrl.split("/");
            let fileName = fileStringArray[fileStringArray.length - 1];
            ReactS3Client.deleteFile(fileName)
              .then()
              .catch((err) => console.error(err));
          }

          saveProfilePictureToDb(data);
        })
        .catch((err: any) => alert("An Error occurred while uploading"));
    }
  };

  async function saveProfilePictureToDb(s3ob: any) {
    let mediaObject = {
      file_name: s3ob.key,
      url: s3ob.location,
      title: "Profile Pic of User",
      category: "profile_pic",
    };

    if (!isProfileUpdating) {
      updateProfilePic({ mediaObject }).unwrap().then(() => {
        toast.success("Profile Updated Successfully!");
        setCurrentUser((prevValue) => {
              return {
                ...prevValue,
                imageUrl: s3ob.location,
              };
            });
      })
    }
  }
  return (
    <Paper elevation={8} sx={{ padding: 5, backgroundColor: "#ffffff" }}>
      <Grid container spacing={2}>
        <Grid
          item
          lg={4}
          md={4}
          xs={12}
          sm={12}
          sx={{
            display: "center",
            flexDirection: "column",
          }}
        >
          <Card style={{ width: "100%" }}>
            <CardHeader
              avatar={
                <Avatar
                  src={currentUser.imageUrl}
                  sx={{
                       display: "flex-center",
                    height: 150,
                    width: 150,
                  }}
                />
              }
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            ></CardHeader>

            <CardContent style={{ display: "flex", justifyContent: "center" }}>
              <Typography color="textPrimary" gutterBottom variant="h5">
                {currentUser.name}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="raised-button-file"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button variant="contained" component="span">
                  Upload picture
                </Button>
              </label>
            </CardActions>
          </Card>
        </Grid>
        <Grid
          item
          lg={8}
          md={8}
          xs={12}
          sm={12}
          sx={{
            display: "flex-end",
            flexDirection: "column",
          }}
        >
          <UserProfileForm setCurrentUser={setCurrentUser} />
        </Grid>
      </Grid>
    </Paper>
  );
};
