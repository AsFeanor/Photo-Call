import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

import { Lecturer, LecturerDocument } from "./schemas/lecturer.schema";
import { FilterQuery, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class LecturersService {
  constructor(@InjectModel(Lecturer.name) private lecturerModel: Model<LecturerDocument>) {}

  async getLecturerById(lecturerId: FilterQuery<Lecturer>): Promise<Lecturer> {
    return this.lecturerModel.findOne(lecturerId);
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
}