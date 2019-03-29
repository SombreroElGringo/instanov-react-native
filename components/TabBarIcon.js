import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';

const TabBarIcon = name => ({ tintColor }) => (
  <MaterialIcons
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor}
    size={24}
  />
);

export default TabBarIcon;
