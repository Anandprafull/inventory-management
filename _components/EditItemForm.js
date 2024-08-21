import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  actions: {
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
  },
  saveButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
}));

const EditItemForm = ({ open, onClose, itemId, itemName, setItemName, quantity, setQuantity, expirationDate, setExpirationDate }) => {
  const classes = useStyles();

  useEffect(() => {
  }, [itemId]);

  const handleSave = async () => {
    const docRef = doc(db, 'pantryItems', itemId);
    await updateDoc(docRef, {
      itemName,
      quantity,
      expirationDate,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth classes={{ paper: classes.dialog }}>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <TextField
          label="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          fullWidth
          margin="normal"
          className={classes.textField}
        />
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          fullWidth
          margin="normal"
          className={classes.textField}
        />
        <TextField
          label="Expiration Date"
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          required
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button onClick={onClose} className={classes.cancelButton}>
          Cancel
        </Button>
        <Button onClick={handleSave} className={classes.saveButton}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItemForm;