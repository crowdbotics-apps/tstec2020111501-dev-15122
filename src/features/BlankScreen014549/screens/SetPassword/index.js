import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Dimensions, View, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';

// import Color from '../../../styles/color';
import { styles } from '../styles';
import * as emailAuthActions from '../../redux/actions';
import ErrorBox from '../../../../components/ErrorBox';
import Button from '../../../../components/Button/index';
import validate from 'validate.js';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

var constraints = {

    password: {
        presence: true,
        length: {
            minimum: 8,
            maximum: 20,
            message: "must be at least 8 characters and maximum 20 characters."
        }
    },
    cpassword: {
        equality: "password",
        presence: {
            message: "^Password is different from password confirmation."
        }
    }
}

class PasswordRecover extends Component {
    static navigationOptions = {
        headerMode: 'none'
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            token: (props.navigation.state.params && props.navigation.state.params.token)
                ? props.navigation.state.params.token
                : "",
            errors: {
                password: '',
                cpassword: ''
            }
        };

        this.handlePasswordChange = this
            .handlePasswordChange
            .bind(this);
        this.handleCPasswordChange = this
            .handleCPasswordChange
            .bind(this);
        this.submitPasswordReset = this
            .submitPasswordReset
            .bind(this);
        this.renderErrors = this
            .renderErrors
            .bind(this);
    }

    componentDidMount() { }

    renderImage = () => {
        const screenSize = Dimensions.get('window');
        const imageSize = {
            width: 365,
            height: 161
        };
        return (<Image
            style={[styles.image, imageSize]}
            source={{ uri: "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/cb-icon.png" }} />);
    };

    handlePasswordChange(password) {
        this.setState({ password });
    }

    handleCPasswordChange(cpassword) {
        this.setState({ cpassword });
    }

    handleTokenChange(token) {
        this.setState({ token });
    }

    renderErrors() {
        const { passwordResetErrors } = this.props;
        if (passwordResetErrors) {
            return <ErrorBox errorText={passwordResetErrors} />;
        }
    }

    submitPasswordReset() {
        const { actions: {
            setPassword
        } } = this.props;

        const { password, cpassword, token } = this.state;

        // todo add disable buttons on submit
        let errors = validate({
            password: password,
            cpassword: cpassword
        }, constraints);

        if (errors) {
            console.log(errors)

            if (errors.cpassword) {
                this.setState({ passwordResetErrors: "Password is different from password confirmation." })
                Toast.show("Password is different from password confirmation.", Toast.LONG);
                return false;
            }
            if (errors.password) {
                this.setState({ passwordResetErrors: errors.password[0] })
                Toast.show(errors.password[0], Toast.LONG);
                return false;
            }
            return;
        }

        if (password.search(/\d/) == -1) {

            Toast.show("Password must be at least 8 digits and must have at least one letter and one num" +
                "ber.",
                Toast.LONG);
            return false;
        } else if (password.search(/[a-zA-Z]/) == -1) {

            Toast.show("Password must be at least 8 digits and must have at least one letter and one num" +
                "ber.",
                Toast.LONG);
            return false;
        } else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {

            Toast.show("Password must be at least 8 digits and must have at least one letter and one num" +
                "ber.",
                Toast.LONG);
            return false;
        }
        setPassword(password, token);
    }

    render() {
        const { password, cpassword, token } = this.state;

        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
            }}>
                <KeyboardAwareScrollView contentContainerStyle={styles.screen}>
                    {this.renderImage()}
                    <Text style={styles.heading}>{"Set Password"}</Text>

                    <View style={[styles.fieldContainer]}>
                        <Text style={styles.label}>Reset Code</Text>
                        <TextInput
                            value={token}
                            onChangeText={this
                                .handleTokenChange
                                .bind(this)}
                            placeholder="••••••••"
                            size="small"
                            style={styles.input}
                            textStyle={styles.text}
                            autoCapitalize="none" />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>New Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={this.handlePasswordChange}
                            placeholder="••••••••"
                            size="small"
                            style={styles.input}
                            secureTextEntry={true}
                            textStyle={styles.text}
                            autoCapitalize="none" />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Confirm New Password</Text>
                        <TextInput
                            value={cpassword}
                            onChangeText={this.handleCPasswordChange}
                            placeholder="••••••••"
                            size="small"
                            style={styles.input}
                            secureTextEntry={true}
                            textStyle={styles.text}
                            autoCapitalize="none" />
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
                    {/* <Button
                        title="Reset Password"
                        loading={submitLoading}
                        textStyle={{ fontSize: 16 }}
                        onPress={this.submitPasswordReset}
                    /> */}
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => {
                            this
                                .props
                                .navigation
                                .navigate("LoginSignup")
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

const mapStateToProps = state => ({ passwordResetErrors: state.EmailAuth.errors.PasswordReset });

const mapDispatchToProps = dispatch => ({
    actions: {
        setPassword: (password, token) => {
            dispatch(emailAuthActions.setPassword(password, token));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps,)(PasswordRecover);
