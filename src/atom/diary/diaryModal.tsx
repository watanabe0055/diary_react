import React from "react";
import {
  Card,
  Grid,
  Button,
  Stack,
  Modal,
  Box,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UseDiaryModal() {
  //モーダル用のステート
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            最終確認
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            この日記を削除しますか？
          </Typography>
          <Typography>
            <Button variant="contained" color="warning" sx={{ minWidth: 100 }}>
              削除
            </Button>
            <Button variant="contained" color="inherit" sx={{ minWidth: 100 }}>
              削除
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
