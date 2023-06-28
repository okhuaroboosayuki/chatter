export type AuthUser = {
    id?: string;
    firstName?: string;
    lastName?: string;
    options?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export type SignupProps = {
    auth: any;
    email: string;
    password: string;
}

export type GoogleSignInProps = {
    auth: any;
    provider: any;
}