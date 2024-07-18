import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import burgerImage from '../img/burger.jpg';
import burritoImage from '../img/burrito.jpg';
import pizzaImage from '../img/pizza.jpg';
import carrotImage from '../img/carrot.jpg';
import bannerImage from '../img/banner.jpg';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';

const EditAccount = () => {
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState(1);
    const [highlightedImage, setHighlightedImage] = useState(pizzaImage);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrent = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/current/get-current');
                const data = await response.json();
                setUsername(data.username);
                setDescription(data.description);
                setAvatar(data.avatarIndex);

                switch (data.avatarIndex) {
                    case 1:
                        setHighlightedImage(burgerImage);
                        break;
                    case 2:
                        setHighlightedImage(burritoImage);
                        break;
                    case 3:
                        setHighlightedImage(carrotImage);
                        break;
                    case 4:
                        setHighlightedImage(pizzaImage);
                        break;
                    default:
                        setHighlightedImage(pizzaImage);
                }
            } catch (error) {
                console.error('Error fetching current data:', error);
            }
        };

        fetchCurrent();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedUser = {
            description,
            avatarIndex: avatar,
        };

        try {

              const userResponse = await fetch(`http://localhost:3000/api/users/update-user/${username}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(updatedUser)
              });

            const response = await fetch('http://localhost:3000/api/current/update-current/668bd95acac5712a5c9e9f36', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(updatedUser)
            });

            if (response.ok) {
                navigate('/account');
            } else {
                console.error('Failed to update user account');
                alert('Failed to update user account');
            }
        } catch (error) {
            console.error('Error updating user account:', error);
            alert('An error occurred during the update. Please try again.');
        }
    };

    useEffect(() => {
        const setRowHeight = () => {
            const windowHeight = window.innerHeight;
            const row = document.querySelector('.edit-row');

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
        setAvatar(index);
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
            <MDBRow className="edit-row">
                <MDBCol col='6'>
                    <div className="d-flex flex-column ms-5 mt-5" style={{ maxWidth: '400px' }}>
                        <div className="text-center">
                            <h4 className="mt-5 mb-2 pb-1" style={{ fontSize: '22px' }}> Edit User Account </h4>
                        </div>

                        <MDBInput wrapperClass='mt-3 mb-4' label='Description' id='form3' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />

                        <div className="mb-3">
                            <h6>Change Avatar Image:</h6>
                            <div className="d-flex justify-content-between">
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
                                    <MDBBtn className="red w-100" style={{backgroundColor: '#e87474'}} onClick={() => {navigate('/account')}}>Back</MDBBtn>
                                </div>
                                <div className="col">
                                    <MDBBtn className="gradient-custom-2 w-100" onClick={handleUpdate}>Save Changes</MDBBtn>
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

export default EditAccount;
