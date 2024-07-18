import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bannerImage from '../img/banner.jpg';
import ricaProfileImage from '../img/ricaProfile.jpg';
import { setDetails } from '../CurrentUser';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';

function Login() {
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('https://fries.onrender.com/api/users/get-all-users');
      const users = await response.json();

      const user = users.find(user => user.username === username && user.password === password);

      if (user) {

        const currentResponse = await fetch('https://fries.onrender.com/api/current/get-current');
        const current = await currentResponse.json();

        if (currentResponse.ok) {
          // Update the Current document
          const updateResponse = await fetch(`https://fries.onrender.com/api/current/update-current/${current._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: user.username,
              avatarIndex: user.avatar,
              description: user.description
            })
          });

          const updatedCurrent = await updateResponse.json();



          if (user.isOwner === true) {
            navigate('/home-owner');
          } else {
            if (updateResponse.ok) {
              console.log('Current updated successfully:', updatedCurrent);
              navigate('/home');
            } else {
              console.error('Failed to update Current:', updatedCurrent.error);
              alert('Failed to update Current');
            }
          }






        } else {
          console.error('Failed to fetch Current:', current.error);
          alert('Failed to fetch Current');
        }
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('An error occurred while trying to log in. Please try againn.');
    }
  };

  const loginGuest = (e) => {
    e.preventDefault();
    navigate('/home-guest');
  };

  const register = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  useEffect(() => {
    const setRowHeight = () => {
      const windowHeight = window.innerHeight;
      const row = document.querySelector('.login-row');

      if (row) {
        row.style.height = `${windowHeight}px`;
      }
    };

    setRowHeight();
    window.addEventListener('resize', setRowHeight);

    return () => {
      window.removeEventListener('resize', setRowHeight);
    };
  }, []);

  return (
    <MDBContainer className="gradient-form" style={{ overflow: 'hidden' }}>
      <MDBRow className="login-row">
        <MDBCol col='6' >

          <div className="d-flex flex-column ms-5 mt-5" style={{ maxWidth: '400px' }}>
            <div className="text-center">
              <h4 className="mt-4 pb-1" style={{ fontSize: '50px' }}> F.R.I.E.S. </h4>
              <h4 className="mt-1 mb-5 pb-1" style={{ fontSize: '22px' }}> Food & Resto Inspection and Evaluation System </h4>
            </div>

            <MDBInput wrapperClass='mb-3' label='Username' id='username' type='text' />
            <MDBInput wrapperClass='mb-3' label='Password' id='password' type='password' />

            <div className="text-center pt-1 mb-1 pb-1">
              <MDBBtn className="mb-0 w-100 gradient-custom-2" onClick={login}>Log in</MDBBtn>
            </div>

            <div className="text-center pt-1 mb-4 pb-1">
              <MDBBtn className="mb-0 w-100 gradient-custom-2" onClick={loginGuest}>Visit as Guest</MDBBtn>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>

              <MDBBtn outline className='mx-2' color='success' onClick={register}>
                Sign Up
              </MDBBtn>
            </div>

          </div>
        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src={bannerImage}
            alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
        </MDBCol>

      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
