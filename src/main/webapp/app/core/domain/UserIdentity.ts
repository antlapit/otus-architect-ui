/** Сводная информация о аутентифицированном пользователе */
export interface UserIdentity {
    id: string;
    phoneNumber: string;
    activated: boolean;
    name: string;
    email: string;
    externalId: string;
    companyInn: string;
    emailNotUsed: boolean;
    callNotUsed: boolean;
    smsNotUsed: boolean;
    roles: any[];
}
