import { MigrationInterface, QueryRunner } from 'typeorm';

export class Comment1726735797026 implements MigrationInterface {
  name = 'Comment1726735797026';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comment" ADD "photoId" integer`);
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_16688e4a4f41cb008e4d7934a4c" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_16688e4a4f41cb008e4d7934a4c"`,
    );
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "photoId"`);
  }
}
