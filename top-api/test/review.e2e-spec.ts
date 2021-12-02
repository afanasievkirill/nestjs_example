import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { disconnect, Types } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';

const productId = new Types.ObjectId().toHexString();

const reviewDto: CreateReviewDto = {
  name: 'Тест',
  title: 'Заголовок',
  description: 'Описание',
  rating: 5,
  productId
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST) - sucess', async (done) => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(reviewDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        done();
      })
  });


  it('/review/create (POST) - failed', () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...reviewDto, rating: 0 })
      .expect(400);
  });


  it('/review/getByProduct/:productId (GET) - sucess', async (done) => {
    return request(app.getHttpServer())
      .get('/review/getByProduct/' + createdId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
        done();
      });
  });

  it('/review/getByProduct/:productId (GET) - failed', async (done) => {
    return request(app.getHttpServer())
      .get('/review/getByProduct/' + new Types.ObjectId().toHexString())
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0);
        done();
      });
  });

  it('/review/:id (DELETE) - sucess', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .expect(200)
  });

  it('/review/:id (DELETE) - failed', () => {
    return request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId().toHexString())
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND
      })
  });

  afterAll(() => {
    disconnect();
  })
});
