import {Toast} from 'native-base';

const showSuccessToast = text => {
  Toast.show({
    text: text,
    buttonText: 'OK',
    type: 'success',
    duration: 3000,
    position: 'top',
  });
};

const showWarningToast = text => {
  Toast.show({
    text: text,
    buttonText: 'OK',
    type: 'warning',
    duration: 3000,
    position: 'top',
  });
};

const showDangerToast = text => {
  Toast.show({
    text: text,
    buttonText: 'OK',
    type: 'danger',
    duration: 3000,
    position: 'top',
  });
};

const showInfoToast = text => {
  Toast.show({
    text: text,
    buttonText: 'OK',
    duration: 3000,
    position: 'top',
  });
};

export {showInfoToast, showDangerToast, showWarningToast, showSuccessToast};
