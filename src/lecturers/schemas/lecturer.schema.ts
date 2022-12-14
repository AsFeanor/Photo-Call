import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type LecturerDocument = Lecturer & Document;

@Schema()
export class Lecturer {
  @Prop()
  lecturerId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({required: true})
  password: string;

  @Prop()
  name: string
}

export const LecturerSchema = SchemaFactory.createForClass(Lecturer);