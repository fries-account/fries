import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const ReviewCardGuest = ({ reviewId, avatarSrc, username, rating, comment, likes, dislikes, desc }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [currentDislikes, setCurrentDislikes] = useState(dislikes);

  const toggleComment = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateComment = (text, limit) => {
    if (text !== undefined) {
      if (text.length > limit) {
        return text.substring(0, limit) + '...';
      }
    }
    return text;
  };

  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      if (disliked) setDisliked(false);

      try {
        console.log(reviewId)

        const response = await fetch(`http://localhost:3000/api/reviews/update-like/${reviewId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          setCurrentLikes(currentLikes + 1);
        }
      } catch (error) {
        console.error('Error updating likes:', error);
      }
    }
  };

  const handleDislike = async () => {
    if (!disliked) {
      setDisliked(true);
      if (liked) setLiked(false);

      try {
        const response = await fetch(`http://localhost:3000/api/reviews/update-dislike/${reviewId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          setCurrentDislikes(currentDislikes + 1);
        }
      } catch (error) {
        console.error('Error updating dislikes:', error);
      }
    }
  };

  return (
    <MDBCard className="mb-1">
      <MDBCardBody style={{ padding: 15 }}>
        <div className="d-flex align-items-center">
          <div className="d-flex flex-row align-items-center me-3" style={{ borderRadius: 5, paddingLeft: 10 }}>
            <MDBCardImage onClick={() => { navigate('/view-account-guest', { state: { name: username, description: desc, image: avatarSrc } }) }}
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
          <p className="mb-0 ms-2 me-3" style={{ width: 800, cursor: 'pointer' }} onClick={toggleComment}>
            {isExpanded ? comment : truncateComment(comment, 100)}
          </p>
          <div className="ms-auto d-flex align-items-center">
          <MDBIcon 
              far 
              icon="thumbs-up mx-1 fa-xs" 
              style={{ fontSize: 20, color: liked ? 'green' : 'black' }} 
              onClick={handleLike} 
            />
            <p className="small text-muted mb-0 me-3">{currentLikes}</p>
            <MDBIcon 
              far 
              icon="thumbs-down mx-1 fa-xs" 
              style={{ fontSize: 20, color: disliked ? 'red' : 'black' }} 
              onClick={handleDislike} 
            />
            <p className="small text-muted mb-0 me-3">{currentDislikes}</p>
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ReviewCardGuest;
