/** Сводная информация о аутентифицированном пользователе */
export interface UserIdentity {
    id: string;
    username: string;
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
}
