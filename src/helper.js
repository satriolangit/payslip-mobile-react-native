import {Toast} from 'native-base';

const showSuccessToast = (text, position = 'bottom') => {
  Toast.show({
    text: text,
    buttonText: 'OK',
    type: 'success',
    duration: 3000,
    position: position,
  });
};

const showWarningToast = (text, position = 'bottom') => {
  Toast.show({
    text: text,
    buttonText: 'OK',
    type: 'warning',
    duration: 3000,
    position: position,
  });
};

const showDangerToast = (text, position = 'bottom') => {
  Toast.show({
    text: text,
    buttonText: 'OK',
    type: 'danger',
    duration: 3000,
    position: position,
  });
};

const showInfoToast = (text, position = 'bottom') => {
  Toast.show({
    text: text,
    buttonText: 'OK',
    duration: 3000,
    position: position,
  });
};

export {showInfoToast, showDangerToast, showWarningToast, showSuccessToast};
