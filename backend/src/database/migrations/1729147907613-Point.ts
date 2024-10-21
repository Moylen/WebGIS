import { MigrationInterface, QueryRunner } from 'typeorm';

export class Point1729147907613 implements MigrationInterface {
  name = 'Point1729147907613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "type"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "point" ADD "type" character varying NOT NULL DEFAULT 'point'`,
    );
  }
}
