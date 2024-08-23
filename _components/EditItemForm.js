import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const EditItemForm = ({ open, onClose, itemId, itemName, setItemName, quantity, setQuantity, expirationDate, setExpirationDate }) => {
  useEffect(() => {}, [itemId]);

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
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-10 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <Dialog.Title className="text-xl font-semibold p-4">Edit Item</Dialog.Title>
        <div className="p-4">
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
          <input
            type="number"
            className="w-full p-2 mb-4 border rounded"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
          <input
            type="date"
            className="w-full p-2 mb-4 border rounded"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between p-4 border-t">
          <button onClick={onClose} className="text-red-600">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default EditItemForm;
