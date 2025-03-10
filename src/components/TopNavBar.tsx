import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { signOut } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import './TopNavBar.css';
import companyLogo from '../assets/Gsynergy Logo V2 Long Description.svg'

const TopNavBar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('../pages/signin');
  };

  return (
    <nav className="top-nav">
      <div className="logo">
        <img src={companyLogo} alt="Company Logo" />  
      </div>
      <span className='top-nav'>Data Viewer App</span>
      {isAuthenticated && (
        <div className="auth-menu">
          <button onClick={handleSignOut} className="signout-btn">
            <i className="fas fa-user"></i>
          </button>
        </div>
      )}
    </nav>
  );
};

export default TopNavBar;