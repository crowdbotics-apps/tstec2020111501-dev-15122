import React from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Button,
  Switch,
  TextInput,
  StyleSheet,
} from "react-native";
import DateTimePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import { CheckBox } from 'react-native-elements';
import {SlideMenuIcon} from '../../../navigator/slideMenuIcon';

export default class Blank extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: <SlideMenuIcon navigationProps={navigation} />,
    };
  };
  
  state = {};

  render = () => (
    <View style={styles.container}>
      <Text>This is your new component</Text>
      <View style={{justifyContent:'center', alignItems:'center',  width:100, height:100, borderWidth:2, backgroundColor:'pink'}}>
      <Text onPress={()=>this.props.navigation.navigate('BlankScreen014549')}> I am a product... ADD ME</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});
