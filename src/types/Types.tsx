export type SignupProps = {
    auth?: any;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    options?: string;
    confirmPassword?: string;
}

export type GoogleSignInProps = {
    auth: any;
    provider: any;
}