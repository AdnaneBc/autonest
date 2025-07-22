import { Module } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { AgenciesController } from './agencies.controller';
import { PrismaModule } from '../prisma/prisma.module'; // 👈 import it

@Module({
  imports: [PrismaModule], // ✅ this fixes the error
  controllers: [AgenciesController],
  providers: [AgenciesService],
})
export class AgenciesModule {}
