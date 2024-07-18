import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';

import siomaiImage from '../img/siomai.jpg';
import ricaImage from '../img/rica.jpg';
import mcdoImage from '../img/mcdo.jpg';
import jollibeeImage from '../img/jollibee.jpg';
import fruitasImage from '../img/fruitas.jpg';
import kfcImage from '../img/kfc.jpg';
import waffleImage from '../img/waffle.jpg';

const ReplyCard = ({ avatarSrc, username, onReply }) => {
  const [replyText, setReplyText] = useState('');

  const imageMapping = {
    1: siomaiImage,
    2: ricaImage,
    3: mcdoImage,
    4: jollibeeImage,
    5: fruitasImage,
    6: kfcImage,
    7: waffleImage,
  };

  // Get the image source from the mapping using the avatarSrc index
  const imageSrc = imageMapping[avatarSrc] || siomaiImage; // Default to siomaiImage if index not found

  const handleReply = () => {
    if (onReply) {
      onReply(replyText);
      setReplyText(''); // Clear the textarea after submitting the reply
    }
  };

  return (
    <MDBCard className="mb-0" style={{ backgroundColor: '#E5E4E2' }}>
      <MDBCardBody style={{ padding: 15 }}>
        <div className="d-flex align-items-center">
          <div className="d-flex flex-row align-items-center me-0" style={{ borderRadius: 5, paddingLeft: 10 }}>
            <MDBCardImage
              onClick={() => {}}
              src={imageSrc}
              alt="avatar"
              width="50"
              height="50"
            />
            <div className="d-flex flex-column">
              <p className="large mb-0 ms-4" style={{ fontWeight: 'bolder', textAlign: 'left' }}>{username}</p>
            </div>
          </div>
          <textarea
            className="form-control mb-0 ms-4"
            style={{ width: "900px" }}
            placeholder="Write your reply here..."
            rows="1"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          ></textarea>
          <MDBBtn className='ms-4 gradient-custom-2' size="sm" onClick={handleReply}>
            REPLY
          </MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ReplyCard;
