import * as React from "react";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface IDialogProps {
  content: string;
  open: boolean;

  handleClose: any;
}

export default function NotifyDialog(props: IDialogProps) {
  const { content, handleClose, open } = props;

  return (
    <Snackbar open={open} onClose={handleClose} autoHideDuration={4000}>
      <Alert onClose={handleClose} severity="success">
        {content}
      </Alert>
    </Snackbar>
  );
}
