import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog({
  loading,
  isOpen,
  message = '',
  description = '',
  handleClose,
  handleDelete,
}) {
  const handleDialogClose = () => {
    handleClose();
  };

  const handleDialogAction = () => {
    handleDelete();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{message}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Go back</Button>
        <LoadingButton
          onClick={handleDialogAction}
          disabled={loading}
          loading={loading}
          color='error'
          autoFocus
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
