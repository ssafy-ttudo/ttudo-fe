import React from 'react';

const NavButtons = ({ onHomeClick, onLogoutClick }) => {
  return (
    <div className="button-group">
      <button className="button home" onClick={onHomeClick}>
        HOME
      </button>
      <button className="button logout" onClick={onLogoutClick}>
        LOGOUT
      </button>
    </div>
  );
};

export default NavButtons;
