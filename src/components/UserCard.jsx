import { useState } from 'react';

const UserCard = ({ user, onUserClick }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    if (onUserClick) {
      onUserClick(user.userId); // Call the click handler passed as a prop
    }
  };

  return (
    <div className="user-card" >
      <div className="user-profile">
        <span className="user-img">
          {user.userId}
        </span>
      </div>
      <div className="user-detail" onClick={handleClick}>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
      </div>
    </div>
  );
};

export default UserCard;