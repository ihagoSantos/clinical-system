import { Module } from '@nestjs/common';
import { UserRepository } from 'src/infra/db/user.repository';

@Module({
    controllers: [],
    providers: [UserRepository],
    exports: [UserRepository]
})
export class UserModule { }
