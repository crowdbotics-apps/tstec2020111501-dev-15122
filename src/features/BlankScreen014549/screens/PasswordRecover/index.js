import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Dimensions, View, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native';

import { styles } from '../styles';
import * as emailAuthActions from '../../redux/actions';
import Toast from 'react-native-simple-toast';
import ErrorBox from '../../../../components/ErrorBox';
import Button from '../../../../components/Button';
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

    componentWillReceiveProps(nextProps) {
        const { PasswordRecoverSuccess } = nextProps;
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
            source={{ uri: "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/cb-icon.png" }}
        />);
    };

    handleEmailChange(email) {
        this.setState({ email });
    }

    renderErrors() {
        const { recoverPasswordErrors } = this.props;
        if (recoverPasswordErrors) {
            return <ErrorBox errorText={recoverPasswordErrors} />;
        }
    }

    submitPasswordReset() {
        const { actions: {
            recoverPassword
        } } = this.props;

        const { email } = this.state;

        recoverPassword(email);
    }

    render() {
        const { email } = this.state;

        return (
            <View style={{
                flex: 1
            }}>
                <KeyboardAwareScrollView contentContainerStyle={styles.screen}>
                    {this.renderImage()}
                    <Text style={styles.heading}>{"Password Recovery"}</Text>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Email address</Text>
                        <TextInput
                            value={email}
                            onChangeText={this.handleEmailChange}
                            placeholder="eg: yourname@gmail.com"
                            size="small"
                            style={styles.input}
                            keyboardType="email-address"
                            textStyle={styles.text}
                            autoCapitalize="none" />
                    </View>
                    {/* <Button
                        title="Reset Password"
                        loading={submitLoading}
                        textStyle={{ fontSize: 16 }}
                        onPress={this.submitPasswordReset}
                    /> */}
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
                                .navigate("SetPassword")
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

const mapStateToProps = state => ({ recoverPasswordErrors: state.EmailAuth.errors.PasswordRecover, PasswordRecoverSuccess: state.EmailAuth.errors.PasswordRecoverSuccess });

const mapDispatchToProps = dispatch => ({
    actions: {
        recoverPassword: email => {
            dispatch(emailAuthActions.resetPassword(email));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps,)(PasswordRecover);
