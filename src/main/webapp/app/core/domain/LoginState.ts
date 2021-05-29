export class LoginState {
    phoneNumber: String;
    status: String;
    loginCodeLength?: number;
    jwtToken?: String;
    captchaRequired?: boolean;
    loginData?: any;
    emailConfirmed?: boolean;
    error?: string;
}
