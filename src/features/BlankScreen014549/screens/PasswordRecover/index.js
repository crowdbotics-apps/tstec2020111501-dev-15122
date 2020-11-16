import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Dimensions, View, TouchableOpacity, ScrollView} from 'react-native';
import {Text,  Input} from 'react-native-ui-kitten';

import {styles} from '../styles';
import * as emailAuthActions from '../../redux/actions';
import Toast from 'react-native-simple-toast';
import ErrorBox from '../../../../components/ErrorBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class PasswordRecover extends Component {
    static navigationOptions = {
        headerMode: 'none'
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: {
                email: ''
            }
        };

        this.handleEmailChange = this
            .handleEmailChange
            .bind(this);
        this.submitPasswordReset = this
            .submitPasswordReset
            .bind(this);
        this.renderErrors = this
            .renderErrors
            .bind(this);
    }

    componentWillReceiveProps(nextProps){
      const {PasswordRecoverSuccess} = nextProps;
      if (PasswordRecoverSuccess) {
        Toast.show('Password Reset Email Sent..', Toast.LONG);
      }
    }

    renderImage = () => {
        const screenSize = Dimensions.get('window');
        const imageSize = {
            width: 365,
            height: 161
        };
        return (<Image
            style={[styles.image, imageSize]}
            source={require('../../../../assets/icons/logo.png')}/>);
    };

    handleEmailChange(email) {
        this.setState({email});
    }

    renderErrors() {
        const {recoverPasswordErrors} = this.props;
        if (recoverPasswordErrors) {
            return <ErrorBox errorText={recoverPasswordErrors}/>;
        }
    }

    submitPasswordReset() {
        const {actions: {
                recoverPassword
            }} = this.props;

        const {email} = this.state;

        recoverPassword(email);
    }

    render() {
        const {email} = this.state;

        return (
            <View style={{
                flex: 1
            }}>
                <KeyboardAwareScrollView contentContainerStyle={styles.screen}>
                    {this.renderImage()}
                    <Text style={styles.heading}>{"IwantSMART.com Rebate\nManagement Program"}</Text>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Email address</Text>
                        <Input
                            value={email}
                            onChangeText={this.handleEmailChange}
                            placeholder="eg: yourname@gmail.com"
                            size="small"
                            style={styles.input}
                            keyboardType="email-address"
                            textStyle={styles.text}
                            autoCapitalize="none"/>
                    </View>
                    <TouchableOpacity
                        activeOpacity={.7}
                        style={[styles.actionButon]}
                        onPress={this.submitPasswordReset}>
                        <Text
                            style={{
                            color: '#fff',
                            fontSize: 15
                        }}>{"Reset Password"}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => {
                        this
                            .props
                            .navigation
                            .navigate("ResetPassword")
                    }}>
                        <Text style={[styles.textRow]}>
                            have reset code ? reset now!
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => {
                        this
                            .props
                            .navigation
                            .goBack()
                    }}>
                        <Text style={[styles.textRow]}>
                            Back to login?
                        </Text>
                    </TouchableOpacity>

                    {this.renderErrors()}
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({recoverPasswordErrors: state.EmailAuth.errors.PasswordRecover,PasswordRecoverSuccess: state.EmailAuth.errors.PasswordRecoverSuccess});

const mapDispatchToProps = dispatch => ({
    actions: {
        recoverPassword: email => {
            dispatch(emailAuthActions.resetPassword(email));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps,)(PasswordRecover);