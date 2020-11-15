import React from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import container from '../../../styles/style';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import {Tab, Tabs} from 'native-base';
import Signup from './signup';
import Login from './login';
import Color from '../../../styles/color';
import style from './styles';

const EmailAuth = props => {
  return (
    <ScrollView>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <View style={[container.container, {backgroundColor: Color.whiteOff}]}>
          <StatusBar barStyle="light-content" />
          <View style={{flex: 1}}>
            <View
              style={{
                width: width,
                height: height / 2,
                backgroundColor: Color.malibu,
              }}>
              <ImageBackground
                source={require('../../../assets/images/halfbg.png')}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  resizeMode: 'cover',
                }}>
                <Image
                  source={require('../../../assets/images/cb-icon.png')}
                  style={{
                    width: 155,
                    height: 155,
                    alignSelf: 'center',
                    resizeMode: 'contain',
                  }}
                />
              </ImageBackground>
            </View>
          </View>
          <View style={[style.cardView]}>
            <View style={{marginBottom: 20}}>
              <Tabs
                tabBarUnderlineStyle={{
                  width: 50,
                  backgroundColor: Color.malibu,
                  borderRadius: 130,
                  marginBottom: 10,
                  marginLeft: width / 6.2,
                }}
                tabContainerStyle={{
                  marginTop: 20,
                  elevation: 0,
                  paddingBottom: 20,
                  borderBottomColor: Color.gray,
                  backgroundColor: Color.white,
                }}>
                <Tab
                  activeTabStyle={{backgroundColor: Color.white}}
                  heading="Sign In"
                  activeTextStyle={{
                    color: Color.black,
                    fontSize: 20,
                    fontFamily: 'OpenSans-Regular',
                  }}
                  tabStyle={{backgroundColor: Color.white}}
                  textStyle={{
                    color: Color.steel,
                    fontSize: 20,
                    fontFamily: 'OpenSans-Regular',
                  }}>
                  <Login />
                </Tab>
                <Tab
                  activeTabStyle={{backgroundColor: Color.white}}
                  heading="Sign Up"
                  activeTextStyle={{
                    color: Color.black,
                    fontSize: 20,
                    fontFamily: 'OpenSans-Regular',
                  }}
                  tabStyle={{backgroundColor: Color.white}}
                  textStyle={{
                    color: Color.steel,
                    fontSize: 20,
                    fontFamily: 'OpenSans-Regular',
                  }}>
                  <Signup />
                </Tab>
              </Tabs>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default EmailAuth;