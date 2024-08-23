'use client';
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import AddItemForm from '../_components/AddItemForm';
import ItemCard from '../_components/ItemCard';
import { useRouter } from 'next/navigation';

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
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mt-4">Pantry Management</h1>
      <div className="container mx-auto p-4">
        <AddItemForm userId={auth.currentUser?.uid} />
        <div className="grid grid-cols-1 gap-4">
          {items.map(item => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;