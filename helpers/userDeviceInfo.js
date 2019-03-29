import { Dimensions } from 'react-native';
import { Constants } from 'expo';

export const getDeviceId = () => Constants.deviceId;

export const getDeviceName = () => Constants.deviceName;

export const getPlatform = () => Constants.platform;

export const getWidth = () => Dimensions.get('window').width;

export const getHeight = () => Dimensions.get('window').height;

export const isSmallDevice = (width) => width < 375;

export const getUserInfo = () => {
  return {
    deviceId: getDeviceId(),
    deviceName: getDeviceName(),
    platform: getPlatform(),
  };
}
