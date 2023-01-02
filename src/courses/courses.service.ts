import { Injectable } from "@nestjs/common";

import { Course, CourseDocument } from "./schemas/course.schema";
import { Student, StudentDocument } from "../students/schemas/student.schema";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { UpdateAttendanceDto } from "./dto/update-attendance";
import { FilterQuery, Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { AddStudentDto } from "./dto/add-student.dto";
import { RemoveStudentDto } from "./dto/remove-student.dto";

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<CourseDocument>,
    @InjectModel('Student') private readonly studentModel: Model<StudentDocument>,
  ) {}

  async getCourseById(_id: FilterQuery<Course>): Promise<Course> {
    return this.courseModel.findOne(_id).populate('students');
  }

  async getCourseFromList(_id: FilterQuery<Course>): Promise<Course> {
    return this.courseModel.findOne(_id).populate('students', 'name').populate('attendance.students', 'name');
  }

  async getCourses(): Promise<Course[]> {
    return this.courseModel.find().populate('students', ['name', 'student_number']);
  }

  async updateCourse(_id: FilterQuery<Course>, courseUpdates: UpdateCourseDto) {
    const course = await this.courseModel.findByIdAndUpdate(_id, courseUpdates, { new: true });
    await course.save();
    return course;
  }

  async addStudentsToCourse(_id: FilterQuery<Course>, addStudentsData: AddStudentDto) {
    const course = await this.courseModel.findById(_id);
    // @ts-ignore
    course.students.push(...addStudentsData.studentIds);
    await course.save();
    return course;
  }

  async removeStudentFromCourse(_id: FilterQuery<Course>, removeStudentData: RemoveStudentDto) {
    const course = await this.courseModel.findById(_id);
    // @ts-ignore
    course.students = course.students.filter(s => s.toString() !== removeStudentData.studentId);
    await course.save();
    return course;
  }

  async updateAttendance(_id: FilterQuery<Course>, attendanceData: UpdateAttendanceDto) {
    const course = await this.courseModel.findById(_id);
    course.attendance.push({
      session: attendanceData.session,
      students: attendanceData.studentIds,
    });
    await course.save();
    return course;
  }

  async deleteAttendance(_id: FilterQuery<Course>, courseId: ObjectId): Promise<Course> {
    const course = await this.courseModel.findById(_id);
    course.attendance = course.attendance.filter(a => a._id.toString() !== courseId.toString());
    await course.save();
    return course;
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = new this.courseModel(createCourseDto);
    // @ts-ignore
    course.students = createCourseDto.student_ids;
    await course.save();
    return course;
  }

  async deleteCourse(_id: FilterQuery<Course>): Promise<Course> {
    return this.courseModel.findOneAndDelete(_id);
  }
  }