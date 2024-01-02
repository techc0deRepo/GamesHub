import React, { useEffect } from 'react';

const Tag = ({ isActive, handleClick, name, tagStatusChange }) => {

  useEffect(() => {
    console.log('isActive prop changed:', isActive);
  }, [isActive]);

  const onTagClick = (status) => {
    tagStatusChange(status)
  }

  return (
    <div className={isActive ? "tag clicked" : "tag"} onClick={handleClick} handleClick={onTagClick(isActive)}>
      {name}
    </div>
  );
};

export default Tag;