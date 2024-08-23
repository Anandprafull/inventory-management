import React from 'react';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

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
    <div className="mb-4 p-4 border rounded shadow">
      <h6 className="text-lg">{itemName}</h6>
      <p className="text-sm">Quantity: {quantity}</p>
      <p className="text-sm">Expiration Date: {expirationDate}</p>
      <div className="flex">
        <button onClick={onEdit} className="ml-2 p-2 bg-gray-200 rounded">
          {/* Add an edit icon here if needed */}
        </button>
        <button onClick={handleDelete} className="ml-2 p-2 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemCard;