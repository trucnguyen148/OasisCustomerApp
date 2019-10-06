import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import Verify from '../screens/Signup/Verify';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: Signin,
    Signup: Signup,
    Verify: Verify,
    MainTabNavigator: MainTabNavigator
  })
);
