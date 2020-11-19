import React from 'react';
import LoginSignup from './screens/LoginSignup';
import ConfirmationRequired from './screens/ConfirmationRequired';
import PasswordRecover from './screens/PasswordRecover';
import SetPassword from './screens/SetPassword';
import { createStackNavigator } from 'react-navigation-stack';

export default AuthStack = createStackNavigator({
  LoginSignup,
  ConfirmationRequired,
  PasswordRecover,
  SetPassword
},
{
  defaultNavigationOptions: ({ navigation }) => ({ header: null }),
}
)
