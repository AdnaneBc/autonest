import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // makes it available globally (optional but helpful)
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
