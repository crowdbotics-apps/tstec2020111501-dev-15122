import React from 'react';
// import {Text, Layout, Button} from 'react-native-ui-kitten';
import {Text, Button, View} from 'react-native';
import {styles} from '../styles';

export default function ConfirmationRequired(props) {
  const handleOnPress = () => {
    const {navigation} = props;
    navigation.navigate('SplashScreen');
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.textRow}>
        We have sent a confirmation link to your email address. In order
        continue, please click the confirmation link.
      </Text>
      <Button style={styles.actionButon} onPress={handleOnPress}>
        Return to blueprints
      </Button>
    </View>
  );
}