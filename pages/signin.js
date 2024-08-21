// pages/signin.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Container, TextField, Button, Typography, Link } from '@mui/material';
import '../styles/signin.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between sign-in and sign-up
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/'); // Redirect to the homepage or pantry page
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError(null); // Clear any previous error
  };

  return (
    <Container className="container">
      <Typography variant="h2" gutterBottom>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </Typography>
      {error && <Typography className="error-message">{error}</Typography>}
      <form onSubmit={handleAuth}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-field"
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="text-field"
          variant="outlined"
        />
        <Button type="submit" variant="contained" fullWidth className="button">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
      </form>
      <Button onClick={toggleAuthMode} fullWidth className="toggle-button">
        {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
      </Button>
    </Container>
  );
};

export default SignIn;
