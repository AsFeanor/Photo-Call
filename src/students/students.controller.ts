import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateStudentDto } from './dto/create-student.dto';

import { Student } from './schemas/student.schema';
import { StudentsService } from './students.service';
import { UpdateStudentDto } from "./dto/update-student.dto";

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
  async createStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentsService.createStudent({ ...createStudentDto });
  }

  @Patch(':studentId')
  async updateStudent(@Param('studentId') studentId: string, @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
    return this.studentsService.updateStudent({ studentId }, updateStudentDto);
  }

  @Delete(':studentId')
  async deleteStudent(@Param('studentId') studentId: string): Promise<Student> {
    return this.studentsService.deleteStudent({ studentId });
  }
}