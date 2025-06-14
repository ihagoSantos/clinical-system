import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from '../../../interfaces/http/auth/dto/login-auth.dto';
import { IUserRepository } from 'src/domain/repositories/user/user.repository';
import { ProvidersEnum } from 'src/domain/enums/providers.enum';
import { ErrorsMessageEnum } from 'src/domain/enums/errors-message.enum';
import { ICryptoService } from 'src/domain/contracts/crypto.service';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(ProvidersEnum.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ProvidersEnum.CRYPTO_SERVICE)
    private readonly cryptoService: ICryptoService,
    private jwtService: JwtService
  ) { }
  async execute({ email, password }: CreateAuthDto): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(ErrorsMessageEnum.INVALID_EMAIL_OR_PASSWORD)
    }

    const passwordMatch = await this.cryptoService.compare(password, user.password)
    if (!passwordMatch) {
      throw new UnauthorizedException(ErrorsMessageEnum.INVALID_EMAIL_OR_PASSWORD)
    }

    const token = await this.jwtService.signAsync({
      userId: user.id
    })

    return { token } as any
  }
}

