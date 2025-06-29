import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AgencyModule } from './agency/agency.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, AgencyModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
