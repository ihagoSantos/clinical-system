import { Module } from "@nestjs/common";
import { ProvidersEnum } from "src/domain/enums/providers.enum";
import { CryptoService } from "src/infra/crypto/crypto.service";

@Module({
    providers: [
        {
            provide: ProvidersEnum.CRYPTO_SERVICE,
            useClass: CryptoService,
        }
    ],
    exports: [CryptoService]
})
export class CryptoModule { }