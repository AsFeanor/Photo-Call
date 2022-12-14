import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

import { Student, StudentDocument } from "./schemas/student.schema";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) {}

  async getStudentByNumber(student_number: FilterQuery<Student>): Promise<Student> {
    return this.studentModel.findOne(student_number);
  }

  async getStudents(): Promise<Student[]> {
    return this.studentModel.find();
  }

  async createStudent(studentData): Promise<Student> {
    const student = {
      studentId: uuidv4(),
      ...studentData
    }
    const newStudent = new this.studentModel(student);
    return newStudent.save();
  }

  async updateStudent(studentId: FilterQuery<Student>, studentUpdates: UpdateStudentDto): Promise<Student> {
    return this.studentModel.findOneAndUpdate(studentId, studentUpdates, { new: true });
  }

  async deleteStudent(studentId: FilterQuery<Student>): Promise<Student> {
    return this.studentModel.findOneAndDelete(studentId);
  }
}