import React from 'react';
import {
  MDBCol,
  MDBCard,
  MDBRipple,
  MDBCardImage,
  MDBCardBody
} from 'mdb-react-ui-kit';

import { useNavigate } from 'react-router-dom';
import { userUsername } from '../CurrentUser';

const Card = ({ name, rating, description, image }) => {

    const navigate = useNavigate();

    const handleCardClick = (name, rating, description) => {
      navigate('/details', { state: { name, rating, description, image } });
    };

  return (
    <MDBCol md="12" lg="4" className="mb-4">
      <MDBCard onClick={() => handleCardClick(name, rating, description, image)}>
        <MDBRipple rippleColor="light" rippleTag="div" className="bg-image rounded hover-zoom">
          <MDBCardImage src={image} fluid className="w-100" style={{ height: '250px', objectFit: 'cover' }} />
          <a href='' >
            <div className="hover-overlay">
              <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
            </div>
          </a>
        </MDBRipple>

        <MDBCardBody>
          <a href='' className="text-reset">
            <h5 className="card-title mb-2">{name}</h5>
          </a>

          <h6 className="mb-3">USER RATING | {rating}</h6>

          <p className="card-description">
            {description}
          </p>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default Card;
