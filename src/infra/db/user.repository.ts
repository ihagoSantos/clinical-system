import { Injectable } from "@nestjs/common";
import { User } from "src/domain/entities/user.entity";
import { IUserRepository } from "src/domain/repositories/user/user.repository";
@Injectable()
export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
}