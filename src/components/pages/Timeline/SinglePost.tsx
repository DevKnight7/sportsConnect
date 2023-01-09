import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { current } from "@reduxjs/toolkit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ImageGrid } from "react-fb-image-video-grid";
import AddShowComment from "./AddShowComment";
import { v4 as uuidv4 } from "uuid";
import { useLikePostMutation , TimelineApi} from "../../../features/timelineApi";
import { useAppDispatch } from "../../../redux/store/hooks";
import { socket } from "../../../utils/socket";
import ImageModal from "./ImageModal";
import "./postStyle.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface RouteProps {
  post: { [key: string]: any };
  user: { [key: string]: any };
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const SinglePostCard: React.FunctionComponent<RouteProps> = ({ post, user }) => {
  const Socket = socket.getSocket();
  const dispatch = useAppDispatch();
  const currentUser = useSelector(({ authReducer }: any) => authReducer.userPayload);
  const [expanded, setExpanded] = useState(false);
  const [likePost, { isLoading: isLikingPost }] = useLikePostMutation();
  const [isPostLikedByUser, setIsPostLikedByUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [likeCount, setLikeCount] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePostLike = (post_id: number) => {
    if (!isLikingPost) {
      likePost(post_id)
        .unwrap()
        .then(() => {
          patchCollectionWithLike(currentUser.id)
          setLikeCount((prevValue) => {
            if(isPostLikedByUser){
              return prevValue - 1
            }else{
              return prevValue + 1
            }
            
          });
          setIsPostLikedByUser((prevValue) => !prevValue);
          
        });
    }
  };

  const handleSocketPostLike = (like: any) => {
    
    if (post.id === like.post_id) { 
      patchCollectionWithLike(like.created_by.id);
    }
  };

  const patchCollectionWithLike = (user_id:number) => {
    dispatch(
      TimelineApi.util.updateQueryData('getTimelinePosts', undefined, (draftPosts:any) => {
        let index = draftPosts.findIndex((p:any) => p.id === post.id); 
        let likedUsersList = draftPosts[index].liked_users_list
        if(likedUsersList.includes(user_id)){
          draftPosts[index].liked_users_list = likedUsersList.filter(function(id:number) { return id !== user_id; });
        }else{
          draftPosts[index].liked_users_list.push(user_id)
        }
      })
    )
  };

  useEffect(() => {
    if (post.liked_users_list.includes(user.id)) {
      setIsPostLikedByUser(true);
    }
    setLikeCount(post.liked_users_list.length);
    //socket listener addition
    Socket.once("newLike", handleSocketPostLike);
   

    //useEffect return
    return () => {
      Socket.off("newLike", handleSocketPostLike);
    };
  }, []);
  

  return (
    <Card elevation={4} sx={{ maxWidth: 650, mt: 4, minWidth: 650 }}>
      <ImageModal isOpen={isModalOpen} url={modalImageUrl} setIsModalOpen={setIsModalOpen} />
      <CardHeader
        avatar={
          <Avatar
            src="https://konnectapp.s3-us-east-2.amazonaws.com/media/pacQi7NJmcHsThtKTrwfJG.jpeg"
            sx={{ bgcolor: red[500] }}
            aria-label="User Name"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.created_by.name}
        subheader={new Date(post.created_at).toUTCString()}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.text}
        </Typography>
      </CardContent>
      <CardMedia sx={{ maxHeight: 400, maxWidth: 650 }}>
        {post.media.length > 1 ? (
          <ImageGrid key={uuidv4()} style={{ maxHeight: "400px", overflow: "hidden" }}>
            {post.media.map((mediaFile: any) => {
              if (mediaFile.mime_type.includes("image"))
                return (
                  <div key={uuidv4()}>
                    <CardMedia
                      component="img"
                      src={mediaFile.url}
                      alt="Cover Photo"
                      height="100%"
                      width="100%"
                    />
                  </div>
                );
              if (mediaFile.mime_type.includes("video"))
                return (
                  <div key={uuidv4()}>
                    <video controls>
                      <source type="video/mp4" src={mediaFile.url} style={{ height: "100%" }} />
                    </video>
                  </div>
                );

              return null;
            })}
          </ImageGrid>
        ) : post.media.length === 1 ? (
          post.media[0].mime_type.includes("image") ? (
            <CardMedia
              component="img"
              src={post.media[0].url}
              alt="Cover Photo"
              height="100%"
              width="100%"
              onClick={() => {
                setModalImageUrl(post.media[0].url);
                setIsModalOpen(true);
              }}
              sx={{
                cursor: 'pointer',
                height:'400px'
              }}
            />
          ) : (
            <div key={uuidv4()}>
              <video controls style={{ height: "100%", width: "100%" }}>
                <source type="video/mp4" src={post.media[0].url} />
              </video>
            </div>
          )
        ) : (
          <div></div>
        )}
      </CardMedia>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => handlePostLike(post.id)}>
          <FavoriteIcon sx={{ color: isPostLikedByUser ? "red" : "gray" }}  />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {likeCount}
        </Typography>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <AddShowComment postId={post.id} />
      </Collapse>
    </Card>
  );
};

export default SinglePostCard;
