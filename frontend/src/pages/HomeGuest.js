import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import kfcImage from '../img/kfc.jpg';
import mcdoImage from '../img/mcdo.jpg';
import jollibeeImage from '../img/jollibee.jpg';
import ricaImage from '../img/rica.jpg';
import waffleImage from '../img/waffle.jpg';
import fruitasImage from '../img/fruitas.jpg';
import siomaiImage from '../img/siomai.jpg';

import burritoImage from '../img/burrito.jpg';

import {
  MDBContainer,
  MDBRow,
  MDBIcon,
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBInput,
  MDBBtn,
  MDBNavbarNav,
  MDBInputGroup
} from "mdb-react-ui-kit";

import CardGuest from '../components/CardGuest';

const HomeGuest = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [minRating, setMinRating] = useState('');
    const [maxRating, setMaxRating] = useState('');
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        fetch('https://fries.onrender.com/api/establishments/get-all-establishments')
            .then(response => response.json())
            .then(data => setPlaces(data))
            .catch(error => console.error('Error fetching establishments:', error));
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleMinRatingChange = (event) => {
        setMinRating(event.target.value);
    };

    const handleMaxRatingChange = (event) => {
        setMaxRating(event.target.value);
    };

    const imageMapping = {
        1: siomaiImage,
        2: ricaImage,
        3: mcdoImage,
        4: jollibeeImage,
        5: fruitasImage,
        6: kfcImage,
        7: waffleImage
    };

    const filteredPlaces = places.filter((place) => {
        const rating = place.rating;
        const min = minRating ? parseInt(minRating) : 0;
        const max = maxRating ? parseInt(maxRating) : 100;
        const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) || place.description.toLowerCase().includes(searchQuery.toLowerCase());
        return rating >= min && rating <= max && matchesSearch;
    });

    return (
        <MDBContainer fluid className="my-2 text-center">
            <MDBNavbar expand='lg' className='mb-4 gradient-custom-2' style={{ height: 50 }}>
                <MDBContainer fluid>
                    <MDBNavbarNav className='d-flex flex-row w-100'>
                        <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                            <h3 className="mb-0 me-3">F.R.I.E.S</h3>
                            <MDBInputGroup className='d-flex align-items-stretch' style={{ maxWidth: '700px' }}>
                                <MDBInput 
                                    type='search' 
                                    placeholder='Search' 
                                    aria-label='Search' 
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <MDBBtn color='dark'>
                                    <MDBIcon fas icon='search' />
                                </MDBBtn>
                            </MDBInputGroup>

                            <MDBInputGroup className='d-flex align-items-stretch' style={{ maxWidth: '160px', marginLeft: 30 }}>
                                <MDBInput
                                    type='number'
                                    placeholder='Min Rating'
                                    value={minRating}
                                    onChange={handleMinRatingChange}
                                    min='0'
                                    max='100'
                                    style={{ width: '100px' }}
                                />
                                <MDBBtn color='dark' style={{ width: '100px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <p style={{ marginBottom: -2 }}> MIN </p>
                                </MDBBtn>
                            </MDBInputGroup>

                            <MDBInputGroup className='d-flex align-items-stretch' style={{ maxWidth: '160px' }}>
                                <MDBInput
                                    type='number'
                                    placeholder='Max Rating'
                                    value={maxRating}
                                    onChange={handleMaxRatingChange}
                                    min='0'
                                    max='100'
                                    style={{ width: '100px' }}
                                />
                                <MDBBtn color='dark' style={{ width: '100px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <p style={{ marginBottom: -2 }}> MAX </p>
                                </MDBBtn>
                            </MDBInputGroup>

                        </div>
                        <div className='ms-auto d-flex align-items-center'>
                            <p className='mb-0 me-3'>You are currently visiting as guest</p>

                            <MDBNavbarItem className='me-3 me-lg-0 d-flex align-items-end'>
                                <MDBNavbarLink onClick={() => navigate('/')} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <p style={{ margin: 0, paddingRight: 10, fontWeight: 'bold' }}>Log In</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </div>
                    </MDBNavbarNav>
                </MDBContainer>
            </MDBNavbar>

            <MDBRow>
                {filteredPlaces.map((place, index) => (
                    <CardGuest
                        key={index}
                        name={place.name}
                        rating={`${place.rating}%`}
                        description={place.description}
                        image={imageMapping[place.imageIndex] || place.image}
                    />
                ))}
            </MDBRow>
        </MDBContainer>
    );
}

export default HomeGuest;
