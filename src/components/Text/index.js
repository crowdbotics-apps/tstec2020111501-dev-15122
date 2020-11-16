import React from 'react';
import {Text, View} from 'react-native';

const TextStyle = props => {
  return (
    <View style={[props.viewStyle]}>
      <Text
        style={[
          {
            fontSize: 16,
            color: '#000',
            //fontFamily: 'OpenSans-Regular',
          },
          props.extraTextStyle,
        ]}>
        {props.Text}
      </Text>
    </View>
  );
};

export default TextStyle;