import PropTypes from 'prop-types';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  let style = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    display: 'flex'
  };

  if (message.state === 'error') {
    style = {
      ...style,
      color: 'red'
    };
  } else if (message.state === 'info') {
    style = {
      ...style,
      color: 'green'
    };
  }

  return <div style={style}>{message.text}</div>;
};

Notification.propTypes = {
  message: PropTypes.object.isRequired
};

export default Notification;
