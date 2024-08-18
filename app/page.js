'use client'
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Container, Typography, Button } from '@mui/material';
import AddItemForm from '../components/AddItemForm';
import ItemCard from '../components/ItemCard';
import  { useRouter }  from 'next/navigation';

const Home = () => {
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(collection(db, 'pantryitems'), where('userId', '==', user.uid));
        onSnapshot(q, (snapshot) => {
          setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
      } else {
        router.push('/signin');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pantry Management
      </Typography>
      <AddItemForm userId={auth.currentUser?.uid} />
      {items.map(item => (
        <ItemCard key={item.id} {...item} />
      ))}
    </Container>
  );
};

export default Home;
