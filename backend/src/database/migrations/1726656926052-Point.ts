import { MigrationInterface, QueryRunner } from 'typeorm';

export class Point1726656926052 implements MigrationInterface {
  name = 'Point1726656926052';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "point"
                             (
                                 "id"         SERIAL            NOT NULL,
                                 "createTime" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updateTime" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "deleteTime" TIMESTAMP,
                                 "coordinate" integer array     NOT NULL,
                                 "type"       character varying NOT NULL DEFAULT 'point',
                                 "creatorId"  integer           NOT NULL,
                                 CONSTRAINT "PK_391f59a9491a08961038a615371" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "point"
        ADD CONSTRAINT "FK_3f946d639d6d90150944bd843cc" FOREIGN KEY ("creatorId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "point"
        DROP CONSTRAINT "FK_3f946d639d6d90150944bd843cc"`);
    await queryRunner.query(`DROP TABLE "point"`);
  }
}
