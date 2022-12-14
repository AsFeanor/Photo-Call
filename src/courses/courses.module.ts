import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Course, CourseSchema } from "./schemas/course.schema";
import { Student, StudentSchema } from "../students/schemas/student.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'Student', schema: StudentSchema },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
