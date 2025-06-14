import { Test, TestingModule } from "@nestjs/testing"
import { CryptoService } from "../../../src/infra/crypto/crypto.service"
import * as bcrypt from 'bcrypt'

const SALT = 10

jest.mock('bcrypt')

describe('Crypto Service Test Suite', () => {
    let service: CryptoService

    beforeEach(async () => {
        jest.resetAllMocks();

        ; (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_data');
        ; (bcrypt.compare as jest.Mock).mockResolvedValue(true);

        const module: TestingModule = await Test.createTestingModule({
            providers: [CryptoService]
        }).compile()
        service = module.get<CryptoService>(CryptoService)
    })

    it('should return a string when password is passed', async () => {  // Adicione async aqui
        const spy = jest.spyOn(bcrypt, 'hash')
        const response = await service.hash("any_password")  // Use await aqui

        expect(response).toBe('hashed_data')
        expect(spy).toBeCalledWith("any_password", SALT)
    })

    it('should return false when data is different of encrypted data', async () => {
        const spy = jest.spyOn(bcrypt, 'compare').mockResolvedValue(false)
        const response = await service.compare('data', 'differentData')
        expect(response).toBeFalsy()
        expect(spy).toBeCalledWith('data', 'differentData')
    })

    it('should return true when data is equal of encrypted data', async () => {
        const spy = jest.spyOn(bcrypt, 'compare')
        const response = await service.compare('data', 'data')
        expect(response).toBeTruthy()
        expect(spy).toBeCalledWith('data', 'data')
    })
})