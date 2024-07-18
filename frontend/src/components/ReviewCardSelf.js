import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const ReviewCardSelf = ({ avatarSrc, username, rating, comment, likes, dislikes }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const toggleComment = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateComment = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  return (
    <MDBCard className="mb-1">
      <MDBCardBody style={{ padding: 15 }}>
        <div className="d-flex align-items-center">
          <div className="d-flex flex-row align-items-center me-3" style={{ borderRadius: 5, paddingLeft: 10 }}>
            <MDBCardImage onClick={() => { navigate('/view-account', { state: { name: username, description: 'This is my sample account', image: avatarSrc } }) }}
              src={avatarSrc}
              alt="avatar"
              width="50"
              height="50"
            />
            <div className="d-flex flex-column">
              <p className="large mb-0 ms-4" style={{ fontWeight: 'bolder', textAlign: 'left' }}>{username}</p>
              <p className="small text-muted mb-0 ms-4"> USER RATING | {rating}% </p>
            </div>
          </div>
          <p className="mb-0 ms-2 me-3" style={{ width: 650, cursor: 'pointer' }} onClick={toggleComment}>
            {isExpanded ? comment : truncateComment(comment, 100)}
          </p>
          <div className="ms-auto d-flex align-items-center">
            <MDBIcon far icon="thumbs-up mx-1 fa-xs" style={{ fontSize: 20, color: liked ? 'green' : 'black' }} onClick={handleLike} />
            <p className="small text-muted mb-0 me-3">{likes}</p>
            <MDBIcon far icon="thumbs-down mx-1 fa-xs" style={{ fontSize: 20, color: disliked ? 'red' : 'black' }} onClick={handleDislike} />
            <p className="small text-muted mb-0 me-3">{dislikes}</p>

            <MDBBtn size="sm" className="mx-1 gradient-custom-2">Edit</MDBBtn>
            <MDBBtn color="#fefefe" size="sm" className="mx-1" style={{backgroundColor: '#e87474', color: 'white'}}>Delete</MDBBtn>
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ReviewCardSelf;
