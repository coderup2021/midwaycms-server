import { MigrationInterface, QueryRunner } from 'typeorm'

export class createArticle1676948611501 implements MigrationInterface {
  name = 'createArticle1676948611501'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create database if not exists midway_cms default character set utf8mb4 collate utf8mb4_unicode_ci;`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `drop database if exists midway_cms default character set utf8mb4 collate utf8mb4_unicode_ci;`,
    )
  }
}
