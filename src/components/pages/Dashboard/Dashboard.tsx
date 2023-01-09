import React from "react";
import DashBoardWrapper from "../../common/CommonWrapper";
import UserDashboard from "./UserDashboard";


const Dashboard: React.FunctionComponent = () => {
  return (
    <DashBoardWrapper>
      
      <UserDashboard />
       
    </DashBoardWrapper>
  );
};

export default Dashboard;
