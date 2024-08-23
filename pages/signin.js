import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleAuth} className="w-full max-w-md mt-6">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full p-2 mt-4 bg-blue-500 text-white rounded">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <button type="button" onClick={toggleAuthMode} className="w-full p-2 mt-2 bg-gray-500 text-white rounded">
          {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;