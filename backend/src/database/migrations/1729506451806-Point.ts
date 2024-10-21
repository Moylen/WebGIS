import { MigrationInterface, QueryRunner } from 'typeorm';

export class Point1729506451806 implements MigrationInterface {
  name = 'Point1729506451806';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "point"
        ADD "photoId" integer`);
    await queryRunner.query(`ALTER TABLE "point"
        ADD CONSTRAINT "FK_941b789e63dffa3d48f4aa21992" FOREIGN KEY ("photoId") REFERENCES "file" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "point"
        DROP CONSTRAINT "FK_941b789e63dffa3d48f4aa21992"`);
    await queryRunner.query(`ALTER TABLE "point"
        DROP COLUMN "photoId"`);
  }
}
