import React from 'react';
import PropTypes from 'prop-types';
import CredentialImage from '../../images/credential.jpg';

const currentDate = new Date();
const date = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear().toString().substr(-2);
const dateString = `${date}/${month}/${year}`;

const checkTime = (i) => {
  let numb = i;
  if (i < 10) {
    numb = `0 ${numb}`;
  }
  return numb;
};

const startTime = () => {
  const today = new Date();
  const h = today.getHours();
  let m = today.getMinutes();
  m = checkTime(m);
  return `${h}:${m}`;
};

const Credential = ({
  number, name, image, style,
}) => (
  <div>
    <div className="background-landscape" />
    <div className="jp-card-container">
      <div className="jp-card jp-card-safari jp-card-identified" style={style}>
        {image && (
          <div className="user-image-container">
            <img alt={name} className="user-image" src={image} />
          </div>
        )}
        <div className="jp-card-front">
          <div className="jp-card-bank jp-card-display" />
          <div className="jp-card-lower">
            <div className="jp-card-number jp-card-display text-left">{number}</div>
            <div className="jp-card-name text-left jp-card-display">{name}</div>
            <div className="jp-card-vto text-left jp-card-display">{`${dateString} ${startTime()}`}</div>
          </div>
        </div>
        <div className="jp-card-back">
          <div className="jp-card-bar" />
          <div className="jp-card-shiny" />
        </div>
      </div>
    </div>
  </div>
);

Credential.propTypes = {
  number: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  style: PropTypes.string,
};

Credential.defaultProps = {
  number: '',
  name: '',
  image: '',
  style: { backgroundImage: `url(${CredentialImage})` },
};

export default Credential;
