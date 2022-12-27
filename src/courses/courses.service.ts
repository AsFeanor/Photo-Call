import { Injectable } from "@nestjs/common";

import { Course, CourseDocument } from "./schemas/course.schema";
import { Student, StudentDocument } from "../students/schemas/student.schema";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { UpdateAttendanceDto } from "./dto/update-attendance";
import { FilterQuery, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<CourseDocument>,
    @InjectModel('Student') private readonly studentModel: Model<StudentDocument>,
  ) {}

  async getCourseById(_id: FilterQuery<Course>): Promise<Course> {
    return this.courseModel.findOne(_id).populate('students').populate('attendance.students');
  }

  async getCourses(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async updateCourse(_id: FilterQuery<Course>, courseUpdates: UpdateCourseDto) {
    const course = await this.courseModel.findById(_id);
    // @ts-ignore
    course.students = courseUpdates.student_ids;
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