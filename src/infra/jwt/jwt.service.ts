import { Injectable } from "@nestjs/common";
import { IJWTService } from "src/domain/contracts/jwt.service";

@Injectable()
export class JWTService implements IJWTService {
    async generateToken(user_id: number): Promise<string> {
        throw new Error("Method not implemented.");
    }
}