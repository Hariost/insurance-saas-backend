export interface JwtPayload {
    // email: string;
    userId: string;
    isSecondFactorAuthenticated? : boolean;
}
