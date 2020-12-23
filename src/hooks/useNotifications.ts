import { useEffect, useContext } from 'react';
import { NotificationType } from '../types/';
import { NotificationsContext } from '../providers/NotificationsProvider';
import { NOTIFICATION_TIME } from '../utils/constants';

const useNotifications = () => {
  const { notifications, setNotifications } = useContext(NotificationsContext)!;

  const addNotification = (notification: NotificationType) => {
    setNotifications([...notifications, notification]);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (notifications.length) {
      intervalId = setInterval(() => {
        switch (notifications.length) {
          case 1:
            setNotifications([]);
            break;

          default:
            setNotifications(notifications.slice(1));
            break;
        }
      }, NOTIFICATION_TIME * 1000);
    }

    if (intervalId) {
      return () => clearInterval(intervalId!);
    }
  }, [notifications]);

  return { notifications, addNotification };
};

export default useNotifications;
