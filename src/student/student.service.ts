import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private repository: Repository<Student>,
  ) {}

  getStudents() {
    return this.repository.find();
  }

  getStudentById(id: string) {
    return this.repository.findOne({ id });
  }

  createStudent(createStudentInput: CreateStudentInput) {
    const { firstName, lastName } = createStudentInput;

    const student = this.repository.create({
      firstName,
      lastName,
      id: v4(),
    });

    return this.repository.save(student);
  }

  getManyStudents(studentsIds: string[]) {
    return this.repository.find({
      where: {
        id: {
          $in: studentsIds,
        },
      },
    });
  }
}
