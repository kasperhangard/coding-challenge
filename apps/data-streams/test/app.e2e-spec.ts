import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  })

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/')
      .expect(200)

    expect(response.text).toContain('Hello world!');
  });

  it('/data (GET) will return empty object when no worker is active', async () => {
    const response = await request(app.getHttpServer())
      .get('/data')
      .expect(200)

    expect(response.text).toBe("{}");
  });

  it('/createWorker (POST) with correct params creates a worker for the correct endpoint', async () => {
    const response = await request(app.getHttpServer())
      .post('/createWorker',)
      .send({
        endpoint: "http://api.open-notify.org/astros",
        interval: "EVERY_5_SECONDS"
      })
      .expect(201)

    expect(response.text).toBe('Created worker for http://api.open-notify.org/astros with an interval of EVERY_5_SECONDS')
  });

  it('/createWorker (POST) without params should throw an error', async () => {
    const response = await request(app.getHttpServer())
      .post('/createWorker',)
      .send({
      })
      .expect(400)

    expect(response.text).toContain('endpoint must be an URL address')
    expect(response.text).toContain('interval must be one of the following values')
  });

});
