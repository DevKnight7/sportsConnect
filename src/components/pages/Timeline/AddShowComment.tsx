import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import InputBase from "@mui/material/InputBase";
import { useGetPostCommentsQuery, useCreatePostCommentMutation } from "../../../features/timelineApi";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import SingleComment from "./SingleComment";

import { Comment } from "../../../shared/postTypes";
import {  useSelector } from "react-redux";
import { TimelineApi } from "../../../features/timelineApi";
import { useAppDispatch } from "../../../redux/store/hooks";
import { socket } from "../../../utils/socket";

interface RouteProps {
  postId: number;
}

const AddShowComment: React.FunctionComponent<RouteProps> = ({ postId }) => {
  const Socket = socket.getSocket();
  const dispatch = useAppDispatch();
  const [currentComment, setCurrentComment] = useState("");
  const user = useSelector(({ authReducer } :any) => authReducer.userPayload);
  const { data: comments, error: commentsLoadError, isLoading: areCommentsLoading } = useGetPostCommentsQuery(postId);
  const [createPostComment, { isLoading: isCommentingOnPost }] = useCreatePostCommentMutation();

  async function addPostComment() {
    if (!isCommentingOnPost) {
      createPostComment({ createPostCommentPayload: { post_id: postId, text: currentComment } })
        .unwrap()
        .then(() => {
          toast.success("Comment Added successfully!");
          setCurrentComment("");
        });
    }
  }

  const handleSocketCommentAddition = (comment: any) => {
    if (postId === comment.post_id) {
      patchCollection(comment);
    }
  };

  const patchCollection = (comment: Comment) => {
    dispatch(
      TimelineApi.util.updateQueryData("getPostComments", postId, (draftComments: Comment[]) => {
        draftComments.push(comment);
      })
    );
  };

 

  useEffect(() => {
    socket.onAction("newComment", handleSocketCommentAddition);
    return () => {
      Socket.off("newComment", handleSocketCommentAddition);
    };
  }, []);

  return (
    <Grid
      sx={{
        width: "100%",
        position: "relative",
        overflow: "auto",
        maxHeight: 350,
        mt: 1,
        padding: 1,
      }}>
      <Grid container>
        <Grid item xs={2} sm={2} md={1} lg={1} sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src={user.profile_pic}
            sx={{
              height: 50,
              width: 50,
            }}
          />
        </Grid>
        <Grid item xs={10} sm={10} md={11} lg={11} sx={{ p: 1 }}>
          <Grid item xs={12} sm={12} sx={{ pl: 1 }}>
            <Typography>{user.first_name + " " + user.last_name}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{ pl: 1 }}>
            <InputBase
              sx={{
                p: 1,
                pl: 2,
                flex: 1,
                border: 1,
                borderColor: "#d9dbdd",
                borderRadius: "45px",
                width: "85%",
              }}
              multiline
              minRows={1}
              maxRows={3}
              value={currentComment}
              onChange={(e) => {
                setCurrentComment(e.target.value);
              }}
            />
            <Button>
              <SendIcon onClick={() => addPostComment()} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* Container for displayig comments */}
      {!commentsLoadError ? comments && comments.length > 0 && (
        comments.map((comment) => (
          <SingleComment key={uuidv4()} comment={comment} postId={postId} type="comment" />
        ))
      ) : (
        <p>Unable to Load Comments</p>
      )}
    </Grid>
  );
};
export default AddShowComment;
