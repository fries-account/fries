import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import pizzaImage from '../img/pizza.jpg';
import carrotImage from '../img/carrot.jpg';
import burgerImage from '../img/burger.jpg';
import burritoImage from '../img/burrito.jpg';

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
  MDBBtn,
  MDBNavbarNav,
  MDBIcon,
  MDBInput,
  MDBInputGroup
} from "mdb-react-ui-kit";

import ReviewCardGuest from '../components/ReviewCardGuest';

const ReviewDetails = () => {
  const location = useLocation();
  const { name, rating, description, image } = location.state; 

  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  const handleCardClick = (name, rating, description) => {
    navigate('/home-guest');
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top when component mounts

    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://fries.onrender.com/api/reviews/get-all-establishment-reviews/${name}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

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
                <h3 className="mb-0 me-3">F.R.I.E.S </h3>

                </div>
                <div className='d-flex align-items-center ms-auto' style={{ whiteSpace: 'nowrap' }}>
                <p className='mb-0 me-3'>You are currently visiting as guest</p>
                <MDBNavbarItem>
                    <MDBNavbarLink onClick={() => {navigate('/')}} className='d-flex align-items-center'>
                    <p className='mb-0' style={{ fontWeight: 'bold' }}>Log In</p>
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
                  <h1>{name}</h1>
                  <h5>AVERAGE USER RATING | {rating}</h5>
                  <p className="mb-4 mb-md-0 text-start">
                    {description}
                  </p>
                  <MDBBtn className='gradient-custom-2' size="sm" style={{marginTop: 15,}} onClick={() => handleCardClick()}>
                    RETURN HOME 
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

      </MDBRow>


      <h5 style={{textAlign: 'start', marginLeft: 25, marginTop: 10}}> REVIEWS ({reviews.length})</h5>

      {reviews.map((review, index) => (
        <ReviewCardGuest
          key={index}
          reviewId={review._id}
          avatarSrc={getAvatarImage(review.reviewerImageIndex)}
          username={review.reviewerName}
          rating={review.score}
          comment={review.comment}
          likes={review.likes}
          dislikes={review.dislikes}
        />
      ))}
    </MDBContainer>
  );
};

export default ReviewDetails;
