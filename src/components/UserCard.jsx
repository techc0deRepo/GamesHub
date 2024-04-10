import React, { useState } from 'react';

const UserCard = ({ userId, firstName, lastName, username, password }) => {

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    onUserClick(userId);
  }

  return (
    <div className="usercard" >
      <p>User Id: {userId}</p>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Username: {username}</p>
      <p>Password: {password}</p>
    </div>
  );
};

export default UserCard;