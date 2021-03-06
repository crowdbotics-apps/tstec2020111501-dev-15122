import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import SplashScreen from "../features/SplashScreen";
import SideMenu from './sideMenu';
//@BlueprintImportInsertion
import BlankScreen714664Navigator from '../features/BlankScreen714664/navigator';
import BlankScreen614663Navigator from '../features/BlankScreen614663/navigator';
import BlankScreen514662Navigator from '../features/BlankScreen514662/navigator';
import BlankScreen414661Navigator from '../features/BlankScreen414661/navigator';
import BlankScreen314660Navigator from '../features/BlankScreen314660/navigator';
import BlankScreen214659Navigator from '../features/BlankScreen214659/navigator';
import BlankScreen114658Navigator from '../features/BlankScreen114658/navigator';
import BlankScreen014549Navigator from '../features/BlankScreen014549/navigator';

/**
 * new navigators can be imported here
 */

const AppNavigator = {

  //@BlueprintNavigationInsertion
  BlankScreen714664: { screen: BlankScreen714664Navigator },
  BlankScreen614663: { screen: BlankScreen614663Navigator },
  BlankScreen514662: { screen: BlankScreen514662Navigator },
  BlankScreen414661: { screen: BlankScreen414661Navigator },
  BlankScreen314660: { screen: BlankScreen314660Navigator }, //home
  BlankScreen214659: { screen: BlankScreen214659Navigator }, //onboarding
  BlankScreen114658: { screen: BlankScreen114658Navigator }, //splash
  BlankScreen014549: { screen: BlankScreen014549Navigator }, //login

  /** new navigators can be added here */
  SplashScreen: {
    screen: SplashScreen
  }
};

const DrawerAppNavigator = createDrawerNavigator(
  {
    ...AppNavigator,
  },
  {
    contentComponent: SideMenu,
    initialRouteName: "BlankScreen114658",
  },
);

const AppContainer = createAppContainer(DrawerAppNavigator);

export default AppContainer;
