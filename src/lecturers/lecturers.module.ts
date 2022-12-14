import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Lecturer, LecturerSchema } from "./schemas/lecturer.schema";
import { LecturersController } from "./lecturers.controller";
import { LecturersService } from "./lecturers.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Lecturer.name, schema: LecturerSchema }])],
  controllers: [LecturersController],
  providers: [LecturersService]
})
export class LecturersModule {}