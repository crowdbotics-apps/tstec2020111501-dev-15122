import React from 'react';
import Styles from './styles';
//import {Button} from 'react-native-paper';
import {Button} from 'react-native-ui-kitten';

const ButtonStyles = props => {
  return (
    <Button
      mode="contained"
      onPress={props.onPress}
      loading={props.loading}
      style={[Styles.viewStyle, props.viewStyle]}
      labelStyle={[Styles.textStyle, props.textStyle]}>
      {props.Text}
    </Button>
  );
};

export default ButtonStyles;
