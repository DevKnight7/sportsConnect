import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import AddShowCommentReply from "./AddShowCommentReply";
import SendIcon from "@mui/icons-material/Send";
import { useUpdatePostCommentMutation, useDeletePostCommentMutation } from "../../../features/timelineApi";

interface RouteProps {
  comment: any;
  postId: number;
  type: string;
}
const fontColor = {
  style: { color: "black !important" },
};

const SingleComment: React.FunctionComponent<RouteProps> = ({ comment, postId, type }) => {
  const [currentComment, setCurrentComment] = useState(comment.text);
  const [commentOpenForEditing, setCommentOpenForEditing] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const user = useSelector(({ authReducer }: any) => authReducer.userPayload);
  const [updatePostComment, { isLoading: isCommentUpdating }] = useUpdatePostCommentMutation();
  const [deletePostComment, { isLoading: isCommentDeleting }] = useDeletePostCommentMutation();

  async function addPostComment() {
    setCommentOpenForEditing(false);
    if (comment.text !== currentComment && !isCommentUpdating) {
      updatePostComment({
        post_id: postId,
        text: currentComment,
        comment_id: comment.id,
      })
        .unwrap()
        .then(() => {
          toast.success("Comment Updated successfully!");
          setCurrentComment("");
        });
    }
  }

  async function deleteComment() {
    if (!isCommentDeleting) {
      deletePostComment({
        post_id: postId,
        text: currentComment,
        comment_id: comment.id,
      })
        .unwrap()
        .then(() => {
          toast.success("Comment Deleted successfully!");
        });
    }
  }


  return (
    <Grid container>
      <Grid item xs={2} sm={2} md={1} lg={1} sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          src={comment.created_by.profile_pic}
          sx={{
            height: 50,
            width: 50,
          }}
        />
      </Grid>
      <Grid item xs={10} sm={10} md={10} lg={10} sx={{ p: 1 }}>
        <Grid item xs={12} sm={12} sx={{ pl: 1 }}>
          <Typography>{comment.created_by.name}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ pl: 1 }}>
          <InputBase
            // key={uuidv4()}
            sx={{
              p: 1,
              pl: 2,
              flex: 1,
              border: 1,
              borderColor: commentOpenForEditing ? "black" : "#d9dbdd",
              borderRadius: "30px",
              width: type==="comment" ? "85%" : "75%",
              color: "black !important",
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: commentOpenForEditing ? "black" : "#000000",
              },
            }}
            onChange={(e) => {
              setCurrentComment(e.target.value);
            }}
            multiline
            minRows={1}
            maxRows={2}
            // component={inputComponent}
            disabled={commentOpenForEditing ? false : true}
            inputProps={fontColor}
            value={currentComment}
          />
          {commentOpenForEditing && (
            <Button>
              <SendIcon onClick={() => addPostComment()} />
            </Button>
          )}
        </Grid>

        <Grid item xs={6} sm={6} md={12} lg={12}>
          {type === "comment" && (
            comment.replies.length > 0 ? (
              <Button
                onClick={() => {
                  setIsReplyOpen(prevValue => !prevValue);
                }}
                sx={{ pl: 1, fontSize: 12 }}>
                View Replies
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsReplyOpen(prevValue => !prevValue);
                }}
                sx={{ pl: 1, fontSize: 10 }}>
                Reply
              </Button>
            )
          )}

          {comment.created_by.id === user.id && (
            <>
              <Button
                onClick={() => {
                  setCommentOpenForEditing(prevValue => !prevValue);
                }}
                sx={{ pl: 1, fontSize: 10 }}>
                <EditIcon fontSize="small" />
              </Button>
              <Button
                onClick={() => {
                  deleteComment();  
                }}
                sx={{ pl: 1, fontSize: 9 }}>
                <DeleteIcon fontSize="small" />
              </Button>
            </>
          )}
          {isReplyOpen && <AddShowCommentReply replies={comment.replies} key={uuidv4()} comment_id={comment.id} post_id={postId} />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleComment;
