import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { CreateLecturerDto } from './dto/create-lecturer.dto';

import { Lecturer } from './schemas/lecturer.schema';
import { LecturersService } from './lecturers.service';
import { JwtService } from './jwt.service';
import { JwtPayload } from './jwt-payload.interface';
import { ObjectId } from "mongoose";

@Controller('lecturers')
export class LecturersController {
  constructor(
    private readonly lecturersService: LecturersService,
    @Inject(JwtService) private readonly jwtService: JwtService
  ) {}

  @Get(':_id')
  async getLecturer(@Param('_id') _id: ObjectId): Promise<Lecturer> {
    return this.lecturersService.getLecturerById({ _id });
  }

  @Get(':email/courses')
  async getLecturerForCourses(@Param('email') email: string): Promise<Lecturer> {
    return this.lecturersService.getLecturerForCourses({ email });
  }

  @Get()
  async getLecturers(): Promise<Lecturer[]> {
    return this.lecturersService.getLecturers();
  }

  @Post()
  async createLecturer(@Body() lecturerData: Lecturer): Promise<Lecturer> {
    return this.lecturersService.create(lecturerData);
  }

  @Post('login')
  async login(@Body() loginData: { email: string, password: string }): Promise<{ accessToken: string } | null> {
    const lecturer = await this.lecturersService.verifyPassword(loginData.email, loginData.password);
    if (!lecturer) {
      return null;
    }
    const payload: JwtPayload = {
      email: lecturer.email
    };
    const user_name = lecturer.name;
    const isSuperUser = lecturer.isSuperUser;
    const email = lecturer.email;
    const accessToken = await this.jwtService.sign(payload);
    // @ts-ignore
    return { accessToken, user_name, isSuperUser, email };
  }

  @Patch(':_id')
  async update(@Param('_id') _id: ObjectId, @Body() lecturerData: Partial<Lecturer>): Promise<Lecturer> {
    return this.lecturersService.update(_id, lecturerData);
  }

  @Delete(':_id')
  async deleteLecturer(@Param('_id') _id: ObjectId): Promise<Lecturer> {
    return this.lecturersService.deleteLecturer({ _id });
  }

}