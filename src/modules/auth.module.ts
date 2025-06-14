import { Module } from '@nestjs/common';
import { AuthService } from '../application/usecases/auth/auth.service';
import { UserRepository } from 'src/infra/db/user.repository';
import { ProvidersEnum } from 'src/domain/enums/providers.enum';
import { CryptoService } from 'src/infra/crypto/crypto.service';
import { JWTService } from 'src/infra/jwt/jwt.service';
// import { AuthController } from './auth.controller';


@Module({
  providers: [
    AuthService,
    {
      provide: ProvidersEnum.USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: ProvidersEnum.CRYPTO_SERVICE,
      useClass: CryptoService
    },
    {
      provide: ProvidersEnum.JWT_SERVICE,
      useClass: JWTService
    },
  ],
  exports: [AuthService]
})
export class AuthModule { }
