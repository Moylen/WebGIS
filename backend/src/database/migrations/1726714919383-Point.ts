import { MigrationInterface, QueryRunner } from 'typeorm';

export class Point1726714919383 implements MigrationInterface {
  name = 'Point1726714919383';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "point"
        ADD "title" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "point"
        DROP COLUMN "title"`);
  }
}
