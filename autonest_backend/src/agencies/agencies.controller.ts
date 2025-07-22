import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}
  @ApiBearerAuth() // 👈 Tells Swagger this route needs Bearer token
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateAgencyDto, @Req() req: any) {
    return this.agenciesService.create(dto, req.user.id); // ✅ correct
  }

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.agenciesService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMyAgencies(@Req() req: any) {
    return this.agenciesService.findByOwnerId(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agenciesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgencyDto: UpdateAgencyDto) {
    return this.agenciesService.update(id, updateAgencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agenciesService.remove(id);
  }
}
