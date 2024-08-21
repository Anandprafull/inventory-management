// AddItemForm.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../styles/additemform.css';
import '../styles/ItemList.css';

const AddItemForm = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { itemName, quantity, expirationDate };
    setItems([...items, newItem]);
    setItemName('');
    setQuantity('');
    setExpirationDate('');
  };

  const handleEdit = (index) => {
    const itemToEdit = items[index];
    setItemName(itemToEdit.itemName);
    setQuantity(itemToEdit.quantity);
    setExpirationDate(itemToEdit.expirationDate);
    handleDelete(index); // Remove the item to be edited
  };

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className="container">
    <div className="form-container">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="itemName">Item Name</label>
                <input
                    type="text"
                    id="itemName"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="expirationDate">Expiration Date</label>
                <input
                    type="date"
                    id="expirationDate"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="submit-button">Add Item</button>
        </form>
    </div>
    <div className="item-list-container">
    <ul className="item-list">
        {items.map((item, index) => (
            <li key={index} className="item">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'block' }}>
                        <h3 className="item-detail item-name">{item.itemName}</h3>
                        <span className="item-detail item-quantity">Quantity: {item.quantity}</span><br />
                        <span className="item-detail item-expiration">Expires: {item.expirationDate}</span>
                    </div>
                    <div className="item-actions">
                        <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                </div>
            </li>
        ))}
    </ul>
</div>
</div>
  );
};

export default AddItemForm;