import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private repository: Repository<Lesson>,
  ) {}

  async getById(id: string) {
    return this.repository.findOne({ id });
  }

  async getLessons() {
    return this.repository.find();
  }

  async createLesson(createLessonInput: CreateLessonInput) {
    const { endDate, name, startDate, students } = createLessonInput;

    const lesson = this.repository.create({
      id: v4(),
      name,
      startDate,
      endDate,
      students,
    });

    return this.repository.save(lesson);
  }

  async assignStudentsToLesson(lessonId: string, studentsIds: string[]) {
    const lesson = await this.repository.findOne({ id: lessonId });
    lesson.students = [...lesson.students, ...studentsIds];
    return this.repository.save(lesson);
  }
}
