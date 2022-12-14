import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLecturerDto } from './dto/create-lecturer.dto';

import { Lecturer } from './schemas/lecturer.schema';
import { LecturersService } from './lecturers.service';

@Controller('lecturers')
export class LecturersController {
  constructor(private readonly lecturersService: LecturersService) {}

  @Get(':lecturerId')
  async getLecturer(@Param('lecturerId') lecturerId: string): Promise<Lecturer> {
    return this.lecturersService.getLecturerById({ lecturerId });
  }

  @Get()
  async getLecturers(): Promise<Lecturer[]> {
    return this.lecturersService.getLecturers();
  }

  @Post()
  async createLecturer(@Body() createLecturerDto: CreateLecturerDto): Promise<Lecturer> {
    return this.lecturersService.createLecturer({ ...createLecturerDto })
  }
}