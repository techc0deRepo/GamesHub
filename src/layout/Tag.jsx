import React, { useState } from 'react';

const Tag = ({ name, onTagClick }) => {

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    onTagClick(name);
  }

  return (
    <div className={clicked ? "tag clicked" : "tag"} onClick={handleClick}>
      {name}
    </div>
  );
};

export default Tag;