import { Module } from '@nestjs/common';
import { LoginUseCase } from '../application/usecases/auth/login.usecase';
import { UserRepository } from 'src/infra/db/user.repository';
import { ProvidersEnum } from 'src/domain/enums/providers.enum';
import { CryptoService } from 'src/infra/crypto/crypto.service';
import { JWTService } from 'src/infra/jwt/jwt.service';
import { AuthController } from 'src/interfaces/http/auth/auth.controller';


@Module({
  controllers: [AuthController],
  providers: [
    LoginUseCase,
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
  exports: [LoginUseCase]
})
export class AuthModule { }
