import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from '../../../interfaces/http/auth/dto/login-auth.dto';
import { IUserRepository } from 'src/domain/repositories/user/user.repository';
import { ProvidersEnum } from 'src/domain/enums/providers.enum';
import { ErrorsMessageEnum } from 'src/domain/enums/errors-message.enum';
import { ICryptoService } from 'src/domain/contracts/crypto.service';
import { IJWTService } from 'src/domain/contracts/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ProvidersEnum.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ProvidersEnum.CRYPTO_SERVICE)
    private readonly cryptoService: ICryptoService,
    @Inject(ProvidersEnum.JWT_SERVICE)
    private readonly jwtService: IJWTService,
  ) { }
  async login({ email, password }: CreateAuthDto): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(ErrorsMessageEnum.INVALID_EMAIL_OR_PASSWORD)
    }

    const passwordMatch = await this.cryptoService.compare(password, user.password)
    if (!passwordMatch) {
      throw new UnauthorizedException(ErrorsMessageEnum.INVALID_EMAIL_OR_PASSWORD)
    }

    const token = await this.jwtService.generateToken(user.id)

    return { token } as any
  }
}

