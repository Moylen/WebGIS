import { MigrationInterface, QueryRunner } from 'typeorm';

export class Point1726712863596 implements MigrationInterface {
  name = 'Point1726712863596';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "point"
        DROP COLUMN "coordinate"`);
    await queryRunner.query(`ALTER TABLE "point"
        ADD "coordinate" numeric array NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "point"
        DROP COLUMN "coordinate"`);
    await queryRunner.query(`ALTER TABLE "point"
        ADD "coordinate" integer array NOT NULL`);
  }
}
