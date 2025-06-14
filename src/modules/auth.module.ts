import { Module } from '@nestjs/common';
import { LoginUseCase } from '../application/usecases/auth/login.usecase';
import { UserRepository } from 'src/infra/db/user.repository';
import { ProvidersEnum } from 'src/domain/enums/providers.enum';
import { CryptoService } from 'src/infra/crypto/crypto.service';
import { AuthController } from 'src/interfaces/http/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' }
    })
  ],
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
  ],
  exports: [LoginUseCase]
})
export class AuthModule { }
