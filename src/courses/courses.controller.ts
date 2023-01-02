import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UpdateAttendanceDto } from "./dto/update-attendance";

import { Course } from './schemas/course.schema';
import { CoursesService } from './courses.service';
import { ObjectId } from "mongoose";
import { AddStudentDto } from "./dto/add-student.dto";
import { RemoveStudentDto } from "./dto/remove-student.dto";

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get(':_id')
  async getCourse(@Param('_id') _id: ObjectId): Promise<Course> {
    return this.coursesService.getCourseById({ _id });
  }

  @Get(':_id/list')
  async getCourseFromList(@Param('_id') _id: ObjectId): Promise<Course> {
    return this.coursesService.getCourseFromList({ _id });
  }

  @Get()
  async getCourses(): Promise<Course[]> {
    return this.coursesService.getCourses();
  }

  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.createCourse(createCourseDto);
  }

  @Patch(':_id')
  async updateCourse(@Param('_id') _id: ObjectId, @Body() updateCourseDto: UpdateCourseDto): Promise<Course> {
    return this.coursesService.updateCourse({ _id }, updateCourseDto);
  }

  @Patch(':_id/add_students')
  async addStudents(@Param('_id') _id: ObjectId, @Body() addStudentDto: AddStudentDto): Promise<Course> {
    return this.coursesService.addStudentsToCourse({ _id }, addStudentDto);
  }

  @Patch(':_id/remove_student')
  async removeStudent(@Param('_id') _id: ObjectId, @Body() removeStudentDto: RemoveStudentDto): Promise<Course> {
    return this.coursesService.removeStudentFromCourse({ _id }, removeStudentDto);
  }

  @Patch(':_id/attendance')
  async updateAttendance(@Param('_id') _id: ObjectId, @Body() updateAttendanceDto: UpdateAttendanceDto): Promise<Course> {
    return this.coursesService.updateAttendance({ _id }, updateAttendanceDto);
  }

  @Patch('_id/remove_attendance')
  async deleteAttendance(@Param('_id') _id: ObjectId, @Body() courseId: ObjectId): Promise<Course> {
    return this.coursesService.deleteAttendance({ _id }, courseId);
  }

  @Delete(':_id')
  async deleteCourse(@Param('_id') _id: ObjectId): Promise<Course> {
    return this.coursesService.deleteCourse({ _id });
  }
}