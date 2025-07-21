import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AgenciesModule } from './agencies/agencies.module';

@Module({
  imports: [PrismaModule, UsersModule, AgenciesModule],
})
export class AppModule {}
