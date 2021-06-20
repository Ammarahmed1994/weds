import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

/**
 * notification types:
 *  success
 *  danger
 *  info
 *  default
 *  warning
 */

export const triggerNotification = ({ title, message, variant }) => {
  const notification = {
    title, message,
    type: variant,
    insert: `bottom`,
    container: `bottom-left`,
    animationIn: [ `animated`, `fadeIn` ],
    animationOut: [ `animated`, `fadeOut` ],
    dismiss: {
      duration: 3500,
      onScreen: true
    },
    width: 275
  };
  store.addNotification(notification);
};

export const handleSuccess = message => {
  triggerNotification({
    variant: `success`,
    title: `Success`,
    message
  });
};

export const handleError = err => {
  const message = err.message || `An unknown error has occurred`;
  triggerNotification({
    variant: `danger`,
    title: `Error`,
    message
  });
};

export const handleValidationError = err => {
  const message = err.message || `An unknown error has occurred`;
  triggerNotification({
    variant: `warning`,
    title: `Warning`,
    message
  });
};

export const handleAsync = func => async (...args) => {
  try {
    return await func(...args);
  } catch (err) {
    handleError(err);
  }
};