import { Module } from "@nestjs/common";
import { ProvidersEnum } from "src/domain/enums/providers.enum";
import { JWTService } from "src/infra/jwt/jwt.service";

@Module({
    providers: [
        {
            provide: ProvidersEnum.JWT_SERVICE,
            useClass: JWTService,
        }
    ],
    exports: [JWTService]
})
export class JWTModule { }