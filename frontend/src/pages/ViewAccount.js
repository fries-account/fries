import { React, useEffect , useState } from 'react';
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
} from "mdb-react-ui-kit";

import ReviewCard from '../components/ReviewCard';

const ViewAccount = () => {
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
          const response = await fetch(`https://fries.onrender.com/api/reviews/get-all-user-reviews/${name}`);
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

      <MDBNavbar expand='lg' className='mb-3 gradient-custom-2'>
            <MDBContainer fluid>
                <MDBNavbarNav className='d-flex flex-row w-100'>
                  <div className="d-flex align-items-center">
                    <h3 className="mb-0 me-3">F.R.I.E.S </h3>
                  </div>
                </MDBNavbarNav>

                <MDBNavbarItem className='me-3 me-lg-0 d-flex align-items-end'>
                    <MDBNavbarLink onClick={() => {navigate('/home')}}>
                      <p style={{ margin: 0, paddingRight: 25, fontWeight: 'bold' }}>Home </p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>

                <MDBNavbarItem className='me-3 me-lg-0 d-flex align-items-end'>
                    <MDBNavbarLink onClick={() => {navigate('/account')}} style={{ display: 'flex', flexDirection: 'row' }}>
                      <p style={{ margin: 0, paddingRight: 25, fontWeight: 'bold' }}>Account </p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                
                <MDBNavbarItem className='me-3 me-lg-0 d-flex align-items-end'>
                    <MDBNavbarLink onClick={() => navigate('/')} style={{ display: 'flex', flexDirection: 'row' }}>
                      <p style={{ margin: 0, paddingRight: 10, fontWeight: 'bold'}}>Logout</p>
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

export default ViewAccount;
