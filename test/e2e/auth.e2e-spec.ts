import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/modules/app.module';
import { App } from 'supertest/types'
import * as request from 'supertest';
import { ErrorsMessageEnum } from 'src/domain/enums/errors-message.enum';
import { UserRepository } from 'src/infra/db/user.repository';
import { UserMock } from '../mocks/users/user.mock';
import { CryptoService } from 'src/infra/crypto/crypto.service';
import { ProvidersEnum } from 'src/domain/enums/providers.enum';
import { JwtService } from '@nestjs/jwt';

describe("AuthController (e2e)", () => {
    let app: INestApplication<App>;
    let userRepositoryStub: Partial<UserRepository>;
    let cryptoServiceStub: Partial<CryptoService>;
    let jwtServiceStub: Partial<JwtService>;
    beforeEach(async () => {
        userRepositoryStub = {
            findByEmail: jest.fn().mockResolvedValue(UserMock)
        }
        cryptoServiceStub = {
            compare: jest.fn().mockResolvedValue(true)
        }
        jwtServiceStub = {
            signAsync: jest.fn().mockResolvedValue('TOKEN')
        }

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        })
            .overrideProvider(ProvidersEnum.USER_REPOSITORY)
            .useValue(userRepositoryStub)
            .overrideProvider(ProvidersEnum.CRYPTO_SERVICE)
            .useValue(cryptoServiceStub)
            .overrideProvider(JwtService)
            .useValue(jwtServiceStub)
            .compile()

        app = moduleFixture.createNestApplication()
        await app.init();
    })

    afterAll(async () => {
        app.close()
    })

    describe("/login (POST)", () => {
        it('should return HTTP status 401 when email is invalid', async () => {
            jest.spyOn(userRepositoryStub, 'findByEmail').mockResolvedValue(null);
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    email: 'any',
                    password: 'any',
                })
                .expect(401)
                .expect({
                    message: ErrorsMessageEnum.INVALID_EMAIL_OR_PASSWORD,
                    error: 'Unauthorized',
                    statusCode: 401
                })
        })

        it('should return HTTP status 401 when password is invalid', async () => {
            jest.spyOn(cryptoServiceStub, 'compare').mockResolvedValue(false);
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    email: 'any',
                    password: 'any',
                })
                .expect(401)
                .expect({
                    message: ErrorsMessageEnum.INVALID_EMAIL_OR_PASSWORD,
                    error: 'Unauthorized',
                    statusCode: 401
                })
        })

        it('should return HTTP status 200 and token when data is valid', async () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    email: 'any',
                    password: 'any',
                })
                .expect(200)
                .expect({
                    token: 'TOKEN'
                })
        })
    })
})