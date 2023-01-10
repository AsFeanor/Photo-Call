import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";

import { Lecturer, LecturerDocument } from "./schemas/lecturer.schema";
import { FilterQuery, Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class LecturersService {
  constructor(@InjectModel(Lecturer.name) private lecturerModel: Model<LecturerDocument>) {}

  async getLecturerById(lecturerId: FilterQuery<Lecturer>): Promise<Lecturer> {
    return this.lecturerModel.findOne(lecturerId);
  }

  async getLecturerForCourses(email: FilterQuery<Lecturer>): Promise<Lecturer> {
    return this.lecturerModel.findOne(email).populate('courses');
  }

  async getLecturers(): Promise<Lecturer[]> {
    return this.lecturerModel.find();
  }

  async createLecturer(lecturerData): Promise<Lecturer> {
    const newLecturer = new this.lecturerModel({
      lecturerId: uuidv4(),
      ...lecturerData
    });
    return newLecturer.save()
  }

  async create(lecturerData): Promise<Lecturer> {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(lecturerData.password, saltRounds);
    const passwordSalt = await bcrypt.genSalt(saltRounds);
    const superUserControl = lecturerData.isSuperUser ? lecturerData.isSuperUser : false;
    const createdLecturer = new this.lecturerModel({
      ...lecturerData,
      isSuperUser: superUserControl,
      passwordHash,
      passwordSalt
    });
    await createdLecturer.save();
    return createdLecturer;
  }

  async verifyPassword(email: string, password: string): Promise<Lecturer | null> {
    const lecturer = await this.lecturerModel.findOne({ email }).exec();
    if (!lecturer) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, lecturer.passwordHash);
    if (!isPasswordValid) {
      return null;
    }
    return lecturer;
  }

  async update(_id: ObjectId, lecturerData: Partial<Lecturer>): Promise<Lecturer> {
    return await this.lecturerModel.findByIdAndUpdate(_id, lecturerData, { new: true }).exec();
  }

  async deleteLecturer(_id: FilterQuery<Lecturer>): Promise<Lecturer> {
    return this.lecturerModel.findOneAndDelete(_id);
  }
}