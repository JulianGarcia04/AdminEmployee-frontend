import React from "react";
import { Snackbar, Alert } from "@mui/material";

function ErrorModal({ stack, isOpen, handleClose }) {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
    >
        <Alert onClose={handleClose} severity={"error"} sx={{width:"100%"}}>
            {stack}
        </Alert>
    </Snackbar>
  );
}

export default ErrorModal;
