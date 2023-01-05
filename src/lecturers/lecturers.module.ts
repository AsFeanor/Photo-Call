import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lecturer, LecturerSchema } from './schemas/lecturer.schema';
import { LecturersController } from './lecturers.controller';
import { LecturersService } from './lecturers.service';
import { CourseSchema } from '../courses/schemas/course.schema';
import { JwtService } from "./jwt.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lecturer.name, schema: LecturerSchema },
      { name: 'Course', schema: CourseSchema },
    ]),
  ],
  controllers: [LecturersController],
  providers: [LecturersService, JwtService],
})
export class LecturersModule {}
