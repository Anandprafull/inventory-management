// components/ItemCard.js
import React from 'react';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemCard = ({ id, itemName, quantity, expirationDate, onEdit }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'pantryitems', id));
      console.log(`Document with ID ${id} successfully deleted`);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{itemName}</Typography>
        <Typography variant="body2">Quantity: {quantity}</Typography>
        <Typography variant="body2">Expiration Date: {expirationDate}</Typography>
        <IconButton onClick={onEdit}>
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
