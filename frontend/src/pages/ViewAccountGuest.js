import { React, useEffect , useState} from 'react';
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

const ViewAccountGuest = () => {
  const location = useLocation();
  const { name, description, image } = location.state; 
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  const handleCardClick = () => {
    //navigate('/home');
  };

  useEffect(() => {
    // Fetch reviews only if current.username is available
    const fetchReviews = async () => {
      if (name) {
        try {
          const response = await fetch(`http://localhost:3000/api/reviews/get-all-user-reviews/${name}`);
          const data = await response.json();
          setReviews(data);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      }
    };

    fetchReviews();
    console.log(reviews)
  }, []); // Dependency on current.username

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

                <MDBNavbarItem className='me-3 me-lg-0 d-flex align-items-end'>
                    <MDBNavbarLink onClick={() => {navigate('/home-guest')}}>
                      <p style={{ margin: 0, paddingRight: 10, fontWeight: 'bold' }}>Home </p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>

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
        <MDBCol md="10" lg="1" className="mb-4 mb-lg-0" style={{ marginRight: 30 }}>
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image rounded hover-zoom hover-overlay"
            style={{ width: '100px', height: '100px', objectFit: 'cover'}}
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
              <h1 className="mb-5 mb-md-0 text-start">{name}</h1>
              <p className="mb-5 mb-md-0 text-start">{description}</p>
            </div>
          </div>
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

export default ViewAccountGuest;
