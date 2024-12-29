import React from "react";
import PropTypes from "prop-types";
import "./DescriptionBox.css";

const DescriptionBox = ({ image, description, color }) => {
  return (
    <div className={`description-box ${color}`}>
      <img src={image} alt="envelope" className="description-envelope-image" />
      <p className="description-text">{description}</p>
    </div>
  );
};

DescriptionBox.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default DescriptionBox;
