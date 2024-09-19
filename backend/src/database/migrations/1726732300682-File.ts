import { MigrationInterface, QueryRunner } from 'typeorm';

export class File1726732300682 implements MigrationInterface {
  name = 'File1726732300682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "file"
                             (
                                 "id"         SERIAL            NOT NULL,
                                 "createTime" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updateTime" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "deleteTime" TIMESTAMP,
                                 "filePath"   character varying NOT NULL,
                                 "mimeType"   character varying NOT NULL,
                                 CONSTRAINT "UQ_b7dbc6b0c01b27d1e72086b5625" UNIQUE ("filePath"),
                                 CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "file"`);
  }
}
