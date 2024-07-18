import React, { useState, useEffect } from 'react';
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

const ReviewDetails = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    userUsername: 'huh',
    userDescription: 'what',
    userAvatar: 1,
  });

  const [reviews, setReviews] = useState([]);
  const [score, setScore] = useState('');
  const [comment, setComment] = useState('');

  const { name, rating, description, image } = location.state; 

  const handleCardClick = () => {
    navigate('/home');
  };

  const addReview = async (e) => {
    e.preventDefault();
  
    const newReview = {
      reviewerName: currentUser.username,
      reviewerImageIndex: currentUser.avatarIndex,
      reviewedEstablishment: name,
      score,
      comment,
      likes: 0,
      dislikes: 0,
      desc: currentUser.description,
    };

    console.log(newReview.reviewerName)
  
    try {
      // Post the new review
      const reviewResponse = await fetch('https://fries.onrender.com/api/reviews/create-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
      });
  
      if (reviewResponse.ok) {
        // Fetch all reviews to recalculate the average
        const reviewsResponse = await fetch(`https://fries.onrender.com/api/reviews/get-all-establishment-reviews/${name}`);
        const reviewsData = await reviewsResponse.json();
        
        // Calculate the new average rating
        const totalReviews = reviewsData.length;
        const totalScore = reviewsData.reduce((acc, review) => acc + parseFloat(review.score), 0);

        // Check if there are no reviews
        const newAverageRating = totalReviews === 0
            ? parseFloat(score) // If no reviews, the new rating is just the score
            : Math.round((totalScore + parseFloat(score)) / (totalReviews + 1));

      
  
        // Update the establishment's average rating
        const updateResponse = await fetch(`https://fries.onrender.com/api/establishments/update-rating/${name}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ rating: newAverageRating })
        });
  
        if (updateResponse.ok) {
          // Refresh the page or update the state as needed
          window.location.reload();
        } else {
          console.error('Failed to update establishment rating');
        }
      } else {
        console.error('Failed to post review');
      }
    } catch (error) {
      console.error('Error during review submission:', error);
      alert('An error occurred while submitting your review. Please try again.');
    }
  };
  

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top when component mounts

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('https://fries.onrender.com/api/current/get-current');
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://fries.onrender.com/api/reviews/get-all-establishment-reviews/${name}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchCurrentUser();
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
      <MDBNavbar expand='lg' className='mb-3 gradient-custom-2'>
        <MDBContainer fluid>
          <MDBNavbarNav className='d-flex flex-row w-100'>
            <div className="d-flex align-items-center">
              <h3 className="mb-0 me-3">F.R.I.E.S </h3>
            </div>
          </MDBNavbarNav>
          <MDBNavbarItem className='me-3 me-lg-0 d-flex align-items-end'>
            <MDBNavbarLink onClick={() => { navigate('/account') }} style={{ display: 'flex', flexDirection: 'row' }}>
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
                  <MDBBtn className='gradient-custom-2' size="sm" style={{marginTop: 15}} onClick={handleCardClick}>
                    RETURN HOME 
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      
      <h5 style={{textAlign: 'start', marginLeft: 25, marginTop: 10}}> REVIEWS ({reviews.length}) </h5>

      <MDBCard className="mb-1">
        <MDBCardBody style={{ padding: 15 }}>
          <div className="d-flex align-items-center">
            <div className="d-flex flex-row align-items-center me-3" style={{borderRadius: 5, paddingLeft: 10}}>
              <MDBCardImage
                src={getAvatarImage(currentUser.userAvatar)}
                alt="avatar"
                width="50"
                height="50"
              />
            </div>
            <textarea 
              className="form-control mb-0" 
              style={{ width: "840px" }} 
              placeholder="Write your review here..." 
              rows="1"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            
            <textarea 
              className="form-control mb-0" 
              style={{ width: "180px", marginLeft: "12px" }} 
              placeholder="Input score here..." 
              rows="1"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            ></textarea>

            <div className="ms-auto d-flex flex-column justify-content-center">
              <div className="d-flex flex-row align-items-center">
                <MDBBtn className='ms-2 gradient-custom-2' size="md" onClick={addReview}>
                  POST
                </MDBBtn>
              </div>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>

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
          reply=""
        />
      ))}
    </MDBContainer>
  );
};

export default ReviewDetails;
