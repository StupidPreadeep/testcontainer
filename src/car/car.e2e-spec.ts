import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from './car.service';
import { PrismaService } from '../prisma/prisma.service';
import { postgresClient, prismaService } from '../../test/setupTests.e2e';


describe('CarsService', () => {
  let service: CarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarService, PrismaService],
    }).overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    service = module.get<CarService>(CarService);
  });

  it('should create a car', async () => {
    // Start a transaction
    await postgresClient.query('BEGIN');

    try {
      // Perform the create operation
      const createResult = await service.create({ model: "mercedes", clolor: "red" });

      // Commit the transaction
      await postgresClient.query('COMMIT');

      // Query the database for the newly created car
      const result = await postgresClient.query('SELECT * FROM "public"."Car"');

      // Log the results
      console.log(result.rows);

      // Assert the create result
      expect(createResult).toEqual({
        id: 1,
        model: "mercedes",
        clolor: "red"
      });
    } catch (error) {
      // Rollback the transaction in case of an error
      await postgresClient.query('ROLLBACK');
      throw error;
    }
  });

});