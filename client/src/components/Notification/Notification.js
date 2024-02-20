import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomizedSnackbars({
  isOpen,
  handleClose,
  message,
  isSuccess,
}) {
  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        key={"topright"}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={isSuccess ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
