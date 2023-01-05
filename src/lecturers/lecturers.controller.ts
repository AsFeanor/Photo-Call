import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { CreateLecturerDto } from './dto/create-lecturer.dto';

import { Lecturer } from './schemas/lecturer.schema';
import { LecturersService } from './lecturers.service';
import { JwtService } from './jwt.service';
import { JwtPayload } from './jwt-payload.interface';

@Controller('lecturers')
export class LecturersController {
  constructor(
    private readonly lecturersService: LecturersService,
    @Inject(JwtService) private readonly jwtService: JwtService
  ) {}

  @Get(':lecturerId')
  async getLecturer(@Param('lecturerId') lecturerId: string): Promise<Lecturer> {
    return this.lecturersService.getLecturerById({ lecturerId });
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
    const accessToken = await this.jwtService.sign(payload);
    // @ts-ignore
    return { accessToken, user_name };
  }

}