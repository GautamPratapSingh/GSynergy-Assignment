import React from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = () => {
    dispatch(signIn());
    navigate('/stores'); // Redirect to the dashboard after sign-in
  };

  return (
    <div>
      <h2>Sign In</h2>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;