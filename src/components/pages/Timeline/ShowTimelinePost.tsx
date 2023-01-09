import React, { useEffect , useCallback } from "react";
import Grid from "@mui/material/Grid";

import './style.css';
import SinglePostCard from './SinglePost';
import { useGetTimelinePostsQuery } from "../../../features/timelineApi";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { TimelineApi } from "../../../features/timelineApi";
import { useAppDispatch } from "../../../redux/store/hooks";
import { socket } from "../../../utils/socket";

const Socket = socket.getSocket();

const ShowTimelinePost: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { data: posts, error: postsLoadError, isLoading: arePostsLoading } = useGetTimelinePostsQuery();
  const user = useSelector(({ authReducer }: any) => authReducer.userPayload);

  
  const addPostToCache = useCallback((post: any) => {
    dispatch(
      TimelineApi.util.updateQueryData("getTimelinePosts", undefined, (draftPosts: any[]) => {
        draftPosts.unshift(post);
      })
    );
  } , [dispatch])

  const deletePostFromCache = useCallback((post: any) => {
    alert(JSON.stringify(post))
  } , [])

  useEffect(() => {
    document.title = "Timeline-SportsConnect"
    Socket.once("newPost", addPostToCache);
    Socket.once("deletePost", deletePostFromCache);
    return () => {
      Socket.off("newPost", addPostToCache);
      Socket.off("deletePost", deletePostFromCache);
    };
  }, [addPostToCache , deletePostFromCache])

  return (
   
        <Grid
          container
          sx={{
            display:'flex' , justifyContent:'center'
          }}
        >
          {!postsLoadError && !arePostsLoading && posts?.map(post => 
            <SinglePostCard post={post} key={uuidv4()} user={user}/>
          )}
          
        </Grid>
  )
}

export default ShowTimelinePost;


