import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    let timeoutId;
    if (notification) {
      timeoutId = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  });

  if (!notification) {
    return null;
  }

  const style = {
    background: 'yellow',
    border: 'solid',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
