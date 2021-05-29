/** Сводная информация о аутентифицированном пользователе */
export interface Company {
    id: string;
    name: string;
    inn: string;
    actualAddress: string;
    phoneNumber: string;
    sibIsAgent: boolean;
}
