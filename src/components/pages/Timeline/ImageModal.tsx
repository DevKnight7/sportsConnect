import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { alertTitleClasses, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const closeStyle = {
  position: "absolute",
  left: "94%",
  top: "-2%",
  backgroundColor: "lightgray",
  // color: 'gray',
};

interface RouteProps {
  url: string;
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransitionsModal: React.FunctionComponent<RouteProps> = ({
  url,
  isOpen,
  setIsModalOpen,
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      // onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style} display="flex" alignItems="center">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <img
                style={{
                  width: "100%",
                }}
                src={url}
                alt="post image"
              />
            </Box>
            <Box>
              <IconButton sx={closeStyle} onClick={() => setIsModalOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
