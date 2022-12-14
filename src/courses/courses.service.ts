import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

import { Course, CourseDocument } from "./schemas/course.schema";
import { Student, StudentDocument } from "../students/schemas/student.schema";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { FilterQuery, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<CourseDocument>,
    @InjectModel('Student') private readonly studentModel: Model<StudentDocument>,
  ) {}

  async getCourseById(courseId: FilterQuery<Course>): Promise<Course> {
    return this.courseModel.findOne(courseId);
  }

  async getCourses(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async updateCourse(courseId: FilterQuery<Course>, courseUpdates: UpdateCourseDto) {
    const { name, student_ids } = courseUpdates;
    const students = await this.studentModel.find({ student_number: { $in: student_ids } });
    const updateData = {
      name,
      students: students.map(student => student),
    }
    return this.courseModel.findOneAndUpdate(courseId, updateData);
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const { name, student_ids } = createCourseDto;
    const students = await this.studentModel.find({ student_number: { $in: student_ids } });
    const createdCourse = new this.courseModel({
      courseId: uuidv4(),
      name,
      students,
    });
    return createdCourse.save();
  }

  async deleteCourse(courseId: FilterQuery<Course>): Promise<Course> {
    return this.courseModel.findOneAndDelete(courseId);
  }
  }