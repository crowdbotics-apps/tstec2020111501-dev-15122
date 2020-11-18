import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Color from '../../../../styles/colors';
import Button from '../../../../components/Button/index';
import TextStyle from '../../../../components/Text';
import styles from './styles';
import * as emailAuthActions from '../../redux/actions';
import * as NavigationService from '../../../../navigator/NavigationService'

const renderField = ({
  label,
  keyboardType,
  placeholder,
  secureTextEntry,
  meta: { touched, error, warning },
  input: { onChange, value, ...restInput },
}) => {
  return (
    <View>
      <TextStyle
        Text={label}
        extraTextStyle={{ color: '#6A6A6A', fontSize: 12 }}
      />
      <TextInput
        autoCapitalize="none"
        style={[styles.textInput]}
        placeholderTextColor={Color.steel}
        placeholder={placeholder}
        underlineColorAndroid={'transparent'}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        defaultValue={value}
        onChangeText={onChange}
        {...restInput}
      />
      {touched &&
        ((error && <Text style={{ color: 'red', fontSize: 9 }}>{error}</Text>) ||
          (warning && (
            <Text style={{ color: 'orange', fontSize: 9 }}>{warning}</Text>
          )))}
    </View>
  );
};

const Login = props => {
  const {
    handleSubmit,
    onClearAllErrors,
    submitLoading,
    fbLoading,
    errorMsg,
  } = props;

  const showAlertError = msg => {
    Alert.alert(
      'Error',
      msg,
      [{ text: 'OK', onPress: () => onClearAllErrors() }],
      { cancelable: false },
    );
  };

  const login = values => {
    try {
      const userData = {
        email: values.email,
        password: values.password,
      };
      props.onSignIn(userData, () => {
        props.navigation.navigate('Welcome');
      });
    } catch (e) {
      showAlertError(e.message);
    }
  };

  const loginFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        Alert.alert('Login was cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          const fields = {
            access_token: data.accessToken.toString(),
            user_type: 1,
          };
          props.onFbLogin(fields, () => {
            props.navigation.navigate('Welcome');
          });
        });
      }
    } catch (error) {
      Alert.alert(`Login failed with error: ${error}`);
    }
  };

  return (
    <KeyboardAvoidingView>
      {errorMsg ? showAlertError(errorMsg) : null}
      <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
        <Field
          name="email"
          keyboardType="email-address"
          label="Email address"
          placeholder="Email address"
          secureTextEntry={false}
          underlineColorAndroid={'transparent'}
          component={renderField}
        />
        <Field
          name="password"
          keyboardType="default"
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid={'transparent'}
          component={renderField}
        />
      </View>
      <Button
        title="Login"
        loading={submitLoading}
        textStyle={{ fontSize: 16 }}
        onPress={handleSubmit(login)}
      />
      <Button
        title="Connect with Facebook"
        loading={fbLoading}
        textStyle={{ fontSize: 16, fontWeight: '100' }}
        viewStyle={{ backgroundColor: Color.facebook, }}
        onPress={() => loginFacebook()}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <TouchableOpacity activeOpacity={.7} onPress={() => {  NavigationService.navigate("PasswordRecover") }}>
          <Text style={[styles.textRow]}>
            Forget your password?
             </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email address field is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password field is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password should be longer than 6 letters!';
  }
  return errors;
};

const mapStateToProps = state => {
  return {
    loadingIndicator: state.EmailAuth.loading,
    submitLoading: state.EmailAuth.submit,
    fbLoading: state.EmailAuth.fbsubmit,
    errorMsg: state.EmailAuth.errorMsg,
    isAuth: state.EmailAuth.accessToken !== null,
    isUser: state.EmailAuth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (data, callback) =>
      dispatch(emailAuthActions.signIn(data, callback)),
    onFbLogin: (fields, callback) =>
      dispatch(emailAuthActions.fbLogin(fields, callback)),
    onClearAllErrors: () => dispatch(emailAuthActions.clearError()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'LoginForm',
    validate,
  })(Login),
);
