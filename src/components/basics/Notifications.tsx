import React from 'react';
import styled, { keyframes } from 'styled-components';

import { NotificationType } from '../../types';
import { useNotifications } from '../../hooks';
import Portal from './Portal';

interface NotificationProps {
  notification: NotificationType;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  return (
    <NotificationContainer type={notification.type}>
      {notification.message}
    </NotificationContainer>
  );
};

const Notifications: React.FC = () => {
  const { notifications } = useNotifications();

  return (
    <Portal id="notifications-root">
      <NotificationsContainer>
        {notifications.map((notification) => {
          return (
            <Notification
              key={`notification-${notification.message}`}
              notification={notification}
            >
              {notification.message}
            </Notification>
          );
        })}
      </NotificationsContainer>
    </Portal>
  );
};

const NotificationsContainer = styled.div`
  align-items: flex-start;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  left: 3rem;
  position: fixed;
`;

interface NotificationContainerProps {
  type: 'error' | 'success';
}

const notificationAnimation = keyframes`
  0% { width: 0px; opacity: 0 }
  85% { width: 115%; opacity: 0.75 }
  100% { width: 100%; opacity: 1 }
`;

const NotificationContainer = styled.div<NotificationContainerProps>`
  animation-duration: 0.4s;
  animation-fill-mode: backwards;
  animation-name: ${notificationAnimation};
  animation-timing-function: ease-in-out;
  background-color: var(
    ${(props) => (props.type === 'error' ? '--color-error' : '--color-success')}
  );
  border-radius: 3px;
  color: var(--color-white);
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1rem 1.8rem;
  white-space: nowrap;

  :not(:last-child) {
    margin-bottom: 1.4rem;
  }
`;

export default Notifications;
