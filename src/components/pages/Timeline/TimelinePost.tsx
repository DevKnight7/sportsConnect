import React from "react";
import DashBoardWrapper from "../../common/CommonWrapper";
// import UserProfile from "./UserProfile";
import TimelinePostCard from "./CreateTimelinePostCard";


const TimelinePost: React.FunctionComponent = () => {
  return (
    <DashBoardWrapper>
      
      <TimelinePostCard />
       
    </DashBoardWrapper>
  );
};

export default TimelinePost;
