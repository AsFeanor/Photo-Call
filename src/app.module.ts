import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LecturersModule } from './lecturers/lecturers.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://photoadmin:alku254@photocall.fq04slz.mongodb.net/?retryWrites=true&w=majority'), LecturersModule, StudentsModule, CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}