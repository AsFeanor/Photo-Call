import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { Course } from "../../courses/schemas/Course.schema";

export type LecturerDocument = Lecturer & Document;

@Schema()
export class Lecturer {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  passwordSalt: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  isSuperUser: Boolean;

  @Prop([{ ref: 'Course', type: mongoose.Schema.Types.ObjectId }])
  courses: [Course];
}

export const LecturerSchema = SchemaFactory.createForClass(Lecturer);