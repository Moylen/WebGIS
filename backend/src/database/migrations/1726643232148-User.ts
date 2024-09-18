import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1726643232148 implements MigrationInterface {
  name = 'User1726643232148';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user"
       (
           "id"           SERIAL            NOT NULL,
           "email"        character varying NOT NULL,
           "username"     character varying NOT NULL,
           "passwordHash" character varying NOT NULL,
           "createTime"   TIMESTAMP         NOT NULL DEFAULT now(),
           "updateTime"   TIMESTAMP         NOT NULL DEFAULT now(),
           "deleteTime"   TIMESTAMP,
           CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
           CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
           CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
