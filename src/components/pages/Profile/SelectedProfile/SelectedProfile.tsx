import React from "react";
import DashBoardWrapper from "../../../common/CommonWrapper";
import SelectedUserProfile from "./SelectedUserProfile";


const SelectedProfile: React.FunctionComponent = () => {
  return (
    <DashBoardWrapper>     
      <SelectedUserProfile />       
    </DashBoardWrapper>
  );
};

export default SelectedProfile;
