import React from 'react';
import Styles from './styles';
//import {Button} from 'react-native-paper';
// import {Button} from 'react-native-ui-kitten';
import { Button, TouchableOpacity, Text, View } from 'react-native';


const ButtonStyles = props => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={!props.loading}>
      <View style={[Styles.viewStyle, props.viewStyle]}>
        <Text style={[Styles.textStyle, props.textStyle]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
// const ButtonStyles = props => {
//   return (
//     <Button
//       mode="contained"
//       onPress={props.onPress}
//       loading={props.loading}
//       // style={[Styles.viewStyle, props.viewStyle]}
//       style={{borderWidth:10, borderColor:'red'}}
//       labelStyle={[Styles.textStyle, props.textStyle]}
//       title={props.title}
//       >
//       {/* {props.Text} */}
//     </Button>
//   );
// };

export default ButtonStyles;
