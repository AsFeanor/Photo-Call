import { Injectable } from "@nestjs/common";

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

  async createStudent(photo, studentData): Promise<Student> {
    const student = {
      photo,
      ...studentData
    }
    const newStudent = new this.studentModel(student);
    return newStudent.save();
  }

  async updateStudent(student_number: FilterQuery<Student>, photo, studentUpdates: UpdateStudentDto): Promise<Student> {
    return this.studentModel.findOneAndUpdate(student_number, { photo, ...studentUpdates }, { new: true });
  }

  async deleteStudent(_id: FilterQuery<Student>): Promise<Student> {
    return this.studentModel.findOneAndDelete(_id);
  }
}