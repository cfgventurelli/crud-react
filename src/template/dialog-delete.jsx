import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default (props) => {
  const {
    handleSubmit,
    handleClose,
    showDialog,
  } = props;

  return (
    <Dialog
      open={showDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={handleSubmit} noValidate>
        <DialogTitle id="alert-dialog-title">{"Atenção!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">Sim</Button>
          <Button onClick={handleClose} color="primary">Não</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
