import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Express } from 'express'
import { CreateStudentDto } from './dto/create-student.dto';

import { Student } from './schemas/student.schema';
import { StudentsService } from './students.service';
import { UpdateStudentDto } from "./dto/update-student.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ObjectId } from "mongoose";

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get(':student_number')
  async getStudent(@Param('student_number') student_number: number): Promise<Student> {
    return this.studentsService.getStudentByNumber({ student_number });
  }

  @Get()
  async getStudents(): Promise<Student[]> {
    return this.studentsService.getStudents();
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async createStudent(@UploadedFile() file: Express.Multer.File, @Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentsService.createStudent(file, { ...createStudentDto });
  }

  @Patch(':student_number')
  @UseInterceptors(FileInterceptor('photo'))
  async updateStudent(@Param('student_number') student_number: string, @UploadedFile() file: Express.Multer.File, @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
    return this.studentsService.updateStudent({ student_number }, file, updateStudentDto);
  }

  @Delete(':_id')
  async deleteStudent(@Param('_id') _id: ObjectId): Promise<Student> {
    return this.studentsService.deleteStudent({ _id });
  }
}