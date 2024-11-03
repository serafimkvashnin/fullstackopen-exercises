import PropTypes from 'prop-types';

const Notification = ({ message, onClose }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="notification">
      <div className="message">{message}</div>
      <div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Notification;
