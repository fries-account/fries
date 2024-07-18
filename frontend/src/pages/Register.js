import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import burgerImage from '../img/burger.jpg';
import burritoImage from '../img/burrito.jpg';
import pizzaImage from '../img/pizza.jpg';
import carrotImage from '../img/carrot.jpg';
import bannerImage from '../img/banner.jpg';
import { setDetails } from '../CurrentUser';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [highlightedImage, setHighlightedImage] = useState(pizzaImage);
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();

        const newUser = {
            username,
            password,
            description,
            isOwner: false,
            avatar,
        };

        try {

            const response = await fetch('https://fries.onrender.com/api/users/create-user', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            const currentResponse = await fetch('https://fries.onrender.com/api/current/get-current');
            const current = await currentResponse.json();
            

            if (currentResponse.ok) {
                // Update the Current document
                const updateResponse = await fetch(`https://fries.onrender.com/api/current/update-current/${current._id}`, {
                  method: 'PUT',
                  mode: 'no-cors',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    username: newUser.username,
                    avatarIndex: newUser.avatar,
                    description: newUser.description
                  })
                });
      
                const updatedCurrent = await updateResponse.json();
      
                if (updateResponse.ok) {
                  console.log('Current updated successfully:', updatedCurrent);
                  navigate('/home');
                } else {
                  console.error('Failed to update Current:', updatedCurrent.error);
                  alert('Failed to update Current');
                }
              } else {
                console.error('Failed to fetch Current:', current.error);
                alert('Failed to fetch Current');
              }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration. Please try again.');
        }
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

    const handleImageChange = (image, index) => {
        setAvatar(index)
        setHighlightedImage(image);
    };

    const getButtonStyle = (image) => ({
        border: highlightedImage === image ? '3px solid blue' : 'none',
        background: 'none',
        padding: 2,
        cursor: 'pointer',
        borderRadius: '10%'
    });

    return (
        <MDBContainer className="gradient-form" style={{ overflow: 'hidden' }}>
            <MDBRow className="login-row">
                <MDBCol col='6' >
                    <div className="d-flex flex-column ms-5" style={{ maxWidth: '400px' }}>
                        <div className="text-center">
                            <h4 className="mt-5 mb-2 pb-1" style={{ fontSize: '22px' }}> Register User Account </h4>
                            <h4 className="mt-1 mb-5 pb-1" style={{ fontSize: '14px' }}> By registering your account, you agree to the terms and conditions of the website </h4>
                        </div>

                        <MDBInput wrapperClass='mb-2' label='Username' id='form1' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <MDBInput wrapperClass='mb-2' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <MDBInput wrapperClass='mb-4' label='Description' id='form3' type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>

                        <div className="mb-3">
                            <h6>Select Banner Image:</h6>
                            <div className="d-flex justify-content-between ">
                                <button onClick={() => handleImageChange(burgerImage, 1)} style={getButtonStyle(burgerImage)}>
                                    <img src={burgerImage} alt="Burger" style={{ width: '95px', height: '95px', borderRadius: '10%' }} />
                                </button>
                                <button onClick={() => handleImageChange(burritoImage, 2)} style={getButtonStyle(burritoImage)}>
                                    <img src={burritoImage} alt="Burrito" style={{ width: '95px', height: '95px', borderRadius: '10%' }} />
                                </button>
                                <button onClick={() => handleImageChange(carrotImage, 3)} style={getButtonStyle(carrotImage)}>
                                    <img src={carrotImage} alt="Carrot" style={{ width: '95px', height: '95px', borderRadius: '10%' }} />
                                </button>
                                <button onClick={() => handleImageChange(pizzaImage, 4)} style={getButtonStyle(pizzaImage)}>
                                    <img src={pizzaImage} alt="Pizza" style={{ width: '95px', height: '95px', borderRadius: '10%' }} />
                                </button>
                            </div>
                        </div>

                        <div className="text-center pt-1 mb-4 pb-1">
                          <div className="row">
                              <div className="col">
                                  <MDBBtn className="red w-100" style={{backgroundColor: '#e87474'}} onClick={() => {navigate('/')}}>Back</MDBBtn>
                              </div>
                              <div className="col">
                                  <MDBBtn className="gradient-custom-2 w-100" onClick={register}>Register</MDBBtn>
                              </div>
                          </div>
                      </div>

                    </div>
                </MDBCol>

                <MDBCol sm='6' className='d-none d-sm-block px-0'>
                    <img src={bannerImage} alt="Selected banner" className="w-100 custome-gradient-2" style={{ objectFit: 'cover', objectPosition: 'left' }} />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Register;
