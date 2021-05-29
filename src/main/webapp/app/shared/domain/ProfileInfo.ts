export class CaptchaInfo {
    clientKey: string;
    enabled: boolean;
}

export class ProfileInfo {
    activeProfiles: string[];
    ribbonEnv: string;
    inProduction: boolean;
    swaggerEnabled: boolean;
    captcha: CaptchaInfo;
}
