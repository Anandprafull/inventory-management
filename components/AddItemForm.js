import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { TextField, Button } from '@mui/material';

const AddItemForm = ({ userId }) => {
  console.log("Received userId:", userId); // Debugging userId value

  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [expirationDate, setExpirationDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("Error: userId is undefined");
      return;
    }
    try {
      await addDoc(collection(db, 'pantryitems'), {
        userId,
        itemName,
        quantity,
        expirationDate,
      });
      setItemName('');
      setQuantity(1);
      setExpirationDate('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
        fullWidth
        margin="normal"
      />
      <TextField
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Item
      </Button>
    </form>
  );
};

export default AddItemForm;
