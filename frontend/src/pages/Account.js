import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import pizzaImage from '../img/pizza.jpg';
import carrotImage from '../img/carrot.jpg';
import burgerImage from '../img/burger.jpg';
import burritoImage from '../img/burrito.jpg';

import ReviewCard from '../components/ReviewCard';

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
} from "mdb-react-ui-kit";

const Account = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [current, setCurrent] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top when component mounts

    const fetchCurrent = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/current/get-current');
        const data = await response.json();
        setCurrent(data);

        // Set avatar image based on the current user's avatarIndex
        switch (data.avatarIndex) {
          case 1:
            setImage(burgerImage);
            break;
          case 2:
            setImage(burritoImage);
            break;
          case 3:
            setImage(carrotImage);
            break;
          case 4:
            setImage(pizzaImage);
            break;
          default:
            setImage(burgerImage);
        }
      } catch (error) {
        console.error('Error fetching current data:', error);
      }
    };

    fetchCurrent();
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Fetch reviews only if current.username is available
    const fetchReviews = async () => {
      if (current.username) {
        try {
          const response = await fetch(`http://localhost:3000/api/reviews/get-all-user-reviews/${current.username}`);
          const data = await response.json();
          setReviews(data);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      }
    };

    fetchReviews();
    console.log(reviews)
  }, [current.username]); // Dependency on current.username

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
      <MDBNavbar expand='lg' className='mb-3 gradient-custom-2'>
        <MDBContainer fluid>
          <MDBNavbarNav className='d-flex flex-row w-100'>
            <div className="d-flex align-items-center">
              <h3 className="mb-0 me-3">F.R.I.E.S</h3>
            </div>
          </MDBNavbarNav>
          <MDBNavbarItem className='me-3 me-lg-0 d-flex align-items-end'>
            <MDBNavbarLink onClick={() => navigate('/home')} style={{ display: 'flex', flexDirection: 'row' }}>
              <p style={{ margin: 0, paddingRight: 25, fontWeight: 'bold' }}>Home</p>
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem className='me-3 me-lg-0 d-flex align-items-end'>
            <MDBNavbarLink onClick={() => navigate('/')} style={{ display: 'flex', flexDirection: 'row' }}>
              <p style={{ margin: 0, paddingRight: 10, fontWeight: 'bold' }}>Logout</p>
            </MDBNavbarLink>
          </MDBNavbarItem>
        </MDBContainer>
      </MDBNavbar>
      <MDBRow className="justify-content-center mb-0">
        <MDBCol>
          <MDBCard className="shadow-0 border rounded-3 mt-2 mb-3">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="10" lg="1" className="mb-4 mb-lg-0" style={{ marginRight: 30 }}>
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image rounded hover-zoom hover-overlay"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  >
                    <MDBCardImage
                      src={image}
                      fluid
                      className="w-100 h-100"
                      style={{ borderRadius: '80%' }}
                    />
                  </MDBRipple>
                </MDBCol>
                <MDBCol className="d-flex flex-column justify-content-center" style={{ minHeight: '100%' }}>
                  <div className="row w-100">
                    <div className="col d-flex flex-column">
                      <h1 className="mb-5 mb-md-0 text-start">{current.username}</h1>
                      <p className="mb-5 mb-md-0 text-start">{current.description}</p>
                    </div>
                    <div className="col-auto d-flex align-items-center ml-auto">
                      <MDBBtn className="gradient-custom-2 ms-2" size="sm" onClick={() => navigate('/edit-account')}>
                        EDIT USER ACCOUNT
                      </MDBBtn>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <h5 style={{ textAlign: 'start', marginLeft: 25, marginTop: 10 }}>REVIEWS ({reviews.length})</h5>

      {reviews.map((review, index) => (
        <ReviewCard
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

export default Account;
