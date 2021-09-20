import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private readonly service: LessonService,
    private studentSerive: StudentService,
  ) {}

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.service.getById(id);
  }

  @Query((returns) => [LessonType])
  lessons() {
    return this.service.getLessons();
  }

  @Mutation((returns) => LessonType)
  createLesson(@Args('createLesson') createLessonInput: CreateLessonInput) {
    return this.service.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentsIds } = assignStudentsToLessonInput;
    return this.service.assignStudentsToLesson(lessonId, studentsIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentSerive.getManyStudents(lesson.students);
  }
}
