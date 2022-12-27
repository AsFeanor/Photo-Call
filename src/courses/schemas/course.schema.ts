import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Student, StudentDocument } from "../../students/schemas/student.schema";
import * as mongoose from "mongoose";

export type CourseDocument = Course & mongoose.Document;

@Schema()
export class Course {
  @Prop()
  name: string;

  @Prop([{ ref: 'Student', type: mongoose.Schema.Types.ObjectId }])
  students: [Student];

  @Prop({ type: [{
      session: Date,
      students: [{ type: mongoose.Types.ObjectId, ref: 'Student' }]
    }]})
  attendance: any[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
