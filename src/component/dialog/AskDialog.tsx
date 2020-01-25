import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

interface IDialogProps {
  title: string;
  content: string;

  handle?: any;
}

export default function AskDialog(props: IDialogProps) {
  const { title, content, handle } = props;

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <span className="custom-button" onClick={handleClickOpen}>
        {title}
      </span>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
              handle && handle();
            }}
            color="primary"
          >
            {"Удалить"}
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            {"Отмена"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
