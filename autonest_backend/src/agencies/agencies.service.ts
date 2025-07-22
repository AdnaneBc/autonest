import { Injectable } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AgenciesService {
  constructor(private prisma: PrismaService) {}

  async create(createAgencyDto: CreateAgencyDto, ownerId: string) {
    const agency = await this.prisma.agency.create({
      data: {
        ...createAgencyDto,
        ownerId,
      },
    });

    // Automatically create AgencyUser as owner
    await this.prisma.agencyUser.create({
      data: {
        userId: ownerId,
        agencyId: agency.id,
        role: 'owner',
      },
    });

    return agency;
  }

  findAll() {
    return this.prisma.agency.findMany(); // just for testing
  }

  async findByOwnerId(ownerId: string) {
    return this.prisma.agency.findMany({
      where: {
        ownerId,
      },
    });
  }
  findOne(id: string) {
    return this.prisma.agency.findUnique({
      where: { id },
    });
  }

  update(id: string, updateAgencyDto: UpdateAgencyDto) {
    return this.prisma.agency.update({
      where: { id },
      data: updateAgencyDto,
    });
  }

  remove(id: string) {
    return this.prisma.agency.delete({
      where: { id },
    });
  }
}
