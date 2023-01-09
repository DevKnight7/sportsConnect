import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SentimentVerySatisfiedSharpIcon from '@mui/icons-material/SentimentVerySatisfiedSharp';
import Modal from '@mui/material/Modal';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { DropzoneDialog } from "react-mui-dropzone";
import { useCreateTimelinePostMutation } from "../../../features/timelineApi";
import ReactS3Client from "../../../utils/s3Client";
import { toast } from "react-toastify";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';

import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import './createTimeline.css'


import { Sport } from "../../../shared/sportsTypes"
import { useGetSportsQuery, useGetFilteredMatchesQuery } from '../../../features/sportsApi';




const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  maxHeight: '100%',
  overflowY: "auto",
  boxShadow: 24,
  p: 1,
};



const CreateTimelinePost: React.FunctionComponent = () => {
  const theme = useTheme();
  const userPayload = useSelector(({ authReducer }: any) => authReducer.userPayload);
  
  const [uploadImages, setUploadedImages] = useState<any>([])
  const [uploadingBar, setUploadingBar] = useState<any>("Post")


  const [selectedSport, setSelectedSport] = useState<number>(0);
  const [selectedRecentMatches, setSelectedRecentMatches] = useState<number>(0);

  const [openModal, setOpenModal] = React.useState(false);
  const [openDropZone, setOpenDropZone] = React.useState(false);
  const [isPreview, setIsPreview] = React.useState(false);
  const [showEmojis, setShowEmojis] = useState<any>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("only_me");
  const [disabled, setDisabled] = useState(true);

  const { data: sports, error: sportsLoadError, isLoading: isSports } = useGetSportsQuery();
  const { data: matches, error: matchesLoadError, isLoading: isMatches } = useGetFilteredMatchesQuery(selectedSport);
  const [CreateTimelinePost, { isLoading: isCreateTimelinePost }] = useCreateTimelinePostMutation();


  useEffect(() => {
    document.title = "TimelinePost-SportsConnect"
  }, [])



  const openAduienceMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAudienceMenu = (audience: string) => {
    setAudience(audience);
    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  }


  const handleOpenModal = () => {
    setOpenModal(true)
    setUploadingBar("Post")
    setDisabled(true) 
  };
  function handleCloseModal() {
    setOpenModal(false);
    setDisabled(true)
  };

  function handleValueChange(event: any) {
    setDisabled(false)
    setDescription(event.target.value)
  }


  const handleSelectChange = (
    event: SelectChangeEvent<typeof selectedSport>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedSport(Number(value));
  };

  const handleSelectRecentMatchesChange = (
    event: SelectChangeEvent<typeof selectedSport>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedRecentMatches(Number(value));
  };

  function handleIsPreviewClick(fileName: string) {
    let filteredObject = uploadImages.filter((file: any) => file.name != fileName);
    setUploadedImages(filteredObject)

  }
  const handleDropZoneSubmit = (files :any) => {
    setOpenDropZone(false)
    setIsPreview(true);
    setUploadedImages(files.map((file: any) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }

  async function uploadFilesToS3() {
    let files = uploadImages
    let filesList = []
    for (let i = 0; i < files.length; i++) {
      const data: any = await handleUpload(files[i])
      filesList.push(data.location)
    }
    return filesList
  }

  async function handleUpload(file: any) {
    let uploadOb = await ReactS3Client.uploadFile(file)
    return uploadOb
  }

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setDescription((prevValue) => {
      return prevValue + `${emojiData.emoji}`
    })
  }



  async function createTimelinePost() {
    if (description.length == 0 && uploadImages.length === 0 ) {
      toast.error("Please add data for post ");
      return;
    }
    setUploadingBar(<CircularProgress color="inherit" />)
    setDisabled(true)
    let mediaFiles = await uploadFilesToS3()
    let obj = {}
    if(selectedRecentMatches == 0){
        obj = { text: description, media: mediaFiles, audience: audience}     
    }else{
      obj = { text: description, media: mediaFiles, audience: audience, match_id: selectedRecentMatches } 
    }
    if (!isCreateTimelinePost) {
      CreateTimelinePost({ createTimelinePostPayload: obj }).unwrap().then(() => {
        setIsPreview(false)
        setDescription("")
        setAudience("only_me")
        setOpenModal(false)
        setSelectedRecentMatches(0)
        setSelectedSport(0)
        setUploadedImages([])
        toast.success("post created successfully");

      })
    }
  }

  return (
    <Box>
      <Paper elevation={4} sx={{ padding: 5, backgroundColor: "#ffffff" }}>
        <Grid
          container
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ display: "flex", justifyContent: "center" }}>
            <InputBase
              sx={{ ml: 1, p: 1, pl: 2, flex: 1, border: 1, borderColor: "#d9dbdd", borderRadius: "45px" }}
              placeholder="Whats in your Mind?"
              onClick={handleOpenModal}
            />
            <IconButton color="error" onClick={() => {
              handleOpenModal()
            }}>
              <SentimentVerySatisfiedSharpIcon fontSize="large" />
            </IconButton>
            <>
              <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                      Create Post
                    </Typography>
                  </Grid>
                  <Divider />
                  <Grid>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          src={userPayload.profile_pic}
                          sx={{
                            display: "flex-start",
                            height: 50,
                            width: 50,
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        secondaryTypographyProps={{
                          display: "flex",
                          justifyContent: "flex-start"
                        }}
                        primaryTypographyProps={{
                          display: "flex",
                          justifyContent: "flex-start",
                          padding: 1
                        }}
                        primary={
                          <>
                            {`${userPayload?.first_name} ${userPayload?.last_name}`}
                          </>
                        }
                        secondary={
                          <>
                            <Button
                              variant="contained"
                              id="fade-button"
                              aria-controls={openAduienceMenu ? 'fade-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={openAduienceMenu ? 'true' : undefined}
                              onClick={handleClick}
                              style={{
                                margin: 2,
                                borderRadius: "40px",
                                backgroundColor: theme.colors.defaultBg,
                              }}
                            >
                              {audience}
                              <KeyboardArrowDownOutlinedIcon />
                            </Button>
                            <Menu
                              id="fade-menu"
                              MenuListProps={{
                                'aria-labelledby': 'fade-button',
                              }}
                              anchorEl={anchorEl}
                              open={openAduienceMenu}
                              onClose={handleCloseMenu}
                              TransitionComponent={Fade}
                            >
                              <MenuItem onClick={() => handleCloseAudienceMenu("public")}>Public</MenuItem>
                              <MenuItem onClick={() => handleCloseAudienceMenu("only_me")}>Only Me</MenuItem>
                              <MenuItem onClick={() => handleCloseAudienceMenu("friends")}>Friends</MenuItem>
                            </Menu>
                          </>

                        }
                      />
                    </ListItem>
                  </Grid>
                  <Grid>
                    <InputBase
                      sx={{ ml: 1, p: 2, flex: 1, width: "100%" }}
                      placeholder="Whats in Your Mind?"
                      multiline
                      minRows={5}
                      maxRows={8}
                      // autoFocus
                      value={description}
                      onChange={e => handleValueChange(e)}
                    />
                  </Grid>

                  <Grid container >
                    <Grid item xs={12} sm={12} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-start" }}>

                      <FormControl sx={{ m: 1, width: "100%" }}>
                        <InputLabel id="demo-multiple-chip-label">Sport</InputLabel>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectedSport}
                          label="Sport"
                          onChange={handleSelectChange}
                        >
                          <MenuItem value={0} key="select">
                            Select Sport
                          </MenuItem>

                          {isSports &&
                            <MenuItem key="selectload">
                              Loading...
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


                      <FormControl sx={{ m: 1, width: "100%" }}>
                        <InputLabel id="demo-simple-select">Match</InputLabel>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectedRecentMatches}
                          label="Match"
                          onChange={handleSelectRecentMatchesChange}
                        >
                          <MenuItem value={0} key="select" >
                            Select Recent Matches
                          </MenuItem>
                          {isSports &&
                            <MenuItem key="select2load">
                              Loading...
                            </MenuItem>
                          }

                          {matchesLoadError &&
                            <MenuItem key="select2error">
                              Failed to fetch...
                            </MenuItem>
                          }

                          {!isMatches && matches && matches.recent_matches.length > 0 && matches.recent_matches.map((match :any) => (
                            <MenuItem value={match.id} key={match.id}>
                              {`${match.teams[0]} vs ${match.teams[1]} ${new Date(match.datetime).toUTCString()}`}
                            </MenuItem>
                          ))}
                        </Select>

                      </FormControl>

                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <IconButton color="error" onClick={() => {
                        setShowEmojis(!showEmojis)
                      }}>
                        <SentimentVerySatisfiedSharpIcon fontSize="large" />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ p: 1, border: 1, borderColor: "#d9dbdd", borderRadius: "10px" }}>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ display: "flex", p: 1, justifyContent: "flex-start" }}>
                      <Typography id="modal-modal-title" variant="h5" component="h2">
                        Add to your post
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} lg={8} xl={8} sx={{ display: "flex", justifyContent: "flex-end", }}>
                      <>
                        <IconButton color="error" aria-label="upload picture" component="label"
                          onClick={() => {
                            setOpenDropZone(true)
                            setDisabled(false)
                          }}>
                          <PhotoCamera fontSize="large" />
                        </IconButton>
                        <DropzoneDialog
                          open={openDropZone}
                          onSave={(files) => { handleDropZoneSubmit(files) }}
                          acceptedFiles={["image/*", "video/*"]}
                          // onDrop={(files, event) => handleOnDrop(files, event)}
                          filesLimit={10}
                          showPreviews={true}
                          getFileLimitExceedMessage={(filesLimit) => `Maximum allowed number of files exceeded. Only ${filesLimit} allowed`}
                          maxFileSize={500000000}
                          onClose={() => { setOpenDropZone(false) }}
                        />
                      </>
                    </Grid>
                  </Grid>
                  <Grid sx={{ display: "flex", justifyContent: "center" }}>
                    {showEmojis && (
                      <EmojiPicker
                        onEmojiClick={onClick}
                        height={350}
                        width="100%" />
                    )}
                  </Grid>
                  {isPreview && (
                    uploadImages.map((image: any) => (
                      image.type.includes("video") ?
                        <div className="block-icon" key={image.lastModified}>
                          <video width={150}
                            height={130} controls>
                            <source
                              // type="video/mp4"
                              src={image.preview}
                            />
                          </video>
                          <HighlightOffIcon onClick={() => {
                           handleIsPreviewClick(image.name)
                          }}
                            className="icon-tag" />
                        </div>
                        :
                        <div
                          key={image.lastModified}
                          className="block-icon">

                          <img
                            className="m-2 shadow-sm"
                            alt="Timeline Preview"
                            width={150}
                            height={130}
                            src={image.preview}
                          />
                          <HighlightOffIcon onClick={() => {
                            handleIsPreviewClick(image.name)
                          }}
                            className="icon-tag" />
                        </div>
                    ))
                  )}
                  <Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={() => createTimelinePost()}
                      disabled={disabled}
                      sx={{
                        mt: 2,
                        // mb: 2,
                        p: 1,
                        backgroundColor: theme.colors.defaultBg,
                        color: "white",
                        "&:hover": {
                          backgroundColor: theme.colors.defaultBg,
                          color: "#white",
                        },
                      }}
                    >
                      {uploadingBar}
                    </Button>
                  </Grid>

                </Box>
              </Modal>
            </>

          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}


export default CreateTimelinePost;

