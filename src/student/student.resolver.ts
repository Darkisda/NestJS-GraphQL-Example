import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private service: StudentService) {}

  @Query((returns) => [StudentType])
  students() {
    return this.service.getStudents();
  }

  @Query((returns) => StudentType)
  getStudentById(@Args('id') id: string) {
    return this.service.getStudentById(id);
  }

  @Mutation((returns) => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.service.createStudent(createStudentInput);
  }
}
