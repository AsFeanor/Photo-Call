import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Student, StudentDocument } from "../../students/schemas/student.schema";

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop()
  courseId: string;

  @Prop()
  name: string;

  @Prop({ ref: 'Student', type: [typeof Student]})
  students: StudentDocument[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
