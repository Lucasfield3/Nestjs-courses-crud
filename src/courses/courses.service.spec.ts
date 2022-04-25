import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CourseService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
});

describe('CourseService', () => {
  let service: CourseService;
  let courseRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: Connection, useValue: {} }, //conexão como banco de dados
        {
          provide: getRepositoryToken(Course),
          useValue: createMockRepository(),
        }, //conexão com o repositório Course
        { provide: getRepositoryToken(Tag), useValue: createMockRepository() }, //conexão com o repositório Tag
      ],
    }).compile();
    service = module.get<CourseService>(CourseService);
    courseRepository = module.get<MockRepository>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('buscar curso pelo Id', () => {
      it('deve retornar o objeto', async () => {
        const courseId = '1';
        const expectedCourse = {};

        courseRepository.findOne.mockReturnValue(expectedCourse);
        const course = await service.findOne(courseId);
        expect(course).toEqual(expectedCourse);
      });

      it('deve retornar um erro NotFoundException', async () => {
        const courseId = '1';

        courseRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findOne(courseId);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`Course ID ${courseId} not found`);
        }
      });
    });
  });
});
