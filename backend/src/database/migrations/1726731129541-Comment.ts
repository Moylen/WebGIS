import { MigrationInterface, QueryRunner } from 'typeorm';

export class Comment1726731129541 implements MigrationInterface {
  name = 'Comment1726731129541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "createTime" TIMESTAMP NOT NULL DEFAULT now(), "updateTime" TIMESTAMP NOT NULL DEFAULT now(), "deleteTime" TIMESTAMP, "text" character varying NOT NULL, "score" integer NOT NULL, "creatorId" integer NOT NULL, "pointId" integer NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_b6bf60ecb9f6c398e349adff52f" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_24dd90157d36238dc5472ff063f" FOREIGN KEY ("pointId") REFERENCES "point"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comment"
            DROP CONSTRAINT "FK_24dd90157d36238dc5472ff063f"`);
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_b6bf60ecb9f6c398e349adff52f"`,
    );
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}
