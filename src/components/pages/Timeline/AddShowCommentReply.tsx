import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SendIcon from '@mui/icons-material/Send';
import InputBase from '@mui/material/InputBase';
import { toast } from "react-toastify";
import { useCreatePostCommentMutation } from "../../../features/timelineApi";
import { v4 as uuidv4 } from 'uuid';
import SingleComment from "./SingleComment";
import { useSelector } from "react-redux";

interface RouteProps {
  replies: any[]
  comment_id: number
  post_id: number
}

const AddShowCommentReply: React.FunctionComponent<RouteProps> = ({ replies, post_id, comment_id }) => {
  const [createPostComment, { isLoading: isCommentingOnPost }] = useCreatePostCommentMutation();
  const [currentReply, setCurrentReply] = useState("")
  const user = useSelector(({ authReducer }: any) => authReducer.userPayload);



  async function addCommentReply() {
    if (!isCommentingOnPost) {
      createPostComment({ createPostCommentPayload: { post_id, comment_id, text: currentReply } }).unwrap().then(() => {
        toast.success("Comment Added successfully!");
        setCurrentReply("")
      })
    }
  }
  return (
    <Grid
      sx={{
        width: '100%',
        
        position: 'relative',
        overflow: 'auto',
        maxHeight: 350,
        p: 1,
        mt: 1
      }}

  
    >
     
      <Grid container>

        <Grid item xs={2} sm={2} md={1} lg={1} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar
            src={user.profile_pic}
            sx={{
              height: 50,
              width: 50,
            }}
          />
        </Grid>
        <Grid item xs={10} sm={10} md={11} lg={11} sx={{ p: 1 }}>
          <Grid xs={12} sm={12} sx={{ pl: 1 }}>
            <Typography>
            {user.first_name + " " + user.last_name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{ pl: 1 }}>
            <InputBase
              
              sx={{ p: 1, pl: 2, flex: 1, border: 1, borderColor: "#d9dbdd", borderRadius: "45px", width: "75%" }}
              placeholder="Whats in Your Mind?"
              multiline
              minRows={1}
              maxRows={3}
              value={currentReply}
              onChange={(e)=>setCurrentReply(e.target.value)}
            
            />
            <Button onClick={()=>addCommentReply()}><SendIcon /></Button>
          </Grid>
        </Grid>


      </Grid>

      {Array.isArray(replies) && replies.map((reply) => {
        return (
          <SingleComment key={uuidv4()} comment={reply}  postId={post_id} type="reply"/>
        )
      })}

    </Grid>
  )
}
export default AddShowCommentReply;
