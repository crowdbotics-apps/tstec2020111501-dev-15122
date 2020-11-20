import * as actions from "./constants";

const initialState = {
    user: null,
    accessToken: null,
    PasswordRecoverSuccess: null,
    PasswordResetSuccess: null,
    errors: {
        SignIn: null,
        SignUp: null,
        PasswordRecover: null,
        PasswordReset: null
    }
};

export default EmailAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.EMAIL_AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                accessToken: action.accessToken,
                user: action.user,
                errors: {
                    SignIn: null
                }
            };
        case actions.EMAIL_AUTH_LOGIN_ERROR:
            return {
                ...state,
                errors: {
                    SignIn: action.error
                }
            };
            
        case actions.EMAIL_AUTH_PASSWORD_RESET_ERROR:
          return {
              ...state,
              errors: {
                  PasswordReset: action.error
              }
          };
        case actions.EMAIL_AUTH_PASSWORD_RECOVER_ERROR:
            return {
                ...state,
                errors: {
                    PasswordRecover: action.error
                }
            };
        case actions.EMAIL_AUTH_SIGNUP_SUCCESS:
            console.log(action.user)
            return {
                ...state,
                user: action.user,
                errors: {
                  SignUp: null
                }
            };

        case actions.EMAIL_AUTH_PASSWORD_RECOVER_SUCCESS:
            return {
                ...state,
                PasswordRecoverSuccess: action.email,
                errors: {
                  PasswordRecover: null,
                  PasswordReset: null
                }
            };
            
        case actions.EMAIL_AUTH_PASSWORD_RESET_SUCCESS:
          return {
              ...state,
              errors: {
                PasswordRecover: null,
                PasswordReset: null
              }
          };
        case actions.EMAIL_AUTH_SIGNUP_ERROR:
            return {
                ...state,
                errors: {
                    SignUp: action.error
                }
            };
        case actions.EMAIL_AUTH_LOGOUT:
            return initialState;
        default:
            return state;
    }
};
