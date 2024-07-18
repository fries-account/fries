import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import pizzaImage from '../img/pizza.jpg';
import carrotImage from '../img/carrot.jpg';
import burgerImage from '../img/burger.jpg';
import burritoImage from '../img/burrito.jpg';

import kfcImage from '../img/kfc.jpg';
import mcdoImage from '../img/mcdo.jpg';
import jollibeeImage from '../img/jollibee.jpg';
import ricaImage from '../img/rica.jpg';
import waffleImage from '../img/waffle.jpg';
import fruitasImage from '../img/fruitas.jpg';
import siomaiImage from '../img/siomai.jpg';

import ReplyCard from '../components/ReplyCard';
import ricaProfileImage from '../img/ricaProfile.jpg';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBInput,
} from "mdb-react-ui-kit";

import ReviewCardOwner from '../components/ReviewCardOwner';

const HomeOwner = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [current, setCurrent] = useState({});
  const [establishment, setEstablishment] = useState({});
  const [reviews, setReviews] = useState([]);
  const [establishmentName, setEstablishmentName] = useState('');

  const establishmentMapping = {
    "Master": "Master Siomai",
    "Rica": "Rica's Bacsilog",
    "Ronald": "McDo",
    "Tony Tan": "Jollibee",
    "Calvin Chua": "Fruitas",
    "Col Sanders": "KFC",
    "Euclid Cezar": "Famous Belgian Waffle",
  };

  const imageMapping = {
    1: siomaiImage,
    2: ricaImage,
    3: mcdoImage,
    4: jollibeeImage,
    5: fruitasImage,
    6: kfcImage,
    7: waffleImage,
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top when component mounts

    const fetchCurrent = async () => {
      try {
        const response = await fetch('https://fries.onrender.com/api/current/get-current');
        const data = await response.json();
        setCurrent(data);

        // Update establishment and image based on mapping
        const ownerName = data.username;
        const establishmentName = establishmentMapping[ownerName] || 'Unknown Establishment';
        setEstablishmentName(establishmentName);

        // Get index of establishment in mapping object and set corresponding image
        const establishmentIndex = Object.keys(establishmentMapping).indexOf(ownerName) + 1;
        const imageSrc = imageMapping[establishmentIndex] || pizzaImage; // Default to pizzaImage if not found
        setImage(imageSrc);

        const establishmentResponse = await fetch(`https://fries.onrender.com/api/establishments/get-establishment-by-name/${establishmentName}`);
        const establishmentData = await establishmentResponse.json();
        setEstablishment(establishmentData);

        const reviewsResponse = await fetch(`https://fries.onrender.com/api/reviews/get-all-establishment-reviews/${establishmentName}`);
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);

        console.log(establishmentData)

      } catch (error) {
        console.error('Error fetching current data:', error);
      }
    };



    fetchCurrent();
  }, []); // Empty dependency array to run only once on mount

  const getAvatarImage = (avatarIndex) => {
    switch (avatarIndex) {
      case 1: return burgerImage;
      case 2: return burritoImage;
      case 3: return carrotImage;
      case 4: return pizzaImage;
      default: return pizzaImage;
    }
  };

  return (
    <MDBContainer fluid className="my-2 text-center">
      <MDBNavbar expand='lg' className='mb-4 gradient-custom-2'>
        <MDBContainer fluid>
          <MDBNavbarNav className='d-flex flex-row w-100 justify-content-between'>
            <div className="d-flex align-items-center">
              <h3 className="mb-0 me-3">F.R.I.E.S</h3>
            </div>
            <div className='d-flex align-items-center ms-auto' style={{ whiteSpace: 'nowrap' }}>
              <p className='mb-0 me-3'>You are currently signed in as owner</p>
              <MDBNavbarItem>
                <MDBNavbarLink onClick={() => { navigate('/') }} className='d-flex align-items-center'>
                  <p className='mb-0' style={{ fontWeight: 'bold' }}>Log Out</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </div>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>

      <MDBRow className="justify-content-center mb-0">
        <MDBCol>
          <MDBCard className="shadow-0 border rounded-3 mt-2 mb-3">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="12" lg="3" className="mb-4 mb-lg-0" style={{ marginRight: 50 }}>
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image rounded hover-zoom hover-overlay"
                    style={{ width: '320px', height: '270px', objectFit: 'cover' }}
                  >
                    <MDBCardImage
                      src={image}
                      fluid
                      className="w-100 h-100"
                    />
                  </MDBRipple>
                </MDBCol>
                <MDBCol md="" className="d-flex flex-column align-items-start justify-content-center" style={{ minHeight: '100%' }}>
                  <h1>{current.username}</h1>
                  <h5>AVERAGE USER RATING | {establishment.rating}%</h5>
                  <h6>OWNER OF {establishmentName}</h6>
                  <p className="mb-4 mb-md-0 text-start">
                    {establishment.description}
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <h5 style={{ textAlign: 'start', marginLeft: 25, marginTop: 10 }}>REVIEWS ({reviews.length})</h5>

      {reviews.map((review, index) => (
        <ReviewCardOwner
          key={index}
          reviewId={review._id}
          avatarSrc={getAvatarImage(review.reviewerImageIndex)}
          username={review.reviewerName}
          rating={review.score}
          comment={review.comment}
          likes={review.likes}
          dislikes={review.dislikes}
          avatarOwner={establishment.imageIndex}
          usernameOwner={current.username}
        />
      ))}
    </MDBContainer>
  );
};

export default HomeOwner;
