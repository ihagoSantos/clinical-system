export interface IJWTService {
    generateToken(user_id: number): Promise<string>
}