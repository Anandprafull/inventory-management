// pages/signin.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Container, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  marginTop: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ToggleButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
}));

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
    <StyledContainer>
      <Typography variant="h2" gutterBottom>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </Typography>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <StyledForm onSubmit={handleAuth}>
        <StyledTextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
        />
        <StyledTextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
        />
        <StyledButton type="submit" variant="contained" fullWidth>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </StyledButton>
      </StyledForm>
      <ToggleButton onClick={toggleAuthMode} fullWidth>
        {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
      </ToggleButton>
    </StyledContainer>
  );
};

export default SignIn;