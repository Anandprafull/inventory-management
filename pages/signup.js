import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
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

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <StyledForm onSubmit={handleSignUp}>
        <StyledTextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <StyledTextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <StyledButton type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default SignUp;