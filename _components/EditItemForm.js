import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const DialogWrapper = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    padding: theme.spacing(2),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ActionsWrapper = styled(DialogActions)(({ theme }) => ({
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
}));

const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const EditItemForm = ({ open, onClose, itemId, itemName, setItemName, quantity, setQuantity, expirationDate, setExpirationDate }) => {
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
    <DialogWrapper open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <StyledTextField
          label="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Expiration Date"
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <ActionsWrapper>
        <CancelButton onClick={onClose}>
          Cancel
        </CancelButton>
        <SaveButton onClick={handleSave}>
          Save
        </SaveButton>
      </ActionsWrapper>
    </DialogWrapper>
  );
};

export default EditItemForm;