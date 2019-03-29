import { Permissions } from 'expo';
import { Linking } from 'react-native';

export const getPermission = async (permission) => {
  let { status } = await Permissions.askAsync(permission);
  if (status !== 'granted') {
    Linking.openURL('app-settings:');
    return false;
  }
  return true;
}
