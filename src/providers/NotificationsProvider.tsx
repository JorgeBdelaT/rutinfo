import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import { NotificationType } from '../types';

type NotificationsContextType = {
  notifications: NotificationType[];
  setNotifications: Dispatch<SetStateAction<NotificationType[]>>;
};

interface NotificationsProviderProps {
  children: React.ReactNode;
}

export const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
