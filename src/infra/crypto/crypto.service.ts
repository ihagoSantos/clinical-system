import { Injectable } from "@nestjs/common";
import { ICryptoService } from "src/domain/contracts/crypto.service";

@Injectable()
export class CryptoService implements ICryptoService {
    hash(data: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    compare(data: string, encrypted: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}