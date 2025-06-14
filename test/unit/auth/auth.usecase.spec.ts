import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../src/application/usecases/auth/auth.service';
import { UserRepository } from '../../../src/infra/db/user.repository';
import { UserMock } from '../../mocks/users/user.mock';
import { ProvidersEnum } from '../../../src/domain/enums/providers.enum';
import { ErrorsMessageEnum } from 'src/domain/enums/errors-message.enum';
import { CryptoService } from 'src/infra/crypto/crypto.service';
import { JWTService } from 'src/infra/jwt/jwt.service';

describe('AuthService', () => {
  let service: AuthService;
  let userRepositoryStub: Partial<UserRepository>;
  let cryptoServiceStub: Partial<CryptoService>;
  let jwtServiceStub: Partial<JWTService>;

  beforeEach(async () => {
    userRepositoryStub = {
      findByEmail: jest.fn().mockResolvedValue(UserMock)
    }
    cryptoServiceStub = {
      compare: jest.fn().mockResolvedValue(true)
    }
    jwtServiceStub = {
      generateToken: jest.fn().mockResolvedValue('TOKEN')
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ProvidersEnum.USER_REPOSITORY,
          useValue: userRepositoryStub,
        },
        {
          provide: ProvidersEnum.CRYPTO_SERVICE,
          useValue: cryptoServiceStub,
        },
        {
          provide: ProvidersEnum.JWT_SERVICE,
          useValue: jwtServiceStub,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

  });

  describe('login', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should throw a generic error when email does not exists', async () => {
      const spy = jest.spyOn(userRepositoryStub, 'findByEmail').mockResolvedValue(null);
      const data = {
        email: "any",
        password: "any",
      }
      await expect(service.login(data))
        .rejects
        .toThrow(ErrorsMessageEnum.INVALID_EMAIL_OR_PASSWORD);

      expect(spy).toHaveBeenCalledWith(data.email)
      expect(spy).toHaveBeenCalledTimes(1)

    });

    it('should throw a generic error when password does not match', async () => {
      const spy = jest.spyOn(cryptoServiceStub, 'compare').mockResolvedValue(false)
      const data = {
        email: "any",
        password: "any",
      }
      await expect(service.login(data))
        .rejects
        .toThrow(ErrorsMessageEnum.INVALID_EMAIL_OR_PASSWORD);

      expect(spy).toHaveBeenCalledWith(data.password, UserMock.password)
      expect(spy).toHaveBeenCalledTimes(1)
    });
  });
  it('should be return a token when user inform a valid email and password', async () => {
    const spy = jest.spyOn(jwtServiceStub, 'generateToken')
    const data = {
      email: "any",
      password: "any",
    }
    const expected = {
      token: "TOKEN"
    }
    const result = await service.login(data)
    expect(result).toStrictEqual(expected)

    expect(spy).toHaveBeenCalledWith(UserMock.id)
    expect(spy).toHaveBeenCalledTimes(1)
  });
});
