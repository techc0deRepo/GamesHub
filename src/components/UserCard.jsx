import React, { useState } from 'react';

const UserCard = ({ userId, firstName, lastName, username, email, dateOfBirth }) => {

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    onUserClick(userId);
  }

  return (
    <div className="user-card" >
      <div className="user-profile">
        <span className="user-img">
          {userId}
        </span>
      </div>
      <div className="user-detail">
        <p><strong>Name:</strong> {firstName} {lastName}</p>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Date of Birth:</strong> {dateOfBirth}</p>
      </div>      
    </div>
  );
};

export default UserCard;