import { useEffect } from 'react';
import NotificationContext, {
  useNotificationValue
} from '../NotificationContext';
import { useContext } from 'react';

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' });
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  if (!notification) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
