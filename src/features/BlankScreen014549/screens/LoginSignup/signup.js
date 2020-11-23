import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import CountryPicker from 'react-native-country-picker-modal';
import Color from '../../../../styles/colors';
import Button from '../../../../components/Button/index';
import TextStyle from '../../../../components/Text';
import styles from './styles';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'; // couldn't this be from react-native-vector-icons???
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';

import * as emailAuthActions from '../../redux/actions';

let width = Dimensions.get('window').width;
// let height = Dimensions.get('window').height;

const renderField = ({
  label,
  keyboardType,
  placeholder,
  secureTextEntry,
  meta: {touched, error, warning},
  input: {onChange, value, ...restInput},
}) => {
  return (
    <View>
      <TextStyle
        Text={label}
        extraTextStyle={{color: '#6A6A6A', fontSize: 12}}
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
        ((error && <Text style={{color: 'red', fontSize: 9}}>{error}</Text>) ||
          (warning && (
            <Text style={{color: 'orange', fontSize: 9}}>{warning}</Text>
          )))}
    </View>
  );
};

const renderPhoneField = ({
  label,
  keyboardType,
  placeholder,
  secureTextEntry,
  meta: {touched, error, warning},
  input: {onChange, value, ...restInput},
}) => {
  return (
    <View>
      <TextInput
        autoCapitalize="none"
        style={[
          // styles.textInput,
          {
            borderColor: Color.steel,
            borderLeftWidth: 0.5,
            paddingVertical: 10,
            marginLeft: 10,
            paddingLeft: 10,
            color: '#000',
            width: width / 2.3,
          },
        ]}
        placeholderTextColor={Color.steel}
        placeholder={placeholder}
        underlineColorAndroid={'transparent'}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        defaultValue={value}
        onChangeText={onChange}
        {...restInput}
      />
      {/* {touched &&
        ((error && <Text style={{color: 'red', fontSize: 9}}>{error}</Text>) ||
          (warning && (
            <Text style={{color: 'orange', fontSize: 9}}>{warning}</Text>
          )))} */}
    </View>
  );
};

const renderPhoneError = ({meta: {touched, error}}) =>
  touched && error ? (
    <Text style={{color: 'red', fontSize: 9}}>{error}</Text>
  ) : (
    false
  );

const Signup = props => {
  const {
    handleSubmit,
    onClearAllErrors,
    submitLoading,
    fbLoading,
    errorMsg,
  } = props;

  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState({callingCode: ['1'], cca2: 'US'});
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(true);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [withModal, setWithModal] = useState(true);
  const [visible, setVisible] = useState(false);

  const onSelect = seCountry => {
    setCountryCode(seCountry.cca2);
    setCountry(seCountry);
  };

  const showAlertError = msg => {
    Alert.alert(
      'Error',
      msg,
      [{text: 'OK', onPress: () => onClearAllErrors()}],
      {cancelable: false},
    );
  };

  const signup = values => {
    try {
      const userData = {
        email: values.email,
        user_type: 1,
        phone: values.phone,
        country_code: country.cca2,
        calling_code: country.callingCode[0],
        password1: values.password,
        password2: values.confirmPassword,
      };
      props.onSignUp(userData, () => {
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

  const switchVisible = () => setVisible(!visible);

  return (
    <>
      <View style={{marginVertical: 20, marginHorizontal: 15}}>
        {errorMsg ? showAlertError(errorMsg) : null}
        <Field
          name="email"
          keyboardType="email-address"
          label="Email address"
          placeholder="Email address"
          secureTextEntry={false}
          underlineColorAndroid={'transparent'}
          component={renderField}
        />
        <View>
          <TextStyle
            Text={'Mobile number'}
            extraTextStyle={{color: '#6A6A6A', fontSize: 12}}
          />
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderColor: Color.steel,
              borderWidth: 0.5,
              borderRadius: 5,
              paddingVertical: 1,
              marginTop: 5,
              marginBottom: 5,
            }}>
            <CountryPicker
              {...{
                countryCode,
                withFilter,
                withAlphaFilter,
                withCallingCode,
                withModal,
                onSelect,
                modalProps: {
                  visible,
                },
                onClose: () => setVisible(false),
                onOpen: () => setVisible(true),
              }}
              containerButtonStyle={{
                paddingLeft: 2,
              }}
            />
            <TouchableOpacity onPress={() => switchVisible()}>
              <View
                style={{
                  fontSize: 11,
                }}>
                <Text style={{textAlign: 'right', marginRight: 5}}>{`+${
                  country.callingCode[0]
                }`}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => switchVisible()}>
              <View>
                <FontAwesomeIcon icon={faCaretDown} color={'#000'} size={20} />
              </View>
            </TouchableOpacity>
            <Field
              name="phone"
              keyboardType="phone-pad"
              label="Mobile number"
              placeholder="Mobile number"
              secureTextEntry={false}
              underlineColorAndroid={'transparent'}
              // renderError={<Field name="phone" component={renderError} />}
              component={renderPhoneField}
            />
          </View>
          <Field name="phone" component={renderPhoneError} />
        </View>

        <Field
          name="password"
          keyboardType="default"
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid={'transparent'}
          component={renderField}
        />
        <Field
          name="confirmPassword"
          keyboardType="default"
          label="Confirm Password"
          placeholder="Confirm Password"
          secureTextEntry={true}
          underlineColorAndroid={'transparent'}
          component={renderField}
        />
      </View>
      <Button
        title="Sign Up"
        loading={submitLoading}
        textStyle={{fontSize: 16, fontWeight: '100'}}
        onPress={handleSubmit(values => signup(values))}
      />
      {/* <Button
        Text="Connect with Facebook"
        loading={fbLoading}
        textStyle={{fontSize: 16, fontWeight: '100'}}
        viewStyle={{backgroundColor: Color.facebook}}
        onPress={() => loginFacebook()}
      /> */}
      {/* <View
        style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        }}>
        <TouchableOpacity activeOpacity={.7} onPress={()=>{this.props.navigation.navigate("RecoverPassword")}}>
            <Text style={[styles.textRow]}>
              Forget your password?
             </Text>
        </TouchableOpacity>
      </View> */}
    </>
  );
};

const validate = values => {
  const errors = {};

  if (!values.phone) {
    errors.phone = 'Phone field is required';
  } else if (!/^[0-9]*\d$/i.test(values.phone)) {
    errors.phone =
      'Please only enter numeric characters only for your phone! (Allowed input:0-9)';
  }
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
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm password field is required';
  } else if (values.confirmPassword.length < 6) {
    errors.confirmPassword =
      'Confirm password should be longer than 6 letters!';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password doesn't match!";
  }
  return errors;
};

const mapStateToProps = state => {
  return {
    loadingIndicator: state.EmailAuth.loading,
    errorMsg: state.EmailAuth.errorMsg,
    submitLoading: state.EmailAuth.submit,
    fbLoading: state.EmailAuth.fbsubmit,
    isAuth: state.EmailAuth.accessToken !== null,
    isUser: state.EmailAuth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (data, fcmToken, callback) =>
      dispatch(emailAuthActions.signUp(data, fcmToken, callback)),
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
    form: 'SignupForm',
    validate,
  })(Signup),
);
