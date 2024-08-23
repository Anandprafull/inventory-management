// components/ItemCard.js
import React from 'react';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

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
    <StyledCard>
      <StyledCardContent>
        <Typography variant="h6">{itemName}</Typography>
        <Typography variant="body2">Quantity: {quantity}</Typography>
        <Typography variant="body2">Expiration Date: {expirationDate}</Typography>
        <div>
          <StyledIconButton onClick={onEdit}>
            {/* Add an edit icon here if needed */}
          </StyledIconButton>
          <StyledIconButton onClick={handleDelete}>
            <DeleteIcon />
          </StyledIconButton>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};

export default ItemCard;