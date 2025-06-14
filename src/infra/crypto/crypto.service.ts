import { Injectable } from "@nestjs/common";
import { ICryptoService } from "src/domain/contracts/crypto.service";
import * as bcrypt from 'bcrypt'
@Injectable()
export class CryptoService implements ICryptoService {
    private readonly salt = 10

    async hash(data: string): Promise<string> {
        return await bcrypt.hash(data, this.salt)
    }
    async compare(data: string, encrypted: string): Promise<boolean> {
        return await bcrypt.compare(data, encrypted)
    }
}