import React from 'react';
import LoginSignup from './screens/LoginSignup/index';
import { createStackNavigator } from 'react-navigation-stack';

const defaultStackSettings = {
  defaultNavigationOptions: ({ navigation }) => ({ header: null }),
}

export default EmailAuthStackScreen = createStackNavigator({
  LoginSignup,
},
  defaultStackSettings
)
