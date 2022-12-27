import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ type: Object })
  photo: Buffer;

  @Prop({required: true})
  student_number: number;

  @Prop()
  name: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);