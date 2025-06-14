import { User } from "src/domain/entities/user.entity";

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
}